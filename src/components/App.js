import './App.css';
import Chart from './Chart';
import ChartW from './ChartW';
import { interpolateTurbo } from 'd3-scale-chromatic';

function getColor(powerPercent) {
  let scaledPower = 0.2 + (powerPercent / 500);
  return interpolateTurbo(scaledPower);
}

function App() {
  const data = [];
  for (let i = 1; i <= 50; i += 5) {
    data.push({
      valueY: 10 * i,
      valueX: 60 - i,
      color: getColor(10 * i),
    });
  }
  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        Interval Builder
        <ChartW
          data={data}
          spacing={1}
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
