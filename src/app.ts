import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import createError from 'http-errors';
import { Request, Response } from 'express'
import { connectDB } from './config/connectDB';
import IndexRoute from './routes/index';
import expressLayouts from 'express-ejs-layouts';


//Init
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// view engine setup
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/main');
// parse application/json
app.use(bodyParser.json());
connectDB()


//config Routes
app.use('/', IndexRoute)
// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: any) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render( err.message);
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
