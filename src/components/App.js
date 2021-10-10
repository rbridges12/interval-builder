import './App.css';
import Chart from './Chart';
import ChartW from './ChartW';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        Interval Builder
        <ChartW
          svgWidth={500}
          svgHeight={400}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5
          }} />
      </header>
    </div>
  );
}

export default App;
