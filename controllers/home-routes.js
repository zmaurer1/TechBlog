const router = require("express").Router()
const {Post, Comment, User} = require("../models/")

router.get("/", (req,res) =>{
    Post.findAll({
        attributes:[
            'id',
            'post_body',
            'title',
            'created_at'
        ],
        inclued: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['userName']
                }
            },
            {
                model: User,
                attributes: ['userName']
            }
        ]
    }).then((dbPostData) =>{
        const posts = dbPostData.map((post) =>{
            post.get({
                plain:true
            })
        })
        res.render("all-posts", {
            posts
            // loggedIn: req.sessions.loggedIn
        })
    }).catch((err) => {
        res.status(500).json(err)
    })
})
router.get("/post/:id", (req,res) => {
    Post.findByPk(req.params.id, {
        include:[User,{
            model:Comment,include:[User]
        }]
    }).then((dbPostData) =>{
        if(dbPostData){
            const post = dbPostData.get({
                plain:true
            })
            res.render("single-post", {
                post
            })
        }else{
            res.status(404).end()
        }
    }).catch((err) => {
        res.status(500).json(err)
    })
})
router.get("/login", (req,res) =>{
    if(req.session.loggedIn){
        res.redirect("/")
        return
    }
    res.render("login")
})
router.get("/signup", (req,res) =>{
    if(req.session.loggedIn){
        res.redirect("/")
        return
    }
    res.render("signup")
})
module.exports = router