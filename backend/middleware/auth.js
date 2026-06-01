import jwt from "jsonwebtoken";

export function verificaToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //formato Bearer

    if(!token){
        return res.status(401).json({messaggio: "Manca token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.utente = decoded;
        next();
    }catch(err){
        return res.status(403).json({messaggio: "Token scaduto o non valido"});
    }
};

