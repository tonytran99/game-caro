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
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    photoPreview: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 99,
        textAlign: 'center',
        '& img': {
            // width: '100%',
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
        // border: '2px solid #1976b7',
        background: '#f9f7d9',
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
        cursor: 'pointer',
        backgroundColor: '#a3d2ca',
        borderRadius: '0px 9px 9px 0px',
        '& svg': {
            '& path': {
                fill: '#123152',
                stroke: '#123152'
            }
        }
    },
});


const BorderLinearProgress = withStyles({
    root: {
        height: 10,
        backgroundColor: '#a2d5f2',
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#07689f',
    },
})(LinearProgress);
class UploadPhoto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.inputAvatarRef = React.createRef();
    }

    render() {
        const {

        } = this.state;
        const {
            classes,
            onChange,
            removePhoto,
            photo,
            photoPreview,
            photoName,
            progressUploadBackground
        } = this.props;

        return (
            <div className={classes.uploadPhotoWrapper}>
                <BorderLinearProgress
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
                                    {photoPreview ? <EditIcon /> : <UploadIcon />}
                                </div>
                            </label>
                        </div>
                        {photoPreview &&
                        <div className={classes.actionLabel}>
                            <div onClick={removePhoto} className={classes.actionText}><RemoveIcon /></div>
                        </div>
                        }
                    </div>
                    {photoPreview && <div className={classes.photoPreview}>
                        <img src={photoPreview} alt={photoName}/>
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
