import { Handler, HandlerEvent, HandlerContext, schedule } from '@netlify/functions'
import fetch from 'node-fetch'
import { API_BASE_URL } from '~~/api'

const handler : Handler = async (event: HandlerEvent, context: HandlerContext) => {
   await fetch(API_BASE_URL + '/pictures')

   return {
      statusCode: 200,
   }
}

const scheduledHandler = schedule('*/10 * * * *', handler)

export { scheduledHandler }