"use client"

import LoginButton from '../form/LoginButton'
import UserInfo from '../form/UserInfo'
import {Session} from "@auth/core/types";

type UserProps = {
    user: Session | null
}

const Header = ({user} : UserProps) => {
    
    return (
        <header className="header">
            <div className='header__inner'>
                <h1 className='logo'>W</h1>
                {!user ? <LoginButton /> : <UserInfo user={user} />}
            </div>
        </header>
    )
}

export default Header