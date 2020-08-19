import React from "react";
import { ReactComponent as CheckIcon } from "../../images/check_icon.svg"
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    background: {
        background: '#fff',
        borderRadius: 7,
        display: 'inline-block',
        width: 38,
        height: 38,
        position: 'relative',
        '& img': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
        '& svg': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem'
        }
    }
};

class CheckedIcon extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div
                className={`${classes.background} ${this.props.className ? this.props.className : ''}`}
                style={{background: `${this.props.background}`, borderRadius: `${this.props.borderRadius}`, width: `${this.props.width}`, height: `${this.props.height}`}}
            >
                <CheckIcon
                    width={this.props.widthImage ? this.props.widthImage : "auto"}
                    height={this.props.heightImage ? this.props.heightImage : "auto"}
                />
            </div>
        )
    }

}

CheckedIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckedIcon);