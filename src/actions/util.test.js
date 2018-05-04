// Jest Tests!
import {addSuffix} from './util.js'

test('#addSuffix() Should return a new object, with the correct suffixes', function() {
      
    const name = "GET"
    const input_suffixes = {
        REQUEST_FAILURE : "_REQUEST_FAILED",
        REQUEST_SUCCEEDED :"_REQUEST_SUCCEEDED",
        REQUEST_INITIATED : "_REQUEST_INITIATED"
    }
    const expected = {
        REQUEST_FAILURE : "GET_REQUEST_FAILED",
        REQUEST_SUCCEEDED :"GET_REQUEST_SUCCEEDED",
        REQUEST_INITIATED : "GET_REQUEST_INITIATED"
    }
    
    const result = addSuffix(name, input_suffixes)

    expect(result).toEqual(expected)
})