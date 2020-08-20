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
        flexGrow: 1,
        overflowY: 'scroll',
    }
});

const MANAGEMENT_BACKGROUND_TYPE = 'management-background';
const UPLOAD_BACKGROUND_TYPE = 'upload-background';
const ALL_TAB = [
    MANAGEMENT_BACKGROUND_TYPE,
    UPLOAD_BACKGROUND_TYPE
];

class Background extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueOptionBackground: MANAGEMENT_BACKGROUND_TYPE
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
                    valueOptionBackground: MANAGEMENT_BACKGROUND_TYPE,
                });
                this.props.history.push(links.LINK_BACKGROUND + '?'+'backgroundType='+MANAGEMENT_BACKGROUND_TYPE);
            }
        } else {
            this.setState({
                valueOptionCompany: MANAGEMENT_BACKGROUND_TYPE,
            });
            this.props.history.push(links.LINK_BACKGROUND + '?'+'backgroundType='+MANAGEMENT_BACKGROUND_TYPE);
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
        console.log(valueOptionBackground);

        return (
            <React.Fragment>
                <Header />
                <Content>
                    <div className={classes.backgroundWrapper}>
                        <div className={classes.headerBackground}>
                            <Button
                                onClick={() => this.changeManagementBGType(MANAGEMENT_BACKGROUND_TYPE)}
                                className={"menuItem" + (valueOptionBackground === MANAGEMENT_BACKGROUND_TYPE ? ' active' : '')}
                            >
                                background management
                            </Button>
                            <Button
                                onClick={() => this.changeManagementBGType(UPLOAD_BACKGROUND_TYPE)}
                                className={"menuItem" + (valueOptionBackground === UPLOAD_BACKGROUND_TYPE ? ' active' : '')}
                            >
                                upload background
                            </Button>
                        </div>
                        <div className={classes.contentBackground}>
                            {
                                valueOptionBackground === MANAGEMENT_BACKGROUND_TYPE
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
    // withTranslation(),
    withRouter,
) (Background);
