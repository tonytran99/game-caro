import React, {Suspense} from 'react';
import './App.css';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"
import {I18nextProvider} from "react-i18next";
import rootReducer from "./_reducers";
// import i18n from './i18n';
import { createStore, applyMiddleware } from "redux";
import './css/app.scss';
import reduxThunk from "redux-thunk";

import * as links from "./constants/links";
import Welcome from "./component/Welcome/Welcome";
import * as authActions from "./_actions/auth";
import ManagementBackground from "./component/ManagementBackground/Background";
import PrivateRoute from "./PrivateRoute";
import LoadingAction from "./theme/LoadingAction";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import RoutesMap from "./routesMap";
import firebase from "./firebase";
import PublicRoute from "./PublicRoute";
import Auth from "./component/Auth/Auth";
const styles = theme => ({
    legalResponsibleBlock: {
        backgroundColor: '#e0e7f2'
    }
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
);

// firebase.initializeApp({
//     apiKey: 'AIzaSyBCUeyx_VUdt7CyTFAX5JoSJmpeNqRSItg',
//     authDomain: 'game-caro-a57c5.firebaseapp.com'
// });

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkLogin: false
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.setDataUser(user);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.checkLogin && this.props.dataUser) {

        }
    }

    render() {
        const {
            dataUser
        } = this.props;
        return (
            <div style={{
                backgroundColor: '#0a676b'
            }}>
            <Router>
                <I18nextProvider
                    // i18n={ i18n }
                >
                    <Suspense fallback={<LoadingAction/>}>
                        <Switch>
                            <Route
                                path={links.LINK_WELCOME}
                                exact={true}
                            >
                                <Welcome />
                            </Route>
                            <PublicRoute
                                path={links.LINK_AUTH}
                                component={() => <Auth />}
                                exact={true}
                            />
                            <RoutesMap />
                        </Switch>
                    </Suspense>
                </I18nextProvider>
            </Router>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    dataUser: state.authReducer.dataUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        setDataUser: (dataUser) => dispatch(authActions.setDataUser(dataUser)),
        // saveDataUser: (dataUser) => dispatch(authActions.saveDataUser(dataUser))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (Layout);
