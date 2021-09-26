import { useState, useEffect } from 'react';

const useDebauncedValue = (input: string, time: number = 500) => {
  const [debauncedValue, setDebauncedValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebauncedValue(input);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);

  return debauncedValue;
};

export default useDebauncedValue;
