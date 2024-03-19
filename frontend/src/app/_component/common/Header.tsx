import LoginButton from '../form/LoginButton'

const Header = () => {
    return (
        <header className="header">
            <div className='header__inner'>
                <h1 className='logo'>W</h1>
                <LoginButton />
            </div>
        </header>
    )
}

export default Header