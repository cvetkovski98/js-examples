function hold_for(fn, ms) {
    let timeout_id;
    return (...params) => {
        if (timeout_id)
            clearTimeout(timeout_id)
        timeout_id = setTimeout(fn, ms, ...params);
    }
}

// Test function without arguments
const test1 = function () {

    let getDate = () => {
        let now = new Date().getTime()
        console.log("Test 1: getDate was called at : ", now)
        return now
    }


    let hold_time = 1000

    console.log("Test 1: Before calling hold: ", new Date().getTime())

    let g = hold_for(getDate, hold_time)

    console.log("Test 1: Calling g three times");

    g()
    g()
    g()

};

// Test function with arguments
const test2 = function () {

    let func = (p1) => {
        let now = new Date().getTime()
        console.log("In Test 2: function was called at : ", now, " with paramerter:", p1)
    }

    let hold_time = 50

    console.log("Test 2: Before calling hold: ", new Date().getTime())

    let g = hold_for(func, hold_time)

    console.log("Test 2: Calling g three times");

    g('1')
    console.log("Test 2: Before calling hold: ", new Date().getTime())

    g('2')
    console.log("Test 2: Before calling hold: ", new Date().getTime())

    g('3')
    console.log("Test 2: Before calling hold: ", new Date().getTime())

    g('100')
    console.log("Test 2: Before calling hold: ", new Date().getTime())


};

console.log("Running test 1")
test1()

console.log("Running test 2")
test2()
