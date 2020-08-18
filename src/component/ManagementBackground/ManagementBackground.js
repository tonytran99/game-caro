import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import UploadBackground from "./UploadBackground";

const styles = theme => ({
    managementBackgroundWrapper: {
        width: '90%',
        height: 600,
        margin: 'auto'
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
            dataUser
        } = this.props;
        console.log(dataUser);

        return (
            <div className={classes.managementBackgroundWrapper}>
               <UploadBackground />
            </div>
        );
    }
}

ManagementBackground.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUser: state.authReducer.dataUser
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
