"use client"

import React, { useState } from 'react';
import Modal from "../modal/Modal"
import Link from 'next/link';

const LoginButton = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onLogin = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="tnb-buttons last">
            <button type="button" className="btn-login" onClick={onLogin}>Login</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='login-wrap'>
                    <h1>로그인</h1>
                    <div className='login-content'>
                        <ul>
                            <li>
                                <input type="text" className='usr-id wran' placeholder='아이디를 입력해주세요' />
                            </li>
                            <li>
                                <input type="password" className='usr-password' placeholder='비밀번호를 입력해주세요' />
                            </li>
                        </ul>
                    </div>
                    <p className='info'>
                        계정이 없으신가요? <Link className='txt-signup' href="/signup">가입하기</Link>
                    </p>
                    <div className='btn-area'>
                        <button type="button" className='btn-login'>로그인</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default LoginButton