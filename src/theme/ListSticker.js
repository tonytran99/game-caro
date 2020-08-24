import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import axios from 'axios';

import Input from "@material-ui/core/Input";


const styles = theme => ({
    listStickerWrapper: {

    },
    searchSuggestions: {

    },
    showSticker: {

    }
});
const TENOR_API_KEY = '1T64U0GUWGZG';
const API_SEARCH_SUGGESTIONS = 'http://api.tenor.com/v1/search_suggestions' + '?key='  + TENOR_API_KEY;
const API_SEARCH = 'http://api.tenor.com/v1/search' + '?key='  + TENOR_API_KEY;
class ListSticker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stickerKeyword: '',
            searchSuggestions: [],
            dataStickers: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name, value) {
        this.setState({
            [name]: value
        });
        axios.all([
            axios.get(API_SEARCH_SUGGESTIONS + '&q=' + value),
            axios.get(API_SEARCH + '&q=' + value),
        ])
            .then((response, key) => {
                const dataApiSearchSuggestions = response[0].data.results;
                const dataApiSearch = response[1].data.results;
                let dataStickersTemp = [];
                dataApiSearch.map((item, index) => {
                    dataStickersTemp.push(item.media[0].gif.url);
                });
                console.log(dataStickersTemp);
                // dataApiSearch.map
                this.setState({
                    searchSuggestions: dataApiSearchSuggestions,
                    dataStickers: dataStickersTemp
                })
            })
            .catch(error => {

            })
    }

    searchBySearchSuggestion(searchSuggestion) {
        axios.get(API_SEARCH + '&q=' + searchSuggestion)
            .then(response => {
                const dataApiSearch = response.data.results;
                let dataStickersTemp = [];
                dataApiSearch.map((item, index) => {
                    dataStickersTemp.push(item.media[0].gif.url);
                });
                // dataApiSearch.map
                this.setState({
                    dataStickers: dataStickersTemp
                })
            })
            .catch(error => {

            });
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
                <Input
                    name="stickerKeyword"
                    value={stickerKeyword}
                    type="text"
                    onChange={(event) => this.handleChange('stickerKeyword', event.target.value)}
                />
                <div className={classes.searchSuggestions}>
                    {
                        searchSuggestions.map((item, index) => {
                            return (
                                <div
                                    style={{
                                    border: '1px solid black'
                                    }}
                                    onClick={() => this.searchBySearchSuggestion(item)}
                                >
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={classes.showSticker}>
                    {
                        dataStickers.map((item, index) => {
                            return (
                                <div style={{flexBasis: '33.33%'}}>
                                    <img src={item} alt="" onClick={() => {
                                        this.props.getSticker(item);
                                    }}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

ListSticker.propTypes = {
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
) (ListSticker);
