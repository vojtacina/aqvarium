import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client";

export default async function (req, res) {
    const session = await getSession({ req });
    
    if (session) {
        const data = await prisma.bubble.findMany({
            orderBy: { 
                updatedAt: "desc"
            }
        })
        res.json(data)
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }
    
}