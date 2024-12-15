const DateFormat = () => {
    const getDayName= (string_date: string) => {
        const date = new Date(string_date);
        return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);    
    };
    return {getDayName};
};

export default DateFormat;