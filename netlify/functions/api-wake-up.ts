import { Handler, HandlerEvent, schedule } from '@netlify/functions'
import fetch from 'node-fetch'
import { API_BASE_URL } from '~~/api'

const handler : Handler = () => {
   fetch(API_BASE_URL + '/pictures')
}

const scheduledHandler = schedule('*/10 * * * *', handler)

export default scheduledHandler