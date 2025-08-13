const express=require("express")
const router= express.Router()

router.post("/standup",()=>{
    console.log("Standup Call Setup")
})

module.exports=router