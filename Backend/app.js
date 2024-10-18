const express= require("express")
const app = express();
 
require('dotenv').config();
require("./conn/conn");
const User = require("./routes/user");
const Book= require("./routes/book")
const Cart= require("./routes/cart")
const Favorite= require("./routes/favorite")
const Orders= require("./routes/order")
app.use(express.json());

app.use("/api/v1",User);
app.use("/api/v1",Book);
app.use("/api/v1",Favorite);
app.use("/api/v1",Cart);
app.use("/api/v1",Orders);


// app.get("/",(req,res)=>{
//     res.send("Hello this is backend")
// })


//craetting post;
app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}`);
});
 