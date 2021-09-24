import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
// import * as auth from "../_redux/authRedux";
// import { register } from "../_redux/authCrud";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
// import { SEGMENT__Registration } from "../../../segment/segment"
import CircularProgress from '@material-ui/core/CircularProgress';

function Registration(props) {
	const classes = useStyles();
	const { intl } = props;
	const [loading, setLoading] = useState(false);
	const initialValues = {
		email: "",
		acceptTerms: false,
	}
	const RegistrationSchema = Yup.object().shape({
		email: Yup.string()
			.email(intl.formatMessage({
				id: "AUTH.VALIDATION.EMAIL_FIELD",
			}))
			.required(
				intl.formatMessage({
					id: "AUTH.VALIDATION.REQUIRED_FIELD",
				})
			),
		acceptTerms: Yup.bool().required(
			intl.formatMessage({
				id: "AUTH.VALIDATION.AGREEMENT_REQUIRED",
			})
		),
	});

	const enableLoading = () => {
		setLoading(true);
	};

	const disableLoading = () => {
		setLoading(false);
	};

	const formik = useFormik({
		initialValues,
		validationSchema: RegistrationSchema,
		onSubmit: (values, { setStatus, setSubmitting }) => {

			enableLoading();

			// register(values.email, values.fullname, values.username, values.password)
			// 	.then(() => {

			// 		SEGMENT__Registration(values.email)

			// 		setStatus({
			// 			type: "success",
			// 			message: intl.formatMessage({
			// 				id: "AUTH_REGISTER_SUCCESS",
			// 			})
			// 		})
			// 		disableLoading();
			// 	})
			// 	.catch((error) => {
					
			// 		setSubmitting(false);
			// 		let { data } = error.response

			// 		if( data && data.code === "B008"){
			// 			setStatus({
			// 				type: "error",
			// 				message: "Tu empresa ya está registrada en Clara. Contacta a tu manager para tener acceso o ve a nuestro centro de ayuda."
			// 			})
			// 		}else{
			// 			setStatus({
			// 				type: "error",
			// 				message: <FormattedMessage id="AUTH_REGISTER_ERROR" />
			// 			})
			// 		}

			// 		disableLoading();
			// 		setTimeout(() => {
			// 			setStatus("")
			// 		}, 3000)
			// 	});
		},
	});

	return (
		<Grid container className="login-form login-signin">
			<Grid item xs={12} >
				<Typography variant="h1" align="center">
					<FormattedMessage id="AUTH_REGISTER_TITLE" />
				</Typography>
				<Typography variant="h5" align="center">
					<FormattedMessage id="AUTH_REGISTER_DESC" />
				</Typography>
			</Grid>
			<Grid justifyContent='center' container>

				<form
					className={classes.formLogin}
					onSubmit={formik.handleSubmit}
				>

					{formik.status ? (
						<Grid item xs={12} className="mb-8">
							<Alert severity={formik.status.type}>{formik.status.message}</Alert>
						</Grid>
					) : (null)}

					<Grid item xs={12} className="mb-4" >
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

					<Grid item xs={12} className="mb-4">
						<FormControlLabel
							className={classes.controlLabel}
							control={
								<Checkbox
									name="acceptTerms"
									color="primary"
									className={classes.check}
									{...formik.getFieldProps("acceptTerms")}
								/>
							}
							label={
								<div>
									<span><FormattedMessage id="AUTH.GENERAL.LEGAL_ACCEPT" /></span>
									<Link href="https://www.clara.cc/hubfs/terminosycondiciones.pdf?hsLang=en" target="_blank"><FormattedMessage id="AUTH.GENERAL.LEGAL_TERMS" /></Link>
									<span>&nbsp;y&nbsp;</span>
									<Link href="https://www.clara.cc/hubfs/privacy_policy.pdf?hsLang=en" target="_blank">políticas de privacidad</Link>
									<span>.</span>
								</div>
							}
						/>
						{formik.touched.acceptTerms && formik.errors.acceptTerms ? (
							<Typography variant="body2" color="error">
								{formik.errors.acceptTerms}
							</Typography>
						) : null}
					</Grid>

					<Grid item xs={12}>
						<Button variant="contained" type="submit" color="primary" fullWidth disabled={formik.isSubmitting || !formik.values.acceptTerms}>
							<FormattedMessage id="AUTH_REGISTER_CONTINUE" />
              				{loading && <CircularProgress size={20} style={{ marginLeft: 15}}/>}
						</Button>
					</Grid>
				</form>
			</Grid>

			<Grid item xs={12}>
				<Typography align="center" variant={"body1"} >
					<FormattedMessage id="AUTH.GENERAL.ACCOUNT" />&nbsp;
          <Link variant="body1" component={RouterLink} to="/auth/login" >
						Ingresa aquí
					</Link>
				</Typography>
			</Grid>
		</Grid>
	);
}

export default injectIntl(connect(null, auth.actions)(Registration));
