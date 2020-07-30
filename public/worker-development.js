/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./worker/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, deleteDB, openDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteDB\", function() { return deleteDB; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openDB\", function() { return openDB; });\n/* harmony import */ var _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrap-idb-value.js */ \"./node_modules/idb/build/esm/wrap-idb-value.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unwrap\", function() { return _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__[\"u\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"wrap\", function() { return _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__[\"w\"]; });\n\n\n\n\n/**\n * Open a database.\n *\n * @param name Name of the database.\n * @param version Schema version.\n * @param callbacks Additional callbacks.\n */\nfunction openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {\n    const request = indexedDB.open(name, version);\n    const openPromise = Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__[\"w\"])(request);\n    if (upgrade) {\n        request.addEventListener('upgradeneeded', (event) => {\n            upgrade(Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__[\"w\"])(request.result), event.oldVersion, event.newVersion, Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__[\"w\"])(request.transaction));\n        });\n    }\n    if (blocked)\n        request.addEventListener('blocked', () => blocked());\n    openPromise\n        .then((db) => {\n        if (terminated)\n            db.addEventListener('close', () => terminated());\n        if (blocking)\n            db.addEventListener('versionchange', () => blocking());\n    })\n        .catch(() => { });\n    return openPromise;\n}\n/**\n * Delete a database.\n *\n * @param name Name of the database.\n */\nfunction deleteDB(name, { blocked } = {}) {\n    const request = indexedDB.deleteDatabase(name);\n    if (blocked)\n        request.addEventListener('blocked', () => blocked());\n    return Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__[\"w\"])(request).then(() => undefined);\n}\n\nconst readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];\nconst writeMethods = ['put', 'add', 'delete', 'clear'];\nconst cachedMethods = new Map();\nfunction getMethod(target, prop) {\n    if (!(target instanceof IDBDatabase &&\n        !(prop in target) &&\n        typeof prop === 'string')) {\n        return;\n    }\n    if (cachedMethods.get(prop))\n        return cachedMethods.get(prop);\n    const targetFuncName = prop.replace(/FromIndex$/, '');\n    const useIndex = prop !== targetFuncName;\n    const isWrite = writeMethods.includes(targetFuncName);\n    if (\n    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.\n    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||\n        !(isWrite || readMethods.includes(targetFuncName))) {\n        return;\n    }\n    const method = async function (storeName, ...args) {\n        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(\n        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');\n        let target = tx.store;\n        if (useIndex)\n            target = target.index(args.shift());\n        const returnVal = await target[targetFuncName](...args);\n        if (isWrite)\n            await tx.done;\n        return returnVal;\n    };\n    cachedMethods.set(prop, method);\n    return method;\n}\nObject(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__[\"r\"])((oldTraps) => ({\n    ...oldTraps,\n    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),\n    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),\n}));\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb/build/esm/index.js?");

/***/ }),

/***/ "./node_modules/idb/build/esm/wrap-idb-value.js":
/*!******************************************************!*\
  !*** ./node_modules/idb/build/esm/wrap-idb-value.js ***!
  \******************************************************/
