import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router";
import firebase from "./../../firebase";
import Button from "@material-ui/core/Button";

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
        '& img': {
            width: '100%',
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
    }

    componentDidMount() {
        const {
            dataUser
        } = this.props;
        const recentPostsRef = firebase.database().ref('backgrounds/' + dataUser.uid).on('value', (snap) => {
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
        })
    }


    render() {
        const {
            dataBackgrounds
        } = this.state;
        const {
            classes,
            dataUser
        } = this.props;
        console.log(dataBackgrounds);

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
                                            <img src={item.backgroundUrl} alt=""/>
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
    dataUser: state.authReducer.dataUser
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation(),
    withRouter,
) (ManagementBackground);
