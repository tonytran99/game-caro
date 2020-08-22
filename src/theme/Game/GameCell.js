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
    welcomeWrapper: {

    }
});
class GameCell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

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
                        <div>

                        </div>
                    </div>
                </Content>
                <Footer />
            </React.Fragment>
        );
    }
}

GameCell.propTypes = {
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
) (GameCell);
