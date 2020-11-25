Array.prototype.flatten_deep = function () {
    if (!this.some(it => Array.isArray(it))) return this
    const flatten = []
    for (const elem of this) {
        let element_class = Object.prototype.toString.call(elem);
        if (element_class !== '[object Array]')
            flatten.push(elem)
        else flatten.push(...elem.flatten_deep())
    }
    return flatten
}

let a = [1, 2, [3, 4, [5, 6, [7]]], [8, [9]]]
let flat_arr = a.flatten_deep()
console.log(flat_arr)

