import {LOGIN_ROUTE, PROFILE_ROUTE} from "./utils/consts";
import Login from "./components/Login";
import Profile from "./components/Profile";

export const publikRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    }
]

export const privateRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    }
]