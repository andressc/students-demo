import {Request, Response, Router} from "express";

export const videosRouter = Router({})

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
];

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videos);
});
videosRouter.get('/:videoId', (req: Request, res: Response) => {
    res.status(400);
    const id = +req.params.videoId;
    const video = videos.filter(v => v.id === id);

    if(video.length) {
        res.send(video);
    } else {
        res.send(404);
    }
});