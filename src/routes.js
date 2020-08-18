import React,{lazy} from 'react';
import * as links from "./constants/links";
const ManagementBackground = lazy(() => import("./component/ManagementBackground/ManagementBackground"));

const routes = [
    /* Home */
    {
        path: links.LINK_MANAGEMENT_BACKGROUND,
        component: () => <ManagementBackground />,
        exact: true,
    },
];

export default routes;
