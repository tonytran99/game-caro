import React, {Suspense} from "react";
import PrivateRoute from './PrivateRoute';
import routes from "./routes";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
// import Page404 from "./theme/PageError/Page404";
import {withTranslation} from "react-i18next";
import LoadingAction from "./theme/LoadingAction";
import Page404 from "./theme/PageError/Page404";
import * as links from "./constants/links";

const styles = {
    mainContent: {
        // padding: "30px 20px",
        flex: 1,
        "&>div:first-child:last-child":{
            minHeight: "100%"
        }
    }
};

class RoutesMap extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {
            classes,
            history,
            dataUser
        } = this.props;
        const routesMap = routes.filter((route) => {
            return dataUser && (!route.permission || route.permission.includes(dataUser.permission));
        }).map((route, index)=> {
            const component = route.component;
            return <PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={component}
                history={history}
            />
        });
        return (
            <div className={classes.mainContent}>
                <Suspense fallback={<LoadingAction/>}>
                    <Switch>
                        {routesMap}
                        <Route component={Page404} match={false}/>
                        <Route component={Page404} match={false}  path={links.LINK_PAGE404}/>
                    </Switch>
                </Suspense>
            </div>
        );
    }

}

RoutesMap.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        dataUserAuth: state.authReducer.dataUserAuth,
        dataUser: state.gameReducer.dataUser,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
    withRouter
)(RoutesMap);
