import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    background: {
        background: '#fff',
        borderRadius: 7,
        display: 'inline-block',
        width: 38,
        height: 38
    }
};

class CheckedBg extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div
                className={`${classes.background} ${this.props.className ? this.props.className : ''}`}
                style={{background: `${this.props.background}`, width: `${this.props.width}`, height: `${this.props.height}`, borderRadius: `${this.props.borderRadius}`}}
            >
            </div>
        );
    }

}

CheckedBg.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckedBg);