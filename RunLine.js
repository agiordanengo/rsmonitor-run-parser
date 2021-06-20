class RunLine {
  static parse(line) {
    try {
      return {
        boost: 5 * line.readUIntBE(this.mapping.boost, 2),
        brake: 0.01 * line.readUIntLE(this.mapping.brake, 2),
        gear: line[this.mapping.gear],
        gpsLat: 0.0000001 * line.readUIntBE(this.mapping.gps_lat, 4),
        gpsLon: 0.0000001 * line.readUIntBE(this.mapping.gps_lon, 4),
        power: line.readUIntBE(this.mapping.power, 2),
        rpm: line.readUIntBE(this.mapping.rpm, 3) !== 0 ? 6000000 / line.readUIntBE(this.mapping.rpm, 3) : 0,
        speed: line.readUIntBE(this.mapping.speed, 3) / 6 / 122,
        temp_clutch: 0.1 * line.readUIntLE(this.mapping.temp_clutch, 2),
        temp_coolant: 0.1 * line.readUIntLE(this.mapping.temp_coolant, 2),
        temp_external: 0.1 * line.readUIntLE(this.mapping.temp_external, 2),
        temp_gearbox: 0.1 * line.readUIntLE(this.mapping.temp_gearbox, 2),
        temp_intake: 0.1 * line.readUIntLE(this.mapping.temp_intake, 2),
        temp_oil: 0.1 * line.readUIntLE(this.mapping.temp_oil, 2),
        throttle: 0.1 * line.readUIntLE(this.mapping.throttle, 2),
        time: 0.01 * line.readUIntBE(this.mapping.rel_time, 3),
        torque: line.readUIntBE(this.mapping.torque, 2),
      }
    }
    catch (err) {
      return undefined;
    }
  }
}

RunLine.mapping = {
  boost: 0x3B,
  brake: 0x42,
  gear: 0x98,
  gps_lat: 0x60,
  gps_lon: 0x5c,
  lateral: 0x11,
  longitudal: 0x13,
  power: 0x58,
  rel_time: 0xA9,
  rpm: 0x4B,
  speed: 0x17,
  steering: 0x47,
  temp_clutch: 0x31,
  temp_coolant: 0x22,
  temp_external: 0x93,
  temp_gearbox: 0x2c,
  temp_intake: 0x1d,
  temp_oil: 0x27,
  throttle: 0x36,
  torque: 0x50,
  wheel_fl: 0x83,
  wheel_fr: 0x7E,
  wheel_rl: 0x79,
  wheel_rr: 0x74,
};

module.exports = RunLine;
