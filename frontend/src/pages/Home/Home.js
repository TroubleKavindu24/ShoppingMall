import React from 'react';
import './Home.scss';
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import heroImg from "../../assets/shoppingmall.jpeg"

const Home = () => {
  return (
    <div className='home'>
        <nav className='container --flex-between'>
           
                <div className='logo'>
                    <RiProductHuntLine size={35} />
                </div>
                <ul className='home-links'>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to="/login">Login</Link>
                        </button>
                    </li>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to="/dashboard">Dashboard</Link>
                        </button>
                    </li>
                </ul>
        </nav>



        <nav className='container --flex-between'>
           
           <ul className='home-links'>
               <li>
               <button className='--btn --btn-primary'>
                   <Link to="/">Categories</Link>
                   </button>
               </li>
               <li>
                   <button className='--btn --btn-primary'>
                       <Link to="/">Home</Link>
                   </button>
               </li>
               <li>
                   <button className='--btn --btn-primary'>
                       <Link to="/">Stores</Link>
                   </button>
               </li>
               <li>
               <button className='--btn --btn-primary'>
                   <Link to="/">Book & Stall</Link>
                   </button>
               </li>
               <li>
                   <button className='--btn --btn-primary'>
                       <Link to="/">Contact Us</Link>
                   </button>
               </li>
               <li>
                   <button className='--btn --btn-primary'>
                       <Link to="/">About Us</Link>
                   </button>
               </li>
           </ul>
   </nav>




        {/*HERO SECTION*/}
        <section className='container hero'>
            <div className='hero-text'>
                <h2>
                    ITPM Shopping { "&" } Mall
                </h2>
                <p>
                A shopping mall is no longer just a place to go to buy something, it's a community and entertainment center.                </p>
                <div className='hero-buttons'>
                    <button className='--btn --btn-secondary'>
                        <Link to="/dashboard">Shopping Now</Link>
                    </button>
                </div>
                <div className='--flex-start'>
                    <NumberText num="14K" text="Brand Owners"/>
                    <NumberText num="23K" text="Active Users"/>
                    <NumberText num="1441K" text="Cuctomers"/>
                </div>
            </div>
            <div className='hero-image'>
                <img src={heroImg} alt='Inventory'/>
            </div>
        </section>
    </div>
  );
};

const NumberText = ({num, text}) => {
    return (
        <div className='--mr'>
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
};

export default Home