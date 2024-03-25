"use client"

import React, { useState, ChangeEvent, useCallback, useRef, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowBack } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import onSubmit from '../_lib/signup'
import { useFormState } from 'react-dom'

export default function SignUp() {
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordCheckRef = useRef<HTMLInputElement>(null);

    const [state, formAction] = useFormState(onSubmit, { message: null });
    const {code, message} = state;

    const [preview, setPreview] = useState<string | null>('');

    const onValidation = useCallback((state: any) => {
        const { code } = state        
        if (code === 4001 || code === 4002 || code === 4007) {
            userRef.current?.focus();
        }

        if (code === 4003 || code === 4004) {
            passwordRef.current?.focus();
        }

        if (code === 4005|| code === 4006) {
            passwordCheckRef.current?.focus();
        }

    }, [state])
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0] && files[0].type.startsWith('image/')) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const onSubmitHandler = useCallback((e: FormData, isImg : string | null) => {
        const _formData = e;
        if (!isImg) _formData.set('avatar', "");
        formAction(_formData);
    }, [])
    
    useEffect(() => {
        onValidation(state)
    }, [state])

    return (
        <div id="wrap" className="signup">
            <Link href="/" className='btn-back'>
                <IoMdArrowBack size={60} color='#333' />
            </Link>
            <div className="signup-warp">
                <h1>회원가입</h1>
                <form action={(e) => onSubmitHandler(e, preview)}>
                    <div className="signup-content">
                        <ul>
                            <li>
                                <div className='img-avatar'>
                                    <label className='img-label' htmlFor='avatar'>
                                        {preview ? (
                                            <Image src={preview} width={80} height={80} alt="Preview" />
                                        ) : (
                                            <CgProfile size={80} color='#ccc'/>
                                        )}
                                    </label>
                                    <input id="avatar" type="file" name="avatar" accept="image/*" onChange={handleImageChange}/>
                                </div>
                            </li>
                            <li>
                                <input
                                    ref={userRef}
                                    type="text"
                                    name='userID'
                                    className={`${code === 4001 || code === 4002 || code === 4007 ? "wran" : ""}`}
                                    placeholder="영문, 숫자 포함 8자 이상 입력해주세요"
                                />
                                {(code === 4001 || code === 4002 || code === 4007 ) && <p className="txt-helper wran">{message}</p>}
                                
                            </li>
                            <li>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    className={`${code === 4003 || code === 4004 ? "wran" : ""}`}
                                    placeholder="영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요"
                                />
                                {(code === 4003 || code === 4004) && <p className="txt-helper wran">{message}</p>}
                            </li>
                            <li>
                                <input
                                    ref={passwordCheckRef}
                                    type="password"
                                    name="passwordCheck"
                                    className={`${code === 4005 || code === 4006 ? "wran" : ""}`}
                                    placeholder="비밀번호 다시 입력해주세요" 
                                />
                                {(code === 4005 || code === 4006) && <p className="txt-helper wran">{message}</p>}
                            </li>
                        </ul>
                    </div>
                    
                    <div className="btn-area">
                        <button type="submit" className="btn-signup">회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
