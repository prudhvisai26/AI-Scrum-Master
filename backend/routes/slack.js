const axios= require('axios')
const express=require('express')
const router=express.Router()

router.post("/standup",async(req,res)=>{
    const body={
        updates:req.body.text,
        user:req.body.user_name
    }
    try {
        // console.log("11", body);
        const aiResponse=await axios.post("http://localhost:8000/summary",body);
        const summary=aiResponse.data.summary;
        
        console.log(aiResponse.data)
        res.json({
            response_type:"in_channel",
            text:`🤖 *Summary for ${body.user}*:\n${summary}`
        })
    } catch (error) {
        console.error("AI service error",error.message);

        res.json({
            response_type:"ephemeral",
            text:"🚨 Something went wrong while summarizing your standup. Please try again."
        })
    }   
})

module.exports=router;  