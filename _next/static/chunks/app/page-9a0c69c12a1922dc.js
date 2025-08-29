(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1319:(e,t,i)=>{"use strict";let n,r;i.d(t,{default:()=>I});var s=i(5155),a=i(2115),o=i(7558),l=i(461),d=i(9630),c=i(3264);let f=new c.NRn,u=new c.Pq0;class p extends c.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new c.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new c.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new c.LuO(t,6,1);return this.setAttribute("instanceStart",new c.eHs(i,3,0)),this.setAttribute("instanceEnd",new c.eHs(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new c.LuO(i,2*t,1);return this.setAttribute("instanceColorStart",new c.eHs(n,t,0)),this.setAttribute("instanceColorEnd",new c.eHs(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new c.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new c.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),f.setFromBufferAttribute(t),this.boundingBox.union(f))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new c.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)u.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(u)),u.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(u));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var h=i(7431);let m=parseInt(c.sPf.replace(/\D+/g,""));class v extends c.BKk{constructor(e){super({type:"LineMaterial",uniforms:c.LlO.clone(c.LlO.merge([h.UniformsLib.common,h.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new c.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${m>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let y=m>=125?"uv1":"uv2",g=new c.IUQ,x=new c.Pq0,w=new c.Pq0,S=new c.IUQ,b=new c.IUQ,E=new c.IUQ,_=new c.Pq0,A=new c.kn4,L=new c.cZY,U=new c.Pq0,z=new c.NRn,O=new c.iyt,M=new c.IUQ;function C(e,t,i){return M.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),M.multiplyScalar(1/M.w),M.x=r/i.width,M.y=r/i.height,M.applyMatrix4(e.projectionMatrixInverse),M.multiplyScalar(1/M.w),Math.abs(Math.max(M.x,M.y))}class P extends c.eaF{constructor(e=new p,t=new v({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)x.fromBufferAttribute(t,e),w.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+x.distanceTo(w);let r=new c.LuO(n,2,1);return e.setAttribute("instanceDistanceStart",new c.eHs(r,1,0)),e.setAttribute("instanceDistanceEnd",new c.eHs(r,1,1)),this}raycast(e,t){let i,s,a=this.material.worldUnits,o=e.camera;null!==o||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;n=e.ray;let d=this.matrixWorld,f=this.geometry,u=this.material;if(r=u.linewidth+l,null===f.boundingSphere&&f.computeBoundingSphere(),O.copy(f.boundingSphere).applyMatrix4(d),a)i=.5*r;else{let e=Math.max(o.near,O.distanceToPoint(n.origin));i=C(o,e,u.resolution)}if(O.radius+=i,!1!==n.intersectsSphere(O)){if(null===f.boundingBox&&f.computeBoundingBox(),z.copy(f.boundingBox).applyMatrix4(d),a)s=.5*r;else{let e=Math.max(o.near,z.distanceToPoint(n.origin));s=C(o,e,u.resolution)}z.expandByScalar(s),!1!==n.intersectsBox(z)&&(a?function(e,t){let i=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,o=s.attributes.instanceEnd,l=Math.min(s.instanceCount,a.count);for(let s=0;s<l;s++){L.start.fromBufferAttribute(a,s),L.end.fromBufferAttribute(o,s),L.applyMatrix4(i);let l=new c.Pq0,d=new c.Pq0;n.distanceSqToSegment(L.start,L.end,d,l),d.distanceTo(l)<.5*r&&t.push({point:d,pointOnLine:l,distance:n.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[y]:null})}}(this,t):function(e,t,i){let s=t.projectionMatrix,a=e.material.resolution,o=e.matrixWorld,l=e.geometry,d=l.attributes.instanceStart,f=l.attributes.instanceEnd,u=Math.min(l.instanceCount,d.count),p=-t.near;n.at(1,E),E.w=1,E.applyMatrix4(t.matrixWorldInverse),E.applyMatrix4(s),E.multiplyScalar(1/E.w),E.x*=a.x/2,E.y*=a.y/2,E.z=0,_.copy(E),A.multiplyMatrices(t.matrixWorldInverse,o);for(let t=0;t<u;t++){if(S.fromBufferAttribute(d,t),b.fromBufferAttribute(f,t),S.w=1,b.w=1,S.applyMatrix4(A),b.applyMatrix4(A),S.z>p&&b.z>p)continue;if(S.z>p){let e=S.z-b.z,t=(S.z-p)/e;S.lerp(b,t)}else if(b.z>p){let e=b.z-S.z,t=(b.z-p)/e;b.lerp(S,t)}S.applyMatrix4(s),b.applyMatrix4(s),S.multiplyScalar(1/S.w),b.multiplyScalar(1/b.w),S.x*=a.x/2,S.y*=a.y/2,b.x*=a.x/2,b.y*=a.y/2,L.start.copy(S),L.start.z=0,L.end.copy(b),L.end.z=0;let l=L.closestPointToPointParameter(_,!0);L.at(l,U);let u=c.cj9.lerp(S.z,b.z,l),h=u>=-1&&u<=1,m=_.distanceTo(U)<.5*r;if(h&&m){L.start.fromBufferAttribute(d,t),L.end.fromBufferAttribute(f,t),L.start.applyMatrix4(o),L.end.applyMatrix4(o);let r=new c.Pq0,s=new c.Pq0;n.distanceSqToSegment(L.start,L.end,s,r),i.push({point:s,pointOnLine:r,distance:n.origin.distanceTo(s),object:e,face:null,faceIndex:t,uv:null,[y]:null})}}}(this,o,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(g),this.material.uniforms.resolution.value.set(g.z,g.w))}}class j extends p{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class D extends P{constructor(e=new j,t=new v({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let B=a.forwardRef(function({points:e,color:t=0xffffff,vertexColors:i,linewidth:n,lineWidth:r,segments:s,dashed:o,...f},u){var h,m;let y=(0,l.C)(e=>e.size),g=a.useMemo(()=>s?new P:new D,[s]),[x]=a.useState(()=>new v),w=(null==i||null==(h=i[0])?void 0:h.length)===4?4:3,S=a.useMemo(()=>{let n=s?new p:new j,r=e.map(e=>{let t=Array.isArray(e);return e instanceof c.Pq0||e instanceof c.IUQ?[e.x,e.y,e.z]:e instanceof c.I9Y?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(n.setPositions(r.flat()),i){t=0xffffff;let e=i.map(e=>e instanceof c.Q1f?e.toArray():e);n.setColors(e.flat(),w)}return n},[e,s,i,w]);return a.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),a.useLayoutEffect(()=>{o?x.defines.USE_DASH="":delete x.defines.USE_DASH,x.needsUpdate=!0},[o,x]),a.useEffect(()=>()=>{S.dispose(),x.dispose()},[S]),a.createElement("primitive",(0,d.A)({object:g,ref:u},f),a.createElement("primitive",{object:S,attach:"geometry"}),a.createElement("primitive",(0,d.A)({object:x,attach:"material",color:t,vertexColors:!!i,resolution:[y.width,y.height],linewidth:null!=(m=null!=n?n:r)?m:1,dashed:o,transparent:4===w},f)))});var R=i(2347);i(1491);let T=new c.Pq0(0,0,20),H=new c.Pq0(0,60,0),N=new c.Pq0(6,0,30);function I(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(o.Canvas,{children:[(0,s.jsx)(q,{}),(0,s.jsx)("ambientLight",{intensity:.5})]}),(0,s.jsxs)("div",{className:"absolute bottom-30 left-1/2 -translate-x-1/2 flex gap-2 flex-col",style:{color:"rgba(255,255,255,0.5)"},children:[(0,s.jsxs)("div",{className:"flex gap-4 justify-center",children:[(0,s.jsx)(R.A,{children:"$\\dot x = \\sigma (y - x)$"}),(0,s.jsx)(R.A,{children:"$\\dot y = x (\\rho - z) - y$"}),(0,s.jsx)(R.A,{children:"$\\dot z = xy - \\beta z$"})]}),(0,s.jsxs)("div",{className:"flex gap-4 justify-center",children:[(0,s.jsx)(R.A,{children:"$\\sigma = 10$"}),(0,s.jsx)(R.A,{children:"$\\rho = 28$"}),(0,s.jsxs)(R.A,{children:["$\\beta = \\frac","{8}{3}","$"]}),(0,s.jsxs)(R.A,{children:["$\\boldsymbol","{r_0}"," = (",N.toArray().join(",\\ "),")$"]})]})]})]})}function q(){let e=(0,a.useRef)(null),[t,i]=(0,a.useState)(Array.from({length:3e3},()=>N.clone())),{camera:n}=(0,l.C)(),r=function(){let[e,t]=(0,a.useState)({x:0,y:0});return(0,a.useEffect)(()=>{function e(e){t({x:e.clientX,y:e.clientY})}return window.addEventListener("mousemove",e),()=>window.removeEventListener("mousemove",e)},[]),e}(),o=(0,a.useRef)(r),d=(0,a.useRef)(0),f=(0,a.useRef)(0);return(0,l.D)(()=>{if(!e.current)return;n.lookAt(T),n.up.set(0,0,1);let t=r.x-o.current.x;f.current+=.002,f.current+=Math.sign(t)*Math.min(Math.abs(t),10)/window.innerWidth*10,d.current=c.cj9.lerp(d.current,f.current,.1);let s=new c.kn4().makeRotationZ(d.current),a=H.clone().applyMatrix4(s);n.position.copy(a),o.current=r;let l=function(e){let t=.01+(.5>Math.random()?-.001:.001),i=10*(e.y-e.x)*t,n=(e.x*(28-e.z)-e.y)*t,r=(e.x*e.y-8/3*e.z)*t;return e.clone().add(new c.Pq0(i,n,r))}(e.current.position);e.current.position.copy(l),i(e=>{let t=[...e,l];return t.length>3e3&&t.shift(),t})}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("points",{ref:e,position:N.toArray(),children:[(0,s.jsx)("bufferGeometry",{children:(0,s.jsx)("bufferAttribute",{args:[new Float32Array([0,0,0]),3],attach:"attributes-position"})}),(0,s.jsx)("pointsMaterial",{color:"gray",size:5,sizeAttenuation:!1})]}),(0,s.jsx)(B,{points:t.map(e=>[e.x,e.y,e.z]),color:"white",lineWidth:1})]})}},1491:()=>{},4242:(e,t,i)=>{"use strict";i.d(t,{default:()=>a});var n=i(5155),r=i(2115),s=i(802);let a=e=>{let{text:t,as:i="div",typingSpeed:a=50,initialDelay:o=0,pauseDuration:l=2e3,deletingSpeed:d=30,loop:c=!0,className:f="",showCursor:u=!0,hideCursorWhileTyping:p=!1,cursorCharacter:h="|",cursorClassName:m="",cursorBlinkDuration:v=.5,textColors:y=[],variableSpeed:g,onSentenceComplete:x,startOnVisible:w=!1,reverseMode:S=!1,...b}=e,[E,_]=(0,r.useState)(""),[A,L]=(0,r.useState)(0),[U,z]=(0,r.useState)(!1),[O,M]=(0,r.useState)(0),[C,P]=(0,r.useState)(!w),j=(0,r.useRef)(null),D=(0,r.useRef)(null),B=(0,r.useMemo)(()=>Array.isArray(t)?t:[t],[t]),R=(0,r.useCallback)(()=>{if(!g)return a;let{min:e,max:t}=g;return Math.random()*(t-e)+e},[g,a]);(0,r.useEffect)(()=>{if(!w||!D.current)return;let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&P(!0)})},{threshold:.1});return e.observe(D.current),()=>e.disconnect()},[w]),(0,r.useEffect)(()=>{u&&j.current&&(s.os.set(j.current,{opacity:1}),s.os.to(j.current,{opacity:0,duration:v,repeat:-1,yoyo:!0,ease:"power2.inOut"}))},[u,v]),(0,r.useEffect)(()=>{let e;if(!C)return;let t=B[O],i=S?t.split("").reverse().join(""):t,n=()=>{if(U)if(""===E){if(z(!1),O===B.length-1&&!c)return;x&&x(B[O],O),M(e=>(e+1)%B.length),L(0),e=setTimeout(()=>{},l)}else e=setTimeout(()=>{_(e=>e.slice(0,-1))},d);else A<i.length?e=setTimeout(()=>{_(e=>e+i[A]),L(e=>e+1)},g?R():a):B.length>1&&(e=setTimeout(()=>{z(!0)},l))};return 0!==A||U||""!==E?n():e=setTimeout(n,o),()=>clearTimeout(e)},[A,E,U,a,d,l,B,O,c,o,C,S,g,x]);let T=p&&(A<B[O].length||U);return(0,r.createElement)(i,{ref:D,className:"inline-block whitespace-pre-wrap tracking-tight ".concat(f),...b},(0,n.jsx)("span",{className:"inline",style:{color:0===y.length?"#ffffff":y[O%y.length]},children:E}),u&&(0,n.jsx)("span",{ref:j,className:"ml-1 inline-block opacity-100 ".concat(T?"hidden":""," ").concat(m),children:h}))}},4286:(e,t,i)=>{Promise.resolve().then(i.bind(i,1319)),Promise.resolve().then(i.bind(i,4242))}},e=>{e.O(0,[562,831,367,413,592,983,567,802,441,964,358],()=>e(e.s=4286)),_N_E=e.O()}]);