import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = ({ ref, close }) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, close]);
}

/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter({ ref: wrapperRef, close: () => props.close() });

  return (
    <div ref={wrapperRef} style={props.style} className={props.className}>
      {props.children}
    </div>
  );
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired
};

export default OutsideAlerter;
