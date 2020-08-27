import React from "react";
import {Snackbar, withStyles} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {withTranslation} from "react-i18next";

const styles = {
    messageSuccess:{
        '& .MuiAlert-filledError': {
            color: '#fff !important',
        }
    }
};

class SuccessAlert extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            props: {
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'center',
                },
                autoHideDuration:3000
            },
            alertProps: {
                severity:"success",
                elevation:6,
                variant:"filled"
            }
        };
    }

    render() {
        const {classes} = this.props;
        const props = Object.assign(this.state.props,this.props.snackbarProps?this.props.snackbarProps:{});
        const alertProps = Object.assign(this.state.alertProps,this.props.alertProps?this.props.alertProps:{});
        return <Snackbar
            {...props}
            className={classes.messageSuccess}
        >
            <Alert {...alertProps}>
                {this.props.message?this.props.message:this.props.t("form.success.save_ok")}
            </Alert>
        </Snackbar>;
    }
}

export default withStyles(styles)(withTranslation()(SuccessAlert));
