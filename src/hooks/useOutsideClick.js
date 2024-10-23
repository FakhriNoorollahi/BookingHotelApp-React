import { useEffect } from "react";

function useOutsideClick(ref, exceptionId, cb) {
  useEffect(() => {
    function checkClicked(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ) {
        cb();
      }
    }
    // add an event listener
    document.addEventListener("mousedown", (event) => {
      checkClicked(event);
    });
    // cleanup
    return () => {
      document.removeEventListener("mousedown", checkClicked);
    };
  }, []);
}

export default useOutsideClick;
