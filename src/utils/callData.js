import { getGifs, getPhotos, getVideos } from "../api/mediaApi"

export async function loadData(query, tabName) {
    if (tabName === 'photos') {
        return await getPhotos(query)
    } else if (tabName === 'videos') {
        return await getVideos(query)
    } else if (tabName === 'gifs') {
        return await getGifs(query)
    }
}