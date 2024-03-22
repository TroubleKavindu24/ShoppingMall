import React from 'react';
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';


const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <TiUserAddOutline size={35} color='#999'/>
            </div>
            <h2>
                Register
            </h2>

            <form>
                <input 
                    type='text' 
                    placeholder='Name' 
                    required name="name"
                /><br/>
                <input 
                    type='email' 
                    placeholder='email' 
                    required name="email"
                /><br/>
                <input 
                    type='password' 
                    placeholder='password' 
                    required name="password"
                /><br/>
                <input 
                    type='password' 
                    placeholder='confirm password' 
                    required name="password"
                />
                <button 
                    type='submit' 
                    className='--btn --btn-primary --btn-block'>
                    Register
                </button>
            </form>
            <span className={styles.register}>
                <Link to="/">Home</Link>
                <p> &nbsp; Already have an account? &nbsp;</p>
                <Link to='/login'>Login</Link>
            </span>
        </Card>
    </div>
  )
}

export default Register