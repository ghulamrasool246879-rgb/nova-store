
import { NextResponse } from "next/server";
import clientPromise, { dbName } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    await db.command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "MongoDB Atlas connected successfully!",
      database: db.databaseName,
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Connection failed. Check the server terminal.",
      },
      { status: 500 }
    );
  }
}