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
import Popover from "@material-ui/core/Popover";
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
            '& path': {
                fill: '#fff!important',
                stroke: '#fff!important',
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
        '& .menuItemBackground': {
            '& button': {
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
        console.log('BBBBBBBBBBBBBB')
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
        console.log(dataUserAuth);

        return (
            <div className={classes.headerWrapper}>
                <NavLink to={links.LINK_WELCOME}>
                <img className="logo" src={LogoIcon} alt=""/>
                </NavLink>
                {
                    dataUserAuth
                    ?
                        <div className="leftHeader">
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
                            <NavLink to={links.LINK_USER_INFO}>
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
                                        to={links.LINK_MANAGEMENT_BACKGROUND}
                                        className={"menuItemBackground"}
                                    >
                                        <Button>
                                            <BackgroundIcon width={36} height={36} />
                                            <span className="text">background management</span>
                                        </Button>
                                    </NavLink>
                                </div>
                            </Popover>}
                        </div>
                        :
                        <div className="leftHeader">
                            <NavLink to={links.LINK_AUTH}>
                                <Button
                                    className="btnLogin"
                                >
                                    <LoginIcon width={36} height={36} />
                                </Button>
                            </NavLink>
                            <Dialog onClose={this.handleDialogAuthClose} aria-labelledby="simple-dialog-title" open={openDialogAuth}>
                                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                                <DialogContent>
                                    <DialogContentText
                                        id="scroll-dialog-description"
                                        // ref={descriptionElementRef}
                                        tabIndex={-1}
                                    >
                                        <AuthBlock />
                                    </DialogContentText>
                                </DialogContent>
                            </Dialog>
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
    // withTranslation()
) (Header);
