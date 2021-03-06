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

const DeleteAllCell = ({
    deleteAll,
}) => {
    const onClick = () => {
        deleteAll();
    }

    return <button className="deleteAll" onClick={onClick}>
        <i className="material-icons">delete_forever</i>
    </button>
}

const defaultColumn = {
    Cell: EditableCell,
};

const DND_ITEM_TYPE = "row";

const Row = ({
    row,
    index,
    moveRow
}) => {
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
            <td ref={dragRef} className="move">
                <span className="material-icons">drag_handle</span>
            </td>
            {row.cells.map(cell => {
                return (<td className={cell.column.id} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                </td>);
            })}
        </tr>
    );
};

// TODO: make table a fixed size and add a scroll bar
function IntervalTable(props) {
    const { data, updateData, deleteData, deleteAll, moveRow } = props;
    const columns = React.useMemo(
        () => [
            {
                Header: 'Duration (min)',
                accessor: 'duration',
            },
            {
                Header: 'Power (% FTP)',
                accessor: 'power',
            },
            {
                Header: DeleteAllCell,
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
            updateData,
            deleteData,
            deleteAll,
        },
        // useFlexLayout
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
                            <th></th>
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
                        (row, index) =>
                            prepareRow(row) || (
                                <Row
                                    key={index}
                                    index={index}
                                    row={row}
                                    moveRow={moveRow}
                                />
                            )
                    )}
                </tbody>
            </table>
        </DndProvider>
    );
}

export default IntervalTable;