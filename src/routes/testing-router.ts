import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";

export const testingRouter = Router({});

testingRouter.delete('/all-data', (req: Request, res: Response) => {
    videosRepository.deleteAllVideo();
    res.send(204);
});
