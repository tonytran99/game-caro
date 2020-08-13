import React from 'react';
import './App.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
// import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {compose} from "redux";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    legalResponsibleBlock: {
        backgroundColor: '#e0e7f2'
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
firebase.initializeApp({
    apiKey: 'AIzaSyBCUeyx_VUdt7CyTFAX5JoSJmpeNqRSItg',
    authDomain: 'game-caro-a57c5.firebaseapp.com'
});
class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: true
        };

        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({
                isSignedIn: !!user
            })
        })
    }

    signOut() {
         firebase.auth().signOut();
    }

    render() {
        const {
            isSignedIn
        } = this.state;
        const {

        } = this.props;

        return (
            <div
                style={{
                    backgroundImage: "url('https://scontent.fhan2-6.fna.fbcdn.net/v/t1.0-9/117291419_1145487799177968_2926890154246272122_o.jpg?_nc_cat=103&_nc_sid=8024bb&_nc_ohc=Gq6BwlitzeoAX9sp860&_nc_ht=scontent.fhan2-6.fna&oh=e0af7c6f01862873ba3916964ab7616d&oe=5F5BCBED')"
                }}
                className="gameCaroWrapper"
            >
                <span>Firebase Auth</span>
                {
                    isSignedIn
                    ?
                        <div>
                            Signed In !
                            <Button
                                onClick={this.signOut}
                            >
                                signOut
                            </Button>
                        </div>
                        :
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
                        />
                }
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (Layout);
