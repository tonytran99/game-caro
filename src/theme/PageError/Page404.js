import React from "react";
import i18n from "../../i18n";
import PageError from "./PageError";

class Page404 extends React.Component {
    render() {
        return <PageError code={404} goToHome={true} title={i18n.t("error.404.title")}/>;
    }
}

export default Page404;