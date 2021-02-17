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
    CHESS_BOARD_TYPE_ONLINE,
} from "../../constants/constants";
import * as gameActions from "../../_actions/game";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import i18n from "../../i18n";
import Grid from "@material-ui/core/Grid";
import {ReactComponent as PersonIcon} from "../../images/person_icon.svg";
import Dialog from "@material-ui/core/Dialog";
import Slide from '@material-ui/core/Slide';
import NoiceWinIcon from "./../../images/notice_win.png";
import {NavLink} from "react-router-dom";
import * as links from "./../../constants/links";
import {Redirect} from "react-router";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    chessBoardWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        flexDirection: 'column',
        overflowY: 'scroll',
        backgroundColor: '#e0ece4',
        borderRadius: 9,
        margin: '0.5rem 1rem',
        '&::-webkit-scrollbar': {
            width: 9,
            height: 9,
        },
        '&::-webkit-scrollbar-track': {
            // background: '#ee6f57',
            // borderRadius: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 9,
            background: '#ee6f57',
        },
    },
    dialogNotice: {
        backgroundColor: 'rgb(251, 236, 236, 0.3)',
    },
    winNoticeWrapper: {
        backgroundColor: 'rgb(251, 236, 236, 0.3)',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    chessBoardProcess: {

    },
    infoChessmanA: {

    },
    itemChessman: {
        padding: '0.5rem',
        '& .title': {
            padding: '0.5rem 0rem',
            color: '#123152',
            fontWeight: 600,
        },
        '& .infoChessman': {
            backgroundColor: '#123152',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0.25rem 0.5rem',
            borderRadius: 11,
            '& .avatar': {
                width: 48,
                height: 48,
                '& img': {
                    width: '100%',
                    height: '100%',
                    border: '1px solid #fff',
                    borderRadius: 9,
                },
                '& svg': {
                    width: '100%',
                    height: '100%',
                    border: '1px solid #fff',
                    borderRadius: 9,
                },
            },
            '& .name': {
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.8rem',
                paddingLeft: '0.5rem',
            }
        },
    },
    setupDataBoard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        '& .title': {
            color: '#123152',
            width: '100%',
            padding: '0.5rem 0rem',
            fontSize: '0.9rem',
            fontWeight: 600,

        }
    },
    loadingWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStatus: {
        color: '#123152',
        fontSize: '1.1rem',
        fontWeight: 600,
        padding: '1rem 0rem',
    },
    joinChessBoardWrapper: {

    },
    btnJoinChessBoard: {
        marginTop: '1rem',
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        marginBottom: '1rem',
        color: '#dfe3f1',
        '&:hover': {
            backgroundColor: '#123152',
        }
    },
    iconChessman: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '& img': {
            width: 48,
            height: 48,
            border: '1px solid #fff',
            borderRadius: 9,
        },
        '& span': {
            fontWeight: 600,
            paddingLeft: '0.5rem',
            color: '#ffdead',
        }
    },
    submitSetup: {
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        marginTop: '1rem',
        color: '#fff',
        width: '100%',
        '&:hover': {
            backgroundColor: '#123152',
        }
    },
    btnChessman: {
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        marginTop: '0.25rem',
        width: '100%',
        '&:hover': {
            backgroundColor: '#123152',
        }
    },
    btnGoToChessBoard: {
        marginTop: '1rem',
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        marginBottom: '1rem',
        color: '#dfe3f1',
        '&:hover': {
            backgroundColor: '#123152',
        }
    }
});

