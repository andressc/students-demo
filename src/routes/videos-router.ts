import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

enum Resolutions {
    "P144" = 1,
    "P240",
    "P360",
    "P480",
    "P720",
    "P1080",
    "P1440",
    "P2160"
}

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

const availableResolutionsValidation = body("availableResolutions")
    .custom((value, { req }) => {

        for(let i = 0; i < value.length; i++)
        {
            if(!Resolutions[value[i]]) {
                return false
            }
        }

        return true;
    })
    .withMessage("wrong resolution");

const minAgeRestrictionValidation = body("minAgeRestriction")
    .isInt({ min: 1, max: 18 })
    .withMessage("must be number 1-18")
    .optional({nullable: true})
    .withMessage("not null or number");

const canBeDownloadedValidation = body("canBeDownloaded")
    .isBoolean()
    .withMessage("must be boolean");

const publicationDateValidation = body("publicationDate")
    .matches(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
    .withMessage("date is incorrect")



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
    availableResolutionsValidation,
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
    availableResolutionsValidation,
    minAgeRestrictionValidation,
    canBeDownloadedValidation,
    publicationDateValidation,
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