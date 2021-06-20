const fs = require('fs');
const RunLine = require('./RunLine');

class RunFile {
  constructor(fileName) {
    this.fileName = fileName;
    this.lines = [];
  }

  async parse() {
    return new Promise((resolve, reject) => {
      const readableStream = fs.createReadStream(this.fileName, {
        highWaterMark: 183
      });

      readableStream.on('readable', () => {
        const parsedLine = RunLine.parse(readableStream.read());

        if (parsedLine !== undefined) {
          this.lines.push(parsedLine);
        }
      });

      readableStream.on('end', async () => {
        resolve(this.lines);
      });
    });
  }

  getRunDuration() {
    return this.lines[this.lines.length - 1].time - this.lines[0].time;
  }

  getBoundingValues() {
    const fields = [
      'speed',
      'rpm',
      'brake',
      'power',
      'torque',
      'boost',
      'temp_clutch',
      'temp_coolant',
      'temp_external',
      'temp_gearbox',
      'temp_intake',
      'temp_oil',
    ];
    const values = {};

    this.lines.forEach((line) => {
      fields.forEach((field) => {
        if (values[field] === undefined) {
          values[field] = {
            min: line[field],
            max: line[field],
          };
        }

        values[field].min = Math.min(values[field].min, line[field]);
        values[field].max = Math.max(values[field].max, line[field]);
      });
    });

    return values;
  }
}

module.exports = RunFile;