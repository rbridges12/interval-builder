import React from 'react';
import { useFlexLayout, useTable } from 'react-table';
import './IntervalTable.css';


// Cell component that displays editable data
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateData,
}) => {
    const [value, setValue] = React.useState(initialValue);
    const onChange = e => {
        setValue(e.target.value);
    };
    const onBlur = () => {
        updateData(index, id, value);
    };

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return <input value={value} onChange={onChange} onBlur={onBlur} />;
}

// component for a cell containing a delete row button
const DeleteCell = ({
    row: { index },
    deleteData,
}) => {
    const onClick = () => {
        deleteData(index);
    }

    return <button onClick={onClick}>X</button>
}

const defaultColumn = {
    Cell: EditableCell,
}

// TODO: drag and droppable to reorder
// TODO: make table a fixed size and add a scroll bar
function IntervalTable(props) {
    // const updateData = props.updateData;
    // const deleteData = props.deleteData;
    // const data = React.useMemo(
    //     () => props.data, [props.data]);
    const { data, updateData, deleteData } = props;
    // const [records, setRecords] = React.useState(data);

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
    // const moveRow = (dragIndex, hoverIndex) => {
    //     // const dragRecord = records[dragIndex]
    //     console.log(`drag index: ${dragIndex}, hover index: ${hoverIndex}`)
    // }

    const tableInstance = useTable(
        {
            columns,
            data,
            defaultColumn,
            updateData,
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

    // render table
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

export default IntervalTable;