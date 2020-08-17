import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import * as authActions from "../../_actions/auth";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const styles = theme => ({
    authBlockWrapper: {

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

class AuthBlock extends React.Component {

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
            isSignedIn
        } = this.props;
        console.log(isSignedIn);

        return (
            <div className={classes.authBlockWrapper}>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        );
    }
}

AuthBlock.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    isSignedIn: state.authReducer.isSignedIn
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
) (AuthBlock);
