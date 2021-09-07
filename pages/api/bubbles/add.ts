import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client";

const user = async function (req, res) {
    const session = await getSession({ req });
    const {title, image, city, userId} = req
    
    if (session) {
        await prisma.bubble.create({
            data: {
                userId: userId,
                title: title,
                image: image,
                city: city,
            },
        })
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }
    
}