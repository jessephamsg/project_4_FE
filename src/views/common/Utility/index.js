const calAge = (input) => {
    // input date is in "YYYY-MM-DD"
    const splitDate = input.split("-")
    const userDate = new Date(splitDate[0],splitDate[1],splitDate[2])
    const today = new Date()
    const age = Math.round((Math.abs(today.getTime() - userDate.getTime()) / (1000 * 3600 * 24 * 365.25)))
    return age
}

const Utility = {
    calAge
}

export default Utility