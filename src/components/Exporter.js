import React from 'react';
import './Exporter.css';

function toMRC(percent_data, filename) {
    // TODO: add options for all of these settings
    const units = "ENGLISH";
    const description = "a description";
    const timeUnit = "MINUTES";
    const powerUnit = "PERCENT";

    // file header
    let fileString = (
        "[COURSE HEADER]\nVERSION = 2\n" +
        "UNITS = " + units +
        "\nDESCRIPTION = " + description +
        "\nFILE NAME = " + filename +
        "\n" + timeUnit + " " + powerUnit +
        "\n[END COURSE HEADER]\n" +
        "[COURSE DATA]"
    );

    // file interval data
    let current_time = 0;
    for (const interval of percent_data) {

        // start of interval
        fileString += (
            "\n" + Number(current_time).toFixed(2)
            + "\t" + interval.power
        );
        current_time += interval.duration;

        // end of interval
        fileString += (
            "\n" + Number(current_time).toFixed(2)
            + "\t" + interval.power
        );
    }

    fileString += "\n[END COURSE DATA]\n";
    return fileString;
}

// TODO: add FTP here
function toERG(percent_data, ftp, filename) {
    const units = "ENGLISH";
    const description = "a description";
    const timeUnit = "MINUTES";
    const powerUnit = "WATTS";

    // file header
    let fileString = (
        "[COURSE HEADER]\nVERSION = 2\n" +
        "UNITS = " + units +
        "\nDESCRIPTION = " + description +
        "\nFILE NAME = " + filename +
        "\n" + timeUnit + " " + powerUnit +
        "\n[END COURSE HEADER]\n" +
        "[COURSE DATA]"
    );

    // file interval data
    let current_time = 0;
    for (const interval of percent_data) {
        let watts = (Number(interval.power) / 100) * Number(ftp);

        // start of interval
        fileString += (
            "\n" + Number(current_time).toFixed(2)
            + "\t" + watts.toFixed(2)
        );
        current_time += interval.duration;

        // end of interval
        fileString += (
            "\n" + Number(current_time).toFixed(2)
            + "\t" + watts.toFixed(2)
        );
    }
    fileString += "\n[END COURSE DATA]\n";
    return fileString;

}

function DownloadLink(props) {
    const { fileName, URL } = props;
    return (
        <a
            download={fileName}
            href={URL}
        >Download</a>
    );
}

class Exporter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: null,
            fileType: "mrc",
            ftp: null,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    getFileName() {
        return `${this.state.fileName}.${this.state.fileType}`;
    }

    getFileUrl() {
        const filename = this.getFileName();
        let fileString;
        if (this.state.fileType === "mrc") {
            fileString = toMRC(this.props.data, filename);
        }
        else {
            fileString = toERG(this.props.data, this.state.ftp, filename)
        }
        const blob = new Blob([fileString]);
        const DownloadUrl = URL.createObjectURL(blob);
        return DownloadUrl;
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        const name = this.getFileName();
        const url = this.getFileUrl();

        // only render FTP entry box if erg file type is selected
        let ftpBox = null;
        if (this.state.fileType === "erg") {
            ftpBox = (
                <input
                    type="text"
                    name="ftp"
                    placeholder="FTP"
                    onChange={this.handleChange}
                    value={this.state.ftp}
                />
            );
        }
  
        return (
            <fieldset>
                <span>Export Workout</span>
                <form>
                    <input
                        type="text"
                        name="fileName"
                        placeholder="File Name"
                        onChange={this.handleChange}
                        value={this.state.fileName}
                    />
                    <br />
                    <label>
                        File Type:
                        <select value={this.state.fileType}
                            name="fileType"
                            onChange={this.handleChange}>
                            <option value="mrc">.mrc</option>
                            <option value="erg">.erg</option>
                        </select>
                    </label>
                    <br />
                    {ftpBox}
                </form>
                <br />
                <DownloadLink
                    fileName={name}
                    URL={url} />
            </fieldset>
        );
    }

}

export default Exporter;