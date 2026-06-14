'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import InputField from '@/components/InputField';
import ResultCard from '@/components/ResultCard';
import { calcRiskReward } from '@/lib/calculations';

export default function RiskRewardPage() {
  const [entry, setEntry] = useState('');
  const [sl, setSl] = useState('');
  const [tp, setTp] = useState('');

  const ep = parseFloat(entry);
  const slp = parseFloat(sl);
  const tpp = parseFloat(tp);
  const valid = ep > 0 && slp > 0 && tpp > 0;
  const result = valid ? calcRiskReward(ep, slp, tpp) : null;

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });

  return (
    <CalcShell
      title="Risk / Reward Ratio"
      description="Evaluate the quality of a trade setup by comparing potential risk vs reward."
    >
      <div className="grid gap-4">
        <InputField label="Entry Price" value={entry} onChange={setEntry} suffix="USD" />
        <InputField label="Stop Loss" value={sl} onChange={setSl} suffix="USD" />
        <InputField label="Take Profit" value={tp} onChange={setTp} suffix="USD" />
      </div>
      {result && (
        <ResultCard
          rows={[
            {
              label: 'R:R Ratio',
              value: `1 : ${result.ratio.toFixed(2)}`,
              highlight: result.ratio >= 2 ? 'green' : result.ratio >= 1 ? 'neutral' : 'red',
            },
            { label: 'Risk (price)', value: `$${fmt(result.risk)}`, highlight: 'red' },
            { label: 'Reward (price)', value: `$${fmt(result.reward)}`, highlight: 'green' },
          ]}
        />
      )}
    </CalcShell>
  );
}
