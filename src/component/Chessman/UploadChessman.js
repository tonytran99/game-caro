import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "redux";
import { ReactComponent as CameraIcon } from "../../images/camera_icon.svg";
import {withTranslation} from "react-i18next";
import Button from "@material-ui/core/Button";
import { lighten, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {storage} from "../../firebase";
import LoadingAction from "../../theme/LoadingAction";
import firebase from "./../../firebase";
import Input from "@material-ui/core/Input";

const styles = theme => ({
    chessmanWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        margin: 'auto',
        alignItems: 'center',
    },
    uploadBackgroundWrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    uploadAvatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: '#cad4e5',
            position: 'relative',
            overflow: 'hidden',
            '& span': {
                position: 'absolute',
                display: 'block',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                fontSize: 13,
                textAlign: 'center',
                bottom: -41,
                left: 0,
                zIndex: 999,
                width: '100%',
                padding: '8px 0 15px',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                    background: 'rgba(0,0,0,0.7)'
                }
            },
            '&:hover': {
                '& span': {
                    bottom: 0
                }
            }
        }
    },
    avatarPreview: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 99,
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
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
    uploadAvatarContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
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
    uploadBgBtn: {
        borderRadius: 11,
        marginTop: '1rem',
        backgroundColor: '#fff',
        padding: '0.5rem 1rem',
        textTransform: 'initial',
    }
});


const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#ff6c5c',
    },
})(LinearProgress);
class UploadChessman extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            avatar: null,
            avatarPreview: '',
            avatarName: '',
            progressUploadBackground: 0,
            isLoading: false,

        };

        this.handleBackground = this.handleBackground.bind(this);
        this.removeBackground = this.removeBackground.bind(this);
        this.uploadBackground = this.uploadBackground.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.inputAvatarRef = React.createRef();
    }

    componentDidMount() {

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

    uploadBackground() {
        const {avatar} = this.state;
        const {
            dataUserAuth
        } = this.props;
        const nameImage = (dataUserAuth && dataUserAuth.uid ? dataUserAuth.uid : '') + '_' + new Date().getTime() + '_background';
        const uploadTask = storage.ref(`images/${nameImage}`).put(avatar);
        this.setState({
            isLoading: true
        })
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progressUploadBackground = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progressUploadBackground});
            },
            (error) => {
                // error function ....
                this.setState({
                    progressUploadBackground: 0,
                    isLoading: false,
                });
            },
            () => {
                // complete function ....
                storage.ref('images').child(nameImage).getDownloadURL().then(url => {
                    console.log(url);

                    firebase.database().ref('backgrounds/' + dataUserAuth.uid + '/' + nameImage).set({
                        userId: dataUserAuth.uid,
                        backgroundUrl: url,
                        backgroundId: nameImage
                    }, (error) => {
                        if (error) {
                            this.setState({
                                avatar: null,
                                avatarPreview: '',
                                avatarName: '',
                                progressUploadBackground: 0,
                                isLoading: false,
                            });
                        } else {
                            this.setState({
                                avatar: null,
                                avatarPreview: '',
                                avatarName: '',
                                progressUploadBackground: 0,
                                isLoading: false,
                            });
                        }
                    });
                });
            });

    }

    handleChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    render() {
        const {
            name,
            avatar,
            avatarPreview,
            avatarName,
            progressUploadBackground,
            isLoading
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;
        console.log(dataUserAuth.uid);

        return (
            <div className={classes.chessmanWrapper}>
                <Input
                    name="name"
                    value={name}
                    type="text"
                    onChange={(event) => this.handleChange('name', event.target.value)}
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
        );
    }
}

UploadChessman.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation()
) (UploadChessman);
