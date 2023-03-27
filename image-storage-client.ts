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

    async upload(image : File) : Promise<string> {
        if(image.type.split('/')[0] != 'image') {
            throw new ImageStorageClientError('File must be an image')
        }

        const formData = new FormData()
        formData.set('image', image)

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