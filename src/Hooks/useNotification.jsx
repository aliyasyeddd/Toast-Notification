
import {useCallback, useState, useRef, useEffect} from "react";
import Notification from "../Component/notification";


/**
 * Custom Hook: useNotification
 *
 * This hook manages notifications by displaying them for a specific duration.
 * It handles:
 * - Displaying notifications dynamically
 * - Automatically dismissing notifications after a set time
 * - Preventing memory leaks by clearing timeouts on unmount
 *
 * @returns {object} An object containing:
 *  - `NotificationComponent`: The JSX component to render the notification.
 *  - `triggerNotification`: A function to trigger a new notification.
 */

const useNotification = () => {
  // State to store the active notification
  const [notification, setNotification] = useState(null);

    // useRef to persist the timeout ID across renders
  const timerRef = useRef(null);


   /**
   * Triggers a new notification with the given properties.
   * If a notification is already active, it resets the timer.
   *
   * @param {object} notificationProps - The notification properties.
   * @param {string} notificationProps.type - The type of notification ("success", "info", "error", "warning").
   * @param {string} notificationProps.message - The message to display.
   * @param {number} notificationProps.duration - Duration before auto-dismiss (in milliseconds).
   * @param {string} [notificationProps.position] - Optional position class (e.g., "top-left", "bottom-right").
   */

  const triggerNotification = useCallback((notificationProps) => {
    // Clear any existing timer to reset the duration
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

     // Set the new notification
    setNotification(notificationProps);

     // Set a timeout to automatically clear the notification after the duration
    timerRef.current= setTimeout(() => {
      setNotification(null);
    }, notificationProps.duration);
  }, []);

   
  /**
   * Cleanup function to clear any remaining timeout on unmount.
   * Prevents potential memory leaks.
   */
   useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);


   /**
   * Renders the notification component if one is active.
   * The `position` class is applied dynamically.
   */
  const NotificationComponent = notification ? (
    <div className={notification.position || "top-left"}>
      <Notification {...notification} />
    </div>
  ) : null;
 
  // Return the NotificationComponent and the function to trigger notifications
  return {NotificationComponent, triggerNotification};
  
}

export default useNotification;