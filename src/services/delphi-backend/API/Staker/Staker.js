/*
    Holds the JavaScript SDK of interacting with the Delphi API Resource "Stake"
*/

import {ENDPOINTS, BASEURL } from './../config'

const GetStakerStakes = async (address) => {
    try {
        // Proxy Server means we don't need to specify API url or endpoint.
        // Check Package.json for configuration
        let request_url = `${BASEURL}${ENDPOINTS.GETSTAKER}`
        // console.log("REQUESTURL:", request_url)
        const StakerStakes = await fetch(request_url)
        // console.log(stakeInfo)
        // console.log("RECEIVED RESPONSE", stakeInfo.body)
        const StakerStakesJSON = await stakeInfo.json()

        return StakerStakesJSON.data
    } catch (error) {
        console.error(error)
    }
}

export default GetStakerStakes
