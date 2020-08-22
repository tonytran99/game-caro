import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import Board from "../../theme/Game/Board";
import {BOARD_GROUP, BOARD_TW0, GROUP_BOARD, GROUP_CHAT, PRIVATE_CHAT} from "../../constants/constants";

const styles = theme => ({
    trainingWithAIWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
class PrivateChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        // this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        const dataChatBox = {
            idChatBox: '',
            photoChatBox: '',
            dataChats: [

            ],
            dataMembers: [

            ],
            administratorUser: '',

            chatBoxType: PRIVATE_CHAT,
            updateAt: '',
        }
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

PrivateChat.propTypes = {
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
) (PrivateChat);
