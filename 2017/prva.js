const Singleton = () => {
    let instance;
    const getInstance = () => {
        if (!instance) {
            instance = {
                created_at: Date.now()
            }
        }
        return instance
    }

    return {
        getInstance
    }
}

let singleton = Singleton();
console.log(singleton.getInstance())
console.log("Sleeping for two seconds...")
setTimeout(() => console.log(singleton.getInstance()), 2000)