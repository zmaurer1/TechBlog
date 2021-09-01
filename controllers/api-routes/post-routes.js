const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../../models');
const Oauth = require("../../utils/auth")

router.get("/", (req, res) => {
    Post.findAll({
        order: [["created_at", "DESC"]],
        attributes: [
            "id", "post_body",
            "title", "created_at"
        ],
        includes: [
            {
                model: Comment, 
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["userName"]
                }
            },
            {
                model: User,
                attributes: ["userName"]  
            }
        ]
    }).then(dbPostData => 
        res.json(dbPostData)
).catch(err => {
    res.status(500).json(err)
})
})

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id", "post_body",
            "title", "created_at"
        ],
        includes: [
            {
                model: Comment, 
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["userName"]
                }
            },
            {
                model: User,
                attributes: ["userName"]  
            }
        ]
    }).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({
                message: "no post found"
                
            })
            return
        }
        res.json(dbPostData)
    }
        
).catch(err => {
    res.status(500).json(err)
})
})

router.post("/", Oauth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    }).then(dbPostData => res.json(dbPostData)).catch(err => {
        res.status(500).json(err)
    })
})

router.put("/:id", Oauth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_body: req.body.post_body
        }, 
        {
            where: {
                id: req.params.id,
            }
        }
    ).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({
                message: "no post found"
                
            })
            return
        }
        res.json(dbPostData)
    }
        
).catch(err => {
    res.status(500).json(err)
})
})
router.delete("/:id", Oauth, (req, res) => {
    Post.destroy(
        
        {
            where: {
                id: req.params.id,
            }
        }
    ).then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({
                message: "no post found"
                
            })
            return
        }
        res.json(dbPostData)
    }
        
).catch(err => {
    res.status(500).json(err)
})
})
module.exports = router