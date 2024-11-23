const express=require('express');
const app= express();
const connectionToDb = require('./Database');
const book = require('./model/bookModel');
const { storage , multer } = require('./middleWare/multerConfig');

const fs= require('fs')//yo hami kunai pani file loi delete ya handle garna loi use garinxa
const upload =multer({storage : storage})//yele 



connectionToDb()




// if server side rendring vako ca vne
// #app.use(express.urlencoded({extended:true}))

// express le json bujhdain so frontend bat aako data loi handle garna loi tala ko code
app.use(express.json())

app.get("/",(req,res)=>{
    // console.log(req)
    res.status(200).json({
        "string": "hello world"
    })
})
// post the book
app.post("/book",upload.single('image'),async (req,res)=>{
    let imagePathForDb;
    if(!req.file){
        imagePathForDb="https://thumbs.dreamstime.com/b/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration-eps-335385751.jpg"

    }
    else{
         imagePathForDb ="http://localhost:3000/"+req.file.filename    }
  
  
    // destructuring of object
    const { bookName ,bookPrice ,isbNum,publishedAt,bookPublication,bookAuthorName,offer}=req.body
   await  book.create({
        bookName,
        bookPrice,
        isbNum,
        publishedAt,
        bookPublication,
        bookAuthorName,
        offer,
        imageUrl : imagePathForDb

    })
    res.status(201).json({
        message :"Book is created successfully"

    })
   
})
// get all the book 
app.get("/book", async (req,res)=>{
      books=await book.find()//return array of object
    res.status(200).json ({
        message :"successful",
        data  : books
    })
}
)
// get individual book having id
app.get("/book/:id", async (req,res)=>{
    const id=req.params.id
      books=await book.findById(id)//return object
    //   book.find({id : id})
       if(!book){
        req.status(404).json({
            message :"Book not found"
        })
       }
else{
    res.status(200).json ({
        message :"successful",
        data  : books
    })
}
})
// delete book
app.delete("/book/:id",async (req,res)=>{
    const id =req.params.id
    await book.findByIdAndDelete(id) //yele null return hanxa so

    res.status(200).json({
        message :"deleted !!"
    })
})
// update opreration 

app.patch("/book/:id",upload.single("image"),async (req,res)=>{

    const id = req.params.id
    const { bookName ,bookPrice ,isbNum,publishedAt,bookPublication,bookAuthorName,offer}=req.body


    const getOldImage = await book.findById(id)
    if(req.file){
        const oldImagePath= getOldImage.imageUrl
        const urlLength="http://localhost:3000/".length
      const  oldOriginalName =oldImagePath.slice(urlLength)
      console.log(oldOriginalName)
      fs.unlink(`./storage/${oldOriginalName}`, (err) => {
    if (err) {
     console.log(err);
    } else{

    console.log(`${oldImagePath} was deleted`);
    }
    });


    }
    let fileName ="http://localhost:3000/" + req.file.filename


    await book.findByIdAndUpdate(id,{//yele 2 ota parameter linca jasma  auta id and ke change garnuparo tyo loi object ma halne
        bookName,
        bookPrice,
        isbNum,
        publishedAt,
        bookPublication,
        bookAuthorName,
        offer,
        imageUrl : fileName

    })



   //yele chai direct website bata storage file ko access diyo
  res.status(200).json({
    message : "updated successfully"
  }
  )
})















   //yele chai direct website bata storage file ko access diyo
app.use(express.static("./storage/"))


 app.listen(3000,()=>{
        console.log("nodeJs projext is started at 3000 portnumber")
        
    });