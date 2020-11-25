const set_up_to = (func, times) => {
    let times_called = 0;
    let last_returned;
    const max_times = times;

    const limited_func = (params) => {
        if (times_called < max_times) {
            last_returned = func(params)
            ++times_called;
            return last_returned;
        } else return last_returned;
    }

    return (...params) => limited_func(params)
}

const printer = (name) => {
    return `${name} e декан`
}

let limited = set_up_to(printer, 6)

console.log(limited("Oli"))
console.log(limited("Varga"))
console.log(limited("Ancho"))
console.log(limited("Jovanov"))
console.log(limited("Paki"))
console.log(limited("Pecko"))
console.log(limited("Kosic"))
console.log(limited("Mateska"))
console.log(limited("Nora"))
console.log(limited("Ljubica"))
console.log(limited("Mitra"))