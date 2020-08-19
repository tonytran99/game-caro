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
            border: '1px solid black',
            padding: '0.25rem 0.5rem',
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

class ManagementBackground extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataBackgrounds: [],
        };
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);

    }

    componentDidMount() {
        const {
            dataUserAuth,
            dataUser
        } = this.props;
        firebase.database().ref('backgrounds/' + dataUserAuth.uid).on('value', (snap) => {
            console.log(snap.val());
            if (snap.val()) {
                let dataBackgroundsTemp = [];
                Object.keys(snap.val()).map((key, index)=>{
                    dataBackgroundsTemp.push(snap.val()[key]);
                });
                this.setState({
                    dataBackgrounds: dataBackgroundsTemp
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
        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataUser
        } = this.props;
        console.log(dataUser);

        return (
            <div className={classes.managementBGWrapper}>
                {
                    Array.isArray(dataBackgrounds) && dataBackgrounds.length
                    ?
                        <div className={classes.backgroundList}>
                            {
                                dataBackgrounds.map((item, index) => {
                                    return (
                                        <div className={classes.backgroundItem}>
                                            <div className="imgWrapper">
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
                                                {/*<Checkbox*/}
                                                {/*    checkedIcon={<CheckedIcon widthImage="20px" width="30px" height="30px"*/}
                                                {/*                              borderRadius="4px"/>}*/}
                                                {/*    icon={<CheckedBg background="#ffffff" width="30px" height="30px"*/}
                                                {/*                     borderRadius="4px"/>}*/}
                                                {/*    checked={dataUser && dataUser.background.backgroundId === item.backgroundId}*/}
                                                {/*    onChange={(event) => this.handleBackgroundChange(event, item)}*/}
                                                {/*/>*/}
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
                                    this.props.goToUploadBackground()
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

ManagementBackground.propTypes = {
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
) (ManagementBackground);
