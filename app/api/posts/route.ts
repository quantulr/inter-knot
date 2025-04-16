import {PrismaClient} from "@/prisma/prismaClient";
import {NextRequest} from "next/server";
import {z} from "zod";

const prisma = new PrismaClient();

export async function GET() {
    const posts = await prisma.post.findMany()
    return Response.json(posts)
}

const postSchema = z.object({
    title: z.string(),
    content: z.string(),
})

export async function POST(req: NextRequest) {
    const body = await req.json()
    const posts = postSchema.safeParse(body)
    if (!posts.success) {
        return Response.json({
            error: posts.error,
        }, {
            status: 400
        })
    }
    const result = await prisma.post.create({
        data: posts.data
    })
    return Response.json(result)
}
