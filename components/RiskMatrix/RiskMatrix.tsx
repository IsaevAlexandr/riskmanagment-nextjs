import { Card, CardContent, CardHeader, Popover, Stack, Typography } from '@mui/material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import React from 'react';

import { RiskFactor } from '../../interfaces';

import { Risk } from '.prisma/client';

interface Data {
  riskProbability: number;
  riskFactor: RiskFactor;
  risk: Risk;
}

const riskLevelColor: { [id: number]: string } = {
  0: '#00b050', // green
  1: '#9bca40', // light-green
  2: '#ffff00', // yellow
  3: '#ffc000', // orange
  4: '#ff0000', // red
};

const matrixColorSheme = [
  [2, 3, 3, 4, 4],
  [2, 2, 3, 3, 4],
  [1, 2, 2, 3, 3],
  [1, 1, 2, 2, 3],
  [0, 1, 1, 2, 2],
];

const allRisks: RiskFactor[] = ['e', 'd', 'c', 'b', 'a'];
const maxLevel = 5;

const levels: number[] = [];
for (let i = 1; i < maxLevel + 1; i++) {
  levels.push(i);
}

const rowTexts: { [id: number]: string } = {
  1: '>80%',
  2: '50%-80%',
  3: '20%-50%',
  4: '5%-20%',
  5: '<5%',
};

const columnText: { [id: number]: string } = {
  1: 'Очень низкий',
  2: 'Низкий',
  3: 'Средний',
  4: 'Высокий',
  5: 'Очень высокий',
};

interface RiskMatrixProps {
  data: Data[];
  cellWidth?: number;
}

const RiskInfoCard: React.FC<Risk> = ({ name, costs_recovery_before, probability_before }) => {
  return (
    <Card variant="outlined">
      <CardHeader title={name} />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body1">
            Текущий ущерб: <b>{costs_recovery_before}</b>
          </Typography>
          <Typography variant="body1">
            Вероятность возникновения: <b>{probability_before}</b>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ data, cellWidth = 50 }) => {
  return (
    <div
      className="riskmatrix"
      style={{
        gridTemplateColumns: `${cellWidth}px `.repeat(allRisks.length + 3),
      }}
    >
      {levels.reverse().map((level, i) => {
        return (
          <div
            key={i}
            className="riskmatrix__cell"
            style={{
              gridRow: maxLevel + 1,
              gridColumn: level + 2,
              width: cellWidth,
              height: cellWidth,
            }}
          >
            <div className="riskmatrix__risk riskmatrix__risk_color-black ">
              {allRisks[level - 1]}
            </div>
          </div>
        );
      })}
      {levels.reverse().map((level, i) => {
        return (
          <div
            key={i}
            className="riskmatrix__cell riskmatrix__cell_type-column"
            style={{
              gridRow: maxLevel + 2,
              gridColumn: level + 2,
              width: cellWidth,
              height: cellWidth,
            }}
          >
            {columnText[level]}
          </div>
        );
      })}
      {levels.map((level, i) => {
        return (
          <div
            key={i}
            className="riskmatrix__cell riskmatrix__cell_type-row"
            style={{
              gridRow: level,
              gridColumn: 2,
              width: cellWidth,
              height: cellWidth,
            }}
          >
            {rowTexts[level]}
          </div>
        );
      })}
      {matrixColorSheme.map((row, rowIndex) => {
        return row.map((cellcolor, colIndex) => {
          const match = data.filter(({ riskFactor, riskProbability }) => {
            if (
              maxLevel - riskProbability === rowIndex &&
              allRisks.findIndex((riskVal) => riskVal === riskFactor) === colIndex
            ) {
              return true;
            } else return false;
          });

          return (
            <div
              key={`${rowIndex}_${colIndex}`}
              className="riskmatrix__cell"
              style={{
                gridColumn: colIndex + 3,
                width: cellWidth,
                height: cellWidth,
                backgroundColor: riskLevelColor[cellcolor],
              }}
            >
              {match.length > 0 ? (
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <>
                      <button className="riskmatrix__risk" {...bindTrigger(popupState)}>
                        {match.length}
                      </button>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <Stack sx={{ p: 1 }} spacing={1}>
                          {match.map(({ risk }, i) => (
                            <RiskInfoCard {...risk} key={i} />
                          ))}
                        </Stack>
                      </Popover>
                    </>
                  )}
                </PopupState>
              ) : null}
            </div>
          );
        });
      })}
      <div className="riskmatrix__rowname" style={{ gridRow: Math.round(maxLevel / 2) }}>
        Вероятность возниковения
      </div>
      <div className="riskmatrix__columnname">Степень влияния/ущерб</div>
    </div>
  );
};
