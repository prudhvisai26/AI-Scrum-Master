const express=require('express')
const cors=require('cors')
const slackRoutes=require('./routes/slack')

const app=express()
const PORT=process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/slack',slackRoutes)

app.listen(PORT,()=>{
    console.log(`Server started at the ${PORT}.`)
})


