import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const videosRouter = Router({});

const titleValidation = body('title')
    .isLength({max: 40})
    .withMessage("maximum 40 characters")
    .notEmpty()
    .withMessage("must not be empty");

const authorValidation = body('author')
    .isLength({max: 20})
    .withMessage("maximum 20 characters")
    .notEmpty()
    .withMessage("must not be empty");


videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videosRepository.findVideos());
});
videosRouter.get('/:id', (req: Request, res: Response) => {

    const [video] = videosRepository.findVideoById(+req.params.id);

    if(video) {
        res.send(video);
        return;
    }

    res.send(404);
});

videosRouter.delete('/', (req: Request, res: Response) => {
    res.send(404);
});
videosRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = videosRepository.deleteVideo(+req.params.id)
    if(isDeleted) {
        res.send(204);
        return;
    }

    res.send(404);
});

videosRouter.post('/',
    titleValidation,
    authorValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newVideoId = videosRepository.createVideo(req.body.title, req.body.author);
    const [testNewVideo] = videosRepository.findVideoById(newVideoId);
    if(testNewVideo) {
        res.status(201).send(testNewVideo);
        return;
    }

    res.send(400);
});

videosRouter.put('/', (req: Request, res: Response) => {
        res.send(404);
})
videosRouter.put('/:id',
    titleValidation,
    authorValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title, req.body.author);
    if(isUpdated) {
        res.send(204);
        return;
    }

    res.send(404);
});