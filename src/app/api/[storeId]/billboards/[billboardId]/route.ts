import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  {
    params: { billboardId, storeId },
  }: { params: { billboardId: string; storeId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { label, imageUrl } = body

    if (!label) {
      return new NextResponse("Missing name", { status: 400 })
    }

    if (!imageUrl) {
      return new NextResponse("Missing Image URL", { status: 400 })
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 })
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imageUrl,
      },
    })

    return new NextResponse(JSON.stringify(billboard), {
      status: 201,
    })
  } catch (error) {
    console.log(`[BILLBOARD_PATCH]`, error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  {
    params: { billboardId, storeId },
  }: { params: { billboardId: string; storeId: string } },
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 })
    }

    if (!billboardId) {
      return new NextResponse("Missing billboardId", { status: 400 })
    }

    if (!storeId) {
      return new NextResponse("Missing storeId", { status: 400 })
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

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: billboardId,
        storeId,
      },
    })

    return new NextResponse(JSON.stringify(billboard), {
      status: 201,
    })
  } catch (error) {
    console.log(`[BILLBOARD_DELETE]`, error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
