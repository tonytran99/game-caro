import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {initBoard} from "../../functions/functions";
import {checkGameFinished} from "./GameChecker";
import {CHESS_BOARD_TYPE_ONLINE, CHESSMAN_NONE} from "../../constants/constants";

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
            update: false
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
                dataBoardTrainingDefault: dataBoardTrainingDefault
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
        console.log(turnCurrent);
        console.log(chessmanUserId);
        if (!gameFinished && turnCurrent === chessmanUserId) {
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
            console.log(updateState);
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
        } = this.props;

        return (
            <GridList
                // className={useStyles(size)({}).gridList}
                cellHeight={30}
                cols={size}
                spacing={0}
                style={{
                    width: 30*size,
                    height: 30*size,
                }}
            >
                {
                    board.map((row, x) =>
                        row.map((cell, y) => {
                            return (
                                <GridListTile
                                    key={`row-${x}-cell-${y}`}
                                    style={{
                                        padding: '2px'
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'red',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        onClick={() => {
                                            if (cell === CHESSMAN_NONE) {
                                                this.playChessman(x, y);
                                            }
                                        }}
                                    >
                                        {
                                            (cell === chessmanA)
                                                ?
                                                <img style={{width: 30, height: 30}} src={iconChessmanA.chessmanUrl} alt={iconChessmanA.name ? iconChessmanA.name : ''}/>
                                                :
                                                (cell === chessmanB)
                                                    ?
                                                    <img style={{width: 30, height: 30}} src={iconChessmanB.chessmanUrl} alt={iconChessmanB.name ? iconChessmanB.name : ''}/>
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
    // withTranslation()
) (Board);
