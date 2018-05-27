/*
    Configuration file for creating the App Theme.
*/

import { createMuiTheme, } from 'material-ui/styles'


const GOLD = "#8D8741"
const LIGHTBLUE="#659DBD"
const SALMON = "#DAAD86"
const BROWN = "#BC986A"
const FADEDYELLOW="#FBEEC1"


// Can use this to overwrite the theme of the app
const themeOptions = {
    palette:{
        primary:{
            main:GOLD
        },
        secondary:{
            main:LIGHTBLUE
        },
        
        type:'light'
        //type:'dark'
    },
   
}

// typography:createTypography((createPalette(), {
//     fontFamily: '"PT Mono", "PT Sans"',
//   }))

export default createMuiTheme(themeOptions)