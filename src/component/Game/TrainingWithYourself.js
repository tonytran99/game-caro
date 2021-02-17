import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import Board from "./Board";
import {CHESSMAN_YOURSELF_A, CHESSMAN_YOURSELF_B} from "../../constants/constants";
import * as gameActions from "../../_actions/game";
import DialogForm from "../../theme/DialogForm";
import i18n from "../../i18n";
import Button from "@material-ui/core/Button";
import AppInput from "../../theme/AppInput";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import NoiceWinIcon from "../../images/notice_win.png";
import Slide from "@material-ui/core/Slide";
import {withTranslation} from "react-i18next";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const styles = theme => ({
    trainingWithYourselfWrapper: {
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
            color: '#81b214',
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
class TrainingWithYourself extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            showBoard: false,
            setupBoardCheck: false,
            dataBoardTrainingWithYourself: null,
            chessmanWin: null,
            setupBoard: {
                sizeChessBoard: 10,
                iconChessmanA: null,
                iconChessmanB: null,
                firstTurn: CHESSMAN_YOURSELF_A,
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
            dataBoardTrainingWithYourself,
            dataUserAuth
        } = this.props;
        this.props.showDataChessmans();
        if (dataBoardTrainingWithYourself && (dataBoardTrainingWithYourself.chessmanUserId === (dataUserAuth ? dataUserAuth.uid : null))) {
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
            dataBoardTrainingWithYourself
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
        if (chessmanWin && dataBoardTrainingWithYourself) {
            this.props.saveDataBoardTrainingWithYourself(null);
        }

    }

    getDataBoardCurrent(dataBoard) {
        this.props.saveDataBoardTrainingWithYourself(dataBoard);
    }

    checkWinChessman(chessmanWin) {
        this.props.saveDataBoardTrainingWithYourself(null);
        this.setState({
            chessmanWin: chessmanWin
        })
    }

    handleDisagree() {
        this.props.saveDataBoardTrainingWithYourself(null);
        this.createNewChessBoard();
    }

    handleAgree() {
        const {
            setupBoard
        } = this.state;
        const {
            dataBoardTrainingWithYourself
        } = this.props;
        setupBoard.iconChessmanA =dataBoardTrainingWithYourself.iconChessmanA;
        setupBoard.iconChessmanB =dataBoardTrainingWithYourself.iconChessmanB;
        setupBoard.sizeChessBoard =dataBoardTrainingWithYourself.sizeChessBoard;
        setupBoard.firstTurn =dataBoardTrainingWithYourself.firstTurn;

        this.setState({
            openDialog: false,
            showBoard: true,
            dataBoardTrainingWithYourself: dataBoardTrainingWithYourself,
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
                firstTurn: CHESSMAN_YOURSELF_A,
            },
            checkShowChessman: false,
            setupChessmanDone: false,
            openDialog: false,
            dataBoardTrainingWithYourself: null
        });
    }


    render() {
        const {
            openDialog,
            showBoard,
            dataBoardTrainingWithYourself,
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
                    <div className={classes.trainingWithYourselfWrapper}>
                        <div className={classes.trainingHeader}>
                            {i18n.t('trainingWithYourself.header')}
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
                                <span className="title">{i18n.t('trainingWithYourself.setupBoard.selectChessmanA.title')}</span>
                                { checkShowChessman && <Button aria-controls="simple-menu" className={classes.btnChessman}  aria-haspopup="true" onClick={this.openMenuSelectChessmanAIcon}>
                                    {setupBoard && setupBoard.iconChessmanA ?
                                    <div className={classes.iconChessman}>
                                        <img src={setupBoard.iconChessmanA.chessmanUrl} alt="" style={{width: 50, height: 50}}/>
                                        <span>{setupBoard.iconChessmanA.name}</span>
                                    </div> :
                                        <div className={classes.notChessman}>
                                            {i18n.t('trainingWithYourself.setupBoard.selectChessmanA.title')}
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
                                <span className="title">{i18n.t('trainingWithYourself.setupBoard.selectChessmanB.title')}</span>
                                { checkShowChessman && <Button aria-controls="simple-menu" className={classes.btnChessman} aria-haspopup="true" onClick={this.openMenuSelectChessmanBIcon}>
                                    {setupBoard && setupBoard.iconChessmanB ?
                                    <div className={classes.iconChessman}>
                                        <img src={setupBoard.iconChessmanB.chessmanUrl} alt="" style={{width: 50, height: 50}}/>
                                        <span>{setupBoard.iconChessmanB.name}</span>
                                    </div> :
                                        <div className={classes.notChessman}>
                                            {i18n.t('trainingWithYourself.setupBoard.selectChessmanB.title')}
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
                                {i18n.t('trainingWithYourself.setupBoard.btnSubmit')}
                            </Button>
                        </div>}
                        {showBoard && <Board
                            size={setupBoard.sizeChessBoard}
                            chessmanA={CHESSMAN_YOURSELF_A}
                            chessmanB={CHESSMAN_YOURSELF_B}
                            firstTurn={setupBoard.firstTurn}
                            chessmanUserId={dataUserAuth ? dataUserAuth.uid : null}
                            iconChessmanA={setupBoard.iconChessmanA}
                            iconChessmanB={setupBoard.iconChessmanB}
                            getDataBoardCurrent={this.getDataBoardCurrent}
                            dataBoardTrainingDefault={dataBoardTrainingWithYourself}
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
                        content: i18n.t('trainingWithYourself.dialog.content_continue'),
                        color: ''
                    }}
                    disagreeButtonProps={{
                        handleDisagree: this.handleDisagree,
                        background: '',
                        content: i18n.t('trainingWithYourself.dialog.no'),
                    }}
                    agreeButtonProps={{
                        handleAgree: this.handleAgree,
                        background: '',
                        content: i18n.t('trainingWithYourself.dialog.yes'),
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
                                chessmanWin === CHESSMAN_YOURSELF_A
                                    ?
                                    <React.Fragment>
                                        <img src={setupBoard.iconChessmanA.chessmanUrl} alt=""/>
                                        <span className="text">{i18n.t('trainingWithYourself.setupBoard.noticeWin.chessmanA')}</span>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <img src={setupBoard.iconChessmanB.chessmanUrl} alt=""/>
                                        <span className="text">{i18n.t('trainingWithYourself.setupBoard.noticeWin.chessmanB')}</span>
                                    </React.Fragment>
                            }
                        </div>}
                        <Button
                            className={classes.btnNewChessBoard}
                            onClick={this.createNewChessBoard}
                        >
                            {i18n.t('trainingWithYourself.setupBoard.noticeWin.newChessBoard')}
                        </Button>
                    </div>
                </Dialog>
            </React.Fragment>
        );
    }
}

TrainingWithYourself.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataChessmans: state.gameReducer.dataChessmans,
    dataBoardTrainingWithYourself: state.gameReducer.dataBoardTrainingWithYourself
});

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataBoardTrainingWithYourself: (dataTraining) => dispatch(gameActions.saveDataBoardTrainingWithYourself(dataTraining)),
        showDataChessmans: () => dispatch(gameActions.showDataChessmans()),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
) (TrainingWithYourself);
