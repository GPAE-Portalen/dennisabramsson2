import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap';

import './styles/index.min.css';
import App from './App';

import EnvironmentVariables from './environmentVariables';

declare global {
    type GUID = string;

    interface Window {
        NEW_GUID(): GUID;
        ENV_PRODUCTION: boolean;
        ENV_DEVELOPMENT: boolean;
        BS_XS: number;
        BS_SM: number;
        BS_MD: number;
        BS_LG: number;
        BS_XL: number;
        BS_XXL: number;
    }
};

(function () {
    window.ENV_PRODUCTION = process.env.REACT_APP_DIST_ENV === EnvironmentVariables.Production;
    window.ENV_DEVELOPMENT = process.env.REACT_APP_DIST_ENV === EnvironmentVariables.Development;
    window.NEW_GUID = () => uuidv4();
    window.BS_XS = 0;
    window.BS_SM = 576;
    window.BS_MD = 768;
    window.BS_LG = 992;
    window.BS_XL = 1200;
    window.BS_XXL = 1400;
})();

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Route component={App} />
        </Router>
    </React.StrictMode>,
    document.getElementById('App')
);

(function () {
    function developmentLogs() {
        console.log(
            "%cprocess.env.REACT_APP_FEATURED_PROJECTS_QUANTITY:",
            "font-family:system-ui;font-size:1rem;font-weight:bold");
        console.log(process.env.REACT_APP_FEATURED_PROJECTS_QUANTITY);
    }

    function productionLogs() {
        console.log(
            "%cDennisAbramsson.se",
            "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 3px black;font-weight:bold");
    }

    if (window.ENV_PRODUCTION) {
        //serviceWorker.register();
        productionLogs();
    }
    else if (window.ENV_DEVELOPMENT) {
        //serviceWorker.unregister();
        developmentLogs();
    }
})();