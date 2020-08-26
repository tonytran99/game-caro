import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import AuthBlock from "../Auth/Auth";
import Content from "../Content";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import * as links from "./../../constants/links";
import {MESSAGE_TYPE_CREATE_PRIVATE_BOARD, PRIVATE_BOARD, PRIVATE_CHAT} from "../../constants/constants";
import Popover from "@material-ui/core/Popover";
import Input from "@material-ui/core/Input";
import firebase from "../../firebase";

const styles = theme => ({
    welcomeWrapper: {

    },
    goToTrainingWithAI: {

    },
    goToTrainingWithYourself: {

    },
    goToChatPage: {

    },
    btnCreateChessBoard: {

    },
});
class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverCreatePrivateBoard: null,
            dataInitPrivateBoard: {
                sizeChessBoard: 10,
            },
        };

        this.openPopoverCreatePrivateBoard = this.openPopoverCreatePrivateBoard.bind(this);
        this.closePopoverCreatePrivateBoard = this.closePopoverCreatePrivateBoard.bind(this);
        this.createChessBoard = this.createChessBoard.bind(this);
        this.handleInitPrivateBoardChange = this.handleInitPrivateBoardChange.bind(this);
    }

    componentDidMount() {

    }

    openPopoverCreatePrivateBoard(event) {
        this.setState({
            popoverCreatePrivateBoard: event.currentTarget
        })
    }

    closePopoverCreatePrivateBoard() {
        this.setState({
            popoverCreatePrivateBoard: null
        });
    }
    createChessBoard() {
        const {
            dataUser
        } = this.props;
        const {
            dataInitPrivateBoard
        } = this.state;
        const idChessBoard = dataUser.userId + '_' + new Date().getTime();
        const dataChessBoard = {
            idChessBoard: idChessBoard,
            dataBoard: {
                sizeChessBoard: dataInitPrivateBoard.sizeChessBoard,
            },
            userIdChessmanA: dataUser.userId,
            userIdChessmanB: null,
            chessBoardType: PRIVATE_BOARD,
            createBy: dataUser.userId,
            dataMembersBoard: {
                [dataUser.userId]: dataUser
            },
            chessBoardOpen: true,
        }

        // console.log(dataChessBoard);

        firebase.database().ref('chessBoards/' + idChessBoard).set(dataChessBoard, (error) => {
            if (error) {
                // this.setState({
                //     popoverCreateGroupChat: null,
                //     photoChatBox: null,
                //     photoChatBoxPreview: '',
                //     photoChatBoxName: '',
                // })
            } else {

            }
        });

    }
    handleInitPrivateBoardChange(name, value) {
        const {
            dataInitPrivateBoard
        } = this.state;
        dataInitPrivateBoard[name] = value;
        this.setState({
            dataInitPrivateBoard: dataInitPrivateBoard
        })
    }

    render() {
        const {
            popoverCreatePrivateBoard,
            dataInitPrivateBoard
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Content>

                    <div className={classes.welcomeWrapper}>
                        <NavLink
                            to={links.LINK_TRAINING_WITH_AI}
                        >
                            <Button
                                className={classes.goToTrainingWithAI}
                            >
                                go to training with ai
                            </Button>
                        </NavLink>
                        <NavLink
                            to={links.LINK_TRAINING_WITH_YOURSELF}
                        >
                            <Button
                                className={classes.goToTrainingWithYourself}
                            >
                                go to training with yourself
                            </Button>
                        </NavLink>
                        {/*{dataUserAuth && <Button*/}
                        {/*    className={classes.btnCreateChessBoard}*/}
                        {/*    onClick={() => this.createChessBoard()}*/}
                        {/*>*/}
                        {/*    Create Private Chat*/}
                        {/*</Button>}*/}
                        {dataUserAuth && <NavLink
                            to={links.LINK_CHAT_PAGE}
                        >
                            <Button
                                className={classes.goToChatPage}
                            >
                                Go To Chat Page
                            </Button>
                        </NavLink>}
                        {dataUserAuth && <NavLink
                            to={links.LINK_LIST_CHESS_BOARD}
                        >
                            <Button
                                className={classes.goToChatPage}
                            >
                                Go To Chess Page
                            </Button>
                        </NavLink>}
                        {dataUserAuth && <React.Fragment>
                            <Button
                                onClick={this.openPopoverCreatePrivateBoard}
                            >
                                create chess board
                            </Button>
                            {popoverCreatePrivateBoard && <Popover
                                open={true}
                                anchorEl={popoverCreatePrivateBoard}
                                onClose={this.closePopoverCreatePrivateBoard}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <div className={classes.createPrivateBoardPopover}>
                                    <Input
                                        type="number"
                                        name="sizeChessBoard"
                                        value={dataInitPrivateBoard.sizeChessBoard}
                                        onChange={(event) => this.handleInitPrivateBoardChange('sizeChessBoard', event.target.value)}
                                    />
                                    <Button
                                        onClick={this.createChessBoard}
                                    >
                                        create private board
                                    </Button>
                                </div>
                            </Popover>}
                        </React.Fragment>}
                    </div>
                </Content>
                <Footer />
            </React.Fragment>
        );
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataUser: state.gameReducer.dataUser,
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (Welcome);
