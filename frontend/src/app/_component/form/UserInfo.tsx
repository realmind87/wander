"use client"

import { useState, useRef, useEffect } from 'react';
import { BsPersonCircle } from 'react-icons/bs';

const UserInfo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    
    const handleClickOutside = (event: MouseEvent) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
          setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='user-area' ref={tooltipRef}>
            <button type="button" className='btn-user' onClick={() => setIsVisible(!isVisible)}>
                <BsPersonCircle size={32} color="#dfdfdf" />
            </button>
            {isVisible && (
                <div className='user-info'>
                    <ul>
                        <li>
                            <strong className='user-name'>User Name</strong>
                        </li>
                        <li>
                            <strong>팔로워</strong>
                            <span className='num'>0</span>
                        </li>
                        <li>
                            <strong>팔로우</strong>
                            <span className='num'>0</span>
                        </li>
                    </ul>

                    <button type="button" className="btn-login">로그아웃</button>
                </div>
            )}
            
        </div>
    )
}

export default UserInfo