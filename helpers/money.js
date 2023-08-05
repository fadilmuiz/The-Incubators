function rupiah(number){
    const format = new Intl.NumberFormat('id-ID', {
        style : 'currency',
        currency : 'IDR',
        minimumFractionDigits : 0
    })

    return format.format(number)
}

module.exports = rupiah