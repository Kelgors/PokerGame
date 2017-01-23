const _trackerIsUndefined = typeof mixpanel === 'undefined';
const isMe = !!localStorage.getItem('isMe');
const stopTracking = _trackerIsUndefined || !!localStorage.getItem('StopTracking') || (/localhost\:8080/).test(location.toString());

if (stopTracking) console.log('stop-tracking');

if (!_trackerIsUndefined && isMe) {
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
    },
};

