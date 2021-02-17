import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import Input from "@material-ui/core/Input";
import firebase, {storage} from "../../firebase";
import LoadingAction from "../../theme/LoadingAction";
import {ReactComponent as CameraIcon} from "../../images/camera_icon.svg";
import Button from "@material-ui/core/Button";
import {withTranslation} from "react-i18next";
import * as gameActions from "../../_actions/game";
import UploadPhoto from "../../theme/UploadPhoto";
import AppInput from "../../theme/AppInput";
import i18n from "../../i18n";
import SuccessAlert from "../../theme/Alert/SuccessAlert";
import ErrorAlert from "../../theme/Alert/ErrorAlert";

const styles = theme => ({
    profileWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 250,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    displayNameInput: {
        marginBottom: '1rem',
        width: '100%'
    },
    btnSaveProfile: {
        backgroundColor: '#dfe3f1',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        marginTop: '1rem',
        color: '#123152',
        '&:hover': {
            backgroundColor: '#dfe3f1',
        }
    },
    avatarUploadWrapper: {
        width: 250,
        height: 250
    }
});
class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            avatar: null,
            avatarPreview: '',
            avatarName: '',
            isLoading: false,
            progressUploadBackground: 0,
            successOpen: false,
            errorOpen: false,
        };

        this.handleCloseNotice = this.handleCloseNotice.bind(this);
        this.handleAvatar = this.handleAvatar.bind(this);
        this.removeAvatar = this.removeAvatar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.inputAvatarRef = React.createRef();
    }

    componentDidMount() {
        const {
            dataUser
        } = this.props;
        this.setState({
            displayName: dataUser.displayName,
            avatarPreview: dataUser.avatarUrl ? dataUser.avatarUrl : '',
        });
    }

    handleAvatar(event) {
        this.setState({
            avatar: event.target.files[0],
            avatarPreview: event.target.files[0] ? URL.createObjectURL(event.target.files[0]): '',
            avatarName:  event.target.files[0] ? event.target.files[0].name : '',
        });
    }

    removeAvatar() {
        this.setState({
            avatar: null,
            avatarPreview: '',
            avatarName: '',
        });
    }

    handleChange(name, value) {
        this.setState({
            [name]: value
        })
    }

    saveProfile() {
        const {
            avatar,
            displayName,
            avatarPreview
        } = this.state;
        const {
            dataUserAuth,
            dataUser
        } = this.props;

        this.setState({
            isLoading: true
        });
        if (avatar) {
            const nameImage = (dataUserAuth && dataUserAuth.uid ? dataUserAuth.uid : '') + '_' + new Date().getTime();
            const uploadTask = storage.ref(`images/users/${nameImage}`).put(avatar);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progrss function ....
                    const progressUploadBackground = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({progressUploadBackground});
                },
                (error) => {
                    // error function ....
                    this.setState({
                        isLoading: false,
                        progressUploadBackground: 0,
                        errorOpen: true
                    });
                },
                () => {
                    // complete function ....
                    storage.ref('images/users').child(nameImage).getDownloadURL().then(url => {
                        firebase.database().ref(`users/${dataUserAuth.uid}`).set({
                            ...dataUser,
                            avatarUrl: avatar ? url : avatarPreview ? dataUser.photoURL : '',
                            displayName: displayName
                        }, (error) => {
                            if (error) {
                                this.setState({
                                    isLoading: false,
                                    progressUploadBackground: 0,
                                    errorOpen: true
                                });
                            } else {
                                this.props.showDataUser(dataUserAuth.uid);
                                this.setState({
                                    // displayName: '',
                                    // avatar: null,
                                    avatarPreview: url,
                                    // avatarName: '',
                                    isLoading: false,
                                    progressUploadBackground: 0,
                                    successOpen: true
                                });
                            }
                        });
                    });
                });
        } else {
            firebase.database().ref(`users/${dataUserAuth.uid}`).set({
                ...dataUser,
                avatarUrl: avatarPreview ? avatarPreview : '',
                displayName: displayName
            }, (error) => {
                if (error) {
                    this.setState({
                        isLoading: false,
                        progressUploadBackground: 0,
                        errorOpen: true
                    });
                } else {
                    this.props.showDataUser(dataUserAuth.uid);
                    this.setState({
                        isLoading: false,
                        progressUploadBackground: 0,
                        successOpen: true
                    });
                }
            });
        }

    }

    handleCloseNotice() {
        this.setState({
            successOpen: false,
            errorOpen: false,
        });
    }

    render() {
        const {
            avatar,
            avatarPreview,
            avatarName,
            progressUploadBackground,
            isLoading,
            displayName,
            successOpen,
            errorOpen,
        } = this.state;
        const {
            classes,
        } = this.props;

        return (
            <React.Fragment>
                {isLoading && <LoadingAction />}
                <Header />
                <Content>
                    <div className={classes.profileWrapper}>
                        <AppInput
                            name="displayName"
                            value={displayName}
                            type="text"
                            className={classes.displayNameInput}
                            placeholder={i18n.t('profile.displayName')}
                            onChange={(event) => this.handleChange('displayName', event.target.value)}
                        />
                        <div className={classes.avatarUploadWrapper}>
                            <UploadPhoto
                                onChange={this.handleAvatar}
                                removePhoto={this.removeAvatar}
                                photo={avatar}
                                photoPreview={avatarPreview}
                                photoName={avatarName}
                                progressUploadBackground={progressUploadBackground}
                            />
                        </div>
                        <Button
                            onClick={() => this.saveProfile()}
                            className={classes.btnSaveProfile}
                        >
                            {i18n.t('profile.btnSaveProfile')}
                        </Button>
                        <SuccessAlert
                            snackbarProps={{
                                open:successOpen,
                                onClose:this.handleCloseNotice,
                            }}
                            message={i18n.t('alert.success')}
                        />
                        <ErrorAlert
                            snackbarProps={{
                                open:errorOpen,
                                onClose:this.handleCloseNotice,
                            }}
                            message={i18n.t('alert.error')}
                        />
                    </div>
                </Content>
                <Footer />
            </React.Fragment>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataUser: state.gameReducer.dataUser,

});

const mapDispatchToProps = (dispatch) => {
    return {
        showDataUser: (userId) => dispatch(gameActions.showDataUser(userId)),

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
) (Profile);
