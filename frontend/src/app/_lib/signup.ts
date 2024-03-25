"use server"

import {redirect} from "next/navigation";
import axios from "axios";
import {signIn} from '@/auth'

const Signup =  async (prevState: any, formData: FormData) => {
    
    let shouldRedirect : boolean = false

    // 유저네임 유효성 검사를 위한 정규 표현식: 영문자로 시작하고 최소 8자 이상
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{7,}$/;

    // 비밀번호 유효성 검사를 위한 정규 표현식
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/;
    
    const userID = formData.get("userID") as string;
    const password = formData.get("password") as string;
    const passwordCheck = formData.get("passwordCheck") as string;
    const avatar = formData.get("avatar");

    if (!userID || !userID.trim()) {
        return { code: 4001, message: '아이디를 입력해주세요' }
    }

    if (!usernameRegex.test(userID)) {
        return { code: 4002, message: '아이디 양식에 맞지 않습니다.' }
    }

    if (!password || !password.trim()) {
        return { code: 4003, message: '비밀번호 입력해주세요' }
    }

    if (!passwordRegex.test(password)) {
        return { code: 4004, message: '비밀번호 양식에 맞지 않습니다.' }
    }

    if (!passwordCheck || !passwordCheck.trim()) {
        return { code: 4005, message: '비밀번호 확인을 입력해주세요' }
    }
    
    if (password !== passwordCheck) {
        return { code: 4006, message: '비밀번호를 다시 확인해 주세요' }
    }
    
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`, formData);

        if (response.data.code === 4007) {
            return { code: 4007, message: '가입된 회원이 있습니다.' }
        }
        
        await signIn('credentials', {
            username: userID,
            password: password,
            redirect: false,
        })

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


export default Signup