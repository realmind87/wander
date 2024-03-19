"use client"

import React, { useState, ChangeEvent } from 'react';
import { CgProfile } from "react-icons/cg";
import Image from 'next/image';

interface ImageUploadProps {
    onUpload?: (file: File) => void;
}

export default function SignUp({onUpload} : ImageUploadProps) {
    const [preview, setPreview] = useState<string>('');

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0] && files[0].type.startsWith('image/')) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview('');
        }
    };
    
    return (
        <div id="wrap" className="signup">
            <div className="signup-warp">
                
                <h1>회원가입</h1>
                
                <div className="signup-content">
                    <ul>
                        <li>
                            <div className='img-avatar'>
                                <label className='img-label' htmlFor='avatar'>
                                    {preview ? (
                                        <Image src={preview} alt="Preview" />
                                    ) : (
                                        <CgProfile size={80} color='#ccc'/>
                                    )}
                                </label>
                                <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </li>
                        <li>
                           <input type="text" className="wran" placeholder="아이디를 입력해주세요" />
                           <p className="txt-helper">영문, 숫자 포함 8자 이상 입력해주세요</p>
                        </li>
                        <li>
                            <input type="password" placeholder="비밀번호를 입력해주세요" />
                            <p className="txt-helper">영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요</p>
                        </li>
                        <li>
                            <input type="password" placeholder="비밀번호를 다시 입력해주세요" />
                            <p className="txt-helper">영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요</p>
                        </li>
                    </ul>
                </div>
                
                <div className="btn-area">
                    <button type="button" className="btn-signup">회원가입</button>
                </div>
            </div>
            
        </div>
    );
}
