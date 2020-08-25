import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import Input from "@material-ui/core/Input";


const styles = theme => ({

});
class CreatePrivateBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        const {
            stickerKeyword,
            searchSuggestions,
            dataStickers
        } = this.state;
        const {
            classes,

            dataChatBoard,
        } = this.props;
        return (
            <div className={classes.listStickerWrapper}>

            </div>
        );
    }
}

CreatePrivateBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    dataUserAuth: state.authReducer.dataUserAuth,
    dataChatBoard: state.gameReducer.dataChatBoard,
    dataUser: state.gameReducer.dataUser
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    // withTranslation()
) (CreatePrivateBoard);
