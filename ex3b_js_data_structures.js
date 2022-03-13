
import {performance} from 'perf_hooks';

import {readFileSync} from 'fs';

const airport_data = JSON.parse(readFileSync('data/airports.json', 'utf8'));
console.log(`Total airport data is ${airport_data.length} airports.`)

const testdata_airports_with_iata = airport_data.filter((ap) => {return (ap.iata_code !== "")})
console.log(`Test data is ${testdata_airports_with_iata.length} airports with iata codes.`)


const memoization_store = {}

function lookup_airport_by_iata_memoization(iata_code) {
    //Return memoized result if available
    if (memoization_store[iata_code]) {
        return memoization_store[iata_code];
    }
    //Otherwise, look it up and memoize
    for(let i = 0; i < airport_data.length-1; i++) {
        if (airport_data[i].iata_code === iata_code) {
            memoization_store[iata_code] = airport_data[i];
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
test_airport_lookup_function(lookup_airport_by_iata_memoization)
console.log(`Run1: Looking up all iata codes with lookup_airport_by_iata_memoization took: ${performance.now() - now}`);

now = performance.now()
test_airport_lookup_function(lookup_airport_by_iata_memoization)
console.log(`Run2: Looking up all iata codes with lookup_airport_by_iata_memoization took: ${performance.now() - now}`);
