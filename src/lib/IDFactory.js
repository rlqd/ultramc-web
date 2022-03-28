
var IDFactory = (function() {

    var globalIndexes = {};

    return {
        reset: function() {
            globalIndexes = {};
        },
        createId: function(prefix) {
            if (globalIndexes[prefix] === undefined) {
                globalIndexes[prefix] = 0;
            }
            return prefix + '-' + (++globalIndexes[prefix]);
        },
    };
})();

export default IDFactory;
