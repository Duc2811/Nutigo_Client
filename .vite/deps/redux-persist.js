import {
  combineReducers,
  createStore
} from "./chunk-MBT3EELI.js";
import "./chunk-DC5AMYBS.js";

// node_modules/redux-persist/es/constants.js
var KEY_PREFIX = "persist:";
var FLUSH = "persist/FLUSH";
var REHYDRATE = "persist/REHYDRATE";
var PAUSE = "persist/PAUSE";
var PERSIST = "persist/PERSIST";
var PURGE = "persist/PURGE";
var REGISTER = "persist/REGISTER";
var DEFAULT_VERSION = -1;

// node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof3(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof3(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function autoMergeLevel1(inboundState, originalState, reducedState, _ref) {
  var debug = _ref.debug;
  var newState = _objectSpread({}, reducedState);
  if (inboundState && _typeof(inboundState) === "object") {
    Object.keys(inboundState).forEach(function(key) {
      if (key === "_persist") return;
      if (originalState[key] !== reducedState[key]) {
        if (debug) console.log("redux-persist/stateReconciler: sub state for key `%s` modified, skipping.", key);
        return;
      }
      newState[key] = inboundState[key];
    });
  }
  if (debug && inboundState && _typeof(inboundState) === "object") console.log("redux-persist/stateReconciler: rehydrated keys '".concat(Object.keys(inboundState).join(", "), "'"));
  return newState;
}

// node_modules/redux-persist/es/createPersistoid.js
function createPersistoid(config) {
  var blacklist = config.blacklist || null;
  var whitelist = config.whitelist || null;
  var transforms = config.transforms || [];
  var throttle = config.throttle || 0;
  var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
  var storage = config.storage;
  var serialize;
  if (config.serialize === false) {
    serialize = function serialize2(x) {
      return x;
    };
  } else if (typeof config.serialize === "function") {
    serialize = config.serialize;
  } else {
    serialize = defaultSerialize;
  }
  var writeFailHandler = config.writeFailHandler || null;
  var lastState = {};
  var stagedState = {};
  var keysToProcess = [];
  var timeIterator = null;
  var writePromise = null;
  var update = function update2(state) {
    Object.keys(state).forEach(function(key) {
      if (!passWhitelistBlacklist(key)) return;
      if (lastState[key] === state[key]) return;
      if (keysToProcess.indexOf(key) !== -1) return;
      keysToProcess.push(key);
    });
    Object.keys(lastState).forEach(function(key) {
      if (state[key] === void 0 && passWhitelistBlacklist(key) && keysToProcess.indexOf(key) === -1 && lastState[key] !== void 0) {
        keysToProcess.push(key);
      }
    });
    if (timeIterator === null) {
      timeIterator = setInterval(processNextKey, throttle);
    }
    lastState = state;
  };
  function processNextKey() {
    if (keysToProcess.length === 0) {
      if (timeIterator) clearInterval(timeIterator);
      timeIterator = null;
      return;
    }
    var key = keysToProcess.shift();
    var endState = transforms.reduce(function(subState, transformer) {
      return transformer.in(subState, key, lastState);
    }, lastState[key]);
    if (endState !== void 0) {
      try {
        stagedState[key] = serialize(endState);
      } catch (err) {
        console.error("redux-persist/createPersistoid: error serializing state", err);
      }
    } else {
      delete stagedState[key];
    }
    if (keysToProcess.length === 0) {
      writeStagedState();
    }
  }
  function writeStagedState() {
    Object.keys(stagedState).forEach(function(key) {
      if (lastState[key] === void 0) {
        delete stagedState[key];
      }
    });
    writePromise = storage.setItem(storageKey, serialize(stagedState)).catch(onWriteFail);
  }
  function passWhitelistBlacklist(key) {
    if (whitelist && whitelist.indexOf(key) === -1 && key !== "_persist") return false;
    if (blacklist && blacklist.indexOf(key) !== -1) return false;
    return true;
  }
  function onWriteFail(err) {
    if (writeFailHandler) writeFailHandler(err);
    if (err && true) {
      console.error("Error storing data", err);
    }
  }
  var flush = function flush2() {
    while (keysToProcess.length !== 0) {
      processNextKey();
    }
    return writePromise || Promise.resolve();
  };
  return {
    update,
    flush
  };
}
function defaultSerialize(data) {
  return JSON.stringify(data);
}

