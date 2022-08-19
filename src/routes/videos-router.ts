import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const videosRouter = Router({});

enum resolutions {
"P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"
}

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

const availableResolutionsValidation = body("availableResolutions").isArray()
    .isIn(["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"])
    .withMessage("wrong resolution");

const minAgeRestrictionValidation = body("minAgeRestriction")
    .isLength({min: 1, max: 18})
    .withMessage("minimum 1, maximum 18 characters");

const canBeDownloadedValidation = body("canBeDownloaded")
    .isBoolean()
    .withMessage("must be boolean");



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
    //availableResolutionsValidation,
    minAgeRestrictionValidation,
    canBeDownloadedValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const newVideoId = videosRepository.createVideo(
        req.body.title,
        req.body.author,
        req.body.canBeDownloaded,
        req.body.minAgeRestriction,
        req.body.availableResolutions
    );
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
    //availableResolutionsValidation,
    minAgeRestrictionValidation,
    canBeDownloadedValidation,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const isUpdated = videosRepository.updateVideo(
        +req.params.id,
        req.body.title,
        req.body.author,
        req.body.canBeDownloaded,
        req.body.minAgeRestriction,
        req.body.availableResolutions,
        req.body.publicationDate
    );
    if(isUpdated) {
        res.send(204);
        return;
    }

    res.send(404);
});