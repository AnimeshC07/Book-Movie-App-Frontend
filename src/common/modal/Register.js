import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

export default function register(props) {

    const initialState = { email_address: "", first_name : "" , last_name: "", mobile_number : "" , password: ""};
    // const paperStyle = { padding: "20px 20px", width: 300, margin: "20px auto" , justify : "centre" };
    const [user, setUser] = useState(initialState);

    const changeInputHandler = (e) => {

        const usr = user;
        usr[e.target.id] = e.target.value;
        setUser({ ...usr });
        //console.log(this.state);
    }

    // on register post call to api 
    const onRegisterHandler = async(user)=>{
        try{
            const response = await fetch("/api/v1/signup",{
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json;charset=UTF-8",
                },
                body: JSON.stringify(user)
            })
    
            const result = await response.json();
            if(response.ok){
                document.getElementById('msg').innerText = 'Registeration Successful. Please Login!';
                props.onCloseModal();
            }else{
                const err = new Error();
                err.message = result.message || 'Error occurred';
            }
        }catch(e){
            alert(`Error : ${e}`);
        }
    }

    const onSubmitHandler = async (e) => {

        e.preventDefault();
        onRegisterHandler(user);
        setUser(initialState);

    }

    return (
        <Grid container={true} >

                <ValidatorForm className='addStudent' noValidate autoComplete='off' onSubmit={e => onSubmitHandler(e)}>

                    <TextValidator id="first_name" placeholder='Firstname*' variant="standard" name="first_name"
                        value={user.first_name} fullWidth
                        type='text'
                        onChange={e => changeInputHandler(e)}
                        validators={['required']}
                        errorMessages={["required"]} /><br />

                    <TextValidator id="last_name" placeholder='Last name*' variant="standard" name="last_name"
                        value={user.last_name} fullWidth
                        type='text'
                        onChange={e => changeInputHandler(e)}
                        validators={['required']}
                        errorMessages={["required"]} /><br />

                    <TextValidator id="email_address" placeholder='Email*' variant="standard" name="email_address"
                        value={user.email_address} fullWidth
                        type='text'
                        onChange={e => changeInputHandler(e)}
                        validators={['required']}
                        errorMessages={["required"]} /><br />

                    <TextValidator id="password" placeholder='Password*' variant="standard" name="password"
                        value={user.password} fullWidth
                        type='password'
                        onChange={e => changeInputHandler(e)}
                        validators={['required']}
                        errorMessages={["required"]} /><br />

                    <TextValidator id="mobile_number" placeholder='Contact _no*' variant="standard" name="mobile_number"
                        value={user.mobile_number} fullWidth
                        type='text'
                        onChange={e => changeInputHandler(e)}
                        validators={['required']}
                        errorMessages={["required"]} /><br />

                    <Button variant="contained" color="primary" type="submit" style={{ width: "100px", align: "centre" }}>Register</Button><br /><br /><br />

                    <span id="msg"></span>
                </ValidatorForm>
        </Grid>
    );
}