import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {initBoard} from "../../functions/functions";
import {checkGameFinished} from "./GameChecker";
import {
    CHESS_BOARD_TYPE_ONLINE,
    CHESS_BOARD_TYPE_TRAINING_WITH_AI,
    CHESSMAN_AI_ID,
    CHESSMAN_NONE
} from "../../constants/constants";
import {nextMoveAI} from "./GameAI";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    welcomeWrapper: {

    }
});
class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countTurn: 0,
            turnCurrent: props.firstTurn,
            board: initBoard(props.size),
            updateState: false,
            chessmanUserId: props.chessmanUserId,
            gameFinished: false,
            dataBoardUpdateChessBoard: null,
            update: false,
            iconChessmanA: props.iconChessmanA,
            iconChessmanB: props.iconChessmanB,
            sizeChessBoard: props.size,
            firstTurn: props.firstTurn
        };

        this.playChessman = this.playChessman.bind(this);
    }

    componentDidMount() {
        const {
            dataBoardTrainingDefault,
            dataBoardUpdateChessBoard,
        } = this.props;
        if (dataBoardTrainingDefault) {
            this.setState({
                ...dataBoardTrainingDefault
            });
        }
        if (dataBoardUpdateChessBoard) {
            this.setState({
                ...dataBoardUpdateChessBoard,
                dataBoardUpdateChessBoard: dataBoardUpdateChessBoard
            });
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.dataBoardUpdateChessBoard && JSON.stringify(props.dataBoardUpdateChessBoard) !== JSON.stringify(state.dataBoardUpdateChessBoard)){
            return {
                update: true,
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            dataBoardUpdateChessBoard,
            chessBoardType,
            size
        } = this.props;
        if (this.state.update){
            this.setState({
                update: false,
            },function(){
                this.setState({
                    ...dataBoardUpdateChessBoard,
                    dataBoardUpdateChessBoard: dataBoardUpdateChessBoard
                });
            });
        }

        if (chessBoardType === CHESS_BOARD_TYPE_TRAINING_WITH_AI) {
            const {
                turnCurrent,
                board,
            } = this.state;
            if (turnCurrent === CHESSMAN_AI_ID) {
                const nextMoveAIOK = nextMoveAI(board, size);
                this.playChessman(nextMoveAIOK.x, nextMoveAIOK.y);
            }
        }
    }

    playChessman(x, y) {
        const {
            turnCurrent,
            board,
            countTurn,
            gameFinished
        } = this.state;
        const {
            chessmanA,
            chessmanB,
            size,
            chessBoardType,
            chessmanUserId,
        } = this.props;
        let stateCurrent = this.state;

        if (!gameFinished && (chessBoardType === CHESS_BOARD_TYPE_ONLINE ? turnCurrent === chessmanUserId : true)) {
            let updateState = {};
            let boardTemp = board;
            // board
            boardTemp[x][y] = turnCurrent;
            updateState = {
                ...updateState,
                countTurn: countTurn + 1,
                updateState: true
            }
            updateState.board = boardTemp;
            if (chessBoardType === CHESS_BOARD_TYPE_ONLINE) {
                if (turnCurrent === chessmanA ) {
                    updateState.turnCurrent = chessmanB;
                } else {
                    updateState.turnCurrent = chessmanA;
                }
            } else {
                if (turnCurrent === chessmanA ) {
                    updateState.turnCurrent = chessmanB;
                } else {
                    updateState.turnCurrent = chessmanA;
                }
            }

            if (checkGameFinished(boardTemp, size, chessmanA)) {
                this.props.checkWinChessman(chessmanA);
                updateState.gameFinished = true;
            } else if (checkGameFinished(boardTemp, size, chessmanB)) {
                this.props.checkWinChessman(chessmanB);
                updateState.gameFinished = true;
            }
            stateCurrent = {
                ...stateCurrent,
                ...updateState
            }
            this.props.getDataBoardCurrent(stateCurrent);
            this.setState(updateState);
        }

    }

    render() {
        const {
            board,
            turnCurrent,
            countTurn,
        } = this.state;
        const {
            classes,
            dataUserAuth,
            size,
            // board,
            chessmanA,
            chessmanB,
            iconChessmanA,
            iconChessmanB,
            dataBoardTrainingDefault,
            canPlayChess,
            chessBoardType
        } = this.props;
        return (
            <GridList
                cellHeight={size <= 12 ? 40 : size > 12 && size <= 15 ? 36 : (size > 15 && size <= 17 ) ? 33 : 30}
                cols={size}
                spacing={0}
                style={{
                    width: size <= 12 ? 40*size : size > 12 && size <= 15 ? 36*size : (size > 15 && size <= 17 ) ? 33*size : 30*size,
                    height: size <= 12 ? 40*size : size > 12 && size <= 15 ? 36*size : (size > 15 && size <= 17 ) ? 33*size : 30*size,
                }}
            >
                {
                    board.map((row, x) =>
                        row.map((cell, y) => {
                            return (
                                <GridListTile
                                    key={`row-${x}-cell-${y}`}
                                    style={{
                                        border: '1px solid #056676'
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: '#e8ded2',
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItem: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            if (cell === CHESSMAN_NONE) {
                                                if (canPlayChess || canPlayChess === undefined) {
                                                    if (chessBoardType === CHESS_BOARD_TYPE_TRAINING_WITH_AI) {
                                                        if (turnCurrent !== CHESSMAN_AI_ID) {
                                                            this.playChessman(x, y);
                                                        }
                                                    } else {
                                                        this.playChessman(x, y);
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        {
                                            (cell === chessmanA)
                                                ?
                                                <img style={{
                                                    width:  size <= 12 ? 36 : size > 12 && size <= 15 ? 33 : (size > 15 && size <= 17 ) ? 30 : 27,
                                                    height: size <= 12 ? 36 : size > 12 && size <= 15 ? 33 : (size > 15 && size <= 17 ) ? 30 : 27,
                                                    cursor: 'pointer'
                                                }} src={iconChessmanA.chessmanUrl} alt={iconChessmanA.name ? iconChessmanA.name : ''}/>
                                                :
                                                (cell === chessmanB)
                                                    ?
                                                    <img style={{
                                                        width: size <= 12 ? 36 : size > 12 && size <= 15 ? 33 : (size > 15 && size <= 17 ) ? 30 : 27,
                                                        height: size <= 12 ? 36 : size > 12 && size <= 15 ? 33 : (size > 15 && size <= 17 ) ? 30 : 27,
                                                        cursor: 'pointer'
                                                    }} src={iconChessmanB.chessmanUrl} alt={iconChessmanB.name ? iconChessmanB.name : ''}/>
                                                    :
                                                    ''
                                        }
                                    </div>
                                </GridListTile>
                            );
                        })
                    )
                }
            </GridList>
        );
    }
}

Board.propTypes = {
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
) (Board);
