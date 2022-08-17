const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
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

    updateVideo(id: number, title: string, author: string = "it-incubator.eu") {
        const video = videos.find(v => v.id === id);
        if(video) {
            video.title = title;
            video.author = author;
            return true;
        }

        return false;
    },

    createVideo(title: string, author: string = "it-incubator.eu") {
        const newVideo = {
            id: +(new Date()),
            title,
            author
        };
        videos.push(newVideo);
        return newVideo.id;
    }
}