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
import {PRIVATE_CHAT} from "../../constants/constants";

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
            isSignedIn: true
        };

        // this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {

    }

    createChessBoard() {
        const {
            dataUserAuth
        } = this.props;
        const {

        } = this.state;
        const idChatBox = (dataUserAuth && dataUserAuth.uid ? dataUserAuth.uid : '') + '_' + new Date().getTime();

        const dataInitChatBox = {
            idChatBox: dataUserAuth.id,
            userIdMemberA: null,
            userIdMemberB: null,
            photoChatBox: null,
            dataMemberA: {

            },
            dataMemberB: {

            },
            dataMembersUpdate: [

            ],
            chatBoxType: PRIVATE_CHAT,
            updatedAt: new Date(),
        };
    }

    render() {
        // const {
        //
        // } = this.state;
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
                        {dataUserAuth && <Button
                            className={classes.btnCreateChessBoard}
                            onClick={() => this.createChessBoard()}
                        >
                            Create Private Chat
                        </Button>}
                        {dataUserAuth && <NavLink
                            to={links.LINK_CHAT_PAGE}
                        >
                            <Button
                                className={classes.goToChatPage}
                            >
                                Go To Chat Page
                            </Button>
                        </NavLink>}
                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </React.Fragment>
        );
    }
}

Welcome.propTypes = {
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
) (Welcome);
