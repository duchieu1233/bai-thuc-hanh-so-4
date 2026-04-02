const BlogPost = require('../models/BlogPost');

const getAllPosts = async (req, res) => {
    const posts = await BlogPost.find({}).sort({ _id: -1 });
    res.render('index', { posts });
};

const getCreateForm = (req, res) => {
    res.render('create');
};

const createPost = async (req, res) => {
    await BlogPost.create({
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
};
const getPostDetail = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
};


const getEditForm = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('edit', { post });
};

const updatePost = async (req, res) => {
    await BlogPost.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    });
    res.redirect('/');
};


const deletePost = async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/');
};


module.exports = {
    getAllPosts,
    getCreateForm,
    createPost,
    getPostDetail,
    getEditForm,
    updatePost,
    deletePost
};