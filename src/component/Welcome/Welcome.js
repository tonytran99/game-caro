import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Footer from "../Footer";
import Header from "../Header";
import AuthBlock from "../Auth/Auth";
import Content from "../Content";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import * as links from "./../../constants/links";

const styles = theme => ({
    welcomeWrapper: {

    },
    goToTrainingWithAI: {

    },
    goToTrainingWithYourself: {

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
            dataUserAuth
        } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Content>

                    <div className={classes.welcomeWrapper}>
                        <NavLink
                            to={links.LINK_TRAINING_WITH_AI}
                        >
                            <Button
                                className={classes.goToTrainingWithAI}
                            >
                                go to training with ai
                            </Button>
                        </NavLink>
                        <NavLink
                            to={links.LINK_TRAINING_WITH_YOURSELF}
                        >
                            <Button
                                className={classes.goToTrainingWithYourself}
                            >
                                go to training with yourself
                            </Button>
                        </NavLink>
                    </div>
                </Content>
                {/*{!dataUser ? <AuthBlock /> : <span>sdds sd</span>}*/}
                <Footer />
            </React.Fragment>
        );
    }
}

Welcome.propTypes = {
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
) (Welcome);
