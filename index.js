const fsp = require('fs/promises');
const Papa = require('papaparse');
const RunFile = require('./RunFile');

(async () => {
  const runFile = new RunFile('in/log.run');
  const parsed = await runFile.parse();

  console.log(`Extracted ${parsed.length} lines`);
  console.log(`Run duration : ${runFile.getRunDuration()} seconds`);
  console.log('Max values :');
  console.log(runFile.getBoundingValues());

  const csv = Papa.unparse({
    fields: [
      'Time',
      'GPS_Latitude',
      'GPS_Longitude',
      'Speed',
      'Rpm',
      'Throttle',
      'Brake',
      'Power',
      'Torque',
      'Gear',
      'Boost',
      'Temp_Clutch',
      'Temp_Coolant',
      'Temp_External',
      'Temp_Gearbox',
      'Temp_Intake',
      'Temp_Oil'
    ],
    data: parsed.map((r) => {
      return [
        r.time,
        r.gpsLat,
        r.gpsLon,
        r.speed,
        r.rpm,
        r.throttle,
        r.brake,
        r.power,
        r.torque,
        r.gear,
        r.boost,
        r.temp_clutch,
        r.temp_coolant,
        r.temp_external,
        r.temp_gearbox,
        r.temp_intake,
        r.temp_oil,
      ];
    })
  });

  await fsp.writeFile('out/export.csv', csv);
})();