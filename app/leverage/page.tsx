'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import InputField from '@/components/InputField';
import ResultCard from '@/components/ResultCard';
import { calcEffectiveLeverage } from '@/lib/calculations';

export default function LeveragePage() {
  const [posVal, setPosVal] = useState('');
  const [margin, setMargin] = useState('');

  const pv = parseFloat(posVal);
  const m = parseFloat(margin);
  const valid = pv > 0 && m > 0;
  const lev = valid ? calcEffectiveLeverage(pv, m) : null;

  return (
    <CalcShell
      title="Leverage Calculator"
      description="Calculate your effective leverage given position value and margin deposited."
    >
      <div className="grid gap-4">
        <InputField label="Position Value" value={posVal} onChange={setPosVal} suffix="USD" />
        <InputField label="Margin (Collateral)" value={margin} onChange={setMargin} suffix="USD" />
      </div>
      {lev != null && (
        <ResultCard
          rows={[
            {
              label: 'Effective Leverage',
              value: `${lev.toFixed(2)}×`,
              highlight: lev > 20 ? 'red' : lev > 10 ? 'neutral' : 'green',
            },
            {
              label: 'Margin %',
              value: `${((m / pv) * 100).toFixed(2)}%`,
              highlight: 'neutral',
            },
          ]}
        />
      )}
    </CalcShell>
  );
}
