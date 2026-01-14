export default function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="ml-4 pt-4 text-lg font-semibold text-primary-700">
      {title}
    </h2>
  );
}
