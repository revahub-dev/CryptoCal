'use client';
import { useState } from 'react';
import CalcShell from '@/components/CalcShell';
import InputField from '@/components/InputField';
import ResultCard from '@/components/ResultCard';
import { calcPositionSize } from '@/lib/calculations';

export default function PositionSizePage() {
  const [account, setAccount] = useState('');
  const [risk, setRisk] = useState('');
  const [entry, setEntry] = useState('');
  const [sl, setSl] = useState('');

  const a = parseFloat(account);
  const r = parseFloat(risk);
  const ep = parseFloat(entry);
  const slp = parseFloat(sl);
  const valid = a > 0 && r > 0 && ep > 0 && slp > 0 && ep !== slp;
  const result = valid ? calcPositionSize(a, r, ep, slp) : null;

  const fmt2 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt6 = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });

  return (
    <CalcShell
      title="Position Size / Risk"
      description="Determine your safe position size based on your account size and risk tolerance."
    >
      <div className="grid gap-4">
        <InputField label="Account Size" value={account} onChange={setAccount} suffix="USD" />
        <InputField label="Risk %" value={risk} onChange={setRisk} suffix="%" placeholder="e.g. 2" />
        <InputField label="Entry Price" value={entry} onChange={setEntry} suffix="USD" />
        <InputField label="Stop Loss Price" value={sl} onChange={setSl} suffix="USD" />
      </div>
      {result && (
        <ResultCard
          rows={[
            { label: 'Risk Amount', value: `$${fmt2(result.riskAmount)}`, highlight: 'red' },
            { label: 'Position Size (USD)', value: `$${fmt2(result.positionSizeUSD)}`, highlight: 'neutral' },
            { label: 'Position Size (Base)', value: fmt6(result.positionSizeBase), highlight: 'neutral' },
          ]}
        />
      )}
    </CalcShell>
  );
}
