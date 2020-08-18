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
import AuthBlock from "./Auth/AuthBlock";
const styles = theme => ({
    headerWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0.5rem 2rem',
        '& .logo': {
            height: 80,
            width: 80,
        }
    }
});
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openDialogAuth: false
        };

        this.handleDialogAuthOpen = this.handleDialogAuthOpen.bind(this);
        this.handleDialogAuthClose = this.handleDialogAuthClose.bind(this);
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

    render() {
        const {
            openDialogAuth
        } = this.state;
        const {
            classes,
            dataUser
        } = this.props;
        console.log(dataUser);

        return (
            <div className={classes.headerWrapper}>
                <img className="logo" src={LogoIcon} alt=""/>
                {
                    dataUser
                    ?
                        <React.Fragment>
                            <Button
                                onClick={() => this.signOut()}
                            >
                                Sign Osut
                            </Button>
                            <img src={dataUser && dataUser.photoURL ? dataUser.photoURL : UserIcon} alt=""/>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button
                                onClick={() => this.handleDialogAuthOpen()}
                            >
                                Login | Registration
                            </Button>
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
                        </React.Fragment>

                }
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUser: state.authReducer.dataUser
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
