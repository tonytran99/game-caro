import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import UploadChessman from "./UploadChessman";
import Header from "../Header";
import Footer from "../Footer";
import Content from "../Content";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router";
import * as links from "./../../constants/links";
import {paramsToObject} from "../../functions/functions";
import ListChessmans from "./ListChessmans";
import i18n from "../../i18n";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    chessmanWrapper: {
        width: '90%',
        margin: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    headerChessman: {
        paddingTop: '1rem',
        borderBottom: '2px dashed #f1f3de',
        marginBottom: '1rem',
        '& .menuItem': {
            textTransform: 'initial',
            borderRadius: '11px 11px 0px 0px',
            fontWeight: 600,
            color: '#f1f3de',
            padding: '0.5rem 1rem',
            '&.active': {
                border: '2px solid #f1f3de',
                backgroundColor: '#f1f3de',
                color: '#123152',
            }
        }
    },
    contentChessman: {
        flexGrow: 1,
        overflowY: 'scroll',
        backgroundColor: '#e0ece4',
        padding: '1rem 0.5rem',
        borderRadius: 9,
        boxShadow: '0 5px 5px 0 #e0ece4',
        '&::-webkit-scrollbar': {
            width: 9,
        },
        '&::-webkit-scrollbar-track': {
            background: '#ee6f57',
            borderRadius: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 9,
            background: '#ee6f57',
        },
    }
});

const LIST_CHESSMANS_TYPE = 'list-chessmans';
const UPLOAD_CHESSMAN_TYPE = 'upload-chessman';
const ALL_TAB = [
    LIST_CHESSMANS_TYPE,
    UPLOAD_CHESSMAN_TYPE
];

class Chessman extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueOptionChessman: LIST_CHESSMANS_TYPE
        };
        this.changeChessmanType = this.changeChessmanType.bind(this);
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search.substr(1));
        const entries = urlParams.entries();
        const params = paramsToObject(entries);
        if (params.hasOwnProperty('chessmanType')) {
            const chessmanType = params.chessmanType;
            if (ALL_TAB.includes(chessmanType)) {
                this.setState({
                    valueOptionChessman: chessmanType,
                });
            } else {
                this.setState({
                    valueOptionChessman: LIST_CHESSMANS_TYPE,
                });
                this.props.history.push(links.LINK_CHESSMAN + '?'+'chessmanType='+LIST_CHESSMANS_TYPE);
            }
        } else {
            this.setState({
                valueOptionChessman: LIST_CHESSMANS_TYPE,
            });
            this.props.history.push(links.LINK_CHESSMAN + '?'+'chessmanType='+LIST_CHESSMANS_TYPE);
        }
    }

    changeChessmanType(valueOptionChessman) {
        this.setState({
            valueOptionChessman: valueOptionChessman,
        });
        this.props.history.push(links.LINK_CHESSMAN + '?'+'chessmanType='+valueOptionChessman);
    }


    render() {
        const {
            valueOptionChessman
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.chessmanWrapper}>
                        <div className={classes.headerChessman}>
                            <Button
                                onClick={() => this.changeChessmanType(LIST_CHESSMANS_TYPE)}
                                className={"menuItem" + (valueOptionChessman === LIST_CHESSMANS_TYPE ? ' active' : '')}
                            >
                                {i18n.t('chessman.menu.list_chessman')}
                            </Button>
                            <Button
                                onClick={() => this.changeChessmanType(UPLOAD_CHESSMAN_TYPE)}
                                className={"menuItem" + (valueOptionChessman === UPLOAD_CHESSMAN_TYPE ? ' active' : '')}
                            >
                                {i18n.t('chessman.menu.upload_chessman')}
                            </Button>
                        </div>
                        <div className={classes.contentChessman}>
                            {
                                valueOptionChessman === LIST_CHESSMANS_TYPE
                                    ?
                                    <ListChessmans goToUploadChessman={() => this.changeChessmanType(UPLOAD_CHESSMAN_TYPE)}/>
                                    :
                                    <UploadChessman />
                            }
                        </div>

                    </div>
                </Content>
                <Footer />
            </React.Fragment>
        );
    }
}

Chessman.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
    withRouter,
) (Chessman);
