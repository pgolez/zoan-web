import moment from 'moment'

export default function(value, format = 'MMMM D, YYYY') {
    if (value) {
        return moment(String(value)).format(format)
    }
}