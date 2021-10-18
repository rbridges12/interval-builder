import './AddInterval.css';

function AddInterval(props) {
    return (
        <fieldset>
            <span>Add Interval Set</span>
            <form onSubmit={props.handleSubmit}>
                <label>
                    <input
                        name="on_duration"
                        placeholder="On Duration"
                        type="text" />
                </label>
                <br />
                <label>
                    <input
                        name="on_power"
                        placeholder="On Power"
                        type="text" />
                </label>
                <br />
                <label>
                    <input
                        name="off_duration"
                        placeholder="Off Duration"
                        type="text" />
                </label>
                <br />
                <label>
                    <input
                        name="off_power"
                        placeholder="Off Power"
                        type="text" />
                </label>
                <br />
                <label>
                    <input
                        name="reps"
                        placeholder="Reps"
                        type="text" />
                </label>
                <br />
                <input type="submit" value="Add" />
            </form>
        </fieldset>
    );
}

export default AddInterval;