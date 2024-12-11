type DegreeType = {
    celcius: TemperatureUnit,
    fahrenheit: TemperatureUnit
}

export type TemperatureUnit = {
    symbol: 'C' | 'F';
    name: 'celcius' | 'fahrenheit';
}

const Degree: DegreeType = {
    celcius: {
        symbol: 'C',
        name: 'celcius'
    },

    fahrenheit: {
        symbol: 'F',
        name: 'fahrenheit'
    }
}

export default Degree;