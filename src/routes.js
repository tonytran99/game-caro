import React,{lazy} from 'react';
import * as links from "./constants/links";
import {PERMISSION_ADMIN, PERMISSION_USER} from "./constants/constants";
const Background = lazy(() => import("./component/Background/Background"));
const UserInfo = lazy(() => import("./component/Auth/UserInfo"));
const Chessman = lazy(() => import("./component/Chessman/Chessman"));
const ChessBoard = lazy(() => import("./component/Game/ChessBoard"));
const ChatPage = lazy(() => import("./component/Chat/ChatPage"));
const ChatBox = lazy(() => import("./component/Chat/ChatBox"));
const ListChessBoard = lazy(() => import("./component/Game/ListChessBoard"));

const routes = [
    /* Home */
    {
        path: links.LINK_BACKGROUND,
        component: () => <Background />,
        exact: true,
        permission: [PERMISSION_ADMIN, PERMISSION_USER]
    },
    {
        path: links.LINK_CHESSMAN,
        component: () => <Chessman />,
        exact: true,
        permission: [PERMISSION_ADMIN]
    },
    {
        path: links.LINK_USER_INFO,
        component: () => <UserInfo />,
        exact: true,
        permission: [PERMISSION_ADMIN, PERMISSION_USER]
    },
    {
        path: links.LINK_CHAT_PAGE,
        component: () => <ChatPage />,
        exact: true,
        permission: [PERMISSION_ADMIN, PERMISSION_USER]
    },
    {
        path: links.LINK_CHAT_BOX,
        component: ({match}) => <ChatBox match={match}/>,
        exact: true,
        permission: [PERMISSION_ADMIN, PERMISSION_USER]
    },
    {
        path: links.LINK_CHESS_BOARD,
        component: ({match}) => <ChessBoard match={match}/>,
        exact: true,
        permission: [PERMISSION_ADMIN, PERMISSION_USER]
    },
    {
        path: links.LINK_LIST_CHESS_BOARD,
        component: () => <ListChessBoard />,
        exact: true,
        permission: [PERMISSION_ADMIN, PERMISSION_USER]
    }
];
export default routes;
