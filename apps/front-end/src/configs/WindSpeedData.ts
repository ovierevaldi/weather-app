type DegreeType = {
    mph: WindSpeedUnit,
    kph: WindSpeedUnit
}

export type WindSpeedUnit = {
    symbol: 'mph' | 'kph';
    name: 'Wind speed in miles per hour' | 'Wind speed in kilometers per hour';
}

const WindSpeedData: DegreeType = {
    kph: {
        symbol: 'kph',
        name: 'Wind speed in kilometers per hour'
    },

    mph: {
        symbol: 'mph',
        name: 'Wind speed in miles per hour'
    }
}

export default WindSpeedData;