import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@/lib/mongodb";
import { isAdminLoggedIn } from "@/lib/adminAuth";

// GET - Get all orders
export async function GET() {
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

    const client = await clientPromise;
    const db = client.db(dbName);

    const orders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders.",
      },
      { status: 500 }
    );
  }
}

// POST - Create a new order
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

    const client = await clientPromise;
    const db = client.db(dbName);

    const body = await request.json();

    const {
      orderNumber,
      customer,
      items,
      subtotal,
      shipping,
      total,
      paymentStatus,
      orderStatus,
      shippingAddress,
    } = body;

    if (
      !orderNumber ||
      !customer ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      subtotal === undefined ||
      total === undefined ||
      !shippingAddress
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required order fields.",
        },
        { status: 400 }
      );
    }

    const existingOrder = await db
      .collection("orders")
      .findOne({ orderNumber });

    if (existingOrder) {
      return NextResponse.json(
        {
          success: false,
          message: "Order number already exists.",
        },
        { status: 409 }
      );
    }

    const order = {
      orderNumber,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
      },
      items: items.map((item: any) => ({
        productId: item.productId,
        name: item.name,
        image: item.image || "",
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      subtotal: Number(subtotal),
      shipping: Number(shipping || 0),
      total: Number(total),
      paymentStatus: paymentStatus || "Pending",
      orderStatus: orderStatus || "Pending",
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state || "",
        postalCode: shippingAddress.postalCode || "",
        country: shippingAddress.country || "Pakistan",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        order: {
          ...order,
          _id: result.insertedId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order.",
      },
      { status: 500 }
    );
  }
}