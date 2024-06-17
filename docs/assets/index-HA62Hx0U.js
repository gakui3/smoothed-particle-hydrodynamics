(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();let k=1e-6,x=Float32Array;function ct(t){const e=x;return x=t,e}function I(t,e,n){const i=new x(3);return t!==void 0&&(i[0]=t,e!==void 0&&(i[1]=e,n!==void 0&&(i[2]=n))),i}const ut=new Map([[Float32Array,()=>new Float32Array(12)],[Float64Array,()=>new Float64Array(12)],[Array,()=>new Array(12).fill(0)]]);ut.get(Float32Array);const ht=I;function pt(t,e,n,i){return i=i||new x(3),i[0]=t,i[1]=e,i[2]=n,i}function ft(t,e){return e=e||new x(3),e[0]=Math.ceil(t[0]),e[1]=Math.ceil(t[1]),e[2]=Math.ceil(t[2]),e}function dt(t,e){return e=e||new x(3),e[0]=Math.floor(t[0]),e[1]=Math.floor(t[1]),e[2]=Math.floor(t[2]),e}function gt(t,e){return e=e||new x(3),e[0]=Math.round(t[0]),e[1]=Math.round(t[1]),e[2]=Math.round(t[2]),e}function mt(t,e=0,n=1,i){return i=i||new x(3),i[0]=Math.min(n,Math.max(e,t[0])),i[1]=Math.min(n,Math.max(e,t[1])),i[2]=Math.min(n,Math.max(e,t[2])),i}function vt(t,e,n){return n=n||new x(3),n[0]=t[0]+e[0],n[1]=t[1]+e[1],n[2]=t[2]+e[2],n}function yt(t,e,n,i){return i=i||new x(3),i[0]=t[0]+e[0]*n,i[1]=t[1]+e[1]*n,i[2]=t[2]+e[2]*n,i}function wt(t,e){const n=t[0],i=t[1],o=t[2],r=t[0],a=t[1],u=t[2],p=Math.sqrt(n*n+i*i+o*o),l=Math.sqrt(r*r+a*a+u*u),h=p*l,s=h&&Te(t,e)/h;return Math.acos(s)}function se(t,e,n){return n=n||new x(3),n[0]=t[0]-e[0],n[1]=t[1]-e[1],n[2]=t[2]-e[2],n}const _t=se;function xt(t,e){return Math.abs(t[0]-e[0])<k&&Math.abs(t[1]-e[1])<k&&Math.abs(t[2]-e[2])<k}function At(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function Fe(t,e,n,i){return i=i||new x(3),i[0]=t[0]+n*(e[0]-t[0]),i[1]=t[1]+n*(e[1]-t[1]),i[2]=t[2]+n*(e[2]-t[2]),i}function bt(t,e,n,i){return i=i||new x(3),i[0]=t[0]+n[0]*(e[0]-t[0]),i[1]=t[1]+n[1]*(e[1]-t[1]),i[2]=t[2]+n[2]*(e[2]-t[2]),i}function Mt(t,e,n){return n=n||new x(3),n[0]=Math.max(t[0],e[0]),n[1]=Math.max(t[1],e[1]),n[2]=Math.max(t[2],e[2]),n}function $t(t,e,n){return n=n||new x(3),n[0]=Math.min(t[0],e[0]),n[1]=Math.min(t[1],e[1]),n[2]=Math.min(t[2],e[2]),n}function Ae(t,e,n){return n=n||new x(3),n[0]=t[0]*e,n[1]=t[1]*e,n[2]=t[2]*e,n}const Et=Ae;function Ct(t,e,n){return n=n||new x(3),n[0]=t[0]/e,n[1]=t[1]/e,n[2]=t[2]/e,n}function Oe(t,e){return e=e||new x(3),e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e}const St=Oe;function te(t,e,n){n=n||new x(3);const i=t[2]*e[0]-t[0]*e[2],o=t[0]*e[1]-t[1]*e[0];return n[0]=t[1]*e[2]-t[2]*e[1],n[1]=i,n[2]=o,n}function Te(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function be(t){const e=t[0],n=t[1],i=t[2];return Math.sqrt(e*e+n*n+i*i)}const Pt=be;function Ge(t){const e=t[0],n=t[1],i=t[2];return e*e+n*n+i*i}const kt=Ge;function qe(t,e){const n=t[0]-e[0],i=t[1]-e[1],o=t[2]-e[2];return Math.sqrt(n*n+i*i+o*o)}const Bt=qe;function Re(t,e){const n=t[0]-e[0],i=t[1]-e[1],o=t[2]-e[2];return n*n+i*i+o*o}const Lt=Re;function N(t,e){e=e||new x(3);const n=t[0],i=t[1],o=t[2],r=Math.sqrt(n*n+i*i+o*o);return r>1e-5?(e[0]=n/r,e[1]=i/r,e[2]=o/r):(e[0]=0,e[1]=0,e[2]=0),e}function zt(t,e){return e=e||new x(3),e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e}function Me(t,e){return e=e||new x(3),e[0]=t[0],e[1]=t[1],e[2]=t[2],e}const Dt=Me;function Ue(t,e,n){return n=n||new x(3),n[0]=t[0]*e[0],n[1]=t[1]*e[1],n[2]=t[2]*e[2],n}const Vt=Ue;function Ie(t,e,n){return n=n||new x(3),n[0]=t[0]/e[0],n[1]=t[1]/e[1],n[2]=t[2]/e[2],n}const Ft=Ie;function Ot(t=1,e){e=e||new x(3);const n=Math.random()*2*Math.PI,i=Math.random()*2-1,o=Math.sqrt(1-i*i)*t;return e[0]=Math.cos(n)*o,e[1]=Math.sin(n)*o,e[2]=i*t,e}function Tt(t){return t=t||new x(3),t[0]=0,t[1]=0,t[2]=0,t}function Gt(t,e,n){n=n||new x(3);const i=t[0],o=t[1],r=t[2],a=e[3]*i+e[7]*o+e[11]*r+e[15]||1;return n[0]=(e[0]*i+e[4]*o+e[8]*r+e[12])/a,n[1]=(e[1]*i+e[5]*o+e[9]*r+e[13])/a,n[2]=(e[2]*i+e[6]*o+e[10]*r+e[14])/a,n}function qt(t,e,n){n=n||new x(3);const i=t[0],o=t[1],r=t[2];return n[0]=i*e[0*4+0]+o*e[1*4+0]+r*e[2*4+0],n[1]=i*e[0*4+1]+o*e[1*4+1]+r*e[2*4+1],n[2]=i*e[0*4+2]+o*e[1*4+2]+r*e[2*4+2],n}function Rt(t,e,n){n=n||new x(3);const i=t[0],o=t[1],r=t[2];return n[0]=i*e[0]+o*e[4]+r*e[8],n[1]=i*e[1]+o*e[5]+r*e[9],n[2]=i*e[2]+o*e[6]+r*e[10],n}function Ut(t,e,n){n=n||new x(3);const i=e[0],o=e[1],r=e[2],a=e[3]*2,u=t[0],p=t[1],l=t[2],h=o*l-r*p,s=r*u-i*l,c=i*p-o*u;return n[0]=u+h*a+(o*c-r*s)*2,n[1]=p+s*a+(r*h-i*c)*2,n[2]=l+c*a+(i*s-o*h)*2,n}function It(t,e){return e=e||new x(3),e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function Yt(t,e,n){n=n||new x(3);const i=e*4;return n[0]=t[i+0],n[1]=t[i+1],n[2]=t[i+2],n}function Ht(t,e){e=e||new x(3);const n=t[0],i=t[1],o=t[2],r=t[4],a=t[5],u=t[6],p=t[8],l=t[9],h=t[10];return e[0]=Math.sqrt(n*n+i*i+o*o),e[1]=Math.sqrt(r*r+a*a+u*u),e[2]=Math.sqrt(p*p+l*l+h*h),e}function Wt(t,e,n,i){i=i||new x(3);const o=[],r=[];return o[0]=t[0]-e[0],o[1]=t[1]-e[1],o[2]=t[2]-e[2],r[0]=o[0],r[1]=o[1]*Math.cos(n)-o[2]*Math.sin(n),r[2]=o[1]*Math.sin(n)+o[2]*Math.cos(n),i[0]=r[0]+e[0],i[1]=r[1]+e[1],i[2]=r[2]+e[2],i}function Xt(t,e,n,i){i=i||new x(3);const o=[],r=[];return o[0]=t[0]-e[0],o[1]=t[1]-e[1],o[2]=t[2]-e[2],r[0]=o[2]*Math.sin(n)+o[0]*Math.cos(n),r[1]=o[1],r[2]=o[2]*Math.cos(n)-o[0]*Math.sin(n),i[0]=r[0]+e[0],i[1]=r[1]+e[1],i[2]=r[2]+e[2],i}function Nt(t,e,n,i){i=i||new x(3);const o=[],r=[];return o[0]=t[0]-e[0],o[1]=t[1]-e[1],o[2]=t[2]-e[2],r[0]=o[0]*Math.cos(n)-o[1]*Math.sin(n),r[1]=o[0]*Math.sin(n)+o[1]*Math.cos(n),r[2]=o[2],i[0]=r[0]+e[0],i[1]=r[1]+e[1],i[2]=r[2]+e[2],i}function Ye(t,e,n){return n=n||new x(3),N(t,n),Ae(n,e,n)}function jt(t,e,n){return n=n||new x(3),be(t)>e?Ye(t,e,n):Me(t,n)}function Jt(t,e,n){return n=n||new x(3),Fe(t,e,.5,n)}var ie=Object.freeze({__proto__:null,add:vt,addScaled:yt,angle:wt,ceil:ft,clamp:mt,clone:Dt,copy:Me,create:I,cross:te,dist:Bt,distSq:Lt,distance:qe,distanceSq:Re,div:Ft,divScalar:Ct,divide:Ie,dot:Te,equals:At,equalsApproximately:xt,floor:dt,fromValues:ht,getAxis:Yt,getScaling:Ht,getTranslation:It,inverse:Oe,invert:St,len:Pt,lenSq:kt,length:be,lengthSq:Ge,lerp:Fe,lerpV:bt,max:Mt,midpoint:Jt,min:$t,mul:Vt,mulScalar:Ae,multiply:Ue,negate:zt,normalize:N,random:Ot,rotateX:Wt,rotateY:Xt,rotateZ:Nt,round:gt,scale:Et,set:pt,setDefaultType:ct,setLength:Ye,sub:_t,subtract:se,transformMat3:Rt,transformMat4:Gt,transformMat4Upper3x3:qt,transformQuat:Ut,truncate:jt,zero:Tt});let A=Float32Array;function Kt(t){const e=A;return A=t,e}function Zt(t,e,n,i,o,r,a,u,p,l,h,s,c,v,m,w){const f=new A(16);return t!==void 0&&(f[0]=t,e!==void 0&&(f[1]=e,n!==void 0&&(f[2]=n,i!==void 0&&(f[3]=i,o!==void 0&&(f[4]=o,r!==void 0&&(f[5]=r,a!==void 0&&(f[6]=a,u!==void 0&&(f[7]=u,p!==void 0&&(f[8]=p,l!==void 0&&(f[9]=l,h!==void 0&&(f[10]=h,s!==void 0&&(f[11]=s,c!==void 0&&(f[12]=c,v!==void 0&&(f[13]=v,m!==void 0&&(f[14]=m,w!==void 0&&(f[15]=w)))))))))))))))),f}function Qt(t,e,n,i,o,r,a,u,p,l,h,s,c,v,m,w,f){return f=f||new A(16),f[0]=t,f[1]=e,f[2]=n,f[3]=i,f[4]=o,f[5]=r,f[6]=a,f[7]=u,f[8]=p,f[9]=l,f[10]=h,f[11]=s,f[12]=c,f[13]=v,f[14]=m,f[15]=w,f}function en(t,e){return e=e||new A(16),e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=0,e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=0,e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function tn(t,e){e=e||new A(16);const n=t[0],i=t[1],o=t[2],r=t[3],a=n+n,u=i+i,p=o+o,l=n*a,h=i*a,s=i*u,c=o*a,v=o*u,m=o*p,w=r*a,f=r*u,g=r*p;return e[0]=1-s-m,e[1]=h+g,e[2]=c-f,e[3]=0,e[4]=h-g,e[5]=1-l-m,e[6]=v+w,e[7]=0,e[8]=c+f,e[9]=v-w,e[10]=1-l-s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function nn(t,e){return e=e||new A(16),e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e[4]=-t[4],e[5]=-t[5],e[6]=-t[6],e[7]=-t[7],e[8]=-t[8],e[9]=-t[9],e[10]=-t[10],e[11]=-t[11],e[12]=-t[12],e[13]=-t[13],e[14]=-t[14],e[15]=-t[15],e}function $e(t,e){return e=e||new A(16),e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}const on=$e;function rn(t,e){return Math.abs(t[0]-e[0])<k&&Math.abs(t[1]-e[1])<k&&Math.abs(t[2]-e[2])<k&&Math.abs(t[3]-e[3])<k&&Math.abs(t[4]-e[4])<k&&Math.abs(t[5]-e[5])<k&&Math.abs(t[6]-e[6])<k&&Math.abs(t[7]-e[7])<k&&Math.abs(t[8]-e[8])<k&&Math.abs(t[9]-e[9])<k&&Math.abs(t[10]-e[10])<k&&Math.abs(t[11]-e[11])<k&&Math.abs(t[12]-e[12])<k&&Math.abs(t[13]-e[13])<k&&Math.abs(t[14]-e[14])<k&&Math.abs(t[15]-e[15])<k}function an(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]&&t[4]===e[4]&&t[5]===e[5]&&t[6]===e[6]&&t[7]===e[7]&&t[8]===e[8]&&t[9]===e[9]&&t[10]===e[10]&&t[11]===e[11]&&t[12]===e[12]&&t[13]===e[13]&&t[14]===e[14]&&t[15]===e[15]}function He(t){return t=t||new A(16),t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function sn(t,e){if(e=e||new A(16),e===t){let d;return d=t[1],t[1]=t[4],t[4]=d,d=t[2],t[2]=t[8],t[8]=d,d=t[3],t[3]=t[12],t[12]=d,d=t[6],t[6]=t[9],t[9]=d,d=t[7],t[7]=t[13],t[13]=d,d=t[11],t[11]=t[14],t[14]=d,e}const n=t[0*4+0],i=t[0*4+1],o=t[0*4+2],r=t[0*4+3],a=t[1*4+0],u=t[1*4+1],p=t[1*4+2],l=t[1*4+3],h=t[2*4+0],s=t[2*4+1],c=t[2*4+2],v=t[2*4+3],m=t[3*4+0],w=t[3*4+1],f=t[3*4+2],g=t[3*4+3];return e[0]=n,e[1]=a,e[2]=h,e[3]=m,e[4]=i,e[5]=u,e[6]=s,e[7]=w,e[8]=o,e[9]=p,e[10]=c,e[11]=f,e[12]=r,e[13]=l,e[14]=v,e[15]=g,e}function We(t,e){e=e||new A(16);const n=t[0*4+0],i=t[0*4+1],o=t[0*4+2],r=t[0*4+3],a=t[1*4+0],u=t[1*4+1],p=t[1*4+2],l=t[1*4+3],h=t[2*4+0],s=t[2*4+1],c=t[2*4+2],v=t[2*4+3],m=t[3*4+0],w=t[3*4+1],f=t[3*4+2],g=t[3*4+3],d=c*g,y=f*v,M=p*g,S=f*l,B=p*v,L=c*l,z=o*g,D=f*r,V=o*v,F=c*r,O=o*l,G=p*r,q=h*w,R=m*s,U=a*w,Y=m*u,H=a*s,le=h*u,ce=n*w,ue=m*i,he=n*s,pe=h*i,fe=n*u,de=a*i,Pe=d*u+S*s+B*w-(y*u+M*s+L*w),ke=y*i+z*s+F*w-(d*i+D*s+V*w),Be=M*i+D*u+O*w-(S*i+z*u+G*w),Le=L*i+V*u+G*s-(B*i+F*u+O*s),T=1/(n*Pe+a*ke+h*Be+m*Le);return e[0]=T*Pe,e[1]=T*ke,e[2]=T*Be,e[3]=T*Le,e[4]=T*(y*a+M*h+L*m-(d*a+S*h+B*m)),e[5]=T*(d*n+D*h+V*m-(y*n+z*h+F*m)),e[6]=T*(S*n+z*a+G*m-(M*n+D*a+O*m)),e[7]=T*(B*n+F*a+O*h-(L*n+V*a+G*h)),e[8]=T*(q*l+Y*v+H*g-(R*l+U*v+le*g)),e[9]=T*(R*r+ce*v+pe*g-(q*r+ue*v+he*g)),e[10]=T*(U*r+ue*l+fe*g-(Y*r+ce*l+de*g)),e[11]=T*(le*r+he*l+de*v-(H*r+pe*l+fe*v)),e[12]=T*(U*c+le*f+R*p-(H*f+q*p+Y*c)),e[13]=T*(he*f+q*o+ue*c-(ce*c+pe*f+R*o)),e[14]=T*(ce*p+de*f+Y*o-(fe*f+U*o+ue*p)),e[15]=T*(fe*c+H*o+pe*p-(he*p+de*c+le*o)),e}function ln(t){const e=t[0],n=t[0*4+1],i=t[0*4+2],o=t[0*4+3],r=t[1*4+0],a=t[1*4+1],u=t[1*4+2],p=t[1*4+3],l=t[2*4+0],h=t[2*4+1],s=t[2*4+2],c=t[2*4+3],v=t[3*4+0],m=t[3*4+1],w=t[3*4+2],f=t[3*4+3],g=s*f,d=w*c,y=u*f,M=w*p,S=u*c,B=s*p,L=i*f,z=w*o,D=i*c,V=s*o,F=i*p,O=u*o,G=g*a+M*h+S*m-(d*a+y*h+B*m),q=d*n+L*h+V*m-(g*n+z*h+D*m),R=y*n+z*a+F*m-(M*n+L*a+O*m),U=B*n+D*a+O*h-(S*n+V*a+F*h);return e*G+r*q+l*R+v*U}const cn=We;function Xe(t,e,n){n=n||new A(16);const i=t[0],o=t[1],r=t[2],a=t[3],u=t[4],p=t[5],l=t[6],h=t[7],s=t[8],c=t[9],v=t[10],m=t[11],w=t[12],f=t[13],g=t[14],d=t[15],y=e[0],M=e[1],S=e[2],B=e[3],L=e[4],z=e[5],D=e[6],V=e[7],F=e[8],O=e[9],G=e[10],q=e[11],R=e[12],U=e[13],Y=e[14],H=e[15];return n[0]=i*y+u*M+s*S+w*B,n[1]=o*y+p*M+c*S+f*B,n[2]=r*y+l*M+v*S+g*B,n[3]=a*y+h*M+m*S+d*B,n[4]=i*L+u*z+s*D+w*V,n[5]=o*L+p*z+c*D+f*V,n[6]=r*L+l*z+v*D+g*V,n[7]=a*L+h*z+m*D+d*V,n[8]=i*F+u*O+s*G+w*q,n[9]=o*F+p*O+c*G+f*q,n[10]=r*F+l*O+v*G+g*q,n[11]=a*F+h*O+m*G+d*q,n[12]=i*R+u*U+s*Y+w*H,n[13]=o*R+p*U+c*Y+f*H,n[14]=r*R+l*U+v*Y+g*H,n[15]=a*R+h*U+m*Y+d*H,n}const un=Xe;function hn(t,e,n){return n=n||He(),t!==n&&(n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11]),n[12]=e[0],n[13]=e[1],n[14]=e[2],n[15]=1,n}function pn(t,e){return e=e||I(),e[0]=t[12],e[1]=t[13],e[2]=t[14],e}function fn(t,e,n){n=n||I();const i=e*4;return n[0]=t[i+0],n[1]=t[i+1],n[2]=t[i+2],n}function dn(t,e,n,i){i!==t&&(i=$e(t,i));const o=n*4;return i[o+0]=e[0],i[o+1]=e[1],i[o+2]=e[2],i}function gn(t,e){e=e||I();const n=t[0],i=t[1],o=t[2],r=t[4],a=t[5],u=t[6],p=t[8],l=t[9],h=t[10];return e[0]=Math.sqrt(n*n+i*i+o*o),e[1]=Math.sqrt(r*r+a*a+u*u),e[2]=Math.sqrt(p*p+l*l+h*h),e}function mn(t,e,n,i,o){o=o||new A(16);const r=Math.tan(Math.PI*.5-.5*t);if(o[0]=r/e,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=r,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[11]=-1,o[12]=0,o[13]=0,o[15]=0,i===1/0)o[10]=-1,o[14]=-n;else{const a=1/(n-i);o[10]=i*a,o[14]=i*n*a}return o}function vn(t,e,n,i,o,r,a){return a=a||new A(16),a[0]=2/(e-t),a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=2/(i-n),a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=1/(o-r),a[11]=0,a[12]=(e+t)/(t-e),a[13]=(i+n)/(n-i),a[14]=o/(o-r),a[15]=1,a}function yn(t,e,n,i,o,r,a){a=a||new A(16);const u=e-t,p=i-n,l=o-r;return a[0]=2*o/u,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=2*o/p,a[6]=0,a[7]=0,a[8]=(t+e)/u,a[9]=(i+n)/p,a[10]=r/l,a[11]=-1,a[12]=0,a[13]=0,a[14]=o*r/l,a[15]=0,a}let $,C,b;function wn(t,e,n,i){return i=i||new A(16),$=$||I(),C=C||I(),b=b||I(),N(se(e,t,b),b),N(te(n,b,$),$),N(te(b,$,C),C),i[0]=$[0],i[1]=$[1],i[2]=$[2],i[3]=0,i[4]=C[0],i[5]=C[1],i[6]=C[2],i[7]=0,i[8]=b[0],i[9]=b[1],i[10]=b[2],i[11]=0,i[12]=t[0],i[13]=t[1],i[14]=t[2],i[15]=1,i}function _n(t,e,n,i){return i=i||new A(16),$=$||I(),C=C||I(),b=b||I(),N(se(t,e,b),b),N(te(n,b,$),$),N(te(b,$,C),C),i[0]=$[0],i[1]=$[1],i[2]=$[2],i[3]=0,i[4]=C[0],i[5]=C[1],i[6]=C[2],i[7]=0,i[8]=b[0],i[9]=b[1],i[10]=b[2],i[11]=0,i[12]=t[0],i[13]=t[1],i[14]=t[2],i[15]=1,i}function xn(t,e,n,i){return i=i||new A(16),$=$||I(),C=C||I(),b=b||I(),N(se(t,e,b),b),N(te(n,b,$),$),N(te(b,$,C),C),i[0]=$[0],i[1]=C[0],i[2]=b[0],i[3]=0,i[4]=$[1],i[5]=C[1],i[6]=b[1],i[7]=0,i[8]=$[2],i[9]=C[2],i[10]=b[2],i[11]=0,i[12]=-($[0]*t[0]+$[1]*t[1]+$[2]*t[2]),i[13]=-(C[0]*t[0]+C[1]*t[1]+C[2]*t[2]),i[14]=-(b[0]*t[0]+b[1]*t[1]+b[2]*t[2]),i[15]=1,i}function An(t,e){return e=e||new A(16),e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=t[0],e[13]=t[1],e[14]=t[2],e[15]=1,e}function bn(t,e,n){n=n||new A(16);const i=e[0],o=e[1],r=e[2],a=t[0],u=t[1],p=t[2],l=t[3],h=t[1*4+0],s=t[1*4+1],c=t[1*4+2],v=t[1*4+3],m=t[2*4+0],w=t[2*4+1],f=t[2*4+2],g=t[2*4+3],d=t[3*4+0],y=t[3*4+1],M=t[3*4+2],S=t[3*4+3];return t!==n&&(n[0]=a,n[1]=u,n[2]=p,n[3]=l,n[4]=h,n[5]=s,n[6]=c,n[7]=v,n[8]=m,n[9]=w,n[10]=f,n[11]=g),n[12]=a*i+h*o+m*r+d,n[13]=u*i+s*o+w*r+y,n[14]=p*i+c*o+f*r+M,n[15]=l*i+v*o+g*r+S,n}function Mn(t,e){e=e||new A(16);const n=Math.cos(t),i=Math.sin(t);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=i,e[7]=0,e[8]=0,e[9]=-i,e[10]=n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function $n(t,e,n){n=n||new A(16);const i=t[4],o=t[5],r=t[6],a=t[7],u=t[8],p=t[9],l=t[10],h=t[11],s=Math.cos(e),c=Math.sin(e);return n[4]=s*i+c*u,n[5]=s*o+c*p,n[6]=s*r+c*l,n[7]=s*a+c*h,n[8]=s*u-c*i,n[9]=s*p-c*o,n[10]=s*l-c*r,n[11]=s*h-c*a,t!==n&&(n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n}function En(t,e){e=e||new A(16);const n=Math.cos(t),i=Math.sin(t);return e[0]=n,e[1]=0,e[2]=-i,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=i,e[9]=0,e[10]=n,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Cn(t,e,n){n=n||new A(16);const i=t[0*4+0],o=t[0*4+1],r=t[0*4+2],a=t[0*4+3],u=t[2*4+0],p=t[2*4+1],l=t[2*4+2],h=t[2*4+3],s=Math.cos(e),c=Math.sin(e);return n[0]=s*i-c*u,n[1]=s*o-c*p,n[2]=s*r-c*l,n[3]=s*a-c*h,n[8]=s*u+c*i,n[9]=s*p+c*o,n[10]=s*l+c*r,n[11]=s*h+c*a,t!==n&&(n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n}function Sn(t,e){e=e||new A(16);const n=Math.cos(t),i=Math.sin(t);return e[0]=n,e[1]=i,e[2]=0,e[3]=0,e[4]=-i,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Pn(t,e,n){n=n||new A(16);const i=t[0*4+0],o=t[0*4+1],r=t[0*4+2],a=t[0*4+3],u=t[1*4+0],p=t[1*4+1],l=t[1*4+2],h=t[1*4+3],s=Math.cos(e),c=Math.sin(e);return n[0]=s*i+c*u,n[1]=s*o+c*p,n[2]=s*r+c*l,n[3]=s*a+c*h,n[4]=s*u-c*i,n[5]=s*p-c*o,n[6]=s*l-c*r,n[7]=s*h-c*a,t!==n&&(n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n}function Ne(t,e,n){n=n||new A(16);let i=t[0],o=t[1],r=t[2];const a=Math.sqrt(i*i+o*o+r*r);i/=a,o/=a,r/=a;const u=i*i,p=o*o,l=r*r,h=Math.cos(e),s=Math.sin(e),c=1-h;return n[0]=u+(1-u)*h,n[1]=i*o*c+r*s,n[2]=i*r*c-o*s,n[3]=0,n[4]=i*o*c-r*s,n[5]=p+(1-p)*h,n[6]=o*r*c+i*s,n[7]=0,n[8]=i*r*c+o*s,n[9]=o*r*c-i*s,n[10]=l+(1-l)*h,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}const kn=Ne;function je(t,e,n,i){i=i||new A(16);let o=e[0],r=e[1],a=e[2];const u=Math.sqrt(o*o+r*r+a*a);o/=u,r/=u,a/=u;const p=o*o,l=r*r,h=a*a,s=Math.cos(n),c=Math.sin(n),v=1-s,m=p+(1-p)*s,w=o*r*v+a*c,f=o*a*v-r*c,g=o*r*v-a*c,d=l+(1-l)*s,y=r*a*v+o*c,M=o*a*v+r*c,S=r*a*v-o*c,B=h+(1-h)*s,L=t[0],z=t[1],D=t[2],V=t[3],F=t[4],O=t[5],G=t[6],q=t[7],R=t[8],U=t[9],Y=t[10],H=t[11];return i[0]=m*L+w*F+f*R,i[1]=m*z+w*O+f*U,i[2]=m*D+w*G+f*Y,i[3]=m*V+w*q+f*H,i[4]=g*L+d*F+y*R,i[5]=g*z+d*O+y*U,i[6]=g*D+d*G+y*Y,i[7]=g*V+d*q+y*H,i[8]=M*L+S*F+B*R,i[9]=M*z+S*O+B*U,i[10]=M*D+S*G+B*Y,i[11]=M*V+S*q+B*H,t!==i&&(i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]),i}const Bn=je;function Ln(t,e){return e=e||new A(16),e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function zn(t,e,n){n=n||new A(16);const i=e[0],o=e[1],r=e[2];return n[0]=i*t[0*4+0],n[1]=i*t[0*4+1],n[2]=i*t[0*4+2],n[3]=i*t[0*4+3],n[4]=o*t[1*4+0],n[5]=o*t[1*4+1],n[6]=o*t[1*4+2],n[7]=o*t[1*4+3],n[8]=r*t[2*4+0],n[9]=r*t[2*4+1],n[10]=r*t[2*4+2],n[11]=r*t[2*4+3],t!==n&&(n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n}function Dn(t,e){return e=e||new A(16),e[0]=t,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function Vn(t,e,n){return n=n||new A(16),n[0]=e*t[0*4+0],n[1]=e*t[0*4+1],n[2]=e*t[0*4+2],n[3]=e*t[0*4+3],n[4]=e*t[1*4+0],n[5]=e*t[1*4+1],n[6]=e*t[1*4+2],n[7]=e*t[1*4+3],n[8]=e*t[2*4+0],n[9]=e*t[2*4+1],n[10]=e*t[2*4+2],n[11]=e*t[2*4+3],t!==n&&(n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n}var Z=Object.freeze({__proto__:null,aim:wn,axisRotate:je,axisRotation:Ne,cameraAim:_n,clone:on,copy:$e,create:Zt,determinant:ln,equals:an,equalsApproximately:rn,fromMat3:en,fromQuat:tn,frustum:yn,getAxis:fn,getScaling:gn,getTranslation:pn,identity:He,inverse:We,invert:cn,lookAt:xn,mul:un,multiply:Xe,negate:nn,ortho:vn,perspective:mn,rotate:Bn,rotateX:$n,rotateY:Cn,rotateZ:Pn,rotation:kn,rotationX:Mn,rotationY:En,rotationZ:Sn,scale:zn,scaling:Ln,set:Qt,setAxis:dn,setDefaultType:Kt,setTranslation:hn,translate:bn,translation:An,transpose:sn,uniformScale:Vn,uniformScaling:Dn});class Fn{constructor(e=[0,0,0],n=[0,0,0]){this.cameraPosition=ie.fromValues(e[0],e[1],e[2]),this.target=ie.fromValues(n[0],n[1],n[2]),this.projection=Z.create(),this.view=Z.create()}updateMVPMatrix(){const e=document.querySelector("canvas"),n=e.width/e.height;this.vfov=2*Math.PI/5,this.projection=Z.perspective(this.vfov,n,1,100);const i=Z.create();return Z.identity(this.view),Z.translate(this.view,this.cameraPosition,this.view),Z.lookAt(this.cameraPosition,this.target,ie.fromValues(0,1,0),this.view),Z.multiply(this.projection,this.view,i),new Float32Array([i[0],i[1],i[2],i[3],i[4],i[5],i[6],i[7],i[8],i[9],i[10],i[11],i[12],i[13],i[14],i[15],this.view[0],this.view[4],this.view[8],0,this.view[1],this.view[5],this.view[9],0])}screenToWorld(e,n,i){const o=document.querySelector("canvas"),r=e/o.width*4-1,a=1-n/o.height*4,u=2*Math.atan(Math.tan(this.vfov/2)*(o.width/o.height)),p=i*Math.tan(u/2),l=r*p,h=i*Math.tan(this.vfov/2),s=a*h,c=ie.create();return ie.add(ie.fromValues(l,s,0),this.cameraPosition,c),c}}var On=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Tn(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Je={exports:{}};(function(t,e){(function(n,i){t.exports=i()})(On,function(){var n=function(){var i=0,o=document.createElement("div");function r(v){return o.appendChild(v.dom),v}function a(v){for(var m=0;m<o.children.length;m++)o.children[m].style.display=m===v?"block":"none";i=v}o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(v){v.preventDefault(),a(++i%o.children.length)},!1);var u=(performance||Date).now(),p=u,l=0,h=r(new n.Panel("FPS","#0ff","#002")),s=r(new n.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=r(new n.Panel("MB","#f08","#201"));return a(0),{REVISION:16,dom:o,addPanel:r,showPanel:a,begin:function(){u=(performance||Date).now()},end:function(){l++;var v=(performance||Date).now();if(s.update(v-u,200),p+1e3<=v&&(h.update(1e3*l/(v-p),100),p=v,l=0,c)){var m=performance.memory;c.update(m.usedJSHeapSize/1048576,m.jsHeapSizeLimit/1048576)}return v},update:function(){u=this.end()},domElement:o,setMode:a}};return n.Panel=function(i,o,r){var a=1/0,u=0,p=Math.round,l=p(window.devicePixelRatio||1),h=80*l,s=48*l,c=3*l,v=2*l,m=3*l,w=15*l,f=74*l,g=30*l,d=document.createElement("canvas");d.width=h,d.height=s,d.style.cssText="width:80px;height:48px";var y=d.getContext("2d");return y.font="bold "+9*l+"px Helvetica,Arial,sans-serif",y.textBaseline="top",y.fillStyle=r,y.fillRect(0,0,h,s),y.fillStyle=o,y.fillText(i,c,v),y.fillRect(m,w,f,g),y.fillStyle=r,y.globalAlpha=.9,y.fillRect(m,w,f,g),{dom:d,update:function(M,S){a=Math.min(a,M),u=Math.max(u,M),y.fillStyle=r,y.globalAlpha=1,y.fillRect(0,0,h,w),y.fillStyle=o,y.fillText(p(M)+" "+i+" ("+p(a)+"-"+p(u)+")",c,v),y.drawImage(d,m+l,w,f-l,g,m,w,f-l,g),y.fillRect(m+f-l,w,l,g),y.fillStyle=r,y.globalAlpha=.9,y.fillRect(m+f-l,w,l,p((1-M/S)*g))}}},n})})(Je);var Gn=Je.exports;const qn=Tn(Gn);/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class J{constructor(e,n,i,o,r="div"){this.parent=e,this.object=n,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(o),this.$name=document.createElement("div"),this.$name.classList.add("name"),J.nextNameID=J.nextNameID||0,this.$name.id=`lil-gui-name-${++J.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const n=this.parent.add(this.object,this.property,e);return n.name(this._name),this.destroy(),n}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Rn extends J{constructor(e,n,i){super(e,n,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function xe(t){let e,n;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?n=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),n?"#"+n:!1}const Un={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:xe,toHexString:xe},ae={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},In={isPrimitive:!1,match:t=>Array.isArray(t),fromHexString(t,e,n=1){const i=ae.fromHexString(t);e[0]=(i>>16&255)/255*n,e[1]=(i>>8&255)/255*n,e[2]=(i&255)/255*n},toHexString([t,e,n],i=1){i=255/i;const o=t*i<<16^e*i<<8^n*i<<0;return ae.toHexString(o)}},Yn={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,n=1){const i=ae.fromHexString(t);e.r=(i>>16&255)/255*n,e.g=(i>>8&255)/255*n,e.b=(i&255)/255*n},toHexString({r:t,g:e,b:n},i=1){i=255/i;const o=t*i<<16^e*i<<8^n*i<<0;return ae.toHexString(o)}},Hn=[Un,ae,In,Yn];function Wn(t){return Hn.find(e=>e.match(t))}class Xn extends J{constructor(e,n,i,o){super(e,n,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Wn(this.initialValue),this._rgbScale=o,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=xe(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const n=this._format.fromHexString(e);this.setValue(n)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class _e extends J{constructor(e,n,i){super(e,n,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",o=>{o.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Nn extends J{constructor(e,n,i,o,r,a){super(e,n,i,"number"),this._initInput(),this.min(o),this.max(r);const u=a!==void 0;this.step(u?a:this._getImplicitStep(),u),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,n=!0){return this._step=e,this._stepExplicit=n,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let n=(e-this._min)/(this._max-this._min);n=Math.max(0,Math.min(n,1)),this.$fill.style.width=n*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const n=()=>{let d=parseFloat(this.$input.value);isNaN(d)||(this._stepExplicit&&(d=this._snap(d)),this.setValue(this._clamp(d)))},i=d=>{const y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+d),this.$input.value=this.getValue())},o=d=>{d.key==="Enter"&&this.$input.blur(),d.code==="ArrowUp"&&(d.preventDefault(),i(this._step*this._arrowKeyMultiplier(d))),d.code==="ArrowDown"&&(d.preventDefault(),i(this._step*this._arrowKeyMultiplier(d)*-1))},r=d=>{this._inputFocused&&(d.preventDefault(),i(this._step*this._normalizeMouseWheel(d)))};let a=!1,u,p,l,h,s;const c=5,v=d=>{u=d.clientX,p=l=d.clientY,a=!0,h=this.getValue(),s=0,window.addEventListener("mousemove",m),window.addEventListener("mouseup",w)},m=d=>{if(a){const y=d.clientX-u,M=d.clientY-p;Math.abs(M)>c?(d.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>c&&w()}if(!a){const y=d.clientY-l;s-=y*this._step*this._arrowKeyMultiplier(d),h+s>this._max?s=this._max-h:h+s<this._min&&(s=this._min-h),this._snapClampSetValue(h+s)}l=d.clientY},w=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",w)},f=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",n),this.$input.addEventListener("keydown",o),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",v),this.$input.addEventListener("focus",f),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(g,d,y,M,S)=>(g-d)/(y-d)*(S-M)+M,n=g=>{const d=this.$slider.getBoundingClientRect();let y=e(g,d.left,d.right,this._min,this._max);this._snapClampSetValue(y)},i=g=>{this._setDraggingStyle(!0),n(g.clientX),window.addEventListener("mousemove",o),window.addEventListener("mouseup",r)},o=g=>{n(g.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",r)};let a=!1,u,p;const l=g=>{g.preventDefault(),this._setDraggingStyle(!0),n(g.touches[0].clientX),a=!1},h=g=>{g.touches.length>1||(this._hasScrollBar?(u=g.touches[0].clientX,p=g.touches[0].clientY,a=!0):l(g),window.addEventListener("touchmove",s,{passive:!1}),window.addEventListener("touchend",c))},s=g=>{if(a){const d=g.touches[0].clientX-u,y=g.touches[0].clientY-p;Math.abs(d)>Math.abs(y)?l(g):(window.removeEventListener("touchmove",s),window.removeEventListener("touchend",c))}else g.preventDefault(),n(g.touches[0].clientX)},c=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",s),window.removeEventListener("touchend",c)},v=this._callOnFinishChange.bind(this),m=400;let w;const f=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const y=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(w),w=setTimeout(v,m)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",f,{passive:!1})}_setDraggingStyle(e,n="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${n}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:n,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(n=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),n+-i}_arrowKeyMultiplier(e){let n=this._stepExplicit?1:10;return e.shiftKey?n*=10:e.altKey&&(n/=10),n}_snap(e){const n=Math.round(e/this._step)*this._step;return parseFloat(n.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class jn extends J{constructor(e,n,i,o){super(e,n,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(o)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(n=>{const i=document.createElement("option");i.textContent=n,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),n=this._values.indexOf(e);return this.$select.selectedIndex=n,this.$display.textContent=n===-1?e:this._names[n],this}}class Jn extends J{constructor(e,n,i){super(e,n,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",o=>{o.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Kn=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Zn(t){const e=document.createElement("style");e.innerHTML=t;const n=document.querySelector("head link[rel=stylesheet], head style");n?document.head.insertBefore(e,n):document.head.appendChild(e)}let ze=!1;class Ee{constructor({parent:e,autoPlace:n=e===void 0,container:i,width:o,title:r="Controls",closeFolders:a=!1,injectStyles:u=!0,touchStyles:p=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{(l.code==="Enter"||l.code==="Space")&&(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),p&&this.domElement.classList.add("allow-touch-styles"),!ze&&u&&(Zn(Kn),ze=!0),i?i.appendChild(this.domElement):n&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),o&&this.domElement.style.setProperty("--width",o+"px"),this._closeFolders=a}add(e,n,i,o,r){if(Object(i)===i)return new jn(this,e,n,i);const a=e[n];switch(typeof a){case"number":return new Nn(this,e,n,i,o,r);case"boolean":return new Rn(this,e,n);case"string":return new Jn(this,e,n);case"function":return new _e(this,e,n)}console.error(`gui.add failed
	property:`,n,`
	object:`,e,`
	value:`,a)}addColor(e,n,i=1){return new Xn(this,e,n,i)}addFolder(e){const n=new Ee({parent:this,title:e});return this.root._closeFolders&&n.close(),n}load(e,n=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof _e||i._name in e.controllers&&i.load(e.controllers[i._name])}),n&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const n={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof _e)){if(i._name in n.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);n.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in n.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);n.folders[i._title]=i.save()}),n}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const n=this.$children.clientHeight;this.$children.style.height=n+"px",this.domElement.classList.add("transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const o=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=o+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(n=>{e=e.concat(n.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(n=>{e=e.concat(n.foldersRecursive())}),e}}const ee=`////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////
var<private> rand_seed : vec2<f32>;

fn init_rand(invocation_id : u32, seed : vec4f) {
  rand_seed = seed.xz;
  rand_seed = fract(rand_seed * cos(35.456+f32(invocation_id) * seed.yw));
  rand_seed = fract(rand_seed * cos(41.235+f32(invocation_id) * seed.xw));
}

fn rand() -> f32 {
  rand_seed.x = fract(cos(dot(rand_seed, vec2f(23.14077926, 232.61690225))) * 136.8168);
  rand_seed.y = fract(cos(dot(rand_seed, vec2f(54.47856553, 345.84153136))) * 534.7645);
  return rand_seed.y;
}

////////////////////////////////////////////////////////////////////////////////
// Vertex shader
////////////////////////////////////////////////////////////////////////////////
struct RenderParams {
  modelViewProjectionMatrix : mat4x4f,
  right : vec3f,
  up : vec3f
}
@binding(0) @group(0) var<uniform> render_params : RenderParams;

struct VertexInput {
  @location(0) position : vec3f,
  @location(1) color : vec4f,
  @location(2) quad_pos : vec2f, // -1..+1
}

struct VertexOutput {
  @builtin(position) position : vec4f,
  @location(0) color : vec4f,
  @location(1) quad_pos : vec2f, // -1..+1
}

@vertex
fn vs_main(in : VertexInput) -> VertexOutput {
  var quad_pos = mat2x3f(render_params.right, render_params.up) * in.quad_pos;
  var position = in.position + quad_pos * 0.05;
  var out : VertexOutput;
  out.position = render_params.modelViewProjectionMatrix * vec4f(position, 1.0);
  out.color = in.color;
  out.quad_pos = in.quad_pos;
  return out;
}

////////////////////////////////////////////////////////////////////////////////
// Fragment shader
////////////////////////////////////////////////////////////////////////////////
@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4f {
  var color = in.color;
  // Apply a circular particle alpha mask
  color.a = color.a * max(1.0 - length(in.quad_pos), 0.0);
  return color;
}

////////////////////////////////////////////////////////////////////////////////
// Simulation Compute shader
////////////////////////////////////////////////////////////////////////////////
struct SimulationParams {
  deltaTime : f32,
  seed : vec4f,
  smoothlen: f32,
  densityCoef: f32,
  gradPressureCoef: f32,
  lapViscosityCoef: f32,
  pressureStiffness: f32,
  restDensity: f32,
  particleMass: f32,
  viscosity: f32,
  wallStiffness: f32,
  iterations: u32,
  gravity: vec2f,
  rangeX: f32,
  rangeY: f32
}

struct Particle {
  position : vec3f,
  color    : vec4f,
  velocity : vec3f,
  acceleration : vec3f,
  density : f32,
  pressure : f32,
}

struct Particles {
  particles : array<Particle>,
}

struct Mouse {
  position : vec2f,
  radius : f32,
}

@binding(0) @group(0) var<uniform> params : SimulationParams;
@binding(1) @group(0) var<storage, read_write> dataRead : Particles;
@binding(2) @group(0) var<storage, read_write> dataWrite : Particles;
@binding(3) @group(0) var<storage, read_write> mouse : Mouse;

fn calculateDensity(r_sq: f32) -> f32 {
  let h_sq: f32 = params.smoothlen * params.smoothlen;
  return params.densityCoef * (h_sq - r_sq) * (h_sq - r_sq) * (h_sq - r_sq);
}

fn calculatePressure(density: f32) -> f32 {
  var press = params.pressureStiffness * max(pow(density / params.restDensity, 7.0) - 1.0, 0.0);
  return max(press, 0.0);
}

fn calculateGradPressure(r: f32, P_pressure: f32, N_pressure: f32, N_density: f32, diff: vec2f) -> vec2f {
  let h: f32 = params.smoothlen;
  let avg_pressure: f32 = 0.5 * (N_pressure + P_pressure);
  return params.gradPressureCoef * avg_pressure / N_density * (h - r) * (h - r) / r * diff;
}

fn calculateLapVelocity(r: f32, P_velocity: vec2f, N_velocity: vec2f, N_density: f32) -> vec2f {
  let h: f32 = params.smoothlen;
  let vel_diff: vec2f = N_velocity - P_velocity;
  return params.lapViscosityCoef / N_density * (h - r) * vel_diff;
}

fn calculateAcceleration(position: vec3f, velocity: vec3f, acceleration: vec3f) -> vec3f {
  var acc = acceleration;

  let mousePos = mouse.position;
  let mouseRadius = mouse.radius;

  if (distance(position.xy, mousePos) < mouseRadius && mouseRadius > 0.0) {
    var dir = position.xy - mousePos;
    var pushBack = mouseRadius - length(dir);
    var f = 100.0 * pushBack * normalize(dir);
    acc += vec3f(f.x, f.y, 0.0);
  }

  var dist = dot(position, vec3f(1.0, 0.0, 0.0));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(1.0, 0.0), 0.0);

  dist = dot(position, vec3f(0.0, 1.0, 0.0));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(0.0, 1.0), 0.0);

  dist = dot(position, vec3f(-1.0, 0.0, params.rangeX));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(-1.0, 0.0), 0.0);

  dist = dot(position, vec3f(0.0, -1.0, params.rangeY));
  acc += vec3f(min(dist, 0.0) * -params.wallStiffness * vec2<f32>(0.0, -1.0), 0.0);

  acc += vec3f(params.gravity.x, params.gravity.y, 0.0);

  return acc;
}

@compute @workgroup_size(64)
fn init(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  var particle = dataRead.particles[idx];
  init_rand(idx, params.seed);

  // ランダムな角度と半径を生成
  let angle = rand() * 2.0 * 3.141592;
  let radius = sqrt(rand()) * min(params.rangeX, params.rangeY) / 2.0; // 半径5の円内にランダムに分布

  // デカルト座標に変換
  let x = radius * cos(angle);
  let y = radius * sin(angle);

  // 初期位置を円内のランダムな位置に設定
  particle.position = vec3f(x, y, 0.0) + vec3f(params.rangeX / 2.0, params.rangeY / 2.0, 0.0);
  particle.color = vec4f(1.0, 1.0, 1.0, 1.0);
  particle.velocity = vec3f(0.0, 0.0, 0.0);
  particle.acceleration = vec3f(0.0, 0.0, 0.0);

  dataRead.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn simulate(@builtin(global_invocation_id) global_invocation_id: vec3<u32>) {
  let idx = global_invocation_id.x;

  var particle = dataRead.particles[idx];
  var position = vec3<f32>(particle.position.x, particle.position.y, 1.0);
  var velocity = particle.velocity;
  var acceleration = particle.acceleration;

  let dt = params.deltaTime;
  let half_dt = dt * 0.5;
  let sixth_dt = dt / 6.0;

  // RK4の計算
  let k1_v = calculateAcceleration(position, velocity, acceleration);
  let k1_x = velocity;

  let k2_v = calculateAcceleration(position + half_dt * k1_x, velocity + half_dt * k1_v, acceleration);
  let k2_x = velocity + half_dt * k1_v;

  let k3_v = calculateAcceleration(position + half_dt * k2_x, velocity + half_dt * k2_v, acceleration);
  let k3_x = velocity + half_dt * k2_v;

  let k4_v = calculateAcceleration(position + dt * k3_x, velocity + dt * k3_v, acceleration);
  let k4_x = velocity + dt * k3_v;

  // 位置と速度の更新
  position += sixth_dt * (k1_x + 2.0 * (k2_x + k3_x) + k4_x);
  velocity += sixth_dt * (k1_v + 2.0 * (k2_v + k3_v) + k4_v);

  position.z = 0.0;

  // 粒子の位置を更新
  particle.position = position;
  particle.velocity = velocity;
  // particle.color = vec4<f32>(particle.density, 1.0, 0.0, 1.0);

  // 新しい粒子値を保存
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn densityCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  let s = params.seed;
  
  var particle = dataRead.particles[idx];

  var h_sq: f32 = params.smoothlen * params.smoothlen;
  var density: f32 = 0.0;

  for (var i = 0u; i < arrayLength(&dataRead.particles); i= i + 1u) {
    if(i == idx) {
      continue;
    }
    let p = dataRead.particles[i];

    let diff: vec3f = p.position - particle.position;
    let r2: f32 = dot(diff, diff);
    if (r2 < h_sq && r2 > 0.0) {
      density += calculateDensity(r2);
    }
  }

  particle.density = density;
  // particle.density = clamp(density, 0.0, 20.0);
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn pressureCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;

  var particle = dataRead.particles[idx];

  var density: f32 = particle.density;
	var pressure: f32 = calculatePressure(density);
  // var pressure: f32 = 1.0;

  particle.pressure = pressure;
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn forceCS(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;

  var particle = dataRead.particles[idx];

  var position: vec3f = particle.position;
  var velocity: vec3f = particle.velocity;
  var density: f32 = particle.density;
  var pressure: f32 = particle.pressure;

  let h_sq = params.smoothlen * params.smoothlen;

  var press: vec2<f32> = vec2<f32>(0.0, 0.0);
  var visco: vec2<f32> = vec2<f32>(0.0, 0.0);

  for (var i = 0u; i < arrayLength(&dataRead.particles); i= i + 1u) {
    if(i == idx) {
      continue;
    }
    let p = dataRead.particles[i];

    let diff: vec3f = p.position - position;
    let r2: f32 = dot(diff, diff);

    if (r2 < h_sq && r2 > 0.0) {
      var i_density: f32 = p.density;
			var i_pressure: f32 = p.pressure;
			var i_velocity: vec2<f32> = p.velocity.xy;
			var r: f32 = sqrt(r2);

			// 圧力項
      press += calculateGradPressure(r, pressure, i_pressure, i_density, diff.xy);

			// 粘性項
			visco += calculateLapVelocity(r, velocity.xy, i_velocity, i_density);
    }
  }

  var force: vec2<f32> = press + params.viscosity * visco;
  var acceleration: vec2<f32> = force / (density);

  particle.acceleration = vec3f(acceleration.x, acceleration.y, 0.0);
  dataWrite.particles[idx] = particle;
}

@compute @workgroup_size(64)
fn swapBuffer(@builtin(global_invocation_id) global_invocation_id : vec3u) {
  let idx = global_invocation_id.x;
  var particle = dataWrite.particles[idx];

  dataRead.particles[idx] = particle;
}`,P=5120,Qn=0,ei=4*4,ge=[Math.random()*100,Math.random()*100,1+Math.random(),1+Math.random()],De=[0,-10],oe=[16,12],E={simulate:!0,simulationStep:.003,smoothlen:.5,pressureStiffness:.65,restDensity:4,particleMass:.08,viscosity:6.3,wallStiffness:6e3,iteration:6,reset:()=>{at()}},ti=E.particleMass*4/(Math.PI*Math.pow(E.smoothlen,8)),ni=E.particleMass*-30/(Math.PI*Math.pow(E.smoothlen,5)),ii=E.particleMass*20/(3*Math.PI*Math.pow(E.smoothlen,5)),oi=1*4+3*4+4*4+1*4+1*4+1*4+1*4+1*4+1*4+1*4+1*4+1*4+1*4+2*4+1*4+1*4+2*4,W=3*4+1*4+4*4+3*4+1*4+3*4+1*4+1*4+1*4+2*4,ri=4*4*4+3*4+4+3*4+4+0,ai=2*4+2*4+1*4+3*4,ne=document.querySelector("canvas"),si=await navigator.gpu.requestAdapter(),_=await si.requestDevice(),Ke=ne.getContext("webgpu"),Ze=window.devicePixelRatio;ne.width=ne.clientWidth*Ze;ne.height=ne.clientHeight*Ze;const Qe=navigator.gpu.getPreferredCanvasFormat(),et=new Fn([oe[0]/2,oe[1]/2,10],[oe[0]/2,oe[1]/2,0]),li=et.updateMVPMatrix();Ke.configure({device:_,format:Qe,alphaMode:"premultiplied"});const j=new Ee;j.add(E,"simulate");j.add(E,"simulationStep",.001,.005,.001);j.add(E,"smoothlen",.1,1,.1);j.add(E,"pressureStiffness",.1,1,.01);j.add(E,"restDensity",1,10,1);j.add(E,"particleMass",.01,.2,.01);j.add(E,"viscosity",.1,10,.01);j.add(E,"wallStiffness",1e3,6e3,1e3);j.add(E,"iteration",1,20,1);j.add(E,"reset");j.onChange(()=>{rt()});const ve=new qn;ve.showPanel(0);document.body.appendChild(ve.dom);const ye=_.createBuffer({size:P*W,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),ci=_.createBuffer({size:P*W,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE}),Q=_.createBuffer({size:P*W,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),tt=_.createBuffer({size:ri,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),Ce=_.createBuffer({size:6*2*4,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),nt=_.createBuffer({size:oi,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),we=_.createBuffer({size:ai,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),it=_.createRenderPipeline({layout:"auto",vertex:{module:_.createShaderModule({code:ee}),buffers:[{arrayStride:W,stepMode:"instance",attributes:[{shaderLocation:0,offset:Qn,format:"float32x3"},{shaderLocation:1,offset:ei,format:"float32x4"}]},{arrayStride:2*4,stepMode:"vertex",attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]}]},fragment:{module:_.createShaderModule({code:ee}),targets:[{format:Qe,blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!1,depthCompare:"less",format:"depth24plus"}}),ui=_.createTexture({size:[ne.width,ne.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),hi=_.createBindGroup({layout:it.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:tt}}]}),Ve={colorAttachments:[{view:void 0,clearValue:[0,0,0,1],loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:ui.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}},X=1,pi=[-X,-X,+X,-X,-X,+X,-X,+X,+X,-X,+X,+X];new Float32Array(Ce.getMappedRange()).set(pi);Ce.unmap();const ot=_.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),re=_.createPipelineLayout({bindGroupLayouts:[ot]}),K=_.createBindGroup({layout:ot,entries:[{binding:0,resource:{buffer:nt}},{binding:1,resource:{buffer:ye,offset:0,size:P*W}},{binding:2,resource:{buffer:ci,offset:0,size:P*W}},{binding:3,resource:{buffer:we}}]}),fi=_.createComputePipeline({layout:re,compute:{module:_.createShaderModule({code:ee}),entryPoint:"densityCS"}}),di=_.createComputePipeline({layout:re,compute:{module:_.createShaderModule({code:ee}),entryPoint:"pressureCS"}}),gi=_.createComputePipeline({layout:re,compute:{module:_.createShaderModule({code:ee}),entryPoint:"simulate"}}),mi=_.createComputePipeline({layout:re,compute:{module:_.createShaderModule({code:ee}),entryPoint:"init"}}),vi=_.createComputePipeline({layout:re,compute:{module:_.createShaderModule({code:ee}),entryPoint:"forceCS"}}),me=_.createComputePipeline({layout:re,compute:{module:_.createShaderModule({code:ee}),entryPoint:"swapBuffer"}}),rt=()=>{_.queue.writeBuffer(nt,0,new Float32Array([E.simulate?E.simulationStep:0,0,0,0,ge[0],ge[1],ge[2],ge[3],E.smoothlen,ti,ni,ii,E.pressureStiffness,E.restDensity,E.particleMass,E.viscosity,E.wallStiffness,E.iteration,De[0],De[1],oe[0],oe[1],0]))};rt();_.queue.writeBuffer(we,0,new Float32Array([0,0,0]));let Se=!1;document.addEventListener("mousedown",function(t){Se=!0});document.addEventListener("mouseup",function(t){Se=!1,_.queue.writeBuffer(we,0,new Float32Array([0,0,0]))});document.addEventListener("mousemove",function(t){if(Se){const e=et.screenToWorld(t.clientX,t.clientY,10),n=1;_.queue.writeBuffer(we,0,new Float32Array([e[0],e[1],n]))}});const at=()=>{const t=_.createCommandEncoder(),e=t.beginComputePass();e.setPipeline(mi),e.setBindGroup(0,K),e.dispatchWorkgroups(Math.ceil(P/64)),e.end(),_.queue.submit([t.finish()])};at();async function st(){ve.begin(),_.queue.writeBuffer(tt,0,new Float32Array(li));const t=Ke.getCurrentTexture();Ve.colorAttachments[0].view=t.createView();const e=_.createCommandEncoder();for(let n=0;n<E.iteration;n++){{const i=e.beginComputePass();i.setPipeline(fi),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}{const i=e.beginComputePass();i.setPipeline(me),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}{const i=e.beginComputePass();i.setPipeline(di),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}{const i=e.beginComputePass();i.setPipeline(me),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}{const i=e.beginComputePass();i.setPipeline(vi),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}{const i=e.beginComputePass();i.setPipeline(me),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}{const i=e.beginComputePass();i.setPipeline(gi),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}{const i=e.beginComputePass();i.setPipeline(me),i.setBindGroup(0,K),i.dispatchWorkgroups(Math.ceil(P/64)),i.end()}}{const n=e.beginRenderPass(Ve);n.setPipeline(it),n.setBindGroup(0,hi),n.setVertexBuffer(0,ye),n.setVertexBuffer(1,Ce),n.draw(6,P,0,0),n.end()}_.queue.submit([e.finish()]),ve.end(),requestAnimationFrame(st)}requestAnimationFrame(st);const lt=t=>{const e=[],n=new Float32Array(t);for(let i=0;i<P;i++){const o=i*W/4,r={position:[n[o],n[o+1],n[o+2]],color:[n[o+4],n[o+5],n[o+6],n[o+7]],velocity:[n[o+8],n[o+9],n[o+10]],acceleration:[n[o+12],n[o+13],n[o+14]],density:n[o+15],pressure:n[o+16]};e.push(r)}return e};async function yi(){const t=_.createCommandEncoder();t.copyBufferToBuffer(ye,0,Q,0,P*W);const e=t.finish();_.queue.submit([e]);try{await Q.mapAsync(GPUMapMode.READ,0,P*W);const i=Q.getMappedRange(0,P*W).slice();Q.unmap();const o=lt(i);console.log(o)}catch(n){console.error("Error mapping buffer:",n)}}async function wi(){const t=_.createCommandEncoder();t.copyBufferToBuffer(ye,0,Q,0,P*W);const e=t.finish();_.queue.submit([e]);try{await Q.mapAsync(GPUMapMode.READ,0,P*W);const i=Q.getMappedRange(0,P*W).slice();Q.unmap();const o=lt(i);console.log("density : ",o[0].density,"pressure : ",o[0].pressure,"position : ",o[0].position)}catch(n){console.error("Error mapping buffer:",n)}}document.addEventListener("keydown",t=>{(t.key==="f"||t.key==="F")&&setInterval(wi,100)});document.addEventListener("keydown",t=>{(t.key==="c"||t.key==="C")&&yi()});
