import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import {productsRouter} from "./routes/products-router";

const app = express();
const port = process.env.PORT || 3000;

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use('/products', productsRouter)
app.use('/videos', productsRouter)
app.get('/', (req: Request, res: Response) => {
    let helloMessage = 'Hello World!3333';
    res.send(helloMessage);
});

let requestCounter = 0;
const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++;
    next();
}
const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blabla = "hello";
    next();
}
const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === "123") {
        next();
    } else {
        res.send(401)
    }
}

app.use(requestCounterMiddleware)
app.use(blablaMiddleware)
app.use(authGuardMiddleware)

app.get('/users', (req: Request, res: Response) => {
    // @ts-ignore
    const blabla = req.blabla
    res.send({value: blabla + "!!!!!" + requestCounter})
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});