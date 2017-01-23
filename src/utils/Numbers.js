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
        },
    },
    /**
     * @param {Number} value the value to clamp
     * @param {Number} min the minimum value
     * @param {Number} max the maximum value
     * @returns {Number} The clamped value
     */
    clamp(value, min, max) {
        return Math.max(Math.min(value, max), min);
    },
};
