import React from "react";
import {Snackbar, withStyles} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {withTranslation} from "react-i18next";

const styles = {
    messageError: {
        '& .MuiAlert-filledError': {
            color: '#fff !important',
            fontWeight: 500,
            backgroundColor: '#e7434f !important',
            fontSize: 18,
            padding: '20px 40px 20px 40px',
        }
    }
};

class ErrorAlert extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            props: {
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'center',
                },
                autoHideDuration:1000
            },
            alertProps: {
                severity:"error",
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
            style={{
                height: 300,
            }}
            className={classes.messageError}
            autoHideDuration={3000}
        >
            <Alert {...alertProps}>
               {this.props.message?this.props.message:this.props.t("form.error.occurred")}
            </Alert>
        </Snackbar>;
    }
}

export default withStyles(styles)(withTranslation()(ErrorAlert));
