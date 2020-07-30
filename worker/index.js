"use strict";

import { openDB } from "idb";

const CACHE_VERSION = 1;
const CACHE_STATIC_NAME = `simple-cache-v${CACHE_VERSION}`;
const CACHE_DYNAMIC_NAME = `dynamic-cache-v${CACHE_VERSION}`;

/** URLS to be cached
 * (Static Caching)
 * Caches assets when PWA is installed
 */
const urlsToCache = ["/", "/offline", "/index"];

/** Create IndexDb Store
 * Open IndexDb to perform operations
 */
let db;
(function dbOperation() {
  async function createDB() {
    db = await openDB("ApiDB", 1, {
      upgrade(db) {
        const store = db.createObjectStore("apistore", {
          keyPath: "url",
        });
      },
    });
  }
  createDB();
})();

/**
 * Install service worker
 * #urlsToCache are cached here
 */
self.addEventListener("install", (event) => {
  console.log("Service worker registered");
  const preLoaded = caches
    .open(CACHE_STATIC_NAME)
    .then((cache) => cache.addAll(urlsToCache));
  event.waitUntil(preLoaded);
});

/**
 * Activating service worker
 * Remember to update the CACHE_VERSION while making any changes in the service worker
 */
self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  /**Clears the older cache i.e already existing cache */
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

/**Listens for any incoming request
 * Makes the actual request
 * Gets the response back
 * Response can be modified here
 * And then passed back to client app
 */

/**
 * NETWORK FIRST CACHE STRATEGY
 * Giving preference to network
 */
self.addEventListener("fetch", (event) => {
  let reqUrl = event.request.url;
  const apiUrlPtr = "jsonplaceholder";
  /** Store in index db for particular URLs */
  if (reqUrl.includes(apiUrlPtr)) {
    event.respondWith(
      fetch(event.request)
        .then(function (res) {
          /**Store the api response in index db */
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
          /**
           * If offline, sends back the data from indexdb
           */
          return db.get("apistore", event.request.url).then((res) => {
            return new Response(JSON.stringify(res.body));
          });
        })
    );
  } else {
    /**fetch the request and store in cache */
    event.respondWith(
      fetch(event.request)
        .then(function (res) {
          return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
            /**Remember to clone the response
             * As you can use "res" object only once
             */
            cache.put(event.request.url, res.clone());
            return res;
          });
        })
        .catch(function (err) {
          /**Serve response from cache */
          return caches.match(event.request.url).then((res) => {
            if (res) {
              return res;
            } else {
              /** If nothing found in cache as well, render a 404 page */
              return caches.match("/offline").then((res) => {
                return res;
              });
            }
          });
        })
    );
  }
});
