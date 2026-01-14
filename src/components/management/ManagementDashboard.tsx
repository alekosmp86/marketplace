import { Grape } from "lucide-react";
import { Card, CardContent } from "../shared/Card";
import Link from "next/link";
import SectionHeader from "../shared/SectionHeader";

const CardItems = [
  {
    id: 1,
    label: "Products",
    href: "/management/products",
    icon: Grape,
  },
];

export default function ManagementDashboard() {
  return (
    <div className="bg-neutral-50 h-screen">
      <SectionHeader title="Gestión" />
      {CardItems.map((item) => (
        <Link key={item.id} href={item.href}>
          <Card className="m-4 border border-primary-50 bg-accent-400 shadow-md">
            <CardContent className="flex flex-row gap-2 justify-center items-center text-white">
              <item.icon />
              <h2>{item.label}</h2>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
