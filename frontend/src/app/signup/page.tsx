export default function SignUp() {
    return (
        <div id="wrap" className="signup">
            <div className="signup-warp">
                <h1>회원가입</h1>

                <div className="signup-content">
                    <ul>
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
