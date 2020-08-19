import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import * as links from "./constants/links"

const PublicRoute = ({component: Component,path, ...rest}) => {
    return (
        <Route {...rest} render={props => {
            if (!rest.dataUserAuth){
                return <Component {...props} />;
            }
            return <Redirect to={links.LINK_WELCOME}/>;
        }} />
    );
};
const mapStateToProps = (state, props) => {
    return {
        dataUserAuth: state.authReducer.dataUserAuth
    }
};
export default connect(mapStateToProps)(PublicRoute);

