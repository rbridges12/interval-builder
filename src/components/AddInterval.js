import React from 'react';
import './AddInterval.css';


class AddInterval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            duration: '67',
            ftp_percent: '25',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert("Submission successful: " + this.state.duration);
        event.preventDefault();
    }

    handleInputChange(event) {
        console.log("change!");
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Duration:
                    <input
                        name="duration"
                        type="text"
                        value={this.state.duration}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    % FTP:
                    <input
                        name="ftp_percent"
                        type="text"
                        value={this.state.ftp_percent}
                        onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Add" />
            </form>
        );
    }

}

export default AddInterval;