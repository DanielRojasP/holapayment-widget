//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, ee = h.trustedTypes, te = ee ? ee.emptyScript : "", ne = h.reactiveElementPolyfillSupport, re = (e, t) => e, ie = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, ae = (e, t) => !l(e, t), oe = {
	attribute: !0,
	type: String,
	converter: ie,
	reflect: !1,
	useDefault: !1,
	hasChanged: ae
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var se = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = oe) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? oe;
	}
	static _$Ei() {
		if (this.hasOwnProperty(re("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(re("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(re("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? ie : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? ie : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ae)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
se.elementStyles = [], se.shadowRootOptions = { mode: "open" }, se[re("elementProperties")] = /* @__PURE__ */ new Map(), se[re("finalized")] = /* @__PURE__ */ new Map(), ne?.({ ReactiveElement: se }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var ce = globalThis, le = (e) => e, ue = ce.trustedTypes, de = ue ? ue.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, fe = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, pe = "?" + g, me = `<${pe}>`, he = document, ge = () => he.createComment(""), _e = (e) => e === null || typeof e != "object" && typeof e != "function", ve = Array.isArray, ye = (e) => ve(e) || typeof e?.[Symbol.iterator] == "function", be = "[ 	\n\f\r]", xe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Se = /-->/g, Ce = />/g, we = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Ee = /"/g, De = /^(?:script|style|textarea|title)$/i, _ = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), Oe = Symbol.for("lit-noChange"), v = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), Ae = he.createTreeWalker(he, 129);
function je(e, t) {
	if (!ve(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return de === void 0 ? t : de.createHTML(t);
}
var Me = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = xe;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === xe ? c[1] === "!--" ? o = Se : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = we) : (De.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = we) : o = Ce : o === we ? c[0] === ">" ? (o = i ?? xe, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? we : c[3] === "\"" ? Ee : Te) : o === Ee || o === Te ? o = we : o === Se || o === Ce ? o = xe : (o = we, i = void 0);
		let d = o === we && e[t + 1].startsWith("/>") ? " " : "";
		a += o === xe ? n + me : l >= 0 ? (r.push(s), n.slice(0, l) + fe + n.slice(l) + g + d) : n + g + (l === -2 ? t : d);
	}
	return [je(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ne = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Me(t, n);
		if (this.el = e.createElement(l, r), Ae.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = Ae.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(fe)) {
					let t = u[o++], n = i.getAttribute(e).split(g), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Re : r[1] === "?" ? ze : r[1] === "@" ? Be : Le
					}), i.removeAttribute(e);
				} else e.startsWith(g) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (De.test(i.tagName)) {
					let e = i.textContent.split(g), t = e.length - 1;
					if (t > 0) {
						i.textContent = ue ? ue.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], ge()), Ae.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], ge());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === pe) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(g, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += g.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = he.createElement("template");
		return n.innerHTML = e, n;
	}
};
function Pe(e, t, n = e, r) {
	if (t === Oe) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = _e(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = Pe(e, i._$AS(e, t.values), i, r)), t;
}
var Fe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? he).importNode(t, !0);
		Ae.currentNode = r;
		let i = Ae.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Ie(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ve(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = Ae.nextNode(), a++);
		}
		return Ae.currentNode = he, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Ie = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = Pe(this, e, t), _e(e) ? e === v || e == null || e === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : e !== this._$AH && e !== Oe && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ye(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== v && _e(this._$AH) ? this._$AA.nextSibling.data = e : this.T(he.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ne.createElement(je(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Fe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ke.get(e.strings);
		return t === void 0 && ke.set(e.strings, t = new Ne(e)), t;
	}
	k(t) {
		ve(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(ge()), this.O(ge()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = le(e).nextSibling;
			le(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Le = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = v, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = v;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = Pe(this, e, t, 0), a = !_e(e) || e !== this._$AH && e !== Oe, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = Pe(this, r[n + o], t, o), s === Oe && (s = this._$AH[o]), a ||= !_e(s) || s !== this._$AH[o], s === v ? e = v : e !== v && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Re = class extends Le {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === v ? void 0 : e;
	}
}, ze = class extends Le {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== v);
	}
}, Be = class extends Le {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = Pe(this, e, t, 0) ?? v) === Oe) return;
		let n = this._$AH, r = e === v && n !== v || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== v && (n === v || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ve = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		Pe(this, e);
	}
}, He = ce.litHtmlPolyfillSupport;
He?.(Ne, Ie), (ce.litHtmlVersions ??= []).push("3.3.3");
var Ue = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Ie(t.insertBefore(ge(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, We = globalThis, Ge = class extends se {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ue(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return Oe;
	}
};
Ge._$litElement$ = !0, Ge.finalized = !0, We.litElementHydrateSupport?.({ LitElement: Ge });
var Ke = We.litElementPolyfillSupport;
Ke?.({ LitElement: Ge }), (We.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var qe = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Je = {
	attribute: !0,
	type: String,
	converter: ie,
	reflect: !1,
	hasChanged: ae
}, Ye = (e = Je, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function y(e) {
	return (t, n) => typeof n == "object" ? Ye(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function Xe(e) {
	return y({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/styles.css?inline
var Ze = "/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-tracking:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-duration:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;--color-red-500:oklch(63.7% .237 25.331);--color-red-600:oklch(57.7% .245 27.325);--color-yellow-400:oklch(85.2% .199 91.936);--color-yellow-500:oklch(79.5% .184 86.047);--color-emerald-500:oklch(69.6% .17 162.48);--color-emerald-600:oklch(59.6% .145 163.225);--color-emerald-700:oklch(50.8% .118 165.612);--color-teal-50:oklch(98.4% .014 180.72);--color-teal-100:oklch(95.3% .051 180.801);--color-teal-500:oklch(70.4% .14 182.503);--color-teal-600:oklch(60% .118 184.704);--color-teal-700:oklch(51.1% .096 186.391);--color-blue-50:oklch(97% .014 254.604);--color-blue-100:oklch(93.2% .032 255.585);--color-blue-500:oklch(62.3% .214 259.815);--color-blue-600:oklch(54.6% .245 262.881);--color-blue-700:oklch(48.8% .243 264.376);--color-slate-50:oklch(98.4% .003 247.858);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-400:oklch(70.4% .04 256.788);--color-slate-600:oklch(44.6% .043 257.281);--color-slate-700:oklch(37.2% .044 257.287);--color-slate-800:oklch(27.9% .041 260.031);--color-slate-900:oklch(20.8% .042 265.755);--color-slate-950:oklch(12.9% .042 264.695);--color-gray-400:oklch(70.7% .022 261.325);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-md:28rem;--text-xs:.75rem;--text-xs--line-height:calc(1 / .75);--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-2xl:1.5rem;--text-2xl--line-height:calc(2 / 1.5);--font-weight-medium:500;--font-weight-semibold:600;--font-weight-bold:700;--font-weight-extrabold:800;--tracking-wide:.025em;--radius-lg:.5rem;--radius-xl:.75rem;--radius-2xl:1rem;--radius-3xl:1.5rem;--animate-spin:spin 1s linear infinite;--animate-pulse:pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;--blur-md:12px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", \"Noto Sans\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.inset-0{inset:0}.top-0{top:0}.top-4{top:calc(var(--spacing) * 4)}.right-4{right:calc(var(--spacing) * 4)}.left-0{left:0}.left-2{left:calc(var(--spacing) * 2)}.z-\\[99999\\]{z-index:99999}.container{width:100%}@media (width>=40rem){.container{max-width:40rem}}@media (width>=48rem){.container{max-width:48rem}}@media (width>=64rem){.container{max-width:64rem}}@media (width>=80rem){.container{max-width:80rem}}@media (width>=96rem){.container{max-width:96rem}}.my-auto{margin-block:auto}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-5{margin-top:calc(var(--spacing) * 5)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-6{margin-bottom:calc(var(--spacing) * 6)}.box-border{box-sizing:border-box}.flex{display:flex}.inline-block{display:inline-block}.h-3{height:calc(var(--spacing) * 3)}.h-4{height:calc(var(--spacing) * 4)}.h-5{height:calc(var(--spacing) * 5)}.h-6{height:calc(var(--spacing) * 6)}.h-8{height:calc(var(--spacing) * 8)}.h-10{height:calc(var(--spacing) * 10)}.min-h-\\[100px\\]{min-height:100px}.min-h-screen{min-height:100vh}.w-3{width:calc(var(--spacing) * 3)}.w-4{width:calc(var(--spacing) * 4)}.w-5{width:calc(var(--spacing) * 5)}.w-6{width:calc(var(--spacing) * 6)}.w-7{width:calc(var(--spacing) * 7)}.w-8{width:calc(var(--spacing) * 8)}.w-10{width:calc(var(--spacing) * 10)}.w-full{width:100%}.max-w-md{max-width:var(--container-md)}.shrink-0{flex-shrink:0}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-pulse{animation:var(--animate-pulse)}.animate-spin{animation:var(--animate-spin)}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-3{gap:calc(var(--spacing) * 3)}:where(.space-y-3>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)))}:where(.space-x-2>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)))}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.rounded-2xl{border-radius:var(--radius-2xl)}.rounded-3xl{border-radius:var(--radius-3xl)}.rounded-full{border-radius:2147483647px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-blue-100{border-color:var(--color-blue-100)}.border-slate-100{border-color:var(--color-slate-100)}.border-slate-200{border-color:var(--color-slate-200)}.border-slate-300{border-color:var(--color-slate-300)}.border-teal-100{border-color:var(--color-teal-100)}.border-teal-500{border-color:var(--color-teal-500)}.border-teal-600{border-color:var(--color-teal-600)}.bg-blue-50{background-color:var(--color-blue-50)}.bg-blue-50\\/80{background-color:#eff6ffcc}@supports (color:color-mix(in lab, red, red)){.bg-blue-50\\/80{background-color:color-mix(in oklab, var(--color-blue-50) 80%, transparent)}}.bg-blue-600{background-color:var(--color-blue-600)}.bg-emerald-600{background-color:var(--color-emerald-600)}.bg-red-500\\/90{background-color:#fb2c36e6}@supports (color:color-mix(in lab, red, red)){.bg-red-500\\/90{background-color:color-mix(in oklab, var(--color-red-500) 90%, transparent)}}.bg-slate-50{background-color:var(--color-slate-50)}.bg-slate-100{background-color:var(--color-slate-100)}.bg-slate-950\\/70{background-color:#020618b3}@supports (color:color-mix(in lab, red, red)){.bg-slate-950\\/70{background-color:color-mix(in oklab, var(--color-slate-950) 70%, transparent)}}.bg-teal-50\\/40{background-color:#f0fdfa66}@supports (color:color-mix(in lab, red, red)){.bg-teal-50\\/40{background-color:color-mix(in oklab, var(--color-teal-50) 40%, transparent)}}.bg-teal-600{background-color:var(--color-teal-600)}.bg-white{background-color:var(--color-white)}.bg-yellow-400{background-color:var(--color-yellow-400)}.bg-yellow-400\\/90{background-color:#fac800e6}@supports (color:color-mix(in lab, red, red)){.bg-yellow-400\\/90{background-color:color-mix(in oklab, var(--color-yellow-400) 90%, transparent)}}.p-2{padding:calc(var(--spacing) * 2)}.p-3{padding:calc(var(--spacing) * 3)}.p-4{padding:calc(var(--spacing) * 4)}.p-5{padding:calc(var(--spacing) * 5)}.px-1{padding-inline:var(--spacing)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-4{padding-inline:calc(var(--spacing) * 4)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-1{padding-block:var(--spacing)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.py-3{padding-block:calc(var(--spacing) * 3)}.pt-1{padding-top:var(--spacing)}.pt-4{padding-top:calc(var(--spacing) * 4)}.text-center{text-align:center}.text-left{text-align:left}.font-sans{font-family:var(--font-sans)}.text-2xl{font-size:var(--text-2xl);line-height:var(--tw-leading,var(--text-2xl--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-extrabold{--tw-font-weight:var(--font-weight-extrabold);font-weight:var(--font-weight-extrabold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.tracking-wide{--tw-tracking:var(--tracking-wide);letter-spacing:var(--tracking-wide)}.text-black{color:var(--color-black)}.text-blue-600{color:var(--color-blue-600)}.text-blue-700{color:var(--color-blue-700)}.text-gray-400{color:var(--color-gray-400)}.text-red-600{color:var(--color-red-600)}.text-slate-400{color:var(--color-slate-400)}.text-slate-600{color:var(--color-slate-600)}.text-slate-700{color:var(--color-slate-700)}.text-slate-800{color:var(--color-slate-800)}.text-slate-900{color:var(--color-slate-900)}.text-white{color:var(--color-white)}.uppercase{text-transform:uppercase}.italic{font-style:italic}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow-2xl{--tw-shadow:0 25px 50px -12px var(--tw-shadow-color,#00000040);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px var(--tw-shadow-color,#0000001a), 0 2px 4px -2px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-teal-500{--tw-ring-color:var(--color-teal-500)}.backdrop-blur-md{--tw-backdrop-blur:blur(var(--blur-md));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition-all{transition-property:all;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.duration-200{--tw-duration:.2s;transition-duration:.2s}@media (hover:hover){.hover\\:border-slate-300:hover{border-color:var(--color-slate-300)}.hover\\:bg-blue-700:hover{background-color:var(--color-blue-700)}.hover\\:bg-emerald-700:hover{background-color:var(--color-emerald-700)}.hover\\:bg-slate-50:hover{background-color:var(--color-slate-50)}.hover\\:bg-slate-100:hover{background-color:var(--color-slate-100)}.hover\\:bg-teal-700:hover{background-color:var(--color-teal-700)}.hover\\:bg-yellow-500:hover{background-color:var(--color-yellow-500)}.hover\\:text-slate-700:hover{color:var(--color-slate-700)}}.focus\\:border-blue-500:focus{border-color:var(--color-blue-500)}.focus\\:border-emerald-500:focus{border-color:var(--color-emerald-500)}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:bg-slate-300:disabled{background-color:var(--color-slate-300)}.disabled\\:opacity-50:disabled{opacity:.5}@media (width>=40rem){.sm\\:p-6{padding:calc(var(--spacing) * 6)}.sm\\:p-7{padding:calc(var(--spacing) * 7)}.sm\\:text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}}}@property --tw-rotate-x{syntax:\"*\";inherits:false}@property --tw-rotate-y{syntax:\"*\";inherits:false}@property --tw-rotate-z{syntax:\"*\";inherits:false}@property --tw-skew-x{syntax:\"*\";inherits:false}@property --tw-skew-y{syntax:\"*\";inherits:false}@property --tw-space-y-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:\"*\";inherits:false;initial-value:0}@property --tw-border-style{syntax:\"*\";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:\"*\";inherits:false}@property --tw-tracking{syntax:\"*\";inherits:false}@property --tw-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:\"*\";inherits:false}@property --tw-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:\"*\";inherits:false}@property --tw-inset-shadow-alpha{syntax:\"<percentage>\";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:\"*\";inherits:false}@property --tw-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:\"*\";inherits:false}@property --tw-inset-ring-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:\"*\";inherits:false}@property --tw-ring-offset-width{syntax:\"<length>\";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:\"*\";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:\"*\";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:\"*\";inherits:false}@property --tw-backdrop-brightness{syntax:\"*\";inherits:false}@property --tw-backdrop-contrast{syntax:\"*\";inherits:false}@property --tw-backdrop-grayscale{syntax:\"*\";inherits:false}@property --tw-backdrop-hue-rotate{syntax:\"*\";inherits:false}@property --tw-backdrop-invert{syntax:\"*\";inherits:false}@property --tw-backdrop-opacity{syntax:\"*\";inherits:false}@property --tw-backdrop-saturate{syntax:\"*\";inherits:false}@property --tw-backdrop-sepia{syntax:\"*\";inherits:false}@property --tw-duration{syntax:\"*\";inherits:false}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.5}}";
//#endregion
//#region node_modules/@paypal/paypal-js/dist/esm/paypal-js.js
function Qe(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function $e(e, t) {
	var n = document.querySelector(`script[src="${e}"]`);
	if (n === null) return null;
	var r = at(e, t), i = n.cloneNode();
	if (delete i.dataset.uidAuto, Object.keys(i.dataset).length !== Object.keys(r.dataset).length) return null;
	var a = !0;
	return Object.keys(i.dataset).forEach(function(e) {
		i.dataset[e] !== r.dataset[e] && (a = !1);
	}), a ? n : null;
}
function et(e) {
	var t = e.url, n = e.attributes, r = e.onSuccess, i = e.onError, a = at(t, n);
	a.onerror = i, a.onload = r, document.head.insertBefore(a, document.head.firstElementChild);
}
function tt(e) {
	var t = Object.prototype.hasOwnProperty.call(e, "sdkBaseUrl") ? e.sdkBaseUrl : void 0, n = Object.prototype.hasOwnProperty.call(e, "environment") ? e.environment : void 0;
	e.environment, e.sdkBaseUrl;
	var r = Qe(e, ["environment", "sdkBaseUrl"]), i = t || it(n), a = r, o = Object.keys(a).filter(function(e) {
		return a[e] !== void 0 && a[e] !== null && a[e] !== "";
	}).reduce(function(e, t) {
		var n = a[t].toString();
		return t = nt(t), t.substring(0, 4) === "data" || t === "crossorigin" ? e.attributes[t] = n : e.queryParams[t] = n, e;
	}, {
		queryParams: {},
		attributes: {}
	}), s = o.queryParams, c = o.attributes;
	return s["merchant-id"] && s["merchant-id"].indexOf(",") !== -1 && (c["data-merchant-id"] = s["merchant-id"], s["merchant-id"] = "*"), {
		url: `${i}?${rt(s)}`,
		attributes: c
	};
}
function nt(e) {
	return e.replace(/[A-Z]+(?![a-z])|[A-Z]/g, function(e, t) {
		return (t ? "-" : "") + e.toLowerCase();
	});
}
function rt(e) {
	var t = "";
	return Object.keys(e).forEach(function(n) {
		t.length !== 0 && (t += "&"), t += n + "=" + e[n];
	}), t;
}
function it(e) {
	return e === "sandbox" ? "https://www.sandbox.paypal.com/sdk/js" : "https://www.paypal.com/sdk/js";
}
function at(e, t) {
	t === void 0 && (t = {});
	var n = document.createElement("script");
	return n.src = e, Object.keys(t).forEach(function(e) {
		n.setAttribute(e, t[e]), e === "data-csp-nonce" && n.setAttribute("nonce", t["data-csp-nonce"]);
	}), n;
}
function ot(e, t) {
	if (t === void 0 && (t = Promise), lt(e, t), typeof document > "u") return t.resolve(null);
	var n = tt(e), r = n.url, i = n.attributes, a = i["data-namespace"] || "paypal", o = ct(a);
	return i["data-js-sdk-library"] ||= "paypal-js", $e(r, i) && o ? t.resolve(o) : st({
		url: r,
		attributes: i
	}, t).then(function() {
		var e = ct(a);
		if (e) return e;
		throw Error(`The window.${a} global variable is not available.`);
	});
}
function st(e, t) {
	t === void 0 && (t = Promise), lt(e, t);
	var n = e.url, r = e.attributes;
	if (typeof n != "string" || n.length === 0) throw Error("Invalid url.");
	if (r !== void 0 && typeof r != "object") throw Error("Expected attributes to be an object.");
	return new t(function(e, t) {
		if (typeof document > "u") return e();
		et({
			url: n,
			attributes: r,
			onSuccess: function() {
				return e();
			},
			onError: function() {
				return t(/* @__PURE__ */ Error(`The script "${n}" failed to load. Check the HTTP status code and response body in DevTools to learn more.`));
			}
		});
	});
}
function ct(e) {
	return window[e];
}
function lt(e, t) {
	if (typeof e != "object" || !e) throw Error("Expected an options object.");
	var n = e.environment;
	if (n && n !== "production" && n !== "sandbox") throw Error("The `environment` option must be either \"production\" or \"sandbox\".");
	if (t !== void 0 && typeof t != "function") throw Error("Expected PromisePonyfill to be a function.");
}
//#endregion
//#region node_modules/graphql/jsutils/devAssert.mjs
function ut(e, t) {
	if (!e) throw Error(t);
}
//#endregion
//#region node_modules/graphql/jsutils/isObjectLike.mjs
function dt(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region node_modules/graphql/jsutils/invariant.mjs
function ft(e, t) {
	if (!e) throw Error(t ?? "Unexpected invariant triggered.");
}
//#endregion
//#region node_modules/graphql/language/location.mjs
var pt = /\r\n|[\n\r]/g;
function mt(e, t) {
	let n = 0, r = 1;
	for (let i of e.body.matchAll(pt)) {
		if (typeof i.index == "number" || ft(!1), i.index >= t) break;
		n = i.index + i[0].length, r += 1;
	}
	return {
		line: r,
		column: t + 1 - n
	};
}
//#endregion
//#region node_modules/graphql/language/printLocation.mjs
function ht(e) {
	return gt(e.source, mt(e.source, e.start));
}
function gt(e, t) {
	let n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, i = t.line - 1, a = e.locationOffset.line - 1, o = t.line + a, s = t.line === 1 ? n : 0, c = t.column + s, l = `${e.name}:${o}:${c}\n`, u = r.split(/\r\n|[\n\r]/g), d = u[i];
	if (d.length > 120) {
		let e = Math.floor(c / 80), t = c % 80, n = [];
		for (let e = 0; e < d.length; e += 80) n.push(d.slice(e, e + 80));
		return l + _t([
			[`${o} |`, n[0]],
			...n.slice(1, e + 1).map((e) => ["|", e]),
			["|", "^".padStart(t)],
			["|", n[e + 1]]
		]);
	}
	return l + _t([
		[`${o - 1} |`, u[i - 1]],
		[`${o} |`, d],
		["|", "^".padStart(c)],
		[`${o + 1} |`, u[i + 1]]
	]);
}
function _t(e) {
	let t = e.filter(([e, t]) => t !== void 0), n = Math.max(...t.map(([e]) => e.length));
	return t.map(([e, t]) => e.padStart(n) + (t ? " " + t : "")).join("\n");
}
//#endregion
//#region node_modules/graphql/error/GraphQLError.mjs
function vt(e) {
	let t = e[0];
	return t == null || "kind" in t || "length" in t ? {
		nodes: t,
		source: e[1],
		positions: e[2],
		path: e[3],
		originalError: e[4],
		extensions: e[5]
	} : t;
}
var yt = class e extends Error {
	constructor(t, ...n) {
		let { nodes: r, source: i, positions: a, path: o, originalError: s, extensions: c } = vt(n);
		super(t), this.name = "GraphQLError", this.path = o ?? void 0, this.originalError = s ?? void 0, this.nodes = bt(Array.isArray(r) ? r : r ? [r] : void 0);
		let l = bt(this.nodes?.map((e) => e.loc).filter((e) => e != null));
		this.source = i ?? l?.[0]?.source, this.positions = a ?? l?.map((e) => e.start), this.locations = a && i ? a.map((e) => mt(i, e)) : l?.map((e) => mt(e.source, e.start));
		let u = dt(s?.extensions) ? s?.extensions : void 0;
		/* c8 ignore start */
		this.extensions = c ?? u ?? Object.create(null), Object.defineProperties(this, {
			message: {
				writable: !0,
				enumerable: !0
			},
			name: { enumerable: !1 },
			nodes: { enumerable: !1 },
			source: { enumerable: !1 },
			positions: { enumerable: !1 },
			originalError: { enumerable: !1 }
		}), s != null && s.stack ? Object.defineProperty(this, "stack", {
			value: s.stack,
			writable: !0,
			configurable: !0
		}) : Error.captureStackTrace ? Error.captureStackTrace(this, e) : Object.defineProperty(this, "stack", {
			value: Error().stack,
			writable: !0,
			configurable: !0
		});
		/* c8 ignore stop */
	}
	get [Symbol.toStringTag]() {
		return "GraphQLError";
	}
	toString() {
		let e = this.message;
		if (this.nodes) for (let t of this.nodes) t.loc && (e += "\n\n" + ht(t.loc));
		else if (this.source && this.locations) for (let t of this.locations) e += "\n\n" + gt(this.source, t);
		return e;
	}
	toJSON() {
		let e = { message: this.message };
		return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
	}
};
function bt(e) {
	return e === void 0 || e.length === 0 ? void 0 : e;
}
//#endregion
//#region node_modules/graphql/error/syntaxError.mjs
function b(e, t, n) {
	return new yt(`Syntax Error: ${n}`, {
		source: e,
		positions: [t]
	});
}
//#endregion
//#region node_modules/graphql/language/ast.mjs
var xt = class {
	constructor(e, t, n) {
		this.start = e.start, this.end = t.end, this.startToken = e, this.endToken = t, this.source = n;
	}
	get [Symbol.toStringTag]() {
		return "Location";
	}
	toJSON() {
		return {
			start: this.start,
			end: this.end
		};
	}
}, St = class {
	constructor(e, t, n, r, i, a) {
		this.kind = e, this.start = t, this.end = n, this.line = r, this.column = i, this.value = a, this.prev = null, this.next = null;
	}
	get [Symbol.toStringTag]() {
		return "Token";
	}
	toJSON() {
		return {
			kind: this.kind,
			value: this.value,
			line: this.line,
			column: this.column
		};
	}
}, Ct = {
	Name: [],
	Document: ["definitions"],
	OperationDefinition: [
		"description",
		"name",
		"variableDefinitions",
		"directives",
		"selectionSet"
	],
	VariableDefinition: [
		"description",
		"variable",
		"type",
		"defaultValue",
		"directives"
	],
	Variable: ["name"],
	SelectionSet: ["selections"],
	Field: [
		"alias",
		"name",
		"arguments",
		"directives",
		"selectionSet"
	],
	Argument: ["name", "value"],
	FragmentSpread: ["name", "directives"],
	InlineFragment: [
		"typeCondition",
		"directives",
		"selectionSet"
	],
	FragmentDefinition: [
		"description",
		"name",
		"variableDefinitions",
		"typeCondition",
		"directives",
		"selectionSet"
	],
	IntValue: [],
	FloatValue: [],
	StringValue: [],
	BooleanValue: [],
	NullValue: [],
	EnumValue: [],
	ListValue: ["values"],
	ObjectValue: ["fields"],
	ObjectField: ["name", "value"],
	Directive: ["name", "arguments"],
	NamedType: ["name"],
	ListType: ["type"],
	NonNullType: ["type"],
	SchemaDefinition: [
		"description",
		"directives",
		"operationTypes"
	],
	OperationTypeDefinition: ["type"],
	ScalarTypeDefinition: [
		"description",
		"name",
		"directives"
	],
	ObjectTypeDefinition: [
		"description",
		"name",
		"interfaces",
		"directives",
		"fields"
	],
	FieldDefinition: [
		"description",
		"name",
		"arguments",
		"type",
		"directives"
	],
	InputValueDefinition: [
		"description",
		"name",
		"type",
		"defaultValue",
		"directives"
	],
	InterfaceTypeDefinition: [
		"description",
		"name",
		"interfaces",
		"directives",
		"fields"
	],
	UnionTypeDefinition: [
		"description",
		"name",
		"directives",
		"types"
	],
	EnumTypeDefinition: [
		"description",
		"name",
		"directives",
		"values"
	],
	EnumValueDefinition: [
		"description",
		"name",
		"directives"
	],
	InputObjectTypeDefinition: [
		"description",
		"name",
		"directives",
		"fields"
	],
	DirectiveDefinition: [
		"description",
		"name",
		"arguments",
		"directives",
		"locations"
	],
	SchemaExtension: ["directives", "operationTypes"],
	DirectiveExtension: ["name", "directives"],
	ScalarTypeExtension: ["name", "directives"],
	ObjectTypeExtension: [
		"name",
		"interfaces",
		"directives",
		"fields"
	],
	InterfaceTypeExtension: [
		"name",
		"interfaces",
		"directives",
		"fields"
	],
	UnionTypeExtension: [
		"name",
		"directives",
		"types"
	],
	EnumTypeExtension: [
		"name",
		"directives",
		"values"
	],
	InputObjectTypeExtension: [
		"name",
		"directives",
		"fields"
	],
	TypeCoordinate: ["name"],
	MemberCoordinate: ["name", "memberName"],
	ArgumentCoordinate: [
		"name",
		"fieldName",
		"argumentName"
	],
	DirectiveCoordinate: ["name"],
	DirectiveArgumentCoordinate: ["name", "argumentName"]
}, wt = new Set(Object.keys(Ct));
function Tt(e) {
	let t = e?.kind;
	return typeof t == "string" && wt.has(t);
}
var x;
(function(e) {
	e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(x ||= {});
//#endregion
//#region node_modules/graphql/language/directiveLocation.mjs
var Et;
(function(e) {
	e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION", e.DIRECTIVE_DEFINITION = "DIRECTIVE_DEFINITION";
})(Et ||= {});
//#endregion
//#region node_modules/graphql/language/kinds.mjs
var S;
(function(e) {
	e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.DIRECTIVE_EXTENSION = "DirectiveExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension", e.TYPE_COORDINATE = "TypeCoordinate", e.MEMBER_COORDINATE = "MemberCoordinate", e.ARGUMENT_COORDINATE = "ArgumentCoordinate", e.DIRECTIVE_COORDINATE = "DirectiveCoordinate", e.DIRECTIVE_ARGUMENT_COORDINATE = "DirectiveArgumentCoordinate";
})(S ||= {});
//#endregion
//#region node_modules/graphql/language/characterClasses.mjs
function Dt(e) {
	return e === 9 || e === 32;
}
function Ot(e) {
	return e >= 48 && e <= 57;
}
function kt(e) {
	return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function At(e) {
	return kt(e) || e === 95;
}
function jt(e) {
	return kt(e) || Ot(e) || e === 95;
}
//#endregion
//#region node_modules/graphql/language/blockString.mjs
function Mt(e) {
	let t = 2 ** 53 - 1, n = null, r = -1;
	for (let i = 0; i < e.length; ++i) {
		let a = e[i], o = Nt(a);
		o !== a.length && (n ??= i, r = i, i !== 0 && o < t && (t = o));
	}
	return e.map((e, n) => n === 0 ? e : e.slice(t)).slice(n ?? 0, r + 1);
}
function Nt(e) {
	let t = 0;
	for (; t < e.length && Dt(e.charCodeAt(t));) ++t;
	return t;
}
function Pt(e, t) {
	let n = e.replace(/"""/g, "\\\"\"\""), r = n.split(/\r\n|[\n\r]/g), i = r.length === 1, a = r.length > 1 && r.slice(1).every((e) => e.length === 0 || Dt(e.charCodeAt(0))), o = n.endsWith("\\\"\"\""), s = e.endsWith("\"") && !o, c = e.endsWith("\\"), l = s || c, u = !(t != null && t.minimize) && (!i || e.length > 70 || l || a || o), d = "", f = i && Dt(e.charCodeAt(0));
	return (u && !f || a) && (d += "\n"), d += n, (u || l) && (d += "\n"), "\"\"\"" + d + "\"\"\"";
}
//#endregion
//#region node_modules/graphql/language/tokenKind.mjs
var C;
(function(e) {
	e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.DOT = ".", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(C ||= {});
//#endregion
//#region node_modules/graphql/language/lexer.mjs
var Ft = class {
	constructor(e) {
		let t = new St(C.SOF, 0, 0, 0, 0);
		this.source = e, this.lastToken = t, this.token = t, this.line = 1, this.lineStart = 0;
	}
	get [Symbol.toStringTag]() {
		return "Lexer";
	}
	advance() {
		return this.lastToken = this.token, this.token = this.lookahead();
	}
	lookahead() {
		let e = this.token;
		if (e.kind !== C.EOF) do
			if (e.next) e = e.next;
			else {
				let t = Ht(this, e.end);
				e.next = t, t.prev = e, e = t;
			}
		while (e.kind === C.COMMENT);
		return e;
	}
};
function It(e) {
	return e === C.BANG || e === C.DOLLAR || e === C.AMP || e === C.PAREN_L || e === C.PAREN_R || e === C.DOT || e === C.SPREAD || e === C.COLON || e === C.EQUALS || e === C.AT || e === C.BRACKET_L || e === C.BRACKET_R || e === C.BRACE_L || e === C.PIPE || e === C.BRACE_R;
}
function Lt(e) {
	return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function Rt(e, t) {
	return zt(e.charCodeAt(t)) && Bt(e.charCodeAt(t + 1));
}
function zt(e) {
	return e >= 55296 && e <= 56319;
}
function Bt(e) {
	return e >= 56320 && e <= 57343;
}
function Vt(e, t) {
	let n = e.source.body.codePointAt(t);
	if (n === void 0) return C.EOF;
	if (n >= 32 && n <= 126) {
		let e = String.fromCodePoint(n);
		return e === "\"" ? "'\"'" : `"${e}"`;
	}
	return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function w(e, t, n, r, i) {
	let a = e.line;
	return new St(t, n, r, a, 1 + n - e.lineStart, i);
}
function Ht(e, t) {
	let n = e.source.body, r = n.length, i = t;
	for (; i < r;) {
		let t = n.charCodeAt(i);
		switch (t) {
			case 65279:
			case 9:
			case 32:
			case 44:
				++i;
				continue;
			case 10:
				++i, ++e.line, e.lineStart = i;
				continue;
			case 13:
				n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++e.line, e.lineStart = i;
				continue;
			case 35: return Ut(e, i);
			case 33: return w(e, C.BANG, i, i + 1);
			case 36: return w(e, C.DOLLAR, i, i + 1);
			case 38: return w(e, C.AMP, i, i + 1);
			case 40: return w(e, C.PAREN_L, i, i + 1);
			case 41: return w(e, C.PAREN_R, i, i + 1);
			case 46:
				if (n.charCodeAt(i + 1) === 46 && n.charCodeAt(i + 2) === 46) return w(e, C.SPREAD, i, i + 3);
				break;
			case 58: return w(e, C.COLON, i, i + 1);
			case 61: return w(e, C.EQUALS, i, i + 1);
			case 64: return w(e, C.AT, i, i + 1);
			case 91: return w(e, C.BRACKET_L, i, i + 1);
			case 93: return w(e, C.BRACKET_R, i, i + 1);
			case 123: return w(e, C.BRACE_L, i, i + 1);
			case 124: return w(e, C.PIPE, i, i + 1);
			case 125: return w(e, C.BRACE_R, i, i + 1);
			case 34: return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 ? Qt(e, i) : Kt(e, i);
		}
		if (Ot(t) || t === 45) return Wt(e, i, t);
		if (At(t)) return $t(e, i);
		throw b(e.source, i, t === 39 ? "Unexpected single quote character ('), did you mean to use a double quote (\")?" : Lt(t) || Rt(n, i) ? `Unexpected character: ${Vt(e, i)}.` : `Invalid character: ${Vt(e, i)}.`);
	}
	return w(e, C.EOF, r, r);
}
function Ut(e, t) {
	let n = e.source.body, r = n.length, i = t + 1;
	for (; i < r;) {
		let e = n.charCodeAt(i);
		if (e === 10 || e === 13) break;
		if (Lt(e)) ++i;
		else if (Rt(n, i)) i += 2;
		else break;
	}
	return w(e, C.COMMENT, t, i, n.slice(t + 1, i));
}
function Wt(e, t, n) {
	let r = e.source.body, i = t, a = n, o = !1;
	if (a === 45 && (a = r.charCodeAt(++i)), a === 48) {
		if (a = r.charCodeAt(++i), Ot(a)) throw b(e.source, i, `Invalid number, unexpected digit after 0: ${Vt(e, i)}.`);
	} else i = Gt(e, i, a), a = r.charCodeAt(i);
	if (a === 46 && (o = !0, a = r.charCodeAt(++i), i = Gt(e, i, a), a = r.charCodeAt(i)), (a === 69 || a === 101) && (o = !0, a = r.charCodeAt(++i), (a === 43 || a === 45) && (a = r.charCodeAt(++i)), i = Gt(e, i, a), a = r.charCodeAt(i)), a === 46 || At(a)) throw b(e.source, i, `Invalid number, expected digit but got: ${Vt(e, i)}.`);
	return w(e, o ? C.FLOAT : C.INT, t, i, r.slice(t, i));
}
function Gt(e, t, n) {
	if (!Ot(n)) throw b(e.source, t, `Invalid number, expected digit but got: ${Vt(e, t)}.`);
	let r = e.source.body, i = t + 1;
	for (; Ot(r.charCodeAt(i));) ++i;
	return i;
}
function Kt(e, t) {
	let n = e.source.body, r = n.length, i = t + 1, a = i, o = "";
	for (; i < r;) {
		let r = n.charCodeAt(i);
		if (r === 34) return o += n.slice(a, i), w(e, C.STRING, t, i + 1, o);
		if (r === 92) {
			o += n.slice(a, i);
			let t = n.charCodeAt(i + 1) === 117 ? n.charCodeAt(i + 2) === 123 ? qt(e, i) : Jt(e, i) : Zt(e, i);
			o += t.value, i += t.size, a = i;
			continue;
		}
		if (r === 10 || r === 13) break;
		if (Lt(r)) ++i;
		else if (Rt(n, i)) i += 2;
		else throw b(e.source, i, `Invalid character within String: ${Vt(e, i)}.`);
	}
	throw b(e.source, i, "Unterminated string.");
}
function qt(e, t) {
	let n = e.source.body, r = 0, i = 3;
	for (; i < 12;) {
		let e = n.charCodeAt(t + i++);
		if (e === 125) {
			if (i < 5 || !Lt(r)) break;
			return {
				value: String.fromCodePoint(r),
				size: i
			};
		}
		if (r = r << 4 | Xt(e), r < 0) break;
	}
	throw b(e.source, t, `Invalid Unicode escape sequence: "${n.slice(t, t + i)}".`);
}
function Jt(e, t) {
	let n = e.source.body, r = Yt(n, t + 2);
	if (Lt(r)) return {
		value: String.fromCodePoint(r),
		size: 6
	};
	if (zt(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
		let e = Yt(n, t + 8);
		if (Bt(e)) return {
			value: String.fromCodePoint(r, e),
			size: 12
		};
	}
	throw b(e.source, t, `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`);
}
function Yt(e, t) {
	return Xt(e.charCodeAt(t)) << 12 | Xt(e.charCodeAt(t + 1)) << 8 | Xt(e.charCodeAt(t + 2)) << 4 | Xt(e.charCodeAt(t + 3));
}
function Xt(e) {
	return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Zt(e, t) {
	let n = e.source.body;
	switch (n.charCodeAt(t + 1)) {
		case 34: return {
			value: "\"",
			size: 2
		};
		case 92: return {
			value: "\\",
			size: 2
		};
		case 47: return {
			value: "/",
			size: 2
		};
		case 98: return {
			value: "\b",
			size: 2
		};
		case 102: return {
			value: "\f",
			size: 2
		};
		case 110: return {
			value: "\n",
			size: 2
		};
		case 114: return {
			value: "\r",
			size: 2
		};
		case 116: return {
			value: "	",
			size: 2
		};
	}
	throw b(e.source, t, `Invalid character escape sequence: "${n.slice(t, t + 2)}".`);
}
function Qt(e, t) {
	let n = e.source.body, r = n.length, i = e.lineStart, a = t + 3, o = a, s = "", c = [];
	for (; a < r;) {
		let r = n.charCodeAt(a);
		if (r === 34 && n.charCodeAt(a + 1) === 34 && n.charCodeAt(a + 2) === 34) {
			s += n.slice(o, a), c.push(s);
			let r = w(e, C.BLOCK_STRING, t, a + 3, Mt(c).join("\n"));
			return e.line += c.length - 1, e.lineStart = i, r;
		}
		if (r === 92 && n.charCodeAt(a + 1) === 34 && n.charCodeAt(a + 2) === 34 && n.charCodeAt(a + 3) === 34) {
			s += n.slice(o, a), o = a + 1, a += 4;
			continue;
		}
		if (r === 10 || r === 13) {
			s += n.slice(o, a), c.push(s), r === 13 && n.charCodeAt(a + 1) === 10 ? a += 2 : ++a, s = "", o = a, i = a;
			continue;
		}
		if (Lt(r)) ++a;
		else if (Rt(n, a)) a += 2;
		else throw b(e.source, a, `Invalid character within String: ${Vt(e, a)}.`);
	}
	throw b(e.source, a, "Unterminated string.");
}
function $t(e, t) {
	let n = e.source.body, r = n.length, i = t + 1;
	for (; i < r && jt(n.charCodeAt(i));) ++i;
	return w(e, C.NAME, t, i, n.slice(t, i));
}
//#endregion
//#region node_modules/graphql/jsutils/inspect.mjs
var en = 10, tn = 2;
function nn(e) {
	return rn(e, []);
}
function rn(e, t) {
	switch (typeof e) {
		case "string": return JSON.stringify(e);
		case "function": return e.name ? `[function ${e.name}]` : "[function]";
		case "object": return an(e, t);
		default: return String(e);
	}
}
function an(e, t) {
	if (e === null) return "null";
	if (t.includes(e)) return "[Circular]";
	let n = [...t, e];
	if (on(e)) {
		let t = e.toJSON();
		if (t !== e) return typeof t == "string" ? t : rn(t, n);
	} else if (Array.isArray(e)) return cn(e, n);
	return sn(e, n);
}
function on(e) {
	return typeof e.toJSON == "function";
}
function sn(e, t) {
	let n = Object.entries(e);
	return n.length === 0 ? "{}" : t.length > tn ? "[" + ln(e) + "]" : "{ " + n.map(([e, n]) => e + ": " + rn(n, t)).join(", ") + " }";
}
function cn(e, t) {
	if (e.length === 0) return "[]";
	if (t.length > tn) return "[Array]";
	let n = Math.min(en, e.length), r = e.length - n, i = [];
	for (let r = 0; r < n; ++r) i.push(rn(e[r], t));
	return r === 1 ? i.push("... 1 more item") : r > 1 && i.push(`... ${r} more items`), "[" + i.join(", ") + "]";
}
function ln(e) {
	let t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
	if (t === "Object" && typeof e.constructor == "function") {
		let t = e.constructor.name;
		if (typeof t == "string" && t !== "") return t;
	}
	return t;
}
var un = globalThis.process && process.env.NODE_ENV === "production" ? function(e, t) {
	return e instanceof t;
} : function(e, t) {
	if (e instanceof t) return !0;
	if (typeof e == "object" && e) {
		let n = t.prototype[Symbol.toStringTag];
		if (n === (Symbol.toStringTag in e ? e[Symbol.toStringTag] : e.constructor?.name)) {
			let t = nn(e);
			throw Error(`Cannot use ${n} "${t}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
		}
	}
	return !1;
}, dn = class {
	constructor(e, t = "GraphQL request", n = {
		line: 1,
		column: 1
	}) {
		typeof e == "string" || ut(!1, `Body must be a string. Received: ${nn(e)}.`), this.body = e, this.name = t, this.locationOffset = n, this.locationOffset.line > 0 || ut(!1, "line in locationOffset is 1-indexed and must be positive."), this.locationOffset.column > 0 || ut(!1, "column in locationOffset is 1-indexed and must be positive.");
	}
	get [Symbol.toStringTag]() {
		return "Source";
	}
};
function fn(e) {
	return un(e, dn);
}
//#endregion
//#region node_modules/graphql/language/parser.mjs
function pn(e, t) {
	let n = new mn(e, t), r = n.parseDocument();
	return Object.defineProperty(r, "tokenCount", {
		enumerable: !1,
		value: n.tokenCount
	}), r;
}
var mn = class {
	constructor(e, t = {}) {
		let { lexer: n, ...r } = t;
		if (n) this._lexer = n;
		else {
			let t = fn(e) ? e : new dn(e);
			this._lexer = new Ft(t);
		}
		this._options = r, this._tokenCounter = 0;
	}
	get tokenCount() {
		return this._tokenCounter;
	}
	parseName() {
		let e = this.expectToken(C.NAME);
		return this.node(e, {
			kind: S.NAME,
			value: e.value
		});
	}
	parseDocument() {
		return this.node(this._lexer.token, {
			kind: S.DOCUMENT,
			definitions: this.many(C.SOF, this.parseDefinition, C.EOF)
		});
	}
	parseDefinition() {
		if (this.peek(C.BRACE_L)) return this.parseOperationDefinition();
		let e = this.peekDescription(), t = e ? this._lexer.lookahead() : this._lexer.token;
		if (e && t.kind === C.BRACE_L) throw b(this._lexer.source, this._lexer.token.start, "Unexpected description, descriptions are not supported on shorthand queries.");
		if (t.kind === C.NAME) {
			switch (t.value) {
				case "schema": return this.parseSchemaDefinition();
				case "scalar": return this.parseScalarTypeDefinition();
				case "type": return this.parseObjectTypeDefinition();
				case "interface": return this.parseInterfaceTypeDefinition();
				case "union": return this.parseUnionTypeDefinition();
				case "enum": return this.parseEnumTypeDefinition();
				case "input": return this.parseInputObjectTypeDefinition();
				case "directive": return this.parseDirectiveDefinition();
			}
			switch (t.value) {
				case "query":
				case "mutation":
				case "subscription": return this.parseOperationDefinition();
				case "fragment": return this.parseFragmentDefinition();
			}
			if (e) throw b(this._lexer.source, this._lexer.token.start, "Unexpected description, only GraphQL definitions support descriptions.");
			if (t.value === "extend") return this.parseTypeSystemExtension();
		}
		throw this.unexpected(t);
	}
	parseOperationDefinition() {
		let e = this._lexer.token;
		if (this.peek(C.BRACE_L)) return this.node(e, {
			kind: S.OPERATION_DEFINITION,
			operation: x.QUERY,
			description: void 0,
			name: void 0,
			variableDefinitions: [],
			directives: [],
			selectionSet: this.parseSelectionSet()
		});
		let t = this.parseDescription(), n = this.parseOperationType(), r;
		return this.peek(C.NAME) && (r = this.parseName()), this.node(e, {
			kind: S.OPERATION_DEFINITION,
			operation: n,
			description: t,
			name: r,
			variableDefinitions: this.parseVariableDefinitions(),
			directives: this.parseDirectives(!1),
			selectionSet: this.parseSelectionSet()
		});
	}
	parseOperationType() {
		let e = this.expectToken(C.NAME);
		switch (e.value) {
			case "query": return x.QUERY;
			case "mutation": return x.MUTATION;
			case "subscription": return x.SUBSCRIPTION;
		}
		throw this.unexpected(e);
	}
	parseVariableDefinitions() {
		return this.optionalMany(C.PAREN_L, this.parseVariableDefinition, C.PAREN_R);
	}
	parseVariableDefinition() {
		return this.node(this._lexer.token, {
			kind: S.VARIABLE_DEFINITION,
			description: this.parseDescription(),
			variable: this.parseVariable(),
			type: (this.expectToken(C.COLON), this.parseTypeReference()),
			defaultValue: this.expectOptionalToken(C.EQUALS) ? this.parseConstValueLiteral() : void 0,
			directives: this.parseConstDirectives()
		});
	}
	parseVariable() {
		let e = this._lexer.token;
		return this.expectToken(C.DOLLAR), this.node(e, {
			kind: S.VARIABLE,
			name: this.parseName()
		});
	}
	parseSelectionSet() {
		return this.node(this._lexer.token, {
			kind: S.SELECTION_SET,
			selections: this.many(C.BRACE_L, this.parseSelection, C.BRACE_R)
		});
	}
	parseSelection() {
		return this.peek(C.SPREAD) ? this.parseFragment() : this.parseField();
	}
	parseField() {
		let e = this._lexer.token, t = this.parseName(), n, r;
		return this.expectOptionalToken(C.COLON) ? (n = t, r = this.parseName()) : r = t, this.node(e, {
			kind: S.FIELD,
			alias: n,
			name: r,
			arguments: this.parseArguments(!1),
			directives: this.parseDirectives(!1),
			selectionSet: this.peek(C.BRACE_L) ? this.parseSelectionSet() : void 0
		});
	}
	parseArguments(e) {
		let t = e ? this.parseConstArgument : this.parseArgument;
		return this.optionalMany(C.PAREN_L, t, C.PAREN_R);
	}
	parseArgument(e = !1) {
		let t = this._lexer.token, n = this.parseName();
		return this.expectToken(C.COLON), this.node(t, {
			kind: S.ARGUMENT,
			name: n,
			value: this.parseValueLiteral(e)
		});
	}
	parseConstArgument() {
		return this.parseArgument(!0);
	}
	parseFragment() {
		let e = this._lexer.token;
		this.expectToken(C.SPREAD);
		let t = this.expectOptionalKeyword("on");
		return !t && this.peek(C.NAME) ? this.node(e, {
			kind: S.FRAGMENT_SPREAD,
			name: this.parseFragmentName(),
			directives: this.parseDirectives(!1)
		}) : this.node(e, {
			kind: S.INLINE_FRAGMENT,
			typeCondition: t ? this.parseNamedType() : void 0,
			directives: this.parseDirectives(!1),
			selectionSet: this.parseSelectionSet()
		});
	}
	parseFragmentDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
			kind: S.FRAGMENT_DEFINITION,
			description: t,
			name: this.parseFragmentName(),
			variableDefinitions: this.parseVariableDefinitions(),
			typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
			directives: this.parseDirectives(!1),
			selectionSet: this.parseSelectionSet()
		}) : this.node(e, {
			kind: S.FRAGMENT_DEFINITION,
			description: t,
			name: this.parseFragmentName(),
			typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
			directives: this.parseDirectives(!1),
			selectionSet: this.parseSelectionSet()
		});
	}
	parseFragmentName() {
		if (this._lexer.token.value === "on") throw this.unexpected();
		return this.parseName();
	}
	parseValueLiteral(e) {
		let t = this._lexer.token;
		switch (t.kind) {
			case C.BRACKET_L: return this.parseList(e);
			case C.BRACE_L: return this.parseObject(e);
			case C.INT: return this.advanceLexer(), this.node(t, {
				kind: S.INT,
				value: t.value
			});
			case C.FLOAT: return this.advanceLexer(), this.node(t, {
				kind: S.FLOAT,
				value: t.value
			});
			case C.STRING:
			case C.BLOCK_STRING: return this.parseStringLiteral();
			case C.NAME: switch (this.advanceLexer(), t.value) {
				case "true": return this.node(t, {
					kind: S.BOOLEAN,
					value: !0
				});
				case "false": return this.node(t, {
					kind: S.BOOLEAN,
					value: !1
				});
				case "null": return this.node(t, { kind: S.NULL });
				default: return this.node(t, {
					kind: S.ENUM,
					value: t.value
				});
			}
			case C.DOLLAR:
				if (e) {
					if (this.expectToken(C.DOLLAR), this._lexer.token.kind === C.NAME) {
						let e = this._lexer.token.value;
						throw b(this._lexer.source, t.start, `Unexpected variable "$${e}" in constant value.`);
					}
					throw this.unexpected(t);
				}
				return this.parseVariable();
			default: throw this.unexpected();
		}
	}
	parseConstValueLiteral() {
		return this.parseValueLiteral(!0);
	}
	parseStringLiteral() {
		let e = this._lexer.token;
		return this.advanceLexer(), this.node(e, {
			kind: S.STRING,
			value: e.value,
			block: e.kind === C.BLOCK_STRING
		});
	}
	parseList(e) {
		return this.node(this._lexer.token, {
			kind: S.LIST,
			values: this.any(C.BRACKET_L, () => this.parseValueLiteral(e), C.BRACKET_R)
		});
	}
	parseObject(e) {
		return this.node(this._lexer.token, {
			kind: S.OBJECT,
			fields: this.any(C.BRACE_L, () => this.parseObjectField(e), C.BRACE_R)
		});
	}
	parseObjectField(e) {
		let t = this._lexer.token, n = this.parseName();
		return this.expectToken(C.COLON), this.node(t, {
			kind: S.OBJECT_FIELD,
			name: n,
			value: this.parseValueLiteral(e)
		});
	}
	parseDirectives(e) {
		let t = [];
		for (; this.peek(C.AT);) t.push(this.parseDirective(e));
		return t;
	}
	parseConstDirectives() {
		return this.parseDirectives(!0);
	}
	parseDirective(e) {
		let t = this._lexer.token;
		return this.expectToken(C.AT), this.node(t, {
			kind: S.DIRECTIVE,
			name: this.parseName(),
			arguments: this.parseArguments(e)
		});
	}
	parseTypeReference() {
		let e = this._lexer.token, t;
		if (this.expectOptionalToken(C.BRACKET_L)) {
			let n = this.parseTypeReference();
			this.expectToken(C.BRACKET_R), t = this.node(e, {
				kind: S.LIST_TYPE,
				type: n
			});
		} else t = this.parseNamedType();
		return this.expectOptionalToken(C.BANG) ? this.node(e, {
			kind: S.NON_NULL_TYPE,
			type: t
		}) : t;
	}
	parseNamedType() {
		return this.node(this._lexer.token, {
			kind: S.NAMED_TYPE,
			name: this.parseName()
		});
	}
	peekDescription() {
		return this.peek(C.STRING) || this.peek(C.BLOCK_STRING);
	}
	parseDescription() {
		if (this.peekDescription()) return this.parseStringLiteral();
	}
	parseSchemaDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("schema");
		let n = this.parseConstDirectives(), r = this.many(C.BRACE_L, this.parseOperationTypeDefinition, C.BRACE_R);
		return this.node(e, {
			kind: S.SCHEMA_DEFINITION,
			description: t,
			directives: n,
			operationTypes: r
		});
	}
	parseOperationTypeDefinition() {
		let e = this._lexer.token, t = this.parseOperationType();
		this.expectToken(C.COLON);
		let n = this.parseNamedType();
		return this.node(e, {
			kind: S.OPERATION_TYPE_DEFINITION,
			operation: t,
			type: n
		});
	}
	parseScalarTypeDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("scalar");
		let n = this.parseName(), r = this.parseConstDirectives();
		return this.node(e, {
			kind: S.SCALAR_TYPE_DEFINITION,
			description: t,
			name: n,
			directives: r
		});
	}
	parseObjectTypeDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("type");
		let n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
		return this.node(e, {
			kind: S.OBJECT_TYPE_DEFINITION,
			description: t,
			name: n,
			interfaces: r,
			directives: i,
			fields: a
		});
	}
	parseImplementsInterfaces() {
		return this.expectOptionalKeyword("implements") ? this.delimitedMany(C.AMP, this.parseNamedType) : [];
	}
	parseFieldsDefinition() {
		return this.optionalMany(C.BRACE_L, this.parseFieldDefinition, C.BRACE_R);
	}
	parseFieldDefinition() {
		let e = this._lexer.token, t = this.parseDescription(), n = this.parseName(), r = this.parseArgumentDefs();
		this.expectToken(C.COLON);
		let i = this.parseTypeReference(), a = this.parseConstDirectives();
		return this.node(e, {
			kind: S.FIELD_DEFINITION,
			description: t,
			name: n,
			arguments: r,
			type: i,
			directives: a
		});
	}
	parseArgumentDefs() {
		return this.optionalMany(C.PAREN_L, this.parseInputValueDef, C.PAREN_R);
	}
	parseInputValueDef() {
		let e = this._lexer.token, t = this.parseDescription(), n = this.parseName();
		this.expectToken(C.COLON);
		let r = this.parseTypeReference(), i;
		this.expectOptionalToken(C.EQUALS) && (i = this.parseConstValueLiteral());
		let a = this.parseConstDirectives();
		return this.node(e, {
			kind: S.INPUT_VALUE_DEFINITION,
			description: t,
			name: n,
			type: r,
			defaultValue: i,
			directives: a
		});
	}
	parseInterfaceTypeDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("interface");
		let n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
		return this.node(e, {
			kind: S.INTERFACE_TYPE_DEFINITION,
			description: t,
			name: n,
			interfaces: r,
			directives: i,
			fields: a
		});
	}
	parseUnionTypeDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("union");
		let n = this.parseName(), r = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
		return this.node(e, {
			kind: S.UNION_TYPE_DEFINITION,
			description: t,
			name: n,
			directives: r,
			types: i
		});
	}
	parseUnionMemberTypes() {
		return this.expectOptionalToken(C.EQUALS) ? this.delimitedMany(C.PIPE, this.parseNamedType) : [];
	}
	parseEnumTypeDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("enum");
		let n = this.parseName(), r = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
		return this.node(e, {
			kind: S.ENUM_TYPE_DEFINITION,
			description: t,
			name: n,
			directives: r,
			values: i
		});
	}
	parseEnumValuesDefinition() {
		return this.optionalMany(C.BRACE_L, this.parseEnumValueDefinition, C.BRACE_R);
	}
	parseEnumValueDefinition() {
		let e = this._lexer.token, t = this.parseDescription(), n = this.parseEnumValueName(), r = this.parseConstDirectives();
		return this.node(e, {
			kind: S.ENUM_VALUE_DEFINITION,
			description: t,
			name: n,
			directives: r
		});
	}
	parseEnumValueName() {
		if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") throw b(this._lexer.source, this._lexer.token.start, `${hn(this._lexer.token)} is reserved and cannot be used for an enum value.`);
		return this.parseName();
	}
	parseInputObjectTypeDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("input");
		let n = this.parseName(), r = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
		return this.node(e, {
			kind: S.INPUT_OBJECT_TYPE_DEFINITION,
			description: t,
			name: n,
			directives: r,
			fields: i
		});
	}
	parseInputFieldsDefinition() {
		return this.optionalMany(C.BRACE_L, this.parseInputValueDef, C.BRACE_R);
	}
	parseTypeSystemExtension() {
		let e = this._lexer.lookahead();
		if (e.kind === C.NAME) switch (e.value) {
			case "schema": return this.parseSchemaExtension();
			case "scalar": return this.parseScalarTypeExtension();
			case "type": return this.parseObjectTypeExtension();
			case "interface": return this.parseInterfaceTypeExtension();
			case "union": return this.parseUnionTypeExtension();
			case "enum": return this.parseEnumTypeExtension();
			case "input": return this.parseInputObjectTypeExtension();
			case "directive": if (this._options.experimentalDirectivesOnDirectiveDefinitions) return this.parseDirectiveDefinitionExtension();
		}
		throw this.unexpected(e);
	}
	parseSchemaExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("schema");
		let t = this.parseConstDirectives(), n = this.optionalMany(C.BRACE_L, this.parseOperationTypeDefinition, C.BRACE_R);
		if (t.length === 0 && n.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.SCHEMA_EXTENSION,
			directives: t,
			operationTypes: n
		});
	}
	parseScalarTypeExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("scalar");
		let t = this.parseName(), n = this.parseConstDirectives();
		if (n.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.SCALAR_TYPE_EXTENSION,
			name: t,
			directives: n
		});
	}
	parseObjectTypeExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("type");
		let t = this.parseName(), n = this.parseImplementsInterfaces(), r = this.parseConstDirectives(), i = this.parseFieldsDefinition();
		if (n.length === 0 && r.length === 0 && i.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.OBJECT_TYPE_EXTENSION,
			name: t,
			interfaces: n,
			directives: r,
			fields: i
		});
	}
	parseInterfaceTypeExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("interface");
		let t = this.parseName(), n = this.parseImplementsInterfaces(), r = this.parseConstDirectives(), i = this.parseFieldsDefinition();
		if (n.length === 0 && r.length === 0 && i.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.INTERFACE_TYPE_EXTENSION,
			name: t,
			interfaces: n,
			directives: r,
			fields: i
		});
	}
	parseUnionTypeExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("union");
		let t = this.parseName(), n = this.parseConstDirectives(), r = this.parseUnionMemberTypes();
		if (n.length === 0 && r.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.UNION_TYPE_EXTENSION,
			name: t,
			directives: n,
			types: r
		});
	}
	parseEnumTypeExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("enum");
		let t = this.parseName(), n = this.parseConstDirectives(), r = this.parseEnumValuesDefinition();
		if (n.length === 0 && r.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.ENUM_TYPE_EXTENSION,
			name: t,
			directives: n,
			values: r
		});
	}
	parseInputObjectTypeExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("input");
		let t = this.parseName(), n = this.parseConstDirectives(), r = this.parseInputFieldsDefinition();
		if (n.length === 0 && r.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.INPUT_OBJECT_TYPE_EXTENSION,
			name: t,
			directives: n,
			fields: r
		});
	}
	parseDirectiveDefinitionExtension() {
		let e = this._lexer.token;
		this.expectKeyword("extend"), this.expectKeyword("directive"), this.expectToken(C.AT);
		let t = this.parseName(), n = this.parseConstDirectives();
		if (n.length === 0) throw this.unexpected();
		return this.node(e, {
			kind: S.DIRECTIVE_EXTENSION,
			name: t,
			directives: n
		});
	}
	parseDirectiveDefinition() {
		let e = this._lexer.token, t = this.parseDescription();
		this.expectKeyword("directive"), this.expectToken(C.AT);
		let n = this.parseName(), r = this.parseArgumentDefs(), i = this._options.experimentalDirectivesOnDirectiveDefinitions ? this.parseConstDirectives() : [], a = this.expectOptionalKeyword("repeatable");
		this.expectKeyword("on");
		let o = this.parseDirectiveLocations();
		return this.node(e, {
			kind: S.DIRECTIVE_DEFINITION,
			description: t,
			name: n,
			arguments: r,
			directives: i,
			repeatable: a,
			locations: o
		});
	}
	parseDirectiveLocations() {
		return this.delimitedMany(C.PIPE, this.parseDirectiveLocation);
	}
	parseDirectiveLocation() {
		let e = this._lexer.token, t = this.parseName();
		if (Object.prototype.hasOwnProperty.call(Et, t.value)) return t;
		throw this.unexpected(e);
	}
	parseSchemaCoordinate() {
		let e = this._lexer.token, t = this.expectOptionalToken(C.AT), n = this.parseName(), r;
		!t && this.expectOptionalToken(C.DOT) && (r = this.parseName());
		let i;
		return (t || r) && this.expectOptionalToken(C.PAREN_L) && (i = this.parseName(), this.expectToken(C.COLON), this.expectToken(C.PAREN_R)), t ? i ? this.node(e, {
			kind: S.DIRECTIVE_ARGUMENT_COORDINATE,
			name: n,
			argumentName: i
		}) : this.node(e, {
			kind: S.DIRECTIVE_COORDINATE,
			name: n
		}) : r ? i ? this.node(e, {
			kind: S.ARGUMENT_COORDINATE,
			name: n,
			fieldName: r,
			argumentName: i
		}) : this.node(e, {
			kind: S.MEMBER_COORDINATE,
			name: n,
			memberName: r
		}) : this.node(e, {
			kind: S.TYPE_COORDINATE,
			name: n
		});
	}
	node(e, t) {
		return this._options.noLocation !== !0 && (t.loc = new xt(e, this._lexer.lastToken, this._lexer.source)), t;
	}
	peek(e) {
		return this._lexer.token.kind === e;
	}
	expectToken(e) {
		let t = this._lexer.token;
		if (t.kind === e) return this.advanceLexer(), t;
		throw b(this._lexer.source, t.start, `Expected ${gn(e)}, found ${hn(t)}.`);
	}
	expectOptionalToken(e) {
		return this._lexer.token.kind === e && (this.advanceLexer(), !0);
	}
	expectKeyword(e) {
		let t = this._lexer.token;
		if (t.kind === C.NAME && t.value === e) this.advanceLexer();
		else throw b(this._lexer.source, t.start, `Expected "${e}", found ${hn(t)}.`);
	}
	expectOptionalKeyword(e) {
		let t = this._lexer.token;
		return t.kind === C.NAME && t.value === e && (this.advanceLexer(), !0);
	}
	unexpected(e) {
		let t = e ?? this._lexer.token;
		return b(this._lexer.source, t.start, `Unexpected ${hn(t)}.`);
	}
	any(e, t, n) {
		this.expectToken(e);
		let r = [];
		for (; !this.expectOptionalToken(n);) r.push(t.call(this));
		return r;
	}
	optionalMany(e, t, n) {
		if (this.expectOptionalToken(e)) {
			let e = [];
			do
				e.push(t.call(this));
			while (!this.expectOptionalToken(n));
			return e;
		}
		return [];
	}
	many(e, t, n) {
		this.expectToken(e);
		let r = [];
		do
			r.push(t.call(this));
		while (!this.expectOptionalToken(n));
		return r;
	}
	delimitedMany(e, t) {
		this.expectOptionalToken(e);
		let n = [];
		do
			n.push(t.call(this));
		while (this.expectOptionalToken(e));
		return n;
	}
	advanceLexer() {
		let { maxTokens: e } = this._options, t = this._lexer.advance();
		if (t.kind !== C.EOF && (++this._tokenCounter, e !== void 0 && this._tokenCounter > e)) throw b(this._lexer.source, t.start, `Document contains more that ${e} tokens. Parsing aborted.`);
	}
};
function hn(e) {
	let t = e.value;
	return gn(e.kind) + (t == null ? "" : ` "${t}"`);
}
function gn(e) {
	return It(e) ? `"${e}"` : e;
}
//#endregion
//#region node_modules/graphql/language/printString.mjs
function _n(e) {
	return `"${e.replace(vn, yn)}"`;
}
var vn = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function yn(e) {
	return bn[e.charCodeAt(0)];
}
var bn = /* @__PURE__ */ "\\u0000.\\u0001.\\u0002.\\u0003.\\u0004.\\u0005.\\u0006.\\u0007.\\b.\\t.\\n.\\u000B.\\f.\\r.\\u000E.\\u000F.\\u0010.\\u0011.\\u0012.\\u0013.\\u0014.\\u0015.\\u0016.\\u0017.\\u0018.\\u0019.\\u001A.\\u001B.\\u001C.\\u001D.\\u001E.\\u001F...\\\"..........................................................\\\\...................................\\u007F.\\u0080.\\u0081.\\u0082.\\u0083.\\u0084.\\u0085.\\u0086.\\u0087.\\u0088.\\u0089.\\u008A.\\u008B.\\u008C.\\u008D.\\u008E.\\u008F.\\u0090.\\u0091.\\u0092.\\u0093.\\u0094.\\u0095.\\u0096.\\u0097.\\u0098.\\u0099.\\u009A.\\u009B.\\u009C.\\u009D.\\u009E.\\u009F".split("."), xn = Object.freeze({});
function T(e, t, n = Ct) {
	let r = /* @__PURE__ */ new Map();
	for (let e of Object.values(S)) r.set(e, Sn(t, e));
	let i, a = Array.isArray(e), o = [e], s = -1, c = [], l = e, u, d, f = [], p = [];
	do {
		s++;
		let e = s === o.length, m = e && c.length !== 0;
		if (e) {
			if (u = p.length === 0 ? void 0 : f[f.length - 1], l = d, d = p.pop(), m) {
				if (a) {
					l = l.slice();
					let e = 0;
					for (let [t, n] of c) {
						let r = t - e;
						n === null ? (l.splice(r, 1), e++) : l[r] = n;
					}
				} else {
					l = { ...l };
					for (let [e, t] of c) l[e] = t;
				}
			}
			s = i.index, o = i.keys, c = i.edits, a = i.inArray, i = i.prev;
		} else if (d) {
			if (u = a ? s : o[s], l = d[u], l == null) continue;
			f.push(u);
		}
		let h;
		if (!Array.isArray(l)) {
			if (Tt(l) || ut(!1, `Invalid AST Node: ${nn(l)}.`), h = (e ? r.get(l.kind)?.leave : r.get(l.kind)?.enter)?.call(t, l, u, d, f, p), h === xn) break;
			if (h === !1) {
				if (!e) {
					f.pop();
					continue;
				}
			} else if (h !== void 0 && (c.push([u, h]), !e)) {
				if (Tt(h)) l = h;
				else {
					f.pop();
					continue;
				}
			}
		}
		h === void 0 && m && c.push([u, l]), e ? f.pop() : (i = {
			inArray: a,
			index: s,
			keys: o,
			edits: c,
			prev: i
		}, a = Array.isArray(l), o = a ? l : n[l.kind] ?? [], s = -1, c = [], d && p.push(d), d = l);
	} while (i !== void 0);
	return c.length === 0 ? e : c[c.length - 1][1];
}
function Sn(e, t) {
	let n = e[t];
	return typeof n == "object" ? n : typeof n == "function" ? {
		enter: n,
		leave: void 0
	} : {
		enter: e.enter,
		leave: e.leave
	};
}
//#endregion
//#region node_modules/graphql/language/printer.mjs
function Cn(e) {
	return T(e, Tn);
}
var wn = 80, Tn = {
	Name: { leave: (e) => e.value },
	Variable: { leave: (e) => "$" + e.name },
	Document: { leave: (e) => E(e.definitions, "\n\n") },
	OperationDefinition: { leave(e) {
		let t = Dn(e.variableDefinitions) ? O("(\n", E(e.variableDefinitions, "\n"), "\n)") : O("(", E(e.variableDefinitions, ", "), ")"), n = O("", e.description, "\n") + E([
			e.operation,
			E([e.name, t]),
			E(e.directives, " ")
		], " ");
		return (n === "query" ? "" : n + " ") + e.selectionSet;
	} },
	VariableDefinition: { leave: ({ variable: e, type: t, defaultValue: n, directives: r, description: i }) => O("", i, "\n") + e + ": " + t + O(" = ", n) + O(" ", E(r, " ")) },
	SelectionSet: { leave: ({ selections: e }) => D(e) },
	Field: { leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: i }) {
		let a = O("", e, ": ") + t, o = a + O("(", E(n, ", "), ")");
		return o.length > wn && (o = a + O("(\n", En(E(n, "\n")), "\n)")), E([
			o,
			E(r, " "),
			i
		], " ");
	} },
	Argument: { leave: ({ name: e, value: t }) => e + ": " + t },
	FragmentSpread: { leave: ({ name: e, directives: t }) => "..." + e + O(" ", E(t, " ")) },
	InlineFragment: { leave: ({ typeCondition: e, directives: t, selectionSet: n }) => E([
		"...",
		O("on ", e),
		E(t, " "),
		n
	], " ") },
	FragmentDefinition: { leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: i, description: a }) => O("", a, "\n") + `fragment ${e}${O("(", E(n, ", "), ")")} on ${t} ${O("", E(r, " "), " ")}` + i },
	IntValue: { leave: ({ value: e }) => e },
	FloatValue: { leave: ({ value: e }) => e },
	StringValue: { leave: ({ value: e, block: t }) => t ? Pt(e) : _n(e) },
	BooleanValue: { leave: ({ value: e }) => e ? "true" : "false" },
	NullValue: { leave: () => "null" },
	EnumValue: { leave: ({ value: e }) => e },
	ListValue: { leave: ({ values: e }) => "[" + E(e, ", ") + "]" },
	ObjectValue: { leave: ({ fields: e }) => "{" + E(e, ", ") + "}" },
	ObjectField: { leave: ({ name: e, value: t }) => e + ": " + t },
	Directive: { leave: ({ name: e, arguments: t }) => "@" + e + O("(", E(t, ", "), ")") },
	NamedType: { leave: ({ name: e }) => e },
	ListType: { leave: ({ type: e }) => "[" + e + "]" },
	NonNullType: { leave: ({ type: e }) => e + "!" },
	SchemaDefinition: { leave: ({ description: e, directives: t, operationTypes: n }) => O("", e, "\n") + E([
		"schema",
		E(t, " "),
		D(n)
	], " ") },
	OperationTypeDefinition: { leave: ({ operation: e, type: t }) => e + ": " + t },
	ScalarTypeDefinition: { leave: ({ description: e, name: t, directives: n }) => O("", e, "\n") + E([
		"scalar",
		t,
		E(n, " ")
	], " ") },
	ObjectTypeDefinition: { leave: ({ description: e, name: t, interfaces: n, directives: r, fields: i }) => O("", e, "\n") + E([
		"type",
		t,
		O("implements ", E(n, " & ")),
		E(r, " "),
		D(i)
	], " ") },
	FieldDefinition: { leave: ({ description: e, name: t, arguments: n, type: r, directives: i }) => O("", e, "\n") + t + (Dn(n) ? O("(\n", En(E(n, "\n")), "\n)") : O("(", E(n, ", "), ")")) + ": " + r + O(" ", E(i, " ")) },
	InputValueDefinition: { leave: ({ description: e, name: t, type: n, defaultValue: r, directives: i }) => O("", e, "\n") + E([
		t + ": " + n,
		O("= ", r),
		E(i, " ")
	], " ") },
	InterfaceTypeDefinition: { leave: ({ description: e, name: t, interfaces: n, directives: r, fields: i }) => O("", e, "\n") + E([
		"interface",
		t,
		O("implements ", E(n, " & ")),
		E(r, " "),
		D(i)
	], " ") },
	UnionTypeDefinition: { leave: ({ description: e, name: t, directives: n, types: r }) => O("", e, "\n") + E([
		"union",
		t,
		E(n, " "),
		O("= ", E(r, " | "))
	], " ") },
	EnumTypeDefinition: { leave: ({ description: e, name: t, directives: n, values: r }) => O("", e, "\n") + E([
		"enum",
		t,
		E(n, " "),
		D(r)
	], " ") },
	EnumValueDefinition: { leave: ({ description: e, name: t, directives: n }) => O("", e, "\n") + E([t, E(n, " ")], " ") },
	InputObjectTypeDefinition: { leave: ({ description: e, name: t, directives: n, fields: r }) => O("", e, "\n") + E([
		"input",
		t,
		E(n, " "),
		D(r)
	], " ") },
	DirectiveDefinition: { leave: ({ description: e, name: t, arguments: n, directives: r, repeatable: i, locations: a }) => O("", e, "\n") + "directive @" + t + (Dn(n) ? O("(\n", En(E(n, "\n")), "\n)") : O("(", E(n, ", "), ")")) + O(" ", E(r, " ")) + (i ? " repeatable" : "") + " on " + E(a, " | ") },
	SchemaExtension: { leave: ({ directives: e, operationTypes: t }) => E([
		"extend schema",
		E(e, " "),
		D(t)
	], " ") },
	ScalarTypeExtension: { leave: ({ name: e, directives: t }) => E([
		"extend scalar",
		e,
		E(t, " ")
	], " ") },
	ObjectTypeExtension: { leave: ({ name: e, interfaces: t, directives: n, fields: r }) => E([
		"extend type",
		e,
		O("implements ", E(t, " & ")),
		E(n, " "),
		D(r)
	], " ") },
	InterfaceTypeExtension: { leave: ({ name: e, interfaces: t, directives: n, fields: r }) => E([
		"extend interface",
		e,
		O("implements ", E(t, " & ")),
		E(n, " "),
		D(r)
	], " ") },
	UnionTypeExtension: { leave: ({ name: e, directives: t, types: n }) => E([
		"extend union",
		e,
		E(t, " "),
		O("= ", E(n, " | "))
	], " ") },
	EnumTypeExtension: { leave: ({ name: e, directives: t, values: n }) => E([
		"extend enum",
		e,
		E(t, " "),
		D(n)
	], " ") },
	InputObjectTypeExtension: { leave: ({ name: e, directives: t, fields: n }) => E([
		"extend input",
		e,
		E(t, " "),
		D(n)
	], " ") },
	DirectiveExtension: { leave: ({ name: e, directives: t }) => E(["extend directive @" + e, E(t, " ")], " ") },
	TypeCoordinate: { leave: ({ name: e }) => e },
	MemberCoordinate: { leave: ({ name: e, memberName: t }) => E([e, O(".", t)]) },
	ArgumentCoordinate: { leave: ({ name: e, fieldName: t, argumentName: n }) => E([
		e,
		O(".", t),
		O("(", n, ":)")
	]) },
	DirectiveCoordinate: { leave: ({ name: e }) => E(["@", e]) },
	DirectiveArgumentCoordinate: { leave: ({ name: e, argumentName: t }) => E([
		"@",
		e,
		O("(", t, ":)")
	]) }
};
function E(e, t = "") {
	return e?.filter((e) => e).join(t) ?? "";
}
function D(e) {
	return O("{\n", En(E(e, "\n")), "\n}");
}
function O(e, t, n = "") {
	return t != null && t !== "" ? e + t + n : "";
}
function En(e) {
	return O("  ", e.replace(/\n/g, "\n  "));
}
function Dn(e) {
	/* c8 ignore next */
	return e?.some((e) => e.includes("\n")) ?? !1;
}
//#endregion
//#region node_modules/tslib/tslib.es6.mjs
var On = function(e, t) {
	return On = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, t) {
		e.__proto__ = t;
	} || function(e, t) {
		for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
	}, On(e, t);
};
function k(e, t) {
	if (typeof t != "function" && t !== null) throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
	On(e, t);
	function n() {
		this.constructor = e;
	}
	e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var kn = function() {
	return kn = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, kn.apply(this, arguments);
};
function An(e, t, n, r) {
	function i(e) {
		return e instanceof n ? e : new n(function(t) {
			t(e);
		});
	}
	return new (n ||= Promise)(function(n, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			e.done ? n(e.value) : i(e.value).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
function jn(e, t) {
	var n = {
		label: 0,
		sent: function() {
			if (a[0] & 1) throw a[1];
			return a[1];
		},
		trys: [],
		ops: []
	}, r, i, a, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
	return o.next = s(0), o.throw = s(1), o.return = s(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
		return this;
	}), o;
	function s(e) {
		return function(t) {
			return c([e, t]);
		};
	}
	function c(s) {
		if (r) throw TypeError("Generator is already executing.");
		for (; o && (o = 0, s[0] && (n = 0)), n;) try {
			if (r = 1, i && (a = s[0] & 2 ? i.return : s[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, s[1])).done) return a;
			switch (i = 0, a && (s = [s[0] & 2, a.value]), s[0]) {
				case 0:
				case 1:
					a = s;
					break;
				case 4: return n.label++, {
					value: s[1],
					done: !1
				};
				case 5:
					n.label++, i = s[1], s = [0];
					continue;
				case 7:
					s = n.ops.pop(), n.trys.pop();
					continue;
				default:
					if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (s[0] === 6 || s[0] === 2)) {
						n = 0;
						continue;
					}
					if (s[0] === 3 && (!a || s[1] > a[0] && s[1] < a[3])) {
						n.label = s[1];
						break;
					}
					if (s[0] === 6 && n.label < a[1]) {
						n.label = a[1], a = s;
						break;
					}
					if (a && n.label < a[2]) {
						n.label = a[2], n.ops.push(s);
						break;
					}
					a[2] && n.ops.pop(), n.trys.pop();
					continue;
			}
			s = t.call(e, n);
		} catch (e) {
			s = [6, e], i = 0;
		} finally {
			r = a = 0;
		}
		if (s[0] & 5) throw s[1];
		return {
			value: s[0] ? s[1] : void 0,
			done: !0
		};
	}
}
function Mn(e) {
	var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
	if (n) return n.call(e);
	if (e && typeof e.length == "number") return { next: function() {
		return e && r >= e.length && (e = void 0), {
			value: e && e[r++],
			done: !e
		};
	} };
	throw TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Nn(e, t) {
	var n = typeof Symbol == "function" && e[Symbol.iterator];
	if (!n) return e;
	var r = n.call(e), i, a = [], o;
	try {
		for (; (t === void 0 || t-- > 0) && !(i = r.next()).done;) a.push(i.value);
	} catch (e) {
		o = { error: e };
	} finally {
		try {
			i && !i.done && (n = r.return) && n.call(r);
		} finally {
			if (o) throw o.error;
		}
	}
	return a;
}
function Pn(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
function Fn(e) {
	return this instanceof Fn ? (this.v = e, this) : new Fn(e);
}
function In(e, t, n) {
	if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
	var r = n.apply(e, t || []), i, a = [];
	return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", o), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function o(e) {
		return function(t) {
			return Promise.resolve(t).then(e, d);
		};
	}
	function s(e, t) {
		r[e] && (i[e] = function(t) {
			return new Promise(function(n, r) {
				a.push([
					e,
					t,
					n,
					r
				]) > 1 || c(e, t);
			});
		}, t && (i[e] = t(i[e])));
	}
	function c(e, t) {
		try {
			l(r[e](t));
		} catch (e) {
			f(a[0][3], e);
		}
	}
	function l(e) {
		e.value instanceof Fn ? Promise.resolve(e.value.v).then(u, d) : f(a[0][2], e);
	}
	function u(e) {
		c("next", e);
	}
	function d(e) {
		c("throw", e);
	}
	function f(e, t) {
		e(t), a.shift(), a.length && c(a[0][0], a[0][1]);
	}
}
function Ln(e) {
	if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
	var t = e[Symbol.asyncIterator], n;
	return t ? t.call(e) : (e = typeof Mn == "function" ? Mn(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
		return this;
	}, n);
	function r(t) {
		n[t] = e[t] && function(n) {
			return new Promise(function(r, a) {
				n = e[t](n), i(r, a, n.done, n.value);
			});
		};
	}
	function i(e, t, n, r) {
		Promise.resolve(r).then(function(t) {
			e({
				value: t,
				done: n
			});
		}, t);
	}
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function A(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function Rn(e) {
	var t = e(function(e) {
		Error.call(e), e.stack = (/* @__PURE__ */ Error()).stack;
	});
	return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var zn = Rn(function(e) {
	return function(t) {
		e(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map(function(e, t) {
			return t + 1 + ") " + e.toString();
		}).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t;
	};
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function Bn(e, t) {
	if (e) {
		var n = e.indexOf(t);
		0 <= n && e.splice(n, 1);
	}
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Subscription.js
var Vn = function() {
	function e(e) {
		this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
	}
	return e.prototype.unsubscribe = function() {
		var e, t, n, r, i;
		if (!this.closed) {
			this.closed = !0;
			var a = this._parentage;
			if (a) {
				if (this._parentage = null, Array.isArray(a)) try {
					for (var o = Mn(a), s = o.next(); !s.done; s = o.next()) s.value.remove(this);
				} catch (t) {
					e = { error: t };
				} finally {
					try {
						s && !s.done && (t = o.return) && t.call(o);
					} finally {
						if (e) throw e.error;
					}
				}
				else a.remove(this);
			}
			var c = this.initialTeardown;
			if (A(c)) try {
				c();
			} catch (e) {
				i = e instanceof zn ? e.errors : [e];
			}
			var l = this._finalizers;
			if (l) {
				this._finalizers = null;
				try {
					for (var u = Mn(l), d = u.next(); !d.done; d = u.next()) {
						var f = d.value;
						try {
							Wn(f);
						} catch (e) {
							i ??= [], e instanceof zn ? i = Pn(Pn([], Nn(i)), Nn(e.errors)) : i.push(e);
						}
					}
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						d && !d.done && (r = u.return) && r.call(u);
					} finally {
						if (n) throw n.error;
					}
				}
			}
			if (i) throw new zn(i);
		}
	}, e.prototype.add = function(t) {
		if (t && t !== this) {
			if (this.closed) Wn(t);
			else {
				if (t instanceof e) {
					if (t.closed || t._hasParent(this)) return;
					t._addParent(this);
				}
				(this._finalizers = this._finalizers ?? []).push(t);
			}
		}
	}, e.prototype._hasParent = function(e) {
		var t = this._parentage;
		return t === e || Array.isArray(t) && t.includes(e);
	}, e.prototype._addParent = function(e) {
		var t = this._parentage;
		this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
	}, e.prototype._removeParent = function(e) {
		var t = this._parentage;
		t === e ? this._parentage = null : Array.isArray(t) && Bn(t, e);
	}, e.prototype.remove = function(t) {
		var n = this._finalizers;
		n && Bn(n, t), t instanceof e && t._removeParent(this);
	}, e.EMPTY = (function() {
		var t = new e();
		return t.closed = !0, t;
	})(), e;
}(), Hn = Vn.EMPTY;
function Un(e) {
	return e instanceof Vn || e && "closed" in e && A(e.remove) && A(e.add) && A(e.unsubscribe);
}
function Wn(e) {
	A(e) ? e() : e.unsubscribe();
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/config.js
var Gn = {
	onUnhandledError: null,
	onStoppedNotification: null,
	Promise: void 0,
	useDeprecatedSynchronousErrorHandling: !1,
	useDeprecatedNextContext: !1
}, Kn = {
	setTimeout: function(e, t) {
		var n = [...arguments].slice(2), r = Kn.delegate;
		return r?.setTimeout ? r.setTimeout.apply(r, Pn([e, t], Nn(n))) : setTimeout.apply(void 0, Pn([e, t], Nn(n)));
	},
	clearTimeout: function(e) {
		return (Kn.delegate?.clearTimeout || clearTimeout)(e);
	},
	delegate: void 0
};
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function qn(e) {
	Kn.setTimeout(function() {
		var t = Gn.onUnhandledError;
		if (t) t(e);
		else throw e;
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/noop.js
function Jn() {}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var Yn = (function() {
	return Qn("C", void 0, void 0);
})();
function Xn(e) {
	return Qn("E", void 0, e);
}
function Zn(e) {
	return Qn("N", e, void 0);
}
function Qn(e, t, n) {
	return {
		kind: e,
		value: t,
		error: n
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var $n = null;
function er(e) {
	if (Gn.useDeprecatedSynchronousErrorHandling) {
		var t = !$n;
		if (t && ($n = {
			errorThrown: !1,
			error: null
		}), e(), t) {
			var n = $n, r = n.errorThrown, i = n.error;
			if ($n = null, r) throw i;
		}
	} else e();
}
function tr(e) {
	Gn.useDeprecatedSynchronousErrorHandling && $n && ($n.errorThrown = !0, $n.error = e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Subscriber.js
var nr = function(e) {
	k(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n.isStopped = !1, t ? (n.destination = t, Un(t) && t.add(n)) : n.destination = ur, n;
	}
	return t.create = function(e, t, n) {
		return new or(e, t, n);
	}, t.prototype.next = function(e) {
		this.isStopped ? lr(Zn(e), this) : this._next(e);
	}, t.prototype.error = function(e) {
		this.isStopped ? lr(Xn(e), this) : (this.isStopped = !0, this._error(e));
	}, t.prototype.complete = function() {
		this.isStopped ? lr(Yn, this) : (this.isStopped = !0, this._complete());
	}, t.prototype.unsubscribe = function() {
		this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
	}, t.prototype._next = function(e) {
		this.destination.next(e);
	}, t.prototype._error = function(e) {
		try {
			this.destination.error(e);
		} finally {
			this.unsubscribe();
		}
	}, t.prototype._complete = function() {
		try {
			this.destination.complete();
		} finally {
			this.unsubscribe();
		}
	}, t;
}(Vn), rr = Function.prototype.bind;
function ir(e, t) {
	return rr.call(e, t);
}
var ar = function() {
	function e(e) {
		this.partialObserver = e;
	}
	return e.prototype.next = function(e) {
		var t = this.partialObserver;
		if (t.next) try {
			t.next(e);
		} catch (e) {
			sr(e);
		}
	}, e.prototype.error = function(e) {
		var t = this.partialObserver;
		if (t.error) try {
			t.error(e);
		} catch (e) {
			sr(e);
		}
		else sr(e);
	}, e.prototype.complete = function() {
		var e = this.partialObserver;
		if (e.complete) try {
			e.complete();
		} catch (e) {
			sr(e);
		}
	}, e;
}(), or = function(e) {
	k(t, e);
	function t(t, n, r) {
		var i = e.call(this) || this, a;
		if (A(t) || !t) a = {
			next: t ?? void 0,
			error: n ?? void 0,
			complete: r ?? void 0
		};
		else {
			var o;
			i && Gn.useDeprecatedNextContext ? (o = Object.create(t), o.unsubscribe = function() {
				return i.unsubscribe();
			}, a = {
				next: t.next && ir(t.next, o),
				error: t.error && ir(t.error, o),
				complete: t.complete && ir(t.complete, o)
			}) : a = t;
		}
		return i.destination = new ar(a), i;
	}
	return t;
}(nr);
function sr(e) {
	Gn.useDeprecatedSynchronousErrorHandling ? tr(e) : qn(e);
}
function cr(e) {
	throw e;
}
function lr(e, t) {
	var n = Gn.onStoppedNotification;
	n && Kn.setTimeout(function() {
		return n(e, t);
	});
}
var ur = {
	closed: !0,
	next: Jn,
	error: cr,
	complete: Jn
}, dr = (function() {
	return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/identity.js
function fr(e) {
	return e;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pr(e) {
	return e.length === 0 ? fr : e.length === 1 ? e[0] : function(t) {
		return e.reduce(function(e, t) {
			return t(e);
		}, t);
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Observable.js
var j = function() {
	function e(e) {
		e && (this._subscribe = e);
	}
	return e.prototype.lift = function(t) {
		var n = new e();
		return n.source = this, n.operator = t, n;
	}, e.prototype.subscribe = function(e, t, n) {
		var r = this, i = gr(e) ? e : new or(e, t, n);
		return er(function() {
			var e = r, t = e.operator, n = e.source;
			i.add(t ? t.call(i, n) : n ? r._subscribe(i) : r._trySubscribe(i));
		}), i;
	}, e.prototype._trySubscribe = function(e) {
		try {
			return this._subscribe(e);
		} catch (t) {
			e.error(t);
		}
	}, e.prototype.forEach = function(e, t) {
		var n = this;
		return t = mr(t), new t(function(t, r) {
			var i = new or({
				next: function(t) {
					try {
						e(t);
					} catch (e) {
						r(e), i.unsubscribe();
					}
				},
				error: r,
				complete: t
			});
			n.subscribe(i);
		});
	}, e.prototype._subscribe = function(e) {
		return this.source?.subscribe(e);
	}, e.prototype[dr] = function() {
		return this;
	}, e.prototype.pipe = function() {
		return pr([...arguments])(this);
	}, e.prototype.toPromise = function(e) {
		var t = this;
		return e = mr(e), new e(function(e, n) {
			var r;
			t.subscribe(function(e) {
				return r = e;
			}, function(e) {
				return n(e);
			}, function() {
				return e(r);
			});
		});
	}, e.create = function(t) {
		return new e(t);
	}, e;
}();
function mr(e) {
	return e ?? Gn.Promise ?? Promise;
}
function hr(e) {
	return e && A(e.next) && A(e.error) && A(e.complete);
}
function gr(e) {
	return e && e instanceof nr || hr(e) && Un(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/lift.js
function _r(e) {
	return A(e?.lift);
}
function M(e) {
	return function(t) {
		if (_r(t)) return t.lift(function(t) {
			try {
				return e(t, this);
			} catch (e) {
				this.error(e);
			}
		});
		throw TypeError("Unable to lift unknown Observable type");
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function N(e, t, n, r, i) {
	return new vr(e, t, n, r, i);
}
var vr = function(e) {
	k(t, e);
	function t(t, n, r, i, a, o) {
		var s = e.call(this, t) || this;
		return s.onFinalize = a, s.shouldUnsubscribe = o, s._next = n ? function(e) {
			try {
				n(e);
			} catch (e) {
				t.error(e);
			}
		} : e.prototype._next, s._error = i ? function(e) {
			try {
				i(e);
			} catch (e) {
				t.error(e);
			} finally {
				this.unsubscribe();
			}
		} : e.prototype._error, s._complete = r ? function() {
			try {
				r();
			} catch (e) {
				t.error(e);
			} finally {
				this.unsubscribe();
			}
		} : e.prototype._complete, s;
	}
	return t.prototype.unsubscribe = function() {
		var t;
		if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
			var n = this.closed;
			e.prototype.unsubscribe.call(this), !n && ((t = this.onFinalize) == null || t.call(this));
		}
	}, t;
}(nr), yr = Rn(function(e) {
	return function() {
		e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
	};
}), br = function(e) {
	k(t, e);
	function t() {
		var t = e.call(this) || this;
		return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
	}
	return t.prototype.lift = function(e) {
		var t = new xr(this, this);
		return t.operator = e, t;
	}, t.prototype._throwIfClosed = function() {
		if (this.closed) throw new yr();
	}, t.prototype.next = function(e) {
		var t = this;
		er(function() {
			var n, r;
			if (t._throwIfClosed(), !t.isStopped) {
				t.currentObservers ||= Array.from(t.observers);
				try {
					for (var i = Mn(t.currentObservers), a = i.next(); !a.done; a = i.next()) a.value.next(e);
				} catch (e) {
					n = { error: e };
				} finally {
					try {
						a && !a.done && (r = i.return) && r.call(i);
					} finally {
						if (n) throw n.error;
					}
				}
			}
		});
	}, t.prototype.error = function(e) {
		var t = this;
		er(function() {
			if (t._throwIfClosed(), !t.isStopped) {
				t.hasError = t.isStopped = !0, t.thrownError = e;
				for (var n = t.observers; n.length;) n.shift().error(e);
			}
		});
	}, t.prototype.complete = function() {
		var e = this;
		er(function() {
			if (e._throwIfClosed(), !e.isStopped) {
				e.isStopped = !0;
				for (var t = e.observers; t.length;) t.shift().complete();
			}
		});
	}, t.prototype.unsubscribe = function() {
		this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
	}, Object.defineProperty(t.prototype, "observed", {
		get: function() {
			return this.observers?.length > 0;
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._trySubscribe = function(t) {
		return this._throwIfClosed(), e.prototype._trySubscribe.call(this, t);
	}, t.prototype._subscribe = function(e) {
		return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
	}, t.prototype._innerSubscribe = function(e) {
		var t = this, n = this, r = n.hasError, i = n.isStopped, a = n.observers;
		return r || i ? Hn : (this.currentObservers = null, a.push(e), new Vn(function() {
			t.currentObservers = null, Bn(a, e);
		}));
	}, t.prototype._checkFinalizedStatuses = function(e) {
		var t = this, n = t.hasError, r = t.thrownError, i = t.isStopped;
		n ? e.error(r) : i && e.complete();
	}, t.prototype.asObservable = function() {
		var e = new j();
		return e.source = this, e;
	}, t.create = function(e, t) {
		return new xr(e, t);
	}, t;
}(j), xr = function(e) {
	k(t, e);
	function t(t, n) {
		var r = e.call(this) || this;
		return r.destination = t, r.source = n, r;
	}
	return t.prototype.next = function(e) {
		var t, n;
		(n = (t = this.destination)?.next) == null || n.call(t, e);
	}, t.prototype.error = function(e) {
		var t, n;
		(n = (t = this.destination)?.error) == null || n.call(t, e);
	}, t.prototype.complete = function() {
		var e, t;
		(t = (e = this.destination)?.complete) == null || t.call(e);
	}, t.prototype._subscribe = function(e) {
		return this.source?.subscribe(e) ?? Hn;
	}, t;
}(br), Sr = function(e) {
	k(t, e);
	function t(t) {
		var n = e.call(this) || this;
		return n._value = t, n;
	}
	return Object.defineProperty(t.prototype, "value", {
		get: function() {
			return this.getValue();
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype._subscribe = function(t) {
		var n = e.prototype._subscribe.call(this, t);
		return !n.closed && t.next(this._value), n;
	}, t.prototype.getValue = function() {
		var e = this, t = e.hasError, n = e.thrownError, r = e._value;
		if (t) throw n;
		return this._throwIfClosed(), r;
	}, t.prototype.next = function(t) {
		e.prototype.next.call(this, this._value = t);
	}, t;
}(br), Cr = {
	now: function() {
		return (Cr.delegate || Date).now();
	},
	delegate: void 0
}, wr = function(e) {
	k(t, e);
	function t(t, n, r) {
		t === void 0 && (t = Infinity), n === void 0 && (n = Infinity), r === void 0 && (r = Cr);
		var i = e.call(this) || this;
		return i._bufferSize = t, i._windowTime = n, i._timestampProvider = r, i._buffer = [], i._infiniteTimeWindow = !0, i._infiniteTimeWindow = n === Infinity, i._bufferSize = Math.max(1, t), i._windowTime = Math.max(1, n), i;
	}
	return t.prototype.next = function(t) {
		var n = this, r = n.isStopped, i = n._buffer, a = n._infiniteTimeWindow, o = n._timestampProvider, s = n._windowTime;
		r || (i.push(t), !a && i.push(o.now() + s)), this._trimBuffer(), e.prototype.next.call(this, t);
	}, t.prototype._subscribe = function(e) {
		this._throwIfClosed(), this._trimBuffer();
		for (var t = this._innerSubscribe(e), n = this, r = n._infiniteTimeWindow, i = n._buffer.slice(), a = 0; a < i.length && !e.closed; a += r ? 1 : 2) e.next(i[a]);
		return this._checkFinalizedStatuses(e), t;
	}, t.prototype._trimBuffer = function() {
		var e = this, t = e._bufferSize, n = e._timestampProvider, r = e._buffer, i = e._infiniteTimeWindow, a = (i ? 1 : 2) * t;
		if (t < Infinity && a < r.length && r.splice(0, r.length - a), !i) {
			for (var o = n.now(), s = 0, c = 1; c < r.length && r[c] <= o; c += 2) s = c;
			s && r.splice(0, s + 1);
		}
	}, t;
}(br), Tr = function(e) {
	k(t, e);
	function t(t, n) {
		return e.call(this) || this;
	}
	return t.prototype.schedule = function(e, t) {
		return t === void 0 && (t = 0), this;
	}, t;
}(Vn), Er = {
	setInterval: function(e, t) {
		var n = [...arguments].slice(2), r = Er.delegate;
		return r?.setInterval ? r.setInterval.apply(r, Pn([e, t], Nn(n))) : setInterval.apply(void 0, Pn([e, t], Nn(n)));
	},
	clearInterval: function(e) {
		return (Er.delegate?.clearInterval || clearInterval)(e);
	},
	delegate: void 0
}, Dr = function(e) {
	k(t, e);
	function t(t, n) {
		var r = e.call(this, t, n) || this;
		return r.scheduler = t, r.work = n, r.pending = !1, r;
	}
	return t.prototype.schedule = function(e, t) {
		if (t === void 0 && (t = 0), this.closed) return this;
		this.state = e;
		var n = this.id, r = this.scheduler;
		return n != null && (this.id = this.recycleAsyncId(r, n, t)), this.pending = !0, this.delay = t, this.id = this.id ?? this.requestAsyncId(r, this.id, t), this;
	}, t.prototype.requestAsyncId = function(e, t, n) {
		return n === void 0 && (n = 0), Er.setInterval(e.flush.bind(e, this), n);
	}, t.prototype.recycleAsyncId = function(e, t, n) {
		if (n === void 0 && (n = 0), n != null && this.delay === n && this.pending === !1) return t;
		t != null && Er.clearInterval(t);
	}, t.prototype.execute = function(e, t) {
		if (this.closed) return /* @__PURE__ */ Error("executing a cancelled action");
		this.pending = !1;
		var n = this._execute(e, t);
		if (n) return n;
		this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
	}, t.prototype._execute = function(e, t) {
		var n = !1, r;
		try {
			this.work(e);
		} catch (e) {
			n = !0, r = e || /* @__PURE__ */ Error("Scheduled action threw falsy error");
		}
		if (n) return this.unsubscribe(), r;
	}, t.prototype.unsubscribe = function() {
		if (!this.closed) {
			var t = this, n = t.id, r = t.scheduler, i = r.actions;
			this.work = this.state = this.scheduler = null, this.pending = !1, Bn(i, this), n != null && (this.id = this.recycleAsyncId(r, n, null)), this.delay = null, e.prototype.unsubscribe.call(this);
		}
	}, t;
}(Tr), Or = function() {
	function e(t, n) {
		n === void 0 && (n = e.now), this.schedulerActionCtor = t, this.now = n;
	}
	return e.prototype.schedule = function(e, t, n) {
		return t === void 0 && (t = 0), new this.schedulerActionCtor(this, e).schedule(n, t);
	}, e.now = Cr.now, e;
}(), kr = new (function(e) {
	k(t, e);
	function t(t, n) {
		n === void 0 && (n = Or.now);
		var r = e.call(this, t, n) || this;
		return r.actions = [], r._active = !1, r;
	}
	return t.prototype.flush = function(e) {
		var t = this.actions;
		if (this._active) {
			t.push(e);
			return;
		}
		var n;
		this._active = !0;
		do
			if (n = e.execute(e.state, e.delay)) break;
		while (e = t.shift());
		if (this._active = !1, n) {
			for (; e = t.shift();) e.unsubscribe();
			throw n;
		}
	}, t;
}(Or))(Dr), Ar = new j(function(e) {
	return e.complete();
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
function jr(e) {
	return e && A(e.schedule);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/args.js
function Mr(e) {
	return e[e.length - 1];
}
function Nr(e) {
	return jr(Mr(e)) ? e.pop() : void 0;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var Pr = (function(e) {
	return e && typeof e.length == "number" && typeof e != "function";
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function Fr(e) {
	return A(e?.then);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function Ir(e) {
	return A(e[dr]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function Lr(e) {
	return Symbol.asyncIterator && A(e?.[Symbol.asyncIterator]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function Rr(e) {
	return /* @__PURE__ */ TypeError("You provided " + (typeof e == "object" && e ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function zr() {
	return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Br = zr();
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function Vr(e) {
	return A(e?.[Br]);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function Hr(e) {
	return In(this, arguments, function() {
		var t, n, r, i;
		return jn(this, function(a) {
			switch (a.label) {
				case 0: t = e.getReader(), a.label = 1;
				case 1: a.trys.push([
					1,
					,
					9,
					10
				]), a.label = 2;
				case 2: return [4, Fn(t.read())];
				case 3: return n = a.sent(), r = n.value, i = n.done, i ? [4, Fn(void 0)] : [3, 5];
				case 4: return [2, a.sent()];
				case 5: return [4, Fn(r)];
				case 6: return [4, a.sent()];
				case 7: return a.sent(), [3, 2];
				case 8: return [3, 10];
				case 9: return t.releaseLock(), [7];
				case 10: return [2];
			}
		});
	});
}
function Ur(e) {
	return A(e?.getReader);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function P(e) {
	if (e instanceof j) return e;
	if (e != null) {
		if (Ir(e)) return Wr(e);
		if (Pr(e)) return Gr(e);
		if (Fr(e)) return Kr(e);
		if (Lr(e)) return Jr(e);
		if (Vr(e)) return qr(e);
		if (Ur(e)) return Yr(e);
	}
	throw Rr(e);
}
function Wr(e) {
	return new j(function(t) {
		var n = e[dr]();
		if (A(n.subscribe)) return n.subscribe(t);
		throw TypeError("Provided object does not correctly implement Symbol.observable");
	});
}
function Gr(e) {
	return new j(function(t) {
		for (var n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
		t.complete();
	});
}
function Kr(e) {
	return new j(function(t) {
		e.then(function(e) {
			t.closed || (t.next(e), t.complete());
		}, function(e) {
			return t.error(e);
		}).then(null, qn);
	});
}
function qr(e) {
	return new j(function(t) {
		var n, r;
		try {
			for (var i = Mn(e), a = i.next(); !a.done; a = i.next()) {
				var o = a.value;
				if (t.next(o), t.closed) return;
			}
		} catch (e) {
			n = { error: e };
		} finally {
			try {
				a && !a.done && (r = i.return) && r.call(i);
			} finally {
				if (n) throw n.error;
			}
		}
		t.complete();
	});
}
function Jr(e) {
	return new j(function(t) {
		Xr(e, t).catch(function(e) {
			return t.error(e);
		});
	});
}
function Yr(e) {
	return Jr(Hr(e));
}
function Xr(e, t) {
	var n, r, i, a;
	return An(this, void 0, void 0, function() {
		var o, s;
		return jn(this, function(c) {
			switch (c.label) {
				case 0: c.trys.push([
					0,
					5,
					6,
					11
				]), n = Ln(e), c.label = 1;
				case 1: return [4, n.next()];
				case 2:
					if (r = c.sent(), r.done) return [3, 4];
					if (o = r.value, t.next(o), t.closed) return [2];
					c.label = 3;
				case 3: return [3, 1];
				case 4: return [3, 11];
				case 5: return s = c.sent(), i = { error: s }, [3, 11];
				case 6: return c.trys.push([
					6,
					,
					9,
					10
				]), r && !r.done && (a = n.return) ? [4, a.call(n)] : [3, 8];
				case 7: c.sent(), c.label = 8;
				case 8: return [3, 10];
				case 9:
					if (i) throw i.error;
					return [7];
				case 10: return [7];
				case 11: return t.complete(), [2];
			}
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function F(e, t, n, r, i) {
	r === void 0 && (r = 0), i === void 0 && (i = !1);
	var a = t.schedule(function() {
		n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
	}, r);
	if (e.add(a), !i) return a;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function Zr(e, t) {
	return t === void 0 && (t = 0), M(function(n, r) {
		n.subscribe(N(r, function(n) {
			return F(r, e, function() {
				return r.next(n);
			}, t);
		}, function() {
			return F(r, e, function() {
				return r.complete();
			}, t);
		}, function(n) {
			return F(r, e, function() {
				return r.error(n);
			}, t);
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function Qr(e, t) {
	return t === void 0 && (t = 0), M(function(n, r) {
		r.add(e.schedule(function() {
			return n.subscribe(r);
		}, t));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function $r(e, t) {
	return P(e).pipe(Qr(t), Zr(t));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function ei(e, t) {
	return P(e).pipe(Qr(t), Zr(t));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function ti(e, t) {
	return new j(function(n) {
		var r = 0;
		return t.schedule(function() {
			r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function ni(e, t) {
	return new j(function(n) {
		var r;
		return F(n, t, function() {
			r = e[Br](), F(n, t, function() {
				var e, t, i;
				try {
					e = r.next(), t = e.value, i = e.done;
				} catch (e) {
					n.error(e);
					return;
				}
				i ? n.complete() : n.next(t);
			}, 0, !0);
		}), function() {
			return A(r?.return) && r.return();
		};
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function ri(e, t) {
	if (!e) throw Error("Iterable cannot be null");
	return new j(function(n) {
		F(n, t, function() {
			var r = e[Symbol.asyncIterator]();
			F(n, t, function() {
				r.next().then(function(e) {
					e.done ? n.complete() : n.next(e.value);
				});
			}, 0, !0);
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function ii(e, t) {
	return ri(Hr(e), t);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function ai(e, t) {
	if (e != null) {
		if (Ir(e)) return $r(e, t);
		if (Pr(e)) return ti(e, t);
		if (Fr(e)) return ei(e, t);
		if (Lr(e)) return ri(e, t);
		if (Vr(e)) return ni(e, t);
		if (Ur(e)) return ii(e, t);
	}
	throw Rr(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/from.js
function oi(e, t) {
	return t ? ai(e, t) : P(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/of.js
function si() {
	var e = [...arguments];
	return oi(e, Nr(e));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/throwError.js
function ci(e, t) {
	var n = A(e) ? e : function() {
		return e;
	}, r = function(e) {
		return e.error(n());
	};
	return new j(t ? function(e) {
		return t.schedule(r, 0, e);
	} : r);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/Notification.js
var li;
(function(e) {
	e.NEXT = "N", e.ERROR = "E", e.COMPLETE = "C";
})(li ||= {});
var ui = function() {
	function e(e, t, n) {
		this.kind = e, this.value = t, this.error = n, this.hasValue = e === "N";
	}
	return e.prototype.observe = function(e) {
		return di(this, e);
	}, e.prototype.do = function(e, t, n) {
		var r = this, i = r.kind, a = r.value, o = r.error;
		return i === "N" ? e?.(a) : i === "E" ? t?.(o) : n?.();
	}, e.prototype.accept = function(e, t, n) {
		return A(e?.next) ? this.observe(e) : this.do(e, t, n);
	}, e.prototype.toObservable = function() {
		var e = this, t = e.kind, n = e.value, r = e.error, i = t === "N" ? si(n) : t === "E" ? ci(function() {
			return r;
		}) : t === "C" ? Ar : 0;
		if (!i) throw TypeError("Unexpected notification kind " + t);
		return i;
	}, e.createNext = function(t) {
		return new e("N", t);
	}, e.createError = function(t) {
		return new e("E", void 0, t);
	}, e.createComplete = function() {
		return e.completeNotification;
	}, e.completeNotification = new e("C"), e;
}();
function di(e, t) {
	var n, r, i, a = e, o = a.kind, s = a.value, c = a.error;
	if (typeof o != "string") throw TypeError("Invalid notification, missing \"kind\"");
	o === "N" ? (n = t.next) == null || n.call(t, s) : o === "E" ? (r = t.error) == null || r.call(t, c) : (i = t.complete) == null || i.call(t);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/EmptyError.js
var fi = Rn(function(e) {
	return function() {
		e(this), this.name = "EmptyError", this.message = "no elements in sequence";
	};
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/lastValueFrom.js
function pi(e, t) {
	var n = typeof t == "object";
	return new Promise(function(r, i) {
		var a = !1, o;
		e.subscribe({
			next: function(e) {
				o = e, a = !0;
			},
			error: i,
			complete: function() {
				a ? r(o) : n ? r(t.defaultValue) : i(new fi());
			}
		});
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/isDate.js
function mi(e) {
	return e instanceof Date && !isNaN(e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/map.js
function I(e, t) {
	return M(function(n, r) {
		var i = 0;
		n.subscribe(N(r, function(n) {
			r.next(e.call(t, n, i++));
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
function hi(e, t, n, r, i, a, o, s) {
	var c = [], l = 0, u = 0, d = !1, f = function() {
		d && !c.length && !l && t.complete();
	}, p = function(e) {
		return l < r ? m(e) : c.push(e);
	}, m = function(e) {
		a && t.next(e), l++;
		var s = !1;
		P(n(e, u++)).subscribe(N(t, function(e) {
			i?.(e), a ? p(e) : t.next(e);
		}, function() {
			s = !0;
		}, void 0, function() {
			if (s) try {
				l--;
				for (var e = function() {
					var e = c.shift();
					o ? F(t, o, function() {
						return m(e);
					}) : m(e);
				}; c.length && l < r;) e();
				f();
			} catch (e) {
				t.error(e);
			}
		}));
	};
	return e.subscribe(N(t, p, function() {
		d = !0, f();
	})), function() {
		s?.();
	};
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
function gi(e, t, n) {
	return n === void 0 && (n = Infinity), A(t) ? gi(function(n, r) {
		return I(function(e, i) {
			return t(n, e, r, i);
		})(P(e(n, r)));
	}, n) : (typeof t == "number" && (n = t), M(function(t, r) {
		return hi(t, r, e, n);
	}));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
function _i(e) {
	return e === void 0 && (e = Infinity), gi(fr, e);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/concatAll.js
function vi() {
	return _i(1);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/concat.js
function yi() {
	var e = [...arguments];
	return vi()(oi(e, Nr(e)));
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/timer.js
function bi(e, t, n) {
	e === void 0 && (e = 0), n === void 0 && (n = kr);
	var r = -1;
	return t != null && (jr(t) ? n = t : r = t), new j(function(t) {
		var i = mi(e) ? +e - n.now() : e;
		i < 0 && (i = 0);
		var a = 0;
		return n.schedule(function() {
			t.closed || (t.next(a++), 0 <= r ? this.schedule(void 0, r) : t.complete());
		}, i);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/filter.js
function xi(e, t) {
	return M(function(n, r) {
		var i = 0;
		n.subscribe(N(r, function(n) {
			return e.call(t, n, i++) && r.next(n);
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/catchError.js
function Si(e) {
	return M(function(t, n) {
		var r = null, i = !1, a;
		r = t.subscribe(N(n, void 0, void 0, function(o) {
			a = P(e(o, Si(e)(t))), r ? (r.unsubscribe(), r = null, a.subscribe(n)) : i = !0;
		})), i && (r.unsubscribe(), r = null, a.subscribe(n));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js
function Ci(e, t) {
	return t === void 0 && (t = fr), e ??= wi, M(function(n, r) {
		var i, a = !0;
		n.subscribe(N(r, function(n) {
			var o = t(n);
			(a || !e(i, o)) && (a = !1, i = o, r.next(n));
		}));
	});
}
function wi(e, t) {
	return e === t;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/finalize.js
function Ti(e) {
	return M(function(t, n) {
		try {
			t.subscribe(n);
		} finally {
			n.add(e);
		}
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/materialize.js
function Ei() {
	return M(function(e, t) {
		e.subscribe(N(t, function(e) {
			t.next(ui.createNext(e));
		}, function() {
			t.next(ui.createComplete()), t.complete();
		}, function(e) {
			t.next(ui.createError(e)), t.complete();
		}));
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/share.js
function Di(e) {
	e === void 0 && (e = {});
	var t = e.connector, n = t === void 0 ? function() {
		return new br();
	} : t, r = e.resetOnError, i = r === void 0 || r, a = e.resetOnComplete, o = a === void 0 || a, s = e.resetOnRefCountZero, c = s === void 0 || s;
	return function(e) {
		var t, r, a, s = 0, l = !1, u = !1, d = function() {
			r?.unsubscribe(), r = void 0;
		}, f = function() {
			d(), t = a = void 0, l = u = !1;
		}, p = function() {
			var e = t;
			f(), e?.unsubscribe();
		};
		return M(function(e, m) {
			s++, !u && !l && d();
			var h = a ??= n();
			m.add(function() {
				s--, s === 0 && !u && !l && (r = Oi(p, c));
			}), h.subscribe(m), !t && s > 0 && (t = new or({
				next: function(e) {
					return h.next(e);
				},
				error: function(e) {
					u = !0, d(), r = Oi(f, i, e), h.error(e);
				},
				complete: function() {
					l = !0, d(), r = Oi(f, o), h.complete();
				}
			}), P(e).subscribe(t));
		})(e);
	};
}
function Oi(e, t) {
	var n = [...arguments].slice(2);
	if (t === !0) {
		e();
		return;
	}
	if (t !== !1) {
		var r = new or({ next: function() {
			r.unsubscribe(), e();
		} });
		return P(t.apply(void 0, Pn([], Nn(n)))).subscribe(r);
	}
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js
function ki(e, t, n) {
	var r, i, a, o, s = !1;
	return e && typeof e == "object" ? (r = e.bufferSize, o = r === void 0 ? Infinity : r, i = e.windowTime, t = i === void 0 ? Infinity : i, a = e.refCount, s = a !== void 0 && a, n = e.scheduler) : o = e ?? Infinity, Di({
		connector: function() {
			return new wr(o, t, n);
		},
		resetOnError: !0,
		resetOnComplete: !1,
		resetOnRefCountZero: s
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/tap.js
function Ai(e, t, n) {
	var r = A(e) || t || n ? {
		next: e,
		error: t,
		complete: n
	} : e;
	return r ? M(function(e, t) {
		var n;
		(n = r.subscribe) == null || n.call(r);
		var i = !0;
		e.subscribe(N(t, function(e) {
			var n;
			(n = r.next) == null || n.call(r, e), t.next(e);
		}, function() {
			var e;
			i = !1, (e = r.complete) == null || e.call(r), t.complete();
		}, function(e) {
			var n;
			i = !1, (n = r.error) == null || n.call(r, e), t.error(e);
		}, function() {
			var e, t;
			i && ((e = r.unsubscribe) == null || e.call(r)), (t = r.finalize) == null || t.call(r);
		}));
	}) : fr;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/globals/maybe.js
function ji(e) {
	try {
		return e();
	} catch {}
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/globals/global.js
var Mi = ji(() => globalThis) || ji(() => window) || ji(() => self) || ji(() => global) || ji(function() {
	return ji.constructor("return this")();
}), Ni = "4.2.12", Pi = /* @__PURE__ */ new Map();
function Fi(e) {
	let t = Pi.get(e) || 1;
	return Pi.set(e, t + 1), `${e}:${t}:${Math.random().toString(36).slice(2)}`;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/stringifyForDisplay.js
function Ii(e, t = 0) {
	let n = Fi("stringifyForDisplay");
	return JSON.stringify(e, (e, t) => t === void 0 ? n : t, t).split(JSON.stringify(n)).join("<undefined>");
}
//#endregion
//#region node_modules/@apollo/client/utilities/invariant/index.js
var Li = "Invariant Violation", Ri = class e extends Error {
	constructor(t = Li) {
		super(t), this.name = Li, Object.setPrototypeOf(this, e.prototype);
	}
}, zi = [
	"debug",
	"log",
	"warn",
	"error",
	"silent"
], Bi = zi.indexOf("silent");
function L(e, ...t) {
	if (!e) throw R(...t);
}
function Vi(e) {
	return function(t, ...n) {
		if (zi.indexOf(e) >= Bi) {
			let r = console[e] || console.log;
			if (typeof t == "number") {
				let e = t;
				t = Wi(e), t || (t = Gi(e, n), n = []);
			}
			r(t, ...n);
		}
	};
}
L.debug = Vi("debug"), L.log = Vi("log"), L.warn = Vi("warn"), L.error = Vi("error");
function R(e, ...t) {
	return new Ri(Wi(e, t) || Gi(e, t));
}
var Hi = Symbol.for("ApolloErrorMessageHandler_" + Ni);
function Ui(e) {
	if (typeof e == "string") return e;
	try {
		return Ii(e, 2).slice(0, 1e3);
	} catch {
		return "<non-serializable>";
	}
}
function Wi(e, t = []) {
	if (e) return Mi[Hi] && Mi[Hi](e, t.map(Ui));
}
function Gi(e, t = []) {
	if (e) return typeof e == "string" ? t.reduce((e, t) => e.replace(/%[sdfo]/, Ui(t)), e) : `An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#${encodeURIComponent(JSON.stringify({
		version: Ni,
		message: e,
		args: t.map(Ui)
	}))}`;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/valueToObjectRepresentation.js
function Ki(e, t, n, r) {
	if (n.kind === S.INT || n.kind === S.FLOAT) e[t.value] = Number(n.value);
	else if (n.kind === S.BOOLEAN || n.kind === S.STRING) e[t.value] = n.value;
	else if (n.kind === S.OBJECT) {
		let i = {};
		n.fields.map((e) => Ki(i, e.name, e.value, r)), e[t.value] = i;
	} else if (n.kind === S.VARIABLE) {
		let i = (r || {})[n.name.value];
		e[t.value] = i;
	} else if (n.kind === S.LIST) e[t.value] = n.values.map((e) => {
		let n = {};
		return Ki(n, t, e, r), n[t.value];
	});
	else if (n.kind === S.ENUM) e[t.value] = n.value;
	else if (n.kind === S.NULL) e[t.value] = null;
	else throw R(19, t.value, n.kind);
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/argumentsObjectFromField.js
function qi(e, t) {
	if (e.arguments && e.arguments.length) {
		let n = {};
		return e.arguments.forEach(({ name: e, value: r }) => Ki(n, e, r, t)), n;
	}
	return null;
}
var z = { ...Mi[Symbol.for("apollo.cacheSize")] };
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getOperationName.js
function Ji(e, t) {
	return e.definitions.find((e) => e.kind === "OperationDefinition" && !!e.name)?.name.value ?? t;
}
//#endregion
//#region node_modules/@wry/trie/lib/index.js
var Yi = () => Object.create(null), { forEach: Xi, slice: Zi } = Array.prototype, { hasOwnProperty: Qi } = Object.prototype, B = class e {
	constructor(e = !0, t = Yi) {
		this.weakness = e, this.makeData = t;
	}
	lookup() {
		return this.lookupArray(arguments);
	}
	lookupArray(e) {
		let t = this;
		return Xi.call(e, (e) => t = t.getChildTrie(e)), Qi.call(t, "data") ? t.data : t.data = this.makeData(Zi.call(e));
	}
	peek() {
		return this.peekArray(arguments);
	}
	peekArray(e) {
		let t = this;
		for (let n = 0, r = e.length; t && n < r; ++n) {
			let r = t.mapFor(e[n], !1);
			t = r && r.get(e[n]);
		}
		return t && t.data;
	}
	remove() {
		return this.removeArray(arguments);
	}
	removeArray(e) {
		let t;
		if (e.length) {
			let n = e[0], r = this.mapFor(n, !1), i = r && r.get(n);
			i && (t = i.removeArray(Zi.call(e, 1)), !i.data && !i.weak && !(i.strong && i.strong.size) && r.delete(n));
		} else t = this.data, delete this.data;
		return t;
	}
	getChildTrie(t) {
		let n = this.mapFor(t, !0), r = n.get(t);
		return r || n.set(t, r = new e(this.weakness, this.makeData)), r;
	}
	mapFor(e, t) {
		return this.weakness && $i(e) ? this.weak || (t ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (t ? this.strong = /* @__PURE__ */ new Map() : void 0);
	}
};
function $i(e) {
	switch (typeof e) {
		case "object": if (e === null) break;
		case "function": return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/@wry/caches/lib/strong.js
function ea() {}
var ta = class {
	constructor(e = Infinity, t = ea) {
		this.max = e, this.dispose = t, this.map = /* @__PURE__ */ new Map(), this.newest = null, this.oldest = null;
	}
	has(e) {
		return this.map.has(e);
	}
	get(e) {
		let t = this.getNode(e);
		return t && t.value;
	}
	get size() {
		return this.map.size;
	}
	getNode(e) {
		let t = this.map.get(e);
		if (t && t !== this.newest) {
			let { older: e, newer: n } = t;
			n && (n.older = e), e && (e.newer = n), t.older = this.newest, t.older.newer = t, t.newer = null, this.newest = t, t === this.oldest && (this.oldest = n);
		}
		return t;
	}
	set(e, t) {
		let n = this.getNode(e);
		return n ? n.value = t : (n = {
			key: e,
			value: t,
			newer: null,
			older: this.newest
		}, this.newest && (this.newest.newer = n), this.newest = n, this.oldest = this.oldest || n, this.map.set(e, n), n.value);
	}
	clean() {
		for (; this.oldest && this.map.size > this.max;) this.delete(this.oldest.key);
	}
	delete(e) {
		let t = this.map.get(e);
		return t ? (t === this.newest && (this.newest = t.older), t === this.oldest && (this.oldest = t.newer), t.newer && (t.newer.older = t.older), t.older && (t.older.newer = t.newer), this.map.delete(e), this.dispose(t.value, e), !0) : !1;
	}
};
//#endregion
//#region node_modules/@wry/caches/lib/weak.js
function na() {}
var ra = na, ia = typeof WeakRef < "u" ? WeakRef : function(e) {
	return { deref: () => e };
}, aa = typeof WeakMap < "u" ? WeakMap : Map, oa = typeof FinalizationRegistry < "u" ? FinalizationRegistry : function() {
	return {
		register: na,
		unregister: na
	};
}, sa = 10024, ca = class {
	constructor(e = Infinity, t = ra) {
		this.max = e, this.dispose = t, this.map = new aa(), this.newest = null, this.oldest = null, this.unfinalizedNodes = /* @__PURE__ */ new Set(), this.finalizationScheduled = !1, this.size = 0, this.finalize = () => {
			let e = this.unfinalizedNodes.values();
			for (let t = 0; t < sa; t++) {
				let t = e.next().value;
				if (!t) break;
				this.unfinalizedNodes.delete(t);
				let n = t.key;
				delete t.key, t.keyRef = new ia(n), this.registry.register(n, t, t);
			}
			this.unfinalizedNodes.size > 0 ? queueMicrotask(this.finalize) : this.finalizationScheduled = !1;
		}, this.registry = new oa(this.deleteNode.bind(this));
	}
	has(e) {
		return this.map.has(e);
	}
	get(e) {
		let t = this.getNode(e);
		return t && t.value;
	}
	getNode(e) {
		let t = this.map.get(e);
		if (t && t !== this.newest) {
			let { older: e, newer: n } = t;
			n && (n.older = e), e && (e.newer = n), t.older = this.newest, t.older.newer = t, t.newer = null, this.newest = t, t === this.oldest && (this.oldest = n);
		}
		return t;
	}
	set(e, t) {
		let n = this.getNode(e);
		return n ? n.value = t : (n = {
			key: e,
			value: t,
			newer: null,
			older: this.newest
		}, this.newest && (this.newest.newer = n), this.newest = n, this.oldest = this.oldest || n, this.scheduleFinalization(n), this.map.set(e, n), this.size++, n.value);
	}
	clean() {
		for (; this.oldest && this.size > this.max;) this.deleteNode(this.oldest);
	}
	deleteNode(e) {
		e === this.newest && (this.newest = e.older), e === this.oldest && (this.oldest = e.newer), e.newer && (e.newer.older = e.older), e.older && (e.older.newer = e.newer), this.size--;
		let t = e.key || e.keyRef && e.keyRef.deref();
		this.dispose(e.value, t), e.keyRef ? this.registry.unregister(e) : this.unfinalizedNodes.delete(e), t && this.map.delete(t);
	}
	delete(e) {
		let t = this.map.get(e);
		return t ? (this.deleteNode(t), !0) : !1;
	}
	scheduleFinalization(e) {
		this.unfinalizedNodes.add(e), this.finalizationScheduled || (this.finalizationScheduled = !0, queueMicrotask(this.finalize));
	}
}, la = /* @__PURE__ */ new WeakSet();
function ua(e) {
	e.size <= (e.max || -1) || la.has(e) || (la.add(e), setTimeout(() => {
		e.clean(), la.delete(e);
	}, 100));
}
var da = function(e, t) {
	let n = new ca(e, t);
	return n.set = function(e, t) {
		let n = ca.prototype.set.call(this, e, t);
		return ua(this), n;
	}, n;
}, fa = function(e, t) {
	let n = new ta(e, t);
	return n.set = function(e, t) {
		let n = ta.prototype.set.call(this, e, t);
		return ua(this), n;
	}, n;
};
//#endregion
//#region node_modules/@apollo/client/utilities/internal/memoize.js
function pa(e, { max: t, makeCacheKey: n = (e) => e }) {
	let r = new B(!0), i = new da(t);
	return (...t) => {
		let a = r.lookupArray(n(t)), o = i.get(a);
		if (o) {
			if (o.error) throw o.error;
			return o.result;
		}
		let s = i.set(a, {});
		try {
			return s.result = e(...t);
		} catch (e) {
			throw s.error = e, e;
		}
	};
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/checkDocument.js
var ma = pa((e, t) => {
	L(e && e.kind === "Document", 1);
	let n = e.definitions.filter((e) => e.kind === "OperationDefinition");
	t && L(n.length == 1 && n[0].operation === t, 4, t, t, n[0].operation), T(e, { Field(t, r, i, a) {
		if (t.alias && (t.alias.value === "__typename" || t.alias.value.startsWith("__ac_")) && t.alias.value !== t.name.value) {
			let r = e, i = [];
			for (let e of a) r = r[e], r.kind === S.FIELD && i.push(r.alias?.value || r.name.value);
			throw i.splice(-1, 1, t.name.value), R(5, t.alias.value, i.join("."), n[0].operation, Ji(e, "(anonymous)"));
		}
	} });
}, { max: z.checkDocument || 2e3 }), { toString: ha } = Object.prototype;
//#endregion
//#region node_modules/@apollo/client/utilities/internal/combineLatestBatched.js
function ga(e) {
	return e.length === 0 ? Ar : new j((t) => {
		let { length: n } = e, r = Array(n), i = /* @__PURE__ */ new Map();
		e.forEach((e, t) => {
			i.has(e) || i.set(e, /* @__PURE__ */ new Set()), i.get(e).add(t);
		});
		let a = i.size, o = i.size, s;
		i.forEach((n, i) => {
			let c = !1, l = i.subscribe({
				next: (a) => {
					n.forEach((e) => r[e] = a), c || (c = !0, o--), o || (s ||= new Set(e.filter((e) => e.dirty)), s.delete(i), s.size || (t.next(r.slice()), s = void 0));
				},
				complete: () => {
					a--, a || t.complete();
				},
				error: t.error.bind(t)
			});
			t.add(l);
		});
	});
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/compact.js
function V(...e) {
	let t = {};
	return e.forEach((e) => {
		e && Reflect.ownKeys(e).forEach((n) => {
			let r = e[n];
			r !== void 0 && (t[n] = r);
		});
	}), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/createFragmentMap.js
function _a(e = []) {
	let t = {};
	return e.forEach((e) => {
		t[e.name.value] = e;
	}), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/isNonNullObject.js
function H(e) {
	return typeof e == "object" && !!e;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/DeepMerger.js
var { hasOwnProperty: va } = Object.prototype, ya = function(e, t, n) {
	return this.merge(e[n], t[n]);
}, ba = (e) => isNaN(+e) ? {} : [], xa = class {
	options;
	reconciler;
	constructor(e = {}) {
		this.options = e, this.reconciler = e.reconciler || ya;
	}
	merge(e, t, n = {}) {
		let r = n.atPath;
		if (r?.length) {
			let [i, ...a] = r;
			e === void 0 && (e = ba(i));
			let o = e[i];
			o === void 0 && a.length && (o = ba(a[0]));
			let s = this.merge(o, t, {
				...n,
				atPath: a
			});
			return o !== s && (e = this.shallowCopyForMerge(e), e[i] = s), e;
		}
		return Array.isArray(e) && Array.isArray(t) && this.options.arrayMerge === "truncate" && e.length > t.length && (e = e.slice(0, t.length), this.pastCopies.add(e)), H(t) && H(e) ? (Object.keys(t).forEach((n) => {
			if (va.call(e, n)) {
				let r = e[n];
				if (t[n] !== r) {
					let i = this.reconciler(e, t, n);
					i !== r && (e = this.shallowCopyForMerge(e), e[n] = i);
				}
			} else e = this.shallowCopyForMerge(e), e[n] = t[n];
		}), e) : t;
	}
	isObject = H;
	pastCopies = /* @__PURE__ */ new Set();
	shallowCopyForMerge(e) {
		return H(e) && (this.pastCopies.has(e) || (e = Array.isArray(e) ? e.slice(0) : {
			__proto__: Object.getPrototypeOf(e),
			...e
		}, this.pastCopies.add(e))), e;
	}
};
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getDefaultValues.js
function Sa(e) {
	let t = {}, n = e && e.variableDefinitions;
	return n && n.length && n.forEach((e) => {
		e.defaultValue && Ki(t, e.variable.name, e.defaultValue);
	}), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getFragmentFromSelection.js
function Ca(e, t) {
	switch (e.kind) {
		case "InlineFragment": return e;
		case "FragmentSpread": {
			let n = e.name.value;
			if (typeof t == "function") return t(n);
			let r = t && t[n];
			return L(r, 9, n), r || null;
		}
		default: return null;
	}
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getFragmentQueryDocument.js
function wa(e, t) {
	let n = t, r = [];
	return e.definitions.forEach((e) => {
		if (e.kind === "OperationDefinition") throw R(10, e.operation, e.name ? ` named '${e.name.value}'` : "");
		e.kind === "FragmentDefinition" && r.push(e);
	}), n === void 0 && (L(r.length === 1, 11, r.length), n = r[0].name.value), {
		...e,
		definitions: [{
			kind: "OperationDefinition",
			operation: "query",
			selectionSet: {
				kind: "SelectionSet",
				selections: [{
					kind: "FragmentSpread",
					name: {
						kind: "Name",
						value: n
					}
				}]
			}
		}, ...e.definitions]
	};
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getFragmentDefinition.js
function Ta(e) {
	L(e.kind === "Document", 6), L(e.definitions.length <= 1, 7);
	let t = e.definitions[0];
	return L(t.kind === "FragmentDefinition", 8), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getFragmentDefinitions.js
function Ea(e) {
	return e.definitions.filter((e) => e.kind === "FragmentDefinition");
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getMainDefinition.js
function Da(e) {
	ma(e);
	let t;
	for (let n of e.definitions) {
		if (n.kind === "OperationDefinition") return n;
		n.kind === "FragmentDefinition" && !t && (t = n);
	}
	if (t) return t;
	throw R(12);
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getOperationDefinition.js
function U(e) {
	return ma(e), e.definitions.filter((e) => e.kind === "OperationDefinition")[0];
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getQueryDefinition.js
function Oa(e) {
	let t = U(e);
	return L(t && t.operation === "query", 13), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getMemoryInternals.js
var W = Object.assign(function(e) {
	return JSON.stringify(e, Aa);
}, { reset() {
	ka = new fa(z.canonicalStringify || 1e3);
} }), ka;
W.reset();
function Aa(e, t) {
	if (t && typeof t == "object") {
		let e = Object.getPrototypeOf(t);
		if (e === Object.prototype || e === null) {
			let n = Object.keys(t);
			if (n.every(ja)) return t;
			let r = JSON.stringify(n), i = ka.get(r);
			if (!i) {
				n.sort();
				let e = JSON.stringify(n);
				i = ka.get(e) || n, ka.set(r, i), ka.set(e, i);
			}
			let a = Object.create(e);
			return i.forEach((e) => {
				a[e] = t[e];
			}), a;
		}
	}
	return t;
}
function ja(e, t, n) {
	return t === 0 || n[t - 1] <= e;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/getStoreKeyName.js
var Ma = [
	"connection",
	"include",
	"skip",
	"client",
	"rest",
	"export",
	"nonreactive",
	"stream"
], Na = W, Pa = Object.assign(function(e, t, n) {
	if (t && n && n.connection && n.connection.key) {
		if (n.connection.filter && n.connection.filter.length > 0) {
			let e = n.connection.filter ? n.connection.filter : [];
			e.sort();
			let r = {};
			e.forEach((e) => {
				r[e] = t[e];
			});
			let i = Na(r);
			if (i !== "{}") return `${n.connection.key}(${i})`;
		}
		return n.connection.key;
	}
	let r = e;
	if (t) {
		let e = Na(t);
		e !== "{}" && (r += `(${e})`);
	}
	return n && Object.keys(n).forEach((e) => {
		Ma.indexOf(e) === -1 && (n[e] && Object.keys(n[e]).length ? r += `@${e}(${Na(n[e])})` : r += `@${e}`);
	}), r;
}, { setStringify(e) {
	let t = Na;
	return Na = e, t;
} });
//#endregion
//#region node_modules/@apollo/client/utilities/internal/graphQLResultHasError.js
function Fa(e) {
	return !!e.errors?.length;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/hasDirectives.js
function Ia(e, t, n) {
	let r = new Set(e), i = r.size;
	return T(t, { Directive(e) {
		if (r.delete(e.name.value) && (!n || !r.size)) return xn;
	} }), n ? !r.size : r.size < i;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/hasForcedResolvers.js
function La(e) {
	let t = !1;
	return T(e, { Directive: { enter(e) {
		if (e.name.value === "client" && e.arguments && (t = e.arguments.some((e) => e.name.value === "always" && e.value.kind === "BooleanValue" && e.value.value === !0), t)) return xn;
	} } }), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/isArray.js
var G = Array.isArray;
//#endregion
//#region node_modules/@apollo/client/utilities/internal/isDocumentNode.js
function Ra(e) {
	return H(e) && e.kind === "Document" && Array.isArray(e.definitions);
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/isField.js
function za(e) {
	return e.kind === "Field";
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/isNonEmptyArray.js
function Ba(e) {
	return Array.isArray(e) && e.length > 0;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/makeReference.js
function Va(e) {
	return { __ref: String(e) };
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/maybeDeepFreeze.js
function Ha(e) {
	return e;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/mergeDeepArray.js
function Ua(e) {
	let t = e[0] || {}, n = e.length;
	if (n > 1) {
		let r = new xa();
		for (let i = 1; i < n; ++i) t = r.merge(t, e[i]);
	}
	return t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/mergeOptions.js
function Wa(e, t) {
	return V(e, t, t.variables && { variables: V({
		...e && e.variables,
		...t.variables
	}) });
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/preventUnhandledRejection.js
function Ga(e) {
	return e.catch(() => {}), e;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/removeDirectivesFromDocument.js
function Ka(e, t) {
	ma(t);
	let n = qa(""), r = qa(""), i = (e) => {
		for (let t = 0, i; t < e.length && (i = e[t]); ++t) if (!G(i)) {
			if (i.kind === S.OPERATION_DEFINITION) return n(i.name && i.name.value);
			if (i.kind === S.FRAGMENT_DEFINITION) return r(i.name.value);
		}
		return L.error(14), null;
	}, a = 0;
	for (let e = t.definitions.length - 1; e >= 0; --e) t.definitions[e].kind === S.OPERATION_DEFINITION && ++a;
	let o = Ja(e), s = (e) => Ba(e) && e.map(o).some((e) => e && e.remove), c = /* @__PURE__ */ new Map(), l = !1, u = { enter(e) {
		if (s(e.directives)) return l = !0, null;
	} }, d = T(t, {
		Field: u,
		InlineFragment: u,
		VariableDefinition: { enter() {
			return !1;
		} },
		Variable: { enter(e, t, n, r, a) {
			let o = i(a);
			o && o.variables.add(e.name.value);
		} },
		FragmentSpread: { enter(e, t, n, r, a) {
			if (s(e.directives)) return l = !0, null;
			let o = i(a);
			o && o.fragmentSpreads.add(e.name.value);
		} },
		FragmentDefinition: {
			enter(e, t, n, r) {
				c.set(JSON.stringify(r), e);
			},
			leave(e, t, n, i) {
				if (e === c.get(JSON.stringify(i))) return e;
				if (a > 0 && e.selectionSet.selections.every((e) => e.kind === S.FIELD && e.name.value === "__typename")) return r(e.name.value).removed = !0, l = !0, null;
			}
		},
		Directive: { leave(e) {
			if (o(e)) return l = !0, null;
		} }
	});
	if (!l) return t;
	let f = (e) => (e.transitiveVars || (e.transitiveVars = new Set(e.variables), e.removed || e.fragmentSpreads.forEach((t) => {
		f(r(t)).transitiveVars.forEach((t) => {
			e.transitiveVars.add(t);
		});
	})), e), p = /* @__PURE__ */ new Set();
	d.definitions.forEach((e) => {
		e.kind === S.OPERATION_DEFINITION ? f(n(e.name && e.name.value)).fragmentSpreads.forEach((e) => {
			p.add(e);
		}) : e.kind === S.FRAGMENT_DEFINITION && a === 0 && !r(e.name.value).removed && p.add(e.name.value);
	}), p.forEach((e) => {
		f(r(e)).fragmentSpreads.forEach((e) => {
			p.add(e);
		});
	});
	let m = (e) => !!(!p.has(e) || r(e).removed), h = { enter(e) {
		if (m(e.name.value)) return null;
	} };
	return Xa(T(d, {
		FragmentSpread: h,
		FragmentDefinition: h,
		OperationDefinition: { leave(e) {
			if (e.variableDefinitions) {
				let t = f(n(e.name && e.name.value)).transitiveVars;
				if (t.size < e.variableDefinitions.length) return {
					...e,
					variableDefinitions: e.variableDefinitions.filter((e) => t.has(e.variable.name.value))
				};
			}
		} }
	}));
}
function qa(e) {
	let t = /* @__PURE__ */ new Map();
	return function(n = e) {
		let r = t.get(n);
		return r || t.set(n, r = {
			variables: /* @__PURE__ */ new Set(),
			fragmentSpreads: /* @__PURE__ */ new Set()
		}), r;
	};
}
function Ja(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		e && (e.name ? t.set(e.name, e) : e.test && n.set(e.test, e));
	}), (e) => {
		let r = t.get(e.name.value);
		return !r && n.size && n.forEach((t, n) => {
			n(e) && (r = t);
		}), r;
	};
}
function Ya(e, t) {
	return !e || e.selectionSet.selections.every((e) => e.kind === S.FRAGMENT_SPREAD && Ya(t[e.name.value], t));
}
function Xa(e) {
	return Ya(U(e) || Ta(e), _a(Ea(e))) ? null : e;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/removeFragmentSpreads.js
function Za(e) {
	return T(e, { FragmentSpread(e) {
		if (!e.directives?.some(({ name: e }) => e.value === "unmask")) return null;
	} });
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/resultKeyNameFromField.js
function Qa(e) {
	return e.alias ? e.alias.value : e.name.value;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/shouldInclude.js
function $a({ directives: e }, t) {
	return !e || !e.length || to(e).every(({ directive: e, ifArgument: n }) => {
		let r = !1;
		return n.value.kind === "Variable" ? (r = t && t[n.value.name.value], L(r !== void 0, 15, e.name.value)) : r = n.value.value, e.name.value === "skip" ? !r : r;
	});
}
function eo({ name: { value: e } }) {
	return e === "skip" || e === "include";
}
function to(e) {
	let t = [];
	return e && e.length && e.forEach((e) => {
		if (!eo(e)) return;
		let n = e.arguments, r = e.name.value;
		L(n && n.length === 1, 16, r);
		let i = n[0];
		L(i.name && i.name.value === "if", 17, r);
		let a = i.value;
		L(a && (a.kind === "Variable" || a.kind === "BooleanValue"), 18, r), t.push({
			directive: e,
			ifArgument: i
		});
	}), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/storeKeyNameFromField.js
function no(e, t) {
	let n = null;
	e.directives && (n = {}, e.directives.forEach((e) => {
		n[e.name.value] = {}, e.arguments && e.arguments.forEach(({ name: r, value: i }) => Ki(n[e.name.value], r, i, t));
	}));
	let r = null;
	return e.arguments && e.arguments.length && (r = {}, e.arguments.forEach(({ name: e, value: n }) => Ki(r, e, n, t))), Pa(e.name.value, r, n);
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/toQueryResult.js
function ro(e) {
	let t = { data: e.data };
	return e.error && (t.error = e.error), t;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/filterMap.js
function io(e, t = () => void 0) {
	return (n) => new j((r) => {
		let i = t();
		return n.subscribe({
			next(t) {
				let n;
				try {
					n = e(t, i);
				} catch (e) {
					r.error(e);
				}
				n !== void 0 && r.next(n);
			},
			error(e) {
				r.error(e);
			},
			complete() {
				r.complete();
			}
		});
	});
}
//#endregion
//#region node_modules/@wry/equality/lib/index.js
var { toString: ao, hasOwnProperty: oo } = Object.prototype, so = Function.prototype.toString, co = /* @__PURE__ */ new Map();
function K(e, t) {
	try {
		return lo(e, t);
	} finally {
		co.clear();
	}
}
function lo(e, t) {
	if (e === t) return !0;
	let n = ao.call(e);
	if (n !== ao.call(t)) return !1;
	switch (n) {
		case "[object Array]": if (e.length !== t.length) return !1;
		case "[object Object]": {
			if (ho(e, t)) return !0;
			let n = uo(e), r = uo(t), i = n.length;
			if (i !== r.length) return !1;
			for (let e = 0; e < i; ++e) if (!oo.call(t, n[e])) return !1;
			for (let r = 0; r < i; ++r) {
				let i = n[r];
				if (!lo(e[i], t[i])) return !1;
			}
			return !0;
		}
		case "[object Error]": return e.name === t.name && e.message === t.message;
		case "[object Number]": if (e !== e) return t !== t;
		case "[object Boolean]":
		case "[object Date]": return +e == +t;
		case "[object RegExp]":
		case "[object String]": return e == `${t}`;
		case "[object Map]":
		case "[object Set]": {
			if (e.size !== t.size) return !1;
			if (ho(e, t)) return !0;
			let r = e.entries(), i = n === "[object Map]";
			for (;;) {
				let e = r.next();
				if (e.done) break;
				let [n, a] = e.value;
				if (!t.has(n) || i && !lo(a, t.get(n))) return !1;
			}
			return !0;
		}
		case "[object Uint16Array]":
		case "[object Uint8Array]":
		case "[object Uint32Array]":
		case "[object Int32Array]":
		case "[object Int8Array]":
		case "[object Int16Array]":
		case "[object ArrayBuffer]": e = new Uint8Array(e), t = new Uint8Array(t);
		case "[object DataView]": {
			let n = e.byteLength;
			if (n === t.byteLength) for (; n-- && e[n] === t[n];);
			return n === -1;
		}
		case "[object AsyncFunction]":
		case "[object GeneratorFunction]":
		case "[object AsyncGeneratorFunction]":
		case "[object Function]": {
			let n = so.call(e);
			return n === so.call(t) && !mo(n, po);
		}
	}
	return !1;
}
function uo(e) {
	return Object.keys(e).filter(fo, e);
}
function fo(e) {
	return this[e] !== void 0;
}
var po = "{ [native code] }";
function mo(e, t) {
	let n = e.length - t.length;
	return n >= 0 && e.indexOf(t, n) === n;
}
function ho(e, t) {
	let n = co.get(e);
	if (n) {
		if (n.has(t)) return !0;
	} else co.set(e, n = /* @__PURE__ */ new Set());
	return n.add(t), !1;
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/equalByQuery.js
function go(e, { data: t, ...n }, { data: r, ...i }, a) {
	return K(n, i) && _o(Da(e).selectionSet, t, r, {
		fragmentMap: _a(Ea(e)),
		variables: a
	});
}
function _o(e, t, n, r) {
	if (t === n) return !0;
	let i = /* @__PURE__ */ new Set();
	return e.selections.every((e) => {
		if (i.has(e) || (i.add(e), !$a(e, r.variables)) || vo(e)) return !0;
		if (za(e)) {
			let i = Qa(e), a = t && t[i], o = n && n[i], s = e.selectionSet;
			if (!s) return K(a, o);
			let c = Array.isArray(a), l = Array.isArray(o);
			if (c !== l) return !1;
			if (c && l) {
				let e = a.length;
				if (o.length !== e) return !1;
				for (let t = 0; t < e; ++t) if (!_o(s, a[t], o[t], r)) return !1;
				return !0;
			}
			return _o(s, a, o, r);
		}
		{
			let i = Ca(e, r.fragmentMap);
			if (i) return vo(i) ? !0 : _o(i.selectionSet, t, n, r);
		}
	});
}
function vo(e) {
	return !!e.directives && e.directives.some(yo);
}
function yo(e) {
	return e.name.value === "nonreactive";
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/mapObservableFragment.js
function bo(e, t) {
	let n, r;
	function i(e) {
		return e !== n && (n = e, r = t(n)), r;
	}
	return Object.assign(e.pipe(I(i), ki({
		bufferSize: 1,
		refCount: !0
	})), { getCurrentResult: () => i(e.getCurrentResult()) });
}
var xo = pa(function(e, t, n) {
	return bo(e, n);
}, {
	max: 1,
	makeCacheKey: (e) => e.slice(0, 2)
}), So = Symbol.for("apollo.result.extensions"), Co = Symbol.for("apollo.result.streamInfo"), wo = Symbol.for("apollo.observableQuery.variablesUnknown"), q = null, To = {}, Eo = 1, Do = () => class {
	constructor() {
		this.id = [
			"slot",
			Eo++,
			Date.now(),
			Math.random().toString(36).slice(2)
		].join(":");
	}
	hasValue() {
		for (let e = q; e; e = e.parent) if (this.id in e.slots) {
			let t = e.slots[this.id];
			if (t === To) break;
			return e !== q && (q.slots[this.id] = t), !0;
		}
		return q && (q.slots[this.id] = To), !1;
	}
	getValue() {
		if (this.hasValue()) return q.slots[this.id];
	}
	withValue(e, t, n, r) {
		let i = {
			__proto__: null,
			[this.id]: e
		}, a = q;
		q = {
			parent: a,
			slots: i
		};
		try {
			return t.apply(r, n);
		} finally {
			q = a;
		}
	}
	static bind(e) {
		let t = q;
		return function() {
			let n = q;
			try {
				return q = t, e.apply(this, arguments);
			} finally {
				q = n;
			}
		};
	}
	static noContext(e, t, n) {
		if (q) {
			let r = q;
			try {
				return q = null, e.apply(n, t);
			} finally {
				q = r;
			}
		} else return e.apply(n, t);
	}
};
function Oo(e) {
	try {
		return e();
	} catch {}
}
var ko = "@wry/context:Slot", Ao = Oo(() => globalThis) || Oo(() => global) || Object.create(null), jo = Ao[ko] || Array[ko] || (function(e) {
	try {
		Object.defineProperty(Ao, ko, {
			value: e,
			enumerable: !1,
			writable: !1,
			configurable: !0
		});
	} finally {
		return e;
	}
})(Do()), { bind: Mo, noContext: No } = jo, Po = new jo(), { hasOwnProperty: Fo } = Object.prototype, Io = Array.from || function(e) {
	let t = [];
	return e.forEach((e) => t.push(e)), t;
};
function Lo(e) {
	let { unsubscribe: t } = e;
	typeof t == "function" && (e.unsubscribe = void 0, t());
}
//#endregion
//#region node_modules/optimism/lib/entry.js
var Ro = [], zo = 100;
function Bo(e, t) {
	if (!e) throw Error(t || "assertion failure");
}
function Vo(e, t) {
	let n = e.length;
	return n > 0 && n === t.length && e[n - 1] === t[n - 1];
}
function Ho(e) {
	switch (e.length) {
		case 0: throw Error("unknown value");
		case 1: return e[0];
		case 2: throw e[1];
	}
}
function Uo(e) {
	return e.slice(0);
}
var Wo = class e {
	constructor(t) {
		this.fn = t, this.parents = /* @__PURE__ */ new Set(), this.childValues = /* @__PURE__ */ new Map(), this.dirtyChildren = null, this.dirty = !0, this.recomputing = !1, this.value = [], this.deps = null, ++e.count;
	}
	peek() {
		if (this.value.length === 1 && !Jo(this)) return Go(this), this.value[0];
	}
	recompute(e) {
		return Bo(!this.recomputing, "already recomputing"), Go(this), Jo(this) ? Ko(this, e) : Ho(this.value);
	}
	setDirty() {
		this.dirty || (this.dirty = !0, Xo(this), Lo(this));
	}
	dispose() {
		this.setDirty(), ns(this), Qo(this, (e, t) => {
			e.setDirty(), rs(e, this);
		});
	}
	forget() {
		this.dispose();
	}
	dependOn(e) {
		e.add(this), this.deps ||= Ro.pop() || /* @__PURE__ */ new Set(), this.deps.add(e);
	}
	forgetDeps() {
		this.deps &&= (Io(this.deps).forEach((e) => e.delete(this)), this.deps.clear(), Ro.push(this.deps), null);
	}
};
Wo.count = 0;
function Go(e) {
	let t = Po.getValue();
	if (t) return e.parents.add(t), t.childValues.has(e) || t.childValues.set(e, []), Jo(e) ? $o(t, e) : es(t, e), t;
}
function Ko(e, t) {
	return ns(e), Po.withValue(e, qo, [e, t]), is(e, t) && Yo(e), Ho(e.value);
}
function qo(e, t) {
	e.recomputing = !0;
	let { normalizeResult: n } = e, r;
	n && e.value.length === 1 && (r = Uo(e.value)), e.value.length = 0;
	try {
		if (e.value[0] = e.fn.apply(null, t), n && r && !Vo(r, e.value)) try {
			e.value[0] = n(e.value[0], r[0]);
		} catch {}
	} catch (t) {
		e.value[1] = t;
	}
	e.recomputing = !1;
}
function Jo(e) {
	return e.dirty || !!(e.dirtyChildren && e.dirtyChildren.size);
}
function Yo(e) {
	e.dirty = !1, !Jo(e) && Zo(e);
}
function Xo(e) {
	Qo(e, $o);
}
function Zo(e) {
	Qo(e, es);
}
function Qo(e, t) {
	let n = e.parents.size;
	if (n) {
		let r = Io(e.parents);
		for (let i = 0; i < n; ++i) t(r[i], e);
	}
}
function $o(e, t) {
	Bo(e.childValues.has(t)), Bo(Jo(t));
	let n = !Jo(e);
	if (!e.dirtyChildren) e.dirtyChildren = Ro.pop() || /* @__PURE__ */ new Set();
	else if (e.dirtyChildren.has(t)) return;
	e.dirtyChildren.add(t), n && Xo(e);
}
function es(e, t) {
	Bo(e.childValues.has(t)), Bo(!Jo(t));
	let n = e.childValues.get(t);
	n.length === 0 ? e.childValues.set(t, Uo(t.value)) : Vo(n, t.value) || e.setDirty(), ts(e, t), !Jo(e) && Zo(e);
}
function ts(e, t) {
	let n = e.dirtyChildren;
	n && (n.delete(t), n.size === 0 && (Ro.length < zo && Ro.push(n), e.dirtyChildren = null));
}
function ns(e) {
	e.childValues.size > 0 && e.childValues.forEach((t, n) => {
		rs(e, n);
	}), e.forgetDeps(), Bo(e.dirtyChildren === null);
}
function rs(e, t) {
	t.parents.delete(e), e.childValues.delete(t), ts(e, t);
}
function is(e, t) {
	if (typeof e.subscribe == "function") try {
		Lo(e), e.unsubscribe = e.subscribe.apply(null, t);
	} catch {
		return e.setDirty(), !1;
	}
	return !0;
}
//#endregion
//#region node_modules/optimism/lib/dep.js
var as = {
	setDirty: !0,
	dispose: !0,
	forget: !0
};
function os(e) {
	let t = /* @__PURE__ */ new Map(), n = e && e.subscribe;
	function r(e) {
		let r = Po.getValue();
		if (r) {
			let i = t.get(e);
			i || t.set(e, i = /* @__PURE__ */ new Set()), r.dependOn(i), typeof n == "function" && (Lo(i), i.unsubscribe = n(e));
		}
	}
	return r.dirty = function(e, n) {
		let r = t.get(e);
		if (r) {
			let i = n && Fo.call(as, n) ? n : "setDirty";
			Io(r).forEach((e) => e[i]()), t.delete(e), Lo(r);
		}
	}, r;
}
//#endregion
//#region node_modules/optimism/lib/index.js
var ss;
function cs(...e) {
	return (ss ||= new B(typeof WeakMap == "function")).lookupArray(e);
}
var ls = /* @__PURE__ */ new Set();
function us(e, { max: t = 2 ** 16, keyArgs: n, makeCacheKey: r = cs, normalizeResult: i, subscribe: a, cache: o = ta } = Object.create(null)) {
	let s = typeof o == "function" ? new o(t, (e) => e.dispose()) : o, c = function() {
		let t = r.apply(null, n ? n.apply(null, arguments) : arguments);
		if (t === void 0) return e.apply(null, arguments);
		let o = s.get(t);
		o || (s.set(t, o = new Wo(e)), o.normalizeResult = i, o.subscribe = a, o.forget = () => s.delete(t));
		let c = o.recompute(Array.prototype.slice.call(arguments));
		return s.set(t, o), ls.add(s), Po.hasValue() || (ls.forEach((e) => e.clean()), ls.clear()), c;
	};
	Object.defineProperty(c, "size", {
		get: () => s.size,
		configurable: !1,
		enumerable: !1
	}), Object.freeze(c.options = {
		max: t,
		keyArgs: n,
		makeCacheKey: r,
		normalizeResult: i,
		subscribe: a,
		cache: s
	});
	function l(e) {
		let t = e && s.get(e);
		t && t.setDirty();
	}
	c.dirtyKey = l, c.dirty = function() {
		l(r.apply(null, arguments));
	};
	function u(e) {
		let t = e && s.get(e);
		if (t) return t.peek();
	}
	c.peekKey = u, c.peek = function() {
		return u(r.apply(null, arguments));
	};
	function d(e) {
		return e ? s.delete(e) : !1;
	}
	return c.forgetKey = d, c.forget = function() {
		return d(r.apply(null, arguments));
	}, c.makeCacheKey = r, c.getKey = n ? function() {
		return r.apply(null, n.apply(null, arguments));
	} : r, Object.freeze(c);
}
//#endregion
//#region node_modules/@apollo/client/utilities/internal/bindCacheKey.js
function ds(...e) {
	return cs.bind(null, ...e);
}
var fs = class {
	isIncrementalResult(e) {
		return !1;
	}
	prepareRequest(e) {
		return L(!Ia(["defer", "stream"], e.query), 67), e;
	}
	extractErrors() {}
	startRequest = void 0;
};
//#endregion
//#region node_modules/@apollo/client/link/utils/createOperation.js
function ps(e, { client: t }) {
	let n = {
		query: e.query,
		variables: e.variables || {},
		extensions: e.extensions || {},
		operationName: Ji(e.query),
		operationType: U(e.query).operation
	}, r = { ...e.context }, i = (e) => {
		r = typeof e == "function" ? {
			...r,
			...e(a())
		} : {
			...r,
			...e
		};
	}, a = () => Object.freeze({ ...r });
	return Object.defineProperty(n, "setContext", {
		enumerable: !1,
		value: i
	}), Object.defineProperty(n, "getContext", {
		enumerable: !1,
		value: a
	}), Object.defineProperty(n, "client", {
		enumerable: !1,
		value: t
	}), n;
}
//#endregion
//#region node_modules/@apollo/client/link/utils/filterOperationVariables.js
function ms(e, t) {
	let n = { ...e }, r = new Set(Object.keys(e));
	return T(t, { Variable(e, t, n) {
		n && n.kind !== "VariableDefinition" && r.delete(e.name.value);
	} }), r.forEach((e) => {
		delete n[e];
	}), n;
}
//#endregion
//#region node_modules/@apollo/client/link/core/ApolloLink.js
var hs = class e {
	static empty() {
		return new e(() => Ar);
	}
	static from(t) {
		if (t.length === 0) return e.empty();
		let [n, ...r] = t;
		return n.concat(...r);
	}
	static split(t, n, r = new e((e, t) => t(e))) {
		let i = new e((e, i) => t(e) ? n.request(e, i) : r.request(e, i));
		return Object.assign(i, {
			left: n,
			right: r
		});
	}
	static execute(e, t, n) {
		return e.request(ps(t, n), () => Ar);
	}
	static concat(...t) {
		return e.from(t);
	}
	constructor(e) {
		e && (this.request = e);
	}
	split(t, n, r) {
		return this.concat(e.split(t, n, r));
	}
	concat(...e) {
		return e.length === 0 ? this : e.reduce(this.combine.bind(this), this);
	}
	combine(t, n) {
		let r = new e((e, r) => t.request(e, (e) => n.request(e, r)));
		return Object.assign(r, {
			left: t,
			right: n
		});
	}
	request(e, t) {
		throw R(65);
	}
	left;
	right;
}, gs = hs.execute;
//#endregion
//#region node_modules/@apollo/client/utilities/graphql/DocumentTransform.js
function _s(e) {
	return e;
}
var vs = class e {
	transform;
	cached;
	resultCache = /* @__PURE__ */ new WeakSet();
	getCacheKey(e) {
		return [e];
	}
	static identity() {
		return new e(_s, { cache: !1 });
	}
	static split(t, n, r = e.identity()) {
		return Object.assign(new e((e) => (t(e) ? n : r).transformDocument(e), { cache: !1 }), {
			left: n,
			right: r
		});
	}
	constructor(e, t = {}) {
		this.transform = e, t.getCacheKey && (this.getCacheKey = t.getCacheKey), this.cached = t.cache !== !1, this.resetCache();
	}
	resetCache() {
		if (this.cached) {
			let t = new B();
			this.performWork = us(e.prototype.performWork.bind(this), {
				makeCacheKey: (e) => {
					let n = this.getCacheKey(e);
					if (n) return L(Array.isArray(n), 20), t.lookupArray(n);
				},
				max: z["documentTransform.cache"],
				cache: ca
			});
		}
	}
	performWork(e) {
		return ma(e), this.transform(e);
	}
	transformDocument(e) {
		if (this.resultCache.has(e)) return e;
		let t = this.performWork(e);
		return this.resultCache.add(t), t;
	}
	concat(t) {
		return Object.assign(new e((e) => t.transformDocument(this.transformDocument(e)), { cache: !1 }), {
			left: this,
			right: t
		});
	}
	left;
	right;
}, ys, bs = Object.assign((e) => {
	let t = ys.get(e);
	return t || (t = Cn(e), ys.set(e, t)), t;
}, { reset() {
	ys = new da(z.print || 2e3);
} });
bs.reset();
//#endregion
//#region node_modules/@apollo/client/utilities/graphql/storeUtils.js
function J(e) {
	return !!(e && typeof e == "object" && typeof e.__ref == "string");
}
//#endregion
//#region node_modules/@apollo/client/utilities/graphql/transform.js
var xs = {
	kind: S.FIELD,
	name: {
		kind: S.NAME,
		value: "__typename"
	}
}, Ss = Object.assign(function(e) {
	return T(e, { SelectionSet: { enter(e, t, n) {
		if (n && n.kind === S.OPERATION_DEFINITION) return;
		let { selections: r } = e;
		if (!r || r.some((e) => e.kind === S.FIELD && (e.name.value === "__typename" || e.name.value.lastIndexOf("__", 0) === 0))) return;
		let i = n;
		if (!(i.kind === S.FIELD && i.directives && i.directives.some((e) => e.name.value === "export"))) return {
			...e,
			selections: [...r, xs]
		};
	} } });
}, { added(e) {
	return e === xs;
} });
//#endregion
//#region node_modules/@apollo/client/utilities/graphql/operations.js
function Cs(e, t) {
	return U(e)?.operation === t;
}
function ws(e) {
	return Cs(e, "mutation");
}
function Ts(e) {
	return Cs(e, "subscription");
}
//#endregion
//#region node_modules/@apollo/client/utilities/isNetworkRequestSettled.js
function Es(e) {
	return e === 7 || e === 8;
}
//#endregion
//#region node_modules/@apollo/client/utilities/isNetworkRequestInFlight.js
function Ds(e) {
	return !Es(e);
}
//#endregion
//#region node_modules/@apollo/client/cache/core/cache.js
var Os = class {
	assumeImmutableResults = !1;
	lookupFragment(e) {
		return null;
	}
	batch(e) {
		let t = typeof e.optimistic == "string" ? e.optimistic : e.optimistic === !1 ? null : void 0, n;
		return this.performTransaction(() => n = e.update(this), t), n;
	}
	recordOptimisticTransaction(e, t) {
		this.performTransaction(e, t);
	}
	transformDocument(e) {
		return e;
	}
	transformForLink(e) {
		return e;
	}
	identify(e) {}
	gc() {
		return [];
	}
	modify(e) {
		return !1;
	}
	readQuery(e, t = !!e.optimistic) {
		return this.read({
			...e,
			rootId: e.id || "ROOT_QUERY",
			optimistic: t
		});
	}
	fragmentWatches = new B(!0);
	watchFragment(e) {
		let { fragment: t, fragmentName: n, from: r } = e, i = this.getFragmentDoc(t, n), a = (Array.isArray(r) ? r : [r]).map((e) => e == null ? e : this.toCacheId(e));
		if (!Array.isArray(r)) {
			let t = this.watchSingleFragment(a[0], i, e);
			return r === null ? t : xo(t, Symbol.for("apollo.transform.individualResult"), (e) => ({
				...e,
				data: e.data ?? {}
			}));
		}
		let o;
		function s(e) {
			let t = e.reduce((e, t, n) => (e.data.push(t.data), e.complete &&= t.complete, e.dataState = e.complete ? "complete" : "partial", t.missing && (e.missing ||= {}, e.missing[n] = t.missing), e), {
				data: [],
				dataState: "complete",
				complete: !0
			});
			return K(o, t) || (o = t), o;
		}
		if (a.length === 0) return Ms;
		let c = !1, l = a.map((t) => this.watchSingleFragment(t, i, e)), u = ga(l).pipe(I(s), Ai({
			subscribe: () => c = !0,
			unsubscribe: () => c = !1
		}), ki({
			bufferSize: 1,
			refCount: !0
		}));
		return Object.assign(u, { getCurrentResult: () => c && o ? o : s(l.map((e) => e.getCurrentResult())) });
	}
	onAfterBroadcast = (e) => e();
	watchSingleFragment(e, t, n) {
		if (e === null) return As;
		let { optimistic: r = !0, variables: i } = n, a = [t, W({
			id: e,
			optimistic: r,
			variables: i
		})], o = this.fragmentWatches.lookupArray(a);
		if (!o.observable) {
			let s = !1, c;
			function l(e) {
				let r = e.result;
				return (!c || !go(t, { data: c.data }, { data: r }, n.variables)) && (c = {
					data: r,
					dataState: e.complete ? "complete" : "partial",
					complete: e.complete
				}, e.missing && (c.missing = e.missing.missing)), c;
			}
			let u = new j((n) => {
				s = !0;
				let o = this.watch({
					variables: i,
					returnPartialData: !0,
					id: e,
					query: t,
					optimistic: r,
					immediate: !0,
					callback: (e) => {
						u.dirty = !0, this.onAfterBroadcast(() => {
							n.next(l(e)), u.dirty = !1;
						});
					}
				});
				return () => {
					s = !1, o(), this.fragmentWatches.removeArray(a);
				};
			}).pipe(Ci(), Di({
				connector: () => new wr(1),
				resetOnRefCountZero: () => bi(0)
			}));
			o.observable = Object.assign(u, {
				dirty: !1,
				getCurrentResult: () => s && c ? c : l(this.diff({
					id: e,
					query: t,
					returnPartialData: !0,
					optimistic: r,
					variables: i
				}))
			});
		}
		return o.observable;
	}
	getFragmentDoc = us(wa, {
		max: z["cache.fragmentQueryDocuments"] || 1e3,
		cache: ca,
		makeCacheKey: ds(this)
	});
	readFragment(e, t = !!e.optimistic) {
		let n = e.from === void 0 ? e.id : this.toCacheId(e.from);
		return this.read({
			...e,
			query: this.getFragmentDoc(e.fragment, e.fragmentName),
			rootId: n,
			optimistic: t
		});
	}
	writeQuery({ id: e, data: t, ...n }) {
		return this.write(Object.assign(n, {
			dataId: e || "ROOT_QUERY",
			result: t
		}));
	}
	writeFragment({ data: e, fragment: t, fragmentName: n, ...r }) {
		let i = r.from === void 0 ? r.id : this.toCacheId(r.from);
		return this.write(Object.assign(r, {
			query: this.getFragmentDoc(t, n),
			dataId: i,
			result: e
		}));
	}
	updateQuery(e, t) {
		return this.batch({ update(n) {
			let r = n.readQuery(e), i = t(r);
			return i == null ? r : (n.writeQuery({
				...e,
				data: i
			}), i);
		} });
	}
	updateFragment(e, t) {
		return this.batch({ update(n) {
			let r = n.readFragment(e), i = t(r);
			return i == null ? r : (n.writeFragment({
				...e,
				data: i
			}), i);
		} });
	}
	toCacheId(e) {
		return typeof e == "string" ? e : this.identify(e);
	}
}, ks = Object.freeze({
	data: null,
	dataState: "complete",
	complete: !0
}), As = Object.assign(new j((e) => {
	e.next(ks);
}), {
	dirty: !1,
	getCurrentResult: () => ks
}), js = Object.freeze({
	data: [],
	dataState: "complete",
	complete: !0
}), Ms = Object.assign(new j((e) => {
	e.next(js);
}), { getCurrentResult: () => js }), Ns = class e extends Error {
	message;
	path;
	query;
	variables;
	constructor(t, n, r, i) {
		if (super(t), this.message = t, this.path = n, this.query = r, this.variables = i, this.name = "MissingFieldError", Array.isArray(this.path)) {
			this.missing = this.message;
			for (let e = this.path.length - 1; e >= 0; --e) this.missing = { [this.path[e]]: this.missing };
		} else this.missing = this.path;
		this.__proto__ = e.prototype;
	}
	missing;
}, { hasOwnProperty: Y } = Object.prototype;
function Ps({ __typename: e, id: t, _id: n }, r) {
	if (typeof e == "string" && (r && (r.keyObject = t == null ? n == null ? void 0 : { _id: n } : { id: t }), t == null && n != null && (t = n), t != null)) return `${e}:${typeof t == "number" || typeof t == "string" ? t : JSON.stringify(t)}`;
}
var Fs = {
	dataIdFromObject: Ps,
	resultCaching: !0
};
function Is(e) {
	return V(Fs, e);
}
var Ls = /^[_a-z][_0-9a-z]*/i;
function Rs(e) {
	let t = e.match(Ls);
	return t ? t[0] : e;
}
function zs(e, t, n) {
	return H(t) ? G(t) ? t.every((t) => zs(e, t, n)) : e.selections.every((e) => {
		if (za(e) && $a(e, n)) {
			let r = Qa(e);
			return Y.call(t, r) && (!e.selectionSet || zs(e.selectionSet, t[r], n));
		}
		return !0;
	}) : !1;
}
function Bs(e) {
	return H(e) && !J(e) && !G(e);
}
function Vs() {
	return new xa();
}
function Hs(e, t) {
	let n = _a(Ea(e));
	return {
		fragmentMap: n,
		lookupFragment(e) {
			let r = n[e];
			return !r && t && (r = t.lookup(e)), r || null;
		}
	};
}
//#endregion
//#region node_modules/@apollo/client/cache/inmemory/entityStore.js
var Us = {}, Ws = () => Us, Gs = {}, Ks = class {
	policies;
	group;
	data = {};
	constructor(e, t) {
		this.policies = e, this.group = t;
	}
	toObject() {
		return { ...this.data };
	}
	has(e) {
		return this.lookup(e, !0) !== void 0;
	}
	get(e, t) {
		if (this.group.depend(e, t), Y.call(this.data, e)) {
			let n = this.data[e];
			if (n && Y.call(n, t)) return n[t];
		}
		if (t === "__typename" && Y.call(this.policies.rootTypenamesById, e)) return this.policies.rootTypenamesById[e];
		if (this instanceof Xs) return this.parent.get(e, t);
	}
	lookup(e, t) {
		if (t && this.group.depend(e, "__exists"), Y.call(this.data, e)) return this.data[e];
		if (this instanceof Xs) return this.parent.lookup(e, t);
		if (this.policies.rootTypenamesById[e]) return {};
	}
	merge(e, t) {
		let n;
		J(e) && (e = e.__ref), J(t) && (t = t.__ref);
		let r = typeof e == "string" ? this.lookup(n = e) : e, i = typeof t == "string" ? this.lookup(n = t) : t;
		if (!i) return;
		L(typeof n == "string", 105);
		let a = new xa({ reconciler: Qs }).merge(r, i);
		if (this.data[n] = a, a !== r && (delete this.refs[n], this.group.caching)) {
			let e = {};
			r || (e.__exists = 1), Object.keys(i).forEach((t) => {
				if (!r || r[t] !== a[t]) {
					e[t] = 1;
					let n = Rs(t);
					n !== t && !this.policies.hasKeyArgs(a.__typename, n) && (e[n] = 1), a[t] === void 0 && !(this instanceof Xs) && delete a[t];
				}
			}), e.__typename && !(r && r.__typename) && this.policies.rootTypenamesById[n] === a.__typename && delete e.__typename, Object.keys(e).forEach((e) => this.group.dirty(n, e));
		}
	}
	modify(e, t, n) {
		let r = this.lookup(e);
		if (r) {
			let i = {}, a = !1, o = !0, s = {
				DELETE: Us,
				INVALIDATE: Gs,
				isReference: J,
				toReference: this.toReference,
				canRead: this.canRead,
				readField: (t, n) => this.policies.readField(typeof t == "string" ? {
					fieldName: t,
					from: n || Va(e)
				} : t, { store: this })
			};
			if (Object.keys(r).forEach((c) => {
				let l = Rs(c), u = r[c];
				if (u === void 0) return;
				let d = typeof t == "function" ? t : t[c] || (n ? void 0 : t[l]);
				if (d) {
					let t = d === Ws ? Us : d(Ha(u), {
						...s,
						fieldName: l,
						storeFieldName: c,
						storage: this.getStorage(e, c)
					});
					t === Gs ? this.group.dirty(e, c) : (t === Us && (t = void 0), t !== u && (i[c] = t, a = !0, u = t));
				}
				u !== void 0 && (o = !1);
			}), a) return this.merge(e, i), o && (this instanceof Xs ? this.data[e] = void 0 : delete this.data[e], this.group.dirty(e, "__exists")), !0;
		}
		return !1;
	}
	delete(e, t, n) {
		let r = this.lookup(e);
		if (r) {
			let i = this.getFieldValue(r, "__typename"), a = t && n ? this.policies.getStoreFieldName({
				typename: i,
				fieldName: t,
				args: n
			}) : t;
			return this.modify(e, a ? { [a]: Ws } : Ws, !!n);
		}
		return !1;
	}
	evict(e, t) {
		let n = !1;
		return e.id && (Y.call(this.data, e.id) && (n = this.delete(e.id, e.fieldName, e.args)), this instanceof Xs && this !== t && (n = this.parent.evict(e, t) || n), (e.fieldName || n) && this.group.dirty(e.id, e.fieldName || "__exists")), n;
	}
	clear() {
		this.replace(null);
	}
	extract() {
		let e = this.toObject(), t = [];
		return this.getRootIdSet().forEach((e) => {
			Y.call(this.policies.rootTypenamesById, e) || t.push(e);
		}), t.length && (e.__META = { extraRootIds: t.sort() }), e;
	}
	replace(e) {
		if (Object.keys(this.data).forEach((t) => {
			e && Y.call(e, t) || this.delete(t);
		}), e) {
			let { __META: t, ...n } = e;
			Object.keys(n).forEach((e) => {
				this.merge(e, n[e]);
			}), t && t.extraRootIds.forEach(this.retain, this);
		}
	}
	rootIds = {};
	retain(e) {
		return this.rootIds[e] = (this.rootIds[e] || 0) + 1;
	}
	release(e) {
		if (this.rootIds[e] > 0) {
			let t = --this.rootIds[e];
			return t || delete this.rootIds[e], t;
		}
		return 0;
	}
	getRootIdSet(e = /* @__PURE__ */ new Set()) {
		return Object.keys(this.rootIds).forEach(e.add, e), this instanceof Xs ? this.parent.getRootIdSet(e) : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e), e;
	}
	gc() {
		let e = this.getRootIdSet(), t = this.toObject();
		e.forEach((n) => {
			Y.call(t, n) && (Object.keys(this.findChildRefIds(n)).forEach(e.add, e), delete t[n]);
		});
		let n = Object.keys(t);
		if (n.length) {
			let e = this;
			for (; e instanceof Xs;) e = e.parent;
			n.forEach((t) => e.delete(t));
		}
		return n;
	}
	refs = {};
	findChildRefIds(e) {
		if (!Y.call(this.refs, e)) {
			let t = this.refs[e] = {}, n = this.data[e];
			if (!n) return t;
			let r = /* @__PURE__ */ new Set([n]);
			r.forEach((e) => {
				J(e) && (t[e.__ref] = !0), H(e) && Object.keys(e).forEach((t) => {
					let n = e[t];
					H(n) && r.add(n);
				});
			});
		}
		return this.refs[e];
	}
	makeCacheKey() {
		return this.group.keyMaker.lookupArray(arguments);
	}
	getFieldValue = (e, t) => Ha(J(e) ? this.get(e.__ref, t) : e && e[t]);
	canRead = (e) => J(e) ? this.has(e.__ref) : typeof e == "object";
	toReference = (e, t) => {
		if (typeof e == "string") return Va(e);
		if (J(e)) return e;
		let [n] = this.policies.identify(e);
		if (n) {
			let r = Va(n);
			return t && this.merge(n, e), r;
		}
	};
	get supportsResultCaching() {
		return this.group.caching;
	}
}, qs = class {
	caching;
	parent;
	d = null;
	keyMaker;
	constructor(e, t = null) {
		this.caching = e, this.parent = t, this.resetCaching();
	}
	resetCaching() {
		this.d = this.caching ? os() : null, this.keyMaker = new B();
	}
	depend(e, t) {
		if (this.d) {
			this.d(Js(e, t));
			let n = Rs(t);
			n !== t && this.d(Js(e, n)), this.parent && this.parent.depend(e, t);
		}
	}
	dirty(e, t) {
		this.d && this.d.dirty(Js(e, t), t === "__exists" ? "forget" : "setDirty");
	}
};
function Js(e, t) {
	return t + "#" + e;
}
function Ys(e, t) {
	$s(e) && e.group.depend(t, "__exists");
}
Ks.Root = class extends Ks {
	constructor({ policies: e, resultCaching: t = !0, seed: n }) {
		super(e, new qs(t)), n && this.replace(n);
	}
	stump = new Zs(this);
	addLayer(e, t) {
		return this.stump.addLayer(e, t);
	}
	removeLayer() {
		return this;
	}
	storageTrie = new B();
	getStorage() {
		return this.storageTrie.lookupArray(arguments);
	}
};
var Xs = class e extends Ks {
	id;
	parent;
	replay;
	group;
	constructor(e, t, n, r) {
		super(t.policies, r), this.id = e, this.parent = t, this.replay = n, this.group = r, n(this);
	}
	addLayer(t, n) {
		return new e(t, this, n, this.group);
	}
	removeLayer(e) {
		let t = this.parent.removeLayer(e);
		return e === this.id ? (this.group.caching && Object.keys(this.data).forEach((e) => {
			let n = this.data[e], r = t.lookup(e);
			r ? n ? n !== r && Object.keys(n).forEach((t) => {
				K(n[t], r[t]) || this.group.dirty(e, t);
			}) : (this.group.dirty(e, "__exists"), Object.keys(r).forEach((t) => {
				this.group.dirty(e, t);
			})) : this.delete(e);
		}), t) : t === this.parent ? this : t.addLayer(this.id, this.replay);
	}
	toObject() {
		return {
			...this.parent.toObject(),
			...this.data
		};
	}
	findChildRefIds(e) {
		let t = this.parent.findChildRefIds(e);
		return Y.call(this.data, e) ? {
			...t,
			...super.findChildRefIds(e)
		} : t;
	}
	getStorage(...e) {
		let t = this.parent;
		for (; t.parent;) t = t.parent;
		return t.getStorage(...e);
	}
}, Zs = class extends Xs {
	constructor(e) {
		super("EntityStore.Stump", e, () => {}, new qs(e.group.caching, e.group));
	}
	removeLayer() {
		return this;
	}
	merge(e, t) {
		return this.parent.merge(e, t);
	}
};
function Qs(e, t, n) {
	let r = e[n], i = t[n];
	return K(r, i) ? r : i;
}
function $s(e) {
	return !!(e && e.supportsResultCaching);
}
//#endregion
//#region node_modules/@apollo/client/masking/utils.js
var ec = new jo();
function tc(e) {
	let t = e.directives?.find(({ name: e }) => e.value === "unmask");
	if (!t) return "mask";
	let n = t.arguments?.find(({ name: e }) => e.value === "mode");
	return n && "value" in n.value && n.value.value === "migrate" ? "migrate" : "unmask";
}
//#endregion
//#region node_modules/@apollo/client/masking/maskDefinition.js
function nc(e, t, n) {
	return ec.withValue(!0, () => {
		let r = ic(e, t, n, !1);
		return Object.isFrozen(e), r;
	});
}
function rc(e, t) {
	if (t.has(e)) return t.get(e);
	let n = Array.isArray(e) ? [] : {};
	return t.set(e, n), n;
}
function ic(e, t, n, r, i) {
	let { knownChanged: a } = n, o = rc(e, n.mutableTargets);
	if (Array.isArray(e)) {
		for (let [i, s] of Array.from(e.entries())) {
			if (s === null) {
				o[i] = null;
				continue;
			}
			let e = ic(s, t, n, r, void 0);
			a.has(e) && a.add(o), o[i] = e;
		}
		return a.has(o) ? o : e;
	}
	for (let s of t.selections) {
		let t;
		if (r && a.add(o), s.kind === S.FIELD) {
			let i = Qa(s), c = s.selectionSet;
			if (t = o[i] || e[i], t === void 0) continue;
			if (c && t !== null) {
				let o = ic(e[i], c, n, r, void 0);
				a.has(o) && (t = o);
			}
			o[i] = t;
		}
		if (s.kind === S.INLINE_FRAGMENT && (!s.typeCondition || n.cache.fragmentMatches(s, e.__typename)) && (t = ic(e, s.selectionSet, n, r, i)), s.kind === S.FRAGMENT_SPREAD) {
			let r = s.name.value, a = n.fragmentMap[r] || (n.fragmentMap[r] = n.cache.lookupFragment(r));
			L(a, 39, r);
			let o = tc(s);
			o !== "mask" && (t = ic(e, a.selectionSet, n, o === "migrate", i));
		}
		a.has(t) && a.add(o);
	}
	return "__typename" in e && !("__typename" in o) && (o.__typename = e.__typename), Object.keys(o).length !== Object.keys(e).length && a.add(o), a.has(o) ? o : e;
}
//#endregion
//#region node_modules/@apollo/client/masking/maskFragment.js
function ac(e, t, n, r) {
	let i = t.definitions.filter((e) => e.kind === S.FRAGMENT_DEFINITION);
	r === void 0 && (L(i.length === 1, 41, i.length), r = i[0].name.value);
	let a = i.find((e) => e.name.value === r);
	return L(!!a, 42, r), e == null || K(e, {}) ? e : nc(e, a.selectionSet, {
		operationType: "fragment",
		operationName: a.name.value,
		fragmentMap: _a(Ea(t)),
		cache: n,
		mutableTargets: /* @__PURE__ */ new WeakMap(),
		knownChanged: /* @__PURE__ */ new WeakSet()
	});
}
//#endregion
//#region node_modules/@apollo/client/masking/maskOperation.js
function oc(e, t, n) {
	let r = U(t);
	return L(r, 43), e == null ? e : nc(e, r.selectionSet, {
		operationType: r.operation,
		operationName: r.name?.value,
		fragmentMap: _a(Ea(t)),
		cache: n,
		mutableTargets: /* @__PURE__ */ new WeakMap(),
		knownChanged: /* @__PURE__ */ new WeakSet()
	});
}
//#endregion
//#region node_modules/@apollo/client/cache/inmemory/key-extractor.js
var sc = {};
function cc(e) {
	let t = JSON.stringify(e);
	return sc[t] || (sc[t] = {});
}
function lc(e) {
	let t = cc(e);
	return t.keyFieldsFn ||= (t, n) => {
		let r = (e, t) => n.readField(t, e), i = n.keyObject = dc(e, (e) => {
			let i = mc(n.storeObject, e, r);
			return i === void 0 && t !== n.storeObject && Y.call(t, e[0]) && (i = mc(t, e, pc)), L(i !== void 0, 108, e.join("."), t), i;
		});
		return `${n.typename}:${JSON.stringify(i)}`;
	};
}
function uc(e) {
	let t = cc(e);
	return t.keyArgsFn ||= (t, { field: n, variables: r, fieldName: i }) => {
		let a = dc(e, (e) => {
			let i = e[0], a = i.charAt(0);
			if (a === "@") {
				if (n && Ba(n.directives)) {
					let t = i.slice(1), a = n.directives.find((e) => e.name.value === t), o = a && qi(a, r);
					return o && mc(o, e.slice(1));
				}
				return;
			}
			if (a === "$") {
				let t = i.slice(1);
				if (r && Y.call(r, t)) {
					let n = e.slice(0);
					return n[0] = t, mc(r, n);
				}
				return;
			}
			if (t) return mc(t, e);
		}), o = JSON.stringify(a);
		return (t || o !== "{}") && (i += ":" + o), i;
	};
}
function dc(e, t) {
	let n = new xa();
	return fc(e).reduce((e, r) => {
		let i = t(r);
		if (i !== void 0) {
			for (let e = r.length - 1; e >= 0; --e) i = { [r[e]]: i };
			e = n.merge(e, i);
		}
		return e;
	}, {});
}
function fc(e) {
	let t = cc(e);
	if (!t.paths) {
		let n = t.paths = [], r = [];
		e.forEach((t, i) => {
			G(t) ? (fc(t).forEach((e) => n.push(r.concat(e))), r.length = 0) : (r.push(t), G(e[i + 1]) || (n.push(r.slice(0)), r.length = 0));
		});
	}
	return t.paths;
}
function pc(e, t) {
	return e[t];
}
function mc(e, t, n) {
	return n ||= pc, hc(t.reduce(function e(t, r) {
		return G(t) ? t.map((t) => e(t, r)) : t && n(t, r);
	}, e));
}
function hc(e) {
	return H(e) ? G(e) ? e.map(hc) : dc(Object.keys(e).sort(), (t) => mc(e, t)) : e;
}
//#endregion
//#region node_modules/@apollo/client/cache/inmemory/reactiveVars.js
var gc = new jo(), _c = /* @__PURE__ */ new WeakMap();
function vc(e) {
	let t = _c.get(e);
	return t || _c.set(e, t = {
		vars: /* @__PURE__ */ new Set(),
		dep: os()
	}), t;
}
function yc(e) {
	vc(e).vars.forEach((t) => t.forgetCache(e));
}
function bc(e) {
	vc(e).vars.forEach((t) => t.attachCache(e));
}
function xc(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = function(a) {
		if (arguments.length > 0) {
			if (e !== a) {
				e = a, t.forEach((e) => {
					vc(e).dep.dirty(r), Sc(e);
				});
				let i = Array.from(n);
				n.clear(), i.forEach((t) => t(e));
			}
		} else {
			let e = gc.getValue();
			e && (i(e), vc(e).dep(r));
		}
		return e;
	};
	r.onNextChange = (e) => (n.add(e), () => {
		n.delete(e);
	});
	let i = r.attachCache = (e) => (t.add(e), vc(e).vars.add(r), r);
	return r.forgetCache = (e) => t.delete(e), r;
}
function Sc(e) {
	e.broadcastWatches && e.broadcastWatches();
}
//#endregion
//#region node_modules/@apollo/client/cache/inmemory/policies.js
function Cc(e) {
	return e.args === void 0 ? e.field ? qi(e.field, e.variables) : null : e.args;
}
var wc = () => void 0, Tc = (e, t) => t.fieldName, Ec = (e, t, { mergeObjects: n }) => n(e, t), Dc = (e, t) => t, Oc = (e, t, { streamFieldInfo: n, existingData: r }) => {
	if (!e && !r) return t;
	let i = [], a = e ?? r, o = n?.isLastChunk ? t.length : Math.max(a.length, t.length);
	for (let e = 0; e < o; e++) i[e] = t[e] === void 0 ? a[e] : t[e];
	return i;
}, kc = class {
	config;
	typePolicies = {};
	toBeAdded = {};
	supertypeMap = /* @__PURE__ */ new Map();
	fuzzySubtypes = /* @__PURE__ */ new Map();
	cache;
	rootIdsByTypename = {};
	rootTypenamesById = {};
	usingPossibleTypes = !1;
	constructor(e) {
		this.config = e, this.config = {
			dataIdFromObject: Ps,
			...e
		}, this.cache = this.config.cache, this.setRootTypename("Query"), this.setRootTypename("Mutation"), this.setRootTypename("Subscription"), e.possibleTypes && this.addPossibleTypes(e.possibleTypes), e.typePolicies && this.addTypePolicies(e.typePolicies);
	}
	identify(e, t) {
		let n = this, r = t && (t.typename || t.storeObject?.__typename) || e.__typename;
		if (r === this.rootTypenamesById.ROOT_QUERY) return ["ROOT_QUERY"];
		let i = t && t.storeObject || e, a = {
			...t,
			typename: r,
			storeObject: i,
			readField: t && t.readField || ((...e) => {
				let t = Mc(e, i);
				return n.readField(t, {
					store: n.cache.data,
					variables: t.variables
				});
			})
		}, o, s = r && this.getTypePolicy(r), c = s && s.keyFn || this.config.dataIdFromObject;
		return ec.withValue(!0, () => {
			for (; c;) {
				let t = c({
					...e,
					...i
				}, a);
				if (G(t)) c = lc(t);
				else {
					o = t;
					break;
				}
			}
		}), o = o ? String(o) : void 0, a.keyObject ? [o, a.keyObject] : [o];
	}
	addTypePolicies(e) {
		Object.keys(e).forEach((t) => {
			let { queryType: n, mutationType: r, subscriptionType: i, ...a } = e[t];
			n && this.setRootTypename("Query", t), r && this.setRootTypename("Mutation", t), i && this.setRootTypename("Subscription", t), Y.call(this.toBeAdded, t) ? this.toBeAdded[t].push(a) : this.toBeAdded[t] = [a];
		});
	}
	updateTypePolicy(e, t, n) {
		let r = this.getTypePolicy(e), { keyFields: i, fields: a } = t;
		function o(e, t) {
			e.merge = typeof t == "function" ? t : t === !0 ? Ec : t === !1 ? Dc : e.merge;
		}
		o(r, t.merge), r.keyFn = i === !1 ? wc : G(i) ? lc(i) : typeof i == "function" ? i : r.keyFn, a && Object.keys(a).forEach((t) => {
			let r = n[t];
			(!r || r?.typename !== e) && (r = n[t] = { typename: e });
			let i = a[t];
			if (typeof i == "function") r.read = i;
			else {
				let { keyArgs: e, read: t, merge: n } = i;
				r.keyFn = e === !1 ? Tc : G(e) ? uc(e) : typeof e == "function" ? e : r.keyFn, typeof t == "function" && (r.read = t), o(r, n);
			}
			r.read && r.merge && (r.keyFn = r.keyFn || Tc);
		});
	}
	setRootTypename(e, t = e) {
		let n = "ROOT_" + e.toUpperCase(), r = this.rootTypenamesById[n];
		t !== r && (L(!r || r === e, 109, e), r && delete this.rootIdsByTypename[r], this.rootIdsByTypename[t] = n, this.rootTypenamesById[n] = t);
	}
	addPossibleTypes(e) {
		this.usingPossibleTypes = !0, Object.keys(e).forEach((t) => {
			this.getSupertypeSet(t, !0), e[t].forEach((e) => {
				this.getSupertypeSet(e, !0).add(t);
				let n = e.match(Ls);
				(!n || n[0] !== e) && this.fuzzySubtypes.set(e, new RegExp(e));
			});
		});
	}
	getTypePolicy(e) {
		if (!Y.call(this.typePolicies, e)) {
			let t = this.typePolicies[e] = {};
			t.fields = {};
			let n = this.supertypeMap.get(e);
			!n && this.fuzzySubtypes.size && (n = this.getSupertypeSet(e, !0), this.fuzzySubtypes.forEach((t, r) => {
				if (t.test(e)) {
					let e = this.supertypeMap.get(r);
					e && e.forEach((e) => n.add(e));
				}
			})), n && n.size && n.forEach((e) => {
				let { fields: n, ...r } = this.getTypePolicy(e);
				Object.assign(t, r), Object.assign(t.fields, n);
			});
		}
		let t = this.toBeAdded[e];
		return t && t.length && t.splice(0).forEach((t) => {
			this.updateTypePolicy(e, t, this.typePolicies[e].fields);
		}), this.typePolicies[e];
	}
	getFieldPolicy(e, t) {
		if (e) return this.getTypePolicy(e).fields[t];
	}
	getSupertypeSet(e, t) {
		let n = this.supertypeMap.get(e);
		return !n && t && this.supertypeMap.set(e, n = /* @__PURE__ */ new Set()), n;
	}
	fragmentMatches(e, t, n, r) {
		if (!e.typeCondition) return !0;
		if (!t) return !1;
		let i = e.typeCondition.name.value;
		if (t === i) return !0;
		if (this.usingPossibleTypes && this.supertypeMap.has(i)) {
			let a = this.getSupertypeSet(t, !0), o = [a], s = (e) => {
				let t = this.getSupertypeSet(e, !1);
				t && t.size && o.indexOf(t) < 0 && o.push(t);
			}, c = !!(n && this.fuzzySubtypes.size);
			for (let l = 0; l < o.length; ++l) {
				let u = o[l];
				if (u.has(i)) return a.has(i) || a.add(i), !0;
				u.forEach(s), c && l === o.length - 1 && zs(e.selectionSet, n, r) && (c = !1, this.fuzzySubtypes.forEach((e, n) => {
					let r = t.match(e);
					r && r[0] === t && s(n);
				}));
			}
		}
		return !1;
	}
	hasKeyArgs(e, t) {
		let n = this.getFieldPolicy(e, t);
		return !!(n && n.keyFn);
	}
	getStoreFieldName(e) {
		let { typename: t, fieldName: n } = e, r = this.getFieldPolicy(t, n), i, a = r && r.keyFn;
		if (a && t) {
			let r = {
				typename: t,
				fieldName: n,
				field: e.field || null,
				variables: e.variables
			}, o = Cc(e);
			for (; a;) {
				let e = a(o, r);
				if (G(e)) a = uc(e);
				else {
					i = e || n;
					break;
				}
			}
		}
		return i === void 0 && (i = e.field ? no(e.field, e.variables) : Pa(n, Cc(e))), i === !1 ? n : n === Rs(i) ? i : n + ":" + i;
	}
	readField(e, t) {
		let n = e.from;
		if (!n || !(e.field || e.fieldName)) return;
		if (e.typename === void 0) {
			let r = t.store.getFieldValue(n, "__typename");
			r && (e.typename = r);
		}
		let r = this.getStoreFieldName(e), i = Rs(r), a = t.store.getFieldValue(n, r), o = this.getFieldPolicy(e.typename, i), s = o && o.read;
		if (s) {
			let i = Ac(this, n, e, t, t.store.getStorage(J(n) ? n.__ref : n, r));
			return gc.withValue(this.cache, s, [a, i]);
		}
		return a;
	}
	getReadFunction(e, t) {
		let n = this.getFieldPolicy(e, t);
		return n && n.read;
	}
	getMergeFunction(e, t, n) {
		let r = this.getFieldPolicy(e, t), i = r && r.merge;
		return !i && n && (r = this.getTypePolicy(n), i = r && r.merge), i;
	}
	runMergeFunction(e, t, { field: n, typename: r, merge: i, path: a }, o, s) {
		let c = e;
		if (i === Ec) return Nc(o.store)(e, t);
		if (i === Dc) return t;
		o.overwrite && (e = void 0);
		let l = o.extensions?.[Co]?.deref()?.peekArray(a);
		if (l) {
			let { current: e, previous: n } = l;
			if (n && K(n.incoming, t) && K(n.streamFieldInfo, e)) return n.result;
		}
		let u = i(e, t, jc(this, void 0, {
			typename: r,
			fieldName: n.name.value,
			field: n,
			variables: o.variables,
			path: a
		}, o, s || {}, c));
		return l && (l.previous = {
			incoming: t,
			streamFieldInfo: l.current,
			result: u
		}), u;
	}
};
function Ac(e, t, n, r, i) {
	let a = e.getStoreFieldName(n), o = Rs(a), s = n.variables || r.variables, { toReference: c, canRead: l } = r.store;
	return {
		args: Cc(n),
		field: n.field || null,
		fieldName: o,
		storeFieldName: a,
		variables: s,
		isReference: J,
		toReference: c,
		storage: i,
		cache: e.cache,
		canRead: l,
		readField(...n) {
			return e.readField(Mc(n, t, s), r);
		},
		mergeObjects: Nc(r.store)
	};
}
function jc(e, t, n, r, i, a) {
	let o = {
		...Ac(e, t, n, r, i),
		extensions: r.extensions,
		existingData: a
	}, s = r.extensions;
	if (s && Co in s) {
		let { [Co]: e, ...t } = s, r = e?.deref()?.peekArray(n.path);
		r && (o.streamFieldInfo = r.current), o.extensions = Object.keys(t).length === 0 ? void 0 : t;
	}
	return o;
}
function Mc(e, t, n) {
	let { 0: r, 1: i, length: a } = e, o;
	return typeof r == "string" ? o = {
		fieldName: r,
		from: a > 1 ? i : t
	} : (o = { ...r }, Y.call(o, "from") || (o.from = t)), o.variables === void 0 && (o.variables = n), o;
}
function Nc(e) {
	return function(t, n) {
		if (G(t) || G(n)) throw R(112);
		if (H(t) && H(n)) {
			let r = e.getFieldValue(t, "__typename"), i = e.getFieldValue(n, "__typename");
			if (r && i && r !== i) return n;
			if (J(t) && Bs(n)) return e.merge(t.__ref, n), t;
			if (Bs(t) && J(n)) return e.merge(t, n.__ref), n;
			if (Bs(t) && Bs(n)) return {
				...t,
				...n
			};
		}
		return n;
	};
}
//#endregion
//#region node_modules/@apollo/client/cache/inmemory/readFromStore.js
function Pc(e) {
	return [
		e.selectionSet,
		e.objectOrReference,
		e.context
	];
}
var Fc = class {
	executeSelectionSet;
	executeSubSelectedArray;
	config;
	knownResults = /* @__PURE__ */ new WeakMap();
	constructor(e) {
		this.config = e, this.executeSelectionSet = us((e) => {
			let t = Pc(e);
			return this.executeSelectionSet.peek(...t) || (Ys(e.context.store, e.enclosingRef.__ref), this.execSelectionSetImpl(e));
		}, {
			max: z["inMemoryCache.executeSelectionSet"] || 5e4,
			keyArgs: Pc,
			makeCacheKey(e, t, n) {
				if ($s(n.store)) return n.store.makeCacheKey(e, J(t) ? t.__ref : t, n.varString);
			}
		}), this.executeSubSelectedArray = us((e) => (Ys(e.context.store, e.enclosingRef.__ref), this.execSubSelectedArrayImpl(e)), {
			max: z["inMemoryCache.executeSubSelectedArray"] || 1e4,
			makeCacheKey({ field: e, array: t, context: n }) {
				if ($s(n.store)) return n.store.makeCacheKey(e, t, n.varString);
			}
		});
	}
	diffQueryAgainstStore({ store: e, query: t, rootId: n = "ROOT_QUERY", variables: r, returnPartialData: i = !0 }) {
		let a = this.config.cache.policies;
		r = V(Sa(Oa(t)), r);
		let o = Va(n), s = this.executeSelectionSet({
			selectionSet: Da(t).selectionSet,
			objectOrReference: o,
			enclosingRef: o,
			context: {
				store: e,
				query: t,
				policies: a,
				variables: r,
				varString: W(r),
				...Hs(t, this.config.fragments)
			}
		}), c;
		s.missing && (c = new Ns(Ic(s.missing), s.missing, t, r));
		let l = !c, { result: u } = s;
		return {
			result: l ? u : i ? Object.keys(u).length === 0 ? null : u : null,
			complete: l,
			missing: c
		};
	}
	isFresh(e, t, n, r) {
		if ($s(r.store) && this.knownResults.get(e) === n) {
			let i = this.executeSelectionSet.peek(n, t, r);
			if (i && e === i.result) return !0;
		}
		return !1;
	}
	execSelectionSetImpl({ selectionSet: e, objectOrReference: t, enclosingRef: n, context: r }) {
		if (J(t) && !r.policies.rootTypenamesById[t.__ref] && !r.store.has(t.__ref)) return {
			result: {},
			missing: `Dangling reference to missing ${t.__ref} object`
		};
		let { variables: i, policies: a, store: o } = r, s = o.getFieldValue(t, "__typename"), c = [], l, u = new xa();
		typeof s == "string" && !a.rootIdsByTypename[s] && c.push({ __typename: s });
		function d(e, t) {
			return e.missing && (l = u.merge(l, { [t]: e.missing })), e.result;
		}
		let f = new Set(e.selections);
		f.forEach((e) => {
			if ($a(e, i)) {
				if (za(e)) {
					let i = a.readField({
						fieldName: e.name.value,
						field: e,
						variables: r.variables,
						from: t
					}, r), o = Qa(e);
					i === void 0 ? Ss.added(e) || (l = u.merge(l, { [o]: `Can't find field '${e.name.value}' on ${J(t) ? t.__ref + " object" : "object " + JSON.stringify(t, null, 2)}` })) : G(i) ? i.length > 0 && (i = d(this.executeSubSelectedArray({
						field: e,
						array: i,
						enclosingRef: n,
						context: r
					}), o)) : e.selectionSet && i != null && (i = d(this.executeSelectionSet({
						selectionSet: e.selectionSet,
						objectOrReference: i,
						enclosingRef: J(i) ? i : n,
						context: r
					}), o)), i !== void 0 && c.push({ [o]: i });
				} else {
					let t = Ca(e, r.lookupFragment);
					if (!t && e.kind === S.FRAGMENT_SPREAD) throw R(113, e.name.value);
					t && a.fragmentMatches(t, s) && t.selectionSet.selections.forEach(f.add, f);
				}
			}
		});
		let p = Ha({
			result: Ua(c),
			missing: l
		});
		return p.result && this.knownResults.set(p.result, e), p;
	}
	execSubSelectedArrayImpl({ field: e, array: t, enclosingRef: n, context: r }) {
		let i, a = new xa();
		function o(e, t) {
			return e.missing && (i = a.merge(i, { [t]: e.missing })), e.result;
		}
		return e.selectionSet && (t = t.filter((e) => e === void 0 || r.store.canRead(e))), t = t.map((t, i) => t === null ? null : G(t) ? o(this.executeSubSelectedArray({
			field: e,
			array: t,
			enclosingRef: n,
			context: r
		}), i) : e.selectionSet ? o(this.executeSelectionSet({
			selectionSet: e.selectionSet,
			objectOrReference: t,
			enclosingRef: J(t) ? t : n,
			context: r
		}), i) : t), {
			result: t,
			missing: i
		};
	}
};
function Ic(e) {
	try {
		JSON.stringify(e, (e, t) => {
			if (typeof t == "string") throw t;
			return t;
		});
	} catch (e) {
		return e;
	}
}
//#endregion
//#region node_modules/@apollo/client/cache/inmemory/writeToStore.js
function Lc(e, t, n) {
	let r = `${t}${n}`, i = e.flavors.get(r);
	return i || e.flavors.set(r, i = e.clientOnly === t && e.deferred === n ? e : {
		...e,
		clientOnly: t,
		deferred: n
	}), i;
}
var Rc = class {
	cache;
	reader;
	fragments;
	constructor(e, t, n) {
		this.cache = e, this.reader = t, this.fragments = n;
	}
	writeToStore(e, { query: t, result: n, dataId: r, variables: i, overwrite: a, extensions: o }) {
		let s = U(t), c = Vs();
		i = {
			...Sa(s),
			...i
		};
		let l = {
			store: e,
			written: {},
			merge(e, t) {
				return c.merge(e, t);
			},
			variables: i,
			varString: W(i),
			...Hs(t, this.fragments),
			overwrite: !!a,
			incomingById: /* @__PURE__ */ new Map(),
			clientOnly: !1,
			deferred: !1,
			flavors: /* @__PURE__ */ new Map(),
			extensions: o
		}, u = this.processSelectionSet({
			result: n || {},
			dataId: r,
			selectionSet: s.selectionSet,
			mergeTree: { map: /* @__PURE__ */ new Map() },
			context: l,
			path: []
		});
		if (!J(u)) throw R(115, n);
		return l.incomingById.forEach(({ storeObject: t, mergeTree: n, fieldNodeSet: r }, i) => {
			let a = Va(i);
			if (n && n.map.size) {
				let e = this.applyMerges(n, a, t, l);
				if (J(e)) return;
				t = e;
			}
			e.merge(i, t);
		}), e.retain(u.__ref), u;
	}
	processSelectionSet({ dataId: e, result: t, selectionSet: n, context: r, mergeTree: i, path: a }) {
		let { policies: o } = this.cache, s = {}, c = e && o.rootTypenamesById[e] || Gc(t, n, r.fragmentMap) || e && r.store.get(e, "__typename");
		typeof c == "string" && (s.__typename = c);
		let l = (...e) => {
			let t = Mc(e, s, r.variables);
			if (J(t.from)) {
				let e = r.incomingById.get(t.from.__ref);
				if (e) {
					let n = o.readField({
						...t,
						from: e.storeObject
					}, r);
					if (n !== void 0) return n;
				}
			}
			return o.readField(t, r);
		}, u = /* @__PURE__ */ new Set();
		this.flattenFields(n, t, r, c).forEach((e, n) => {
			let r = t[Qa(n)], d = [...a, n.name.value];
			if (u.add(n), r !== void 0) {
				let t = o.getStoreFieldName({
					typename: c,
					fieldName: n.name.value,
					field: n,
					variables: e.variables
				}), a = Bc(i, t), u = this.processFieldValue(r, n, n.selectionSet ? Lc(e, !1, !1) : e, a, d), f;
				n.selectionSet && (J(u) || Bs(u)) && (f = l("__typename", u));
				let p = o.getMergeFunction(c, n.name.value, f);
				p ? a.info = {
					field: n,
					typename: c,
					merge: p,
					path: d
				} : e.extensions?.[Co] && Array.isArray(u) && Hc(n) ? a.info = {
					field: n,
					typename: c,
					merge: Oc,
					path: d
				} : Wc(i, t), s = e.merge(s, { [t]: u });
			}
		});
		try {
			let [i, a] = o.identify(t, {
				typename: c,
				selectionSet: n,
				fragmentMap: r.fragmentMap,
				storeObject: s,
				readField: l
			});
			e ||= i, a && (s = r.merge(s, a));
		} catch (t) {
			if (!e) throw t;
		}
		if (typeof e == "string") {
			let a = Va(e), o = r.written[e] || (r.written[e] = []);
			if (o.indexOf(n) >= 0 || (o.push(n), this.reader && this.reader.isFresh(t, a, n, r))) return a;
			let c = r.incomingById.get(e);
			return c ? (c.storeObject = r.merge(c.storeObject, s), c.mergeTree = Vc(c.mergeTree, i), u.forEach((e) => c.fieldNodeSet.add(e))) : r.incomingById.set(e, {
				storeObject: s,
				mergeTree: Uc(i) ? void 0 : i,
				fieldNodeSet: u
			}), a;
		}
		return s;
	}
	processFieldValue(e, t, n, r, i) {
		return !t.selectionSet || e === null ? e : G(e) ? e.map((e, a) => {
			let o = this.processFieldValue(e, t, n, Bc(r, a), [...i, a]);
			return Wc(r, a), o;
		}) : this.processSelectionSet({
			result: e,
			selectionSet: t.selectionSet,
			context: n,
			mergeTree: r,
			path: i
		});
	}
	flattenFields(e, t, n, r = Gc(t, e, n.fragmentMap)) {
		let i = /* @__PURE__ */ new Map(), { policies: a } = this.cache, o = new B(!1);
		return (function e(s, c) {
			let l = o.lookup(s, c.clientOnly, c.deferred);
			l.visited || (l.visited = !0, s.selections.forEach((o) => {
				if (!$a(o, n.variables)) return;
				let { clientOnly: s, deferred: l } = c;
				if (!(s && l) && Ba(o.directives) && o.directives.forEach((e) => {
					let t = e.name.value;
					if (t === "client" && (s = !0), t === "defer") {
						let t = qi(e, n.variables);
						(!t || t.if !== !1) && (l = !0);
					}
				}), za(o)) {
					let e = i.get(o);
					e && (s &&= e.clientOnly, l &&= e.deferred), i.set(o, Lc(n, s, l));
				} else {
					let i = Ca(o, n.lookupFragment);
					if (!i && o.kind === S.FRAGMENT_SPREAD) throw R(117, o.name.value);
					i && a.fragmentMatches(i, r, t, n.variables) && e(i.selectionSet, Lc(n, s, l));
				}
			}));
		})(e, n), i;
	}
	applyMerges(e, t, n, r, i) {
		if (e.map.size && !J(n)) {
			let a = !G(n) && (J(t) || Bs(t)) ? t : void 0, o = n;
			a && !i && (i = [J(a) ? a.__ref : a]);
			let s, c = (e, t) => G(e) ? typeof t == "number" ? e[t] : void 0 : r.store.getFieldValue(e, String(t));
			e.map.forEach((e, t) => {
				let n = c(a, t), l = c(o, t);
				if (l === void 0) return;
				i && i.push(t);
				let u = this.applyMerges(e, n, l, r, i);
				u !== l && (s ||= /* @__PURE__ */ new Map(), s.set(t, u)), i && L(i.pop() === t);
			}), s && (n = G(o) ? o.slice(0) : { ...o }, s.forEach((e, t) => {
				n[t] = e;
			}));
		}
		return e.info ? this.cache.policies.runMergeFunction(t, n, e.info, r, i && r.store.getStorage(...i)) : n;
	}
}, zc = [];
function Bc({ map: e }, t) {
	return e.has(t) || e.set(t, zc.pop() || { map: /* @__PURE__ */ new Map() }), e.get(t);
}
function Vc(e, t) {
	if (e === t || !t || Uc(t)) return e;
	if (!e || Uc(e)) return t;
	let n = e.info && t.info ? {
		...e.info,
		...t.info
	} : e.info || t.info, r = e.map.size && t.map.size, i = {
		info: n,
		map: r ? /* @__PURE__ */ new Map() : e.map.size ? e.map : t.map
	};
	if (r) {
		let n = new Set(t.map.keys());
		e.map.forEach((e, r) => {
			i.map.set(r, Vc(e, t.map.get(r))), n.delete(r);
		}), n.forEach((n) => {
			i.map.set(n, Vc(t.map.get(n), e.map.get(n)));
		});
	}
	return i;
}
function Hc(e) {
	return !!e.directives && e.directives.some((e) => e.name.value === "stream");
}
function Uc(e) {
	return !e || !(e.info || e.map.size);
}
function Wc({ map: e }, t) {
	let n = e.get(t);
	n && Uc(n) && (zc.push(n), e.delete(t));
}
function Gc(e, t, n) {
	let r;
	for (let n of t.selections) if (za(n)) {
		if (n.name.value === "__typename") return e[Qa(n)];
	} else r ? r.push(n) : r = [n];
	if (typeof e.__typename == "string") return e.__typename;
	if (r) for (let t of r) {
		let r = Gc(e, Ca(t, n).selectionSet, n);
		if (typeof r == "string") return r;
	}
}
//#endregion
//#region node_modules/@apollo/client/cache/inmemory/inMemoryCache.js
var Kc = class extends Os {
	data;
	optimisticData;
	config;
	watches = /* @__PURE__ */ new Set();
	storeReader;
	storeWriter;
	addTypenameTransform = new vs(Ss);
	maybeBroadcastWatch;
	assumeImmutableResults = !0;
	policies;
	makeVar = xc;
	constructor(e = {}) {
		super(), this.config = Is(e), this.policies = new kc({
			cache: this,
			dataIdFromObject: this.config.dataIdFromObject,
			possibleTypes: this.config.possibleTypes,
			typePolicies: this.config.typePolicies
		}), this.init();
	}
	init() {
		let e = this.data = new Ks.Root({
			policies: this.policies,
			resultCaching: this.config.resultCaching
		});
		this.optimisticData = e.stump, this.resetResultCache();
	}
	resetResultCache() {
		let { fragments: e } = this.config;
		this.addTypenameTransform.resetCache(), e?.resetCaches(), this.storeWriter = new Rc(this, this.storeReader = new Fc({
			cache: this,
			fragments: e
		}), e), this.maybeBroadcastWatch = us((e, t) => this.broadcastWatch(e, t), {
			max: z["inMemoryCache.maybeBroadcastWatch"] || 5e3,
			makeCacheKey: (e) => {
				let t = e.optimistic ? this.optimisticData : this.data;
				if ($s(t)) {
					let { optimistic: n, id: r, variables: i } = e;
					return t.makeCacheKey(e.query, e.callback, W({
						optimistic: n,
						id: r,
						variables: i
					}));
				}
			}
		}), (/* @__PURE__ */ new Set([this.data.group, this.optimisticData.group])).forEach((e) => e.resetCaching());
	}
	restore(e) {
		return this.init(), e && this.data.replace(e), this;
	}
	extract(e = !1) {
		return (e ? this.optimisticData : this.data).extract();
	}
	read(e) {
		let { returnPartialData: t = !1 } = e;
		return this.storeReader.diffQueryAgainstStore({
			...e,
			store: e.optimistic ? this.optimisticData : this.data,
			config: this.config,
			returnPartialData: t
		}).result;
	}
	write(e) {
		try {
			return ++this.txCount, this.storeWriter.writeToStore(this.data, e);
		} finally {
			!--this.txCount && e.broadcast !== !1 && this.broadcastWatches();
		}
	}
	modify(e) {
		if (Y.call(e, "id") && !e.id) return !1;
		let t = e.optimistic ? this.optimisticData : this.data;
		try {
			return ++this.txCount, t.modify(e.id || "ROOT_QUERY", e.fields, !1);
		} finally {
			!--this.txCount && e.broadcast !== !1 && this.broadcastWatches();
		}
	}
	diff(e) {
		return this.storeReader.diffQueryAgainstStore({
			...e,
			store: e.optimistic ? this.optimisticData : this.data,
			rootId: e.id || "ROOT_QUERY",
			config: this.config
		});
	}
	watch(e) {
		return this.watches.size || bc(this), this.watches.add(e), e.immediate && this.maybeBroadcastWatch(e), () => {
			this.watches.delete(e) && !this.watches.size && yc(this), this.maybeBroadcastWatch.forget(e);
		};
	}
	gc(e) {
		W.reset(), bs.reset();
		let t = this.optimisticData.gc();
		return e && !this.txCount && e.resetResultCache && this.resetResultCache(), t;
	}
	retain(e, t) {
		return (t ? this.optimisticData : this.data).retain(e);
	}
	release(e, t) {
		return (t ? this.optimisticData : this.data).release(e);
	}
	identify(e) {
		if (J(e)) return e.__ref;
		try {
			return this.policies.identify(e)[0];
		} catch {}
	}
	evict(e) {
		if (!e.id) {
			if (Y.call(e, "id")) return !1;
			e = {
				...e,
				id: "ROOT_QUERY"
			};
		}
		try {
			return ++this.txCount, this.optimisticData.evict(e, this.data);
		} finally {
			!--this.txCount && e.broadcast !== !1 && this.broadcastWatches();
		}
	}
	reset(e) {
		return this.init(), W.reset(), e && e.discardWatches ? (this.watches.forEach((e) => this.maybeBroadcastWatch.forget(e)), this.watches.clear(), yc(this)) : this.broadcastWatches(), Promise.resolve();
	}
	removeOptimistic(e) {
		let t = this.optimisticData.removeLayer(e);
		t !== this.optimisticData && (this.optimisticData = t, this.broadcastWatches());
	}
	txCount = 0;
	batch(e) {
		let { update: t, optimistic: n = !0, removeOptimistic: r, onWatchUpdated: i } = e, a, o = (e) => {
			let { data: n, optimisticData: r } = this;
			++this.txCount, e && (this.data = this.optimisticData = e);
			try {
				return a = t(this);
			} finally {
				--this.txCount, this.data = n, this.optimisticData = r;
			}
		}, s = /* @__PURE__ */ new Set();
		return i && !this.txCount && this.broadcastWatches({
			...e,
			onWatchUpdated(e) {
				return s.add(e), !1;
			}
		}), typeof n == "string" ? this.optimisticData = this.optimisticData.addLayer(n, o) : n === !1 ? o(this.data) : o(), typeof r == "string" && (this.optimisticData = this.optimisticData.removeLayer(r)), i && s.size ? (this.broadcastWatches({
			...e,
			onWatchUpdated(e, t) {
				let n = i.call(this, e, t);
				return n !== !1 && s.delete(e), n;
			}
		}), s.size && s.forEach((e) => this.maybeBroadcastWatch.dirty(e))) : this.broadcastWatches(e), a;
	}
	performTransaction(e, t) {
		return this.batch({
			update: e,
			optimistic: t || t !== null
		});
	}
	transformDocument(e) {
		return this.addTypenameTransform.transformDocument(this.addFragmentsToDocument(e));
	}
	fragmentMatches(e, t) {
		return this.policies.fragmentMatches(e, t);
	}
	lookupFragment(e) {
		return this.config.fragments?.lookup(e) || null;
	}
	resolvesClientField(e, t) {
		return !!this.policies.getReadFunction(e, t);
	}
	broadcastWatches(e) {
		if (!this.txCount) {
			let t = this.onAfterBroadcast, n = /* @__PURE__ */ new Set();
			this.onAfterBroadcast = (e) => {
				n.add(e);
			};
			try {
				this.watches.forEach((t) => this.maybeBroadcastWatch(t, e)), n.forEach((e) => e());
			} finally {
				this.onAfterBroadcast = t;
			}
		}
	}
	addFragmentsToDocument(e) {
		let { fragments: t } = this.config;
		return t ? t.transform(e) : e;
	}
	broadcastWatch(e, t) {
		let { lastDiff: n } = e, r = this.diff(e);
		t && (e.optimistic && typeof t.optimistic == "string" && (r.fromOptimisticTransaction = !0), t.onWatchUpdated && t.onWatchUpdated.call(this, e, r, n) === !1) || (!n || !K(n.result, r.result)) && e.callback(e.lastDiff = r, n);
	}
};
//#endregion
//#region node_modules/@apollo/client/errors/utils.js
function qc(e, t) {
	return typeof e == "object" && !!e && e[Symbol.for("apollo.error")] === t;
}
function Jc(e) {
	Object.defineProperty(e, Symbol.for("apollo.error"), {
		value: e.name,
		enumerable: !1,
		writable: !1,
		configurable: !1
	});
}
//#endregion
//#region node_modules/@apollo/client/errors/CombinedProtocolErrors.js
function Yc(e) {
	return e.map((e) => e.message || "Error message not found.").join("\n");
}
var Xc = class e extends Error {
	static is(e) {
		return qc(e, "CombinedProtocolErrors");
	}
	static formatMessage = Yc;
	errors;
	constructor(t) {
		super(e.formatMessage(t, { defaultFormatMessage: Yc })), this.name = "CombinedProtocolErrors", this.errors = t, Jc(this), Object.setPrototypeOf(this, e.prototype);
	}
};
//#endregion
//#region node_modules/@apollo/client/errors/isErrorLike.js
function Zc(e) {
	return typeof e == "object" && !!e && typeof e.message == "string" && typeof e.name == "string" && (typeof e.stack == "string" || e.stack === void 0);
}
//#endregion
//#region node_modules/@apollo/client/errors/UnconventionalError.js
var Qc = class e extends Error {
	static is(e) {
		return qc(e, "UnconventionalError");
	}
	constructor(t) {
		super("An error of unexpected shape occurred.", { cause: t }), this.name = "UnconventionalError", Jc(this), Object.setPrototypeOf(this, e.prototype);
	}
};
//#endregion
//#region node_modules/@apollo/client/errors/CombinedGraphQLErrors.js
function $c(e) {
	return e.filter((e) => e).map((e) => e.message || "Error message not found.").join("\n");
}
var el = class e extends Error {
	static is(e) {
		return qc(e, "CombinedGraphQLErrors");
	}
	static formatMessage = $c;
	errors;
	data;
	extensions;
	constructor(t, n = t.errors || []) {
		super(e.formatMessage(n, {
			result: t,
			defaultFormatMessage: $c
		})), this.errors = n, this.data = t.data, this.extensions = t.extensions, this.name = "CombinedGraphQLErrors", Jc(this), Object.setPrototypeOf(this, e.prototype);
	}
}, tl = /* @__PURE__ */ new WeakSet();
function nl(e) {
	tl.add(e);
}
//#endregion
//#region node_modules/@apollo/client/errors/ServerError.js
var rl = class e extends Error {
	static is(e) {
		return qc(e, "ServerError");
	}
	response;
	statusCode;
	bodyText;
	constructor(t, n) {
		super(t), this.name = "ServerError", this.response = n.response, this.statusCode = n.response.status, this.bodyText = n.bodyText, Jc(this), Object.setPrototypeOf(this, e.prototype);
	}
}, il = class e extends Error {
	static is(e) {
		return qc(e, "ServerParseError");
	}
	response;
	statusCode;
	bodyText;
	constructor(t, n) {
		super(t instanceof Error ? t.message : "Could not parse server response", { cause: t }), this.name = "ServerParseError", this.response = n.response, this.statusCode = n.response.status, this.bodyText = n.bodyText, Jc(this), Object.setPrototypeOf(this, e.prototype);
	}
}, al = Symbol();
function ol(e) {
	return "extensions" in e && Xc.is(e.extensions[al]);
}
function sl(e) {
	return Zc(e) ? e : typeof e == "string" ? Error(e, { cause: e }) : new Qc(e);
}
//#endregion
//#region node_modules/@apollo/client/core/networkStatus.js
var X;
(function(e) {
	e[e.loading = 1] = "loading", e[e.setVariables = 2] = "setVariables", e[e.fetchMore = 3] = "fetchMore", e[e.refetch = 4] = "refetch", e[e.poll = 6] = "poll", e[e.ready = 7] = "ready", e[e.error = 8] = "error", e[e.streaming = 9] = "streaming";
})(X ||= {});
//#endregion
//#region node_modules/@apollo/client/core/ObservableQuery.js
var { assign: cl, hasOwnProperty: ll } = Object, ul = {
	loading: !0,
	networkStatus: X.loading,
	data: void 0,
	dataState: "empty",
	partial: !0
}, dl = {
	loading: !1,
	networkStatus: X.ready,
	data: void 0,
	dataState: "empty",
	partial: !0
}, fl = class {
	options;
	queryName;
	variablesUnknown = !1;
	_lastWrite;
	get query() {
		return this.lastQuery;
	}
	get variables() {
		return this.options.variables;
	}
	unsubscribeFromCache;
	input;
	subject;
	isTornDown;
	queryManager;
	subscriptions = /* @__PURE__ */ new Set();
	waitForNetworkResult;
	lastQuery;
	linkSubscription;
	pollingInfo;
	get networkStatus() {
		return this.subject.getValue().result.networkStatus;
	}
	get cache() {
		return this.queryManager.cache;
	}
	constructor({ queryManager: e, options: t, transformedQuery: n = e.transform(t.query) }) {
		this.queryManager = e, this.waitForNetworkResult = t.fetchPolicy === "network-only", this.isTornDown = !1, this.subscribeToMore = this.subscribeToMore.bind(this), this.maskResult = this.maskResult.bind(this);
		let { watchQuery: { fetchPolicy: r = "cache-first" } = {} } = e.defaultOptions, { fetchPolicy: i = r, initialFetchPolicy: a = i === "standby" ? r : i } = t;
		t[wo] && (L(i === "standby", 82), this.variablesUnknown = !0), this.lastQuery = n, this.options = {
			...t,
			initialFetchPolicy: a,
			fetchPolicy: i,
			variables: this.getVariablesWithDefaults(t.variables)
		}, this.initializeObservablesQueue(), this["@@observable"] = () => this, Symbol.observable && (this[Symbol.observable] = () => this);
		let o = U(this.query);
		this.queryName = o && o.name && o.name.value;
	}
	initializeObservablesQueue() {
		this.subject = new Sr({
			query: this.query,
			variables: this.variables,
			result: ul,
			meta: {}
		});
		let e = this.subject.pipe(Ai({
			subscribe: () => {
				this.subject.observed || (this.reobserve(), setTimeout(() => this.updatePolling()));
			},
			unsubscribe: () => {
				this.subject.observed || this.tearDownQuery();
			}
		}), io(({ query: e, variables: t, result: n, meta: r }, i) => {
			let { shouldEmit: a } = r;
			if (n === ul && (i.previous = void 0, i.previousVariables = void 0), this.options.fetchPolicy === "standby" || a === 2) return;
			if (a === 1) return c();
			let { previous: o, previousVariables: s } = i;
			if (o) {
				let r = this.queryManager.getDocumentInfo(e), i = this.queryManager.dataMasking, a = i ? r.nonReactiveQuery : e;
				if ((i || r.hasNonreactiveDirective ? go(a, o, n, t) : K(o, n)) && K(s, t)) return;
			}
			if (a === 3 && (!this.options.notifyOnNetworkStatusChange || K(o, n))) return;
			return c();
			function c() {
				return i.previous = n, i.previousVariables = t, n;
			}
		}, () => ({})));
		this.pipe = e.pipe.bind(e), this.subscribe = e.subscribe.bind(e), this.input = new br(), this.input.complete = () => {}, this.input.pipe(this.operator).subscribe(this.subject);
	}
	subscribe;
	pipe;
	[Symbol.observable];
	"@@observable";
	getCacheDiff({ optimistic: e = !0 } = {}) {
		return this.cache.diff({
			query: this.query,
			variables: this.variables,
			returnPartialData: !0,
			optimistic: e
		});
	}
	getInitialResult(e) {
		let t = e || this.options.fetchPolicy;
		this.queryManager.prioritizeCacheValues && (t === "network-only" || t === "cache-and-network") && (t = "cache-first");
		let n = () => {
			let e = this.getCacheDiff(), t = this.options.returnPartialData || e.complete ? e.result ?? void 0 : void 0;
			return this.maskResult({
				data: t,
				dataState: e.complete ? "complete" : t === void 0 ? "empty" : "partial",
				loading: !e.complete,
				networkStatus: e.complete ? X.ready : X.loading,
				partial: !e.complete
			});
		};
		switch (t) {
			case "cache-only": return {
				...n(),
				loading: !1,
				networkStatus: X.ready
			};
			case "cache-first": return n();
			case "cache-and-network": return {
				...n(),
				loading: !0,
				networkStatus: X.loading
			};
			case "standby": return dl;
			default: return ul;
		}
	}
	resubscribeCache() {
		let { variables: e, fetchPolicy: t } = this.options, n = this.query, r = t === "standby" || t === "no-cache" || this.waitForNetworkResult, i = !pl({
			query: n,
			variables: e
		}, this.unsubscribeFromCache) && !this.waitForNetworkResult;
		if ((r || i) && this.unsubscribeFromCache?.(), r || !i) return;
		let a = {
			query: n,
			variables: e,
			optimistic: !0,
			watcher: this,
			callback: (e) => {
				let t = this.queryManager.getDocumentInfo(n);
				if ((t.hasClientExports || t.hasForcedResolvers) && (a.lastDiff = void 0), a.lastOwnDiff === e) return;
				let { result: r } = this.subject.getValue();
				!e.complete && (r.error || r === ul || r === dl) || K(r.data, e.result) || this.scheduleNotify();
			}
		}, o = this.cache.watch(a);
		this.unsubscribeFromCache = Object.assign(() => {
			this.unsubscribeFromCache = void 0, o();
		}, {
			query: n,
			variables: e
		});
	}
	stableLastResult;
	getCurrentResult() {
		let { result: e } = this.subject.getValue(), t = e.networkStatus === X.error || this.hasObservers() || this.options.fetchPolicy === "no-cache" ? e : this.getInitialResult();
		return t === ul && (t = this.getInitialResult()), K(this.stableLastResult, t) || (this.stableLastResult = t), this.stableLastResult;
	}
	refetch(e) {
		let { fetchPolicy: t } = this.options, n = { pollInterval: 0 };
		return n.fetchPolicy = t === "no-cache" ? "no-cache" : "network-only", e && !K(this.variables, e) && (n.variables = this.options.variables = this.getVariablesWithDefaults({
			...this.variables,
			...e
		})), this._lastWrite = void 0, this._reobserve(n, { newNetworkStatus: X.refetch });
	}
	fetchMore({ query: e, variables: t, context: n, errorPolicy: r, updateQuery: i }) {
		L(this.options.fetchPolicy !== "cache-only", 84, Ji(this.query, "(anonymous)"));
		let a = {
			...V(this.options, { errorPolicy: "none" }, {
				query: e,
				context: n,
				errorPolicy: r
			}),
			variables: e ? t : {
				...this.variables,
				...t
			},
			fetchPolicy: "no-cache",
			notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange
		};
		a.query = this.transformDocument(a.query), this.lastQuery = e ? this.transformDocument(this.options.query) : a.query;
		let o = !1, s = this.options.fetchPolicy !== "no-cache";
		s || L(i, 85);
		let { finalize: c, pushNotification: l } = this.pushOperation(X.fetchMore);
		l({
			source: "newNetworkStatus",
			kind: "N",
			value: {}
		}, { shouldEmit: 3 });
		let { promise: u, operator: d } = ml(), { observable: f } = this.queryManager.fetchObservableWithInfo(a, {
			networkStatus: X.fetchMore,
			exposeExtensions: !0
		}), p = f.pipe(d, xi((e) => e.kind === "N" && e.source === "network")).subscribe({ next: (e) => {
			o = !1;
			let t = e.value, n = t[So];
			if (Es(e.value.networkStatus) && c(), s) {
				let e = this.getCacheDiff();
				this.cache.batch({
					update: (e) => {
						i ? e.updateQuery({
							query: this.query,
							variables: this.variables,
							returnPartialData: !0,
							optimistic: !1,
							extensions: n
						}, (e) => i(e, {
							fetchMoreResult: t.data,
							variables: a.variables
						})) : e.writeQuery({
							query: a.query,
							variables: a.variables,
							data: t.data,
							extensions: n
						});
					},
					onWatchUpdated: (n, r) => {
						if (n.watcher === this && !K(r.result, e.result)) {
							o = !0;
							let e = this.getCurrentResult();
							Ds(t.networkStatus) && l({
								kind: "N",
								source: "network",
								value: {
									...e,
									networkStatus: t.networkStatus === X.error ? X.ready : t.networkStatus,
									loading: !1,
									data: r.result,
									dataState: t.dataState === "streaming" ? "streaming" : "complete"
								}
							});
						}
					}
				});
			} else {
				let e = this.getCurrentResult(), n = i(e.data, {
					fetchMoreResult: t.data,
					variables: a.variables
				});
				l({
					kind: "N",
					value: {
						...e,
						networkStatus: X.ready,
						loading: !1,
						data: n,
						dataState: e.dataState === "streaming" ? "streaming" : "complete"
					},
					source: "network"
				});
			}
		} });
		return Ga(u.then((e) => ro(this.maskResult(e))).finally(() => {
			if (p.unsubscribe(), c(), s && !o) {
				let e = this.getCurrentResult();
				e.dataState === "streaming" ? l({
					kind: "N",
					source: "network",
					value: {
						...e,
						dataState: "complete",
						networkStatus: X.ready
					}
				}) : l({
					kind: "N",
					source: "newNetworkStatus",
					value: {}
				}, { shouldEmit: 1 });
			}
		}));
	}
	subscribeToMore(e) {
		let t = this.queryManager.startGraphQLSubscription({
			query: e.document,
			variables: e.variables,
			context: e.context
		}).subscribe({ next: (t) => {
			let { updateQuery: n, onError: r } = e, { error: i } = t;
			if (i) {
				r ? r(i) : L.error(86, i);
				return;
			}
			n && this.updateQuery((e, r) => n(e, {
				subscriptionData: t,
				...r
			}));
		} });
		return this.subscriptions.add(t), () => {
			this.subscriptions.delete(t) && t.unsubscribe();
		};
	}
	applyOptions(e) {
		let t = V(this.options, e || {});
		cl(this.options, t), this.updatePolling();
	}
	async setVariables(e) {
		return e = this.getVariablesWithDefaults(e), K(this.variables, e) || (this.options.variables = e, !this.hasObservers()) ? ro(this.getCurrentResult()) : this._reobserve({
			fetchPolicy: this.options.initialFetchPolicy,
			variables: e
		}, { newNetworkStatus: X.setVariables });
	}
	updateQuery(e) {
		let { queryManager: t } = this, { result: n, complete: r } = this.getCacheDiff({ optimistic: !1 }), i = e(n, {
			variables: this.variables,
			complete: !!r,
			previousData: n
		});
		i && (this.cache.writeQuery({
			query: this.options.query,
			data: i,
			variables: this.variables
		}), t.broadcastQueries());
	}
	startPolling(e) {
		this.options.pollInterval = e, this.updatePolling();
	}
	stopPolling() {
		this.options.pollInterval = 0, this.updatePolling();
	}
	applyNextFetchPolicy(e, t) {
		if (t.nextFetchPolicy) {
			let { fetchPolicy: n = "cache-first", initialFetchPolicy: r = n } = t;
			n === "standby" || (t.fetchPolicy = typeof t.nextFetchPolicy == "function" ? t.nextFetchPolicy.call(t, n, {
				reason: e,
				options: t,
				observable: this,
				initialFetchPolicy: r
			}) : e === "variables-changed" ? r : t.nextFetchPolicy);
		}
		return t.fetchPolicy;
	}
	fetch(e, t, n, r) {
		let i = this.options.fetchPolicy;
		e.context ??= {};
		let a = !1, { observable: o, fromLink: s } = this.queryManager.fetchObservableWithInfo(e, {
			networkStatus: t,
			query: n,
			onCacheHit: () => {
				a = !0;
			},
			fetchQueryOperator: (e) => new j((n) => {
				try {
					return e.subscribe({
						next(e) {
							a = !0, n.next(e);
						},
						error: (e) => n.error(e),
						complete: () => n.complete()
					});
				} finally {
					a || (u.override = t, this.input.next({
						kind: "N",
						source: "newNetworkStatus",
						value: { resetError: !0 },
						query: c,
						variables: l,
						meta: {
							shouldEmit: 3,
							fetchPolicy: i
						}
					}));
				}
			}),
			observableQuery: this
		}), { query: c, variables: l } = this, u = {
			abort: () => {
				f.unsubscribe();
			},
			query: c,
			variables: l
		};
		this.activeOperations.add(u);
		let d = t == X.refetch || t == X.setVariables;
		o = o.pipe(r, Di());
		let f = o.pipe(Ai({
			next: (e) => {
				e.source === "newNetworkStatus" || e.kind === "N" && e.value.loading ? u.override = t : delete u.override;
			},
			finalize: () => this.activeOperations.delete(u)
		})).subscribe({ next: (e) => {
			let t = {};
			d && e.kind === "N" && "loading" in e.value && !e.value.loading && (d = !1, t.shouldEmit = 1), this.input.next({
				...e,
				query: c,
				variables: l,
				meta: t
			});
		} });
		return {
			fromLink: s,
			subscription: f,
			observable: o
		};
	}
	didWarnCacheOnlyPolling = !1;
	updatePolling() {
		if (this.queryManager.ssrMode) return;
		let { pollingInfo: e, options: { fetchPolicy: t, pollInterval: n } } = this, r = () => {
			let { options: e } = this;
			return !e.pollInterval || !this.hasObservers() || e.fetchPolicy === "cache-only" || e.fetchPolicy === "standby";
		};
		if (r()) {
			this.cancelPolling();
			return;
		}
		if (e?.interval === n) return;
		let i = e || (this.pollingInfo = {});
		i.interval = n;
		let a = () => {
			if (r()) return this.cancelPolling();
			this.pollingInfo && (!Ds(this.networkStatus) && !this.options.skipPollAttempt?.() ? this._reobserve({ fetchPolicy: this.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only" }, { newNetworkStatus: X.poll }).then(o, o) : o());
		}, o = () => {
			let e = this.pollingInfo;
			e && (clearTimeout(e.timeout), e.timeout = setTimeout(a, e.interval));
		};
		o();
	}
	cancelPolling() {
		this.pollingInfo && (clearTimeout(this.pollingInfo.timeout), delete this.pollingInfo);
	}
	reobserve(e) {
		return this._reobserve(e);
	}
	_reobserve(e, t) {
		this.isTornDown = !1;
		let { newNetworkStatus: n } = t || {};
		this.queryManager.obsQueries.add(this);
		let r = n === X.refetch || n === X.poll, i = this.variables, a = this.options.fetchPolicy, o = V(this.options, e || {});
		this.variablesUnknown &&= o.fetchPolicy === "standby";
		let s = r ? o : cl(this.options, o), c = this.transformDocument(s.query);
		this.lastQuery = c, e && "variables" in e && (s.variables = this.getVariablesWithDefaults(e.variables)), r || (this.updatePolling(), e && e.variables && !K(e.variables, i) && s.fetchPolicy !== "standby" && (s.fetchPolicy === a || typeof s.nextFetchPolicy == "function") && (this.applyNextFetchPolicy("variables-changed", s), n === void 0 && (n = X.setVariables)));
		let l = this.networkStatus;
		n || (n = X.loading, l !== X.loading && e?.variables && !K(e.variables, i) && (n = X.setVariables), s.fetchPolicy === "standby" && (n = X.ready)), s.fetchPolicy === "standby" && this.cancelPolling(), this.resubscribeCache();
		let { promise: u, operator: d } = ml(s.fetchPolicy === "standby" ? { data: void 0 } : void 0), { subscription: f, observable: p, fromLink: m } = this.fetch(s, n, c, d);
		!r && (m || !this.linkSubscription) && (this.linkSubscription && this.linkSubscription.unsubscribe(), this.linkSubscription = f);
		let h = Object.assign(Ga(u.then((e) => ro(this.maskResult(e))).finally(() => {
			!this.hasObservers() && this.activeOperations.size === 0 && this.tearDownQuery();
		})), { retain: () => {
			let e = p.subscribe({}), t = () => e.unsubscribe();
			return u.then(t, t), h;
		} });
		return h;
	}
	hasObservers() {
		return this.subject.observed;
	}
	stop() {
		this.subject.complete(), this.initializeObservablesQueue(), this.tearDownQuery();
	}
	tearDownQuery() {
		this.isTornDown || (this.resetNotifications(), this.unsubscribeFromCache?.(), this.linkSubscription && (this.linkSubscription.unsubscribe(), delete this.linkSubscription), this.stopPolling(), this.subscriptions.forEach((e) => e.unsubscribe()), this.subscriptions.clear(), this.queryManager.obsQueries.delete(this), this.isTornDown = !0, this.abortActiveOperations(), this._lastWrite = void 0);
	}
	transformDocument(e) {
		return this.queryManager.transform(e);
	}
	maskResult(e) {
		let t = this.queryManager.maskOperation({
			document: this.query,
			data: e.data,
			fetchPolicy: this.options.fetchPolicy,
			cause: this
		});
		return t === e.data ? e : {
			...e,
			data: t
		};
	}
	dirty = !1;
	notifyTimeout;
	resetNotifications() {
		this.notifyTimeout &&= (clearTimeout(this.notifyTimeout), void 0), this.dirty = !1;
	}
	scheduleNotify() {
		this.dirty || (this.dirty = !0, this.notifyTimeout ||= setTimeout(() => this.notify(!0), 0));
	}
	notify(e = !1) {
		if (!e) {
			let e = this.queryManager.getDocumentInfo(this.query);
			if (e.hasClientExports || e.hasForcedResolvers) return;
		}
		let { dirty: t } = this;
		if (this.resetNotifications(), t && (this.options.fetchPolicy === "cache-only" || this.options.fetchPolicy === "cache-and-network" || !this.activeOperations.size)) {
			let e = this.getCacheDiff();
			K(e.result, this.getCacheDiff({ optimistic: !1 }).result) ? this.reobserveCacheFirst() : this.input.next({
				kind: "N",
				value: {
					data: e.result,
					dataState: e.complete ? "complete" : e.result ? "partial" : "empty",
					networkStatus: X.ready,
					loading: !1,
					error: void 0,
					partial: !e.complete
				},
				source: "cache",
				query: this.query,
				variables: this.variables,
				meta: {}
			});
		}
	}
	activeOperations = /* @__PURE__ */ new Set();
	pushOperation(e) {
		let t = !1, { query: n, variables: r } = this, i = () => {
			this.activeOperations.delete(a);
		}, a = {
			override: e,
			abort: () => {
				t = !0, i();
			},
			query: n,
			variables: r
		};
		return this.activeOperations.add(a), {
			finalize: i,
			pushNotification: (e, i) => {
				t || this.input.next({
					...e,
					query: n,
					variables: r,
					meta: { ...i }
				});
			}
		};
	}
	calculateNetworkStatus(e) {
		return e === X.streaming ? e : Array.from(this.activeOperations.values()).reverse().find((e) => pl(e, this) && e.override !== void 0)?.override ?? e;
	}
	abortActiveOperations() {
		this.activeOperations.forEach((e) => e.abort());
	}
	reset() {
		let e = this.options.fetchPolicy === "cache-only";
		this.setResult(e ? dl : ul, { shouldEmit: e ? 1 : 2 }), this.abortActiveOperations();
	}
	setResult(e, t) {
		this.input.next({
			source: "setResult",
			kind: "N",
			value: e,
			query: this.query,
			variables: this.variables,
			meta: { ...t }
		});
	}
	operator = io((e) => {
		let { query: t, meta: n } = e;
		if (e.source === "setResult") return {
			query: t,
			variables: this.variables,
			result: e.value,
			meta: n
		};
		if (e.kind === "C") return;
		let r = "resolvedVariables" in e ? e.resolvedVariables : void 0;
		if (e.query !== this.query) return;
		if (!K(r, this.variables)) {
			if (!K(e.variables, this.variables)) return;
			r && (this.options.variables = r, this.resubscribeCache());
		}
		let i = this.variables, a, o = this.subject.getValue();
		if (e.source === "cache") {
			if (a = e.value, a.networkStatus === X.ready && a.partial && (!this.options.returnPartialData || o.result.networkStatus === X.error) && this.options.fetchPolicy !== "cache-only") return;
		} else if (e.source === "network") this.waitForNetworkResult && (this.waitForNetworkResult = !1, this.resubscribeCache()), a = e.kind === "E" ? {
			...pl(o, e) || r && K(r, o.variables) ? o.result : {
				data: void 0,
				dataState: "empty",
				partial: !0
			},
			error: e.error,
			networkStatus: X.error,
			loading: !1
		} : e.value, e.kind === "E" && a.dataState === "streaming" && (a.dataState = "complete"), a.error && (n.shouldEmit = 1);
		else if (e.source === "newNetworkStatus") {
			let t = pl(o, e) ? o.result : this.getInitialResult(n.fetchPolicy), { resetError: r } = e.value, i = r ? void 0 : t.error, s = i ? X.error : X.ready;
			a = {
				...t,
				error: i,
				networkStatus: s
			};
		}
		return L(a), a.error || delete a.error, a.networkStatus = this.calculateNetworkStatus(a.networkStatus), a.loading = Ds(a.networkStatus), a = this.maskResult(a), o.result.data !== void 0 && a.data !== o.result.data && K(a.data, o.result.data) && (a.data = o.result.data), {
			query: t,
			variables: i,
			result: a,
			meta: n
		};
	});
	reobserveCacheFirst() {
		let { fetchPolicy: e, nextFetchPolicy: t } = this.options;
		e === "cache-and-network" || e === "network-only" ? this.reobserve({
			fetchPolicy: "cache-first",
			nextFetchPolicy(n, r) {
				return this.nextFetchPolicy = t, typeof this.nextFetchPolicy == "function" ? this.nextFetchPolicy(n, r) : e;
			}
		}) : this.reobserve();
	}
	getVariablesWithDefaults(e) {
		return this.queryManager.getVariables(this.query, e);
	}
};
function pl(e, t) {
	return !!(e && t && e.query === t.query && K(e.variables, t.variables));
}
function ml(e) {
	let t = e, n, r;
	return {
		promise: new Promise((e, t) => {
			n = e, r = t;
		}),
		operator: Ai({
			next(e) {
				if (e.kind === "E") return r(e.error);
				e.kind === "N" && e.source !== "newNetworkStatus" && !e.value.loading && (t = e.value);
			},
			finalize: () => {
				if (t) n(t);
				else {
					let e = "The operation was aborted.", t = "AbortError";
					r(typeof DOMException < "u" ? new DOMException(e, t) : Object.assign(/* @__PURE__ */ Error(e), { name: t }));
				}
			}
		})
	};
}
//#endregion
//#region node_modules/@apollo/client/core/QueryInfo.js
var hl = {}, gl = /* @__PURE__ */ new WeakMap();
function _l(e, t) {
	let n = e[t];
	typeof n == "function" && (e[t] = function() {
		return gl.set(e, (gl.get(e) + 1) % 0x38d7ea4c68000), n.apply(this, arguments);
	});
}
var vl = /* @__PURE__ */ new WeakMap(), yl = class {
	cache;
	queryManager;
	id;
	observableQuery;
	incremental;
	constructor(e, t) {
		let n = this.cache = e.cache, r = (vl.get(e) || 0) + 1;
		vl.set(e, r), this.id = r + "", this.observableQuery = t, this.queryManager = e, gl.has(n) || (gl.set(n, 0), _l(n, "evict"), _l(n, "modify"), _l(n, "reset"));
	}
	_lastWrite;
	get lastWrite() {
		return (this.observableQuery || this)._lastWrite;
	}
	set lastWrite(e) {
		(this.observableQuery || this)._lastWrite = e;
	}
	resetLastWrite() {
		this.lastWrite = void 0;
	}
	shouldWrite(e, t) {
		let { lastWrite: n } = this;
		return !(n && n.dmCount === gl.get(this.cache) && K(t, n.variables) && K(e.data, n.result.data) && e.extensions?.[Co] === n.result.extensions?.[Co]);
	}
	get hasNext() {
		return this.incremental ? this.incremental.hasNext : !1;
	}
	maybeHandleIncrementalResult(e, t, n) {
		let { incrementalHandler: r } = this.queryManager;
		return r.isIncrementalResult(t) ? (this.incremental ||= r.startRequest({ query: n }), this.incremental.handle(e, t)) : t;
	}
	markQueryResult(e, { document: t, variables: n, errorPolicy: r, cacheWriteBehavior: i }) {
		let a = {
			query: t,
			variables: n,
			returnPartialData: !0,
			optimistic: !0
		};
		this.observableQuery?.resetNotifications();
		let o = i === 0, s = o ? void 0 : this.cache.diff(a), c = this.maybeHandleIncrementalResult(s?.result, e, t);
		return o || (bl(c, r) ? this.cache.batch({
			onWatchUpdated: (e, t) => {
				e.watcher === this.observableQuery && (e.lastOwnDiff = t);
			},
			update: (e) => {
				if (this.shouldWrite(c, n)) e.writeQuery({
					query: t,
					data: c.data,
					variables: n,
					overwrite: i === 1,
					extensions: c.extensions
				}), this.lastWrite = {
					result: c,
					variables: n,
					dmCount: gl.get(this.cache)
				};
				else if (s && s.complete) {
					c = {
						...c,
						data: s.result
					};
					return;
				}
				let r = e.diff(a);
				r.complete && (c = {
					...c,
					data: r.result
				});
			}
		}) : this.lastWrite = void 0), c;
	}
	markMutationResult(e, t, n = this.cache) {
		let r = [], i = t.cacheWriteBehavior === 0, a = this.maybeHandleIncrementalResult(i ? void 0 : n.diff({
			id: "ROOT_MUTATION",
			query: this.queryManager.getDocumentInfo(t.document).asQuery,
			variables: t.variables,
			optimistic: !1,
			returnPartialData: !0
		}).result, e, t.document);
		if (t.errorPolicy === "ignore" && (a = {
			...a,
			errors: []
		}), Fa(a) && t.errorPolicy === "none") return Promise.resolve(a);
		let o = () => ({
			...a,
			dataState: this.hasNext ? "streaming" : "complete"
		});
		if (!i && bl(a, t.errorPolicy)) {
			r.push({
				result: a.data,
				dataId: "ROOT_MUTATION",
				query: t.document,
				variables: t.variables,
				extensions: a.extensions
			});
			let { updateQueries: e } = t;
			e && this.queryManager.getObservableQueries("all").forEach((t) => {
				let n = t && t.queryName;
				if (!n || !Object.hasOwnProperty.call(e, n)) return;
				let i = e[n], { query: a, variables: s } = t, { result: c, complete: l } = t.getCacheDiff({ optimistic: !1 });
				if (l && c) {
					let e = i(c, {
						mutationResult: o(),
						queryName: a && Ji(a) || void 0,
						queryVariables: s
					});
					e && r.push({
						result: e,
						dataId: "ROOT_QUERY",
						query: a,
						variables: s
					});
				}
			});
		}
		let s = t.refetchQueries;
		if (typeof s == "function" && (s = s(o())), r.length > 0 || (s || "").length > 0 || t.update || t.onQueryUpdated || t.removeOptimistic) {
			let e = [];
			if (this.queryManager.refetchQueries({
				updateCache: (e) => {
					i || r.forEach((t) => e.write(t));
					let { update: n } = t;
					if (n) {
						if (!i) {
							let n = e.diff({
								id: "ROOT_MUTATION",
								query: this.queryManager.getDocumentInfo(t.document).asQuery,
								variables: t.variables,
								optimistic: !1,
								returnPartialData: !0
							});
							n.complete && (a = {
								...a,
								data: n.result
							});
						}
						this.hasNext || n(e, a, {
							context: t.context,
							variables: t.variables
						});
					}
					!i && !t.keepRootFields && !this.hasNext && e.modify({
						id: "ROOT_MUTATION",
						fields(e, { fieldName: t, DELETE: n }) {
							return t === "__typename" ? e : n;
						}
					});
				},
				include: s,
				optimistic: !1,
				removeOptimistic: t.removeOptimistic,
				onQueryUpdated: t.onQueryUpdated || null
			}).forEach((t) => e.push(t)), t.awaitRefetchQueries || t.onQueryUpdated) return Promise.all(e).then(() => a);
		}
		return Promise.resolve(a);
	}
	markMutationOptimistic(e, t) {
		let n = typeof e == "function" ? e(t.variables, { IGNORE: hl }) : e;
		return n !== hl && (this.cache.recordOptimisticTransaction((e) => {
			try {
				this.markMutationResult({ data: n }, t, e);
			} catch (e) {
				L.error(e);
			}
		}, this.id), !0);
	}
	markSubscriptionResult(e, { document: t, variables: n, errorPolicy: r, cacheWriteBehavior: i }) {
		i !== 0 && (bl(e, r) && this.cache.write({
			query: t,
			result: e.data,
			dataId: "ROOT_SUBSCRIPTION",
			variables: n,
			extensions: e.extensions
		}), this.queryManager.broadcastQueries());
	}
};
function bl(e, t = "none") {
	let n = t === "ignore" || t === "all", r = !Fa(e);
	return !r && n && e.data && (r = !0), r;
}
//#endregion
//#region node_modules/@apollo/client/core/QueryManager.js
var xl = class {
	defaultOptions;
	client;
	clientOptions;
	assumeImmutableResults;
	documentTransform;
	ssrMode;
	defaultContext;
	dataMasking;
	incrementalHandler;
	localState;
	queryDeduplication;
	prioritizeCacheValues = !1;
	onBroadcast;
	mutationStore;
	obsQueries = /* @__PURE__ */ new Set();
	fetchCancelFns = /* @__PURE__ */ new Map();
	constructor(e) {
		let t = new vs((e) => this.cache.transformDocument(e), { cache: !1 });
		this.client = e.client, this.defaultOptions = e.defaultOptions, this.queryDeduplication = e.queryDeduplication, this.clientOptions = e.clientOptions, this.ssrMode = e.ssrMode, this.assumeImmutableResults = e.assumeImmutableResults, this.dataMasking = e.dataMasking, this.localState = e.localState, this.incrementalHandler = e.incrementalHandler;
		let n = e.documentTransform;
		this.documentTransform = n ? t.concat(n).concat(t) : t, this.defaultContext = e.defaultContext || {}, (this.onBroadcast = e.onBroadcast) && (this.mutationStore = {});
	}
	get link() {
		return this.client.link;
	}
	get cache() {
		return this.client.cache;
	}
	stop() {
		this.obsQueries.forEach((e) => e.stop()), this.cancelPendingFetches(R(90));
	}
	cancelPendingFetches(e) {
		this.fetchCancelFns.forEach((t) => t(e)), this.fetchCancelFns.clear();
	}
	async mutate({ mutation: e, variables: t, optimisticResponse: n, updateQueries: r, refetchQueries: i = [], awaitRefetchQueries: a = !1, update: o, onQueryUpdated: s, fetchPolicy: c, errorPolicy: l, keepRootFields: u, context: d }) {
		let f = new yl(this);
		e = this.cache.transformForLink(this.transform(e));
		let { hasClientExports: p } = this.getDocumentInfo(e);
		t = this.getVariables(e, t), p && (t = await this.localState.getExportedVariables({
			client: this.client,
			document: e,
			variables: t,
			context: d
		}));
		let m = this.mutationStore && (this.mutationStore[f.id] = {
			mutation: e,
			variables: t,
			loading: !0,
			error: null
		}), h = n && f.markMutationOptimistic(n, {
			document: e,
			variables: t,
			cacheWriteBehavior: c === "no-cache" ? 0 : 2,
			errorPolicy: l,
			context: d,
			updateQueries: r,
			update: o,
			keepRootFields: u
		});
		return this.broadcastQueries(), new Promise((p, ee) => {
			let te = {};
			return this.getObservableFromLink(e, {
				...d,
				optimisticResponse: h ? n : void 0
			}, t, c, {}, !1).observable.pipe(Sl(), gi((n) => {
				let p = { ...n };
				return oi(f.markMutationResult(p, {
					document: e,
					variables: t,
					cacheWriteBehavior: c === "no-cache" ? 0 : 2,
					errorPolicy: l,
					context: d,
					update: o,
					updateQueries: r,
					awaitRefetchQueries: a,
					refetchQueries: i,
					removeOptimistic: h ? f.id : void 0,
					onQueryUpdated: s,
					keepRootFields: u
				}));
			})).pipe(I((e) => {
				if (Fa(e) && l === "none") throw new el(wl(e));
				return m && (m.loading = !1, m.error = null), e;
			})).subscribe({
				next: (t) => {
					if (this.broadcastQueries(), !f.hasNext) {
						let n = { data: this.maskOperation({
							document: e,
							data: t.data,
							fetchPolicy: c,
							cause: te
						}) };
						Fa(t) && (n.error = new el(t)), Object.keys(t.extensions || {}).length && (n.extensions = t.extensions), p(n);
					}
				},
				error: (e) => {
					if (m && (m.loading = !1, m.error = e), h && this.cache.removeOptimistic(f.id), this.broadcastQueries(), l === "ignore") return p({ data: void 0 });
					if (l === "all") return p({
						data: void 0,
						error: e
					});
					ee(e);
				}
			});
		});
	}
	fetchQuery(e, t) {
		return ma(e.query, x.QUERY), (async () => pi(this.fetchObservableWithInfo(e, { networkStatus: t }).observable.pipe(io((e) => {
			switch (e.kind) {
				case "E": throw e.error;
				case "N": if (e.source !== "newNetworkStatus") return ro(e.value);
			}
		})), { defaultValue: { data: void 0 } }))();
	}
	transform(e) {
		return this.documentTransform.transformDocument(e);
	}
	transformCache = new da(z["queryManager.getDocumentInfo"] || 2e3);
	getDocumentInfo(e) {
		let { transformCache: t } = this;
		if (!t.has(e)) {
			let n = U(e), r = {
				hasClientExports: Ia(["client", "export"], e, !0),
				hasForcedResolvers: La(e),
				hasNonreactiveDirective: Ia(["nonreactive"], e),
				hasIncrementalDirective: Ia(["defer"], e),
				nonReactiveQuery: Cl(e),
				clientQuery: Ia(["client"], e) ? e : null,
				serverQuery: Ka([
					{
						name: "client",
						remove: !0
					},
					{ name: "connection" },
					{ name: "nonreactive" },
					{ name: "unmask" }
				], e),
				operationType: n?.operation,
				defaultVars: Sa(n),
				asQuery: {
					...e,
					definitions: e.definitions.map((e) => e.kind === "OperationDefinition" && e.operation !== "query" ? {
						...e,
						operation: "query"
					} : e)
				}
			};
			t.set(e, r);
		}
		let n = t.get(e);
		if (n.violation) throw n.violation;
		return n;
	}
	getVariables(e, t) {
		let n = this.getDocumentInfo(e).defaultVars, r = Object.entries(t ?? {}).map(([e, t]) => [e, t === void 0 ? n[e] : t]);
		return {
			...n,
			...Object.fromEntries(r)
		};
	}
	watchQuery(e) {
		ma(e.query, x.QUERY);
		let t = this.transform(e.query);
		return e = {
			...e,
			variables: this.getVariables(t, e.variables)
		}, e.notifyOnNetworkStatusChange === void 0 && (e.notifyOnNetworkStatusChange = !0), new fl({
			queryManager: this,
			options: e,
			transformedQuery: t
		});
	}
	query(e) {
		let t = this.transform(e.query);
		return this.fetchQuery({
			...e,
			query: t
		}).then((n) => ({
			...n,
			data: this.maskOperation({
				document: t,
				data: n?.data,
				fetchPolicy: e.fetchPolicy
			})
		}));
	}
	clearStore(e = { discardWatches: !0 }) {
		return this.cancelPendingFetches(R(92)), this.obsQueries.forEach((e) => {
			e.reset();
		}), this.mutationStore &&= {}, this.cache.reset(e);
	}
	getObservableQueries(e = "active") {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
		return Array.isArray(e) && e.forEach((e) => {
			if (typeof e == "string") n.set(e, e), r.set(e, !1);
			else if (Ra(e)) {
				let t = bs(this.transform(e));
				n.set(t, Ji(e)), r.set(t, !1);
			} else H(e) && e.query && i.add(e);
		}), this.obsQueries.forEach((n) => {
			let i = bs(this.transform(n.options.query));
			if (e === "all") {
				t.add(n);
				return;
			}
			let { queryName: a, options: { fetchPolicy: o } } = n;
			(e !== "active" || o !== "standby") && (e === "active" || a && r.has(a) || i && r.has(i)) && (t.add(n), a && r.set(a, !0), i && r.set(i, !0));
		}), i.size && i.forEach((e) => {
			let n = new fl({
				queryManager: this,
				options: {
					...Wa(this.defaultOptions.watchQuery, e),
					fetchPolicy: "network-only"
				}
			});
			t.add(n);
		}), t;
	}
	refetchObservableQueries(e = !1) {
		let t = [];
		return this.getObservableQueries(e ? "all" : "active").forEach((n) => {
			let { fetchPolicy: r } = n.options;
			(e || r !== "standby") && r !== "cache-only" && t.push(n.refetch());
		}), this.broadcastQueries(), Promise.all(t);
	}
	startGraphQLSubscription(e) {
		let { query: t, variables: n } = e, { fetchPolicy: r = "cache-first", errorPolicy: i = "none", context: a = {}, extensions: o = {} } = e;
		ma(t, x.SUBSCRIPTION), t = this.transform(t), n = this.getVariables(t, n);
		let s, c = (this.getDocumentInfo(t).hasClientExports ? oi(this.localState.getExportedVariables({
			client: this.client,
			document: t,
			variables: n,
			context: a
		})) : si(n)).pipe(gi((e) => {
			let { observable: n, restart: c } = this.getObservableFromLink(t, a, e, r, o), l = new yl(this);
			return s = c, n.pipe(I((n) => {
				l.markSubscriptionResult(n, {
					document: t,
					variables: e,
					errorPolicy: i,
					cacheWriteBehavior: r === "no-cache" ? 0 : 2
				});
				let a = { data: n.data ?? void 0 };
				return Fa(n) ? a.error = new el(n) : ol(n) && (a.error = n.extensions[al], delete n.extensions[al]), n.extensions && Object.keys(n.extensions).length && (a.extensions = n.extensions), a.error && i === "none" && (a.data = void 0), i === "ignore" && delete a.error, a;
			}), Si((e) => si(i === "ignore" ? { data: void 0 } : {
				data: void 0,
				error: e
			})), xi((e) => !!(e.data || e.error)));
		}));
		return Object.assign(c, { restart: () => s?.() });
	}
	broadcastQueries() {
		this.onBroadcast && this.onBroadcast(), this.obsQueries.forEach((e) => e.notify());
	}
	inFlightLinkObservables = new B(!1);
	getObservableFromLink(e, t, n, r, i, a = t?.queryDeduplication ?? this.queryDeduplication) {
		let o = {}, { serverQuery: s, clientQuery: c, operationType: l, hasIncrementalDirective: u } = this.getDocumentInfo(e), d = Ji(e), f = { client: this.client };
		if (s) {
			let { inFlightLinkObservables: e, link: r } = this;
			try {
				let c = this.incrementalHandler.prepareRequest({
					query: s,
					variables: n,
					context: {
						...this.defaultContext,
						...t,
						queryDeduplication: a
					},
					extensions: i
				});
				t = c.context;
				function u(e) {
					return new j((t) => {
						function n() {
							return e.subscribe({
								next: t.next.bind(t),
								complete: t.complete.bind(t),
								error: t.error.bind(t)
							});
						}
						let r = n();
						return o.restart ||= () => {
							r.unsubscribe(), r = n();
						}, () => {
							r.unsubscribe(), o.restart = void 0;
						};
					});
				}
				if (a) {
					let t = bs(s), i = W(n);
					o = e.lookup(t, i), o.observable || (o.observable = gs(r, c, f).pipe(u, Ti(() => {
						e.peek(t, i) === o && e.remove(t, i);
					}), l === x.SUBSCRIPTION ? Di() : ki({ refCount: !0 })));
				} else o.observable = gs(r, c, f).pipe(u);
			} catch (e) {
				o.observable = ci(() => e);
			}
		} else o.observable = si({ data: {} });
		if (c) {
			let { operation: i } = U(e);
			L(!u, 97, i[0].toUpperCase() + i.slice(1), d ?? "(anonymous)"), o.observable = o.observable.pipe(gi((e) => oi(this.localState.execute({
				client: this.client,
				document: c,
				remoteResult: e,
				context: t,
				variables: n,
				fetchPolicy: r
			}))));
		}
		return {
			restart: () => o.restart?.(),
			observable: o.observable.pipe(Si((e) => {
				throw e = sl(e), nl(e), e;
			}))
		};
	}
	getResultsFromLink(e, { queryInfo: t, cacheWriteBehavior: n, observableQuery: r, exposeExtensions: i }) {
		let { errorPolicy: a } = e, o = this.cache.transformForLink(e.query);
		return this.getObservableFromLink(o, e.context, e.variables, e.fetchPolicy).observable.pipe(I((s) => {
			let c = t.markQueryResult(s, {
				...e,
				document: o,
				cacheWriteBehavior: n
			}), l = Fa(c);
			if (l && a === "none") throw t.resetLastWrite(), r?.resetNotifications(), new el(wl(c));
			let u = {
				data: c.data,
				...t.hasNext ? {
					loading: !0,
					networkStatus: X.streaming,
					dataState: "streaming",
					partial: !0
				} : {
					dataState: c.data ? "complete" : "empty",
					loading: !1,
					networkStatus: X.ready,
					partial: !c.data
				}
			};
			return i && "extensions" in c && (u[So] = c.extensions), l && (a === "none" && (u.data = void 0, u.dataState = "empty"), a !== "ignore" && (u.error = new el(wl(c)), u.dataState !== "streaming" && (u.networkStatus = X.error))), u;
		}), Si((e) => {
			if (a === "none") throw t.resetLastWrite(), r?.resetNotifications(), e;
			let n = {
				data: void 0,
				dataState: "empty",
				loading: !1,
				networkStatus: X.ready,
				partial: !0
			};
			return a !== "ignore" && (n.error = e, n.networkStatus = X.error), si(n);
		}));
	}
	fetchObservableWithInfo(e, { networkStatus: t = X.loading, query: n = e.query, fetchQueryOperator: r = (e) => e, onCacheHit: i = () => {}, observableQuery: a, exposeExtensions: o }) {
		let s = this.getVariables(n, e.variables), { fetchPolicy: c = "cache-first", errorPolicy: l = "none", returnPartialData: u = !1, notifyOnNetworkStatusChange: d = !0, context: f = {} } = e;
		this.prioritizeCacheValues && (c === "network-only" || c === "cache-and-network") && (c = "cache-first");
		let p = Object.assign({}, e, {
			query: n,
			variables: s,
			fetchPolicy: c,
			errorPolicy: l,
			returnPartialData: u,
			notifyOnNetworkStatusChange: d,
			context: f
		}), m = new yl(this, a), h = (n) => {
			p.variables = n;
			let s = c === "no-cache" ? 0 : t === X.refetch && p.refetchWritePolicy !== "merge" ? 1 : 2, l = this.fetchQueryByPolicy(p, {
				queryInfo: m,
				cacheWriteBehavior: s,
				onCacheHit: i,
				observableQuery: a,
				exposeExtensions: o
			});
			return l.observable = l.observable.pipe(r), p.fetchPolicy !== "standby" && a?.applyNextFetchPolicy("after-fetch", e), l;
		}, ee = () => {
			this.fetchCancelFns.delete(m.id);
		};
		this.fetchCancelFns.set(m.id, (e) => {
			te.next({
				kind: "E",
				error: e,
				source: "network"
			});
		});
		let te = new br(), ne, re;
		if (this.getDocumentInfo(p.query).hasClientExports) ne = oi(this.localState.getExportedVariables({
			client: this.client,
			document: p.query,
			variables: p.variables,
			context: p.context
		})).pipe(gi((e) => h(e).observable)), re = !0;
		else {
			let e = h(p.variables);
			re = e.fromLink, ne = e.observable;
		}
		return {
			observable: new j((e) => {
				e.add(ee), ne.subscribe(e), te.subscribe(e);
			}).pipe(Di()),
			fromLink: re
		};
	}
	refetchQueries({ updateCache: e, include: t, optimistic: n = !1, removeOptimistic: r = n ? Fi("refetchQueries") : void 0, onQueryUpdated: i }) {
		let a = /* @__PURE__ */ new Map();
		t && this.getObservableQueries(t).forEach((e) => {
			if (e.options.fetchPolicy === "cache-only" || e.variablesUnknown) return;
			let t = e.getCurrentResult();
			a.set(e, {
				oq: e,
				lastDiff: {
					result: t?.data,
					complete: !t?.partial
				}
			});
		});
		let o = /* @__PURE__ */ new Map();
		if (e) {
			let t = /* @__PURE__ */ new Set();
			this.cache.batch({
				update: e,
				optimistic: n && r || !1,
				removeOptimistic: r,
				onWatchUpdated(e, n, r) {
					let s = e.watcher;
					if (s instanceof fl && !t.has(s)) {
						if (t.add(s), i) {
							a.delete(s);
							let e = i(s, n, r);
							return e === !0 && (e = s.refetch().retain()), e !== !1 && o.set(s, e), e;
						}
						i !== null && s.options.fetchPolicy !== "cache-only" && a.set(s, {
							oq: s,
							lastDiff: r,
							diff: n
						});
					}
				}
			});
		}
		return a.size && a.forEach(({ oq: e, lastDiff: t, diff: n }) => {
			let r;
			i && (n ||= e.getCacheDiff(), r = i(e, n, t)), (!i || r === !0) && (r = e.refetch().retain()), r !== !1 && o.set(e, r);
		}), r && this.cache.removeOptimistic(r), o;
	}
	noCacheWarningsByCause = /* @__PURE__ */ new WeakSet();
	maskOperation(e) {
		let { document: t, data: n } = e;
		return this.dataMasking ? oc(n, t, this.cache) : n;
	}
	maskFragment(e) {
		let { data: t, fragment: n, fragmentName: r } = e;
		return this.dataMasking ? ac(t, n, this.cache, r) : t;
	}
	fetchQueryByPolicy({ query: e, variables: t, fetchPolicy: n, errorPolicy: r, returnPartialData: i, context: a }, { cacheWriteBehavior: o, onCacheHit: s, queryInfo: c, observableQuery: l, exposeExtensions: u }) {
		let d = () => this.cache.diff({
			query: e,
			variables: t,
			returnPartialData: !0,
			optimistic: !0
		}), f = (o, c) => {
			let l = o.result, u = (e) => (!o.complete && !i && (e = void 0), {
				data: e,
				dataState: o.complete ? "complete" : e ? "partial" : "empty",
				loading: Ds(c),
				networkStatus: c,
				partial: !o.complete
			}), d = (e) => si({
				kind: "N",
				value: u(e),
				resolvedVariables: t,
				source: "cache"
			});
			return (o.complete || i) && this.getDocumentInfo(e).hasForcedResolvers ? (s(), oi(this.localState.execute({
				client: this.client,
				document: e,
				remoteResult: l ? { data: l } : void 0,
				context: a,
				variables: t,
				onlyRunForcedResolvers: !0,
				returnPartialData: !0,
				fetchPolicy: n
			}).then((e) => ({
				kind: "N",
				value: u(e.data || void 0),
				resolvedVariables: t,
				source: "cache"
			})))) : r === "none" && c === X.refetch && o.missing ? d(void 0) : d(l || void 0);
		}, p = () => this.getResultsFromLink({
			query: e,
			variables: t,
			context: a,
			fetchPolicy: n,
			errorPolicy: r
		}, {
			cacheWriteBehavior: o,
			queryInfo: c,
			observableQuery: l,
			exposeExtensions: u
		}).pipe(Sl(), Ei(), I((e) => ({
			...e,
			resolvedVariables: t,
			source: "network"
		})));
		switch (n) {
			default:
			case "cache-first": {
				let e = d();
				return e.complete ? {
					fromLink: !1,
					observable: f(e, X.ready)
				} : i ? {
					fromLink: !0,
					observable: yi(f(e, X.loading), p())
				} : {
					fromLink: !0,
					observable: p()
				};
			}
			case "cache-and-network": {
				let e = d();
				return e.complete || i ? {
					fromLink: !0,
					observable: yi(f(e, X.loading), p())
				} : {
					fromLink: !0,
					observable: p()
				};
			}
			case "cache-only": return {
				fromLink: !1,
				observable: yi(f(d(), X.ready))
			};
			case "network-only": return {
				fromLink: !0,
				observable: p()
			};
			case "no-cache": return {
				fromLink: !0,
				observable: p()
			};
			case "standby": return {
				fromLink: !1,
				observable: Ar
			};
		}
	}
};
function Sl() {
	let e = !1;
	return Ai({
		next() {
			e = !0;
		},
		complete() {
			L(e, 101);
		}
	});
}
function Cl(e) {
	return T(e, { FragmentSpread: (e) => {
		if (!e.directives?.some((e) => e.name.value === "unmask")) return {
			...e,
			directives: [...e.directives || [], {
				kind: S.DIRECTIVE,
				name: {
					kind: S.NAME,
					value: "nonreactive"
				}
			}]
		};
	} });
}
function wl(e) {
	if (e.extensions?.[Co] == null) return e;
	let { extensions: { [Co]: t, ...n }, ...r } = e;
	return Object.keys(n).length > 0 && (r.extensions = n), r;
}
//#endregion
//#region node_modules/@apollo/client/core/ApolloClient.js
var Tl = class {
	link;
	cache;
	disableNetworkFetches;
	set prioritizeCacheValues(e) {
		this.queryManager.prioritizeCacheValues = e;
	}
	get prioritizeCacheValues() {
		return this.queryManager.prioritizeCacheValues;
	}
	version;
	queryDeduplication;
	defaultOptions;
	devtoolsConfig;
	refetchEventManager;
	queryManager;
	devToolsHookCb;
	resetStoreCallbacks = [];
	clearStoreCallbacks = [];
	constructor(e) {
		let { cache: t, documentTransform: n, ssrMode: r = !1, ssrForceFetchDelay: i = 0, queryDeduplication: a = !0, defaultOptions: o, defaultContext: s, assumeImmutableResults: c = t.assumeImmutableResults, localState: l, devtools: u, dataMasking: d, link: f, incrementalHandler: p = new fs(), experiments: m = [], refetchEventManager: h } = e;
		this.link = f, this.cache = t, this.queryDeduplication = a, this.defaultOptions = o || {}, this.devtoolsConfig = {
			...u,
			enabled: u?.enabled ?? !1
		}, this.watchQuery = this.watchQuery.bind(this), this.query = this.query.bind(this), this.mutate = this.mutate.bind(this), this.watchFragment = this.watchFragment.bind(this), this.resetStore = this.resetStore.bind(this), this.reFetchObservableQueries = this.refetchObservableQueries = this.refetchObservableQueries.bind(this), this.version = Ni, this.queryManager = new xl({
			client: this,
			defaultOptions: this.defaultOptions,
			defaultContext: s,
			documentTransform: n,
			queryDeduplication: a,
			ssrMode: r,
			dataMasking: !!d,
			clientOptions: e,
			incrementalHandler: p,
			assumeImmutableResults: c,
			onBroadcast: this.devtoolsConfig.enabled ? () => {
				this.devToolsHookCb && this.devToolsHookCb();
			} : void 0,
			localState: l
		}), this.prioritizeCacheValues = r || i > 0, i && setTimeout(() => {
			this.prioritizeCacheValues = !1;
		}, i), this.devtoolsConfig.enabled && this.connectToDevTools(), m.forEach((t) => t.call(this, e)), this.refetchEventManager = h, this.refetchEventManager?.connect(this);
	}
	connectToDevTools() {
		if (typeof window > "u") return;
		let e = window, t = Symbol.for("apollo.devtools");
		(e[t] = e[t] || []).push(this), e.__APOLLO_CLIENT__ = this;
	}
	get documentTransform() {
		return this.queryManager.documentTransform;
	}
	get localState() {
		return this.queryManager.localState;
	}
	set localState(e) {
		this.queryManager.localState = e;
	}
	stop() {
		this.queryManager.stop(), this.refetchEventManager?.disconnect(this);
	}
	watchQuery(e) {
		let { refetchOn: t } = e;
		if (this.defaultOptions.watchQuery) {
			let n = this.defaultOptions.watchQuery.refetchOn, r;
			t && typeof t == "object" && (typeof n == "object" ? r = {
				...n,
				...t
			} : n != null && (r = (e) => {
				let r = t[e.source] ?? n;
				return typeof r == "function" ? r(e) : r;
			})), e = Wa(this.defaultOptions.watchQuery, e), r && (e.refetchOn = r);
		}
		return this.queryManager.watchQuery(e);
	}
	query = (e) => (this.defaultOptions.query && (e = Wa(this.defaultOptions.query, e)), this.queryManager.query(e));
	mutate = (e) => {
		let t = Wa(V({
			fetchPolicy: "network-only",
			errorPolicy: "none"
		}, this.defaultOptions.mutate), e);
		return ma(t.mutation, x.MUTATION), this.queryManager.mutate(t);
	};
	subscribe(e) {
		let t = {}, n = this.queryManager.startGraphQLSubscription(e), r = n.pipe(I((n) => ({
			...n,
			data: this.queryManager.maskOperation({
				document: e.query,
				data: n.data,
				fetchPolicy: e.fetchPolicy,
				cause: t
			})
		})));
		return Object.assign(r, { restart: n.restart });
	}
	readQuery(e, t = !!e.optimistic) {
		return this.cache.readQuery({
			...e,
			query: this.transform(e.query)
		}, t);
	}
	watchFragment(e) {
		let t = this.queryManager.dataMasking;
		return this.cache.watchFragment({
			...e,
			fragment: this.transform(e.fragment, t)
		});
	}
	readFragment(e, t = !!e.optimistic) {
		return this.cache.readFragment({
			...e,
			fragment: this.transform(e.fragment)
		}, t);
	}
	writeQuery(e) {
		let t = this.cache.writeQuery(e);
		return e.broadcast !== !1 && this.queryManager.broadcastQueries(), t;
	}
	writeFragment(e) {
		let t = this.cache.writeFragment(e);
		return e.broadcast !== !1 && this.queryManager.broadcastQueries(), t;
	}
	__actionHookForDevTools(e) {
		this.devToolsHookCb = e;
	}
	__requestRaw(e) {
		return gs(this.link, e, { client: this });
	}
	resetStore() {
		return Promise.resolve().then(() => this.queryManager.clearStore({ discardWatches: !1 })).then(() => Promise.all(this.resetStoreCallbacks.map((e) => e()))).then(() => this.refetchObservableQueries());
	}
	clearStore() {
		return Promise.resolve().then(() => this.queryManager.clearStore({ discardWatches: !0 })).then(() => Promise.all(this.clearStoreCallbacks.map((e) => e())));
	}
	onResetStore(e) {
		return this.resetStoreCallbacks.push(e), () => {
			this.resetStoreCallbacks = this.resetStoreCallbacks.filter((t) => t !== e);
		};
	}
	onClearStore(e) {
		return this.clearStoreCallbacks.push(e), () => {
			this.clearStoreCallbacks = this.clearStoreCallbacks.filter((t) => t !== e);
		};
	}
	reFetchObservableQueries;
	refetchObservableQueries(e) {
		return this.queryManager.refetchObservableQueries(e);
	}
	refetchQueries(e) {
		let t = this.queryManager.refetchQueries(e), n = [], r = [];
		t.forEach((e, t) => {
			n.push(t), r.push(e);
		});
		let i = Promise.all(r);
		return i.queries = n, i.results = r, i.catch((e) => {}), i;
	}
	getObservableQueries(e = "active") {
		return this.queryManager.getObservableQueries(e);
	}
	extract(e) {
		return this.cache.extract(e);
	}
	restore(e) {
		return this.cache.restore(e);
	}
	setLink(e) {
		this.link = e;
	}
	get defaultContext() {
		return this.queryManager.defaultContext;
	}
	maskedFragmentTransform = new vs(Za);
	transform(e, t = !1) {
		let n = this.queryManager.transform(e);
		return t ? this.maskedFragmentTransform.transformDocument(n) : n;
	}
}, { hasOwnProperty: El } = Object.prototype;
function Dl(e) {
	return H(e) && "payload" in e;
}
async function* Ol(e) {
	let t = new TextDecoder("utf-8"), n = (e.headers?.get("content-type"))?.match(/;\s*boundary=(?:'([^']+)'|"([^"]+)"|([^"'].+?))\s*(?:;|$)/i), r = "\r\n--" + (n ? n[1] ?? n[2] ?? n[3] ?? "-" : "-"), i = "";
	L(e.body && typeof e.body.getReader == "function", 62);
	let a = e.body.getReader(), o = !1, s = !1, c, l = () => s && i[0] == "-" && i[1] == "-";
	try {
		for (; !o;) {
			({value: c, done: o} = await a.read());
			let e = typeof c == "string" ? c : t.decode(c, { stream: !o }), n = i.length - r.length + 1;
			i += e;
			let u = i.indexOf(r, n);
			for (; u > -1 && !l();) {
				s = !0;
				let e;
				[e, i] = [i.slice(0, u), i.slice(u + r.length)];
				let t = e.indexOf("\r\n\r\n"), n = Al(e.slice(0, t))["content-type"];
				if (n && n.toLowerCase().indexOf("application/json") === -1) throw Error("Unsupported patch content type: application/json is required.");
				let a = e.slice(t);
				a && (yield a), u = i.indexOf(r);
			}
			if (l()) return;
		}
		throw Error("premature end of multipart body");
	} finally {
		a.cancel();
	}
}
async function kl(e, t) {
	for await (let n of Ol(e)) {
		let r = jl(e, n);
		if (Object.keys(r).length != 0) {
			if (Dl(r)) {
				if (Object.keys(r).length === 1 && r.payload === null) return;
				let e = { ...r.payload };
				"errors" in r && (e.extensions = {
					...e.extensions,
					[al]: new Xc(r.errors ?? [])
				}), t(e);
			} else t(r);
		}
	}
}
function Al(e) {
	let t = {};
	return e.split("\n").forEach((e) => {
		let n = e.indexOf(":");
		if (n > -1) {
			let r = e.slice(0, n).trim().toLowerCase(), i = e.slice(n + 1).trim();
			t[r] = i;
		}
	}), t;
}
function jl(e, t) {
	if (e.status >= 300) throw new rl(`Response not successful: Received status code ${e.status}`, {
		response: e,
		bodyText: t
	});
	try {
		return JSON.parse(t);
	} catch (n) {
		throw new il(n, {
			response: e,
			bodyText: t
		});
	}
}
function Ml(e, t) {
	try {
		return JSON.parse(t);
	} catch (n) {
		throw new il(n, {
			response: e,
			bodyText: t
		});
	}
}
function Nl(e, t) {
	return e.headers.get("content-type")?.includes("application/graphql-response+json") ? Ml(e, t) : jl(e, t);
}
function Pl(e) {
	return (t) => t.text().then((n) => {
		let r = Nl(t, n);
		if (!Array.isArray(r) && !El.call(r, "data") && !El.call(r, "errors")) throw new rl(`Server response was malformed for query '${Array.isArray(e) ? e.map((e) => e.operationName) : e.operationName}'.`, {
			response: t,
			bodyText: n
		});
		return r;
	});
}
var Fl = {
	http: {
		includeQuery: !0,
		includeExtensions: !0,
		preserveHeaderCase: !1
	},
	headers: {
		accept: "application/graphql-response+json,application/json;q=0.9",
		"content-type": "application/json"
	},
	options: { method: "POST" }
}, Il = (e, t) => t(e);
function Ll(e, t, ...n) {
	let r = {}, i = {};
	n.forEach((e) => {
		r = {
			...r,
			...e.options,
			headers: {
				...r.headers,
				...e.headers
			}
		}, e.credentials && (r.credentials = e.credentials), r.headers.accept = (e.http?.accept || []).concat(r.headers.accept).join(","), i = {
			...i,
			...e.http
		};
	}), r.headers = Rl(r.headers, i.preserveHeaderCase);
	let { operationName: a, extensions: o, variables: s, query: c } = e, l = {
		operationName: a,
		variables: s
	};
	return i.includeExtensions && Object.keys(o || {}).length && (l.extensions = o), i.includeQuery && (l.query = t(c, bs)), {
		options: r,
		body: l
	};
}
function Rl(e, t) {
	if (!t) {
		let t = {};
		return Object.keys(Object(e)).forEach((n) => {
			t[n.toLowerCase()] = e[n];
		}), t;
	}
	let n = {};
	Object.keys(Object(e)).forEach((t) => {
		n[t.toLowerCase()] = {
			originalName: t,
			value: e[t]
		};
	});
	let r = {};
	return Object.keys(n).forEach((e) => {
		r[n[e].originalName] = n[e].value;
	}), r;
}
//#endregion
//#region node_modules/@apollo/client/link/http/checkFetcher.js
var zl = (e, t) => e.getContext().uri || (typeof t == "function" ? t(e) : t || "/graphql");
//#endregion
//#region node_modules/@apollo/client/link/http/rewriteURIForGET.js
function Bl(e, t) {
	let n = [], r = (e, t) => {
		n.push(`${e}=${encodeURIComponent(t)}`);
	};
	if ("query" in t && r("query", t.query), t.operationName && r("operationName", t.operationName), t.variables) {
		let e;
		try {
			e = JSON.stringify(t.variables);
		} catch (e) {
			return { parseError: e };
		}
		r("variables", e);
	}
	if (t.extensions) {
		let e;
		try {
			e = JSON.stringify(t.extensions);
		} catch (e) {
			return { parseError: e };
		}
		r("extensions", e);
	}
	let i = "", a = e, o = e.indexOf("#");
	o !== -1 && (i = e.substr(o), a = e.substr(0, o));
	let s = a.indexOf("?") === -1 ? "?" : "&";
	return { newURI: a + s + n.join("&") + i };
}
//#endregion
//#region node_modules/@apollo/client/link/http/BaseHttpLink.js
var Vl = ji(() => fetch);
function Hl() {}
var Ul = class extends hs {
	constructor(e = {}) {
		let { uri: t = "/graphql", fetch: n, print: r = Il, includeExtensions: i, preserveHeaderCase: a, useGETForQueries: o, includeUnusedVariables: s = !1, ...c } = e, l = {
			http: V({
				includeExtensions: i,
				preserveHeaderCase: a
			}),
			options: c.fetchOptions,
			credentials: c.credentials,
			headers: c.headers
		};
		super((e) => {
			let i = zl(e, t), a = e.getContext(), c = { ...a.http };
			Ts(e.query) && (c.accept = ["multipart/mixed;boundary=graphql;subscriptionSpec=1.0", ...c.accept || []]);
			let u = {
				http: c,
				options: a.fetchOptions,
				credentials: a.credentials,
				headers: a.headers
			}, { options: d, body: f } = Ll(e, r, Fl, l, u);
			f.variables && !s && (f.variables = ms(f.variables, e.query));
			let p = new AbortController(), m = () => {
				p = void 0;
			};
			if (d.signal) {
				let e = d.signal, t = () => {
					p?.abort(e.reason);
				};
				e.addEventListener("abort", t, { once: !0 }), m = () => {
					p?.signal.removeEventListener("abort", m), p = void 0, e.removeEventListener("abort", t), m = Hl;
				}, p.signal.addEventListener("abort", m, { once: !0 });
			}
			return d.signal = p.signal, o && !ws(e.query) && (d.method = "GET"), new j((t) => {
				if (d.method === "GET") {
					let { newURI: e, parseError: t } = Bl(i, f);
					if (t) throw t;
					i = e;
				} else d.body = JSON.stringify(f);
				let r = n || ji(() => fetch) || Vl, a = t.next.bind(t);
				return r(i, d).then((t) => {
					e.setContext({ response: t });
					let n = t.headers?.get("content-type");
					return n !== null && /^multipart\/mixed/i.test(n) ? kl(t, a) : Pl(e)(t).then(a);
				}).then(() => {
					m(), t.complete();
				}).catch((e) => {
					m(), t.error(e);
				}), () => {
					p && p.abort();
				};
			});
		});
	}
}, Wl = class extends hs {
	constructor(e = {}) {
		super((t, n) => {
			let r = t.client, i = r.queryManager.clientOptions, a = t.getContext();
			{
				let { name: n, version: r, transport: o = "headers" } = V({}, i.clientAwareness, e.clientAwareness, a.clientAwareness);
				o === "headers" && t.setContext(({ headers: e }) => ({ headers: V({
					"apollographql-client-name": n,
					"apollographql-client-version": r
				}, e) }));
			}
			{
				let { transport: n = "extensions" } = V({}, i.enhancedClientAwareness, e.enhancedClientAwareness);
				n === "extensions" && (t.extensions = V({ clientLibrary: {
					name: "@apollo/client",
					version: r.version
				} }, t.extensions)), n === "headers" && t.setContext(({ headers: e }) => ({ headers: V({
					"apollographql-library-name": "@apollo/client",
					"apollographql-library-version": r.version
				}, e) }));
			}
			return n(t);
		});
	}
}, Gl = class extends hs {
	constructor(e = {}) {
		let { left: t, right: n, request: r } = hs.from([new Wl(e), new Ul(e)]);
		super(r), Object.assign(this, {
			left: t,
			right: n
		});
	}
}, Kl = /* @__PURE__ */ new Map(), ql = /* @__PURE__ */ new Map(), Jl = !0, Yl = !1;
function Xl(e) {
	return e.replace(/[\s,]+/g, " ").trim();
}
function Zl(e) {
	return Xl(e.source.body.substring(e.start, e.end));
}
function Ql(e) {
	var t = /* @__PURE__ */ new Set(), n = [];
	return e.definitions.forEach(function(e) {
		if (e.kind === "FragmentDefinition") {
			var r = e.name.value, i = Zl(e.loc), a = ql.get(r);
			a && !a.has(i) ? Jl && console.warn("Warning: fragment with name " + r + " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names") : a || ql.set(r, a = /* @__PURE__ */ new Set()), a.add(i), t.has(i) || (t.add(i), n.push(e));
		} else n.push(e);
	}), kn(kn({}, e), { definitions: n });
}
function $l(e) {
	var t = new Set(e.definitions);
	t.forEach(function(e) {
		e.loc && delete e.loc, Object.keys(e).forEach(function(n) {
			var r = e[n];
			r && typeof r == "object" && t.add(r);
		});
	});
	var n = e.loc;
	return n && (delete n.startToken, delete n.endToken), e;
}
function eu(e) {
	var t = Xl(e);
	if (!Kl.has(t)) {
		var n = pn(e, {
			experimentalFragmentVariables: Yl,
			allowLegacyFragmentVariables: Yl,
			experimentalFragmentArguments: Yl
		});
		if (!n || n.kind !== "Document") throw Error("Not a valid GraphQL document.");
		Kl.set(t, $l(Ql(n)));
	}
	return Kl.get(t);
}
function tu(e) {
	var t = [...arguments].slice(1);
	typeof e == "string" && (e = [e]);
	var n = e[0];
	return t.forEach(function(t, r) {
		t && t.kind === "Document" ? n += t.loc.source.body : n += t, n += e[r + 1];
	}), eu(n);
}
function nu() {
	Kl.clear(), ql.clear();
}
function ru() {
	Jl = !1;
}
function iu() {
	Yl = !0;
}
function au() {
	Yl = !1;
}
var ou = {
	gql: tu,
	resetCaches: nu,
	disableFragmentWarnings: ru,
	enableExperimentalFragmentVariables: iu,
	disableExperimentalFragmentVariables: au
};
(function(e) {
	e.gql = ou.gql, e.resetCaches = ou.resetCaches, e.disableFragmentWarnings = ou.disableFragmentWarnings, e.enableExperimentalFragmentVariables = ou.enableExperimentalFragmentVariables, e.disableExperimentalFragmentVariables = ou.disableExperimentalFragmentVariables;
})(tu ||= {}), tu.default = tu;
//#endregion
//#region src/lib/apollo.ts
var su = (e) => new Tl({
	link: new Gl({
		uri: e,
		headers: { "ngrok-skip-browser-warning": "true" }
	}),
	cache: new Kc()
}), cu = tu`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
      number
      product_name
      client_email
      client_name
      client_phone
      total_amount
      currency
      payment_method
      paypal_approval_url
      paypal_order_id
      paypal_client_id
      # Si incluyes una relación como tour_operator, DEBES seleccionar subcampos:
      tour_operator {
        documentId
        name
      }
    }
  }
`, lu = tu`
  mutation UpdateOrder($documentId: ID!, $data: OrderInput!) {
    updateOrder(documentId: $documentId, data: $data) {
      documentId
      order_status
    }
  }
`, uu = { paypal: {
	title: "Pago con PayPal",
	loading: "Cargando pasarela...",
	loadOptions: "Cargar opciones de PayPal"
} }, du = { paypal: {
	title: "Pay with PayPal",
	loading: "Loading gateway...",
	loadOptions: "Load PayPal options"
} }, fu = new class {
	constructor() {
		this.dictionaries = {
			es: uu,
			en: du
		}, this.currentLang = "es";
	}
	setLanguage(e) {
		this.dictionaries[e] ? this.currentLang = e : (console.warn(`[i18n] Idioma '${e}' no soportado. Usando 'es' por defecto.`), this.currentLang = "es");
	}
	addLanguage(e, t) {
		this.dictionaries[e] = t;
	}
	t(e, t) {
		let n = t || this.currentLang, r = this.dictionaries[n] || this.dictionaries.es || {}, i = e.split("."), a = r;
		for (let t of i) if (a && typeof a == "object" && t in a) a = a[t];
		else return e;
		return typeof a == "string" ? a : e;
	}
}();
//#endregion
//#region \0@oxc-project+runtime@0.147.0/helpers/esm/decorate.js
function Z(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/components/paypal/index.ts
var Q = class extends Ge {
	constructor(...e) {
		super(...e), this.lang = "en", this.client_name = "", this.client_phone = "", this.client_email = "", this.product_name = "", this.amount = 20, this.currency = "USD", this.graphqlUrl = "http://localhost:1337/graphql", this.clientId = "", this.operator_documentId = "si297rhfgezt3i1mfsgfkuxw", this.processing = !1, this.errorMsg = "", this.buttonsRendered = !1, this.currentOrderDocumentId = null;
	}
	static {
		this.styles = [a(Ze), o`
      :host {
        display: block;
        width: 100%;
      }
      #paypal-buttons-container iframe {
        width: 100% !important;
        min-width: 100% !important;
      }
    `];
	}
	willUpdate(e) {
		e.has("lang") && fu.setLanguage(this.lang);
	}
	async firstUpdated() {
		this.graphqlUrl && (this.apolloClient = su(this.graphqlUrl));
	}
	async createStrapiOrder() {
		if (!this.apolloClient) throw Error("La URL de GraphQL no está configurada.");
		let e = (await this.apolloClient.mutate({
			mutation: cu,
			variables: { data: {
				number: `PP-${Date.now()}`,
				total_amount: this.amount,
				currency: this.currency,
				payment_method: "paypal",
				product_name: "Pago con PayPal",
				client_name: this.client_name || "",
				client_phone: this.client_phone || "0000000000",
				client_email: this.client_email || "test@example.com",
				tour_operator: this.operator_documentId || void 0,
				order_status: "unpaid"
			} }
		})).data?.createOrder, t = e?.documentId || e?.id;
		this.clientId = e?.paypal_client_id, console.log("Client ID from Strapi:", this.clientId);
		let n = e?.paypal_order_id || e?.paypalOrderId;
		if (!t || !n) throw Error("No se pudo generar el ID de la orden de PayPal en Strapi.");
		return this.currentOrderDocumentId = t, {
			orderId: t,
			paypalOrderId: n
		};
	}
	async updateStrapiOrderStatus(e, t) {
		this.apolloClient && await this.apolloClient.mutate({
			mutation: lu,
			variables: {
				documentId: e,
				data: { order_status: "paid" }
			}
		});
	}
	async handlePaypalClick() {
		this.processing = !0, this.errorMsg = "";
		try {
			let { paypalOrderId: e } = await this.createStrapiOrder();
			if (!this.clientId) throw Error("Falta el Client ID de PayPal devuelto por Strapi.");
			let t = await ot({
				clientId: this.clientId,
				currency: this.currency
			});
			if (!t || !t.Buttons) throw Error("No se pudo cargar el SDK de PayPal");
			let n = this.shadowRoot?.querySelector("#paypal-buttons-container");
			if (!n) return;
			n.innerHTML = "", await t.Buttons({
				style: {
					layout: "vertical",
					color: "gold",
					shape: "rect",
					tagline: !1
				},
				createOrder: async () => e,
				onApprove: async (e) => {
					this.processing = !0;
					try {
						this.currentOrderDocumentId && await this.updateStrapiOrderStatus(this.currentOrderDocumentId, e.payerID || ""), this.dispatchEvent(new CustomEvent("payment-submit", {
							detail: {
								method: "paypal",
								payload: {
									orderId: this.currentOrderDocumentId,
									paypalOrderId: e.orderID,
									payerId: e.payerID
								}
							},
							bubbles: !0,
							composed: !0
						}));
					} catch (e) {
						console.error("[Update Order Error]:", e);
					} finally {
						this.processing = !1;
					}
				},
				onError: (e) => {
					this.errorMsg = "Error durante el procesamiento del pago en PayPal.", console.error("[PayPal SDK Error]:", e);
				}
			}).render(n), this.buttonsRendered = !0;
		} catch (e) {
			this.errorMsg = e instanceof Error ? e.message : "Error al procesar el pago con PayPal";
		} finally {
			this.processing = !1;
		}
	}
	render() {
		return _`
      <div class="p-4 border border-slate-200 rounded-2xl bg-slate-50 font-sans space-y-3 w-full box-border">
        

        ${this.errorMsg ? _`<p class="text-xs text-red-600 font-medium">${this.errorMsg}</p>` : null}

        ${this.buttonsRendered ? null : _`
              <button
                type="button"
                @click="${this.handlePaypalClick}"
                ?disabled="${this.processing}"
                class="w-full py-2.5 px-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
              >
                ${this.processing ? _`<span class="animate-pulse">${fu.t("paypal.loading")}</span>` : _`<span>${fu.t("paypal.loadOptions")}</span>`}
              </button>
            `}

        <div id="paypal-buttons-container" class="w-full min-h-[100px]"></div>
      </div>
    `;
	}
};
Z([y({ type: String })], Q.prototype, "lang", void 0), Z([y({ type: String })], Q.prototype, "client_name", void 0), Z([y({ type: String })], Q.prototype, "client_phone", void 0), Z([y({ type: String })], Q.prototype, "client_email", void 0), Z([y({ type: String })], Q.prototype, "product_name", void 0), Z([y({ type: Number })], Q.prototype, "amount", void 0), Z([y({ type: String })], Q.prototype, "currency", void 0), Z([y({
	type: String,
	attribute: "graphql-url"
})], Q.prototype, "graphqlUrl", void 0), Z([y({
	type: String,
	attribute: "client-id"
})], Q.prototype, "clientId", void 0), Z([y({
	type: String,
	attribute: "tour-operator-id"
})], Q.prototype, "operator_documentId", void 0), Z([Xe()], Q.prototype, "processing", void 0), Z([Xe()], Q.prototype, "errorMsg", void 0), Z([Xe()], Q.prototype, "buttonsRendered", void 0), Q = Z([qe("payment-paypal")], Q);
//#endregion
//#region src/components/sinpe/index.ts
var pu = class extends Ge {
	constructor(...e) {
		super(...e), this.loading = !1, this.phone = "", this.reference = "";
	}
	static {
		this.styles = a(Ze);
	}
	handleSubmit(e) {
		e.preventDefault(), this.dispatchEvent(new CustomEvent("payment-submit", {
			detail: {
				method: "sinpe",
				payload: {
					phone: this.phone,
					reference: this.reference
				}
			},
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return _`
      <form @submit="${this.handleSubmit}" class="space-y-3 p-3 border border-slate-200 rounded-xl bg-slate-50 font-sans">
        <h4 class="font-semibold text-slate-700 text-sm flex items-center gap-2">
          <span>📱</span> SINPE Móvil
        </h4>
        <input
          type="tel"
          placeholder="Número de teléfono"
          .value="${this.phone}"
         @input="${(e) => this.phone = e.target.value}"
          class="w-full text-sm p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
          required
        />
        <input
          type="text"
          placeholder="Número de comprobante"
          .value="${this.reference}"
          @input="${(e) => this.reference = e.target.value}"
          class="w-full text-sm p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
          required
        />
        <button
          type="submit"
          ?disabled="${this.loading}"
          class="w-full py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          Confirmar SINPE
        </button>
      </form>
    `;
	}
};
Z([y({ type: Boolean })], pu.prototype, "loading", void 0), Z([Xe()], pu.prototype, "phone", void 0), Z([Xe()], pu.prototype, "reference", void 0), pu = Z([qe("payment-sinpe")], pu);
//#endregion
//#region src/components/card/index.ts
var mu = class extends Ge {
	constructor(...e) {
		super(...e), this.loading = !1, this.cardNumber = "";
	}
	static {
		this.styles = a(Ze);
	}
	handleSubmit(e) {
		e.preventDefault(), this.dispatchEvent(new CustomEvent("payment-submit", {
			detail: {
				method: "card",
				payload: { cardNumber: this.cardNumber }
			},
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return _`
      <form @submit="${this.handleSubmit}" class="space-y-3 p-3 border border-slate-200 rounded-xl bg-slate-50 font-sans">
        <h4 class="font-semibold text-slate-700 text-sm flex items-center gap-2">
          <span>💳</span> Tarjeta Débito / Crédito
        </h4>
        <input
          type="text"
          placeholder="Número de tarjeta"
          .value="${this.cardNumber}"
          @input="${(e) => this.cardNumber = e.target.value}"
          class="w-full text-sm p-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          ?disabled="${this.loading}"
          class="w-full py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Pagar con Tarjeta
        </button>
      </form>
    `;
	}
};
Z([y({ type: Boolean })], mu.prototype, "loading", void 0), Z([Xe()], mu.prototype, "cardNumber", void 0), mu = Z([qe("payment-card")], mu);
//#endregion
//#region src/components/payment/payment-popup.ts
var $ = class extends Ge {
	constructor(...e) {
		super(...e), this.open = !1, this.lang = "en", this.operator_documentId = "", this.client_name = "", this.client_phone = "", this.client_email = "", this.product_name = "", this.amount = 0, this.currency = "USD", this.backendUrl = "", this.selectedMethod = null, this.loading = !1;
	}
	static {
		this.styles = [a(Ze), o`
      :host {
        display: block;
      }
      /* Animación suave de aparición */
      @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.96) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .animate-modal {
        animation: modalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
    `];
	}
	handleClose() {
		this.open = !1, this.selectedMethod = null, this.dispatchEvent(new CustomEvent("payment-cancelled", {
			bubbles: !0,
			composed: !0
		}));
	}
	async handlePaymentSubmit(e) {
		let { method: t, payload: n } = e.detail;
		this.loading = !0;
		try {
			if (this.backendUrl && !(await fetch(`${this.backendUrl}/checkout`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					method: t,
					amount: this.amount,
					currency: this.currency,
					...n
				})
			})).ok) throw Error("Error procesando la transacción");
			let e = {
				method: t,
				amount: this.amount,
				currency: this.currency,
				transactionId: `TX-${Date.now()}`
			};
			this.dispatchEvent(new CustomEvent("payment-success", {
				detail: e,
				bubbles: !0,
				composed: !0
			})), this.open = !1, this.selectedMethod = null;
		} catch (e) {
			let t = {
				code: "PAYMENT_FAILED",
				message: e instanceof Error ? e.message : "Error en la operación"
			};
			this.dispatchEvent(new CustomEvent("payment-error", {
				detail: t,
				bubbles: !0,
				composed: !0
			}));
		} finally {
			this.loading = !1;
		}
	}
	renderMethodForm() {
		switch (this.selectedMethod) {
			case "card": return _`<payment-card .loading="${this.loading}" @payment-submit="${this.handlePaymentSubmit}"></payment-card>`;
			case "sinpe": return _`<payment-sinpe .loading="${this.loading}" @payment-submit="${this.handlePaymentSubmit}"></payment-sinpe>`;
			case "paypal": return _`
          <payment-paypal 
            .operator_documentId="${this.operator_documentId}"
            .lang="${this.lang}"
            .client_name="${this.client_name}"
            .client_phone="${this.client_phone}"
            .client_email="${this.client_email}"
            .product_name="${this.product_name}"
            .amount="${Number(this.amount)}"
            .currency="${this.currency}"
            .loading="${this.loading}"
            @payment-submit="${this.handlePaymentSubmit}"
          ></payment-paypal>
        `;
			default: return null;
		}
	}
	render() {
		return this.open ? _`
      <!-- Backdrop con scroll seguro para pantallas pequeñas -->
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-[99999] p-3 sm:p-6 overflow-y-auto">
        
        <div class="animate-modal bg-white rounded-3xl p-5 sm:p-7 w-full max-w-md shadow-2xl relative border border-slate-100 my-auto overflow-hidden">
          
          <!-- Botón Cerrar -->
          <button 
            @click="${this.handleClose}"
            aria-label="Cerrar modal"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 rounded-full p-2 hover:bg-slate-100 transition-all flex items-center justify-center w-8 h-8 font-bold"
          >
            ✕
          </button>

          <!-- Encabezado y Monto -->
          <div class="text-center mb-6 pt-1">
            <span class="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-md font-semibold tracking-wide uppercase mb-2">
              Selecciona tu método de pago
            </span>
            <div class="flex items-center justify-center gap-1.5 mt-2 text-gray-400">
              <svg
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 1 5.25 5.25v3h.75A2.25 2.25 0 0 1 20.25 12v8.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V12A2.25 2.25 0 0 1 6 9.75h.75v-3A5.25 5.25 0 0 1 12 1.5Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-xs sm:text-sm font-small ">
                Pago 100% seguro y protegido
              </span>
            </div>
           
          </div>

         <!-- PAYMENT METHODS -->
          <div class="space-y-3">

            <!-- CREDIT / DEBIT CARD -->
            <button
              type="button"
              @click="${() => {
			this.selectedMethod = this.selectedMethod === "card" ? null : "card";
		}}"
              class="
                group
                w-full
                text-left
                rounded-xl
                border
                transition-all
                duration-200
                p-4
                ${this.selectedMethod === "card" ? "border-teal-500 bg-teal-50/40 shadow-sm ring-1 ring-teal-500" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}
              "
            >
              <!-- HEADER CARD -->
              <div class="flex items-center justify-between">

                <div class="flex items-center gap-3">

                  <!-- VISA / MASTERCARD -->
                  <div class="flex items-center gap-1">

                    <span
                      class="text-blue-700 font-bold italic text-sm"
                    >
                      VISA
                    </span>

                    <span class="relative flex w-7 h-5">
                      <span
                        class="absolute left-0 top-0 w-5 h-5 rounded-full bg-red-500/90"
                      ></span>

                      <span
                        class="absolute left-2 top-0 w-5 h-5 rounded-full bg-yellow-400/90"
                      ></span>
                    </span>

                  </div>

                  <div>
                    <div class="text-sm font-medium text-slate-800">
                      Tarjeta de Crédito / Débito
                    </div>

                    <div class="text-xs text-slate-400 mt-0.5">
                      Visa, Mastercard y más
                    </div>
                  </div>

                </div>

                <!-- CHECK -->
                <div
                  class="
                    w-5
                    h-5
                    rounded-full
                    border
                    flex
                    items-center
                    justify-center
                    shrink-0
                    transition-all
                    ${this.selectedMethod === "card" ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300"}
                  "
                >
                  ${this.selectedMethod === "card" ? _`
                        <svg
                          class="w-3 h-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      ` : null}
                </div>

              </div>

              <!-- CARD FORM -->
              ${this.selectedMethod === "card" ? _`
                    <div
                      class="mt-4 pt-4 border-t border-teal-100"
                      @click="${(e) => e.stopPropagation()}"
                    >
                      ${this.renderMethodForm()}
                    </div>
                  ` : null}

            </button>


            <!-- PAYPAL -->
            <button
              type="button"
              @click="${() => {
			this.selectedMethod = this.selectedMethod === "paypal" ? null : "paypal";
		}}"
              class="
                group
                w-full
                flex
                items-center
                justify-between
                p-4
                rounded-xl
                border
                transition-all
                duration-200
                text-left
                ${this.selectedMethod === "paypal" ? "border-teal-500 bg-teal-50/40 ring-1 ring-teal-500" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}
              "
            >

              <div class="flex items-center gap-3">

                <!-- PAYPAL LOGO -->
                <div
                  class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"
                >
                  <span
                    class="text-blue-700 font-extrabold text-2xl italic"
                  >
                    P
                  </span>
                </div>

                <div>
                  <div class="text-sm font-medium text-slate-800">
                    PayPal
                  </div>

                  <div class="text-xs text-slate-400 mt-0.5">
                    Paga de forma rápida y segura
                  </div>
                </div>

              </div>

              <!-- RADIO -->
              <div
                class="
                  w-5
                  h-5
                  rounded-full
                  border
                  flex
                  items-center
                  justify-center
                  shrink-0
                  ${this.selectedMethod === "paypal" ? "bg-teal-600 border-teal-600 text-white" : "border-slate-300"}
                "
              >
                ${this.selectedMethod === "paypal" ? _` <svg
                          class="w-3 h-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                    ` : null}
              </div>

            </button>


            <!-- PAYPAL FORM -->
            ${this.selectedMethod === "paypal" ? _`
                  <div class="px-1">
                    ${this.renderMethodForm()}
                  </div>
                ` : null}


            <!-- APPLE PAY -->
            <button
              type="button"
              class="
                group
                w-full
                flex
                items-center
                justify-between
                p-4
                rounded-xl
                border
                border-slate-200
                bg-white
                hover:border-slate-300
                hover:bg-slate-50
                transition-all
                duration-200
                text-left
              "
            >

              <div class="flex items-center gap-3">

                <!-- APPLE -->
                <div
                  class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.97.48 7.12-.57 1.5-1.31 2.99-2.54 4.1l.01-.01z"
                    />
                  </svg>
                </div>

                <div>
                  <div class="text-sm font-medium text-slate-800">
                    Apple Pay
                  </div>

                  <div class="text-xs text-slate-400 mt-0.5">
                    Paga con Touch ID o Face ID
                  </div>
                </div>

              </div>

              <div
                class="w-5 h-5 rounded-full border border-slate-300 shrink-0"
              ></div>

            </button>

          </div>


          <!-- PAY BUTTON -->
          <button
            type="button"
            ?disabled="${this.loading || !this.selectedMethod}"
            @click="${() => {}}"
            class="
              w-full
              mt-5
              py-3
              px-4
              rounded-full
              bg-teal-600
              hover:bg-teal-700
              disabled:bg-slate-300
              disabled:cursor-not-allowed
              text-white
              text-sm
              font-medium
              transition-all
              shadow-sm
            "
          >
            ${this.loading ? "Procesando..." : `Pagar ${this.currency} ${this.amount}`}
          </button>


          <!-- Estado de Carga Global -->
          ${this.loading ? _`
                <div class="mt-4 p-3 bg-blue-50/80 border border-blue-100 rounded-xl flex items-center justify-center space-x-2 text-blue-700 text-xs font-medium animate-pulse">
                  <svg class="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Procesando pago seguro...</span>
                </div>
              ` : null}
        </div>
      </div>
    ` : null;
	}
};
Z([y({
	type: Boolean,
	reflect: !0
})], $.prototype, "open", void 0), Z([y({ type: String })], $.prototype, "lang", void 0), Z([y({ type: String })], $.prototype, "operator_documentId", void 0), Z([y({ type: String })], $.prototype, "client_name", void 0), Z([y({ type: String })], $.prototype, "client_phone", void 0), Z([y({ type: String })], $.prototype, "client_email", void 0), Z([y({ type: String })], $.prototype, "product_name", void 0), Z([y({ type: Number })], $.prototype, "amount", void 0), Z([y({ type: String })], $.prototype, "currency", void 0), Z([y({
	type: String,
	attribute: "backend-url"
})], $.prototype, "backendUrl", void 0), Z([Xe()], $.prototype, "selectedMethod", void 0), Z([Xe()], $.prototype, "loading", void 0), $ = Z([qe("payment-popup")], $);
//#endregion
export { $ as PaymentPopup };
