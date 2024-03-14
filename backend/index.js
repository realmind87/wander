const express = require('express');
const session = require('express-session');

const app = express();
const port = 8080;

const userRoutes = require('./routes/users');

app.use(express.json()); // JSON 요청 본문을 파싱하기 위한 미들웨어

// 세션 설정
app.use(session({
    secret: 'your_secret_key', // 세션을 암호화하기 위한 비밀키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS를 사용하는 경우 true로 설정
}));

// 라우트 마운트
app.use('/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});