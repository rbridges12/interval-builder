import './App.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function App() {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      "name": "d" + (i),
      "% FTP": 10 * i
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        Interval Builder
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            width={500}
            height={250}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 5
            }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="% FTP" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </header>
    </div>
  );
}

export default App;
