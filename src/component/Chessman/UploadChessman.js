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
import UploadPhoto from "../../theme/UploadPhoto";
import SuccessAlert from "../../theme/Alert/SuccessAlert";
import i18n from "../../i18n";
import ErrorAlert from "../../theme/Alert/ErrorAlert";
import AppInput from "../../theme/AppInput";

const styles = theme => ({
    chessmanWrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    chessmanPhoto: {
        width: 180,
        height: 180,
        margin: 'auto'
    },
    nameChessman: {
        width: 300,
        margin: 'auto'
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
        width: 300,
        margin: 'auto',
        '&:hover': {
            backgroundColor: '#123152',
        }
    }
});

class UploadChessman extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            chessman: null,
            chessmanPreview: '',
            chessmanName: '',
            progressUploadBackground: 0,
            isLoading: false,
            successOpen: false,
            errorOpen: false,
        };

        this.handleCloseNotice = this.handleCloseNotice.bind(this);
        this.handleChessman = this.handleChessman.bind(this);
        this.removeChessman = this.removeChessman.bind(this);
        this.uploadChessman = this.uploadChessman.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.inputAvatarRef = React.createRef();
    }

    componentDidMount() {

    }
    handleChessman(event) {
        this.setState({
            chessman: event.target.files[0],
            chessmanPreview: URL.createObjectURL(event.target.files[0]),
            chessmanName: event.target.files[0].name,
        });
    }
    removeChessman() {
        this.setState({
            chessman: null,
            chessmanPreview: '',
            chessmanName: '',
        });
    }
    uploadChessman() {
        const {
            name,
            chessman,
        } = this.state;
        const {
            dataUserAuth
        } = this.props;
        this.setState({
            isLoading: true
        })
        if (chessman) {
            const nameImage = (dataUserAuth && dataUserAuth.uid ? dataUserAuth.uid : '') + '_' + new Date().getTime();
            const uploadTask = storage.ref(`images/chessmans/${nameImage}`).put(chessman);
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
                    storage.ref('images/chessmans').child(nameImage).getDownloadURL().then(url => {
                        firebase.database().ref('chessmans/' + nameImage).set({
                            userId: dataUserAuth.uid,
                            chessmanUrl: url,
                            chessmanId: nameImage,
                            name: name,
                            updateAt: new Date().getTime(),
                            default: 0,
                        }, (error) => {
                            if (error) {
                                this.setState({
                                    name: '',
                                    chessman: null,
                                    chessmanPreview: '',
                                    chessmanName: '',
                                    progressUploadBackground: 0,
                                    isLoading: false,
                                    errorOpen: true
                                });
                            } else {
                                this.setState({
                                    name: '',
                                    chessman: null,
                                    chessmanPreview: '',
                                    chessmanName: '',
                                    progressUploadBackground: 0,
                                    isLoading: false,
                                    successOpen: true
                                });
                            }
                        });
                    });
                });
        }
    }

    handleChange(name, value) {
        this.setState({
            [name]: value
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
            name,
            chessman,
            chessmanPreview,
            chessmanName,
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
            <div className={classes.chessmanWrapper}>
                {isLoading && <LoadingAction />}
                <AppInput
                    className={classes.nameChessman}
                    name="name"
                    value={name}
                    type="text"
                    placeholder={i18n.t('chessman.upload_chessman.nameChessman')}
                    onChange={(event) => this.handleChange('name', event.target.value)}
                />
                <div className={classes.chessmanPhoto}>
                    <UploadPhoto
                        onChange={this.handleChessman}
                        removePhoto={this.removeChessman}
                        photo={chessman}
                        photoPreview={chessmanPreview}
                        photoName={chessmanName}
                        progressUploadBackground={progressUploadBackground}
                    />
                </div>
                <Button
                    onClick={() => this.uploadChessman()}
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
