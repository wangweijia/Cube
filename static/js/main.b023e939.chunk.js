(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){},16:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);var o=t(1),i=t.n(o),a=t(8),r=t.n(a),c=(t(15),t(2)),s=t(3),l=t(5),u=t(4),y=t(6),h=t(0),d=100,x=[255,65280,16711680,16776960,16711935,65535],v=[[[{x:-1,y:-1,z:-1,colorPoint:{x:-1,y:-1,z:-1}},{x:-1,y:0,z:-1,colorPoint:{x:-1,y:0,z:-1}},{x:-1,y:1,z:-1,colorPoint:{x:-1,y:1,z:-1}}],[{x:0,y:-1,z:-1,colorPoint:{x:0,y:-1,z:-1}},{x:0,y:0,z:-1,colorPoint:{x:0,y:0,z:-1}},{x:0,y:1,z:-1,colorPoint:{x:0,y:1,z:-1}}],[{x:1,y:-1,z:-1,colorPoint:{x:1,y:-1,z:-1}},{x:1,y:0,z:-1,colorPoint:{x:1,y:0,z:-1}},{x:1,y:1,z:-1,colorPoint:{x:1,y:1,z:-1}}]],[[{x:-1,y:-1,z:0,colorPoint:{x:-1,y:-1,z:0}},{x:-1,y:0,z:0,colorPoint:{x:-1,y:0,z:0}},{x:-1,y:1,z:0,colorPoint:{x:-1,y:1,z:0}}],[{x:0,y:-1,z:0,colorPoint:{x:0,y:-1,z:0}},{x:0,y:0,z:0,colorPoint:{x:0,y:0,z:0}},{x:0,y:1,z:0,colorPoint:{x:0,y:1,z:0}}],[{x:1,y:-1,z:0,colorPoint:{x:1,y:-1,z:0}},{x:1,y:0,z:0,colorPoint:{x:1,y:0,z:0}},{x:1,y:1,z:0,colorPoint:{x:1,y:1,z:0}}]],[[{x:-1,y:-1,z:1,colorPoint:{x:-1,y:-1,z:1}},{x:-1,y:0,z:1,colorPoint:{x:-1,y:0,z:1}},{x:-1,y:1,z:1,colorPoint:{x:-1,y:1,z:1}}],[{x:0,y:-1,z:1,colorPoint:{x:0,y:-1,z:1}},{x:0,y:0,z:1,colorPoint:{x:0,y:0,z:1}},{x:0,y:1,z:1,colorPoint:{x:0,y:1,z:1}}],[{x:1,y:-1,z:1,colorPoint:{x:1,y:-1,z:1}},{x:1,y:0,z:1,colorPoint:{x:1,y:0,z:1}},{x:1,y:1,z:1,colorPoint:{x:1,y:1,z:1}}]]],m=function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(l.a)(this,Object(u.a)(n).call(this,e)))._onMouseDown=function(e){var n=e.clientX,o=e.clientY;t.clientX=n,t.clientY=o,t.mouse.x=n/t.renderer.domElement.clientWidth*2-1,t.mouse.y=-o/t.renderer.domElement.clientHeight*2+1,t.raycaster.setFromCamera(t.mouse,t.camera);var i=t.raycaster.intersectObjects(t.scene.children);if(i.length>0){var a=i[0];t.cubeItem=a}else t.onMouseDown=!0,t.drx=t.angle1,t.dry=t.angle2},t._onMouseMove=function(e){var n=e.clientX,o=e.clientY;if(void 0!==t.cubeItem){t.mouse.x=e.clientX/t.renderer.domElement.clientWidth*2-1,t.mouse.y=-e.clientY/t.renderer.domElement.clientHeight*2+1,t.raycaster.setFromCamera(t.mouse,t.camera);var i=t.raycaster.intersectObjects(t.scene.children);if(i.length>0){for(var a=i[0],r=["x","y","z"],c={x:a.point.x-t.cubeItem.point.x,y:a.point.y-t.cubeItem.point.y,z:a.point.z-t.cubeItem.point.z},s=void 0,l=0,u=0;u<r.length;u++){var y=r[u],h=Math.abs(c[y]);s=y,l=c[y];for(var x=u+1;u<r.length;u++){var v=r[x];if(Math.abs(c[v])>h){s=void 0,l=0;break}}if(s===y)break}if(Math.abs(l)>d/2){for(var m=t.cubeItem.point,z=void 0,f=0;f<r.length;f++){var p=r[f],b=m[p];if(Math.abs(b)>=1.5*d-.1){z=p;break}}var w=t.cubeItem.point,M=w.x,g=w.y,P=w.z,k=function(e){var n=parseInt((Math.abs(e)+d/2-1)/d);return e>=0?n:-n},I={x:k(M),y:k(g),z:k(P)},O=r.indexOf(z);O>-1&&r.splice(O,1);var j=r.indexOf(s);j>-1&&r.splice(j,1);var E=r[0];t.cubeItem=void 0;var C=0;if("x"===E){var D=I[z];C="y"===z&&D<0||"z"===z&&D>0?l>0?1:0:l>0?0:1}else if("y"===E){var _=I[z];C="z"===z&&_<0||"x"===z&&_>0?l>0?1:0:l>0?0:1}else if("z"===E){var H=I[z];C="x"===z&&H<0||"y"===z&&H>0?l>0?1:0:l>0?0:1}t.rotate(I,E,C)}}}else if(t.onMouseDown&&void 0!==t.clientX&&void 0!==t.clientY){var W=t.clientX-n,B=t.clientY-o;t.drx=t.angle1+W/window.innerWidth*2*Math.PI,t.dry=t.angle2+B/window.innerHeight*2*Math.PI;var X=t.cameraPosition(t.drx,t.dry),Y=X.x,F=X.y,T=X.z;t.camera.position.x=Y,t.camera.position.y=F,t.camera.position.z=T,t.camera.lookAt(0,0,0),t.renderer.clear(),t.renderer.render(t.scene,t.camera)}},t._onMouseUp=function(e){t.cubeItem=void 0,t.onMouseDown=!1,t.clientX=void 0,t.clientY=void 0,t.ccccccc=!0,void 0!==t.drx&&(t.angle1=t.drx),void 0!==t.dry&&(t.angle2=t.dry)},t.onMouseDown=!1,t.angle1=Math.PI/2,t.angle2=0,t.allObjects=[],t}return Object(y.a)(n,e),Object(s.a)(n,[{key:"componentDidMount",value:function(){this.renderCube()}},{key:"cameraPosition",value:function(e,n){return{x:1e3*Math.sin(e)*Math.cos(n),y:1e3*Math.sin(e)*Math.sin(n),z:1e3*Math.cos(e)}}},{key:"initThree",value:function(){var e=document.getElementById("canvas-frame").clientWidth,n=document.getElementById("canvas-frame").clientHeight,t=new h.p({antialias:!0});return t.setSize(e,n),document.getElementById("canvas-frame").appendChild(t.domElement),t.setClearColor(16777215,1),t}},{key:"initRaycaster",value:function(){this.raycaster=new h.l,this.mouse=new h.n}},{key:"initCamera",value:function(){var e=document.getElementById("canvas-frame").clientWidth,n=document.getElementById("canvas-frame").clientHeight,t=this.cameraPosition(this.angle1,this.angle2),o=t.x,i=t.y,a=t.z,r=new h.k(75,e/n,1,1e4);return r.position.x=o,r.position.y=i,r.position.z=a,r.lookAt(0,0,0),r}},{key:"initScene",value:function(){var e=new h.m;return e.autoUpdate=!0,e}},{key:"initLight",value:function(e){var n=new h.b(16711680,1,0);n.position.set(100,100,200),e.add(n)}},{key:"initCoordinate",value:function(e){var n=new h.d;n.vertices.push(new h.o(-500,0,0)),n.vertices.push(new h.o(500,0,0));var t=new h.e(n,new h.f({color:16711680,opacity:1}));e.add(t);var o=new h.e(n,new h.f({color:65280,opacity:1}));o.rotation.y=90*Math.PI/180,e.add(o);var i=new h.e(n,new h.f({color:255,opacity:1}));i.rotation.z=90*Math.PI/180,e.add(i)}},{key:"initObject",value:function(e){var n=this,t=new h.a(d,d,d),o=new h.j({vertexColors:!0}),i=new h.c(t,1),a=new h.f({color:0}),r=function(r,c){var s=r.x,l=r.y,u=r.z,y=r.colorPoint,v={x:s,y:l,z:u,colorPoint:y},m=new h.g(i,a),z=new h.i(t,o);z.matrix=new h.h,z.add(m),z.position.x=y.x*d,z.position.y=y.y*d,z.position.z=y.z*d;for(var f=0;f<12;f+=2){var p=x[f/2];z.geometry.faces[f].color.setHex(p),z.geometry.faces[f+1].color.setHex(p)}v.cube=z,c&&n.allObjects.push(v),e.add(z)};void 0===this.allObjects||0===this.allObjects.length?(this.allObjects=[],v.map(function(e){e.map(function(e){e.map(function(e){r(e,!0)})})})):this.allObjects.map(function(e){r(e,!1)})}},{key:"animation",value:function(e,n,t){n.position.x=n.position.x+1,t.render(e,n)}},{key:"rotate",value:function(e,n){for(var t=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=[],a=0;a<this.allObjects.length;a++){var r=this.allObjects[a];if(r[n]===e[n]&&(i.push(r),i.length>=9))break}var c=function(e,n,t){return{na:e*Math.cos(t)*d-n*Math.sin(t)*d,nb:e*Math.sin(t)*d+n*Math.cos(t)*d}},s=1;!function e(o,a,r){var l=void 0,u=void 0,y=(a-o)/r,x=s*y+o,v=[];i.map(function(e){if("x"===n){l=new h.o(1,0,0);var t=c(e.y,e.z,x),o=t.na,i=t.nb;e.cube.position.y=o,e.cube.position.z=i,v.push({x:e.x,y:o/d,z:i/d})}else if("y"===n){l=new h.o(0,1,0);var a=c(e.z,e.x,x),r=a.na,s=a.nb;e.cube.position.x=s,e.cube.position.z=r,v.push({x:s/d,y:e.y,z:r/d})}else if("z"===n){l=new h.o(0,0,1);var m=c(e.x,e.y,x),z=m.na,f=m.nb;e.cube.position.x=z,e.cube.position.y=f,v.push({x:z/d,y:f/d,z:e.z})}(u=new h.h).makeRotationAxis(l.normalize(),y),u.multiply(e.cube.matrix),e.cube.matrix=u,e.cube.rotation.setFromRotationMatrix(e.cube.matrix)}),++s<=r?(t.renderer.render(t.scene,t.camera),setTimeout(function(){e(o,a,r)},100)):(i.map(function(e,n){e.x=parseInt(v[n].x.toFixed(1)),e.y=parseInt(v[n].y.toFixed(1)),e.z=parseInt(v[n].z.toFixed(1))}),t.renderer.render(t.scene,t.camera))}(0,(0===o?Math.PI:-Math.PI)/2,3)}},{key:"renderCube",value:function(){this.initRaycaster(),this.scene=this.initScene(),this.camera=this.initCamera(),this.renderer=this.initThree(),this.initLight(this.scene),this.initCoordinate(this.scene),this.initObject(this.scene),this.animation(this.scene,this.camera,this.renderer)}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{id:"canvas-frame",style:{width:window.innerWidth,height:window.innerHeight},onMouseDown:function(n){e._onMouseDown(n)},onMouseMove:function(n){e._onMouseMove(n)},onMouseUp:function(n){e._onMouseUp(n)},onTouchStart:function(n){e._onMouseDown(n.nativeEvent.touches[0])},onTouchMove:function(n){e._onMouseMove(n.nativeEvent.touches[0])},onTouchEnd:function(n){e._onMouseUp(n.nativeEvent.touches[0])}})}}]),n}(o.Component),z=(t(16),function(e){function n(){return Object(c.a)(this,n),Object(l.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(y.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(m,null))}}]),n}(o.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,n,t){e.exports=t(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.b023e939.chunk.js.map