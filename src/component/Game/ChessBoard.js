import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import Board from "../../theme/Game/Board";
import {BOARD_GROUP, BOARD_TW0, CHESSMAN_YOURSELF_A, CHESSMAN_YOURSELF_B, GROUP_BOARD} from "../../constants/constants";
import * as gameActions from "../../_actions/game";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
    trainingWithAIWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    setupDataBoard: {

    }
});
class ChessBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSetupChessBoard: {
                // chessmanA
            },
        };

        this.joinChessBoard = this.joinChessBoard.bind(this);
    }

    componentDidMount() {
        const {
            dataChessBoard
        } = this.props;
        this.props.showDataChessBoard(this.props.match.params.idChessBoard);
        if (!(dataChessBoard && dataChessBoard.dataBoard && dataChessBoard.dataBoard.iconChessmanA)) {
            this.props.showDataChessmans();
        }
        //
        const dataChessman = {
            iconChessmanA: {

            },
            iconChessmanB: {

            }
        }
    }

    joinChessBoard(userIdChessman, userId) {
        const {
            dataChessBoard
        } = this.props;
        dataChessBoard[userIdChessman] = userId;
        this.props.saveDataChessBoard(this.props.match.params.idChessBoard, dataChessBoard);
    }


    render() {
        const {
            board
        } = this.state;
        const {
            classes,
            dataUserAuth,
            match,
            dataChessBoard,
            dataChessmans,
            dataUser,
        } = this.props;
        console.log(dataChessmans);

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.trainingWithAIWrapper}>
                        {
                            dataChessBoard && dataChessBoard.userIdChessmanA && dataChessBoard.userIdChessmanB && dataChessBoard.dataBoard && dataChessBoard.dataBoard.iconChessmanA
                            ?
                                <Board
                                    size={10}
                                    chessmanA={CHESSMAN_YOURSELF_A}
                                    chessmanB={CHESSMAN_YOURSELF_B}
                                />
                                :
                                dataChessBoard && ![dataChessBoard.userIdChessmanA, dataChessBoard.userIdChessmanB].includes(dataUser.userId)
                                ?
                                    <div className='sds'>
                                        <Button
                                            className={classes.joinChessBoard}
                                            onClick={() => {
                                                if (!dataChessBoard.userIdChessmanA) {
                                                    this.joinChessBoard('userIdChessmanA', dataUser.userId);
                                                }
                                                if (!dataChessBoard.userIdChessmanB) {
                                                    this.joinChessBoard('userIdChessmanB', dataUser.userId);
                                                }
                                            }}
                                        >
                                            join chess board
                                        </Button>
                                    </div>
                                :
                                <div className={classes.setupDataBoard}>
                                    {
                                        dataChessBoard && dataChessBoard.userIdChessmanA
                                    }
                                    {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
                                    {/*    Open Menu*/}
                                    {/*</Button>*/}
                                    {/*<Menu*/}
                                    {/*    id="simple-menu"*/}
                                    {/*    anchorEl={anchorEl}*/}
                                    {/*    keepMounted*/}
                                    {/*    open={Boolean(anchorEl)}*/}
                                    {/*    onClose={handleClose}*/}
                                    {/*>*/}
                                    {/*    <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                                    {/*    <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                    {/*    <MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                    {/*</Menu>*/}
                                </div>
                        }

                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </React.Fragment>
        );
    }
}

ChessBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataChessBoard: state.gameReducer.dataChessBoard,
    dataChessmans: state.gameReducer.dataChessmans,
    dataUser: state.gameReducer.dataUser,
});

const mapDispatchToProps = (dispatch) => {
    return {
        showDataChessBoard: (idChessBoard) => dispatch(gameActions.showDataChessBoard(idChessBoard)),
        saveDataChessBoard: (idChessBoard, dataChessBoard) => dispatch(gameActions.saveDataChessBoard(idChessBoard, dataChessBoard)),
        showDataChessmans: () => dispatch(gameActions.showDataChessmans()),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (ChessBoard);
