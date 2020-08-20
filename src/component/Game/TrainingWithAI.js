import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import AuthBlock from "../Auth/Auth";
import Content from "../Content";
import {initBoard} from "../../functions/functions";
import Board from "../../theme/Game/Board";

const styles = theme => ({
    trainingWithAIWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
class TrainingWithAI extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        // this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {

    }

    render() {
        const {
            board
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;
        console.log(board);

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.trainingWithAIWrapper}>
                        <Board
                            size={10}
                        />
                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </React.Fragment>
        );
    }
}

TrainingWithAI.propTypes = {
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
) (TrainingWithAI);
