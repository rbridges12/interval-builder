import './App.css';
import ChartW from './ChartW';
import IntervalTable from './IntervalTable';
import AddInterval from './AddInterval';
import AddIntervalSet from './AddIntervalSet';
import Exporter from './Exporter';
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
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleDeleteInterval = this.handleDeleteInterval.bind(this);
    this.handleMoveRow = this.handleMoveRow.bind(this);
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

  // TODO: add ramp interval
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

  handleDataChange(rowIndex, columnId, value) {
    let data = [...this.state.interval_data];
    let changed_item = { ...data[rowIndex] };

    if (columnId === "duration") {
      changed_item.duration = Number(value);
    }
    else if (columnId === "power") {
      changed_item.power = Number(value);
    }

    data[rowIndex] = changed_item;
    this.setState(prevState => ({
      interval_data: data,
    }));
  }

  handleDeleteInterval(rowIndex) {
    this.setState(prevState => ({
      interval_data: prevState.interval_data.filter((d, i) => i !== rowIndex),
    }));
  }

  handleMoveRow(sourceIndex, destIndex) {
    console.log(`Source: ${sourceIndex}\nDest: ${destIndex}`);
    let newData = this.state.interval_data.slice();
    let sourceData = newData[sourceIndex];
    newData.splice(sourceIndex, 1);
    newData.splice(destIndex, 0, sourceData)
    this.setState(prevState => ({
      interval_data: newData,
    }))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Interval Builder
        </header>
        <div className="IntervalDataContainer">
          <div className="IntervalTable" >
            <IntervalTable
              data={this.state.interval_data}
              updateData={this.handleDataChange}
              deleteData={this.handleDeleteInterval}
              moveRow={this.handleMoveRow}
            />
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
          <div className="Exporter">
            <Exporter
              data={this.state.interval_data}/>
          </div>
        </div>
      </div>


    );
  }
}

export default App;
