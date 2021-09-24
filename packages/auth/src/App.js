
import React from "react"
import { Switch, Route, Router, Redirect } from "react-router-dom"
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles"
import { ThemeProvider } from '@material-ui/core/styles';
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./_redux/store";
import messages from "../src/_core/i18n/es.json"
import axios from "axios";
import Login from "./components/Login"
import Registration from "./components/Registration"
import ForgotPassword from "./components/ForgotPassword"

import { setupAxios } from "./_redux/setupAxios";

const generateClassName = createGenerateClassName({
    productionPrefix: "auth"
})


setupAxios(axios, store);

export default ({ history, onSignIn, theme }) => {

    return <div>
        <ThemeProvider theme={theme}>

            <Provider store={store}>

                <PersistGate persistor={persistor} loading={null}>

                    <StylesProvider generateClassName={generateClassName}>

                        <IntlProvider locale={"es"} messages={messages}>

                            <Router history={history}>

                                <Switch>
                                    <Route path="/auth/login">
                                        <Login onSignIn={onSignIn} />
                                    </Route>
                                    <Route path="/auth/registration">
                                        <Registration onSignIn={onSignIn} />
                                    </Route>
                                    <Route path="/auth/forgot-password">
                                        <ForgotPassword />
                                    </Route>

                                    {<Redirect from="/" to="/auth/login" />}
                                </Switch>

                            </Router>

                        </IntlProvider>

                    </StylesProvider>

                </PersistGate>

            </Provider>

        </ThemeProvider>
    </div>
}