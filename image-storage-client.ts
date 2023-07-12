import Compressor from 'compressorjs'

export class ImageStorageClientError implements Error {
    name: string = 'ImageStorageClientError'
    message: string

    constructor(message : string) {
        this.message = message
    }
}

export class ImageStorageClient {
    private readonly IMAGE_STORAGE_URL : string = 'https://api.imgbb.com/1/upload'
    private key : string

    constructor(key : string) {
        this.key = key
    }

    async upload(image : Blob) : Promise<string> {
        if(image.type.split('/')[0] != 'image') {
            throw new ImageStorageClientError('File must be an image')
        }
        
        let compressedImage : Blob
        try {
            compressedImage = await new Promise<Blob>((resolve, reject) => {
                new Compressor(image, {
                    quality: 0.6,
                    maxWidth: 2050,
        
                    async success(compressedImage) {
                        resolve(compressedImage)
                    },
        
                    error(error) {
                        reject(error)
                    }
                })
            })
        }
        catch(error) { 
            throw new ImageStorageClientError('Something went wrong while processing your image. Perhaps'
                + ' it is broken or has unsupported format')
        }

        const formData = new FormData()
        formData.set('image', compressedImage)
    
        const response = await fetch(`${this.IMAGE_STORAGE_URL}?key=${this.key}`, {
            method: 'POST',
            body: formData
        })
        if(!response.ok) {
            throw new ImageStorageClientError('Failed to upload image. Check your image isn\'t broken or try again later')
        }
    
        return (await response.json()).data.url
    }
}