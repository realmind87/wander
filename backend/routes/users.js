const express = require('express');
const bcrypt = require('bcrypt'); // 비밀번호 hash 구현
const jwt = require('jsonwebtoken');
const router = express.Router();

// 간단한 메모리 기반 사용자 저장소
const users = [];

// 로그인 라우트
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // 사용자 찾기
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).send('Cannot find user.');
    }

    try {
        // 비밀번호 비교
        if (await bcrypt.compare(password, user.password)) {

            // 세션 생성
            req.session.user = { username: user.username };

            // JWT 생성
            const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

            res.json({ message: 'Success', token }); // 로그인 성공 응답
        } else {
            res.send('Not Allowed'); // 비밀번호 불일치
        }
    } catch {
        res.status(500).send();
    }
})

// 회원가입
router.post('/register' , async (req, res) => {
    const { username, password } = req.body;

    // 유저네임 유효성 검사를 위한 정규 표현식: 영문자로 시작하고 최소 8자 이상
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{7,}$/;

    // 비밀번호 유효성 검사를 위한 정규 표현식
    // 최소 8자, 최소 하나의 대문자와 특수문자 포함
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

    // 입력 검증 (실제로는 더 강화된 검증 필요)
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // 유저네임 유효성 검사
    if (!usernameRegex.test(username)) {
        return res.status(400).send('Username must start with a letter and be at least 8 characters long.');
    }

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
        return res.status(400).send('Password must be at least 8 characters long and include at least one uppercase letter, one special character, and one number.');
    }

    // 중복 사용자
    const existingUser = users.find(user => user.username === username )
    if (existingUser) {
        return res.status(400).send('Username already exists')
    }


    // 비밀번호 해싱
    try {
        const saltRounds = 10; // 비밀번호 해싱의 복잡도 설정
        const hashedPassword = await bcrypt.hash(password, saltRounds); // 비밀번호 해싱

        // 사용자 저장
        const newUser = { username, password: hashedPassword };
        users.push(newUser);
        res.status(201).send(`User ${username} registered successfully`);

    } catch {
        res.status(500).send('Server error.');
    }
})

// 회원탈퇴
router.delete('/delete', async (req, res) => {
    const { username } = req.body;
    
    const token = req.headers['authorization'];

    // 토큰 없음
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    
    try {
        // 토큰 검증
        const decoded = jwt.verify(token, 'your_jwt_secret');

        // 사용자 찾기
        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(400).send('Cannot find user.');
        }

        // 로그인한 사용자와 삭제 요청한 사용자가 동일한지 확인
        if (decoded.username !== user.username) {
            return res.status(401).send('Unauthorized request.');
        }

        // 비밀번호 검증
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send('Invalid password.');
        }

        // 사용자 삭제
        const index = users.findIndex(u => u.username === username);
        users.splice(index, 1);

        res.send('User deleted successfully.');

    } catch(error) {
         // 토큰 검증 실패
        res.status(400).send('Invalid token.');
    }



})


// 모든 사용자 조회
router.get('/', (req, res) => {
    res.send('Retrieve all users');
});

router.post('/', (req, res) => {
    res.send('Create a new user');
});

// 특정 사용자 조회
router.get('/:userId', (req, res) => {
    res.send(`Retrieve user with ID: ${req.params.userId}`);
});

// 특정 사용자 업데이트
router.put('/:userId', (req, res) => {
    res.send(`Update user with ID: ${req.params.userId}`);
});

// 특정 사용자 삭제
router.delete('/:userId', (req, res) => {
    res.send(`Delete user with ID: ${req.params.userId}`);
});


module.exports = router;