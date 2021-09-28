import React from 'react';

import { eventGenerator } from '../utils';

export const useMonitoringData = (timeout = 5000) => {
  const [generatedEvent, setState] = React.useState(eventGenerator());
  const timerRef = React.useRef<NodeJS.Timer | null>(null);

  const updateData = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setState(eventGenerator());

    timerRef.current = setTimeout(updateData, timeout);
  }, [timeout]);

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
