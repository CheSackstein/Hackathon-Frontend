import logo from './logo.svg';
import './App.css';
import Scheduler from './components/Scheduler';
import moment from 'moment'
function App() {
  return (
    <div className="App">
      <Scheduler 
      startHour={moment().hours(9).minutes(0).seconds(0)}
      endHour={moment().hours(17).minutes(0).seconds(0)}
      availableHours={[[], [], [], [], [], [], []]}
      hospitalId="id_of_the_hospital"
      />
    </div>
  );
}

export default App;
