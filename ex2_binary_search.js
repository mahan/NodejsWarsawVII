
import {performance} from 'perf_hooks';

// Iterative function to implement Binary Search ( adapted from: https://www.geeksforgeeks.org/binary-search-in-javascript/ )
let binary_search = function (arr, x) {

    let start=0, end=arr.length-1;

    // Iterate while start not meets end
    while (start<=end){

        // Find the mid index
        let mid=Math.floor((start + end)/2);

        // If element is present at mid, return True
        if (arr[mid]===x) return mid;

        // Else look in left or right half accordingly
        else if (arr[mid] < x)
            start = mid + 1;
        else
            end = mid - 1;
    }

    return -1;
}

/*
  _____       _ _
 |_   _|     (_) |       /\
   | |  _ __  _| |_     /  \   _ __ _ __ __ _ _   _
   | | | '_ \| | __|   / /\ \ | '__| '__/ _` | | | |
  _| |_| | | | | |_   / ____ \| |  | | | (_| | |_| |
 |_____|_| |_|_|\__| /_/    \_\_|  |_|  \__,_|\__, |
                                               __/ |
                                              |___/
 */
console.log('initializing sorted test array - size: 1 million bytes, values 1 - million')
const arr = new Int32Array(1000000);
for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 1000000) + 1;
}
arr.sort()

/*
  _           _            ___   __
 (_)_ __   __| | _____  __/ _ \ / _|
 | | '_ \ / _` |/ _ \ \/ / | | | |_
 | | | | | (_| |  __/>  <| |_| |  _|
 |_|_| |_|\__,_|\___/_/\_\\___/|_|
 */

let now = performance.now()
console.log('looking up random value 10 thousand times using array.indexOf:')
let i = 0, r = false;
let hits = 0;
for(i = 0; i < 10000; i++) {
    r = arr.indexOf(Math.floor(Math.random() * 1000000) + 1) !== -1;
    if (r) {hits++}
}
console.log(`done in : ${performance.now() - now} found ${hits} hits`);

/*
  _     _                                                    _
 | |__ (_)_ __   __ _ _ __ _   _     ___  ___  __ _ _ __ ___| |__
 | '_ \| | '_ \ / _` | '__| | | |   / __|/ _ \/ _` | '__/ __| '_ \
 | |_) | | | | | (_| | |  | |_| |   \__ \  __/ (_| | | | (__| | | |
 |_.__/|_|_| |_|\__,_|_|   \__, |___|___/\___|\__,_|_|  \___|_| |_|
                           |___/_____|
*/
console.log('looking up random value 10 thousand times using binary_search:')
now = performance.now()
hits = 0;
for(i = 0; i < 10000; i++) {
    r = binary_search(arr, Math.floor(Math.random() * 1000000) + 1) !== -1;
    if (r) {hits++}
}
console.log(`done in : ${performance.now() - now} found ${hits} hits`);
