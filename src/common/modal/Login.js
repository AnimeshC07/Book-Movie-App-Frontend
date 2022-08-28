import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default function login(props) {

    const initialState = { username: "", password: "" };
    // const paperStyle = { padding: "20px 20px", width: 300, margin: "20px auto" , alignItems : 'center'}
    const [user, setUser] = useState(initialState);

    const changeInputHandler = (e) => {

        const usr = user;
        usr[e.target.id] = e.target.value;
        setUser({ ...usr });
        //console.log(this.state);
    }

    const onUserLoginHandler = async (user) => {
        const param = window.btoa(`${user.username}:${user.password}`);
        try {
            const response = await fetch("/api/v1/auth/login", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`
                }
            })

            const result = await response.json();
            if (response.ok) {

                window.sessionStorage.setItem('user-details', JSON.stringify(result));
                window.sessionStorage.setItem('access-token', response.headers.get('access-token'));
                props.onCloseModal();
                // alert(`Welcome `+ result.first_name );

            } else {
                const err = new Error();
                err.message = result.message || 'Error occurred';
            }
        } catch (e) {
            alert(`Error : ${e}`);
        }
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();
        onUserLoginHandler(user);
        setUser(initialState);

    }

    return (
        <Grid container={true} >
            <ValidatorForm className='userLogin' noValidate autoComplete='off' onSubmit={e => onSubmitHandler(e)}>

                <TextValidator id="username" placeholder='Username*' variant="standard" name="username"
                    value={user.username} fullWidth
                    type='text'
                    onChange={e => changeInputHandler(e)}
                    validators={['required']}
                    errorMessages={["required"]} /><br /><br />

                <TextValidator id="password" placeholder='Password*' variant="standard" name="password"
                    value={user.password} fullWidth
                    type='password'
                    onChange={e => changeInputHandler(e)}
                    validators={['required']}
                    errorMessages={["required"]} /><br /><br />

                <Button variant="contained" color="primary" size="medium" type="submit" style={{ width: "100px", justifyContent: "center" }}>Login</Button><br /><br /><br />
            </ValidatorForm>
        </Grid>
    );
}