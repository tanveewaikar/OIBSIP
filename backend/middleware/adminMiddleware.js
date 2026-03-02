const adminMiddleware = (req,res,next)=>{
  if(!req.user){
    return res.staus(401).json({message: "Not authorized"})
  }
  if(req.user.role !== "admin"){
    return res.status(403).json({message : "Acess denied. Admin only"})
  }
  next();
}

export default adminMiddleware;