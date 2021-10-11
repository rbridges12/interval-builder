import React from 'react';
import { useFlexLayout, useTable } from 'react-table';
import './IntervalList.css';


function IntervalList() {
    const data = React.useMemo(
        () => [
            {
                col1: '5:00',
                col2: 50,
            },
            {
                col1: '10:00',
                col2: 120,
            },
            {
                col1: '5:00',
                col2: 80,
            },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Duration',
                accessor: 'col1',
            },
            {
                Header: '% FTP',
                accessor: 'col2',
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data }, useFlexLayout);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                        </tr>
                    ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    );
}

export default IntervalList;