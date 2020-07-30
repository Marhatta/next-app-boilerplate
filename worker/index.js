'use strict'

import { openDB, deleteDB, wrap, unwrap } from "idb";


const CACHE_VERSION = 66;
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
  const apiUrlPtr = 'jsonplaceholder'
  if (isreqUrl.includes(apiUrlPtr)) {
    event.respondWith(
      fetch(event.request)
        .then(function (res) {
          // store  the request res to indexdb
          if (res.status == 200) {
            res
              .clone()
              .json()
              .then((data) => {
                db.put("apistore", {
                  url: event.request.url,
                  body: data,
                });
              });
          }

          return res;
        })
        .catch(async function (err) {
          console.log("return from offline indexdb api===> ");
          console.log(" NETWORK FAIL API -> OFFLINE CACHE ");

          // return from indexdb store
          return db.get("apistore", event.request.url).then((res) => {
            console.log("================", res);
            return new Response(JSON.stringify(res.body),  { "status" : 200 , "statusText" : "MyCustomResponse!" })

            // return res.body;
          });
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
