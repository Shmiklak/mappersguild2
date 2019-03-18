const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config.json');
const hbs = require('hbs');

const indexRouter = require('./routes/index');
const faqRouter = require('./routes/faq');
const beatmapsRouter = require('./routes/beatmaps');
const beatmapsArchiveRouter = require('./routes/beatmapsarchive');
const usersRouter = require('./routes/users');
const questsRouter = require('./routes/quests');
const questsArchiveRouter = require('./routes/questsarchive');
const partiesRouter = require('./routes/parties');
const logsRouter = require('./routes/logs');
const notificationsRouter = require('./routes/notifications');
const adminsRouter = require('./routes/admin');
//qat
const qatIndexRouter = require('./QAT/routes/index');
const bnAppRouter = require('./QAT/routes/bnApp');
const reportsRouter = require('./QAT/routes/reports');
const appEvalRouter = require('./QAT/routes/appEval');
const bnEvalRouter = require('./QAT/routes/bnEval');
const dataCollectionRouter = require('./QAT/routes/dataCollection');
const evalArchiveRouter = require('./QAT/routes/evalArchive');
const manageReportsRouter = require('./QAT/routes/manageReports');
const qatUsersRouter = require('./QAT/routes/qatUsers');
const vetoesRouter = require('./QAT/routes/vetoes');
const testSubmissionRouter = require('./QAT/routes/testSubmission');

const logs = require('./models/log');

const app = express();

// view engine setup
app.set('views', [__dirname + '/views', __dirname + '/QAT/views']);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'QAT/public')));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

mongoose.connect(config.connection, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected');
});
app.use(
    session({
        secret: config.session,
        store: new MongoStore({ mongooseConnection: db }),
        resave: false,
        saveUninitialized: false,
    })
);

app.use('/', indexRouter);
app.use('/faq', faqRouter);
app.use('/beatmaps', beatmapsRouter);
app.use('/beatmapsarchive', beatmapsArchiveRouter);
app.use('/users', usersRouter);
app.use('/quests', questsRouter);
app.use('/questsarchive', questsArchiveRouter);
app.use('/parties', partiesRouter);
app.use('/logs', logsRouter);
app.use('/notifications', notificationsRouter);
app.use('/admin', adminsRouter);

//qat db
const qatdb = mongoose.createConnection(config.qat.connection, { useNewUrlParser: true });
qatdb.on('error', console.error.bind(console, 'qatdb connection error:'));
qatdb.once('open', function() {
    console.log('qatdb connected');
});

//qat routes
app.use('/qat', qatIndexRouter);
app.use('/qat/bnApps', bnAppRouter);
app.use('/qat/reports', reportsRouter);
app.use('/qat/appEval', appEvalRouter);
app.use('/qat/bnEval', bnEvalRouter);
app.use('/qat/dataCollection', dataCollectionRouter);
app.use('/qat/evalArchive', evalArchiveRouter);
app.use('/qat/manageReports', manageReportsRouter);
app.use('/qat/qatusers', qatUsersRouter);
app.use('/qat/vetoes', vetoesRouter);
app.use('/qat/testSubmissionRouter', vetoesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    if (createError(404)) {
        res.redirect('/');
    }
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    logs.service.create(req.session.mongoId || null, `${req.session.osuId} - ${err}`, null, 'error');

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//handlebar helper
hbs.registerHelper('shortDate', function(date) {
    return date.toString().slice(4, 24);
});

hbs.registerHelper('shortAction', function(action) {
    if(action.length > 120){
        return action.toString().slice(0, 120) + "...";
    }else{
        return action;
    }
    
});

module.exports = app;
