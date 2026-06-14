interface ResultRow { label: string; value: string; highlight?: 'green' | 'red' | 'neutral' }
interface Props { rows: ResultRow[] }
export default function ResultCard({ rows }: Props) {
  return (
    <div className="mt-6 rounded-xl border border-[#1f1f1f] bg-[#111111] divide-y divide-[#1a1a1a]">
      {rows.map(({ label, value, highlight }) => (
        <div key={label} className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-[#888888]">{label}</span>
          <span
            className={`text-sm font-semibold tabular-nums ${
              highlight === 'green'
                ? 'text-[#22c55e]'
                : highlight === 'red'
                ? 'text-[#ef4444]'
                : 'text-white'
            }`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
