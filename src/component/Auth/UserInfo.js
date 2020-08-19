import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import AuthBlock from "../Auth/Auth";
import Content from "../Content";

const styles = theme => ({
    userInfoWrapper: {

    }
});
class UserInfo extends React.Component {

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
            dataUserAuth
        } = this.props;
        console.log(dataUserAuth);

        return (
            <div className={classes.userInfoWrapper}>
                <Header />
                <Content>
                    <div>
                        user info
                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </div>
        );
    }
}

UserInfo.propTypes = {
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
    // withTranslation()
) (UserInfo);
