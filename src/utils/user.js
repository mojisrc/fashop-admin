export default class User {
    /**
     * 用户来源
     * @param source
     * @returns {string}
     */
    static sourceString(source) {
        const _source = parseInt(source)
        switch (_source) {
            case 0:
                return ''
            case 1:
                return 'APP'
            case 2:
                return 'APP'
            case 3:
                return '小程序'
            default:
                return ''
        }
    }
}
