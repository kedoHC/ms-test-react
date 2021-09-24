import React, { useRef, useEffect } from "react"
import { mount } from "auth/AuthApp"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux";
import { theme } from "../_core/styles/themeProvider"
import * as container from '../_redux/containerRedux'

const AuthApp = ({ login }) => {

    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const { onParentNavigate } = mount( ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location

                if( pathname !== nextPathname){
                    history.push( nextPathname ) 
                }
            },
            onSignIn: login,
            theme
        })
        
        history.listen( onParentNavigate )

    }, [])

    return <div ref={ref} />
}

export default connect(
    ({ container }) => ({
        isAuthorized: container.isAuthorized
    }),
    { ...container.actions }
)(AuthApp);