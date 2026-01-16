import { NextRequest } from "next/server";
import { RequestStatus } from "../../types/RequestStatus";
import { ProductService } from "./services/ProductService";

export const GET = async () => {
  try {
    const products = await ProductService.getProducts();
    return Response.json(
      { message: RequestStatus.SUCCESS, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();
    const product = await ProductService.addProduct(name);
    return Response.json(
      { message: RequestStatus.SUCCESS, data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
