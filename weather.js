const dotenv = require('dotenv').config()
const readline = require('readline');
const http = require('http');
const input = readline.createInterface(process.stdin)
const myAPIKey = process.env.myAPIKey;
let weatherInCity;

console.log('Введите город');
input.on('line', (data) => {
    weatherInCity = data;
    requestWeather();
});

function requestWeather () {
    const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}=${weatherInCity}`;
    http.get(url, (res) => {
        const statusCode = res.statusCode;
        if (statusCode !== 200) {
            console.error(`Код ошибки: ${statusCode}`);
            return;
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            let parsedData = JSON.parse(rawData);
            console.log(parsedData);
            console.log('Введите еще какой-нибудь город');
        });
    }).on('error', (e) => {
        console.error(`Ошибка: ${e.message}`);
    });
}

