// https://www.youtube.com/watch?v=X392f_AxvVQ
import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useDispatch } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";
import Input from "./Input"
import Icon from "./Icon";
import { signin, signup } from "../../actions/auth";

import { GoogleOAuthProvider } from "@react-oauth/google"
import jwt_decode from "jwt-decode";

const initialState = { firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };
const Auth = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }

        console.log(formData)
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }



    const googleSuccess = async (res) => {

        try {
            const decode = jwt_decode(res.credential)
            const result = res.credential;
          

            localStorage.setItem("profile", JSON.stringify({ result: decode, token: res.credential }));
          
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later");
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }

    return (
        <GoogleOAuthProvider clientId="1098638947980-v20v8326tcd9ctdrcjhr9r5nj62408fa.apps.googleusercontent.com">
            <Container component="main" maxWidth="xs" >
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">
                        {isSignup ? "Sign up" : "Sign in"}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            {isSignup && (
                                <>
                                    <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} autoFocus />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? "Sign up" : "Sign in"}
                        </Button>
                        <GoogleLogin
                            render={(renderProps) => (
                                <Button color="primary"
                                    className={classes.googleButton}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    fullWidth startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Google Sign in
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account" : "Dont have an account"}?
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

            </Container>
        </GoogleOAuthProvider>
    );
}
export default Auth;


// eyJhbGciOiJSUzI1NiIsImtpZCI6ImNhYWJmNjkwODE5MTYxNmE5MDhhMTM4OTIyMGE5NzViM2MwZmJjYTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjI3Njg0MjUsImF1ZCI6IjEwOTg2Mzg5NDc5ODAtdjIwdjgzMjZ0Y2Q5Y3RkcmNqaHI5cjVuajYyNDA4ZmEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY1OTA3OTc2MDIyMTgwNTQxNzgiLCJlbWFpbCI6ImR1cm90ZW15QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIxMDk4NjM4OTQ3OTgwLXYyMHY4MzI2dGNkOWN0ZHJjamhyOXI1bmo2MjQwOGZhLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkR1cm90ZW15IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BRmRadWNvMDRLWEVBMHRvR0V0UHl6NFY0Tmx3MW9hbmVycGVqTEpVRktNY2lBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkR1cm90ZW15IiwiaWF0IjoxNjYyNzY4NzI1LCJleHAiOjE2NjI3NzIzMjUsImp0aSI6IjMwZWZjZGY2NTEyNjBjMDA4YzY0NzY5ZjMyM2ZkOTZiOWI1OTczY2MifQ.RoVxslBH0p7IcGOVP8nItCucNYoCvc9yoYh7A3ftpKs_-jCHk0Kppk6IGKcdIu3pUs95z51-U8e3n7_HzPbAG4jrq1zI6vLdpnMToZ2a_TL5H_JXmsLgMtSUxNQ6n_IP1MXMTao0p5EEoHXXCs6CGvx79nXGTuddPcqz3BYWgFzvWY1c0ma2Ggy41UiFU8sk9cpvKHYnRpBsv40kEDC0h5ZuOlaazDYedwYanc1svyN3j0huL6xHCDQLGnV2U4ejMQJFAp8wrCDOpa5ObH6HuFWKa7UIN1WhHfuwQ5GDa8mSR_zPlELuSy_nXZiq2ExXR4aEiFKcOLJKai3Etk-yMQ"
