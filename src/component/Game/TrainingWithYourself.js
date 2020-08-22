import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import AuthBlock from "../Auth/Auth";
import Content from "../Content";
import Board from "../../theme/Game/Board";
import {CHESSMAN_YOURSELF_A, CHESSMAN_YOURSELF_B} from "../../constants/constants";
import * as gameActions from "../../_actions/game";
import DialogForm from "../../theme/DialogForm";

const styles = theme => ({
    trainingWithYourselfWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
class TrainingWithYourself extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            showBoard: false,
            dataBoardTrainingWithYourself: null,
            chessmanWin: null,
        };

        this.getDataBoardCurrent = this.getDataBoardCurrent.bind(this);
        this.handleDisagree = this.handleDisagree.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
        this.checkWinChessman = this.checkWinChessman.bind(this);
    }

    componentDidMount() {
        const {
            dataBoardTrainingWithYourself,
            dataUserAuth
        } = this.props;
        if (dataBoardTrainingWithYourself && (dataBoardTrainingWithYourself.chessmanUserId === (dataUserAuth ? dataUserAuth.uid : null))) {
            this.setState({
                openDialog: true
            });
        } else {
            this.setState({
                showBoard: true
            })
        }
    }

    getDataBoardCurrent(dataBoard) {
        console.log('sssssssssssssss getItem')
        this.props.saveDataBoardTrainingWithYourself(dataBoard);
    }

    checkWinChessman(chessmanWin) {
        this.props.saveDataBoardTrainingWithYourself(null);
        console.log(chessmanWin);
        this.setState({
            chessmanWin: chessmanWin
        })
    }

    handleDisagree() {
        this.props.saveDataBoardTrainingWithYourself(null);
        this.setState({
            openDialog: false,
            showBoard: true,
            dataBoardTrainingWithYourself: null
        });
    }

    handleAgree() {
        this.setState({
            openDialog: false,
            showBoard: true,
            dataBoardTrainingWithYourself: this.props.dataBoardTrainingWithYourself
        });
    }


    render() {
        const {
            openDialog,
            showBoard,
            dataBoardTrainingWithYourself,
            chessmanWin,
        } = this.state;
        const {
            classes,
            dataUserAuth,
        } = this.props;
        // if (chessmanWin === CHESSMAN_YOURSELF_A) {
        //
        // }
        console.log(chessmanWin);
        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div>{chessmanWin === CHESSMAN_YOURSELF_A ? <span>A Win</span> : chessmanWin === CHESSMAN_YOURSELF_B ? <span>B Win</span> : ''}</div>
                    <div className={classes.trainingWithYourselfWrapper}>
                        {showBoard && <Board
                            size={10}
                            chessmanA={CHESSMAN_YOURSELF_A}
                            chessmanB={CHESSMAN_YOURSELF_B}
                            firstTurn={CHESSMAN_YOURSELF_A}
                            chessmanUserId={dataUserAuth ? dataUserAuth.uid : null}
                            iconChessmanA={<span>A</span>}
                            iconChessmanB={<span>B</span>}
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
                        content: 'sds sd',
                        color: ''
                    }}
                    disagreeButtonProps={{
                        handleDisagree: this.handleDisagree,
                        background: '',
                        content: 'no'
                    }}
                    agreeButtonProps={{
                        handleAgree: this.handleAgree,
                        background: '',
                        content: 'yes'
                    }}
                />
            </React.Fragment>
        );
    }
}

TrainingWithYourself.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataBoardTrainingWithYourself: state.gameReducer.dataBoardTrainingWithYourself
});

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataBoardTrainingWithYourself: (dataTraining) => dispatch(gameActions.saveDataBoardTrainingWithYourself(dataTraining))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (TrainingWithYourself);
