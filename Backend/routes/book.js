const router = require("express").Router();
const User = require("../models/user");
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const Book= require("../models/book");

const {authtoken}= require("./userauth");

//add book = admin

router.post("./add-book", authtoken, async(req,res)=>{
    try{
        const {id}= req.headers;
     const user=   await User.findById(id);
if(user.role!=="admin"){
    return res.status(400).json({message: " you dont have access to perform admin activities"});
}
const book =new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,

    desc: req.body.desc,
    language: req.body.language,

});
await book.save();
res.status(200).json({message: "Book created successfully"});
    }
    catch(error){
return res.status(500).json({message: " Internla Server error"});;
    }
});


//update book
router.put("./update-book", authtoken, async(req,res)=>{
    try{
        const {bookid}= req.headers;
       await Book.findById(bookid,{
          title: req.body.title,
    author: req.body.author,
    price: req.body.price,

    desc: req.body.desc,
    language: req.body.language,
       });

await book.save();
res.status(200).json({message: "Book updated successfully"});
    }
    catch(error){
        console.log(error);

return res.status(500).json({ message: "An error Occured"});
    }
});



// delete book
router.delete("./delete-book", authtoken, async(req,res)=>{
    try{
        const {bookid}= req.headers;
       await Book.findByIdAndDelete(bookid)


res.status(200).json({message: "Book updated successfully"});
    }
    catch(error){
        console.log(error);

return res.status(500).json({ message: "An error Occured"});
    }
});



//get all books

router.get("./get-all-books", authtoken, async(req,res)=>{
    try{
        const books= await Book.find().sort({createdAt:-1});
        return res.json({
            status:"Success",
            data: books,

        })
       
     
    }
    catch(error){
      

return res.status(500).json({ message: "An error Occured"});
    }
});




//get recent books
router.get("./get-recent-books", authtoken, async(req,res)=>{
    try{
        const books= await Book.find().sort({createdAt:-1}).limit(4);
        return res.json({
            status:"Success",
            data: books,

        })
       
     
    }
    catch(error){
      

return res.status(500).json({ message: "An error Occured"});
    }
});


//api banani hai ke book ki detail fetch krne ke liye
router.get("./get-book-by-id", authtoken, async(req,res)=>{
    try{
        const{id}= req.params;

        const books= await Book.findById(id);
        
        return res.json({
            status:"Success",
            data: books,

        })
       
     
    }
    catch(error){
      

return res.status(500).json({ message: "An error Occured"});
    }
});
module.exports=router;
