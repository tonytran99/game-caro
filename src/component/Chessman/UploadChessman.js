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

const styles = theme => ({
    chessmanWrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        margin: 'auto',
        alignItems: 'center',
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
            chessman: null,
            chessmanPreview: '',
            chessmanName: '',
            progressUploadBackground: 0,
            isLoading: false,

        };

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
                                });
                            } else {
                                this.setState({
                                    name: '',
                                    chessman: null,
                                    chessmanPreview: '',
                                    chessmanName: '',
                                    progressUploadBackground: 0,
                                    isLoading: false,
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

    render() {
        const {
            name,
            chessman,
            chessmanPreview,
            chessmanName,
            progressUploadBackground,
            isLoading
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;

        return (
            <div className={classes.chessmanWrapper}>
                {isLoading && <LoadingAction />}
                <Input
                    name="name"
                    value={name}
                    type="text"
                    onChange={(event) => this.handleChange('name', event.target.value)}
                />
               <UploadPhoto
                   onChange={this.handleChessman}
                   removePhoto={this.removeChessman}
                   photo={chessman}
                   photoPreview={chessmanPreview}
                   photoName={chessmanName}
                   progressUploadBackground={progressUploadBackground}
               />
                <Button
                    onClick={() => this.uploadChessman()}
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
