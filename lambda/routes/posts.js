const express = require('express');
const { fakerDE: faker } = require('@faker-js/faker');
const multer = require('multer');
const router = express.Router();

const generateDate = () => {
    const lastWeek = new Date(Date.now());
    lastWeek.setDate(lastWeek.getDate() - 7);

    return faker.date.between({
        from: lastWeek,
        to: Date.now(),
    });
}

// Multer 설정: 이미지 저장 위치와 파일명 정의
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // 파일이 저장될 경로
    },
    filename: function(req, file, cb) {
        // 파일명 설정: fieldname + timestamp + file extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// 파일 필터링: 이미지 파일만 허용
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else if (!file.originalname) {
        cb(null, false);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter })

const users = [
    {userID: 'elonmusk', image: faker.image.avatar(), type: 'faker'},
    {userID: 'zerohch0', image: faker.image.avatar(), type: 'faker'},
    {userID: 'leoturtle', image: faker.image.avatar(), type: 'faker'},
]

// const url = new URL(req.url)
// const cursor = parseInt(url.searchParams.get('cursor')) || 0


const posts = [];

router.get('/:lastId', async (req, res, ) => {
    const lastId = parseInt(req.params.lastId, 10) || 0

    const _posts = [
        {
            postId: lastId + 1,
            User: users[0],
            title: `lastId: ${lastId} test1111111111111111111`,
            content: `content 11111111111111111`,
            Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
            Hearts: [users[0], users[2]],
            Comments: [],
            createdAt: generateDate(),
        },
        {
            postId: lastId + 2,
            User: users[1],
            title: `lastId: ${lastId} test2222222222222222222222222222`,
            content: `content 2222222222222222222222222222 2222222222222222222222222222 `,
            Images: [{imageId: 2, link: faker.image.urlLoremFlickr()}],
            Hearts: [users[0]],
            Comments: [],
            createdAt: generateDate(),
        },
        {
            postId: lastId + 3,
            User: users[2],
            title: `lastId: ${lastId} testt333333333333`,
            content: `content 333333333333 333333333333333333333333333333333333333333333333 333333333333`,
            Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
            Hearts: [users[3]],
            Comments: [],
            createdAt: generateDate(),
        },
        {
            postId: lastId + 4,
            User: users[2],
            title: `lastId: ${lastId}testt333333333333`,
            content: `content 333333333333 333333333333333333333333333333333333333333333333 333333333333`,
            Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
            Hearts: [users[3]],
            Comments: [],
            createdAt: generateDate(),
        },
        {
            postId: lastId + 5,
            User: users[2],
            title: `${lastId} testt3333333333331`,
            content: `content 333333333333 333333333333333333333333333333333333333333333333 333333333333`,
            Images: [{imageId: 3, link: faker.image.urlLoremFlickr()}],
            Hearts: [users[3]],
            Comments: [],
            createdAt: generateDate(),
        }
    ];

    posts.push(..._posts)

    try {
        res.json(posts); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.get('/aside/list', async (req, res, ) => {
    
    let _posts = []
    _posts = posts.slice(0,5)

    try {
        res.json(_posts); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})


router.get('/search/result', async (req, res, ) => {
    const filteredPosts = posts.filter(post => post.title.includes(req.query.q));
    
    try {
        res.json(filteredPosts); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.get('/content/:id', async (req, res, ) => {
    
    const id = parseInt(req.params.id, 10)
    const filterPost = posts.find(post => post.postId === id)

    try {
        res.json(filterPost); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    const { userInfo, tit, con } = req.body;
    const imagePath = req.file ? req.file.path : '';
    
    const { name, image } = userInfo

    const newPost = {
        postId: posts.length + 1,
        User: { userID: name, image, type: 'uploads' },
        title: tit,
        content: con,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
        Hearts: [],
        Comments: [],
        createdAt: generateDate(),
    }

    posts.unshift(newPost)

    try {
        res.json(newPost); // 로그인 성공 응답
    } catch (e) {
        console.error(e)
        res.send('Not Allowed');
    }
})

module.exports = router;