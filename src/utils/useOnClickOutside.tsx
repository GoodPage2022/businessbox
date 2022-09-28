import { useEffect } from "react";

const useOnClickOutside = (
  ref: any,
  handler: any,
  className_1?: string,
  className_2?: string,
  className_3?: string,
) => {
  useEffect(() => {
    const listener = (event: any) => {    
      const regex = new RegExp('header__input|header__search');

      if (
        event.target.className.toString().includes(ref.current?.className) ||
        ref.current?.contains(event.target) ||
        regex.test(event.target.className.toString())
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
