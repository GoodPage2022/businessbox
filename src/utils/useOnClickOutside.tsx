import { useEffect } from "react";

const useOnClickOutside = (
  ref: any,
  handler: any,
  className_1?: string,
  className_2?: string,
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (
        ref.current?.className == event.target.className ||
        ref.current?.contains(event.target) ||
        event.target.className == className_1 ||
        event.target.className == className_2
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
