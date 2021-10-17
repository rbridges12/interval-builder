import React from 'react';
import './AddInterval.css';

function AddInterval(props) {
    return (
        <fieldset>
            <legend>Add Interval Set</legend>
            <form onSubmit={props.handleSubmit}>
                <label>
                    On Duration:
                    <input
                        name="on_duration"
                        type="text" />
                </label>
                <br />
                <label>
                    On Power:
                    <input
                        name="on_power"
                        type="text" />
                </label>
                <br />
                <label>
                    Off Duration:
                    <input
                        name="off_duration"
                        type="text" />
                </label>
                <br />
                <label>
                    Off Power:
                    <input
                        name="off_power"
                        type="text" />
                </label>
                <br />
                <label>
                    Reps:
                    <input
                        name="reps"
                        type="text" />
                </label>
                <br />
                <input type="submit" value="Add" />
            </form>
        </fieldset>
    );
}

export default AddInterval;