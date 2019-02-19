var express = require('express');
var users = require('../models/user.js');
var beatmaps = require('../models/beatmap.js');
var parties = require('../models/party.js');
var notifications = require('../models/notification.js');
var invites = require('../models/invite.js');
var tasks = require('../models/task.js');
var logs = require('../models/log.js');
var api = require('../models/api.js');

var router = express.Router();

router.use(api.isLoggedIn);

//valid task check (doesn't have lock check, has special task checks)
async function addTaskChecks(userId, b, invite){ 
    if(!b){
        return { error: "This map no longer exists!"}
    }
    if(b.tasks.length > 20 && invite.taskName){
        return { error: "This mapset has too many difficulties!" };
    }
    if(invite.taskName == "Storyboard"){
        let sb = false;
        b.tasks.forEach(task => {
            if(task.name == "Storyboard"){
                sb = true;
            }
        })
        if(sb){
            return { error: "There can only be one storyboard on a mapset!" };
        }
    }
    if(b.quest){
        let p = await parties.service.query({currentQuest: b.quest, members: userId});
        if(!p){
            return { error: "This mapset is part of a quest, so only members of the host's party can add difficulties!" };
        }
    }
    const isAlreadyBn = await beatmaps.service.query({ _id: b._id, bns: userId });
    if(isAlreadyBn){
        return { error: "Cannot create a difficulty while in BN list!" };
    }
    let t = await tasks.service.query({ _id: invite.modified._id });
    if(!t){
        return { error: "Task doesn't exist anymore!" };
    }
    t = await tasks.service.query({ _id: invite.modified._id, mappers: userId });
    if (t.length != 0) {
        invite = await invites.service.update(invite.map.id, {visible: false});
        return { error: "You're already a mapper on this task!" };
    }
    return true;
}

//populations
const defaultNotificationPopulate = [
    { populate: 'sender',  display: 'username osuId' },
    { innerPopulate: 'map',  populate: { path: 'song' } },
];
const defaultInvitePopulate = [
    { populate: 'sender',  display: 'username osuId' },
    { innerPopulate: 'map',  populate: { path: 'song' } },
];
const defaultMapPopulate = [
    { populate: 'song',  display: 'artist title' },
];

/* GET notifications/invites */
router.get('/', async (req, res, next) => {
	res.render('notifications', { title: 'Notifications/Invites', script: '../javascripts/notifications.js', isNotifications: true, loggedInAs: req.session.username });
});

/* GET notifications/invites listing. */
router.get('/relevantInfo', async (req, res, next) => {
    const [notif, inv] = await Promise.all([
        notifications.service.query({ visible: true, recipient: req.session.mongoId}, defaultNotificationPopulate, {}, true),
        invites.service.query({ visible: true, recipient: req.session.mongoId}, defaultInvitePopulate, {}, true)
    ]);
    res.json({notifications: notif, invites: inv});
  });

/* POST hide notification */
router.post('/hideNotification/:id', async (req, res) => {
    await notifications.service.update(req.params.id, {visible: false});
    let n = await notifications.service.query({_id: req.params.id}, defaultNotificationPopulate)
    res.json(n);
});

/* POST hide notification */
router.post('/hideAll/', async (req, res) => {
    let notifs = await notifications.service.query({recipient: req.session.mongoId, visible: true}, {}, {}, true);
    notifs.forEach(n => {
        notifications.service.update(n._id, {visible: false});
    })
    res.json({});
});

/* POST hide notification */
router.post('/hideInvite/:id', async (req, res) => {
    let inv = await invites.service.update(req.params.id, {visible: false});
    inv = await invites.service.query({_id: req.params.id}, defaultNotificationPopulate)
    res.json(inv);

    notifications.service.create(inv.id, `rejected your recent invitation related to the mapset`, inv.sender, inv.recipient, inv.map);
});

