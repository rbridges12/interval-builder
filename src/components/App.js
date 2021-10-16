import './App.css';
import ChartW from './ChartW';
import IntervalList from './IntervalList';
import { interpolateTurbo } from 'd3-scale-chromatic';
import AddInterval from './AddInterval';

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
  // console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        Interval Builder
      </header>
      <div className="IntervalDataContainer">
        <div className="IntervalList" >
          <IntervalList />
        </div>
        <div className="Chart">
          <ChartW
            data={data}
            spacing={3}
            svgWidth={600}
            svgHeight={500}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5
            }} />
        </div>
      </div>

      <div className="AddInterval">
        <AddInterval />
      </div>
    </div>
  );
}

export default App;
