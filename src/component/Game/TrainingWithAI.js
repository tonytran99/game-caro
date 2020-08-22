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

const styles = theme => ({
    trainingWithYourselfAI: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
class TrainingWithYourself extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.getDataBoardCurrent = this.getDataBoardCurrent.bind(this);
    }

    componentDidMount() {

    }

    getDataBoardCurrent(dataBoard) {
        this.props.getDataBoardCurrent(dataBoard);
    }

    render() {
        const {

        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataBoardTrainingWithYourself
        } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.trainingWithYourselfAI}>
                        <Board
                            size={10}
                            // chessmanA={CHESSMAN_YOUR}
                            chessmanB={CHESSMAN_YOURSELF_B}
                            firstTurn={CHESSMAN_YOURSELF_A}
                            iconChessmanA={<span>A</span>}
                            iconChessmanB={<span>B</span>}
                            getDataBoardCurrent={this.getDataBoardCurrent}
                            dataBoardTrainingDefault={dataBoardTrainingWithYourself}
                        />
                    </div>
                </Content>
                <Footer />
            </React.Fragment>
        );
    }
}

TrainingWithYourself.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataBoardTrainingWithAI: state.gameReducer.dataBoardTrainingWithAI
});

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataBoardTrainingWithAI: (dataTraining) => dispatch(gameActions.saveDataBoardTrainingWithAI(dataTraining))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (TrainingWithYourself);
