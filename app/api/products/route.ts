import { ProductService } from "./services/ProductService";

export const GET = async () => {
  try {
    const products = await ProductService.getProducts();
    return Response.json(
      { message: "Products fetched successfully", data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
};
