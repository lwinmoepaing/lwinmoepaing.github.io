if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let o={};const c=e=>i(e,a),l={module:{uri:a},exports:o,require:c};s[a]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-4de3aa5f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_config.yml",revision:"95b9185565555f2b4405dff033ce56c8"},{url:"assets/complete-product-with-react-and-react-native-987c5022.js",revision:null},{url:"assets/entry-client-5398b411.js",revision:null},{url:"assets/entry-client-b08a093d.css",revision:null},{url:"assets/getting-experience-for-potential-developer-483acfb4.js",revision:null},{url:"assets/index-2568edae.js",revision:null},{url:"assets/index-6fa79abe.js",revision:null},{url:"assets/index-86cdcc27.js",revision:null},{url:"assets/index-8c04fbf4.js",revision:null},{url:"assets/index-9ba8301b.js",revision:null},{url:"assets/index-d8f0ed92.js",revision:null},{url:"assets/MetaHead-6318ea6f.js",revision:null},{url:"assets/one-207fc20d.js",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"clicky.mp3",revision:"c3d2fc536218cca6a92337fd6c2bb169"},{url:"favicon.ico",revision:"4fdee31751991038136c743458aa0940"},{url:"fonts/MyanmarSansPro-Regular.ttf",revision:"5afb21fb7e706e3c3c8bfbfb90150bfe"},{url:"fonts/MyanmarSansPro.woff",revision:"fd41011fbc8a5b83f6c64f575d7babc6"},{url:"fonts/MyanmarSansPro.woff2",revision:"40693c1824f46c39da64a9f3a5c0713b"},{url:"google0962776df775cf70.html",revision:"0a781e0155f961564ff908bcb88201e7"},{url:"images/blogs/what-is-linter.jpeg",revision:"75b803efc95ccbe0a32f7e418a17ac1a"},{url:"images/books/html_css.jpg",revision:"169c3e2016e162f03ad9d840c35f02d5"},{url:"images/html-css-ebook.jpg",revision:"5667125d5d2e0b6413acdd97bac00a64"},{url:"images/html-css-ebook.webp",revision:"3b99a3206343b48bdb2ccd23f7989036"},{url:"images/logo/icon-192x192.png",revision:"4bc970781aec457abb499644bba06388"},{url:"images/logo/icon-256x256.png",revision:"ce1266100e312a0f347be545e6952140"},{url:"images/logo/icon-384x384.png",revision:"e3f5860253c941d9ee7c0f6817381a93"},{url:"images/logo/icon-512x512.png",revision:"989db63857bdc39dbd0c148de0bf695c"},{url:"images/mask.svg",revision:"1e75521e83eceeac4bc82633a207c484"},{url:"images/og_facebook_lmp.jpg",revision:"5fc089c1e5dd136b48edfa2e9a1c7fda"},{url:"images/sharing.jpg",revision:"6db33e9a10597ab39a501bab95586e1c"},{url:"images/sharing.webp",revision:"4540ded747c301dd955dc549ca54b05d"},{url:"images/varcamp.jpg",revision:"74faab35bf54328182c070edcfeea211"},{url:"images/varcamp.webp",revision:"79e496fed6014464ea36cfac1741497c"},{url:"manifest.json",revision:"10cbebb790a3767354147333ea5931bc"},{url:"manifest.webmanifest",revision:"5f01591e08fb700b874d658cddba2743"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"ssr-manifest.json",revision:"ac91b8e1f2820f118139e81906016d7a"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"./images/logo/icon-192x192.png",revision:"4bc970781aec457abb499644bba06388"},{url:"./images/logo/icon-256x256.png",revision:"ce1266100e312a0f347be545e6952140"},{url:"./images/logo/icon-384x384.png",revision:"e3f5860253c941d9ee7c0f6817381a93"},{url:"./images/logo/icon-512x512.png",revision:"989db63857bdc39dbd0c148de0bf695c"},{url:"google0962776df775cf70.html",revision:"0a781e0155f961564ff908bcb88201e7"},{url:"manifest.webmanifest",revision:"5f01591e08fb700b874d658cddba2743"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
