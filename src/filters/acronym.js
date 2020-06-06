export default function(value) {
    const tokens = value.split(' ')
    if (tokens.length < 1) {
        return ''
    }
    const first = tokens[0].charAt(0).toUpperCase()
    if (tokens.length < 2) {
        return first
    }

    const last = tokens.slice(-1)[0].charAt(0).toUpperCase()
    return first + last
}