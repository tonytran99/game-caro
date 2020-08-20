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
import ListBackgrounds from "../Background/ListBackgrounds";

const styles = theme => ({
    backgroundWrapper: {
        width: '90%',
        margin: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    headerBackground: {
        paddingTop: '1rem',
        borderBottom: '1px dashed black',
        marginBottom: '1rem',
        '& .menuItem': {
            textTransform: 'initial',
            borderRadius: '11px 11px 0px 0px',
            '&.active': {
                border: '2px solid black',
            }
        }
    },
    contentBackground: {
        flexGrow: 1,
        overflowY: 'scroll',
    }
});

const LIST_CHESSMANS_TYPE = 'management-chessmans';
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
        console.log(valueOptionChessman);
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
        console.log(valueOptionChessman);

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.backgroundWrapper}>
                        <div className={classes.headerBackground}>
                            <Button
                                onClick={() => this.changeChessmanType(LIST_CHESSMANS_TYPE)}
                                className={"menuItem" + (valueOptionChessman === LIST_CHESSMANS_TYPE ? ' active' : '')}
                            >
                                list chessman
                            </Button>
                            <Button
                                onClick={() => this.changeChessmanType(UPLOAD_CHESSMAN_TYPE)}
                                className={"menuItem" + (valueOptionChessman === UPLOAD_CHESSMAN_TYPE ? ' active' : '')}
                            >
                                upload chessman
                            </Button>
                        </div>
                        <div className={classes.contentBackground}>
                            {
                                valueOptionChessman === LIST_CHESSMANS_TYPE
                                    ?
                                    <ListBackgrounds goToUploadBackground={() => this.changeChessmanType(UPLOAD_CHESSMAN_TYPE)}/>
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
    // withTranslation(),
    withRouter,
) (Chessman);
