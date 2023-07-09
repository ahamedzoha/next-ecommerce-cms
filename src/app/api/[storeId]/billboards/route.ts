import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    const body = await req.json()
    const { label, imageUrl } = body

    if (!label) {
      return new NextResponse("Missing label", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Missing Image URL", { status: 400 })
    }

    if (!storeId) {
      return new NextResponse("Missing Store ID", { status: 400 })
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    })

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    })

    return new NextResponse(JSON.stringify(billboard), {
      status: 201,
    })
  } catch (error) {
    console.log(`[BILLBOARD_POST]`, error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!storeId) {
      return new NextResponse("Missing Store ID", { status: 400 })
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    })

    return new NextResponse(JSON.stringify(billboards), {
      status: 200,
    })
  } catch (error) {
    console.log(`[BILLBOARD_GET]`, error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
