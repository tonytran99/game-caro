import React from "react";
import { withTranslation } from "react-i18next";
import i18n from "./i18n";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Cookies from 'js-cookie';
import moment from "moment";

class ChangeLanguage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            language: i18n.language
        };
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage = (language) => {
        i18n.changeLanguage(language);
        Cookies.set('_locale',language, { expires: 30, path: "/" });
        moment.locale(language);
        this.setState({
            language: language
        })
    };

    render() {
        return (
            <div>
                {typeof SUPPORTED_LOCALES === "object" && SUPPORTED_LOCALES.length > 1 && <Select
                    name="selectedYear"
                    value={this.state.language}
                    // displayEmpty
                    // className={classes.selectButton}
                    onChange={(event) => this.changeLanguage(event.target.value)}
                >
                    {SUPPORTED_LOCALES.map((lang => <MenuItem value={lang}>
                        {i18n.t('translations:translations.' + lang, {"lng": lang})}
                    </MenuItem>))}
                </Select>
                }
            </div>
        );
    }
}

// extended main view with translate hoc
export default ChangeLanguage;