// node_modules/redux-persist/es/getStoredState.js
function getStoredState(config) {
  var transforms = config.transforms || [];
  var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
  var storage = config.storage;
  var debug = config.debug;
  var deserialize;
  if (config.deserialize === false) {
    deserialize = function deserialize2(x) {
      return x;
    };
  } else if (typeof config.deserialize === "function") {
    deserialize = config.deserialize;
  } else {
    deserialize = defaultDeserialize;
  }
  return storage.getItem(storageKey).then(function(serialized) {
    if (!serialized) return void 0;
    else {
      try {
        var state = {};
        var rawState = deserialize(serialized);
        Object.keys(rawState).forEach(function(key) {
          state[key] = transforms.reduceRight(function(subState, transformer) {
            return transformer.out(subState, key, rawState);
          }, deserialize(rawState[key]));
        });
        return state;
      } catch (err) {
        if (debug) console.log("redux-persist/getStoredState: Error restoring data ".concat(serialized), err);
        throw err;
      }
    }
  });
}
function defaultDeserialize(serial) {
  return JSON.parse(serial);
}

// node_modules/redux-persist/es/purgeStoredState.js
function purgeStoredState(config) {
  var storage = config.storage;
  var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
  return storage.removeItem(storageKey, warnIfRemoveError);
}
function warnIfRemoveError(err) {
  if (err && true) {
    console.error("redux-persist/purgeStoredState: Error purging data stored state", err);
  }
}

