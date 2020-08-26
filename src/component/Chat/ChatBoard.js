import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {
    GROUP_BOARD,
    GROUP_CHAT,
    MESSAGE_TYPE_CREATE_CHAT_BOX,
    MESSAGE_TYPE_CREATE_GROUP_BOARD,
    MESSAGE_TYPE_CREATE_PRIVATE_BOARD,
    MESSAGE_TYPE_IMAGE,
    MESSAGE_TYPE_STICKER,
    MESSAGE_TYPE_TEXT,
    PRIVATE_BOARD,
    PRIVATE_CHAT
} from "../../constants/constants";
import UserIcon from "../../images/user_icon.svg";
import PhotoIcon from "../../images/ic_photo.png";
import StickerIcon from "../../images/ic_sticker.png";
import CaroIcon from "../../images/caro_icon.png";

import SendIcon from "../../images/ic_send.png";
import {paramsToObject} from "../../functions/functions";
import firebase, {storage} from "../../firebase";
import Popover from "@material-ui/core/Popover";
import ListSticker from "../../theme/ListSticker";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {NavLink} from "react-router-dom";
import * as links from "../../constants/links";
import * as gameActions from "../../_actions/game";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


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
    },
    createGroupBoardPopover: {
        width: 600,
        padding: '2rem'
    },
    createPrivateBoardPopover: {
        width: 600,
        padding: '2rem'
    }
});
class ChatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textInputValue: '',
            popoverListSticker: null,
            popoverCreateGroupBoard: null,
            popoverCreatePrivateBoard: null,
            // dataChessmans: [],
            dataAllUsersGroupChat: [],
            dataInitPrivateBoard: {
                sizeChessBoard: 10,
            },
            dataInitGroupBoard: {
                sizeChessBoard: 10,
                dataChessmans: [],
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onKeyboardPressTextInput = this.onKeyboardPressTextInput.bind(this);
        this.openPopoverListSticker = this.openPopoverListSticker.bind(this);
        this.closePopoverListSticker = this.closePopoverListSticker.bind(this);
        this.getSticker = this.getSticker.bind(this);
        this.onChoosePhoto = this.onChoosePhoto.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.handleChessmansChange = this.handleChessmansChange.bind(this);

        this.openPopoverCreateGroupBoard = this.openPopoverCreateGroupBoard.bind(this);
        this.closePopoverCreateGroupBoard = this.closePopoverCreateGroupBoard.bind(this);
        this.openPopoverCreatePrivateBoard = this.openPopoverCreatePrivateBoard.bind(this);
        this.closePopoverCreatePrivateBoard = this.closePopoverCreatePrivateBoard.bind(this);

        this.createPrivateBoard = this.createPrivateBoard.bind(this);
        this.createGroupBoard = this.createGroupBoard.bind(this);

        this.handleInitPrivateBoardChange = this.handleInitPrivateBoardChange.bind(this);
        this.handleInitGroupBoardChange = this.handleInitGroupBoardChange.bind(this);
        this.showOptionsAllUsersChatBoard = this.showOptionsAllUsersChatBoard.bind(this);
    }

    componentDidMount() {

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

    handleInitGroupBoardChange(name, value) {
        const {
            dataInitGroupBoard
        } = this.state;
        dataInitGroupBoard[name] = value;
        this.setState({
            dataInitGroupBoard: dataInitGroupBoard
        })
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
            dataMessagesChatBoard,
        } = this.props;
        let dataMessages = [];
        for (let [key, value] of Object.entries(dataMessagesChatBoard)) {
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
            case MESSAGE_TYPE_CREATE_PRIVATE_BOARD:
                return <div><NavLink
                    to={links.LINK_CHESS_BOARD.replace(":idChessBoard",dataItemMessage.contentMessage)}
                >
                    chess board
                </NavLink></div>;
            case MESSAGE_TYPE_CREATE_GROUP_BOARD:
                return <div><NavLink
                    to={links.LINK_CHESS_BOARD.replace(":idChessBoard",dataItemMessage.contentMessage)}
                >
                    chess board
                </NavLink></div>;
            default:
                return '';
                break;
        }

    }

    openPopoverCreateGroupBoard(event) {
        this.showOptionsAllUsersChatBoard();
        this.setState({
            popoverCreateGroupBoard: event.currentTarget
        })
    }

    openPopoverCreatePrivateBoard(event) {
        this.setState({
            popoverCreatePrivateBoard: event.currentTarget
        })
    }

    createPrivateBoard() {
        const {
            dataInfoChatBoard,
            dataUser
        } = this.props;
        const {
            dataInitPrivateBoard
        } = this.state;
        console.log(dataInfoChatBoard);
        const idChessBoard = dataUser.userId + '_' + dataInfoChatBoard.idChatBox + '_' + new Date().getTime();
        const userCanViewBoard = {};
        const dataMembersBoard = {};
        for (let [key, value] of Object.entries(dataInfoChatBoard.dataMembers)) {
            dataMembersBoard[key] = value;
        }
        const dataChessBoard = {
            idChessBoard: idChessBoard,
            dataBoard: {
                sizeChessBoard: dataInitPrivateBoard.sizeChessBoard,
            },
            userIdChessmanA: dataUser.userId,
            userIdChessmanB: null,
            chessBoardType: PRIVATE_BOARD,
            createBy: dataUser.userId,
            dataMembersBoard: dataMembersBoard,
            chessBoardOpen: false,
        }

        firebase.database().ref('chessBoards/' + idChessBoard).set(dataChessBoard, (error) => {
            if (error) {
                // this.setState({
                //     popoverCreateGroupChat: null,
                //     photoChatBox: null,
                //     photoChatBoxPreview: '',
                //     photoChatBoxName: '',
                // })
            } else {
                this.onSendMessage(idChessBoard, MESSAGE_TYPE_CREATE_PRIVATE_BOARD);
            }
        });

    }

    createGroupBoard() {
        const {
            dataInfoChatBoard,
            dataUser
        } = this.props;
        const {
            dataInitGroupBoard
        } = this.state;
        console.log(dataInitGroupBoard);
        if (dataInitGroupBoard.dataChessmans.length === 2) {
            const idChessBoard = dataUser.userId + '_' + dataInfoChatBoard.idChatBox + '_' + new Date().getTime();
            const dataMembersBoard = {};
            for (let [key, value] of Object.entries(dataInfoChatBoard.dataMembers)) {
                dataMembersBoard[key] = value;
            }
            const dataChessBoard = {
                idChessBoard: idChessBoard,
                dataBoard: {
                    sizeChessBoard: dataInitGroupBoard.sizeChessBoard,
                },
                userIdChessmanA: dataInitGroupBoard.dataChessmans[0].userId,
                userIdChessmanB: dataInitGroupBoard.dataChessmans[1].userId,
                chessBoardType: GROUP_BOARD,
                createBy: dataUser.userId,
                dataMembersBoard: dataMembersBoard,
                chessBoardOpen: false,
            }

            console.log(dataChessBoard);

            firebase.database().ref('chessBoards/' + idChessBoard).set(dataChessBoard, (error) => {
                if (error) {
                    // this.setState({
                    //     popoverCreateGroupChat: null,
                    //     photoChatBox: null,
                    //     photoChatBoxPreview: '',
                    //     photoChatBoxName: '',
                    // })
                } else {
                    this.onSendMessage(idChessBoard, MESSAGE_TYPE_CREATE_GROUP_BOARD);
                }
            });
        }
    }

    closePopoverCreateGroupBoard() {
        this.setState({
            popoverCreateGroupBoard: null
        });
    }

    closePopoverCreatePrivateBoard() {
        this.setState({
            popoverCreatePrivateBoard: null
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
        this.onSendMessage(urlSticker, MESSAGE_TYPE_STICKER);
        this.setState({
            popoverListSticker: null
        });
    }

    handleChessmansChange(event, value) {
        const {
            dataInitGroupBoard
        } = this.state;
        dataInitGroupBoard.dataChessmans = value;
        this.setState({
            dataInitGroupBoard: dataInitGroupBoard,
        })
    }

    showOptionsAllUsersChatBoard() {
        const {
            dataInfoChatBoard
        } = this.props;
        let dataAllUsersGroupChat = [];
        if (dataInfoChatBoard && dataInfoChatBoard.dataMembers) {
            for (let [key, value] of Object.entries(dataInfoChatBoard.dataMembers)) {
                dataAllUsersGroupChat.push(value);
            }
        }

        this.setState({
            dataAllUsersGroupChat: dataAllUsersGroupChat
        })
    }

    render() {
        const {
            board,
            idChatBoxCurrent,
            textInputValue,
            popoverListSticker,
            dataChessmans,
            popoverCreateGroupBoard,
            dataAllUsersGroupChat,
            popoverCreatePrivateBoard,
            dataInitPrivateBoard,
            dataInitGroupBoard
        } = this.state;
        const {
            classes,
            dataUserAuth,
            match,
            dataMessagesChatBoard,
            dataInfoChatBoard,
        } = this.props;  
        
        
        return (
            <div className={classes.chatBoardWrapper}>
                <div className={classes.chatBoardHeader}>
                    <img src={UserIcon} alt=""/>
                    <p>Tony Tran</p>
                </div>
                <div className={classes.chatBoardContent}>
                    {dataMessagesChatBoard && this.viewMessages().map((item, index) => {
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
                    {
                        dataInfoChatBoard
                            ?
                            dataInfoChatBoard.chatBoxType === GROUP_CHAT
                                ?
                                <React.Fragment>
                                    <img
                                        className="icOpenSticker"
                                        src={CaroIcon}
                                        alt="icon open sticker"
                                        onClick={this.openPopoverCreateGroupBoard}
                                    />
                                    {popoverCreateGroupBoard && <Popover
                                        open={true}
                                        anchorEl={popoverCreateGroupBoard}
                                        onClose={this.closePopoverCreateGroupBoard}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <div className={classes.createGroupBoardPopover}>
                                            <Autocomplete
                                                multiple
                                                id="checkboxes-tags-demo"
                                                options={dataAllUsersGroupChat}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option.displayName}
                                                onChange={this.handleChessmansChange}
                                                renderOption={(option, {selected}) => (
                                                    <React.Fragment>
                                                        <Checkbox
                                                            icon={icon}
                                                            checkedIcon={checkedIcon}
                                                            style={{marginRight: 8}}
                                                            checked={selected}
                                                        />
                                                        {option.displayName}
                                                    </React.Fragment>
                                                )}
                                                style={{width: 500}}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" label="Checkboxes"
                                                               placeholder="Favorites"/>
                                                )}
                                            />
                                            <Input
                                                type="number"
                                                name="sizeChessBoard"
                                                value={dataInitPrivateBoard.sizeChessBoard}
                                                onChange={(event) => this.handleInitPrivateBoardChange('sizeChessBoard', event.target.value)}
                                            />
                                            <Button
                                                onClick={this.createGroupBoard}
                                            >
                                                create group board
                                            </Button>
                                        </div>
                                    </Popover>}
                                </React.Fragment>
                                :
                                (dataInfoChatBoard.chatBoxType === PRIVATE_CHAT)
                                    ?
                                    <React.Fragment>
                                        <img
                                            className="icOpenSticker"
                                            src={CaroIcon}
                                            alt="icon open sticker"
                                            onClick={this.openPopoverCreatePrivateBoard}
                                        />
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
                                                    onClick={this.createPrivateBoard}
                                                >
                                                    create private board
                                                </Button>
                                            </div>
                                        </Popover>}
                                    </React.Fragment>
                                    :
                                    ''
                            :
                            ''
                    }
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
    dataMessagesChatBoard: state.gameReducer.dataMessagesChatBoard,
    dataUser: state.gameReducer.dataUser,
    dataInfoChatBoard: state.gameReducer.dataInfoChatBoard,
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