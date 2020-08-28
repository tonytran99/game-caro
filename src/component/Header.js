import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import * as authActions from "../_actions/auth";
import {signOut} from "../_actions/auth";
import Button from "@material-ui/core/Button";
import UserIcon from "./../images/user_icon.svg";
import LogoIcon from "./../images/logo.png"
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import AuthBlock from "./Auth/Auth";
import {NavLink} from "react-router-dom";
import * as links from "./../constants/links";
import { ReactComponent as LogoutIcon } from "./../images/logout_icon.svg";
import { ReactComponent as LoginIcon } from "./../images/login_icon.svg";
import { ReactComponent as MenuIcon } from "./../images/menu_icon.svg";
import { ReactComponent as BackgroundIcon } from "./../images/background_icon.svg";
import { ReactComponent as ChessmanIcon } from "./../images/chessman_icon.svg";

import Popover from "@material-ui/core/Popover";
import {PERMISSION_ADMIN} from "../constants/constants";
import ChangeLanguage from "../ChangeLanguage";
import i18n from "../i18n";
import {withTranslation} from "react-i18next";
const styles = theme => ({
    headerWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0.5rem 2rem',
        '& .logo': {
            height: 72,
            width: 72,
        },
        '& .leftHeader': {
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        '& .avatarUser': {
            width: 48,
            height: 48,
            borderRadius: '50%',
        },
        '& .btnLogout': {
            '& svg': {
                '& path': {
                    fill: '#ffdead!important',
                    stroke: '#ffdead!important',
                }
            }
        },
        '& .btnLogin': {
            '& path': {
                fill: '#fff!important',
                stroke: '#fff!important',
            }
        }
    },
    popoverMenu: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 0.5rem',
        '& .menuItemBackground': {
            '& button': {
                margin: '0.5rem 0rem',
                width: '100%',
                '& svg': {
                    '& path': {
                        // fill: 'black!important',
                        // stroke: 'black!important',
                    }
                },
                '& .text': {
                    fontWeight: 600,
                    padding: '0rem 1rem',
                    textTransform: 'initial'
                }
            },

        }
    }
});
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialogAuth: false,
            openPopoverMenu: null,
        };

        this.handleDialogAuthOpen = this.handleDialogAuthOpen.bind(this);
        this.handleDialogAuthClose = this.handleDialogAuthClose.bind(this);
        this.handlePopoverMenuOpen = this.handlePopoverMenuOpen.bind(this);
        this.handlePopoverMenuClose = this.handlePopoverMenuClose.bind(this);

        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {

    }

    handleDialogAuthOpen() {
        this.setState({
            openDialogAuth: true
        });
    }

    handleDialogAuthClose() {
        this.setState({
            openDialogAuth: false
        });
    }

    signOut() {
        this.props.signOut();
    }

    handlePopoverMenuOpen(event) {
        this.setState({
            openPopoverMenu: event.currentTarget
        })
    }

    handlePopoverMenuClose() {
        this.setState({
            openPopoverMenu: null
        });
    }

    render() {
        const {
            openDialogAuth,
            openPopoverMenu,

        } = this.state;
        const {
            classes,
            dataUserAuth,
            dataUser
        } = this.props;

        return (
            <div className={classes.headerWrapper}>
                <NavLink to={links.LINK_WELCOME}>
                <img className="logo" src={LogoIcon} alt=""/>

                </NavLink>
                {
                    dataUserAuth
                    ?
                        <div className="leftHeader">
                            <ChangeLanguage />
                            <Button
                                onClick={(event) => this.handlePopoverMenuOpen(event)}
                            >
                                <MenuIcon />
                            </Button>
                            <Button
                                onClick={() => this.signOut()}
                                className="btnLogout"
                            >
                                <LogoutIcon width={36} height={36} />
                            </Button>
                            <NavLink to={links.LINK_PROFILE}>
                                <img className="avatarUser" src={dataUser && dataUser.avatarUrl ? dataUser.avatarUrl : UserIcon} alt=""/>
                            </NavLink>
                            {openPopoverMenu && <Popover
                                open={true}
                                anchorEl={openPopoverMenu}
                                onClose={this.handlePopoverMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <div className={classes.popoverMenu}>
                                    <NavLink
                                        to={links.LINK_BACKGROUND}
                                        className={"menuItemBackground"}
                                    >
                                        <Button>
                                            <BackgroundIcon width={36} height={36} />
                                            <span className="text">{i18n.t('header.menu_select.background')}</span>
                                        </Button>
                                    </NavLink>
                                    {
                                        dataUser && dataUser.permission === PERMISSION_ADMIN &&
                                        <NavLink
                                            to={links.LINK_CHESSMAN}
                                            className={"menuItemBackground"}
                                        >
                                            <Button>
                                                <ChessmanIcon width={36} height={36} />
                                                <span className="text">{i18n.t('header.menu_select.chessman')}</span>
                                            </Button>
                                        </NavLink>
                                    }
                                </div>
                            </Popover>}
                        </div>
                        :
                        <div className="leftHeader">
                            <ChangeLanguage />
                            <NavLink to={links.LINK_AUTH}>
                                <Button
                                    className="btnLogin"
                                >
                                    <LoginIcon width={36} height={36} />
                                </Button>
                            </NavLink>
                        </div>
                }
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataUser: state.gameReducer.dataUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(authActions.signOut())
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation(),
) (Header);
