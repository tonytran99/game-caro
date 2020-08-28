import React from "react";
import i18n from "./i18n";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {LANGUAGE_EN, LANGUAGE_VI, MD, SM} from "./constants/constants";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import {withTranslation} from "react-i18next";

const styles = theme => ({
    changeLanguageWrapper: {
        '& .itemMenu': {
            color: '#ffdead',
            fontWeight: 600,
        },
        '& svg': {
            '& path': {
                fill: '#ffdead',
                stroke: '#ffdead',
            }
        }
    },
    itemSelectLanguage: {
        '& .itemMenu': {
            color: '#123152',
            fontWeight: 700,
        }
    }
});

class ChangeLanguage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            language: i18n.language
        };
        this.changeLanguage = this.changeLanguage.bind(this);
    }

    changeLanguage = (language) => {
        // Cookies.set('_locale',language, { expires: 30, path: "/" });
        if (language) {
            i18n.changeLanguage(language);
            localStorage.setItem("language_translate", JSON.stringify(language));
        } else {
            localStorage.removeItem("language_translate");
        }
        this.setState({
            language: language
        })
    };

    render() {
        const {
            classes
        } = this.props;
        const data = [
            LANGUAGE_EN,
            LANGUAGE_VI
        ];
        console.log(this.state.language);
        console.log(i18n.language)
        return (
            <div className={classes.changeLanguageWrapper}>
                <Select
                    value={this.state.language}
                    onChange={(event) => this.changeLanguage(event.target.value)}
                >
                    {data.map((lang => <MenuItem value={lang} className={classes.itemSelectLanguage}>
                        <span className="itemMenu">{this.props.t('translations:translations.' + lang, {"lang": lang})}</span>
                    </MenuItem>))}
                </Select>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    withTranslation()
) (ChangeLanguage);