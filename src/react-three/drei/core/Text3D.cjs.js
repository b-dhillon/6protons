"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("@babel/runtime/helpers/extends"),t=require("react"),r=require("@react-three/fiber"),n=require("suspend-react"),s=require("three-stdlib");function i(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function u(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var l=i(e),a=u(t);const c=["string","number"],o=a.forwardRef((({font:e,letterSpacing:i=0,lineHeight:u=1,size:o=1,height:f=.2,bevelThickness:b=.1,bevelSize:d=.01,bevelEnabled:m=!1,bevelOffset:h=0,bevelSegments:v=4,curveSegments:g=8,children:p,...y},O)=>{a.useMemo((()=>r.extend({RenamedTextGeometry:s.TextGeometry})),[]);const j=n.suspend((async()=>{let t="string"==typeof e?await(await fetch(e)).json():e;return(new s.FontLoader).parse(t)}),[e]),x=t.useMemo((()=>({font:j,size:o,height:f,bevelThickness:b,bevelSize:d,bevelEnabled:m,bevelSegments:v,bevelOffset:h,curveSegments:g,letterSpacing:i,lineHeight:u})),[j,o,f,b,d,m,v,h,g,i,u]),[S,...E]=t.useMemo((()=>(e=>{let t="";const r=[];return a.Children.forEach(e,(e=>{c.includes(typeof e)?t+=e+"":r.push(e)})),[t,...r]})(p)),[p]),M=a.useMemo((()=>[S,x]),[S,x]);return a.createElement("mesh",l.default({},y,{ref:O}),a.createElement("renamedTextGeometry",{args:M}),E)}));exports.Text3D=o;