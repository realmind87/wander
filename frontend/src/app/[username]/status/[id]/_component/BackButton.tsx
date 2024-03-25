"use client"

import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation'

const BackButton = () => {

    const router = useRouter();
    
    return (
        <button type='button' onClick={() => router.push("/")}>
            <IoArrowBackSharp size={32} color="#000" />
        </button>
    )
}

export default BackButton;