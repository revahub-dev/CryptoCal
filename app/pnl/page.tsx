'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import InputField from '@/components/InputField';
import DirectionToggle from '@/components/DirectionToggle';
import ResultCard from '@/components/ResultCard';
import { calcPnL } from '@/lib/calculations';

export default function PnLPage() {
  const [entry, setEntry] = useState('');
  const [exit_, setExit] = useState('');
  const [qty, setQty] = useState('');
  const [direction, setDirection] = useState<'long' | 'short'>('long');

  const ep = parseFloat(entry);
  const ex = parseFloat(exit_);
  const q = parseFloat(qty);
  const valid = ep > 0 && ex > 0 && q > 0;
  const result = valid ? calcPnL(ep, ex, q, direction) : null;

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalcShell
      title="PnL Calculator"
      description="Calculate your profit or loss from a trade given entry, exit, and position size."
    >
      <div className="grid gap-4">
        <DirectionToggle value={direction} onChange={setDirection} />
        <InputField label="Entry Price" value={entry} onChange={setEntry} suffix="USD" />
        <InputField label="Exit Price" value={exit_} onChange={setExit} suffix="USD" />
        <InputField label="Quantity" value={qty} onChange={setQty} placeholder="e.g. 0.5 BTC" />
      </div>
      {result && (
        <ResultCard
          rows={[
            {
              label: 'PnL (USD)',
              value: `${result.pnlUSD >= 0 ? '+' : ''}$${fmt(result.pnlUSD)}`,
              highlight: result.pnlUSD >= 0 ? 'green' : 'red',
            },
            {
              label: 'PnL (%)',
              value: `${result.pnlPercent >= 0 ? '+' : ''}${fmt(result.pnlPercent)}%`,
              highlight: result.pnlPercent >= 0 ? 'green' : 'red',
            },
          ]}
        />
      )}
    </CalcShell>
  );
}
