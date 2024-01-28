import React, { SyntheticEvent, useContext, useState } from 'react'
import axios from "axios";

import "./styles.css";
import { Response } from 'express';
import { UserErrors } from '../../models/errors';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { IShopContext, ShopContext } from '../../context/shop-context';

const Register = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try{

      await axios.post("http://localhost:3001/user/register/",
      {
        username,
        password
      });
      console.log("registration Completed!");
    } catch (error) {
      if(error?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
          console.log("Error: Username already in use.")
        } else {
          console.log("Error: Something went wrong.")
      }
    }

  }

  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className='form-group'>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {isAuthenticated, setIsAuthenticated} = useContext<IShopContext>(ShopContext);

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try{

      const result = await axios.post("http://localhost:3001/user/login",
      {
        username,
        password
      });
     
      console.log(result.data)
      setCookies("access_token", result.data.token );
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {

      let errorMessage: string = "";

      switch(error.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User doesn't exists.";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong user/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      console.log("ERROR: " + errorMessage);


    }

  }

  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='form-group'>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const AuthPage = () => {
  return (
    <div className='auth'>
      <Register /> <Login />
    </div>
  )
}

export default AuthPage

