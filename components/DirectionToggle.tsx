interface Props { value: 'long' | 'short'; onChange: (v: 'long' | 'short') => void }
export default function DirectionToggle({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#888888] mb-1.5 uppercase tracking-wider">
        Direction
      </label>
      <div className="flex rounded-lg overflow-hidden border border-[#1f1f1f]">
        {(['long', 'short'] as const).map((d) => (
          <button
            key={d}
            onClick={() => onChange(d)}
            className={`flex-1 py-3 text-sm font-medium transition-colors capitalize ${
              value === d
                ? d === 'long'
                  ? 'bg-[#22c55e]/10 text-[#22c55e]'
                  : 'bg-[#ef4444]/10 text-[#ef4444]'
                : 'bg-[#111111] text-[#555555] hover:text-[#888888]'
            }`}
          >
            {d === 'long' ? '▲ Long' : '▼ Short'}
          </button>
        ))}
      </div>
    </div>
  );
}
