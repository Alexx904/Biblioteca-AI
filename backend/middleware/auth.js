import jwt from "jsonwebtoken";

export function verificaToken(req,res,next){
    const token = req.cookies?.accessToken;

    if(!token){
        return res.status(401).json({messaggio: "Manca token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.utente = decoded;
        next();
    }catch(err){
        return res.status(401).json({messaggio: "Token scaduto o non valido"});
    }
};

