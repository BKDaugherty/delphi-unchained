import createHistory from 'history/createBrowserHistory'

// Create a browser histroy
const history = createHistory({basename:process.env.PUBLIC_URL})
export default history