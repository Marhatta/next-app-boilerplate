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

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 'use strict'\r\n\r\n\r\n\r\n// self.addEventListener(\"install\", (event) => {\r\n//   console.log(\"[Service Worker] Service worker registered...\");\r\n// });\r\n\r\n// self.addEventListener(\"activate\", function (event) {\r\n//   console.log(\"[Service Worker] Activating Service Worker ....\",event);\r\n// });\r\n\r\n\r\n// self.addEventListener('push', function (event) {\r\n//   const data = JSON.parse(event.data.text())\r\n//   event.waitUntil(\r\n//     registration.showNotification(data.title, {\r\n//       body: data.message,\r\n//       icon: '/icons/android-chrome-192x192.png'\r\n//     })\r\n//   )\r\n// })\r\n\r\n// self.addEventListener('notificationclick', function (event) {\r\n//   event.notification.close()\r\n//   event.waitUntil(\r\n//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {\r\n//       if (clientList.length > 0) {\r\n//         let client = clientList[0]\r\n//         for (let i = 0; i < clientList.length; i++) {\r\n//           if (clientList[i].focused) {\r\n//             client = clientList[i]\r\n//           }\r\n//         }\r\n//         return client.focus()\r\n//       }\r\n//       return clients.openWindow('/')\r\n//     })\r\n//   )\r\n// })\r\n\r\n// // self.addEventListener('pushsubscriptionchange', function(event) {\r\n// //   event.waitUntil(\r\n// //       Promise.all([\r\n// //           Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),\r\n// //           Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))\r\n// //               .then(function(sub) { return saveSubscription(sub) })\r\n// //       ])\r\n// //   )\r\n// // })\r\n\r\n\r\n\r\n\r\nconst CACHE_VERSION = 26;\r\nconst CACHE_STATIC_NAME = `simple-cache-v${CACHE_VERSION}`;\r\nconst CACHE_DYNAMIC_NAME = `dynamic-cache-v${CACHE_VERSION}`;\r\nconst CACHE_APISTORE_NAME = `dynamic-cache-api-v${CACHE_VERSION}`;\r\nconst urlsToCache = [\"/\", \r\n              \r\n                      \"/index\", \r\n                       \"/newPage\"\r\n                      ];\r\n\r\nself.addEventListener(\"install\", (event) => {\r\n  console.log(\"Service worker registered\");\r\n  const preLoaded = caches\r\n    .open(CACHE_STATIC_NAME)\r\n    .then((cache) => cache.addAll(urlsToCache));\r\n  event.waitUntil(preLoaded);\r\n});\r\n\r\nself.addEventListener(\"activate\", function (event) {\r\n  console.log(\"[Service Worker] Activating Service Worker ....\", event);\r\n\r\n  // add something to index db\r\n  event.waitUntil(\r\n    caches.keys().then(function (keyList) {\r\n      return Promise.all(\r\n        keyList.map(function (key) {\r\n          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {\r\n            console.log(\"[Service Worker] Removing old cache.\", key);\r\n            return caches.delete(key);\r\n          }\r\n        })\r\n      );\r\n    })\r\n  );\r\n  return self.clients.claim();\r\n});\r\n\r\n// handle network request\r\nself.addEventListener(\"fetch\", (event) => {\r\n  // chrome extension error\r\n  // if (!(event.request.url.indexOf(\"http\") === 0)) {\r\n  //   //skip request\r\n  //   return null;\r\n  // }  \r\n\r\n let reqUrl = event.request.url;\r\n console.log(\"REQ FROM SW :->URL :\",reqUrl)\r\n  let isApiReq =  event.request.url === \"http://localhost:3000/api/v2/users\";\r\n\r\n  if(isApiReq){\r\n    event.respondWith(\r\n      fetch(event.request)\r\n      .then(function (res) {\r\n          console.log(\"CACHING API DATA  ...TO LOCAL FROM NETWORK\" ,event.request.url );\r\n          return caches.open(CACHE_APISTORE_NAME).then(function (cache) {\r\n            cache.put(event.request.url, res.clone());\r\n            // update the cache and return the network res;\r\n            return res;\r\n          });\r\n        // }\r\n      })\r\n      .catch(function (err) {\r\n        console.log(\"NETWORK FAIL -> OFFLINE CACHE\");\r\n        return caches.match(\"/offline\").then((res) => {\r\n          console.log(\"CHECKING FOR OFFLINE CACHE RESPONSE : \", res);\r\n          if (res) {\r\n            return res;\r\n          } else {\r\n            console.log(\"No offline chache Res!\");\r\n            return JSON.stringify({ message: \"you are offline and no res data in cache\" });\r\n          }\r\n        });\r\n       }\r\n      )\r\n    )\r\n\r\n  }else{ \r\n\r\n  // NETWORK FIRST CACHE STRATERGY\r\n  event.respondWith(\r\n    fetch(event.request)\r\n      .then(function (res) {\r\n          console.log(\"CACHING ...TO LOCAL FROM NETWORK\" ,event.request.url );\r\n          return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {\r\n            cache.put(event.request.url, res.clone());\r\n            // update the cache and return the network res;\r\n            return res;\r\n          });\r\n        // }\r\n      })\r\n      .catch(function (err) {\r\n        console.log(\"NETWORK FAIL -> OFFLINE CACHE\");\r\n        return caches.match(event.request).then((res) => {\r\n          console.log(\"CHECKING FOR OFFLINE CACHE RESPONSE : \", res);\r\n          if (res) {\r\n            return res;\r\n          } else {\r\n            console.log(\"No offline chache Res!\");\r\n            return caches.match(\"/offline\").then((res) => { return res} );\r\n          }\r\n        });\r\n      })\r\n  );\r\n\r\n}\r\n\r\n});\r\n\r\n// on notification click\r\nself.addEventListener(\"notificationclick\", (e) => {\r\n  let notification = e.notification;\r\n  let action = e.action;\r\n\r\n  if (action === \"open\") {\r\n    let url = location.origin;\r\n    clients.openWindow(url);\r\n    notification.close();\r\n  } else {\r\n    console.log(\"Notification _Rejected!\");\r\n    notification.close();\r\n  }\r\n});\r\n\r\n// on application notification close\r\nself.addEventListener(\"notificationclose\", (e) => {\r\n  let notification = e.notification;\r\n  let action = e.action;\r\n\r\n  console.log(\"notification is closed\", notification);\r\n});\r\n\r\n// push notification from server\r\nself.addEventListener(\"push\", function (e) {\r\n  console.log(\"server notification data\", e.data);\r\n  // generate the notification from server data\r\n  let payload = e.data\r\n    ? JSON.parse(e.data.text())\r\n    : {\r\n      title: \"default Title for noitification\",\r\n      body: \"default -server push notification body\",\r\n      //  icon: \"/images/icons/icon-96x96.png\",\r\n    };\r\n\r\n  let options = {\r\n    body: payload.body,\r\n    //  icon: \"/images/icons/icon-96x96.png\",\r\n    // badge: \"/images/icons/icon-96x96.png\",\r\n    vibrate: [100, 50, 100],\r\n    data: {\r\n      dateOfArrival: Date.now(),\r\n      primaryKey: \"2\",\r\n    },\r\n    actions: [\r\n      {\r\n        action: \"open\",\r\n        title: \"Explore this new world\",\r\n        //      icon: \"/images/icons/icon-96x96.png\",\r\n      },\r\n      {\r\n        action: \"close\",\r\n        title: \"Close\",\r\n        //icon: \"/images/icons/icon-96x96.png\",\r\n      },\r\n    ],\r\n  };\r\n  e.waitUntil(self.registration.showNotification(payload.title, options));\r\n});\n\n//# sourceURL=webpack:///./worker/index.js?");

/***/ })

/******/ });