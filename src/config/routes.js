import Home from "../containerComponents/Home";
import Login from "../containerComponents/Login";
import Register from "../containerComponents/Register";
import UserInformation from "../containerComponents/UserInformation";
import JobSearch from "../containerComponents/JobSearch";
import ResumeBuilder from "../containerComponents/ResumeBuilder";
import CoverLetter from "../containerComponents/CoverLetter";
/*import Templates from "../containerComponents/Templates";
import Register from "../containerComponents/Register";
import AllDetails from "../containerComponents/AllDetails";*/

export const ROUTES = {
    INDEX: "/",
    BUILD: "/build",
    LOGIN: "/login",
    REGISTER: "/register",
    DETAILS: "/your-details",
    JOBS: "/jobs",
    COVER_LETTER: "/cover-letter"
}

export default [
    {
        path: ROUTES.INDEX,
        component: Home,
        header: true,
        footer: true,
        isPrivate: false,
        allCanOpen: true
    },
    {
        path: ROUTES.LOGIN,
        component: Login,
        header: true,
        footer: true,
        isPrivate: false
    },
    {
        path: ROUTES.REGISTER,
        component: Register,
        header: true,
        footer: true,
        isPrivate: false,
    },
    {
        path: ROUTES.BUILD,
        component: ResumeBuilder,
        header: true,
        footer: true,
        isPrivate: true
    },
    {
        path: ROUTES.DETAILS,
        component: UserInformation,
        header: true,
        footer: true,
        isPrivate: true
    },
    {
        path: ROUTES.JOBS,
        component: JobSearch,
        header: true,
        footer: true,
        isPrivate: true
    },
    {
        path: ROUTES.COVER_LETTER,
        component: CoverLetter,
        header: true,
        footer: true,
        isPrivate: true
    }
    /*{
      path: "/resume",
      component: Templates,
      header: true,
      footer: true,
      isPrivate: true
    },
    {
      path: "/register",
      component: Register,
      header: true,
      footer: true,
      isPrivate: false,
    },
    {
      path: "/allDetails",
      component: AllDetails,
      header: true,
      footer: true,
      isPrivate: true
    },*/
    /*{
      path: "/logout",
      condition: () => getToken(),
      privateComponent: (props) => {
        removeItem();
        window.location.href = '/';
        return <></>
      },
      fallbackRoute: '/',
      exact: true
    },*/
]