// node_modules/redux-persist/es/persistReducer.js
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys2(source, true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var DEFAULT_TIMEOUT = 5e3;
function persistReducer(config, baseReducer) {
  if (true) {
    if (!config) throw new Error("config is required for persistReducer");
    if (!config.key) throw new Error("key is required in persistor config");
    if (!config.storage) throw new Error("redux-persist: config.storage is required. Try using one of the provided storage engines `import storage from 'redux-persist/lib/storage'`");
  }
  var version = config.version !== void 0 ? config.version : DEFAULT_VERSION;
  var debug = config.debug || false;
  var stateReconciler = config.stateReconciler === void 0 ? autoMergeLevel1 : config.stateReconciler;
  var getStoredState2 = config.getStoredState || getStoredState;
  var timeout = config.timeout !== void 0 ? config.timeout : DEFAULT_TIMEOUT;
  var _persistoid = null;
  var _purge = false;
  var _paused = true;
  var conditionalUpdate = function conditionalUpdate2(state) {
    state._persist.rehydrated && _persistoid && !_paused && _persistoid.update(state);
    return state;
  };
  return function(state, action) {
    var _ref = state || {}, _persist = _ref._persist, rest = _objectWithoutProperties(_ref, ["_persist"]);
    var restState = rest;
    if (action.type === PERSIST) {
      var _sealed = false;
      var _rehydrate = function _rehydrate2(payload, err) {
        if (_sealed) console.error('redux-persist: rehydrate for "'.concat(config.key, '" called after timeout.'), payload, err);
        if (!_sealed) {
          action.rehydrate(config.key, payload, err);
          _sealed = true;
        }
      };
      timeout && setTimeout(function() {
        !_sealed && _rehydrate(void 0, new Error('redux-persist: persist timed out for persist key "'.concat(config.key, '"')));
      }, timeout);
      _paused = false;
      if (!_persistoid) _persistoid = createPersistoid(config);
      if (_persist) {
        return _objectSpread2({}, baseReducer(restState, action), {
          _persist
        });
      }
      if (typeof action.rehydrate !== "function" || typeof action.register !== "function") throw new Error("redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.");
      action.register(config.key);
      getStoredState2(config).then(function(restoredState) {
        var migrate = config.migrate || function(s, v) {
          return Promise.resolve(s);
        };
        migrate(restoredState, version).then(function(migratedState) {
          _rehydrate(migratedState);
        }, function(migrateErr) {
          if (migrateErr) console.error("redux-persist: migration error", migrateErr);
          _rehydrate(void 0, migrateErr);
        });
      }, function(err) {
        _rehydrate(void 0, err);
      });
      return _objectSpread2({}, baseReducer(restState, action), {
        _persist: {
          version,
          rehydrated: false
        }
      });
    } else if (action.type === PURGE) {
      _purge = true;
      action.result(purgeStoredState(config));
      return _objectSpread2({}, baseReducer(restState, action), {
        _persist
      });
    } else if (action.type === FLUSH) {
      action.result(_persistoid && _persistoid.flush());
      return _objectSpread2({}, baseReducer(restState, action), {
        _persist
      });
    } else if (action.type === PAUSE) {
      _paused = true;
    } else if (action.type === REHYDRATE) {
      if (_purge) return _objectSpread2({}, restState, {
        _persist: _objectSpread2({}, _persist, {
          rehydrated: true
        })
        // @NOTE if key does not match, will continue to default else below
      });
      if (action.key === config.key) {
        var reducedState = baseReducer(restState, action);
        var inboundState = action.payload;
        var reconciledRest = stateReconciler !== false && inboundState !== void 0 ? stateReconciler(inboundState, state, reducedState, config) : reducedState;
        var _newState = _objectSpread2({}, reconciledRest, {
          _persist: _objectSpread2({}, _persist, {
            rehydrated: true
          })
        });
        return conditionalUpdate(_newState);
      }
    }
    if (!_persist) return baseReducer(state, action);
    var newState = baseReducer(restState, action);
    if (newState === restState) return state;
    return conditionalUpdate(_objectSpread2({}, newState, {
      _persist
    }));
  };
}

// node_modules/redux-persist/es/stateReconciler/autoMergeLevel2.js
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof3(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof2 = function _typeof3(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof2(obj);
}
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys3(source, true).forEach(function(key) {
        _defineProperty3(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys3(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function autoMergeLevel2(inboundState, originalState, reducedState, _ref) {
  var debug = _ref.debug;
  var newState = _objectSpread3({}, reducedState);
  if (inboundState && _typeof2(inboundState) === "object") {
    Object.keys(inboundState).forEach(function(key) {
      if (key === "_persist") return;
      if (originalState[key] !== reducedState[key]) {
        if (debug) console.log("redux-persist/stateReconciler: sub state for key `%s` modified, skipping.", key);
        return;
      }
      if (isPlainEnoughObject(reducedState[key])) {
        newState[key] = _objectSpread3({}, newState[key], {}, inboundState[key]);
        return;
      }
      newState[key] = inboundState[key];
    });
  }
  if (debug && inboundState && _typeof2(inboundState) === "object") console.log("redux-persist/stateReconciler: rehydrated keys '".concat(Object.keys(inboundState).join(", "), "'"));
  return newState;
}
function isPlainEnoughObject(o) {
  return o !== null && !Array.isArray(o) && _typeof2(o) === "object";
}

// node_modules/redux-persist/es/persistCombineReducers.js
function persistCombineReducers(config, reducers) {
  config.stateReconciler = config.stateReconciler === void 0 ? autoMergeLevel2 : config.stateReconciler;
  return persistReducer(config, combineReducers(reducers));
}

// node_modules/redux-persist/es/persistStore.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function ownKeys4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys4(source, true).forEach(function(key) {
        _defineProperty4(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys4(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
var initialState = {
  registry: [],
  bootstrapped: false
};
var persistorReducer = function persistorReducer2() {
  var state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : void 0;
  switch (action.type) {
    case REGISTER:
      return _objectSpread4({}, state, {
        registry: [].concat(_toConsumableArray(state.registry), [action.key])
      });
    case REHYDRATE:
      var firstIndex = state.registry.indexOf(action.key);
      var registry = _toConsumableArray(state.registry);
      registry.splice(firstIndex, 1);
      return _objectSpread4({}, state, {
        registry,
        bootstrapped: registry.length === 0
      });
    default:
      return state;
  }
};
function persistStore(store, options, cb) {
  if (true) {
    var optionsToTest = options || {};
    var bannedKeys = ["blacklist", "whitelist", "transforms", "storage", "keyPrefix", "migrate"];
    bannedKeys.forEach(function(k) {
      if (!!optionsToTest[k]) console.error('redux-persist: invalid option passed to persistStore: "'.concat(k, '". You may be incorrectly passing persistConfig into persistStore, whereas it should be passed into persistReducer.'));
    });
  }
  var boostrappedCb = cb || false;
  var _pStore = createStore(persistorReducer, initialState, options && options.enhancer ? options.enhancer : void 0);
  var register = function register2(key) {
    _pStore.dispatch({
      type: REGISTER,
      key
    });
  };
  var rehydrate = function rehydrate2(key, payload, err) {
    var rehydrateAction = {
      type: REHYDRATE,
      payload,
      err,
      key
      // dispatch to `store` to rehydrate and `persistor` to track result
    };
    store.dispatch(rehydrateAction);
    _pStore.dispatch(rehydrateAction);
    if (boostrappedCb && persistor.getState().bootstrapped) {
      boostrappedCb();
      boostrappedCb = false;
    }
  };
  var persistor = _objectSpread4({}, _pStore, {
    purge: function purge() {
      var results = [];
      store.dispatch({
        type: PURGE,
        result: function result(purgeResult) {
          results.push(purgeResult);
        }
      });
      return Promise.all(results);
    },
    flush: function flush() {
      var results = [];
      store.dispatch({
        type: FLUSH,
        result: function result(flushResult) {
          results.push(flushResult);
        }
      });
      return Promise.all(results);
    },
    pause: function pause() {
      store.dispatch({
        type: PAUSE
      });
    },
    persist: function persist() {
      store.dispatch({
        type: PERSIST,
        register,
        rehydrate
      });
    }
  });
  if (!(options && options.manualPersist)) {
    persistor.persist();
  }
  return persistor;
}

// node_modules/redux-persist/es/createMigrate.js
function createMigrate(migrations, config) {
  var _ref = config || {}, debug = _ref.debug;
  return function(state, currentVersion) {
    if (!state) {
      if (debug) console.log("redux-persist: no inbound state, skipping migration");
      return Promise.resolve(void 0);
    }
    var inboundVersion = state._persist && state._persist.version !== void 0 ? state._persist.version : DEFAULT_VERSION;
    if (inboundVersion === currentVersion) {
      if (debug) console.log("redux-persist: versions match, noop migration");
      return Promise.resolve(state);
    }
    if (inboundVersion > currentVersion) {
      if (true) console.error("redux-persist: downgrading version is not supported");
      return Promise.resolve(state);
    }
    var migrationKeys = Object.keys(migrations).map(function(ver) {
      return parseInt(ver);
    }).filter(function(key) {
      return currentVersion >= key && key > inboundVersion;
    }).sort(function(a, b) {
      return a - b;
    });
    if (debug) console.log("redux-persist: migrationKeys", migrationKeys);
    try {
      var migratedState = migrationKeys.reduce(function(state2, versionKey) {
        if (debug) console.log("redux-persist: running migration for versionKey", versionKey);
        return migrations[versionKey](state2);
      }, state);
      return Promise.resolve(migratedState);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

// node_modules/redux-persist/es/createTransform.js
function createTransform(inbound, outbound) {
  var config = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var whitelist = config.whitelist || null;
  var blacklist = config.blacklist || null;
  function whitelistBlacklistCheck(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return true;
    if (blacklist && blacklist.indexOf(key) !== -1) return true;
    return false;
  }
  return {
    in: function _in(state, key, fullState) {
      return !whitelistBlacklistCheck(key) && inbound ? inbound(state, key, fullState) : state;
    },
    out: function out(state, key, fullState) {
      return !whitelistBlacklistCheck(key) && outbound ? outbound(state, key, fullState) : state;
    }
  };
}
export {
  DEFAULT_VERSION,
  FLUSH,
  KEY_PREFIX,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createMigrate,
  createPersistoid,
  createTransform,
  getStoredState,
  persistCombineReducers,
  persistReducer,
  persistStore,
  purgeStoredState
};
//# sourceMappingURL=redux-persist.js.map
