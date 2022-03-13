
import {performance} from 'perf_hooks';

import {readFileSync} from 'fs';

const airport_data = JSON.parse(readFileSync('data/airports.json', 'utf8'));
console.log(`Total airport data is ${airport_data.length} airports.`)

const testdata_airports_with_iata = airport_data.filter((ap) => {return (ap.iata_code !== "")})
console.log(`Test data is ${testdata_airports_with_iata.length} airports with iata codes.`)


function lookup_airport_by_iata_naive(iata_code) {
    for(let i = 0; i < airport_data.length-1; i++) {
        if (airport_data[i].iata_code === iata_code) {
            return airport_data[i];
        }
    }
    return null;
}


function test_airport_lookup_function(airport_lookup_function) {
    for(let i = 0; i < testdata_airports_with_iata.length-1; i++) {
        console.assert(airport_lookup_function(testdata_airports_with_iata[i].iata_code) !== null);
    }
    console.assert(!airport_lookup_function('fake iata code'));
}

let now = performance.now()
test_airport_lookup_function(lookup_airport_by_iata_naive)
console.log(`Looking up all iata codes with lookup_airport_by_iata_naive took: ${performance.now() - now}`);
