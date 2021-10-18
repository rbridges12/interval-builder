import React from 'react';
import { useFlexLayout, useTable } from 'react-table';
import './IntervalList.css';


const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
}) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = e => {
        setValue(e.target.value);
    };
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return <input value={value} onChange={onChange} onBlur={onBlur} />;
}

const DeleteCell = ({
    row: { index },
    deleteData,
}) => {
    const onClick = () => {
        deleteData(index);
    }

    // return <span onClick={onClick}>Delete</span>;
    return <button onClick={onClick}>X</button>
}

const defaultColumn = {
    Cell: EditableCell,
}

// TODO: make table rows clickable and editable, maybe also drag and droppable to reorder
// TODO: make table a fixed size and add a scroll bar
function IntervalList(props) {
    const updateMyData = props.updateMyData;
    const deleteData = props.deleteData;
    const data = React.useMemo(
        () => props.data, [props.data]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Duration',
                accessor: 'duration',
            },
            {
                Header: 'Power',
                accessor: 'power',
            },
            {
                Header: "Delete",
                id: 'delete',
                accessor: "delete",

                Cell: DeleteCell,
            },
        ],
        []
    );

    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn,
            updateMyData,
            deleteData,
        },
        useFlexLayout
    );
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
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
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