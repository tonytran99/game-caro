import React from 'react';
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
import { Route } from 'react-router-dom';
import reduxThunk from "redux-thunk";

import * as links from "./constants/links";
import Welcome from "./component/Welcome/Welcome";
import firebase from "firebase";
import * as authActions from "./_actions/auth";
import ManagementBackground from "./component/ManagementBackground/ManagementBackground";
const styles = theme => ({
    legalResponsibleBlock: {
        backgroundColor: '#e0e7f2'
    }
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
);

firebase.initializeApp({
    apiKey: 'AIzaSyBCUeyx_VUdt7CyTFAX5JoSJmpeNqRSItg',
    authDomain: 'game-caro-a57c5.firebaseapp.com'
});

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.setIsSignedIn(!!user);
        })
    }

    render() {
        return (
            <Router>
                <I18nextProvider
                    // i18n={ i18n }
                >
                    <Route
                        path={links.LINK_WELCOME}
                        exact={true}
                    >
                        <Welcome />
                    </Route>
                    <Route
                        path={links.LINK_MANAGEMENT_BACKGROUND}
                        exact={true}
                    >
                        <ManagementBackground />
                    </Route>
                </I18nextProvider>
            </Router>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isSignedIn: state.authReducer.isSignedIn
});

const mapDispatchToProps = (dispatch) => {
    return {
        setIsSignedIn: (isSignedIn) => dispatch(authActions.setIsSignedIn(isSignedIn))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (Layout);
