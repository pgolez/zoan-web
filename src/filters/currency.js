const formatter = Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
})

export default function(value) {
    return formatter.format(value)
}