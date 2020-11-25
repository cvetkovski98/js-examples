// ***************************************************
// Shopping Cart functions
let CartItem = function (name, price, count) {
    this.name = name
    this.price = price
    this.count = count
}

let ShoppingCart = function () {
    this.products = [];
};

ShoppingCart.prototype.addItemToCart = function (name, price, count) {
    let update_product = this.products
        .find(cart_item => cart_item.name === name);
    if (update_product) {
        update_product.count += count;
    } else {
        let new_cart_item = new CartItem(name, price, count);
        console.log(new_cart_item)
        this.products.push(new_cart_item);
    }
}

ShoppingCart.prototype.setCountForItem = function (name, count) {
    let update_product = this.products
        .find(cart_item => cart_item.name === name);
    if (update_product) {
        update_product.count = count
    }
}

ShoppingCart.prototype.removeItemFromCart = function (name) {
    let update_product = this.products
        .find(cart_item => cart_item.name === name);
    update_product.count--;
    if (update_product.count === 0){
        this.removeItemFromCartAll(name)
    }
}

ShoppingCart.prototype.removeItemFromCartAll = function (name) {
    this.products = this.products
        .filter(cart_item => cart_item.name !== name);
}

ShoppingCart.prototype.clearCart = function () {
    this.products = []
}

ShoppingCart.prototype.countCart = function () {
    return this.products.length
}

ShoppingCart.prototype.totalCart = function () {
    return this.products.reduce((total_price, cart_item) => total_price + cart_item.price * cart_item.count, 0)
}

ShoppingCart.prototype.listCart = function () {
    return this.products.map(cart_item => {
        return {
            name: cart_item.name,
            price: cart_item.price,
            count: cart_item.count,
            total: cart_item.price * cart_item.count
        }
    })
}

let shoppingCart = new ShoppingCart();
