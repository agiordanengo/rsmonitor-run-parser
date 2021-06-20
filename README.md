# RSMonitor Run Parser
Protoype in NodeJS to parse data from RS Monitor datalogger .run files of Renault Sport cars, based on the work of **rocasspb** and his **[RSMonConverter](https://github.com/rocasspb/rsmonconverter "RSMonConverter")** project in Kotlin.

![Output example](/out/output.png?raw=true "Output example")

## Description
- Place input file in **in/run.log**
- Run node index.js
- It will output **out/export.csv**

## Mapping
- Split file each 183 bytes

| Field | Type | Offset | Byte length | Conversion |
| --- | --- | --- | --- | --- |
| boost | UIntBE | 0x3B | 2 | value * 5 |
| brake | UIntLE | 0x42 | 2 | value * 0.01 |
| gear | byte | 0x98 | 1 | value |
| gpsLat | UIntBE | 0x60 | 4 | value * 0.0000001 |
| gpsLon | UIntBE | 0x5c | 4 | value * 0.0000001 |
| power | UIntBE | 0x58 | 2 | value |
| rpm | UIntBE | 0x4B | 3 | 6000000 / value |
| speed | UIntBE | 0x17 | 3 | value / 6 / 122 |
| temp_clutch | UIntLE | 0x31 | 2 | value * 0.1 |
| temp_coolant | UIntLE | 0x22 | 2 | value * 0.1 |
| temp_external | UIntLE | 0x93 | 2 | value * 0.1 |
| temp_gearbox | UIntLE | 0x2c | 2 | value * 0.1 |
| temp_intake | UIntLE | 0x1d | 2 | value * 0.1 |
| temp_oil | UIntLE | 0x27 | 2 | value * 0.1 |
| throttle | UIntLE | 0x36 | 2 | value * 0.1 |
| time | UIntBE | 0xA9 | 3 | value * 0.01 |
| torque | UIntBE | 0x50 | 2 | value |

## TODO
- Understand how the mapping was found
- Some data (Speed, RPM) are not fully equal when importing the .run file in RS Replay website, maybe the conversion used in the mapping are not correct
- Calculate lap count and time from GPS position
- Detect track name and properties from GPS position
- Expose this as an npm library
- Create a video with green background from the data to display them like RS Monitor bargraph and gauges

## Example
- log.run file provided is a run done at track Circuit du Var with a Clio 4 RS Trophy 220