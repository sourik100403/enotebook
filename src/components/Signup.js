import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  let  navigate =useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    //api call for login page
   const {name,email,password}=credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password}) 
    });
    const json = await response.json(); 
    console.log(json);
    if(json.success){
        //save the auth-token and redirect
        localStorage.setItem('token',json.authToken)
        navigate('/');
        props.showAlert('Account Created Successfully','success')
    }
    else{
      props.showAlert('Please enter valid email and password','danger')
    }
}

const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})

}


  return (
    <div className="container my-2 mt-2">
      <h2>Create an Account To Use eNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Enter Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" placeholder="Enter name" onChange={onChange} required minLength={5} />
        </div>

        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} required  />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" value={credentials.password} name='password' placeholder="Password" onChange={onChange} required minLength={5}/>
        </div>

        <div className="form-group my-2">
          <label htmlFor="cpassword">Password</label>
          <input type="password" className="form-control" id="cpassword" value={credentials.password} name='cpassword' placeholder="Confirm Password" onChange={onChange} required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
