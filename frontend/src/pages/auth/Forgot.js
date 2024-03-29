import React from 'react';
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';


const Forgot = () => {
  return (
    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <AiOutlineMail size={35} color='#999'/>
            </div>
            <h2>
                Forgot password
            </h2>

            <form>
                <input 
                    type='email' 
                    placeholder='Email' 
                    required name="email"
                /><br/>
                <button 
                    type='submit' 
                    className='--btn --btn-primary --btn-block'>
                    Get Reset Email
                </button>
                <div className={styles.links}>
                  <p>
                    <Link to="/">- Home</Link>
                  </p>
                  <p>
                    <Link to="/login">- Login</Link>
                  </p>
                </div>
            </form>

        </Card>
    </div>
  )
}

export default Forgot