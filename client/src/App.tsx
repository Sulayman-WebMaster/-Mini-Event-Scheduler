import EventForm from "./components/EventForm";
import EventShow from './components/EventShow'


function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-white py-6">
        Mini Event Scheduler
      </h1>
      <EventForm />
      <EventShow/>
    </div>
  );
}

export default App;
