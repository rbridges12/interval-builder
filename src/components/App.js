import './App.css';
import ChartW from './ChartW';
import IntervalList from './IntervalList';
import AddInterval from './AddInterval';
import React from 'react';


function getTestData() {
  const data = [];
  for (let i = 1; i <= 50; i += 5) {
    data.push({
      duration: 60 - i,
      power: 10 * i,
    });
  }
  console.log(data);
  return data;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval_data: getTestData(),
    }
  }

  render() {
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
              data={this.state.interval_data}
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
          <div>
            <AddInterval />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
