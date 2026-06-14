interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
}
export default function InputField({ label, value, onChange, placeholder = '0', suffix }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#888888] mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#111111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#333333] placeholder-[#444444] pr-12"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#555555]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
