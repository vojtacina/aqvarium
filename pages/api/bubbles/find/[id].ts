import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client"

export default async function (req, res) {
    const session = await getSession({ req });
    const { id } = req.query

    
    
    if (session) {
        const data = await prisma.bubble.findFirst({
            where: {
                id: parseInt(id)
            },
            include: {
                user: true,
                thread: {
                    include: {
                        messageUser: true
                    }
                }
            }
        })
        res.json(data)
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }
}