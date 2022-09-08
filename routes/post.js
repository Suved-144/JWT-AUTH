const router = require("express").Router()
const verify = require("./verified")
router.get('/post',verify,(req,res)=>{

    res.json({
        posts:{
            title:"my first post",
            desc:"This post is created for JWT testing ,also for the access private post"
        }
    });
});

module.exports = router