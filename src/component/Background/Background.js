import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import UploadBackground from "./UploadBackground";
import Header from "../Header";
import Footer from "../Footer";
import Content from "../Content";
import Button from "@material-ui/core/Button";
import {withRouter} from "react-router";
import * as links from "./../../constants/links";
import {paramsToObject} from "../../functions/functions";
import ManagementBackground from "./ListBackgrounds";
import i18n from "../../i18n";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    backgroundWrapper: {
        width: '90%',
        margin: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    headerBackground: {
        paddingTop: '1rem',
        borderBottom: '2px dashed #f1f3de',
        marginBottom: '1rem',
        '& .menuItem': {
            textTransform: 'initial',
            borderRadius: '11px 11px 0px 0px',
            fontWeight: 600,
            color: '#f1f3de',
            padding: '0.5rem 1rem',
            '&.active': {
                border: '2px solid #f1f3de',
                backgroundColor: '#f1f3de',
                color: '#123152',
            }
        }
    },
    contentBackground: {
        flexGrow: 1,
        backgroundColor: '#e0ece4',
        padding: '1rem 0.5rem',
        borderRadius: 9,
        boxShadow: '0 5px 5px 0 #e0ece4',
        overflow: 'hidden'
    }
});

const LIST_BACKGROUNDS_TYPE = 'list-background';
const UPLOAD_BACKGROUND_TYPE = 'upload-background';
const ALL_TAB = [
    LIST_BACKGROUNDS_TYPE,
    UPLOAD_BACKGROUND_TYPE
];

class Background extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueOptionBackground: LIST_BACKGROUNDS_TYPE
        };
        this.changeManagementBGType = this.changeManagementBGType.bind(this);
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search.substr(1));
        const entries = urlParams.entries();
        const params = paramsToObject(entries);
        if (params.hasOwnProperty('backgroundType')) {
            const backgroundType = params.backgroundType;
            if (ALL_TAB.includes(backgroundType)) {
                this.setState({
                    valueOptionBackground: backgroundType,
                });
            } else {
                this.setState({
                    valueOptionBackground: LIST_BACKGROUNDS_TYPE,
                });
                this.props.history.push(links.LINK_BACKGROUND + '?'+'backgroundType='+LIST_BACKGROUNDS_TYPE);
            }
        } else {
            this.setState({
                valueOptionCompany: LIST_BACKGROUNDS_TYPE,
            });
            this.props.history.push(links.LINK_BACKGROUND + '?'+'backgroundType='+LIST_BACKGROUNDS_TYPE);
        }
    }

    changeManagementBGType(valueOptionBackground) {
        this.setState({
            valueOptionBackground: valueOptionBackground,
        });
        this.props.history.push(links.LINK_BACKGROUND + '?'+'backgroundType='+valueOptionBackground);
    }


    render() {
        const {
            valueOptionBackground
        } = this.state;
        const {
            classes,
            dataUserAuth
        } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.backgroundWrapper}>
                        <div className={classes.headerBackground}>
                            <Button
                                onClick={() => this.changeManagementBGType(LIST_BACKGROUNDS_TYPE)}
                                className={"menuItem" + (valueOptionBackground === LIST_BACKGROUNDS_TYPE ? ' active' : '')}
                            >
                                {i18n.t('background.menu.list_background')}
                            </Button>
                            <Button
                                onClick={() => this.changeManagementBGType(UPLOAD_BACKGROUND_TYPE)}
                                className={"menuItem" + (valueOptionBackground === UPLOAD_BACKGROUND_TYPE ? ' active' : '')}
                            >
                                {i18n.t('background.menu.upload_background')}
                            </Button>
                        </div>
                        <div className={classes.contentBackground}>
                            {
                                valueOptionBackground === LIST_BACKGROUNDS_TYPE
                                ?
                                    <ManagementBackground goToUploadBackground={() => this.changeManagementBGType(UPLOAD_BACKGROUND_TYPE)}/>
                                    :
                                    <UploadBackground />
                            }
                        </div>

                    </div>
                </Content>
               <Footer />
            </React.Fragment>
        );
    }
}

Background.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
    withRouter,
) (Background);
