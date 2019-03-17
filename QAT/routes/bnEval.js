const express = require('express');
const api = require('../models/api.js');
const evals = require('../models/evaluation.js');
const reports = require('../models/report.js');
const evalRounds = require('../models/evalRound.js');
const users = require('../models/qatUser.js');

const router = express.Router();

router.use(api.isLoggedIn);

/* GET bn app page */
router.get('/', async (req, res, next) => {
    let isBnOrQat;
    if (res.locals.userRequest.group == 'bn' || res.locals.userRequest.group == 'qat') {
        isBnOrQat = true;
    }
    res.render('bneval', { title: 'current bn eval', script: '../javascripts/bnEval.js', isBnEval: true, layout: 'qatlayout', isBnOrQat: isBnOrQat });
});

//population
const defaultPopulate = [
    { populate: 'bn', display: 'username osuId', model: users.QatUser },
    { populate: 'evaluations', display: 'evaluator behaviorComment moddingComment vote', model: evals.Evaluation }
];

const defaultDiscussPopulate = [
    { populate: 'bn', display: 'username osuId', model: users.QatUser },
    { populate: 'evaluations', display: 'evaluator behaviorComment moddingComment vote', model: evals.Evaluation },
    { innerPopulate: 'evaluations', model: evals.Evaluation, populate: { path: 'evaluator', select: 'username osuId', model: users.QatUser } },
];


/* GET applicant listing. */
router.get('/relevantInfo', async (req, res, next) => {
    const [er, dr, r] = await Promise.all([
        await evalRounds.service.query({active: true}, defaultDiscussPopulate, {createdAt: 1}, true ),
        await reports.service.query({valid: {$exists: true, $ne: 3}, feedback: {$exists: true, $nin: ''}}, {}, {}, true)
    ]);
    res.json({ er: er, dr: dr, r: r, evaluator: req.session.qatMongoId });
});


async function cycleModes(userId, modes, deadline, osu, taiko, ctb, mania){
    for (let i = 0; i < modes.length; i++) {
        if(modes[i] == "osu" && osu){
            let er = await evalRounds.service.query({$and: [{bn: userId}, {mode: modes[i]}, {active: true}]});
            if(!er) await evalRounds.service.create(userId, modes[i], deadline); 
        }
        if(modes[i] == "taiko" && taiko){
            let er = await evalRounds.service.query({$and: [{bn: userId}, {mode: modes[i]}, {active: true}]});
            if(!er) await evalRounds.service.create(userId, modes[i], deadline); 
        }
        if(modes[i] == "catch" && ctb){
            let er = await evalRounds.service.query({$and: [{bn: userId}, {mode: modes[i]}, {active: true}]});
            if(!er) await evalRounds.service.create(userId, modes[i], deadline); 
        }
        if(modes[i] == "mania" && mania){
            let er = await evalRounds.service.query({$and: [{bn: userId}, {mode: modes[i]}, {active: true}]});
            if(!er) await evalRounds.service.create(userId, modes[i], deadline); 
        }
    }
}

