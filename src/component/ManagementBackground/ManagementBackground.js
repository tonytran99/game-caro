import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import UploadBackground from "./UploadBackground";

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
class ManagementBackground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {

    }

    render() {
        const {

        } = this.state;
        const {
            classes,
            isSignedIn
        } = this.props;
        console.log(isSignedIn);

        return (
            <div className={classes.uploadBackgroundWrapper}>
               <UploadBackground />
            </div>
        );
    }
}

ManagementBackground.propTypes = {
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
    // withTranslation()
) (ManagementBackground);
