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
import CircularProgress from "@material-ui/core/CircularProgress";
import i18n from "../../i18n";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    listChessmanWrapper: {
        height: '100%',
    },
    chessmanList: {

    },
    chessmanItem: {
        display: 'flex',
        alignItems: 'center',
        height: 180,
        justifyContent: 'flex-end',
        padding: '0.5rem 0rem',
        '& .dataWrapper': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            padding: '0.5rem 1rem',
            backgroundColor: '#bfdcae',
            borderRadius: 9,
            '& img': {
                objectFit: 'cover',
                height: '100%',
                maxWidth: '100%',
            }
        },
        '& .nameChess': {
            width: 200,
            padding: '0.5rem',
            color: '#123152',
            fontWeight: 600,
        },
        '& .checkWrapper': {
            padding: '0rem 0.5rem',
            '& .checkBackground': {
                width: 48,
                height: 48,
                backgroundColor: '#fff',
                minWidth: 'auto',
                '& svg': {
                    '& path': {
                        fill: '#123152',
                        stroke: '#123152',
                    }
                }
            }
        }

    },
    notBg: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        '& .text': {
            color: '#123152',
            fontWeight: 600,
            fontSize: '1.8rem',
            paddingBottom: '1rem'
        },
        '& .btnGoToUpload': {
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
    loadingWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class listChessmans extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataChessmans: [],
            loadingData: false
        };
        this.getDataChessmans = this.getDataChessmans.bind(this);
        this.setChessmanDefault = this.setChessmanDefault.bind(this);
    }

    componentDidMount() {
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
                    dataChessmans: dataChessmansTemp,
                    loadingData: true
                })
            } else {
                this.setState({
                    loadingData: true
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
            loadingData
        } = this.state;
        const {
            classes,
        } = this.props;

        return (
            <div className={classes.listChessmanWrapper}>
                {
                    loadingData
                        ?
                        Array.isArray(dataChessmans) && dataChessmans.length
                            ?
                            <div className={classes.chessmanList}>
                                {
                                    dataChessmans.map((item, index) => {
                                        return (
                                            <div className={classes.chessmanItem}>
                                                <div className="dataWrapper">
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
                                <span className="text">{i18n.t('chessman.list_chessman.text_not_bg')}</span>
                                <Button
                                    onClick={() => {
                                        this.props.goToUploadChessman()
                                    }}
                                    className="btnGoToUpload"
                                >
                                    {i18n.t('chessman.list_chessman.goUploadChessman')}
                                </Button>
                            </div>
                        :
                        <div className={classes.loadingWrapper}>
                            <CircularProgress color="#123152"/>
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
    withTranslation(),
    withRouter,
) (listChessmans);
