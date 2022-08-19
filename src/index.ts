import express from 'express';
import bodyParser from 'body-parser';
import {inputValidationMiddleware} from "./middlewares/input-validation-middleware";
import {videosRouter} from "./routes/videos-router";
import {testingRouter} from "./routes/testing-router";

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use(inputValidationMiddleware)
app.use('/videos', videosRouter)

app.use('/testing', testingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});