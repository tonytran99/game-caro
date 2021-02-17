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
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import {ReactComponent as PersonIcon} from "../../images/person_icon.svg";
import {ReactComponent as GroupIcon} from "../../images/group_icon.svg";
import i18n from "../../i18n";
import AppInput from "../../theme/AppInput";
import SuccessAlert from "../../theme/Alert/SuccessAlert";
import ErrorAlert from "../../theme/Alert/ErrorAlert";
import LoadingAction from "../../theme/LoadingAction";
import {withTranslation} from "react-i18next";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const styles = theme => ({
    chatBoardWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 'auto',
        height: '100%',
        flexDirection: 'column',
        paddingLeft: '0.5rem',
    },
    notDataChatBoard: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 700,
        color: '#123152',
        fontSize: '1.2rem'
    },
    chatBoardHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 0rem',
        width: '100%',
        backgroundColor: '#a3d2ca',
        color: '#123152',
        fontWeight: 700,
        borderRadius: 7,
        '& img': {
            width: 48,
            height: 48,
            borderRadius: '50%'
        },
        '& .chatBoxName': {
            paddingLeft: '0.5rem'
        }
    },
    contentWrapper: {
        width: '100%',
        backgroundColor: '#cffffe',
        borderRadius: 7,
        marginTop: '0.5rem',
        padding: '0.5rem 1rem',
    },
    chatBoardContent: {
        flexGrow: 1,
        height: 250,
        overflowY: 'scroll',
        width: '100%',
        padding: '1rem 0.5rem',
        '&::-webkit-scrollbar': {
            width: 9,
            height: 9,
        },
        '&::-webkit-scrollbar-track': {
            // background: '#ee6f57',
            // borderRadius: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#ee6f57',
            borderRadius: 9,
        },
    },
    chatBoardInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderTop: '2px solid #123152',
        width: '100%',
        '& .icOpenGallery': {
            width: 24,
            height: 24,
            marginLeft: 10,
            cursor: 'pointer',
        },
        '& .viewInputGallery': {
            opacity: 0,
            position: 'absolute',
            zIndex: -1,
            left: 10,
            width: 30,
        },
        '& .icOpenSticker': {
            width: 24,
            height: 24,
            marginLeft: 5,
            marginRight: 5,
            cursor: 'pointer',
        },
        '& .icSend' : {
            width: 24,
            height: 24,
            marginLeft: 5,
            marginRight: 5,
            cursor: 'pointer',
        },
        '& .viewInput' : {
            flex: 1,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            border: 0,
            height: 30,
            color: '#123152',
            '&::focus': {
                outline: 0
            }
        },
    },
    createGroupBoardPopover: {
        width: 480,
        padding: '2rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 11,
    },
    errorText: {
        color: '#ec0101'
    },
    createPrivateBoardPopover: {
        width: 480,
        padding: '2rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 11,
    },
    messageTypeCreate: {
        width: '100%',
        textAlign: 'center',
        color: '#b52b65',
        fontWeight: 600,
        fontSize: '1.1rem',
    },
    itemMessage: {
        padding: '1rem 0rem',
    },
    btnGoToChessBoard: {
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        color: '#ffdead',
        '&:hover': {
            backgroundColor: '#123152',
        },
        '& img': {
            width: 24,
            height: 24,
        },
        '& .text': {
            paddingLeft: '0.5rem'
        }
    },
    contentImage: {
        maxWidth: 240,
        borderRadius: 9,
    },
    isMe: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    notMe: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    contentTextMessage: {
        maxWidth: 360,
        backgroundColor: '#00bcd4',
        padding: '1rem 0.5rem',
        borderRadius: 11,
        color: '#fff',
        fontWeight: 600,
        '&.notMe': {
            backgroundColor: '#ffdbc5',
            color: '#123152'
        }
    },
    avatarMessage: {
        width: 40,
        height: 36,
        paddingRight: 4,
        '& img': {
            width: '100%',
            height: '100%',
            borderRadius: '50%'
        }
    },
    popoverSticker: {
        width: 436,
        height: 480,
        padding: '1rem 0.5rem',

    },
    submitCreateBoard: {
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        marginBottom: '1rem',
        color: '#dfe3f1',
        '&:hover': {
            backgroundColor: '#123152',
        }
    },
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
            },
            showOptionsAllUsers: false,
            successOpen: false,
            errorOpen: false,
            isLoading: false,
            errors: {}
        };


        this.handleCloseNotice = this.handleCloseNotice.bind(this);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataInfoChatBoard && !this.state.showOptionsAllUsers) {
            this.setState({
                showOptionsAllUsers: true
            })
            this.showOptionsAllUsersChatBoard();
        }
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
        if (params.hasOwnProperty('idChatBox')) {
            const idChatBox = params.idChatBox;
            firebase.database().ref('messages/' + idChatBox + '/' + createdAt).set(dataMessage, error => {
                switch (typeMessage) {
                    case MESSAGE_TYPE_TEXT:
                        this.setState({
                            textInputValue: ''
                        })
                        break;
                    case MESSAGE_TYPE_CREATE_GROUP_BOARD:
                        this.setState({
                            popoverCreateGroupBoard: null
                        })
                        break;
                    case MESSAGE_TYPE_CREATE_PRIVATE_BOARD:
                        this.setState({
                            popoverCreatePrivateBoard: null,
                        })
                        break;
                    default:
                        break;
                }
                if (error) {
                   this.setState({
                       errorOpen: true,
                       isLoading: false,
                   })
                } else {
                    this.setState({
                        successOpen: true,
                        isLoading: false,
                    })
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
        if (event.key === 'Enter' && this.state.textInputValue !== '') {
            this.onSendMessage(this.state.textInputValue, MESSAGE_TYPE_TEXT);
        }
    }

    handleChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    viewMessages() {
        const {
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
        const {
            dataUser,
            classes
        } = this.props;
        const {
            dataAllUsersGroupChat
        } = this.state;
        let checkMe = false;
        if (dataUser.userId === dataItemMessage.createdBy) {
            checkMe = true;
        }
        let dataCreateBy = null;
        dataAllUsersGroupChat.map((item, index) => {
            if (item.userId === dataItemMessage.createdBy) {
                dataCreateBy = item;
            }
        });

        const typeMessage = dataItemMessage.typeMessage;
        if (dataCreateBy) {
            switch (typeMessage) {
                case MESSAGE_TYPE_CREATE_CHAT_BOX:
                    return <div className={classes.messageTypeCreate + ' ' + classes.itemMessage}>
                        {i18n.t('chat.chat_board.chat_content.createChat',{user:dataCreateBy.displayName ? dataCreateBy.displayName :
                                dataCreateBy.email ? dataCreateBy.email :
                                    i18n.t('chat.user')})}
                    </div>
                    break;
                case MESSAGE_TYPE_TEXT:
                    return checkMe ? <div className={classes.isMe + ' ' + classes.itemMessage}>
                        <div className={classes.contentTextMessage}>
                            {dataItemMessage.contentMessage}
                        </div>
                    </div> : <div className={classes.notMe + ' ' + classes.itemMessage}>
                        <div className={classes.avatarMessage}>
                            <img src={dataCreateBy.avatarUrl ? dataCreateBy.avatarUrl : UserIcon} alt=""/>
                        </div>
                        <div className={classes.contentTextMessage + ' notMe'}>
                            {dataItemMessage.contentMessage}
                        </div>
                    </div>
                    break;
                case MESSAGE_TYPE_IMAGE:
                case MESSAGE_TYPE_STICKER:
                    return checkMe ? <div className={classes.isMe + ' ' + classes.itemMessage}>
                        <img src={dataItemMessage.contentMessage} className={classes.contentImage} alt=""/>
                    </div> : <div className={classes.notMe + ' ' + classes.itemMessage}>
                        <div className={classes.avatarMessage}>
                            <img src={dataCreateBy.avatarUrl ? dataCreateBy.avatarUrl : UserIcon} alt=""/>
                        </div>
                        <img src={dataItemMessage.contentMessage} className={classes.contentImage} alt=""/>
                    </div>
                    break;
                case MESSAGE_TYPE_CREATE_PRIVATE_BOARD:
                    return checkMe ? <div className={classes.isMe + ' ' + classes.itemMessage}>
                        <NavLink
                            to={links.LINK_CHESS_BOARD.replace(":idChessBoard",dataItemMessage.contentMessage)}
                        >
                            <Button className={classes.btnGoToChessBoard}>
                                <img src={CaroIcon} alt=""/>
                                <span className="text">{i18n.t('chat.chat_board.chat_content.chessBoard')}</span>
                            </Button>
                        </NavLink>
                    </div> : <div className={classes.notMe + ' ' + classes.itemMessage}>
                        <div className={classes.avatarMessage}>
                            <img src={dataCreateBy.avatarUrl ? dataCreateBy.avatarUrl : UserIcon} alt=""/>
                        </div>
                        <NavLink
                            to={links.LINK_CHESS_BOARD.replace(":idChessBoard",dataItemMessage.contentMessage)}
                        >
                            <Button className={classes.btnGoToChessBoard}>
                                <img src={CaroIcon} alt=""/>
                                <span className="text">{i18n.t('chat.chat_board.chat_content.chessBoard')}</span>
                            </Button>
                        </NavLink>
                    </div>
                    break;
                case MESSAGE_TYPE_CREATE_GROUP_BOARD:
                    return checkMe ? <div className={classes.isMe + ' ' + classes.itemMessage}>
                        <NavLink
                            to={links.LINK_CHESS_BOARD.replace(":idChessBoard",dataItemMessage.contentMessage)}
                        >
                            <Button className={classes.btnGoToChessBoard}>
                                <img src={CaroIcon} alt=""/>
                                <span className="text">{i18n.t('chat.chat_board.chat_content.chessBoard')}</span>
                            </Button>
                        </NavLink>
                    </div> : <div className={classes.notMe + ' ' + classes.itemMessage}>
                        <div className={classes.avatarMessage}>
                            <img src={dataCreateBy.avatarUrl ? dataCreateBy.avatarUrl : UserIcon} alt=""/>
                        </div>
                        <NavLink
                            to={links.LINK_CHESS_BOARD.replace(":idChessBoard",dataItemMessage.contentMessage)}
                        >
                            <Button className={classes.btnGoToChessBoard}>
                                <img src={CaroIcon} alt=""/>
                                <span className="text">{i18n.t('chat.chat_board.chat_content.chessBoard')}</span>
                            </Button>
                        </NavLink>
                    </div>
                    break;
                default:
                    return '';
                    break;
            }
        } else {
            return '';
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
        const idChessBoard = dataUser.userId + '_' + dataInfoChatBoard.idChatBox + '_' + new Date().getTime();
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
        this.setState({
            isLoading: true
        })

        firebase.database().ref('chessBoards/' + idChessBoard).set(dataChessBoard, (error) => {
            if (error) {
                this.setState({
                    errorOpen: true
                })
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
        if (dataInitGroupBoard.dataChessmans.length === 2) {
            this.setState({
                isLoading: true
            })
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
            firebase.database().ref('chessBoards/' + idChessBoard).set(dataChessBoard, (error) => {
                if (error) {
                    this.setState({
                        errorOpen: true
                    })
                } else {
                    this.onSendMessage(idChessBoard, MESSAGE_TYPE_CREATE_GROUP_BOARD);
                }
            });
        } else {
            const {
                errors
            } = this.state;
            errors.selectUser = i18n.t('chat.chat_board.create_chess_board.errors.selectUser')
            this.setState({
                errorOpen: true,
                errors: errors
            })
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
            dataInitGroupBoard,
            errors
        } = this.state;
        delete errors.selectUser;

        dataInitGroupBoard.dataChessmans = value;
        this.setState({
            dataInitGroupBoard: dataInitGroupBoard,
            errors: errors
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

    handleCloseNotice() {
        this.setState({
            successOpen: false,
            errorOpen: false,
        });
    }

    render() {
        const {
            textInputValue,
            popoverListSticker,
            popoverCreateGroupBoard,
            dataAllUsersGroupChat,
            popoverCreatePrivateBoard,
            dataInitPrivateBoard,
            successOpen,
            errorOpen,
            isLoading,
            errors
        } = this.state;
        const {
            classes,
            dataMessagesChatBoard,
            dataInfoChatBoard,
            dataUser,
        } = this.props;

        let chatBoxIcon = null;
        let chatBoxName = '';
        if (dataInfoChatBoard) {
            if (dataInfoChatBoard.chatBoxType === PRIVATE_CHAT) {
                let dataFriend = null;
                for (let [key, value] of Object.entries(dataInfoChatBoard.dataMembers)) {
                    if (dataUser.userId !== key) {
                        dataFriend = value;
                    }
                }
                if (dataFriend.avatarUrl) {
                    chatBoxIcon = dataFriend.avatarUrl;
                }
                chatBoxName = dataFriend.displayName ? dataFriend.displayName :
                    dataFriend.email ? dataFriend.email  : i18n.t('chat.user');
            } else if (dataInfoChatBoard.chatBoxType === GROUP_CHAT) {
                chatBoxIcon = dataInfoChatBoard.photoChatBox;
                chatBoxName = dataInfoChatBoard.nameGroupChat;
                if (!chatBoxName) {
                    let countUserDisplayName = 0;
                    for (let [key, value] of Object.entries(dataInfoChatBoard.dataMembers)) {
                        if (dataUser.userId !== key && countUserDisplayName < 2) {
                            chatBoxName += value.displayName ? value.displayName :
                                value.email ? value.email :
                                    i18n.t('chat.user') + ', ';
                            countUserDisplayName += 1;
                        }
                    }
                }

            }
        }

        return (

            <div className={classes.chatBoardWrapper}>
                {isLoading && <LoadingAction />}
                {dataInfoChatBoard ? <React.Fragment>
                    <div className={classes.chatBoardHeader}>
                        {chatBoxIcon ? <img src={chatBoxIcon} alt=""/> : (dataInfoChatBoard.chatBoxType === PRIVATE_CHAT) ? <PersonIcon width={48} height={48}/> : <GroupIcon width={48} height={48} />}
                        <span className="chatBoxName">{chatBoxName}</span>
                    </div>
                    <div className={classes.contentWrapper}>
                        <div className={classes.chatBoardContent}>
                            {dataMessagesChatBoard && this.viewMessages().map((item, index) => {
                                return this.viewItemMessage(item)
                            })}
                        </div>
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
                                <div className={classes.popoverSticker}>
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
                                                        renderInput={(params) => (
                                                            <TextField {...params} variant="outlined" label={i18n.t('chat.chat_page.selectUser')}
                                                                       placeholder={i18n.t('chat.chat_page.selectUser')}/>
                                                        )}
                                                    />
                                                    {errors.selectUser && <div className={classes.errorText}>
                                                        {errors.selectUser}
                                                    </div>}
                                                    <AppInput
                                                        type="number"
                                                        name="sizeChessBoard"
                                                        value={dataInitPrivateBoard.sizeChessBoard}
                                                        onChange={(event) => this.handleInitPrivateBoardChange('sizeChessBoard', event.target.value)}
                                                        inputProps={{
                                                            min: 10,
                                                            max: 20
                                                        }}
                                                    />
                                                    <Button
                                                        className={classes.submitCreateBoard}
                                                        onClick={this.createGroupBoard}
                                                    >
                                                        {i18n.t('welcome.createChessBoard')}
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
                                                            inputProps={{
                                                                min: 10,
                                                                max: 20
                                                            }}
                                                        />
                                                        <Button
                                                            className={classes.submitCreateBoard}
                                                            onClick={this.createPrivateBoard}
                                                        >
                                                            {i18n.t('welcome.createChessBoard')}
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
                                placeholder={i18n.t('chat.chat_board.input_text')}
                                value={textInputValue}
                                onChange={(event) => this.handleChange('textInputValue', event.target.value)}
                                onKeyPress={this.onKeyboardPressTextInput}
                            />
                            <img
                                className="icSend"
                                src={SendIcon}
                                alt="icon send"
                                onClick={() => {
                                    if (textInputValue !== '') {
                                        this.onSendMessage(textInputValue, MESSAGE_TYPE_TEXT)
                                    }
                                }}
                            />
                        </div>
                    </div>
                </React.Fragment> : <div className={classes.notDataChatBoard}>
                    {i18n.t('chat.chat_board.not_data_chat_board', {"name": dataUser.displayName ? dataUser.displayName : ""})}
                    </div>}
                <SuccessAlert
                    snackbarProps={{
                        open:successOpen,
                        onClose:this.handleCloseNotice,
                    }}
                    message={i18n.t('alert.success')}
                />
                <ErrorAlert
                    snackbarProps={{
                        open:errorOpen,
                        onClose:this.handleCloseNotice,
                    }}
                    message={i18n.t('alert.error')}
                />
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
    withTranslation(),
) (ChatBoard);
