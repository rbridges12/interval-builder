import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
};

// component for a cell containing a delete row button
const DeleteCell = ({
    row: { index },
    deleteData,
}) => {
    const onClick = () => {
        deleteData(index);
    }

    return <button onClick={onClick}>X</button>
};

const defaultColumn = {
    Cell: EditableCell,
};

const DND_ITEM_TYPE = "row";

const Row = ({ row, index, moveRow }) => {
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);

    const [, drop] = useDrop({
        accept: DND_ITEM_TYPE,
        hover(item, monitor) {
            if (!dropRef.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // determine rectangle on screen
            const hoverBoundingRect = dropRef.current.getBoundingClientRect()

            // get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // determine mouse position
            const clientOffset = monitor.getClientOffset();

            // get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            // wait to move row until the mouse has crossed half of the item's height

            // dragging downwards, less than half the item crossed
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // dragging upwards, less than half of the item crossed
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // now that all conditions are met, move the row
            moveRow(dragIndex, hoverIndex);

            // mutate the monitor item
            // this is ok for performance reasons?
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: DND_ITEM_TYPE,
        item: { type: DND_ITEM_TYPE, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    preview(drop(dropRef));
    drag(dragRef);

    return (
        <tr ref={dropRef} style={{ opacity }} {...row.getRowProps()}>
            <td ref={dragRef}>move</td>
            {row.cells.map(cell => {
                return (<td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                </td>);
            })}
        </tr>
    );
};

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
    const moveRow = (dragIndex, hoverIndex) => {
        // const dragRecord = records[dragIndex]
        console.log(`drag index: ${dragIndex}, hover index: ${hoverIndex}`)
    }

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
        <DndProvider backend={HTML5Backend}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th>Move</th>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, index) => {
                            prepareRow(row);
                            return (
                                <Row
                                    index={index}
                                    row={row}
                                    moveRow={moveRow}
                                />
                            )
                        })}
                </tbody>
            </table>
        </DndProvider>
    );
}

export default IntervalTable;