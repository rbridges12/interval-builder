// Starter code taken from https://github.com/amberwebb/d3-charts/blob/master/src/App/index.js

import React, { useEffect, Fragment } from 'react'
import * as d3 from 'd3'
import { axisBottom, axisLeft, scaleLinear, select } from 'd3';


// Chart Utils
function linearScale(rangeValues) {
    return scaleLinear().range(rangeValues)
}

function createYAxis(group, y) {
    return group.append('g').call(axisLeft(y))
}

function createXAxis(group, height, x) {
    return group
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(axisBottom(x))
}

function createSvg(svgClassName, svgWidth, svgHeight) {
    return select(svgClassName)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
}

function createSvgGroup(svg, margin) {
    return svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
}

function clearSvg(svgClassName) {
    return select(`${svgClassName} svg`).remove()
}

function ChartW(props) {
    const data = [
        {
            valueY: 10,
            valueX: 10,
            color: '#68d391',
        },
        {
            valueY: 20,
            valueX: 20,
            color: '#48bb78',
        },
        {
            valueY: 30,
            valueX: 30,
            color: '#38a169',
        },
    ];

    const { svgWidth, svgHeight, margin } = props;

    useEffect(() => {
        clearSvg('.svg-container');
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;
        const svg = createSvg('.svg-container', svgWidth, svgHeight);
        const group = createSvgGroup(svg, margin);

        const x = linearScale([0, width]);
        const y = linearScale([height, 0]);

        const xScaleValue = data.reduce((acc, curr) => {
            return acc + curr.valueX;
        }, 0)

        const yScaleValue = data.map(datum => datum.valueY);

        x.domain([0, xScaleValue]);
        y.domain([0, d3.max(yScaleValue)]);

        // X axis
        createXAxis(group, height, x);
        // Y axis
        createYAxis(group, y);

        group
            .selectAll('bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', datum => datum.color)
            .attr('x', function (datum, i) {
                const xValues = data.map(datum => datum.valueX);
                let values = [0, ...xValues];
                values = values.map((value, index) =>
                    values.slice(0, index + 1).reduce((a, b) => a + b)
                );
                return x(values[i]);
            })
            .attr('width', datum => x(datum.valueX))
            .attr('y', function (datum) {
                return y(datum.valueY);
            })
            .attr('height', function (datum) {
                return height - y(datum.valueY);
            })
    }, [svgWidth, svgHeight, margin]);
    return (
        <Fragment>
            <h1 className="text-2xl text-center">{"Title"}</h1>
            <div className="svg-container"></div>
        </Fragment>
    );
}

export default ChartW;