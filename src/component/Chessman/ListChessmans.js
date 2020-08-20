import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router";
import firebase from "./../../firebase";
import Button from "@material-ui/core/Button";
import {ReactComponent as CheckIcon} from "../../images/check_icon.svg";
import * as gameActions from "../../_actions/game";

const styles = theme => ({
    managementBackgroundWrapper: {
        width: '90%',
        margin: 'auto'
    },
    headerBackground: {
        paddingTop: '1rem',
        borderBottom: '1px dashed black',
        marginBottom: '1rem',
        '& .menuItem': {
            textTransform: 'initial',
            borderRadius: '11px 11px 0px 0px',
            '&.active': {
                border: '2px solid black',
            }
        }
    },
    contentBackground: {

    },
    managementBGWrapper: {

    },
    backgroundList: {

    },
    backgroundItem: {
        display: 'flex',
        alignItems: 'center',
        height: 240,
        justifyContent: 'flex-end',
        padding: '0.5rem 0rem',
        '& .imgWrapper': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            // border: '1px solid black',
            padding: '0.25rem 0.5rem',
            backgroundColor: '#ce7a7a',
            '& img': {
                objectFit: 'cover',
                height: '100%',
            }
        },
        '& .checkWrapper': {
            padding: '0rem 0.5rem',
            '& .checkBackground': {
                width: 48,
                height: 48,
                backgroundColor: '#fff',
                minWidth: 'auto'
            }
        }

    },
    notBg: {

    }
});

class listChessmans extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataChessmans: [],
        };
        this.getDataChessmans = this.getDataChessmans.bind(this);
        this.setChessmanDefault = this.setChessmanDefault.bind(this);
    }

    componentDidMount() {
        const {
            dataUserAuth,
            dataUser
        } = this.props;
        this.getDataChessmans();

    }

    getDataChessmans() {
        firebase.database().ref('chessmans/').orderByChild('default').on('value', (snap) => {
            if (snap.val()) {
                let dataChessmansTemp = [];
                Object.keys(snap.val()).map((key, index)=>{
                    dataChessmansTemp.push(snap.val()[key]);
                });
                // sort
                dataChessmansTemp.sort((chessmanA, chessmanB) => {
                    return (
                        chessmanB.default - chessmanA.default
                    );
                });
                // filter default = 1
                const dataChessmansDefault = dataChessmansTemp.filter((data) => {
                    return data.default;
                }).sort((chessmanA, chessmanB) => {
                    return (
                        chessmanB.updateAt - chessmanA.updateAt
                    );
                });
                // filter default = 0
                const dataChessmansNotDefault = dataChessmansTemp.filter((data) => {
                    return !data.default;
                }).sort((chessmanA, chessmanB) => {
                    return (
                        chessmanB.updateAt - chessmanA.updateAt
                    );
                });
                dataChessmansTemp = dataChessmansDefault.concat(dataChessmansNotDefault);

                this.setState({
                    dataChessmans: dataChessmansTemp
                })
            }
        });
    }

    setChessmanDefault(dataChessmanItem, checkDefault) {
        firebase.database().ref('chessmans/' + dataChessmanItem.chessmanId).set({
            ...dataChessmanItem,
            updateAt: new Date().getTime(),
            default: checkDefault,
        }, (error) => {
            if (error) {

            } else {
                this.getDataChessmans();
            }
        });
    }


    render() {
        const {
            dataChessmans,
        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataUser
        } = this.props;

        return (
            <div className={classes.managementBGWrapper}>
                {
                    Array.isArray(dataChessmans) && dataChessmans.length
                        ?
                        <div className={classes.backgroundList}>
                            {
                                dataChessmans.map((item, index) => {
                                    return (
                                        <div className={classes.backgroundItem}>
                                            <div className="imgWrapper">
                                                <img src={item.chessmanUrl} alt=""/>
                                            </div>
                                            <div className="nameChess">
                                                {item.name ? item.name : ''}
                                            </div>
                                            <div className="checkWrapper">
                                                {
                                                    (index === 0 || index === 1)
                                                        ?
                                                        <Button
                                                            className="checkBackground"
                                                            onClick={() => this.setChessmanDefault(item, 0)}
                                                        >
                                                            <CheckIcon
                                                                width={36}
                                                                height={36}
                                                            />
                                                        </Button>
                                                        :
                                                        <Button
                                                            className="checkBackground"
                                                            onClick={() => this.setChessmanDefault(item, 1)}
                                                        >

                                                        </Button>
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }

                        </div>
                        :
                        <div className={classes.notBg}>
                            <span>Not Background</span>
                            <Button
                                onClick={() => {
                                    this.props.goToUploadChessman()
                                }}
                            >
                                Upload Background
                            </Button>
                        </div>
                }
            </div>
        );
    }
}

listChessmans.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataUser: state.gameReducer.dataUser,
});

const mapDispatchToProps = (dispatch) => {
    return {
        saveDataUser: (userId, dataUser) => dispatch(gameActions.saveDataUser(userId, dataUser)),
        showDataUser: (userId) => dispatch(gameActions.showDataUser(userId)),

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation(),
    withRouter,
) (listChessmans);
