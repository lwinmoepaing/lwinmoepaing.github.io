if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let l={};const a=e=>i(e,r),c={module:{uri:r},exports:l,require:a};s[r]=Promise.all(n.map((e=>c[e]||a(e)))).then((e=>(o(...e),l)))}}define(["./workbox-4de3aa5f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"_config.yml",revision:"95b9185565555f2b4405dff033ce56c8"},{url:"assets/complete-product-with-react-and-react-native-d39cf9cc.js",revision:null},{url:"assets/entry-client-9054483f.js",revision:null},{url:"assets/entry-client-f3431375.css",revision:null},{url:"assets/getting-experience-for-potential-developer-de01202b.js",revision:null},{url:"assets/index-1702d1b1.js",revision:null},{url:"assets/index-29f96cde.js",revision:null},{url:"assets/index-30342383.js",revision:null},{url:"assets/index-8f1170a5.js",revision:null},{url:"assets/index-9f6ef06f.js",revision:null},{url:"assets/index-ba3b1d6e.js",revision:null},{url:"assets/MetaHead-a5351255.js",revision:null},{url:"assets/one-7156189a.js",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"clicky.mp3",revision:"c3d2fc536218cca6a92337fd6c2bb169"},{url:"favicon.ico",revision:"4fdee31751991038136c743458aa0940"},{url:"fonts/MyanmarSansPro-Regular.ttf",revision:"5afb21fb7e706e3c3c8bfbfb90150bfe"},{url:"fonts/MyanmarSansPro.woff",revision:"fd41011fbc8a5b83f6c64f575d7babc6"},{url:"fonts/MyanmarSansPro.woff2",revision:"40693c1824f46c39da64a9f3a5c0713b"},{url:"google0962776df775cf70.html",revision:"0a781e0155f961564ff908bcb88201e7"},{url:"images/blogs/what-is-linter.jpeg",revision:"75b803efc95ccbe0a32f7e418a17ac1a"},{url:"images/books/html_css.jpg",revision:"169c3e2016e162f03ad9d840c35f02d5"},{url:"images/logo/icon-192x192.png",revision:"4bc970781aec457abb499644bba06388"},{url:"images/logo/icon-256x256.png",revision:"ce1266100e312a0f347be545e6952140"},{url:"images/logo/icon-384x384.png",revision:"e3f5860253c941d9ee7c0f6817381a93"},{url:"images/logo/icon-512x512.png",revision:"989db63857bdc39dbd0c148de0bf695c"},{url:"images/mask.svg",revision:"1e75521e83eceeac4bc82633a207c484"},{url:"images/og_facebook_lmp.jpg",revision:"8ae0776714a6c2cd2c99a5b26e97c437"},{url:"manifest.json",revision:"24ef06e0dbb7ce6472813d45ef0de13e"},{url:"manifest.webmanifest",revision:"5f01591e08fb700b874d658cddba2743"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"ssr-manifest.json",revision:"4b7c91bbd559a592fe25bf4ea2e5a491"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"./images/logo/icon-192x192.png",revision:"4bc970781aec457abb499644bba06388"},{url:"./images/logo/icon-256x256.png",revision:"ce1266100e312a0f347be545e6952140"},{url:"./images/logo/icon-384x384.png",revision:"e3f5860253c941d9ee7c0f6817381a93"},{url:"./images/logo/icon-512x512.png",revision:"989db63857bdc39dbd0c148de0bf695c"},{url:"google0962776df775cf70.html",revision:"0a781e0155f961564ff908bcb88201e7"},{url:"manifest.webmanifest",revision:"5f01591e08fb700b874d658cddba2743"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
