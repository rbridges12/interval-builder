import './App.css';
import ChartW from './ChartW';
import IntervalList from './IntervalList';
import AddInterval from './AddInterval';
import AddIntervalSet from './AddIntervalSet';
import React from 'react';


function getTestData() {
  const data = [];
  for (let i = 1; i <= 50; i += 5) {
    data.push({
      duration: 60 - i,
      power: 10 * i,
    });
  }
  return data;
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval_data: getTestData(),
    }

    this.handleIntervalAddition = this.handleIntervalAddition.bind(this);
    this.handleIntervalSetAddition = this.handleIntervalSetAddition.bind(this);
  }

  handleIntervalAddition(event) {
    const new_duration = Number(event.target.duration.value);
    const new_power = Number(event.target.power.value);
    const new_interval = {
      duration: new_duration,
      power: new_power,
    }
    this.setState(prevState => ({
      interval_data: [...prevState.interval_data, new_interval]
    }));
    event.preventDefault();
  }

  // TODO: option to exclude last rest
  handleIntervalSetAddition(event) {
    const target = event.target;
    const on_duration = Number(target.on_duration.value);
    const on_power = Number(target.on_power.value);
    const off_duration = Number(target.off_duration.value);
    const off_power = Number(target.off_power.value);
    const reps = Number(target.reps.value);

    let interval_set = [];
    for (let i = 0; i < reps; i++) {
      interval_set.push({
        duration: on_duration,
        power: on_power,
      });
      interval_set.push({
        duration: off_duration,
        power: off_power,
      });
    }

    this.setState(prevState => ({
      interval_data: [...prevState.interval_data, ...interval_set]
    }));
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Interval Builder
        </header>
        <div className="IntervalDataContainer">
          <div className="IntervalList" >
            <IntervalList data={this.state.interval_data} />
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

        <div className="AddIntervals">
          <div className="AddInterval">
            <AddInterval handleSubmit={this.handleIntervalAddition} />
          </div>
          <div className="AddIntervalSet">
            <AddIntervalSet handleSubmit={this.handleIntervalSetAddition} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
