const { constants}=require("../constants")

const errorHandler=(err,req,res,next)=>{
    const statuscode=res.statuscode ? statuscode:500;
    switch (statuscode) {
        case constants.NOT_FOUND:
            res.json({title:"Not found",message: err.message, stackTrack:err.stack});
            break;
        
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation error",message: err.message, stackTrack:err.stack});
            break;

        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorized",message: err.message, stackTrack:err.stack});
            break;

        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message: err.message, stackTrack:err.stack});
            break;

        case constants.SERVER_ERRROR:
            res.json({title:"Server Error",message: err.message, stackTrack:err.stack});
            break;

        default:
            console.log("No Error. All Good!")
            break;
    }
};

module.exports=errorHandler;