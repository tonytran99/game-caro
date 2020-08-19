import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import * as authActions from "../../_actions/auth";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LogoIcon from "../../images/logo.png";
import {NavLink} from "react-router-dom";
import * as links from "./../../constants/links";
import Content from "../Content";
import Footer from "../Footer";

const styles = theme => ({
    authWrapper: {

    },
    headerAuth: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 2rem',
        '& .logo': {
            height: 72,
            width: 72,
        }
    }
});

const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccess: () => false
    }
};

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: true
        };

        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {

    }

    signOut() {
        this.props.signOut();
    }

    render() {
        // const {
        //
        // } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;
        console.log(dataUserAuth);

        return (
            <div className={classes.authWrapper}>
                <div className={classes.headerAuth}>
                    <NavLink to={links.LINK_WELCOME}>
                        <img className="logo" src={LogoIcon} alt=""/>
                    </NavLink>
                </div>
                <Content>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                </Content>
                <Footer />
            </div>
        );
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth
});

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(authActions.signOut())
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (Auth);
