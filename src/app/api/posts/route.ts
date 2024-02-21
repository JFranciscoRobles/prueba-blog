import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { Prisma } from "@prisma/client";

export type PageInfo = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const post = await db.post.create({
      data: body,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[POST_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const extendDb = db.$extends(findManyAndCount);
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId") || undefined;
  const Published = Boolean(searchParams.get("Published")) || undefined;
  const offset = Number(searchParams.get("page")) || undefined;
  const limit = Number(searchParams.get("limit")) || undefined;
  const search = searchParams.get("search") || undefined;

  try {
    const posts = await extendDb.post.findManyAndCount({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        Published,
        userId: userId,
        OR: [
          {
            title: {
              contains: search?.replace(/[\s\n\t]/g, '_'),
            },
          },
          {
            content: {
              contains: search?.replace(/[\s\n\t]/g, '_'),
            },
          },
          {
            author: {
              name: {
                contains: search?.replace(/[\s\n\t]/g, '_'),
              },
            },
          },
        
        ],
      },
      
      take: limit || 4,
      skip: offset || 0,
      orderBy: {
        publishedAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log("[GET_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


const findManyAndCount = {
  model: {
    $allModels: {
      async findManyAndCount<Model, Args>(
        this: Model,
        args: Prisma.Exact<Args, Prisma.Args<Model, 'findMany'>>
      ): Promise<{ data: Prisma.Result<Model, Args, 'findMany'>; paginationInfo: PageInfo }> {
        const { skip, take, ...otherArgs } = args as any;

        
        const [data, count] = await db.$transaction([
          (this as any).findMany({ ...otherArgs, skip, take }), 
          (this as any).count({ where: (args as any).where }),
        ]);

    
        const paginationInfo = {
          totalItems: count,
          itemsPerPage: take || 10,
          currentPage: skip ? Math.floor(skip / (take || 10)) + 1 : 1,
          totalPages: take ? Math.ceil(count / (take || 10)) : 1,
        };

        return { data, paginationInfo  } as any;
      },
    },
  },
}