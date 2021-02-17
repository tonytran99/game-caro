import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router";
import firebase from "./../../firebase";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckedIcon from "../../theme/CheckBox/CheckedIcon";
import CheckedBg from "../../theme/CheckBox/CheckedBg";
import {ReactComponent as CheckIcon} from "../../images/check_icon.svg";
import * as gameActions from "../../_actions/game";
import i18n from "../../i18n";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    listBackgroundWrapper: {
        height: '100%',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: 9,
        },
        '&::-webkit-scrollbar-track': {
            // background: '#ee6f57',
            borderRadius: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 9,
            background: '#ee6f57',
        },
    },
    backgroundList: {

    },
    backgroundItem: {
        display: 'flex',
        alignItems: 'center',
        height: 240,
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

class ListBackgrounds extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataBackgrounds: null,
            loadingData: false,
        };
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);

    }

    componentDidMount() {
        const {
            dataUserAuth,
            dataUser
        } = this.props;
        firebase.database().ref('backgrounds/' + dataUserAuth.uid).on('value', (snap) => {
            if (snap.val()) {
                let dataBackgroundsTemp = [];
                Object.keys(snap.val()).map((key, index)=>{
                    dataBackgroundsTemp.push(snap.val()[key]);
                });
                this.setState({
                    dataBackgrounds: dataBackgroundsTemp,
                    loadingData: true
                })
            } else {
                this.setState({
                    loadingData: true
                })
            }
        });

    }



    handleBackgroundChange(dataBackground) {
        const {
            dataUser
        } = this.props;
        let dataUserTemp = dataUser;
        dataUserTemp.background = dataBackground;
        this.props.saveDataUser(dataUserTemp.userId, dataUserTemp);
        this.props.showDataUser(dataUser && dataUser.userId);
    }


    render() {
        const {
            dataBackgrounds,
            loadingData
        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataUser,
        } = this.props;

        return (
            <div className={classes.listBackgroundWrapper}>
                {
                    loadingData
                    ?
                        Array.isArray(dataBackgrounds) && dataBackgrounds.length
                    ?
                        <div className={classes.backgroundList}>
                            {
                                dataBackgrounds.map((item, index) => {
                                    return (
                                        <div className={classes.backgroundItem}>
                                            <div className="dataWrapper">
                                                <img src={item.backgroundUrl} alt=""/>
                                            </div>
                                            <div className="checkWrapper">
                                                {
                                                    dataUser && dataUser.background && dataUser.background.backgroundId === item.backgroundId
                                                    ?
                                                        <Button
                                                            className="checkBackground"
                                                            onClick={() => this.handleBackgroundChange(null)}
                                                        >
                                                            <CheckIcon
                                                                width={36}
                                                                height={36}
                                                            />
                                                        </Button>
                                                        :
                                                        <Button
                                                            className="checkBackground"
                                                            onClick={() => this.handleBackgroundChange(item)}
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
                            <span className="text">{i18n.t('background.list_background.text_not_bg')}</span>
                            <Button
                                onClick={() => {
                                    this.props.goToUploadBackground()
                                }}
                                className="btnGoToUpload"
                            >
                                {i18n.t('background.list_background.goUploadBG')}
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

ListBackgrounds.propTypes = {
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
) (ListBackgrounds);
