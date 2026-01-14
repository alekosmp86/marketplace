type SummaryCardProps = {
    title: string;
    amount: number;
}

export default function SummaryCardPrice({ title, amount }: SummaryCardProps) {
  return (
    <div className='rounded-lg bg-white border border-neutral-200 p-4'>
      <span className='text-xs text-neutral-500'>{title}</span>
      <div className='text-2xl font-bold text-primary-700'>
        $ {amount}
      </div>
    </div>
  );
}
