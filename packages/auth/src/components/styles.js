import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    logo: {
        width: '40px',
        height: '40px',
        marginBottom: '16px'
    },
    formLogin: {
        maxWidth: '400px',
        width: '100%;',
        // margin: "2.625rem 0",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'initial',
        },
    },
    controlLabel: {
        margin: 0,
        display: "flex",
        alignItems: "flex-start"

    },
    check: {
        paddingTop: 2,
        paddingLeft: 0,
    },
    // containerForgotPass: {
    //     width: "100%",
    //     maxWidth: 491
    // },
    // Sitio en mantenimiento
    containerBlankState: {
        display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		textAlign: "center",
		height: "100vh",
    },
    caption: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: "40%",
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: {
            width: "80%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "95%",
        }
    },
    placeholderCircle: {
        width: 200,
        height: 200,
        margin: "0 auto 1rem"
    },
	helpText: {
		fontSize: "0.875rem",
		marginTop: theme.spacing(8)
	}


}));


export default useStyles;