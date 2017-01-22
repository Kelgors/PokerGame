export default {
    Compare: {
        asc(a, b) {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        },
        desc(a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        }
    },
    /**
     * @param {number} value the value to clamp
     * @param {number} min
     * @param {number} max
     */
    clamp(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
};