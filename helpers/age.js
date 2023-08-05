function customAge(value) {
    let year = new Date(value).getFullYear()
    let currentYear = new Date().getFullYear()
    let age = currentYear - year
    return age
}

module.exports = customAge