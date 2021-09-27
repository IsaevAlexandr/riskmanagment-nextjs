import { RiskFactor } from '../interfaces';

import { Risk } from '.prisma/client';

interface ReturnData {
  riskProbability: number;
  riskFactor: RiskFactor;
}

export const calculateCoordsForMatrix = (risk: Risk): ReturnData => {
  const probability_before = risk.probability_before ?? 0;
  const costs_recovery_before = risk.costs_recovery_before ?? 0;
  const time_recovery_before = risk.time_recovery_before ?? 0;

  let riskProbability = 0;
  let riskFactor: RiskFactor = 'e';

  // координата Y - вероятность возникновения, от 1 до 5
  if (probability_before > 0 && probability_before <= 0.05) riskProbability = 1;
  if (probability_before > 0.05 && probability_before <= 0.2) riskProbability = 2;
  if (probability_before > 0.2 && probability_before <= 0.5) riskProbability = 3;
  if (probability_before > 0.5 && probability_before <= 0.8) riskProbability = 4;
  if (probability_before > 0.8) riskProbability = 5;

  // координата Х - степень влияния / ущерб, от е до а
  let losses = time_recovery_before * 1000 + costs_recovery_before;
  if (losses > 0 && losses <= 0.5) riskFactor = 'e';
  if (losses > 0.5 && losses <= 3) riskFactor = 'd';
  if (losses > 3 && losses <= 30) riskFactor = 'c';
  if (losses > 30 && losses <= 300) riskFactor = 'b';
  if (losses > 300) riskFactor = 'a';

  return { riskProbability, riskFactor };
};
