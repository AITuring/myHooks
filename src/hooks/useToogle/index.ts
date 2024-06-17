import { useState, useCallback } from "react";
const useToogle = (defaultValue: boolean) => {
  const [state, setState] = useState(defaultValue);

  const toggle = useCallback(() => setState(prev => !prev ), []);

  return { state, toggle};
};
export default useToogle;