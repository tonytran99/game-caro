import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import Board from "../../theme/Game/Board";
import {BOARD_GROUP, BOARD_TW0, GROUP_BOARD} from "../../constants/constants";

const styles = theme => ({
    trainingWithAIWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
class ListChessBoard extends React.Component {

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
            dataUserAuth,
            match,

        } = this.props;
        console.log(match);

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.trainingWithAIWrapper}>
                       List Chess man
                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </React.Fragment>
        );
    }
}

ListChessBoard.propTypes = {
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
) (ListChessBoard);
