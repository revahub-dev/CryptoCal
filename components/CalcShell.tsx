interface Props { title: string; description: string; children: React.ReactNode }
export default function CalcShell({ title, description, children }: Props) {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm text-[#888888] mt-1">{description}</p>
      </div>
      {children}
    </div>
  );
}
