const router = require("express").Router();
const User = require("../models/user");


const {authtoken}= require("./userauth");

//add book to favourite
router.put("./add-book-to-favorite", authtoken, async(req,res)=>{
    try{
        const {bookid}= req.headers;
        const userdata= await  User.findById(id);
        const isbookfav=userdata.favorite.includes(bookid);
        if(isbookfav){
            return res.status(200).json({message: " Book is already in favorites"});
        }
       
await User.findByIdAndUpdate(id, { $push : {favorite:bookid}});
return res.status(200).json({message: "Book added to favorites"});
    }
    catch(error){
        console.log(error);

return res.status(500).json({ message: "An error Occured"});
    }
});


//delete book from favorite 
router.put("./delete-book-to-favorite", authtoken, async(req,res)=>{
    try{
        const {bookid}= req.headers;
        const userdata= await  User.findById(id);
        const isbookfav=userdata.favorite.includes(bookid);
        if(isbookfav){
            await User.findByIdAndUpdate(id, { $pull : {favorite:bookid}});
            
        }
       

return res.status(200).json({message: "Book removed from favorites"});
    }
    catch(error){
        console.log(error);

return res.status(500).json({ message: "An error Occured"});
    }
});


//get favprite book from particular user 

router.get("./get-fav-book", authtoken, async(req,res)=>{
    try{
        const{id}= req.headers;

        const  userdata= await Book.findById(id).populate("favorite");
        const favoritebook= userdata.favorite;

        return res.json({
            status:"Success",
            data: favoritebook,

        })
       
     
    }
    catch(error){
      

return res.status(500).json({ message: "An error Occured"});
    }
});

module.exports= router;
