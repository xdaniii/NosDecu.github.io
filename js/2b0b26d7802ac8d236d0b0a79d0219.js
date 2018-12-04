﻿var _gaq = _gaq || []; var _ua = _ua || null; var GFTrack = (function (a, b, c) { return { ga: (function (k) { var d = null, h = {}, g = { traditional: true, universal: false, onload: false, accountId: "UA-XXXXX-X", domain: "gameforge.com", anonymizeIp: true, allowLinker: true, debug: false, campaignName: false, domEvents: [], customVariables: [], callback: null }; var f = function () { if (g.debug) { f.history = f.history || []; f.history.push(arguments); if (this.console) { console.log(Array.prototype.slice.call(arguments)) } } }; function j(l) { for (var m in l) { if (g.hasOwnProperty(m)) { g[m] = l[m] } } if (g.onload && !(/^ua-\d{4,9}-\d{1,4}$/i).test(g.accountId.toString())) { f("ga: invalid analytics tracking code: ", g.accountId) } f("ga: settings", g); h.data = { gaLoaded: false, uaLoaded: false, ie: 0 }; if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { h.data.ie = Number(RegExp.$1) } if (typeof g.callback === "function" && !h.data.ie || h.data.ie > 7) { GFTrack.helper.addEvent(a, "load", function () { f("window loaded"); g.callback() }) } if (g.onload) { GFTrack.helper.addEvent(a, "load", function () { f("ga: document loaded. load analytics now"); h.loadGALib() }) } h.data.wWidth = a.innerWidth || c.clientWidth || body.clientWidth, h.data.wHeight = a.innerHeight || c.clientHeight || body.clientHeight; h.data.src = a.location.href.replace(/[^/]*\.html?/, "").replace(/#/g, ""); h.settings = g; h.setDOMEvents(); h.setCustomVariables() } function e(l) { h.loadGA = function () { _gaq.push(["_setAccount", g.accountId], ["_setDomainName", g.domain], ["_gat._anonymizeIp"], ["_setAllowLinker", g.allowLinker], ["_trackPageview"]); (function () { var n = b.createElement("script"); n.type = "text/javascript"; n.async = true; f("ga: account parameters", _gaq); n.src = ("https:" == b.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js"; var m = b.getElementsByTagName("script")[0]; m.parentNode.insertBefore(n, m); f("ga: traditional analytics loaded"); h.data.gaLoaded = true })() }, h.loadUA = function () { var m = "http://www.google-analytics.com/analytics.js"; (function (q, t, w, v, u, p, n) { q.GoogleAnalyticsObject = u; q[u] = q[u] || function () { (q[u].q = q[u].q || []).push(arguments) }, q[u].l = 1 * new Date(); p = t.createElement(w), n = t.getElementsByTagName(w)[0]; p.async = 1; p.src = v; n.parentNode.insertBefore(p, n); _ua = a._ua; _ua("create", g.accountId, "auto"); _ua("set", "anonymizeIp", true); _ua("send", "pageview"); if (g.campaignName) { _ua("set", "campaignName", g.campaignName) } GFTrack.helper.addEvent(t, "load", function () { f("ga: universal analytics loaded"); h.data.uaLoaded = true }) })(a, b, "script", m, "_ua") }, h.loadGALib = function () { if (g.traditional) { h.loadGA() } if (g.universal) { h.loadUA() } }; h.setDOMEvents = function () { if (g.domEvents.length > 0 && !h.data.ie || h.data.ie > 7) { for (var n = 0, m = g.domEvents.length; n < m; n++) { var o = g.domEvents[n]; GFTrack.helper.addEvent(o.sel, o.type, o.fn) } } }; h.setCustomVariables = function () { for (var n = 0, m = g.customVariables.length; n < m; n++) { var o = g.customVariables[n]; h.setCustomVar(o[0], o[1], o[2], o[3] || null) } }, h.sendEvent = function (n, p, m, o) { if (!n || !p || m === k) { return } m = m.toString(); if (h.data.gaLoaded) { (o !== "undefined") ? _gaq.push(["_trackEvent", n, p, m]) : _gaq.push(["_trackEvent", n, p, m, o]); f("ga: track event ", n, p, m, (o) ? o : "") } if (h.data.uaLoaded) { (o !== "undefined") ? _ua("send", "event", n, p, m, o) : _ua("send", "event", n, p, m); f("ua: track event ", n, p, m, (o) ? o : "") } }; h.sendUrl = function (n, m) { var o = m || a.location.href.replace(a.location.search, ""), n = (n === true) ? h.data.src : n; if (n && h.data.gaLoaded) { if (m) { _gaq.push(["_trackPageview", m]); f("ga: track url ", o) } else { if (!h.data.gaVisit) { _gaq.push(["_trackPageview"]); h.data.gaVisit = true; f("ga: track url ", o) } } } if (n && h.data.uaLoaded) { if (m) { _ua("send", "pageview", m); f("ua: track url ", o) } else { if (!h.uaVisit) { _ua("send", "pageview"); h.uaVisit = true; f("ua: track url ", o) } } } }; h.setCustomVar = function (n, m, p, o) { o = o || 3; _gaq.push(["_setCustomVar", n, m, p, o]); f("ga: track custom variable ", n, m, p, o) }; j(l); return { log: f, data: h.data, sendEvent: h.sendEvent, sendUrl: h.sendUrl, setCustomVar: h.setCustomVar } } return function (l) { d = d || new e(l); return d } })(), helper: { addEvent: function (h, g, f) { if (h && (h.tagName || h.location)) { objList = [h] } else { if (h && ((h.length && typeof h === "Array") || typeof h === "object")) { objList = h } } for (var e = 0, d = objList.length; e < d; e++) { var j = objList[e]; if (j.addEventListener) { j.addEventListener(g, f, false) } else { if (j.attachEvent) { j["e" + g + f] = f; j[g + f] = function () { j["e" + g + f](a.event) }; j.attachEvent("on" + g, j[g + f]) } } } }, byClass: function (j, h, d) { if (!h && !d && document.getElementsByClassName) { return document.getElementsByClassName(j) } else { if (!h && !d && document.querySelectorAll) { return document.querySelectorAll("." + j) } else { h = h || document; d = d || "*"; var g = [], e = h.getElementsByTagName(d), f = new RegExp("(^|\\s)" + j + "(\\s|$)"); for (i = 0, len = e.length; i < len; i++) { if (f.test(e[i].className)) { g.push(e[i]) } } return g } } }, byId: function (d) { return b.getElementById(d) }, byTag: function (d) { return b.getElementsByTagName(d) }, getIndex: function (e) { var d = 1; while (e.previousSibling) { e = e.previousSibling; if (e.nodeType === 1) { d++ } } return d }, loadScript: function (d, g) { var f = b.createElement("script"); f.type = "text/javascript"; f.async = true; f.src = d; if (g) { f.onreadystatechange = g; f.onload = g } var e = b.getElementsByTagName("script")[0]; e.parentNode.insertBefore(f, e) }, removeEvent: function (h, g, f) { if (h && (h.tagName || h.location)) { objList = [h] } else { if (h && ((h.length && typeof h === "Array") || typeof h === "object")) { objList = h } } for (var e = 0, d = objList.length; e < d; e++) { var j = objList[e]; if (j.removeEventListener) { j.removeEventListener(g, f, false) } else { if (j.detachEvent) { j.detachEvent("on" + g, j[g + f]); j[g + f] = null; j["e" + g + f] = null } } } } } } })(window, document, document.documentElement); var gaEvents = { checkScrollPosition: function () { gftga.data.scrollPosition = gaEvents.getScrollPosition(); window.setInterval(function () { if (gftga.data.scrollPosition !== gaEvents.getScrollPosition()) { var a = (gftga.data.scrollPosition < gaEvents.getScrollPosition()) ? "f" : "b"; gftga.data.scrollPosition = gaEvents.getScrollPosition(); gaEvents.sendScrollPosition(a + gftga.data.scrollPosition) } }, 100) }, getScrollPosition: function () { if (GF.scrollManager && GF.scrollManager.currentSectioniIndex !== undefined) { return GF.scrollManager.currentSectioniIndex } if (gftga.data.ie && gftga.data.ie < 9) { return GFTrack.helper.getIndex(GFTrack.helper.byClass("active", document.getElementById("scroll"))) } else { var a = Array.prototype.slice.call(document.getElementById("scroll").getElementsByTagName("li")), b = document.querySelector("#scroll li.active"); return a.indexOf(b) } }, clickCTA: function () { var a = gaEvents.getScrollPosition(); gftga.sendEvent("contentClick", "calltoaction", a); gftga.sendUrl(true, "content/click/calltoaction/?pos=" + a) }, clickExternalLink: function (c) { var b = c || window.event, d = b.currentTarget || b.srcElement, a = d.href; if (!a) { return } gftga.sendEvent("contentClick", "externalLink", encodeURI(a)); gftga.sendUrl(true, "content/click/externallink/?url=" + encodeURI(a)) }, clickScrollNavi: function (d) { var c = d || window.event, e = c.currentTarget || c.srcElement, b; if (gftga.data.ie && gftga.data.ie < 9) { b = GFTrack.helper.getIndex(e) } else { var a = Array.prototype.slice.call(document.getElementById("scroll").getElementsByTagName("li")); b = a.indexOf(e) } if (gftga.data.scrollPosition === gaEvents.getScrollPosition()) { return } gftga.sendEvent("contentClick", "scroll", b); gftga.sendUrl(true, "content/click/scroll/?pos=" + b) }, clickVideoPreview: function (c) { var b = c || window.event, d = b.currentTarget || b.srcElement, a = d.getAttribute("data-type"), e = m2_media[a].full.mp4 || "unknown"; e = e.replace(/^.*\//, "").replace(/\.\w{3,4}$/, ""); if (!a) { return } gftga.sendEvent("contentClick", "video" + a, encodeURI(e)); gftga.sendUrl(true, "content/click/video/" + a + "/?url=" + encodeURI(e)) }, clickMedia: function (c) { var b = c || window.event, d = b.currentTarget || b.srcElement, a = d.getAttribute("data-type"), e = d.getAttribute("data-src"); if (!a || !e) { return } gftga.sendEvent("contentClick", "media" + a, encodeURI(e)); gftga.sendUrl(true, "content/click/media/" + a + "/?url=" + encodeURI(e)) }, clickCloseRegister: function () { gftga.sendEvent("contentClick", "register1", "close"); gftga.sendUrl(true, "content/click/register/1/close/") }, closeWindow: function () { gftga.sendEvent("contentClick", "window", "close"); gftga.sendUrl(true, "content/click/window/close/") }, sendScrollPosition: function (a) { if (a === undefined) { return } gftga.sendEvent("contentScroll", "position", a); gftga.sendUrl(true, "content/scroll/?pos=" + a) }, sendSubmit: function (a) { gftga.sendEvent("contentClick", "register" + a, "submit"); gftga.sendUrl(true, "content/click/register/" + a + "/submit/") }, sendRegisterError: function (d, b, a, c) { if (c) { gftga.sendEvent("register" + d, "errorsubmit", b + " " + a); gftga.sendUrl(true, "register/" + d + "/error/submit/?msg=" + encodeURI(b + " " + a)) } else { gftga.sendEvent("register" + d, "errorfield", b + " " + a); gftga.sendUrl(true, "register/" + d + "/error/field/?msg=" + encodeURI(b + " " + a)) } } };