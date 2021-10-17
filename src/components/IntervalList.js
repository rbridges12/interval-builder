import React from 'react';
import { useFlexLayout, useTable } from 'react-table';
import './IntervalList.css';


// TODO: make table rows clickable and editable, maybe also drag and droppable to reorder
// TODO: make table a fixed size and add a scroll bar
function IntervalList(props) {
    const data = React.useMemo(
        () => props.data, [props.data]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Duration',
                accessor: 'duration',
            },
            {
                Header: '% FTP',
                accessor: 'power',
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