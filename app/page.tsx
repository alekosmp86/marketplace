import { Header } from "@/src/components/header/Header";
import { ProductList } from "@/src/components/product/ProductList";

export default function Home() {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <ProductList />
    </div>
  );
}
