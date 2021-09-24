import React, { lazy, useEffect } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { shallowEqual, useSelector } from "react-redux";

const MarketingLazy = lazy(() => import("../components/MarketingApp"))
const AuthLazy = lazy(() => import("../components/AuthApp"))
const DashboardLazy = lazy(() => import("../components/Dashboard"))

export const Routes = ({ history, theme }) => {

    const { isAuthorized } = useSelector(
        ({ container }) => ({
            isAuthorized: container.isAuthorized,
        }),
        shallowEqual
    );

    // useEffect(() => {
    //     if (isAuthorized) {
    //         history.push("/dashboard")
    //     }
    // }, [isAuthorized])



    return (
        <Switch>

            {!isAuthorized ? (
                /*Redirect to `/auth` when user is not authorized*/
                <Route>
                    <AuthLazy />
                </Route>
            ) : (
                <Redirect from="/auth" to="/" />
            )}

            {!isAuthorized ? (
                /*Redirect to `/auth` when user is not authorized*/
                <Redirect to="/auth" />
            ) : (
                <>

                    <Switch>
                        <Route path="/dashboard">
                            <DashboardLazy />
                        </Route>

                        {<Redirect exact from="/" to={"/dashboard"} />}
                        <Redirect to="/error/404" />
                        {/* <Route path="/">
                            <MarketingLazy />
                        </Route> */}
                    </Switch>

                </>
            )}

        </Switch>
    )
}