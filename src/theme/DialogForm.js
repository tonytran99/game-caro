import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {withTranslation} from "react-i18next";
import {
    withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";

const styles = {
    dialogForm: {
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(189,189,217,0.71)'
        },
        '& .MuiDialog-paper': {
            minWidth: 600,
            background: '#fff',
            borderRadius: 22,
            margin: 0,
            padding: '2.5rem 3rem',
            alignItems: 'center',
            '& .MuiDialogContent-root': {
                paddingTop: 0,
                paddingBottom: '2rem',
                '& .MuiDialogContentText-root': {
                    color: '#46435a',
                    fontWeight: 600,
                    fontSize: '1.8rem',
                    textAlign: 'center'
                }
            },
            '& .MuiDialogActions-root': {
                '& .MuiButtonBase-root': {
                    background: 'transparent',
                    boxShadow: 'none',
                    border: '3px solid #46435a',
                    borderRadius: 19,
                    color: '#46435a',
                    fontSize: '1.7rem',
                    textTransform: 'lowercase',
                    fontWeight: 700,
                    minWidth: 250,
                    '&$agreeButton': {
                        background: '#46435a',
                        color: '#08f1a9'
                    },
                    '&:hover': {
                        background: '#2d2b3a!important',
                        color: '#08f1a9!important',
                        borderColor: '#2d2b3a'
                    }
                }
            }
        }
    },
    closeDialogIcon: {
        position: 'absolute',
        top: 7,
        right: 16,
        color: '#46435a',
        fontWeight: 700,
        fontSize: '2rem',
        cursor: 'pointer'
    },
    agreeButton: {

    },
    otherText: {
        fontSize: '1rem',
        marginTop: 2
    }
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DialogBody = (props) => {
    const {children} = props;
    return (
        <div
            className="MuiDialog-paper MuiDialog-paperScrollPaper Dialog-bodyWrapper"
        >
            {children}
        </div>
    )
};

class DialogForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props: {
                disableBackdropClick: true,
                disableEscapeKeyDown: true,
                TransitionComponent: Transition,
                keepMounted: true
            }
        }
    }

    render() {
        let {
            classes, dialogProps, closeDialog, hiddenAgreeButton, otherTextProps, messageProps, disagreeButtonProps, agreeButtonProps, componentRender
        } = this.props;
        const {props} = this.state;
        const propsWrapper = Object.assign(props, dialogProps ? dialogProps : {});
        return (
            <Dialog
                className={classes.dialogForm}
                PaperComponent={DialogBody}
                {...propsWrapper}
            >
                <div
                    className={classes.closeDialogIcon}
                    onClick={closeDialog ? closeDialog : disagreeButtonProps.handleDisagree}
                >
                    X
                </div>
                <DialogContent>
                    <DialogContentText>
                        <div style={{color: messageProps && messageProps.color ? messageProps.color : '#46435a'}}>
                            {messageProps && messageProps.content ? messageProps.content : this.props.t('dialog.message')}
                        </div>
                        {otherTextProps && typeof otherTextProps === "object" && Object.keys(otherTextProps).length !== 0 && otherTextProps.content !== "" &&
                            <div className={classes.otherText}
                                 style={{color: otherTextProps.color ? otherTextProps.color : '#54516a'}}>
                                {otherTextProps.content}
                            </div>
                        }
                        {
                            componentRender ? componentRender : ''
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={disagreeButtonProps.handleDisagree}
                        variant="contained"
                        style={{background: disagreeButtonProps && disagreeButtonProps.background ? disagreeButtonProps.background : 'transparent', color: disagreeButtonProps && disagreeButtonProps.color ? disagreeButtonProps.color : '#46435a'}}
                    >
                        {disagreeButtonProps && disagreeButtonProps.content ? disagreeButtonProps.content : this.props.t('dialog.cancel')}
                    </Button>
                    {hiddenAgreeButton ?
                        "" :
                        <Button
                            onClick={agreeButtonProps.handleAgree}
                            variant="contained"
                            autoFocus
                            className={classes.agreeButton}
                            style={{background: agreeButtonProps && agreeButtonProps.background ? agreeButtonProps.background : '#46435a', color: agreeButtonProps && agreeButtonProps.color ? agreeButtonProps.color : '#08f1a9'}}
                        >
                            {agreeButtonProps && agreeButtonProps.content ? agreeButtonProps.content : this.props.t('dialog.ok')}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        );
    }

}

DialogForm.propTypes = {
    classes: PropTypes.object.isRequired,
    otherTextProps: PropTypes.object.isRequired,
    messageProps: PropTypes.object.isRequired,
    disagreeButtonProps: PropTypes.object.isRequired,
    agreeButtonProps: PropTypes.object.isRequired
};

export default withStyles(styles)(withTranslation()(DialogForm));