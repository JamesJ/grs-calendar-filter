const http = require('http');
const nodeIcal = require('node-ical');
const url = require('url');
const ical = require('ical-generator');

http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const val = query.url;

    nodeIcal.fromURL(val, {}, function (err, data) {
        const calendar = ical({name: 'GRS Calendar'});
        for (let dataKey in data) {
            if (!data.hasOwnProperty(dataKey)) {
                continue;
            }
            const entry = data[dataKey];
            if (entry.summary !== "Day Off" && entry.type === "VEVENT") {
                calendar.createEvent(entry);
            }

        }

        res.setHeader("Content-Type", "text/calendar")

        res.end(calendar.serve(res))
    });
}).listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});