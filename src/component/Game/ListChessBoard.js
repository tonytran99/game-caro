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

const styles = theme => ({
    trainingWithAIWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        console.log(dataListChessBoard);
        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.trainingWithAIWrapper}>
                        {
                            dataListChessBoard.map((item, index) => {
                                return (
                                    <div>
                                    <NavLink
                                        to={links.LINK_CHESS_BOARD.replace(":idChessBoard", item.idChessBoard)}
                                    >
                                        <span>chess board <span>{index}</span></span>
                                    </NavLink>
                                    </div>
                                );
                            })
                        }
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
    // withTranslation()
) (ListChessBoard);
