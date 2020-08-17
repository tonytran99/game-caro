import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import { ReactComponent as CameraIcon } from "../../images/camera_icon.svg";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    uploadBackgroundWrapper: {

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
            width: 180,
            height: 180,
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
});

class UploadBackground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            avatarPreview: '',
            avatarName: '',
        };

        this.handleBackground = this.handleBackground.bind(this);
        this.removeBackground = this.removeBackground.bind(this);
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

    render() {
        const {
            avatar,
            avatarPreview,
            avatarName
        } = this.state;
        const {
            classes,
            isSignedIn
        } = this.props;
        console.log(isSignedIn);

        return (
            <div className={classes.uploadBackgroundWrapper}>
                <div className={classes.uploadAvatar}>
                    <div>
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={this.handleBackground}
                            id="text-button-file"
                            type="file"
                            ref={this.inputAvatarRef}
                        />
                        <label htmlFor="text-button-file">
                            <span>{avatarPreview ? this.props.t("profile.field.change_avatar") : this.props.t("profile.field.upload_avatar")}</span>
                        </label>
                        {avatarPreview && <div className={classes.avatarPreview}>
                            {<p onClick={this.removeBackground} className={"removeAvatar"}>&times;</p>}
                            <img src={avatarPreview} alt={avatarName}/>
                        </div>}
                        <CameraIcon />
                    </div>
                </div>
            </div>
        );
    }
}

UploadBackground.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    isSignedIn: state.authReducer.isSignedIn
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
