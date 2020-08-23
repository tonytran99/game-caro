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
import Button from "@material-ui/core/Button";
import ListChatBoard from "./ListChatBoard";

const styles = theme => ({
    chatPageWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#fff',
    },
    viewListChatBoard: {
        width: '30%',
        borderRight: '2px solid black',
        height: '100%'
    },
    viewChatBoard: {
        width: '70%',
        height: '100%'
    },
});
class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
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
        // console.log(match);

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.chatPageWrapper}>
                        <div className={classes.viewListChatBoard}>
                            <ListChatBoard />
                        </div>
                        <div className={classes.viewChatBoard}>

                        </div>
                    </div>
                </Content>
                <Footer />
            </React.Fragment>
        );
    }
}

ChatPage.propTypes = {
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
) (ChatPage);
