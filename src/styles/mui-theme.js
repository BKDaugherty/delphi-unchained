/*
    Configuration file for creating the App Theme.
*/

import {createMuiTheme} from 'material-ui/styles'

//Close to Nature
const CloseToNature = {
    primary: {
        main: '#31708E'
    },
    secondary: {
        main: '#DAAD86'
    },
    error: {
        main: '#687864'
    },
    background: {
        paper: '#F7F9FB',
        default: '#659dbd'
    },
    text: {
        primary: '#31708E',
        secondary: '#8FC1E3',
        disabled: '#FBEEC1'
    }
}

// Can use this to overwrite the theme of the app
const themeOptions = {
    palette: {
        ...CloseToNature,

        //type:'light'
        type: 'light'
    }
}

export default createMuiTheme(themeOptions)
