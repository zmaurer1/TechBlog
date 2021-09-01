const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../../models');
const Oauth = require("../../utils/auth")

router.get("/", (req, res) => {
    Comment.findAll().then(dbPostData => 
        res.json(dbPostData)
).catch(err => {
    res.status(500).json(err)
})
})

router.post("/", Oauth, (req, res) => {
    if(req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }).then(dbCommentData => res.json(dbCommentData)).catch(err => {
            res.status(500).json(err)
        })
    }
    
})
router.delete("/:id", Oauth, (req, res) => {
    Comment.destroy(
        
        {
            where: {
                id: req.params.id,
            }
        }
    ).then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({
                message: "no post found"
                
            })
            return
        }
        res.json(dbCommentData)
    }
        
).catch(err => {
    res.status(500).json(err)
})
})
module.exports = router