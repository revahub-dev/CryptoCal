'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/liquidation',   label: 'Liquidation Price',  icon: '💥' },
  { href: '/pnl',           label: 'PnL Calculator',     icon: '📈' },
  { href: '/position-size', label: 'Position Size',       icon: '📐' },
  { href: '/risk-reward',   label: 'Risk / Reward',       icon: '⚖️' },
  { href: '/leverage',      label: 'Leverage',            icon: '🔧' },
  { href: '/break-even',    label: 'Break-Even Price',    icon: '🎯' },
  { href: '/funding-rate',  label: 'Funding Rate',        icon: '💰' },
  { href: '/dca',           label: 'DCA Calculator',      icon: '🔄' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 bg-[#111111] border-r border-[#1f1f1f] flex flex-col">
      <div className="px-5 py-5 border-b border-[#1f1f1f]">
        <span className="text-lg font-bold tracking-tight text-white">CryptoCal</span>
        <p className="text-xs text-[#888888] mt-0.5">Trading Calculators</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                active
                  ? 'bg-[#1a1a1a] text-white font-medium border-l-2 border-[#22c55e]'
                  : 'text-[#888888] hover:text-white hover:bg-[#161616]'
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-5 py-4 border-t border-[#1f1f1f]">
        <p className="text-xs text-[#555555]">For educational use only.</p>
      </div>
    </aside>
  );
}
