import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    footerWrapper: {
        padding: '1rem 0rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700,
        fontSize: '1.2rem',
    }
});
class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        // const {
        //
        // } = this.state;
        const {
            classes
        } = this.props;

        return (
            <div className={classes.footerWrapper}>
                2020 @ Tony Tran Studio
            </div>
        );
    }
}

Footer.propTypes = {
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
    withTranslation(),
) (Footer);
