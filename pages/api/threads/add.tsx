import prisma from "lib/clients/prisma"
import { getSession } from "next-auth/client";

export default async function (req, res) {
    const session = await getSession({ req });
    const { bubbleId, userId, message, date } = req.body

    if (session) {
        await prisma.thread.create({
            data: {
                bubble: {
                    connect: {id: parseInt(bubbleId)}
                } ,
                messageUser: {
                    connect: {id: userId}
                } ,
                messageContent: message,
                date: date,
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