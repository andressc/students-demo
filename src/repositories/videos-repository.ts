import {addDays} from "../helpers/addDays";

let videos = [
    {
        id: 1,
        title: 'About JS - 01',
        author: 'it-incubator.eu',
        canBeDownloaded: true,
        minAgeRestriction: 2,
        availableResolutions: ["P144","Invalid","P720"],
        createdAt: "2022-06-19T18:33:52.645Z",
        publicationDate: "2022-08-19T18:33:52.645Z"
    },
    {
        id: 2,
        title: 'About JS - 02',
        author: 'it-incubator.eu',
        canBeDownloaded: true,
        minAgeRestriction: 34,
        availableResolutions: ["P144","Invalid","P720"],
        createdAt: "2022-07-19T18:33:52.645Z",
        publicationDate: "2022-08-19T18:33:52.645Z"
    },
    {
        id: 3,
        title: 'About JS - 03',
        author: 'it-incubator.eu',
        canBeDownloaded: true,
        minAgeRestriction: null,
        availableResolutions: ["P144","Invalid","P720"],
        createdAt: "2022-09-19T18:33:52.645Z",
        publicationDate: "2022-08-19T18:33:52.645Z"
    },

];

export const videosRepository = {
    findVideos() {
        return videos;
    },

    findVideoById(id: number) {
        return videos.filter(v => v.id === id);
    },

    deleteVideo(id: number) {
        for(let i=0; i< videos.length; i++) {
            if(videos[i].id === id) {
                videos.splice(i, 1);
                return true;
            }
        }

        return false;
    },

    deleteAllVideo() {
        videos.length = 0
        return true;
    },

    updateVideo(
        id: number,
        title: string,
        author: string,
        canBeDownloaded: boolean = false,
        minAgeRestriction: number | null = null,
        availableResolutions: [],
        //createdAt: string = new Date().toISOString(),
        //publicationDate: string = new Date().toISOString(),
    ) {
        const publicationDate = new Date().toISOString()
        const createdAt = new Date().toISOString()

        const video = videos.find(v => v.id === id);
        if(video) {
            video.title = title;
            video.author = author;
            video.canBeDownloaded = canBeDownloaded;
            video.minAgeRestriction = minAgeRestriction;
            video.availableResolutions = availableResolutions;
            video.createdAt = createdAt;
            video.publicationDate = publicationDate;

            return true;
        }

        return false;
    },

    createVideo(
        title: string,
        author: string,
        canBeDownloaded: boolean = false,
        minAgeRestriction: number | null = null,
        availableResolutions: [],
        createdAt: string = new Date().toISOString(),
        publicationDate: string = new Date().toISOString(),
    ) {
        const newVideo = {
            id: +(new Date()),
            title,
            author,
            canBeDownloaded,
            minAgeRestriction,
            createdAt,
            publicationDate,
            availableResolutions
        };
        videos.push(newVideo);
        return newVideo.id;
    }
}