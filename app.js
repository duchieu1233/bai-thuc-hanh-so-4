const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Kích hoạt thư mục public để nhận file CSS (Câu 10.1)
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/blogDB')
.then(() => console.log('Kết nối MongoDB thành công'))
.catch((error) => console.log(error));

// Câu 10.2: Sắp xếp bài mới lên trên bằng .sort({ _id: -1 })
app.get('/', async (req, res) => {
    const posts = await BlogPost.find({}).sort({ _id: -1 });
    res.render('index', { posts });
});

app.get('/blogposts/new', (req, res) => {
    res.render('create');
});

app.post('/blogposts/store', async (req, res) => {
    await BlogPost.create({
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
});

app.get('/blogposts/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
});

// Câu 10.3: Route mở form SỬA bài viết
app.get('/blogposts/edit/:id', async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('edit', { post });
});

// Câu 10.3: Route xử lý CẬP NHẬT bài viết
app.post('/blogposts/update/:id', async (req, res) => {
    await BlogPost.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
});

// Câu 10.3: Route xử lý XÓA bài viết
app.post('/blogposts/delete/:id', async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});