export class ApiError implements Error {
    name : string = 'ApiError'
    message : string
    statusCode : number

    constructor(statusCode : number, message? : string) {
        this.message = message || 'Failed to send request to the server'
        this.statusCode = statusCode
    }
}

export interface Account {
    id : number
    username : string,
    avatarUrl : string
}
export interface ExtendedAccountInfo extends Account {
    collections : CollectionItem[],
    publishedPictures : FeedPicture[]
}

export type DropDownItem = {
    title : string,
    value : string,
    iconFilename : string,
    iconAltText : string
}


export interface Picture {
    id : number,
    title : string,
    description : string,
    tags : string[],
    imageUrl : string,
    comments : Comment[]
    author : Account
}
export type FeedPicture = Omit<Picture, 'comments'>
export type PictureForm = Omit<Picture, 'id' | 'comments' | 'author'>

export interface Comment {
    id : number,
    text : string,
    creationDate : string
    authorAccount : Account
}

export interface Collection {
    id : number,
    name : string,
    thumbnailUrl : string | null,
    savedPictures : Picture[]
}
export type CollectionItem = Omit<Collection, 'savedPictures'>
export type CollectionForm = Omit<Collection, 'id' | 'savedPictures'>