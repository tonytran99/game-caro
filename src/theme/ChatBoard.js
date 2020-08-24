import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {
    BOARD_GROUP,
    BOARD_TW0,
    GROUP_BOARD,
    MESSAGE_TYPE_CREATE_CHAT_BOX, MESSAGE_TYPE_IMAGE, MESSAGE_TYPE_STICKER,
    MESSAGE_TYPE_TEXT
} from "../constants/constants";
import UserIcon from "./../images/user_icon.svg";
import Header from "../component/Header";
import Content from "../component/Content";
import Footer from "../component/Footer";
import PhotoIcon from "../images/ic_photo.png";
import StickerIcon from "../images/ic_sticker.png";
import CaroIcon from "../images/caro_icon.png";

import SendIcon from "../images/ic_send.png";
import {paramsToObject} from "../functions/functions";
import firebase, {storage} from "../firebase";
import Popover from "@material-ui/core/Popover";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListSticker from "./ListSticker";


const styles = theme => ({
    chatBoardWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: 600,
        margin: 'auto',
        backgroundColor: '#fff',
        height: '100%',
        flexDirection: 'column',
    },
    chatBoardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0rem',
        width: '100%',
        borderBottom: '1px solid #e8e8e8',
        // borderBottom: '1px solid #e8e8e8',
        // padding: 5,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection: 'row',
    },
    chatBoardContent: {
        flexGrow: 1,
        height: 250,
        overflowY: 'scroll',
        width: '100%'
    },
    chatBoardInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTop: '1px solid #e8e8e8',
        width: '100%',
        '& .icOpenGallery': {
            width: 30,
            height: 30,
            marginLeft: 10,
        },
        '& .viewInputGallery': {
            opacity: 0,
            position: 'absolute',
            zIndex: -1,
            left: 10,
            width: 30,
        },
        '& .icOpenSticker': {
            width: 30,
            height: 30,
            marginLeft: 5,
            marginRight: 5,
        },
        '& .icSend' : {
            width: 30,
            height: 30,
            marginLeft: 5,
            marginRight: 5,
        },
        '& .viewInput' : {
            flex: 1,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            border: 0,
            height: 30,
            '&::focus': {
                outline: 0
            }
        },
    }
});
class ChatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInputValue: '',
            popoverListSticker: null,
            popoverCreateGroupBoard: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onKeyboardPressTextInput = this.onKeyboardPressTextInput.bind(this);
        this.openPopoverListSticker = this.openPopoverListSticker.bind(this);
        this.closePopoverListSticker = this.closePopoverListSticker.bind(this);
        this.getSticker = this.getSticker.bind(this);
        this.onChoosePhoto = this.onChoosePhoto.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);

        this.openPopoverCreateGroupBoard = this.openPopoverCreateGroupBoard.bind(this);
        this.closePopoverCreateGroupBoard = this.closePopoverCreateGroupBoard.bind(this);
    }

    onSendMessage(contentMessage, typeMessage) {
        const {
            dataUser
        } = this.props;
        // if (this.state.isShowSticker && type === 2) {
        //     this.setState({isShowSticker: false})
        // }
        //
        // // if (content.trim() === '') {
        // //     return
        // // }
        const createdAt = new Date().getTime();
        const dataMessage = {
            createdAt: createdAt,
            typeMessage: typeMessage,
            contentMessage: contentMessage,
            createdBy: dataUser.userId,
        };
        const urlParams = new URLSearchParams(window.location.search.substr(1));
        const entries = urlParams.entries();
        const params = paramsToObject(entries);
        const {
            idChatBoxCurrent
        } = this.state;
        if (params.hasOwnProperty('idChatBox')) {
            const idChatBox = params.idChatBox;
            firebase.database().ref('messages/' + idChatBox + '/' + createdAt).set(dataMessage, error => {
                if (error) {
                    if (typeMessage === MESSAGE_TYPE_TEXT) {
                        this.setState({
                            textInputValue: ''
                        })
                    }
                } else {
                    if (typeMessage === MESSAGE_TYPE_TEXT) {
                        this.setState({
                            textInputValue: ''
                        })
                    }
                }
            })
        }
    }
    //
    onChoosePhoto(event) {
        if (event.target.files && event.target.files[0]) {
            this.uploadPhoto(event.target.files[0]);
        } else {
            // this.setState({isLoading: false})
        }
    }

    uploadPhoto(currentPhotoFile) {
        const {
            dataUser
        } = this.props;
        if (currentPhotoFile) {
            const nameImage = dataUser.userId + '_' + new Date().getTime();
            const uploadTask = storage.ref(`images/messages/${nameImage}`).put(currentPhotoFile);
            this.setState({
                isLoading: true
            })

            uploadTask.on('state_changed',
                (snapshot) => {
                    // progrss function ....
                    const progressUploadBackground = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({progressUploadBackground});
                },
                (error) => {
                    // error function ....

                },
                () => {
                    // complete function ....
                    storage.ref('images/messages').child(nameImage).getDownloadURL().then(url => {
                        this.onSendMessage(url, MESSAGE_TYPE_IMAGE);
                    });
                });
        } else {
            this.setState({isLoading: false})
        }
    }

    onKeyboardPressTextInput(event) {
        const {

        } = this.state;
        if (event.key === 'Enter') {
            this.onSendMessage(this.state.textInputValue, MESSAGE_TYPE_TEXT);
        }
    }
    //
    // scrollToBottom = () => {
    //     if (this.messagesEnd) {
    //         this.messagesEnd.scrollIntoView({})
    //     }
    // }

    handleChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    viewMessages() {
        const {
            classes,
            dataUserAuth,
            match,
            dataChatBoard,
        } = this.props;
        let dataMessages = [];
        for (let [key, value] of Object.entries(dataChatBoard)) {
            dataMessages = [
                ...dataMessages,
                value
            ]
        }
        return dataMessages;
    }
    viewItemMessage(dataItemMessage) {
        const typeMessage = dataItemMessage.typeMessage;
        switch (typeMessage) {
            case MESSAGE_TYPE_CREATE_CHAT_BOX:
                return <span>
                    Welcome
                </span>
                break;
            case MESSAGE_TYPE_TEXT:
                return <div>
                    {dataItemMessage.contentMessage}
                </div>
                break;
            case MESSAGE_TYPE_IMAGE:
            case MESSAGE_TYPE_STICKER:
                return <img src={dataItemMessage.contentMessage} alt=""/>
                break;
            default:
                return '';
                break;
        }

    }

    openPopoverCreateGroupBoard(event) {
        this.setState({
            popoverCreateGroupBoard: event.currentTarget
        })
    }

    closePopoverCreateGroupBoard() {
        this.setState({
            popoverCreateGroupBoard: null
        });
    }

    openPopoverListSticker(event) {
        this.setState({
            popoverListSticker: event.currentTarget
        })
    }

    closePopoverListSticker() {
        this.setState({
            popoverListSticker: null
        });
    }

    getSticker(urlSticker) {
        console.log(urlSticker);
        this.onSendMessage(urlSticker, MESSAGE_TYPE_STICKER);
        this.setState({
            popoverListSticker: null
        });
    }

    render() {
        const {
            board,
            idChatBoxCurrent,
            textInputValue,
            popoverListSticker
        } = this.state;
        const {
            classes,
            dataUserAuth,
            match,
            dataChatBoard,
        } = this.props;
        console.log(dataChatBoard);
        return (
            <div className={classes.chatBoardWrapper}>
                <div className={classes.chatBoardHeader}>
                    <img src={UserIcon} alt=""/>
                    <p>Tony Tran</p>
                </div>
                <div className={classes.chatBoardContent}>
                    {dataChatBoard && this.viewMessages().map((item, index) => {
                       return this.viewItemMessage(item)
                    })}
                </div>
                {/*<ListSticker />*/}
                <div className={classes.chatBoardInput}>
                    <img
                        className="icOpenGallery"
                        src={PhotoIcon}
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
                        src={StickerIcon}
                        alt="icon open sticker"
                        onClick={this.openPopoverListSticker}
                    />
                    { popoverListSticker && <Popover
                        open={true}
                        anchorEl={popoverListSticker}
                        onClose={this.closePopoverListSticker}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div className={classes.createPrivateChatPopover}>
                            <ListSticker
                                getSticker={this.getSticker}
                            />
                        </div>
                    </Popover>}
                    <img
                        className="icOpenSticker"
                        src={CaroIcon}
                        alt="icon open sticker"
                        onClick={this.openPopoverCreateGroupBoard}
                    />
                    <input
                        className="viewInput"
                        placeholder="Type your message..."
                        value={textInputValue}
                        onChange={(event) => this.handleChange('textInputValue', event.target.value)}
                        onKeyPress={this.onKeyboardPressTextInput}
                    />
                    <img
                        className="icSend"
                        src={SendIcon}
                        alt="icon send"
                        onClick={() => this.onSendMessage(textInputValue, MESSAGE_TYPE_TEXT)}
                    />
                </div>
            </div>
        );
    }
}

ChatBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataChatBoard: state.gameReducer.dataChatBoard,
    dataUser: state.gameReducer.dataUser
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
