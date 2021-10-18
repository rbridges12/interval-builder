import './AddInterval.css';

function AddInterval(props) {
    return (
        <fieldset>
            <span>Add Interval</span>
            <form onSubmit={props.handleSubmit}>
                <input
                    name="duration"
                    placeholder="Duration"
                    type="text" />
                <br />
                <label>
                    <input
                        name="power"
                        placeholder="Power"
                        type="text" />
                </label>
                <br />
                <input type="submit" value="Add" />
            </form>
        </fieldset>
    );
}

export default AddInterval;