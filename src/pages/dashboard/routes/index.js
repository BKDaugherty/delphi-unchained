/*
    Defines the configuration files for our dashboard. 
    The exported JSON array will specify the structure of 
    the resulting dashboard
*/

import DashboardIcon from '@material-ui/icons/Dashboard'
import GavelIcon from '@material-ui/icons/Gavel'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
// Views
import StakerView from './../views/StakerView'
import ClaimantView from './../views/ClaimantView'
import DashboardView from './../views/DashboardView'
import ArbiterView from './../views/ArbiterView'

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: DashboardIcon,
        component: DashboardView,
        exact: true
    },

    {
        path: '/dashboard/staker',
        name: 'Stake',
        icon: VerifiedUserIcon,
        component: StakerView
    },
    {
        path: '/dashboard/claimant',
        name: 'Claim',
        icon: ReportProblemIcon,
        component: ClaimantView
    },
    {
        path: '/dashboard/arbiter',
        name: 'Arbit',
        icon: GavelIcon,
        component: ArbiterView
    }
]

export default dashboardRoutes
