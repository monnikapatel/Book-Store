const router = require("express").Router();
const User = require("../models/user");
const {authtoken}= require("./userauth");

 //add to cart 
 router.put("./add-to-cart", authtoken, async(req,res)=>{
    try{
        const{bookid}= req.headers;
        const{id}= req.headers;
        const userdata= await Book.findById(id);

        await User.findByIdAndUpdate(id, { $pull : {cart:bookid}});
    
            return res.json({
                status:"Succes",
                message: "Book is removed from Cart",
            });
        
    
       
     
    }
    catch(error){
      

return res.status(500).json({ message: "An error Occured"});
    }
});



//remove from cart or delet 
router.put("./remove-from-cart", authtoken, async(req,res)=>{
    try{
        const {bookid}= req.params;
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




//get cart of particular user
router.get("./get-user-cart", authtoken, async(req,res)=>{
    try{
        const{id}= req.headers;

        const  userdata= await Book.findById(id).populate("cart");
        const cart= userdata.cart.reverse();
        // reverse because jo data recent bheja vo top pe ajaye


        return res.json({
            status:"Success",
            data: cart,

        })
       
     
    }
    catch(error){
      

return res.status(500).json({ message: "An error Occured"});
    }
});



module.exports= router;
