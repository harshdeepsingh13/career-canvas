import React from "react";

const Home = React.lazy(() => import("../containerComponents/Home"));
const Login = React.lazy(() => import("../containerComponents/Login"));
const Register = React.lazy(() => import("../containerComponents/Register"));
const UserInformation = React.lazy(() => import("../containerComponents/UserInformation"));
const JobSearch = React.lazy(() => import("../containerComponents/JobSearch"));
const ResumeBuilder = React.lazy(() => import("../containerComponents/ResumeBuilder"));
const CoverLetter = React.lazy(() => import("../containerComponents/CoverLetter"));
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
