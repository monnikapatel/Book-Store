const router = require("express").Router();
const User = require("../models/user");
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const {authtoken}= require("./userauth");



router.post("/Sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Validate username length
    if (username.length < 4) {
      return res.status(400).json({ message: "Username length should be more than 4" });
    }

    // Check if the username already exists
    const existingusername = await User.findOne({ username: username });
    if (existingusername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the email already exists
    const existingemail = await User.findOne({ email: email });
    if (existingemail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate password length
    if (password.length <= 5) {
      return res.status(400).json({ message: "Password length should be more than 5" });
    }
    const hashpass= await bcrypt.hash(password,10);


    // Create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashpass,
      address: address,
    });

    // Save the user to the database
    await newUser.save();
    return res.status(200).json({ message: "Signup Successful" });

  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/Sign-in", async (req, res) => {
 try{
const{ username, password}= req.body;
const existinguser= await User.findOne({username});
if(!existinguser){
  res.status(400).json({message: " Invalid credentials"});
}

await bcrypt.compare(password,existinguser.password,(err,data)=>{
  if(data){  
    const authClaims=[{name: existinguser.username},{
      role: existinguser.role
    },];     
                      // secret key : bookStore123
    const token = jwt.sign({authClaims},"bookStore123",{
      expiresIn:"30d",
    });
    res.status(200).json({
      id: existinguser._id,
      role: existinguser.role,
      token: token,
      });

  }
  // else{
  //   res.status(400).json({message: " Invalid credentials"});
  
  // }
})

 }
 catch(error){
  res.status(500).json({message: "Internal Server error"});

 }
});





// get user information

router.get("/get-user-info",authtoken, async (req, res) => {
  try{
const {id}= req.headers;
const data = await User.findById(id).select('-password ');
return res.status(200).json(data);

  }
  catch(error){
   res.status(500).json({message: "Internal Server error"});
 
  }
 });

// update router  - pull request

// router.put("/update-address", authtoken, async(req,res)=>{
//   try{
//     const {id}= req.headers;
//     const { address}= req.body;

//     await User.findByIdAndUpdate(id,{ address: address});;
    
//     return res.status(200).json({message:" Adress updated succesfully"});
    
//       }
//       catch(error){
//        res.status(500).json({message: "Internal Server error"});
     
//       }
     
// }); 
router.put("/update-address", authtoken, async (req, res) => {
  try {
    const { id } = req.headers; // Ensure the id is coming from the headers
    const { address } = req.body; // Address comes from the request body

    // Update the user's address
    await User.findByIdAndUpdate(id, { address: address });

    // Send success response
    return res.status(200).json({ message: "Address updated successfully" });
    
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router; 
