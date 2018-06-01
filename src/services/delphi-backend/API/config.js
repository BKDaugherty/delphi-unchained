/*
    Defines constants for communicating with the API service
*/

// Use an empty string because of webpack proxy for local dev
export const BASEURL = process.env.NODE_ENV === 'production' ? 
     process.env.REACT_APP_DELPHI_API_URL : '' 
// process.env.REACT_APP_DELPHI_API_URL
// Defines the endpoints of the API that we can access
export const ENDPOINTS = {
    GETSTAKE : address => `/stake/${address}`
}
