import { useState } from "react";
import EventForm from "./components/EventForm";
import EventShow from './components/EventShow'
import { ToastContainer } from "react-toastify";


function App() {
   const [refreshTrigger, setRefreshTrigger] = useState(0);
    const handleEventAdded = () => {
    setRefreshTrigger((prev) => prev + 1); 
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <ToastContainer/>
      <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-white py-6">
        Mini Event Scheduler
      </h1>
      <EventForm onEventAdded={handleEventAdded} />
      <EventShow refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default App;




 
