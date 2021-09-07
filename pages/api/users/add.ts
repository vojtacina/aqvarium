
import prisma from "lib/clients/prisma"

export default async function (req, res) {
    console.log(req.body)
    if (req.body) {
        console.log("STARTED")
        const updateUser = await prisma.user.create({
            data: {
                username: req.body.username,
                password: req.body.password
            }
        })
        res.json(updateUser)
    }
    else {
        res.statusCode = 403;
        res.end("Error");
    }
    
}