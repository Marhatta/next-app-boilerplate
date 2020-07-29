// 'use strict'
//  self.importScripts('./idb.js');
// if (typeof idb === "undefined") self.importScripts("https://unpkg.com/idb@4.0.5/build/iife/index-min.js");
import { openDB, deleteDB, wrap, unwrap } from "idb";

var d = new Date();
const CACHE_VERSION = d.getTime();
const CACHE_STATIC_NAME = `simple-cache-v${CACHE_VERSION}`;
const CACHE_DYNAMIC_NAME = `dynamic-cache-v${CACHE_VERSION}`;
const CACHE_APISTORE_NAME = `dynamic-cache-api-v${CACHE_VERSION}`;

const urlsToCache = ["/", "/offline", "/index", "/newPage"];

// indexdb caching...
let db;
(function dbOperation() {
  console.log("running url index db ...");

  async function createDB() {
    db = await openDB("ApiDB", 1, {
      upgrade(db) {
        // Create a store of objects
        const store = db.createObjectStore("apistore", {
          // The 'id' property of the object will be the key.
          keyPath: "url",
          // If it isn't explicitly set, create a value by auto incrementing.
          // autoIncrement: true,
        });
        // Create an index on the 'date' property of the objects.
        // store.createIndex('date', 'date');
      },
    });
  }
  createDB();
  console.log("store ok ");
})();

self.addEventListener("install", (event) => {
  console.log("Service worker registered");
  const preLoaded = caches
    .open(CACHE_STATIC_NAME)
    .then((cache) => cache.addAll(urlsToCache));
  event.waitUntil(preLoaded);
});

/**
 * Checks for the cache version
 * if there is new version present, then clears the old caches
 */
self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  // add something to index db
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[Service Worker] Removing old cache.", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// handle network request
self.addEventListener("fetch", (event) => {
  let reqUrl = event.request.url;
  console.log("REQ FROM SW :->URL :", reqUrl);
  let isApiReq =
    event.request.url === "https://jsonplaceholder.typicode.com/todos";
  if (isApiReq) {
    event.respondWith(
      fetch(event.request)
        .then(function (res) {
          // console.log("res befor idb store" , res);
          // let cpRes = res;
          if (res.status == 200) {
            res
              .clone()
              .json()
              .then((data) => {
                db.add("apistore", {
                  url: event.request.url,
                  body: data,
                });
              });
          }

          //  console.log("res after idb store" , res);

          return res;

          // console.log(
          //   "CACHING API DATA  ...TO LOCAL FROM NETWORK",
          //   event.request.url
          // );
          // return caches.open(CACHE_APISTORE_NAME).then(function (cache) {
          //   cache.put(event.request.url, res.clone());
          //   // update the cache and return the network res;
          //   return res;
          // });
          // }
        })
        .catch(function (err) {
          console.log("return from offline indexdb api===> ");
          console.log(" NETWORK FAIL API -> OFFLINE CACHE ");

          db.get("apistore", event.request.url).then((res) => {
            console.log("offline", res);
            return res.body;
          });

          // return caches.match(event.request).then((res) => {
          //   console.log("CHECKING FOR OFFLINE CACHE RESPONSE : ", res);
          //   if (res) {
          //     return res;

          //     //index

          //   } else {
          //     console.log("No offline chache Res!");
          //     return JSON.stringify({ message: "you are offline and no res data in cache" });
          //   }
          // });
        })
    );
  } else {
    // NETWORK FIRST CACHE STRATERGY
    event.respondWith(
      fetch(event.request)
        .then(function (res) {
          console.log("CACHING ...TO LOCAL FROM NETWORK", event.request.url);
          return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
            cache.put(event.request.url, res.clone());
            // update the cache and return the network res;
            return res;
          });
          // }
        })
        .catch(function (err) {
          console.log("NETWORK FAIL GENERAL -> OFFLINE CACHE");

          return caches.match(event.request.url).then((res) => {
            console.log("CHECKING FOR OFFLINE CACHE RESPONSE : ", res);
            if (res) {
              return res;
            } else {
              console.log("No offline chache Res!");
              return caches.match("/offline").then((res) => {
                return res;
              });
            }
          });
        })
    );
  }
});

// on notification click
self.addEventListener("notificationclick", (e) => {
  let notification = e.notification;
  let action = e.action;

  if (action === "open") {
    let url = location.origin;
    clients.openWindow(url);
    notification.close();
  } else {
    console.log("Notification _Rejected!");
    notification.close();
  }
});

// on application notification close
self.addEventListener("notificationclose", (e) => {
  let notification = e.notification;
  let action = e.action;

  console.log("notification is closed", notification);
});

// push notification from server
self.addEventListener("push", function (e) {
  console.log("server notification data", e.data);
  // generate the notification from server data
  let payload = e.data
    ? JSON.parse(e.data.text())
    : {
        title: "default Title for noitification",
        body: "default -server push notification body",
        //  icon: "/images/icons/icon-96x96.png",
      };

  let options = {
    body: payload.body,
    //  icon: "/images/icons/icon-96x96.png",
    // badge: "/images/icons/icon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "open",
        title: "Explore this new world",
        //      icon: "/images/icons/icon-96x96.png",
      },
      {
        action: "close",
        title: "Close",
        //icon: "/images/icons/icon-96x96.png",
      },
    ],
  };
  e.waitUntil(self.registration.showNotification(payload.title, options));
});
