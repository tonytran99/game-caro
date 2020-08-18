import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import * as authActions from "../_actions/auth";
import {signOut} from "../_actions/auth";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    headerWrapper: {

    }
});
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // isSignedIn: true
        };

        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {

    }

    signOut() {
        console.log('BBBBBBBBBBBBBB')
        this.props.signOut();
    }

    render() {
        // const {
        //
        // } = this.state;
        const {
            classes,
            dataUser
        } = this.props;
        console.log(dataUser);

        return (
            <div className={classes.headerWrapper}>
                {
                    dataUser
                    ?
                        <div>
                            <span>Hellso</span>
                            <Button
                                onClick={() => this.signOut()}
                            >
                                Sign Osut
                            </Button>
                        </div>
                        :
                       <span>
                           'dsd'ds
                       </span>
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
