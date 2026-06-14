'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import ResultCard from '@/components/ResultCard';
import { calcDCA, type DCAEntry } from '@/lib/calculations';

const emptyEntry = (): DCAEntry => ({ price: 0, amount: 0 });

export default function DCAPage() {
  const [entries, setEntries] = useState<Array<{ price: string; amount: string }}>([
    { price: '', amount: '' },
    { price: '', amount: '' },
  ]);

  const parsed: DCAEntry[] = entries.map((e) => ({
    price: parseFloat(e.price) || 0,
    amount: parseFloat(e.amount) || 0,
  }));

  const validEntries = parsed.filter((e) => e.price > 0 && e.amount > 0);
  const result = validEntries.length >= 1 ? calcDCA(validEntries) : null;

  const update = (i: number, field: 'price' | 'amount', val: string) => {
    setEntries((prev) => prev.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)));
  };

  const fmt2 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt6 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

  return (
    <CalcShell
      title="DCA Calculator"
      description="Calculate your average entry price across multiple buy orders."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3 mb-1">
          <span className="text-xs font-medium text-[#888888] uppercase tracking-wider">Price (USD)</span>
          <span className="text-xs font-medium text-[#888888] uppercase tracking-wider">Amount (USD)</span>
        </div>
        {entries.map((e, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={e.price}
              onChange={(ev) => update(i, 'price', ev.target.value)}
              placeholder="Buy price"
              className="bg-[#111111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#333333] placeholder-[#444444]"
            />
            <input
              type="number"
              value={e.amount}
              onChange={(ev) => update(i, 'amount', ev.target.value)}
              placeholder="USD amount"
              className="bg-[#111111] border border-[#1f1f1f] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#333333] placeholder-[#444444]"
            />
          </div>
        ))}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => setEntries((prev) => [...prev, { price: '', amount: '' }])}
            className="text-sm text-[#888888] hover:text-white border border-[#1f1f1f] hover:border-[#333333] rounded-lg px-4 py-2 transition-colors"
          >
            + Add Order
          </button>
          {entries.length > 2 && (
            <button
              onClick={() => setEntries((prev) => prev.slice(0, -1))}
              className="text-sm text-[#555555] hover:text-[#ef4444] border border-[#1f1f1f] rounded-lg px-4 py-2 transition-colors"
            >
              Remove Last
            </button>
          )}
        </div>
      </div>
      {result && (
        <ResultCard
          rows={[
            { label: 'Average Entry Price', value: `$${fmt2(result.averagePrice)}`, highlight: 'green' },
            { label: 'Total Invested', value: `$${fmt2(result.totalAmount)}`, highlight: 'neutral' },
            { label: 'Total Quantity', value: fmt6(result.totalQuantity), highlight: 'neutral' },
          ]}
        />
      )}
    </CalcShell>
  );
}
