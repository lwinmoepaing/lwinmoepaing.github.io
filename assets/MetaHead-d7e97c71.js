import{u as r,f as t,M as e,l as i,T as a}from"./entry-client-589a561d.js";function c(n){const o=r();return[t(e,{name:"twitter:site",content:"@github"}),t(e,{name:"twitter:card",content:"summary_large_image"}),t(e,{name:"twitter:title",get content(){return n.title||""}}),t(e,{name:"twitter:description",get content(){return n.body||""}}),t(e,{property:"og:url",get content(){return o.pathname}}),t(e,{property:"og:type",content:"article"}),t(e,{property:"og:title",get content(){return`${n.title||""} | Lwin Moe Paing`}}),t(e,{property:"og:description",get content(){return n.body||""}}),t(e,{property:"og:image",content:"https://lwinmoepaing.github.io/images/og_facebook_lmp.jpg"}),t(a,{get children(){return[i(()=>n.title||"")," | Lwin Moe Paing "]}})]}export{c as M};