const CHESS_A = 'CHESS_A';
const CHESS_B = 'CHESS_B';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
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
            checkShowChessBoard: false,
            openDialogNoticeWin: false,
            dataChessmanWin: null
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
        this.props.showDataChessBoard(this.props.match.params.idChessBoard);
    }

    joinChessBoard(userIdChessman, userId) {
        const {
            dataChessBoard,
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
        if (dataBoard.gameFinished) {
            dataChessBoard.chessBoardOpen = false
        }
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
        this.props.saveDataChessBoard(this.props.match.params.idChessBoard, dataChessBoard);
    }

    checkWinChessman(winChessman) {
        // dataChessmanWin
        const {
            dataChessBoard
        } = this.props;
        let dataChessmanWin = null;
        if (dataChessBoard && dataChessBoard.dataMembersBoard) {
            for (let [key, value] of Object.entries(dataChessBoard.dataMembersBoard)) {
                if (winChessman === value.userId ) {
                    dataChessmanWin = value;
                }
            }
        }
        dataChessBoard.dataChessmanWin = dataChessmanWin;
        dataChessBoard.openDialogNoticeWin = true;
        this.props.saveDataChessBoard(this.props.match.params.idChessBoard, dataChessBoard);

        this.setState({
           openDialogNoticeWin: true,
           // dataChessmanWin: dataChessmanWin
       })
    }

    closeDialogNoticeWin() {
        this.setState({
            openDialogNoticeWin: false
        })
    }

    render() {
        const {
            board,
            menuSelectChessmanIcon,
            dataSetupChessBoard,
            checkChess,
            // openDialogNoticeWin,
            // dataChessmanWin,
        } = this.state;
        const {
            classes,
            dataUserAuth,
            match,
            dataChessBoard,
            dataChessmans,
            dataUser,
        } = this.props;

        let openDialogNoticeWin = false;
        let dataChessmanWin = null;
        if (dataChessBoard) {
            openDialogNoticeWin = dataChessBoard.openDialogNoticeWin;
            dataChessmanWin = dataChessBoard.dataChessmanWin;
        }
        // console.log(checkChess);
        let checkHasChessmanIcon = false;
        if (dataChessBoard && dataChessBoard.userIdChessmanA === dataUser.userId && dataChessBoard.iconChessmanA) {
            checkHasChessmanIcon = true;
        } else if (dataChessBoard && dataChessBoard.userIdChessmanB === dataUser.userId && dataChessBoard.iconChessmanB) {
            checkHasChessmanIcon = true;
        }
        let checkUserIdChessmanAB = dataChessBoard && dataChessBoard.userIdChessmanA && dataChessBoard.userIdChessmanB;
        let checkIconChessmanAB = dataChessBoard && dataChessBoard.iconChessmanA && dataChessBoard.iconChessmanB;
        let checkIsChessman = false;
        if (checkUserIdChessmanAB) {
            checkIsChessman = [dataChessBoard.userIdChessmanA, dataChessBoard.userIdChessmanB].includes(dataUser.userId)
        }
        let dataChessmanA = null;
        let dataChessmanB = null;
        if (dataChessBoard && dataChessBoard.dataMembersBoard) {
            for (let [key, value] of Object.entries(dataChessBoard.dataMembersBoard)) {
                if (dataChessBoard.userIdChessmanA === value.userId) {
                    dataChessmanA = value;
                } else if (dataChessBoard.userIdChessmanB === value.userId) {
                    dataChessmanB = value;
                }
            }
        }
        if (dataChessBoard && dataChessBoard.dataBoard.gameFinished && !dataChessmanWin) {
            return <Redirect
                to={links.LINK_PAGE404}
            />
        }
        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.chessBoardWrapper}>
                        {
                            dataChessBoard
                            ?
                                checkUserIdChessmanAB
                            ?
                                    checkIconChessmanAB
                                    ?
                                        <div className={classes.chessBoardProcess}>
                                            <div className={classes.infoChessmanA}>
                                                <Grid container>
                                                    <Grid item xs={6} className={classes.itemChessman}>
                                                        <div className="title">
                                                            {i18n.t('chessBoard.chessBoardProcess.chessmanTitle.chessmanA')}
                                                        </div>
                                                        {dataChessmanA && <div className="infoChessman">
                                                            <div className="avatar">
                                                                {
                                                                    dataChessmanA.avatarUrl ? <img src={dataChessmanA.avatarUrl} alt=""/> : <PersonIcon/>
                                                                }
                                                            </div>
                                                            <div className="name">
                                                                {
                                                                    dataChessmanA.userId === dataUser.userId ? i18n.t('chessBoard.chessBoardProcess.you') : dataChessmanA.displayName ? dataChessmanA.displayName :
                                                                        dataChessmanA.email ? dataChessmanA.email :
                                                                            'user'
                                                                }
                                                            </div>
                                                        </div>}
                                                    </Grid>
                                                    <Grid item xs={6} className={classes.itemChessman}>
                                                        <div className="title">
                                                            {i18n.t('chessBoard.chessBoardProcess.chessmanTitle.chessmanB')}
                                                        </div>
                                                        {dataChessmanA && <div className="infoChessman">
                                                            <div className="avatar">
                                                                {
                                                                    dataChessmanB.avatarUrl ? <img src={dataChessmanB.avatarUrl} alt=""/> : <PersonIcon/>
                                                                }
                                                            </div>
                                                            <div className="name">
                                                                {
                                                                    dataChessmanB.userId === dataUser.userId ? i18n.t('chessBoard.chessBoardProcess.you') : dataChessmanB.displayName ? dataChessmanB.displayName :
                                                                        dataChessmanB.email ? dataChessmanB.email :
                                                                            'user'
                                                                }
                                                            </div>
                                                        </div>}
                                                    </Grid>
                                                </Grid>
                                            </div>
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
                                        </div>
                                : !checkHasChessmanIcon
                                    ?
                                        checkIsChessman
                                        ?
                                        <div className={classes.setupDataBoard}>
                                            <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.btnChessman} onClick={this.openMenuSelectChessmanIcon}>
                                                {dataSetupChessBoard && dataSetupChessBoard.iconChessman &&
                                                    <div className={classes.iconChessman}>
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
                                                            <img src={item.chessmanUrl} alt="" style={{width: 48, height: 48,}}/>
                                                            <span>{item.name}</span>
                                                        </MenuItem>);
                                                    })
                                                }
                                            </Menu>}
                                            <Button
                                                className={classes.submitSetup}
                                                onClick={this.submitSetupChessBoard}
                                            >
                                                {i18n.t('chessBoard.btn.submitSetup')}
                                            </Button>
                                        </div>
                                            :
                                            <div className={classes.textStatus}>
                                                {i18n.t('chessBoard.text.waiting_setup')}
                                            </div>
                                        :
                                        <div className={classes.textStatus}>
                                            {i18n.t('chessBoard.text.waiting_other_setup')}
                                        </div>                                    :
                                    ![dataChessBoard.userIdChessmanA, dataChessBoard.userIdChessmanB].includes(dataUser.userId)
                                        ?
                                        <div className={classes.joinChessBoardWrapper}>
                                            <Button
                                                className={classes.btnJoinChessBoard}
                                                onClick={() => {
                                                    if (!dataChessBoard.userIdChessmanA) {
                                                        this.joinChessBoard('userIdChessmanA', dataUser.userId);
                                                    } else if (!dataChessBoard.userIdChessmanB) {
                                                        this.joinChessBoard('userIdChessmanB', dataUser.userId);
                                                    }
                                                }}
                                            >
                                                {i18n.t('chessBoard.text.joinToChessBoard')}
                                            </Button>
                                        </div>
                                        :
                                        <div className={classes.textStatus}>
                                            {i18n.t('chessBoard.text.waiting_other_join')}
                                        </div>
                                :
                                <div className={classes.loadingWrapper}>
                                    <CircularProgress color="#123152"/>
                                </div>
                        }

                    </div>
                </Content>
                <Footer />
                <Dialog className={classes.dialogNotice} PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }} fullScreen open={openDialogNoticeWin} onClose={this.closeDialogNoticeWin} TransitionComponent={Transition}>
                    <div className={classes.winNoticeWrapper}>
                        <img src={NoiceWinIcon} alt=""/>
                        {
                            dataChessmanWin &&
                                <div className={classes.itemChessman}>
                                    {dataChessmanWin && <div className="infoChessman">
                                        <div className="avatar">
                                            {
                                                dataChessmanWin.avatarUrl ? <img src={dataChessmanWin.avatarUrl} alt=""/> : <PersonIcon/>
                                            }
                                        </div>
                                        <div className="name">
                                            {
                                                dataChessmanWin.userId === dataUser.userId ? i18n.t('chessBoard.chessBoardProcess.you') : dataChessmanWin.displayName ? dataChessmanWin.displayName :
                                                    dataChessmanWin.email ? dataChessmanWin.email :
                                                        'user'
                                            }
                                        </div>
                                    </div>}
                                </div>
                        }
                        <NavLink to={links.LINK_LIST_CHESS_BOARD} className={classes.goToListChessBoard}>
                            <Button className={classes.btnGoToChessBoard}>
                                {i18n.t('chessBoard.btn.goToListChessBoard')}
                            </Button>
                        </NavLink>
                    </div>
                </Dialog>
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
    withTranslation(),
) (ChessBoard);
