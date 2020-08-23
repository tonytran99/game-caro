import React, {lazy, Suspense} from 'react';
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
import * as authActions from "./_actions/auth";
import * as gameActions from "./_actions/game";
import LoadingAction from "./theme/LoadingAction";
import { Route, Switch} from "react-router-dom";
import RoutesMap from "./routesMap";
import firebase from "./firebase";
import PublicRoute from "./PublicRoute";
import Auth from "./component/Auth/Auth";
import {PERMISSION_USER} from "./constants/constants";
import ChatBoard from "./theme/ChatBoard";
const styles = theme => ({
    legalResponsibleBlock: {
        backgroundColor: '#e0e7f2'
    }
});
const Welcome = lazy(() => import("./component/Welcome/Welcome"));
const TrainingWithAI = lazy(() => import("./component/Game/TrainingWithAI"));
const TrainingWithYourself = lazy(() => import("./component/Game/TrainingWithYourself"));

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
            if (user && user.uid) {
                this.props.showDataUser(user.uid);
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            dataUserAuth
        } = this.props;
        if (!this.state.checkLogin && dataUserAuth) {
            firebase.database().ref(`users/${dataUserAuth.uid}`).once("value", snapshot => {
                if (!snapshot.exists()){
                    this.props.saveDataUser(dataUserAuth.uid, {
                        userId: dataUserAuth.uid,
                        email: dataUserAuth.email,
                        avatarUrl: dataUserAuth.photoURL,
                        phoneNumber: dataUserAuth.phoneNumber,
                        displayName: dataUserAuth.displayName,
                        permission: PERMISSION_USER
                    });
                }
            });

        }
    }

    render() {
        const {
            dataUserAuth,
            dataUser
        } = this.props;
        return (
            <div style={
                dataUser && dataUser.background && dataUser.background.backgroundUrl ? {
                    backgroundImage: `url('${dataUser.background.backgroundUrl}')`,

            } : {
                    backgroundColor: '#0a676b'
                }
            }>
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
                                {/*<ChatBoard />*/}
                            </Route>
                            <Route
                                path={links.LINK_TRAINING_WITH_AI}
                                exact={true}
                            >
                                <TrainingWithAI />
                            </Route>
                            <Route
                                path={links.LINK_TRAINING_WITH_YOURSELF}
                                exact={true}
                            >
                                <TrainingWithYourself />
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
    dataUserAuth: state.authReducer.dataUserAuth,
    dataUser: state.gameReducer.dataUser,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setDataUser: (dataUserAuth) => dispatch(authActions.setDataUser(dataUserAuth)),
        saveDataUser: (userId, dataUser) => dispatch(gameActions.saveDataUser(userId, dataUser)),
        showDataUser: (userId) => dispatch(gameActions.showDataUser(userId)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (Layout);
