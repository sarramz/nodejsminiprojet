const express =require('express');
const userRouter=require('./routes/user');
const app = express();

app.use(express.json());
app.use('/user',userRouter);

app.listen(6000,()=>{
    console.log("server listening on port 6000");
})