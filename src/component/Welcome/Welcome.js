import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import AuthBlock from "../Auth/AuthBlock";

const styles = theme => ({
    welcomeWrapper: {

    }
});
class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: true
        };

        // this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {

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
            <div className={classes.welcomeWrapper}>
                <Header />
                {!dataUser ? <AuthBlock /> : <span>sdds sd</span>}
                <Footer />
            </div>
        );
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUser: state.authReducer.dataUser
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (Welcome);
