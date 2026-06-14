'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import InputField from '@/components/InputField';
import ResultCard from '@/components/ResultCard';
import { calcFundingCost } from '@/lib/calculations';

export default function FundingRatePage() {
  const [posSize, setPosSize] = useState('');
  const [rate, setRate] = useState('0.01');
  const [hours, setHours] = useState('24');

  const ps = parseFloat(posSize);
  const r = parseFloat(rate);
  const h = parseFloat(hours);
  const valid = ps > 0 && !isNaN(r) && h > 0;
  const result = valid ? calcFundingCost(ps, r, h) : null;

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });

  return (
    <CalcShell
      title="Funding Rate Cost"
      description="Estimate the total funding rate cost of holding a perpetual futures position."
    >
      <div className="grid gap-4">
        <InputField label="Position Size" value={posSize} onChange={setPosSize} suffix="USD" />
        <InputField label="Funding Rate (per 8h)" value={rate} onChange={setRate} suffix="%" placeholder="0.01" />
        <InputField label="Duration" value={hours} onChange={setHours} suffix="hrs" placeholder="24" />
      </div>
      {result && (
        <ResultCard
          rows={[
            { label: 'Funding Periods', value: `${result.periods.toFixed(1)}`, highlight: 'neutral' },
            { label: 'Cost per Period', value: `$${fmt(result.costPerPeriod)}`, highlight: 'neutral' },
            {
              label: 'Total Funding Cost',
              value: `$${fmt(result.totalCost)}`,
              highlight: result.totalCost >= 0 ? 'red' : 'green',
            },
          ]}
        />
      )}
    </CalcShell>
  );
}
