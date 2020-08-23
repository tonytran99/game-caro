// import React from 'react';
// import {connect} from "react-redux";
// import {withStyles} from "@material-ui/core/styles";
// import PropTypes from "prop-types";
// import {compose} from "redux";
// import {BOARD_GROUP, BOARD_TW0, GROUP_BOARD} from "../constants/constants";
// import UserIcon from "./../images/user_icon.svg";
// import Header from "../component/Header";
// import Content from "../component/Content";
// import Footer from "../component/Footer";
// import PhotoIcon from "../images/ic_photo.png";
// import StickerIcon from "../images/ic_sticker.png";
// import SendIcon from "../images/ic_send.png";
//
//
// const styles = theme => ({
//     chatBoardWrapper: {
//         display: 'flex',
//         alignItems: 'flex-start',
//         justifyContent: 'center',
//         width: 600,
//         margin: 'auto',
//         backgroundColor: '#fff',
//         height: '100%',
//         flexDirection: 'column',
//     },
//     chatBoardHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '1rem 0rem',
//         width: '100%',
//         borderBottom: '1px solid #e8e8e8',
//         // borderBottom: '1px solid #e8e8e8',
//         // padding: 5,
//         // display: 'flex',
//         // alignItems: 'center',
//         // justifyContent: 'center',
//         // flexDirection: 'row',
//     },
//     chatBoardContent: {
//         height: '100%',
//         flexGrow: 1,
//     },
//     chatBoardInput: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 50,
//         borderTop: '1px solid #e8e8e8',
//         width: '100%',
//         '& .icOpenGallery': {
//             width: 30,
//             height: 30,
//             marginLeft: 10,
//         },
//         '& .viewInputGallery': {
//             opacity: 0,
//             position: 'absolute',
//             zIndex: -1,
//             left: 10,
//             width: 30,
//         },
//         '& .icOpenSticker': {
//             width: 30,
//             height: 30,
//             marginLeft: 5,
//             marginRight: 5,
//         },
//         '& .icSend' : {
//             width: 30,
//             height: 30,
//             marginLeft: 5,
//             marginRight: 5,
//         },
//         '& .viewInput' : {
//             flex: 1,
//             borderRadius: 4,
//             paddingLeft: 10,
//             paddingRight: 10,
//             border: 0,
//             height: 30,
//             '&::focus': {
//                 outline: 0
//             }
//         },
//     }
// });
// class ChatBoard extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//
//         };
//
//         // this.signOut = this.signOut.bind(this);
//     }
//
//     componentDidMount() {
//         const dataChessBoard = {
//             idChessBoard: '',
//             dataBoard: {
//
//             },
//             userIdChessmanA: '',
//             userIdChessmanB: '',
//             userCanViewBoard: [
//                 {
//                     userId: '',
//                     displayName: '',
//                 },
//                 {
//                     userId: '',
//                     displayName: '',
//                 },
//                 {
//                     userId: '',
//                     displayName: '',
//                 }
//             ],
//             secret: false,
//             chessBoardType: GROUP_BOARD,
//             chatChessBoard: [
//
//             ], // => Sap xep
//         }
//     }
//
//     getListHistory = () => {
//         if (this.removeListener) {
//             this.removeListener()
//         }
//         this.listMessage.length = 0
//         this.setState({isLoading: true})
//         if (
//             this.hashString(this.currentUserId) <=
//             this.hashString(this.currentPeerUser.id)
//         ) {
//             this.groupChatId = `${this.currentUserId}-${this.currentPeerUser.id}`
//         } else {
//             this.groupChatId = `${this.currentPeerUser.id}-${this.currentUserId}`
//         }
//
//         // Get history and listen new data added
//         this.removeListener = myFirestore
//             .collection(AppString.NODE_MESSAGES)
//             .doc(this.groupChatId)
//             .collection(this.groupChatId)
//             .onSnapshot(
//                 snapshot => {
//                     snapshot.docChanges().forEach(change => {
//                         if (change.type === AppString.DOC_ADDED) {
//                             this.listMessage.push(change.doc.data())
//                         }
//                     })
//                     this.setState({isLoading: false})
//                 },
//                 err => {
//                     this.props.showToast(0, err.toString())
//                 }
//             )
//     }
//
//     openListSticker = () => {
//         this.setState({isShowSticker: !this.state.isShowSticker})
//     }
//
//     onSendMessage = (content, type) => {
//         if (this.state.isShowSticker && type === 2) {
//             this.setState({isShowSticker: false})
//         }
//
//         if (content.trim() === '') {
//             return
//         }
//
//         const timestamp = moment()
//             .valueOf()
//             .toString()
//
//         const itemMessage = {
//             idFrom: this.currentUserId,
//             idTo: this.currentPeerUser.id,
//             timestamp: timestamp,
//             content: content.trim(),
//             type: type
//         }
//
//         myFirestore
//             .collection(AppString.NODE_MESSAGES)
//             .doc(this.groupChatId)
//             .collection(this.groupChatId)
//             .doc(timestamp)
//             .set(itemMessage)
//             .then(() => {
//                 this.setState({inputValue: ''})
//             })
//             .catch(err => {
//                 this.props.showToast(0, err.toString())
//             })
//     }
//
//     onChoosePhoto(event) {
//         if (event.target.files && event.target.files[0]) {
//             this.setState({isLoading: true})
//             this.currentPhotoFile = event.target.files[0]
//             // Check this file is an image?
//             const prefixFiletype = event.target.files[0].type.toString()
//             if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) === 0) {
//                 this.uploadPhoto()
//             } else {
//                 this.setState({isLoading: false})
//                 this.props.showToast(0, 'This file is not an image')
//             }
//         } else {
//             this.setState({isLoading: false})
//         }
//     }
//
//     uploadPhoto = () => {
//         if (this.currentPhotoFile) {
//             const timestamp = moment()
//                 .valueOf()
//                 .toString()
//
//             const uploadTask = myStorage
//                 .ref()
//                 .child(timestamp)
//                 .put(this.currentPhotoFile)
//
//             uploadTask.on(
//                 AppString.UPLOAD_CHANGED,
//                 null,
//                 err => {
//                     this.setState({isLoading: false})
//                     this.props.showToast(0, err.message)
//                 },
//                 () => {
//                     uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
//                         this.setState({isLoading: false})
//                         this.onSendMessage(downloadURL, 1)
//                     })
//                 }
//             )
//         } else {
//             this.setState({isLoading: false})
//             this.props.showToast(0, 'File is null')
//         }
//     }
//
//     onKeyboardPress = event => {
//         if (event.key === 'Enter') {
//             this.onSendMessage(this.state.inputValue, 0)
//         }
//     }
//
//     scrollToBottom = () => {
//         if (this.messagesEnd) {
//             this.messagesEnd.scrollIntoView({})
//         }
//     }
//
//     render() {
//         const {
//             board
//         } = this.state;
//         const {
//             classes,
//             dataUserAuth,
//             match,
//
//         } = this.props;
//         console.log(match);
//
//         return (
//             <React.Fragment>
//                 <Header />
//                 <Content>
//                     <div className={classes.chatBoardWrapper}>
//                         <div className={classes.chatBoardHeader}>
//                             <img src={UserIcon} alt=""/>
//                             <p>Tony Tran</p>
//                         </div>
//                         <div className={classes.chatBoardContent}>
//
//                         </div>
//                         <div className={classes.chatBoardInput}>
//                             <img
//                                 className="icOpenGallery"
//                                 src={PhotoIcon}
//                                 alt="icon open gallery"
//                                 onClick={() => this.refInput.click()}
//                             />
//                             <input
//                                 ref={el => {
//                                     this.refInput = el
//                                 }}
//                                 accept="image/*"
//                                 className="viewInputGallery"
//                                 type="file"
//                                 // onChange={this.onChoosePhoto}
//                             />
//
//                             <img
//                                 className="icOpenSticker"
//                                 src={StickerIcon}
//                                 alt="icon open sticker"
//                                 // onClick={this.openListSticker}
//                             />
//
//                             <input
//                                 className="viewInput"
//                                 placeholder="Type your message..."
//                                 value={this.state.inputValue}
//                                 onChange={event => {
//                                     this.setState({inputValue: event.target.value})
//                                 }}
//                                 // onKeyPress={this.onKeyboardPress}
//                             />
//                             <img
//                                 className="icSend"
//                                 src={SendIcon}
//                                 alt="icon send"
//                                 // onClick={() => this.onSendMessage(this.state.inputValue, 0)}
//                             />
//                         </div>
//                     </div>
//                 </Content>
//                 {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
//                 <Footer />
//             </React.Fragment>
//         );
//     }
// }
//
// ChatBoard.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
//
//
// const mapStateToProps = state => ({
//     dataUserAuth: state.authReducer.dataUserAuth
// });
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//
//     }
// };
//
// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withStyles(styles),
//     // withTranslation()
// ) (ChatBoard);
