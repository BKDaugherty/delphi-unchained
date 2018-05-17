import AccountCircle from '@material-ui/icons/AccountCircle';

// Views
import StakerView from './../views/StakerView'
import ClaimantView from './../views/ClaimantView'
import DashboardView from './../views/DashboardView'
import ArbiterView from './../views/ArbiterView'


const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: AccountCircle,
        component: DashboardView,
        exact:true
    },

    {
        path: "/dashboard/staker",
        name: "Staker Mode",
        icon: AccountCircle,
        component: StakerView
    },
    {
        path: "/dashboard/claimant",
        name: "Claimant Mode",
        icon: AccountCircle,
        component: ClaimantView
    },
    {
        path: "/dashboard/arbiter",
        name: "Arbiter Mode",
        icon: AccountCircle,
        component: ArbiterView
    },

   
  

]

export default dashboardRoutes