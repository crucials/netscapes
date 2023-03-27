import { Account, ApiError, CollectionForm, ExtendedAccountInfo, 
    FeedPicture, Picture, PictureForm } from './types'


export const API_BASE_URL = 'https://netscapes-rest-api.onrender.com'


export async function logInForJwt(username : string, password : string) {
    const response = await fetch(API_BASE_URL + '/auth/log-in', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    })
    await throwIfError(response)

    return await response.text()
}


export async function signUpForJwt(username : string, password : string) {
    const response = await fetch(API_BASE_URL + '/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    })
    await throwIfError(response)

    return await logInForJwt(username, password)
}


export async function getPictures(accessToken? : string) : Promise<Picture[]> {
    const response = await fetch(API_BASE_URL + '/pictures', {
        headers: accessToken ? { 'Authorization': 'Bearer ' + accessToken } : {}
    })
    await throwIfError(response)

    return await response.json()
}


export async function getPictureById(id : number, accessToken? : string) {
    const response = await fetch(`${API_BASE_URL}/pictures/${id}`, {
        headers: accessToken ? { 'Authorization': 'Bearer ' + accessToken } : {}
    })
    await throwIfError(response)

    return await response.json()
}   


export async function getCurrentAccount(accessToken : string) : Promise<ExtendedAccountInfo> {
    const response = await fetch(API_BASE_URL + '/accounts/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    })
    await throwIfError(response)

    return await response.json()
}


export async function getAccount(accountId : number) : Promise<Account> {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`)
    await throwIfError(response)

    return await response.json()
}


export async function setAvatar(accessToken : string, avatarUrl : string) {
    const response = await fetch(API_BASE_URL + '/accounts/me/avatar?avatar_url=' + avatarUrl, {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
        }
    })
    await throwIfError(response)
}


export async function addComment(accessToken : string, text : string, targetPictureId : number) {
    const response = await fetch(API_BASE_URL + `/pictures/${targetPictureId}/comments`, {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: `{ "text": "${text}" }`
    })
    await throwIfError(response)
}


export async function searchPictures(query : String) : Promise<FeedPicture[]> {
    const response = await fetch(API_BASE_URL + `/pictures/search?query=${query}`)
    await throwIfError(response)

    return await response.json()
}


export async function addCollection(accessToken : string, collection: CollectionForm) {
    const response = await fetch(`${API_BASE_URL}/collections`, {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(collection)
    })
    await throwIfError(response)
}


export async function addPictureToCollection(accessToken : string, pictureId : number, collectionId : number) {
    const buildedUrl = `${API_BASE_URL}/collections/${collectionId}?picture_id=${pictureId}`

    const response = await fetch(buildedUrl, {
        method: 'PUT',
        headers: { 
            'Authorization': 'Bearer ' + accessToken
        }
    })
    await throwIfError(response)
}


export async function addPicture(accessToken : string, picture : PictureForm) : Promise<number> {
    const response = await fetch(`${API_BASE_URL}/pictures`, {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(picture)
    })
    await throwIfError(response)

    const { id } = await response.json()
    return id
}


export async function deletePictureById(accessToken : string, id : number) {
    const response = await fetch(API_BASE_URL + '/pictures/' + id, {
        method: 'DELETE',
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
        }
    })
    await throwIfError(response)
}



export async function isTokenValid(accessToken : string) {
    try {
        await getCurrentAccount(accessToken)
        return true
    }
    catch(error) {
        return false
    }
}


async function throwIfError(response : Response) {
    if(!response.ok) {
        throw new ApiError(response.status, await response.text())
    }
}