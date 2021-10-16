// Starter code taken from https://github.com/amberwebb/d3-charts/blob/master/src/App/index.js

import React, { useEffect, Fragment } from 'react';
import * as d3 from 'd3';
import { axisBottom, axisLeft, scaleLinear, select } from 'd3';
import { interpolateTurbo } from 'd3-scale-chromatic';


// Chart Utils
// TODO: put chart utils in different file?
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
    // .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
}

function createSvgGroup(svg, margin) {
    return svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
}

function clearSvg(svgClassName) {
    return select(`${svgClassName} svg`).remove()
}

function getColor(powerPercent) {
    let scaledPower = 0.2 + (powerPercent / 500);
    return interpolateTurbo(scaledPower);
}

// TODO: option for rounded corners on the bars
// TODO: make chart responsive
// TODO: add tooltips to bars that display interval data
function ChartW(props) {
    const { svgWidth, svgHeight, margin, data, spacing } = props;

    useEffect(() => {
        clearSvg('.svg-container');
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;
        const svg = createSvg('.svg-container', svgWidth, svgHeight);
        const group = createSvgGroup(svg, margin);
        const defaultSpacing = 3;
        const space = (spacing || defaultSpacing);

        const x = linearScale([0, width]);
        const y = linearScale([height, 0]);

        const xScaleValue = data.reduce((acc, curr) => {
            return acc + curr.duration + space;
        }, 0)

        const yScaleValue = data.map(datum => datum.power);

        x.domain([0, xScaleValue]);
        y.domain([0, d3.max(yScaleValue)]);

        // X axis
        // createXAxis(group, height, x);
        // Y axis
        // createYAxis(group, y);

        group
            .selectAll('bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', datum => getColor(datum.power))
            .attr('x', function (datum, i) {
                const xValues = data.map(datum => datum.duration);
                let values = [0, ...xValues];
                values = values.map((value, index) =>
                    values.slice(0, index + 1).reduce((a, b) => a + b + space)
                );
                return x(values[i]);
            })
            .attr('width', datum => x(datum.duration))
            .attr('y', datum => y(datum.power))
            .attr('height', datum => height - y(datum.power))
    }, [svgWidth, svgHeight, margin, data, spacing]);

    return (
        <Fragment>
            <div className="svg-container"></div>
        </Fragment>
    );
}

export default ChartW;