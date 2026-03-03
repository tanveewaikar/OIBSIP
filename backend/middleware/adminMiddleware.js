const adminMiddleware = (req,res,next)=>{
  if(!req.user){
    return res.staus(401).json({message: "Not authorized"})
  }
  if(req.user.role !== "admin"){
    return res.status(403).json({message : "Acess denied. Only Admin can access"})
  }
  next();
}

export default adminMiddleware;