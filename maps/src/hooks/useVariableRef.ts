import { useEffect, useRef } from "react";

export default function useVariableRef<T>(variable: T) {
  const variableRef = useRef(variable);

  useEffect(() => {
    variableRef.current = variable;
  }, [variable]);

  return variableRef;
}
