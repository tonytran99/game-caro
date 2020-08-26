import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import ListChatBoard from "./ListChatBoard";
import firebase from "../../firebase";
import ChatBoard from "./ChatBoard";

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
    listChat: {

    }
});
class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idChatBoxCurrent: null
        };
    }

    componentDidMount() {

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const urlParams = new URLSearchParams(window.location.search.substr(1));
    //     const entries = urlParams.entries();
    //     const params = paramsToObject(entries);
    //     const {
    //         idChatBoxCurrent
    //     } = this.state;
    //     if (params.hasOwnProperty('idChatBox')) {
    //         const idChatBox = params.idChatBox;
    //         if (idChatBox !== idChatBoxCurrent) {
    //             this.setState({
    //                 idChatBoxCurrent: idChatBox
    //             });
    //             this.showDataChatBoard(idChatBox);
    //         }
    //     }
    // }

    showDataChatBoard(idChatBox) {
        firebase.database().ref('messages/' + idChatBox).on('value', (snap) => {
            if (snap.val()) {
               console.log(snap.val());
            }
        });
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
                            <ChatBoard />
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
