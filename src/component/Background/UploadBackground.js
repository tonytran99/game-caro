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
import UploadPhoto from "../../theme/UploadPhoto";
import i18n from "../../i18n";
import SuccessAlert from "../../theme/Alert/SuccessAlert";
import ErrorAlert from "../../theme/Alert/ErrorAlert";

const styles = theme => ({
    uploadBackgroundWrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    uploadBgBtn: {
        marginTop: '1rem',
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        marginBottom: '1rem',
        color: '#dfe3f1',
        '&:hover': {
            backgroundColor: '#123152',
        }
    }
});

class UploadBackground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            background: null,
            backgroundPreview: '',
            backgroundName: '',
            progressUploadBackground: 0,
            isLoading: false,
            successOpen: false,
            errorOpen: false,
        };

        this.handleCloseNotice = this.handleCloseNotice.bind(this);
        this.handleBackground = this.handleBackground.bind(this);
        this.removeBackground = this.removeBackground.bind(this);
        this.uploadBackground = this.uploadBackground.bind(this);
        this.inputAvatarRef = React.createRef();
    }

    componentDidMount() {

    }
    handleBackground(event) {
        this.setState({
            background: event.target.files[0],
            backgroundPreview: URL.createObjectURL(event.target.files[0]),
            backgroundName: event.target.files[0].name,
        });
    }
    removeBackground() {
        this.setState({
            background: null,
            backgroundPreview: '',
            backgroundName: '',
        });
    }
    uploadBackground() {
        const {avatar} = this.state;
        const {
            dataUserAuth
        } = this.props;
        const nameImage = (dataUserAuth && dataUserAuth.uid ? dataUserAuth.uid : '') + '_' + new Date().getTime();
        const uploadTask = storage.ref(`images/backgrounds/${nameImage}`).put(avatar);
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
                    errorOpen: true
                });
            },
            () => {
                // complete function ....
                storage.ref('images/backgrounds').child(nameImage).getDownloadURL().then(url => {
                    firebase.database().ref('backgrounds/' + dataUserAuth.uid + '/' + nameImage).set({
                        userId: dataUserAuth.uid,
                        backgroundUrl: url,
                        backgroundId: nameImage
                    }, (error) => {
                        if (error) {
                            this.setState({
                                background: null,
                                backgroundPreview: '',
                                backgroundName: '',
                                progressUploadBackground: 0,
                                isLoading: false,
                                errorOpen: true
                            });
                        } else {
                            this.setState({
                                background: null,
                                backgroundPreview: '',
                                backgroundName: '',
                                progressUploadBackground: 0,
                                isLoading: false,
                                successOpen: true
                            });
                        }
                    });
                });
            });

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
            successOpen,
            errorOpen,
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;
        return (
            <div className={classes.uploadBackgroundWrapper}>
                {isLoading && <LoadingAction />}
               <UploadPhoto
                   onChange={this.handleBackground}
                   removePhoto={this.removeBackground}
                   photo={avatar}
                   photoPreview={avatarPreview}
                   photoName={avatarName}
                   progressUploadBackground={progressUploadBackground}
               />
                <Button
                    onClick={() => this.uploadBackground()}
                    className={classes.uploadBgBtn}
                >
                    {i18n.t('background.upload_background.btn_upload')}
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
        );
    }
}

UploadBackground.propTypes = {
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
) (UploadBackground);
