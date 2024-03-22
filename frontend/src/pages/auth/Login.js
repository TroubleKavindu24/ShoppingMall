import React from 'react';
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <BiLogIn size={35} color='#999'/>
            </div>
            <h2>
                Login
            </h2>

            <form>
                <input 
                    type='text' 
                    placeholder='Email' 
                    required name="email"
                /><br/>
                <input 
                    type='password' 
                    placeholder='password' 
                    required name="password"
                />
                <button 
                    type='submit' 
                    className='--btn --btn-primary --btn-block'>
                    Login
                </button>
            </form>
            <Link to="/forgot">Forgot password</Link><br/>

            <span className={styles.register}>
                <Link to="/">Home</Link>
                <p> &nbsp; Don't have an account? &nbsp;</p>
                <Link to='/register'>Register</Link>
            </span>
        </Card>
    </div>
  )
}

export default Login