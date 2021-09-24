import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import * as auth from "../../_redux/authRedux";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import Alert from '@material-ui/lab/Alert';


const TokenExpired = ({ intl, token, type, resendEmailToken, resendTokenStatus, uuid }) => {

    const [status, setStatus] = useState();

    // Logica para reenviar el token

    const SendAgain = () => {
        resendEmailToken(token, type, uuid)
    }

    useEffect(() => {
        if (resendTokenStatus !== 'initial') {
            setStatus({
                type: resendTokenStatus,
                message: intl.formatMessage(
                    { id: resendTokenStatus === "success" ? "AUTH.VALIDATION.AUTH.TOKEN_EXPIRED.RESEND_OK" : "AUTH.TOKEN_EXPIRED.RESEND_ERROR" }
                )
            });

            setTimeout(() => {
                setStatus()
            }, 3000);
        }

    }, [resendTokenStatus])

    // ---------------------------------
    // ---------------------------------
    // ---------------------------------
    

    return (
        <Grid container justifyContent='center' className="login-form login-forgot">
            <Grid item xs={12} className="mb-8">

                <Typography variant="h2" align="center" className="mb-4">

                    El token es inválido o ya caducó.

                    <Typography align="center" variant={"body1"} >
                            <Link
                                component="button"
                                variant="body1"
                                onClick={() => SendAgain()}
                            >
                                {/* Volver a enviar correo de confirmación */}
                                <FormattedMessage id="AUTH.TOKEN_EXPIRED.BUTTON" />
                            </Link>
                    </Typography>
                </Typography>

            </Grid>

            {
                status ? <Alert severity={status.type}>{status.message}</Alert> : null
            }

        </Grid>
    )
}

export default injectIntl(connect(({ auth }) => ({
    resendTokenStatus: auth.resendTokenStatus,
}), auth.actions)(TokenExpired));
