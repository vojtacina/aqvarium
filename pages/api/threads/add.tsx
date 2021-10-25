import prisma from "lib/clients/prisma"
import filterText from "lib/TextFilter";
import { getSession } from "next-auth/client";

export default async function (req, res) {
    const session = await getSession({ req });
    const { bubbleId, userId, message, date } = req.body

    if (filterText(message) == true) {
        res.status(406).json({ message: "Text obsahuje slova, která porušují pravidla komunity. Pokud se to bude vícekrát opakovat, dojde k blokaci tvého účtu." })
        return
    }

    if (session) {
        await prisma.thread.create({
            data: {
                bubble: {
                    connect: { id: parseInt(bubbleId) }
                },
                messageUser: {
                    connect: { id: userId }
                },
                messageContent: message,
                date: date,
            },
        })
        

        // Get number of messages

        const numOfMessages = await prisma.thread.count({
            where: {
                bubbleId: parseInt(bubbleId)
            }
        })

       console.log(numOfMessages)

        await prisma.bubble.update({
            where: {
                id: parseInt(bubbleId)
            },
            data: {
                messages: numOfMessages,
                updatedAt: new Date()
            }
        })

        res.statusCode = 200;
        res.end()
    }
    else {
        res.statusCode = 403;
        res.end("Not signed in");
    }

}