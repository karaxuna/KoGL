export function merge(a, b, excludeInstances) {
    var copy = {};
    if (typeof excludeInstances === 'undefined') {
        excludeInstances = [Array];
        if (typeof HTMLElement !== 'undefined') excludeInstances.push(HTMLElement);
    }

    this.extend(copy, a, excludeInstances);
    this.extend(copy, b, excludeInstances);
    return copy;
}

export function extend(a, b, excludeInstances) {
    for (var prop in b)
        if (b.hasOwnProperty(prop)) {
            var isInstanceOfExcluded = false;
            if (excludeInstances)
                for (var i = 0; i < excludeInstances.length; i++)
                    if (b[prop] instanceof excludeInstances[i])
                        isInstanceOfExcluded = true;

            if (typeof b[prop] === 'object' && !isInstanceOfExcluded) {
                a[prop] = a[prop] !== undefined ? a[prop] : {};
                this.extend(a[prop], b[prop], excludeInstances);
            } else
                a[prop] = b[prop];
        }
}

export function setProp(obj, prop, value) {
    var parts = prop.split('.');
    var _ref = obj;
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (i === parts.length - 1)
            _ref[part] = value;
        else
            _ref = (_ref[part] = _ref[part] || {});
    }
}

export function getProp(obj, prop) {
    var parts = prop.split('.');
    var _ref = obj;
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (i === parts.length - 1)
            return _ref[part];
        else
            _ref = _ref[part] || {};
    }
}

export function selectProps(obj, props) {
    var newObj = {};
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        setProp(newObj, prop, getProp(obj, prop))
    }
    return newObj;
}

export function each(ar, fn) {
    for (var i = 0; i < ar.length; i++)
        if (fn.call(ar, ar[i], i) === false)
            break;
}

export function map(it, fn) {
    if (it instanceof Array)
        return mapArray(it, fn);
    if (it instanceof Object)
        return mapObject(it, fn);
    throw 'typeof parameter is not neither object nor array';
}

export function mapObject(obj, fn) {
    var newObj = {};
    for (var prop in obj)
        newObj[prop] = fn(obj[prop]);
    return newObj;
}

export function mapArray(ar, fn) {
    var newArray = [];
    for (var i = 0; i < ar.length; i++)
        newArray[i] = fn(ar[i]);
    return newArray;
}

export function findOne(ar, query, fn) {
    for (var i = 0; i < ar.length; i++) {
        var a = ar[i];
        var m = matchesQuery(a, query);
        if (m) {
            if (fn) fn(a, i);
            return a;
        }
    }
    if (fn) fn(null);
    return null;
}

export function matchesQuery(obj, query) {
    switch (typeof query) {
        case 'object':
            var _r = (function _f(_obj, _query) {
                for (var prop in _query) {
                    var qprop = _query[prop];
                    var oprop = _obj[prop];
                    if (typeof qprop === 'object')
                        return _f(oprop, qprop);
                    else if (oprop !== qprop)
                        return false;
                }
            })(obj, query)
            return _r !== false;;
        case 'function':
            return query(obj);
    }
}

export function find(ar, query, fn) {
    var results = [];
    for (var i = 0; i < ar.length; i++) {
        var a = ar[i];
        if (matchesQuery(a, query))
            results.push(a);
    }
    if (fn) fn(results);
    return results;
}

export function contains(ar, obj, query) {
    for (var i = 0; i < ar.length; i++) {
        var a = ar[i];
        if (equals(a, obj, query))
            return true;
    }
    return false;
}

export function union(ar1, ar2, query, fn) {
    var results = [];
    for (var i = 0; i < ar1.length; i++)
        results.push(ar1[i]);
    for (var i = 0; i < ar2.length; i++) {
        var isNotInAr1 = !contains(ar1, ar2[i], query);
        if (isNotInAr1)
            results.push(ar2[i]);
    };
    if (fn) fn(results);
    return results;
}

export function except(ar1, ar2, query, fn) {
    var results = [];
    for (var i = 0; i < ar1.length; i++) {
        var a = ar1[i];
        if (!contains(ar2, a, query))
            results.push(a);
    }
    if (fn) fn(results);
    return results;
}

export function max(ar) {
    var max;
    for (var i = 0; i < ar.length; i++) {
        var a = ar[i];
        if (typeof max === 'undefined' || a > max)
            max = a;
    }
    return max;
}

export function synchronize(ar1, ar2, query) {
    query = query || {};
    // remove items that are in ar1 and are NOT in a2
    except(ar1, ar2, query, function (itemsToRemove) {
        for (var i = 0; i < itemsToRemove.length; i++)
            ar1.splice(ar1.indexOf(itemsToRemove[i]), 1);
    });
    // add items to a1 from a2 that are NOT in a1
    except(ar2, ar1, query, function (itemsToAdd) {
        for (var i = 0; i < itemsToAdd.length; i++)
            ar1.push(itemsToAdd[i]);
    });
}

export function removeOne(ar, query, fn) {
    findOne(ar, query, function (it, index) {
        ar.splice(index, 1);
        if (fn) fn(ar);
    });
}

export function remove(ar, item, query, fn) {
    query = query || {};
    for (var i = 0; i < ar.length; i++)
        if (equals(ar[i], item, query))
            ar.splice(i, 1);
}

// note: not deep query search
export function equals(item1, item2, query) {
    if (typeof item1 === 'object' && typeof item2 === 'object') {
        query = query || {};
        for (var prop in query) {
            if (item1[prop] !== item2[prop])
                return false;
        }
        return true;
    }
    return item1 === item2;
}

export function generateGuid() {
    var S4 = function () {
        return Math.floor(Math.random() * 0x10000).toString(16);
    };
    return (S4() + S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + S4() + S4());
}

export function preload(srcs, callback) {
    var loaded = 0;
    each(srcs, function (src) {
        var image = new Image();
        image.src = src;
        image.onload = function () {
            if (++loaded == srcs.length)
                callback();
        };
        image.onerror = function (err) {
            if (++loaded == srcs.length)
                callback();
            console.log(err);
        };
    });
}

export function readContent(element) {
    if (!element) return null;
    var content = '';
    var child = element.firstChild;

    while (child) {
        if (child.nodeType == child.TEXT_NODE)
            content += child.textContent;

        child = child.nextSibling;
    }
    return content;
}

export function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function chain(fn) {
    return function <T>(this: T) {
        fn.apply(this, arguments);
        return this;
    };
}