/* POST submit or edit eval */
router.post('/addEvalRounds/', async (req, res) => {
    let fullBns = [];
    let probationBns = [];
    let qat = [];
    if(req.body.probation){
        probationBns = await users.service.query(
            {$and: [
                {group: 'bn'},
                {$or: [
                    {probation: {$elemMatch: {$eq: req.body.osu && 'osu'},},},
                    {probation: {$elemMatch: {$eq: req.body.taiko && 'taiko'},},},
                    {probation: {$elemMatch: {$eq: req.body.catch && 'catch'},},},
                    {probation: {$elemMatch: {$eq: req.body.mania && 'mania'},},},
                ]},
                {$or: [
                    {modes: {$elemMatch: {$eq: req.body.osu && 'osu'},},},
                    {modes: {$elemMatch: {$eq: req.body.taiko && 'taiko'},},},
                    {modes: {$elemMatch: {$eq: req.body.catch && 'catch'},},},
                    {modes: {$elemMatch: {$eq: req.body.mania && 'mania'},},},
                ]},]}, {}, {}, true);
    }
    if(req.body.bn){
        fullBns = await users.service.query(
            {$and: [
                {group: 'bn'},
                {$or: [
                    {probation: {$elemMatch: {$ne: req.body.osu && 'osu'},},},
                    {probation: {$elemMatch: {$ne: req.body.taiko && 'taiko'},},},
                    {probation: {$elemMatch: {$ne: req.body.catch && 'catch'},},},
                    {probation: {$elemMatch: {$ne: req.body.mania && 'mania'},},},
                ]},
                {$or: [
                    {modes: {$elemMatch: {$eq: req.body.osu && 'osu'},},},
                    {modes: {$elemMatch: {$eq: req.body.taiko && 'taiko'},},},
                    {modes: {$elemMatch: {$eq: req.body.catch && 'catch'},},},
                    {modes: {$elemMatch: {$eq: req.body.mania && 'mania'},},},
                ]},]}, {}, {}, true);
    }
    if(req.body.qat){
        qat = await users.service.query(
            {$and: [
                {group: 'qat'},
                {$or: [
                    {modes: {$elemMatch: {$eq: req.body.osu && 'osu'},},},
                    {modes: {$elemMatch: {$eq: req.body.taiko && 'taiko'},},},
                    {modes: {$elemMatch: {$eq: req.body.catch && 'catch'},},},
                    {modes: {$elemMatch: {$eq: req.body.mania && 'mania'},},},
                ]},]}, {}, {}, true);
    }
    let allUsers = probationBns.concat(fullBns.concat(qat));
    
    let failed = [];
    if(req.body.excludeUsers){
        let excludeUsers =  req.body.excludeUsers.split(',');
        for (let i = 0; i < excludeUsers.length; i++) {
            let u = await users.service.query({username: new RegExp('^' + excludeUsers[i].trim() + '$', 'i')});
            if(u){
                allUsers.forEach(function(user, index) {
                    if(user.id == u.id){
                        allUsers.splice(index, 1);
                    }
                });
            }else{
                failed.push(excludeUsers[i].trim());
            }
        }
    }
    
    if(req.body.includeUsers){
        let includeUsers =  req.body.includeUsers.split(',');
        for (let i = 0; i < includeUsers.length; i++) {
            let u = await users.service.query({username: new RegExp('^' + includeUsers[i].trim() + '$', 'i')});
            if(u){
                await cycleModes(u.id, u.modes, req.body.deadline, req.body.osu, req.body.taiko, req.body.catch, req.body.mania)
            }else{
                failed.push(includeUsers[i].trim());
            }
        }
    }

    if(allUsers.length){
        for (let i = 0; i < allUsers.length; i++) {
            await cycleModes(allUsers[i].id, allUsers[i].modes, req.body.deadline, req.body.osu, req.body.taiko, req.body.catch, req.body.mania)
        }
    }
    let ers = await evalRounds.service.query({active: true}, defaultDiscussPopulate, {createdAt: 1}, true);
    res.json({ers: ers, failed: failed})
});

/* POST submit or edit eval */
router.post('/submitEval/:id', async (req, res) => {
    if(req.body.evaluationId){
        await evals.service.update(req.body.evaluationId, {behaviorComment: req.body.behaviorComment, moddingComment: req.body.moddingComment, vote: req.body.vote});
    }else{
        let ev = await evals.service.create(req.session.qatMongoId, req.body.behaviorComment, req.body.moddingComment, req.body.vote);
        await evalRounds.service.update(req.params.id, {$push: {evaluations: ev._id}});
    }
    res.json(await evalRounds.service.query({ _id: req.params.id }, defaultDiscussPopulate));
    
});

/* POST set group eval */
router.post('/setGroupEval/', async (req, res) => {
    for (let i = 0; i < req.body.checkedRounds.length; i++) {
        await evalRounds.service.update(req.body.checkedRounds[i], {discussion: true});
    }

    let a = await evalRounds.service.query({active: true}, defaultDiscussPopulate, {createdAt: 1}, true );
    res.json(a);
});

/* POST set invidivual eval */
router.post('/setIndividualEval/', async (req, res) => {
    for (let i = 0; i < req.body.checkedRounds.length; i++) {
        await evalRounds.service.update(req.body.checkedRounds[i], {discussion: false});
    }
    
    let a = await evalRounds.service.query({active: true}, defaultDiscussPopulate, {createdAt: 1}, true );
    res.json(a);
});

/* POST set invidivual eval */
router.post('/setComplete/', async (req, res) => {
    for (let i = 0; i < req.body.checkedRounds.length; i++) {
        await evalRounds.service.update(req.body.checkedRounds[i], {active: false});
    }
    
    let a = await evalRounds.service.query({active: true}, defaultDiscussPopulate, {createdAt: 1}, true );
    res.json(a);
});

module.exports = router;
