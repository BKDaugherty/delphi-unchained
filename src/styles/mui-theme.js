import { createMuiTheme } from 'material-ui/styles';

// Can use this to overwrite the theme of the app
const themeOptions = {
    palette:{
        type:'light'
        //type:'dark'
    }
}

export default createMuiTheme(themeOptions)