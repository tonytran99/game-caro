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
import { ReactComponent as PersonIcon } from "./../../images/person_icon.svg";
import { ReactComponent as GroupIcon } from "./../../images/group_icon.svg";
import i18n from "../../i18n";
import {withTranslation} from "react-i18next";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const styles = theme => ({

    itemChatLink: {

    },
    itemChatBoard: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.25rem',
        borderBottom: '1px solid darkcyan',
        position: 'relative',
        '& svg.type': {
            position: 'absolute',
            right: 0,
            top: 2
        },
        '& .avatar': {
            width: 48,
            height: 48,
            '& img': {
                width: '100%',
                height: '100%',
                borderRadius: '50%'
            },
            '& svg': {
                width: '100%',
                height: '100%',
                borderRadius: '50%'
            }
        },
        '& .info': {
            flexGrow: 1,
            color: '#123152',
            fontWeight: 600,
            paddingLeft: '0.5rem',
            fontSize: '0.9rem',
        }
    }

});
class ListChatBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataAllChatBox: [],
            idChatBoxCurrent: null,
            idChatBoxChange: true,
        };

        this.showChats = this.showChats.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            idChatBoxChange,
        } = this.state;
        const {
            dataUserAuth,
            dataUser,
        } = this.props;
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



    componentDidMount() {
        this.showChats();

        // this.viewDataUserById(this.props.dataUser.userId);
    }




    showChats() {
        const {
            dataUser
        } = this.props;
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



    viewFriendInfoPrivateChat(dataChatBoard) {
        const {
            dataUser,
            classes
        } = this.props;
        let dataFriend = null;
        for (let [key, value] of Object.entries(dataChatBoard.dataMembers)) {
            if (dataUser.userId !== key) {
                dataFriend = value;
            }
        }
        return (dataFriend ? <div className={classes.itemChatBoard}>
                <PersonIcon className="type" width={18} height={18} />
                <div className="avatar">
                {
                    dataFriend.avatarUrl ? <img src={dataFriend.avatarUrl} alt=""/> : <PersonIcon/>
                }
                </div>
            <div className="info">
                {
                    dataFriend.displayName ? dataFriend.displayName :
                        dataFriend.email ? dataFriend.email :
                            'user'
                }
            </div>

        </div> : null);
    }

    viewFriendInfoGroupChat(dataChatBoard) {
        const {
            dataUser,
            classes
        } = this.props;
        // let dataFriend = null;
        // for (let [key, value] of Object.entries(dataChatBoard.dataMembers)) {
        //     if (dataUser.userId !== key) {
        //         dataFriend = value;
        //     }
        // }
        if (dataChatBoard) {
            let  displayNameByUser = '';
            let countUserDisplayName = 0;
            for (let [key, value] of Object.entries(dataChatBoard.dataMembers)) {
                if (dataUser.userId !== key && countUserDisplayName < 2) {
                    displayNameByUser += value.displayName ? value.displayName :
                        value.email ? value.email :
                            i18n.t('chat.user') + ', ';
                    countUserDisplayName += 1;
                }
            }
            return <div className={classes.itemChatBoard}>
                <GroupIcon className="type" width={18} height={18}/>
                <div className="avatar">
                    {
                        dataChatBoard.photoChatBox ? <img src={dataChatBoard.photoChatBox} alt=""/> : <GroupIcon />
                    }
                </div>
                <div className="info">
                    {
                        dataChatBoard.nameGroupChat ? dataChatBoard.nameGroupChat :
                            displayNameByUser ? displayNameByUser :
                                i18n.t('chat.group') + ', '
                    }
                </div>

            </div>
        }
        return null;
    }

    render() {
        const {

            dataAllChatBox,
        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataUser
        } = this.props;
        return (
            <div className={classes.viewListChatBoard}>
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
                                    className={classes.itemChatLink}
                                >
                                        {
                                            (item.chatBoxType === PRIVATE_CHAT)
                                            ?
                                                <React.Fragment>{this.viewFriendInfoPrivateChat(item) === null ? <PersonIcon /> : this.viewFriendInfoPrivateChat(item)}</React.Fragment>
                                                :
                                                <React.Fragment>{this.viewFriendInfoGroupChat(item) === null ? <PersonIcon /> : this.viewFriendInfoGroupChat(item)}</React.Fragment>
                                        }
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
    withTranslation(),
) (ListChatBoard);
