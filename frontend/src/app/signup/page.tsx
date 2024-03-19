import React, { useState, ChangeEvent } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoMdArrowBack } from "react-icons/io";
import Image from 'next/image';
import Link from 'next/link';
import {redirect} from "next/navigation";

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

    const onSubmit = async (formData : FormData) => {
        "use server"

        let shouldRedirect : boolean = false

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
                method: 'post',
                body: formData,
                credentials: 'include'
            })

            if (response.status === 403) {
                return {
                    message: 'user exists'
                }
            }

            shouldRedirect = true;
        } catch(e) {
            console.error(e)
        }

        if (shouldRedirect) {
            redirect('/')
        }
        
    }
    
    return (
        <div id="wrap" className="signup">
            <Link href="/" className='btn-back'>
                <IoMdArrowBack size={60} color='#333' />
            </Link>
            <div className="signup-warp">
                <h1>회원가입</h1>
                <div className="signup-content">
                    <form action={onSubmit}>
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
                                    <input id="avatar" required type="file" name="image" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </li>
                            <li>
                            <input type="text" required name='userID' className="wran" placeholder="아이디를 입력해주세요" />
                            <p className="txt-helper">영문, 숫자 포함 8자 이상 입력해주세요</p>
                            </li>
                            <li>
                                <input type="password" required name="password" placeholder="비밀번호를 입력해주세요" />
                                <p className="txt-helper">영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요</p>
                            </li>
                            <li>
                                <input type="password" required name="passwordCheck" placeholder="비밀번호를 다시 입력해주세요" />
                                <p className="txt-helper">영문 대문자, 숫자, 특수문자 포함 8자 이상 입력해주세요</p>
                            </li>
                        </ul>
                    </form>
                    
                </div>
                
                <div className="btn-area">
                    <button type="button" className="btn-signup">회원가입</button>
                </div>
            </div>
            
        </div>
    );
}
