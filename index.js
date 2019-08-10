const axios = require("axios")

async function main() {
    const { data: { response: { holidays } } } = await axios.get("https://calendarific.com/api/v2/holidays", {
        params: {
            api_key: process.env.API_KEY,
            country: process.env.COUNTRY || "DE",
            year: process.env.YEAR || new Date().getFullYear()
        }
    });
    const mappedHolidays = holidays.map(({ date: { iso } }) => iso)

    const today = new Date().toISOString().slice(0, 10);
    console.log(`Today is: ${mappedHolidays.includes(today) ? holidays.filter(({ date: { iso } }) => iso === today)[0].name : "no holiday"}`);
}

main();