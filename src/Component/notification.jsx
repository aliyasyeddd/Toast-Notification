import { FiCheckCircle, FiInfo } from "react-icons/fi";
import { BiCommentError } from "react-icons/bi";
import { AiOutlineWarning } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { useState, useMemo, useEffect } from "react";
import "./notification.css";

/**
 * Notification Component
 *
 * @param {string} type - Type of notification ("success", "info", "error", "warning"). Default is "info".
 * @param {string} message - The message to display in the notification.
 * @returns {JSX.Element | null} - Returns the notification component if visible, otherwise null.
 */

// eslint-disable-next-line react/prop-types
function Notification({ type = "info", message = "", duration }) {
  // State to control visibility of the notification
  const [visible, setVisible] = useState(true);
  const [animationKey, setAnimationKey] = useState(Date.now());

  // Inline styles for the icon spacing
  const iconStyles = { marginRight: "10px" };

  useEffect(() => {
     // Reset visibility and animation when a new notification appears
    setVisible(true);
    setAnimationKey(Date.now());

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);// re-runs when the message or duration changes

  /**
   * Memoized object containing icons for different notification types.
   * Prevents unnecessary re-renders by keeping the object reference stable.
   */
  const icons = useMemo(
    () => ({
      success: (
        <FiCheckCircle className="icon success-icon" style={iconStyles} />
      ),
      info: <FiInfo className="icon info-icon" style={iconStyles} />,
      error: <BiCommentError className="icon error-icon" style={iconStyles} />,
      warning: (
        <AiOutlineWarning className="icon warning-icon" style={iconStyles} />
      ),
    }),
    [] // Dependencies array ensures memoization persists
  );

  // If the notification is not visible, do not render anything
  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      {/* Display the icon based on the notification type */}
      {icons[type]}

      {/* Display the message */}
      {message}

      {/* Close button to dismiss the notification */}
      <MdOutlineClose
        color={`${type}`} // Color is set dynamically based on the type
        className="closeBtn"
        onClick={() => setVisible(false)} // Hide notification when clicked
      />
      {/* Progress bar for auto-dismissal (handled via CSS animation) */}
      <div key={animationKey} className={`progress ${type}`}></div>
    </div>
  );
}

export default Notification;
