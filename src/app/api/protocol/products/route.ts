import { NextRequest, NextResponse } from "next/server";
import {
  getAllProducts,
  getProductBySlug,
  getProductById,
  ProductRoute,
} from "@/core/product-router";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const productId = searchParams.get("productId");

    if (slug) {
      const product = getProductBySlug(slug);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    if (productId) {
      const product = getProductById(productId);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }

    // Return all products
    const products = getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Protocol products API error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}