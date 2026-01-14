import { NextRequest } from "next/server";
import { ProductService } from "../services/ProductService";
import { RequestStatus } from "../../types/RequestStatus";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const { name, price } = await req.json();
    await ProductService.updateProduct(id, name, price);
    return Response.json({ message: RequestStatus.SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    await ProductService.deleteProduct(id);
    return Response.json({ message: RequestStatus.SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: RequestStatus.ERROR }, { status: 500 });
  }
};
