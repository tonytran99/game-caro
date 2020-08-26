import React from "react";
import {Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import * as links from "../../constants/links";
import i18n from "../../i18n";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {MD, SM, XS} from "../../constants/constants";


const styles = theme => ({
    pageErrorWrapper: {
        textAlign: 'center',
        paddingTop: '4rem',
        '& .code': {
            fontWeight: 700,
            marginBottom: '1rem',
            fontSize: '8rem',
            color: '#ffdead',
            [theme.breakpoints.down(SM)]: {
                fontSize: '4rem',
            },
            [theme.breakpoints.between(SM,MD)]: {
                fontSize: '5rem',
            },
            [theme.breakpoints.up(MD)]: {
                fontSize: '6rem',
            },
        },
        '& .title': {
            marginBottom: '1rem',
            fontSize: '1.2rem',
            fontWeight: 600,
        },
        '& .btnGoHome': {
            backgroundColor: '#dfe3f1',
            textTransform: 'initial',
            padding: '0.5rem 1.5rem',
            fontWeight: 600,
            borderRadius: 9,
        },
    }
});

class PageError extends React.Component {

    render() {
        const {
            classes,
        } = this.props;
        return (
            <div className={classes.pageErrorWrapper}>
                {this.props.code && <p className="code">{this.props.code}</p>}
                {this.props.title && <p className="title">{this.props.title}</p>}
                {this.props.goToHome &&
                    <Link to={links.LINK_WELCOME} >
                        <Button className="btnGoHome">
                            <span>{i18n.t("label.goToHome")}</span>
                        </Button>
                    </Link>

                }
            </div>
        );
    }
}

PageError.propTypes = {
    title: PropTypes.string.isRequired,
};

export default compose(
    withStyles(styles),
) (PageError);
