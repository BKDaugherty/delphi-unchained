// Curried function that accepts two addresses and checks if they
// are the same
export const sameAddress = addr1 => addr2 => {
    if(addr1 && addr2)
        return addr1.toLowerCase() === addr2.toLowerCase()
    else 
        return false
}

