const multer=require("multer")
const storage= multer.diskStorage({
    destination : function(req,file,cb){//cb means callback(error,success)
        const allowedFileType = ["image/png","image/jpeg","image/jpg"]
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error("this type is not allowed to save"))
            
        }//else if(!(file.size<1000000)){
        //     cb(new Error("please upload file of size less than 1MB"))
        // }
        else
        {
            cb(null,"./storage")

        }
    
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + "-" +file.originalname)
    }

})
module.exports ={
    multer,storage
}