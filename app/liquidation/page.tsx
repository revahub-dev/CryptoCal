'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import InputField from '@/components/InputField';
import DirectionToggle from '@/components/DirectionToggle';
import ResultCard from '@/components/ResultCard';
import { calcLiquidationPrice } from '@/lib/calculations';

export default function LiquidationPage() {
  const [entry, setEntry] = useState('');
  const [leverage, setLeverage] = useState('');
  const [direction, setDirection] = useState<'long' | 'short'>('long');

  const ep = parseFloat(entry);
  const lev = parseFloat(leverage);
  const valid = ep > 0 && lev > 1;
  const liqPrice = valid ? calcLiquidationPrice(ep, lev, direction) : null;
  const distance = liqPrice != null ? Math.abs(((liqPrice - ep) / ep) * 100) : null;

  return (
    <CalcShell
      title="Liquidation Price"
      description="Calculate the price at which your position gets liquidated given your entry and leverage."
    >
      <div className="grid gap-4">
        <DirectionToggle value={direction} onChange={setDirection} />
        <InputField label="Entry Price" value={entry} onChange={setEntry} suffix="USD" />
        <InputField label="Leverage" value={leverage} onChange={setLeverage} suffix="×" />
      </div>
      {liqPrice != null && (
        <ResultCard
          rows={[
            {
              label: 'Liquidation Price',
              value: `$${liqPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              highlight: direction === 'long' ? 'red' : 'green',
            },
            {
              label: 'Distance to Liquidation',
              value: `${distance!.toFixed(2)}%`,
              highlight: 'neutral',
            },
          ]}
        />
      )}
    </CalcShell>
  );
}
