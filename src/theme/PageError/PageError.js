import React from "react";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import * as links from "../../constants/links";
import i18n from "../../i18n";
import PropTypes from "prop-types";

class PageError extends React.Component {

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                {this.props.code && <Typography variant="h1" style={{fontWeight: 700, marginBottom: '1rem', fontSize: '8rem'}}>{this.props.code}</Typography>}
                {this.props.title &&  <Typography variant="h2" style={{marginBottom: '1rem'}}>{this.props.title}</Typography>}
                {this.props.goToHome && <Typography variant="caption" style={{fontSize: '1rem'}}>
                    <Link to={links.HOME} onClick={() => {
                        if (typeof this.props.resetErrorBoundary === 'function') {
                            this.props.resetErrorBoundary();
                        }
                    }}>{i18n.t("label.goToHome")}</Link>
                </Typography>}
            </div>
        );
    }
}

PageError.propTypes = {
    title: PropTypes.string.isRequired,
};
export default PageError;