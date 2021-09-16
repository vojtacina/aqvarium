import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client";

export default async function (req, res) {
    const session = await getSession({ req });
    const { title, image, city, userId } = req.body

    if (session) {
        await prisma.bubble.create({
            data: {
                userId: userId,
                title: title,
                image: image,
                city: city,
            },
        })
        res.statusCode = 200;
        res.end()
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }

}