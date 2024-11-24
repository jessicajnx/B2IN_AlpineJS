Alpine.data("admin", function () {
    return({
        async init() {
            try {
                const result = await fetch("./data/users.json")
                this.users = await result.json()
            } catch(e) {
                console.trace(e)
            }
            this.users = await (await fetch("./users.json")).json()
        }
    })
})

Alpine.start()