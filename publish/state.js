(function() {
    var events = {
        demoKey: []
    };
    var state = {
        demoKey: '20'
    };

    var store = {
        getState: function() {
            return state;
        },
        getEvents: function() {
            return events;
        },
        subscribe: function(key, event) {
            if (!events[key]) {
                events[key] = [];
            }
            events[key].push(event);
        },
        one: function(key, event) {
            this.unsubscribe(key);
            this.subscribe(key, event);
        },

        dispatch: function(key, value) {
            if (!events[key]) {
                return false;
            }
            events[key].map(function(fn, i) {
                fn(value);
            })
        },
        unsubscribe: function(key) {
            if (!events[key]) {
                return false;
            }
            events[key] = [];
        }
    }

    window.store = store;
})();

let events = {};
let state = {};
// let action = {
//     type: 'testKey',
//     value: 2
// }
let store = {
    getState() {
        return state;
    },
    subscribe(key, callback) {
        if (!events[key]) {
            events[key] = [];
        }
        events[key].push(callback);
    },
    dispatch(key, value) {
        if (!events[key]) {
            return false;
        }
        events[key].map(function(fn, i) {
            value && fn(value);
        })
    },
    unsubscribe(key) {
        if (!events[key]) {
            return false;
        }
        events[key].length = 0;
    },
    one(key, callback) {
        this.unsubscribe(key);
        this.subscribe(key, callback);
    }
}
