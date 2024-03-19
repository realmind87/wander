import { BsPersonCircle } from 'react-icons/bs'
import LoginButton from '../form/LoginButton'
import UserInfo from '../form/UserInfo'


const Header = () => {
    return (
        <header className="header">
            <div className='header__inner'>
                <h1 className='logo'>W</h1>
                <UserInfo />
                {/* <LoginButton /> */}
            </div>
        </header>
    )
}

export default Header