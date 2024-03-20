"use client"

import React, { useState, ChangeEvent, useCallback, useRef, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowBack } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import onSubmit from '../_lib/signup'
import { useFormState, useFormStatus } from 'react-dom'

// interface ImageUploadProps {
//     onUpload?: (file: File) => void;
// }

export default function SignUp() {
    const { pending, data, method, action } = useFormStatus()
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordCheckRef = useRef<HTMLInputElement>(null);

    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");

    const [userMsg, setUserMsg] = useState<string>("아이디를 입력해주세요");
    const [passwordMsg, setPasswordMsg] = useState<string>("비밀번호를 입력해주세요");
    const [passwordCheckMsg, setPasswordCheckMsg] = useState<string>("비밀번호를 다시 입력해주세요");

    const [state, formAction] = useFormState(onSubmit, { message: null });
    const [preview, setPreview] = useState<string>('');

    const userHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>, state : any) => {
        
        if (state.code === "userID" || state.code === "userID_validation") {
            setUser("");
            setUserMsg(state.message);
        } else {
            setUser(e.target.value)
        }
        
    }, [state])

    const passwordHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>, state : any) => {
        setPassword(e.target.value)
    }, [state])

    const passwordCheckHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>, state : any) => {
        setPasswordCheck(e.target.value)
    }, [state])

    const onValidation = useCallback((state: any) => {
        console.log(state)

        if (state.code === "userID") {
            if (userRef.current){
                userRef.current?.focus();
                userRef.current.value = ""
            }
            setUserMsg(state.message);
        }

        if (state.code === "userID_validation") {
            setUser("");
            setUserMsg(state.message);
            userRef.current?.focus();
        }

        if (state.code === "password" || state.code === "password_validation") {
            setPassword("");
            setPasswordMsg(state.message);
            passwordRef.current?.focus();
        }

        if (state.code === "passwordCheck" || state.code === "passwordCheck_validation") {
            setPasswordCheck("");
            setPasswordCheckMsg(state.message);
            passwordCheckRef.current?.focus();
        }

    }, [state])
    
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0] && files[0].type.startsWith('image/')) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview('');
        }
    };

    const onSubmitHandler = useCallback((e: FormData) => {
        formAction(e);
    }, [])
    
    useEffect(() => {
        onValidation(state)
    }, [state])
    
    useEffect(() => {
        console.log(pending, data, method, action)
    }, [pending, data, method, action])

    return (
        <div id="wrap" className="signup">
            <Link href="/" className='btn-back'>
                <IoMdArrowBack size={60} color='#333' />
            </Link>
            <div className="signup-warp">
                <h1>회원가입</h1>
                <form action={onSubmitHandler}>
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
                                    <input id="avatar" type="file" name="image" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </li>
                            <li>
                                <input
                                    ref={userRef}
                                    type="text"
                                    name='userID'
                                    value={user}
                                    onChange={(e) => userHandler(e, state)}
                                    className={`${state.error === "userID" || state.error === "userID_validation" ? "wran" : ""}`}
                                    placeholder={userMsg}
                                />
                                <p className="txt-helper">{userMsg}</p>
                                <p className="txt-helper">영문, 숫자 포함 8자 이상 입력해주세요</p>
                            </li>
                            <li>
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => passwordHandler(e, state)}
                                    className={`${state.error === "password" || state.error === "password_validation" ? "wran" : ""}`}
                                    placeholder={passwordMsg}
                                />
                                <p className="txt-helper">영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요</p>
                            </li>
                            <li>
                                <input
                                    ref={passwordCheckRef}
                                    type="password"
                                    name="passwordCheck"
                                    value={passwordCheck}
                                    onChange={(e) => passwordCheckHandler(e, state)}
                                    className={`${state.error === "passwordCheck" || state.error === "passwordCheck_validation" ? "wran" : ""}`}
                                    placeholder={passwordCheckMsg} 
                                />
                                <p className="txt-helper">영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요</p>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="btn-area">
                        <button type="submit" className="btn-signup" disabled={pending}>회원가입</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
