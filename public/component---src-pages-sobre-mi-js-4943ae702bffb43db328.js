/*! For license information please see component---src-pages-sobre-mi-js-4943ae702bffb43db328.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"8ncr":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=l(n("q1tI")),r=l(n("17x9")),o=l(n("TSYQ"));function l(e){return e&&e.__esModule?e:{default:e}}var a=function(e){var t=e.animate,n=e.className,r=e.layout,l=e.children;return i.default.createElement("div",{className:(0,o.default)(n,"vertical-timeline",{"vertical-timeline--animate":t,"vertical-timeline--two-columns":"2-columns"===r,"vertical-timeline--one-column-left":"1-column"===r||"1-column-left"===r,"vertical-timeline--one-column-right":"1-column-right"===r})},l)};a.propTypes={children:r.default.oneOfType([r.default.arrayOf(r.default.node),r.default.node]).isRequired,className:r.default.string,animate:r.default.bool,layout:r.default.oneOf(["1-column-left","1-column","2-columns","1-column-right"])},a.defaultProps={animate:!0,className:"",layout:"2-columns"};var s=a;t.default=s},IdOR:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("q1tI")),r=a(n("17x9")),o=a(n("TSYQ")),l=n("PGlZ");function a(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.children,n=e.className,r=e.contentArrowStyle,a=e.contentStyle,s=e.date,c=e.dateClassName,u=e.icon,d=e.iconClassName,f=e.iconOnClick,p=e.onTimelineElementClick,b=e.iconStyle,h=e.id,m=e.position,v=e.style,y=e.textClassName,g=e.intersectionObserverProps,O=e.visible;return i.default.createElement(l.InView,g,(function(e){var l=e.inView,g=e.ref;return i.default.createElement("div",{ref:g,id:h,className:(0,o.default)(n,"vertical-timeline-element",{"vertical-timeline-element--left":"left"===m,"vertical-timeline-element--right":"right"===m,"vertical-timeline-element--no-children":""===t}),style:v},i.default.createElement(i.default.Fragment,null,i.default.createElement("span",{style:b,onClick:f,className:(0,o.default)(d,"vertical-timeline-element-icon",{"bounce-in":l||O,"is-hidden":!(l||O)})},u),i.default.createElement("div",{style:a,onClick:p,className:(0,o.default)(y,"vertical-timeline-element-content",{"bounce-in":l||O,"is-hidden":!(l||O)})},i.default.createElement("div",{style:r,className:"vertical-timeline-element-content-arrow"}),t,i.default.createElement("span",{className:(0,o.default)(c,"vertical-timeline-element-date")},s))))}))};s.propTypes={children:r.default.oneOfType([r.default.arrayOf(r.default.node),r.default.node]),className:r.default.string,contentArrowStyle:r.default.shape({}),contentStyle:r.default.shape({}),date:r.default.node,dateClassName:r.default.string,icon:r.default.element,iconClassName:r.default.string,iconStyle:r.default.shape({}),iconOnClick:r.default.func,onTimelineElementClick:r.default.func,id:r.default.string,position:r.default.string,style:r.default.shape({}),textClassName:r.default.string,visible:r.default.bool,intersectionObserverProps:r.default.shape({root:r.default.object,rootMargin:r.default.string,threshold:r.default.number,triggerOnce:r.default.bool})},s.defaultProps={children:"",className:"",contentArrowStyle:null,contentStyle:null,icon:null,iconClassName:"",iconOnClick:null,onTimelineElementClick:null,iconStyle:null,id:"",style:null,date:"",dateClassName:"",position:"",textClassName:"",visible:!1,intersectionObserverProps:{rootMargin:"0px 0px -40px 0px"}};var c=s;t.default=c},PGlZ:function(e,t,n){"use strict";n.r(t),n.d(t,"InView",(function(){return d})),n.d(t,"useInView",(function(){return f}));var i=n("q1tI");function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var o=new Map,l=new Map,a=0;function s(e){return Object.keys(e).sort().filter((function(t){return void 0!==e[t]})).map((function(t){return t+"_"+("root"===t?(n=e.root)?(l.has(n)||(a+=1,l.set(n,a.toString())),l.get(n)):"0":e[t]);var n})).toString()}function c(e,t,n){if(void 0===n&&(n={}),!e)return function(){};var i=function(e){var t=s(e),n=o.get(t);if(!n){var i,r=new Map,l=new IntersectionObserver((function(t){t.forEach((function(t){var n,o=t.isIntersecting&&i.some((function(e){return t.intersectionRatio>=e}));e.trackVisibility&&void 0===t.isVisible&&(t.isVisible=o),null==(n=r.get(t.target))||n.forEach((function(e){e(o,t)}))}))}),e);i=l.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),n={id:t,observer:l,elements:r},o.set(t,n)}return n}(n),r=i.id,l=i.observer,a=i.elements,c=a.get(e)||[];return a.has(e)||a.set(e,c),c.push(t),l.observe(e),function(){c.splice(c.indexOf(t),1),0===c.length&&(a.delete(e),l.unobserve(e)),0===a.size&&(l.disconnect(),o.delete(r))}}function u(e){return"function"!=typeof e.children}var d=function(e){var t,n;function o(t){var n;return(n=e.call(this,t)||this).node=null,n._unobserveCb=null,n.handleNode=function(e){n.node&&(n.unobserve(),e||n.props.triggerOnce||n.props.skip||n.setState({inView:!!n.props.initialInView,entry:void 0})),n.node=e||null,n.observeNode()},n.handleChange=function(e,t){e&&n.props.triggerOnce&&n.unobserve(),u(n.props)||n.setState({inView:e,entry:t}),n.props.onChange&&n.props.onChange(e,t)},n.state={inView:!!t.initialInView,entry:void 0},n}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var l=o.prototype;return l.componentDidUpdate=function(e){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold&&e.skip===this.props.skip&&e.trackVisibility===this.props.trackVisibility&&e.delay===this.props.delay||(this.unobserve(),this.observeNode())},l.componentWillUnmount=function(){this.unobserve(),this.node=null},l.observeNode=function(){if(this.node&&!this.props.skip){var e=this.props,t=e.threshold,n=e.root,i=e.rootMargin,r=e.trackVisibility,o=e.delay;this._unobserveCb=c(this.node,this.handleChange,{threshold:t,root:n,rootMargin:i,trackVisibility:r,delay:o})}},l.unobserve=function(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)},l.render=function(){if(!u(this.props)){var e=this.state,t=e.inView,n=e.entry;return this.props.children({inView:t,entry:n,ref:this.handleNode})}var o=this.props,l=o.children,a=o.as,s=o.tag,c=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(o,["children","as","tag","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView"]);return Object(i.createElement)(a||s||"div",r({ref:this.handleNode},c),l)},o}(i.Component);function f(e){var t=void 0===e?{}:e,n=t.threshold,r=t.delay,o=t.trackVisibility,l=t.rootMargin,a=t.root,s=t.triggerOnce,u=t.skip,d=t.initialInView,f=Object(i.useRef)(),p=Object(i.useState)({inView:!!d}),b=p[0],h=p[1],m=Object(i.useCallback)((function(e){void 0!==f.current&&(f.current(),f.current=void 0),u||e&&(f.current=c(e,(function(e,t){h({inView:e,entry:t}),t.isIntersecting&&s&&f.current&&(f.current(),f.current=void 0)}),{root:a,rootMargin:l,threshold:n,trackVisibility:o,delay:r}))}),[Array.isArray(n)?n.toString():n,a,l,s,u,o,r]);Object(i.useEffect)((function(){f.current||!b.entry||s||u||h({inView:!!d})}));var v=[m,b.inView,b.entry];return v.ref=v[0],v.inView=v[1],v.entry=v[2],v}d.displayName="InView",d.defaultProps={threshold:0,triggerOnce:!1,initialInView:!1},t.default=d},TSYQ:function(e,t,n){var i;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var i=arguments[t];if(i){var o=typeof i;if("string"===o||"number"===o)e.push(i);else if(Array.isArray(i)&&i.length){var l=r.apply(null,i);l&&e.push(l)}else if("object"===o)for(var a in i)n.call(i,a)&&i[a]&&e.push(a)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(i=function(){return r}.apply(t,[]))||(e.exports=i)}()},UQjd:function(e,t,n){"use strict";e.exports={VerticalTimeline:n("8ncr").default,VerticalTimelineElement:n("IdOR").default}},aw3t:function(e,t,n){},kLAT:function(e,t,n){"use strict";n.r(t);var i=n("wTIg"),r=(n("q1tI"),[{id:1,title:"Ingeniero SVA",location:"Telefónica. Buenos Aires, Argentina",description:"Planificación e implementación de productos y servicios.  Análisis funcional y técnico de requerimientos. Bash scripting, UNIX, SQL, Oracle.",date:"Abril  2016 - Actualidad",icon:"work"},{id:2,title:"Consultor Siebel",location:"OneInfo Consulting. Buenos Aires, Argentina",description:"Configuración y desarrollo de Oracle Siebel en Siebel 8.0/8.1.Siebel. Integraciones de Legados vía WebServices y batch / online. Oracle PL/SQL, procesos ETL.",date:"Junio 2015 – Abril  2016",icon:"work"},{id:3,title:"Ingeniero en Soporte & Operaciones",location:"Corporación Digitel. Caracas, Venezuela",description:"Soporte a las aplicaciones de venta de la corporación. Atención a fallas, configuración, pruebas y desarrollo de nuevos servicios en el facturador de comverse RTBS. Procesos ETL, Oracle PL/SQL, UNIX.",date:"Mayo 2013 - Mayo 2015",icon:"work"},{id:4,title:"Oracle",location:"Oracle Database 11g: Advanced PL/SQL",description:" ",date:"Septiembre 2014",icon:"school"},{id:5,title:"Cisco Networking Academy",location:"Cisco Certified Network Associate - CCNA (No certificate)",description:" ",date:"Enero 2014 - Diciembre 2014",icon:"school"},{id:6,title:"Latinux Inc",location:"Certified Linux Administrator",description:" ",date:"Marzo 2014",icon:"school"},{id:7,title:"Ingeniero de redes",location:"Ericsson IT Solutions. Caracas, Venezuela",description:"Monitoreo y gestión de soluciones de clientes corporativos de telefónica de diferentes servicios (Frame relay, MPLS, TDM, CPA).",date:"Abril 2012 – Mayo 2013",icon:"work"},{id:8,title:"UNEFA",location:"Ingeniero en Telecomunicaciones",description:" ",date:"2005 - 2010",icon:"school"},{id:9,title:"IBM",location:"Desarrollador de Software",description:" ",date:"2008 - 2009",icon:"school"}]),o=n("UQjd"),l=(n("aw3t"),n("qKvR"));function a(){var e={background:"#06D6A0"},t={background:"#f9c74f"};return Object(l.b)("div",null,Object(l.b)(o.VerticalTimeline,{layout:"1-column-left"},r.map((function(n){var i="work"===n.icon,r=void 0!==n.buttonText&&null!==n.buttonText&&""!==n.buttonText;return Object(l.b)(o.VerticalTimelineElement,{key:n.key,date:n.date,dateClassName:"date",iconStyle:i?e:t},Object(l.b)("h3",{className:"vertical-timeline-element-title"},n.title),Object(l.b)("h5",{className:"vertical-timeline-element-subtitle"},n.location),Object(l.b)("p",{id:"description"},n.description),r&&Object(l.b)("a",{className:"button "+(i?"workButton":"schoolButton"),href:"/"},n.buttonText))}))))}var s=n("Bl7J"),c=n("vrFN"),u=Object(i.a)("contact",{target:"e1pqp2cr0"})({name:"hpssj1",styles:"padding:0px;margin:0px;display:flex;align-content:flex-end;justify-content:space-between;background-color:#595d64;border-radius:5%;"});t.default=function(){return Object(l.b)(s.a,null,Object(l.b)(c.a,{title:"sobreMi",keywords:["gatsby","application","react"]}),Object(l.b)("h1",null,"Sobre mí"),Object(l.b)(a,null),Object(l.b)(u,null))}}}]);
//# sourceMappingURL=component---src-pages-sobre-mi-js-4943ae702bffb43db328.js.map