import React from "react";
import i18n from "./i18n";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {LANGUAGE_EN, LANGUAGE_VI, MD, SM} from "./constants/constants";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";

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
        i18n.changeLanguage(language);
        if (language) {
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
        return (
            <div className={classes.changeLanguageWrapper}>
                <Select
                    value={this.state.language}
                    onChange={(event) => this.changeLanguage(event.target.value)}
                >
                    {data.map((lang => <MenuItem value={lang} className={classes.itemSelectLanguage}>
                        <span className="itemMenu">{i18n.t('translations:translations.' + lang, {"lang": lang})}</span>
                    </MenuItem>))}
                </Select>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
) (ChangeLanguage);