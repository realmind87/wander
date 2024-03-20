"use server"

import {redirect} from "next/navigation";
import axios from "axios";

export default async (prevState: any, formData: FormData) => {
    
    let shouldRedirect : boolean = false

    // 유저네임 유효성 검사를 위한 정규 표현식: 영문자로 시작하고 최소 8자 이상
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{7,}$/;

    // 비밀번호 유효성 검사를 위한 정규 표현식
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/;


    const userID = formData.get("userID") as string;
    const password = formData.get("password") as string;
    const passwordCheck = formData.get("passwordCheck") as string;

    if (!userID) {
        return {errorCode: 'userID', message: '아이디를 입력해주세요'};
    }

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, { userID, password, passwordCheck });
        
        if (response.data.code === 400) {
            return response.data
        }
        
        shouldRedirect = true;

    } catch(e) {
        console.error(e)
        return {message: null}
    }

    if (shouldRedirect) {
        redirect('/')
    }

    return {message: null};
    
}