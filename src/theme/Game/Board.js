import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {initBoard} from "../../functions/functions";
import {checkGameFinished} from "./GameChecker";

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
            gameFinished: false
        };

        this.playChessman = this.playChessman.bind(this);
    }

    componentDidMount() {
        if (this.props.dataBoardTrainingDefault) {
            this.setState(this.props.dataBoardTrainingDefault);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.updateState && !this.state.gameFinished) {
            console.log('updateState updateState updateState')
            this.props.getDataBoardCurrent(this.state);
            this.setState({
                updateState: false
            })
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
            size
        } = this.props;
        if (!gameFinished) {
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
            if (turnCurrent === chessmanA) {
                updateState.turnCurrent = chessmanB;
            } else {
                updateState.turnCurrent = chessmanA;
            }
            if (checkGameFinished(boardTemp, size, chessmanA)) {
                this.props.checkWinChessman(chessmanA);
                updateState.gameFinished = true;
            } else if (checkGameFinished(boardTemp, size, chessmanB)) {
                this.props.checkWinChessman(chessmanB);
                updateState.gameFinished = true;
            }
            console.log("AAAAAAAAAAAa asdas asd")
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
        } = this.props;
        console.log(board);
        console.log(turnCurrent);
        console.log(countTurn);
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
                                            if (cell === null) {
                                                this.playChessman(x, y);
                                            }
                                        }}
                                    >
                                        {
                                            (cell === chessmanA)
                                                ?
                                                iconChessmanA
                                                :
                                                (cell === chessmanB)
                                                    ?
                                                    iconChessmanB
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
