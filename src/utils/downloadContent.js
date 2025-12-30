export async function download(mediaUrl, extension, onProgress) {
    try {
        // Notify user download is starting
        if (onProgress) onProgress('starting')
        
        const res = await fetch(mediaUrl)
        
        if (!res.ok) throw new Error('Download failed')
        
        // Notify fetching blob
        if (onProgress) onProgress('downloading')
        
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)

        // Notify preparing download
        if (onProgress) onProgress('preparing')

        const link = document.createElement('a')
        link.href = url
        link.download = `glimpse-${Date.now()}.${extension}`
        document.body.appendChild(link) // Some browsers need this
        link.click()
        document.body.removeChild(link)
        
        // Clean up
        setTimeout(() => window.URL.revokeObjectURL(url), 100)
        
        // Notify complete
        if (onProgress) onProgress('complete')
        
        return true
    } catch (error) {
        console.error('Download error:', error)
        if (onProgress) onProgress('error')
        return false
    }
}