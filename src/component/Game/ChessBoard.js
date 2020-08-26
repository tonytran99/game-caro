import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import Board from "./Board";
import {
    BOARD_GROUP,
    BOARD_TW0,
    CHESS_BOARD_TYPE_ONLINE,
    CHESSMAN_YOURSELF_A,
    CHESSMAN_YOURSELF_B,
    GROUP_BOARD
} from "../../constants/constants";
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

const CHESS_A = 'CHESS_A';
const CHESS_B = 'CHESS_B';

class ChessBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuSelectChessmanIcon: null,
            dataSetupChessBoard: {
                iconChessman: null
            },
            checkChess: null,
            checkShowChessmans: false,
            checkShowChessBoard: false
        };

        this.joinChessBoard = this.joinChessBoard.bind(this);
        this.openMenuSelectChessmanIcon = this.openMenuSelectChessmanIcon.bind(this);
        this.closeMenuSelectChessmanIcon = this.closeMenuSelectChessmanIcon.bind(this);
        this.handleChessmanChange = this.handleChessmanChange.bind(this);
        this.submitSetupChessBoard = this.submitSetupChessBoard.bind(this);
        this.getDataBoardCurrent = this.getDataBoardCurrent.bind(this);
        this.checkWinChessman = this.checkWinChessman.bind(this);
    }

    componentDidMount() {
        const {
            dataChessBoard,
            dataUser,
            dataChessmans
        } = this.props;
        const {
            dataSetupChessBoard
        } = this.state;
        this.props.showDataChessBoard(this.props.match.params.idChessBoard);
        // if (!(dataChessBoard && dataChessBoard.dataBoard && dataChessBoard.dataBoard.iconChessmanA)) {
        //     this.props.showDataChessmans();
        // }
        // console.log(dataChessBoard);
        //

    }

    joinChessBoard(userIdChessman, userId) {
        const {
            dataChessBoard,
            chessBoardType,
            dataUser
        } = this.props;
        dataChessBoard[userIdChessman] = userId;
        if (!dataChessBoard.dataMembersBoard[userId]) {
            dataChessBoard.dataMembersBoard[userId] = dataUser;
            dataChessBoard.chessBoardOpen = false;
        }
        this.props.saveDataChessBoard(this.props.match.params.idChessBoard, dataChessBoard);
    }

    openMenuSelectChessmanIcon(event) {
        this.setState({
            menuSelectChessmanIcon: event.currentTarget
        })
    }

    closeMenuSelectChessmanIcon() {
        this.setState({
            menuSelectChessmanIcon: null
        })
    }

    handleChessmanChange(chessman) {
        const {
            dataSetupChessBoard,
            checkChess
        } = this.state;
        dataSetupChessBoard.iconChessman = chessman;
        this.closeMenuSelectChessmanIcon();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            dataChessBoard,
            dataUser,
            dataChessmans
        } = this.props;
        const {
            checkShowChessmans,
            checkChess,
            dataSetupChessBoard,
            checkShowChessBoard
        } = this.state;

        if (dataChessBoard && dataChessBoard.userIdChessmanA && dataChessBoard.userIdChessmanB && !checkShowChessBoard) {
            this.setState({
                checkShowChessBoard: true
            })
            if (dataChessBoard.userIdChessmanA === dataUser.userId) {
                this.setState({
                    checkChess: CHESS_A
                });
                if (!dataChessBoard.iconChessmanA) {
                    this.props.showDataChessmans();
                }
            } else if (dataChessBoard.userIdChessmanB === dataUser.userId) {
                this.setState({
                    checkChess: CHESS_B
                });
                if (!dataChessBoard.iconChessmanB) {
                    this.props.showDataChessmans();
                }
            }
        }

        if (Array.isArray(dataChessmans) && dataChessmans.length && !checkShowChessmans && checkChess) {
            if (checkChess === CHESS_A) {
                dataSetupChessBoard.iconChessman = dataChessmans[0];
            } else {
                dataSetupChessBoard.iconChessman = dataChessmans[1];
            }
            this.setState({
                checkShowChessmans: true,
                dataSetupChessBoard: dataSetupChessBoard
            })
        }
    }

    submitSetupChessBoard() {
        const {
            dataSetupChessBoard,
            checkChess,
        } = this.state;
        const {
            dataChessBoard,
            dataUser,
            dataChessmans
        } = this.props;
        let checkSubmit = false;
        if (checkChess === CHESS_A) {
            if (!dataChessBoard.iconChessmanB || (dataSetupChessBoard.iconChessman && dataChessBoard.iconChessmanB.chessmanId !== dataSetupChessBoard.iconChessman.chessmanId)) {
                checkSubmit = true;
            }
        } else {
            if (!dataChessBoard.iconChessmanA || (dataSetupChessBoard.iconChessman && dataChessBoard.iconChessmanA.chessmanId !== dataSetupChessBoard.iconChessman.chessmanId)) {
                checkSubmit = true;
            }
        }
        if (checkSubmit) {
            if (checkChess === CHESS_A) {
                dataChessBoard.iconChessmanA = dataSetupChessBoard.iconChessman;
            } else {
                dataChessBoard.iconChessmanB = dataSetupChessBoard.iconChessman;
            }
            this.props.saveDataChessBoard(this.props.match.params.idChessBoard, dataChessBoard);
        }
    }

    getDataBoardCurrent(dataBoard) {
        console.log(dataBoard);
       const {
           dataChessBoard
       } = this.props;
       delete dataBoard.chessmanUserId;
        delete dataBoard.dataBoardUpdateChessBoard;
        delete dataBoard.updateState;
        delete dataBoard.update;

        dataChessBoard.dataBoard = {
           ...dataChessBoard.dataBoard,
           ...dataBoard
       };
        // let board = {};
        // let boardRow;
        // dataChessBoard.dataBoard.board.map((item, index) => {
        //     boardRow = {};
        //     item.map((itemRow, indexRow) => {
        //         boardRow[indexRow] = itemRow ? itemRow : 0;
        //     });
        //     board[index] = boardRow;
        // });
        // dataChessBoard.dataBoard.board = board;
        console.log(dataChessBoard);
        this.props.saveDataChessBoard(this.props.match.params.idChessBoard, dataChessBoard);
    }

    checkWinChessman(winChessman) {
        console.log(winChessman + ' - win');
    }

    render() {
        const {
            board,
            menuSelectChessmanIcon,
            dataSetupChessBoard,
            checkChess
        } = this.state;
        const {
            classes,
            dataUserAuth,
            match,
            dataChessBoard,
            dataChessmans,
            dataUser,
        } = this.props;
        console.log(dataChessBoard);
        // console.log(checkChess);
        let checkHasChessmanIcon = false;
        if (dataChessBoard && dataChessBoard.userIdChessmanA === dataUser.userId && dataChessBoard.iconChessmanA) {
            checkHasChessmanIcon = true;
        } else if (dataChessBoard && dataChessBoard.userIdChessmanB === dataUser.userId && dataChessBoard.iconChessmanB) {
            checkHasChessmanIcon = true;
        }
        console.log(checkHasChessmanIcon);
        let checkUserIdChessmanAB = dataChessBoard && dataChessBoard.userIdChessmanA && dataChessBoard.userIdChessmanB;
        let checkIconChessmanAB = dataChessBoard && dataChessBoard.iconChessmanA && dataChessBoard.iconChessmanB;
        let checkIsChessman = false;
        if (checkUserIdChessmanAB) {
            checkIsChessman = [dataChessBoard.userIdChessmanA, dataChessBoard.userIdChessmanB].includes(dataUser.userId)
        }
        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.trainingWithAIWrapper}>
                        {
                            dataChessBoard
                            ?
                                checkUserIdChessmanAB
                            ?
                                    checkIconChessmanAB
                                    ?
                                <Board
                                    size={dataChessBoard.dataBoard && dataChessBoard.dataBoard.sizeChessBoard ? dataChessBoard.dataBoard.sizeChessBoard : 10}
                                    chessmanA={dataChessBoard.userIdChessmanA}
                                    chessmanB={dataChessBoard.userIdChessmanB}
                                    firstTurn={dataChessBoard.userIdChessmanA}
                                    iconChessmanA={dataChessBoard.iconChessmanA}
                                    iconChessmanB={dataChessBoard.iconChessmanB}
                                    getDataBoardCurrent={this.getDataBoardCurrent}
                                    dataBoardUpdateChessBoard={dataChessBoard.dataBoard}
                                    checkWinChessman={this.checkWinChessman}
                                    chessBoardType={CHESS_BOARD_TYPE_ONLINE}
                                    chessmanUserId={dataUser.userId}
                                    canPlayChess={checkIsChessman}
                                />
                                : !checkHasChessmanIcon
                                    ?
                                        checkIsChessman
                                        ?
                                        <div className={classes.setupDataBoard}>
                                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.openMenuSelectChessmanIcon}>
                                                {dataSetupChessBoard && dataSetupChessBoard.iconChessman &&
                                                    <div>
                                                        <img src={dataSetupChessBoard.iconChessman.chessmanUrl} alt="" style={{width: 50, height: 50}}/>
                                                        <span>{dataSetupChessBoard.iconChessman.name}</span>
                                                    </div>
                                                }
                                            </Button>
                                            {menuSelectChessmanIcon && <Menu
                                                id="simple-menu"
                                                anchorEl={menuSelectChessmanIcon}
                                                keepMounted
                                                open={true}
                                                onClose={this.closeMenuSelectChessmanIcon}
                                            >
                                                {
                                                    dataChessmans.map((item, index) => {
                                                        return (<MenuItem onClick={() => this.handleChessmanChange(item)}>
                                                            <img src={item.chessmanUrl} alt="" style={{width: 50, height: 50}}/>
                                                            <span>{item.name}</span>
                                                        </MenuItem>);
                                                    })
                                                }
                                            </Menu>}
                                            <Button
                                                className="submitSetup"
                                                onClick={this.submitSetupChessBoard}
                                            >
                                                Submit Setup
                                            </Button>
                                        </div>
                                            :
                                            <div>Van chua duoc setup</div>
                                        :
                                        <div>Doi ty thang kia setup da</div>
                                    :
                                    ![dataChessBoard.userIdChessmanA, dataChessBoard.userIdChessmanB].includes(dataUser.userId)
                                        ?
                                        <div className='sds'>
                                            <Button
                                                className={classes.joinChessBoard}
                                                onClick={() => {
                                                    if (!dataChessBoard.userIdChessmanA) {
                                                        this.joinChessBoard('userIdChessmanA', dataUser.userId);
                                                    } else if (!dataChessBoard.userIdChessmanB) {
                                                        this.joinChessBoard('userIdChessmanB', dataUser.userId);
                                                    }
                                                }}
                                            >
                                                join chess board
                                            </Button>
                                        </div>
                                        :
                                        <div>Doi thang kia join vao da</div>
                                :
                                <div>'loading'</div>
                        }

                    </div>
                </Content>
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
