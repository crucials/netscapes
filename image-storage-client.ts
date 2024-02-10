import imageCompression from 'browser-image-compression'

export class ImageStorageClientError implements Error {
    name: string = 'ImageStorageClientError'
    message: string

    constructor(message : string) {
        this.message = message
    }
}

export class ImageStorageClient {
    private readonly IMAGE_STORAGE_URL : string = 'https://imgbb.com/json'

    async upload(image : File) : Promise<string> {
        const UPLOAD_ERROR_MESSAGE = 'Failed to upload image. Check your image ' +
            'isn\'t broken or try again later'

        if(image.type.split('/')[0] != 'image') {
            throw new ImageStorageClientError('File must be an image')
        }
        
        let compressedImage : Blob
        try {
            compressedImage = await imageCompression(image, {
                maxWidthOrHeight: 1280,
                maxSizeMB: 1
            })
        }
        catch(error) { 
            throw new ImageStorageClientError('Something went wrong while processing your image. Perhaps'
                + ' it is broken or has unsupported format')
        }
        
        const formData = new FormData()
        formData.set('source', compressedImage)
        formData.set('type', 'file')
        formData.set('action', 'upload')
    
        const response = await fetch(this.IMAGE_STORAGE_URL, {
            method: 'POST',
            body: formData
        })
        if(!response.ok) {    
            throw new ImageStorageClientError(UPLOAD_ERROR_MESSAGE)
        }

        const responseData = await response.json()
        if(!responseData.image?.url) {
            throw new ImageStorageClientError(UPLOAD_ERROR_MESSAGE)
        }
        
        return responseData.image.url
    }
}