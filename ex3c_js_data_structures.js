
import {performance} from 'perf_hooks';

import {readFileSync} from 'fs';

const airport_data = JSON.parse(readFileSync('data/airports.json', 'utf8'));
console.log(`Total airport data is ${airport_data.length} airports.`)

const testdata_airports_with_iata = airport_data.filter((ap) => {return (ap.iata_code !== "")})
console.log(`Test data is ${testdata_airports_with_iata.length} airports with iata codes.`)


let lazy_precalc_store = null

function lookup_airport_by_iata_lazy_precalc(iata_code) {
    //If lazy_precalc_store just get the result directly
    if (lazy_precalc_store) {
        let r = lazy_precalc_store[iata_code];
        return r ? r : null;
    }

    //Otherwise create the lazy_precalc_store now ...
    lazy_precalc_store = {};
    // ... and fill it ...
    for(let i = 0; i < airport_data.length-1; i++) {
        if (airport_data[i].iata_code !== "") { //only add airports with an iata.
            lazy_precalc_store[airport_data[i].iata_code] = airport_data[i];
        }
    }
    // ... and return the result from the newly created store.
    return lookup_airport_by_iata_lazy_precalc(iata_code);
}

function test_airport_lookup_function(airport_lookup_function) {
    for(let i = 0; i < testdata_airports_with_iata.length-1; i++) {
        console.assert(airport_lookup_function(testdata_airports_with_iata[i].iata_code) !== null);
    }
    console.assert(!airport_lookup_function('fake iata code'));
}

let now = performance.now()
test_airport_lookup_function(lookup_airport_by_iata_lazy_precalc)
console.log(`Run1: Looking up all iata codes with lookup_airport_by_iata_lazy_precalc took: ${performance.now() - now}`);

now = performance.now()
test_airport_lookup_function(lookup_airport_by_iata_lazy_precalc)
console.log(`Run2: Looking up all iata codes with lookup_airport_by_iata_lazy_precalc took: ${performance.now() - now}`);
