'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "9acf2d0d6ef60c18deb986bd83a943eb",
"assets/AssetManifest.json": "818dcec502a69e1820dbd3fb72cbff3d",
"assets/assets/icon/icon.png": "cd2077421cc23557bb5aa94aa83e3cff",
"assets/assets/icon/logo.png": "cd2077421cc23557bb5aa94aa83e3cff",
"assets/assets/icon/web.png": "cd2077421cc23557bb5aa94aa83e3cff",
"assets/assets/images/android12_splash.png": "98cd8a519c1fc02b61194e364339f667",
"assets/assets/images/avatar_crest.png": "9e8d2bccfced034304d84924da68dee7",
"assets/assets/images/avatar_crest_2.png": "6cfc29e8657bb7138a6475d4dad6b4e4",
"assets/assets/images/avatar_crest_bordered.png": "c881f1e8bf8ffa7082bd2e207798b7d7",
"assets/assets/images/phone_frame.png": "875b36f2e99103a2994774395686afcd",
"assets/assets/images/rain_avatar.png": "7011b79bf4cbb3f3e1fcde23f30e73db",
"assets/assets/images/RaiN_v2.png": "91ad136104f77dce6c2895c9ef59df9b",
"assets/assets/images/robo.png": "0e270e1b3a4de004ee56c95189309659",
"assets/assets/images/splash.png": "a385ddf596fc64e49de22b9ef732c332",
"assets/assets/sounds/drop_002.ogg": "c93648d84483c6ba9c375ba570ab1648",
"assets/assets/sounds/drop_003.ogg": "a7fbcb59b45db1d2b998ea416bf52c62",
"assets/assets/sounds/test.wav": "736a6a95f281154218683558dbbd3770",
"assets/assets/sounds/ui_blip_01.mp3": "30649dbcad4d8d6fd5884027fb2afcf2",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "dcd756c8884d0c695435c5212e6a8a4c",
"assets/NOTICES": "fefbe6db29ebf28b172dc6efc84730b0",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/dash_chat_2/assets/placeholder.png": "ce1fece6c831b69b75c6c25a60b5b0f3",
"assets/packages/dash_chat_2/assets/profile_placeholder.png": "77f5794e2eb49f7989b8f85e92cfa4e0",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "628672b47d2ec4b26ec6535182171e7d",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "0fd02fe7c7b893e64d990c3f590ea8e4",
"icons/Icon-512.png": "0fd132ce0cb86763667c78f7e18f76ce",
"icons/Icon-maskable-192.png": "0fd02fe7c7b893e64d990c3f590ea8e4",
"icons/Icon-maskable-512.png": "0fd132ce0cb86763667c78f7e18f76ce",
"index.html": "2883879b55bf2221175e986f46f833ea",
"/": "2883879b55bf2221175e986f46f833ea",
"index.html.bak": "1ed609098a77024af31ba7fbfb4ecbf7",
"main.dart.js": "dee9c9ff9bd091cf6f4d1c2e68682ddf",
"manifest.json": "9c5ea7a059927bd4fda52b00e564e828",
"splash/img/dark-1x.png": "a4ac247253d7ee728dd4a28738aa22b0",
"splash/img/dark-2x.png": "e016450857a8319eef6417cfd9da4fa5",
"splash/img/dark-3x.png": "98be9dde09f8ad05acbaa2463f0ff570",
"splash/img/dark-4x.png": "3d6c102d5cfb107c43ae77ca25bdeacb",
"splash/img/light-1x.png": "a4ac247253d7ee728dd4a28738aa22b0",
"splash/img/light-2x.png": "e016450857a8319eef6417cfd9da4fa5",
"splash/img/light-3x.png": "98be9dde09f8ad05acbaa2463f0ff570",
"splash/img/light-4x.png": "3d6c102d5cfb107c43ae77ca25bdeacb",
"version.json": "0f29191a5cc1fbbec7384dfc075d95fb"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
