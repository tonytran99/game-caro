import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import * as links from "./constants/links"
import ConfirmRegistration from "./components/Auth/ConfirmRegistration";
import Index from "./components/Client/Index";

const PublicRoute = ({component: Component,path, ...rest}) => {
    return (
        <Route {...rest} render={props => {
            if (!rest.userData){
                return <Component {...props} />;
            }
            return (path === links.LINK_WELCOME)  ?  <Index {...props} /> : <Redirect to={links.HOME}/>;
        }} />
    );
};
const mapStateToProps = (state, props) => {
    return {
        userData: state.authReducer.user
    }
};
export default connect(mapStateToProps)(PublicRoute);

