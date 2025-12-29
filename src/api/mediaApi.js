import axios from "axios"

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXEL_KEY = import.meta.env.VITE_PEXEL_KEY
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY

export async function getPhotos(query, page = 1, per_page = 20) {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, page, per_page },
        headers: {
            Authorization: `Client-ID ${UNSPLASH_KEY}`
        }
    })

    return response.data.results
}

export async function getVideos(query, page = 1, per_page = 20) {
    const response = await axios.get('https://api.pexels.com/videos/search', {
        params: { query, page, per_page },
        headers: {
            Authorization: PEXEL_KEY
        }
    })

    return response.data.videos
}

export async function getGifs(query, pos = '', per_page = 20) {
    const response = await axios.get('https://tenor.googleapis.com/v2/search', {
        params: { q: query, key: TENOR_KEY, limit: per_page, pos }
    })

    return {
        results: response.data.results,
        next: response.data.next || ''
    }
}