import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {initBoard} from "../../functions/functions";

const styles = theme => ({
    welcomeWrapper: {

    }
});
class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            board: initBoard(props.size),
        };

        // this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {

    }

    render() {
        const {
            board
        } = this.state;
        const {
            classes,
            dataUserAuth,
            size,
            // board
        } = this.props;
        console.log(board);
        return (
            <GridList
                // className={useStyles(size)({}).gridList}
                cellHeight={30}
                cols={size}
                spacing={0}
                style={{
                    width: 30*size,
                    height: 30*size,
                }}
            >
                {
                    board.map((row, x) =>
                        row.map((cell, y) => {
                            return (
                                <GridListTile
                                    key={`row-${x}-cell-${y}`}
                                    style={{
                                        padding: '2px'
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'red',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        onClick={() => {
                                            if (y === null) {
                                                // this.props.setPlayer()
                                            }
                                        }}
                                    >
                                    </div>
                                </GridListTile>
                            );
                        })
                    )
                }
            </GridList>
        );
    }
}

Board.propTypes = {
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
) (Board);
