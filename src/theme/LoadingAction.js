import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    mainBackground: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    backgroundContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    }
};

class LoadingAction extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.mainBackground}>
                <div className={classes.backgroundContent}>
                    <CircularProgress />
                </div>
            </div>
        );
    }

}
LoadingAction.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(LoadingAction);