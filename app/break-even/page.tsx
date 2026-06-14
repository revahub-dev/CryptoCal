'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import InputField from '@/components/InputField';
import DirectionToggle from '@/components/DirectionToggle';
import ResultCard from '@/components/ResultCard';
import { calcBreakEven } from '@/lib/calculations';

export default function BreakEvenPage() {
  const [entry, setEntry] = useState('');
  const [fee, setFee] = useState('0.1');
  const [direction, setDirection] = useState<'long' | 'short'>('long');

  const ep = parseFloat(entry);
  const f = parseFloat(fee);
  const valid = ep > 0 && f >= 0;
  const be = valid ? calcBreakEven(ep, f, direction) : null;
  const diff = be != null ? Math.abs(((be - ep) / ep) * 100) : null;

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalcShell
      title="Break-Even Price"
      description="Find the exit price at which your trade breaks even after accounting for trading fees."
    >
      <div className="grid gap-4">
        <DirectionToggle value={direction} onChange={setDirection} />
        <InputField label="Entry Price" value={entry} onChange={setEntry} suffix="USD" />
        <InputField label="Taker Fee" value={fee} onChange={setFee} suffix="%" placeholder="0.1" />
      </div>
      {be != null && (
        <ResultCard
          rows={[
            {
              label: 'Break-Even Price',
              value: `$${fmt(be)}`,
              highlight: 'neutral',
            },
            {
              label: 'Fee Distance',
              value: `${diff!.toFixed(4)}%`,
              highlight: 'neutral',
            },
          ]}
        />
      )}
    </CalcShell>
  );
}
