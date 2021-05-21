export default class ReviseAmount {
    /**
     * 是否为改价
     * @param amount
     * @param  reviseAmount
     * @returns {boolean}
     */
    static isRevise(amount, reviseAmount) {
        return parseFloat(reviseAmount) !== parseFloat(amount);
    }
}
