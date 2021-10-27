import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client";

export default async function (req, res) {
    const session = await getSession({ req });
    
    if (session) {
        console.log(req.body)
        const updateUser = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                name: req.body.name,
                username: req.body.username,
                image: req.body.image,
                description: req.body.description,
                password: req.body.password
            },
        })
        res.json(updateUser)
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }
    
}