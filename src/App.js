import React from 'react';
import './App.css';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {compose} from "redux";
import { Provider} from "react-redux";
import rootReducer from "./_reducers";
import { createStore, applyMiddleware } from "redux";
import './css/app.scss';
import reduxThunk from "redux-thunk";
import Layout from "./layout";

const styles = theme => ({
  legalResponsibleBlock: {
    backgroundColor: '#e0e7f2'
  }
});

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
        <Provider store={store}>
          <Layout />
        </Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(
    withStyles(styles),
    // withTranslation()
) (App);
