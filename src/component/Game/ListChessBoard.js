import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import * as gameActions from "../../_actions/game";
import {NavLink} from "react-router-dom";
import * as links from "../../constants/links";
import Grid from "@material-ui/core/Grid";
import ChessBoardIcon from "./../../images/logo.png"
import Button from "@material-ui/core/Button";
import {withTranslation} from "react-i18next";
const styles = theme => ({
    listChessBoardWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 480,
        margin: 'auto',
        height: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: 9,
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            // borderRadius: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 9,
            background: '#b2ebf2',
        },
        '& > div': {
            height: '100%',
        }
    },
    itemChessBoardWrapper: {
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnItemChessBoard: {
        backgroundColor: '#e5e5e5',
        borderRadius: 11,
        '& img': {
            width: 180,
            height: 180,
        },
        '&:hover': {
            backgroundColor: '#e5e5e5',
        }
    }
});
class ListChessBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        // this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.props.showListChessBoard();
    }

    render() {
        const {
            board
        } = this.state;
        const {
            classes,
            dataUserAuth,
            match,
            dataListChessBoard
        } = this.props;
        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.listChessBoardWrapper}>
                        <Grid container>
                            {
                                dataListChessBoard.map((item, index) => {
                                    return (
                                        <Grid item md={6} lg={6} className={classes.itemChessBoardWrapper}>
                                            <NavLink
                                                to={links.LINK_CHESS_BOARD.replace(":idChessBoard", item.idChessBoard)}
                                            >
                                                <Button
                                                    className={classes.btnItemChessBoard}
                                                >
                                                    <img src={ChessBoardIcon} alt=""/>
                                                </Button>
                                            </NavLink>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>

                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </React.Fragment>
        );
    }
}

ListChessBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataListChessBoard: state.gameReducer.dataListChessBoard
});

const mapDispatchToProps = (dispatch) => {
    return {
        showListChessBoard: () => dispatch(gameActions.showListChessBoard())
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
) (ListChessBoard);
