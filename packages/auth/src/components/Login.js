import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
// import * as auth from "../_redux/authRedux";
// import * as user from "app/modules/UserProfile/_redux/userRedux";
import { login } from "../_redux/authCrud";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
// import { SEGMENT__LoginUser } from "../../../segment/segment"
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles'
import TextField from '@material-ui/core/TextField';

const  SignIn = ( props ) => {


	const { intl } = props

	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [initialValues, setInitialValues] = useState({
		email: "",
		password: ""
	})

	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email(intl.formatMessage({
				id: "AUTH.VALIDATION.EMAIL_FIELD",
			}))
			.required(
				intl.formatMessage({
					id: "AUTH.VALIDATION.REQUIRED_FIELD",
				})
			),
		password: Yup.string()
			.required(intl.formatMessage({
				id: "AUTH.VALIDATION.REQUIRED_FIELD",
			}))
	});

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const formik = useFormik({
		initialValues,
		validationSchema: LoginSchema,

		onSubmit: (values, { setStatus, setSubmitting }) => {

			// console.log( values )
			// props.onSignIn()

			setLoading(true)
			setTimeout(() => {
				login(values.email, values.password)
					.then((response) => {

						// SEGMENT__LoginUser({
						// 	idUser: response.data.uuid,
						// 	email: values.email,
						// 	name: response.data.name,
						// 	role: response.data.role
						// })

						setLoading(false)
						props.login(response);
						props.setInitialData(response.data);
					})
					.catch(() => {
						setLoading(false)
						setSubmitting(false);
						setStatus(
							intl.formatMessage({
								id: "AUTH.VALIDATION.INVALID_LOGIN",
							})
						);
						setTimeout(() => {
							setStatus("")
						}, 3000);
					});
			}, 1000);
		},
	});

	return (

		<Grid container justifyContent='center'>

			<Grid item xs={12}>
				<Typography variant="h1" align="center">
					Entra a tu cuenta
				</Typography>
				<Typography variant="h5" align="center">
					Ingresa tu correo electrónico y contraseña para acceder a Clara.
				</Typography>

			</Grid>


			<Grid 
				justifyContent='center' 
				container 
				component="form" 
				onSubmit={formik.handleSubmit}
				spacing={3}
				className={ classes.containerAuth }
				className={classes.formLogin}
			>

					{formik.status ? (
						<Grid item xs={12}>
							<Alert severity="error">{formik.status}</Alert>
						</Grid>
					) : (null)}

					<Grid item xs={12}>
						<TextField
							fullWidth
							type="email"
							name="email"
							error={Boolean(formik.touched.email && formik.errors.email)}
							label={<FormattedMessage id="AUTH.INPUT.EMAIL" />}
							variant="outlined"
							id="email"
							{...formik.getFieldProps("email")}
						/>
						{formik.touched.email && formik.errors.email ? (
							<Typography variant="body2" color="error">
								{formik.errors.email}
							</Typography>
						) : null}
					</Grid>
					<Grid item xs={12}>
						<TextField
							className="fs-exclude"
							fullWidth
							type={showPassword ? 'text' : 'password'}
							name="password"
							label={<FormattedMessage id="AUTH.INPUT.PASSWORD" />}
							error={Boolean(formik.touched.password && formik.errors.password)}
							id="password"
							variant="outlined"
							{...formik.getFieldProps("password")}
							InputProps={{
								className: "fs-exclude",
								endAdornment: <IconButton
									aria-label="toggle password visibility"
									style={{ padding: 5 }}
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							}}
							{...formik.getFieldProps("password")}
						/>
						{formik.touched.password && formik.errors.password ? (
							<Typography variant="body2" color="error">
								{formik.errors.password}
							</Typography>
						) : null}

					</Grid>

					<Grid item xs={12} >
						<Button variant="contained" type="submit" color="primary" fullWidth disabled={loading}>
							<FormattedMessage id="AUTH.LOGIN.BUTTON" />
							{loading && <CircularProgress size={20} style={{ marginLeft: 15 }} />}
						</Button>
					</Grid>

			</Grid>

			<Grid item xs={12}>
				<Typography align="center" variant={"body1"} >
					<FormattedMessage id="AUTH.GENERAL.NO_ACCOUNT" />
						&nbsp;<Link variant="body1" to="/auth/registration" component={RouterLink}>
							<FormattedMessage id="AUTH.GENERAL.SIGNUP_BUTTON" />
						</Link>
				</Typography>
				<Typography align="center" variant={"body1"} >
					<FormattedMessage id="AUTH.GENERAL.FORGOT_TEXT" />
						&nbsp;<Link variant="body1" to="/auth/forgot-password" component={RouterLink}>
							<FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
						</Link>
				</Typography>
			</Grid>

		</Grid>

		// <Container component="main" maxWidth="xs">
		// 	<div className={classes.paper}>
		// 		<Avatar className={classes.avatar}>
		// 			<LockOutlinedIcon />
		// 		</Avatar>
		// 		<Typography component="h1" variant="h5">
		// 			Sign in
		// 		</Typography>
		// 		<form
		// 			onSubmit={(e) => e.preventDefault()}
		// 			className={classes.form}
		// 			noValidate
		// 		>
		// 			<TextField
		// 				variant="outlined"
		// 				margin="normal"
		// 				required
		// 				fullWidth
		// 				id="email"
		// 				label="Email Address"
		// 				name="email"
		// 				autoComplete="email"
		// 				autoFocus
		// 			/>
		// 			<TextField
		// 				variant="outlined"
		// 				margin="normal"
		// 				required
		// 				fullWidth
		// 				name="password"
		// 				label="Password"
		// 				type="password"
		// 				id="password"
		// 				autoComplete="current-password"
		// 			/>
		// 			<FormControlLabel
		// 				control={<Checkbox value="remember" color="primary" />}
		// 				label="Remember me"
		// 			/>
		// 			<Button
		// 				type="submit"
		// 				fullWidth
		// 				variant="contained"
		// 				color="primary"
		// 				className={classes.submit}
		// 				onClick={onSignIn}
		// 			>
		// 				Sign In
		// 			</Button>
		// 			<Grid container>
		// 				<Grid item>
		// 					<Link to="/auth/signup">{"Don't have an account? Sign Up"}</Link>
		// 				</Grid>
		// 			</Grid>
		// 		</form>
		// 	</div>
		// 	<Box mt={8}>
		// 		<Copyright />
		// 	</Box>
		// </Container>
	);
}


export default injectIntl( SignIn )