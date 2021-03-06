import { prisma } from "../../../../generated/prisma-client";


export default {
    Mutation: {
        deleteBlock: async(_, args, {request, isAuthenticated }) => {
            isAuthenticated(request);
            const {blockId} = args;

            const seats = await prisma.seats({
                where: {
                    block: {
                        id: blockId
                    }
                }
            })
            const seatsId = seats.map(item => item.id) 
            console.log(seats)

            seatsId.map(async(item, index) => {
            await prisma.deleteManySeats({
                    where: {
                        id: item[index]
                    }
                })
            })
            // await prisma.deleteBlock({ id: blockId })

            return true;
            
        }
    }
}