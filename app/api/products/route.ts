import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import clientPromise, { dbName } from "@/lib/mongodb";
import { isAdminLoggedIn } from "@/lib/adminAuth";

async function connectDB() {
  const client = await clientPromise;

  await client.db(dbName).command({
    ping: 1,
  });
}

// GET - Get all products
export async function GET() {
  try {
    await connectDB();

    const client = await clientPromise;
    const db = client.db(dbName);

    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      { status: 500 }
    );
  }
}

// POST - Create a product
export async function POST(request: Request) {
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
    await connectDB();

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

    const client = await clientPromise;
    const db = client.db(dbName);

    const product = {
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("products").insertOne(product);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully.",
        product: {
          ...product,
          _id: result.insertedId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product.",
      },
      { status: 500 }
    );
  }
}