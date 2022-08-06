const mongoose = require('mongoose');
const Post = require('./models/post');
const hostName = '127.0.0.1';
mongoose.connect(`mongodb://${hostName}/nodeblog_test_db`, {
    useNewURLParser : true,
    useUnifiedTopology:true
});


//Post.find({},(err,res)=> console.log(err,res))
// Post.findByIdAndUpdate("62cd39c53521e6086bb0040d",{title: "Emre"},(err,res)=>{
//     console.log(res);
// });

Post.find({title : "Emre"}, (err,res)=>{
    console.log(res);
})

// Post.create({
//     title : 'My First Blog Betüş3',
//     content : 'My First Blog Content',
    
// }, (error,post)=>{
//     console.log(error,post);
// })  