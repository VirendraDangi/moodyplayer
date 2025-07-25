const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLICKEY,
    privateKey : process.env.IMAGEKIT_PRIVATECKEY,
    urlEndpoint : process.env.URL_ENDPOINT
});


function uploadfile(file){      // we created a function that is basically take a file and upload it on imagekit

    return new Promise((resolve, reject) => {      // but we dont know the file will upload or not so we use promise
        imagekit.upload({                         // ye promise return nahi callback return karti hai  karti isliye ik promise banana pada
            file : file.buffer, 
            fileName:"first file"
        },(error,result)=>{         // this will run when we got the response from image kit that our file is upload or not
           if(error){
            reject("upload error",error)
           }else{
            resolve(result)
           }
        })
    })
}

module.exports = uploadfile