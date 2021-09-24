
import React, { lazy, Suspense, useEffect, useState } from "react"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles"
import { createBrowserHistory } from "history"
import Header from "./components/Header"
import { Routes } from "./routes"
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./_redux/store";
import { theme } from "./_core/styles/themeProvider"
import MainLayout from "./_core/layout/Layout"


const generateClassName = createGenerateClassName({
    productionPrefix: "co"
})

const history = createBrowserHistory()

export default () => {

    return (
        <ThemeProvider theme={theme}>
            
            <Provider store={store}>

                <PersistGate persistor={persistor} loading={null}>


                    <StylesProvider generateClassName={generateClassName}>

                        <Router history={history}>

                            {/* <Header history={history} /> */}

                            <Suspense fallback={<div>Loading...</div>}>

                                <MainLayout>

                                    <Routes history={history} />

                                </MainLayout>

                            </Suspense>

                        </Router>
                    </StylesProvider>

                </PersistGate>
            </Provider>
        </ThemeProvider>
    )
}