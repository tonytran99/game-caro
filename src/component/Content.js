import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import * as links from "./../constants/links";

const styles = theme => ({
    contentWrapper: {
        height: 'calc(100vh - 146px)',
    },
    contentAuthWrapper: {
        height: 'calc(100vh - 162px)',
    }
});

class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {
            classes,
            match
        } = this.props;
        return(
            <div className={classes.contentWrapper + ' ' + (match && match.path === links.LINK_AUTH ? classes.contentAuthWrapper : '')}>
                {this.props.children}
            </div>
        );
    }
}

Content.propTypes = {
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
) (Content);

