import React from 'react';
import './AddInterval.css';

function AddInterval(props) {
    return (
        <fieldset>
            <legend>Add Interval</legend>
            <form onSubmit={props.handleSubmit}>
                <label>
                    Duration:
                    <input
                        name="duration"
                        type="text"
                        className="duration" />
                </label>
                <br />
                <label>
                    Power:
                    <input
                        name="power"
                        type="text" />
                </label>
                <br />
                <input type="submit" value="Add" />
            </form>
        </fieldset>
    );
}

export default AddInterval;