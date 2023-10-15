import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get("Authorization");
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    }else{
        const getRole = token.split('-')[0];
        let user = {};
        switch (getRole) {
            case "super":
                user = await prismaClient.user.findFirst({
                    where: {
                        token: token
                    }
                });
                break;

            case "admin":
                user = await prismaClient.admin.findFirst({
                    where: {
                        token: token
                    }
                });
                break;
        
            default:
                user = await prismaClient.doctor.findFirst({
                    where: {
                        token: token
                    }
                });
                break;
        }

        console.log("user isi:", user);
         
        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        }else{
            req.user = user;
            next();
        }
    }
}

// --> digunakan di route/api.js