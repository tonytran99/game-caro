 import React from 'react';
import {withStyles} from "@material-ui/core";
import {withTranslation} from "react-i18next";
import PropTypes from 'prop-types';
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import {compose} from "redux";
const styles = {
    appInput:{
        '& input': {
            background: '#ffffff',
            width: '100%',
            border: 'none',
            borderRadius: 9,
            color: '#123152',
            display: 'flex',
            fontSize: '1rem',
            fontWeight: 600,
            fontFamily: "'Open Sans', sans-serif",
            padding: '8px 10px'
        },
        '& .MuiInput-underline:before': {
            content: 'none!important'
        },
        '& .MuiInput-underline:after': {
            content: 'none!important'
        },
        '& .MuiInputBase-root': {
            paddingRight: 0
        },
        '& .MuiTypography-body1': {
            lineHeight: 1
        }
    }
};

class AppInput extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, className, ...otherProps} = this.props;
        let self = this;


        return <FormControl
            className={classes.appInput + ' appInput ' + (className ? className : '')}
        >
            <Input
                {...otherProps}
            />
        </FormControl>;
    }
}

AppInput.propsType = {
    classes: PropTypes.object.isRequired
};

export default compose(
    // connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withTranslation()
) (AppInput);
