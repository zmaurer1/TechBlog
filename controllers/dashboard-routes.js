const router = require("express").Router()
const { Post, Comment, User } = require("../models/")
const Oauth = require("../utils/auth")

router.get("/", Oauth, (req,res) => {
    Post.findAll({
        where:{
            user_id:req.session.user_id
        },
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
    }).then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({
            plain:true
        }))
        res.render("dashboard", {
            layout:"main",
            posts,
            loggedIn:true
        })
    }).catch(err => {
        console.log(err)
        res.redirect("login")
    })
    router.get("/new-post", Oauth, (req, res) =>{
        res.render("new-post", {
            layout: "main",
            loggedIn: true
        })
    })

    router.get('/edit/:id', Oauth, (req, res) => {
        Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'post_body',
                'title',
                'created_at'
            ],
            include: [
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
        })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'No post found with this id!'});
                return;
            }
            const post = dbPostData.get({ plain: true});
            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
})
module.exports = router