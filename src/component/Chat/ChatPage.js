import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import Content from "../Content";
import ListChatBoard from "./ListChatBoard";
import firebase, {storage} from "../../firebase";
import ChatBoard from "./ChatBoard";
import Button from "@material-ui/core/Button";
import {ReactComponent as PersonIcon} from "../../images/person_icon.svg";
import Popover from "@material-ui/core/Popover";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import UploadPhoto from "../../theme/UploadPhoto";
import Input from "@material-ui/core/Input";
import {GROUP_CHAT, MESSAGE_TYPE_CREATE_CHAT_BOX, PRIVATE_CHAT} from "../../constants/constants";
import {paramsToObject} from "../../functions/functions";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ReactComponent as GroupIcon } from "./../../images/group_icon.svg";
import i18n from "../../i18n";
import AppInput from "../../theme/AppInput";
import * as gameActions from "../../_actions/game";
import SuccessAlert from "../../theme/Alert/SuccessAlert";
import ErrorAlert from "../../theme/Alert/ErrorAlert";
import {withTranslation} from "react-i18next";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const styles = theme => ({
    chatPageWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        flexDirection: 'column',
        overflowY: 'scroll',
        backgroundColor: '#e0ece4',
        borderRadius: 9,
        margin: '0.5rem 1rem',
        '&::-webkit-scrollbar': {
            width: 9,
            height: 9,
        },
        '&::-webkit-scrollbar-track': {
            // background: '#ee6f57',
            // borderRadius: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 9,
            background: '#ee6f57',
        },
    },
    actionChat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 0rem',
    },
    createPrivateChat: {
        '& .btnOpenPopover': {
            '& span.plus': {
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#206a5d',
                padding: '0rem 0.5rem'
            },
            '& svg': {
                '& path': {
                    fill: '#00334e',
                    stroke: '#00334e'
                }
            }
        }
    },
    createGroupChat: {
        '& .btnOpenPopover': {
            '& span.plus': {
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#206a5d',
                padding: '0rem 0.5rem'
            },
            '& svg': {
                '& path': {
                    fill: '#00334e',
                    stroke: '#00334e'
                }
            }
        }
    },
    contentChat: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0rem 0.5rem',
        justifyContent: 'flex-end',
    },
    viewListChatBoard: {
        height: '100%',
        backgroundColor: '#8fc0a9',
        width: 250,
        borderRadius: 7,
        padding: '1rem 0.5rem',
    },
    viewChatBoard: {
        flexGrow: 1,
    },
    listChat: {

    },
    createPrivateChatPopover: {
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 11,
        width: 400,
        '& .btnCreate': {
            margin: '1rem 0rem',
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
        }
    },
    createGroupChatPopover: {
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& .btnCreate': {
            margin: '1rem 0rem',
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
        }
    },
    photoChatBox: {
        width: 300,
        height: 300,
        margin: '0.5rem 0rem',
    },
    nameGroupInput: {
        '& input': {
            background: '#e0ece4',
            color: '#123152',
        },
    }
});

class ChatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataAllUsers: [],
            idChatBoxCurrent: null,
            popoverCreatePrivateChat: null,
            popoverCreateGroupChat: null,

            dataUserPrivateChat: null,
            dataUserGroupChat: [],

            checkCreatePrivateChat1: false,
            checkCreatePrivateChat2: false,

            photoChatBox: null,
            photoChatBoxPreview: '',
            photoChatBoxName: '',
            progressUploadBackground: 0,
            nameGroupChat: '',
            successOpen: false,
            errorOpen: false,
        };

        this.handleCloseNotice = this.handleCloseNotice.bind(this);
        this.openPopoverCreatePrivateChat = this.openPopoverCreatePrivateChat.bind(this);
        this.closePopoverCreatePrivateChat = this.closePopoverCreatePrivateChat.bind(this);
        this.openPopoverCreateGroupChat = this.openPopoverCreateGroupChat.bind(this);
        this.closePopoverCreateGroupChat = this.closePopoverCreateGroupChat.bind(this);

        this.createPrivateChat = this.createPrivateChat.bind(this);
        this.submitPrivateChat = this.submitPrivateChat.bind(this);
        this.createGroupChat = this.createGroupChat.bind(this);
        this.submitGroupChat = this.submitGroupChat.bind(this);
        this.handleGroupChatChange = this.handleGroupChatChange.bind(this);
        this.handlePhotoChatBox = this.handlePhotoChatBox.bind(this);
        this.removePhotoChatBox = this.removePhotoChatBox.bind(this);
        this.inputAvatarRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handlePrivateChatChange = this.handlePrivateChatChange.bind(this);
    }

    componentDidMount() {

    }

    showAllUsers() {
        firebase.database().ref('users').on('value', (snap) => {
            if (snap.val()) {
                let dataAllUsersTemp = [];
                Object.keys(snap.val()).map((key, index)=>{
                    if (key !== this.props.dataUserAuth.uid) {
                        dataAllUsersTemp.push(snap.val()[key]);
                    }
                });
                this.setState({
                    dataAllUsers: dataAllUsersTemp
                })
            }
        });
    }


    handleChange(name, value) {
        this.setState({
            [name]: value
        })
    }

    handlePhotoChatBox(event) {
        this.setState({
            photoChatBox: event.target.files[0],
            photoChatBoxPreview: URL.createObjectURL(event.target.files[0]),
            photoChatBoxName: event.target.files[0].name,
        });
    }

    removePhotoChatBox() {
        this.setState({
            photoChatBox: null,
            photoChatBoxPreview: '',
            photoChatBoxName: '',
        });
    }

    createPrivateChat() {
        const {
            dataUserAuth,
            dataUser
        } = this.props;
        const {
            dataUserPrivateChat
        } = this.state;

        if (dataUserPrivateChat) {
            const idChatBox = dataUserAuth.uid + '_' + dataUserPrivateChat.userId;
            // check Exist Private Chat 1
            firebase.database().ref('chats').orderByChild('idChatBox').equalTo(idChatBox).valueOf().on('value', (snap) => {
                if (snap.val()) {
                    this.setState({
                        popoverCreatePrivateChat: null,
                    });
                } else {
                    this.setState({
                        checkCreatePrivateChat1: true
                    });
                }
            });

            // check Exist Private Chat 2
            const idChatBox2 = dataUserPrivateChat.userId + '_' + dataUserAuth.uid;
            firebase.database().ref('chats').orderByChild('idChatBox').equalTo(idChatBox2).valueOf().on('value', (snap) => {
                if (snap.val()) {
                    this.setState({
                        popoverCreatePrivateChat: null,
                    });
                } else {
                    this.setState({
                        checkCreatePrivateChat2: true
                    });
                }
            });

        }
    }

    submitPrivateChat() {
        const {
            dataUserPrivateChat,
        } = this.state;
        const {
            dataUserAuth,
            dataUser,
        } = this.props;
        // create chatBox
        const idChatBox = dataUserAuth.uid + '_' + dataUserPrivateChat.userId;
        const dataInitChatBox = {
            idChatBox: idChatBox,
            statusChatBox: 2,
            photoChatBox: null,
            chatBoxType: PRIVATE_CHAT,
            updatedAt: new Date().getTime(),
        };
        const dataMembers = {
            [dataUser.userId]: dataUser,
            [dataUserPrivateChat.userId]: dataUserPrivateChat,
        };

        dataInitChatBox[dataUser.userId + '_checkUpdate'] = 2;
        dataInitChatBox[dataUserPrivateChat.userId + '_checkUpdate'] = 1;
        dataInitChatBox[dataUser.userId + '_checkMember'] = true
        dataInitChatBox[dataUserPrivateChat.userId + '_checkMember'] = true;
        dataInitChatBox.dataMembers = dataMembers;

        firebase.database().ref('chats/' + idChatBox).set(dataInitChatBox, (error) => {
            if (error) {
                this.setState({
                    popoverCreatePrivateChat: null,
                })
            } else {
                const createdAt = new Date().getTime();
                const dataMessage = {
                    createdAt: createdAt,
                    typeMessage: MESSAGE_TYPE_CREATE_CHAT_BOX,
                    content: null,
                };
                firebase.database().ref('messages/' + idChatBox + '/' + createdAt).set(dataMessage, error => {
                    if (error) {
                        this.setState({
                            popoverCreatePrivateChat: null,
                            photoChatBox: null,
                            photoChatBoxPreview: '',
                            photoChatBoxName: '',
                        })
                    } else {
                        this.setState({
                            popoverCreatePrivateChat: null,
                            photoChatBox: null,
                            photoChatBoxPreview: '',
                            photoChatBoxName: '',
                        })
                    }
                })
            }
        });
    }

    createGroupChat() {
        const {
            dataUserAuth,
            dataUser,
        } = this.props;
        const {
            dataUserGroupChat,
            nameGroupChat,
            photoChatBox,
            photoChatBoxPreview,
            photoChatBoxName,
        } = this.state;
        if (Array.isArray(dataUserGroupChat) && dataUserGroupChat.length) {

            // create chatBox
            const idChatBox = dataUserAuth.uid + '_' + new Date().getTime();
            if (photoChatBox) {
                const nameImage = idChatBox + '_' + new Date().getTime();
                const uploadTask = storage.ref(`images/photoChatBox/${nameImage}`).put(photoChatBox);
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
                        this.setState({
                            progressUploadBackground: 0,
                            isLoading: false,
                            photoChatBox: null,
                            photoChatBoxPreview: '',
                            photoChatBoxName: '',
                        });
                    },
                    () => {
                        // complete function ....
                        storage.ref('images/photoChatBox').child(nameImage).getDownloadURL().then(url => {
                            this.submitGroupChat(idChatBox, url);
                        });
                    });

            } else {
                this.submitGroupChat(idChatBox);
            }
        }
    }

    submitGroupChat(idChatBox, photoChatBox) {
        const {
            dataUserAuth,
            dataUser,
        } = this.props;
        const {
            dataUserGroupChat,
            nameGroupChat,
        } = this.state;
        // let dataMembers = [];
        const dataUserId = {
            [dataUser.userId + '_checkUpdate']: 2
        };
        const dataMembers = {
            [dataUser.userId]: dataUser
        };
        const dataUserIdCheckMember = {
            [dataUser.userId + '_checkMember']: true
        };
        // dataMembers.push(dataUser);
        dataUserGroupChat.map((item, index) => {
            // dataMembers.push(item);
            dataUserId[item.userId + '_checkUpdate'] = 1;
            dataMembers[item.userId] = item;
            dataUserIdCheckMember[item.userId + '_checkMember'] = true;
        });
        const dataInitChatBox = {
            idChatBox: idChatBox,
            statusChatBox: 2,
            photoChatBox: photoChatBox ? photoChatBox : null,
            nameGroupChat: nameGroupChat,
            createdBy: dataUserAuth.uid,
            chatBoxType: GROUP_CHAT,
            updatedAt: new Date().getTime(),
            dataMembers: dataMembers,
            ...dataUserId,
            ...dataUserIdCheckMember
        };


        firebase.database().ref('chats/' + idChatBox).set(dataInitChatBox, (error) => {
            if (error) {
                this.setState({
                    popoverCreateGroupChat: null,
                    photoChatBox: null,
                    photoChatBoxPreview: '',
                    photoChatBoxName: '',
                })
            } else {
                const createdAt = new Date().getTime();
                const dataMessage = {
                    createdAt: createdAt,
                    typeMessage: MESSAGE_TYPE_CREATE_CHAT_BOX,
                    contentMessage: null,
                    createdBy: null,
                };
                firebase.database().ref('messages/' + idChatBox + '/' + createdAt).set(dataMessage, error => {
                    if (error) {
                        this.setState({
                            popoverCreateGroupChat: null,
                            photoChatBox: null,
                            photoChatBoxPreview: '',
                            photoChatBoxName: '',
                        })
                    } else {
                        this.setState({
                            popoverCreateGroupChat: null,
                            photoChatBox: null,
                            photoChatBoxPreview: '',
                            photoChatBoxName: '',
                        })
                    }
                })

            }
        });
    }

    handlePrivateChatChange(event, value) {
        this.setState({
            dataUserPrivateChat: value,
        })
    }

    handleGroupChatChange(event, value) {
        this.setState({
            dataUserGroupChat: value,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            checkCreatePrivateChat1,
            checkCreatePrivateChat2,
            dataUserPrivateChat,
            idChatBoxChange,
        } = this.state;
        const {
            dataUserAuth,
            dataUser,
        } = this.props;
        if (checkCreatePrivateChat1 && checkCreatePrivateChat2) {
            this.setState({
                checkCreatePrivateChat1: false,
                checkCreatePrivateChat2: false
            });
            this.submitPrivateChat();
        }

        //
        const urlParams = new URLSearchParams(window.location.search.substr(1));
        const entries = urlParams.entries();
        const params = paramsToObject(entries);
        const {
            idChatBoxCurrent
        } = this.state;
        if (params.hasOwnProperty('idChatBox') && idChatBoxChange) {
            const idChatBox = params.idChatBox;
            if (idChatBox !== idChatBoxCurrent) {
                this.setState({
                    idChatBoxCurrent: idChatBox,
                    idChatBoxChange: false
                });
                this.props.setDataMessagesChatBoard(idChatBox);
                this.props.setDataInfoChatBoard(idChatBox);
            }
        }
    }

    showDataChatBoard(idChatBox) {
        firebase.database().ref('messages/' + idChatBox).on('value', (snap) => {
            if (snap.val()) {
               console.log(snap.val());
            }
        });
    }


    openPopoverCreatePrivateChat(event) {
        this.showAllUsers();
        this.setState({
            popoverCreatePrivateChat: event.currentTarget
        })
    }

    closePopoverCreatePrivateChat() {
        this.setState({
            popoverCreatePrivateChat: null,
            dataUserPrivateChat: null
        })
    }

    openPopoverCreateGroupChat(event) {
        this.showAllUsers();
        this.setState({
            popoverCreateGroupChat: event.currentTarget
        })
    }

    closePopoverCreateGroupChat() {
        this.setState({
            popoverCreateGroupChat: null
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
            popoverCreatePrivateChat,
            popoverCreateGroupChat,
            dataAllUsers,
            dataUserPrivateChat,
            dataUserGroupChat,
            dataAllChatBox,
            nameGroupChat,
            photoChatBox,
            photoChatBoxPreview,
            photoChatBoxName,
            progressUploadBackground,
            successOpen,
            errorOpen,
        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataUser
        } = this.props;
        // console.log(match);

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.chatPageWrapper}>
                        <div className={classes.actionChat}>
                            <div className={classes.createPrivateChat}>
                                <Button
                                    className="btnOpenPopover"
                                    onClick={this.openPopoverCreatePrivateChat}
                                >
                                    <span className="plus">+</span>
                                    <PersonIcon />
                                </Button>
                                { popoverCreatePrivateChat && <Popover
                                    open={true}
                                    anchorEl={popoverCreatePrivateChat}
                                    onClose={this.closePopoverCreatePrivateChat}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <div className={classes.createPrivateChatPopover}>
                                        <Autocomplete
                                            id="combo-box-demo"
                                            options={dataAllUsers}
                                            getOptionLabel={(option) => option.displayName}
                                            style={{ width: 300 }}
                                            onChange={this.handlePrivateChatChange}
                                            renderInput={(params) => <TextField {...params} label={i18n.t('chat.chat_page.selectUser')} variant="outlined" />}
                                        />
                                        <Button
                                            className="btnCreate"
                                            onClick={this.createPrivateChat}
                                        >
                                            {i18n.t('chat.chat_page.btnCreatePrivate')}
                                        </Button>
                                    </div>
                                </Popover>}
                            </div>
                            <div className={classes.createGroupChat}>
                                <Button
                                    className="btnOpenPopover"
                                    onClick={this.openPopoverCreateGroupChat}
                                >
                                    <span className="plus">+</span>
                                    <GroupIcon />
                                </Button>
                                { popoverCreateGroupChat && <Popover
                                    open={true}
                                    anchorEl={popoverCreateGroupChat}
                                    onClose={this.closePopoverCreateGroupChat}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <div className={classes.createGroupChatPopover}>
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={dataAllUsers}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option.displayName}
                                            onChange={this.handleGroupChatChange}
                                            renderOption={(option, { selected }) => (
                                                <React.Fragment>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option.displayName}
                                                </React.Fragment>
                                            )}
                                            style={{ width: 500 }}
                                            renderInput={(params) => <TextField {...params} label={i18n.t('chat.chat_page.selectUser')} variant="outlined" />}
                                        />
                                        <div className={classes.photoChatBox}>
                                            <UploadPhoto
                                                onChange={this.handlePhotoChatBox}
                                                removePhoto={this.removePhotoChatBox}
                                                photo={photoChatBox}
                                                photoPreview={photoChatBoxPreview}
                                                photoName={photoChatBoxName}
                                                progressUploadBackground={progressUploadBackground}
                                            />
                                        </div>
                                        <AppInput
                                            className={classes.nameGroupInput}
                                            name="nameGroupChat"
                                            value={nameGroupChat}
                                            type="text"
                                            placeholder={i18n.t('chat.chat_page.create_group.nameGroupChat')}
                                            onChange={(event) => this.handleChange('nameGroupChat', event.target.value)}
                                        />
                                        <Button
                                            className="btnCreate"
                                            onClick={this.createGroupChat}
                                        >
                                            {i18n.t('chat.chat_page.btnCreateGroup')}
                                        </Button>
                                    </div>
                                </Popover>}
                            </div>
                        </div>
                        <div className={classes.contentChat}>
                            <div className={classes.viewListChatBoard}>
                                <ListChatBoard />
                            </div>
                            <div className={classes.viewChatBoard}>
                                <ChatBoard />
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer />
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
            </React.Fragment>
        );
    }
}

ChatPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataUser: state.gameReducer.dataUser,
    dataInfoChatBoard: state.gameReducer.dataInfoChatBoard,
});

const mapDispatchToProps = (dispatch) => {
    return {
        setDataMessagesChatBoard: (idChatBox) => dispatch(gameActions.setDataMessagesChatBoard(idChatBox)),
        setDataInfoChatBoard: (idChatBox) => dispatch(gameActions.setDataInfoChatBoard(idChatBox))
    }
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
) (ChatPage);
