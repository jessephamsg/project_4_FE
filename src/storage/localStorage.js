const set = (key,value) => {
    localStorage.setItem(key, value)
    return true;
}

const get = (key) => {
    const item = localStorage.getItem(key)
    return item
}

const del = (key) => {
    localStorage.removeItem(key)
    return true;
}

const local = {
    set,
    get,
    del
}

export default local