import React from "react"

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	mainLayout: {
		display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100vh"
	}
}));

const MainLayout = ({children}) => {
    const classes = useStyles();

    return <div className={ classes.mainLayout}>{children}</div>
}

export default MainLayout
