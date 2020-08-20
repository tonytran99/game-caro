import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "redux";
import { ReactComponent as CameraIcon } from "../images/camera_icon.svg";
import {withTranslation} from "react-i18next";
import { lighten, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {ReactComponent as EditIcon } from "../images/edit_icon.svg";
import {ReactComponent as UploadIcon } from "../images/upload_icon.svg";
import {ReactComponent as RemoveIcon } from "../images/remove_icon.svg";

const styles = theme => ({
    uploadPhotoWrapper: {

    },
    photoPreview: {
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
    uploadPhotoContent: {
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
    actionPhoto: {
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
class UploadPhoto extends React.Component {

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
            isLoading,
        } = this.state;
        const {
            classes,
            dataUserAuth,
            onChange,
            photoPreview
        } = this.props;
        console.log(dataUserAuth.uid);

        return (
            <div className={classes.uploadPhotoWrapper}>
                <BorderLinearProgress
                    className={classes.margin}
                    variant="determinate"
                    color="secondary"
                    value={progressUploadBackground}
                />
                <div className={classes.uploadPhotoContent}>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={onChange}
                        id="text-button-file"
                        type="file"
                        ref={this.inputAvatarRef}
                    />
                    <div className={classes.actionPhoto}>
                        <div className={classes.actionLabel}>
                            <label htmlFor="text-button-file">
                                <div className={classes.actionText}>
                                    {avatarPreview ? <EditIcon /> : <UploadIcon />}
                                </div>
                            </label>
                        </div>
                        {avatarPreview &&
                        <div className={classes.actionLabel}>
                            <div onClick={this.removeBackground} className={classes.actionText}>{this.props.t('label.remove')}</div>
                        </div>
                        }
                    </div>
                    {photoPreview && <div className={classes.photoPreview}>
                        <img src={photoPreview} alt={avatarName}/>
                    </div>}
                    {!photoPreview && <CameraIcon />}
                </div>
            </div>
        );
    }
}

UploadPhoto.propTypes = {
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
) (UploadPhoto);
