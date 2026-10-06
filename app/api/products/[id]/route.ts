import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { isAdminLoggedIn } from "@/lib/adminAuth";
import clientPromise, { dbName } from "@/lib/mongodb";

async function connectDB() {
  const client = await clientPromise;

  await client.db(dbName).command({
    ping: 1,
  });

  return client;
}

// GET - Get one product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 }
      );
    }

    const client = await connectDB();
    const db = client.db(dbName);

    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product.",
      },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const loggedIn = await isAdminLoggedIn();

    if (!loggedIn) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      name,
      description,
      price,
      salePrice,
      category,
      image,
      stock,
      status,
    } = body;

    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      !image ||
      stock === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required product fields.",
        },
        { status: 400 }
      );
    }

    const client = await connectDB();
    const db = client.db(dbName);

    const updatedProduct = {
      name,
      description,
      price: Number(price),
      salePrice:
        salePrice !== undefined && salePrice !== ""
          ? Number(salePrice)
          : null,
      category,
      image,
      stock: Number(stock),
      status: status || "active",
      updatedAt: new Date(),
    };

    const result = await db.collection("products").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedProduct,
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product.",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const loggedIn = await isAdminLoggedIn();

    if (!loggedIn) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID.",
        },
        { status: 400 }
      );
    }

    const client = await connectDB();
    const db = client.db(dbName);

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product.",
      },
      { status: 500 }
    );
  }
}