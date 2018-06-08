/**
 * Running Get Requests for all of these with a single parameter...
 * It's just asking to get functionalized
 * 
 */

import {BASEURL} from './config'

// Takes an endpoint and returns a function that accesses the API
export const DelphiAPIGetRequest = (endpoint) => async (address) => {
    try {
        // Create the URL that we would like to access
        const request_url = `${BASEURL}${endpoint}/${address}`
        console.log(request_url)
        // Make the request -- Always get in this case
        const result = await fetch(request_url)

        // Get the JSON Result
        const jsonResult = await result.json()

        // Return the Data object
        return jsonResult.data
    } catch (error) {
        // TODO: Perform Error handling! (404 on no stake?)
        console.error(error)
    }
}