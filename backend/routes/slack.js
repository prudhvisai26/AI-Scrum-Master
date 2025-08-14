const express=require("express")
const router= express.Router()

router.post("/standup",(req,res)=>{
    const body={
        text:req.text,
        user_name:req.user_name
    }
    console.log(req.body,body   )

    res.send()

})

module.exports=router;