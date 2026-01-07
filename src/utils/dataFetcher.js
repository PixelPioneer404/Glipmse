import { getGifs, getPhotos, getVideos } from "../api/mediaApi"

/**
 * Centralized data fetching utility that synchronizes isAdded state with collection array
 * @param {string} query - Search query
 * @param {string} type - Media type: 'photos', 'videos', or 'gifs'
 * @param {Array} collectionArray - Current collection array from Redux
 * @param {number|string} page - Page number or next token for pagination
 * @returns {Promise<Object>} - Fetched data with isAdded state synchronized
 */
export async function fetchMediaData(query, type, collectionArray, page = 1) {
    let data = []
    let nextToken = null

    try {
        if (type === 'photos') {
            data = await getPhotos(query, page)
        } else if (type === 'videos') {
            data = await getVideos(query, page)
        } else if (type === 'gifs') {
            const result = await getGifs(query, page)
            data = result.results
            nextToken = result.next
        }

        // Create a Set of collection IDs for O(1) lookup
        const collectionIds = new Set(collectionArray.map(item => item.id))

        // Map data and synchronize isAdded state with collection
        const processedData = data.map((item) => {
            // Check if this item is in the collection
            const isInCollection = collectionIds.has(item.id)
            
            return {
                ...item,
                isAdded: isInCollection,
                type: type
            }
        })

        return {
            data: processedData,
            nextToken: nextToken
        }
    } catch (error) {
        console.error(`Error fetching ${type}:`, error)
        throw error
    }
}

/**
 * Process existing result array to sync with collection state
 * Useful when collection changes and we need to update existing results
 * @param {Array} resultArray - Current result array
 * @param {Array} collectionArray - Current collection array from Redux
 * @returns {Array} - Result array with synchronized isAdded state
 */
export function syncResultWithCollection(resultArray, collectionArray) {
    const collectionIds = new Set(collectionArray.map(item => item.id))
    
    return resultArray.map(item => ({
        ...item,
        isAdded: collectionIds.has(item.id)
    }))
}
