import { RefObject, useEffect } from "react";

import useVariableRef from "src/hooks/useVariableRef";

export default function useOnMouseDownOutside(ref: RefObject<HTMLElement>, handler: (e: MouseEvent) => void) {
  const handlerRef = useVariableRef(handler);

  useEffect(() => {
    const listener: EventListener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || (event.target instanceof HTMLElement && ref.current.contains(event.target))) {
        return;
      }

      handlerRef.current(event as MouseEvent);
    };

    document.addEventListener("mousedown", listener, { capture: true });
    document.addEventListener("touchstart", listener, { capture: true });

    return () => {
      document.removeEventListener("mousedown", listener, { capture: true });
      document.removeEventListener("touchstart", listener, { capture: true });
    };
  }, [ref, handlerRef]);
}