/* POST hide notification */
router.post('/declineAll/', async (req, res) => {
    let invs = await invites.service.query({recipient: req.session.mongoId, visible: true}, {}, {}, true);
    invs.forEach(inv => {
        invites.service.update(inv._id, {visible: false});
    });
    res.json({});
});


/* POST accept collab */
router.post('/acceptCollab/:id', async (req, res) => {
    let invite = await invites.service.query({_id: req.params.id}, defaultInvitePopulate);
    let b = await beatmaps.service.query({ tasks: invite.modified._id }, defaultMapPopulate);
    let valid = await addTaskChecks(req.session.mongoId, b, invite);
    if(valid.error){
        return res.json(valid);
    }
    await invites.service.update(req.params.id, {visible: false});
    invite = await invites.service.query({_id: req.params.id}, defaultInvitePopulate);
    console.log(invite);
    res.json(invite);

    let t = await tasks.service.update(invite.modified._id, { $push: { mappers: req.session.mongoId } });

    logs.service.create(req.session.osuId, `added as collab mapper to "${t.name}" on "${b.song.artist} - ${b.song.title}"`, b._id, 'beatmap' );
    notifications.service.create(t.id, `accepted your invite to collaborate on the "${t.name}" difficulty on your mapset`, invite.sender, invite.recipient, b.id);
});

/* POST accept transfer host */
router.post('/acceptHost/:id', async (req, res) => {
    let invite = await invites.service.query({_id: req.params.id}, defaultInvitePopulate);
    let b = await beatmaps.service.query({_id: invite.map._id}, defaultMapPopulate);
    if(!b){
        return res.json({ error: 'That map no longer exists!' });
    }
    if(b.quest){
        let p = await parties.service.query({currentQuest: b.quest, members: req.session.mongoId});
        if(!p){
            return res.json({error: "This mapset is part of a quest, so only members of the host's party can host."})
        }
    }
    await invites.service.update(req.params.id, {visible: false});
    invite = await invites.service.query({_id: req.params.id}, defaultInvitePopulate);
    res.json(invite);

    const isAlreadyModder = await beatmaps.service.query({ _id: invite.map._id, modders: req.session.mongoId });
    if (isAlreadyModder) {
        let update = { $pull: { modders: req.session.mongoId } };
        b = await beatmaps.service.update(invite.map._id, update);
    }
    const isAlreadyBn = await beatmaps.service.query({ _id: invite.map._id, bns: req.session.mongoId });
    if (isAlreadyBn) {
        update = { $pull: { bns: req.session.mongoId } };
        b = await beatmaps.service.update(invite.map._id, update);
    }
    await beatmaps.service.update(b._id, {host: req.session.mongoId})

    logs.service.create(req.session.osuId, `became host of "${b.song.artist} - ${b.song.title}"`, b._id, 'beatmap' );
    notifications.service.create(b.id, `accepted the invite to host your mapset`, invite.sender, invite.recipient, b.id);
});

/* POST accept difficulty */
router.post('/acceptDiff/:id', async (req, res) => {
    let invite = await invites.service.query({_id: req.params.id}, defaultInvitePopulate);
    let b = await beatmaps.service.query({_id: invite.map._id}, defaultMapPopulate);
    let valid = await addTaskChecks(req.session.mongoId, b, invite);
    if(valid.error){
        return res.json(valid);
    }
    await invites.service.update(req.params.id, {visible: false});
    invite = await invites.service.query({_id: req.params.id}, defaultInvitePopulate);
    res.json(invite);

    let t = await tasks.service.create({ name: invite.taskName, mappers: req.session.mongoId });
    await beatmaps.service.update(invite.map.id, { $push: {tasks: t._id } });
    b = await beatmaps.service.query({_id: invite.map.id}, defaultMapPopulate);

    logs.service.create(req.session.osuId, `added "${invite.taskName}" difficulty to "${b.song.artist} - ${b.song.title}"`, b._id, 'beatmap' );
    notifications.service.create(b.id, `accepted the invite to create a difficulty on your mapset`, invite.sender, invite.recipient, b.id);
});

module.exports = router;
