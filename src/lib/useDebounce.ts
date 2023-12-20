// This function is a custom hook that debounces a value. It takes in a value and a delay as parameters.
// The value is the input that we want to debounce and the delay is the time (in milliseconds) that we want to wait before updating the value.
// The function returns the debounced value.
import React from "react";

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
