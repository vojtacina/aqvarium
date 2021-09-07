import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client";

export default async function (req, res) {
    const session = await getSession({ req });
    
    if (session) {
        const updateUser = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                name: req.body.name,
            },
        })
        res.json(updateUser)
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }
    
}