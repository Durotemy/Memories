import { Typography, AppBar, Toolbar, Button, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import React, { useState, useEffect } from 'react'
import memories from "../../images/memories.png";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    console.log("userPresent", user);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const logOut = () => {
        dispatch({ type: "LOGOUT" });
        setUser(null);
        navigate("/");
    }

    return (

        <GoogleOAuthProvider clientId="1098638947980-v20v8326tcd9ctdrcjhr9r5nj62408fa.apps.googleusercontent.com">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" variant="h2" align="center" className={classes.heading}>Memories</Typography>
                    <img className={classes.image} src={memories} alt="icon" height="60" />
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.token.name} src={user.token.picture}>
                                {
                                    // user.result.email[0]
                                }
                                {/* {user.result.name.charAt(0)} */}
                                {/* {user.result.firstname[0]} */}
                                {/* {user.result.firstname[0]} */}
                            </Avatar>
                            <Typography variant="h6" className={classes.username}>{user.token.name}</Typography>
                            <Button className={classes.logout} variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" color="primary" variant="contained">
                            Sign in
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </GoogleOAuthProvider>
    )
}
export default NavBar