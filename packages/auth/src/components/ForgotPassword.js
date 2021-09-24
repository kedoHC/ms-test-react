import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Link from '@material-ui/core/Link';
import * as Yup from "yup";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReCAPTCHA from "react-google-recaptcha";
import * as auth from "../_redux/authRedux";
import { requestPassword } from "../_redux/authCrud";
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles'
import Typography from '@material-ui/core/Typography';
import { FormattedMessage, injectIntl } from "react-intl";
import CircularProgress from '@material-ui/core/CircularProgress';

const initialValues = {
	email: "",
	recaptcha: "",
};

function ForgotPassword(props) {


	const { intl } = props;
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [isRequested, setIsRequested] = useState(false);
	const ForgotPasswordSchema = Yup.object().shape({
		email: Yup.string()
			.email(intl.formatMessage({
				id: "AUTH.VALIDATION.EMAIL_FIELD",
			}))
			.required(
				intl.formatMessage({
					id: "AUTH.VALIDATION.REQUIRED_FIELD",
				})
			),
		recaptcha: Yup.string()
			.nullable()
			.required(
				intl.formatMessage({
					id: "AUTH.VALIDATION.REQUIRED_FIELD",
				})
			)
	});

	const enableLoading = () => {
		setLoading(true);
	};

	const disableLoading = () => {
		setLoading(false);
	};

	const formik = useFormik({
		initialValues,
		validationSchema: ForgotPasswordSchema,
		onSubmit: (values, { setStatus, setSubmitting }) => {
			enableLoading();
			requestPassword(values.email, values.recaptcha)
				.then(() => {

					setIsRequested(true)
				})
				.catch(() => {
					setIsRequested(false);
					setSubmitting(false);
					disableLoading();
					setStatus(
						intl.formatMessage(
							{ id: "AUTH.VALIDATION.NOT_FOUND" },
							{ name: values.email }
						)
					);
				});
		},
	});


	return (
		<>
			{isRequested && <Redirect to="/auth" />}
			{!isRequested && (
				<Grid container justifyContent='center' className={ classes.containerForgotPass}>
					<Grid item>
						<Typography variant="h1" align="center">
							<FormattedMessage id="AUTH_FORGOT_TITLE" />
						</Typography>
						<Typography variant="h5" align="center">
							<FormattedMessage id="AUTH_FORGOT_DESC" />
						</Typography>
					</Grid>
					<Grid justifyContent='center' container>
						<form
							onSubmit={formik.handleSubmit}
							className={classes.formLogin}
						>
							{/* begin: Alert */}
							{formik.status ? (
								<Grid item xs={12} className="mb-8">
									<Alert severity='error'>{formik.status}</Alert>
								</Grid>
							) : (null)}
							{/* end: Alert */}
							<Grid item xs={12} className="mb-4">
								<TextField
									fullWidth
									type="email"
									name="email"
									label={<FormattedMessage id="AUTH.INPUT.EMAIL" />}
									error={Boolean(formik.touched.email && formik.errors.email)}
									id="email"
									variant="outlined"
									{...formik.getFieldProps("email")}
								/>
								{formik.touched.email && formik.errors.email ? (
									<Typography variant="body2" color="error">
										{formik.errors.email}
									</Typography>
								) : null}
							</Grid>
							<Grid item xs={12} className="mb-4" justifyContent="center" container>
								<div className="g-recaptcha-wrapper">
									<ReCAPTCHA
										sitekey="6Le5n70ZAAAAAByrblNxZO0LzPz0PCpBjV5I7ZXg"
										size="normal"
										className="center"
										onChange={(response) => {
											formik.setFieldValue("recaptcha", response);
										}}
									/>
									<div id="topHider"></div>
									<div id="rightHider"></div>
									<div id="bottomHider"></div>
									<div id="leftHider"></div>
								</div>

								{formik.touched.recaptcha && formik.errors.recaptcha ? (
									<Typography variant="body2" color="error">
										{formik.errors.recaptcha}
									</Typography>
								) : null}
							</Grid>
							<Grid item xs={12} className="mb-4">
								<Button variant="contained" type="submit" color="primary" fullWidth disabled={formik.isSubmitting}>
									<FormattedMessage id="AUTH_FORGOT_CONTINUE" />
									{loading && <CircularProgress size={20} style={{ marginLeft: 15}}/>}
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Typography align="center" variant={"body2"} >
									<FormattedMessage id="AUTH_FORGOT_SMALL" />
								</Typography>
							</Grid>
						</form>
					</Grid>
					<Grid item xs={12}>
						<Typography align="center" variant={"body1"} >
							<FormattedMessage id="AUTH.GENERAL.NO_ACCOUNT" />
								&nbsp;<Link variant="body1" to="/auth/registration" component={RouterLink}>
								<FormattedMessage id="AUTH.GENERAL.SIGNUP_BUTTON" />
							</Link>
						</Typography>
						<Typography align="center" variant={"body1"} >
							<FormattedMessage id="AUTH.GENERAL.ACCOUNT" />
								&nbsp;<Link variant="body1" component={RouterLink} to="/auth/login" >
								<FormattedMessage id="AUTH_REGISTER_LOGIN_BUTTON" />
							</Link>
						</Typography>
					</Grid>
				</Grid>
			)}
		</>
	);
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
