import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import firebase, {storage} from "../../firebase";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {GROUP_CHAT, MESSAGE_TYPE_CREATE_CHAT_BOX, PRIVATE_CHAT} from "../../constants/constants";
import * as types from "../../_constants/game";
import {NavLink} from "react-router-dom";
import * as links from "./../../constants/links";
import UploadPhoto from "../../theme/UploadPhoto";
import Input from "@material-ui/core/Input";
import {paramsToObject} from "../../functions/functions";
import * as gameActions from "../../_actions/game";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const styles = theme => ({
    createPrivateChatPopover: {
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& button': {
            margin: '1rem 0rem',
        }
    },
    createGroupChatPopover: {
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '& button': {
            margin: '1rem 0rem',
        }
    },

});
class ListChatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popoverCreatePrivateChat: null,
            popoverCreateGroupChat: null,
            dataAllUsers: [],
            dataUserPrivateChat: null,
            dataUserGroupChat: [],
            checkCreatePrivateChat1: false,
            checkCreatePrivateChat2: false,
            photoChatBox: null,
            photoChatBoxPreview: '',
            photoChatBoxName: '',
            progressUploadBackground: 0,
            nameGroupChat: '',
            dataAllChatBox: [],

            //
            idChatBoxCurrent: null,
            idChatBoxChange: true,
        };

        this.openPopoverCreatePrivateChat = this.openPopoverCreatePrivateChat.bind(this);
        this.closePopoverCreatePrivateChat = this.closePopoverCreatePrivateChat.bind(this);
        this.openPopoverCreateGroupChat = this.openPopoverCreateGroupChat.bind(this);
        this.closePopoverCreateGroupChat = this.closePopoverCreateGroupChat.bind(this);
        this.createPrivateChat = this.createPrivateChat.bind(this);
        this.createGroupChat = this.createGroupChat.bind(this);
        this.handlePrivateChatChange = this.handlePrivateChatChange.bind(this);
        this.handleGroupChatChange = this.handleGroupChatChange.bind(this);
        this.showChats = this.showChats.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handlePhotoChatBox = this.handlePhotoChatBox.bind(this);
        this.removePhotoChatBox = this.removePhotoChatBox.bind(this);
        this.inputAvatarRef = React.createRef();
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
            dataInitChatBox[dataUser.userId + '_checkMember'] = true;
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
                console.log('setDataInfoChatBoard')
                this.props.setDataInfoChatBoard(idChatBox);
            }
        }
    }



    componentDidMount() {
        this.showChats();
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
        // this.viewDataUserById(this.props.dataUser.userId);
    }

    openPopoverCreatePrivateChat(event) {
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
        this.setState({
            popoverCreateGroupChat: event.currentTarget
        })
    }

    closePopoverCreateGroupChat() {
        this.setState({
            popoverCreateGroupChat: null
        })
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
            [dataUser.userId]: 2
        };
        const dataUserIdCheckMember = {
            [dataUser.userId + '_checkUpdate']: true
        };
        const dataMembers = {
            [dataUser.userId + '_checkMember']: true
        };
        // dataMembers.push(dataUser);
        dataUserGroupChat.map((item, index) => {
            // dataMembers.push(item);
            dataUserId[item.userId + '_checkUpdate'] = 1;
            dataMembers[item.userId] = dataUser;
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

        console.log(dataInitChatBox);

        firebase.database().ref('chats/' + idChatBox).set(dataInitChatBox, (error) => {
            if (error) {
                this.setState({
                    popoverCreateGroupChat: null,
                    photoChatBox: null,
                    photoChatBoxPreview: '',
                    photoChatBoxName: '',
                })
            } else {
                console.log('SUCCESS !');
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

    showChats() {
        const {
            dataUser
        } = this.props;
        console.log(dataUser.userId);
        firebase.database().ref('chats').orderByChild(dataUser.userId + '_checkMember').equalTo(true).on('value', (snap) => {
            if (snap.val()) {
                let dataAllChatBoxTemp = [];
                Object.keys(snap.val()).map((key, index)=>{
                    dataAllChatBoxTemp.push(snap.val()[key]);
                });
                dataAllChatBoxTemp.sort((chatBoxA, chatBoxB) => {
                    return (
                        chatBoxB.updatedAt - chatBoxA.updatedAt
                    );
                });
                this.setState({
                    dataAllChatBox: dataAllChatBoxTemp
                })
            }
        });
    }

    // async viewDataUserById(userId) {
    //     return firebase.database().ref('users/' + userId).on('value', (snap) => {
    //         if (snap.val()) {
    //             return snap.val();
    //         } else {
    //             return null;
    //         }
    //     });
    // }

    // viewDataUserById(userId) {
    //     let data = null;
    //     this.viewDataUserByIdCallback(userId, (dataUser) => {
    //         data = dataUser;
    //     });
    //     console.log(data);
    // }

    viewFriendInfoPrivateChat(dataMembers) {
        const {
            dataUser
        } = this.props;
        let dataFriend = null;
        for (let [key, value] of Object.entries(dataMembers)) {
            if (dataUser.userId !== key) {
                dataFriend = value;
            }
        }
        return dataFriend;
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
            progressUploadBackground
        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataUser
        } = this.props;
        console.log(dataUser);
        return (
            <div className={classes.viewListChatBoard}>
                <div className={classes.createPrivateChat}>
                    <Button
                        className="btn"
                        onClick={this.openPopoverCreatePrivateChat}
                    >
                        create Private Chat
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
                                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
                            />
                            <Button
                                className="btn"
                                onClick={this.createPrivateChat}
                            >
                                create private
                            </Button>
                        </div>
                    </Popover>}
                </div>
                <div className={classes.createGroupChat}>
                    <Button
                        className="btn"
                        onClick={this.openPopoverCreateGroupChat}
                    >
                        Create Group Chat
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
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
                                )}
                            />
                            <UploadPhoto
                                onChange={this.handlePhotoChatBox}
                                removePhoto={this.removePhotoChatBox}
                                photo={photoChatBox}
                                photoPreview={photoChatBoxPreview}
                                photoName={photoChatBoxName}
                                progressUploadBackground={progressUploadBackground}
                            />
                            <Input
                                name="nameGroupChat"
                                value={nameGroupChat}
                                type="text"
                                onChange={(event) => this.handleChange('nameGroupChat', event.target.value)}
                            />
                            <Button
                                className="btn"
                                onClick={this.createGroupChat}
                            >
                                creat group
                            </Button>
                        </div>
                    </Popover>}
                </div>
                <div className={classes.listChat}>
                    {
                        dataAllChatBox.map((item, index) => {
                            return (
                                <NavLink
                                    to={links.LINK_CHAT_PAGE + '?idChatBox=' + item.idChatBox}
                                    onClick={() => {
                                        this.setState({
                                            idChatBoxChange: true
                                        })
                                    }}
                                >
                                    <div className="itemChatBox">
                                        {
                                            (item.chatBoxType === PRIVATE_CHAT)
                                            ?
                                                <span>{this.viewFriendInfoPrivateChat(item.dataMembers) && this.viewFriendInfoPrivateChat(item.dataMembers).displayName ? this.viewFriendInfoPrivateChat(item.dataMembers).displayName : ''}</span>
                                                :
                                                <span>{
                                                    item.nameGroupChat
                                                }</span>
                                        }
                                    </div>
                                </NavLink>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

ListChatBoard.propTypes = {
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
    // withTranslation()
) (ListChatBoard);
