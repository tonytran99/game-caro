import React,{lazy} from 'react';
import * as links from "./constants/links";
import {PERMISSION_ADMIN, PERMISSION_USER} from "./constants/constants";
const Background = lazy(() => import("./component/Background/Background"));
const UserInfo = lazy(() => import("./component/Auth/UserInfo"));
const Chessman = lazy(() => import("./component/Chessman/Chessman"));

const routes = [
    /* Home */
    {
        path: links.LINK_BACKGROUND,
        component: () => <Background />,
        exact: true,
        permission: [PERMISSION_USER]
    },
    {
        path: links.LINK_CHESSMAN,
        component: () => <Chessman />,
        exact: true,
        permission: [PERMISSION_ADMIN, PERMISSION_USER]
    },
    {
        path: links.LINK_USER_INFO,
        component: () => <UserInfo />,
        exact: true,
        permission: [PERMISSION_USER]
    }
];

export default routes;
