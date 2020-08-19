import React,{lazy} from 'react';
import * as links from "./constants/links";
const ManagementBackground = lazy(() => import("./component/Background/Background"));
const UserInfo = lazy(() => import("./component/Auth/UserInfo"));

const routes = [
    /* Home */
    {
        path: links.LINK_MANAGEMENT_BACKGROUND,
        component: () => <ManagementBackground />,
        exact: true,
    },
    {
        path: links.LINK_USER_INFO,
        component: () => <UserInfo />,
        exact: true,
    }
];

export default routes;
