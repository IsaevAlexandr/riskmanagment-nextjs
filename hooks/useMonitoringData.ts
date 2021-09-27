import React from 'react';

import { eventGenerator } from '../utils/eventGenerator';

export const useMonitoringData = () => {
  const [generatedEvent, setState] = React.useState(eventGenerator());
  const timerRef = React.useRef<NodeJS.Timer | null>(null);

  const updateData = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setState(eventGenerator());

    timerRef.current = setTimeout(updateData, 5000);
  }, []);

  React.useEffect(() => {
    updateData();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { generatedEvent, updateData };
};
