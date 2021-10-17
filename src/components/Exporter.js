import './Exporter.css';

function toMRC(data) {
    // TODO: add options for all of these settings
    const units = "ENGLISH";
    const description = "a description";
    const filename = "workout.mrc";
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
    for (let interval in data) {

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

function Exporter(props) {
    const fileName = props.fileName + ".mrc";
    const mrcString = toMRC(props.data);
    const blob = new Blob([mrcString]);
    const DownloadUrl = URL.createObjectURL(blob);
    return (
        <a
            download={fileName}
            href={DownloadUrl}
        >Download MRC</a>
    );
}

export default Exporter;