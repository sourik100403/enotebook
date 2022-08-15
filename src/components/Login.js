import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = (props) => {
  const [credentials,setCredentials]=useState({email:"",password:""})
  let  navigate =useNavigate()

    const handleSubmit =async (e) => {
        e.preventDefault();
        //api call for login page
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) 
        });
        const json = await response.json(); 
        console.log(json);
        if(json.success){
        //save the auth-token and redirect
        localStorage.setItem('token',json.authToken)
        props.showAlert('Successfully Login','success')
        navigate('/');
        }
        else{
            props.showAlert('Please enter valid email and password','danger')
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})

    }
    return (
        <div className='container my-2 mt-2'>
            <h2 >Login To Continue to eNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} name='password' placeholder="Password" onChange={onChange} />
                </div>
                <div className="form-check my-2">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
