"use client"

import React, { useState } from 'react';
import Login from '../auth/Login';

const LoginButton = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onLogin = () => {
        setIsModalOpen(true)
    }
    
    return (
        <div className="tnb-buttons last">
            <button type="button" className="btn-login" onClick={onLogin}>로그인</button>
            <Login isOpen={isModalOpen} setOpen={setIsModalOpen} />
        </div>
    )
}

export default LoginButton