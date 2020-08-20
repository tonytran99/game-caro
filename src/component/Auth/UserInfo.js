import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import AuthBlock from "../Auth/Auth";
import Content from "../Content";
import Input from "@material-ui/core/Input";
import firebase, {storage} from "../../firebase";
import LoadingAction from "../../theme/LoadingAction";
import {ReactComponent as CameraIcon} from "../../images/camera_icon.svg";
import Button from "@material-ui/core/Button";
import {withTranslation} from "react-i18next";
import * as gameActions from "../../_actions/game";

const styles = theme => ({
    userInfoWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        margin: 'auto',
        alignItems: 'center',
    },
    uploadAvatarContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 181,
        width: 181,
        position: 'relative',
        border: '2px solid #1976b7',
        background: '#b3d8de',
        '&::before': {
            content: `''`,
            background: 'rgba(0,0,0,.5)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 10,
            opacity: 0,
            visibility: 'hidden',
            transition: '0.3s'
        },
        '&:hover': {
            '& $actionLabel': {
                transform: 'translateX(0)'
            },
            '&::before': {
                opacity: 1,
                visibility: 'visible'
            }
        }
    },
    actionAvatar: {
        position: 'absolute',
        zIndex: 999,
        width: '100%',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    actionLabel: {
        fontSize: '0.8rem',
        color: '#46435a',
        background: '#fff',
        width: 90,
        borderRadius: '0 30px 30px 0',
        textAlign: 'center',
        transition: '0.3s',
        transform: 'translateX(-100%)',
        '&:nth-of-type(2)': {
            transitionDelay: '0.1s',
            marginTop: 5
        },
        '&:hover': {
            color: '#fff',
            background: '#645d7b'
        }
    },
    actionText: {
        padding: '0.25rem',
        cursor: 'pointer'
    },
    btnSaveProfile: {
        borderRadius: 11,
        marginTop: '1rem',
        backgroundColor: '#fff',
        padding: '0.5rem 1rem',
        textTransform: 'initial',
    },
    avatarPreview: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 99,
        display: 'flex',
        justifyContent: 'center',
        '& img': {
            // width: '100%',
            height: '100%',
            // objectFit: 'cover'
        },
        '& .removeAvatar': {
            position: 'absolute',
            zIndex: 3,
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 22,
            height: 22,
            display: 'flex',
            background: '#fff',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
                // background: red[500],
                color: '#fff'
            }
        }
    },
});
class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            avatar: null,
            avatarPreview: '',
            avatarName: '',
            isLoading: false,
            progressUploadBackground: 0,
        };

        this.handleBackground = this.handleBackground.bind(this);
        this.removeBackground = this.removeBackground.bind(this);
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

    handleBackground(event) {
        this.setState({
            avatar: event.target.files[0],
            avatarPreview: URL.createObjectURL(event.target.files[0]),
            avatarName: event.target.files[0].name,
        });
    }

    removeBackground() {
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
        console.log(avatar);
        if (avatar) {
            const nameImage = (dataUserAuth && dataUserAuth.uid ? dataUserAuth.uid : '') + '_' + new Date().getTime() + '_avatar';
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
                    });
                },
                () => {
                    // complete function ....
                    storage.ref('images/users').child(nameImage).getDownloadURL().then(url => {
                        console.log(url);

                        firebase.database().ref(`users/${dataUserAuth.uid}`).set({
                            ...dataUser,
                            avatarUrl: avatar ? url : avatarPreview ? dataUser.photoURL : '',
                            displayName: displayName
                        }, (error) => {
                            if (error) {
                                this.setState({
                                    // displayName: '',
                                    // avatar: null,
                                    // avatarPreview: '',
                                    // avatarName: '',
                                    isLoading: false,
                                    progressUploadBackground: 0,
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
                    });
                } else {
                    this.props.showDataUser(dataUserAuth.uid);
                    this.setState({
                        isLoading: false,
                        progressUploadBackground: 0,
                    });
                }
            });
        }

    }

    render() {
        const {
            avatar,
            avatarPreview,
            avatarName,
            progressUploadBackground,
            isLoading,
            displayName,
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;
        console.log(dataUserAuth);

        return (
            <React.Fragment>
                {isLoading && <LoadingAction />}
                <Header />
                <Content>
                    <div className={classes.userInfoWrapper}>
                        <Input
                            name="displayName"
                            value={displayName}
                            type="text"
                            onChange={(event) => this.handleChange('displayName', event.target.value)}
                        />
                        <div className={classes.uploadAvatarContent}>
                            <input
                                accept="image/*"
                                style={{display: 'none'}}
                                onChange={this.handleBackground}
                                id="text-button-file"
                                type="file"
                                ref={this.inputAvatarRef}
                            />
                            <div className={classes.actionAvatar}>
                                <div className={classes.actionLabel}>
                                    <label htmlFor="text-button-file">
                                        <div className={classes.actionText}>
                                            {avatarPreview ? this.props.t('label.edit') : this.props.t("label.upload")}
                                        </div>
                                    </label>
                                </div>
                                {avatarPreview &&
                                <div className={classes.actionLabel}>
                                    <div onClick={this.removeBackground} className={classes.actionText}>{this.props.t('label.remove')}</div>
                                </div>
                                }
                            </div>
                            {avatarPreview && <div className={classes.avatarPreview}>
                                <img src={avatarPreview} alt={avatarName}/>
                            </div>}
                            {!avatarPreview && <CameraIcon />}
                        </div>
                        <Button
                            onClick={() => this.saveProfile()}
                            className={classes.btnSaveProfile}
                        >
                            dsds
                        </Button>
                    </div>
                </Content>
                <Footer />
            </React.Fragment>
        );
    }
}

UserInfo.propTypes = {
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
    withTranslation()
) (UserInfo);
