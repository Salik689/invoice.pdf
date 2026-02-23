"use client"
import React from 'react'
import './Navbar.css';
import { useState } from 'react';
import { useRef } from "react";
import Image from 'next/image';


const Navbar = () => {
    const [menu, setmenu] = useState(false)
    const menuRef = useRef(null);

    function toggleMenu() {
        setmenu(!menu)
    }
    return (
        <>
            <header className=' backdrop-blur-md bg-white/10 shadow-md' >
                <div className="logo"><a className='font-bold text-2xl ml-2 text-green-600' href="/">invoice<strong className='text-red-600' >.pdf</strong></a></div>
                <nav className='desktop-nav' >
                    <ul className='ul font-bold ' >
                        <li><a href="/">Home</a></li>
                        <li><a href="/create-invoice">Create an invoice</a></li>
                        <li><a href="/previous-invoices">Previous invoices</a></li>
                    </ul>
                </nav>
                <button className=" menuBtns menu-openBtn inline-flex items-center justify-center 
            text-orange-500 text-3xl font-bold 
            w-12 h-12 rounded-lg cursor-pointer select-none
            hover:bg-orange-500/10 hover:text-orange-600
            transition-all duration-200 " onClick={toggleMenu} >
                    ☰
                </button>
                <nav ref={menuRef} className={` mobile-nav ${menu ? 'open-menu' : 'close-menu'}`}>
                    <button className=" menuBtns menu-closeBtn inline-flex items-center justify-center 
            text-orange-500 text-3xl font-bold 
            w-12 h-12 rounded-lg cursor-pointer select-none
            hover:bg-orange-500/10 hover:text-orange-600
            transition-all duration-200 " onClick={toggleMenu} >
                        ✕
                    </button>
                    <ul className='ul font-bold' >
                        <li><a href="/">Home</a></li>
                        <li><a href="/create-invoice">Create an invoice</a></li>
                        <li><a href="/previous-invoices">Previous invoices</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Navbar
