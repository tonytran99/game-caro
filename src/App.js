import React from 'react';
import './App.css';
// import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {withStyles} from "@material-ui/core/styles";
// import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {compose} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"
import {I18nextProvider} from "react-i18next";
import rootReducer from "./_reducers";
// import i18n from './i18n';
import {createStore} from 'redux';
import Layout from "./layout";
import './css/app.scss';

const styles = theme => ({
  legalResponsibleBlock: {
    backgroundColor: '#e0e7f2'
  }
});

const store = createStore(
    rootReducer,
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
          <Router>
            <I18nextProvider
                // i18n={ i18n }
            >
              <Layout />
            </I18nextProvider>
          </Router>
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
