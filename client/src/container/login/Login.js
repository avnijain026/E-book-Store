import React, { useState } from 'react';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../navigation/Routes';
import axios from 'axios';


function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [user, setUser] = useState();

  

  const onUserSubmit = (e) =>{
    e.preventDefault();
    let errors = false;
    let error = {
      email: "",
      password: "",
    };

    if (form.email.trim().length === 0) {
      errors = true;
      error = { ...error, email: "Email is Empty" };
    }

    if (form.password.trim().length === 0) {
      errors = true;
      error = { ...error, password: "Password is Empty" };
    }

    if (errors) {
      setFormError(error);
    } else {
      setFormError(error);
      checkUser();
    }
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function checkUser(){
    try {
      axios.post("http://localhost:8090/login", form).then((d) => {
        localStorage.setItem("id",d.data.id)
        localStorage.setItem("role",d.data.role)
        setUser(d.data);
        alert(d.data.message);
        navigate("/")
        
        if(d.data.role=="admin"){
          navigate( ROUTES.universityAdmin.name)
        }
        else{
          navigate(ROUTES.home.name)
        }
      }).catch((e)=>{
        alert("Wrong email or password")
        setForm({email:"",password:""})
      })
    } catch (error) {
      alert("Failed to Submit Data");
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={onUserSubmit}>
      <div className='row m-2 p-2'>
        <div className="card text-center mx-auto">
          <div className="card-header bg-info text-white">
            Login
          </div>
          <div className="card-body">
            <div className='form-group row'>
              <label className='col-4'>Email</label>
              <div className='col-8'>
                <input type='text' name='email' className='form-control' placeholder='Enter Email' onChange={changeHandler} value={form.email} />
                <p className='text-danger'>{formError.email}</p>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-4'>Password</label>
              <div className='col-8'>
                <input type='password' name='password' className='form-control' placeholder='Password' onChange={changeHandler} value={form.password} />
                <p className='text-danger'>{formError.password}</p>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted bg-info">
            <button className='btn btn-warning text-white' onClick={onUserSubmit}>Login</button>
            <p className='text-white mt-2' style={{cursor:"pointer"}} onClick={()=>{navigate(ROUTES.register.name)}}>New User ?</p>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

export default Login;