/*! exports provided: a, i, r, u, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return reverseTransformCache; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"i\", function() { return instanceOfAny; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"r\", function() { return replaceTraps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"u\", function() { return unwrap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"w\", function() { return wrap; });\nconst instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);\n\nlet idbProxyableTypes;\nlet cursorAdvanceMethods;\n// This is a function to prevent it throwing up in node environments.\nfunction getIdbProxyableTypes() {\n    return (idbProxyableTypes ||\n        (idbProxyableTypes = [\n            IDBDatabase,\n            IDBObjectStore,\n            IDBIndex,\n            IDBCursor,\n            IDBTransaction,\n        ]));\n}\n// This is a function to prevent it throwing up in node environments.\nfunction getCursorAdvanceMethods() {\n    return (cursorAdvanceMethods ||\n        (cursorAdvanceMethods = [\n            IDBCursor.prototype.advance,\n            IDBCursor.prototype.continue,\n            IDBCursor.prototype.continuePrimaryKey,\n        ]));\n}\nconst cursorRequestMap = new WeakMap();\nconst transactionDoneMap = new WeakMap();\nconst transactionStoreNamesMap = new WeakMap();\nconst transformCache = new WeakMap();\nconst reverseTransformCache = new WeakMap();\nfunction promisifyRequest(request) {\n    const promise = new Promise((resolve, reject) => {\n        const unlisten = () => {\n            request.removeEventListener('success', success);\n            request.removeEventListener('error', error);\n        };\n        const success = () => {\n            resolve(wrap(request.result));\n            unlisten();\n        };\n        const error = () => {\n            reject(request.error);\n            unlisten();\n        };\n        request.addEventListener('success', success);\n        request.addEventListener('error', error);\n    });\n    promise\n        .then((value) => {\n        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval\n        // (see wrapFunction).\n        if (value instanceof IDBCursor) {\n            cursorRequestMap.set(value, request);\n        }\n        // Catching to avoid \"Uncaught Promise exceptions\"\n    })\n        .catch(() => { });\n    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This\n    // is because we create many promises from a single IDBRequest.\n    reverseTransformCache.set(promise, request);\n    return promise;\n}\nfunction cacheDonePromiseForTransaction(tx) {\n    // Early bail if we've already created a done promise for this transaction.\n    if (transactionDoneMap.has(tx))\n        return;\n    const done = new Promise((resolve, reject) => {\n        const unlisten = () => {\n            tx.removeEventListener('complete', complete);\n            tx.removeEventListener('error', error);\n            tx.removeEventListener('abort', error);\n        };\n        const complete = () => {\n            resolve();\n            unlisten();\n        };\n        const error = () => {\n            reject(tx.error || new DOMException('AbortError', 'AbortError'));\n            unlisten();\n        };\n        tx.addEventListener('complete', complete);\n        tx.addEventListener('error', error);\n        tx.addEventListener('abort', error);\n    });\n    // Cache it for later retrieval.\n    transactionDoneMap.set(tx, done);\n}\nlet idbProxyTraps = {\n    get(target, prop, receiver) {\n        if (target instanceof IDBTransaction) {\n            // Special handling for transaction.done.\n            if (prop === 'done')\n                return transactionDoneMap.get(target);\n            // Polyfill for objectStoreNames because of Edge.\n            if (prop === 'objectStoreNames') {\n                return target.objectStoreNames || transactionStoreNamesMap.get(target);\n            }\n            // Make tx.store return the only store in the transaction, or undefined if there are many.\n            if (prop === 'store') {\n                return receiver.objectStoreNames[1]\n                    ? undefined\n                    : receiver.objectStore(receiver.objectStoreNames[0]);\n            }\n        }\n        // Else transform whatever we get back.\n        return wrap(target[prop]);\n    },\n    set(target, prop, value) {\n        target[prop] = value;\n        return true;\n    },\n    has(target, prop) {\n        if (target instanceof IDBTransaction &&\n            (prop === 'done' || prop === 'store')) {\n            return true;\n        }\n        return prop in target;\n    },\n};\nfunction replaceTraps(callback) {\n    idbProxyTraps = callback(idbProxyTraps);\n}\nfunction wrapFunction(func) {\n    // Due to expected object equality (which is enforced by the caching in `wrap`), we\n    // only create one new func per func.\n    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.\n    if (func === IDBDatabase.prototype.transaction &&\n        !('objectStoreNames' in IDBTransaction.prototype)) {\n        return function (storeNames, ...args) {\n            const tx = func.call(unwrap(this), storeNames, ...args);\n            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);\n            return wrap(tx);\n        };\n    }\n    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In\n    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the\n    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense\n    // with real promises, so each advance methods returns a new promise for the cursor object, or\n    // undefined if the end of the cursor has been reached.\n    if (getCursorAdvanceMethods().includes(func)) {\n        return function (...args) {\n            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use\n            // the original object.\n            func.apply(unwrap(this), args);\n            return wrap(cursorRequestMap.get(this));\n        };\n    }\n    return function (...args) {\n        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use\n        // the original object.\n        return wrap(func.apply(unwrap(this), args));\n    };\n}\nfunction transformCachableValue(value) {\n    if (typeof value === 'function')\n        return wrapFunction(value);\n    // This doesn't return, it just creates a 'done' promise for the transaction,\n    // which is later returned for transaction.done (see idbObjectHandler).\n    if (value instanceof IDBTransaction)\n        cacheDonePromiseForTransaction(value);\n    if (instanceOfAny(value, getIdbProxyableTypes()))\n        return new Proxy(value, idbProxyTraps);\n    // Return the same value back if we're not going to transform it.\n    return value;\n}\nfunction wrap(value) {\n    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because\n    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.\n    if (value instanceof IDBRequest)\n        return promisifyRequest(value);\n    // If we've already transformed this value before, reuse the transformed value.\n    // This is faster, but it also provides object equality.\n    if (transformCache.has(value))\n        return transformCache.get(value);\n    const newValue = transformCachableValue(value);\n    // Not all types are transformed.\n    // These may be primitive types, so they can't be WeakMap keys.\n    if (newValue !== value) {\n        transformCache.set(value, newValue);\n        reverseTransformCache.set(newValue, value);\n    }\n    return newValue;\n}\nconst unwrap = (value) => reverseTransformCache.get(value);\n\n\n\n\n//# sourceURL=webpack:///./node_modules/idb/build/esm/wrap-idb-value.js?");

/***/ }),

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb */ \"./node_modules/idb/build/esm/index.js\");\n// 'use strict'\r\n//  self.importScripts('./idb.js');\r\n// if (typeof idb === \"undefined\") self.importScripts(\"https://unpkg.com/idb@4.0.5/build/iife/index-min.js\");\r\n\r\n\r\nvar d = new Date();\r\n\r\nconst CACHE_VERSION = 59;\r\nconst CACHE_STATIC_NAME = `simple-cache-v${CACHE_VERSION}`;\r\nconst CACHE_DYNAMIC_NAME = `dynamic-cache-v${CACHE_VERSION}`;\r\nconst CACHE_APISTORE_NAME = `dynamic-cache-api-v${CACHE_VERSION}`;\r\n\r\nconst urlsToCache = [\"/\", \"/offline\", \"/index\", \"/newPage\"];\r\n\r\n// indexdb caching...\r\nlet db;\r\n(function dbOperation() {\r\n  console.log(\"running url index db ...\");\r\n\r\n  async function createDB() {\r\n    db = await Object(idb__WEBPACK_IMPORTED_MODULE_0__[\"openDB\"])(\"ApiDB\", 1, {\r\n      upgrade(db) {\r\n        // Create a store of objects\r\n        const store = db.createObjectStore(\"apistore\", {\r\n          // The 'id' property of the object will be the key.\r\n          keyPath: \"url\",\r\n          // If it isn't explicitly set, create a value by auto incrementing.\r\n          // autoIncrement: true,\r\n        });\r\n        // Create an index on the 'date' property of the objects.\r\n        // store.createIndex('date', 'date');\r\n      },\r\n    });\r\n  }\r\n  createDB();\r\n  console.log(\"store ok \");\r\n})();\r\n\r\nself.addEventListener(\"install\", (event) => {\r\n  console.log(\"Service worker registered\");\r\n  const preLoaded = caches\r\n    .open(CACHE_STATIC_NAME)\r\n    .then((cache) => cache.addAll(urlsToCache));\r\n  event.waitUntil(preLoaded);\r\n});\r\n\r\nself.addEventListener(\"activate\", function (event) {\r\n  console.log(\"[Service Worker] Activating Service Worker ....\", event);\r\n\r\n  // add something to index db\r\n  event.waitUntil(\r\n    caches.keys().then(function (keyList) {\r\n      return Promise.all(\r\n        keyList.map(function (key) {\r\n          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {\r\n            console.log(\"[Service Worker] Removing old cache.\", key);\r\n            return caches.delete(key);\r\n          }\r\n        })\r\n      );\r\n    })\r\n  );\r\n  return self.clients.claim();\r\n});\r\n\r\n// handle network request\r\nself.addEventListener(\"fetch\", (event) => {\r\n  let reqUrl = event.request.url;\r\n\r\n  console.log(\"REQ FROM SW :->URL :\", reqUrl);\r\n  let isApiReq =\r\n    event.request.url === \"https://jsonplaceholder.typicode.com/todos\";\r\n\r\n  if (isApiReq) {\r\n    event.respondWith(\r\n      fetch(event.request)\r\n        .then(function (res) {\r\n          // store  the request res to indexdb\r\n          if (res.status == 200) {\r\n            res\r\n              .clone()\r\n              .json()\r\n              .then((data) => {\r\n                db.add(\"apistore\", {\r\n                  url: event.request.url,\r\n                  body: data,\r\n                });\r\n              });\r\n          }\r\n\r\n          return res;\r\n        })\r\n        .catch(async function (err) {\r\n          console.log(\"return from offline indexdb api===> \");\r\n          console.log(\" NETWORK FAIL API -> OFFLINE CACHE \");\r\n\r\n          // return from indexdb store\r\n          return db.get(\"apistore\", event.request.url).then((res) => {\r\n            console.log(\"================\", res);\r\n            return res.body;\r\n          });\r\n        })\r\n    );\r\n  } else {\r\n    // NETWORK FIRST CACHE STRATERGY\r\n    event.respondWith(\r\n      fetch(event.request)\r\n        .then(function (res) {\r\n          console.log(\"CACHING ...TO LOCAL FROM NETWORK\", event.request.url);\r\n          return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {\r\n            cache.put(event.request.url, res.clone());\r\n            // update the cache and return the network res;\r\n            return res;\r\n          });\r\n        })\r\n        .catch(function (err) {\r\n          console.log(\"NETWORK FAIL GENERAL -> OFFLINE CACHE\");\r\n\r\n          return caches.match(event.request.url).then((res) => {\r\n            console.log(\"CHECKING FOR OFFLINE CACHE RESPONSE : \", res);\r\n            if (res) {\r\n              return res;\r\n            } else {\r\n              console.log(\"No offline chache Res!\");\r\n              return caches.match(\"/offline\").then((res) => {\r\n                return res;\r\n              });\r\n            }\r\n          });\r\n        })\r\n    );\r\n  }\r\n});\r\n\r\n// on notification click\r\nself.addEventListener(\"notificationclick\", (e) => {\r\n  let notification = e.notification;\r\n  let action = e.action;\r\n\r\n  if (action === \"open\") {\r\n    let url = location.origin;\r\n    clients.openWindow(url);\r\n    notification.close();\r\n  } else {\r\n    console.log(\"Notification _Rejected!\");\r\n    notification.close();\r\n  }\r\n});\r\n\r\n// on application notification close\r\nself.addEventListener(\"notificationclose\", (e) => {\r\n  let notification = e.notification;\r\n  let action = e.action;\r\n\r\n  console.log(\"notification is closed\", notification);\r\n});\r\n\r\n// push notification from server\r\nself.addEventListener(\"push\", function (e) {\r\n  console.log(\"server notification data\", e.data);\r\n  // generate the notification from server data\r\n  let payload = e.data\r\n    ? JSON.parse(e.data.text())\r\n    : {\r\n        title: \"default Title for noitification\",\r\n        body: \"default -server push notification body\",\r\n        //  icon: \"/images/icons/icon-96x96.png\",\r\n      };\r\n\r\n  let options = {\r\n    body: payload.body,\r\n    //  icon: \"/images/icons/icon-96x96.png\",\r\n    // badge: \"/images/icons/icon-96x96.png\",\r\n    vibrate: [100, 50, 100],\r\n    data: {\r\n      dateOfArrival: Date.now(),\r\n      primaryKey: \"2\",\r\n    },\r\n    actions: [\r\n      {\r\n        action: \"open\",\r\n        title: \"Explore this new world\",\r\n        //      icon: \"/images/icons/icon-96x96.png\",\r\n      },\r\n      {\r\n        action: \"close\",\r\n        title: \"Close\",\r\n        //icon: \"/images/icons/icon-96x96.png\",\r\n      },\r\n    ],\r\n  };\r\n  e.waitUntil(self.registration.showNotification(payload.title, options));\r\n});\r\n\n\n//# sourceURL=webpack:///./worker/index.js?");

/***/ })

/******/ });