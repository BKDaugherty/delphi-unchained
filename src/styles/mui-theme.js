/*
    Configuration file for creating the App Theme.
*/

import { createMuiTheme, } from 'material-ui/styles'

//Earthy
const GOLD = "#8D8741"
const LIGHTBLUE="#659DBD"
const SALMON = "#DAAD86"
const BROWN = "#BC986A"
const FADEDYELLOW="#FBEEC1"

//Close to Nature
const CloseToNature = {
    primary:{
        main:"#31708E"
    },
    secondary:{
        main:"#DAAD86"
    },
    error:{
        main:'#687864'
    },
    background:{
        paper:'#F7F9FB',
        default:'#659dbd'
    },
    text:{
        primary:'#31708E',
        secondary:'#8FC1E3',
        disabled:'#FBEEC1',
    }
}


// Can use this to overwrite the theme of the app
const themeOptions = {
    palette:{
       ...CloseToNature,

        //type:'light'
        type:'light'
    },
   
}

// typography:createTypography((createPalette(), {
//     fontFamily: '"PT Mono", "PT Sans"',
//   }))

export default createMuiTheme(themeOptions)