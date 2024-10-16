import prisma from "@/lib/prisma"


export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            include:{
                user:{
                    select:{
                        name: true,
                        image: true
                    }
                }
            },
            
            orderBy: {createdAt: "desc"}
        })

        return posts
    } catch (error) {
        return null
    }
}
