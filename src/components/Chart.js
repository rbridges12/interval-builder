import './Chart.css';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { interpolateTurbo } from 'd3-scale-chromatic';

function getColor(powerPercent) {
    let scaledPower = 0.2 + (powerPercent / 500);
    return interpolateTurbo(scaledPower);
}

function Chart() {

    const data = [];
    for (let i = 0; i <= 50; i += 2.5) {
        data.push({
            "name": "d" + (i),
            "powerPercent": 10 * i
        });
    }

    return (
        // <ResponsiveContainer width="100%" height="100%">
        <div className="Chart">
            <ResponsiveContainer width={700} height={400}>
                <BarChart
                    data={data}
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
                    <Bar
                        dataKey="powerPercent"
                        fill="#8884d8" >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`}
                                fill={getColor(entry.powerPercent)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
}

export default Chart;