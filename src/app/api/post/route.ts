import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Added 'category' and 'gradient' to the destructuring
    const { title, content, authorId, category, gradient } = body;

    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')     // Remove special chars
      .replace(/[\s_-]+/g, '-')     // Replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, '');     // Trim hyphens from ends
    
    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        category: category || "Engineering", // Default if not provided
        gradient: gradient || "from-blue-500 to-cyan-400", // Default style
        authorId: Number(authorId), 
        slug: generatedSlug,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    console.error("POST_API_ERROR:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { 
        author: {
          select: { name: true } // Just get the name for safety
        } 
      },
      orderBy: { createdAt: 'desc' } // Newest posts first
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}