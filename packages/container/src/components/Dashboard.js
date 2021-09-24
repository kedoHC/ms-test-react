import React, { useRef, useEffect } from "react"
import { mount } from "dashboard/DashboardApp"
import { useHistory } from "react-router-dom"

export default ({ onSignIn }) => {

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
            onSignIn
        })

        history.listen( onParentNavigate )
    }, [])

    return <div ref={ref} />
}


// Jesus

// 1.- Integrar redux con sagas para manejo de estado en el container, para datos de AUTH
// 2.- Crear estructura de MIcroservicios de los modulos de Clara ( solo integracion con el Container ) con Redux y SAGAS


// Monse

// Revisar como serian los despliegues en GIT, que cada MICRO su pipeline
// Revisar las configuraciones de WEBPACK para el manejo de assets


