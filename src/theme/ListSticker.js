import React from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import axios from 'axios';

import Input from "@material-ui/core/Input";
import AppInput from "./AppInput";
import Button from "@material-ui/core/Button";
import i18n from "../i18n";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
    listStickerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    searchSuggestions: {
        borderTop: '3px solid #123152'
    },
    btnSuggestion: {
        backgroundColor: '#123152',
        textTransform: 'initial',
        padding: '0.5rem 1.5rem',
        fontWeight: 600,
        borderRadius: 9,
        margin: '0.4rem 0.2rem',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#123152',
        }
    },
    showSticker: {
        padding: '0.5rem',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            width: 9,
            height: 9,
        },
        '&::-webkit-scrollbar-track': {
            // background: '#ee6f57',
            // borderRadius: 9,
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: 9,
            background: '#ee6f57',
        },
    },
    itemImageWrapper: {
        '& img': {
            width: '100%',
            cursor: 'pointer',
        }
    },
    stickerKeyword: {
        width: '100%',
        paddingBottom: '0.5rem',
        '& input': {
            backgroundColor: '#f1f3de',
            border: '3px solid #557571',
        }
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

    componentDidMount() {
        this.searchBySearchSuggestion('');
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
                    dataStickers: dataStickersTemp,
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
                <AppInput
                    className={classes.stickerKeyword}
                    name="stickerKeyword"
                    value={stickerKeyword}
                    type="text"
                    placeholder={i18n.t('chat.listSticker.searchSticker')}
                    onChange={(event) => this.handleChange('stickerKeyword', event.target.value)}
                />
                <div className={classes.searchSuggestions}>
                    {
                        searchSuggestions.map((item, index) => {
                            return (
                                <Button
                                    className={classes.btnSuggestion}
                                    onClick={() => this.searchBySearchSuggestion(item)}
                                >
                                    {item}
                                </Button>
                            )
                        })
                    }
                </div>
                <div className={classes.showSticker}>
                    <Grid container>
                    {
                        dataStickers.map((item, index) => {
                            return (
                                <Grid item xs={6} className={classes.itemImageWrapper}>
                                    <img src={item} alt="" onClick={() => {
                                        this.props.getSticker(item);
                                    }}/>
                                </Grid>
                            );
                        })
                    }
                    </Grid>
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
