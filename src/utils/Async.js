/**
 * @callback asyncIterator
 * @returns {Promise}
 */
/**
 * @callback forEachAsyncIterator
 * @param {any} items
 * @param {Number} index
 * @param {Array} array
 * @returns {Promise}
 */
/**
 * @callback mapAsyncIterator
 * @param {any} items
 * @param {Number} index
 * @param {Array} array
 * @returns {any}
 */

const Async = {
    /**
     * Simple timeout method
     * @async
     * @param {Function} predicate
     * @param {Number} delay
     * @param {Object} context
     * @returns {Number} the timeout id
     */
    timeout(predicate, delay, context) {
        if (context) predicate = predicate.bind(context);
        return setTimeout(predicate, delay || 1);
    },
    /**
     * Simple interval method
     * @async
     * @param {Function} predicate
     * @param {Number} delay
     * @param {Object} context
     * @returns {Number} the interval id
     */
    interval(predicate, delay, context) {
        if (context) predicate = predicate.bind(context);
        return setInterval(predicate, delay || 1);
    },

    /**
     * Timeout method which wait the requested time and wait again to the next available frame
     * @async
     * @param {Number} time
     * @returns {Promise}
     */
    wait(time) {
        return new Promise(function waitPromiseExecutor(resolve) {
            if (typeof time === 'undefined' || time === 0) requestAnimationFrame(resolve);
            else Async.timeout(requestAnimationFrame.bind(window, resolve), time);
        });
    },

    /**
     * Execute the predicate while the returned value isnt falsy
     * @async
     * @param {asyncIterator} predicate
     * @param {Object} [context]
     * @returns {Promise}
     */
    loopAsync(predicate, context = window) {
        return new Promise(function whileAsyncPromiseExecutor(resolve, reject) {
            function iterator() {
                const promise = predicate.call(context);
                if (promise) promise.then(iterator, reject);
                else resolve();
            }
            iterator();
        });
    },

    /**
     * Execute predicate while the returned value isnt false
     * @async
     * @param {asyncIterator} predicate
     * @param {Object} [context]
     * @returns {Promise}
     */
    whileAsync(predicate, context = window) {
        return Async.loopAsync(function whileAsyncIteratorWrapper() {
            let promise = predicate.call(context);
            const isntPromise = (typeof promise === 'object' && !('then' in promise) && typeof promise.then !== 'function');
            if (isntPromise || (typeof promise !== 'object' && promise)) {
                promise = Async.wait(0);
            }
            return promise;
        }, context);
    },

    /**
     * Iterate over an array asynchronously, execute iterator for each items
     * @async
     * @param {Array} array
     * @param {forEachAsyncIterator} iterator
     * @param {Object} [context]
     * @returns {Promise.<Array>}
     */
    forEachAsync(array, iterator, context) {
        let index = 0;
        context = context || window;
        return Async.whileAsync(function forEachAsyncIteratorWrapper() {
            if (index >= array.length) return false;
            return iterator.call(context, array[index], index++, array) || true;
        }).then(function forEachAsyncOutput() {
            return array;
        });
    },

    /**
     * Iterate over an array asynchronously, execute iterator for each items
     * and returns all values returned by the iterator
     * @async
     * @param {Array} array
     * @param {mapAsyncIterator} iterator
     * @param {Object} [context]
     * @returns {Promise.<Array>}
     */
    mapAsync(array, iterator, context) {
        const out = new Array(array.length);
        return Async.forEachAsync(array, function mapAsyncIteratorWrapper(value, index, array) {
            return iterator.call(context, value, index, array)
                .then(function mapResolveAssigner(outputValue) {
                    out[index] = outputValue;
                    return outputValue;
                },
                function mapRejectAssigner(outputValue) {
                    out[index] = outputValue;
                    return outputValue;
                });
        }).then(function mapAsyncOutput() {
            return out;
        });
    },
};

export default Async;
