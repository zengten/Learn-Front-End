const user = {
    username: "张三",
    age: 18
}

const isAdult = age => {
    if (age > 18) {
        console.log("成年人")
    } else {
        console.log("未成年")
    }
}


export { user, isAdult }