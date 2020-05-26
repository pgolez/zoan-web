export default function(value, decimals = 0) {
    if (value) {
        return parseFloat(value.toFixed(decimals)).toLocaleString()
    }
}