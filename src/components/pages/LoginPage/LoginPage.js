import React, {useState} from 'react';
import Loading from "../../Loading";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, Link} from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined"
import "./LoginPage.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const config = {
                headers: {
                    "Content-type":"application/json"
                }
            }
            
            setLoading(true)

            const {data} = await axios.post(
                'https://oasisone.herokuapp.com/tenant/login',
                {
                    email,
                    password,
                },
                config
            );
            
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    
    const avatarStyle={backgroundColor:'green'}
    const buttonStyle={margin:'8px 0'}
    const initialValues={
        username:'',
        password:'',
        remember:false
    }

    const validationSchema=Yup.object().shape({
        username: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })

    return(
        <div>
                <Avatar style={avatarStyle}><LockIcon/></Avatar>
                <h1>Sign In</h1>

                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} name='username' label='username' 
                            placeholder='Enter username' fullWidth required
                            helperText={<ErrorMessage name='username'/>}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <Field as={TextField} name='password' label='password' 
                            placeholder='Enter password' type='password' fullWidth required
                            helperText={<ErrorMessage name='password'/>}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            <Field as={FormControlLabel}
                                label="Remember me"
                                name="remember"
                                    control={
                                        <Checkbox
                                        color="primary"
                                        />
                                    }
                            />
                            <Button type='submit' color='primary' disabled={props.isSubmitting} variant='contained' style={buttonStyle} fullWidth>{props.isSubmitting?"Signing In":"Sign In"}</Button>
                        </Form>
                    )}
                </Formik>

                <Typography><Link href='#'>Forgot Password?</Link></Typography>
                <Typography> Do you have an account? <Link href='#'>Sign up</Link></Typography>
        </div>
    )
}

export default Login
