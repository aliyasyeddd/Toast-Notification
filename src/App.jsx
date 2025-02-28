import useNotification from "./Hooks/useNotification";
import "./App.css";

/**
 * App Component
 *
 * This component demonstrates the use of a toast notification system.
 * It provides buttons to trigger different types of notifications (Success, Info, Error, Warning).
 *
 * @returns {JSX.Element} The main application UI with notification functionality.
 */
function App() {
  // Destructure NotificationComponent and triggerNotification from the useNotification hook
  const { NotificationComponent, triggerNotification } =
    useNotification();

  return (
    <div className="main">
        {/* Render the notification component if a notification is active */}
      {NotificationComponent}
      <h1 className="title">Toast Component</h1>
       {/* Buttons to trigger different types of notifications */}
      <div className="btns">
        {/* Success Notification Button */}
        <button
          className="Success"
          onClick={() =>
            triggerNotification({
              type: "success",
              message: "Task Completed Successfully",
              duration: 3000,
            })
          }
        >
          Success
        </button>
         {/* Info Notification Button */}
        <button
          className="Info"
          onClick={() =>
            triggerNotification({
              type: "info",
              message: "Complete The task asap",
              duration: 3000,
            })
          }
        >
          Info
        </button>
         {/* Error Notification Button */}
        <button
          className="Error"
          onClick={() =>
            triggerNotification({
              type: "error",
              message: "Error: Something went wrong!",
              duration: 3000,
            })
          }
        >
          Error
        </button>
         {/* Warning Notification Button */}
        <button
          className="Warning"
          onClick={() =>
            triggerNotification({
              type: "warning",
              message: "Warning: Check your inputs!",
              duration: 3000,
            })
          }
        >
          Warning
        </button>
      </div>
    </div>
  );
}

export default App;
