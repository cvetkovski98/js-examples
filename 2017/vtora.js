const deep_clone = (obj) => {
    let element_type = Object.prototype.toString.call(obj)
    if (obj == null || element_type !== '[object Object]') return obj;
    const output = element_type === '[object Array]' ? [] : {};
    for (const key of Object.keys(obj)) {
        output[key] = deep_clone(obj[key])
    }
    return output
}

let a = {
    a: 3,
    b: 5,
    m: [1, 2, 3, 4, 5],
    c: function () {
        let f = {
            z: 10
        };
        console.log(f.z)
        f.z = 10000000000
    },
    d: {
        e: {
            g: 15
        }
    }
}

let b = deep_clone(a)
console.log(b)

console.log(a === b)