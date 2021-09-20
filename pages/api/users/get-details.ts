
import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client";

export default async function (req, res) {
    const session = await getSession({ req });
    
    if (session) {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email,
            },
        })
        res.json(user)
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }
    
}