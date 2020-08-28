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
    CHESS_BOARD_TYPE_ONLINE, CHESS_BOARD_TYPE_TRAINING_WITH_AI,
    CHESSMAN_AI_ID,
    CHESSMAN_PLAYER,
    CHESSMAN_YOURSELF_A,
    CHESSMAN_YOURSELF_B
} from "../../constants/constants";
import * as gameActions from "../../_actions/game";
import DialogForm from "../../theme/DialogForm";
import i18n from "../../i18n";
import Button from "@material-ui/core/Button";
import AppInput from "../../theme/AppInput";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import NoiceWinIcon from "../../images/notice_win.png";
import {ReactComponent as PersonIcon} from "../../images/person_icon.svg";
import {NavLink} from "react-router-dom";
import * as links from "../../constants/links";
import Slide from "@material-ui/core/Slide";
import {withTranslation} from "react-i18next";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const styles = theme => ({
    trainingWithAI: {
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
    noticeWin: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        '& img': {
            width: 48,
            height: 48,
            borderRadius: 11
        },
        '& .text': {
            color: '#d54062',
            fontSize: '0.9rem',
            fontWeight: 600,
            paddingLeft: '0.5rem'
        }
    },
    trainingHeader: {
        color: '#123152',
        width: '100%',
        fontSize: '1.2rem',
        textAlign: 'center',
        fontWeight: 700,
        padding: '1rem 0rem'
    },
    btnNewChessBoard: {
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        margin: '0.5rem 0rem',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#123152',
        }
    },
    sizeInput: {
        width: '100%',
    },
    setupBoardWrapper: {

    },
    btnSetupBoard: {
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
    selectChessman: {
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
    notChessman: {
        color: '#ffdead',
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
});
class TrainingWithAI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            showBoard: false,
            setupBoardCheck: false,
            dataBoardTrainingWithAI: null,
            chessmanWin: null,
            setupBoard: {
                sizeChessBoard: 10,
                iconChessmanA: null,
                iconChessmanB: null,
                firstTurn: CHESSMAN_PLAYER,
            },
            menuSelectChessmanAIcon: null,
            menuSelectChessmanBIcon: null,
            checkShowChessman: false,
            setupChessmanDone: false
        };

        this.getDataBoardCurrent = this.getDataBoardCurrent.bind(this);
        this.handleDisagree = this.handleDisagree.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
        this.checkWinChessman = this.checkWinChessman.bind(this);
        this.handleSetupBoardChange = this.handleSetupBoardChange.bind(this);
        this.setupBoard = this.setupBoard.bind(this);
        this.createNewChessBoard = this.createNewChessBoard.bind(this);

        this.openMenuSelectChessmanAIcon = this.openMenuSelectChessmanAIcon.bind(this);
        this.closeMenuSelectChessmanAIcon = this.closeMenuSelectChessmanAIcon.bind(this);
        this.openMenuSelectChessmanBIcon = this.openMenuSelectChessmanBIcon.bind(this);
        this.closeMenuSelectChessmanBIcon = this.closeMenuSelectChessmanBIcon.bind(this);

    }

    openMenuSelectChessmanAIcon(event) {
        this.setState({
            menuSelectChessmanAIcon: event.currentTarget
        });
    }
    closeMenuSelectChessmanAIcon() {
        this.setState({
            menuSelectChessmanAIcon: null
        });
    }
    openMenuSelectChessmanBIcon(event) {
        this.setState({
            menuSelectChessmanBIcon: event.currentTarget
        });
    }
    closeMenuSelectChessmanBIcon() {
        this.setState({
            menuSelectChessmanBIcon: null
        });
    }

    componentDidMount() {
        const {
            dataBoardTrainingWithAI,
            dataUserAuth
        } = this.props;
        this.props.showDataChessmans();
        if (dataBoardTrainingWithAI && (dataBoardTrainingWithAI.chessmanUserId === (dataUserAuth ? dataUserAuth.uid : null))) {
            this.setState({
                openDialog: true
            });
        } else {
            this.setState({
                setupBoardCheck: true
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            dataChessmans,
            dataBoardTrainingWithAI
        } = this.props;
        const {
            setupBoard,
            checkShowChessman,
            chessmanWin
        } = this.state;
        if (dataChessmans && Array.isArray(dataChessmans) && dataChessmans.length >= 2 && !checkShowChessman) {
            setupBoard.iconChessmanA = dataChessmans[0];
            setupBoard.iconChessmanB = dataChessmans[1];
            this.setState({
                checkShowChessman: true,
                setupBoard: setupBoard
            });
        }
        if (chessmanWin && dataBoardTrainingWithAI) {
            this.props.saveDataBoardTrainingWithAI(null);
        }

    }

    getDataBoardCurrent(dataBoard) {
        this.props.saveDataBoardTrainingWithAI(dataBoard);
    }

    checkWinChessman(chessmanWin) {
        this.props.saveDataBoardTrainingWithAI(null);
        this.setState({
            chessmanWin: chessmanWin
        })
    }

    handleDisagree() {
        this.props.saveDataBoardTrainingWithAI(null);
        this.createNewChessBoard();
    }

    handleAgree() {
        const {
            setupBoard
        } = this.state;
        const {
            dataBoardTrainingWithAI
        } = this.props;
        setupBoard.iconChessmanA =dataBoardTrainingWithAI.iconChessmanA;
        setupBoard.iconChessmanB =dataBoardTrainingWithAI.iconChessmanB;
        setupBoard.sizeChessBoard =dataBoardTrainingWithAI.sizeChessBoard;
        setupBoard.firstTurn =dataBoardTrainingWithAI.firstTurn;

        this.setState({
            openDialog: false,
            showBoard: true,
            dataBoardTrainingWithAI: dataBoardTrainingWithAI,
            setupBoard: setupBoard
        });
    }

    handleSetupBoardChange(name, value) {
        const {
            setupBoard
        } = this.state;
        if (name === 'iconChessmanA') {
            if (setupBoard.iconChessmanB && value.chessmanId === setupBoard.iconChessmanB.chessmanId) {
                setupBoard.iconChessmanB = null;
            }
        } else if (name === 'iconChessmanB') {
            if (setupBoard.iconChessmanA && value.chessmanId === setupBoard.iconChessmanA.chessmanId) {
                setupBoard.iconChessmanA = null;
            }
        } else if (name === 'sizeChessBoard') {
            if (value < 10 || value > 20) {
                value = setupBoard.sizeChessBoard
            }
        }

        this.setState({
            setupBoard: {
                ...setupBoard,
                [name]: value
            },
            menuSelectChessmanAIcon: null,
            menuSelectChessmanBIcon: null
        })
    }

    setupBoard() {
        const {
            setupBoard
        } = this.state;
        if (setupBoard.sizeChessBoard && setupBoard.sizeChessBoard >= 10 && setupBoard.iconChessmanA && setupBoard.iconChessmanB) {
            this.setState({
                showBoard: true
            });
        }
    }

    createNewChessBoard() {
        this.setState({
            showBoard: false,
            setupBoardCheck: true,
            chessmanWin: null,
            setupBoard: {
                sizeChessBoard: 10,
                iconChessmanA: null,
                iconChessmanB: null,
                firstTurn: CHESSMAN_PLAYER,
            },
            checkShowChessman: false,
            setupChessmanDone: false,
            openDialog: false,
            dataBoardTrainingWithAI: null
        });
    }


    render() {
        const {
            openDialog,
            showBoard,
            dataBoardTrainingWithAI,
            chessmanWin,
            setupBoard,
            setupBoardCheck,
            menuSelectChessmanAIcon,
            menuSelectChessmanBIcon,
            checkShowChessman,
        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataChessmans
        } = this.props;
        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.trainingWithAI}>
                        <div className={classes.trainingHeader}>
                            {i18n.t('trainingWithAI.header')}
                        </div>

                        {setupBoardCheck && !showBoard && <div className={classes.setupBoardWrapper}>
                            <AppInput
                                className={classes.sizeInput}
                                type="number"
                                name="sizeChessBoard"
                                value={setupBoard.sizeChessBoard}
                                onChange={(event) => this.handleSetupBoardChange('sizeChessBoard', event.target.value)}
                                inputProps={{
                                    min: 10,
                                    max: 20
                                }}
                            />
                            <div className={classes.selectChessman}>
                                <span className="title">{i18n.t('trainingWithAI.setupBoard.selectChessmanA.title')}</span>
                                { checkShowChessman && <Button aria-controls="simple-menu" className={classes.btnChessman}  aria-haspopup="true" onClick={this.openMenuSelectChessmanAIcon}>
                                    {setupBoard && setupBoard.iconChessmanA ?
                                        <div className={classes.iconChessman}>
                                            <img src={setupBoard.iconChessmanA.chessmanUrl} alt="" style={{width: 50, height: 50}}/>
                                            <span>{setupBoard.iconChessmanA.name}</span>
                                        </div> :
                                        <div className={classes.notChessman}>
                                            {i18n.t('trainingWithAI.setupBoard.selectChessmanA.title')}
                                        </div>
                                    }
                                </Button>}
                                {menuSelectChessmanAIcon && <Menu
                                    id="simple-menu"
                                    anchorEl={menuSelectChessmanAIcon}
                                    keepMounted
                                    open={true}
                                    onClose={this.closeMenuSelectChessmanAIcon}
                                >
                                    {
                                        dataChessmans.map((item, index) => {
                                            return (<MenuItem onClick={() => this.handleSetupBoardChange('iconChessmanA', item)}>
                                                <img src={item.chessmanUrl} alt="" style={{width: 48, height: 48,}}/>
                                                <span>{item.name}</span>
                                            </MenuItem>);
                                        })
                                    }
                                </Menu>}
                            </div>
                            <div className={classes.selectChessman}>
                                <span className="title">{i18n.t('trainingWithAI.setupBoard.selectChessmanB.title')}</span>
                                { checkShowChessman && <Button aria-controls="simple-menu" className={classes.btnChessman} aria-haspopup="true" onClick={this.openMenuSelectChessmanBIcon}>
                                    {setupBoard && setupBoard.iconChessmanB ?
                                        <div className={classes.iconChessman}>
                                            <img src={setupBoard.iconChessmanB.chessmanUrl} alt="" style={{width: 50, height: 50}}/>
                                            <span>{setupBoard.iconChessmanB.name}</span>
                                        </div> :
                                        <div className={classes.notChessman}>
                                            {i18n.t('trainingWithAI.setupBoard.selectChessmanB.title')}
                                        </div>
                                    }
                                </Button>}
                                {menuSelectChessmanBIcon && <Menu
                                    id="simple-menu"
                                    anchorEl={menuSelectChessmanBIcon}
                                    keepMounted
                                    open={true}
                                    onClose={this.closeMenuSelectChessmanBIcon}
                                >
                                    {
                                        dataChessmans.map((item, index) => {
                                            return (<MenuItem onClick={() => this.handleSetupBoardChange('iconChessmanB', item)}>
                                                <img src={item.chessmanUrl} alt="" style={{width: 50, height: 50}}/>
                                                <span>{item.name}</span>
                                            </MenuItem>);
                                        })
                                    }
                                </Menu>}
                            </div>
                            <Button
                                className={classes.btnSetupBoard}
                                onClick={this.setupBoard}
                            >
                                {i18n.t('trainingWithAI.setupBoard.btnSubmit')}
                            </Button>
                        </div>}
                        {showBoard && <Board
                            size={setupBoard.sizeChessBoard}
                            chessmanA={CHESSMAN_AI_ID}
                            chessmanB={CHESSMAN_PLAYER}
                            firstTurn={setupBoard.firstTurn}
                            chessmanUserId={dataUserAuth ? dataUserAuth.uid : null}
                            iconChessmanA={setupBoard.iconChessmanA}
                            iconChessmanB={setupBoard.iconChessmanB}
                            chessBoardType={CHESS_BOARD_TYPE_TRAINING_WITH_AI}
                            getDataBoardCurrent={this.getDataBoardCurrent}
                            dataBoardTrainingDefault={dataBoardTrainingWithAI}
                            checkWinChessman={this.checkWinChessman}
                        />}
                    </div>
                </Content>
                <Footer />
                <DialogForm
                    dialogProps={{
                        open: openDialog
                    }}
                    messageProps={{
                        content: i18n.t('trainingWithAI.dialog.content_continue'),
                        color: ''
                    }}
                    disagreeButtonProps={{
                        handleDisagree: this.handleDisagree,
                        background: '',
                        content: i18n.t('trainingWithAI.dialog.no'),
                    }}
                    agreeButtonProps={{
                        handleAgree: this.handleAgree,
                        background: '',
                        content: i18n.t('trainingWithAI.dialog.yes'),
                    }}
                />
                <Dialog className={classes.dialogNotice} PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }} fullScreen open={chessmanWin && setupBoard} TransitionComponent={Transition}>
                    <div className={classes.winNoticeWrapper}>
                        <img src={NoiceWinIcon} alt=""/>
                        {setupBoard && setupBoard.iconChessmanA && setupBoard.iconChessmanB && <div className={classes.noticeWin}>
                            {
                                chessmanWin === CHESSMAN_AI_ID
                                    ?
                                    <React.Fragment>
                                        <img src={setupBoard.iconChessmanA.chessmanUrl} alt=""/>
                                        <span className="text">{i18n.t('trainingWithAI.setupBoard.noticeWin.chessmanA')}</span>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <img src={setupBoard.iconChessmanB.chessmanUrl} alt=""/>
                                        <span className="text">{i18n.t('trainingWithAI.setupBoard.noticeWin.chessmanB')}</span>
                                    </React.Fragment>
                            }
                        </div>}
                        <Button
                            className={classes.btnNewChessBoard}
                            onClick={this.createNewChessBoard}
                        >
                            {i18n.t('trainingWithAI.setupBoard.noticeWin.newChessBoard')}
                        </Button>
                    </div>
                </Dialog>
            </React.Fragment>
        );
    }
}

TrainingWithAI.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataChessmans: state.gameReducer.dataChessmans,
    dataBoardTrainingWithAI: state.gameReducer.dataBoardTrainingWithAI
});

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataBoardTrainingWithAI: (dataTraining) => dispatch(gameActions.saveDataBoardTrainingWithAI(dataTraining)),
        showDataChessmans: () => dispatch(gameActions.showDataChessmans()),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
) (TrainingWithAI);
