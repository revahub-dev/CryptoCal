// --- 1. Liquidation Price ---
export function calcLiquidationPrice(
  entryPrice: number,
  leverage: number,
  direction: 'long' | 'short'
): number {
  if (direction === 'long') return entryPrice * (1 - 1 / leverage);
  return entryPrice * (1 + 1 / leverage);
}

// --- 2. PnL ---
export function calcPnL(
  entryPrice: number,
  exitPrice: number,
  quantity: number,
  direction: 'long' | 'short'
): { pnlUSD: number; pnlPercent: number } {
  const diff = direction === 'long' ? exitPrice - entryPrice : entryPrice - exitPrice;
  return { pnlUSD: diff * quantity, pnlPercent: (diff / entryPrice) * 100 };
}

// --- 3. Position Size / Risk ---
export function calcPositionSize(
  accountSize: number,
  riskPercent: number,
  entryPrice: number,
  stopLossPrice: number
): { positionSizeUSD: number; positionSizeBase: number; riskAmount: number } {
  const riskAmount = accountSize * (riskPercent / 100);
  const slDistance = Math.abs(entryPrice - stopLossPrice) / entryPrice;
  const positionSizeUSD = riskAmount / slDistance;
  return { positionSizeUSD, positionSizeBase: positionSizeUSD / entryPrice, riskAmount };
}

// --- 4. Risk / Reward ---
export function calcRiskReward(
  entryPrice: number,
  stopLossPrice: number,
  takeProfitPrice: number
): { ratio: number; risk: number; reward: number } {
  const risk = Math.abs(entryPrice - stopLossPrice);
  const reward = Math.abs(takeProfitPrice - entryPrice);
  return { ratio: reward / risk, risk, reward };
}

// --- 5. Leverage ---
export function calcEffectiveLeverage(positionValue: number, margin: number): number {
  return positionValue / margin;
}

// --- 6. Break-Even Price ---
export function calcBreakEven(
  entryPrice: number,
  takerFeePercent: number,
  direction: 'long' | 'short'
): number {
  const f = takerFeePercent / 100;
  if (direction === 'long') return (entryPrice * (1 + f)) / (1 - f);
  return (entryPrice * (1 - f)) / (1 + f);
}

// --- 7. Funding Rate Cost ---
export function calcFundingCost(
  positionSizeUSD: number,
  fundingRatePercent: number,
  hours: number
): { totalCost: number; costPerPeriod: number; periods: number } {
  const periods = hours / 8;
  const costPerPeriod = positionSizeUSD * (fundingRatePercent / 100);
  return { totalCost: costPerPeriod * periods, costPerPeriod, periods };
}

// --- 8. DCA Average Entry ---
export interface DCAEntry { price: number; amount: number }
export function calcDCA(entries: DCAEntry[]): {
  averagePrice: number;
  totalAmount: number;
  totalQuantity: number;
} {
  let totalAmount = 0;
  let totalQuantity = 0;
  for (const e of entries) {
    if (e.price > 0 && e.amount > 0) {
      totalAmount += e.amount;
      totalQuantity += e.amount / e.price;
    }
  }
  return {
    averagePrice: totalQuantity > 0 ? totalAmount / totalQuantity : 0,
    totalAmount,
    totalQuantity,
  };
}
