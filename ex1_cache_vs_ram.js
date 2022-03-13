

import {performance} from 'perf_hooks';

const _8kb = 8192/(64/8);
const _1MB = 1048576/(64/8);
const _4MB = 4*_1MB;
const _32MB = 32*_1MB;

function mix_up_array(arr, no_of_ops) {
    const l = arr.length
    for(let i = 0; i < no_of_ops; i++) {
        let p1 = Math.floor(Math.random() * l);
        let p2 = Math.floor(Math.random() * l);

        let t = arr[p1];
        arr[p1] = arr[p2];
        arr[p2] = t;
    }
}


let now = performance.now()
mix_up_array(new BigInt64Array(_32MB), 10000000)
console.log(`Mix up 32MB took: ${performance.now() - now}`);

now = performance.now()
mix_up_array(new BigInt64Array(_4MB), 10000000)
console.log(`Mix up 4MB took: ${performance.now() - now}`);


now = performance.now()
mix_up_array(new BigInt64Array(_1MB), 10000000)
console.log(`Mix up 1MB took: ${performance.now() - now}`);

now = performance.now()
mix_up_array(new BigInt64Array(_8kb), 10000000)
console.log(`Mix up 8kb took: ${performance.now() - now}`);


