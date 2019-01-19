const moment = window.moment

export function timeFilter(value) {
    let m = moment(value)
    let now = new Date()
    console.log('m.year()', m.year())
    let offset = now.getTime() - m.toDate().getTime()
    const MINUTE = 60 * 1000
    const HOUR = 60 * MINUTE
    const DAY = 24 * HOUR

    console.log('offset', offset)
    if (m.year() === now.getFullYear()) {
        if (offset < DAY) {
            if (offset < HOUR) {
                return Math.round(offset / MINUTE) + ' 分钟前'
            }
            return Math.round(offset / HOUR) + ' 小时前'
        }
        return Math.round(offset / DAY) + ' 天前'
    }
    return m.format('YYYY-MM-DD HH:mm')
}

export function commonTimeFilter(value) {
    return moment(value).format('YYYY-MM-DD HH:mm')
}
