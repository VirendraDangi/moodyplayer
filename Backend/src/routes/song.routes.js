const express = require("express"); 
const multer = require("multer");      // multer is middleware that is used to handle for form data or we can say that for file handling
const uploadfile = require("../service/storage.service");
const song = require("../models/song.model");

const upload = multer({storage:multer.memoryStorage()})  

const router = express.Router();   

router.post("/song",upload.single("audio"),async(req,res)=>{   // upload.single("audio")=> jis naam se file bej rahe hai wahi naam dena hota hai
         const filedata  =   await uploadfile(req.file)
          const {title,artist,mood} = req.body
          

         console.log(filedata);
    console.log(req.body);
    console.log(req.file);   // req.file mein file aati hai

      await song.create({
        title,
        artist,
         mood ,
        audio : filedata.url
      })


    res.json({
        message : "sucess"
    })
})


router.get("/song", async(req,res)=>{
    const {mood} = req.query           

    const songs = await song.find({
      mood:mood
    })

    res.json({
        message : "sucessfully find it",
        songs
    })
})

// router.get("/song")


module.exports = router       // by default express dosent know that we created the route so we need to use this in app.js file