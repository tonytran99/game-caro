import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {BOARD_GROUP, BOARD_TW0, GROUP_BOARD} from "../constants/constants";
import UserIcon from "./../images/user_icon.svg";
import Header from "../component/Header";
import Content from "../component/Content";
import Footer from "../component/Footer";

const styles = theme => ({
    chatBoardWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 600,
        margin: 'auto',
        backgroundColor: '#fff',
        height: '100%',
    },
    chatBoardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0rem',
        width: '100%',
    },
    chatBoardContent: {

    },
    chatBoardInput: {

    }
});
class ChatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        // this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        const dataChessBoard = {
            idChessBoard: '',
            dataBoard: {

            },
            userIdChessmanA: '',
            userIdChessmanB: '',
            userCanViewBoard: [
                {
                    userId: '',
                    displayName: '',
                },
                {
                    userId: '',
                    displayName: '',
                },
                {
                    userId: '',
                    displayName: '',
                }
            ],
            secret: false,
            chessBoardType: GROUP_BOARD,
            chatChessBoard: [

            ], // => Sap xep
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
                    <div className={classes.chatBoardWrapper}>
                        <div className={classes.chatBoardHeader}>
                            <img src={UserIcon} alt=""/>
                            <p>Tony Tran</p>
                        </div>
                        <div className={classes.chatBoardContent}>

                        </div>
                        <div className={classes.chatBoardInput}>
                            <img
                                className="icOpenGallery"
                                src={images.ic_photo}
                                alt="icon open gallery"
                                onClick={() => this.refInput.click()}
                            />
                            <input
                                ref={el => {
                                    this.refInput = el
                                }}
                                accept="image/*"
                                className="viewInputGallery"
                                type="file"
                                onChange={this.onChoosePhoto}
                            />

                            <img
                                className="icOpenSticker"
                                src={images.ic_sticker}
                                alt="icon open sticker"
                                onClick={this.openListSticker}
                            />

                            <input
                                className="viewInput"
                                placeholder="Type your message..."
                                value={this.state.inputValue}
                                onChange={event => {
                                    this.setState({inputValue: event.target.value})
                                }}
                                onKeyPress={this.onKeyboardPress}
                            />
                            <img
                                className="icSend"
                                src={images.ic_send}
                                alt="icon send"
                                onClick={() => this.onSendMessage(this.state.inputValue, 0)}
                            />
                        </div>
                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </React.Fragment>
        );
    }
}

ChatBoard.propTypes = {
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
) (ChatBoard);
