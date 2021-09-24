import React from 'react'
import ReactDOM from "react-dom"
import App from "./App"
import { createMemoryHistory, createBrowserHistory} from "history"


const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath, theme } ) => {


    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    if(onNavigate){
        history.listen(onNavigate)
    }
    ReactDOM.render(<App onSignIn={onSignIn} history={history} theme={theme}/>, el)

    return {
        onParentNavigate({pathname: nextPathname}){
            const { pathname } = history.location
            if( pathname !== nextPathname ){
                history.push(nextPathname)
            }
        }
    }
}

// Dev and isolation
if( process.env.NODE_ENV === "development"){
    const devRoot = document.querySelector("#_auth-dev-root")
    if(devRoot) { mount( devRoot, { defaultHistory: createBrowserHistory() } ) }
}

// Export to container

export { mount }