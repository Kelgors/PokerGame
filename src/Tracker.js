const isMe = !!localStorage.getItem('isMe');
const stopTracking = !!localStorage.getItem('StopTracking') || /localhost\:8080/.test(location.toString()) || typeof mixpanel === 'undefined';

if (stopTracking) console.log('stop-tracking');

if (isMe) {
    mixpanel.identify('1');
}

export default {
    /**
     * @param {String} eventName
     * @param {Object} properties
     * @param {Function} callback
     */
    track(eventName, properties, callback) {
        if (stopTracking) return;
        mixpanel.track(eventName, properties, callback);
    }
};

