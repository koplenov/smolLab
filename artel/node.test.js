"use strict";
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;
//mam.ts
;
"use strict";
var $;
(function ($) {
    function $mol_offline(uri = 'web.js') { }
    $.$mol_offline = $mol_offline;
})($ || ($ = {}));
//mol/offline/offline.node.ts
;
"use strict";
var $;
(function ($) {
    $mol_offline();
})($ || ($ = {}));
//mol/offline/install/install.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//mol/ambient/ambient.ts
;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));
//mol/delegate/delegate.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));
//mol/owning/owning.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//mol/fail/fail.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//mol/fail/hidden/hidden.ts
;
"use strict";
//mol/type/writable/writable.ts
;
"use strict";
var $;
(function ($) {
    class $mol_object2 {
        static $ = $;
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            if (Symbol.toStringTag in this)
                return this[Symbol.toStringTag];
            return this.name;
        }
        destructor() { }
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '()';
        }
        toJSON() {
            return this.toString();
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));
//mol/object2/object2.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        promise;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            this.promise = Promise.resolve().then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));
//mol/after/tick/tick.ts
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//mol/dom/context/context.ts
;
"use strict";
//node/node.ts
;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        const mod = target.require('module');
        if (mod.builtinModules.indexOf(name) >= 0)
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        const path = target.require('path');
        const fs = target.require('fs');
        let dir = path.resolve('.');
        const suffix = `./node_modules/${name}`;
        const $$ = $;
        while (!fs.existsSync(path.join(dir, suffix))) {
            const parent = path.resolve(dir, '..');
            if (parent === dir) {
                $$.$mol_exec('.', 'npm', 'install', '--omit=dev', name);
                try {
                    $$.$mol_exec('.', 'npm', 'install', '--omit=dev', '@types/' + name);
                }
                catch { }
                break;
            }
            else {
                dir = parent;
            }
        }
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);
//node/node.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_area_lazy(event) {
        const self = this;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
})($ || ($ = {}));
//mol/log3/log3.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_tree_convert = Symbol('$mol_tree_convert');
    class $mol_tree extends $mol_object2 {
        type;
        data;
        sub;
        baseUri;
        row;
        col;
        length;
        constructor(config = {}) {
            super();
            this.type = config.type || '';
            if (config.value !== undefined) {
                var sub = $mol_tree.values(config.value);
                if (config.type || sub.length > 1) {
                    this.sub = [...sub, ...(config.sub || [])];
                    this.data = config.data || '';
                }
                else {
                    this.data = sub[0].data;
                    this.sub = config.sub || [];
                }
            }
            else {
                this.data = config.data || '';
                this.sub = config.sub || [];
            }
            this.baseUri = config.baseUri || '';
            this.row = config.row || 0;
            this.col = config.col || 0;
            this.length = config.length || 0;
        }
        static values(str, baseUri) {
            return str.split('\n').map((data, index) => new $mol_tree({
                data: data,
                baseUri: baseUri,
                row: index + 1,
                length: data.length,
            }));
        }
        clone(config = {}) {
            return new $mol_tree({
                type: ('type' in config) ? config.type : this.type,
                data: ('data' in config) ? config.data : this.data,
                sub: ('sub' in config) ? config.sub : this.sub,
                baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
                row: ('row' in config) ? config.row : this.row,
                col: ('col' in config) ? config.col : this.col,
                length: ('length' in config) ? config.length : this.length,
                value: config.value
            });
        }
        make(config) {
            return new $mol_tree({
                baseUri: this.baseUri,
                row: this.row,
                col: this.col,
                length: this.length,
                ...config,
            });
        }
        make_data(value, sub) {
            return this.make({ value, sub });
        }
        make_struct(type, sub) {
            return this.make({ type, sub });
        }
        static fromString(str, baseUri) {
            var root = new $mol_tree({ baseUri: baseUri });
            var stack = [root];
            var row = 0;
            var prefix = str.replace(/^\n?(\t*)[\s\S]*/, '$1');
            var lines = str.replace(new RegExp('^\\t{0,' + prefix.length + '}', 'mg'), '').split('\n');
            lines.forEach(line => {
                ++row;
                var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?(.*?)(?:$|\n)/m.exec(line);
                if (!chunks || chunks[4])
                    return this.$.$mol_fail(new Error(`Syntax error at ${baseUri}:${row}\n${line}`));
                var indent = chunks[1];
                var path = chunks[2];
                var data = chunks[3];
                var deep = indent.length;
                var types = path ? path.replace(/ $/, '').split(/ +/) : [];
                if (stack.length <= deep)
                    return this.$.$mol_fail(new Error(`Too many tabs at ${baseUri}:${row}\n${line}`));
                stack.length = deep + 1;
                var parent = stack[deep];
                let col = deep;
                types.forEach(type => {
                    if (!type)
                        return this.$.$mol_fail(new Error(`Unexpected space symbol ${baseUri}:${row}\n${line}`));
                    var next = new $mol_tree({ type, baseUri, row, col, length: type.length });
                    const parent_sub = parent.sub;
                    parent_sub.push(next);
                    parent = next;
                    col += type.length + 1;
                });
                if (data) {
                    var next = new $mol_tree({ data: data.substring(1), baseUri, row, col, length: data.length });
                    const parent_sub = parent.sub;
                    parent_sub.push(next);
                    parent = next;
                }
                stack.push(parent);
            });
            return root;
        }
        static fromJSON(json, baseUri = '') {
            switch (true) {
                case typeof json === 'boolean':
                case typeof json === 'number':
                case json === null:
                    return new $mol_tree({
                        type: String(json),
                        baseUri: baseUri
                    });
                case typeof json === 'string':
                    return new $mol_tree({
                        value: json,
                        baseUri: baseUri
                    });
                case Array.isArray(json):
                    return new $mol_tree({
                        type: "/",
                        sub: json.map(json => $mol_tree.fromJSON(json, baseUri))
                    });
                case json instanceof Date:
                    return new $mol_tree({
                        value: json.toISOString(),
                        baseUri: baseUri
                    });
                default:
                    if (typeof json[$.$mol_tree_convert] === 'function') {
                        return json[$.$mol_tree_convert]();
                    }
                    if (typeof json.toJSON === 'function') {
                        return $mol_tree.fromJSON(json.toJSON());
                    }
                    if (json instanceof Error) {
                        const { name, message, stack } = json;
                        json = { ...json, name, message, stack };
                    }
                    var sub = [];
                    for (var key in json) {
                        if (json[key] === undefined)
                            continue;
                        const subsub = $mol_tree.fromJSON(json[key], baseUri);
                        if (/^[^\n\t\\ ]+$/.test(key)) {
                            var child = new $mol_tree({
                                type: key,
                                baseUri: baseUri,
                                sub: [subsub],
                            });
                        }
                        else {
                            var child = new $mol_tree({
                                value: key,
                                baseUri: baseUri,
                                sub: [subsub],
                            });
                        }
                        sub.push(child);
                    }
                    return new $mol_tree({
                        type: "*",
                        sub: sub,
                        baseUri: baseUri
                    });
            }
        }
        get uri() {
            return this.baseUri + '#' + this.row + ':' + this.col;
        }
        toString(prefix = '') {
            var output = '';
            if (this.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output += this.type;
                if (this.sub.length == 1) {
                    return output + ' ' + this.sub[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var child of this.sub) {
                output += prefix;
                output += child.toString(prefix + "\t");
            }
            return output;
        }
        toJSON() {
            if (!this.type)
                return this.value;
            if (this.type === 'true')
                return true;
            if (this.type === 'false')
                return false;
            if (this.type === 'null')
                return null;
            if (this.type === '*') {
                var obj = {};
                for (var child of this.sub) {
                    if (child.type === '-')
                        continue;
                    var key = child.type || child.clone({ sub: child.sub.slice(0, child.sub.length - 1) }).value;
                    var val = child.sub[child.sub.length - 1].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === '/') {
                var res = [];
                this.sub.forEach(child => {
                    if (child.type === '-')
                        return;
                    var val = child.toJSON();
                    if (val !== undefined)
                        res.push(val);
                });
                return res;
            }
            if (this.type === 'time') {
                return new Date(this.value);
            }
            const numb = Number(this.type);
            if (!Number.isNaN(numb) || this.type === 'NaN')
                return numb;
            throw new Error(`Unknown type (${this.type}) at ${this.uri}`);
        }
        get value() {
            var values = [];
            for (var child of this.sub) {
                if (child.type)
                    continue;
                values.push(child.value);
            }
            return this.data + values.join("\n");
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.sub.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                });
                if (!replaced)
                    sub.push(new $mol_tree({ type }).insert(value, ...path.slice(1)));
                return this.clone({ sub });
            }
            else if (typeof type === 'number') {
                const sub = this.sub.slice();
                sub[type] = (sub[type] || new $mol_tree).insert(value, ...path.slice(1));
                return this.clone({ sub });
            }
            else {
                return this.clone({ sub: ((this.sub.length === 0) ? [new $mol_tree()] : this.sub).map(item => item.insert(value, ...path.slice(1))) });
            }
        }
        select(...path) {
            var next = [this];
            for (var type of path) {
                if (!next.length)
                    break;
                var prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.sub) {
                                if (!type || (child.type == type)) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.sub.length)
                                next.push(item.sub[type]);
                            break;
                        default: next.push(...item.sub);
                    }
                }
            }
            return new $mol_tree({ sub: next });
        }
        filter(path, value) {
            var sub = this.sub.filter(function (item) {
                var found = item.select(...path);
                if (value == null) {
                    return Boolean(found.sub.length);
                }
                else {
                    return found.sub.some(child => child.value == value);
                }
            });
            return new $mol_tree({ sub: sub });
        }
        transform(visit, stack = []) {
            const sub_stack = [this, ...stack];
            return visit(sub_stack, () => this.sub.map(node => node.transform(visit, sub_stack)).filter(n => n));
        }
        hack(context) {
            const sub = [].concat(...this.sub.map(child => {
                const handle = context[child.type] || context[''];
                if (!handle)
                    $mol_fail(child.error('Handler not defined'));
                return handle(child, context);
            }));
            return this.clone({ sub });
        }
        error(message) {
            return new Error(`${message}:\n${this} ${this.baseUri}:${this.row}:${this.col}`);
        }
    }
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//mol/tree/tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));
//mol/term/color/color.ts
;
"use strict";
var $;
(function ($) {
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { time: new Date().toISOString(), ...event };
            const tree = this.$mol_tree.fromJSON(event).clone({ type });
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));
//mol/log3/log3.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));
//mol/env/env.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));
//mol/env/env.node.ts
;
"use strict";
var $;
(function ($) {
    function $mol_exec(dir, command, ...args) {
        let [app, ...args0] = command.split(' ');
        args = [...args0, ...args];
        this.$mol_log3_come({
            place: '$mol_exec',
            dir: $node.path.relative('', dir),
            message: 'Run',
            command: `${app} ${args.join(' ')}`,
        });
        var res = $node['child_process'].spawnSync(app, args, {
            cwd: $node.path.resolve(dir),
            shell: true,
            env: this.$mol_env(),
        });
        if (res.status || res.error)
            return $mol_fail(res.error || new Error(res.stderr.toString()));
        if (!res.stdout)
            res.stdout = Buffer.from([]);
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//mol/exec/exec.node.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));
//mol/dom/context/context.node.ts
;
"use strict";
var $;
(function ($) {
    let all = [];
    let el = null;
    let timer = null;
    function $mol_style_attach(id, text) {
        all.push(`/* ${id} */\n\n${text}`);
        if (timer)
            return el;
        const doc = $mol_dom_context.document;
        if (!doc)
            return null;
        el = doc.createElement('style');
        el.id = `$mol_style_attach`;
        doc.head.appendChild(el);
        timer = new $mol_after_tick(() => {
            el.innerHTML = '\n' + all.join('\n\n');
            all = [];
            el = null;
            timer = null;
        });
        return el;
    }
    $.$mol_style_attach = $mol_style_attach;
})($ || ($ = {}));
//mol/style/attach/attach.ts
;
"use strict";
var $;
(function ($) {
    class $mol_decor {
        value;
        constructor(value) {
            this.value = value;
        }
        prefix() { return ''; }
        valueOf() { return this.value; }
        postfix() { return ''; }
        toString() {
            return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
        }
    }
    $.$mol_decor = $mol_decor;
})($ || ($ = {}));
//mol/decor/decor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_style_unit extends $mol_decor {
        literal;
        constructor(value, literal) {
            super(value);
            this.literal = literal;
        }
        postfix() {
            return this.literal;
        }
        static per(value) { return new $mol_style_unit(value, '%'); }
        static px(value) { return new $mol_style_unit(value, 'px'); }
        static mm(value) { return new $mol_style_unit(value, 'mm'); }
        static cm(value) { return new $mol_style_unit(value, 'cm'); }
        static Q(value) { return new $mol_style_unit(value, 'Q'); }
        static in(value) { return new $mol_style_unit(value, 'in'); }
        static pc(value) { return new $mol_style_unit(value, 'pc'); }
        static pt(value) { return new $mol_style_unit(value, 'pt'); }
        static cap(value) { return new $mol_style_unit(value, 'cap'); }
        static ch(value) { return new $mol_style_unit(value, 'ch'); }
        static em(value) { return new $mol_style_unit(value, 'em'); }
        static rem(value) { return new $mol_style_unit(value, 'rem'); }
        static ex(value) { return new $mol_style_unit(value, 'ex'); }
        static ic(value) { return new $mol_style_unit(value, 'ic'); }
        static lh(value) { return new $mol_style_unit(value, 'lh'); }
        static rlh(value) { return new $mol_style_unit(value, 'rlh'); }
        static vh(value) { return new $mol_style_unit(value, 'vh'); }
        static vw(value) { return new $mol_style_unit(value, 'vw'); }
        static vi(value) { return new $mol_style_unit(value, 'vi'); }
        static vb(value) { return new $mol_style_unit(value, 'vb'); }
        static vmin(value) { return new $mol_style_unit(value, 'vmin'); }
        static vmax(value) { return new $mol_style_unit(value, 'vmax'); }
        static deg(value) { return new $mol_style_unit(value, 'deg'); }
        static rad(value) { return new $mol_style_unit(value, 'rad'); }
        static grad(value) { return new $mol_style_unit(value, 'grad'); }
        static turn(value) { return new $mol_style_unit(value, 'turn'); }
        static s(value) { return new $mol_style_unit(value, 's'); }
        static ms(value) { return new $mol_style_unit(value, 'ms'); }
    }
    $.$mol_style_unit = $mol_style_unit;
})($ || ($ = {}));
//mol/style/unit/unit.ts
;
"use strict";
var $;
(function ($) {
    const { per } = $mol_style_unit;
    class $mol_style_func extends $mol_decor {
        name;
        constructor(name, value) {
            super(value);
            this.name = name;
        }
        prefix() { return this.name + '('; }
        postfix() { return ')'; }
        static calc(value) {
            return new $mol_style_func('calc', value);
        }
        static vary(name) {
            return new $mol_style_func('var', name);
        }
        static url(href) {
            return new $mol_style_func('url', JSON.stringify(href));
        }
        static hsla(hue, saturation, lightness, alpha) {
            return new $mol_style_func('hsla', [hue, per(saturation), per(lightness), alpha]);
        }
        static clamp(min, mid, max) {
            return new $mol_style_func('clamp', [min, mid, max]);
        }
        static rgba(red, green, blue, alpha) {
            return new $mol_style_func('rgba', [red, green, blue, alpha]);
        }
        static scale(zoom) {
            return new $mol_style_func('scale', [zoom]);
        }
    }
    $.$mol_style_func = $mol_style_func;
})($ || ($ = {}));
//mol/style/func/func.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/theme/theme.css", ":root {\n\t--mol_theme_hue: 210deg;\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: none;\n}\n\n[mol_theme] {\n\tbackground-color: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tfill: var(--mol_theme_text);\n}\n\t\n:root, [mol_theme] {\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 50% , calc( 55% + 45% * var(--mol_theme_luma) ) );\n\t--mol_theme_text: hsl( var(--mol_theme_hue), 0% , calc( 50% - 30% * var(--mol_theme_luma) ) );\n\t--mol_theme_field: hsl( var(--mol_theme_hue), 50%, calc( 54% + 46% * var(--mol_theme_luma) ), .25 );\n\t\n\t--mol_theme_card: hsl( var(--mol_theme_hue), 0%, 50%, .05 );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 0%, 50%, .1 );\n\t--mol_theme_line: hsl( var(--mol_theme_hue), 0%, 50%, .2 );\n\t--mol_theme_shade: hsl( var(--mol_theme_hue), 0%, 50%, 1 );\n\t\n\t--mol_theme_control: hsl( var(--mol_theme_hue), 50%, calc( 50% - 5% * var(--mol_theme_luma) ) );\n\t--mol_theme_current: hsl( calc( var(--mol_theme_hue) - 90deg ), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_special: hsl( calc( var(--mol_theme_hue) + 90deg ), 50%, calc( 50% - 10% * var(--mol_theme_luma) ) );\n\t--mol_theme_focus: hsl( calc( var(--mol_theme_hue) + 180deg ), 100%, calc( 55% - 10% * var(--mol_theme_luma) ) );\n\t\n}\n\n[mol_theme=\"$mol_theme_light\"] {\n\t--mol_theme_luma: 1;\n\t--mol_theme_image: none;\n}\n\n[mol_theme=\"$mol_theme_dark\"] {\n\t--mol_theme_luma: -1;\n\t--mol_theme_image: invert(1) hue-rotate( 180deg );\n}\n\n[mol_theme=\"$mol_theme_base\"] {\n\t--mol_theme_luma: -2;\n\t--mol_theme_back: hsl( var(--mol_theme_hue), 50%, 40% );\n\t--mol_theme_hover: hsl( var(--mol_theme_hue), 60%, 30% );\n\t--mol_theme_current: hsl( var(--mol_theme_hue), 100%, 20% );\n}\n\n[mol_theme=\"$mol_theme_current\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) - 90deg ), 50%, calc( 50% + 25% * var(--mol_theme_luma) ) );\n}\n\n[mol_theme=\"$mol_theme_special\"] {\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + 90deg ), 50%, calc( 50% + 25% * var(--mol_theme_luma) ) );\n}\n\n[mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_luma: -2;\n\t--mol_theme_back: hsl( calc( var(--mol_theme_hue) + 180deg ), 90%, 50% );\n\t--mol_theme_hover: hsl( calc( var(--mol_theme_hue) + 180deg ), 80%, 35% );\n}\n\n[mol_theme=\"$mol_theme_accent\"] [mol_theme=\"$mol_theme_accent\"] {\n\t--mol_theme_back: black;\n}\n");
})($ || ($ = {}));
//mol/theme/-css/theme.css.ts
;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $.$mol_theme = {
        back: vary('--mol_theme_back'),
        hover: vary('--mol_theme_hover'),
        card: vary('--mol_theme_card'),
        current: vary('--mol_theme_current'),
        special: vary('--mol_theme_special'),
        text: vary('--mol_theme_text'),
        control: vary('--mol_theme_control'),
        shade: vary('--mol_theme_shade'),
        line: vary('--mol_theme_line'),
        focus: vary('--mol_theme_focus'),
        field: vary('--mol_theme_field'),
        image: vary('--mol_theme_image'),
    };
})($ || ($ = {}));
//mol/theme/theme.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gap/gap.css", ":root {\n\t--mol_gap_block: .75rem;\n\t--mol_gap_text: .5rem .75rem;\n\t--mol_gap_round: .25rem;\n\t--mol_gap_space: .25rem;\n\t--mol_gap_blur: .5rem;\n}\n");
})($ || ($ = {}));
//mol/gap/-css/gap.css.ts
;
"use strict";
var $;
(function ($) {
    const { vary } = $mol_style_func;
    $.$mol_gap = {
        block: vary('--mol_gap_block'),
        text: vary('--mol_gap_text'),
        round: vary('--mol_gap_round'),
        space: vary('--mol_gap_space'),
        blur: vary('--mol_gap_blur'),
    };
})($ || ($ = {}));
//mol/gap/gap.ts
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//mol/object/object.ts
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $mol_object {
        static size() {
            return {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//mol/window/window.node.ts
;
"use strict";
var $;
(function ($) {
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));
//mol/wire/cursor/cursor.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub extends Object {
        data = [];
        static get [Symbol.species]() {
            return Array;
        }
        sub_from = 0;
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.pop();
            this.data.pop();
            if (this.data.length === this.sub_from)
                this.reap();
        }
        reap() { }
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        fresh() { }
        complete() { }
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant);
            }
        }
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));
//mol/wire/pub/pub.ts
;
"use strict";
//mol/wire/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    let auto = null;
    function $mol_wire_auto(next = auto) {
        return auto = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    $.$mol_wire_affected = [];
})($ || ($ = {}));
//mol/wire/wire.ts
;
"use strict";
var $;
(function ($) {
    $['devtoolsFormatters'] = $['devtoolsFormatters'] || [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                return val[$.$mol_dev_format_head]();
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: val => val[$.$mol_dev_format_body],
        body: val => val[$.$mol_dev_format_body](),
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        if (typeof obj !== 'object' && typeof obj !== 'function')
            return obj;
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        if (typeof obj === 'object' && $.$mol_dev_format_head in obj) {
            return obj[$.$mol_dev_format_head]();
        }
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    function $mol_dev_format_span(style, ...content) {
        return $mol_dev_format_element('span', {
            'vertical-align': '8%',
            ...style,
        }, ...content);
    }
    $.$mol_dev_format_span = $mol_dev_format_span;
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-left': '13px'
    });
})($ || ($ = {}));
//mol/dev/format/format.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0;
        cursor = $mol_wire_cursor.stale;
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
                this.data.pop();
                this.data.pop();
            }
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.final;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let tail = 0;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.data.length - 2, cursor);
                    this.data.pop();
                    this.data.pop();
                }
                else {
                    ++tail;
                }
            }
            for (; tail; --tail) {
                this.data.pop();
                this.data.pop();
            }
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/pub/sub/sub.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));
//mol/after/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//mol/after/frame/frame.node.ts
;
"use strict";
var $;
(function ($) {
    const handled = new WeakSet();
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_frame(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if (this.cache instanceof Promise)
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super();
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
            this[Symbol.toStringTag] = id;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_dev_format_native(this), $mol_dev_format_shade(cursor + ' '), $mol_dev_format_auto(this.cache));
        }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if (result instanceof Promise) {
                    const put = (res) => {
                        if (this.cache === result)
                            this.put(res);
                        return res;
                    };
                    result = Object.assign(result.then(put, put), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            catch (error) {
                if (error instanceof Error || error instanceof Promise) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if (result instanceof Promise && !handled.has(result)) {
                    result = Object.assign(result.finally(() => {
                        if (this.cache === result)
                            this.absorb();
                    }), {
                        destructor: result['destructor'] ?? (() => { })
                    });
                    handled.add(result);
                }
            }
            if (!(result instanceof Promise)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if (this.cache instanceof Promise) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        async async() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!(this.cache instanceof Promise))
                    return this.cache;
                await this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    await new Promise(() => { });
                }
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));
//mol/wire/fiber/fiber.ts
;
"use strict";
var $;
(function ($) {
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));
//mol/guid/guid.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_key_store = new WeakMap();
    function $mol_key(value) {
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object' && typeof value !== 'function')
            return JSON.stringify(value);
        return JSON.stringify(value, (field, value) => {
            if (!value)
                return value;
            if (typeof value !== 'object' && typeof value !== 'function')
                return value;
            if (Array.isArray(value))
                return value;
            const proto = Reflect.getPrototypeOf(value);
            if (!proto)
                return value;
            if (Reflect.getPrototypeOf(proto) === null)
                return value;
            if ('toJSON' in value)
                return value;
            if (value instanceof RegExp)
                return value.toString();
            let key = $.$mol_key_store.get(value);
            if (key)
                return key;
            key = $mol_guid();
            $.$mol_key_store.set(value, key);
            return key;
        });
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));
//mol/key/key.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right['source'] && left.flags === right['flags'];
        if (left instanceof Error)
            return left.message === right['message'] && left.stack === right['stack'];
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap([[right, true]]);
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        let result;
        try {
            if (left_proto && !Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (left_keys.length !== right_keys.length)
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], Reflect.get(right, key)))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));
//mol/compare/deep/deep.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                reuse: if (existen) {
                    if (!(existen instanceof $mol_wire_task))
                        break reuse;
                    if (existen.host !== host)
                        break reuse;
                    if (existen.task !== task)
                        break reuse;
                    if (!$mol_compare_deep(existen.args, args))
                        break reuse;
                    return existen;
                }
                return new $mol_wire_task(`${host?.[Symbol.toStringTag] ?? host}.${task.name}(#)`, task, host, args);
            };
        }
        complete() {
            if (this.cache instanceof Promise)
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if (next instanceof Promise) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));
//mol/wire/task/task.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));
//mol/wire/method/method.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const key = `${host?.[Symbol.toStringTag] ?? host}.${field}`;
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const id = `${host?.[Symbol.toStringTag] ?? host}.${task.name}(${$mol_key(key)})`;
            if (dict) {
                const existen = dict.get(id);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(id, fiber);
            return fiber;
        }
        static watching = new Set();
        static watch() {
            new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            $mol_wire_atom.watching.add(this);
        }
        resync(args) {
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        destructor() {
            super.destructor();
            const prev = this.cache;
            if ($mol_owning_check(this, prev)) {
                prev.destructor();
            }
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                ;
                (this.host ?? this.task)[this.field()].delete(this[Symbol.toStringTag]);
            }
        }
        put(next) {
            const prev = this.cache;
            if (next !== prev) {
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                this.cache = next;
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch {
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (this.sub_from < this.data.length) {
                    if (!$mol_compare_deep(prev, next)) {
                        this.emit();
                    }
                }
            }
            this.cursor = $mol_wire_cursor.fresh;
            if (next instanceof Promise)
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
    $mol_wire_atom.watch();
})($ || ($ = {}));
//mol/wire/atom/atom.ts
;
"use strict";
//mol/type/tail/tail.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto() instanceof $mol_wire_task) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));
//mol/wire/solo/solo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto() instanceof $mol_wire_task) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));
//mol/wire/plex/plex.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem = $mol_wire_solo;
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));
//mol/mem/mem.ts
;
"use strict";
var $;
(function ($) {
    const cacthed = new WeakMap();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if (cacthed.get(error))
            return false;
        cacthed.set(error, true);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));
//mol/fail/catch/catch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if (error instanceof Promise)
            return false;
        if (!$mol_fail_catch(error))
            return false;
        console.error(error);
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));
//mol/fail/log/log.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_selection extends $mol_object {
        static focused(next, notify) {
            const parents = [];
            let element = next?.[0] ?? $mol_dom_context.document.activeElement;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            if (!next || notify)
                return parents;
            new $mol_after_tick(() => {
                const element = this.focused()[0];
                if (element)
                    element.focus();
                else
                    $mol_dom_context.blur();
            });
            return parents;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_selection, "focused", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//mol/view/selection/selection.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wrapper extends $mol_object2 {
        static wrap;
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            return this.wrap(func);
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
        static get field() {
            return (obj, name, descr) => {
                descr.get = descr.set = this.func(descr.get);
                return descr;
            };
        }
    }
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));
//mol/wrapper/wrapper.ts
;
"use strict";
var $;
(function ($) {
    class $mol_memo extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            return function (next) {
                if (next === undefined && store.has(this))
                    return store.get(this);
                const val = task.call(this, next) ?? next;
                store.set(this, val);
                return val;
            };
        }
    }
    $.$mol_memo = $mol_memo;
})($ || ($ = {}));
//mol/memo/memo.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_qname(name) {
        return name.replace(/\W/g, '').replace(/^(?=\d+)/, '_');
    }
    $.$mol_dom_qname = $mol_dom_qname;
})($ || ($ = {}));
//mol/dom/qname/qname.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_probe(task, next) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            return task();
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));
//mol/wire/probe/probe.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_watch() {
        const atom = $mol_wire_auto();
        if (atom instanceof $mol_wire_atom) {
            atom.watch();
        }
        else {
            $mol_fail(new Error('Atom is equired for watching'));
        }
    }
    $.$mol_wire_watch = $mol_wire_watch;
})($ || ($ = {}));
//mol/wire/watch/watch.ts
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//mol/const/const.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === null || val === false) {
                if (!el.hasAttribute(name))
                    continue;
                el.removeAttribute(name);
            }
            else {
                const str = String(val);
                if (el.getAttribute(name) === str)
                    continue;
                el.setAttribute(name, str);
            }
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));
//mol/dom/render/attributes/attributes.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));
//mol/wire/async/async.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            if (typeof val === 'number') {
                style[name] = `${val}px`;
            }
            else {
                style[name] = val;
            }
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));
//mol/dom/render/styles/styles.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_set = new Set(childNodes);
        let nextNode = el.firstChild;
        for (let view of childNodes) {
            if (view == null)
                continue;
            if (view instanceof $mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));
//mol/dom/render/children/children.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));
//mol/dom/render/fields/fields.ts
;
"use strict";
var $;
(function ($) {
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//mol/func/name/name.ts
;
"use strict";
//mol/type/keys/extract/extract.ts
;
"use strict";
//mol/type/pick/pick.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/view/view/view.css", "[mol_view] {\n\ttransition-property: height, width, min-height, min-width, max-width, max-height, transform;\n\ttransition-duration: .2s;\n\ttransition-timing-function: ease-out;\n\t-webkit-appearance: none;\n\tword-break: break-word;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-shrink: 0;\n\tcontain: style;\n\tscrollbar-color: var(--mol_theme_line) transparent;\n\tscrollbar-width: thin;\n}\t\n\n[mol_view]::selection {\n\tbackground: var(--mol_theme_line);\n}\t\n\n[mol_view]::-webkit-scrollbar {\n\twidth: .25rem;\n\theight: .25rem;\n}\n\n[mol_view]::-webkit-scrollbar-corner {\n\tbackground-color: var(--mol_theme_line);\n}\n\n[mol_view]::-webkit-scrollbar-track {\n\tbackground-color: transparent;\n}\n\n[mol_view]::-webkit-scrollbar-thumb {\n\tbackground-color: var(--mol_theme_line);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_view] > * {\n\tword-break: inherit;\n}\n\n[mol_view_root] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbox-sizing: border-box;\n\tfont-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n\tfont-size: 1rem;\n\tline-height: 1.5rem;\n\tbackground: var(--mol_theme_back);\n\tcolor: var(--mol_theme_text);\n\tcontain: unset; /** Fixes bg ignoring when applied to body on Chrome */\n\ttab-size: 4;\n}\n\n[mol_view][mol_view_error]:not([mol_view_error=\"Promise\"]) {\n\tbackground-image: repeating-linear-gradient(\n\t\t-45deg,\n\t\t#f92323,\n\t\t#f92323 .5rem,\n\t\t#ff3d3d .5rem,\n\t\t#ff3d3d 1.5rem\n\t);\n\tcolor: black;\n\talign-items: center;\n    justify-content: center;\n}\n\n@keyframes mol_view_wait_move {\n\tfrom {\n\t\tbackground-position: 0 0;\n\t}\n\tto {\n\t\tbackground-position: 200vmax 0;\n\t}\n}\n\n@keyframes mol_view_wait_show {\n\tto {\n\t\tbackground-image: repeating-linear-gradient(\n\t\t\t45deg,\n\t\t\thsla( 0 , 0% , 50% , .5 ) 0% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 5% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 45% ,\n\t\t\thsla( 0 , 0% , 50% , .5 ) 50% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 55% ,\n\t\t\thsla( 0 , 0% , 50% , 0 ) 95% ,\n\t\t\thsla( 0 , 0% , 50% , .5 ) 100%\n\t\t);\n\t\tbackground-size: 200vmax 200vmax;\n\t}\n}\n\n[mol_view][mol_view_error=\"Promise\"] {\n\tanimation: mol_view_wait_show .5s .5s linear forwards , mol_view_wait_move 1s linear infinite;\n\topacity: .75;\n}\n");
})($ || ($ = {}));
//mol/view/view/-css/view.css.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_visible_width() {
        return $mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    const error_showed = new WeakMap();
    class $mol_view extends $mol_object {
        static Root(id) {
            return new this;
        }
        autorun() {
            try {
                this.dom_tree();
                document.title = this.title();
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        static autobind() {
            const nodes = $mol_dom_context.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])');
            for (let i = nodes.length - 1; i >= 0; --i) {
                const name = nodes.item(i).getAttribute('mol_view_root');
                const View = $[name];
                if (!View) {
                    console.error(`Can not attach view. Class not found: ${name}`);
                    continue;
                }
                const view = View.Root(i);
                view.dom_node(nodes.item(i));
                view.autorun();
            }
        }
        title() {
            return this.constructor.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $mol_view_selection.focused(next === undefined ? undefined : (next ? [node] : []));
            return value.indexOf(node) !== -1;
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return $mol_dom_qname(this.constructor.toString()) || 'div';
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return [];
        }
        sub_visible() {
            return this.sub();
        }
        minimal_width() {
            let min = 0;
            try {
                const sub = this.sub();
                if (!sub)
                    return 0;
                sub.forEach(view => {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_width());
                    }
                });
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        maximal_width() {
            return this.minimal_width();
        }
        minimal_height() {
            let min = 0;
            try {
                for (const view of this.sub() ?? []) {
                    if (view instanceof $mol_view) {
                        min = Math.max(min, view.minimal_height());
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                return 24;
            }
            return min;
        }
        static watchers = new Set();
        view_rect() {
            if ($mol_wire_probe(() => this.view_rect()) === undefined) {
                $mol_wire_watch();
                return null;
            }
            else {
                const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
                return { width, height, left, right, top, bottom };
            }
        }
        dom_id() {
            return this.toString();
        }
        dom_node(next) {
            const node = next || $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            const id = this.dom_id();
            node.setAttribute('id', id);
            node.toString = $mol_const('<#' + id + '>');
            $mol_dom_render_attributes(node, this.attr_static());
            const events = $mol_wire_async(this.event());
            for (let event_name in events) {
                node.addEventListener(event_name, events[event_name], { passive: false });
            }
            return node;
        }
        dom_final() {
            this.render();
            const sub = this.sub_visible();
            if (!sub)
                return;
            for (const el of sub) {
                if (el && typeof el === 'object' && 'dom_final' in el) {
                    el['dom_final']();
                }
            }
            return this.dom_node();
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            render: try {
                $mol_dom_render_attributes(node, { mol_view_error: null });
                try {
                    this.render();
                }
                finally {
                    for (let plugin of this.plugins()) {
                        if (plugin instanceof $mol_plugin) {
                            plugin.dom_tree();
                        }
                    }
                }
            }
            catch (error) {
                $mol_fail_log(error);
                $mol_dom_render_attributes(node, { mol_view_error: error.name || error.constructor.name });
                if (error instanceof Promise)
                    break render;
                if ((error_showed.get(error) ?? this) !== this)
                    break render;
                try {
                    const message = error.message || error;
                    node.innerText = message.replace(/^|$/mg, '\xA0\xA0');
                }
                catch { }
                error_showed.set(error, this);
            }
            try {
                this.auto();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            return node;
        }
        dom_node_actual() {
            const node = this.dom_node();
            $mol_dom_render_styles(node, this.style_size());
            const attr = this.attr();
            const style = this.style();
            const fields = this.field();
            $mol_dom_render_attributes(node, attr);
            $mol_dom_render_styles(node, style);
            return node;
        }
        auto() {
            return null;
        }
        render() {
            const node = this.dom_node_actual();
            const sub = this.sub_visible();
            if (!sub)
                return;
            const nodes = sub.map(child => {
                if (child == null)
                    return null;
                return (child instanceof $mol_view)
                    ? child.dom_node()
                    : child instanceof $mol_dom_context.Node
                        ? child
                        : String(child);
            });
            $mol_dom_render_children(node, nodes);
            for (const el of sub)
                if (el && typeof el === 'object' && 'dom_tree' in el)
                    el['dom_tree']();
            $mol_dom_render_fields(node, this.field());
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        view_names_owned() {
            const names = [];
            let owner = $mol_owning_get(this);
            if (owner?.host instanceof $mol_view) {
                const suffix = owner.task.name.trim();
                const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                for (let Class of owner.host.constructor.view_classes()) {
                    if (suffix in Class.prototype)
                        names.push(this.$.$mol_func_name(Class) + suffix2);
                    else
                        break;
                }
                for (let prefix of owner.host.view_names_owned()) {
                    names.push(prefix + suffix2);
                }
            }
            return names;
        }
        view_names() {
            const names = [];
            for (let name of this.view_names_owned()) {
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            for (let Class of this.constructor.view_classes()) {
                const name = this.$.$mol_func_name(Class);
                if (!name)
                    continue;
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            return names;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {};
        }
        style_size() {
            return {
                minHeight: this.minimal_height(),
                minWidth: this.minimal_width(),
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        plugins() {
            return [];
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this));
        }
        *view_find(check, path = []) {
            if (check(this))
                return yield [...path, this];
            try {
                for (const item of this.sub()) {
                    if (item instanceof $mol_view) {
                        yield* item.view_find(check, [...path, this]);
                    }
                }
            }
            catch (error) {
                if (error instanceof Promise)
                    $mol_fail_hidden(error);
                $mol_fail_log(error);
            }
        }
        force_render(path) {
            const kids = this.sub();
            const index = kids.findIndex(item => {
                if (item instanceof $mol_view) {
                    return path.has(item);
                }
                else {
                    return false;
                }
            });
            if (index >= 0) {
                kids[index].force_render(path);
            }
        }
        ensure_visible(view, align = "start") {
            const path = this.view_find(v => v === view).next().value;
            this.force_render(new Set(path));
            this.dom_final();
            view.dom_node().scrollIntoView({ block: align });
        }
        bring() {
            new $mol_after_frame(() => {
                this.dom_node().scrollIntoView({ inline: 'start' });
                this.focused(true);
            });
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "autorun", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "dom_name", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "view_rect", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_final", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "dom_node_actual", null);
    __decorate([
        $mol_mem
    ], $mol_view.prototype, "render", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names_owned", null);
    __decorate([
        $mol_memo.method
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_view, "autobind", null);
    __decorate([
        $mol_memo.method
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//mol/view/view/view.ts
;
"use strict";
//mol/type/result/result.ts
;
"use strict";
//mol/type/error/error.ts
;
"use strict";
//mol/type/override/override.ts
;
"use strict";
//mol/style/properties/properties.ts
;
"use strict";
//mol/style/pseudo/class.ts
;
"use strict";
//mol/style/pseudo/element.ts
;
"use strict";
//mol/style/guard/guard.ts
;
"use strict";
var $;
(function ($) {
    function $mol_style_sheet(Component, config0) {
        let rules = [];
        const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
        const kebab = (name) => name.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
        const make_class = (prefix, path, config) => {
            const props = [];
            const selector = (prefix, path) => {
                if (path.length === 0)
                    return prefix || `[${block}]`;
                let res = `[${block}_${path.join('_')}]`;
                if (prefix)
                    res = prefix + ' :where(' + res + ')';
                return res;
            };
            for (const key of Object.keys(config).reverse()) {
                if (/^[a-z]/.test(key)) {
                    const addProp = (keys, val) => {
                        if (Array.isArray(val)) {
                            if (val[0] && [Array, Object].includes(val[0].constructor)) {
                                val = val.map(v => {
                                    return Object.entries(v).map(([n, a]) => {
                                        if (a === true)
                                            return kebab(n);
                                        if (a === false)
                                            return null;
                                        return String(a);
                                    }).filter(Boolean).join(' ');
                                }).join(',');
                            }
                            else {
                                val = val.join(' ');
                            }
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                        else if (val.constructor === Object) {
                            for (let suffix in val) {
                                addProp([...keys, kebab(suffix)], val[suffix]);
                            }
                        }
                        else {
                            props.push(`\t${keys.join('-')}: ${val};\n`);
                        }
                    };
                    addProp([kebab(key)], config[key]);
                }
                else if (/^[A-Z]/.test(key)) {
                    make_class(prefix, [...path, key.toLowerCase()], config[key]);
                }
                else if (key[0] === '$') {
                    make_class(selector(prefix, path) + ' :where([' + $mol_dom_qname(key) + '])', [], config[key]);
                }
                else if (key === '>') {
                    const types = config[key];
                    for (let type in types) {
                        make_class(selector(prefix, path) + ' > :where([' + $mol_dom_qname(type) + '])', [], types[type]);
                    }
                }
                else if (key === '@') {
                    const attrs = config[key];
                    for (let name in attrs) {
                        for (let val in attrs[name]) {
                            make_class(selector(prefix, path) + ':where([' + name + '=' + JSON.stringify(val) + '])', [], attrs[name][val]);
                        }
                    }
                }
                else if (key === '@media') {
                    const media = config[key];
                    for (let query in media) {
                        rules.push('}\n');
                        make_class(prefix, path, media[query]);
                        rules.push(`${key} ${query} {\n`);
                    }
                }
                else {
                    make_class(selector(prefix, path) + key, [], config[key]);
                }
            }
            if (props.length) {
                rules.push(`${selector(prefix, path)} {\n${props.reverse().join('')}}\n`);
            }
        };
        make_class('', [], config0);
        return rules.reverse().join('');
    }
    $.$mol_style_sheet = $mol_style_sheet;
})($ || ($ = {}));
//mol/style/sheet/sheet.ts
;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $mol_view {
        dom_node(next) {
            const node = next || $mol_owning_get(this).host.dom_node();
            $mol_dom_render_attributes(node, this.attr_static());
            const events = $mol_wire_async(this.event());
            for (let event_name in events) {
                node.addEventListener(event_name, events[event_name], { passive: false });
            }
            return node;
        }
        attr_static() {
            return {};
        }
        event() {
            return {};
        }
        render() {
            this.dom_node_actual();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_plugin.prototype, "dom_node", null);
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));
//mol/plugin/plugin.ts
;
"use strict";
var $;
(function ($) {
    function $mol_style_define(Component, config) {
        return $mol_style_attach(Component.name, $mol_style_sheet(Component, config));
    }
    $.$mol_style_define = $mol_style_define;
})($ || ($ = {}));
//mol/style/define/define.ts
;
"use strict";
var $;
(function ($) {
    class $mol_scroll extends $mol_view {
        scroll_top(val) {
            if (val !== undefined)
                return val;
            return 0;
        }
        scroll_left(val) {
            if (val !== undefined)
                return val;
            return 0;
        }
        field() {
            return {
                ...super.field(),
                tabIndex: this.tabindex()
            };
        }
        event() {
            return {
                ...super.event(),
                scroll: (event) => this.event_scroll(event)
            };
        }
        tabindex() {
            return -1;
        }
        event_scroll(event) {
            if (event !== undefined)
                return event;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $mol_mem
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $mol_mem
    ], $mol_scroll.prototype, "event_scroll", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//mol/scroll/-view.tree/scroll.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_dom_listener extends $mol_object {
        _node;
        _event;
        _handler;
        _config;
        constructor(_node, _event, _handler, _config = { passive: true }) {
            super();
            this._node = _node;
            this._event = _event;
            this._handler = _handler;
            this._config = _config;
            this._node.addEventListener(this._event, this._handler, this._config);
        }
        destructor() {
            this._node.removeEventListener(this._event, this._handler, this._config);
            super.destructor();
        }
    }
    $.$mol_dom_listener = $mol_dom_listener;
})($ || ($ = {}));
//mol/dom/listener/listener.ts
;
"use strict";
var $;
(function ($) {
    class $mol_print extends $mol_object {
        static before() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'beforeprint', () => {
                this.active(true);
            });
        }
        static after() {
            return new $mol_dom_listener(this.$.$mol_dom_context, 'afterprint', () => {
                this.active(false);
            });
        }
        static active(next) {
            this.before();
            this.after();
            return next || false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_print, "before", null);
    __decorate([
        $mol_mem
    ], $mol_print, "after", null);
    __decorate([
        $mol_mem
    ], $mol_print, "active", null);
    $.$mol_print = $mol_print;
})($ || ($ = {}));
//mol/print/print.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem, px } = $mol_style_unit;
        $mol_style_define($mol_scroll, {
            overflow: 'auto',
        });
        $mol_style_define($mol_scroll, {
            display: 'flex',
            overflow: 'overlay',
            flex: {
                direction: 'column',
                grow: 1,
                shrink: 1,
                basis: 0,
            },
            outline: 'none',
            alignSelf: 'stretch',
            boxSizing: 'border-box',
            willChange: 'scroll-position',
            scroll: {
                padding: [rem(.75), 0],
            },
            maxHeight: per(100),
            maxWidth: per(100),
            webkitOverflowScrolling: 'touch',
            contain: 'content',
            '>': {
                $mol_view: {
                    transform: 'translateZ(0)',
                },
            },
            '::-webkit-scrollbar': {
                width: rem(.25),
                height: rem(.25),
            },
            ':hover': {
                '::-webkit-scrollbar': {
                    width: rem(.5),
                    height: rem(.5),
                },
            },
            '@media': {
                'print': {
                    overflow: 'visible',
                    contain: 'none',
                    maxHeight: 'unset',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/scroll/scroll.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_scroll extends $.$mol_scroll {
            scroll_top(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollTop = next;
                return el.scrollTop;
            }
            scroll_left(next, cache) {
                const el = this.dom_node();
                if (next !== undefined && !cache)
                    el.scrollLeft = next;
                return el.scrollLeft;
            }
            event_scroll(next) {
                const el = this.dom_node();
                this.scroll_left(el.scrollLeft, 'cache');
                this.scroll_top(el.scrollTop, 'cache');
            }
            minimal_height() {
                return this.$.$mol_print.active() ? null : 0;
            }
            minimal_width() {
                return this.$.$mol_print.active() ? null : 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_top", null);
        __decorate([
            $mol_mem
        ], $mol_scroll.prototype, "scroll_left", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/scroll/scroll.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_book2 extends $mol_scroll {
        sub() {
            return this.pages();
        }
        minimal_width() {
            return 0;
        }
        Placeholder() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        pages() {
            return [];
        }
    }
    __decorate([
        $mol_mem
    ], $mol_book2.prototype, "Placeholder", null);
    $.$mol_book2 = $mol_book2;
})($ || ($ = {}));
//mol/book2/-view.tree/book2.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));
//mol/mem/cached/cached.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/book2/book2.view.css", "[mol_book2] {\n\tdisplay: flex;\n\tflex-flow: row nowrap;\n\talign-items: stretch;\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n\t/* transform: translateZ(0); */\n\ttransition: none;\n\toverflow: overlay;\n\tscroll-snap-type: x mandatory;\n}\n\n[mol_book2] > * {\n/* \tflex: none; */\n\tscroll-snap-stop: always;\n\tscroll-snap-align: end;\n\tposition: relative;\n\t/* z-index: 0; */\n\tmin-height: 100%;\n\tmax-height: 100%;\n\tmax-width: 100%;\n\tflex-shrink: 0;\n}\n[mol_book2] > * + *:not([mol_book2_placeholder]):before {\n\tdisplay: block;\n\tcontent: '=';\n\topacity: .5;\n\tposition: absolute;\n\ttop: -.5rem;\n\tleft: -.325rem;\n}\n\n[mol_book2] > *:nth-child(odd):not([mol_book2_placeholder]) {\n\tbackground-color: var(--mol_theme_card);\n}\n\n[mol_book2] > [mol_book2] {\n\tdisplay: contents;\n}\n\n[mol_book2] > *:first-child {\n\tscroll-snap-align: start;\n}\n\n[mol_book2] > [mol_view] {\n\ttransform: none; /* prevent content clipping */\n}\n\n[mol_book2_placeholder] {\n\tflex: 1 1 0;\n\t/* background: var(--mol_theme_back); */\n}\n");
})($ || ($ = {}));
//mol/book2/-css/book2.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_book2 extends $.$mol_book2 {
            title() {
                return this.pages().map(page => page?.title()).reverse().filter(Boolean).join(' | ');
            }
            sub() {
                const next = [...this.pages(), this.Placeholder()];
                const prev = $mol_mem_cached(() => this.sub()) ?? [];
                for (let i = 1; i++;) {
                    const p = prev[prev.length - i];
                    const n = next[next.length - i];
                    if (!n)
                        break;
                    if (p === n)
                        continue;
                    n.bring();
                    break;
                }
                return next;
            }
            bring() {
                const pages = this.pages();
                if (pages.length)
                    pages[pages.length - 1].bring();
                else
                    super.bring();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2.prototype, "sub", null);
        $$.$mol_book2 = $mol_book2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/book2/book2.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_svg extends $mol_view {
        dom_name() {
            return "svg";
        }
        dom_name_space() {
            return "http://www.w3.org/2000/svg";
        }
        font_size() {
            return 16;
        }
        font_family() {
            return "";
        }
        style_size() {
            return {};
        }
    }
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
//mol/svg/-view.tree/svg.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));
//mol/state/time/time.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg extends $.$mol_svg {
            computed_style() {
                const win = this.$.$mol_dom_context;
                const style = win.getComputedStyle(this.dom_node());
                if (!style['font-size'])
                    $mol_state_time.now(0);
                return style;
            }
            font_size() {
                return parseInt(this.computed_style()['font-size']) || 16;
            }
            font_family() {
                return this.computed_style()['font-family'];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "computed_style", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_size", null);
        __decorate([
            $mol_mem
        ], $mol_svg.prototype, "font_family", null);
        $$.$mol_svg = $mol_svg;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/svg/svg.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_svg_root extends $mol_svg {
        dom_name() {
            return "svg";
        }
        attr() {
            return {
                ...super.attr(),
                viewBox: this.view_box(),
                preserveAspectRatio: this.aspect()
            };
        }
        view_box() {
            return "0 0 100 100";
        }
        aspect() {
            return "xMidYMid";
        }
    }
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
//mol/svg/root/-view.tree/root.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/root/root.view.css", "[mol_svg_root] {\n\toverflow: hidden;\n}\n");
})($ || ($ = {}));
//mol/svg/root/-css/root.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_svg_path extends $mol_svg {
        dom_name() {
            return "path";
        }
        attr() {
            return {
                ...super.attr(),
                d: this.geometry()
            };
        }
        geometry() {
            return "";
        }
    }
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
//mol/svg/path/-view.tree/path.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon extends $mol_svg_root {
        view_box() {
            return "0 0 24 24";
        }
        minimal_width() {
            return 16;
        }
        minimal_height() {
            return 16;
        }
        sub() {
            return [
                this.Path()
            ];
        }
        path() {
            return "";
        }
        Path() {
            const obj = new this.$.$mol_svg_path();
            obj.geometry = () => this.path();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_icon.prototype, "Path", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//mol/icon/-view.tree/icon.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/icon/icon.view.css", "[mol_icon] {\n\tfill: currentColor;\n\tstroke: none;\n\twidth: 1rem;\n\theight: 1rem;\n\tflex: 0 0 auto;\n\tvertical-align: top;\n\tmargin: .25rem 0;\n\tdisplay: inline-block;\n\tfilter: drop-shadow(0px 1px 1px var(--mol_theme_back));\n\ttransform-origin: center;\n}\n\n[mol_icon_path] {\n\ttransform-origin: center;\n}\n");
})($ || ($ = {}));
//mol/icon/-css/icon.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_link extends $mol_view {
        uri() {
            return "";
        }
        dom_name() {
            return "a";
        }
        attr() {
            return {
                ...super.attr(),
                href: this.uri_toggle(),
                title: this.hint_safe(),
                target: this.target(),
                download: this.file_name(),
                mol_link_current: this.current()
            };
        }
        sub() {
            return [
                this.title()
            ];
        }
        arg() {
            return {};
        }
        event() {
            return {
                ...super.event(),
                click: (event) => this.click(event)
            };
        }
        uri_toggle() {
            return "";
        }
        hint() {
            return "";
        }
        hint_safe() {
            return this.hint();
        }
        target() {
            return "_self";
        }
        file_name() {
            return "";
        }
        current() {
            return false;
        }
        event_click(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        click(event) {
            return this.event_click(event);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_link.prototype, "event_click", null);
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//mol/link/-view.tree/link.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_arg extends $mol_object {
        prefix;
        static href(next) {
            return next || process.argv.slice(2).join(' ');
        }
        static href_normal() {
            return this.link({});
        }
        static dict(next) {
            if (next !== void 0)
                this.href(this.make_link(next));
            var href = this.href();
            var chunks = href.split(' ');
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static value(key, next) {
            if (next === void 0)
                return this.dict()[key] ?? null;
            this.href(this.link({ [key]: next }));
            return next;
        }
        static link(next) {
            var params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make_link(params);
        }
        static make_link(next) {
            var chunks = [];
            for (var key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
            }
            return chunks.join(' ');
        }
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "href_normal", null);
    __decorate([
        $mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));
//mol/state/arg/arg.node.ts
;
"use strict";
var $;
(function ($) {
    const { rem } = $mol_style_unit;
    const { scale } = $mol_style_func;
    $mol_style_define($mol_link, {
        textDecoration: 'none',
        color: $mol_theme.control,
        stroke: 'currentcolor',
        cursor: 'pointer',
        padding: $mol_gap.text,
        boxSizing: 'border-box',
        position: 'relative',
        minWidth: rem(2.5),
        gap: $mol_gap.space,
        border: {
            radius: $mol_gap.round,
        },
        ':hover': {
            background: {
                color: $mol_theme.hover,
            },
            $mol_icon: {
                transform: 'scale(1.5)',
            },
        },
        ':focus': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            },
            $mol_icon: {
                transform: 'scale(1.5)',
            },
        },
        ':focus-within': {
            outline: 'none',
            background: {
                color: $mol_theme.hover,
            }
        },
        ':active': {
            color: $mol_theme.focus,
        },
        '@': {
            mol_link_current: {
                'true': {
                    color: $mol_theme.current,
                    textShadow: '0 0',
                }
            }
        },
    });
})($ || ($ = {}));
//mol/link/link.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link extends $.$mol_link {
            uri_toggle() {
                return this.current() ? this.uri_off() : this.uri();
            }
            uri() {
                return new this.$.$mol_state_arg(this.state_key()).link(this.arg());
            }
            uri_off() {
                const arg2 = {};
                for (let i in this.arg())
                    arg2[i] = null;
                return new this.$.$mol_state_arg(this.state_key()).link(arg2);
            }
            uri_native() {
                const base = this.$.$mol_state_arg.href();
                return new URL(this.uri(), base);
            }
            current() {
                const base = this.$.$mol_state_arg.href_normal();
                const target = this.uri_native().toString();
                if (base === target)
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) != args[key])
                        return false;
                }
                return true;
            }
            file_name() {
                return null;
            }
            minimal_height() {
                return Math.max(super.minimal_height(), 24);
            }
            external() {
                return this.uri_native().origin !== $mol_dom_context.location.origin;
            }
            target() {
                return this.external() ? '_blank' : '_self';
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_toggle", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_off", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "uri_native", null);
        __decorate([
            $mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/link/link.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_page extends $mol_view {
        dom_name() {
            return "article";
        }
        field() {
            return {
                ...super.field(),
                tabIndex: this.tabindex()
            };
        }
        sub() {
            return [
                this.Head(),
                this.Body(),
                this.Foot()
            ];
        }
        tabindex() {
            return -1;
        }
        Logo() {
            return null;
        }
        title_content() {
            return [
                this.Logo(),
                this.title()
            ];
        }
        Title() {
            const obj = new this.$.$mol_view();
            obj.dom_name = () => "h1";
            obj.sub = () => this.title_content();
            return obj;
        }
        tools() {
            return [];
        }
        Tools() {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.tools();
            return obj;
        }
        head() {
            return [
                this.Title(),
                this.Tools()
            ];
        }
        Head() {
            const obj = new this.$.$mol_view();
            obj.minimal_height = () => 64;
            obj.dom_name = () => "header";
            obj.sub = () => this.head();
            return obj;
        }
        body() {
            return [];
        }
        body_scroll_top(val) {
            return this.Body().scroll_top(val);
        }
        Body() {
            const obj = new this.$.$mol_scroll();
            obj.sub = () => this.body();
            return obj;
        }
        foot() {
            return [];
        }
        Foot() {
            const obj = new this.$.$mol_view();
            obj.dom_name = () => "footer";
            obj.sub = () => this.foot();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Tools", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $mol_mem
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//mol/page/-view.tree/page.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { per, rem } = $mol_style_unit;
        const { calc } = $mol_style_func;
        $mol_style_define($mol_page, {
            display: 'flex',
            margin: 0,
            flex: {
                basis: 'auto',
                direction: 'column',
            },
            position: 'relative',
            alignSelf: 'stretch',
            maxWidth: per(100),
            maxHeight: per(100),
            boxSizing: 'border-box',
            color: $mol_theme.text,
            ':focus': {
                outline: 'none',
            },
            Head: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                flex: 'none',
                position: 'relative',
                margin: 0,
                minHeight: rem(4),
                padding: $mol_gap.block,
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                boxShadow: `0 0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)`,
                zIndex: 2,
            },
            Title: {
                minHeight: rem(2),
                margin: 0,
                padding: $mol_gap.text,
                gap: $mol_gap.text,
                wordBreak: 'normal',
                textShadow: '0 0',
                font: {
                    size: 'inherit',
                    weight: 'normal',
                },
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
            Tools: {
                flex: {
                    basis: 'auto',
                    grow: 1000,
                    shrink: 1,
                },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            },
            Body: {
                flex: {
                    grow: 1000,
                    shrink: 1,
                    basis: per(100),
                },
            },
            Foot: {
                display: 'flex',
                justifyContent: 'space-between',
                flex: 'none',
                margin: 0,
                overflow: 'hidden',
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                boxShadow: `0 -0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)`,
                zIndex: 1,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/page/page.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_cross extends $mol_icon {
        path() {
            return "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z";
        }
    }
    $.$mol_icon_cross = $mol_icon_cross;
})($ || ($ = {}));
//mol/icon/cross/-view.tree/cross.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $koplenov_artel_catalog extends $mol_book2 {
        title() {
            return null;
        }
        param() {
            return "";
        }
        spreads() {
            return {};
        }
        blank() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        pages() {
            return [
                this.Menu()
            ];
        }
        Link(id) {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.arg(id);
            obj.sub = () => [
                this.spread_title(id)
            ];
            return obj;
        }
        Spread_close() {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.spread_close_arg();
            obj.sub = () => [
                this.Spread_close_icon()
            ];
            return obj;
        }
        Spread() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        links() {
            return [];
        }
        content() {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.links();
            return obj;
        }
        Links() {
            const obj = new this.$.$mol_scroll();
            obj.sub = () => [
                this.content()
            ];
            return obj;
        }
        Menu() {
            const obj = new this.$.$mol_page();
            obj.Head = () => null;
            obj.body = () => [
                this.Spread()
            ];
            obj.foot = () => [
                this.Links()
            ];
            return obj;
        }
        arg(id) {
            return {};
        }
        spread_title(id) {
            return "";
        }
        spread_close_arg() {
            return {};
        }
        Spread_close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel_catalog.prototype, "blank", null);
    __decorate([
        $mol_mem_key
    ], $koplenov_artel_catalog.prototype, "Link", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_catalog.prototype, "Spread_close", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_catalog.prototype, "Spread", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_catalog.prototype, "content", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_catalog.prototype, "Links", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_catalog.prototype, "Menu", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_catalog.prototype, "Spread_close_icon", null);
    $.$koplenov_artel_catalog = $koplenov_artel_catalog;
})($ || ($ = {}));
//koplenov/artel/catalog/-view.tree/catalog.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("koplenov/artel/catalog/catalog.view.css", "[koplenov_artel_catalog_links] {\n\tpadding: var(--mol_gap_block);\n}\n");
})($ || ($ = {}));
//koplenov/artel/catalog/-css/catalog.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $koplenov_artel_catalog extends $.$koplenov_artel_catalog {
            pages() {
                return [
                    this.Menu(),
                    ...this.spread() != null ? [this.Spread()] : [],
                ];
            }
            links() {
                return Object.keys(this.spreads()).map(spread => this.Link(spread));
            }
            Spread() {
                return this.spreads()[this.spread()] ?? this.blank();
            }
            spread() {
                return this.$.$mol_state_arg.value(this.param()) ?? '';
            }
            arg(spread) {
                return { [this.param()]: spread || null };
            }
            spread_close_arg() {
                return { [this.param()]: null };
            }
            spread_title(spread) {
                return this.spreads()[spread].title();
            }
        }
        __decorate([
            $mol_mem
        ], $koplenov_artel_catalog.prototype, "pages", null);
        __decorate([
            $mol_mem
        ], $koplenov_artel_catalog.prototype, "links", null);
        __decorate([
            $mol_mem
        ], $koplenov_artel_catalog.prototype, "spread", null);
        $$.$koplenov_artel_catalog = $koplenov_artel_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//koplenov/artel/catalog/catalog.view.ts
;
"use strict";
//hyoo/hyoo.ts
;
"use strict";
var $;
(function ($) {
    class $mol_theme_auto extends $mol_plugin {
        attr() {
            return {
                mol_theme: this.theme()
            };
        }
        theme() {
            return "";
        }
    }
    $.$mol_theme_auto = $mol_theme_auto;
})($ || ($ = {}));
//mol/theme/auto/-view.tree/auto.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_media extends $mol_object2 {
        static match(query, next) {
            if (next !== undefined)
                return next;
            const res = this.$.$mol_dom_context.matchMedia?.(query) ?? {};
            res.onchange = () => this.match(query, res.matches);
            return res.matches;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_media, "match", null);
    $.$mol_media = $mol_media;
})($ || ($ = {}));
//mol/media/media.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//mol/state/local/local.ts
;
"use strict";
var $;
(function ($) {
    function parse(theme) {
        if (theme === 'true')
            return true;
        if (theme === 'false')
            return false;
        return null;
    }
    function $mol_lights(next) {
        const arg = parse(this.$mol_state_arg.value('mol_lights'));
        const base = this.$mol_media.match('(prefers-color-scheme: light)');
        if (next === undefined) {
            return arg ?? this.$mol_state_local.value('$mol_lights') ?? base;
        }
        else {
            if (arg === null) {
                this.$mol_state_local.value('$mol_lights', next === base ? null : next);
            }
            else {
                this.$mol_state_arg.value('mol_lights', String(next));
            }
            return next;
        }
    }
    $.$mol_lights = $mol_lights;
})($ || ($ = {}));
//mol/lights/lights.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_theme_auto extends $.$mol_theme_auto {
            theme() {
                return this.$.$mol_lights() ? '$mol_theme_light' : '$mol_theme_dark';
            }
        }
        $$.$mol_theme_auto = $mol_theme_auto;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/theme/auto/auto.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_hotkey extends $mol_plugin {
        event() {
            return {
                ...super.event(),
                keydown: (event) => this.keydown(event)
            };
        }
        key() {
            return {};
        }
        mod_ctrl() {
            return false;
        }
        mod_alt() {
            return false;
        }
        mod_shift() {
            return false;
        }
        keydown(event) {
            if (event !== undefined)
                return event;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_hotkey.prototype, "keydown", null);
    $.$mol_hotkey = $mol_hotkey;
})($ || ($ = {}));
//mol/hotkey/-view.tree/hotkey.view.tree.ts
;
"use strict";
var $;
(function ($) {
    let $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["slashBackLeft"] = 226] = "slashBackLeft";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//mol/keyboard/code.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_hotkey extends $.$mol_hotkey {
            key() {
                return super.key();
            }
            keydown(event) {
                if (!event)
                    return;
                if (event.defaultPrevented)
                    return;
                let name = $mol_keyboard_code[event.keyCode];
                if (this.mod_ctrl() !== event.ctrlKey)
                    return;
                if (this.mod_alt() !== event.altKey)
                    return;
                if (this.mod_shift() !== event.shiftKey)
                    return;
                const handle = this.key()[name];
                if (handle)
                    handle(event);
            }
        }
        $$.$mol_hotkey = $mol_hotkey;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/hotkey/hotkey.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_plus extends $mol_icon {
        path() {
            return "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
        }
    }
    $.$mol_icon_plus = $mol_icon_plus;
})($ || ($ = {}));
//mol/icon/plus/-view.tree/plus.view.tree.ts
;
"use strict";
//mol/charset/encoding/encoding.ts
;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));
//mol/charset/decode/decode.ts
;
"use strict";
var $;
(function ($) {
    const TextEncoder = globalThis.TextEncoder ?? $node.util.TextEncoder;
    const encoder = new TextEncoder();
    function $mol_charset_encode(value) {
        return encoder.encode(value);
    }
    $.$mol_charset_encode = $mol_charset_encode;
})($ || ($ = {}));
//mol/charset/encode/encode.ts
;
"use strict";
var $;
(function ($) {
    class $mol_file_not_found extends Error {
    }
    $.$mol_file_not_found = $mol_file_not_found;
    class $mol_file extends $mol_object {
        static absolute(path) {
            throw new Error('Not implemented yet');
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        reset() {
            try {
                this.stat(null);
            }
            catch (error) {
                if (error instanceof $mol_file_not_found)
                    return;
                return $mol_fail_hidden(error);
            }
        }
        version() {
            return this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
        }
        watcher() {
            console.warn('$mol_file_web.watcher() not implemented');
            return {
                destructor() { }
            };
        }
        exists(next) {
            let exists = Boolean(this.stat());
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next)
                this.parent().exists(true);
            this.ensure();
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            if (virt) {
                const now = new Date;
                this.stat({
                    type: 'file',
                    size: 0,
                    atime: now,
                    mtime: now,
                    ctime: now,
                }, 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer(undefined));
            }
            else {
                const buffer = next === undefined ? undefined : $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file.prototype, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//mol/file/file.ts
;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));
//mol/compare/array/array.ts
;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    class $mol_file_node extends $mol_file {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher() {
            const watcher = $node.chokidar.watch(this.path(), {
                persistent: true,
                ignored: /(^\.|___$)/,
                depth: 0,
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                },
            });
            watcher
                .on('all', (type, path) => {
                const file = $mol_file.relative(path.replace(/\\/g, '/'));
                file.reset();
                if (type === 'change') {
                    this.stat(null);
                }
                else {
                    file.parent().reset();
                }
            })
                .on('error', $mol_fail_log);
            return {
                destructor() {
                    watcher.close();
                }
            };
        }
        stat(next, virt) {
            let stat = next;
            const path = this.path();
            this.parent().watcher();
            if (virt)
                return next;
            try {
                stat = next ?? stat_convert($node.fs.statSync(path, { throwIfNoEntry: false }));
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    error = new $mol_file_not_found(`File not found`);
                error.message += '\n' + path;
                return this.$.$mol_fail_hidden(error);
            }
            return stat;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path);
            }
            catch (e) {
                e.message += '\n' + path;
                this.$.$mol_fail_hidden(e);
            }
        }
        buffer(next) {
            const path = this.path();
            if (next === undefined) {
                if (!this.stat())
                    return new Uint8Array;
                try {
                    const prev = $mol_mem_cached(() => this.buffer());
                    next = buffer_normalize($node.fs.readFileSync(path));
                    if (prev !== undefined && !$mol_compare_array(prev, next)) {
                        this.$.$mol_log3_rise({
                            place: `$mol_file_node..buffer()`,
                            message: 'Changed',
                            path: this.relate(),
                        });
                    }
                    return next;
                }
                catch (error) {
                    error.message += '\n' + path;
                    return this.$.$mol_fail_hidden(error);
                }
            }
            this.parent().exists(true);
            const now = new Date;
            this.stat({
                type: 'file',
                size: next.length,
                atime: now,
                mtime: now,
                ctime: now,
            }, 'virt');
            try {
                $node.fs.writeFileSync(path, next);
            }
            catch (error) {
                error.message += '\n' + path;
                return this.$.$mol_fail_hidden(error);
            }
            return next;
        }
        sub() {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            const path = this.path();
            try {
                return $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
            }
            catch (e) {
                e.message += '\n' + path;
                return this.$.$mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor.relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        append(next) {
            const path = this.path();
            try {
                $node.fs.appendFileSync(path, next);
            }
            catch (e) {
                e.message += '\n' + path;
                return this.$.$mol_fail_hidden(e);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "buffer", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "sub", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node, "absolute", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));
//mol/file/file.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if (error instanceof Promise)
                    $mol_fail_hidden(error);
                const def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        }
        static text(key) {
            for (let lang of [this.lang(), 'en']) {
                const text = this.texts(lang)[key];
                if (text)
                    return text;
                this.warn(key);
            }
            return `<${key}>`;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//mol/locale/locale.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_github_circle extends $mol_icon {
        path() {
            return "M12,2C6.48,2 2,6.48 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12C22,6.48 17.52,2 12,2Z";
        }
    }
    $.$mol_icon_github_circle = $mol_icon_github_circle;
})($ || ($ = {}));
//mol/icon/github/circle/-view.tree/circle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_link_source extends $mol_link {
        hint() {
            return this.$.$mol_locale.text('$mol_link_source_hint');
        }
        sub() {
            return [
                this.Icon()
            ];
        }
        Icon() {
            const obj = new this.$.$mol_icon_github_circle();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_link_source.prototype, "Icon", null);
    $.$mol_link_source = $mol_link_source;
})($ || ($ = {}));
//mol/link/source/-view.tree/source.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_speck extends $mol_view {
        attr() {
            return {
                ...super.attr(),
                mol_theme: "$mol_theme_accent"
            };
        }
        style() {
            return {
                ...super.style(),
                minHeight: "1em"
            };
        }
        sub() {
            return [
                this.value()
            ];
        }
        value() {
            return null;
        }
    }
    $.$mol_speck = $mol_speck;
})($ || ($ = {}));
//mol/speck/-view.tree/speck.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/speck/speck.view.css", "[mol_speck] {\n\tfont-size: .625rem;\n\tborder-radius: 1rem;\n\tmargin: -0.5rem -0.25rem;\n\talign-self: flex-start;\n\tmin-height: 1em;\n\tmin-width: .5em;\n\tvertical-align: sub;\n\tpadding: .25em .5em;\n\tposition: absolute;\n\tz-index: 2;\n\ttext-align: center;\n\tline-height: 1;\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n}\n");
})($ || ($ = {}));
//mol/speck/-css/speck.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button extends $mol_view {
        enabled() {
            return true;
        }
        click(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_click(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event() {
            return {
                ...super.event(),
                click: (event) => this.event_activate(event),
                dblclick: (event) => this.clicks(event),
                keydown: (event) => this.event_key_press(event)
            };
        }
        attr() {
            return {
                ...super.attr(),
                disabled: this.disabled(),
                role: "button",
                tabindex: this.tab_index(),
                title: this.hint_safe()
            };
        }
        sub() {
            return [
                this.title()
            ];
        }
        Speck() {
            const obj = new this.$.$mol_speck();
            obj.value = () => this.error();
            return obj;
        }
        event_activate(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        clicks(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_key_press(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        disabled() {
            return false;
        }
        tab_index() {
            return 0;
        }
        hint() {
            return "";
        }
        hint_safe() {
            return this.hint();
        }
        error() {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "click", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "Speck", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "clicks", null);
    __decorate([
        $mol_mem
    ], $mol_button.prototype, "event_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//mol/button/-view.tree/button.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/button.view.css", "[mol_button] {\n\tborder: none;\n\tfont: inherit;\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\ttext-decoration: inherit;\n\tcursor: inherit;\n\tposition: relative;\n\tbox-sizing: border-box;\n\tword-break: normal;\n\tcursor: default;\n\tuser-select: none;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_button]:focus {\n\toutline: none;\n}\n");
})($ || ($ = {}));
//mol/button/-css/button.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button extends $.$mol_button {
            status(next = [null]) { return next; }
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                try {
                    this.event_click(next);
                    this.click(next);
                    this.status([null]);
                }
                catch (error) {
                    this.status([error]);
                    $mol_fail_hidden(error);
                }
            }
            event_key_press(event) {
                if (event.keyCode === $mol_keyboard_code.enter) {
                    return this.event_activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : -1;
            }
            error() {
                const [error] = this.status();
                if (!error)
                    return '';
                if (error instanceof Promise) {
                    return $mol_fail_hidden(error);
                }
                return String(error.message ?? error);
            }
            hint_safe() {
                try {
                    return this.hint();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return '';
                }
            }
            sub_visible() {
                return [
                    ...this.error() ? [this.Speck()] : [],
                    ...this.sub(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button.prototype, "status", null);
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/button/button.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_typed extends $mol_button {
        minimal_height() {
            return 40;
        }
        minimal_width() {
            return 40;
        }
    }
    $.$mol_button_typed = $mol_button_typed;
})($ || ($ = {}));
//mol/button/typed/-view.tree/typed.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/typed/typed.view.css", "[mol_button_typed] {\n\talign-content: center;\n\talign-items: center;\n\tpadding: var(--mol_gap_text);\n\tborder-radius: var(--mol_gap_round);\n\tgap: var(--mol_gap_space);\n\tuser-select: none;\n\tcursor: pointer;\n}\n\n[mol_button_typed][disabled] {\n\tpointer-events: none;\n}\n\n[mol_button_typed]:hover ,\n[mol_button_typed]:focus {\n\tbackground-color: var(--mol_theme_hover);\n}\n\n[mol_button_typed]:hover [mol_icon] ,\n[mol_button_typed]:focus [mol_icon] {\n\ttransform: scale(1.5);\n}\n\n[mol_button_typed]:active {\n\tcolor: var(--mol_theme_focus);\n}\n\n");
})($ || ($ = {}));
//mol/button/typed/-css/typed.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_minor extends $mol_button_typed {
    }
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
//mol/button/minor/-view.tree/minor.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/button/minor/minor.view.css", "[mol_button_minor] {\n\tcolor: var(--mol_theme_control);\n}\n\n[mol_button_minor][disabled] {\n\tcolor: var(--mol_theme_shade);\n}\n");
})($ || ($ = {}));
//mol/button/minor/-css/minor.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_check extends $mol_button_minor {
        attr() {
            return {
                ...super.attr(),
                mol_check_checked: this.checked(),
                "aria-checked": this.checked(),
                role: "checkbox"
            };
        }
        sub() {
            return [
                this.Icon(),
                this.label()
            ];
        }
        checked(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        Icon() {
            return null;
        }
        title() {
            return "";
        }
        Title() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.title()
            ];
            return obj;
        }
        label() {
            return [
                this.Title()
            ];
        }
    }
    __decorate([
        $mol_mem
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $mol_mem
    ], $mol_check.prototype, "Title", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//mol/check/-view.tree/check.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));
//mol/maybe/maybe.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/check.css", "[mol_check] {\n\tflex: 0 0 auto;\n\tjustify-content: flex-start;\n\talign-content: center;\n\talign-items: flex-start;\n\tborder: none;\n\tfont-weight: inherit;\n\tbox-shadow: none;\n\ttext-align: left;\n\tpadding: var(--mol_gap_text);\n\tdisplay: inline-flex;\n\tflex-wrap: nowrap;\n}\n\n[mol_check_title] {\n\tflex-shrink: 1;\n}\n");
})($ || ($ = {}));
//mol/check/-css/check.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check extends $.$mol_check {
            click(next) {
                if (next?.defaultPrevented)
                    return;
                this.checked(!this.checked());
                if (next)
                    next.preventDefault();
            }
            sub() {
                return [
                    ...$mol_maybe(this.Icon()),
                    ...this.label(),
                ];
            }
            label() {
                return this.title() ? super.label() : [];
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/check/check.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_check_icon extends $mol_check {
    }
    $.$mol_check_icon = $mol_check_icon;
})($ || ($ = {}));
//mol/check/icon/-view.tree/icon.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/icon/icon.view.css", "[mol_check_icon][mol_check_checked] {\n\tcolor: var(--mol_theme_current);\n}\n");
})($ || ($ = {}));
//mol/check/icon/-css/icon.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_brightness_6 extends $mol_icon {
        path() {
            return "M12,18V6C15.31,6 18,8.69 18,12C18,15.31 15.31,18 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z";
        }
    }
    $.$mol_icon_brightness_6 = $mol_icon_brightness_6;
})($ || ($ = {}));
//mol/icon/brightness/6/-view.tree/6.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_lights_toggle extends $mol_check_icon {
        Icon() {
            return this.Lights_icon();
        }
        hint() {
            return this.$.$mol_locale.text('$mol_lights_toggle_hint');
        }
        checked(val) {
            return this.lights(val);
        }
        Lights_icon() {
            const obj = new this.$.$mol_icon_brightness_6();
            return obj;
        }
        lights(val) {
            if (val !== undefined)
                return val;
            return false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_lights_toggle.prototype, "Lights_icon", null);
    __decorate([
        $mol_mem
    ], $mol_lights_toggle.prototype, "lights", null);
    $.$mol_lights_toggle = $mol_lights_toggle;
})($ || ($ = {}));
//mol/lights/toggle/-view.tree/toggle.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_lights_toggle extends $.$mol_lights_toggle {
            lights(next) {
                return this.$.$mol_lights(next);
            }
        }
        $$.$mol_lights_toggle = $mol_lights_toggle;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/lights/toggle/toggle.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_pop extends $mol_view {
        showed(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        align_vert() {
            return "";
        }
        align_hor() {
            return "";
        }
        sub() {
            return [
                this.Anchor()
            ];
        }
        sub_visible() {
            return [
                this.Anchor(),
                this.Bubble()
            ];
        }
        Anchor() {
            return null;
        }
        align() {
            return "bottom_center";
        }
        bubble_content() {
            return [];
        }
        height_max() {
            return 9999;
        }
        Bubble() {
            const obj = new this.$.$mol_pop_bubble();
            obj.align = () => this.align();
            obj.content = () => this.bubble_content();
            obj.height_max = () => this.height_max();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_pop.prototype, "showed", null);
    __decorate([
        $mol_mem
    ], $mol_pop.prototype, "Bubble", null);
    $.$mol_pop = $mol_pop;
    class $mol_pop_bubble extends $mol_scroll {
        sub() {
            return this.content();
        }
        style() {
            return {
                ...super.style(),
                maxHeight: this.height_max()
            };
        }
        attr() {
            return {
                ...super.attr(),
                mol_pop_align: this.align(),
                tabindex: 0
            };
        }
        content() {
            return [];
        }
        height_max() {
            return 9999;
        }
        align() {
            return "";
        }
    }
    $.$mol_pop_bubble = $mol_pop_bubble;
})($ || ($ = {}));
//mol/pop/-view.tree/pop.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pop/pop.view.css", "[mol_pop] {\n\tposition: relative;\n\tdisplay: inline-flex;\n}\n\n[mol_pop]:hover {\n\tz-index: 4;\n}\n\n[mol_pop_bubble] {\n\tbox-shadow: 0 0 1rem hsla(0,0%,0%,.5);\n\tborder-radius: var(--mol_gap_round);\n\tposition: absolute;\n\tz-index: 3;\n\tbackground: var(--mol_theme_back);\n\tmax-width: none;\n\tmax-height: none;\n\toverflow: hidden;\n\toverflow-y: scroll;\n\toverflow-y: overlay;\n\tword-break: normal;\n\twidth: max-content;\n\theight: max-content;\n}\n\n[mol_pop_bubble][mol_scroll] {\n\tbackground: var(--mol_theme_back);\n}\n\n[mol_pop_bubble]:focus {\n\toutline: none;\n}\n\n[mol_pop_align=\"suspense\"] {\n\tdisplay: none;\n}\n\n[mol_pop_align=\"left_top\"] {\n\ttransform: translate(-100%);\n\tleft: 0;\n\tbottom: 0;\n}\n\n[mol_pop_align=\"left_center\"] {\n\ttransform: translate(-100%, -50%);\n\tleft: 0;\n\ttop: 50%;\n}\n\n[mol_pop_align=\"left_bottom\"] {\n\ttransform: translate(-100%);\n\tleft: 0;\n\ttop: 0;\n}\n\n[mol_pop_align=\"right_top\"] {\n\ttransform: translate(100%);\n\tright: 0;\n\tbottom: 0;\n}\n\n[mol_pop_align=\"right_center\"] {\n\ttransform: translate(100%, -50%);\n\tright: 0;\n\ttop: 50%;\n}\n\n[mol_pop_align=\"right_bottom\"] {\n\ttransform: translate(100%);\n\tright: 0;\n\ttop: 0;\n}\n\n[mol_pop_align=\"center\"] {\n\tleft: 50%;\n\ttop: 50%;\n\ttransform: translate(-50%, -50%);\n}\n\n[mol_pop_align=\"top_left\"] {\n\tright: 0;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"top_center\"] {\n\ttransform: translate(-50%);\n\tleft: 50%;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"top_right\"] {\n\tleft: 0;\n\tbottom: 100%;\n}\n\n[mol_pop_align=\"bottom_left\"] {\n\tright: 0;\n\ttop: 100%;\n}\n\n[mol_pop_align=\"bottom_center\"] {\n\ttransform: translate(-50%);\n\tleft: 50%;\n\ttop: 100%;\n}\n\n[mol_pop_align=\"bottom_right\"] {\n\tleft: 0;\n\ttop: 100%;\n}\n");
})($ || ($ = {}));
//mol/pop/-css/pop.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_pop extends $.$mol_pop {
            showed(next = false) {
                this.focused();
                return next;
            }
            sub_visible() {
                return [
                    this.Anchor(),
                    ...this.showed() ? [this.Bubble()] : [],
                ];
            }
            height_max() {
                const viewport = this.$.$mol_window.size();
                const rect_bubble = this.view_rect();
                const align = this.align_vert();
                if (align === 'bottom')
                    return (viewport.height - rect_bubble.bottom) * .66;
                if (align === 'top')
                    return rect_bubble.top * .66;
                return 0;
            }
            align() {
                return `${this.align_vert()}_${this.align_hor()}`;
            }
            align_vert() {
                const viewport = this.view_port();
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                return rect_pop.top > (viewport.top + viewport.height / 2) ? 'top' : 'bottom';
            }
            align_hor() {
                const viewport = this.view_port();
                const rect_pop = this.view_rect();
                if (!rect_pop)
                    return 'suspense';
                return rect_pop.left > (viewport.left + viewport.width / 2) ? 'left' : 'right';
            }
            View_port() {
                const view = new $mol_view;
                view.dom_node = () => {
                    let node = this.dom_node();
                    while (node = node.offsetParent) {
                        if (this.$.$mol_dom_context.getComputedStyle(node).overflow !== 'visible')
                            return node;
                    }
                    return this.$.$mol_dom_context.document.documentElement;
                };
                return view;
            }
            view_port() {
                return this.View_port().view_rect() ?? { ...this.$.$mol_window.size(), left: 0, top: 0 };
            }
        }
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "showed", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "height_max", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_vert", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "align_hor", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "View_port", null);
        __decorate([
            $mol_mem
        ], $mol_pop.prototype, "view_port", null);
        $$.$mol_pop = $mol_pop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/pop/pop.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_nav extends $mol_plugin {
        cycle(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        mod_ctrl() {
            return false;
        }
        mod_shift() {
            return false;
        }
        mod_alt() {
            return false;
        }
        keys_x(val) {
            if (val !== undefined)
                return val;
            return [];
        }
        keys_y(val) {
            if (val !== undefined)
                return val;
            return [];
        }
        current_x(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        current_y(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        event_up(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_down(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_left(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_right(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event() {
            return {
                ...super.event(),
                keydown: (event) => this.event_key(event)
            };
        }
        event_key(event) {
            if (event !== undefined)
                return event;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "cycle", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "keys_x", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "keys_y", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "current_x", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "current_y", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_up", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_down", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_left", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_right", null);
    __decorate([
        $mol_mem
    ], $mol_nav.prototype, "event_key", null);
    $.$mol_nav = $mol_nav;
})($ || ($ = {}));
//mol/nav/-view.tree/nav.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_nav extends $.$mol_nav {
            event_key(event) {
                if (!event)
                    return event;
                if (event.defaultPrevented)
                    return;
                if (this.mod_ctrl() && !event.ctrlKey)
                    return;
                if (this.mod_shift() && !event.shiftKey)
                    return;
                if (this.mod_alt() && !event.altKey)
                    return;
                switch (event.keyCode) {
                    case $mol_keyboard_code.up: return this.event_up(event);
                    case $mol_keyboard_code.down: return this.event_down(event);
                    case $mol_keyboard_code.left: return this.event_left(event);
                    case $mol_keyboard_code.right: return this.event_right(event);
                    case $mol_keyboard_code.pageUp: return this.event_up(event);
                    case $mol_keyboard_code.pageDown: return this.event_down(event);
                }
            }
            event_up(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? 0 : index_y;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_down(event) {
                if (!event)
                    return event;
                const keys = this.keys_y();
                if (keys.length < 1)
                    return;
                const index_y = this.index_y();
                const index_old = index_y === null ? keys.length - 1 : index_y;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_y(this.keys_y()[index_new]);
            }
            event_left(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? 0 : index_x;
                const index_new = (index_old + keys.length - 1) % keys.length;
                event.preventDefault();
                if (index_old === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            event_right(event) {
                if (!event)
                    return event;
                const keys = this.keys_x();
                if (keys.length < 1)
                    return;
                const index_x = this.index_x();
                const index_old = index_x === null ? keys.length - 1 : index_x;
                const index_new = (index_old + 1) % keys.length;
                event.preventDefault();
                if (index_new === 0 && !this.cycle())
                    return;
                this.current_x(this.keys_x()[index_new]);
            }
            index_y() {
                let index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            }
            index_x() {
                let index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            }
        }
        $$.$mol_nav = $mol_nav;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/nav/nav.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_string extends $mol_view {
        dom_name() {
            return "input";
        }
        enabled() {
            return true;
        }
        minimal_height() {
            return 40;
        }
        autocomplete() {
            return false;
        }
        selection(val) {
            if (val !== undefined)
                return val;
            return [
                0,
                0
            ];
        }
        auto() {
            return [
                this.selection_watcher()
            ];
        }
        field() {
            return {
                ...super.field(),
                disabled: this.disabled(),
                value: this.value_changed(),
                placeholder: this.hint_visible(),
                spellcheck: this.spellcheck(),
                autocomplete: this.autocomplete_native(),
                selectionEnd: this.selection_end(),
                selectionStart: this.selection_start(),
                inputMode: this.keyboard()
            };
        }
        attr() {
            return {
                ...super.attr(),
                maxlength: this.length_max(),
                type: this.type()
            };
        }
        event() {
            return {
                ...super.event(),
                input: (event) => this.event_change(event),
                keydown: (event) => this.event_key_press(event)
            };
        }
        plugins() {
            return [
                this.Submit()
            ];
        }
        selection_watcher() {
            return null;
        }
        disabled() {
            return false;
        }
        value(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        value_changed(val) {
            return this.value(val);
        }
        hint() {
            return "";
        }
        hint_visible() {
            return this.hint();
        }
        spellcheck() {
            return true;
        }
        autocomplete_native() {
            return "";
        }
        selection_end() {
            return 0;
        }
        selection_start() {
            return 0;
        }
        keyboard() {
            return "text";
        }
        length_max() {
            return +Infinity;
        }
        type(val) {
            if (val !== undefined)
                return val;
            return "text";
        }
        event_change(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        event_key_press(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        submit(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        Submit() {
            const obj = new this.$.$mol_hotkey();
            obj.key = () => ({
                enter: (event) => this.submit(event)
            });
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "selection", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "event_change", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "event_key_press", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "submit", null);
    __decorate([
        $mol_mem
    ], $mol_string.prototype, "Submit", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//mol/string/-view.tree/string.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/string/string.view.css", "[mol_string] {\n\tbox-sizing: border-box;\n\toutline-offset: 0;\n\tborder: none;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tpadding: var(--mol_gap_text);\n\ttext-align: left;\n\tposition: relative;\n\tz-index: 0;\n\tfont: inherit;\n\tflex: 1 1 auto;\n\tbackground: transparent;\n\tmin-width: 0;\n\tcolor: inherit;\n\tbackground: var(--mol_theme_field);\n}\n\n[mol_string]:disabled:not(:placeholder-shown) {\n\tbackground-color: transparent;\n\tcolor: var(--mol_theme_text);\n}\n\n[mol_string]:where(:not(:disabled)) {\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_line);\n}\n\n[mol_string]:where(:not(:disabled)):hover {\n\tbox-shadow: inset 0 0 0 2px var(--mol_theme_line);\n}\n\n[mol_string]:focus {\n\toutline: none;\n\tz-index: 1;\n\tcolor: var(--mol_theme_text);\n\tbox-shadow: inset 0 0 0 1px var(--mol_theme_focus);\n}\n\n[mol_string]::placeholder {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_string]::-ms-clear {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));
//mol/string/-css/string.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_string extends $.$mol_string {
            event_change(next) {
                if (!next)
                    return;
                this.value_changed(next.target.value);
                this.selection_change(next);
            }
            hint_visible() {
                return (this.enabled() ? this.hint() : '') || ' ';
            }
            disabled() {
                return !this.enabled();
            }
            autocomplete_native() {
                return this.autocomplete() ? 'on' : 'off';
            }
            selection_watcher() {
                return new $mol_dom_listener(this.$.$mol_dom_context.document, 'selectionchange', $mol_wire_async(event => this.selection_change(event)));
            }
            selection_change(event) {
                const el = this.dom_node();
                if (el !== this.$.$mol_dom_context.document.activeElement)
                    return;
                const [from, to] = this.selection([
                    el.selectionStart,
                    el.selectionEnd,
                ]);
                el.selectionEnd = to;
                el.selectionStart = from;
            }
            selection_start() {
                return this.selection()[0];
            }
            selection_end() {
                return this.selection()[1];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_string.prototype, "selection_watcher", null);
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/string/string.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_list extends $mol_view {
        render_visible_only() {
            return true;
        }
        render_over() {
            return 0;
        }
        sub() {
            return this.rows();
        }
        Empty() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        Gap_before() {
            const obj = new this.$.$mol_view();
            obj.style = () => ({
                paddingTop: this.gap_before()
            });
            return obj;
        }
        Gap_after() {
            const obj = new this.$.$mol_view();
            obj.style = () => ({
                paddingTop: this.gap_after()
            });
            return obj;
        }
        view_window() {
            return [
                0,
                0
            ];
        }
        rows() {
            return [];
        }
        gap_before() {
            return 0;
        }
        gap_after() {
            return 0;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_list.prototype, "Empty", null);
    __decorate([
        $mol_mem
    ], $mol_list.prototype, "Gap_before", null);
    __decorate([
        $mol_mem
    ], $mol_list.prototype, "Gap_after", null);
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//mol/list/-view.tree/list.view.tree.ts
;
"use strict";
var $;
(function ($) {
    let cache = null;
    function $mol_support_css_overflow_anchor() {
        return cache ?? (cache = (!/Gecko\//.test(navigator.userAgent)
            && this.$mol_dom_context.CSS?.supports('overflow-anchor:auto')) ?? false);
    }
    $.$mol_support_css_overflow_anchor = $mol_support_css_overflow_anchor;
})($ || ($ = {}));
//mol/support/css/css.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/list/list.view.css", "[mol_list] {\n\twill-change: contents;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\tmax-width: 100%;\n\t/* display: flex;\n\talign-items: stretch;\n\talign-content: stretch; */\n\ttransition: none;\n\tmin-height: .5rem;\n}\n\n[mol_list_gap_before] ,\n[mol_list_gap_after] {\n\tdisplay: block !important;\n\tflex: none;\n\ttransition: none;\n\toverflow-anchor: none;\n}\n");
})($ || ($ = {}));
//mol/list/-css/list.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                return (rows.length === 0) ? [this.Empty()] : rows;
            }
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            view_window(next) {
                const kids = this.sub();
                if (kids.length < 3)
                    return [0, kids.length];
                if (this.$.$mol_print.active())
                    return [0, kids.length];
                const rect = this.view_rect();
                if (next)
                    return next;
                let [min, max] = $mol_mem_cached(() => this.view_window()) ?? [0, 0];
                let max2 = max = Math.min(max, kids.length);
                let min2 = min = Math.max(0, Math.min(min, max - 1));
                const anchoring = this.render_visible_only();
                const window_height = this.$.$mol_window.size().height + 40;
                const over = Math.ceil(window_height * this.render_over());
                const limit_top = -over;
                const limit_bottom = window_height + over;
                const gap_before = $mol_mem_cached(() => this.gap_before()) ?? 0;
                const gap_after = $mol_mem_cached(() => this.gap_after()) ?? 0;
                let top = Math.ceil(rect?.top ?? 0) + gap_before;
                let bottom = Math.ceil(rect?.bottom ?? 0) - gap_after;
                if (top <= limit_top && bottom >= limit_bottom) {
                    return [min2, max2];
                }
                if (anchoring && ((bottom < limit_top) || (top > limit_bottom))) {
                    min = 0;
                    top = Math.ceil(rect?.top ?? 0);
                    while (min < (kids.length - 1)) {
                        const height = kids[min].minimal_height();
                        if (top + height >= limit_top)
                            break;
                        top += height;
                        ++min;
                    }
                    min2 = min;
                    max2 = max = min;
                    bottom = top;
                }
                let top2 = top;
                let bottom2 = bottom;
                if (anchoring && (top <= limit_top) && (bottom2 < limit_bottom)) {
                    min2 = Math.max(0, max - 1);
                    top2 = bottom;
                }
                if ((bottom >= limit_bottom) && (top2 >= limit_top)) {
                    max2 = Math.min(min + 1, kids.length);
                    bottom2 = top;
                }
                while (bottom2 < limit_bottom && max2 < kids.length) {
                    bottom2 += kids[max2].minimal_height();
                    ++max2;
                }
                while (anchoring && ((top2 >= limit_top) && (min2 > 0))) {
                    --min2;
                    top2 -= kids[min2].minimal_height();
                }
                return [min2, max2];
            }
            gap_before() {
                const skipped = this.sub().slice(0, this.view_window()[0]);
                return Math.max(0, skipped.reduce((sum, view) => sum + view.minimal_height(), 0));
            }
            gap_after() {
                const skipped = this.sub().slice(this.view_window()[1]);
                return Math.max(0, skipped.reduce((sum, view) => sum + view.minimal_height(), 0));
            }
            sub_visible() {
                return [
                    ...this.gap_before() ? [this.Gap_before()] : [],
                    ...this.sub().slice(...this.view_window()),
                    ...this.gap_after() ? [this.Gap_after()] : [],
                ];
            }
            minimal_height() {
                return this.sub().reduce((sum, view) => {
                    try {
                        return sum + view.minimal_height();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                        return sum;
                    }
                }, 0);
            }
            force_render(path) {
                const kids = this.rows();
                const index = kids.findIndex(item => path.has(item));
                if (index >= 0) {
                    const win = this.view_window();
                    if (index < win[0] || index >= win[1]) {
                        this.view_window([this.render_visible_only() ? index : 0, index + 1]);
                    }
                    kids[index].force_render(path);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "view_window", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_before", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "gap_after", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/list/list.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_paragraph extends $mol_view {
        line_height() {
            return 24;
        }
        letter_width() {
            return 7;
        }
        width_limit() {
            return +Infinity;
        }
        sub() {
            return [
                this.title()
            ];
        }
    }
    $.$mol_paragraph = $mol_paragraph;
})($ || ($ = {}));
//mol/paragraph/-view.tree/paragraph.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paragraph/paragraph.view.css", ":where([mol_paragraph]) {\n\tmargin: 0;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//mol/paragraph/-css/paragraph.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paragraph extends $.$mol_paragraph {
            maximal_width() {
                let width = 0;
                const letter = this.letter_width();
                for (const kid of this.sub()) {
                    if (!kid)
                        continue;
                    if (kid instanceof $mol_view) {
                        width += kid.maximal_width();
                    }
                    else if (typeof kid !== 'object') {
                        width += String(kid).length * letter;
                    }
                }
                return width;
            }
            width_limit() {
                return this.$.$mol_window.size().width;
            }
            minimal_width() {
                return this.letter_width();
            }
            row_width() {
                return Math.max(Math.min(this.width_limit(), this.maximal_width()), this.letter_width());
            }
            minimal_height() {
                return Math.max(1, Math.ceil(this.maximal_width() / this.row_width())) * this.line_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "maximal_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "row_width", null);
        __decorate([
            $mol_mem
        ], $mol_paragraph.prototype, "minimal_height", null);
        $$.$mol_paragraph = $mol_paragraph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/paragraph/paragraph.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_dimmer extends $mol_paragraph {
        haystack() {
            return "";
        }
        needle() {
            return "";
        }
        sub() {
            return this.parts();
        }
        Low(id) {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => [
                this.string(id)
            ];
            return obj;
        }
        High(id) {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => [
                this.string(id)
            ];
            return obj;
        }
        parts() {
            return [];
        }
        string(id) {
            return "";
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_dimmer.prototype, "Low", null);
    __decorate([
        $mol_mem_key
    ], $mol_dimmer.prototype, "High", null);
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
//mol/dimmer/-view.tree/dimmer.view.tree.ts
;
"use strict";
//mol/type/equals/equals.ts
;
"use strict";
//mol/type/merge/merge.ts
;
"use strict";
//mol/type/intersect/intersect.ts
;
"use strict";
//mol/unicode/unicode.ts
;
"use strict";
var $;
(function ($) {
    class $mol_regexp extends RegExp {
        groups;
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        static vary(sources) {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, '', groups);
        }
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = params => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));
//mol/regexp/regexp.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/dimmer/dimmer.view.css", "[mol_dimmer] {\n\tdisplay: block;\n\tmax-width: 100%;\n}\n\n[mol_dimmer_low] {\n\tdisplay: inline;\n\topacity: 0.8;\n}\n\n[mol_dimmer_high] {\n\tdisplay: inline;\n\tcolor: var(--mol_theme_focus);\n\ttext-shadow: 0 0;\n}\n");
})($ || ($ = {}));
//mol/dimmer/-css/dimmer.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (needle.length < 2)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? this.High(index) : this.Low(index));
                }
                return chunks;
            }
            strings() {
                const options = this.needle().split(/\s+/g).filter(Boolean);
                if (!options.length)
                    return [this.haystack()];
                const variants = { ...options };
                const regexp = $mol_regexp.from({ needle: variants }, { ignoreCase: true });
                return this.haystack().split(regexp);
            }
            string(index) {
                return this.strings()[index];
            }
            *view_find(check, path = []) {
                if (check(this, this.haystack())) {
                    yield [...path, this];
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/dimmer/dimmer.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_search extends $mol_pop {
        query(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        suggests() {
            return [];
        }
        plugins() {
            return [
                ...super.plugins(),
                this.Hotkey(),
                this.Nav()
            ];
        }
        showed(val) {
            return this.suggests_showed(val);
        }
        align_hor() {
            return "right";
        }
        Anchor() {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.anchor_content();
            return obj;
        }
        bubble_content() {
            return [
                this.Menu()
            ];
        }
        Suggest(id) {
            const obj = new this.$.$mol_button_minor();
            obj.click = (event) => this.suggest_select(id, event);
            obj.sub = () => this.suggest_content(id);
            return obj;
        }
        clear(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Hotkey() {
            const obj = new this.$.$mol_hotkey();
            obj.key = () => ({
                escape: (val) => this.clear(val)
            });
            return obj;
        }
        nav_components() {
            return [];
        }
        nav_focused(component) {
            if (component !== undefined)
                return component;
            return null;
        }
        Nav() {
            const obj = new this.$.$mol_nav();
            obj.keys_y = () => this.nav_components();
            obj.current_y = (component) => this.nav_focused(component);
            return obj;
        }
        suggests_showed(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        hint() {
            return this.$.$mol_locale.text('$mol_search_hint');
        }
        submit(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        enabled() {
            return true;
        }
        bring() {
            return this.Query().bring();
        }
        Query() {
            const obj = new this.$.$mol_string();
            obj.value = (val) => this.query(val);
            obj.hint = () => this.hint();
            obj.submit = (event) => this.submit(event);
            obj.enabled = () => this.enabled();
            return obj;
        }
        Clear_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        Clear() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.$.$mol_locale.text('$mol_search_Clear_hint');
            obj.click = (event) => this.clear(event);
            obj.sub = () => [
                this.Clear_icon()
            ];
            return obj;
        }
        anchor_content() {
            return [
                this.Query(),
                this.Clear()
            ];
        }
        menu_items() {
            return [];
        }
        Menu() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.menu_items();
            return obj;
        }
        suggest_select(id, event) {
            if (event !== undefined)
                return event;
            return null;
        }
        suggest_label(id) {
            return "";
        }
        Suggest_label(id) {
            const obj = new this.$.$mol_dimmer();
            obj.haystack = () => this.suggest_label(id);
            obj.needle = () => this.query();
            return obj;
        }
        suggest_content(id) {
            return [
                this.Suggest_label(id)
            ];
        }
    }
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "query", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Anchor", null);
    __decorate([
        $mol_mem_key
    ], $mol_search.prototype, "Suggest", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "clear", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Hotkey", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "nav_focused", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Nav", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "suggests_showed", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "submit", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Query", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Clear_icon", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Clear", null);
    __decorate([
        $mol_mem
    ], $mol_search.prototype, "Menu", null);
    __decorate([
        $mol_mem_key
    ], $mol_search.prototype, "suggest_select", null);
    __decorate([
        $mol_mem_key
    ], $mol_search.prototype, "Suggest_label", null);
    $.$mol_search = $mol_search;
})($ || ($ = {}));
//mol/search/-view.tree/search.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                const fiber = temp(self, args);
                return fiber.sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));
//mol/wire/sync/sync.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));
//mol/action/action.ts
;
"use strict";
var $;
(function ($) {
    function $mol_fiber_defer(calculate) {
        const host = {};
        const fiber = new $mol_wire_task(calculate.name, calculate, host, []);
        fiber.plan();
        return fiber;
    }
    $.$mol_fiber_defer = $mol_fiber_defer;
    function $mol_fiber_root(calculate) {
        const wrapper = function (...args) {
            const fiber = new $mol_wire_task(this + '.' + calculate.name, calculate, this, args);
            return fiber.async();
        };
        wrapper[Symbol.toStringTag] = calculate.name;
        return wrapper;
    }
    $.$mol_fiber_root = $mol_fiber_root;
    function $mol_fiber_sync(request) {
        throw new Error('Use $mol_wire_sync instead');
    }
    $.$mol_fiber_sync = $mol_fiber_sync;
    async function $mol_fiber_warp() {
        $mol_wire_fiber.sync();
    }
    $.$mol_fiber_warp = $mol_fiber_warp;
    class $mol_fiber_solid extends $mol_wrapper {
        static func(task) {
            return task;
        }
    }
    $.$mol_fiber_solid = $mol_fiber_solid;
    class $mol_fiber {
        static method = $mol_action;
    }
    $.$mol_fiber = $mol_fiber;
})($ || ($ = {}));
//mol/fiber/fiber.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/search/search.view.css", "[mol_search] {\n\talign-self: flex-start;\n\tflex: auto;\n}\n\n[mol_search_anchor] {\n\tflex: 1 1 auto;\n}\n\n[mol_search_query] {\n\tflex-grow: 1;\n}\n\n[mol_search_menu] {\n\tmin-height: .75rem;\n\tdisplay: flex;\n}\n\n[mol_search_suggest] {\n\ttext-align: left;\n}\n\n[mol_search_suggest_label_high] {\n\tcolor: var(--mol_theme_shade);\n\ttext-shadow: none;\n}\n");
})($ || ($ = {}));
//mol/search/-css/search.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_search extends $.$mol_search {
            anchor_content() {
                return [
                    this.Query(),
                    ...this.query() ? [this.Clear()] : [],
                ];
            }
            suggests_showed(next = true) {
                this.query();
                if (!this.focused())
                    return false;
                return next;
            }
            suggest_selected(next) {
                if (next === undefined)
                    return;
                this.query(next);
                $mol_fiber_defer(() => {
                    this.Query().focused(true);
                });
            }
            nav_components() {
                return [
                    this.Query(),
                    ...this.menu_items(),
                ];
            }
            nav_focused(component) {
                if (!this.focused())
                    return null;
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.suggests_showed()) {
                    this.ensure_visible(component, "center");
                    component.focused(true);
                }
                return component;
            }
            suggest_label(key) {
                return key;
            }
            menu_items() {
                return this.suggests().map((suggest) => this.Suggest(suggest));
            }
            suggest_select(id, event) {
                this.query(id);
                this.Query().selection([id.length, id.length]);
                this.Query().focused(true);
            }
            clear(event) {
                this.query('');
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "anchor_content", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "suggests_showed", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "nav_focused", null);
        __decorate([
            $mol_mem
        ], $mol_search.prototype, "menu_items", null);
        $$.$mol_search = $mol_search;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/search/search.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_bar extends $mol_view {
    }
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//mol/bar/-view.tree/bar.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/bar/bar.view.css", "[mol_bar] {\n\tdisplay: flex;\n\t/* box-shadow: inset 0 0 0 1px var(--mol_theme_line); */\n\tborder-radius: var(--mol_gap_round);\n}\n");
})($ || ($ = {}));
//mol/bar/-css/bar.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron extends $mol_icon {
        path() {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        }
    }
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//mol/icon/chevron/-view.tree/chevron.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron_left extends $mol_icon {
        path() {
            return "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
        }
    }
    $.$mol_icon_chevron_left = $mol_icon_chevron_left;
})($ || ($ = {}));
//mol/icon/chevron/left/-view.tree/left.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron_right extends $mol_icon {
        path() {
            return "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
        }
    }
    $.$mol_icon_chevron_right = $mol_icon_chevron_right;
})($ || ($ = {}));
//mol/icon/chevron/right/-view.tree/right.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_paginator extends $mol_bar {
        sub() {
            return [
                this.Backward(),
                this.Value(),
                this.Forward()
            ];
        }
        backward_hint() {
            return this.$.$mol_locale.text('$mol_paginator_backward_hint');
        }
        backward(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        Backward_icon() {
            const obj = new this.$.$mol_icon_chevron_left();
            return obj;
        }
        Backward() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.backward_hint();
            obj.click = (event) => this.backward(event);
            obj.sub = () => [
                this.Backward_icon()
            ];
            return obj;
        }
        value(val) {
            if (val !== undefined)
                return val;
            return 0;
        }
        Value() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.value()
            ];
            return obj;
        }
        forward_hint() {
            return this.$.$mol_locale.text('$mol_paginator_forward_hint');
        }
        forward(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        Forward_icon() {
            const obj = new this.$.$mol_icon_chevron_right();
            return obj;
        }
        Forward() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.forward_hint();
            obj.click = (event) => this.forward(event);
            obj.sub = () => [
                this.Forward_icon()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "backward", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Backward_icon", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Backward", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Value", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "forward", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Forward_icon", null);
    __decorate([
        $mol_mem
    ], $mol_paginator.prototype, "Forward", null);
    $.$mol_paginator = $mol_paginator;
})($ || ($ = {}));
//mol/paginator/-view.tree/paginator.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/paginator/paginator.view.css", "[mol_paginator] {\n\talign-items: flex-start;\n}\n\n[mol_paginator_value] {\n\tpadding: .5rem 0;\n}\n");
})($ || ($ = {}));
//mol/paginator/-css/paginator.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_paginator extends $.$mol_paginator {
            backward(event) {
                if (event.defaultPrevented)
                    return;
                event.preventDefault();
                this.value(this.value() - 1);
            }
            forward(event) {
                if (event.defaultPrevented)
                    return;
                event.preventDefault();
                this.value(this.value() + 1);
            }
        }
        $$.$mol_paginator = $mol_paginator;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/paginator/paginator.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_search_jumper extends $mol_search {
        Root() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        forward(event) {
            return this.Index().forward(event);
        }
        backward(event) {
            return this.Index().backward(event);
        }
        Index() {
            const obj = new this.$.$mol_paginator();
            obj.value = (val) => this.index(val);
            return obj;
        }
        plugins() {
            return [
                ...super.plugins(),
                this.Backward(),
                this.Forward()
            ];
        }
        index(val) {
            if (val !== undefined)
                return val;
            return 0;
        }
        Backward() {
            const obj = new this.$.$mol_hotkey();
            obj.mod_shift = () => true;
            obj.key = () => ({
                enter: (event) => this.backward(event)
            });
            return obj;
        }
        escape(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Forward() {
            const obj = new this.$.$mol_hotkey();
            obj.key = () => ({
                enter: (event) => this.forward(event),
                escape: (val) => this.escape(val)
            });
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_search_jumper.prototype, "Root", null);
    __decorate([
        $mol_mem
    ], $mol_search_jumper.prototype, "Index", null);
    __decorate([
        $mol_mem
    ], $mol_search_jumper.prototype, "index", null);
    __decorate([
        $mol_mem
    ], $mol_search_jumper.prototype, "Backward", null);
    __decorate([
        $mol_mem
    ], $mol_search_jumper.prototype, "escape", null);
    __decorate([
        $mol_mem
    ], $mol_search_jumper.prototype, "Forward", null);
    $.$mol_search_jumper = $mol_search_jumper;
})($ || ($ = {}));
//mol/search/jumper/-view.tree/jumper.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_search_jumper extends $.$mol_search_jumper {
            results() {
                const needle = this.query();
                if (needle.length < 2)
                    return [];
                const root = this.Root();
                if (!root)
                    return [];
                const regexp = $mol_regexp.from({ needle }, { ignoreCase: true });
                try {
                    return [...root.view_find((_, text = '') => regexp.test(text))];
                }
                catch (error) {
                    if (!(error instanceof Promise))
                        $mol_fail_hidden(error);
                    return [];
                }
            }
            index(next) {
                this.query();
                const all = this.results();
                if (all.length == 0)
                    return 0;
                let index = next ?? super.index();
                if (index > all.length)
                    index = 1;
                if (index <= 0)
                    index = all.length;
                if (next !== undefined) {
                    const path = all[index - 1];
                    this.Root().ensure_visible(path[path.length - 1]);
                }
                return index;
            }
            anchor_content() {
                return [
                    this.Query(),
                    ...(this.query().length > 0) ? [
                        this.Clear(),
                        this.Index(),
                    ] : [],
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_search_jumper.prototype, "results", null);
        __decorate([
            $mol_mem
        ], $mol_search_jumper.prototype, "index", null);
        $$.$mol_search_jumper = $mol_search_jumper;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/search/jumper/jumper.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_forum extends $mol_icon {
        path() {
            return "M17,12V3C17,2.45 16.55,2 16,2H3C2.45,2 2,2.45 2,3V17L6,13H16C16.55,13 17,12.55 17,12M21,6H19V15H6V17C6,17.55 6.45,18 7,18H18L22,22V7C22,6.45 21.55,6 21,6Z";
        }
    }
    $.$mol_icon_forum = $mol_icon_forum;
})($ || ($ = {}));
//mol/icon/forum/-view.tree/forum.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_forum_outline extends $mol_icon {
        path() {
            return "M15,4V11H5.17L4,12.17V4H15M16,2H3C2.45,2 2,2.45 2,3V17L6,13H16C16.55,13 17,12.55 17,12V3C17,2.45 16.55,2 16,2M21,6H19V15H6V17C6,17.55 6.45,18 7,18H18L22,22V7C22,6.45 21.55,6 21,6Z";
        }
    }
    $.$mol_icon_forum_outline = $mol_icon_forum_outline;
})($ || ($ = {}));
//mol/icon/forum/outline/-view.tree/outline.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_open_in_new extends $mol_icon {
        path() {
            return "M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V12H19V19Z";
        }
    }
    $.$mol_icon_open_in_new = $mol_icon_open_in_new;
})($ || ($ = {}));
//mol/icon/open/in/new/-view.tree/new.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_embed_native extends $mol_scroll {
        uri(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        dom_name() {
            return "object";
        }
        window() {
            return null;
        }
        attr() {
            return {
                ...super.attr(),
                data: this.uri(),
                type: this.mime()
            };
        }
        sub() {
            return [
                this.Fallback()
            ];
        }
        message() {
            return {
                hashchange: (next) => this.uri_change(next)
            };
        }
        mime() {
            return "";
        }
        title() {
            return "";
        }
        Fallback() {
            const obj = new this.$.$mol_link();
            obj.uri = () => this.uri();
            obj.sub = () => [
                this.title()
            ];
            return obj;
        }
        uri_change(next) {
            if (next !== undefined)
                return next;
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_embed_native.prototype, "uri", null);
    __decorate([
        $mol_mem
    ], $mol_embed_native.prototype, "Fallback", null);
    __decorate([
        $mol_mem
    ], $mol_embed_native.prototype, "uri_change", null);
    $.$mol_embed_native = $mol_embed_native;
})($ || ($ = {}));
//mol/embed/native/-view.tree/native.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_solid() {
        const current = $mol_wire_auto();
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));
//mol/wire/solid/solid.ts
;
"use strict";
var $;
(function ($) {
    function $mol_promise() {
        let done;
        let fail;
        const promise = new Promise((d, f) => {
            done = d;
            fail = f;
        });
        return Object.assign(promise, {
            done,
            fail,
        });
    }
    $.$mol_promise = $mol_promise;
})($ || ($ = {}));
//mol/promise/promise.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));
//mol/wait/timeout/timeout.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/native/native.view.css", "[mol_embed_native] {\n\tmax-width: 100%;\n\tmax-height: 100vh;\n\tobject-fit: cover;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tobject-position: top left;\n\tborder-radius: var(--mol_gap_round);\n\taspect-ratio: 4/3;\n}\n");
})($ || ($ = {}));
//mol/embed/native/-css/native.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_native extends $.$mol_embed_native {
            window() {
                $mol_wire_solid();
                return $mol_wire_sync(this).load(this.dom_node_actual());
            }
            load(frame) {
                return new Promise((done, fail) => {
                    frame.onload = () => {
                        try {
                            if (frame.contentWindow.location.href === 'about:blank') {
                                return;
                            }
                        }
                        catch { }
                        done(frame.contentWindow);
                    };
                    frame.onerror = (event) => {
                        fail(typeof event === 'string' ? new Error(event) : event.error || event);
                    };
                });
            }
            uri_resource() {
                return this.uri().replace(/#.*/, '');
            }
            message_listener() {
                return new $mol_dom_listener($mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            message_receive(event) {
                if (!event)
                    return;
                if (event.source !== this.window())
                    return;
                if (!Array.isArray(event.data))
                    return;
                this.message()[event.data[0]]?.(event);
            }
            uri_change(event) {
                this.$.$mol_wait_timeout(1000);
                this.uri(event.data[1]);
            }
            auto() {
                return [
                    this.message_listener(),
                    this.window(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "window", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "uri_resource", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "message_listener", null);
        $$.$mol_embed_native = $mol_embed_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/embed/native/native.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_frame extends $mol_embed_native {
        dom_name() {
            return "iframe";
        }
        attr() {
            return {
                ...super.attr(),
                data: null,
                type: null,
                src: this.uri(),
                srcdoc: this.html(),
                allow: this.allow(),
                allowfullscreen: this.fullscreen()
            };
        }
        accelerometer() {
            return true;
        }
        autoplay() {
            return true;
        }
        encription() {
            return true;
        }
        gyroscope() {
            return true;
        }
        pip() {
            return true;
        }
        uri(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        html() {
            return null;
        }
        allow() {
            return "";
        }
        fullscreen() {
            return true;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_frame.prototype, "uri", null);
    $.$mol_frame = $mol_frame;
})($ || ($ = {}));
//mol/frame/-view.tree/frame.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_frame, {
        border: {
            style: 'none',
        },
        maxHeight: $mol_style_unit.vh(100),
    });
})($ || ($ = {}));
//mol/frame/frame.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_frame extends $.$mol_frame {
            window() {
                if (this.html())
                    return this.dom_node().contentWindow;
                return super.window();
            }
            allow() {
                return [
                    ...this.fullscreen() ? ['fullscreen'] : [],
                    ...this.accelerometer() ? ['accelerometer'] : [],
                    ...this.autoplay() ? ['autoplay'] : [],
                    ...this.encription() ? ['encrypted-media'] : [],
                    ...this.gyroscope() ? ['gyroscope'] : [],
                    ...this.pip() ? ['picture-in-picture'] : [],
                ].join(';');
            }
        }
        $$.$mol_frame = $mol_frame;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/frame/frame.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_chat extends $mol_link {
        seed() {
            return "";
        }
        opened() {
            return false;
        }
        arg() {
            return {
                mol_chat: ""
            };
        }
        hint() {
            return this.title();
        }
        sub() {
            return [
                this.Icon()
            ];
        }
        pages() {
            return [
                this.Page()
            ];
        }
        Icon() {
            const obj = new this.$.$mol_icon_forum_outline();
            return obj;
        }
        title() {
            return this.$.$mol_locale.text('$mol_chat_title');
        }
        standalone() {
            return "";
        }
        Standalone_icon() {
            const obj = new this.$.$mol_icon_open_in_new();
            return obj;
        }
        Esternal() {
            const obj = new this.$.$mol_link();
            obj.uri = () => this.standalone();
            obj.sub = () => [
                this.Standalone_icon()
            ];
            return obj;
        }
        Close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        Close() {
            const obj = new this.$.$mol_link();
            obj.arg = () => ({
                mol_chat: null
            });
            obj.sub = () => [
                this.Close_icon()
            ];
            return obj;
        }
        embed() {
            return "";
        }
        Embed() {
            const obj = new this.$.$mol_frame();
            obj.uri = () => this.embed();
            return obj;
        }
        Page() {
            const obj = new this.$.$mol_page();
            obj.title = () => this.title();
            obj.tools = () => [
                this.Esternal(),
                this.Close()
            ];
            obj.Body = () => this.Embed();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Icon", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Standalone_icon", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Esternal", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Close_icon", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Close", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Embed", null);
    __decorate([
        $mol_mem
    ], $mol_chat.prototype, "Page", null);
    $.$mol_chat = $mol_chat;
})($ || ($ = {}));
//mol/chat/-view.tree/chat.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chat/chat.view.css", "[mol_chat_page] {\n\tflex: 1 0 30rem;\n}\n");
})($ || ($ = {}));
//mol/chat/-css/chat.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chat extends $.$mol_chat {
            opened() {
                return this.$.$mol_state_arg.value('mol_chat') !== null;
            }
            pages() {
                return this.opened() ? [this.Page()] : [];
            }
            standalone() {
                const seed = this.seed();
                const origin = new URL(this.$.$mol_state_arg.href()).origin;
                return `https://talks.hyoo.ru/#!chat=${seed}`;
            }
            embed() {
                const seed = this.seed();
                const lights = String(this.$.$mol_lights());
                const embed = this.$.$mol_state_arg.href();
                return `https://talks.hyoo.ru/#!chat=${encodeURIComponent(seed)}/mol_lights=${lights}`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_chat.prototype, "standalone", null);
        __decorate([
            $mol_mem
        ], $mol_chat.prototype, "embed", null);
        $$.$mol_chat = $mol_chat;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/chat/chat.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text_code_token extends $mol_dimmer {
        attr() {
            return {
                ...super.attr(),
                mol_text_code_token_type: this.type()
            };
        }
        type() {
            return "";
        }
    }
    $.$mol_text_code_token = $mol_text_code_token;
    class $mol_text_code_token_link extends $mol_text_code_token {
        dom_name() {
            return "a";
        }
        type() {
            return "code-link";
        }
        attr() {
            return {
                ...super.attr(),
                href: this.haystack(),
                target: "_blank"
            };
        }
        haystack() {
            return "";
        }
    }
    $.$mol_text_code_token_link = $mol_text_code_token_link;
})($ || ($ = {}));
//mol/text/code/token/-view.tree/token.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { hsla } = $mol_style_func;
        $mol_style_define($mol_text_code_token, {
            display: 'inline',
            textDecoration: 'none',
            '@': {
                mol_text_code_token_type: {
                    'code-keyword': {
                        color: hsla(0, 70, 60, 1),
                    },
                    'code-field': {
                        color: hsla(300, 70, 50, 1),
                    },
                    'code-tag': {
                        color: hsla(330, 70, 50, 1),
                    },
                    'code-global': {
                        color: hsla(30, 80, 50, 1),
                    },
                    'code-decorator': {
                        color: hsla(180, 40, 50, 1),
                    },
                    'code-punctuation': {
                        color: hsla(0, 0, 50, 1),
                    },
                    'code-string': {
                        color: hsla(90, 40, 50, 1),
                    },
                    'code-number': {
                        color: hsla(60, 70, 45, 1),
                    },
                    'code-call': {
                        color: hsla(270, 60, 50, 1),
                    },
                    'code-link': {
                        color: hsla(210, 60, 50, 1),
                    },
                    'code-comment-inline': {
                        opacity: .5,
                    },
                    'code-comment-block': {
                        opacity: .5,
                    },
                    'code-docs': {
                        opacity: .75,
                    },
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/token/token.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text_code_row extends $mol_paragraph {
        text() {
            return "";
        }
        minimal_height() {
            return 24;
        }
        numb_showed() {
            return true;
        }
        Numb() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.numb()
            ];
            return obj;
        }
        Token(id) {
            const obj = new this.$.$mol_text_code_token();
            obj.type = () => this.token_type(id);
            obj.haystack = () => this.token_text(id);
            obj.needle = () => this.highlight();
            return obj;
        }
        Token_link(id) {
            const obj = new this.$.$mol_text_code_token_link();
            obj.haystack = () => this.token_text(id);
            obj.needle = () => this.highlight();
            return obj;
        }
        find_pos(id) {
            return null;
        }
        numb() {
            return 0;
        }
        token_type(id) {
            return "";
        }
        token_text(id) {
            return "";
        }
        highlight() {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_text_code_row.prototype, "Numb", null);
    __decorate([
        $mol_mem_key
    ], $mol_text_code_row.prototype, "Token", null);
    __decorate([
        $mol_mem_key
    ], $mol_text_code_row.prototype, "Token_link", null);
    $.$mol_text_code_row = $mol_text_code_row;
})($ || ($ = {}));
//mol/text/code/row/-view.tree/row.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));
//mol/syntax2/syntax2.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_syntax2_md_flow = new $mol_syntax2({
        'quote': /^((?:(?:> )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^(#+)(\s+)(.*?)$([\n\r]*)/,
        'list': /^((?:(?: ?[*+-]|\d+\.) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/,
        'code': /^(```\s*)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?:  |\t)(?:[^]*?)$([\n\r]*))+)/,
        'table': /((?:^\|.+?$\r?\n)+)([\n\r]*)/,
        'block': /^(.*?)$((?:\r?\n)*)/,
    });
    $.$mol_syntax2_md_line = new $mol_syntax2({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*/,
        'code3': /```(.+?)```/,
        'code': /`(.+?)`/,
        'strike': /~~(.+?)~~/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
        'text-link': /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/,
        'text-link-http': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
    });
    $.$mol_syntax2_md_code = new $mol_syntax2({
        'code-indent': /\t+/,
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/,
        'code-comment-inline': /\/\/.*?$/,
        'code-string': /(?:".*?"|'.*?'|`.*?`|\/.+?\/[dygimsu]*(?!\p{Letter})|(?:^|[ \t])\\[^\n]*\n)/,
        'code-number': /[+-]?(?:\d*\.)?\d+\w*/,
        'code-call': /\.?\w+ *(?=\()/,
        'code-sexpr': /\((\w+ )/,
        'code-field': /(?:(?:\.|::|->)\w+|[\w-]+\??\s*:(?!\/\/|:))/,
        'code-keyword': /\b(throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|let|const|for|do|while|until|in|of|new|if|then|else|switch|case|this|return|async|await|try|catch|break|continue|get|set|public|private|protected|string|boolean|number|null|undefined|true|false|void)\b/,
        'code-global': /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/,
        'code-decorator': /@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?|&\w+;/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/,
    });
})($ || ($ = {}));
//mol/syntax2/md/md.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($mol_text_code_row, {
            display: 'block',
            position: 'relative',
            font: {
                family: 'monospace',
            },
            Numb: {
                textAlign: 'right',
                color: $mol_theme.shade,
                width: rem(3),
                margin: {
                    left: rem(-4),
                },
                display: 'inline-block',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                position: 'absolute',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/row/row.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code_row extends $.$mol_text_code_row {
            maximal_width() {
                return this.text().length * this.letter_width();
            }
            tokens(path) {
                const tokens = [];
                const text = (path.length > 0)
                    ? this.tokens(path.slice(0, path.length - 1))[path[path.length - 1]].found.slice(1, -1)
                    : this.text();
                this.$.$mol_syntax2_md_code.tokenize(text, (name, found, chunks) => {
                    if (name === 'code-sexpr') {
                        tokens.push({ name: 'code-punctuation', found: '(', chunks: [] });
                        tokens.push({ name: 'code-call', found: chunks[0], chunks: [] });
                    }
                    else {
                        tokens.push({ name, found, chunks });
                    }
                });
                return tokens;
            }
            sub() {
                return [
                    ...this.numb_showed() ? [this.Numb()] : [],
                    ...this.row_content([])
                ];
            }
            row_content(path) {
                return this.tokens(path).map((t, i) => this.Token([...path, i]));
            }
            Token(path) {
                return this.token_type(path) === 'code-link' ? this.Token_link(path) : super.Token(path);
            }
            token_type(path) {
                return this.tokens([...path.slice(0, path.length - 1)])[path[path.length - 1]].name;
            }
            token_content(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                switch (token.name) {
                    case 'code-string': return [
                        token.found[0],
                        ...this.row_content(path),
                        token.found[token.found.length - 1],
                    ];
                    default: return [token.found];
                }
            }
            token_text(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                return token.found;
            }
            *view_find(check, path = []) {
                if (check(this, this.text())) {
                    yield [...path, this];
                }
            }
            find_pos(offset) {
                return this.find_token_pos([offset]);
            }
            find_token_pos([offset, ...path]) {
                for (const [index, token] of this.tokens(path).entries()) {
                    if (token.found.length >= offset) {
                        const token = this.Token([...path, index]);
                        return { token, offset };
                    }
                    else {
                        offset -= token.found.length;
                    }
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "row_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "token_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "token_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "token_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "find_pos", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_row.prototype, "find_token_pos", null);
        $$.$mol_text_code_row = $mol_text_code_row;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/row/row.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_stack extends $mol_view {
    }
    $.$mol_stack = $mol_stack;
})($ || ($ = {}));
//mol/stack/-view.tree/stack.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));
//mol/stack/-css/stack.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_content_copy extends $mol_icon {
        path() {
            return "M19,21H8V7H19M19,5H8C6.9,5 6,5.9 6,7V21C6,22.1 6.9,23 8,23H19C20.1,23 21,22.1 21,21V7C21,5.9 20.1,5 19,5M16,1H4C2.9,1 2,1.9 2,3V17H4V3H16V1Z";
        }
    }
    $.$mol_icon_content_copy = $mol_icon_content_copy;
})($ || ($ = {}));
//mol/icon/content/copy/-view.tree/copy.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_copy extends $mol_button_minor {
        text() {
            return "";
        }
        sub() {
            return [
                this.Icon()
            ];
        }
        Icon() {
            const obj = new this.$.$mol_icon_content_copy();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_button_copy.prototype, "Icon", null);
    $.$mol_button_copy = $mol_button_copy;
})($ || ($ = {}));
//mol/button/copy/-view.tree/copy.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_copy extends $.$mol_button_copy {
            click(event) {
                this.$.$mol_dom_context.navigator.clipboard.writeText(this.text());
            }
        }
        $$.$mol_button_copy = $mol_button_copy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/button/copy/copy.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text_code extends $mol_stack {
        attr() {
            return {
                ...super.attr(),
                mol_text_code_sidebar_showed: this.sidebar_showed()
            };
        }
        text() {
            return "";
        }
        text_lines() {
            return [];
        }
        find_pos(id) {
            return null;
        }
        sub() {
            return [
                this.Rows(),
                this.Copy()
            ];
        }
        sidebar_showed() {
            return false;
        }
        render_visible_only() {
            return false;
        }
        row_numb(id) {
            return 0;
        }
        row_text(id) {
            return "";
        }
        highlight() {
            return "";
        }
        Row(id) {
            const obj = new this.$.$mol_text_code_row();
            obj.numb_showed = () => this.sidebar_showed();
            obj.numb = () => this.row_numb(id);
            obj.text = () => this.row_text(id);
            obj.highlight = () => this.highlight();
            return obj;
        }
        rows() {
            return [
                this.Row("0")
            ];
        }
        Rows() {
            const obj = new this.$.$mol_list();
            obj.render_visible_only = () => this.render_visible_only();
            obj.rows = () => this.rows();
            return obj;
        }
        Copy() {
            const obj = new this.$.$mol_button_copy();
            obj.hint = () => this.$.$mol_locale.text('$mol_text_code_Copy_hint');
            obj.text = () => this.text();
            return obj;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_text_code.prototype, "Row", null);
    __decorate([
        $mol_mem
    ], $mol_text_code.prototype, "Rows", null);
    __decorate([
        $mol_mem
    ], $mol_text_code.prototype, "Copy", null);
    $.$mol_text_code = $mol_text_code;
})($ || ($ = {}));
//mol/text/code/-view.tree/code.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px } = $mol_style_unit;
        $mol_style_define($mol_text_code, {
            whiteSpace: 'pre-wrap',
            Rows: {
                padding: $mol_gap.text,
            },
            Copy: {
                position: 'sticky',
                alignSelf: 'flex-start',
                justifySelf: 'flex-start',
                top: 0,
                left: 0,
                Icon: {
                    background: {
                        color: $mol_theme.card,
                    },
                },
                transform: 'translate(-6px,-1px)',
            },
            '@': {
                'mol_text_code_sidebar_showed': {
                    true: {
                        $mol_text_code_row: {
                            margin: {
                                left: rem(1.5),
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/code.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code extends $.$mol_text_code {
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            text_lines() {
                return this.text().split('\n');
            }
            rows() {
                return this.text_lines().map((_, index) => this.Row(index + 1));
            }
            row_text(index) {
                return this.text_lines()[index - 1];
            }
            row_numb(index) {
                return index;
            }
            find_pos(offset) {
                for (const [index, line] of this.text_lines().entries()) {
                    if (line.length >= offset) {
                        return this.Row(index + 1).find_pos(offset);
                    }
                    else {
                        offset -= line.length + 1;
                    }
                }
                return null;
            }
            sub() {
                return [
                    this.Rows(),
                    ...this.sidebar_showed() ? [this.Copy()] : []
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "text_lines", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "row_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "find_pos", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "sub", null);
        $$.$mol_text_code = $mol_text_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/code/code.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_float extends $mol_view {
        style() {
            return {
                ...super.style(),
                minHeight: "auto"
            };
        }
    }
    $.$mol_float = $mol_float;
})($ || ($ = {}));
//mol/float/-view.tree/float.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: 1;\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));
//mol/float/-css/float.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_check_expand extends $mol_check {
        Icon() {
            const obj = new this.$.$mol_icon_chevron();
            return obj;
        }
        level() {
            return 0;
        }
        style() {
            return {
                ...super.style(),
                paddingLeft: this.level_style()
            };
        }
        checked(val) {
            return this.expanded(val);
        }
        enabled() {
            return this.expandable();
        }
        level_style() {
            return "0px";
        }
        expanded(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        expandable() {
            return false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_check_expand.prototype, "Icon", null);
    __decorate([
        $mol_mem
    ], $mol_check_expand.prototype, "expanded", null);
    $.$mol_check_expand = $mol_check_expand;
})($ || ($ = {}));
//mol/check/expand/-view.tree/expand.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin: .25rem -.25rem;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon_path] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-left: 0;\n}\n");
})($ || ($ = {}));
//mol/check/expand/-css/expand.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/check/expand/expand.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_grid extends $mol_view {
        row_height() {
            return 32;
        }
        row_ids() {
            return [];
        }
        row_id(id) {
            return null;
        }
        col_ids() {
            return [];
        }
        records() {
            return {};
        }
        record(id) {
            return null;
        }
        hierarchy() {
            return null;
        }
        hierarchy_col() {
            return "";
        }
        minimal_width() {
            return 0;
        }
        sub() {
            return [
                this.Head(),
                this.Table()
            ];
        }
        Head() {
            const obj = new this.$.$mol_grid_row();
            obj.cells = () => this.head_cells();
            return obj;
        }
        Row(id) {
            const obj = new this.$.$mol_grid_row();
            obj.minimal_height = () => this.row_height();
            obj.minimal_width = () => this.minimal_width();
            obj.cells = () => this.cells(id);
            return obj;
        }
        Cell(id) {
            const obj = new this.$.$mol_view();
            return obj;
        }
        cell(id) {
            return null;
        }
        Cell_text(id) {
            const obj = new this.$.$mol_grid_cell();
            obj.sub = () => this.cell_content_text(id);
            return obj;
        }
        Cell_number(id) {
            const obj = new this.$.$mol_grid_number();
            obj.sub = () => this.cell_content_number(id);
            return obj;
        }
        Col_head(id) {
            const obj = new this.$.$mol_float();
            obj.dom_name = () => "th";
            obj.sub = () => this.col_head_content(id);
            return obj;
        }
        Cell_branch(id) {
            const obj = new this.$.$mol_check_expand();
            obj.level = () => this.cell_level(id);
            obj.label = () => this.cell_content(id);
            obj.expanded = (val) => this.cell_expanded(id, val);
            return obj;
        }
        Cell_content(id) {
            return [
                this.Cell_dimmer(id)
            ];
        }
        rows() {
            return [];
        }
        Table() {
            const obj = new this.$.$mol_grid_table();
            obj.sub = () => this.rows();
            return obj;
        }
        head_cells() {
            return [];
        }
        cells(id) {
            return [];
        }
        cell_content(id) {
            return [];
        }
        cell_content_text(id) {
            return this.cell_content(id);
        }
        cell_content_number(id) {
            return this.cell_content(id);
        }
        col_head_content(id) {
            return [];
        }
        cell_level(id) {
            return 0;
        }
        cell_expanded(id, val) {
            if (val !== undefined)
                return val;
            return false;
        }
        needle() {
            return "";
        }
        cell_value(id) {
            return "";
        }
        Cell_dimmer(id) {
            const obj = new this.$.$mol_dimmer();
            obj.needle = () => this.needle();
            obj.haystack = () => this.cell_value(id);
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_grid.prototype, "Head", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Row", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_text", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_number", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Col_head", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_branch", null);
    __decorate([
        $mol_mem
    ], $mol_grid.prototype, "Table", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "cell_expanded", null);
    __decorate([
        $mol_mem_key
    ], $mol_grid.prototype, "Cell_dimmer", null);
    $.$mol_grid = $mol_grid;
    class $mol_grid_table extends $mol_list {
        dom_name() {
            return "table";
        }
    }
    $.$mol_grid_table = $mol_grid_table;
    class $mol_grid_row extends $mol_view {
        dom_name() {
            return "tr";
        }
        sub() {
            return this.cells();
        }
        cells() {
            return [];
        }
    }
    $.$mol_grid_row = $mol_grid_row;
    class $mol_grid_cell extends $mol_view {
        dom_name() {
            return "td";
        }
        minimal_height() {
            return 40;
        }
    }
    $.$mol_grid_cell = $mol_grid_cell;
    class $mol_grid_number extends $mol_grid_cell {
    }
    $.$mol_grid_number = $mol_grid_number;
})($ || ($ = {}));
//mol/grid/-view.tree/grid.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_state_session extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//mol/state/session/session.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/grid/grid.view.css", "[mol_grid] {\n\tdisplay: block;\n\tflex: 0 1 auto;\n\tposition: relative;\n}\n\n[mol_grid_gap] {\n\tposition: absolute;\n\tpadding: .1px;\n\ttop: 0;\n\ttransform: translateZ(0);\n}\n\n[mol_grid_table] {\n\tborder-spacing: 0;\n\tdisplay: table-row-group;\n\tposition: relative;\n}\n\n[mol_grid_table] > * {\n\tdisplay: table-row;\n\ttransition: none;\n}\n\n[mol_grid_head] > * ,\n[mol_grid_table] > * > * {\n\tdisplay: table-cell;\n\tpadding: var(--mol_gap_text);\n\twhite-space: nowrap;\n\tvertical-align: middle;\n\tbox-shadow: inset 1px 1px 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_head] > * {\n\tbox-shadow: inset 1px 0 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_head] > *:first-child {\n\tbox-shadow: none;\n}\n\n[mol_grid_table] > * > *:first-child {\n\tbox-shadow: inset 0px 1px 0 0 var(--mol_theme_line);\n}\n\n[mol_grid_head] {\n\tdisplay: table-row;\n\ttransform: none !important;\n}\n\n[mol_grid_cell_number] {\n\ttext-align: right;\n}\n\n[mol_grid_col_head] {\n\tfont-weight: inherit;\n\ttext-align: inherit;\n\tdisplay: table-cell;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_grid_cell_dimmer] {\n\tdisplay: inline-block;\n\tvertical-align: inherit;\n}\n");
})($ || ($ = {}));
//mol/grid/-css/grid.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            cell_content_text(id) {
                return this.cell_content(id).map(val => typeof val === 'object' ? JSON.stringify(val) : val);
            }
            records() {
                return [];
            }
            record(id) {
                return this.records()[id];
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return true;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/grid/grid.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_image extends $mol_view {
        dom_name() {
            return "img";
        }
        field() {
            return {
                ...super.field(),
                src: this.uri(),
                alt: this.title(),
                loading: this.loading()
            };
        }
        minimal_width() {
            return 16;
        }
        minimal_height() {
            return 16;
        }
        uri() {
            return "";
        }
        loading() {
            return "eager";
        }
    }
    $.$mol_image = $mol_image;
})($ || ($ = {}));
//mol/image/-view.tree/image.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/image/image.view.css", "[mol_image] {\n\tborder-radius: var(--mol_gap_round);\n\toverflow: hidden;\n\tflex: 0 1 auto;\n\tmax-width: 100%;\n\tobject-fit: cover;\n}\n");
})($ || ($ = {}));
//mol/image/-css/image.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_link_iconed extends $mol_link {
        sub() {
            return [
                this.Icon()
            ];
        }
        content() {
            return [
                this.title()
            ];
        }
        host() {
            return "";
        }
        icon() {
            return "";
        }
        Icon() {
            const obj = new this.$.$mol_image();
            obj.uri = () => this.icon();
            obj.title = () => "";
            return obj;
        }
        title() {
            return this.uri();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_link_iconed.prototype, "Icon", null);
    $.$mol_link_iconed = $mol_link_iconed;
})($ || ($ = {}));
//mol/link/iconed/-view.tree/iconed.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/link/iconed/iconed.view.css", "[mol_link_iconed] {\n\talign-items: baseline;\n\tdisplay: inline-flex;\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_link_iconed_icon] {\n\tbox-shadow: none;\n\theight: 1rem;\n\twidth: 1rem;\n\tflex: 0 0 auto;\n\tdisplay: inline-block;\n\tmargin: .25rem 0;\n\talign-self: normal;\n\tvertical-align: top;\n\tborder-radius: 0;\n\tobject-fit: scale-down;\n}\n\n[mol_theme=\"$mol_theme_dark\"] [mol_link_iconed_icon] {\n\tfilter: var(--mol_theme_image);\n}\n");
})($ || ($ = {}));
//mol/link/iconed/-css/iconed.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link_iconed extends $.$mol_link_iconed {
            icon() {
                return `https://favicon.yandex.net/favicon/${this.host()}?color=0,0,0,0&size=32&stub=1`;
            }
            host() {
                const base = this.$.$mol_state_arg.href();
                const url = new URL(this.uri(), base);
                return url.hostname;
            }
            title() {
                const uri = this.uri();
                const host = this.host();
                const suffix = (host ? uri.split(this.host(), 2)[1] : uri).replace(/^[\/\?#!]+/, '');
                return decodeURIComponent(suffix || host).replace(/^\//, ' ');
            }
            sub() {
                return [
                    ...this.host() ? [this.Icon()] : [],
                    ...this.content(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "icon", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "host", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $mol_link_iconed.prototype, "sub", null);
        $$.$mol_link_iconed = $mol_link_iconed;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/link/iconed/iconed.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_ghost extends $mol_view {
        Sub() {
            const obj = new this.$.$mol_view();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_ghost.prototype, "Sub", null);
    $.$mol_ghost = $mol_ghost;
})($ || ($ = {}));
//mol/ghost/-view.tree/ghost.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive: false });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
    function $mol_dom_render_events_async(el, events) {
        for (let name in events) {
            el.addEventListener(name, events[name], { passive: true });
        }
    }
    $.$mol_dom_render_events_async = $mol_dom_render_events_async;
})($ || ($ = {}));
//mol/dom/render/events/events.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_ghost extends $.$mol_ghost {
            dom_node(next) {
                const node = this.Sub().dom_node(next);
                $mol_dom_render_attributes(node, this.attr_static());
                $mol_dom_render_events(node, this.event());
                return node;
            }
            dom_node_actual() {
                this.dom_node();
                const node = this.Sub().dom_node_actual();
                const attr = this.attr();
                const style = this.style();
                const fields = this.field();
                $mol_dom_render_attributes(node, attr);
                $mol_dom_render_styles(node, style);
                $mol_dom_render_fields(node, fields);
                return node;
            }
            dom_tree() {
                const Sub = this.Sub();
                const node = Sub.dom_tree();
                try {
                    this.dom_node_actual();
                    this.auto();
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                return node;
            }
            title() {
                return this.Sub().title();
            }
            minimal_width() {
                return this.Sub().minimal_width();
            }
            minimal_height() {
                return this.Sub().minimal_height();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node", null);
        __decorate([
            $mol_mem
        ], $mol_ghost.prototype, "dom_node_actual", null);
        $$.$mol_ghost = $mol_ghost;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/ghost/ghost.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_embed_youtube extends $mol_check {
        uri() {
            return "";
        }
        video_preview() {
            return "";
        }
        video_id() {
            return "";
        }
        checked(next) {
            return this.active(next);
        }
        sub() {
            return [
                this.Image(),
                this.Frame()
            ];
        }
        active(next) {
            if (next !== undefined)
                return next;
            return false;
        }
        title() {
            return "";
        }
        Image() {
            const obj = new this.$.$mol_image();
            obj.title = () => this.title();
            obj.uri = () => this.video_preview();
            return obj;
        }
        video_embed() {
            return "";
        }
        Frame() {
            const obj = new this.$.$mol_frame();
            obj.title = () => this.title();
            obj.uri = () => this.video_embed();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_embed_youtube.prototype, "active", null);
    __decorate([
        $mol_mem
    ], $mol_embed_youtube.prototype, "Image", null);
    __decorate([
        $mol_mem
    ], $mol_embed_youtube.prototype, "Frame", null);
    $.$mol_embed_youtube = $mol_embed_youtube;
})($ || ($ = {}));
//mol/embed/youtube/-view.tree/youtube.view.tree.ts
;
"use strict";
//mol/type/partial/deep/deep.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_jsx_prefix = '';
    $.$mol_jsx_crumbs = '';
    $.$mol_jsx_booked = null;
    $.$mol_jsx_document = {
        getElementById: () => null,
        createElementNS: (space, name) => $mol_dom_context.document.createElementNS(space, name),
        createDocumentFragment: () => $mol_dom_context.document.createDocumentFragment(),
    };
    $.$mol_jsx_frag = '';
    function $mol_jsx(Elem, props, ...childNodes) {
        const id = props && props.id || '';
        const guid = id ? $.$mol_jsx_prefix ? $.$mol_jsx_prefix + '/' + id : id : $.$mol_jsx_prefix;
        const crumbs_self = id ? $.$mol_jsx_crumbs.replace(/(\S+)/g, `$1_${id.replace(/\/.*/i, '')}`) : $.$mol_jsx_crumbs;
        if (Elem && $.$mol_jsx_booked) {
            if ($.$mol_jsx_booked.has(id)) {
                $mol_fail(new Error(`JSX already has tag with id ${JSON.stringify(guid)}`));
            }
            else {
                $.$mol_jsx_booked.add(id);
            }
        }
        let node = guid ? $.$mol_jsx_document.getElementById(guid) : null;
        if ($.$mol_jsx_prefix) {
            const prefix_ext = $.$mol_jsx_prefix;
            const booked_ext = $.$mol_jsx_booked;
            const crumbs_ext = $.$mol_jsx_crumbs;
            for (const field in props) {
                const func = props[field];
                if (typeof func !== 'function')
                    continue;
                const wrapper = function (...args) {
                    const prefix = $.$mol_jsx_prefix;
                    const booked = $.$mol_jsx_booked;
                    const crumbs = $.$mol_jsx_crumbs;
                    try {
                        $.$mol_jsx_prefix = prefix_ext;
                        $.$mol_jsx_booked = booked_ext;
                        $.$mol_jsx_crumbs = crumbs_ext;
                        return func.call(this, ...args);
                    }
                    finally {
                        $.$mol_jsx_prefix = prefix;
                        $.$mol_jsx_booked = booked;
                        $.$mol_jsx_crumbs = crumbs;
                    }
                };
                $mol_func_name_from(wrapper, func);
                props[field] = wrapper;
            }
        }
        if (typeof Elem !== 'string') {
            if ('prototype' in Elem) {
                const view = node && node[Elem] || new Elem;
                Object.assign(view, props);
                view[Symbol.toStringTag] = guid;
                view.childNodes = childNodes;
                if (!view.ownerDocument)
                    view.ownerDocument = $.$mol_jsx_document;
                view.className = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                node = view.valueOf();
                node[Elem] = view;
                return node;
            }
            else {
                const prefix = $.$mol_jsx_prefix;
                const booked = $.$mol_jsx_booked;
                const crumbs = $.$mol_jsx_crumbs;
                try {
                    $.$mol_jsx_prefix = guid;
                    $.$mol_jsx_booked = new Set;
                    $.$mol_jsx_crumbs = (crumbs_self ? crumbs_self + ' ' : '') + (Elem['name'] || Elem);
                    return Elem(props, ...childNodes);
                }
                finally {
                    $.$mol_jsx_prefix = prefix;
                    $.$mol_jsx_booked = booked;
                    $.$mol_jsx_crumbs = crumbs;
                }
            }
        }
        if (!node) {
            node = Elem
                ? $.$mol_jsx_document.createElementNS(props?.xmlns ?? 'http://www.w3.org/1999/xhtml', Elem)
                : $.$mol_jsx_document.createDocumentFragment();
        }
        $mol_dom_render_children(node, [].concat(...childNodes));
        if (!Elem)
            return node;
        if (guid)
            node.id = guid;
        for (const key in props) {
            if (key === 'id')
                continue;
            if (typeof props[key] === 'string') {
                ;
                node.setAttribute(key, props[key]);
            }
            else if (props[key] &&
                typeof props[key] === 'object' &&
                Reflect.getPrototypeOf(props[key]) === Reflect.getPrototypeOf({})) {
                if (typeof node[key] === 'object') {
                    Object.assign(node[key], props[key]);
                    continue;
                }
            }
            else {
                node[key] = props[key];
            }
        }
        if ($.$mol_jsx_crumbs)
            node.className = (props?.['class'] ? props['class'] + ' ' : '') + crumbs_self;
        return node;
    }
    $.$mol_jsx = $mol_jsx;
})($ || ($ = {}));
//mol/jsx/jsx.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/youtube/youtube.view.css", "[mol_embed_youtube] {\n\tpadding: 0;\n}\n\n[mol_embed_youtube_image]:not(:hover):not(:focus) {\n\topacity: .75;\n}\n");
})($ || ($ = {}));
//mol/embed/youtube/-css/youtube.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_youtube extends $.$mol_embed_youtube {
            video_embed() {
                return `https://www.youtube.com/embed/${encodeURIComponent(this.video_id())}?autoplay=1&loop=1`;
            }
            video_id() {
                return this.uri().match(/^https\:\/\/www\.youtube\.com\/(?:embed\/|watch\?v=)([^\/&?#]+)/)?.[1] ?? 'about:blank';
            }
            video_preview() {
                return `https://i.ytimg.com/vi_webp/${this.video_id()}/sddefault.webp`;
            }
            sub() {
                return [this.active() ? this.Frame() : this.Image()];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_embed", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_id", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "video_preview", null);
        __decorate([
            $mol_mem
        ], $mol_embed_youtube.prototype, "sub", null);
        $$.$mol_embed_youtube = $mol_embed_youtube;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/embed/youtube/youtube.view.tsx
;
"use strict";
var $;
(function ($) {
    class $mol_embed_any extends $mol_ghost {
        Image() {
            const obj = new this.$.$mol_image();
            obj.title = () => this.title();
            obj.uri = () => this.uri();
            return obj;
        }
        Object() {
            const obj = new this.$.$mol_embed_native();
            obj.title = () => this.title();
            obj.uri = () => this.uri();
            return obj;
        }
        Youtube() {
            const obj = new this.$.$mol_embed_youtube();
            obj.title = () => this.title();
            obj.uri = () => this.uri();
            return obj;
        }
        title() {
            return "";
        }
        uri() {
            return "";
        }
    }
    __decorate([
        $mol_mem
    ], $mol_embed_any.prototype, "Image", null);
    __decorate([
        $mol_mem
    ], $mol_embed_any.prototype, "Object", null);
    __decorate([
        $mol_mem
    ], $mol_embed_any.prototype, "Youtube", null);
    $.$mol_embed_any = $mol_embed_any;
})($ || ($ = {}));
//mol/embed/any/-view.tree/any.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_any extends $.$mol_embed_any {
            type() {
                try {
                    const uri = this.uri();
                    if (/\.(png|gif|jpg|jpeg|webp|svg)$/.test(uri))
                        return 'image';
                    if (/^https:\/\/www\.youtube\.com\//.test(uri))
                        return 'youtube';
                }
                catch (error) {
                    $mol_fail_log(error);
                    return 'image';
                }
                return 'object';
            }
            Sub() {
                switch (this.type()) {
                    case 'image': return this.Image();
                    case 'youtube': return this.Youtube();
                    default: return this.Object();
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "type", null);
        __decorate([
            $mol_mem
        ], $mol_embed_any.prototype, "Sub", null);
        $$.$mol_embed_any = $mol_embed_any;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/embed/any/any.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_text extends $mol_list {
        uri_base() {
            return "";
        }
        text() {
            return "";
        }
        param() {
            return "";
        }
        flow_tokens() {
            return [];
        }
        auto() {
            return [
                this.auto_scroll()
            ];
        }
        Paragraph(id) {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => this.block_content(id);
            return obj;
        }
        Quote(id) {
            const obj = new this.$.$mol_text();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.text = () => this.quote_text(id);
            obj.highlight = () => this.highlight();
            obj.auto_scroll = () => null;
            return obj;
        }
        List(id) {
            const obj = new this.$.$mol_text();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.text = () => this.list_text(id);
            obj.highlight = () => this.highlight();
            obj.auto_scroll = () => null;
            return obj;
        }
        Header(id) {
            const obj = new this.$.$mol_text_header();
            obj.minimal_height = () => 40;
            obj.dom_name = () => this.header_level(id);
            obj.content = () => this.block_content(id);
            obj.arg = () => this.header_arg(id);
            return obj;
        }
        Pre(id) {
            const obj = new this.$.$mol_text_code();
            obj.text = () => this.pre_text(id);
            obj.highlight = () => this.highlight();
            obj.sidebar_showed = () => this.pre_sidebar_showed();
            return obj;
        }
        Table(id) {
            const obj = new this.$.$mol_grid();
            obj.head_cells = () => this.table_head_cells(id);
            obj.rows = () => this.table_rows(id);
            return obj;
        }
        Table_row(id) {
            const obj = new this.$.$mol_grid_row();
            obj.cells = () => this.table_cells(id);
            return obj;
        }
        Table_cell(id) {
            const obj = new this.$.$mol_text();
            obj.auto_scroll = () => null;
            obj.highlight = () => this.highlight();
            obj.uri_resolve = (id) => this.uri_resolve(id);
            obj.text = () => this.table_cell_text(id);
            return obj;
        }
        String(id) {
            const obj = new this.$.$mol_dimmer();
            obj.dom_name = () => "span";
            obj.needle = () => this.highlight();
            obj.haystack = () => this.line_text(id);
            return obj;
        }
        Span(id) {
            const obj = new this.$.$mol_text_span();
            obj.dom_name = () => "span";
            obj.type = () => this.line_type(id);
            obj.sub = () => this.line_content(id);
            return obj;
        }
        Code_line(id) {
            const obj = new this.$.$mol_text_code_row();
            obj.numb_showed = () => false;
            obj.highlight = () => this.highlight();
            obj.text = () => this.line_text(id);
            return obj;
        }
        Link(id) {
            const obj = new this.$.$mol_link_iconed();
            obj.uri = () => this.link_uri(id);
            obj.content = () => this.line_content(id);
            return obj;
        }
        Link_http(id) {
            const obj = new this.$.$mol_link_iconed();
            obj.uri = () => this.link_uri(id);
            obj.content = () => [
                this.link_host(id)
            ];
            return obj;
        }
        Embed(id) {
            const obj = new this.$.$mol_embed_any();
            obj.uri = () => this.link_uri(id);
            obj.title = () => this.line_text(id);
            return obj;
        }
        auto_scroll() {
            return null;
        }
        block_content(id) {
            return [];
        }
        uri_resolve(id) {
            return null;
        }
        quote_text(id) {
            return "";
        }
        highlight() {
            return "";
        }
        list_text(id) {
            return "";
        }
        header_level(id) {
            return "h";
        }
        header_arg(id) {
            return {};
        }
        pre_text(id) {
            return "";
        }
        code_sidebar_showed() {
            return true;
        }
        pre_sidebar_showed() {
            return this.code_sidebar_showed();
        }
        table_head_cells(id) {
            return [];
        }
        table_rows(id) {
            return [];
        }
        table_cells(id) {
            return [];
        }
        table_cell_text(id) {
            return "";
        }
        line_text(id) {
            return "";
        }
        line_type(id) {
            return "";
        }
        line_content(id) {
            return [];
        }
        link_uri(id) {
            return "";
        }
        link_host(id) {
            return "";
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Paragraph", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Quote", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "List", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Header", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Pre", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Table", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Table_row", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Table_cell", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "String", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Span", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Code_line", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Link", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Link_http", null);
    __decorate([
        $mol_mem_key
    ], $mol_text.prototype, "Embed", null);
    $.$mol_text = $mol_text;
    class $mol_text_header extends $mol_paragraph {
        sub() {
            return [
                this.Link()
            ];
        }
        arg() {
            return {};
        }
        content() {
            return [];
        }
        Link() {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.arg();
            obj.hint = () => this.$.$mol_locale.text('$mol_text_header_Link_hint');
            obj.sub = () => this.content();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_text_header.prototype, "Link", null);
    $.$mol_text_header = $mol_text_header;
    class $mol_text_span extends $mol_paragraph {
        dom_name() {
            return "span";
        }
        attr() {
            return {
                ...super.attr(),
                mol_text_type: this.type()
            };
        }
        type() {
            return "";
        }
    }
    $.$mol_text_span = $mol_text_span;
})($ || ($ = {}));
//mol/text/text/-view.tree/text.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/text/text/text.view.css", "[mol_text] {\n\tline-height: 1.5em;\n\tbox-sizing: border-box;\n\tmax-width: 60rem;\n\tborder-radius: var(--mol_gap_round);\n\twhite-space: pre-line;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex: 0 0 auto;\n\ttab-size: 4;\n}\n\n[mol_text_paragraph] {\n\tpadding: var(--mol_gap_text);\n\toverflow: auto;\n\tmax-width: 100%;\n\tdisplay: block;\n}\n\n[mol_text_span] {\n\tdisplay: inline;\n}\n\n[mol_text_string] {\n\tdisplay: inline;\n\tflex: 0 1 auto;\n\twhite-space: normal;\n}\n\n[mol_text_quote] {\n\tmargin: var(--mol_gap_block);\n\tpadding: var(--mol_gap_block);\n\tbackground: var(--mol_theme_card);\n}\n\n[mol_text_header] {\n\tdisplay: block;\n\ttext-shadow: 0 0;\n\tfont-weight: normal;\n}\n\n* + [mol_text_header] {\n\tmargin-top: 0.75rem;\n}\n\nh1[mol_text_header] {\n\tfont-size: 1.5rem;\n}\n\nh2[mol_text_header] {\n\tfont-size: 1.5rem;\n\tfont-style: italic;\n}\n\nh3[mol_text_header] {\n\tfont-size: 1.25rem;\n}\n\nh4[mol_text_header] {\n\tfont-size: 1.25em;\n\tfont-style: italic;\n}\n\nh5[mol_text_header] {\n\tfont-size: 1rem;\n}\n\nh6[mol_text_header] {\n\tfont-size: 1rem;\n\tfont-style: italic;\n}\n\n[mol_text_header_link] {\n\tcolor: inherit;\n}\n\n[mol_text_list] {\n\tpadding-left: 1.5rem;\n}\n\n[mol_text_list_paragraph] {\n\tdisplay: list-item;\n}\n\n[mol_text_list_paragraph]::before {\n\tcontent: '•';\n\twidth: 1.5rem;\n\tdisplay: inline-block;\n\tposition: absolute;\n\tmargin-left: -1rem;\n}\n\n[mol_text_table_cell] {\n\twidth: auto;\n\tdisplay: table-cell;\n\tvertical-align: baseline;\n\tpadding: 0;\n\tborder-radius: 0;\n}\n\n[mol_text_link_http],\n[mol_text_link] {\n\tpadding: 0;\n\tdisplay: inline;\n\twhite-space: nowrap;\n}\n\n[mol_text_link_http_icon],\n[mol_text_link_icon] {\n\tmargin: .25rem;\n}\n\n[mol_text_embed_youtube_image],\n[mol_text_embed_youtube_frame],\n[mol_text_embed_object] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\twidth: 100vw;\n\tmax-height: calc( 100vh - 6rem );\n}\n[mol_text_embed_object_fallback] {\n\tpadding: 0;\n}\n[mol_text_embed_image] {\n\tobject-fit: contain;\n\tobject-position: center;\n\tdisplay: inline;\n\tmax-height: calc( 100vh - 6rem );\n\tvertical-align: top;\n}\n\n[mol_text_pre] {\n\twhite-space: pre;\n\toverflow-x: auto;\n\ttab-size: 2;\n}\n\n[mol_text_code_line] {\n\tdisplay: inline-block;\n\twhite-space: nowrap;\n}\n\n[mol_text_type=\"strong\"] {\n\ttext-shadow: 0 0;\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_text_type=\"emphasis\"] {\n\tfont-style: italic;\n}\n\n[mol_text_type=\"strike\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"remark\"] {\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_text_type=\"quote\"] {\n\tfont-style: italic;\n}\n");
})($ || ($ = {}));
//mol/text/text/-css/text.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text extends $.$mol_text {
            flow_tokens() {
                const tokens = [];
                this.$.$mol_syntax2_md_flow.tokenize(this.text(), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            block_type(index) {
                return this.flow_tokens()[index].name;
            }
            rows() {
                return this.flow_tokens().map(({ name }, index) => {
                    switch (name) {
                        case 'quote': return this.Quote(index);
                        case 'header': return this.Header(index);
                        case 'list': return this.List(index);
                        case 'code': return this.Pre(index);
                        case 'code-indent': return this.Pre(index);
                        case 'table': return this.Table(index);
                        default: return this.Paragraph(index);
                    }
                });
            }
            param() {
                return this.toString().replace(/^.*?\)\./, '').replace(/[()]/g, '');
            }
            header_level(index) {
                return 'h' + this.flow_tokens()[index].chunks[0].length;
            }
            header_arg(index) {
                return {
                    [this.param()]: this.flow_tokens()[index].chunks[2]
                };
            }
            pre_text(index) {
                const token = this.flow_tokens()[index];
                return (token.chunks[2] ?? token.chunks[0].replace(/^(\t|    )/gm, '')).replace(/[\n\r]*$/, '');
            }
            quote_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^> /mg, '');
            }
            list_text(index) {
                return this.flow_tokens()[index].chunks[0].replace(/^([-*+ ]|\d+\.) ?/mg, '').replace(/^  /mg, '');
            }
            cell_content(indexBlock) {
                return this.flow_tokens()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(row => row && !/\|--/.test(row))
                    .map((row, rowId) => {
                    return row.split(/\|/g)
                        .filter(cell => cell)
                        .map((cell, cellId) => cell.trim());
                });
            }
            table_rows(blockId) {
                return this.cell_content(blockId)
                    .slice(1)
                    .map((row, rowId) => this.Table_row({ block: blockId, row: rowId + 1 }));
            }
            table_head_cells(blockId) {
                return this.cell_content(blockId)[0]
                    .map((cell, cellId) => this.Table_cell({ block: blockId, row: 0, cell: cellId }));
            }
            table_cells(id) {
                return this.cell_content(id.block)[id.row]
                    .map((cell, cellId) => this.Table_cell({ block: id.block, row: id.row, cell: cellId }));
            }
            table_cell_text(id) {
                return this.cell_content(id.block)[id.row][id.cell];
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                const url = new URL(uri, this.uri_base());
                return url.toString();
            }
            block_text(index) {
                const token = this.flow_tokens()[index];
                switch (token.name) {
                    case 'header': return token.chunks[2];
                    default: return token.chunks[0];
                }
            }
            block_content(index) {
                return this.line_content([index]);
            }
            line_tokens(path) {
                const tokens = [];
                this.$.$mol_syntax2_md_line.tokenize(this.line_text(path), (name, found, chunks) => tokens.push({ name, found, chunks }));
                return tokens;
            }
            line_token(path) {
                const tokens = this.line_tokens(path.slice(0, path.length - 1));
                return tokens[path[path.length - 1]];
            }
            line_type(path) {
                return this.line_token(path).name;
            }
            line_text(path) {
                if (path.length === 1)
                    return this.block_text(path[0]);
                const { name, found, chunks } = this.line_token(path);
                switch (name) {
                    default: return (chunks[0] || chunks[1]) ?? found;
                }
            }
            line_content(path) {
                return this.line_tokens(path).map(({ name, chunks }, index) => {
                    const path2 = [...path, index];
                    switch (name) {
                        case 'text-link-http': return this.Link_http(path2);
                        case 'text-link': return this.Link(path2);
                        case 'image-link': return this.Embed(path2);
                        case 'code3': return this.Code_line(path2);
                        case 'code': return this.Code_line(path2);
                        case '': return this.String(path2);
                        default: return this.Span(path2);
                    }
                });
            }
            link_uri(path) {
                const token = this.line_token(path);
                const uri = this.uri_resolve(token.chunks[1] ?? token.found);
                if (!uri)
                    throw new Error('Bad link');
                return uri;
            }
            link_host(path) {
                return this.link_uri(path).replace(/^.*?\/\/|\/.*$/g, '');
            }
            auto_scroll() {
                for (const [index, token] of this.flow_tokens().entries()) {
                    if (token.name !== 'header')
                        continue;
                    const header = this.Header(index);
                    if (!header.Link().current())
                        continue;
                    new $mol_after_tick(() => this.ensure_visible(header));
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "flow_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_type", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "rows", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "param", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_level", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "header_arg", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "pre_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "quote_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "list_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "cell_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_head_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cells", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "table_cell_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "uri_resolve", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "block_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_token", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "line_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text.prototype, "link_host", null);
        __decorate([
            $mol_mem
        ], $mol_text.prototype, "auto_scroll", null);
        $$.$mol_text = $mol_text;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/text/text/text.view.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_habhub extends $mol_book2 {
        plugins() {
            return [
                this.Theme(),
                this.Search_start()
            ];
        }
        Menu_page() {
            const obj = new this.$.$mol_page();
            obj.title = () => this.menu_title();
            obj.tools = () => this.tools_root();
            obj.body = () => [
                this.Search(),
                this.Menu()
            ];
            return obj;
        }
        Details(id) {
            const obj = new this.$.$mol_page();
            obj.title = () => this.gist_current_title();
            obj.tools = () => [
                this.Details_chat(id),
                this.Created(),
                this.Details_link(),
                this.Close()
            ];
            obj.body_scroll_top = (val) => this.details_scroll_top(val);
            obj.body = () => [
                this.Datails_text()
            ];
            return obj;
        }
        Menu_row(id) {
            const obj = new this.$.$mol_link();
            obj.minimal_height = () => 40;
            obj.sub = () => [
                this.Menu_row_title(id)
            ];
            obj.arg = () => this.gist_arg(id);
            return obj;
        }
        Theme() {
            const obj = new this.$.$mol_theme_auto();
            return obj;
        }
        search_start(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        Search_start() {
            const obj = new this.$.$mol_hotkey();
            obj.key = () => ({
                F: (next) => this.search_start(next)
            });
            obj.mod_ctrl = () => true;
            return obj;
        }
        menu_title() {
            return "HabHub";
        }
        Add_icon() {
            const obj = new this.$.$mol_icon_plus();
            return obj;
        }
        Add() {
            const obj = new this.$.$mol_link();
            obj.hint = () => "Add article";
            obj.uri = () => "https://github.com/nin-jin/habhub";
            obj.sub = () => [
                this.Add_icon()
            ];
            return obj;
        }
        Source_link() {
            const obj = new this.$.$mol_link_source();
            obj.uri = () => "https://github.com/hyoo-ru/habhub.hyoo.ru";
            return obj;
        }
        Lights() {
            const obj = new this.$.$mol_lights_toggle();
            return obj;
        }
        tools_root() {
            return [
                this.Add(),
                this.Source_link(),
                this.Lights()
            ];
        }
        search(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Details_body() {
            const obj = new this.$.$mol_view();
            return obj;
        }
        Search() {
            const obj = new this.$.$mol_search_jumper();
            obj.query = (val) => this.search(val);
            obj.Root = () => this.Details_body();
            return obj;
        }
        menu_rows() {
            return [];
        }
        Menu() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.menu_rows();
            return obj;
        }
        gist_current_title() {
            return "";
        }
        chat_seed(id) {
            return "";
        }
        chat_pages(id) {
            return this.Details_chat(id).pages();
        }
        Details_chat(id) {
            const obj = new this.$.$mol_chat();
            obj.seed = () => this.chat_seed(id);
            return obj;
        }
        gist_current_created() {
            return "";
        }
        Created() {
            const obj = new this.$.$mol_paragraph();
            obj.title = () => this.gist_current_created();
            return obj;
        }
        details_link() {
            return "";
        }
        Details_link() {
            const obj = new this.$.$mol_link_source();
            obj.uri = () => this.details_link();
            return obj;
        }
        close_arg() {
            return {
                author: null,
                repo: null,
                article: null,
                gist: null
            };
        }
        Close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        Close() {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.close_arg();
            obj.sub = () => [
                this.Close_icon()
            ];
            return obj;
        }
        details_scroll_top(val) {
            if (val !== undefined)
                return val;
            return 0;
        }
        gist_current_content() {
            return "";
        }
        Datails_text() {
            const obj = new this.$.$mol_text();
            obj.highlight = () => this.search();
            obj.text = () => this.gist_current_content();
            return obj;
        }
        gist_title(id) {
            return "";
        }
        Menu_row_title(id) {
            const obj = new this.$.$mol_dimmer();
            obj.needle = () => this.search();
            obj.haystack = () => this.gist_title(id);
            return obj;
        }
        gist_arg(id) {
            return {};
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Menu_page", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_habhub.prototype, "Details", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_habhub.prototype, "Menu_row", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Theme", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "search_start", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Search_start", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Add_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Add", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Source_link", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Lights", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "search", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Details_body", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Search", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Menu", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_habhub.prototype, "Details_chat", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Created", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Details_link", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Close_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Close", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "details_scroll_top", null);
    __decorate([
        $mol_mem
    ], $hyoo_habhub.prototype, "Datails_text", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_habhub.prototype, "Menu_row_title", null);
    $.$hyoo_habhub = $hyoo_habhub;
})($ || ($ = {}));
//hyoo/habhub/-view.tree/habhub.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror');
        if (error.length)
            throw new Error(error[0].textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));
//mol/dom/parse/parse.ts
;
"use strict";
var $;
(function ($) {
    class $mol_fetch_response extends $mol_object2 {
        native;
        constructor(native) {
            super();
            this.native = native;
        }
        headers() {
            return this.native.headers;
        }
        mime() {
            return this.headers().get('content-type');
        }
        stream() {
            return this.native.body;
        }
        text() {
            const buffer = this.buffer();
            const native = this.native;
            const mime = native.headers.get('content-type') || '';
            const [, charset] = /charset=(.*)/.exec(mime) || [, 'utf-8'];
            const decoder = new TextDecoder(charset);
            return decoder.decode(buffer);
        }
        json() {
            return $mol_wire_sync(this.native).json();
        }
        buffer() {
            return $mol_wire_sync(this.native).arrayBuffer();
        }
        xml() {
            return $mol_dom_parse(this.text(), 'application/xml');
        }
        xhtml() {
            return $mol_dom_parse(this.text(), 'application/xhtml+xml');
        }
        html() {
            return $mol_dom_parse(this.text(), 'text/html');
        }
        blob() {
            return $mol_wire_sync(this.native).blob();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "html", null);
    __decorate([
        $mol_action
    ], $mol_fetch_response.prototype, "blob", null);
    $.$mol_fetch_response = $mol_fetch_response;
    class $mol_fetch extends $mol_object2 {
        static request(input, init = {}) {
            let native = $mol_dom_context.fetch;
            if (!native)
                native = $node['node-fetch'];
            const controller = new AbortController();
            let done = false;
            const promise = native(input, {
                ...init,
                signal: controller.signal,
            }).finally(() => {
                done = true;
            });
            return Object.assign(promise, {
                destructor: () => {
                    if (!done)
                        controller.abort();
                },
            });
        }
        static response(input, init) {
            const response = $mol_wire_sync(this).request(input, init);
            if (Math.floor(response.status / 100) === 2)
                return new $mol_fetch_response(response);
            throw new Error(response.statusText || `HTTP Error ${response.status}`);
        }
        static stream(input, init) {
            return this.response(input, init).stream();
        }
        static text(input, init) {
            return this.response(input, init).text();
        }
        static json(input, init) {
            return this.response(input, init).json();
        }
        static buffer(input, init) {
            return this.response(input, init).buffer();
        }
        static xml(input, init) {
            return this.response(input, init).xml();
        }
        static xhtml(input, init) {
            return this.response(input, init).xhtml();
        }
        static html(input, init) {
            return this.response(input, init).html();
        }
        static blob(input, init) {
            return this.response(input, init).blob();
        }
    }
    __decorate([
        $mol_action
    ], $mol_fetch, "response", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "stream", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "text", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "json", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "xhtml", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "html", null);
    __decorate([
        $mol_action
    ], $mol_fetch, "blob", null);
    $.$mol_fetch = $mol_fetch;
})($ || ($ = {}));
//mol/fetch/fetch.ts
;
"use strict";
var $;
(function ($) {
    class $mol_model extends $mol_object {
        static item(uri) {
            $mol_wire_solid();
            const instance = new this;
            instance.uri = () => uri;
            return instance;
        }
        uri() {
            return '';
        }
        resource_url() {
            return this.uri();
        }
        method_put() {
            return 'PUT';
        }
        json(next) {
            const prev = this.json_update();
            if (next)
                return this.json_update({ ...prev, ...next });
            if (next === undefined && prev !== undefined)
                return prev;
            let json = $mol_fetch.json(this.resource_url(), {
                method: next ? this.method_put() : 'GET',
                body: next && JSON.stringify(next),
                headers: {
                    'content-type': 'application/json',
                },
            });
            return this.json_update(json);
        }
        json_update(patch) {
            if (patch)
                this.json_update();
            else
                $mol_wire_solid();
            return patch;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_model.prototype, "json", null);
    __decorate([
        $mol_mem
    ], $mol_model.prototype, "json_update", null);
    __decorate([
        $mol_mem_key
    ], $mol_model, "item", null);
    $.$mol_model = $mol_model;
    function $mol_model_prop(field, make) {
        return (host, prop, descr) => {
            if (field)
                field = prop;
            const value = descr.value;
            descr.value = function (next) {
                const val = this.json(next === undefined ? undefined : { ...this.json(), [field]: next })[field];
                if (val === undefined)
                    return value.call(this);
                if (make)
                    return make(val);
                return val;
            };
        };
    }
    $.$mol_model_prop = $mol_model_prop;
})($ || ($ = {}));
//mol/model/model.ts
;
"use strict";
var $;
(function ($) {
    class $mol_time_base {
        static patterns = {};
        static formatter(pattern) {
            if (this.patterns[pattern])
                return this.patterns[pattern];
            var tokens = Object.keys(this.patterns)
                .sort()
                .reverse()
                .map((token) => token.replace(/([-+*.\[\]()\^])/g, '\\$1'));
            var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
            var funcs = [];
            pattern.replace(lexer, (str, text, token) => {
                if (text)
                    funcs.push(() => text);
                if (token)
                    funcs.push(this.patterns[token]);
                return str;
            });
            return this.patterns[pattern] = (arg) => {
                return funcs.reduce((res, func) => res + func(arg), '');
            };
        }
        toString(pattern) {
            const Base = this.constructor;
            const formatter = Base.formatter(pattern);
            return formatter(this);
        }
    }
    $.$mol_time_base = $mol_time_base;
})($ || ($ = {}));
//mol/time/base/base.ts
;
"use strict";
var $;
(function ($) {
    class $mol_time_duration extends $mol_time_base {
        constructor(config = 0) {
            super();
            if (typeof config === 'number') {
                this.second = config / 1000;
                return;
            }
            if (typeof config === 'string') {
                if (config === 'Z') {
                    this.hour = 0;
                    this.minute = 0;
                    return;
                }
                duration: {
                    const parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    const found = parser.exec(config);
                    if (!found)
                        break duration;
                    if (found[1])
                        this.year = Number(found[1]);
                    if (found[2])
                        this.month = Number(found[2]);
                    if (found[3])
                        this.day = Number(found[3]);
                    if (found[4])
                        this.hour = Number(found[4]);
                    if (found[5])
                        this.minute = Number(found[5]);
                    if (found[6])
                        this.second = Number(found[6]);
                    return;
                }
                offset: {
                    var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                    var found = parser.exec(config);
                    if (!found)
                        break offset;
                    if (found[1])
                        this.hour = Number(found[1]);
                    if (found[2])
                        this.minute = Number(found[2]);
                    return;
                }
                throw new Error(`Can not parse time duration (${config})`);
            }
            this.year = config.year || 0;
            this.month = config.month || 0;
            this.day = config.day || 0;
            this.hour = config.hour || 0;
            this.minute = config.minute || 0;
            this.second = config.second || 0;
        }
        year = 0;
        month = 0;
        day = 0;
        hour = 0;
        minute = 0;
        second = 0;
        summ(config) {
            const duration = new $mol_time_duration(config);
            return new $mol_time_duration({
                year: this.year + duration.year,
                month: this.month + duration.month,
                day: this.day + duration.day,
                hour: this.hour + duration.hour,
                minute: this.minute + duration.minute,
                second: this.second + duration.second,
            });
        }
        mult(numb) {
            return new $mol_time_duration({
                year: this.year && this.year * numb,
                month: this.month && this.month * numb,
                day: this.day && this.day * numb,
                hour: this.hour && this.hour * numb,
                minute: this.minute && this.minute * numb,
                second: this.second && this.second * numb,
            });
        }
        count(config) {
            const duration = new $mol_time_duration(config);
            return this.valueOf() / duration.valueOf();
        }
        valueOf() {
            var day = this.year * 365 + this.month * 30.4 + this.day;
            var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
            return second * 1000;
        }
        toJSON() { return this.toString(); }
        toString(pattern = 'P#Y#M#DT#h#m#s') {
            return super.toString(pattern);
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        static patterns = {
            '#Y': (duration) => {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': (duration) => {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': (duration) => {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': (duration) => {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': (duration) => {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': (duration) => {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
        };
    }
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));
//mol/time/duration/duration.ts
;
"use strict";
var $;
(function ($) {
    let $mol_time_moment_weekdays;
    (function ($mol_time_moment_weekdays) {
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["monday"] = 0] = "monday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["tuesday"] = 1] = "tuesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["wednesday"] = 2] = "wednesday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["thursday"] = 3] = "thursday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["friday"] = 4] = "friday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["saturday"] = 5] = "saturday";
        $mol_time_moment_weekdays[$mol_time_moment_weekdays["sunday"] = 6] = "sunday";
    })($mol_time_moment_weekdays = $.$mol_time_moment_weekdays || ($.$mol_time_moment_weekdays = {}));
    function numb(str, max) {
        const numb = Number(str);
        if (numb < max)
            return numb;
        $mol_fail(new Error(`Wrong time component ${str}`));
    }
    class $mol_time_moment extends $mol_time_base {
        constructor(config = new Date) {
            super();
            if (typeof config === 'number')
                config = new Date(config);
            if (typeof config === 'string') {
                const parsed = /^(?:(\d\d?\d?\d?)(?:-?(\d\d?)(?:-?(\d\d?))?)?)?(?:[T ](?:(\d\d?)(?::?(\d\d?)(?::?(\d\d?(?:\.\d+)?))?)?)?(Z|[\+\-]\d\d?(?::?(?:\d\d?)?)?)?)?$/.exec(config);
                if (!parsed)
                    throw new Error(`Can not parse time moment (${config})`);
                if (parsed[1])
                    this.year = numb(parsed[1], 9999);
                if (parsed[2])
                    this.month = numb(parsed[2], 13) - 1;
                if (parsed[3])
                    this.day = numb(parsed[3], 32) - 1;
                if (parsed[4])
                    this.hour = numb(parsed[4], 60);
                if (parsed[5])
                    this.minute = numb(parsed[5], 60);
                if (parsed[6])
                    this.second = numb(parsed[6], 60);
                if (parsed[7])
                    this.offset = new $mol_time_duration(parsed[7]);
                return;
            }
            if (config instanceof Date) {
                this.year = config.getFullYear();
                this.month = config.getMonth();
                this.day = config.getDate() - 1;
                this.hour = config.getHours();
                this.minute = config.getMinutes();
                this.second = config.getSeconds() + config.getMilliseconds() / 1000;
                const offset = -config.getTimezoneOffset();
                this.offset = new $mol_time_duration({
                    hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                    minute: offset % 60
                });
                return;
            }
            this.year = config.year;
            this.month = config.month;
            this.day = config.day;
            this.hour = config.hour;
            this.minute = config.minute;
            this.second = config.second;
            this.offset = config.offset == null ? config.offset : new $mol_time_duration(config.offset);
        }
        year;
        month;
        day;
        hour;
        minute;
        second;
        offset;
        get weekday() {
            return (this.native.getDay() + 6) % 7;
        }
        _native;
        get native() {
            if (this._native)
                return this._native;
            const utc = this.toOffset('Z');
            return this._native = new Date(Date.UTC(utc.year ?? 0, utc.month ?? 0, (utc.day ?? 0) + 1, utc.hour ?? 0, utc.minute ?? 0, utc.second != undefined ? Math.floor(utc.second) : 0, utc.second != undefined ? Math.floor((utc.second - Math.floor(utc.second)) * 1000) : 0));
        }
        _normal;
        get normal() {
            if (this._normal)
                return this._normal;
            const moment = new $mol_time_moment(this.native);
            return this._normal = new $mol_time_moment({
                year: this.year === undefined ? undefined : moment.year,
                month: this.month === undefined ? undefined : moment.month,
                day: this.day === undefined ? undefined : moment.day,
                hour: this.hour === undefined ? undefined : moment.hour,
                minute: this.minute === undefined ? undefined : moment.minute,
                second: this.second === undefined ? undefined : moment.second,
                offset: this.offset === undefined ? undefined : moment.offset,
            });
        }
        merge(config) {
            const moment = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: moment.year === undefined ? this.year : moment.year,
                month: moment.month === undefined ? this.month : moment.month,
                day: moment.day === undefined ? this.day : moment.day,
                hour: moment.hour === undefined ? this.hour : moment.hour,
                minute: moment.minute === undefined ? this.minute : moment.minute,
                second: moment.second === undefined ? this.second : moment.second,
                offset: moment.offset === undefined ? this.offset : moment.offset,
            });
        }
        shift(config) {
            const duration = new $mol_time_duration(config);
            const moment = new $mol_time_moment().merge({
                year: this.year,
                month: this.month,
                day: this.day,
                hour: this.hour ?? 0,
                minute: this.minute ?? 0,
                second: this.second ?? 0,
                offset: this.offset ?? 0
            });
            const second = moment.second + (duration.second ?? 0);
            const native = new Date(moment.year + (duration.year ?? 0), moment.month + (duration.month ?? 0), moment.day + 1 + (duration.day ?? 0), moment.hour + (duration.hour ?? 0), moment.minute + (duration.minute ?? 0), Math.floor(second), (second - Math.floor(second)) * 1000);
            if (isNaN(native.valueOf()))
                throw new Error('Wrong time');
            return new $mol_time_moment({
                year: this.year === undefined ? undefined : native.getFullYear(),
                month: this.month === undefined ? undefined : native.getMonth(),
                day: this.day === undefined ? undefined : native.getDate() - 1,
                hour: this.hour === undefined ? undefined : native.getHours(),
                minute: this.minute === undefined ? undefined : native.getMinutes(),
                second: this.second === undefined ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
                offset: this.offset,
            });
        }
        mask(config) {
            const mask = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: mask.year === undefined ? undefined : this.year,
                month: mask.month === undefined ? undefined : this.month,
                day: mask.day === undefined ? undefined : this.day,
                hour: mask.hour === undefined ? undefined : this.hour,
                minute: mask.minute === undefined ? undefined : this.minute,
                second: mask.second === undefined ? undefined : this.second,
                offset: mask.offset === undefined ? undefined : this.offset,
            });
        }
        toOffset(config = new $mol_time_moment().offset) {
            const duration = new $mol_time_duration(config);
            const offset = this.offset || new $mol_time_moment().offset;
            let with_time = new $mol_time_moment('T00:00:00').merge(this);
            const moment = with_time.shift(duration.summ(offset.mult(-1)));
            return moment.merge({ offset: duration });
        }
        valueOf() { return this.native.getTime(); }
        toJSON() { return this.toString(); }
        toString(pattern = 'YYYY-MM-DDThh:mm:ss.sssZ') {
            return super.toString(pattern);
        }
        [Symbol.toPrimitive](mode) {
            return mode === 'number' ? this.valueOf() : this.toString();
        }
        static patterns = {
            'YYYY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': (moment) => {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': (moment) => {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': (pattern => (moment) => {
                if (moment.month == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { month: 'long' })),
            'DD Month': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'long' })),
            'D Month': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Month'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' })),
            'Mon': (pattern => (moment) => {
                if (moment.month == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { month: 'short' })),
            'DD Mon': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['DD'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short' })),
            'D Mon': (pattern => (moment) => {
                if (moment.month == null) {
                    if (moment.day == null) {
                        return '';
                    }
                    else {
                        return $mol_time_moment.patterns['D'](moment);
                    }
                }
                else {
                    if (moment.day == null) {
                        return $mol_time_moment.patterns['Mon'](moment);
                    }
                    else {
                        return pattern.format(moment.native);
                    }
                }
            })(new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' })),
            '-MM': (moment) => {
                if (moment.month == null)
                    return '';
                return '-' + $mol_time_moment.patterns['MM'](moment);
            },
            'MM': (moment) => {
                if (moment.month == null)
                    return '';
                return String(100 + moment.month + 1).slice(1);
            },
            'M': (moment) => {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': (pattern => (moment) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { weekday: 'long' })),
            'WD': (pattern => (moment) => {
                if (moment.day == null)
                    return '';
                if (moment.month == null)
                    return '';
                if (moment.year == null)
                    return '';
                return pattern.format(moment.native);
            })(new Intl.DateTimeFormat(undefined, { weekday: 'short' })),
            '-DD': (moment) => {
                if (moment.day == null)
                    return '';
                return '-' + $mol_time_moment.patterns['DD'](moment);
            },
            'DD': (moment) => {
                if (moment.day == null)
                    return '';
                return String(100 + moment.day + 1).slice(1);
            },
            'D': (moment) => {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': (moment) => {
                if (moment.hour == null)
                    return '';
                return 'T' + $mol_time_moment.patterns['hh'](moment);
            },
            'hh': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(100 + moment.hour).slice(1);
            },
            'h': (moment) => {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return ':' + $mol_time_moment.patterns['mm'](moment);
            },
            'mm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(100 + moment.minute).slice(1);
            },
            'm': (moment) => {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': (moment) => {
                if (moment.second == null)
                    return '';
                return ':' + $mol_time_moment.patterns['ss'](moment);
            },
            'ss': (moment) => {
                if (moment.second == null)
                    return '';
                return String(100 + moment.second | 0).slice(1);
            },
            's': (moment) => {
                if (moment.second == null)
                    return '';
                return String(moment.second | 0);
            },
            '.sss': (moment) => {
                if (moment.second == null)
                    return '';
                if (moment.second === (moment.second | 0))
                    return '';
                return '.' + $mol_time_moment.patterns['sss'](moment);
            },
            'sss': (moment) => {
                if (moment.second == null)
                    return '';
                const millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
                return String(1000 + millisecond).slice(1);
            },
            'Z': (moment) => {
                const offset = moment.offset;
                if (!offset)
                    return '';
                let hour = offset.hour;
                let sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return sign + String(100 + hour).slice(1) + ':' + String(100 + offset.minute).slice(1);
            }
        };
    }
    $.$mol_time_moment = $mol_time_moment;
})($ || ($ = {}));
//mol/time/moment/moment.ts
;
"use strict";
var $;
(function ($) {
    class $mol_mem_force extends Object {
        constructor() { super(); }
        $mol_mem_force = true;
        static $mol_mem_force = true;
        static toString() { return this.name; }
    }
    $.$mol_mem_force = $mol_mem_force;
    class $mol_mem_force_cache extends $mol_mem_force {
    }
    $.$mol_mem_force_cache = $mol_mem_force_cache;
    class $mol_mem_force_update extends $mol_mem_force {
    }
    $.$mol_mem_force_update = $mol_mem_force_update;
    class $mol_mem_force_fail extends $mol_mem_force_cache {
    }
    $.$mol_mem_force_fail = $mol_mem_force_fail;
})($ || ($ = {}));
//mol/mem/force/force.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_auth extends $mol_object {
        static id() { return '07c88ba2782884016182'; }
        static secret() { return '5874d66181f987a8bb2dc07bd431aad1c7a5cb38'; }
        static code_uri() { return 'https://github.com/login/oauth/authorize'; }
        static token_uri() { return 'http://cors.hyoo.ru/https://github.com/login/oauth/access_token'; }
        static cache(next) {
            return $mol_state_local.value(`${this}.cache()`, next) || { scopes: [], token: '' };
        }
        static scopes(next) {
            let cache = this.cache();
            let scopes = cache.scopes;
            for (let scope of next || []) {
                if (scopes.indexOf(scope) >= 0)
                    continue;
                scopes = scopes.concat(scope);
                this.cache({ scopes, token: '' });
            }
            return scopes;
        }
        static code(next, force) {
            const url = `${this.code_uri()}?client_id=${this.id()}&scope=${this.scopes()}`;
            return $mol_fiber_sync(() => new Promise((done, fail) => {
                const win = $mol_dom_context.open(url, '$mol_github');
                win.focus();
                const timer = setInterval(() => {
                    try {
                        win.location.href;
                    }
                    catch (error) {
                        return;
                    }
                    const search = win.location.search;
                    if (search !== undefined) {
                        const found = search.match(/\bcode=([^&]+)/);
                        if (!found)
                            return;
                        done(found[1]);
                    }
                    else {
                        fail(new Error('Can not get auth code'));
                    }
                    clearInterval(timer);
                    win.close();
                    $mol_dom_context.focus();
                }, 16);
            }))();
        }
        static token_last(next, force) {
            const cache = this.cache();
            if (force)
                this.cache({ ...cache, token: '' });
            if (!force && cache.token)
                return cache.token;
            const auth_uri = `${this.token_uri()}?code=${this.code(undefined, force)}&client_id=${this.id()}&client_secret=${this.secret()}`;
            const response = $mol_fetch.json(auth_uri, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (response.error_description) {
                return $mol_fail(new Error(response.error_description));
            }
            const token = response.access_token;
            this.cache({ ...cache, token });
            return token;
        }
        static token(scopes) {
            this.scopes(scopes);
            return this.token_last();
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_auth, "cache", null);
    __decorate([
        $mol_mem
    ], $mol_github_auth, "scopes", null);
    __decorate([
        $mol_mem
    ], $mol_github_auth, "code", null);
    __decorate([
        $mol_mem
    ], $mol_github_auth, "token_last", null);
    $.$mol_github_auth = $mol_github_auth;
})($ || ($ = {}));
//mol/github/auth/auth.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_entity extends $mol_model {
        link() {
            return this.json().html_url;
        }
        id() {
            return this.json().id;
        }
        moment_created() {
            return new $mol_time_moment(this.json().created_at);
        }
        moment_updated() {
            return new $mol_time_moment(this.json().updated_at);
        }
        method_put() {
            return 'PATCH';
        }
        resource_url() {
            const auth = this.$.$mol_github_auth;
            return `${this.uri()}?client_id=${auth.id()}&client_secret=${auth.secret()}`;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_entity.prototype, "moment_created", null);
    __decorate([
        $mol_mem
    ], $mol_github_entity.prototype, "moment_updated", null);
    $.$mol_github_entity = $mol_github_entity;
})($ || ($ = {}));
//mol/github/entity/entity.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_user extends $mol_github_entity {
        name() {
            return this.uri().replace(/.*\//, '');
        }
        avatar() {
            return this.json().avatar_url;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_user.prototype, "name", null);
    $.$mol_github_user = $mol_github_user;
})($ || ($ = {}));
//mol/github/user/user.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_label extends $mol_github_entity {
        name() {
            return this.json().name;
        }
        color() {
            return this.json().color;
        }
        default() {
            return this.json().default;
        }
    }
    $.$mol_github_label = $mol_github_label;
})($ || ($ = {}));
//mol/github/label/label.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_comment extends $mol_github_entity {
        json_update(patch) {
            if (patch?.user)
                $mol_github_user.item(patch.user.url).json_update(patch.user);
            return super.json_update(patch);
        }
        issue() {
            return $mol_github_issue.item(this.json().issue_url);
        }
        user() {
            return $mol_github_user.item(this.json().user.url);
        }
        text(next) {
            return this.json($mol_maybe(next).map(next => ({ body: next }))[0]).body;
        }
    }
    $.$mol_github_comment = $mol_github_comment;
})($ || ($ = {}));
//mol/github/comment/comment.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_issue extends $mol_model {
        json_update(patch) {
            if (patch?.user)
                $mol_github_user.item(patch.user.url).json_update(patch.user);
            if (patch?.closed_by)
                $mol_github_user.item(patch.closed_by.url).json_update(patch.closed_by);
            if (patch?.assignees) {
                for (let assignee of patch.assignees) {
                    $mol_github_user.item(assignee.url).json_update(assignee);
                }
            }
            if (patch?.labels) {
                for (let label of patch.labels) {
                    $mol_github_label.item(label.url).json_update(label);
                }
            }
            return super.json_update(patch);
        }
        repository() {
            return $mol_github_repository.item(this.uri().replace(/\/[^\/]*\/[^\/]*$/, ''));
        }
        web_uri() {
            return this.json().html_url;
        }
        author() {
            return $mol_github_user.item(this.json().user.url);
        }
        owner() {
            const url = this.json().repository_url
                .replace(/\/[^\/]+$/, '')
                .replace(/\/repos\//, '/users/');
            return $mol_github_user.item(url);
        }
        number() {
            return this.json().number;
        }
        title() {
            return this.json().title;
        }
        text() {
            return this.json().body ?? this.json(null).body ?? '';
        }
        closer() {
            return $mol_maybe(this.json().closed_by).map(json => $mol_github_user.item(json.url))[0] || null;
        }
        assignees() {
            return this.json().assignees.map(json => $mol_github_user.item(json.url));
        }
        labels() {
            return this.json().labels.map(json => $mol_github_label.item(json.url));
        }
        moment_created() {
            return new $mol_time_moment(this.json().created_at);
        }
        moment_updated() {
            return new $mol_time_moment(this.json().updated_at);
        }
        comments() {
            return $mol_github_issue_comments.item(`${this.uri()}/comments`);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_issue.prototype, "text", null);
    __decorate([
        $mol_mem
    ], $mol_github_issue.prototype, "assignees", null);
    __decorate([
        $mol_mem
    ], $mol_github_issue.prototype, "labels", null);
    __decorate([
        $mol_mem
    ], $mol_github_issue.prototype, "moment_created", null);
    __decorate([
        $mol_mem
    ], $mol_github_issue.prototype, "moment_updated", null);
    __decorate([
        $mol_mem
    ], $mol_github_issue.prototype, "comments", null);
    $.$mol_github_issue = $mol_github_issue;
    class $mol_github_issue_comments extends $mol_model {
        json_update(patch) {
            for (let comment of patch) {
                $mol_github_comment.item(comment.url).json_update(comment);
            }
            return super.json_update(patch);
        }
        items(next) {
            return this.json(next).map(json => $mol_github_comment.item(json.url));
        }
        add(config, next) {
            if (!config)
                return;
            try {
                const json = $mol_fetch.json(this.uri() + '?', {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${$mol_github_auth.token(['public_repo'])}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ body: config.text })
                });
                const comment = $mol_github_comment.item(json.url);
                comment.json(json);
                this.json(null);
                return comment;
            }
            catch (error) {
                if (error.message === 'Unauthorized') {
                    $mol_github_auth.token_last(undefined, $mol_mem_force_update);
                }
                throw error;
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_issue_comments.prototype, "items", null);
    __decorate([
        $mol_mem_key
    ], $mol_github_issue_comments.prototype, "add", null);
    $.$mol_github_issue_comments = $mol_github_issue_comments;
})($ || ($ = {}));
//mol/github/issue/issue.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_repository extends $mol_github_entity {
        json_update(patch) {
            if (patch?.owner)
                $mol_github_user.item(patch.owner.url).json_update(patch.owner);
            return super.json_update(patch);
        }
        owner() {
            return $mol_github_user.item(this.json().owner.url);
        }
        name() {
            return this.uri().match(/[^\/]+$/)[0];
        }
        name_full() {
            return this.uri().match(/[^\/]+\/[^\/]+$/)[0];
        }
        issues() {
            return $mol_github_repository_issues.item(`${this.uri()}/issues`);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_repository.prototype, "issues", null);
    $.$mol_github_repository = $mol_github_repository;
    class $mol_github_repository_issues extends $mol_model {
        json_update(patch) {
            for (let issue of patch) {
                $mol_github_issue.item(issue.url).json_update(issue);
            }
            return super.json_update(patch);
        }
        items(next) {
            return this.json(next).map(json => $mol_github_issue.item(json.url));
        }
        add(config, next, force) {
            if (!config)
                return;
            try {
                const json = $mol_fetch.json(this.uri() + '?', {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${$mol_github_auth.token(['public_repo'])}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: config.title, body: config.text })
                });
                const comment = $mol_github_issue.item(json.url);
                comment.json(json);
                this.json(null);
                return comment;
            }
            catch (error) {
                if (error.message === 'Unauthorized') {
                    $mol_github_auth.token_last(undefined, $mol_mem_force_update);
                }
                throw error;
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_repository_issues.prototype, "items", null);
    __decorate([
        $mol_mem_key
    ], $mol_github_repository_issues.prototype, "add", null);
    $.$mol_github_repository_issues = $mol_github_repository_issues;
})($ || ($ = {}));
//mol/github/repository/repository.ts
;
"use strict";
var $;
(function ($) {
    class $mol_github_search_issues extends $mol_model {
        json_update(patch) {
            if (patch) {
                for (let issue of patch.items) {
                    $mol_github_issue.item(issue.url).json_update(issue);
                }
            }
            return super.json_update(patch);
        }
        items(next) {
            return this.json(next).items.map(json => $mol_github_issue.item(json.url));
        }
        resource_url() {
            const auth = this.$.$mol_github_auth;
            return `${this.uri()}&client_id=${auth.id()}&client_secret=${auth.secret()}`;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_github_search_issues.prototype, "items", null);
    $.$mol_github_search_issues = $mol_github_search_issues;
})($ || ($ = {}));
//mol/github/search/issues/issues.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("hyoo/habhub/habhub.view.css", "[hyoo_habhub] {\n\tmargin: 0;\n}\n\n[hyoo_habhub_created] {\n\tpadding: var(--mol_gap_text);\n}\n\n[hyoo_habhub_search] {\n\tflex: none;\n\talign-self: stretch;\n}\n\n[hyoo_habhub_menu_page_body] {\n\tpadding: var(--mol_gap_block);\n}\n\n[hyoo_habhub_menu_page] {\n\tflex: 0 0 25rem;\n\twidth: 100%;\n}\n\n[hyoo_habhub_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n[hyoo_habhub_placeholder] {\n\t/* flex: 1 1 600px; */\n}\n\n[hyoo_habhub_details] {\n\tflex: 0 0 60rem;\n}\n\n[hyoo_habhub_details_body] {\n\tpadding: 0;\n}\n\n[hyoo_habhub_details_chat] {\n\tbox-shadow: none;\n}\n\n[hyoo_habhub_datails_text] {\n\tpadding: var(--mol_gap_block);\n}\n");
})($ || ($ = {}));
//hyoo/habhub/-css/habhub.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_habhub extends $.$hyoo_habhub {
            search_start(event) {
                event?.preventDefault();
                this.Search().Query().bring();
            }
            uriSource() {
                const search = this.search();
                if (search.length < 2)
                    return 'hyoo/habhub/data/issues.json?';
                this.$.$mol_wait_timeout(500);
                const query = `label:HabHub is:open "${search}"`;
                return `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=updated&per_page=100`;
            }
            gists() {
                return $mol_github_search_issues.item(this.uriSource()).items();
            }
            gists_dict() {
                const dict = {};
                for (let gist of this.gists()) {
                    dict[gist.uri()] = gist;
                }
                return dict;
            }
            gist(uri) {
                return this.gists_dict()[uri];
            }
            gist_current() {
                const uri = this.$.$mol_state_arg.value('gist');
                if (uri)
                    return $mol_github_issue.item(uri);
                if (!this.owner())
                    return null;
                if (!this.repo())
                    return null;
                if (!this.article())
                    return null;
                return $mol_github_issue.item(`https://api.github.com/repos/${this.owner()}/${this.repo()}/issues/${this.article()}`);
            }
            details_link() {
                return `https://github.com/${this.owner()}/${this.repo()}/issues/${this.article()}`;
            }
            Details_body() {
                const gist = this.gist_current();
                return gist ? this.Details(gist).Body() : null;
            }
            owner() {
                return this.$.$mol_state_arg.value('author');
            }
            repo() {
                return this.$.$mol_state_arg.value('repo');
            }
            article() {
                return this.$.$mol_state_arg.value('article');
            }
            pages() {
                const gist = this.gist_current();
                return [
                    this.Menu_page(),
                    ...gist ? [
                        this.Details(gist),
                        ...this.chat_pages(gist),
                    ] : []
                ];
            }
            chat_seed(issue) {
                return issue.uri().replace(/.*\/repos\//, '');
            }
            menu_rows() {
                return this.gists()
                    .map(gist => this.Menu_row(gist.uri()));
            }
            gist_title(uri) {
                return this.gist(uri).title();
            }
            gist_arg(uri) {
                const gist = this.gist(uri);
                return {
                    author: gist.owner().name(),
                    repo: gist.repository().name(),
                    article: String(gist.number()),
                    gist: null,
                };
            }
            gist_current_title() {
                return this.gist_current().title();
            }
            gist_current_content() {
                return this.gist_current().text();
            }
            gist_current_issue() {
                return this.gist_current();
            }
            gist_current_created() {
                return this.gist_current().moment_created().toString('YYYY-MM-DD');
            }
            details_scroll_top(next) {
                const current = this.gist_current();
                return $mol_state_session.value(`${this}.details_scroll_top(${current.uri()})`, next);
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "uriSource", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "gists", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "gists_dict", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "gist_current", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "details_link", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "Details_body", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "pages", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_habhub.prototype, "chat_seed", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "menu_rows", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_habhub.prototype, "gist_title", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_habhub.prototype, "gist_arg", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "gist_current_created", null);
        __decorate([
            $mol_mem
        ], $hyoo_habhub.prototype, "details_scroll_top", null);
        $$.$hyoo_habhub = $hyoo_habhub;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/habhub/habhub.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_expander extends $mol_list {
        rows() {
            return [
                this.Label(),
                this.Content()
            ];
        }
        expanded(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        label() {
            return [
                this.title()
            ];
        }
        Trigger() {
            const obj = new this.$.$mol_check_expand();
            obj.checked = (val) => this.expanded(val);
            obj.label = () => this.label();
            return obj;
        }
        Tools() {
            return null;
        }
        Label() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.Trigger(),
                this.Tools()
            ];
            return obj;
        }
        content() {
            return [];
        }
        Content() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.content();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "expanded", null);
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "Trigger", null);
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "Label", null);
    __decorate([
        $mol_mem
    ], $mol_expander.prototype, "Content", null);
    $.$mol_expander = $mol_expander;
})($ || ($ = {}));
//mol/expander/-view.tree/expander.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n\tposition: relative;\n}\n\n[mol_expander_trigger_icon] {\n\tposition: absolute;\n\tmargin-left: -1rem;\n}\n");
})($ || ($ = {}));
//mol/expander/-css/expander.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
        }
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/expander/expander.view.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_apps extends $mol_book2 {
        Placeholder() {
            return null;
        }
        plugins() {
            return [
                this.Theme()
            ];
        }
        pages() {
            return [
                this.Menu(),
                this.App("id")
            ];
        }
        groups() {
            return {
                release: this.$.$mol_locale.text('$hyoo_apps_groups_release'),
                develop: this.$.$mol_locale.text('$hyoo_apps_groups_develop'),
                preview: this.$.$mol_locale.text('$hyoo_apps_groups_preview')
            };
        }
        apps() {
            return {
                board: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_board_title'),
                    uri: "https://board.hyoo.ru/"
                },
                notes: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_notes_title'),
                    uri: "https://notes.hyoo.ru/"
                },
                page: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_page_title'),
                    uri: "https://page.hyoo.ru/"
                },
                slides: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_slides_title'),
                    uri: "https://slides.hyoo.ru/"
                },
                search: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_search_title'),
                    uri: "https://search.hyoo.ru/"
                },
                talks: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_talks_title'),
                    uri: "https://talks.hyoo.ru/#!chat=fsh1o2_jdzewo"
                },
                map: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_map_title'),
                    uri: "https://map.hyoo.ru/"
                },
                scout: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_scout_title'),
                    uri: "https://scout.hyoo.ru/"
                },
                fallacy: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_fallacy_title'),
                    uri: "https://fallacy.hyoo.ru/"
                },
                meme: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_meme_title'),
                    uri: "https://meme.hyoo.ru/"
                },
                calc: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_calc_title'),
                    uri: "https://calc.hyoo.ru/#!title=a*x**2%20%2B%20b*x%20%2B%20c%20%3D%200/A1=x%20%3D%20%5B%0A%09%28%20-_.b%20%2B%20sqrt%28_.D%29%20%29%20%2F%202%20%2F%20_.a%2C%0A%09%28%20-_.b%20-%20sqrt%28_.D%29%20%29%20%2F%202%20%2F%20_.a%2C%0A%5D/A2=D%20%3D%20_.b**2%20-%204*_.a*_.c/C1=a%20%3D%203/C2=b%20%3D%206/C3=c%20%3D%20-9"
                },
                play: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_play_title'),
                    uri: "https://play.hyoo.ru/"
                },
                life: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_life_title'),
                    uri: "https://life.hyoo.ru/"
                },
                iq: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_iq_title'),
                    uri: "https://iq.hyoo.ru/"
                },
                todomvc: {
                    target: "release",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_todomvc_title'),
                    uri: "https://todomvc.hyoo.ru/"
                },
                draw: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_draw_title'),
                    uri: "https://draw.hyoo.ru/"
                },
                invest: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_invest_title'),
                    uri: "https://invest.hyoo.ru/"
                },
                lamps: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_lamps_title'),
                    uri: "https://lamps.hyoo.ru/"
                },
                questions: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_questions_title'),
                    uri: "https://mol.js.org/app/questions/-/"
                },
                shelter: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_shelter_title'),
                    uri: "https://shelter.hyoo.ru/#login=user"
                },
                mail: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_mail_title'),
                    uri: "https://mail.hyoo.ru/#!folder=inbox/mail=qwe"
                },
                gazporn: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_gazporn_title'),
                    uri: "https://nin-jin.github.io/chart/"
                },
                toys: {
                    target: "preview",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_toys_title'),
                    uri: "https://toys.hyoo.ru/#size=M/popular"
                },
                mol: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_mol_title'),
                    uri: "https://mol.hyoo.ru/"
                },
                sync: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_sync_title'),
                    uri: "https://sync.hyoo.ru/watch/"
                },
                piterjs: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_piterjs_title'),
                    uri: "https://piterjs.org/"
                },
                habhub: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_habhub_title'),
                    uri: "https://habhub.hyoo.ru/"
                },
                jseval: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_jseval_title'),
                    uri: "https://eval.js.hyoo.ru/"
                },
                jsperf: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_jsperf_title'),
                    uri: "https://perf.js.hyoo.ru/#!prefix=let%20res/sources=%5B\"res%20%3D%20window.location.href\"%2C\"res%20%3D%20document.location.href\"%2C\"res%20%3D%20location.href\"%5D/postfix=%24mol_assert_like%28%20res%2C%20location.href%20%29"
                },
                jsopt: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_jsopt_title'),
                    uri: "https://opt.js.hyoo.ru/"
                },
                bench: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_bench_title'),
                    uri: "https://bench.hyoo.ru/#bench=https%3A%2F%2Fhyoo-ru.github.io%2Ftodomvc%2Fbenchmark%2F/sort=fill"
                },
                toxic: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_toxic_title'),
                    uri: "https://nin-jin.github.io/toxic-repos/"
                },
                request: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_request_title'),
                    uri: "https://http.hyoo.ru/#uri=https%3A%2F%2Fapi.github.com%2Frepos%2Fhyoo-ru%2Fmam_mol"
                },
                tree: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_tree_title'),
                    uri: "https://tree.hyoo.ru/"
                },
                icons: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_icons_title'),
                    uri: "https://nin-jin.github.io/mol_icon/"
                },
                rdf: {
                    target: "develop",
                    title: this.$.$mol_locale.text('$hyoo_apps_apps_rdf_title'),
                    uri: "http://rdf.hyoo.ru/"
                }
            };
        }
        Theme() {
            const obj = new this.$.$mol_theme_auto();
            return obj;
        }
        Source() {
            const obj = new this.$.$mol_link_source();
            obj.uri = () => "https://github.com/hyoo-ru/apps.hyoo.ru";
            return obj;
        }
        Lights() {
            const obj = new this.$.$mol_lights_toggle();
            return obj;
        }
        tools() {
            return [
                this.Source(),
                this.Lights()
            ];
        }
        group_name(id) {
            return "";
        }
        group_expanded(id, next) {
            if (next !== undefined)
                return next;
            return true;
        }
        app_uri_default(id) {
            return "";
        }
        app_title(id) {
            return "";
        }
        app_arg(id) {
            return {};
        }
        Menu_link_out(id) {
            const obj = new this.$.$mol_link_iconed();
            obj.uri = () => this.app_uri_default(id);
            obj.title = () => this.app_title(id);
            obj.arg = () => this.app_arg(id);
            return obj;
        }
        Menu_link_in_icon(id) {
            const obj = new this.$.$mol_icon_chevron_right();
            return obj;
        }
        Menu_link_in(id) {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.app_arg(id);
            obj.sub = () => [
                this.Menu_link_in_icon(id)
            ];
            return obj;
        }
        Menu_item(id) {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.Menu_link_out(id),
                this.Menu_link_in(id)
            ];
            return obj;
        }
        group_items(id) {
            return [
                this.Menu_item(id)
            ];
        }
        Group(id) {
            const obj = new this.$.$mol_expander();
            obj.title = () => this.group_name(id);
            obj.expanded = (next) => this.group_expanded(id, next);
            obj.content = () => this.group_items(id);
            return obj;
        }
        group_list() {
            return [
                this.Group("id")
            ];
        }
        Menu_items() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.group_list();
            return obj;
        }
        Menu() {
            const obj = new this.$.$mol_page();
            obj.title = () => this.$.$mol_locale.text('$hyoo_apps_Menu_title');
            obj.tools = () => this.tools();
            obj.body = () => [
                this.Menu_items()
            ];
            return obj;
        }
        app_uri_embed(id, next) {
            if (next !== undefined)
                return next;
            return "";
        }
        App(id) {
            const obj = new this.$.$mol_frame();
            obj.uri = (next) => this.app_uri_embed(id, next);
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_apps.prototype, "Theme", null);
    __decorate([
        $mol_mem
    ], $hyoo_apps.prototype, "Source", null);
    __decorate([
        $mol_mem
    ], $hyoo_apps.prototype, "Lights", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "group_expanded", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "Menu_link_out", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "Menu_link_in_icon", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "Menu_link_in", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "Menu_item", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "Group", null);
    __decorate([
        $mol_mem
    ], $hyoo_apps.prototype, "Menu_items", null);
    __decorate([
        $mol_mem
    ], $hyoo_apps.prototype, "Menu", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "app_uri_embed", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_apps.prototype, "App", null);
    $.$hyoo_apps = $hyoo_apps;
})($ || ($ = {}));
//hyoo/apps/-view.tree/apps.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("hyoo/apps/apps.view.css", "[hyoo_apps_menu] {\n\tflex: 0 0 20rem;\n}\n\n[hyoo_apps_menu_items] {\n\tpadding: var(--mol_gap_block);\n}\n\n[hyoo_apps_menu_link_out] {\n\tflex-grow: 1;\n}\n\n[hyoo_apps_app] {\n\tflex: 1 0 25rem;\n}\n");
})($ || ($ = {}));
//hyoo/apps/-css/apps.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_apps extends $.$hyoo_apps {
            app() {
                return this.$.$mol_state_arg.value('app');
            }
            group_name(id) {
                return this.groups()[id];
            }
            group_list() {
                return Object.keys(this.groups()).map(group => this.Group(group));
            }
            group_items(group) {
                const apps = this.apps();
                return Object.keys(this.apps())
                    .filter(app => apps[app].target === group)
                    .map(app => this.Menu_item(app));
            }
            pages() {
                const app = this.app();
                return [
                    this.Menu(),
                    ...app ? [this.App(app)] : [],
                ];
            }
            app_title(app) {
                return this.apps()[app].title;
            }
            app_uri_default(app, next) {
                return this.apps()[app].uri;
            }
            app_uri_embed(app, next) {
                const lights = this.$.$mol_lights();
                if (this.app() === app) {
                    const arg = this.$.$mol_state_arg.value('uri', next);
                    if (arg)
                        return arg.replace(/mol_lights=(true|false)/, `mol_lights=${lights}`);
                }
                return this.app_uri_default(app) + `#mol_lights=${lights}`;
            }
            app_arg(app) {
                return { app, uri: null };
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_apps.prototype, "group_list", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_apps.prototype, "group_items", null);
        __decorate([
            $mol_mem
        ], $hyoo_apps.prototype, "pages", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_apps.prototype, "app_uri_embed", null);
        $$.$hyoo_apps = $hyoo_apps;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/apps/apps.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_card extends $mol_list {
        attr() {
            return {
                ...super.attr(),
                mol_card_status_type: this.status()
            };
        }
        rows() {
            return [
                this.Content(),
                this.Status()
            ];
        }
        status() {
            return "";
        }
        content() {
            return [
                this.title()
            ];
        }
        Content() {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.content();
            return obj;
        }
        status_text() {
            return this.status();
        }
        Status() {
            const obj = new this.$.$mol_view();
            obj.minimal_height = () => 30;
            obj.sub = () => [
                this.status_text()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_card.prototype, "Content", null);
    __decorate([
        $mol_mem
    ], $mol_card.prototype, "Status", null);
    $.$mol_card = $mol_card;
})($ || ($ = {}));
//mol/card/-view.tree/card.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/card/card.view.css", "[mol_card] {\n\tbackground: var(--mol_theme_card);\n\tcolor: var(--mol_theme_text);\n\tborder-radius: var(--mol_gap_round);\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tflex-direction: column;\n\tposition: relative;\n\toverflow: hidden;\n}\n\n[mol_card_content] {\n\tflex: 1 1 auto;\n\tborder-radius: var(--mol_gap_round);\n\tmargin: 0;\n\tpadding: var(--mol_gap_block);\n}\n\n[mol_card_status] {\n\tbackground: var(--mol_theme_line);\n\ttext-transform: capitalize;\n\tpadding: var(--mol_gap_text);\n\tmargin: 0;\n}\n\n[mol_card_status] {\n\tbackground: var(--mol_theme_line);\n}\n");
})($ || ($ = {}));
//mol/card/-css/card.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_card extends $.$mol_card {
            rows() {
                return [
                    this.Content(),
                    ...this.status_text() ? [this.Status()] : [],
                ];
            }
        }
        $$.$mol_card = $mol_card;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/card/card.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_filler extends $mol_view {
        minimal_height() {
            return 500;
        }
        sub() {
            return [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.",
                "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.",
                "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.",
                "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.",
                "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.",
                "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.",
                "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel."
            ];
        }
    }
    $.$mol_filler = $mol_filler;
})($ || ($ = {}));
//mol/filler/-view.tree/filler.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/filler/filler.view.css", "[mol_filler] {\n\ttext-align: left;\n\tpadding: var(--mol_gap_text);\n\tflex-shrink: 0;\n}\n");
})($ || ($ = {}));
//mol/filler/-css/filler.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_infinite extends $mol_list {
        before(id) {
            return [];
        }
        after(id) {
            return [];
        }
        row_ids(next) {
            if (next !== undefined)
                return next;
            return [];
        }
        render_over() {
            return 1;
        }
        Row(id) {
            const obj = new this.$.$mol_view();
            return obj;
        }
        Before(id) {
            const obj = new this.$.$mol_view();
            obj.minimal_width = () => 0;
            obj.minimal_height = () => 0;
            obj.auto = () => this.before_load(id);
            return obj;
        }
        After(id) {
            const obj = new this.$.$mol_view();
            obj.minimal_width = () => 0;
            obj.minimal_height = () => 0;
            obj.auto = () => this.after_load(id);
            return obj;
        }
        before_load(id) {
            return null;
        }
        after_load(id) {
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_infinite.prototype, "row_ids", null);
    __decorate([
        $mol_mem_key
    ], $mol_infinite.prototype, "Row", null);
    __decorate([
        $mol_mem_key
    ], $mol_infinite.prototype, "Before", null);
    __decorate([
        $mol_mem_key
    ], $mol_infinite.prototype, "After", null);
    $.$mol_infinite = $mol_infinite;
})($ || ($ = {}));
//mol/infinite/-view.tree/infinite.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/infinite/infinite.view.css", "[mol_infinite_before],\n[mol_infinite_after] {\n\toverflow-anchor: none;\n}\n\n[mol_infinite_after][mol_view_error=\"Promise\"] {\n\theight: 100vh;\n}\n");
})($ || ($ = {}));
//mol/infinite/-css/infinite.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_infinite extends $.$mol_infinite {
            before_load(anchor) {
                const more = this.before(anchor);
                new $mol_after_tick(() => {
                    let ids = this.row_ids();
                    const index = Math.max(0, ids.indexOf(anchor));
                    const unique = new Set([
                        ...ids.slice(0, index),
                        ...more,
                        ...ids.slice(index),
                    ]);
                    this.row_ids([...unique]);
                });
            }
            after_load(anchor) {
                const more = this.after(anchor);
                new $mol_after_tick(() => {
                    let ids = this.row_ids();
                    const index = (ids.indexOf(anchor) + 1) || ids.length;
                    const unique = new Set([
                        ...ids.slice(0, index),
                        ...more,
                        ...ids.slice(index),
                    ]);
                    this.row_ids([...unique]);
                });
            }
            rows() {
                const ids = this.row_ids();
                return [
                    this.Before(ids.at(0)),
                    ...ids.map(id => this.Row(id)),
                    this.After(ids.at(-1)),
                ];
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_infinite.prototype, "before_load", null);
        __decorate([
            $mol_mem_key
        ], $mol_infinite.prototype, "after_load", null);
        __decorate([
            $mol_mem
        ], $mol_infinite.prototype, "rows", null);
        $$.$mol_infinite = $mol_infinite;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/infinite/infinite.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_labeler extends $mol_list {
        rows() {
            return [
                this.Label(),
                this.Content()
            ];
        }
        label() {
            return [
                this.title()
            ];
        }
        Label() {
            const obj = new this.$.$mol_view();
            obj.minimal_height = () => 40;
            obj.sub = () => this.label();
            return obj;
        }
        content() {
            return [];
        }
        Content() {
            const obj = new this.$.$mol_view();
            obj.minimal_height = () => 24;
            obj.sub = () => this.content();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_labeler.prototype, "Label", null);
    __decorate([
        $mol_mem
    ], $mol_labeler.prototype, "Content", null);
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//mol/labeler/-view.tree/labeler.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/labeler/labeler.view.css", "[mol_labeler] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: stretch;\n\tcursor: inherit;\n}\n\n[mol_labeler_label] {\n\tmin-height: 2.5rem;\n\tcolor: var(--mol_theme_shade);\n\tz-index: 1;\n\tpadding: var(--mol_gap_text);\n\tgap: 0 var(--mol_gap_block);\n\tflex-wrap: wrap;\n}\n\n[mol_labeler_content] {\n\tdisplay: flex;\n\tpadding: var(--mol_gap_text);\n}\n");
})($ || ($ = {}));
//mol/labeler/-css/labeler.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $koplenov_hn extends $mol_page {
        title() {
            return "HabHub";
        }
        body() {
            return this.Gists();
        }
        Gist(id) {
            const obj = new this.$.$koplenov_hn_item();
            obj.by = () => this.post_by(id);
            obj.title = () => this.post_title(id);
            obj.uri = () => this.post_url(id);
            return obj;
        }
        Gists() {
            return [];
        }
        post_by(id, next) {
            if (next !== undefined)
                return next;
            return null;
        }
        post_title(id, next) {
            if (next !== undefined)
                return next;
            return null;
        }
        post_url(id, next) {
            if (next !== undefined)
                return next;
            return null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $koplenov_hn.prototype, "Gist", null);
    __decorate([
        $mol_mem_key
    ], $koplenov_hn.prototype, "post_by", null);
    __decorate([
        $mol_mem_key
    ], $koplenov_hn.prototype, "post_title", null);
    __decorate([
        $mol_mem_key
    ], $koplenov_hn.prototype, "post_url", null);
    $.$koplenov_hn = $koplenov_hn;
    class $koplenov_hn_item extends $mol_list {
        rows() {
            return [
                this.By(),
                this.Url()
            ];
        }
        by() {
            return "";
        }
        title() {
            return "";
        }
        By() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.by(),
                this.title()
            ];
            return obj;
        }
        uri() {
            return "";
        }
        Url() {
            const obj = new this.$.$mol_link();
            obj.uri = () => this.uri();
            obj.sub = () => [
                this.title()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_hn_item.prototype, "By", null);
    __decorate([
        $mol_mem
    ], $koplenov_hn_item.prototype, "Url", null);
    $.$koplenov_hn_item = $koplenov_hn_item;
})($ || ($ = {}));
//koplenov/hn/-view.tree/hn.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("koplenov/hn/hn.view.css", "/* Styling BEM-block by autogenerated attribute */\n[koplenov_hn] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tfont: 1.5rem/1 sans-serif;\n\tbox-shadow: var(--mol_skin_light_outline);\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tmargin: 0;\n}\n\n/* Styling BEM-element by autogenerated attribute */\n[koplenov_hn_name] {\n\tflex-grow: 0;\n\tmargin: 1rem;\n\twidth: 14rem;\n}\n\n[koplenov_hn_gist] {\n\tmargin: 1rem;\n}\n\n[koplenov_hn_item] {\n\tmargin: 1rem;\n}\n");
})($ || ($ = {}));
//koplenov/hn/-css/hn.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $koplenov_hn extends $.$koplenov_hn {
            uri_source() {
                return 'https://raw.githubusercontent.com/koplenov/pac/master/podcasts';
            }
            gists() {
                return (this.$.$mol_fetch.json("https://hacker-news.firebaseio.com/v0/newstories.json").slice(0, 10));
            }
            Gists() {
                return this.gists().map((gist, index) => this.Gist(index));
            }
            post(id) {
                return this.$.$mol_fetch.json("https://hacker-news.firebaseio.com/v0/item/" + id + ".json") || { by: 'hello', title: 'title', 'url': 'https://google.com' };
            }
            post_title(id, next) {
                return this.post(id).title;
            }
            post_by(id, next) {
                return this.post(id).by + ' | ';
            }
            post_url(id, next) {
                return this.post(id).url;
            }
        }
        __decorate([
            $mol_mem
        ], $koplenov_hn.prototype, "uri_source", null);
        __decorate([
            $mol_mem
        ], $koplenov_hn.prototype, "gists", null);
        __decorate([
            $mol_mem_key
        ], $koplenov_hn.prototype, "post", null);
        __decorate([
            $mol_mem_key
        ], $koplenov_hn.prototype, "post_title", null);
        __decorate([
            $mol_mem_key
        ], $koplenov_hn.prototype, "post_by", null);
        __decorate([
            $mol_mem_key
        ], $koplenov_hn.prototype, "post_url", null);
        $$.$koplenov_hn = $koplenov_hn;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//koplenov/hn/hn.view.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_int62_max = (2 ** 30) - 1;
    $.$mol_int62_min = -(2 ** 30);
    $.$mol_int62_range = $.$mol_int62_max - $.$mol_int62_min + 1;
    function $mol_int62_to_string({ lo, hi }) {
        lo = (lo + $.$mol_int62_range) % $.$mol_int62_range;
        hi = (hi + $.$mol_int62_range) % $.$mol_int62_range;
        return lo.toString(36) + '_' + hi.toString(36);
    }
    $.$mol_int62_to_string = $mol_int62_to_string;
    function $mol_int62_from_string(str) {
        const [lo, hi] = str.split('_');
        return {
            lo: (parseInt(lo, 36) - $.$mol_int62_min) % $.$mol_int62_range + $.$mol_int62_min,
            hi: (parseInt(hi, 36) - $.$mol_int62_min) % $.$mol_int62_range + $.$mol_int62_min,
        };
    }
    $.$mol_int62_from_string = $mol_int62_from_string;
    function $mol_int62_compare(left_lo, left_hi, right_lo, right_hi) {
        return (right_hi - left_hi) || (right_lo - left_lo);
    }
    $.$mol_int62_compare = $mol_int62_compare;
    function $mol_int62_inc(lo, hi, max = $.$mol_int62_max) {
        if (lo === max) {
            return { lo: -max, hi: hi + 1 };
        }
        else {
            return { lo: lo + 1, hi };
        }
    }
    $.$mol_int62_inc = $mol_int62_inc;
    function $mol_int62_random() {
        return {
            lo: Math.floor(Math.random() * $.$mol_int62_range + $.$mol_int62_min),
            hi: Math.floor(Math.random() * $.$mol_int62_range + $.$mol_int62_min),
        };
    }
    $.$mol_int62_random = $mol_int62_random;
    function $mol_int62_hash_string(str) {
        return $mol_int62_to_string($mol_int62_hash_buffer($mol_charset_encode(str)));
    }
    $.$mol_int62_hash_string = $mol_int62_hash_string;
    function $mol_int62_hash_buffer(buf, seed = { lo: 0, hi: 0 }) {
        let h1 = 0xdeadbeef ^ seed.lo;
        let h2 = 0x41c6ce57 ^ seed.hi;
        for (const byte of buf) {
            h1 = Math.imul(h1 ^ byte, 2654435761);
            h2 = Math.imul(h2 ^ byte, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return { lo: h1 << 1 >> 1, hi: h2 << 1 >> 1 };
    }
    $.$mol_int62_hash_buffer = $mol_int62_hash_buffer;
})($ || ($ = {}));
//mol/int62/int62.ts
;
"use strict";
let $hyoo_sync_revision = "1560a1c";
//hyoo/sync/-meta.tree/revision.meta.tree.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_crypto_native = $node.crypto.webcrypto;
})($ || ($ = {}));
//mol/crypto/native/native.node.ts
;
"use strict";
var $;
(function ($) {
    const algorithm = {
        name: 'ECDSA',
        hash: 'SHA-256',
        namedCurve: "P-256",
    };
    async function $mol_crypto_auditor_pair() {
        const pair = await $mol_crypto_native.subtle.generateKey(algorithm, true, ['sign', 'verify']);
        return {
            public: new $mol_crypto_auditor_public(pair.publicKey),
            private: new $mol_crypto_auditor_private(pair.privateKey),
        };
    }
    $.$mol_crypto_auditor_pair = $mol_crypto_auditor_pair;
    class $mol_crypto_auditor_public extends Object {
        native;
        static size = 86;
        constructor(native) {
            super();
            this.native = native;
        }
        static async from(serial) {
            return new this(await $mol_crypto_native.subtle.importKey('jwk', {
                crv: "P-256",
                ext: true,
                key_ops: ['verify'],
                kty: "EC",
                x: serial.slice(0, 43),
                y: serial.slice(43, 86),
            }, algorithm, true, ['verify']));
        }
        async serial() {
            const { x, y } = await $mol_crypto_native.subtle.exportKey('jwk', this.native);
            return x + y;
        }
        async verify(data, sign) {
            return await $mol_crypto_native.subtle.verify(algorithm, this.native, sign, data);
        }
    }
    $.$mol_crypto_auditor_public = $mol_crypto_auditor_public;
    class $mol_crypto_auditor_private extends Object {
        native;
        static size = 129;
        constructor(native) {
            super();
            this.native = native;
        }
        static async from(serial) {
            return new this(await $mol_crypto_native.subtle.importKey('jwk', {
                crv: "P-256",
                ext: true,
                key_ops: ['sign'],
                kty: "EC",
                x: serial.slice(0, 43),
                y: serial.slice(43, 86),
                d: serial.slice(86, 129),
            }, algorithm, true, ['sign']));
        }
        async serial() {
            const { x, y, d } = await $mol_crypto_native.subtle.exportKey('jwk', this.native);
            return x + y + d;
        }
        async sign(data) {
            return await $mol_crypto_native.subtle.sign(algorithm, this.native, data);
        }
        async public() {
            return await $mol_crypto_auditor_public.from($mol_crypto_auditor_private_to_public(await this.serial()));
        }
    }
    $.$mol_crypto_auditor_private = $mol_crypto_auditor_private;
    $.$mol_crypto_auditor_sign_size = 64;
    function $mol_crypto_auditor_private_to_public(serial) {
        return serial.slice(0, 86);
    }
    $.$mol_crypto_auditor_private_to_public = $mol_crypto_auditor_private_to_public;
})($ || ($ = {}));
//mol/crypto/auditor/auditor.ts
;
"use strict";
var $;
(function ($) {
    let $hyoo_crowd_peer_level;
    (function ($hyoo_crowd_peer_level) {
        $hyoo_crowd_peer_level[$hyoo_crowd_peer_level["get"] = 0] = "get";
        $hyoo_crowd_peer_level[$hyoo_crowd_peer_level["add"] = 1] = "add";
        $hyoo_crowd_peer_level[$hyoo_crowd_peer_level["mod"] = 2] = "mod";
        $hyoo_crowd_peer_level[$hyoo_crowd_peer_level["law"] = 3] = "law";
    })($hyoo_crowd_peer_level = $.$hyoo_crowd_peer_level || ($.$hyoo_crowd_peer_level = {}));
    class $hyoo_crowd_peer extends Object {
        key_public;
        key_public_serial;
        key_private;
        key_private_serial;
        id;
        constructor(key_public, key_public_serial, key_private, key_private_serial) {
            super();
            this.key_public = key_public;
            this.key_public_serial = key_public_serial;
            this.key_private = key_private;
            this.key_private_serial = key_private_serial;
            this.id = $mol_int62_hash_string(this.key_public_serial);
        }
        static async generate() {
            const pair = await $$.$mol_crypto_auditor_pair();
            const serial = await pair.private.serial();
            return new this(pair.public, $mol_crypto_auditor_private_to_public(serial), pair.private, serial);
        }
        static async restore(serial) {
            return new this(await $$.$mol_crypto_auditor_public.from(serial), $mol_crypto_auditor_private_to_public(serial), await $$.$mol_crypto_auditor_private.from(serial), serial);
        }
    }
    $.$hyoo_crowd_peer = $hyoo_crowd_peer;
})($ || ($ = {}));
//hyoo/crowd/peer/peer.ts
;
"use strict";
var $;
(function ($) {
    async function $hyoo_sync_peer(path) {
        let serial = $mol_state_local.value('$hyoo_sync_peer');
        if (typeof serial === 'string') {
            return await $hyoo_crowd_peer.restore(serial);
        }
        const peer = await $hyoo_crowd_peer.generate();
        $mol_state_local.value('$hyoo_sync_peer', peer.key_private_serial);
        return peer;
    }
    $.$hyoo_sync_peer = $hyoo_sync_peer;
})($ || ($ = {}));
//hyoo/sync/peer/peer.node.ts
;
"use strict";
//mol/data/value/value.ts
;
"use strict";
var $;
(function ($) {
    function $mol_data_setup(value, config) {
        return Object.assign(value, {
            config,
            Value: null
        });
    }
    $.$mol_data_setup = $mol_data_setup;
})($ || ($ = {}));
//mol/data/setup/setup.ts
;
"use strict";
var $;
(function ($) {
    function $mol_diff_path(...paths) {
        const limit = Math.min(...paths.map(path => path.length));
        lookup: for (var i = 0; i < limit; ++i) {
            const first = paths[0][i];
            for (let j = 1; j < paths.length; ++j) {
                if (paths[j][i] !== first)
                    break lookup;
            }
        }
        return {
            prefix: paths[0].slice(0, i),
            suffix: paths.map(path => path.slice(i)),
        };
    }
    $.$mol_diff_path = $mol_diff_path;
})($ || ($ = {}));
//mol/diff/path/path.ts
;
"use strict";
var $;
(function ($) {
    class $mol_error_mix extends Error {
        errors;
        constructor(message, ...errors) {
            super(message);
            this.errors = errors;
            if (errors.length) {
                const stacks = [...errors.map(error => error.stack), this.stack];
                const diff = $mol_diff_path(...stacks.map(stack => {
                    if (!stack)
                        return [];
                    return stack.split('\n').reverse();
                }));
                const head = diff.prefix.reverse().join('\n');
                const tails = diff.suffix.map(path => path.reverse().map(line => line.replace(/^(?!\s+at)/, '\tat (.) ')).join('\n')).join('\n\tat (.) -----\n');
                this.stack = `Error: ${this.constructor.name}\n\tat (.) /"""\\\n${tails}\n\tat (.) \\___/\n${head}`;
                this.message += errors.map(error => '\n' + error.message).join('');
            }
        }
        toJSON() {
            return this.message;
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));
//mol/error/mix/mix.ts
;
"use strict";
var $;
(function ($) {
    class $mol_data_error extends $mol_error_mix {
    }
    $.$mol_data_error = $mol_data_error;
})($ || ($ = {}));
//mol/data/error/error.ts
;
"use strict";
var $;
(function ($) {
    function $mol_data_enum(name, dict) {
        const index = {};
        for (let key in dict) {
            if (Number.isNaN(Number(key))) {
                index[dict[key]] = key;
            }
        }
        return $mol_data_setup((value) => {
            if (typeof index[value] !== 'string') {
                return $mol_fail(new $mol_data_error(`${value} is not value of ${name} enum`));
            }
            return value;
        }, { name, dict });
    }
    $.$mol_data_enum = $mol_data_enum;
})($ || ($ = {}));
//mol/data/enum/enum.ts
;
"use strict";
var $;
(function ($) {
    const level = $mol_data_enum('level', $hyoo_crowd_peer_level);
    let $hyoo_crowd_unit_kind;
    (function ($hyoo_crowd_unit_kind) {
        $hyoo_crowd_unit_kind[$hyoo_crowd_unit_kind["grab"] = 0] = "grab";
        $hyoo_crowd_unit_kind[$hyoo_crowd_unit_kind["join"] = 1] = "join";
        $hyoo_crowd_unit_kind[$hyoo_crowd_unit_kind["give"] = 2] = "give";
        $hyoo_crowd_unit_kind[$hyoo_crowd_unit_kind["data"] = 3] = "data";
    })($hyoo_crowd_unit_kind = $.$hyoo_crowd_unit_kind || ($.$hyoo_crowd_unit_kind = {}));
    let $hyoo_crowd_unit_group;
    (function ($hyoo_crowd_unit_group) {
        $hyoo_crowd_unit_group[$hyoo_crowd_unit_group["auth"] = 0] = "auth";
        $hyoo_crowd_unit_group[$hyoo_crowd_unit_group["data"] = 1] = "data";
    })($hyoo_crowd_unit_group = $.$hyoo_crowd_unit_group || ($.$hyoo_crowd_unit_group = {}));
    class $hyoo_crowd_unit extends Object {
        land;
        auth;
        head;
        self;
        next;
        prev;
        time;
        data;
        bin;
        constructor(land, auth, head, self, next, prev, time, data, bin) {
            super();
            this.land = land;
            this.auth = auth;
            this.head = head;
            this.self = self;
            this.next = next;
            this.prev = prev;
            this.time = time;
            this.data = data;
            this.bin = bin;
        }
        kind() {
            if (this.head === this.self && this.auth === this.self) {
                if (this.head === this.land) {
                    return $hyoo_crowd_unit_kind.grab;
                }
                else {
                    return $hyoo_crowd_unit_kind.join;
                }
            }
            if (this.head === this.land) {
                return $hyoo_crowd_unit_kind.give;
            }
            return $hyoo_crowd_unit_kind.data;
        }
        group() {
            return this.kind() === $hyoo_crowd_unit_kind.data
                ? $hyoo_crowd_unit_group.data
                : $hyoo_crowd_unit_group.auth;
        }
        level() {
            switch (this.kind()) {
                case $hyoo_crowd_unit_kind.grab: return $hyoo_crowd_peer_level.law;
                case $hyoo_crowd_unit_kind.give: return level(this.data);
                default: $mol_fail(new Error(`Wrong unit kind for getting level: ${this.kind()}`));
            }
        }
        [Symbol.toPrimitive]() {
            return JSON.stringify(this);
        }
        [$mol_dev_format_head]() {
            switch (this.kind()) {
                case $hyoo_crowd_unit_kind.grab:
                    return $mol_dev_format_div({}, $mol_dev_format_native(this), ' 👑');
                case $hyoo_crowd_unit_kind.join:
                    return $mol_dev_format_div({}, $mol_dev_format_native(this), $mol_dev_format_shade(' 🔑 ', this.self));
                case $hyoo_crowd_unit_kind.give:
                    return $mol_dev_format_div({}, $mol_dev_format_native(this), $mol_dev_format_shade(' 🏅 ', this.self, ' '), $mol_dev_format_native($hyoo_crowd_peer_level[this.data] ?? this.data));
                case $hyoo_crowd_unit_kind.data:
                    return $mol_dev_format_div({}, $mol_dev_format_native(this), $mol_dev_format_shade(' 📦 ', this.head, ' '), $mol_dev_format_native(this.data));
            }
        }
    }
    $.$hyoo_crowd_unit = $hyoo_crowd_unit;
    const offset = {
        land_lo: 0,
        land_hi: 4,
        auth_lo: 8,
        auth_hi: 12,
        head_lo: 16,
        head_hi: 20,
        self_lo: 24,
        self_hi: 28,
        next_lo: 32,
        next_hi: 36,
        prev_lo: 40,
        prev_hi: 44,
        time: 48,
        size: 54,
        data: 56,
    };
    class $hyoo_crowd_unit_bin extends DataView {
        static from_buffer(buffer) {
            const size = Math.ceil(Math.abs(buffer[offset.size / 2]) / 8) * 8 + offset.data + $mol_crypto_auditor_sign_size;
            return new this(buffer.slice(0, size / 2).buffer);
        }
        static from_unit(unit) {
            if (unit.bin)
                return unit.bin;
            const type = unit.data === null
                ? 0
                : unit.data instanceof Uint8Array
                    ? -1
                    : 1;
            const buff = type === 0 ? null
                : type > 0 ? $mol_charset_encode(JSON.stringify(unit.data))
                    : unit.data;
            const size = buff?.byteLength ?? 0;
            if (type > 0 && size > 2 ** 15 - 1)
                throw new Error(`Too large json data: ${size} > ${2 ** 15 - 1}`);
            if (type < 0 && size > 2 ** 15)
                throw new Error(`Too large binary data: ${size} > ${2 ** 15}`);
            const total = offset.data + Math.ceil(size / 8) * 8 + $mol_crypto_auditor_sign_size;
            const mem = new Uint8Array(total);
            const bin = new $hyoo_crowd_unit_bin(mem.buffer);
            const land = $mol_int62_from_string(unit.land);
            bin.setInt32(offset.land_lo, land.lo, true);
            bin.setInt32(offset.land_hi, land.hi, true);
            const auth = $mol_int62_from_string(unit.auth);
            bin.setInt32(offset.auth_lo, auth.lo, true);
            bin.setInt32(offset.auth_hi, auth.hi, true);
            const head = $mol_int62_from_string(unit.head);
            bin.setInt32(offset.head_lo, head.lo, true);
            bin.setInt32(offset.head_hi, head.hi, true);
            const self = $mol_int62_from_string(unit.self);
            bin.setInt32(offset.self_lo, self.lo, true);
            bin.setInt32(offset.self_hi, self.hi, true);
            const next = $mol_int62_from_string(unit.next);
            bin.setInt32(offset.next_lo, next.lo, true);
            bin.setInt32(offset.next_hi, next.hi, true);
            const prev = $mol_int62_from_string(unit.prev);
            bin.setInt32(offset.prev_lo, prev.lo, true);
            bin.setInt32(offset.prev_hi, prev.hi, true);
            bin.setInt32(offset.time, unit.time, true);
            bin.setInt16(offset.size, type * size, true);
            if (buff)
                mem.set(buff, offset.data);
            return bin;
        }
        sign(next) {
            const sign_offset = this.byteOffset + this.byteLength - $mol_crypto_auditor_sign_size;
            const buff = new Uint8Array(this.buffer, sign_offset, $mol_crypto_auditor_sign_size);
            if (!next)
                return buff;
            buff.set(next);
            return buff;
        }
        size() {
            return Math.ceil(Math.abs(this.getInt16(offset.size, true)) / 8) * 8 + offset.data + $mol_crypto_auditor_sign_size;
        }
        sens() {
            return new Uint8Array(this.buffer, this.byteOffset, this.size() - $mol_crypto_auditor_sign_size);
        }
        unit() {
            const land = $mol_int62_to_string({
                lo: this.getInt32(offset.land_lo, true) << 1 >> 1,
                hi: this.getInt32(offset.land_hi, true) << 1 >> 1,
            });
            const auth = $mol_int62_to_string({
                lo: this.getInt32(offset.auth_lo, true) << 1 >> 1,
                hi: this.getInt32(offset.auth_hi, true) << 1 >> 1,
            });
            const head = $mol_int62_to_string({
                lo: this.getInt32(offset.head_lo, true) << 1 >> 1,
                hi: this.getInt32(offset.head_hi, true) << 1 >> 1,
            });
            const self = $mol_int62_to_string({
                lo: this.getInt32(offset.self_lo, true) << 1 >> 1,
                hi: this.getInt32(offset.self_hi, true) << 1 >> 1,
            });
            const next = $mol_int62_to_string({
                lo: this.getInt32(offset.next_lo, true) << 1 >> 1,
                hi: this.getInt32(offset.next_hi, true) << 1 >> 1,
            });
            const prev = $mol_int62_to_string({
                lo: this.getInt32(offset.prev_lo, true) << 1 >> 1,
                hi: this.getInt32(offset.prev_hi, true) << 1 >> 1,
            });
            const time = this.getInt32(offset.time, true) << 1 >> 1;
            const type_size = this.getInt16(offset.size, true);
            let data = null;
            if (type_size) {
                try {
                    var buff = new Uint8Array(this.buffer, this.byteOffset + offset.data, Math.abs(type_size));
                }
                catch (error) {
                    error['message'] += `\nhead=${head};self=${self}`;
                    $mol_fail_hidden(error);
                }
                if (type_size < 0)
                    data = buff;
                else
                    data = JSON.parse($mol_charset_decode(buff));
            }
            return new $hyoo_crowd_unit(land, auth, head, self, next, prev, time, data, this);
        }
    }
    $.$hyoo_crowd_unit_bin = $hyoo_crowd_unit_bin;
    function $hyoo_crowd_unit_compare(left, right) {
        return (left.group() - right.group())
            || (left.time - right.time)
            || ((left.auth > right.auth) ? 1 : (left.auth < right.auth) ? -1 : 0)
            || ((left.self > right.self) ? 1 : (left.self < right.self) ? -1 : 0)
            || ((left.head > right.head) ? 1 : (left.head < right.head) ? -1 : 0)
            || ((left.prev > right.prev) ? 1 : (left.prev < right.prev) ? -1 : 0)
            || ((left.next > right.next) ? 1 : (left.next < right.next) ? -1 : 0)
            || ((left.land > right.land) ? 1 : (left.land < right.land) ? -1 : 0);
    }
    $.$hyoo_crowd_unit_compare = $hyoo_crowd_unit_compare;
})($ || ($ = {}));
//hyoo/crowd/unit/unit.ts
;
"use strict";
var $;
(function ($) {
    function $hyoo_crowd_time_now() {
        return Math.floor(Date.now() / 100) - 1767e7;
    }
    $.$hyoo_crowd_time_now = $hyoo_crowd_time_now;
    function $hyoo_crowd_time_stamp(time) {
        return 1767e9 + time * 100;
    }
    $.$hyoo_crowd_time_stamp = $hyoo_crowd_time_stamp;
})($ || ($ = {}));
//hyoo/crowd/time/time.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_clock extends Map {
        static begin = -1 * 2 ** 30;
        last_time = $hyoo_crowd_clock.begin;
        constructor(entries) {
            super(entries);
            if (!entries)
                return;
            for (const [peer, time] of entries) {
                this.see_time(time);
            }
        }
        sync(right) {
            for (const [peer, time] of right) {
                this.see_peer(peer, time);
            }
        }
        see_time(time) {
            if (time < this.last_time)
                return;
            this.last_time = time;
        }
        see_peer(peer, time) {
            if (!this.fresh(peer, time))
                return;
            this.set(peer, time);
            this.see_time(time);
        }
        see_bin(bin, group) {
            for (let cursor = offset.clocks; cursor < bin.byteLength; cursor += 16) {
                this.see_peer($mol_int62_to_string({
                    lo: bin.getInt32(cursor + 0, true) << 1 >> 1,
                    hi: bin.getInt32(cursor + 4, true) << 1 >> 1,
                }), bin.getInt32(cursor + 8 + 4 * group, true));
            }
        }
        fresh(peer, time) {
            return time > this.time(peer);
        }
        ahead(clock) {
            for (const [peer, time] of this) {
                if (clock.fresh(peer, time))
                    return true;
            }
            return false;
        }
        time(peer) {
            return this.get(peer) ?? $hyoo_crowd_clock.begin;
        }
        now() {
            return $hyoo_crowd_time_now();
        }
        last_stamp() {
            return $hyoo_crowd_time_stamp(this.last_time);
        }
        tick(peer) {
            let time = this.now();
            if (time <= this.last_time) {
                time = this.last_time + 1;
            }
            this.see_peer(peer, time);
            return time;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), $mol_dev_format_shade(' ' + new Date(this.last_stamp()).toISOString().replace('T', ' ')));
        }
    }
    $.$hyoo_crowd_clock = $hyoo_crowd_clock;
    const offset = {
        land_lo: 0,
        land_hi: 4,
        clocks: 8,
    };
    class $hyoo_crowd_clock_bin extends DataView {
        static from(land_id, clocks) {
            const size = offset.clocks + clocks[0].size * 16;
            const mem = new Uint8Array(size);
            const bin = new $hyoo_crowd_clock_bin(mem.buffer);
            const land = $mol_int62_from_string(land_id);
            bin.setInt32(offset.land_lo, land.lo ^ (1 << 31), true);
            bin.setInt32(offset.land_hi, land.hi, true);
            let cursor = offset.clocks;
            for (const [peer_id, time] of clocks[0]) {
                const peer = $mol_int62_from_string(peer_id);
                bin.setInt32(cursor + 0, peer.lo, true);
                bin.setInt32(cursor + 4, peer.hi, true);
                bin.setInt32(cursor + 8, time, true);
                bin.setInt32(cursor + 12, clocks[1].get(peer_id) ?? $hyoo_crowd_clock.begin, true);
                cursor += 16;
            }
            return bin;
        }
        land() {
            return $mol_int62_to_string({
                lo: this.getInt32(offset.land_lo, true) << 1 >> 1,
                hi: this.getInt32(offset.land_hi, true) << 1 >> 1,
            });
        }
    }
    $.$hyoo_crowd_clock_bin = $hyoo_crowd_clock_bin;
})($ || ($ = {}));
//hyoo/crowd/clock/clock.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_node {
        land;
        head;
        constructor(land, head) {
            this.land = land;
            this.head = head;
        }
        static for(land, head) {
            return new this(land, head);
        }
        world() {
            return this.land.world();
        }
        as(Node) {
            return new Node(this.land, this.head);
        }
        units() {
            return this.land.unit_alives(this.head);
        }
        nodes(Node) {
            return this.units().map(unit => new Node(this.land, unit.self));
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), $mol_dev_format_shade('/'), $mol_dev_format_auto(this.units().map(unit => unit.data)), $mol_dev_format_shade('/'), $mol_dev_format_auto(this.nodes($hyoo_crowd_node)));
        }
    }
    $.$hyoo_crowd_node = $hyoo_crowd_node;
})($ || ($ = {}));
//hyoo/crowd/node/node.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_reg extends $hyoo_crowd_node {
        value(next) {
            const unit = this.units()[0];
            if (next === undefined)
                return unit?.data ?? null;
            if (unit?.data === next)
                return next;
            this.land.put(this.head, unit?.self ?? this.land.id_new(), '0_0', next);
            return next;
        }
        str(next) {
            return String(this.value(next) ?? '');
        }
        numb(next) {
            return Number(this.value(next));
        }
        bool(next) {
            return Boolean(this.value(next));
        }
        yoke(law = [''], mod = [], add = []) {
            const world = this.world();
            let land_id = (this.value() ?? '0_0');
            if (land_id !== '0_0')
                return world.land_sync(land_id);
            if (this.land.level(this.land.peer().id) < $hyoo_crowd_peer_level.add)
                return null;
            const land = $mol_wire_sync(world).grab(law, mod, add);
            this.value(land.id());
            world.land_init(land);
            return land;
        }
    }
    $.$hyoo_crowd_reg = $hyoo_crowd_reg;
})($ || ($ = {}));
//hyoo/crowd/reg/reg.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_struct extends $hyoo_crowd_node {
        sub(key, Node) {
            return new Node(this.land, $mol_int62_hash_string(key + '\n' + this.head));
        }
        yoke(key, Node, law = [''], mod = [], add = []) {
            const land = this.sub(key, $hyoo_crowd_reg).yoke(law, mod, add);
            return land?.chief.sub(key, Node) ?? null;
        }
    }
    $.$hyoo_crowd_struct = $hyoo_crowd_struct;
})($ || ($ = {}));
//hyoo/crowd/struct/struct.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_land extends $mol_object {
        id() {
            return $mol_int62_to_string($mol_int62_random());
        }
        toJSON() {
            return this.id();
        }
        peer() {
            return this.world()?.peer;
        }
        peer_id() {
            return this.peer()?.id ?? '0_0';
        }
        world() {
            return null;
        }
        get clock_auth() {
            this.pub.promote();
            return this._clocks[$hyoo_crowd_unit_group.auth];
        }
        get clock_data() {
            this.pub.promote();
            return this._clocks[$hyoo_crowd_unit_group.data];
        }
        get clocks() {
            this.pub.promote();
            return this._clocks;
        }
        pub = new $mol_wire_pub;
        _clocks = [new $hyoo_crowd_clock, new $hyoo_crowd_clock];
        _unit_all = new Map();
        unit(head, self) {
            return this._unit_all.get(`${head}/${self}`);
        }
        _unit_lists = new Map();
        _unit_alives = new Map();
        size() {
            return this._unit_all.size;
        }
        unit_list(head) {
            let kids = this._unit_lists.get(head);
            if (!kids)
                this._unit_lists.set(head, kids = Object.assign([], { dirty: false }));
            return kids;
        }
        unit_alives(head) {
            this.pub.promote();
            let kids = this._unit_alives.get(head);
            if (!kids) {
                const all = this.unit_list(head);
                if (all.dirty)
                    this.resort(head);
                kids = all.filter(kid => kid.data !== null);
                this._unit_alives.set(head, kids);
            }
            return kids;
        }
        node(head, Node) {
            return new Node(this, head);
        }
        chief = this.node('0_0', $hyoo_crowd_struct);
        id_new() {
            for (let i = 0; i < 1000; ++i) {
                const id = $mol_int62_to_string($mol_int62_random());
                if (id === '0_0')
                    continue;
                if (id === this.id())
                    continue;
                if (this._unit_lists.has(id))
                    continue;
                return id;
            }
            throw new Error(`Can't generate ID after 1000 times`);
        }
        fork(auth) {
            const fork = $hyoo_crowd_land.make({
                id: $mol_const(this.id()),
                peer: $mol_const(auth),
            });
            return fork.apply(this.delta());
        }
        delta(clocks = [new $hyoo_crowd_clock, new $hyoo_crowd_clock]) {
            this.pub.promote();
            const delta = [];
            for (const unit of this._unit_all.values()) {
                const time = clocks[unit.group()].time(unit.auth);
                if (unit.time <= time)
                    continue;
                delta.push(unit);
            }
            delta.sort($hyoo_crowd_unit_compare);
            return delta;
        }
        resort(head) {
            const kids = this._unit_lists.get(head);
            const queue = kids.splice(0).sort((left, right) => -$hyoo_crowd_unit_compare(left, right));
            const locate = (self) => {
                for (let i = kids.length - 1; i >= 0; --i) {
                    if (kids[i].self === self)
                        return i;
                }
                return -1;
            };
            for (let cursor = queue.length - 1; cursor >= 0; --cursor) {
                const kid = queue[cursor];
                let index = 0;
                if (kid.prev !== '0_0') {
                    index = locate(kid.prev) + 1;
                    if (!index) {
                        index = kids.length;
                        if (kid.next !== '0_0') {
                            index = locate(kid.next);
                            if (index === -1)
                                continue;
                        }
                    }
                }
                kids.splice(index, 0, kid);
                queue.splice(cursor, 1);
                cursor = queue.length;
            }
            this._unit_lists.set(head, kids);
            kids.dirty = false;
            return kids;
        }
        apply(delta) {
            for (const next of delta) {
                this._clocks[next.group()].see_peer(next.auth, next.time);
                const kids = this.unit_list(next.head);
                const next_id = `${next.head}/${next.self}`;
                let prev = this._unit_all.get(next_id);
                if (prev) {
                    if ($hyoo_crowd_unit_compare(prev, next) > 0)
                        continue;
                    kids.splice(kids.indexOf(prev), 1, next);
                }
                else {
                    kids.push(next);
                }
                this._unit_all.set(next_id, next);
                kids.dirty = true;
                this._unit_alives.set(next.head, undefined);
            }
            this.pub.emit();
            return this;
        }
        _joined = false;
        join() {
            if (this._joined)
                return;
            const auth = this.peer();
            if (!auth)
                return;
            if (!auth.key_public_serial)
                return;
            const auth_id = `${auth.id}/${auth.id}`;
            const auth_unit = this._unit_all.get(auth_id);
            if (auth_unit)
                return;
            const time = this._clocks[$hyoo_crowd_unit_group.auth].tick(auth.id);
            const join_unit = new $hyoo_crowd_unit(this.id(), auth.id, auth.id, auth.id, '0_0', '0_0', time, auth.key_public_serial, null);
            this._unit_all.set(auth_id, join_unit);
            this._joined = true;
        }
        level_base(next) {
            this.level('0_0', next);
        }
        level(peer, next) {
            if (next)
                this.join();
            else
                this.pub.promote();
            const level_id = `${this.id()}/${peer}`;
            const prev = this._unit_all.get(level_id)?.level()
                ?? this._unit_all.get(`${this.id()}/0_0`)?.level()
                ?? (this.id() === peer ? $hyoo_crowd_peer_level.law : $hyoo_crowd_peer_level.get);
            if (next === undefined)
                return prev;
            if (next <= prev)
                return prev;
            const time = this._clocks[$hyoo_crowd_unit_group.auth].tick(peer);
            const auth = this.peer_id();
            const level_unit = new $hyoo_crowd_unit(this.id(), auth, this.id(), peer, '0_0', '0_0', time, next, null);
            this._unit_all.set(level_id, level_unit);
            this.pub.emit();
            return next;
        }
        lords() {
            this.pub.promote();
            const lords = [];
            for (const unit of this._unit_all.values()) {
                if (unit.kind() !== $hyoo_crowd_unit_kind.give)
                    continue;
                lords.push(unit.self);
            }
            return lords;
        }
        authors() {
            this.pub.promote();
            const authors = new Set();
            for (const unit of this._unit_all.values()) {
                if (unit.kind() !== $hyoo_crowd_unit_kind.data)
                    continue;
                if (unit.data === null)
                    continue;
                authors.add(unit.auth);
            }
            return authors;
        }
        selection(peer) {
            return this.world().land_sync(peer).chief.sub('$hyoo_crowd_land..selection', $hyoo_crowd_reg);
        }
        put(head, self, prev, data) {
            this.join();
            const old_id = `${head}/${self}`;
            let unit_old = this._unit_all.get(old_id);
            let unit_prev = prev !== '0_0'
                ? this._unit_all.get(`${head}/${prev}`)
                : null;
            const unit_list = this.unit_list(head);
            if (unit_old)
                unit_list.splice(unit_list.indexOf(unit_old), 1);
            const seat = unit_prev ? unit_list.indexOf(unit_prev) + 1 : 0;
            const next = unit_list[seat]?.self ?? '0_0';
            const auth = this.peer_id();
            const time = this._clocks[$hyoo_crowd_unit_group.data].tick(auth);
            const unit_new = new $hyoo_crowd_unit(this.id(), auth, head, self, next, prev, time, data, null);
            this._unit_all.set(old_id, unit_new);
            unit_list.splice(seat, 0, unit_new);
            this._unit_alives.set(head, undefined);
            this.pub.emit();
            return unit_new;
        }
        wipe(unit) {
            if (unit.data === null)
                return unit;
            const unit_list = this.unit_list(unit.head);
            const seat = unit_list.indexOf(unit);
            const prev = seat > 0 ? unit_list[seat - 1].self : seat < 0 ? unit.prev : '0_0';
            return this.put(unit.head, unit.self, prev, null);
        }
        move(unit, head, prev) {
            this.wipe(unit);
            return this.put(head, unit.self, prev, unit.data);
        }
        insert(unit, head, seat) {
            const list = this.unit_list(head);
            const prev = seat ? list[seat - 1].self : '0_0';
            return this.move(unit, head, prev);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
    }
    __decorate([
        $mol_memo.method
    ], $hyoo_crowd_land.prototype, "id", null);
    $.$hyoo_crowd_land = $hyoo_crowd_land;
})($ || ($ = {}));
//hyoo/crowd/land/land.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_dict_key = $mol_key;
    class $mol_dict extends Map {
        get(key) {
            return super.get($mol_key(key));
        }
        has(key) {
            return super.has($mol_key(key));
        }
        set(key, value) {
            return super.set($mol_key(key), value);
        }
        delete(key) {
            return super.delete($mol_key(key));
        }
        forEach(back, context) {
            return super.forEach((val, key, dict) => {
                if (typeof key === 'string')
                    key = JSON.parse(key);
                return back.call(this, val, key, dict);
            }, context);
        }
        keys() {
            const iterator = super.keys();
            return {
                [Symbol.iterator]() {
                    return this;
                },
                next() {
                    const iteration = iterator.next();
                    if (iteration.done)
                        return iteration;
                    iteration.value = JSON.parse(iteration.value);
                    return iteration;
                }
            };
        }
        entries() {
            const iterator = super.entries();
            return {
                [Symbol.iterator]() {
                    return this;
                },
                next() {
                    const iteration = iterator.next();
                    if (iteration.done)
                        return iteration;
                    iteration.value = [JSON.parse(iteration.value[0]), iteration.value[1]];
                    return iteration;
                }
            };
        }
        [Symbol.iterator]() {
            return this.entries();
        }
    }
    $.$mol_dict = $mol_dict;
})($ || ($ = {}));
//mol/dict/dict.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_world extends $mol_object2 {
        peer;
        constructor(peer) {
            super();
            this.peer = peer;
            if (peer)
                this._knights.set(peer.id, peer);
        }
        lands_pub = new $mol_wire_pub;
        _lands = new Map();
        get lands() {
            this.lands_pub.promote();
            return this._lands;
        }
        land_init(id) { }
        land(id) {
            const exists = this._lands.get(id);
            if (exists)
                return exists;
            const land = $hyoo_crowd_land.make({
                id: $mol_const(id),
                world: $mol_const(this),
            });
            this._lands.set(id, land);
            this.lands_pub.emit();
            return land;
        }
        land_sync(id) {
            const land = this.land(id);
            this.land_init(land);
            return land;
        }
        home() {
            return this.land_sync(this.peer.id);
        }
        _knights = new $mol_dict();
        _signs = new WeakMap();
        async grab(law = [''], mod = [], add = []) {
            if (!law.length && !mod.length && !add.length)
                $mol_fail(new Error('Grabbing dead land'));
            const knight = await $hyoo_crowd_peer.generate();
            this._knights.set(knight.id, knight);
            const land_inner = this.land(knight.id);
            const land_outer = $hyoo_crowd_land.make({
                id: $mol_const(knight.id),
                peer: $mol_const(knight),
            });
            for (const peer of law)
                land_outer.level(peer || this.peer.id, $hyoo_crowd_peer_level.law);
            for (const peer of mod)
                land_outer.level(peer || this.peer.id, $hyoo_crowd_peer_level.mod);
            for (const peer of add)
                land_outer.level(peer || this.peer.id, $hyoo_crowd_peer_level.add);
            land_inner.apply(land_outer.delta());
            return land_inner;
        }
        sign_units(units) {
            return Promise.all(units.map(async (unit) => {
                if (unit.bin)
                    return unit;
                const bin = $hyoo_crowd_unit_bin.from_unit(unit);
                let sign = this._signs.get(unit);
                if (!sign) {
                    const knight = this._knights.get(unit.auth);
                    sign = new Uint8Array(await knight.key_private.sign(bin.sens()));
                }
                bin.sign(sign);
                unit.bin = bin;
                this._signs.set(unit, sign);
                return unit;
            }));
        }
        delta_land(land, clocks = [new $hyoo_crowd_clock, new $hyoo_crowd_clock]) {
            return this.sign_units(land.delta(clocks));
        }
        async delta_batch(land, clocks = [new $hyoo_crowd_clock, new $hyoo_crowd_clock]) {
            const units = await this.delta_land(land, clocks);
            let size = 0;
            const bins = [];
            for (const unit of units) {
                const bin = unit.bin;
                bins.push(bin);
                size += bin.byteLength;
            }
            const batch = new Uint8Array(size);
            let offset = 0;
            for (const bin of bins) {
                batch.set(new Uint8Array(bin.buffer, bin.byteOffset, bin.byteLength), offset);
                offset += bin.byteLength;
            }
            return batch;
        }
        async *delta(clocks = new Map()) {
            for (const land of this.lands.values()) {
                yield await this.delta_batch(land, clocks.get(land.id()));
            }
        }
        async apply(delta) {
            const units = [];
            let bin_offset = 0;
            while (bin_offset < delta.byteLength) {
                const buf = new Int16Array(delta.buffer, delta.byteOffset + bin_offset);
                const bin = $hyoo_crowd_unit_bin.from_buffer(buf);
                units.push(bin.unit());
                bin_offset += bin.size();
            }
            const land = this.land(units[0].land);
            const report = await this.audit_delta(land, units);
            land.apply(report.allow);
            return report;
        }
        async audit_delta(land, delta) {
            const all = new Map();
            const desync = 60 * 60 * 10;
            const deadline = land.clock_data.now() + desync;
            const get_unit = (id) => {
                return all.get(id) ?? land._unit_all.get(id);
            };
            const get_level = (head, self) => {
                return get_unit(`${head}/${self}`)?.level()
                    ?? get_unit(`${head}/0_0`)?.level()
                    ?? $hyoo_crowd_peer_level.get;
            };
            const check_unit = async (unit) => {
                const bin = unit.bin;
                if (unit.time > deadline)
                    return 'Far future';
                const auth_unit = get_unit(`${unit.auth}/${unit.auth}`);
                const kind = unit.kind();
                switch (kind) {
                    case $hyoo_crowd_unit_kind.grab:
                    case $hyoo_crowd_unit_kind.join: {
                        if (auth_unit)
                            return 'Already join';
                        if (typeof unit.data !== 'string')
                            return 'No join key';
                        const key_buf = unit.data;
                        const self = $mol_int62_hash_string(key_buf);
                        if (unit.self !== self)
                            return 'Alien join key';
                        const key = await $mol_crypto_auditor_public.from(key_buf);
                        const sign = bin.sign();
                        const valid = await key.verify(bin.sens(), sign);
                        if (!valid)
                            return 'Wrong join sign';
                        all.set(`${unit.head}/${unit.auth}`, unit);
                        this._signs.set(unit, sign);
                        return '';
                    }
                    case $hyoo_crowd_unit_kind.give: {
                        const lord_level = get_level(land.id(), unit.auth);
                        if (lord_level < $hyoo_crowd_peer_level.law)
                            return `Level too low`;
                        const peer_level = get_level(land.id(), unit.self);
                        if (peer_level > unit.level())
                            return `Cancel unsupported`;
                        break;
                    }
                    case $hyoo_crowd_unit_kind.data: {
                        const level = get_level(land.id(), unit.auth);
                        if (level >= $hyoo_crowd_peer_level.mod)
                            break;
                        if (level === $hyoo_crowd_peer_level.add) {
                            const exists = get_unit(`${unit.head}/${unit.self}`);
                            if (!exists)
                                break;
                            if (exists.auth === unit.auth)
                                break;
                        }
                        return `Level too low`;
                    }
                }
                if (!auth_unit)
                    return 'No auth key';
                const key_buf = auth_unit.data;
                const key = await $mol_crypto_auditor_public.from(key_buf);
                const sign = bin.sign();
                const valid = await key.verify(bin.sens(), sign);
                if (!valid)
                    return 'Wrong auth sign';
                all.set(`${unit.head}/${unit.self}`, unit);
                this._signs.set(unit, sign);
                return '';
            };
            const allow = [];
            const forbid = new Map();
            const proceed_unit = async (unit) => {
                const error = await check_unit(unit);
                if (error)
                    forbid.set(unit, error);
                else
                    allow.push(unit);
            };
            const tasks = [];
            for (const unit of delta) {
                const task = proceed_unit(unit);
                tasks.push(task);
                if (unit.group() === $hyoo_crowd_unit_group.auth)
                    await task;
            }
            await Promise.all(tasks);
            return { allow, forbid };
        }
    }
    $.$hyoo_crowd_world = $hyoo_crowd_world;
})($ || ($ = {}));
//hyoo/crowd/world/world.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wire_race(...tasks) {
        const results = tasks.map(task => {
            try {
                return task();
            }
            catch (error) {
                return error;
            }
        });
        const promises = results.filter(res => res instanceof Promise);
        if (promises.length)
            $mol_fail(Promise.race(promises));
        const error = results.find(res => res instanceof Error);
        if (error)
            $mol_fail(error);
        return results;
    }
    $.$mol_wire_race = $mol_wire_race;
})($ || ($ = {}));
//mol/wire/race/race.ts
;
"use strict";
var $;
(function ($) {
    $.$hyoo_sync_masters = [
        `wss://sync.hyoo.ru/`,
        'wss://sync-hyoo-ru.herokuapp.com/',
    ];
})($ || ($ = {}));
//hyoo/sync/masters/masters.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_sync_yard extends $mol_object2 {
        log_pack(data) {
            return data;
        }
        peer() {
            return $mol_wire_sync($hyoo_sync_peer)(this + '.peer()');
        }
        world() {
            const world = new this.$.$hyoo_crowd_world(this.peer());
            world.land_init = land => this.db_land_init(land);
            return world;
        }
        land(id) {
            return this.world().land_sync(id);
        }
        land_grab(law = [''], mod = [], add = []) {
            return $mol_wire_sync(this.world()).grab(law, mod, add);
        }
        home() {
            return this.land(this.peer().id);
        }
        land_search(query) {
            const stat = new Map();
            for (const prefix of query.match(/\p{Letter}{2,}/gu) ?? []) {
                const caps = prefix.slice(0, 1).toUpperCase() + prefix.slice(1);
                const prefs = new Set([
                    caps, ' ' + caps,
                    prefix, ' ' + prefix,
                ]);
                const lands = new Set();
                const founds = $mol_wire_race(...[...prefs].map(pref => () => $mol_wire_sync(this).db_land_search(pref)));
                for (const found of founds) {
                    for (const land of [...found].reverse())
                        lands.add(land);
                }
                for (const land of lands) {
                    stat.set(land, (stat.get(land) ?? 0) + 1);
                }
            }
            return [...stat].sort((left, right) => right[1] - left[1]).map(pair => pair[0]);
        }
        sync() {
            this.server();
            for (const land of this.world().lands.values()) {
                this.db_land_sync(land);
            }
            const master = this.master();
            if (master)
                $mol_wire_race(...[...this.world().lands.values()].map(land => () => this.line_land_sync({ line: master, land })));
            $mol_wire_race(...this.slaves().map(line => () => this.line_sync(line)));
        }
        land_sync(land) {
            this.db_land_init(land);
            try {
                this.db_land_sync(land);
            }
            catch (error) {
                $mol_fail_log(error);
            }
            try {
                const master = this.master();
                if (master)
                    this.line_land_sync({ line: master, land });
            }
            catch (error) {
                $mol_fail_log(error);
            }
            try {
                $mol_wire_race(...this.slaves()
                    .filter(line => this.line_lands(line).includes(land))
                    .map(line => () => this.line_land_sync({ line, land })));
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        db_land_clocks(land, next) {
            $mol_wire_solid();
            return next;
        }
        db_land_sync(land) {
            this.db_land_init(land);
            const db_clocks = this.db_land_clocks(land.id());
            land.clocks;
            const units = land.delta(db_clocks);
            if (!units.length)
                return;
            $mol_wire_sync(this.world()).sign_units(units);
            $mol_wire_sync(this).db_land_save(land, units);
            for (const unit of units) {
                db_clocks[unit.group()].see_peer(unit.auth, unit.time);
            }
            this.$.$mol_log3_rise({
                place: this,
                land: land.id(),
                message: 'Base Save',
                units: this.log_pack(units),
            });
        }
        db_land_init(land) {
            try {
                var units = $mol_wire_sync(this).db_land_load(land);
            }
            catch (error) {
                if (!(error instanceof Error))
                    $mol_fail_hidden(error);
                this.$.$mol_log3_fail({
                    place: this,
                    land: land.id(),
                    message: error.message,
                });
                units = [];
            }
            units.sort($hyoo_crowd_unit_compare);
            const clocks = [new $hyoo_crowd_clock, new $hyoo_crowd_clock];
            this.db_land_clocks(land.id(), clocks);
            land.apply(units);
            for (const unit of units) {
                clocks[unit.group()].see_peer(unit.auth, unit.time);
            }
            this.$.$mol_log3_rise({
                place: this,
                land: land.id(),
                message: 'Base Load',
                units: this.log_pack(units),
            });
        }
        async db_land_load(land) {
            return [];
        }
        async db_land_search(from, to = from) {
            return new Set();
        }
        async db_land_save(land, units) { }
        master_cursor(next = 0) {
            return next;
        }
        master_link() {
            return this.$.$hyoo_sync_masters[this.master_cursor()];
        }
        master() {
            return null;
        }
        server() {
            return null;
        }
        slaves(next = []) {
            return next;
        }
        line_lands(line, next = []) {
            return next;
        }
        line_land_clocks({ line, land }, next) {
            $mol_wire_solid();
            this.master();
            return next;
        }
        line_sync(line) {
            $mol_wire_race(...this.line_lands(line).map(land => () => this.line_land_sync({ line, land })));
        }
        line_land_sync({ line, land }) {
            this.line_land_init({ line, land });
            let clocks = this.line_land_clocks({ line, land });
            if (!clocks)
                return;
            const units = land.delta(clocks);
            if (!units.length)
                return;
            $mol_wire_sync(this).line_send_units(line, units);
            this.$.$mol_log3_rise({
                place: this,
                land: land.id(),
                message: 'Sync Sent',
                line: $mol_key(line),
                units: this.log_pack(units),
            });
            for (const unit of units) {
                clocks[unit.group()].see_peer(unit.auth, unit.time);
            }
        }
        line_land_init({ line, land }) {
            this.db_land_init(land);
            this.line_send_clocks(line, land);
            this.$.$mol_log3_come({
                place: this,
                land: land.id(),
                message: 'Sync Open',
                line: $mol_key(line),
                clocks: land._clocks,
            });
        }
        line_land_neck({ line, land }, next = []) {
            return next;
        }
        async line_receive(line, message) {
            if (!message.byteLength)
                return;
            const view = new DataView(message.buffer, message.byteOffset, message.byteLength);
            const int0 = view.getInt32(0, true);
            const int1 = view.getInt32(4, true);
            const land_id = $mol_int62_to_string({
                lo: int0 << 1 >> 1,
                hi: int1 << 1 >> 1,
            });
            const handle = async (prev) => {
                if (prev)
                    await prev;
                const world = this.world();
                const land = await $mol_wire_async(this).land(land_id);
                let clocks = this.line_land_clocks({ line, land });
                if (!clocks)
                    this.line_land_clocks({ line, land }, clocks = [new $hyoo_crowd_clock, new $hyoo_crowd_clock]);
                if (int0 << 1 >> 1 ^ int0) {
                    const bin = new $hyoo_crowd_clock_bin(message.buffer, message.byteOffset, message.byteLength);
                    for (let group = 0; group < clocks.length; ++group) {
                        clocks[group].see_bin(bin, group);
                    }
                    const lands = this.line_lands(line);
                    if (lands.includes(land)) {
                        this.$.$mol_log3_warn({
                            place: this,
                            land: land.id(),
                            message: 'Already syncing',
                            hint: 'Bug at $hyoo_sync_yard',
                            line: $mol_key(line),
                            clocks,
                        });
                    }
                    else {
                        this.line_lands(line, [...lands, land]);
                        this.$.$mol_log3_done({
                            place: this,
                            land: land.id(),
                            message: 'Sync Pair',
                            line: $mol_key(line),
                            clocks,
                        });
                    }
                    return;
                }
                const { allow, forbid } = await world.apply(message);
                for (const [unit, error] of forbid) {
                    this.$.$mol_log3_fail({
                        place: this,
                        land: land.id(),
                        message: error,
                        line: $mol_key(line),
                        unit,
                    });
                }
                if (!allow.length)
                    return;
                for (const unit of allow) {
                    clocks[unit.group()].see_peer(unit.auth, unit.time);
                }
                this.$.$mol_log3_rise({
                    place: this,
                    land: land.id(),
                    message: 'Sync Gain',
                    line: $mol_key(line),
                    units: this.log_pack(allow),
                });
            };
            this.line_land_neck({ line, land: land_id }, [
                handle(this.line_land_neck({ line, land: land_id })[0])
            ]);
        }
        line_send_clocks(line, land) { }
        async line_send_units(line, units) { }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_sync_yard.prototype, "peer", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_yard.prototype, "world", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "land", null);
    __decorate([
        $mol_action
    ], $hyoo_sync_yard.prototype, "land_search", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_yard.prototype, "sync", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "land_sync", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "db_land_clocks", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "db_land_sync", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "db_land_init", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_yard.prototype, "master_cursor", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_yard.prototype, "slaves", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "line_lands", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "line_land_clocks", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "line_sync", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "line_land_sync", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "line_land_init", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_sync_yard.prototype, "line_land_neck", null);
    $.$hyoo_sync_yard = $hyoo_sync_yard;
})($ || ($ = {}));
//hyoo/sync/yard/yard.ts
;
"use strict";
var $;
(function ($) {
    function $mol_db_response(request) {
        return new Promise((done, fail) => {
            request.onerror = () => fail(new Error(request.error.message));
            request.onsuccess = () => done(request.result);
        });
    }
    $.$mol_db_response = $mol_db_response;
})($ || ($ = {}));
//mol/db/response/response.ts
;
"use strict";
var $;
(function ($) {
    async function $mol_db(name, ...migrations) {
        const request = this.$mol_dom_context.indexedDB.open(name, migrations.length ? migrations.length + 1 : undefined);
        request.onupgradeneeded = event => {
            migrations.splice(0, event.oldVersion - 1);
            const transaction = new $mol_db_transaction(request.transaction);
            for (const migrate of migrations)
                migrate(transaction);
        };
        const db = await $mol_db_response(request);
        return new $mol_db_database(db);
    }
    $.$mol_db = $mol_db;
})($ || ($ = {}));
//mol/db/db.ts
;
"use strict";
var $;
(function ($) {
    class $mol_db_store {
        native;
        constructor(native) {
            this.native = native;
        }
        get name() {
            return this.native.name;
        }
        get path() {
            return this.native.keyPath;
        }
        get incremental() {
            return this.native.autoIncrement;
        }
        get indexes() {
            return new Proxy({}, {
                ownKeys: () => [...this.native.indexNames],
                has: (_, name) => this.native.indexNames.contains(name),
                get: (_, name) => new $mol_db_index(this.native.index(name))
            });
        }
        index_make(name, path = [], unique = false, multiEntry = false) {
            return this.native.createIndex(name, path, { multiEntry, unique });
        }
        index_drop(name) {
            this.native.deleteIndex(name);
            return this;
        }
        get transaction() {
            return new $mol_db_transaction(this.native.transaction);
        }
        get db() {
            return this.transaction.db;
        }
        clear() {
            return $mol_db_response(this.native.clear());
        }
        count(keys) {
            return $mol_db_response(this.native.count(keys));
        }
        put(doc, key) {
            return $mol_db_response(this.native.put(doc, key));
        }
        get(key) {
            return $mol_db_response(this.native.get(key));
        }
        select(key, count) {
            return $mol_db_response(this.native.getAll(key, count));
        }
        drop(keys) {
            return $mol_db_response(this.native.delete(keys));
        }
    }
    $.$mol_db_store = $mol_db_store;
})($ || ($ = {}));
//mol/db/store/store.ts
;
"use strict";
//mol/db/store/store_schema.ts
;
"use strict";
var $;
(function ($) {
    class $mol_db_index {
        native;
        constructor(native) {
            this.native = native;
        }
        get name() {
            return this.native.name;
        }
        get paths() {
            return this.native.keyPath;
        }
        get unique() {
            return this.native.unique;
        }
        get multiple() {
            return this.native.multiEntry;
        }
        get store() {
            return new $mol_db_store(this.native.objectStore);
        }
        get transaction() {
            return this.store.transaction;
        }
        get db() {
            return this.store.db;
        }
        count(keys) {
            return $mol_db_response(this.native.count(keys));
        }
        get(key) {
            return $mol_db_response(this.native.get(key));
        }
        select(key, count) {
            return $mol_db_response(this.native.getAll(key, count));
        }
    }
    $.$mol_db_index = $mol_db_index;
})($ || ($ = {}));
//mol/db/index/index.ts
;
"use strict";
//mol/db/index/index_schema.ts
;
"use strict";
var $;
(function ($) {
    $mol_dom_context.indexedDB = $node['fake-indexeddb'].indexedDB;
    $mol_dom_context.IDBCursor = $node['fake-indexeddb'].IDBCursor;
    $mol_dom_context.IDBCursorWithValue = $node['fake-indexeddb'].IDBCursorWithValue;
    $mol_dom_context.IDBDatabase = $node['fake-indexeddb'].IDBDatabase;
    $mol_dom_context.IDBFactory = $node['fake-indexeddb'].IDBFactory;
    $mol_dom_context.IDBIndex = $node['fake-indexeddb'].IDBIndex;
    $mol_dom_context.IDBKeyRange = $node['fake-indexeddb'].IDBKeyRange;
    $mol_dom_context.IDBObjectStore = $node['fake-indexeddb'].IDBObjectStore;
    $mol_dom_context.IDBOpenDBRequest = $node['fake-indexeddb'].IDBOpenDBRequest;
    $mol_dom_context.IDBRequest = $node['fake-indexeddb'].IDBRequest;
    $mol_dom_context.IDBTransaction = $node['fake-indexeddb'].IDBTransaction;
    $mol_dom_context.IDBVersionChangeEvent = $node['fake-indexeddb'].IDBVersionChangeEvent;
})($ || ($ = {}));
//mol/db/db.node.ts
;
"use strict";
//mol/db/db_schema.ts
;
"use strict";
var $;
(function ($) {
    class $mol_db_database {
        native;
        constructor(native) {
            this.native = native;
        }
        get name() {
            return this.native.name;
        }
        get version() {
            return this.native.version;
        }
        get stores() {
            return [...this.native.objectStoreNames];
        }
        read(...names) {
            return new $mol_db_transaction(this.native.transaction(names, 'readonly')).stores;
        }
        change(...names) {
            return new $mol_db_transaction(this.native.transaction(names, 'readwrite'));
        }
        kill() {
            this.native.close();
            const request = $mol_dom_context.indexedDB.deleteDatabase(this.name);
            request.onblocked = console.warn;
            return $mol_db_response(request);
        }
        destructor() {
            this.native.close();
        }
    }
    $.$mol_db_database = $mol_db_database;
})($ || ($ = {}));
//mol/db/database/database.ts
;
"use strict";
var $;
(function ($) {
    class $mol_db_transaction {
        native;
        constructor(native) {
            this.native = native;
        }
        get stores() {
            return new Proxy({}, {
                ownKeys: () => [...this.native.objectStoreNames],
                has: (_, name) => this.native.objectStoreNames.contains(name),
                get: (_, name) => new $mol_db_store(this.native.objectStore(name)),
            });
        }
        store_make(name) {
            return this.native.db.createObjectStore(name, { autoIncrement: true });
        }
        store_drop(name) {
            this.native.db.deleteObjectStore(name);
            return this;
        }
        abort() {
            if (this.native.error)
                return;
            this.native.abort();
        }
        commit() {
            this.native.commit();
            return new Promise((done, fail) => {
                this.native.onerror = () => fail(new Error(this.native.error.message));
                this.native.oncomplete = () => done();
            });
        }
        get db() {
            return new $mol_db_database(this.native.db);
        }
    }
    $.$mol_db_transaction = $mol_db_transaction;
})($ || ($ = {}));
//mol/db/transaction/transaction.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_sync_client extends $hyoo_sync_yard {
        async db() {
            const db1 = await this.$.$mol_db('$hyoo_sync_client_db');
            await db1.kill();
            return await this.$.$mol_db('$hyoo_sync_client_db2', mig => mig.store_make('Unit'), mig => mig.stores.Unit.index_make('Land', ['land']), mig => mig.stores.Unit.index_make('Data', ['data']));
        }
        async db_land_load(land) {
            try {
                var db = await this.db();
            }
            catch (error) {
                $mol_fail_log(error);
                return [];
            }
            const Unit = db.read('Unit').Unit;
            const recs = await Unit.indexes.Land.select([land.id()]);
            if (!recs)
                return [];
            const units = recs.map(rec => new $hyoo_crowd_unit(rec.land, rec.auth, rec.head, rec.self, rec.next, rec.prev, rec.time, rec.data, new $hyoo_crowd_unit_bin(rec.bin.buffer)));
            return units;
        }
        async db_land_search(from, to = from + '\uFFFF') {
            try {
                var db = await this.db();
            }
            catch (error) {
                $mol_fail_log(error);
                return new Set();
            }
            const Unit = db.read('Unit').Unit;
            const query = IDBKeyRange.bound([from], [to]);
            const recs = await Unit.indexes.Data.select(query);
            return new Set(recs.map(rec => rec.land));
        }
        async db_land_save(land, units) {
            try {
                var db = await this.db();
            }
            catch (error) {
                $mol_fail_log(error);
                return;
            }
            const trans = db.change('Unit');
            const Unit = trans.stores.Unit;
            for (const unit of units) {
                Unit.put(unit, [unit.land, unit.head, unit.self]);
            }
            await trans.commit();
        }
        reconnects(reset) {
            return ($mol_wire_probe(() => this.reconnects()) ?? 0) + 1;
        }
        master() {
            this.reconnects();
            const link = this.master_link();
            const line = new $mol_dom_context.WebSocket(link);
            line.binaryType = 'arraybuffer';
            line.onmessage = async (event) => {
                if (event.data instanceof ArrayBuffer) {
                    await this.line_receive(line, new Uint8Array(event.data));
                }
                else {
                    this.$.$mol_log3_fail({
                        place: this,
                        message: 'Wrong data',
                        data: event.data
                    });
                }
            };
            let interval;
            line.onclose = () => {
                clearInterval(interval);
                setTimeout(() => this.reconnects(null), 5000);
            };
            Object.assign(line, {
                destructor: () => line.close()
            });
            return new Promise((done, fail) => {
                line.onopen = () => {
                    this.$.$mol_log3_come({
                        place: this,
                        message: 'Connected to Master',
                        line: $mol_key(line),
                        server: link,
                    });
                    interval = setInterval(() => line.send(new Uint8Array), 30000);
                    done(line);
                };
                line.onerror = () => {
                    this.master_cursor((this.master_cursor() + 1) % this.$.$hyoo_sync_masters.length);
                    fail(new Error(`Master is unabailable`));
                };
            });
        }
        line_send_clocks(line, land) {
            if (line instanceof WebSocket) {
                const message = new Uint8Array($hyoo_crowd_clock_bin.from(land.id(), land._clocks).buffer);
                line.send(message);
            }
            else {
                const message = land._clocks;
                line.postMessage(['hyoo_sync_clocks', land.id(), message]);
            }
        }
        async line_send_units(line, units) {
            if (line instanceof WebSocket) {
                await this.world().sign_units(units);
                const message = new Blob(units.map(unit => unit.bin));
                line.send(message);
            }
            else {
                line.postMessage(['hyoo_sync_units', units[0].land, units]);
            }
        }
    }
    __decorate([
        $mol_memo.method
    ], $hyoo_sync_client.prototype, "db", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_client.prototype, "reconnects", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_client.prototype, "master", null);
    $.$hyoo_sync_client = $hyoo_sync_client;
})($ || ($ = {}));
//hyoo/sync/client/client.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_domain extends $mol_object {
        static yard() {
            return new this.$.$hyoo_sync_client;
        }
        static User() {
            return this.Person(this.yard().peer().id);
        }
        static Person(id) {
            return $hyoo_talks_person.make({ id });
        }
        static Chat(id) {
            return $hyoo_talks_chat.make({ id });
        }
        static chat_new() {
            return this.Chat(this.yard().land_grab([''], [], ['0_0']).id());
        }
        static Message(id) {
            return $hyoo_talks_message.make({ id });
        }
        static message_new() {
            return this.Message(this.yard().land_grab().id());
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_domain, "yard", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_domain, "User", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_domain, "Person", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_domain, "Chat", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_domain, "Message", null);
    $.$hyoo_talks_domain = $hyoo_talks_domain;
})($ || ($ = {}));
//hyoo/talks/domain/domain.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_entity extends $mol_object {
        id = '0_0';
        domain() {
            return this.$.$hyoo_talks_domain;
        }
        state() {
            return this.domain().yard().land(this.id).chief;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_entity.prototype, "state", null);
    $.$hyoo_talks_entity = $hyoo_talks_entity;
})($ || ($ = {}));
//hyoo/talks/entity/entity.ts
;
"use strict";
var $;
(function ($) {
    function $mol_reconcile({ prev, from, to, next, equal, drop, insert, update, }) {
        if (!update)
            update = (next, prev, lead) => insert(next, drop(prev, lead));
        let p = from;
        let n = 0;
        let lead = p ? prev[p - 1] : null;
        if (to > prev.length)
            $mol_fail(new RangeError(`To(${to}) greater then length(${prev.length})`));
        if (from > to)
            $mol_fail(new RangeError(`From(${to}) greater then to(${to})`));
        while (p < to || n < next.length) {
            if (p < to && n < next.length && equal(next[n], prev[p])) {
                lead = prev[p];
                ++p;
                ++n;
            }
            else if (next.length - n > to - p) {
                lead = insert(next[n], lead);
                ++n;
            }
            else if (next.length - n < to - p) {
                lead = drop(prev[p], lead);
                ++p;
            }
            else {
                lead = update(next[n], prev[p], lead);
                ++p;
                ++n;
            }
        }
    }
    $.$mol_reconcile = $mol_reconcile;
})($ || ($ = {}));
//mol/reconcile/reconcile.ts
;
"use strict";
var $;
(function ($) {
    const { unicode_only, line_end, tab, repeat_greedy, optional, forbid_after, force_after, char_only, char_except } = $mol_regexp;
    $.$hyoo_crowd_tokenizer = $mol_regexp.from({
        token: {
            'line-break': line_end,
            'indents': repeat_greedy(tab, 1),
            'emoji': [
                unicode_only('Extended_Pictographic'),
                optional(unicode_only('Emoji_Modifier')),
                repeat_greedy([
                    unicode_only('Emoji_Component'),
                    unicode_only('Extended_Pictographic'),
                    optional(unicode_only('Emoji_Modifier')),
                ]),
            ],
            'link': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
            'Word': [
                [
                    forbid_after(line_end),
                    unicode_only('White_Space'),
                ],
                repeat_greedy(char_only([
                    unicode_only('General_Category', 'Uppercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ]), 1),
                repeat_greedy(char_only([
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ])),
            ],
            'word': [
                [
                    forbid_after(line_end),
                    unicode_only('White_Space'),
                ],
                repeat_greedy(char_only([
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ]), 1),
            ],
            'spaces': [
                forbid_after(line_end),
                repeat_greedy(unicode_only('White_Space'), 1),
                force_after(unicode_only('White_Space')),
            ],
            'space': [
                forbid_after(line_end),
                unicode_only('White_Space'),
                forbid_after([
                    unicode_only('White_Space'),
                    unicode_only('General_Category', 'Uppercase_Letter'),
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ]),
            ],
            'others': [
                repeat_greedy(char_except([
                    unicode_only('General_Category', 'Uppercase_Letter'),
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                    unicode_only('White_Space'),
                ]), 1),
            ],
        },
    }).native;
})($ || ($ = {}));
//hyoo/crowd/tokenizer/tokenizer.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_list extends $hyoo_crowd_node {
        list(next) {
            const units = this.units();
            if (next === undefined) {
                return units.map(unit => unit.data);
            }
            else {
                this.insert(next, 0, units.length);
                return next;
            }
        }
        set(next) {
            return new Set(this.list(next && [...next]));
        }
        insert(next, from = this.units().length, to = from) {
            $mol_reconcile({
                prev: this.units(),
                from,
                to,
                next,
                equal: (next, prev) => $mol_compare_deep(prev.data, next),
                drop: (prev, lead) => this.land.wipe(prev),
                insert: (next, lead) => this.land.put(this.head, this.land.id_new(), lead?.self ?? '0_0', next),
                update: (next, prev, lead) => this.land.put(prev.head, prev.self, lead?.self ?? '0_0', next),
            });
        }
        move(from, to) {
            const units = this.units();
            const lead = to ? units[to - 1] : null;
            return this.land.move(units[from], this.head, lead?.self ?? '0_0');
        }
        cut(seat) {
            return this.land.wipe(this.units()[seat]);
        }
        has(val) {
            for (const unit of this.units()) {
                if (unit.data === val)
                    return true;
            }
            return false;
        }
        add(val) {
            if (this.has(val))
                return;
            this.insert([val]);
        }
        drop(val) {
            for (const unit of this.units()) {
                if (unit.data !== val)
                    continue;
                this.land.wipe(unit);
            }
        }
        node_make(val, Node) {
            this.insert([val]);
            const unit = this.units().at(-1);
            return this.land.node(unit.self, Node);
        }
    }
    $.$hyoo_crowd_list = $hyoo_crowd_list;
})($ || ($ = {}));
//hyoo/crowd/list/list.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_crowd_text extends $hyoo_crowd_node {
        text(next) {
            if (next === undefined) {
                return this.str();
            }
            else {
                const prev = this.units();
                const lines = next.match(/.*\n|.+$/g) ?? [];
                $mol_reconcile({
                    prev,
                    from: 0,
                    to: prev.length,
                    next: lines,
                    equal: (next, prev) => {
                        if (typeof prev.data === 'string')
                            return false;
                        return this.land.node(prev.self, $hyoo_crowd_text).str() === next;
                    },
                    drop: (prev, lead) => this.land.wipe(prev),
                    insert: (next, lead) => {
                        const unit = this.land.put(this.head, this.land.id_new(), lead?.self ?? '0_0', []);
                        this.land.node(unit.self, $hyoo_crowd_text).str(next);
                        return unit;
                    },
                    update: (next, prev, lead) => {
                        this.land.node(prev.self, $hyoo_crowd_text).str(next);
                        return prev;
                    },
                });
                return next;
            }
        }
        str(next) {
            if (next === undefined) {
                let str = '';
                for (const unit of this.units()) {
                    if (typeof unit.data === 'string')
                        str += unit.data;
                    else
                        str += this.land.node(unit.self, $hyoo_crowd_text).str();
                }
                return str;
            }
            else {
                this.write(next, 0, -1);
                return next;
            }
        }
        write(next, str_from = -1, str_to = str_from) {
            const list = this.units();
            let from = str_from < 0 ? list.length : 0;
            let word = '';
            while (from < list.length) {
                word = String(list[from].data);
                if (str_from <= word.length) {
                    next = word.slice(0, str_from) + next;
                    break;
                }
                str_from -= word.length;
                if (str_to > 0)
                    str_to -= word.length;
                from++;
            }
            let to = str_to < 0 ? list.length : from;
            while (to < list.length) {
                word = String(list[to].data);
                to++;
                if (str_to < word.length) {
                    next = next + word.slice(str_to);
                    break;
                }
                str_to -= word.length;
            }
            if (from && from === list.length) {
                --from;
                next = String(list[from].data) + next;
            }
            const words = next.match($hyoo_crowd_tokenizer) ?? [];
            this.as($hyoo_crowd_list).insert(words, from, to);
            return this;
        }
        point_by_offset(offset) {
            let off = offset;
            for (const unit of this.units()) {
                if (typeof unit.data === 'string') {
                    const len = String(unit.data).length;
                    if (off <= len)
                        return [unit.self, off];
                    else
                        off -= len;
                }
                else {
                    const found = this.land.node(unit.self, $hyoo_crowd_text).point_by_offset(off);
                    if (found[0] !== '0_0')
                        return found;
                    off = found[1];
                }
            }
            return ['0_0', off];
        }
        offset_by_point([self, offset]) {
            for (const unit of this.units()) {
                if (unit.self === self)
                    return [self, offset];
                if (typeof unit.data === 'string') {
                    offset += unit.data.length;
                }
                else {
                    const found = this.land.node(unit.self, $hyoo_crowd_text).offset_by_point([self, offset]);
                    if (found[0] !== '0_0')
                        return [self, found[1]];
                    offset = found[1];
                }
            }
            return ['0_0', offset];
        }
        selection(peer, next) {
            const reg = this.land.selection(peer);
            if (next) {
                reg.value(next.map(offset => this.point_by_offset(offset)));
                return next;
            }
            else {
                return reg.value()
                    ?.map(point => this.offset_by_point(point)[1]) ?? [0, 0];
            }
        }
    }
    $.$hyoo_crowd_text = $hyoo_crowd_text;
})($ || ($ = {}));
//hyoo/crowd/text/text.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_message extends $hyoo_talks_entity {
        text(next) {
            return this.state().sub('text', $hyoo_crowd_reg).str(next);
        }
        author() {
            const id = [...this.state().land.authors()][0];
            return id ? this.$.$hyoo_talks_domain.Person(id) : null;
        }
        changed() {
            const stamp = this.state().land.clock_data.last_stamp();
            return stamp ? new $mol_time_moment(stamp).toOffset(new $mol_time_moment().offset) : null;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_message.prototype, "text", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message.prototype, "author", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message.prototype, "changed", null);
    $.$hyoo_talks_message = $hyoo_talks_message;
})($ || ($ = {}));
//hyoo/talks/message/message.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_chat extends $hyoo_talks_entity {
        title(next) {
            return this.state().sub('title', $hyoo_crowd_text).str(next);
        }
        messages(next) {
            const ids = this.state().sub('messages', $hyoo_crowd_list)
                .list(next && next.map(m => m.id));
            const domain = this.$.$hyoo_talks_domain;
            return ids.map(id => domain.Message(id));
        }
        message_add(msg) {
            this.state().sub('messages', $hyoo_crowd_list).add(msg.id);
        }
        draft(next) {
            const node = this.state()
                .sub('drafts', $hyoo_crowd_struct)
                .sub(this.domain().User().id, $hyoo_crowd_reg);
            const id = node.str(next === undefined ? undefined : (next?.id ?? ''));
            return id ? this.domain().Message(id) : null;
        }
        draft_new() {
            return this.draft(this.domain().message_new());
        }
        unread_count() {
            const all = this.messages();
            if (!all.length)
                return 0;
            const last = this.domain().User().last_seen_message(this);
            if (!last)
                return all.length;
            return all.length - all.indexOf(last) - 1;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat.prototype, "messages", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat.prototype, "draft", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat.prototype, "unread_count", null);
    $.$hyoo_talks_chat = $hyoo_talks_chat;
})($ || ($ = {}));
//hyoo/talks/chat/chat.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_person extends $hyoo_talks_entity {
        name(next) {
            return this.state().sub('name', $hyoo_crowd_reg).str(next);
        }
        background(next) {
            return this.state().sub('background', $hyoo_crowd_reg).str(next);
        }
        avatar(next) {
            return this.state().sub('avatar', $hyoo_crowd_reg).str(next);
        }
        online_near() {
            const moment = this.online_time();
            if (!moment)
                return false;
            const now = this.$.$mol_state_time.now(60_000);
            return (now - moment.valueOf() < 60_000);
        }
        online_time() {
            const stamp = this.state().land.clock_data.last_stamp();
            return stamp ? new $mol_time_moment(stamp) : null;
        }
        chats(next) {
            const ids = this.state().sub('chats', $hyoo_crowd_list)
                .list(next && next.map(m => m.id));
            const domain = this.$.$hyoo_talks_domain;
            return ids.map(id => domain.Chat(id));
        }
        chat_watch(chat, next) {
            const node = this.state().sub('chats', $hyoo_crowd_list);
            if (next === undefined)
                return node.has(chat.id);
            if (next)
                node.add(chat.id);
            else
                node.drop(chat.id);
            return next;
        }
        last_seen_message(chat, next) {
            const id = this.state()
                .sub('last_seen_message', $hyoo_crowd_struct)
                .sub(chat.id, $hyoo_crowd_reg)
                .str(next?.id);
            return id ? this.domain().Message(id) : null;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_person.prototype, "name", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person.prototype, "background", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person.prototype, "avatar", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person.prototype, "online_near", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person.prototype, "online_time", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person.prototype, "chats", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_person.prototype, "chat_watch", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_person.prototype, "last_seen_message", null);
    $.$hyoo_talks_person = $hyoo_talks_person;
})($ || ($ = {}));
//hyoo/talks/person/person.ts
;
"use strict";
var $;
(function ($) {
    class $mol_form_field extends $mol_labeler {
        bids() {
            return [];
        }
        label() {
            return [
                this.name(),
                this.Bid()
            ];
        }
        Content() {
            return this.control();
        }
        name() {
            return "";
        }
        bid() {
            return "";
        }
        Bid() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.bid()
            ];
            return obj;
        }
        control() {
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_form_field.prototype, "Bid", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//mol/form/field/-view.tree/field.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/form/field/field.view.css", "[mol_form_field] {\n\talign-items: stretch;\n\tpadding: var(--mol_gap_block);\n}\n\n[mol_form_field_bid] {\n\tcolor: var(--mol_theme_focus);\n\tdisplay: inline-block;\n\ttext-shadow: 0 0;\n}\n\n[mol_form_field_content] {\n\tborder-radius: var(--mol_gap_round);\n}\n");
})($ || ($ = {}));
//mol/form/field/-css/field.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form_field extends $.$mol_form_field {
            bid() {
                return this.bids().filter(Boolean)[0] ?? '';
            }
        }
        __decorate([
            $mol_mem
        ], $mol_form_field.prototype, "bid", null);
        $$.$mol_form_field = $mol_form_field;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/form/field/field.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_row extends $mol_view {
    }
    $.$mol_row = $mol_row;
})($ || ($ = {}));
//mol/row/-view.tree/row.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/row/row.view.css", "[mol_row] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: flex-start;\n\talign-content: flex-start;\n\tjustify-content: flex-start;\n\tpadding: .375rem;\n\tflex: 0 0 auto;\n\tbox-sizing: border-box;\n\tmax-width: 100%;\n}\n\n[mol_row] > * {\n\tmargin: .375rem;\n\tmax-width: 100%;\n}\n");
})($ || ($ = {}));
//mol/row/-css/row.view.css.ts
;
"use strict";
var $;
(function ($) {
    class $mol_form extends $mol_list {
        submit_blocked() {
            return false;
        }
        event() {
            return {
                ...super.event(),
                keydown: (event) => this.keydown(event)
            };
        }
        submit(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        rows() {
            return [
                this.Body(),
                this.Foot()
            ];
        }
        keydown(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        form_fields() {
            return [];
        }
        body() {
            return this.form_fields();
        }
        Body() {
            const obj = new this.$.$mol_list();
            obj.sub = () => this.body();
            return obj;
        }
        buttons() {
            return [];
        }
        foot() {
            return this.buttons();
        }
        Foot() {
            const obj = new this.$.$mol_row();
            obj.sub = () => this.foot();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "submit", null);
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "keydown", null);
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "Body", null);
    __decorate([
        $mol_mem
    ], $mol_form.prototype, "Foot", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//mol/form/-view.tree/form.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/form/form.css", "[mol_form_foot] {\n\tmargin: var(--mol_gap_block);\n}\n");
})($ || ($ = {}));
//mol/form/-css/form.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_form extends $.$mol_form {
            form_fields() {
                return [...this.view_find(view => view instanceof $mol_form_field)]
                    .map(path => path[path.length - 1]);
            }
            submit_allowed() {
                return this.form_fields().every(field => !field.bid());
            }
            submit_blocked() {
                return !this.submit_allowed();
            }
            keydown(next) {
                if (next.ctrlKey && next.keyCode === $mol_keyboard_code.enter && !this.submit_blocked())
                    this.submit(event);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "form_fields", null);
        __decorate([
            $mol_mem
        ], $mol_form.prototype, "submit_allowed", null);
        $$.$mol_form = $mol_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/form/form.view.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_person_settings extends $mol_page {
        person() {
            const obj = new this.$.$hyoo_talks_person();
            return obj;
        }
        title() {
            return this.$.$mol_locale.text('$hyoo_talks_person_settings_title');
        }
        body() {
            return [
                this.Form()
            ];
        }
        name(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Name() {
            const obj = new this.$.$mol_string();
            obj.value = (val) => this.name(val);
            return obj;
        }
        Name_field() {
            const obj = new this.$.$mol_form_field();
            obj.name = () => this.$.$mol_locale.text('$hyoo_talks_person_settings_Name_field_name');
            obj.control = () => this.Name();
            return obj;
        }
        background(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Background() {
            const obj = new this.$.$mol_string();
            obj.value = (val) => this.background(val);
            return obj;
        }
        Background_field() {
            const obj = new this.$.$mol_form_field();
            obj.name = () => this.$.$mol_locale.text('$hyoo_talks_person_settings_Background_field_name');
            obj.control = () => this.Background();
            return obj;
        }
        Form() {
            const obj = new this.$.$mol_form();
            obj.form_fields = () => [
                this.Name_field(),
                this.Background_field()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "person", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "name", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "Name", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "Name_field", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "background", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "Background", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "Background_field", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_settings.prototype, "Form", null);
    $.$hyoo_talks_person_settings = $hyoo_talks_person_settings;
})($ || ($ = {}));
//hyoo/talks/person/settings/-view.tree/settings.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($hyoo_talks_person_settings, {
            flex: {
                basis: rem(20),
                shrink: 0,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/person/settings/settings.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_talks_person_settings extends $.$hyoo_talks_person_settings {
            name(next) {
                return this.person()?.name(next);
            }
            background(next) {
                return this.person()?.background(next);
            }
            avatar(next) {
                return this.person()?.avatar(next);
            }
        }
        $$.$hyoo_talks_person_settings = $hyoo_talks_person_settings;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/person/settings/settings.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_avatar extends $mol_icon {
        view_box() {
            return "0 0 24 24";
        }
        id() {
            return "";
        }
        path() {
            return "M 12 12 l 0 0 M 0 0 l 0 0 M 24 24 l 0 0 M 0 24 l 0 0 M 24 0 l 0 0";
        }
    }
    $.$mol_avatar = $mol_avatar;
})($ || ($ = {}));
//mol/avatar/-view.tree/avatar.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_hash_string(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed;
        let h2 = 0x41c6ce57 ^ seed;
        for (let i = 0; i < str.length; i++) {
            const ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (((1 << 16) - 1) & h2) + (h1 >>> 0);
    }
    $.$mol_hash_string = $mol_hash_string;
})($ || ($ = {}));
//mol/hash/string/string.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/avatar/avatar.view.css", "[mol_avatar] {\n\tstroke-linecap: round;\n\tstroke-width: 3.8px;\n\tfill: none;\n\tstroke: currentColor;\n\t/* width: 1.5rem;\n\theight: 1.5rem;\n\tmargin: 0 -.25rem; */\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n}\n");
})($ || ($ = {}));
//mol/avatar/-css/avatar.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_avatar extends $.$mol_avatar {
            path() {
                const id = $mol_hash_string(this.id());
                const p = 2.1;
                const m = 2.7;
                let path = '';
                for (let x = 0; x < 4; ++x) {
                    for (let y = 0; y < 8; ++y) {
                        if ((id >> (x + y * 7)) & 1) {
                            const mxp = Math.ceil(m * x + p);
                            const myp = Math.ceil(m * y + p);
                            path += `M ${mxp} ${myp} l 0 0 ` + `M ${24 - mxp} ${myp} l 0 0 `;
                        }
                    }
                }
                return path;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_avatar.prototype, "path", null);
        $$.$mol_avatar = $mol_avatar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/avatar/avatar.view.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_person_avatar extends $mol_link {
        person() {
            const obj = new this.$.$hyoo_talks_person();
            return obj;
        }
        current() {
            return false;
        }
        sub() {
            return [
                this.Image(),
                this.Name()
            ];
        }
        id() {
            return "";
        }
        Image() {
            const obj = new this.$.$mol_avatar();
            obj.id = () => this.id();
            return obj;
        }
        Online() {
            const obj = new this.$.$mol_speck();
            return obj;
        }
        name() {
            return "";
        }
        name_content() {
            return [
                this.Online(),
                this.name()
            ];
        }
        Name() {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => this.name_content();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_avatar.prototype, "person", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_avatar.prototype, "Image", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_avatar.prototype, "Online", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_person_avatar.prototype, "Name", null);
    $.$hyoo_talks_person_avatar = $hyoo_talks_person_avatar;
})($ || ($ = {}));
//hyoo/talks/person/avatar/-view.tree/avatar.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($hyoo_talks_person_avatar, {});
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/person/avatar/avatar.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_talks_person_avatar extends $.$hyoo_talks_person_avatar {
            id() {
                return this.person()?.id ?? '';
            }
            name() {
                return this.person()?.name();
            }
            uri() {
                const talkers = [
                    this.person()?.id ?? '',
                    this.person()?.domain().User().id ?? '',
                ];
                talkers.sort();
                return `#chat=${talkers.join('-')}`;
            }
            name_content() {
                return [
                    ...this.person()?.online_near() ? [this.Online()] : [],
                    this.name(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_talks_person_avatar.prototype, "uri", null);
        $$.$hyoo_talks_person_avatar = $hyoo_talks_person_avatar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/person/avatar/avatar.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_textarea extends $mol_stack {
        attr() {
            return {
                ...super.attr(),
                mol_textarea_clickable: this.clickable(),
                mol_textarea_sidebar_showed: this.sidebar_showed()
            };
        }
        event() {
            return {
                keydown: (event) => this.press(event),
                pointermove: (event) => this.hover(event)
            };
        }
        sub() {
            return [
                this.Edit(),
                this.View()
            ];
        }
        clickable(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        sidebar_showed() {
            return false;
        }
        press(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        hover(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        value(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        hint() {
            return " ";
        }
        enabled() {
            return true;
        }
        spellcheck() {
            return true;
        }
        length_max() {
            return +Infinity;
        }
        selection(val) {
            if (val !== undefined)
                return val;
            return [];
        }
        Edit() {
            const obj = new this.$.$mol_textarea_edit();
            obj.value = (val) => this.value(val);
            obj.hint = () => this.hint();
            obj.enabled = () => this.enabled();
            obj.spellcheck = () => this.spellcheck();
            obj.length_max = () => this.length_max();
            obj.selection = (val) => this.selection(val);
            return obj;
        }
        row_numb(id) {
            return 0;
        }
        highlight() {
            return "";
        }
        View() {
            const obj = new this.$.$mol_text_code();
            obj.text = () => this.value();
            obj.render_visible_only = () => false;
            obj.row_numb = (id) => this.row_numb(id);
            obj.sidebar_showed = () => this.sidebar_showed();
            obj.highlight = () => this.highlight();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_textarea.prototype, "clickable", null);
    __decorate([
        $mol_mem
    ], $mol_textarea.prototype, "press", null);
    __decorate([
        $mol_mem
    ], $mol_textarea.prototype, "hover", null);
    __decorate([
        $mol_mem
    ], $mol_textarea.prototype, "value", null);
    __decorate([
        $mol_mem
    ], $mol_textarea.prototype, "selection", null);
    __decorate([
        $mol_mem
    ], $mol_textarea.prototype, "Edit", null);
    __decorate([
        $mol_mem
    ], $mol_textarea.prototype, "View", null);
    $.$mol_textarea = $mol_textarea;
    class $mol_textarea_edit extends $mol_string {
        dom_name() {
            return "textarea";
        }
        field() {
            return {
                ...super.field(),
                scrollTop: 0
            };
        }
    }
    $.$mol_textarea_edit = $mol_textarea_edit;
})($ || ($ = {}));
//mol/textarea/-view.tree/textarea.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/textarea/textarea.view.css", "[mol_textarea] {\n\tflex: 1 0 auto;\n\tflex-direction: column;\n\tvertical-align: top;\n\tmin-height: max-content;\n\twhite-space: pre-wrap;\n\tborder-radius: var(--mol_gap_round);\n\tfont-family: monospace;\n\tposition: relative;\n\ttab-size: 4;\n}\n\n[mol_textarea_view] {\n\tz-index: 1;\n\tpointer-events: none;\n\twhite-space: inherit;\n\tfont-family: inherit;\n\ttab-size: inherit;\n}\n\n[mol_textarea_view_copy] {\n\tpointer-events: all;\n}\n\n[mol_textarea_clickable] > [mol_textarea_view] {\n\tpointer-events: all;\n}\n\n[mol_textarea_edit] {\n\tfont-family: inherit;\n\tpadding: var(--mol_gap_text);\n\tcolor: transparent !important;\n\tcaret-color: var(--mol_theme_text);\n\tresize: none;\n\ttext-align: inherit;\n\twhite-space: inherit;\n\tborder-radius: inherit;\n\toverflow-anchor: none;\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttab-size: inherit;\n}\n\n[mol_textarea_sidebar_showed] [mol_textarea_edit] {\n\tleft: 1.5rem;\n\twidth: calc( 100% - 1.5rem );\n}\n");
})($ || ($ = {}));
//mol/textarea/-css/textarea.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_textarea extends $.$mol_textarea {
            indent_inc() {
                document.execCommand('insertText', false, '\t');
            }
            indent_dec() {
            }
            hover(event) {
                this.clickable(event.ctrlKey);
            }
            press(event) {
                switch (event.keyCode) {
                    case $mol_keyboard_code.tab:
                        this.indent_inc();
                        break;
                    case event.shiftKey && $mol_keyboard_code.tab:
                        this.indent_dec();
                        break;
                    default: return;
                }
                event.preventDefault();
            }
            row_numb(index) {
                return index;
            }
        }
        $$.$mol_textarea = $mol_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/textarea/textarea.view.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_message_bubble extends $mol_list {
        message() {
            const obj = new this.$.$hyoo_talks_message();
            return obj;
        }
        attr() {
            return {
                ...super.attr(),
                hyoo_talks_message_bubble_side: this.side()
            };
        }
        event() {
            return {
                dblclick: (event) => this.editable_faorce(event)
            };
        }
        rows() {
            return [
                this.Meta(),
                this.Text(),
                this.Previews()
            ];
        }
        Peek() {
            const obj = new this.$.$mol_check();
            obj.title = () => this.peek_label();
            obj.checked = (val) => this.peek(val);
            return obj;
        }
        Preview(id) {
            const obj = new this.$.$mol_link();
            obj.uri = () => this.preview_uri(id);
            obj.sub = () => [
                this.Preview_embed(id)
            ];
            return obj;
        }
        side() {
            return "other";
        }
        editable_faorce(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        author() {
            const obj = new this.$.$hyoo_talks_person();
            return obj;
        }
        Author() {
            const obj = new this.$.$hyoo_talks_person_avatar();
            obj.person = () => this.author();
            return obj;
        }
        moment() {
            return "";
        }
        When() {
            const obj = new this.$.$mol_paragraph();
            obj.sub = () => [
                this.moment()
            ];
            return obj;
        }
        Meta() {
            const obj = new this.$.$mol_view();
            obj.sub = () => [
                this.Author(),
                this.When()
            ];
            return obj;
        }
        text(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        editable() {
            return false;
        }
        highlight() {
            return "";
        }
        Text() {
            const obj = new this.$.$mol_textarea();
            obj.value = (val) => this.text(val);
            obj.enabled = () => this.editable();
            obj.highlight = () => this.highlight();
            return obj;
        }
        previews() {
            return [];
        }
        Previews() {
            const obj = new this.$.$mol_view();
            obj.sub = () => this.previews();
            return obj;
        }
        peek_label() {
            return "...";
        }
        peek(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        preview_uri(id) {
            return "";
        }
        Preview_embed(id) {
            const obj = new this.$.$mol_embed_native();
            obj.uri = () => this.preview_uri(id);
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "message", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "Peek", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_message_bubble.prototype, "Preview", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "editable_faorce", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "author", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "Author", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "When", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "Meta", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "text", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "Text", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "Previews", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_message_bubble.prototype, "peek", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_message_bubble.prototype, "Preview_embed", null);
    $.$hyoo_talks_message_bubble = $hyoo_talks_message_bubble;
})($ || ($ = {}));
//hyoo/talks/message/bubble/-view.tree/bubble.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { vary } = $mol_style_func;
        $mol_style_define($hyoo_talks_message_bubble, {
            '@': {
                hyoo_talks_message_bubble_side: {
                    self: {
                        Meta: {
                            flex: {
                                direction: 'row-reverse',
                            },
                        },
                        alignItems: 'flex-end',
                    },
                    other: {
                        alignItems: 'flex-start',
                    },
                },
            },
            Meta: {
                flex: {
                    wrap: 'wrap',
                },
            },
            When: {
                padding: $mol_gap.text,
                color: $mol_theme.shade,
            },
            Text: {
                padding: 0,
                flex: {
                    grow: 1,
                    shrink: 1,
                },
                background: {
                    color: $mol_theme.back,
                },
                border: {
                    radius: $mol_gap.round,
                },
                Edit: {
                    background: {
                        color: 'transparent',
                    },
                    boxShadow: 'none',
                },
            },
            Peek: {
                wordBreak: 'break-all',
            },
            Previews: {
                alignSelf: 'stretch',
            },
            Preview: {
                padding: 0,
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: 'auto',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/message/bubble/bubble.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_talks_message_bubble extends $.$hyoo_talks_message_bubble {
            text(next) {
                return this.message().text(next);
            }
            author() {
                return this.message().author();
            }
            side() {
                const message = this.message();
                return message.domain().User() === message.author() ? 'self' : 'other';
            }
            editable(next) {
                if (next !== undefined)
                    return next;
                return this.side() === 'self';
            }
            editable_faorce() {
                this.editable(true);
            }
            links() {
                return (this.text().match(/https?:\/\/\S+/g) ?? []).map(uri => uri.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/'));
            }
            previews() {
                return this.links().map((_, i) => this.Preview(i));
            }
            preview_uri(index) {
                return this.links()[index];
            }
            moment() {
                return this.message().changed()?.toString('YYYY-MM-DD hh:mm') ?? '';
            }
            peek_label() {
                return '•'.repeat(this.text().length);
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_talks_message_bubble.prototype, "side", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_message_bubble.prototype, "editable", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_message_bubble.prototype, "links", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_message_bubble.prototype, "peek_label", null);
        $$.$hyoo_talks_message_bubble = $hyoo_talks_message_bubble;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/message/bubble/bubble.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_download extends $mol_icon {
        path() {
            return "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";
        }
    }
    $.$mol_icon_download = $mol_icon_download;
})($ || ($ = {}));
//mol/icon/download/-view.tree/download.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_button_download extends $mol_button_minor {
        blob() {
            return null;
        }
        uri() {
            return "";
        }
        file_name() {
            return "blob.bin";
        }
        sub() {
            return [
                this.Icon()
            ];
        }
        Icon() {
            const obj = new this.$.$mol_icon_download();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_button_download.prototype, "Icon", null);
    $.$mol_button_download = $mol_button_download;
})($ || ($ = {}));
//mol/button/download/-view.tree/download.view.tree.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button_download extends $.$mol_button_download {
            uri() {
                return URL.createObjectURL(this.blob());
            }
            click() {
                const a = $mol_jsx("a", { href: this.uri(), download: this.file_name() });
                a.click();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_download.prototype, "uri", null);
        $$.$mol_button_download = $mol_button_download;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/button/download/download.view.tsx
;
"use strict";
var $;
(function ($) {
    class $mol_icon_eye extends $mol_icon {
        path() {
            return "M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9M12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z";
        }
    }
    $.$mol_icon_eye = $mol_icon_eye;
})($ || ($ = {}));
//mol/icon/eye/-view.tree/eye.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_magnify extends $mol_icon {
        path() {
            return "M9.5,3C13.09,3 16,5.91 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16C5.91,16 3,13.09 3,9.5C3,5.91 5.91,3 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z";
        }
    }
    $.$mol_icon_magnify = $mol_icon_magnify;
})($ || ($ = {}));
//mol/icon/magnify/-view.tree/magnify.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_microphone extends $mol_icon {
        path() {
            return "M12,2C13.66,2 15,3.34 15,5V11C15,12.66 13.66,14 12,14C10.34,14 9,12.66 9,11V5C9,3.34 10.34,2 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7C7,13.76 9.24,16 12,16C14.76,16 17,13.76 17,11H19Z";
        }
    }
    $.$mol_icon_microphone = $mol_icon_microphone;
})($ || ($ = {}));
//mol/icon/microphone/-view.tree/microphone.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_arrow_up extends $mol_icon {
        path() {
            return "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";
        }
    }
    $.$mol_icon_arrow_up = $mol_icon_arrow_up;
})($ || ($ = {}));
//mol/icon/arrow/up/-view.tree/up.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_arrow_up_bold extends $mol_icon {
        path() {
            return "M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z";
        }
    }
    $.$mol_icon_arrow_up_bold = $mol_icon_arrow_up_bold;
})($ || ($ = {}));
//mol/icon/arrow/up/bold/-view.tree/bold.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks_chat_page extends $mol_page {
        messages(val) {
            if (val !== undefined)
                return val;
            return [];
        }
        chat() {
            const obj = new this.$.$hyoo_talks_chat();
            return obj;
        }
        chat_id() {
            return "0_0";
        }
        embed() {
            return false;
        }
        attr() {
            return {
                ...super.attr(),
                hyoo_talks_chat_page_embed: this.embed()
            };
        }
        Title() {
            const obj = new this.$.$mol_string();
            obj.value = (val) => this.title(val);
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_chat_page_Title_hint');
            return obj;
        }
        tools() {
            return [
                this.Dump(),
                this.Joined(),
                this.Search_toggle(),
                this.Close()
            ];
        }
        head() {
            return [
                this.Title(),
                this.Tools(),
                this.Search()
            ];
        }
        body() {
            return [
                this.Bubbles()
            ];
        }
        foot() {
            return this.draft_controls();
        }
        Bubble(id) {
            const obj = new this.$.$hyoo_talks_message_bubble();
            obj.minimal_height = () => 80;
            obj.message = () => this.message(id);
            obj.highlight = () => this.search();
            return obj;
        }
        plugins() {
            return [
                this.Send_key()
            ];
        }
        title(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        dump_name() {
            return "chat.сsv";
        }
        dump_blob(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Dump() {
            const obj = new this.$.$mol_button_download();
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_chat_page_Dump_hint');
            obj.file_name = () => this.dump_name();
            obj.blob = () => this.dump_blob();
            return obj;
        }
        Joined_icon() {
            const obj = new this.$.$mol_icon_eye();
            return obj;
        }
        joined(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        Joined() {
            const obj = new this.$.$mol_check_icon();
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_chat_page_Joined_hint');
            obj.Icon = () => this.Joined_icon();
            obj.checked = (val) => this.joined(val);
            return obj;
        }
        Search_toggle_icon() {
            const obj = new this.$.$mol_icon_magnify();
            return obj;
        }
        search_enabled(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        Search_toggle() {
            const obj = new this.$.$mol_check_icon();
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_chat_page_Search_toggle_hint');
            obj.Icon = () => this.Search_toggle_icon();
            obj.checked = (val) => this.search_enabled(val);
            return obj;
        }
        Close() {
            return null;
        }
        search(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        search_end(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Search() {
            const obj = new this.$.$mol_search_jumper();
            obj.query = (val) => this.search(val);
            obj.Root = () => this.Body();
            obj.escape = (val) => this.search_end(val);
            return obj;
        }
        bubbles() {
            return [];
        }
        Bubbles() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.bubbles();
            return obj;
        }
        draft_text(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Draft_text() {
            const obj = new this.$.$mol_textarea();
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_chat_page_Draft_text_hint');
            obj.value = (val) => this.draft_text(val);
            return obj;
        }
        Speech_toggle_icon() {
            const obj = new this.$.$mol_icon_microphone();
            return obj;
        }
        hearing(val) {
            if (val !== undefined)
                return val;
            return false;
        }
        Speech_toggle() {
            const obj = new this.$.$mol_check_icon();
            obj.Icon = () => this.Speech_toggle_icon();
            obj.checked = (val) => this.hearing(val);
            return obj;
        }
        Draft_send_icon() {
            const obj = new this.$.$mol_icon_arrow_up_bold();
            return obj;
        }
        draft_send(val) {
            if (val !== undefined)
                return val;
            return null;
        }
        Draft_send() {
            const obj = new this.$.$mol_button_minor();
            obj.title = () => this.$.$mol_locale.text('$hyoo_talks_chat_page_Draft_send_title');
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_chat_page_Draft_send_hint');
            obj.sub = () => [
                this.Draft_send_icon()
            ];
            obj.click = (val) => this.draft_send(val);
            return obj;
        }
        draft_controls() {
            return [
                this.Draft_text(),
                this.Speech_toggle(),
                this.Draft_send()
            ];
        }
        message(id) {
            const obj = new this.$.$hyoo_talks_message();
            return obj;
        }
        search_start(event) {
            if (event !== undefined)
                return event;
            return null;
        }
        Send_key() {
            const obj = new this.$.$mol_hotkey();
            obj.mod_ctrl = () => true;
            obj.key = () => ({
                enter: (event) => this.draft_send(event),
                F: (event) => this.search_start(event)
            });
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "messages", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "chat", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Title", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_chat_page.prototype, "Bubble", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "title", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "dump_blob", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Dump", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Joined_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "joined", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Joined", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Search_toggle_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "search_enabled", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Search_toggle", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "search", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "search_end", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Search", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Bubbles", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "draft_text", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Draft_text", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Speech_toggle_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "hearing", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Speech_toggle", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Draft_send_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "draft_send", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Draft_send", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks_chat_page.prototype, "message", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "search_start", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks_chat_page.prototype, "Send_key", null);
    $.$hyoo_talks_chat_page = $hyoo_talks_chat_page;
})($ || ($ = {}));
//hyoo/talks/chat/page/-view.tree/page.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_notify {
        static allowed(next) {
            return false;
        }
        static show(info) {
        }
    }
    __decorate([
        $mol_mem
    ], $mol_notify, "allowed", null);
    __decorate([
        $mol_action
    ], $mol_notify, "show", null);
    $.$mol_notify = $mol_notify;
})($ || ($ = {}));
//mol/notify/notify.node.ts
;
"use strict";
var $;
(function ($) {
    class $mol_after_work extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = requestIdleCallback(task, { timeout: delay });
        }
        destructor() {
            cancelIdleCallback(this.id);
        }
    }
    $.$mol_after_work = $mol_after_work;
    if (typeof requestIdleCallback !== 'function') {
        $.$mol_after_work = $mol_after_timeout;
    }
})($ || ($ = {}));
//mol/after/work/work.ts
;
"use strict";
var $;
(function ($) {
    function $mol_wait_rest_async() {
        return new Promise(done => {
            new this.$mol_after_work(16, () => done(null));
        });
    }
    $.$mol_wait_rest_async = $mol_wait_rest_async;
    function $mol_wait_rest() {
        return this.$mol_wire_sync(this).$mol_wait_rest_async();
    }
    $.$mol_wait_rest = $mol_wait_rest;
})($ || ($ = {}));
//mol/wait/rest/rest.ts
;
"use strict";
var $;
(function ($) {
    function $mol_range2(item = index => index, size = () => Number.POSITIVE_INFINITY) {
        return new Proxy(new $mol_range2_array(), {
            get(target, field) {
                if (typeof field === 'string') {
                    if (field === 'length')
                        return size();
                    const index = Number(field);
                    if (index === Math.trunc(index))
                        return item(index);
                }
                return target[field];
            },
            set(target, field) {
                return $mol_fail(new TypeError('Lazy range is read only'));
            },
            ownKeys(target) {
                return [...Array(size())].map((v, i) => String(i)).concat('length');
            },
            getOwnPropertyDescriptor(target, field) {
                if (field === "length")
                    return {
                        value: size(),
                        writable: true,
                        enumerable: false,
                        configurable: false,
                    };
                const index = Number(field);
                if (index === Math.trunc(index))
                    return {
                        get: () => this.get(target, field, this),
                        enumerable: true,
                        configurable: true,
                    };
                return Object.getOwnPropertyDescriptor(target, field);
            }
        });
    }
    $.$mol_range2 = $mol_range2;
    class $mol_range2_array extends Array {
        concat(...tail) {
            if (tail.length === 0)
                return this;
            if (tail.length > 1) {
                let list = this;
                for (let item of tail)
                    list = list.concat(item);
                return list;
            }
            return $mol_range2(index => index < this.length ? this[index] : tail[0][index - this.length], () => this.length + tail[0].length);
        }
        filter(check, context) {
            const filtered = new $mol_range2_array();
            for (let index = 0; index < this.length; ++index) {
                const item = this[index];
                if (check.call(context, item, index, this))
                    filtered.push(item);
            }
            return filtered;
        }
        forEach(proceed, context) {
            for (let [key, value] of this.entries())
                proceed.call(context, value, key, this);
        }
        map(proceed, context) {
            return $mol_range2(index => proceed.call(context, this[index], index, this), () => this.length);
        }
        reduce(merge, result) {
            let index = 0;
            if (arguments.length === 1) {
                result = this[index++];
            }
            for (; index < this.length; ++index) {
                result = merge(result, this[index], index, this);
            }
            return result;
        }
        slice(from = 0, to = this.length) {
            return $mol_range2(index => this[from + index], () => Math.min(to, this.length) - from);
        }
        some(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (check.call(context, this[index], index, this))
                    return true;
            }
            return false;
        }
        every(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (!check.call(context, this[index], index, this))
                    return false;
            }
            return true;
        }
    }
    $.$mol_range2_array = $mol_range2_array;
})($ || ($ = {}));
//mol/range2/range2.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_defer = $mol_after_frame;
})($ || ($ = {}));
//mol/defer/defer.ts
;
"use strict";
var $;
(function ($) {
    class $mol_speech extends $mol_plugin {
        static speaker_make() {
            return new Promise(done => {
                const API = $mol_dom_context.speechSynthesis;
                if (API.getVoices().length)
                    return done(API);
                const on_voices = (event) => {
                    if (!API.getVoices().length)
                        return;
                    API.removeEventListener('voiceschanged', on_voices);
                    done(API);
                };
                API.addEventListener('voiceschanged', on_voices);
            });
        }
        static speaker() {
            return $mol_wire_sync(this).speaker_make();
        }
        static voices() {
            const lang = this.$.$mol_locale.lang();
            return this.speaker().getVoices().filter(voice => voice.lang.split('-')[0] === lang);
        }
        static say(text) {
            const speaker = this.speaker();
            speaker.cancel();
            speaker.resume();
            const rate = 1;
            const voice = this.voices()[this.voices().length - 1];
            const pitch = 1;
            var utter = new SpeechSynthesisUtterance(text);
            utter.voice = voice;
            utter.rate = rate;
            utter.pitch = pitch;
            speaker.speak(utter);
            return null;
        }
        static speaking(next = true) {
            if (next)
                this.speaker().resume();
            else
                this.speaker().pause();
            return next;
        }
        static hearer() {
            $mol_wire_solid();
            const API = window['SpeechRecognition'] || window['webkitSpeechRecognition'] || window['mozSpeechRecognition'] || window['msSpeechRecognition'];
            const api = new API;
            api.interimResults = true;
            api.maxAlternatives = 1;
            api.continuous = true;
            api.lang = $mol_locale.lang();
            api.onnomatch = (event) => {
                api.stop();
                return null;
            };
            api.onresult = (event) => {
                this.recognition_index([...event.results].filter(res => res.isFinal).length);
                const recognition = event.results[event.resultIndex];
                const index = event.resultIndex + this.recognition_offset();
                this.recognition(index, recognition);
                return null;
            };
            api.onerror = (event) => {
                if (event.error === 'no-speech')
                    return null;
                console.log(event);
                console.error(new Error(event.error || event));
                api.stop();
                return null;
            };
            api.onend = (event) => {
                if (this.recognition_index() > 0) {
                    this.recognition_offset(this.recognition_offset() + this.recognition_index());
                }
                this.recognition_index(-1);
                if (this.hearing())
                    api.start();
            };
            api.onspeechend = (event) => {
                api.stop();
            };
            return api;
        }
        static hearing(next) {
            if (next === undefined)
                return false;
            if (next) {
                this.hearer().start();
            }
            else {
                this.hearer().stop();
            }
            return next;
        }
        static recognition_index(next = -1) {
            $mol_wire_solid();
            return next;
        }
        static recognition_offset(next = 0) {
            $mol_wire_solid();
            return next;
        }
        static recognition(index, next) {
            $mol_wire_solid();
            return next ?? null;
        }
        static recognitions() {
            if (!this.hearing())
                return [];
            return $mol_range2(index => this.recognition(index), () => Math.max(0, this.recognition_index() + this.recognition_offset()));
        }
        static commands() {
            return this.recognitions().map(result => result[0].transcript.toLowerCase().trim().replace(/[,\.]/g, ''));
        }
        static text() {
            return this.recognitions().map(result => result[0].transcript).join('');
        }
        commands_skip(next = 0) {
            $mol_wire_solid();
            $mol_speech.hearing();
            return next;
        }
        render() {
            const matchers = this.matchers();
            const commands = $mol_speech.commands();
            for (let i = this.commands_skip(); i < commands.length; ++i) {
                for (let matcher of matchers) {
                    const found = commands[i].match(matcher);
                    if (!found)
                        continue;
                    new $mol_defer(() => {
                        if (this.event_catch(found.slice(1))) {
                            this.commands_skip(i + 1);
                        }
                    });
                    return null;
                }
            }
            return null;
        }
        event_catch(found) {
            return false;
        }
        patterns() {
            return [];
        }
        matchers() {
            return this.patterns().map(pattern => {
                return new RegExp(this.prefix() + pattern + this.suffix(), 'i');
            });
        }
        prefix() {
            return '';
        }
        suffix() {
            return '[,\\s]+(?:please|would you kindly|пожалуйста|пожалуй 100|будь любезен|будь любезна|будь добра?)\.?$';
        }
    }
    __decorate([
        $mol_mem
    ], $mol_speech.prototype, "commands_skip", null);
    __decorate([
        $mol_mem
    ], $mol_speech.prototype, "render", null);
    __decorate([
        $mol_mem
    ], $mol_speech.prototype, "matchers", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "speaker", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "voices", null);
    __decorate([
        $mol_action
    ], $mol_speech, "say", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "speaking", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "hearer", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "hearing", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "recognition_index", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "recognition_offset", null);
    __decorate([
        $mol_mem_key
    ], $mol_speech, "recognition", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "recognitions", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "commands", null);
    __decorate([
        $mol_mem
    ], $mol_speech, "text", null);
    $.$mol_speech = $mol_speech;
})($ || ($ = {}));
//mol/speech/speech.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_component(View) {
        if (typeof HTMLElement !== 'function')
            return;
        class Component extends HTMLElement {
            static tag = View.name.replace(/\W/g, '').replace(/^(?=\d+)/, '-').replace(/_/g, '-');
            static observedAttributes = new Set;
            view = new View;
            root;
            connectedCallback() {
                if (!this.shadowRoot) {
                    this.attachShadow({ mode: 'open' });
                    const node = this.view.dom_node();
                    node.setAttribute('mol_view_root', '');
                    this.shadowRoot.append(document.getElementById(`$mol_style_attach`).cloneNode(true), node);
                }
                this.root = $mol_wire_auto();
                try {
                    this.view.dom_tree();
                }
                catch (error) {
                    if (error instanceof Promise)
                        return;
                    $mol_fail_hidden(error);
                }
            }
            disconnectedCallback() {
                this.root.destructor();
                this.root = undefined;
            }
            attributeChangedCallback(name, prev, next) {
                this.view[name](JSON.parse(next));
            }
            toString() {
                return '<' + this.constructor.tag + '#' + this.id + '/>';
            }
        }
        __decorate([
            $mol_mem
        ], Component.prototype, "connectedCallback", null);
        function attributes_observe(proto) {
            if (!proto)
                return;
            if (proto === Reflect.getPrototypeOf({}))
                return;
            for (const field of Object.getOwnPropertyNames(proto)) {
                const descr = Reflect.getOwnPropertyDescriptor(proto, field);
                if (typeof descr.value !== 'function')
                    continue;
                if (descr.value.length === 0)
                    continue;
                Component.observedAttributes.add(field);
            }
            attributes_observe(Reflect.getPrototypeOf(proto));
        }
        attributes_observe(View.prototype);
        customElements.define(Component.tag, Component);
    }
    $.$mol_view_component = $mol_view_component;
})($ || ($ = {}));
//mol/view/component/component.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px, per } = $mol_style_unit;
        $mol_style_define($hyoo_talks_chat_page, {
            '@': {
                hyoo_talks_chat_page_embed: {
                    'true': {
                        backgroundColor: 'transparent',
                    }
                }
            },
            flex: {
                basis: rem(50),
                shrink: 0,
            },
            Title: {
                width: rem(12),
                box: {
                    shadow: 'none',
                },
                background: {
                    color: 'transparent',
                },
            },
            Tools: {
                flex: {
                    grow: 0,
                },
            },
            Search: {
                alignSelf: 'stretch',
                flex: {
                    shrink: 0,
                    basis: per(100),
                },
            },
            Body: {
                padding: 0,
                flex: {
                    grow: 0,
                    basis: 'auto',
                },
            },
            Bubble: {
                margin: $mol_gap.block,
            },
            Foot: {
                padding: $mol_gap.block,
            },
            Draft_text: {
                flex: {
                    shrink: 1,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/chat/page/page.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_talks_chat_page extends $.$hyoo_talks_chat_page {
            domain() {
                return this.$.$hyoo_talks_domain;
            }
            Head() {
                return this.embed() ? null : super.Head();
            }
            head() {
                return [
                    this.Title(),
                    this.Tools(),
                    ...this.search_enabled() ? [this.Search()] : [],
                ];
            }
            search_enabled(next) {
                if (next === undefined)
                    return false;
                if (next) {
                    this.Search().Query().focused(true);
                }
                else {
                    this.search('');
                }
                return next;
            }
            search_start(event) {
                this.search_enabled(true);
                event.preventDefault();
            }
            search_end(event) {
                this.search_enabled(false);
                this.Search_toggle().focused(true);
                event.preventDefault();
            }
            chat() {
                return this.domain().Chat(this.chat_id());
            }
            title(next) {
                return this.chat().title(next);
            }
            messages(next) {
                new $mol_after_frame($mol_wire_async(() => {
                    if (this.Bubbles().gap_after() === 0) {
                        this.scroll_end();
                    }
                }));
                return this.chat().messages(next);
            }
            message(id) {
                return this.domain().Message(id);
            }
            bubbles() {
                return this.messages().map(msg => this.Bubble(msg.id));
            }
            draft_controls() {
                return [
                    this.Draft_text(),
                    this.Speech_toggle(),
                    ...this.draft_text().trim() ? [this.Draft_send()] : []
                ];
            }
            joined(next) {
                this.$.$mol_notify.allowed(true);
                return this.domain().User().chat_watch(this.chat(), next);
            }
            draft_text(next) {
                const chat = this.chat();
                let draft = chat.draft();
                if (next === undefined)
                    return draft?.text() ?? '';
                if (!draft)
                    draft = chat.draft_new();
                return draft.text(next);
            }
            draft_send() {
                if (!this.draft_text().trim())
                    return;
                const chat = this.chat();
                const draft = chat.draft();
                chat.message_add(draft);
                chat.draft(null);
                this.$.$mol_wait_rest();
                this.scroll_end();
                this.joined(true);
            }
            body_scroll_top(next) {
                const key = `${this}.body_scroll_top()`;
                return this.$.$mol_state_local.value(key, next)
                    ?? Number.MAX_SAFE_INTEGER;
            }
            scroll_end() {
                this.Body().scroll_top(this.Body().dom_node().scrollHeight);
            }
            update_last_seen_message() {
                const all = this.messages();
                let bottom = this.Bubbles().view_window()[1] - 1;
                const user = this.domain().User();
                const last_seen = user.last_seen_message(this.chat());
                if (last_seen && all.indexOf(last_seen) >= bottom)
                    return;
                user.last_seen_message(this.chat(), all[bottom]);
            }
            dump_blob() {
                const messages = this.chat().messages();
                const lines = messages.map(msg => {
                    return [
                        msg.author()?.name() || msg.author()?.id || '',
                        msg.text() ?? '',
                        msg.changed()?.toString('YYYY-MM-DD hh:mm:ss') ?? '',
                    ].map(v => JSON.stringify(v)).join('\t');
                });
                const tsv = ['Name\tMessage\tMoment', ...lines].join('\n');
                return new Blob([tsv], { type: 'text/tab-separated-values' });
            }
            dump_name() {
                const name = this.chat().title() || this.chat().id || super.dump_name();
                return name + '.csv';
            }
            hearing(next) {
                return this.$.$mol_speech.hearing(next);
            }
            speech_index(next = 0) {
                return next;
            }
            speech_to_text() {
                if (!this.hearing())
                    return null;
                const index = this.speech_index();
                const last = this.$.$mol_speech.recognition(index);
                if (!last)
                    return null;
                let text = last[0].transcript;
                const sure = last[0].confidence;
                if (sure < .75)
                    text = '//' + text;
                this.draft_text(text);
                if (last.isFinal) {
                    new $mol_after_tick($mol_wire_async(() => {
                        this.speech_index(index + 1);
                        this.draft_send();
                    }));
                }
                return null;
            }
            autoscroll() {
                const doamin = this.domain();
                const message = doamin.User().last_seen_message(this.chat());
                if (!message)
                    return;
                this.ensure_visible(this.Bubble(message.id), 'end');
            }
            auto() {
                this.speech_to_text();
                this.autoscroll();
                this.update_last_seen_message();
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "search_enabled", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "chat", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "messages", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "bubbles", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "joined", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "draft_text", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "update_last_seen_message", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "speech_index", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks_chat_page.prototype, "speech_to_text", null);
        __decorate([
            $mol_mem,
            $mol_action
        ], $hyoo_talks_chat_page.prototype, "autoscroll", null);
        $$.$hyoo_talks_chat_page = $hyoo_talks_chat_page;
        $mol_view_component($hyoo_talks_chat_page);
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/chat/page/page.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_sync extends $mol_icon {
        path() {
            return "M12,18C8.69,18 6,15.31 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12C4,16.42 7.58,20 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6C15.31,6 18,8.69 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12C20,7.58 16.42,4 12,4Z";
        }
    }
    $.$mol_icon_sync = $mol_icon_sync;
})($ || ($ = {}));
//mol/icon/sync/-view.tree/sync.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_sync_off extends $mol_icon {
        path() {
            return "M20,4H14V10L16.24,7.76C17.32,8.85 18,10.34 18,12C18,13 17.75,13.94 17.32,14.77L18.78,16.23C19.55,15 20,13.56 20,12C20,9.79 19.09,7.8 17.64,6.36L20,4M2.86,5.41L5.22,7.77C4.45,9 4,10.44 4,12C4,14.21 4.91,16.2 6.36,17.64L4,20H10V14L7.76,16.24C6.68,15.15 6,13.66 6,12C6,11 6.25,10.06 6.68,9.23L14.76,17.31C14.5,17.44 14.26,17.56 14,17.65V19.74C14.79,19.53 15.54,19.2 16.22,18.78L18.58,21.14L19.85,19.87L4.14,4.14L2.86,5.41M10,6.35V4.26C9.2,4.47 8.45,4.8 7.77,5.22L9.23,6.68C9.5,6.56 9.73,6.44 10,6.35Z";
        }
    }
    $.$mol_icon_sync_off = $mol_icon_sync_off;
})($ || ($ = {}));
//mol/icon/sync/off/-view.tree/off.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_sync_online extends $mol_link {
        minimal_width() {
            return 40;
        }
        minimal_height() {
            return 40;
        }
        yard() {
            const obj = new this.$.$hyoo_sync_yard();
            return obj;
        }
        uri() {
            return this.master_link();
        }
        sub() {
            return [
                this.Well(),
                this.Fail()
            ];
        }
        attr() {
            return {
                ...super.attr(),
                title: this.message()
            };
        }
        master_link() {
            return "";
        }
        Well() {
            const obj = new this.$.$mol_avatar();
            obj.id = () => this.master_link();
            return obj;
        }
        Fail() {
            const obj = new this.$.$mol_icon_sync_off();
            return obj;
        }
        hint() {
            return "$hyoo_sync";
        }
        message() {
            return this.hint();
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_sync_online.prototype, "yard", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_online.prototype, "Well", null);
    __decorate([
        $mol_mem
    ], $hyoo_sync_online.prototype, "Fail", null);
    $.$hyoo_sync_online = $hyoo_sync_online;
})($ || ($ = {}));
//hyoo/sync/online/-view.tree/online.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("hyoo/sync/online/online.view.css", "[hyoo_sync_online] {\n\tpadding: var(--mol_gap_text);\n}\n\n[hyoo_sync_online_well] {\n\tcolor: var(--mol_theme_current);\n}\n\n[hyoo_sync_online_fail] {\n\tcolor: var(--mol_theme_focus);\n}\n\n[hyoo_sync_online][mol_view_error=\"Promise\"] {\n\tanimation: hyoo_sync_online_wait 1s linear infinite;\n}\n\n@keyframes hyoo_sync_online_wait {\n\tfrom {\n\t\topacity: 1;\n\t}\n\tto {\n\t\topacity: .5;\n\t}\n}\n");
})($ || ($ = {}));
//hyoo/sync/online/-css/online.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_sync_online extends $.$hyoo_sync_online {
            message() {
                try {
                    this.yard().sync();
                    return this.hint();
                }
                catch (error) {
                    if (error instanceof Promise)
                        $mol_fail_hidden(error);
                    $mol_fail_log(error);
                    return String(error);
                }
            }
            sub() {
                try {
                    this.yard().sync();
                    return [this.Well()];
                }
                catch (error) {
                    if (error instanceof Promise)
                        $mol_fail_hidden(error);
                    $mol_fail_log(error);
                    return [this.Fail()];
                }
            }
            hint() {
                return super.hint() + ' ' + $hyoo_sync_revision;
            }
            master_link() {
                return this.yard().master_link().replace(/^ws(s?):/, 'http$1:');
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_sync_online.prototype, "message", null);
        __decorate([
            $mol_mem
        ], $hyoo_sync_online.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $hyoo_sync_online.prototype, "hint", null);
        __decorate([
            $mol_mem
        ], $hyoo_sync_online.prototype, "master_link", null);
        $$.$hyoo_sync_online = $hyoo_sync_online;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/sync/online/online.view.ts
;
"use strict";
var $;
(function ($) {
    class $mol_icon_settings extends $mol_icon {
        path() {
            return "M12,15.5C10.07,15.5 8.5,13.93 8.5,12C8.5,10.07 10.07,8.5 12,8.5C13.93,8.5 15.5,10.07 15.5,12C15.5,13.93 13.93,15.5 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
        }
    }
    $.$mol_icon_settings = $mol_icon_settings;
})($ || ($ = {}));
//mol/icon/settings/-view.tree/settings.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $hyoo_talks extends $mol_book2 {
        embed() {
            return false;
        }
        attr() {
            return {
                ...super.attr(),
                hyoo_talks_embed: this.embed()
            };
        }
        style() {
            return {
                ...super.style(),
                "background-image": this.background()
            };
        }
        plugins() {
            return [
                this.Theme()
            ];
        }
        Roster() {
            const obj = new this.$.$mol_page();
            obj.title = () => this.$.$mol_locale.text('$hyoo_talks_Roster_title');
            obj.tools = () => [
                this.Chat_new()
            ];
            obj.body = () => this.roster_body();
            obj.foot = () => [
                this.Online(),
                this.Source(),
                this.Lights(),
                this.Settings_link()
            ];
            return obj;
        }
        Settings() {
            const obj = new this.$.$hyoo_talks_person_settings();
            obj.person = () => this.User();
            obj.tools = () => [
                this.Settings_close()
            ];
            return obj;
        }
        Chat_page(id) {
            const obj = new this.$.$hyoo_talks_chat_page();
            obj.chat = () => this.chat(id);
            obj.embed = () => this.embed();
            obj.Close = () => this.Chat_close();
            return obj;
        }
        Placeholder() {
            const obj = new this.$.$hyoo_talks_placeholder();
            obj.Title = () => null;
            obj.Tools = () => null;
            obj.bg_transparent = () => this.embed();
            return obj;
        }
        Chat_unread_count(id) {
            const obj = new this.$.$mol_speck();
            obj.value = () => this.chat_unread_count(id);
            return obj;
        }
        Chat_link_title(id) {
            const obj = new this.$.$mol_dimmer();
            obj.haystack = () => this.chat_title(id);
            obj.needle = () => this.links_query();
            return obj;
        }
        Chat_link(id) {
            const obj = new this.$.$mol_link();
            obj.arg = () => this.chat_arg(id);
            obj.sub = () => this.chat_link_sub(id);
            return obj;
        }
        unnamed() {
            return this.$.$mol_locale.text('$hyoo_talks_unnamed');
        }
        new_message() {
            return this.$.$mol_locale.text('$hyoo_talks_new_message');
        }
        background() {
            return "";
        }
        Theme() {
            const obj = new this.$.$mol_theme_auto();
            return obj;
        }
        chat_new(next) {
            if (next !== undefined)
                return next;
            return null;
        }
        Chat_new_icon() {
            const obj = new this.$.$mol_icon_plus();
            return obj;
        }
        Chat_new() {
            const obj = new this.$.$mol_button_minor();
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_Chat_new_hint');
            obj.click = (next) => this.chat_new(next);
            obj.sub = () => [
                this.Chat_new_icon()
            ];
            return obj;
        }
        links_query(val) {
            if (val !== undefined)
                return val;
            return "";
        }
        Links_query() {
            const obj = new this.$.$mol_search();
            obj.query = (val) => this.links_query(val);
            return obj;
        }
        links() {
            return [];
        }
        Links() {
            const obj = new this.$.$mol_list();
            obj.rows = () => this.links();
            return obj;
        }
        roster_body() {
            return [
                this.Links_query(),
                this.Links()
            ];
        }
        yard() {
            const obj = new this.$.$hyoo_sync_yard();
            return obj;
        }
        Online() {
            const obj = new this.$.$hyoo_sync_online();
            obj.yard = () => this.yard();
            return obj;
        }
        Source() {
            const obj = new this.$.$mol_link_source();
            obj.uri = () => "https://github.com/hyoo-ru/talks.hyoo.ru";
            return obj;
        }
        Lights() {
            const obj = new this.$.$mol_lights_toggle();
            return obj;
        }
        Settings_icon() {
            const obj = new this.$.$mol_icon_settings();
            return obj;
        }
        Settings_link() {
            const obj = new this.$.$mol_link();
            obj.arg = () => ({
                settings: ""
            });
            obj.hint = () => this.$.$mol_locale.text('$hyoo_talks_Settings_link_hint');
            obj.sub = () => [
                this.Settings_icon()
            ];
            return obj;
        }
        User() {
            const obj = new this.$.$hyoo_talks_person();
            return obj;
        }
        Settings_close_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        Settings_close() {
            const obj = new this.$.$mol_link();
            obj.arg = () => ({
                settings: null
            });
            obj.sub = () => [
                this.Settings_close_icon()
            ];
            return obj;
        }
        chat(id) {
            const obj = new this.$.$hyoo_talks_chat();
            return obj;
        }
        Chat_icon() {
            const obj = new this.$.$mol_icon_cross();
            return obj;
        }
        Chat_close() {
            const obj = new this.$.$mol_link();
            obj.arg = () => ({
                chat: null
            });
            obj.sub = () => [
                this.Chat_icon()
            ];
            return obj;
        }
        chat_unread_count(id) {
            return 0;
        }
        chat_title(id) {
            return "";
        }
        chat_arg(id) {
            return {};
        }
        chat_link_sub(id) {
            return [];
        }
    }
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Roster", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Settings", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks.prototype, "Chat_page", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Placeholder", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks.prototype, "Chat_unread_count", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks.prototype, "Chat_link_title", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks.prototype, "Chat_link", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Theme", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "chat_new", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Chat_new_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Chat_new", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "links_query", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Links_query", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Links", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "yard", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Online", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Source", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Lights", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Settings_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Settings_link", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "User", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Settings_close_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Settings_close", null);
    __decorate([
        $mol_mem_key
    ], $hyoo_talks.prototype, "chat", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Chat_icon", null);
    __decorate([
        $mol_mem
    ], $hyoo_talks.prototype, "Chat_close", null);
    $.$hyoo_talks = $hyoo_talks;
    class $hyoo_talks_placeholder extends $mol_page {
        bg_transparent() {
            return false;
        }
        attr() {
            return {
                ...super.attr(),
                hyoo_talks_placeholder_transparent: this.bg_transparent()
            };
        }
    }
    $.$hyoo_talks_placeholder = $hyoo_talks_placeholder;
})($ || ($ = {}));
//hyoo/talks/-view.tree/talk.view.tree.ts
;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));
//mol/match/text.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        const { url } = $mol_style_func;
        $mol_style_define($hyoo_talks, {
            '@': {
                hyoo_talks_embed: {
                    'true': {
                        background: {
                            color: 'transparent',
                            image: 'none',
                        },
                    },
                },
            },
            background: {
                size: ['cover'],
            },
            Roster: {
                flex: {
                    basis: rem(20),
                    shrink: 0,
                },
                Body: {
                    padding: $mol_gap.block,
                },
                Foot: {
                    padding: $mol_gap.block,
                },
            },
            Links_query: {
                alignSelf: 'auto',
                flex: {
                    grow: 0,
                    shrink: 0,
                },
            },
            Placeholder: {
                Head: {
                    padding: 0,
                },
                Body: {
                    padding: 0,
                },
                '@': {
                    hyoo_talks_placeholder_transparent: {
                        'true': {
                            backgroundColor: 'transparent',
                        }
                    }
                },
            },
            Chat_unread_count: {
                left: 0,
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/talk.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $hyoo_talks extends $.$hyoo_talks {
            domain() {
                return this.$.$hyoo_talks_domain;
            }
            yard() {
                return this.domain().yard();
            }
            chat_id_current() {
                return this.$.$mol_state_arg.value('chat') ?? '';
            }
            settings_opened() {
                return this.$.$mol_state_arg.value('settings') !== null;
            }
            roster_opened() {
                return this.$.$mol_state_arg.value('roster') !== null;
            }
            embed() {
                const val = this.$.$mol_state_arg.value('embed');
                if (val !== null)
                    return true;
                if (this.roster_opened())
                    return false;
                const context = this.$.$mol_dom_context;
                return context.self !== context.parent;
            }
            pages() {
                const chat = this.chat_id_current();
                const roster = !this.embed();
                return [
                    ...roster ? [this.Roster()] : [],
                    ...chat ? [this.Chat_page(chat)] : [],
                    ...this.settings_opened() ? [this.Settings()] : [],
                ];
            }
            User() {
                return this.domain().User();
            }
            background() {
                const uri = this.User().background();
                const shade = `hsl( var(--mol_theme_hue), 0% , calc( 50% + 50% * var(--mol_theme_luma) ), .8 )`;
                return uri ? `linear-gradient( ${shade}, ${shade} ), url(${JSON.stringify(uri)})` : shade;
            }
            roster_body() {
                return [
                    ...this.User().chats().length > 1 ? [this.Links_query()] : [],
                    this.Links(),
                ];
            }
            links() {
                return this.User().chats()
                    .filter($mol_match_text(this.links_query(), chat => [chat.title()]))
                    .map(chat => this.Chat_link(chat.id))
                    .reverse();
            }
            chat(id) {
                return this.domain().Chat(id);
            }
            person(id) {
                return this.domain().Person(id);
            }
            chat_title(id) {
                return this.chat(id).title() || this.unnamed();
            }
            chat_arg(id) {
                return { chat: id };
            }
            chat_new() {
                const chat = this.domain().chat_new();
                this.User().chat_watch(chat, true);
                this.$.$mol_dom_context.location.href = '#!chat=' + chat.id;
            }
            chat_unread_count(id) {
                return this.chat(id).unread_count();
            }
            message_notify(chat) {
                if (!this.chat_unread_count(chat.id))
                    return null;
                this.$.$mol_notify.show({
                    context: `${chat.title()}`,
                    message: this.new_message(),
                    uri: this.$.$mol_state_arg.link({ chat: chat.id })
                });
                return null;
            }
            chat_link_sub(id) {
                return [
                    ...this.chat_unread_count(id) === 0 ? [] : [this.Chat_unread_count(id)],
                    this.Chat_link_title(id),
                ];
            }
            auto() {
                for (const chat of this.User().chats()) {
                    this.message_notify(chat);
                }
                return null;
            }
        }
        __decorate([
            $mol_mem
        ], $hyoo_talks.prototype, "embed", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks.prototype, "pages", null);
        __decorate([
            $mol_mem
        ], $hyoo_talks.prototype, "links", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_talks.prototype, "chat_title", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_talks.prototype, "chat_unread_count", null);
        __decorate([
            $mol_mem_key
        ], $hyoo_talks.prototype, "message_notify", null);
        $$.$hyoo_talks = $hyoo_talks;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//hyoo/talks/talk.view.ts
;
"use strict";
var $;
(function ($) {
    class $koplenov_artel extends $koplenov_artel_catalog {
        blank() {
            return this.Blank();
        }
        param() {
            return "koplenov_artel_catalog";
        }
        spreads() {
            return {
                feed: this.FeedPage(),
                artel: this.Artel(),
                messages: this.Messages(),
                person: this.Person(),
                habhub: this.Habhub(),
                apps: this.Apps()
            };
        }
        Blank() {
            const obj = new this.$.$koplenov_artel_blank();
            return obj;
        }
        FeedPage() {
            const obj = new this.$.$koplenov_artel_feed();
            return obj;
        }
        Artel() {
            const obj = new this.$.$koplenov_artel_artel();
            return obj;
        }
        Messages() {
            const obj = new this.$.$koplenov_artel_messages();
            return obj;
        }
        Person() {
            const obj = new this.$.$koplenov_artel_person();
            return obj;
        }
        Habhub() {
            const obj = new this.$.$hyoo_habhub();
            obj.title = () => "Статьи";
            return obj;
        }
        Apps() {
            const obj = new this.$.$hyoo_apps();
            obj.title = () => "Экосистема";
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel.prototype, "Blank", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel.prototype, "FeedPage", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel.prototype, "Artel", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel.prototype, "Messages", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel.prototype, "Person", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel.prototype, "Habhub", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel.prototype, "Apps", null);
    $.$koplenov_artel = $koplenov_artel;
    class $koplenov_artel_blank extends $mol_page {
        chunk_size() {
            return 20;
        }
        title() {
            return "Blank - А это кароче заглушка";
        }
        body() {
            return [
                this.important()
            ];
        }
        test() {
            const obj = new this.$.$mol_card();
            obj.title = () => "Выжные уведы";
            obj.status = () => "неть";
            return obj;
        }
        after(id) {
            return [];
        }
        Item(id) {
            const obj = new this.$.$mol_filler();
            return obj;
        }
        Description() {
            const obj = new this.$.$mol_infinite();
            obj.after = (id) => this.after(id);
            obj.Row = (id) => this.Item(id);
            return obj;
        }
        text() {
            const obj = new this.$.$mol_scroll();
            obj.sub = () => [
                this.Description()
            ];
            return obj;
        }
        fish() {
            const obj = new this.$.$mol_labeler();
            obj.title = () => "Рыба плавает в тексте";
            obj.content = () => [
                this.text()
            ];
            return obj;
        }
        important() {
            const obj = new this.$.$mol_list();
            obj.rows = () => [
                this.test(),
                this.fish()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel_blank.prototype, "test", null);
    __decorate([
        $mol_mem_key
    ], $koplenov_artel_blank.prototype, "Item", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_blank.prototype, "Description", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_blank.prototype, "text", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_blank.prototype, "fish", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_blank.prototype, "important", null);
    $.$koplenov_artel_blank = $koplenov_artel_blank;
    class $koplenov_artel_feed extends $mol_page {
        title() {
            return "Feed";
        }
        body() {
            return [
                this.hn()
            ];
        }
        bodyd() {
            return [
                this.content()
            ];
        }
        hn() {
            const obj = new this.$.$koplenov_hn();
            obj.Head = () => null;
            return obj;
        }
        card1() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd1";
            return obj;
        }
        card2() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card3() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card4() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card5() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card6() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card7() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card8() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card9() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card10() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card11() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card12() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card13() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card14() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card15() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card16() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card18() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card19() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card20() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card21() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card22() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card23() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card24() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card25() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card26() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        card27() {
            const obj = new this.$.$mol_card();
            obj.title = () => "asdasd2";
            return obj;
        }
        content() {
            const obj = new this.$.$mol_list();
            obj.rows = () => [
                this.card1(),
                this.card2(),
                this.card3(),
                this.card4(),
                this.card5(),
                this.card6(),
                this.card7(),
                this.card8(),
                this.card9(),
                this.card10(),
                this.card11(),
                this.card12(),
                this.card13(),
                this.card14(),
                this.card15(),
                this.card16(),
                this.card18(),
                this.card19(),
                this.card20(),
                this.card21(),
                this.card22(),
                this.card23(),
                this.card24(),
                this.card25(),
                this.card26(),
                this.card27()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "hn", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card1", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card2", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card3", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card4", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card5", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card6", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card7", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card8", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card9", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card10", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card11", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card12", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card13", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card14", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card15", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card16", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card18", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card19", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card20", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card21", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card22", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card23", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card24", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card25", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card26", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "card27", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_feed.prototype, "content", null);
    $.$koplenov_artel_feed = $koplenov_artel_feed;
    class $koplenov_artel_artel extends $mol_page {
        title() {
            return "Артель";
        }
        body() {
            return [
                this.content()
            ];
        }
        label() {
            const obj = new this.$.$mol_paragraph();
            obj.title = () => "Книжница";
            return obj;
        }
        Book_1_label() {
            const obj = new this.$.$mol_paragraph();
            obj.title = () => "Алгоритмы — это всего лишь пошаговые инструкции решения задач, и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?";
            return obj;
        }
        Book_1_image() {
            const obj = new this.$.$mol_image();
            obj.uri = () => "https://img4.labirint.ru/rc/f1bf65cbf23ce88d3d35f47f79e75caf/246x330/books58/571060/cover.jpg?1598873204";
            return obj;
        }
        Book_1() {
            const obj = new this.$.$mol_expander();
            obj.label = () => [
                "«Грокаем алгоритмы»"
            ];
            obj.content = () => [
                this.Book_1_label(),
                this.Book_1_image()
            ];
            return obj;
        }
        Book_2_label() {
            const obj = new this.$.$mol_paragraph();
            obj.title = () => "Книжница«Совершенный код» Стива МакКоннелла — классика программирования, более 10 лет лучшее практическое руководство по программированию, признанное самыми маститыми специалистами, обязательное к прочтению всем программистам не зависимо от используемого в работе языка.";
            return obj;
        }
        Book_2_image() {
            const obj = new this.$.$mol_image();
            obj.uri = () => "https://img3.labirint.ru/rc/d9e73d76285a4501e15a895064af221f/246x330/books28/272529/cover.jpg?1563607723";
            return obj;
        }
        Book_2() {
            const obj = new this.$.$mol_expander();
            obj.label = () => [
                "«Совершенный код»"
            ];
            obj.content = () => [
                this.Book_2_label(),
                this.Book_2_image()
            ];
            return obj;
        }
        Book_3_label() {
            const obj = new this.$.$mol_paragraph();
            obj.title = () => "Книга о том, как и какой ценой создавались 10 самых известных игр последнего десятилетия, такие как Diablo III и Destiny. Мечта любого геймера - эксклюзивная информация из мира разработчиков видеоигр, которую автор превратил в захватывающую и остросюжетную историю о силе духа и превратностях судьбы с хэппи-эндом в виде первых мест в игровых чартах.";
            return obj;
        }
        Book_3_image() {
            const obj = new this.$.$mol_image();
            obj.uri = () => "https://img4.labirint.ru/rc/73c711d63516a0a9129b1b90cf595b10/220x340/books67/663734/cover.jpg?1564136876";
            return obj;
        }
        Book_3() {
            const obj = new this.$.$mol_expander();
            obj.label = () => [
                "«Кровь, пот и пиксели»"
            ];
            obj.content = () => [
                this.Book_3_label(),
                this.Book_3_image()
            ];
            return obj;
        }
        content() {
            const obj = new this.$.$mol_list();
            obj.rows = () => [
                this.label(),
                this.Book_1(),
                this.Book_2(),
                this.Book_3()
            ];
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "label", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_1_label", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_1_image", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_1", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_2_label", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_2_image", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_2", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_3_label", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_3_image", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "Book_3", null);
    __decorate([
        $mol_mem
    ], $koplenov_artel_artel.prototype, "content", null);
    $.$koplenov_artel_artel = $koplenov_artel_artel;
    class $koplenov_artel_messages extends $mol_page {
        title() {
            return "Сообщения";
        }
        body() {
            return [
                this.talks()
            ];
        }
        talks() {
            const obj = new this.$.$hyoo_talks();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel_messages.prototype, "talks", null);
    $.$koplenov_artel_messages = $koplenov_artel_messages;
    class $koplenov_artel_person extends $mol_page {
        title() {
            return "Персона";
        }
        body() {
            return [
                this.rick()
            ];
        }
        rick() {
            const obj = new this.$.$mol_embed_youtube();
            obj.uri = () => "https://www.youtube.com/watch?v=GtL1huin9EE";
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel_person.prototype, "rick", null);
    $.$koplenov_artel_person = $koplenov_artel_person;
    class $koplenov_artel_karta extends $mol_page {
        title() {
            return "karta";
        }
        body() {
            return [
                this.btn1()
            ];
        }
        btn1() {
            const obj = new this.$.$mol_button_minor();
            obj.title = () => "kартаfsdf";
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $koplenov_artel_karta.prototype, "btn1", null);
    $.$koplenov_artel_karta = $koplenov_artel_karta;
})($ || ($ = {}));
//koplenov/artel/-view.tree/artel.view.tree.ts
;
"use strict";
var $;
(function ($) {
    $mol_style_attach("koplenov/artel/artel.view.css", "/*\n[koplenov_artel_head]{\n\tjustify-content: center;\n}\n\n\n\n\n[koplenov_artel_feed]{\n\twidth: 100%;\n}\n*/\n\n[koplenov_artel_menu]{\n\twidth: 100%;\n}\n\n/*\n[koplenov_artel_menu_links]{\n\twidth: 100%;\n\tjustify-content: space-evenly;\n}\n\n[koplenov_artel_menu_foot]{\n\theight: 2.5rem;\n}\n*/\n/*\n[koplenov_artel_links]{\n\tpadding-bottom: 0;\n\tpadding-top: 0;\n\twidth: 100%;\n\tjustify-content: space-evenly;\n}\n*/\n\n[koplenov_artel_links]{\n\tpadding-bottom: 0;\n\tpadding-top: 0;\n}\n\n[koplenov_artel_messages] {\n\theight: 100%;\n}\n\n[mol_paragraph],\n[mol_expander] {\n\tpadding-left: .5rem;\n}\n");
})($ || ($ = {}));
//koplenov/artel/-css/artel.view.css.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $koplenov_artel_blank extends $.$koplenov_artel_blank {
            after(anchor_id = 0) {
                return Array.from({ length: this.chunk_size() }, (_, index) => anchor_id + index);
            }
        }
        __decorate([
            $mol_action
        ], $koplenov_artel_blank.prototype, "after", null);
        $$.$koplenov_artel_blank = $koplenov_artel_blank;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//koplenov/artel/artel.view.ts
;
"use strict";
var $;
(function ($) {
    function $mol_test_complete() {
        process.exit(0);
    }
    $.$mol_test_complete = $mol_test_complete;
})($ || ($ = {}));
//mol/test/test.node.test.ts
;
"use strict";
var $;
(function ($_1) {
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push(test);
        }
        $mol_test_schedule();
    }
    $_1.$mol_test = $mol_test;
    $_1.$mol_test_mocks = [];
    $_1.$mol_test_all = [];
    async function $mol_test_run() {
        for (var test of $_1.$mol_test_all) {
            let context = Object.create($$);
            for (let mock of $_1.$mol_test_mocks)
                await mock(context);
            const res = test(context);
            if (res instanceof Promise) {
                await new Promise((done, fail) => {
                    res.then(done, fail);
                    setTimeout(() => fail(new Error('Test timeout: ' + test.name)), 1000);
                });
            }
        }
        $$.$mol_log3_done({
            place: '$mol_test',
            message: 'All tests passed',
            count: $_1.$mol_test_all.length,
        });
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            await $mol_test_run();
            $$.$mol_test_complete();
        }, 1000);
    }
    $_1.$mol_test_schedule = $mol_test_schedule;
    $_1.$mol_test_mocks.push(context => {
        let seed = 0;
        context.Math = Object.create(Math);
        context.Math.random = () => Math.sin(seed++);
        const forbidden = ['XMLHttpRequest', 'fetch'];
        for (let api of forbidden) {
            context[api] = new Proxy(function () { }, {
                get() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
            });
        }
    });
    $mol_test({
        'mocked Math.random'($) {
            console.assert($.Math.random() === 0);
            console.assert($.Math.random() === Math.sin(1));
        },
        'forbidden XMLHttpRequest'($) {
            try {
                console.assert(void new $.XMLHttpRequest);
            }
            catch (error) {
                console.assert(error.message === 'XMLHttpRequest is forbidden in tests');
            }
        },
        'forbidden fetch'($) {
            try {
                console.assert(void $.fetch(''));
            }
            catch (error) {
                console.assert(error.message === 'fetch is forbidden in tests');
            }
        },
    });
})($ || ($ = {}));
//mol/test/test.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_log3_come = () => { };
        $.$mol_log3_done = () => { };
        $.$mol_log3_fail = () => { };
        $.$mol_log3_warn = () => { };
        $.$mol_log3_rise = () => { };
        $.$mol_log3_area = () => () => { };
    });
})($ || ($ = {}));
//mol/log3/log3.test.ts
;
"use strict";
//mol/type/assert/assert.test.ts
;
"use strict";
//mol/type/assert/assert.ts
;
"use strict";
//mol/type/equals/equals.test.ts
;
"use strict";
//mol/type/partial/deep/deep.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Make empty div'() {
            $mol_assert_equal(($mol_jsx("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $mol_jsx("input", { value: '123' });
            $mol_assert_equal(dom.outerHTML, '<input value="123">');
            $mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $mol_jsx("div", { class: 'foo bar' });
            $mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $mol_jsx("div", { style: { color: 'red' } });
            $mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $mol_jsx("div", { dataset: { foo: 'bar' } });
            $mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $mol_jsx("div", { lang: "ru", hidden: true });
            $mol_assert_equal(dom.outerHTML, '<div lang="ru" hidden=""></div>');
        },
        'Define child nodes'() {
            const dom = $mol_jsx("div", null,
                "hello",
                $mol_jsx("strong", null, "world"),
                "!");
            $mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Function as component'() {
            const Button = (props, target) => {
                return $mol_jsx("button", { title: props.hint }, target());
            };
            const dom = $mol_jsx(Button, { id: "foo", hint: "click me" }, () => 'hey!');
            $mol_assert_equal(dom.outerHTML, '<button id="foo" title="click me" class="Button">hey!</button>');
        },
        'Nested guid generation'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "bar" },
                        $mol_jsx("img", { id: "icon" })));
            };
            const Bar = (props, icon) => {
                return $mol_jsx("span", null,
                    icon,
                    $mol_jsx("i", { id: "label" }));
            };
            const dom = $mol_jsx(Foo, { id: "foo" });
            $mol_assert_equal(dom.outerHTML, '<div id="foo" class="Foo"><span id="foo/bar" class="Foo_bar Bar"><img id="foo/icon" class="Foo_icon"><i id="foo/bar/label" class="Foo_bar_label Bar_label"></i></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("span", { id: "bar" }),
                    $mol_jsx("span", { id: "bar" }));
            };
            $mol_assert_fail(() => $mol_jsx(App, { id: "foo" }), 'JSX already has tag with id "foo/bar"');
        },
        'Owner based guid generationn'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "middle", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            const dom = $mol_jsx(Foo, { id: "app" });
            $mol_assert_equal(dom.outerHTML, '<div id="app" class="Foo"><span id="app/middle" class="Foo_middle Bar"><img id="app/icon" class="Foo_icon"></span></div>');
        },
        'Fail on same ids from different caller'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("img", { id: "icon" }),
                    $mol_jsx(Bar, { id: "bar", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            $mol_assert_fail(() => $mol_jsx(Foo, { id: "foo" }), 'JSX already has tag with id "foo/icon"');
        },
    });
})($ || ($ = {}));
//mol/jsx/jsx.test.tsx
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'nulls & undefineds'() {
            $mol_assert_ok($mol_compare_deep(null, null));
            $mol_assert_ok($mol_compare_deep(undefined, undefined));
            $mol_assert_not($mol_compare_deep(undefined, null));
            $mol_assert_not($mol_compare_deep({}, null));
        },
        'number'() {
            $mol_assert_ok($mol_compare_deep(1, 1));
            $mol_assert_ok($mol_compare_deep(Number.NaN, Number.NaN));
            $mol_assert_not($mol_compare_deep(1, 2));
            $mol_assert_ok($mol_compare_deep(Object(1), Object(1)));
            $mol_assert_not($mol_compare_deep(Object(1), Object(2)));
        },
        'POJO'() {
            $mol_assert_ok($mol_compare_deep({}, {}));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { b: 2 }));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { a: 2 }));
            $mol_assert_not($mol_compare_deep({}, { a: undefined }));
            $mol_assert_ok($mol_compare_deep({ a: 1, b: 2 }, { b: 2, a: 1 }));
            $mol_assert_ok($mol_compare_deep({ a: { b: 1 } }, { a: { b: 1 } }));
        },
        'Array'() {
            $mol_assert_ok($mol_compare_deep([], []));
            $mol_assert_ok($mol_compare_deep([1, [2]], [1, [2]]));
            $mol_assert_not($mol_compare_deep([1, 2], [1, 3]));
            $mol_assert_not($mol_compare_deep([1, 2,], [1, 3, undefined]));
        },
        'Non POJO are different'() {
            class Thing extends Object {
            }
            $mol_assert_not($mol_compare_deep(new Thing, new Thing));
            $mol_assert_not($mol_compare_deep(() => 1, () => 1));
            $mol_assert_not($mol_compare_deep(new RangeError('Test error'), new RangeError('Test error')));
        },
        'same POJOs with cyclic reference'() {
            const a = { foo: {} };
            a['self'] = a;
            const b = { foo: {} };
            b['self'] = b;
            $mol_assert_ok($mol_compare_deep(a, b));
        },
        'Date'() {
            $mol_assert_ok($mol_compare_deep(new Date(12345), new Date(12345)));
            $mol_assert_not($mol_compare_deep(new Date(12345), new Date(12346)));
        },
        'RegExp'() {
            $mol_assert_ok($mol_compare_deep(/\x22/mig, /\x22/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x21/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x22/mg));
        },
        'Error'() {
            $mol_assert_not($mol_compare_deep(new Error('xxx'), new Error('xxx')));
            const fail = (message) => new Error(message);
            $mol_assert_ok($mol_compare_deep(...['xxx', 'xxx'].map(msg => new Error(msg))));
            $mol_assert_not($mol_compare_deep(...['xxx', 'yyy'].map(msg => new Error(msg))));
        },
        'Map'() {
            $mol_assert_ok($mol_compare_deep(new Map, new Map));
            $mol_assert_ok($mol_compare_deep(new Map([[1, [2]]]), new Map([[1, [2]]])));
            $mol_assert_ok($mol_compare_deep(new Map([[[1], 2]]), new Map([[[1], 2]])));
            $mol_assert_not($mol_compare_deep(new Map([[1, 2]]), new Map([[1, 3]])));
            $mol_assert_not($mol_compare_deep(new Map([[[1], 2]]), new Map([[[3], 2]])));
        },
        'Set'() {
            $mol_assert_ok($mol_compare_deep(new Set, new Set));
            $mol_assert_ok($mol_compare_deep(new Set([1, [2]]), new Set([1, [2]])));
            $mol_assert_not($mol_compare_deep(new Set([1]), new Set([2])));
        },
        'Uint8Array'() {
            $mol_assert_ok($mol_compare_deep(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_deep(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_deep(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Custom comparator'() {
            class User {
                name;
                rand;
                constructor(name, rand = Math.random()) {
                    this.name = name;
                    this.rand = rand;
                }
                [Symbol.toPrimitive](mode) {
                    return this.name;
                }
            }
            $mol_assert_ok($mol_compare_deep(new User('Jin'), new User('Jin')));
            $mol_assert_not($mol_compare_deep(new User('Jin'), new User('John')));
        },
    });
})($ || ($ = {}));
//mol/compare/deep/deep.test.tsx
;
"use strict";
var $;
(function ($) {
    function $mol_dom_serialize(node) {
        const serializer = new $mol_dom_context.XMLSerializer;
        return serializer.serializeToString(node);
    }
    $.$mol_dom_serialize = $mol_dom_serialize;
})($ || ($ = {}));
//mol/dom/serialize/serialize.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'must be false'() {
            $mol_assert_not(0);
        },
        'must be true'() {
            $mol_assert_ok(1);
        },
        'two must be equal'() {
            $mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $mol_assert_unique([3], [3]);
        },
        'three must be unique'() {
            $mol_assert_unique([3], [3], [3]);
        },
        'two must be alike'() {
            $mol_assert_like([3], [3]);
        },
        'three must be alike'() {
            $mol_assert_like([3], [3], [3]);
        },
    });
})($ || ($ = {}));
//mol/assert/assert.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        $mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        $mol_fail(new Error(`${value} ≠ false`));
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        const fail = $.$mol_fail;
        try {
            $.$mol_fail = $.$mol_fail_hidden;
            handler();
        }
        catch (error) {
            if (!ErrorRight)
                return error;
            $.$mol_fail = fail;
            if (typeof ErrorRight === 'string') {
                $mol_assert_equal(error.message, ErrorRight);
            }
            else {
                $mol_assert_ok(error instanceof ErrorRight);
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $mol_fail(new Error('Not failed'));
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (Number.isNaN(args[i]) && Number.isNaN(args[j]))
                    continue;
                if (args[i] !== args[j])
                    $mol_fail(new Error(`Not equal (${i + 1}:${j + 1})\n${args[i]}\n${args[j]}`));
            }
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (args[i] === args[j] || (Number.isNaN(args[i]) && Number.isNaN(args[j]))) {
                    $mol_fail(new Error(`args[${i}] = args[${j}] = ${args[i]}`));
                }
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    function $mol_assert_like(head, ...tail) {
        for (let [index, value] of Object.entries(tail)) {
            if (!$mol_compare_deep(value, head)) {
                const print = (val) => {
                    if (!val)
                        return val;
                    if (typeof val !== 'object')
                        return val;
                    if ('outerHTML' in val)
                        return val.outerHTML;
                    try {
                        return JSON.stringify(val);
                    }
                    catch (error) {
                        console.error(error);
                        return val;
                    }
                };
                return $mol_fail(new Error(`Not like (1:${+index + 2})\n${print(head)}\n---\n${print(value)}`));
            }
        }
    }
    $.$mol_assert_like = $mol_assert_like;
    function $mol_assert_dom(left, right) {
        $mol_assert_equal($mol_dom_serialize(left), $mol_dom_serialize(right));
    }
    $.$mol_assert_dom = $mol_assert_dom;
})($ || ($ = {}));
//mol/assert/assert.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'FQN of anon function'($) {
            const $$ = Object.assign($, { $mol_func_name_test: (() => () => { })() });
            $mol_assert_equal($$.$mol_func_name_test.name, '');
            $mol_assert_equal($$.$mol_func_name($$.$mol_func_name_test), '$mol_func_name_test');
            $mol_assert_equal($$.$mol_func_name_test.name, '$mol_func_name_test');
        },
    });
})($ || ($ = {}));
//mol/func/name/name.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'get'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal(proxy.foo, 777);
        },
        'has'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal('foo' in proxy, true);
        },
        'set'() {
            const target = { foo: 777 };
            const proxy = $mol_delegate({}, () => target);
            proxy.foo = 123;
            $mol_assert_equal(target.foo, 123);
        },
        'getOwnPropertyDescriptor'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_like(Object.getOwnPropertyDescriptor(proxy, 'foo'), {
                value: 777,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        },
        'ownKeys'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777, [Symbol.toStringTag]: 'bar' }));
            $mol_assert_like(Reflect.ownKeys(proxy), ['foo', Symbol.toStringTag]);
        },
        'getPrototypeOf'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_equal(Object.getPrototypeOf(proxy), Foo.prototype);
        },
        'setPrototypeOf'() {
            class Foo {
            }
            const target = {};
            const proxy = $mol_delegate({}, () => target);
            Object.setPrototypeOf(proxy, Foo.prototype);
            $mol_assert_equal(Object.getPrototypeOf(target), Foo.prototype);
        },
        'instanceof'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
        'autobind'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
    });
})($ || ($ = {}));
//mol/delegate/delegate.test.ts
;
"use strict";
//mol/type/writable/writable.test.ts
;
"use strict";
var $;
(function ($) {
    $.$mol_after_mock_queue = [];
    function $mol_after_mock_warp() {
        const queue = $.$mol_after_mock_queue.splice(0);
        for (const task of queue)
            task();
    }
    $.$mol_after_mock_warp = $mol_after_mock_warp;
    class $mol_after_mock_commmon extends $mol_object2 {
        task;
        promise = Promise.resolve();
        cancelled = false;
        id;
        constructor(task) {
            super();
            this.task = task;
            $.$mol_after_mock_queue.push(task);
        }
        destructor() {
            const index = $.$mol_after_mock_queue.indexOf(this.task);
            if (index >= 0)
                $.$mol_after_mock_queue.splice(index, 1);
        }
    }
    $.$mol_after_mock_commmon = $mol_after_mock_commmon;
    class $mol_after_mock_timeout extends $mol_after_mock_commmon {
        delay;
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));
//mol/after/mock/mock.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'tree parsing'() {
            $mol_assert_equal($mol_tree.fromString("foo\nbar\n").sub.length, 2);
            $mol_assert_equal($mol_tree.fromString("foo\nbar\n").sub[1].type, "bar");
            $mol_assert_equal($mol_tree.fromString("foo\n\n\n").sub.length, 1);
            $mol_assert_equal($mol_tree.fromString("=foo\n\\bar\n").sub.length, 2);
            $mol_assert_equal($mol_tree.fromString("=foo\n\\bar\n").sub[1].data, "bar");
            $mol_assert_equal($mol_tree.fromString("foo bar \\pol").sub[0].sub[0].sub[0].data, "pol");
            $mol_assert_equal($mol_tree.fromString("foo bar\n\t\\pol\n\t\\men").sub[0].sub[0].sub[1].data, "men");
            $mol_assert_equal($mol_tree.fromString('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'inserting'() {
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, 'a', 'b', 'c').toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, 'a', 'b', 'c', 'd').toString(), 'a b c \\\n');
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, 0, 0, 0).toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, 0, 0, 0, 0).toString(), 'a b \\\n\t\\\n');
            $mol_assert_equal($mol_tree.fromString('a b c d').insert(new $mol_tree, null, null, null).toString(), 'a b \\\n');
            $mol_assert_equal($mol_tree.fromString('a b').insert(new $mol_tree, null, null, null, null).toString(), 'a b \\\n\t\\\n');
        },
        'fromJSON'() {
            $mol_assert_equal($mol_tree.fromJSON([]).toString(), '/\n');
            $mol_assert_equal($mol_tree.fromJSON([false, true]).toString(), '/\n\tfalse\n\ttrue\n');
            $mol_assert_equal($mol_tree.fromJSON([0, 1, 2.3]).toString(), '/\n\t0\n\t1\n\t2.3\n');
            $mol_assert_equal($mol_tree.fromJSON(['', 'foo', 'bar\nbaz']).toString(), '/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n');
            $mol_assert_equal($mol_tree.fromJSON({ 'foo': false, 'bar\nbaz': 'lol' }).toString(), '*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n');
        },
        'toJSON'() {
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n').sub[0]), '[]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\tfalse\n\ttrue\n').sub[0]), '[false,true]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\t0\n\t1\n\t2.3\n').sub[0]), '[0,1,2.3]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('/\n\t\\\n\t\\foo\n\t\\\n\t\t\\bar\n\t\t\\baz\n').sub[0]), '["","foo","bar\\nbaz"]');
            $mol_assert_equal(JSON.stringify($mol_tree.fromString('*\n\tfoo false\n\t\\\n\t\t\\bar\n\t\t\\baz\n\t\t\\lol\n').sub[0]), '{"foo":false,"bar\\nbaz":"lol"}');
        },
        'hack'() {
            const res = $mol_tree.fromString(`foo bar xxx`).hack({
                '': (tree, context) => [tree.hack(context)],
                'bar': (tree, context) => [tree.hack(context).clone({ type: '777' })],
            });
            $mol_assert_equal(res.toString(), new $mol_tree({ type: 'foo 777 xxx' }).toString());
        },
        'errors handling'($) {
            const errors = [];
            class Tree extends $mol_tree {
                static $ = $.$mol_ambient({
                    $mol_fail: error => errors.push(error.message)
                });
            }
            Tree.fromString(`
				\t \tfoo
				bar \\data
			`, 'test');
            $mol_assert_like(errors, ['Syntax error at test:2\n \tfoo']);
        },
    });
})($ || ($ = {}));
//mol/tree/tree.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_tick = $mol_after_mock_commmon;
    });
})($ || ($ = {}));
//mol/after/tick/tick.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Collect deps'() {
            const pub1 = new $mol_wire_pub;
            const pub2 = new $mol_wire_pub;
            const sub = new $mol_wire_pub_sub;
            const bu1 = sub.track_on();
            try {
                pub1.promote();
                pub2.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu1);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub2, pub2]);
            const bu2 = sub.track_on();
            try {
                pub1.promote();
                pub1.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu2);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub1, pub2]);
        },
        'cyclic detection'($) {
            const sub1 = new $mol_wire_pub_sub;
            const sub2 = new $mol_wire_pub_sub;
            const bu1 = sub1.track_on();
            try {
                const bu2 = sub2.track_on();
                try {
                    $mol_assert_fail(() => sub1.promote(), 'Circular subscription');
                }
                finally {
                    sub2.track_cut();
                    sub2.track_off(bu2);
                }
            }
            finally {
                sub1.track_cut();
                sub1.track_off(bu1);
            }
        },
    });
})($ || ($ = {}));
//mol/wire/pub/sub/sub.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_timeout = $mol_after_mock_timeout;
    });
})($ || ($ = {}));
//mol/after/timeout/timeout.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_frame = $mol_after_mock_commmon;
    });
})($ || ($ = {}));
//mol/after/frame/frame.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Sync execution'() {
            class Sync extends $mol_object2 {
                static calc(a, b) {
                    return a + b;
                }
            }
            __decorate([
                $mol_wire_method
            ], Sync, "calc", null);
            $mol_assert_equal(Sync.calc(1, 2), 3);
        },
        async 'async <=> sync'() {
            class SyncAsync extends $mol_object2 {
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            $mol_assert_equal(await SyncAsync.calc(1, 2), 8);
        },
        async 'Idempotence control'() {
            class Idempotence extends $mol_object2 {
                static logs_idemp = 0;
                static logs_unidemp = 0;
                static log_idemp() {
                    this.logs_idemp += 1;
                }
                static log_unidemp() {
                    this.logs_unidemp += 1;
                }
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    this.log_idemp();
                    this.log_unidemp();
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            __decorate([
                $mol_wire_method
            ], Idempotence, "log_idemp", null);
            $mol_assert_equal(await Idempotence.calc(1, 2), 8);
            $mol_assert_equal(Idempotence.logs_idemp, 1);
            $mol_assert_equal(Idempotence.logs_unidemp, 3);
        },
        async 'Error handling'() {
            class Handle extends $mol_object2 {
                static async sum(a, b) {
                    $mol_fail(new Error('test error ' + (a + b)));
                }
                static check() {
                    try {
                        return $mol_wire_sync(Handle).sum(1, 2);
                    }
                    catch (error) {
                        if (error instanceof Promise)
                            $mol_fail_hidden(error);
                        $mol_assert_equal(error.message, 'test error 3');
                    }
                }
            }
            await $mol_wire_async(Handle).check();
        },
    });
})($ || ($ = {}));
//mol/wire/fiber/fiber.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        async 'Latest method calls wins'($) {
            class NameLogger extends $mol_object2 {
                static $ = $;
                static first = [];
                static last = [];
                static send(next) {
                    $mol_wire_sync(this.first).push(next);
                    this.$.$mol_wait_timeout(0);
                    this.last.push(next);
                }
            }
            const name = $mol_wire_async(NameLogger).send;
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_like(NameLogger.first, ['john', 'jin']);
            $mol_assert_like(NameLogger.last, ['jin']);
        },
        async 'Latest function calls wins'($) {
            const first = [];
            const last = [];
            function send_name(next) {
                $mol_wire_sync(first).push(next);
                $.$mol_wait_timeout(0);
                last.push(next);
            }
            const name = $mol_wire_async(send_name);
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_like(first, ['john', 'jin']);
            $mol_assert_like(last, ['jin']);
        },
    });
})($ || ($ = {}));
//mol/wire/async/async.test.ts
;
"use strict";
//mol/type/tail/tail.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Cached channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 2);
            App.value(2);
            $mol_assert_equal(App.value(), 3);
        },
        'Read Pushed'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 0) {
                    return next;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(1), 1);
            $mol_assert_equal(App.value(), 1);
        },
        'Mem overrides mem'($) {
            class Base extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Base, "value", null);
            class Middle extends Base {
                static value(next) {
                    return super.value(next) + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Middle, "value", null);
            class App extends Middle {
                static value(next) {
                    return super.value(next) * 3;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 9);
            $mol_assert_equal(App.value(5), 21);
            $mol_assert_equal(App.value(), 21);
        },
        'Auto recalculation of cached values'($) {
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    return next || 1;
                }
                static yyy() {
                    return this.xxx() + 1;
                }
                static zzz() {
                    return this.yyy() + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            $mol_assert_equal(App.yyy(), 2);
            $mol_assert_equal(App.zzz(), 3);
            App.xxx(5);
            $mol_assert_equal(App.zzz(), 7);
        },
        'Skip recalculation when actually no dependency changes'($) {
            const log = [];
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    log.push('xxx');
                    return next || 1;
                }
                static yyy() {
                    log.push('yyy');
                    return [Math.sign(this.xxx())];
                }
                static zzz() {
                    log.push('zzz');
                    return this.yyy()[0] + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx']);
            App.xxx(5);
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx']);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx', 'yyy']);
        },
        'Flow: Auto'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static first(next = 1) { return next; }
                static second(next = 2) { return next; }
                static condition(next = true) { return next; }
                static counter = 0;
                static result() {
                    const res = this.condition() ? this.first() : this.second();
                    return res + this.counter++;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "first", null);
            __decorate([
                $mol_wire_solo
            ], App, "second", null);
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            $mol_assert_equal(App.counter, 1);
            App.condition(false);
            $mol_assert_equal(App.result(), 3);
            $mol_assert_equal(App.counter, 2);
            App.first(10);
            $mol_assert_equal(App.result(), 3);
            $mol_assert_equal(App.counter, 2);
        },
        'Dupes: Equality'($) {
            let counter = 0;
            class App extends $mol_object2 {
                static $ = $;
                static foo(next) {
                    return next ?? { numbs: [1] };
                }
                static bar() {
                    return { ...this.foo(), count: ++counter };
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [1] });
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [2] });
            $mol_assert_like(App.bar(), { numbs: [2], count: 2 });
        },
        'Cycle: Fail'($) {
            class App extends $mol_object2 {
                static $ = $;
                static foo() {
                    return this.bar() + 1;
                }
                static bar() {
                    return this.foo() + 1;
                }
                static test() {
                    $mol_assert_fail(() => App.foo(), 'Circular subscription');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            App.test();
        },
        'Different order of pull and push'($) {
            class App extends $mol_object2 {
                static $ = $;
                static store(next = 0) {
                    return next;
                }
                static fast(next) {
                    return this.store(next);
                }
                static slow(next) {
                    if (next !== undefined)
                        this.slow();
                    return this.store(next);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "store", null);
            __decorate([
                $mol_wire_solo
            ], App, "fast", null);
            __decorate([
                $mol_wire_solo
            ], App, "slow", null);
            App.fast();
            $mol_assert_equal(App.slow(666), 666);
            $mol_assert_equal(App.fast(), App.slow(), 666);
            App.store(777);
            $mol_assert_equal(App.fast(), App.slow(), 777);
        },
        'Actions inside invariant'($) {
            class App extends $mol_object2 {
                static $ = $;
                static count(next = 0) {
                    return next;
                }
                static count2() {
                    return this.count();
                }
                static res() {
                    const count = this.count2();
                    if (!count)
                        this.count(count + 1);
                    return count + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "count", null);
            __decorate([
                $mol_wire_solo
            ], App, "count2", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            $mol_assert_like(App.res(), 1);
            App.count(5);
            $mol_assert_like(App.res(), 6);
        },
        async 'Toggle with async'($) {
            class App extends $mol_object2 {
                static $ = $;
                static checked(next = false) {
                    $$.$mol_wait_timeout(0);
                    return next;
                }
                static toggle() {
                    const prev = this.checked();
                    $mol_assert_unique(this.checked(!prev), prev);
                }
                static res() {
                    return this.checked();
                }
                static test() {
                    $mol_assert_equal(App.res(), false);
                    App.toggle();
                    $mol_assert_equal(App.res(), true);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "checked", null);
            __decorate([
                $mol_wire_method
            ], App, "toggle", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Restore after error'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static condition(next = false) { return next; }
                static broken() {
                    if (this.condition()) {
                        $mol_fail(new Error('test error'));
                    }
                    return 1;
                }
                static result() {
                    return this.broken();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "broken", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.condition(true);
            $mol_assert_fail(() => App.result());
            App.condition(false);
            $mol_assert_equal(App.result(), 1);
        },
        async 'Wait for data'($) {
            class App extends $mol_object2 {
                static $ = $;
                static async source() {
                    return 'Jin';
                }
                static middle() {
                    return $mol_wire_sync(this).source();
                }
                static target() {
                    return this.middle();
                }
                static test() {
                    $mol_assert_equal(App.target(), 'Jin');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "middle", null);
            __decorate([
                $mol_wire_solo
            ], App, "target", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Auto destroy on long alone'($) {
            let destroyed = false;
            class App extends $mol_object2 {
                static $ = $;
                static showing(next = true) {
                    return next;
                }
                static details() {
                    return {
                        destructor() {
                            destroyed = true;
                        }
                    };
                }
                static render() {
                    return this.showing() ? this.details() : null;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "showing", null);
            __decorate([
                $mol_wire_solo
            ], App, "details", null);
            __decorate([
                $mol_wire_solo
            ], App, "render", null);
            const details = App.render();
            $mol_assert_ok(details);
            App.showing(false);
            $mol_assert_not(App.render());
            App.showing(true);
            $mol_assert_equal(App.render(), details);
            $mol_wire_fiber.sync();
            $mol_assert_not(destroyed);
            App.showing(false);
            $mol_wire_fiber.sync();
            $mol_assert_ok(destroyed);
            App.showing(true);
            $mol_assert_unique(App.render(), details);
        },
        async 'Hold pubs while wait async task'($) {
            class App extends $mol_object2 {
                static $ = $;
                static counter = 0;
                static resets(next) {
                    return ($mol_wire_probe(() => this.resets()) ?? -1) + 1;
                }
                static async wait() { }
                static value() {
                    return ++this.counter;
                }
                static result() {
                    if (this.resets())
                        $mol_wire_sync(this).wait();
                    return this.value();
                }
                static test() {
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "resets", null);
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            $mol_assert_equal(App.result(), 1);
            App.resets(null);
            $mol_wire_fiber.sync();
            $mol_assert_equal(await $mol_wire_async(App).result(), 1);
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static title() {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "title", null);
            $mol_assert_equal(`${App.title()}`, 'App.title()');
        },
        'Unsubscribe from temp pubs on complete'($) {
            class Random extends $mol_object2 {
                static $ = $;
                static seed() {
                    return Math.random();
                }
                static resets(next) {
                    return Math.random();
                }
                static value() {
                    this.resets();
                    return this.seed();
                }
            }
            __decorate([
                $mol_wire_method
            ], Random, "seed", null);
            __decorate([
                $mol_wire_solo
            ], Random, "resets", null);
            __decorate([
                $mol_wire_solo
            ], Random, "value", null);
            const first = Random.value();
            Random.resets(null);
            $mol_assert_unique(Random.value(), first);
        },
    });
})($ || ($ = {}));
//mol/wire/solo/solo.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Memoize by single simple key'($) {
            class Team extends $mol_object2 {
                static $ = $;
                static user_name(user, next) {
                    return next ?? user;
                }
                static user_names() {
                    return [
                        this.user_name('jin'),
                        this.user_name('john'),
                    ];
                }
            }
            __decorate([
                $mol_wire_plex
            ], Team, "user_name", null);
            __decorate([
                $mol_wire_solo
            ], Team, "user_names", null);
            $mol_assert_like(Team.user_names(), ['jin', 'john']);
            Team.user_name('jin', 'JIN');
            $mol_assert_like(Team.user_names(), ['JIN', 'john']);
        },
        'Memoize by single complex key'($) {
            class Map extends $mol_object2 {
                static $ = $;
                static tile(pos) {
                    return new String(`/tile=${pos}`);
                }
                static test() {
                    $mol_assert_like(this.tile([0, 1]), new String('/tile=0,1'));
                    $mol_assert_equal(this.tile([0, 1]), this.tile([0, 1]));
                }
            }
            __decorate([
                $mol_wire_plex
            ], Map, "tile", null);
            __decorate([
                $mol_wire_method
            ], Map, "test", null);
            Map.test();
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static like(friend) {
                    return new $mol_object2;
                }
                static relation([friend, props]) {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_plex
            ], App, "like", null);
            __decorate([
                $mol_wire_plex
            ], App, "relation", null);
            $mol_assert_equal(`${App.like(123)}`, 'App.like(123)');
            $mol_assert_equal(`${App.relation([123, [456]])}`, 'App.relation([123,[456]])');
        },
        'Deep deps'($) {
            class Fib extends $mol_object2 {
                static $ = $;
                static sums = 0;
                static value(index, next) {
                    if (next)
                        return next;
                    if (index < 2)
                        return 1;
                    ++this.sums;
                    return this.value(index - 1) + this.value(index - 2);
                }
            }
            __decorate([
                $mol_wire_plex
            ], Fib, "value", null);
            $mol_assert_equal(Fib.value(4), 5);
            $mol_assert_equal(Fib.sums, 3);
            Fib.value(1, 2);
            $mol_assert_equal(Fib.value(4), 8);
            $mol_assert_equal(Fib.sums, 6);
        },
    });
})($ || ($ = {}));
//mol/wire/plex/plex.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Previous value'() {
            class Cache extends $mol_object2 {
                static store(next) {
                    if (!next)
                        return {};
                    return {
                        ...$mol_wire_probe(() => this.store()) ?? {},
                        ...next,
                    };
                }
            }
            __decorate([
                $mol_wire_solo
            ], Cache, "store", null);
            $mol_assert_like(Cache.store(), {});
            $mol_assert_like(Cache.store({ foo: 666 }), { foo: 666 });
            $mol_assert_like(Cache.store({ bar: 777 }), { foo: 666, bar: 777 });
        },
    });
})($ || ($ = {}));
//mol/wire/probe/probe.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'init with overload'() {
            class X extends $mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $mol_assert_equal(x.foo(), 2);
        },
    });
})($ || ($ = {}));
//mol/object/object.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'run callback'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            $mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            const obj = {
                level: 2,
                pow: Plus1.func(function (a) {
                    return a ** this.level;
                })
            };
            $mol_assert_equal(obj.pow(2), 5);
        },
        'decorate field getter'() {
            class Plus1 extends $mol_wrapper {
                static last = 0;
                static wrap(task) {
                    return function (...args) {
                        return Plus1.last = (task.call(this, ...args) || 0) + 1;
                    };
                }
            }
            class Foo {
                static get two() {
                    return 1;
                }
                static set two(next) { }
            }
            __decorate([
                Plus1.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Plus1.last, 2);
            $mol_assert_equal(Foo.two, 2);
        },
        'decorate instance method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo1 {
                level = 2;
                pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo1.prototype, "pow", null);
            const Foo2 = Foo1;
            const foo = new Foo2;
            $mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo {
                static level = 2;
                static pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo, "pow", null);
            $mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            class BarInc extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            }
            let Foo = class Foo {
                bar;
                constructor(bar) {
                    this.bar = bar;
                }
            };
            Foo = __decorate([
                BarInc.class
            ], Foo);
            $mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));
//mol/wrapper/wrapper.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'memoize field'() {
            class Foo {
                static one = 1;
                static get two() {
                    return ++this.one;
                }
                static set two(next) { }
            }
            __decorate([
                $mol_memo.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Foo.two, 3);
            $mol_assert_equal(Foo.two, 3);
        },
    });
})($ || ($ = {}));
//mol/memo/memo.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_wire_log extends $mol_object2 {
        static watch(task) {
            return task;
        }
        static track(fiber) {
            const prev = $mol_wire_probe(() => this.track(fiber));
            let next;
            try {
                next = fiber.sync();
            }
            finally {
                for (const pub of fiber.pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
            if (prev !== undefined && !$mol_compare_deep(prev, next)) {
                this.$.$mol_log3_rise({
                    message: 'Changed',
                    place: fiber,
                });
            }
            return next;
        }
        static active() {
            try {
                this.watch()?.();
            }
            finally {
                for (const pub of $mol_wire_auto().pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_wire_log, "watch", null);
    __decorate([
        $mol_mem_key
    ], $mol_wire_log, "track", null);
    __decorate([
        $mol_mem
    ], $mol_wire_log, "active", null);
    $.$mol_wire_log = $mol_wire_log;
})($ || ($ = {}));
//mol/wire/log/log.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Primitives'() {
            $mol_assert_equal($mol_key(null), 'null');
            $mol_assert_equal($mol_key(false), 'false');
            $mol_assert_equal($mol_key(true), 'true');
            $mol_assert_equal($mol_key(0), '0');
            $mol_assert_equal($mol_key(''), '""');
        },
        'Array & POJO'() {
            $mol_assert_equal($mol_key([null]), '[null]');
            $mol_assert_equal($mol_key({ foo: 0 }), '{"foo":0}');
            $mol_assert_equal($mol_key({ foo: [false] }), '{"foo":[false]}');
        },
        'Function'() {
            const func = () => { };
            $mol_assert_equal($mol_key(func), $mol_key(func));
            $mol_assert_unique($mol_key(func), $mol_key(() => { }));
        },
        'Objects'() {
            class User {
            }
            const jin = new User();
            $mol_assert_equal($mol_key(jin), $mol_key(jin));
            $mol_assert_unique($mol_key(jin), $mol_key(new User()));
        },
        'Elements'() {
            const foo = $mol_jsx("div", null, "bar");
            $mol_assert_equal($mol_key(foo), $mol_key(foo));
            $mol_assert_unique($mol_key(foo), $mol_key($mol_jsx("div", null, "bar")));
        },
        'Custom JSON representation'() {
            class User {
                name;
                age;
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                toJSON() { return { name: this.name }; }
            }
            $mol_assert_equal($mol_key(new User('jin', 18)), '{"name":"jin"}');
        },
        'Special native classes'() {
            $mol_assert_equal($mol_key(new Date('xyz')), 'null');
            $mol_assert_equal($mol_key(new Date('2001-01-02T03:04:05.678Z')), '"2001-01-02T03:04:05.678Z"');
            $mol_assert_equal($mol_key(/./), '"/./"');
            $mol_assert_equal($mol_key(/\./gimsu), '"/\\\\./gimsu"');
        },
    });
})($ || ($ = {}));
//mol/key/key.test.tsx
;
"use strict";
var $;
(function ($) {
    $mol_wire_log.active();
})($ || ($ = {}));
//mol/wire/atom/atom.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'const returns stored value'() {
            const foo = { bar: $mol_const(Math.random()) };
            $mol_assert_equal(foo.bar(), foo.bar());
            $mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//mol/const/const.test.ts
;
"use strict";
//mol/type/keys/extract/extract.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'id auto generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                static $ = $;
                element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "element", null);
            var x = $mol_view_test_block.Root(0);
            $mol_assert_equal(x.dom_node().id, '$mol_view_test_block.Root(0)');
            $mol_assert_equal(x.element(0).dom_node().id, '$mol_view_test_block.Root(0).element(0)');
        },
        'caching ref to dom node'($) {
            var x = new class extends $mol_view {
            };
            x.$ = $;
            $mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render'($) {
            class $mol_view_test extends $mol_view {
                sub() {
                    return ['lol', 5];
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                Element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            x.$ = $;
            $mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes'($) {
            class $mol_view_test extends $mol_view {
                attr() {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.getAttribute('href'), '#haha');
            $mol_assert_equal(node.getAttribute('required'), 'true');
            $mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields'($) {
            class $mol_view_test extends $mol_view {
                field() {
                    return {
                        'hidden': true
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.hidden, true);
        },
        'attach event handlers'($) {
            var clicked = false;
            class $mol_view_test extends $mol_view {
                event() {
                    return {
                        'click': (next) => this.event_click(next)
                    };
                }
                event_click(next) {
                    clicked = true;
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_node();
            node.click();
            $mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//mol/view/view/view.test.ts
;
"use strict";
//mol/type/result/result.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_style_sheet_test1 extends $mol_view {
        Item() { return new $mol_view; }
    }
    $.$mol_style_sheet_test1 = $mol_style_sheet_test1;
    class $mol_style_sheet_test2 extends $mol_view {
        List() { return new $mol_style_sheet_test1; }
    }
    $.$mol_style_sheet_test2 = $mol_style_sheet_test2;
    $mol_test({
        'component block styles'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                display: 'block',
                zIndex: 1,
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tdisplay: block;\n\tz-index: 1;\n}\n');
        },
        'various units'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { px, per } = $mol_style_unit;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: per(50),
                height: px(50),
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: 50%;\n\theight: 50px;\n}\n');
        },
        'various functions'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { calc } = $mol_style_func;
            const { px, per } = $mol_style_unit;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: calc(`${per(100)} - ${px(1)}`),
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: calc(100% - 1px);\n}\n');
        },
        'property groups'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { px } = $mol_style_unit;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                flex: {
                    grow: 5
                }
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tflex-grow: 5;\n}\n');
        },
        'property shorthand'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { px } = $mol_style_unit;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                padding: [px(5), 'auto']
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tpadding: 5px auto;\n}\n');
        },
        'sequenced values'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { url } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                background: {
                    image: [[url('foo')], [url('bar')]],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbackground-image: url("foo"),url("bar");\n}\n');
        },
        'sequenced structs'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { rem } = $mol_style_unit;
            const { hsla } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                box: {
                    shadow: [
                        {
                            inset: true,
                            x: 0,
                            y: 0,
                            blur: rem(.5),
                            spread: 0,
                            color: 'red',
                        },
                        {
                            inset: false,
                            x: 0,
                            y: 0,
                            blur: rem(.5),
                            spread: 0,
                            color: 'blue',
                        },
                    ],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbox-shadow: inset 0 0 0.5rem 0 red,0 0 0.5rem 0 blue;\n}\n');
        },
        'component block styles with pseudo class'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                ':focus': {
                    color: 'red',
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test]:focus {\n\tcolor: red;\n\tdisplay: block;\n}\n');
        },
        'component block styles with pseudo element'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '::first-line': {
                    color: 'red',
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test]::first-line {\n\tcolor: red;\n\tdisplay: block;\n}\n');
        },
        'component block styles with media query'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '@media': {
                    'print': {
                        color: 'red',
                        display: 'block',
                    },
                },
            });
            $mol_assert_equal(sheet, '@media print {\n[mol_style_sheet_test] {\n\tcolor: red;\n\tdisplay: block;\n}\n}\n');
        },
        'component block styles with attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            color: 'red',
                            display: 'block',
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tcolor: red;\n\tdisplay: block;\n}\n');
        },
        'component element styles'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                Item: {
                    color: 'red',
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test_item] {\n\tcolor: red;\n\tdisplay: block;\n}\n');
        },
        'component element of element styles'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                List: {
                    Item: {
                        color: 'red',
                        display: 'block',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2_list_item] {\n\tcolor: red;\n\tdisplay: block;\n}\n');
        },
        'component element styles with block attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            Item: {
                                color: 'red',
                            },
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) :where([mol_style_sheet_test_item]) {\n\tcolor: red;\n}\n');
        },
        'inner component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                $mol_style_sheet_test1: {
                    color: 'red',
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] :where([mol_style_sheet_test1]) {\n\tcolor: red;\n\tdisplay: block;\n}\n');
        },
        'child component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                '>': {
                    $mol_style_sheet_test1: {
                        color: 'red',
                        display: 'block',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] > :where([mol_style_sheet_test1]) {\n\tcolor: red;\n\tdisplay: block;\n}\n');
        },
    });
})($ || ($ = {}));
//mol/style/sheet/sheet.test.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_attributes_super extends $mol_view {
        some() {
            return {
                a: 0,
                b: 2
            };
        }
    }
    $.$mol_view_tree_test_attributes_super = $mol_view_tree_test_attributes_super;
    class $mol_view_tree_test_attributes extends $mol_view_tree_test_attributes_super {
        some() {
            return {
                ...super.some(),
                a: 1
            };
        }
    }
    $.$mol_view_tree_test_attributes = $mol_view_tree_test_attributes;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/attributes.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_binding extends $mol_view {
        value(val) {
            return this.task_title_new(val);
        }
        enabled() {
            return this.head_complete_enabled();
        }
        task_title_new(val) {
            if (val !== undefined)
                return val;
            return "123";
        }
        head_complete_enabled() {
            return false;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding.prototype, "task_title_new", null);
    $.$mol_view_tree_test_binding = $mol_view_tree_test_binding;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/binding.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_binding_right extends $mol_view {
        outer_width(v) {
            return this.Test().width(v);
        }
        Test() {
            const obj = new this.$.$mol_view_tree_test_binding_right_test();
            return obj;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding_right.prototype, "Test", null);
    $.$mol_view_tree_test_binding_right = $mol_view_tree_test_binding_right;
    class $mol_view_tree_test_binding_right_test extends $mol_view {
        width(val) {
            if (val !== undefined)
                return val;
            return 0;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_view_tree_test_binding_right_test.prototype, "width", null);
    $.$mol_view_tree_test_binding_right_test = $mol_view_tree_test_binding_right_test;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/binding_right.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_simple extends $mol_view {
        some() {
            return 1;
        }
        bool() {
            return true;
        }
        str() {
            return "test";
        }
        arr() {
            return [];
        }
        arr_string() {
            return [];
        }
    }
    $.$mol_view_tree_test_simple = $mol_view_tree_test_simple;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/simple.test.view.tree.ts
;
"use strict";
var $;
(function ($) {
    class $mol_view_tree_test_attributes_subcomponent extends $mol_view {
        Page(id) {
            const obj = new this.$.$mol_view_tree_test_attributes_subcomponent_page();
            obj.Sub = () => this.page(id);
            return obj;
        }
        page(id) {
            return null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_view_tree_test_attributes_subcomponent.prototype, "Page", null);
    $.$mol_view_tree_test_attributes_subcomponent = $mol_view_tree_test_attributes_subcomponent;
    class $mol_view_tree_test_attributes_subcomponent_page extends $mol_view {
        Sub() {
            return null;
        }
    }
    $.$mol_view_tree_test_attributes_subcomponent_page = $mol_view_tree_test_attributes_subcomponent_page;
})($ || ($ = {}));
//mol/view/tree/test/-view.tree/subcomponent.test.view.tree.ts
;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            'simple props'($) {
                const app = $mol_view_tree_test_simple.make({ $ });
                $mol_assert_equal(app.some(), 1);
                $mol_assert_equal(app.bool(), true);
                $mol_assert_equal(app.str(), 'test');
                $mol_assert_ok(Array.isArray(app.arr()));
                $mol_assert_ok(Array.isArray(app.arr_string()));
            },
            'default value'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_equal(app.value(), '123');
            },
            'both binding'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_ok(app.value() !== '1');
                app.value('1');
                $mol_assert_equal(app.value(), '1');
            },
            'left binding'($) {
                const app = $mol_view_tree_test_binding.make({ $ });
                $mol_assert_not(app.head_complete_enabled());
                $mol_assert_not(app.enabled());
            },
            'sub component'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                $mol_assert_ok(app.Test() instanceof $mol_view_tree_test_binding_right_test);
            },
            'right binding - change owner property'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                const val = 123;
                $mol_assert_ok(app.outer_width() !== val);
                $mol_assert_ok(app.Test().width() !== val);
                app.outer_width(val);
                $mol_assert_equal(app.outer_width(), val);
                $mol_assert_equal(app.Test().width(), val);
            },
            'right binding - change part property'($) {
                const app = $mol_view_tree_test_binding_right.make({ $ });
                const val = 123;
                $mol_assert_ok(app.outer_width() !== val);
                $mol_assert_ok(app.Test().width() !== val);
                app.Test().width(val);
                $mol_assert_equal(app.Test().width(), val);
                $mol_assert_equal(app.outer_width(), val);
            },
            'attributes merging'($) {
                const app = $mol_view_tree_test_attributes.make({ $ });
                $mol_assert_like(app.some(), { a: 1, b: 2 });
            },
            'subcomponent indexed'($) {
                const app = $mol_view_tree_test_attributes_subcomponent.make({ $ });
                const val = 123;
                app.page = (index) => index;
                $mol_assert_equal(app.Page(val).Sub(), val);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));
//mol/view/tree/test/tree.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test_mocks.push(context => {
        class $mol_state_local_mock extends $mol_state_local {
            static state = {};
            static value(key, next = this.state[key]) {
                return this.state[key] = (next || null);
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_state_local_mock, "value", null);
        context.$mol_state_local = $mol_state_local_mock;
    });
})($ || ($ = {}));
//mol/state/local/local.mock.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'local get set delete'() {
            var key = '$mol_state_local_test:' + Math.random();
            $mol_assert_equal($mol_state_local.value(key), null);
            $mol_state_local.value(key, 123);
            $mol_assert_equal($mol_state_local.value(key), 123);
            $mol_state_local.value(key, null);
            $mol_assert_equal($mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//mol/state/local/local.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'decode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_equal($mol_charset_decode(encoded), str);
            $mol_assert_equal($mol_charset_decode(encoded, 'utf8'), str);
        },
        'decode empty string'() {
            const encoded = new Uint8Array([]);
            $mol_assert_equal($mol_charset_decode(encoded), '');
        },
    });
})($ || ($ = {}));
//mol/charset/decode/decode.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'encode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_like($mol_charset_encode(str), encoded);
        },
    });
})($ || ($ = {}));
//mol/charset/encode/encode.test.ts
;
"use strict";
var $;
(function ($) {
    class TestClass extends Uint8Array {
    }
    $mol_test({
        'Uint8Array vs itself'() {
            $mol_assert_ok($mol_compare_array(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_array(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_array(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Uint8Array vs subclassed array'() {
            $mol_assert_not($mol_compare_array(new Uint8Array, new TestClass));
        },
    });
})($ || ($ = {}));
//mol/compare/array/array.test.ts
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree_trim_remarks(def) {
        return def.transform(([node], sub) => (node.type === '-') ? null : node.clone({ sub: sub() }));
    }
    $.$mol_view_tree_trim_remarks = $mol_view_tree_trim_remarks;
    function $mol_view_tree_classes(defs) {
        return $mol_view_tree_trim_remarks(defs);
    }
    $.$mol_view_tree_classes = $mol_view_tree_classes;
    function $mol_view_tree_class_name(val) {
        return val.type;
    }
    $.$mol_view_tree_class_name = $mol_view_tree_class_name;
    function $mol_view_tree_super_name(val) {
        if (val.sub.length != 1)
            throw val.error('Wrong sub count');
        return val.sub[0].type;
    }
    $.$mol_view_tree_super_name = $mol_view_tree_super_name;
    function $mol_view_tree_class_props(def) {
        const props = {};
        const catch_prop = (prop, type = '') => {
            let def = prop;
            if (type === '=>') {
                if (prop.sub[0])
                    throw prop.error('Right binding can not have default value');
            }
            else {
                if (prop.sub.length === 0)
                    return;
                if (prop.sub[0].type === '-')
                    return;
                props[prop.type] = props[prop.type];
                def = prop.clone({
                    sub: [prop.sub[0].transform(([node, ...stack], sub) => {
                            if (['<=', '<=>', '=>'].indexOf(node.type) === -1)
                                return node.clone({ sub: sub() });
                            catch_prop(node.sub[0], node.type);
                            return node.clone({
                                sub: [node.sub[0].clone({
                                        sub: []
                                    })]
                            });
                        })]
                });
            }
            if (props[prop.type]) {
                if (props[prop.type].toString() !== def.toString()) {
                    throw def.error('Property already defined with another default value' + props[prop.type].error('').message + '\n---');
                }
            }
            else {
                props[prop.type] = def;
            }
        };
        def.sub[0].sub.map(sub => catch_prop(sub));
        return def.clone({
            type: '',
            sub: Object.keys(props).map(name => props[name]),
        });
    }
    $.$mol_view_tree_class_props = $mol_view_tree_class_props;
    function $mol_view_tree_prop_name(prop) {
        return (prop.type.match(/^\w+/) || [])[0] || '';
    }
    $.$mol_view_tree_prop_name = $mol_view_tree_prop_name;
    function $mol_view_tree_prop_key(prop) {
        return (prop.type.match(/!(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_key = $mol_view_tree_prop_key;
    function $mol_view_tree_prop_next(prop) {
        return (prop.type.match(/\?(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_next = $mol_view_tree_prop_next;
    function $mol_view_tree_prop_value(prop) {
        if (prop.sub.length != 1)
            throw prop.error(`Wrong sub count (${prop.sub.length})`);
        return prop.sub[0];
    }
    $.$mol_view_tree_prop_value = $mol_view_tree_prop_value;
    function $mol_view_tree_value_type(val) {
        switch (val.type) {
            case 'true': return 'bool';
            case 'false': return 'bool';
            case 'null': return 'null';
            case '*': return 'dict';
            case '@': return 'locale';
            case '': return 'string';
            case '<=': return 'get';
            case '<=>': return 'bind';
            case '=>': return 'put';
        }
        switch (val.type[0]) {
            case '/': return 'list';
            case '$': return 'object';
        }
        if (Number(val.type).toString() == val.type)
            return 'number';
        throw val.error('Wrong value');
    }
    $.$mol_view_tree_value_type = $mol_view_tree_value_type;
    function $mol_view_tree_compile(tree) {
        const splittedUri = tree.uri.split(/[#\\\/]/);
        splittedUri.pop();
        const fileName = splittedUri.pop();
        const SourceNode = (row, col, fileName, text) => text;
        var content = [];
        var locales = {};
        for (let def of $mol_view_tree_classes(tree).sub) {
            if (!/^\$\w+$/.test(def.type))
                throw def.error('Wrong component name');
            var parent = def.sub[0];
            var members = {};
            for (let param of $mol_view_tree_class_props(def).sub) {
                try {
                    var needSet = false;
                    var needCache = false;
                    if (param.type === '<=>') {
                        param = param.sub[0];
                    }
                    if (param.type === '<=') {
                        param = param.sub[0];
                    }
                    var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(param.type);
                    if (propName[3]) {
                        needSet = true;
                        needCache = true;
                    }
                    const getValue = (value, definition) => {
                        try {
                            switch (true) {
                                case (value.type === ''):
                                    return [JSON.stringify(value.value)];
                                case (value.type === '@'):
                                    const key = `${def.type}_${param.type.replace(/[?!].*/, '')}`;
                                    locales[key] = value.value;
                                    return [`this.$.$mol_locale.text( ${JSON.stringify(key)} )`];
                                case (value.type === '-'):
                                    return null;
                                case (value.type[0] === '/'):
                                    const item_type = value.type.substring(1);
                                    var items = [];
                                    value.sub.forEach(item => {
                                        if (item.type === '-')
                                            return;
                                        if (item.type === '^') {
                                            items.push(`...super.${param.type}()`);
                                            return;
                                        }
                                        var val = getValue(item);
                                        if (val)
                                            items.push(val.join(""));
                                    });
                                    return [`[`, items.join(' , '), `]`, (item_type ? ` as readonly ( ${item_type} )[]` : ` as readonly any[]`)];
                                case (value.type[0] === '$'):
                                    if (!definition)
                                        throw value.error('Objects should be bound');
                                    needCache = true;
                                    var overs = [];
                                    value.sub.forEach(over => {
                                        if (/^[-\/]?$/.test(over.type))
                                            return '';
                                        var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                        var ns = needSet;
                                        if (over.sub[0].type === '=>') {
                                            if (over.sub[0].sub.length === 1) {
                                                const [, own_name, own_key, own_next] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.sub[0].sub[0].type);
                                                let own_args = [];
                                                if (own_key)
                                                    own_args.push(` ${own_key} : any `);
                                                if (own_next)
                                                    own_args.push(` ${own_next}? : any `);
                                                let [, their_name, ...their_args] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                                their_args = their_args.filter(Boolean);
                                                members[own_name] = [`\t${own_name}(${own_args.join(',')}) {\n\t\treturn this.${propName[1]}(${propName[2] || ''}).${their_name}( ${their_args.join(' , ')} )\n\t}\n\n`];
                                                return;
                                            }
                                        }
                                        var v = getValue(over.sub[0]);
                                        let args = [];
                                        if (overName[2])
                                            args.push(` ${overName[2]} : any `);
                                        if (overName[3])
                                            args.push(` ${overName[3]}? : any `);
                                        overs.push(...['\t\t\tobj.', SourceNode(over.row, over.col, fileName, overName[1]), ' = (', args.join(','), ') => ', ...(v || []), '\n']);
                                        needSet = ns;
                                    });
                                    const object_args = value.select('/', '').sub.map(arg => getValue(arg)).join(' , ');
                                    return ['(( obj )=>{\n', ...overs, '\t\t\treturn obj\n\t\t})( new this.$.', SourceNode(value.row, value.col, fileName, value.type), '( ', object_args, ' ) )'];
                                case (value.type === '*'):
                                    var opts = [];
                                    value.sub.forEach(opt => {
                                        if (opt.type === '-')
                                            return '';
                                        if (opt.type === '^') {
                                            opts.push(`\t\t\t...super.${param.type}() ,\n`);
                                            return;
                                        }
                                        var key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        var ns = needSet;
                                        var v = getValue(opt.sub[0]);
                                        var arg = key[2] ? ` ( ${key[2]}? : any )=> ` : '';
                                        opts.push(...['\t\t\t"', SourceNode(opt.row, opt.col, fileName, key[1] + '" : '), arg, ' ', ...(v || []), ' ,\n']);
                                        needSet = ns;
                                    });
                                    return ['({\n', opts.join(''), '\t\t})'];
                                case (value.type === '<=>'):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return ['this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )'];
                                    }
                                    break;
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(value.sub[0].type);
                                        return ['this.' + type[1] + '(' + (type[2] ? type[2] : '') + ')'];
                                    }
                                    break;
                            }
                            switch (value.type) {
                                case 'true':
                                case 'false':
                                    return [value.type];
                                case 'null':
                                    return ['null as any'];
                            }
                            if (Number(value.type).toString() == value.type)
                                return [value.type];
                            throw value.error('Wrong value');
                        }
                        catch (err) {
                            throw err;
                        }
                    };
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    param.sub.forEach(child => {
                        var val = getValue(child, true);
                        if (!val)
                            return;
                        var args = [];
                        if (propName[2])
                            args.push(` ${propName[2]} : any `);
                        if (propName[3])
                            args.push(` ${propName[3]}? : any , force? : $${''}mol_mem_force `);
                        if (needSet)
                            val = [
                                `( ${propName[3]} !== void 0 ) ? ${propName[3]} : `,
                                ...val
                            ];
                        val = ['return ', ...val];
                        var decl = ['\t', SourceNode(param.row, param.col, fileName, propName[1]), '(', args.join(','), ') {\n\t\t', ...val, '\n\t}\n\n'];
                        if (needCache) {
                            if (propName[2])
                                decl = ['\t@ $', 'mol_mem_key\n', ...decl];
                            else
                                decl = ['\t@ $', 'mol_mem\n', ...decl];
                        }
                        decl = ['\t/**\n\t *  ```\n', param.toString().trim().replace(/^/mg, '\t *  '), '\n\t *  ```\n\t **/\n', ...decl];
                        members[propName[1]] = decl;
                    });
                }
                catch (err) {
                    throw err;
                }
            }
            var body = Object.keys(members).reduce(function (acc, name) {
                const items = members[name] ? members[name] : ['\t', name, '() { return null as any }\n\t}\n'];
                return [...acc, ...items];
            }, []);
            var classes = ['namespace $ { export class ', SourceNode(def.row, def.col, fileName, def.type), ' extends ', SourceNode(parent.row, parent.col, fileName, parent.type), ' {\n\n', ...body, '} }\n'];
            content = [...content, ...classes];
        }
        return { script: content.join(''), locales };
    }
    $.$mol_view_tree_compile = $mol_view_tree_compile;
})($ || ($ = {}));
//mol/view/tree/tree.ts
;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            'handle clicks by default'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_ok(clicked);
            },
            'no handle clicks if disabled'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                    enabled: () => false,
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_not(clicked);
            },
            'Store error'($) {
                const clicker = $mol_button.make({
                    $,
                    click: (event) => $.$mol_fail(new Error('Test error')),
                });
                const event = $mol_dom_context.document.createEvent('mouseevent');
                $mol_assert_fail(() => clicker.event_activate(event), 'Test error');
                $mol_assert_equal(clicker.status()[0].message, 'Test error');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));
//mol/button/button.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'all cases of using maybe'() {
            $mol_assert_equal($mol_maybe(0)[0], 0);
            $mol_assert_equal($mol_maybe(false)[0], false);
            $mol_assert_equal($mol_maybe(null)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0).map(v => v.toString())[0], void 0);
            $mol_assert_equal($mol_maybe(0).map(v => v.toString())[0], '0');
        },
    });
})($ || ($ = {}));
//mol/maybe/maybe.test.ts
;
"use strict";
//mol/type/merge/merge.test.ts
;
"use strict";
//mol/type/intersect/intersect.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'escape'() {
            const specials = $mol_regexp.from('.*+?^${}()|[]\\');
            $mol_assert_equal(specials.source, '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
        },
        'char code'() {
            const space = $mol_regexp.from(32);
            $mol_assert_like(' '.match(space), [' ']);
        },
        'repeat fixed'() {
            const { repeat, decimal_only: digit } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            $mol_assert_like('#2020#'.match(year), ['2020']);
        },
        'greedy repeat'() {
            const { repeat, repeat_greedy, latin_only: letter } = $mol_regexp;
            $mol_assert_like('abc'.match(repeat(letter, 1, 2)), ['a', 'b', 'c']);
            $mol_assert_like('abc'.match(repeat_greedy(letter, 1, 2)), ['ab', 'c']);
        },
        'repeat range'() {
            const { repeat_greedy, decimal_only: digit } = $mol_regexp;
            const year = repeat_greedy(digit, 2, 4);
            $mol_assert_like('#2#'.match(year), null);
            $mol_assert_like('#20#'.match(year), ['20']);
            $mol_assert_like('#2020#'.match(year), ['2020']);
            $mol_assert_like('#20201#'.match(year), ['2020']);
        },
        'repeat from'() {
            const { repeat_greedy, latin_only: letter } = $mol_regexp;
            const name = repeat_greedy(letter, 2);
            $mol_assert_like('##'.match(name), null);
            $mol_assert_like('#a#'.match(name), null);
            $mol_assert_like('#ab#'.match(name), ['ab']);
            $mol_assert_like('#abc#'.match(name), ['abc']);
        },
        'from string'() {
            const regexp = $mol_regexp.from('[\\d]');
            $mol_assert_equal(regexp.source, '\\[\\\\d\\]');
            $mol_assert_equal(regexp.flags, 'gsu');
        },
        'from regexp'() {
            const regexp = $mol_regexp.from(/[\d]/i);
            $mol_assert_equal(regexp.source, '[\\d]');
            $mol_assert_equal(regexp.flags, 'i');
        },
        'split'() {
            const regexp = $mol_regexp.from(';');
            $mol_assert_like('aaa;bbb;ccc'.split(regexp), ['aaa', ';', 'bbb', ';', 'ccc']);
            $mol_assert_like('aaa;;ccc'.split(regexp), ['aaa', ';', '', ';', 'ccc']);
            $mol_assert_like('aaa'.split(regexp), ['aaa']);
            $mol_assert_like(''.split(regexp), ['']);
        },
        'test for matching'() {
            const regexp = $mol_regexp.from('foo');
            $mol_assert_like(regexp.test(''), false);
            $mol_assert_like(regexp.test('fo'), false);
            $mol_assert_like(regexp.test('foo'), true);
            $mol_assert_like(regexp.test('foobar'), true);
            $mol_assert_like(regexp.test('barfoo'), true);
        },
        'case ignoring'() {
            const xxx = $mol_regexp.from('x', { ignoreCase: true });
            $mol_assert_like(xxx.flags, 'gisu');
            $mol_assert_like(xxx.exec('xx')[0], 'x');
            $mol_assert_like(xxx.exec('XX')[0], 'X');
        },
        'multiline mode'() {
            const { end, from } = $mol_regexp;
            const xxx = from(['x', end], { multiline: true });
            $mol_assert_like(xxx.exec('x\ny')[0], 'x');
            $mol_assert_like(xxx.flags, 'gmsu');
        },
        'flags override'() {
            const triplet = $mol_regexp.from($mol_regexp.from(/.../, { ignoreCase: true }), { multiline: true });
            $mol_assert_like(triplet.toString(), '/.../gmsu');
        },
        'sequence'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const date = from([begin, year, dash, month, dash, day, end]);
            $mol_assert_like(date.exec('2020-01-02')[0], '2020-01-02');
        },
        'optional'() {
            const name = $mol_regexp.from(['A', ['4']]);
            $mol_assert_equal('AB'.match(name)[0], 'A');
            $mol_assert_equal('A4'.match(name)[0], 'A4');
        },
        'anon variants'() {
            const name = $mol_regexp.from(['A', $mol_regexp.vary(['4', '5'])]);
            $mol_assert_equal('AB'.match(name), null);
            $mol_assert_equal('A4'.match(name)[0], 'A4');
            $mol_assert_equal('A5'.match(name)[0], 'A5');
        },
        'only groups'() {
            const regexp = $mol_regexp.from({ dog: '@' });
            $mol_assert_like([...'#'.matchAll(regexp)][0].groups, undefined);
            $mol_assert_like([...'@'.matchAll(regexp)][0].groups, { dog: '@' });
        },
        'catch skipped'() {
            const regexp = $mol_regexp.from(/(@)(\d?)/g);
            $mol_assert_like([...'[[@]]'.matchAll(regexp)].map(f => [...f]), [
                ['[['],
                ['@', '@', ''],
                [']]'],
            ]);
        },
        'enum variants'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from(Sex);
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'trans'.matchAll(sexism)][0].groups, undefined);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { male: '', female: 'female' });
        },
        'recursive only groups'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from({ Sex });
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { Sex: 'male', male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { Sex: 'female', male: '', female: 'female' });
        },
        'sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([begin, { year }, dash, { month }, dash, { day }, end]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'sequence with groups of mixed type'() {
            const prefix = '/';
            const postfix = '/';
            const regexp = $mol_regexp.from([{ prefix }, /(\w+)/, { postfix }, /([gumi]*)/]);
            $mol_assert_like([...'/foo/mi'.matchAll(regexp)], [
                Object.assign(["/foo/mi", "/", "foo", "/", "mi"], {
                    groups: {
                        prefix: '/',
                        postfix: '/',
                    },
                    index: 0,
                    input: "/",
                }),
            ]);
        },
        'recursive sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([
                begin, { date: [{ year }, dash, { month }] }, dash, { day }, end
            ]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                date: '2020-01',
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'parse multiple'() {
            const { decimal_only: digit, from } = $mol_regexp;
            const regexp = from({ digit });
            $mol_assert_like([...'123'.matchAll(regexp)].map(f => f.groups), [
                { digit: '1' },
                { digit: '2' },
                { digit: '3' },
            ]);
        },
        'named variants'() {
            const { begin, or, end, from } = $mol_regexp;
            const sexism = from([
                begin, 'sex = ', { sex: ['male', or, 'female'] }, end
            ]);
            $mol_assert_like([...'sex = male'.matchAll(sexism)][0].groups, { sex: 'male' });
            $mol_assert_like([...'sex = female'.matchAll(sexism)][0].groups, { sex: 'female' });
            $mol_assert_like([...'sex = malefemale'.matchAll(sexism)][0].groups, undefined);
        },
        'force after'() {
            const { latin_only: letter, force_after, from } = $mol_regexp;
            const regexp = from([letter, force_after('.')]);
            $mol_assert_like('x.'.match(regexp), ['x']);
            $mol_assert_like('x,'.match(regexp), null);
        },
        'forbid after'() {
            const { latin_only: letter, forbid_after, from } = $mol_regexp;
            const regexp = from([letter, forbid_after('.')]);
            $mol_assert_like('x.'.match(regexp), null);
            $mol_assert_like('x,'.match(regexp), ['x']);
        },
        'char except'() {
            const { char_except, latin_only, tab } = $mol_regexp;
            const name = char_except(latin_only, tab);
            $mol_assert_like('a'.match(name), null);
            $mol_assert_like('\t'.match(name), null);
            $mol_assert_like('('.match(name), ['(']);
        },
        'unicode only'() {
            const { unicode_only, from } = $mol_regexp;
            const name = from([
                unicode_only('Script', 'Cyrillic'),
                unicode_only('Hex_Digit'),
            ]);
            $mol_assert_like('FF'.match(name), null);
            $mol_assert_like('ФG'.match(name), null);
            $mol_assert_like('ФF'.match(name), ['ФF']);
        },
        'generate by optional with inner group'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { dog: '@' }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: false }), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'generate by optional with inner group with variants'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { animal: { dog: '@', fox: '&' } }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_equal(animals.generate({ fox: true }), '#^&');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'complex example'() {
            const { begin, end, char_only, char_range, latin_only, slash_back, repeat_greedy, from, } = $mol_regexp;
            const atom_char = char_only(latin_only, "!#$%&'*+/=?^`{|}~-");
            const atom = repeat_greedy(atom_char, 1);
            const dot_atom = from([atom, repeat_greedy(['.', atom])]);
            const name_letter = char_only(char_range(0x01, 0x08), 0x0b, 0x0c, char_range(0x0e, 0x1f), 0x21, char_range(0x23, 0x5b), char_range(0x5d, 0x7f));
            const quoted_pair = from([
                slash_back,
                char_only(char_range(0x01, 0x09), 0x0b, 0x0c, char_range(0x0e, 0x7f))
            ]);
            const name = repeat_greedy({ name_letter, quoted_pair });
            const quoted_name = from(['"', { name }, '"']);
            const local_part = from({ dot_atom, quoted_name });
            const domain = dot_atom;
            const mail = from([begin, local_part, '@', { domain }, end]);
            $mol_assert_equal('foo..bar@example.org'.match(mail), null);
            $mol_assert_equal('foo..bar"@example.org'.match(mail), null);
            $mol_assert_like([...'foo.bar@example.org'.matchAll(mail)][0].groups, {
                domain: "example.org",
                dot_atom: "foo.bar",
                name: "",
                name_letter: "",
                quoted_name: "",
                quoted_pair: "",
            });
            $mol_assert_like([...'"foo..bar"@example.org'.matchAll(mail)][0].groups, {
                dot_atom: "",
                quoted_name: '"foo..bar"',
                name: "foo..bar",
                name_letter: "r",
                quoted_pair: "",
                domain: "example.org",
            });
            $mol_assert_equal(mail.generate({ dot_atom: 'foo.bar', domain: 'example.org' }), 'foo.bar@example.org');
            $mol_assert_equal(mail.generate({ name: 'foo..bar', domain: 'example.org' }), '"foo..bar"@example.org');
            $mol_assert_fail(() => mail.generate({ dot_atom: 'foo..bar', domain: 'example.org' }), 'Wrong param: dot_atom=foo..bar');
        },
    });
})($ || ($ = {}));
//mol/regexp/regexp.test.ts
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_test({
            'Empty needle'() {
                const app = new $mol_dimmer;
                app.needle = () => '  ';
                app.haystack = () => 'foo  bar';
                $mol_assert_like(app.strings(), ['foo  bar']);
            },
            'Empty haystack'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo  bar';
                app.haystack = () => '';
                $mol_assert_like(app.strings(), ['']);
            },
            'Not found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' bar ';
                $mol_assert_like(app.strings(), [' bar ']);
            },
            'One found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' barfoo ';
                $mol_assert_like(app.strings(), [' bar', 'foo', ' ']);
            },
            'Multiple found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' foobarfoo foo';
                $mol_assert_like(app.strings(), [' ', 'foo', 'bar', 'foo', ' ', 'foo']);
            },
            'Fuzzy search'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo bar';
                app.haystack = () => ' barfoo ';
                $mol_assert_like(app.strings(), [' ', 'bar', '', 'foo', ' ']);
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mol/dimmer/dimmer.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        '$mol_syntax2_md_flow'() {
            const check = (input, right) => {
                const tokens = [];
                $mol_syntax2_md_flow.tokenize(input, (...token) => tokens.push(token));
                $mol_assert_like(tokens, right);
            };
            check('Hello,\nWorld..\r\n\r\n\nof Love!', [
                ['block', 'Hello,\n', ['Hello,', '\n'], 0],
                ['block', 'World..\r\n\r\n\n', ['World..', '\r\n\r\n\n'], 7],
                ['block', 'of Love!', ['of Love!', ''], 19],
            ]);
            check('# Header1\n\nHello!\n\n## Header2', [
                ['header', '# Header1\n\n', ['#', ' ', 'Header1', '\n\n'], 0],
                ['block', 'Hello!\n\n', ['Hello!', '\n\n'], 11],
                ['header', '## Header2', ['##', ' ', 'Header2', ''], 19],
            ]);
            check('```\nstart()\n```\n\n```jam.js\nrestart()\n```\n\nHello!\n\n```\nstop()\n```', [
                ['code', '```\nstart()\n```\n\n', ['```', '', 'start()\n', '```', '\n\n'], 0],
                ['code', '```jam.js\nrestart()\n```\n\n', ['```', 'jam.js', 'restart()\n', '```', '\n\n'], 17],
                ['block', 'Hello!\n\n', ['Hello!', '\n\n'], 42],
                ['code', '```\nstop()\n```', ['```', '', 'stop()\n', '```', ''], 50],
            ]);
            check('| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n| Cell11 | Cell12\n| Cell21 | Cell22\n', [
                ['table', '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n', ['| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n', '\n'], 0],
                ['table', '| Cell11 | Cell12\n| Cell21 | Cell22\n', ['| Cell11 | Cell12\n| Cell21 | Cell22\n', ''], 68],
            ]);
        },
    });
})($ || ($ = {}));
//mol/syntax2/md/md.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'null by default'() {
            const key = String(Math.random());
            $mol_assert_equal($mol_state_session.value(key), null);
        },
        'storing'() {
            const key = String(Math.random());
            $mol_state_session.value(key, '$mol_state_session_test');
            $mol_assert_equal($mol_state_session.value(key), '$mol_state_session_test');
            $mol_state_session.value(key, null);
            $mol_assert_equal($mol_state_session.value(key), null);
        },
    });
})($ || ($ = {}));
//mol/state/session/session.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'parse and serial'() {
            $mol_assert_equal(new $mol_time_duration('P42.1Y').toString(), 'P42.1YT');
            $mol_assert_equal(new $mol_time_duration('P42.1M').toString(), 'P42.1MT');
            $mol_assert_equal(new $mol_time_duration('P42.1D').toString(), 'P42.1DT');
            $mol_assert_equal(new $mol_time_duration('PT42.1h').toString(), 'PT42.1H');
            $mol_assert_equal(new $mol_time_duration('PT42.1m').toString(), 'PT42.1M');
            $mol_assert_equal(new $mol_time_duration('PT42.1s').toString(), 'PT42.1S');
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6.7s').toString(), 'P1Y2M3DT4H5M6.7S');
        },
        'format typed'() {
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6s').toString('P#Y#M#DT#h#m#s'), 'P1Y2M3DT4H5M6S');
        },
        'comparison'() {
            const iso = 'P1Y1M1DT1h1m1s';
            $mol_assert_like(new $mol_time_duration(iso), new $mol_time_duration(iso));
        },
    });
})($ || ($ = {}));
//mol/time/duration/duration.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'parse and serial'() {
            $mol_assert_equal(new $mol_time_moment('2014').toString(), '2014');
            $mol_assert_equal(new $mol_time_moment('2014-01').toString(), '2014-01');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').toString(), '2014-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03').toString(), '2014-01-02T03');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04').toString(), '2014-01-02T03:04');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05').toString(), '2014-01-02T03:04:05');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006').toString(), '2014-01-02T03:04:05.006');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006Z').toString(), '2014-01-02T03:04:05.006+00:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006+07:00').toString(), '2014-01-02T03:04:05.006+07:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05+07:08').toString(), '2014-01-02T03:04:05+07:08');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04+07:08').toString(), '2014-01-02T03:04+07:08');
            $mol_assert_equal(new $mol_time_moment('T03:04+07:08').toString(), 'T03:04+07:08');
            $mol_assert_equal(new $mol_time_moment('T03:04:05').toString(), 'T03:04:05');
            $mol_assert_equal(new $mol_time_moment('T03:04').toString(), 'T03:04');
            $mol_assert_equal(new $mol_time_moment('T03').toString(), 'T03');
        },
        'format simple'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03.000000').toString('AD YY-M-D h:m:s'), '21 14-1-2 1:2:3');
        },
        'format padded'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03.000').toString('YYYY-MM-DD hh:mm:ss'), '2014-01-02 01:02:03');
        },
        'format time zone'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03+05:00').toString('Z'), '+05:00');
        },
        'format names'() {
            $mol_assert_ok(new $mol_time_moment('2014-01-02T01:02:03.000').toString('Month Mon | WeekDay WD'));
        },
        'shifting'() {
            $mol_assert_equal(new $mol_time_moment('T15:54:58.243+03:00').shift({}).toString(), 'T15:54:58.243+03:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P1Y').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P12M').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P365D').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('PT8760h').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01').shift('PT8760h').toString(), '2015-01');
            $mol_assert_equal(new $mol_time_moment('2014-01').shift('PT-8760h').toString(), '2013-01');
        },
        'normalization'() {
            $mol_assert_equal(new $mol_time_moment({ year: 2015, month: 6, day: 34 }).normal.toString(), '2015-08-04');
        },
        'iso week day'() {
            $mol_assert_equal(new $mol_time_moment('2017-09-17').weekday, $mol_time_moment_weekdays.sunday);
            $mol_assert_equal(new $mol_time_moment('2017-09-18').weekday, $mol_time_moment_weekdays.monday);
        },
        'change offset'() {
            $mol_assert_equal(new $mol_time_moment('2021-04-10 +03:00').toOffset('Z').toString(), '2021-04-09T21:00:00+00:00');
        },
        'comparison'() {
            const iso = '2021-01-02T03:04:05.678+09:10';
            $mol_assert_like(new $mol_time_moment(iso), new $mol_time_moment(iso));
        },
    });
})($ || ($ = {}));
//mol/time/moment/moment.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'same list'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"));
            $mol_reconcile({
                prev: [...list.children],
                from: 0,
                to: 3,
                next: 'abc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                update: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_dom(list, $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c")));
        },
        'insert items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 3,
                next: 'bXYc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                update: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_dom(list, $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "new" }, "X"),
                $mol_jsx("p", { "data-rev": "new" }, "Y"),
                $mol_jsx("p", { "data-rev": "old" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d")));
        },
        'split item'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "bc"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 0,
                to: 3,
                next: 'abcd',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                update: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_dom(list, $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "new" }, "b"),
                $mol_jsx("p", { "data-rev": "up" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d")));
        },
        'drop items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "A"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "x"),
                $mol_jsx("p", { "data-rev": "old" }, "y"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "D"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 5,
                next: 'BC',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                update: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_dom(list, $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "A"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "D")));
        },
        'update items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 3,
                next: 'XY',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                update: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_dom(list, $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "up" }, "X"),
                $mol_jsx("p", { "data-rev": "up" }, "Y"),
                $mol_jsx("p", { "data-rev": "old" }, "d")));
        },
    });
})($ || ($ = {}));
//mol/reconcile/reconcile.test.tsx
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'empty string'() {
            $mol_assert_like(''.match($hyoo_crowd_tokenizer), null);
        },
        'new lines'() {
            $mol_assert_like('\n\r\n'.match($hyoo_crowd_tokenizer), ['\n', '\r\n']);
        },
        'numbers'() {
            $mol_assert_like('123'.match($hyoo_crowd_tokenizer), ['123']);
        },
        'emoji'() {
            $mol_assert_like('😀😁'.match($hyoo_crowd_tokenizer), ['😀', '😁']);
        },
        'emoji with modifier'() {
            $mol_assert_like('👩🏿👩🏿'.match($hyoo_crowd_tokenizer), ['👩🏿', '👩🏿']);
        },
        'combo emoji with modifier'() {
            $mol_assert_like('👩🏿‍🤝‍🧑🏿👩🏿‍🤝‍🧑🏿'.match($hyoo_crowd_tokenizer), ['👩🏿‍🤝‍🧑🏿', '👩🏿‍🤝‍🧑🏿']);
        },
        'word with spaces'() {
            $mol_assert_like('foo1  bar2'.match($hyoo_crowd_tokenizer), ['foo1', ' ', ' bar2']);
        },
        'word with diactric'() {
            $mol_assert_like('Е́е́'.match($hyoo_crowd_tokenizer), ['Е́е́']);
        },
        'word with punctuation'() {
            $mol_assert_like('foo--bar'.match($hyoo_crowd_tokenizer), ['foo', '--', 'bar']);
        },
        'CamelCase'() {
            $mol_assert_like('Foo1BAR2'.match($hyoo_crowd_tokenizer), ['Foo1', 'BAR2']);
        },
    });
})($ || ($ = {}));
//hyoo/crowd/tokenizer/tokenizer.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'string: Offset <=> Point'() {
            const store = $hyoo_crowd_land.make({});
            store.chief.as($hyoo_crowd_text).str('fooBar');
            const [first, second] = store.chief.units();
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .point_by_offset(0), [first.self, 0]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .offset_by_point([first.self, 0]), [first.self, 0]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .point_by_offset(3), [first.self, 3]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .offset_by_point([first.self, 3]), [first.self, 3]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .offset_by_point([first.self, 5]), [first.self, 5]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .point_by_offset(5), [second.self, 2]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .offset_by_point([second.self, 2]), [second.self, 5]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .point_by_offset(6), [second.self, 3]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .offset_by_point([second.self, 3]), [second.self, 6]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .point_by_offset(7), ['0_0', 1]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text)
                .offset_by_point(['0_0', 1]), ['0_0', 7]);
        },
        async 'text: Offset <=> Point'() {
            const store = $hyoo_crowd_land.make({});
            store.chief.as($hyoo_crowd_text).text('foo bar\n666 777');
            const [first, second] = store.chief.nodes($hyoo_crowd_text);
            $mol_assert_like(store.chief.as($hyoo_crowd_text).point_by_offset(0), [first.units()[0].self, 0]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text).offset_by_point([first.units()[0].self, 0]), [first.units()[0].self, 0]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text).point_by_offset(8), [first.units()[2].self, 1]);
            $mol_assert_like(store.chief.as($hyoo_crowd_text).offset_by_point([first.units()[2].self, 1]), [first.units()[2].self, 8]);
        },
    });
})($ || ($ = {}));
//hyoo/crowd/text/text.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'number'() {
            const dict = new $mol_dict();
            $mol_assert_equal(dict.get(123), undefined);
            $mol_assert_equal(dict.has(123), false);
            dict.set(123, 321);
            $mol_assert_equal(dict.get(123), 321);
            $mol_assert_equal(dict.has(123), true);
            dict.delete(123);
            $mol_assert_equal(dict.get(123), undefined);
            $mol_assert_equal(dict.has(123), false);
        },
        'pojo as key'() {
            const dict = new $mol_dict();
            $mol_assert_equal(dict.get({ foo: 123 }), undefined);
            $mol_assert_equal(dict.has({ foo: 123 }), false);
            dict.set({ foo: 123 }, 321);
            $mol_assert_equal(dict.get({ foo: 123 }), 321);
            $mol_assert_equal(dict.has({ foo: 123 }), true);
            dict.delete({ foo: 123 });
            $mol_assert_equal(dict.get({ foo: 123 }), undefined);
            $mol_assert_equal(dict.has({ foo: 123 }), false);
        },
        'array as key'() {
            const dict = new $mol_dict();
            $mol_assert_equal(dict.get([123]), undefined);
            $mol_assert_equal(dict.has([123]), false);
            dict.set([123], 321);
            $mol_assert_equal(dict.get([123]), 321);
            $mol_assert_equal(dict.has([123]), true);
            dict.delete([123]);
            $mol_assert_equal(dict.get([123]), undefined);
            $mol_assert_equal(dict.has([123]), false);
        },
        'html element as key'() {
            const el = $mol_jsx("div", null);
            const dict = new $mol_dict();
            $mol_assert_equal(dict.get(el), undefined);
            $mol_assert_equal(dict.has(el), false);
            dict.set(el, 321);
            $mol_assert_equal(dict.get(el), 321);
            $mol_assert_equal(dict.has(el), true);
            $mol_assert_equal(dict.get($mol_jsx("div", null)), undefined);
            $mol_assert_equal(dict.has($mol_jsx("div", null)), false);
            dict.delete(el);
            $mol_assert_equal(dict.get(el), undefined);
            $mol_assert_equal(dict.has(el), false);
        },
        'for-of key restore'() {
            const dict = new $mol_dict([[[123], 321]]);
            const keys = [];
            const vals = [];
            for (const [key, val] of dict) {
                keys.push(key);
                vals.push(val);
            }
            $mol_assert_like(keys, [[123]]);
            $mol_assert_like(vals, [321]);
        },
        'method iterators key restore'() {
            const dict = new $mol_dict([[[123], 321]]);
            $mol_assert_like([...dict.keys()], [[123]]);
            $mol_assert_like([...dict.values()], [321]);
            $mol_assert_like([...dict.entries()], [[[123], 321]]);
        },
        'forEach key restore'() {
            const dict = new $mol_dict([[[123], 321]]);
            const keys = [];
            const vals = [];
            dict.forEach((val, key) => {
                keys.push(key);
                vals.push(val);
            });
            $mol_assert_like(keys, [[123]]);
            $mol_assert_like(vals, [321]);
        },
    });
})($ || ($ = {}));
//mol/dict/dict.test.tsx
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'config by value'() {
            const N = $mol_data_setup((a) => a, 5);
            $mol_assert_equal(N.config, 5);
        },
    });
})($ || ($ = {}));
//mol/data/setup/setup.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'equal paths'() {
            const diff = $mol_diff_path([1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]);
            $mol_assert_like(diff, {
                prefix: [1, 2, 3, 4],
                suffix: [[], [], []],
            });
        },
        'different suffix'() {
            const diff = $mol_diff_path([1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 5, 4]);
            $mol_assert_like(diff, {
                prefix: [1, 2],
                suffix: [[3, 4], [3, 5], [5, 4]],
            });
        },
        'one contains other'() {
            const diff = $mol_diff_path([1, 2, 3, 4], [1, 2], [1, 2, 3]);
            $mol_assert_like(diff, {
                prefix: [1, 2],
                suffix: [[3, 4], [], [3]],
            });
        },
        'fully different'() {
            const diff = $mol_diff_path([1, 2], [3, 4], [5, 6]);
            $mol_assert_like(diff, {
                prefix: [],
                suffix: [[1, 2], [3, 4], [5, 6]],
            });
        },
    });
})($ || ($ = {}));
//mol/diff/path/path.test.ts
;
"use strict";
var $;
(function ($) {
    let sex;
    (function (sex) {
        sex[sex["male"] = 0] = "male";
        sex[sex["female"] = 1] = "female";
    })(sex || (sex = {}));
    let gender;
    (function (gender) {
        gender["bisexual"] = "bisexual";
        gender["trans"] = "transgender";
    })(gender || (gender = {}));
    $mol_test({
        'config of enum'() {
            const Sex = $mol_data_enum('sex', sex);
            $mol_assert_like(Sex.config, {
                name: 'sex',
                dict: sex,
            });
        },
        'name of enum'() {
            const Sex = $mol_data_enum('sex', sex);
            $mol_assert_equal(Sex.config.name, 'sex');
        },
        'Is right value of enum'() {
            const Sex = $mol_data_enum('sex', sex);
            $mol_assert_equal(Sex(0), sex.male);
        },
        'Is wrong value of enum'() {
            const Sex = $mol_data_enum('sex', sex);
            $mol_assert_fail(() => Sex(2), `2 is not value of sex enum`);
        },
        'Is name instead of value'() {
            const Sex = $mol_data_enum('sex', sex);
            $mol_assert_fail(() => Sex('male'), `male is not value of sex enum`);
        },
        'Is common object field'() {
            const Sex = $mol_data_enum('sex', sex);
            $mol_assert_fail(() => Sex('__proto__'), `__proto__ is not value of sex enum`);
        },
    });
    $mol_test({
        'config of enum'() {
            const Gender = $mol_data_enum('gender', gender);
            $mol_assert_like(Gender.config, {
                name: 'gender',
                dict: gender,
            });
        },
        'Is right value of enum'() {
            const Gender = $mol_data_enum('gender', gender);
            $mol_assert_equal(Gender('transgender'), gender.trans);
        },
        'Is wrong value of enum'() {
            const Gender = $mol_data_enum('gender', gender);
            $mol_assert_fail(() => Gender('xxx'), `xxx is not value of gender enum`);
        },
        'Is name instead of value'() {
            const Gender = $mol_data_enum('gender', gender);
            $mol_assert_fail(() => Gender('trans'), `trans is not value of gender enum`);
        },
        'Is common object field'() {
            const Gender = $mol_data_enum('gender', gender);
            $mol_assert_fail(() => Gender('__proto__'), `__proto__ is not value of gender enum`);
        },
    });
})($ || ($ = {}));
//mol/data/enum/enum.test.ts
;
"use strict";
var $;
(function ($_1) {
    const common = [
        $mol_int62_to_string({
            lo: 12 << 0 | 13 << 8 | 14 << 16 | 15 << 24,
            hi: 13 << 0 | 14 << 8 | 15 << 16 | 16 << 24,
        }),
        $mol_int62_to_string({
            lo: 2 << 0 | 3 << 8 | 4 << 16 | 5 << 24,
            hi: 3 << 0 | 4 << 8 | 5 << 16 | 6 << 24,
        }),
        $mol_int62_to_string({
            lo: 4 << 0 | 5 << 8 | 6 << 16 | 7 << 24,
            hi: 5 << 0 | 6 << 8 | 7 << 16 | 8 << 24,
        }),
        $mol_int62_to_string({
            lo: 10 << 0 | 11 << 8 | 12 << 16 | 13 << 24,
            hi: 11 << 0 | 12 << 8 | 13 << 16 | 14 << 24,
        }),
        $mol_int62_to_string({
            lo: 6 << 0 | 7 << 8 | 8 << 16 | 9 << 24,
            hi: 7 << 0 | 8 << 8 | 9 << 16 | 10 << 24,
        }),
        $mol_int62_to_string({
            lo: 8 << 0 | 9 << 8 | 10 << 16 | 11 << 24,
            hi: 9 << 0 | 10 << 8 | 11 << 16 | 12 << 24,
        }),
        1 << 0 | 2 << 8 | 3 << 16 | 4 << 24,
    ];
    $mol_test({
        'pack and unpack unit with null'($) {
            const source = new $hyoo_crowd_unit(...common, null, null);
            const packed = $hyoo_crowd_unit_bin.from_unit(source);
            const unpacked = packed.unit();
            source.bin = packed;
            $mol_assert_like(source, unpacked);
        },
        'pack and unpack unit with json'($) {
            const source = new $hyoo_crowd_unit(...common, { a: [1] }, null);
            const packed = $hyoo_crowd_unit_bin.from_unit(source);
            const unpacked = packed.unit();
            source.bin = packed;
            $mol_assert_like(source, unpacked);
        },
        'pack and unpack unit with bin'($) {
            const source = new $hyoo_crowd_unit(...common, new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]), null);
            const packed = $hyoo_crowd_unit_bin.from_unit(source);
            const unpacked = packed.unit();
            source.bin = packed;
            $mol_assert_like(source, unpacked);
        },
        async 'sign / verify'($) {
            const source = new $hyoo_crowd_unit(...common, { a: [1] }, null);
            const packed = $hyoo_crowd_unit_bin.from_unit(source);
            const key = await $.$mol_crypto_auditor_pair();
            packed.sign(new Uint8Array(await key.private.sign(packed.sens())));
            const sign = packed.sign();
            $mol_assert_ok(await key.public.verify(packed.sens(), sign));
        },
    });
})($ || ($ = {}));
//hyoo/crowd/unit/unit.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'fresh'() {
            const clock = new $hyoo_crowd_clock;
            clock.see_peer('b_33', 1);
            clock.see_peer('m_66', 2);
            $mol_assert_ok(clock.fresh('m_66', 3));
            $mol_assert_ok(clock.fresh('x_99', 1));
            $mol_assert_not(clock.fresh('m_66', 1));
        },
        'fork'() {
            const left = new $hyoo_crowd_clock;
            left.see_peer('b_33', 1);
            left.see_peer('m_66', 2);
            const right = new $hyoo_crowd_clock(left);
            $mol_assert_equal(right.last_time, 2);
            $mol_assert_like([...right], [
                ['b_33', 1],
                ['m_66', 2],
            ]);
        },
        'generate'() {
            const clock = new $hyoo_crowd_clock;
            clock.see_peer('b_33', $mol_int62_min + 1);
            clock.see_peer('m_66', $mol_int62_min + 2);
            const now = clock.now();
            const time1 = clock.tick('b_33');
            $mol_assert_like(time1, now);
            $mol_assert_like(clock.last_time, now);
            clock.see_peer('m_66', clock.now() + 10);
            const time2 = clock.tick('m_66');
            $mol_assert_like(time2, now + 11);
            $mol_assert_like(clock.last_time, now + 11);
        },
        'ahead'() {
            const clock1 = new $hyoo_crowd_clock;
            clock1.see_peer('b_33', 1);
            clock1.see_peer('m_66', 2);
            const clock2 = new $hyoo_crowd_clock;
            clock2.see_peer('b_33', 1);
            clock2.see_peer('x_99', 2);
            const clock3 = new $hyoo_crowd_clock;
            clock3.see_peer('b_33', 1);
            clock3.see_peer('m_66', 2);
            clock3.see_peer('x_99', 2);
            $mol_assert_ok(clock1.ahead(clock2));
            $mol_assert_ok(clock2.ahead(clock1));
            $mol_assert_ok(clock3.ahead(clock1));
            $mol_assert_ok(clock3.ahead(clock2));
            $mol_assert_not(clock1.ahead(clock3));
            $mol_assert_not(clock2.ahead(clock3));
        },
        'bin'() {
            const clocks1 = [new $hyoo_crowd_clock, new $hyoo_crowd_clock];
            clocks1[$hyoo_crowd_unit_group.auth].see_peer('b_33', 1);
            clocks1[$hyoo_crowd_unit_group.data].see_peer('b_33', 2);
            const bin = $hyoo_crowd_clock_bin.from('2_b', clocks1);
            $mol_assert_like(bin.land(), '2_b');
            const clocks2 = [new $hyoo_crowd_clock, new $hyoo_crowd_clock];
            clocks2[$hyoo_crowd_unit_group.auth].see_bin(bin, $hyoo_crowd_unit_group.auth);
            clocks2[$hyoo_crowd_unit_group.data].see_bin(bin, $hyoo_crowd_unit_group.data);
            $mol_assert_like(clocks2.map(clock => new Map(clock)), [
                new Map([
                    ['b_33', 1],
                ]),
                new Map([
                    ['b_33', 2],
                ]),
            ]);
        },
    });
})($ || ($ = {}));
//hyoo/crowd/clock/clock.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'world delta & apply'() {
            const world1 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const land1 = await world1.grab();
            const land2 = await world1.grab();
            land1.chief.as($hyoo_crowd_list).list([123, 456]);
            land2.chief.as($hyoo_crowd_list).list([456, 789]);
            for await (const batch of world1.delta()) {
                $mol_assert_like((await world2.apply(batch)).forbid, new Map);
            }
            $mol_assert_like(world2.land(land1.id()).chief.as($hyoo_crowd_list).list(), [123, 456]);
            $mol_assert_like(world2.land(land2.id()).chief.as($hyoo_crowd_list).list(), [456, 789]);
        },
        async 'land delta & apply'() {
            const world1 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const land = world1.land(world1.peer.id);
            land.chief.as($hyoo_crowd_list).list([123, 456]);
            const batch = await world1.delta_batch(land);
            $mol_assert_like((await world2.apply(batch)).forbid, new Map);
            $mol_assert_like(world2.land(land.id()).chief.as($hyoo_crowd_list).list(), [123, 456]);
        },
        async 'ignore changes from far future'() {
            const world1 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const land = await world1.grab();
            const clock = land.clock_data;
            clock.see_time(clock.now() + 60 * 60 * 24 * 10);
            land.chief.as($hyoo_crowd_reg).numb(123);
            const batch = await world1.delta_batch(land);
            $mol_assert_like([...(await world2.apply(batch)).forbid.values()], ['Far future']);
            $mol_assert_like(world2.land(land.id()).delta().length, 3);
        },
        async 'ignore auth as another peer'() {
            const world1 = new $hyoo_crowd_world({ ...await $hyoo_crowd_peer.generate(), id: '1_1' });
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const land = await world1.grab();
            land.chief.as($hyoo_crowd_reg).numb(123);
            const batch = await world1.delta_batch(land);
            $mol_assert_like([...(await world2.apply(batch)).forbid.values()], ['Alien join key', 'No auth key']);
            $mol_assert_like(world2.land(land.id()).delta().length, 2);
        },
        async 'ignore auth without key'() {
            const world1 = new $hyoo_crowd_world({ ...await $hyoo_crowd_peer.generate(), key_public_serial: [] });
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const land = world1.land('1_1');
            land.chief.as($hyoo_crowd_reg).numb(123);
            const batch = await world1.delta_batch(land);
            $mol_assert_like([...(await world2.apply(batch)).forbid.values()], ['No join key', 'Level too low']);
            $mol_assert_like(world2.land(land.id()).delta().length, 0);
        },
        async 'ignore changes with wrong signs'() {
            const world1 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const land = await world1.grab();
            const batch = await world1.delta_batch(land);
            batch[152] = ~batch[152];
            $mol_assert_like([...(await world2.apply(batch)).forbid.values()], ['Wrong join sign', 'Level too low']);
            $mol_assert_like(world2.land(land.id()).delta().length, 0);
        },
        async 'ignore update auth'() {
            const peer = await $hyoo_crowd_peer.generate();
            const world1 = new $hyoo_crowd_world(peer);
            const world2 = new $hyoo_crowd_world(peer);
            const land = await world1.grab();
            land.chief.as($hyoo_crowd_reg).numb(123);
            world2.land(land.id()).chief.as($hyoo_crowd_reg).numb(234);
            const batch = await world1.delta_batch(land);
            $mol_assert_like([...(await world2.apply(batch)).forbid.values()], ['Already join']);
            $mol_assert_like(world2.land(land.id()).delta().length, 5);
        },
        async 'levels'() {
            const world1 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const peer = await $hyoo_crowd_peer.generate();
            const land1 = await world1.grab();
            const land2 = world2.land(land1.id());
            land1.chief.sub('foo', $hyoo_crowd_reg).numb(123);
            for await (const batch of world1.delta()) {
                $mol_assert_like([...(await world2.apply(batch)).forbid.values()], []);
            }
            land2.chief.sub('foo', $hyoo_crowd_reg).numb(234);
            land2.chief.sub('bar', $hyoo_crowd_reg).numb(234);
            land2.level(peer.id, $hyoo_crowd_peer_level.law);
            $mol_assert_like(land1.delta().length, 4);
            level_get: {
                const batch = await world2.delta_batch(land2);
                $mol_assert_like([...(await world1.apply(batch)).forbid.values()], ['Already join', 'Already join', 'Level too low', 'Level too low', 'Level too low']);
                $mol_assert_like(land1.delta().length, 5);
                $mol_assert_like(land1.chief.sub('foo', $hyoo_crowd_reg).numb(), 123);
                $mol_assert_like(land1.chief.sub('bar', $hyoo_crowd_reg).numb(), 0);
                $mol_assert_like(land1.level(peer.id), $hyoo_crowd_peer_level.get);
            }
            level_add: {
                land1.level(land2.peer().id, $hyoo_crowd_peer_level.add);
                const batch = await world2.delta_batch(land2);
                $mol_assert_like([...(await world1.apply(batch)).forbid.values()], ['Already join', 'Already join', 'Already join', 'Level too low', 'Level too low']);
                $mol_assert_like(land1.delta().length, 7);
                $mol_assert_like(land1.chief.sub('foo', $hyoo_crowd_reg).numb(), 123);
                $mol_assert_like(land1.chief.sub('bar', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.level(peer.id), $hyoo_crowd_peer_level.get);
            }
            level_mod: {
                land1.level(land2.peer().id, $hyoo_crowd_peer_level.mod);
                const batch = await world2.delta_batch(land2);
                $mol_assert_like([...(await world1.apply(batch)).forbid.values()], ['Already join', 'Already join', 'Already join', 'Level too low']);
                $mol_assert_like(land1.delta().length, 7);
                $mol_assert_like(land1.chief.sub('foo', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.chief.sub('bar', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.level(peer.id), $hyoo_crowd_peer_level.get);
            }
            level_law: {
                land1.level(land2.peer().id, $hyoo_crowd_peer_level.law);
                const batch = await world2.delta_batch(land2);
                $mol_assert_like([...(await world1.apply(batch)).forbid.values()], ['Already join', 'Already join', 'Already join']);
                $mol_assert_like(land1.delta().length, 8);
                $mol_assert_like(land1.chief.sub('foo', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.chief.sub('bar', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.level(peer.id), $hyoo_crowd_peer_level.law);
            }
        },
        async 'default level'() {
            const world1 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const world2 = new $hyoo_crowd_world(await $hyoo_crowd_peer.generate());
            const peer = await $hyoo_crowd_peer.generate();
            const land1 = await world1.grab();
            const land2 = world2.land(land1.id());
            land1.chief.sub('foo', $hyoo_crowd_reg).numb(123);
            const batch = await world1.delta_batch(land1);
            $mol_assert_like([...(await world2.apply(batch)).forbid.values()], []);
            land2.chief.sub('foo', $hyoo_crowd_reg).numb(234);
            land2.chief.sub('bar', $hyoo_crowd_reg).numb(234);
            land2.level(peer.id, $hyoo_crowd_peer_level.law);
            $mol_assert_like(land1.delta().length, 4);
            level_add: {
                land1.level_base($hyoo_crowd_peer_level.add);
                const batch = await world2.delta_batch(land2);
                $mol_assert_like([...(await world1.apply(batch)).forbid.values()], ['Already join', 'Already join', 'Level too low', 'Level too low']);
                $mol_assert_like(land1.delta().length, 7);
                $mol_assert_like(land1.chief.sub('foo', $hyoo_crowd_reg).numb(), 123);
                $mol_assert_like(land1.chief.sub('bar', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.level(peer.id), $hyoo_crowd_peer_level.add);
            }
            level_mod: {
                land1.level_base($hyoo_crowd_peer_level.mod);
                const batch = await world2.delta_batch(land2);
                $mol_assert_like([...(await world1.apply(batch)).forbid.values()], ['Already join', 'Already join', 'Already join', 'Level too low']);
                $mol_assert_like(land1.delta().length, 7);
                $mol_assert_like(land1.chief.sub('foo', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.chief.sub('bar', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.level(peer.id), $hyoo_crowd_peer_level.mod);
            }
            level_law: {
                land1.level_base($hyoo_crowd_peer_level.law);
                const batch = await world2.delta_batch(land2);
                $mol_assert_like([...(await world1.apply(batch)).forbid.values()], ['Already join', 'Already join', 'Already join']);
                $mol_assert_like(land1.delta().length, 8);
                $mol_assert_like(land1.chief.sub('foo', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.chief.sub('bar', $hyoo_crowd_reg).numb(), 234);
                $mol_assert_like(land1.level(peer.id), $hyoo_crowd_peer_level.law);
            }
        },
    });
})($ || ($ = {}));
//hyoo/crowd/world/world.test.ts
;
"use strict";
var $;
(function ($) {
    async function make_land(id = '2_b') {
        return $hyoo_crowd_land.make({
            id: $mol_const(id),
            peer: $mol_const(await $hyoo_crowd_peer.generate()),
        });
    }
    $mol_test({
        async 'Default state'() {
            const store = await make_land();
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), null);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).bool(), false);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).numb(), 0);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).str(), '');
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), []);
            $mol_assert_like(store.delta(), []);
        },
        async 'Return default state'() {
            const store = await make_land();
            const reg = store.chief.as($hyoo_crowd_reg);
            const list = store.chief.as($hyoo_crowd_list);
            const text = store.chief.as($hyoo_crowd_text);
            $mol_assert_like(reg.bool(false), false);
            $mol_assert_like(reg.str(''), '');
            $mol_assert_like(reg.numb(0), 0);
            $mol_assert_like(text.str(''), '');
            $mol_assert_like(reg.value(null), null);
            $mol_assert_like(list.list(), []);
        },
        async 'Serial changes'() {
            const store = await make_land();
            Object.assign(store.peer(), { key_public_serial: null });
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), null);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), []);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).bool(), false);
            store.chief.as($hyoo_crowd_reg).bool(true);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), true);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), [true]);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).numb(), 1);
            store.chief.as($hyoo_crowd_reg).numb(1);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), 1);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), [1]);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).str(), '1');
            store.chief.as($hyoo_crowd_reg).str('x');
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), 'x');
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['x']);
            store.chief.as($hyoo_crowd_reg).value(null);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), null);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), []);
            $mol_assert_like(store.delta().map(unit => unit.data), [null]);
        },
        async 'Name spaces'() {
            const store = await make_land();
            store.chief.sub('foo', $hyoo_crowd_struct).sub('bar', $hyoo_crowd_reg).numb(111);
            store.chief.sub('foo', $hyoo_crowd_struct).sub('ton', $hyoo_crowd_reg).numb(222);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), []);
            $mol_assert_like(store.chief.sub('foo', $hyoo_crowd_list).list(), []);
            $mol_assert_like(store.chief.sub('foo', $hyoo_crowd_struct).sub('bar', $hyoo_crowd_list).list(), [111]);
            $mol_assert_like(store.chief.sub('foo', $hyoo_crowd_struct).sub('ton', $hyoo_crowd_list).list(), [222]);
        },
        async 'Name spaces merging'() {
            const left = await make_land();
            left.chief.sub('foo', $hyoo_crowd_list).list([111]);
            const right = await make_land('a_2');
            right.clock_data.tick(right.peer().id);
            right.chief.sub('foo', $hyoo_crowd_list).list([222]);
            const left_delta = left.delta();
            const right_delta = right.delta();
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.sub('foo', $hyoo_crowd_list).list(), right.chief.sub('foo', $hyoo_crowd_list).list(), [222, 111]);
        },
        async 'Ignore same changes'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_reg).str('foo');
            const time = store.clock_data.last_time;
            store.chief.as($hyoo_crowd_reg).str('foo');
            store.chief.as($hyoo_crowd_list).list(['foo']);
            $mol_assert_like(store.delta().map(unit => unit.time), [time, time]);
        },
        async 'Serial insert values'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_list).insert(['foo']);
            store.chief.as($hyoo_crowd_list).insert(['bar']);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['foo', 'bar']);
        },
        async 'Concurent insert values'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_list).insert(['foo'], 0);
            store.chief.as($hyoo_crowd_list).insert(['bar'], 0);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['bar', 'foo']);
        },
        async 'Insert value between others'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_list).insert(['foo']);
            store.chief.as($hyoo_crowd_list).insert(['bar']);
            store.chief.as($hyoo_crowd_list).insert(['lol'], 1);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['foo', 'lol', 'bar']);
        },
        async 'Insert value inside other'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_list).insert(['foo']);
            store.chief.nodes($hyoo_crowd_list)[0].insert(['bar']);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['foo']);
            $mol_assert_like(store.chief.nodes($hyoo_crowd_list)[0].list(), ['bar']);
        },
        async 'Insert before removed before changed'() {
            const store = await make_land();
            const node = store.chief.as($hyoo_crowd_list);
            node.list(['foo', 'bar']);
            node.list(['xxx', 'foo', 'bar']);
            node.list(['xxx', 'bars']);
            $mol_assert_like(node.list(), ['xxx', 'bars']);
        },
        async 'Move existen Unit'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('FooBarLol');
            store.chief.as($hyoo_crowd_list).move(0, 2);
            $mol_assert_like(store.chief.as($hyoo_crowd_text).str(), 'BarFooLol');
        },
        async 'Deltas for different versions'() {
            const store = await make_land();
            Object.assign(store.peer(), { key_public_serial: null });
            store.clock_data.see_time(store.clock_data.now() + 60);
            store.chief.as($hyoo_crowd_list).list(['foo', 'bar', 'lol']);
            $mol_assert_like(store.delta([
                new $hyoo_crowd_clock,
                new $hyoo_crowd_clock([
                    [store.peer().id, store.clock_data.last_time - 3],
                ])
            ]).map(unit => unit.data), ['foo', 'bar', 'lol']);
            $mol_assert_like(store.delta([
                new $hyoo_crowd_clock,
                new $hyoo_crowd_clock([
                    [store.peer().id, store.clock_data.last_time - 2],
                ])
            ]).map(unit => unit.data), ['bar', 'lol']);
            $mol_assert_like(store.delta([
                new $hyoo_crowd_clock,
                new $hyoo_crowd_clock([
                    [store.peer().id, store.clock_data.last_time - 1],
                ])
            ]).map(unit => unit.data), ['lol']);
            $mol_assert_like(store.delta([
                new $hyoo_crowd_clock,
                new $hyoo_crowd_clock([
                    [store.peer().id, store.clock_data.last_time],
                ])
            ]), []);
        },
        async 'Delete without subtree and ignore inserted into deleted'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('foo');
            const b2 = store.chief.nodes($hyoo_crowd_text)[0];
            b2.str('bar');
            const b3 = b2.nodes($hyoo_crowd_text)[0];
            b3.str('lol');
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), 'foo');
            $mol_assert_like(b2.as($hyoo_crowd_reg).value(), 'bar');
            $mol_assert_like(b3.as($hyoo_crowd_reg).value(), 'lol');
            store.chief.as($hyoo_crowd_list).cut(0);
            $mol_assert_like(store.chief.as($hyoo_crowd_reg).value(), null);
            $mol_assert_like(b2.as($hyoo_crowd_reg).value(), 'bar');
            $mol_assert_like(b3.as($hyoo_crowd_reg).value(), 'lol');
        },
        async 'Put/get list'() {
            const store = await make_land();
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), []);
            store.chief.as($hyoo_crowd_list).list(['foo', 'bar', 'foo']);
            const first = store.chief.nodes($hyoo_crowd_list)[0];
            first.list(['bar', 'foo', 'bar']);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['foo', 'bar', 'foo']);
            $mol_assert_like(first.list(), ['bar', 'foo', 'bar']);
        },
        async 'Put/get text'() {
            const store1 = await make_land();
            store1.chief.as($hyoo_crowd_text).str('foo bar foo');
            $mol_assert_like(store1.chief.as($hyoo_crowd_text).str(), 'foo bar foo');
            $mol_assert_like(store1.chief.as($hyoo_crowd_list).list(), ['foo', ' bar', ' foo']);
            const store2 = store1.fork(await $hyoo_crowd_peer.generate());
            store2.chief.as($hyoo_crowd_text).str('barFFFoo  bar');
            $mol_assert_like(store2.chief.as($hyoo_crowd_text).str(), 'barFFFoo  bar');
            $mol_assert_like(store2.chief.as($hyoo_crowd_list).list(), ['bar', 'FFFoo', ' ', ' bar']);
        },
        async 'Text modifications'() {
            const store1 = await make_land();
            store1.chief.as($hyoo_crowd_text).str('foo bar');
            const store2 = store1.fork(await $hyoo_crowd_peer.generate());
            store2.chief.as($hyoo_crowd_text).str('foo  bar');
            $mol_assert_like(store1.chief.units().map(unit => unit.self), [
                store2.chief.units()[0].self,
                store2.chief.units()[2].self,
            ]);
            const store3 = store2.fork(await $hyoo_crowd_peer.generate());
            store3.chief.as($hyoo_crowd_text).str('foo ton bar');
            $mol_assert_like(store2.chief.units().map(unit => unit.self), [
                store3.chief.units()[0].self,
                store3.chief.units()[1].self,
                store3.chief.units()[2].self,
            ]);
            const store4 = store3.fork(await $hyoo_crowd_peer.generate());
            store4.chief.as($hyoo_crowd_text).str('foo bar');
            $mol_assert_like([
                store3.chief.units()[0].self,
                store3.chief.units()[2].self,
            ], store4.chief.units().map(unit => unit.self));
            const store5 = store3.fork(await $hyoo_crowd_peer.generate());
            store5.chief.as($hyoo_crowd_text).str('foo ');
            $mol_assert_like([
                store4.chief.units()[0].self,
                store4.chief.units()[1].self,
            ], store5.chief.units().map(unit => unit.self));
        },
        async 'Change sequences'() {
            const store = await make_land();
            $mol_assert_like(store.chief.as($hyoo_crowd_text).str(), '');
            store.chief.as($hyoo_crowd_text).str('foo');
            $mol_assert_like(store.chief.as($hyoo_crowd_text).str(), 'foo');
            store.chief.as($hyoo_crowd_text).str('foo bar');
            $mol_assert_like(store.chief.as($hyoo_crowd_text).str(), 'foo bar');
            store.chief.as($hyoo_crowd_text).str('foo lol bar');
            $mol_assert_like(store.chief.as($hyoo_crowd_text).str(), 'foo lol bar');
            store.chief.as($hyoo_crowd_text).str('lol bar');
            $mol_assert_like(store.chief.as($hyoo_crowd_text).str(), 'lol bar');
            store.chief.as($hyoo_crowd_text).str('foo bar');
            $mol_assert_like(store.chief.as($hyoo_crowd_text).str(), 'foo bar');
        },
        async 'Merge different sequences'() {
            const left = await make_land();
            left.chief.as($hyoo_crowd_text).str('foo bar.');
            const right = await make_land('a_2');
            right.clock_data.tick(right.peer().id);
            right.chief.as($hyoo_crowd_text).str('xxx yyy.');
            const left_delta = left.delta();
            const right_delta = right.delta();
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'xxx yyy.foo bar.');
        },
        async 'Merge different insertions to same place of same sequence'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_text).str('foo bar');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            left.chief.as($hyoo_crowd_text).str('foo xxx bar');
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.chief.as($hyoo_crowd_text).str('foo yyy bar');
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'foo yyy xxx bar');
        },
        async 'Insert after moved'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_text).str('FooBarZak');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            left.chief.as($hyoo_crowd_text).str('FooXxxBarZak');
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.insert(right.chief.units()[0], '0_0', 2);
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'XxxBarFooZak');
        },
        async 'Insert before moved left'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_text).str('fooBarZak');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            left.chief.as($hyoo_crowd_text).str('FooXxxBarZak');
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.insert(right.chief.units()[1], '0_0', 0);
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'BarFooXxxZak');
        },
        async 'Insert before moved right'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_text).str('FooBarZak');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            left.chief.as($hyoo_crowd_text).str('FooXxxBarZak');
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.insert(right.chief.units()[1], '0_0', 3);
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'FooXxxZakBar');
        },
        async 'Insert after removed'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_text).str('FooBar');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            left.chief.as($hyoo_crowd_text).str('FooXxxBar');
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.chief.as($hyoo_crowd_text).str('Bar');
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'XxxBar');
        },
        async 'Insert after removed out'() {
            const base = await make_land();
            $hyoo_crowd_text.for(base, '1_1').str('FooBarZak');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            $hyoo_crowd_text.for(left, '1_1').str('FooBarXxxZak');
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.insert($hyoo_crowd_node.for(right, '1_1').units()[1], '2_2', 0);
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like($hyoo_crowd_text.for(left, '1_1').str(), $hyoo_crowd_text.for(right, '1_1').str(), 'FooXxxZak');
            $mol_assert_like($hyoo_crowd_text.for(left, '2_2').str(), $hyoo_crowd_text.for(right, '2_2').str(), 'Bar');
        },
        async 'Insert before changed'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_text).str('XxxYyyZzz');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            left.chief.as($hyoo_crowd_text).str('XxxFooYyyZzz');
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.chief.as($hyoo_crowd_text).str('XxxBarZzz');
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'XxxBarFooZzz');
        },
        async 'Insert between moved'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_list).list([111, 222, 333, 444, 555, 666]);
            const left = base.fork(await $hyoo_crowd_peer.generate());
            left.chief.as($hyoo_crowd_list).list([111, 222, 777, 333, 444, 555, 666]);
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            right.insert(right.chief.units()[1], '0_0', 5);
            right.insert(right.chief.units()[1], '0_0', 5);
            const left_delta = left.delta(base.clocks);
            const right_delta = right.delta(base.clocks);
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_like(left.chief.as($hyoo_crowd_list).list(), right.chief.as($hyoo_crowd_list).list(), [111, 444, 555, 222, 333, 777, 666]);
        },
        async 'Merge text changes'() {
            const base = await make_land();
            base.chief.as($hyoo_crowd_text).str('Hello World and fun!');
            const left = base.fork(await $hyoo_crowd_peer.generate());
            const right = base.fork(await $hyoo_crowd_peer.generate());
            right.clock_data.tick(right.peer().id);
            left.chief.as($hyoo_crowd_text).str('Hello Alice and fun!');
            right.chief.as($hyoo_crowd_text).str('Bye World and fun!');
            const left_delta = left.delta();
            const right_delta = right.delta();
            left.apply(right_delta);
            right.apply(left_delta);
            $mol_assert_equal(left.chief.as($hyoo_crowd_text).str(), right.chief.as($hyoo_crowd_text).str(), 'Bye Alice and fun!');
        },
        async 'Write into token'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('foobar');
            store.chief.as($hyoo_crowd_text).write('xyz', 3);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['fooxyzbar']);
        },
        async 'Write into token with split'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('foobar');
            store.chief.as($hyoo_crowd_text).write('XYZ', 2, 4);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['fo', 'XYZar']);
        },
        async 'Write over few tokens'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('xxx foo bar yyy');
            store.chief.as($hyoo_crowd_text).write('X Y Z', 6, 9);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['xxx', ' fo', 'X', ' Y', ' Zar', ' yyy']);
        },
        async 'Write whole token'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('xxxFoo yyy');
            store.chief.as($hyoo_crowd_text).write('bar', 3, 7);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['xxxbaryyy']);
        },
        async 'Write whole text'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('foo bar');
            store.chief.as($hyoo_crowd_text).write('xxx', 0, 7);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['xxx']);
        },
        async 'Write at the end'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('foo');
            store.chief.as($hyoo_crowd_text).write('bar');
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['foobar']);
        },
        async 'Write between tokens'() {
            const store = await make_land();
            store.chief.as($hyoo_crowd_text).str('foo bar');
            store.chief.as($hyoo_crowd_text).write('xxx', 4);
            $mol_assert_like(store.chief.as($hyoo_crowd_list).list(), ['foo', ' xxxbar']);
        },
    });
})($ || ($ = {}));
//hyoo/crowd/land/land.test.ts
;
"use strict";
var $;
(function ($) {
    $.$hyoo_sync_masters = [
        `ws://localhost:9090/`,
        $mol_dom_context.document.location.origin.replace(/^\w+:/, 'ws:'),
    ];
})($ || ($ = {}));
//hyoo/sync/masters/masters.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'put, get, drop, count records and clear store'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('letters'));
            const trans = db.change('letters');
            try {
                const { letters } = trans.stores;
                $mol_assert_like(await letters.get(1), undefined);
                $mol_assert_like(await letters.get(2), undefined);
                $mol_assert_like(await letters.count(), 0);
                await letters.put('a');
                await letters.put('b', 1);
                await letters.put('c', 2);
                $mol_assert_like(await letters.get(1), 'b');
                $mol_assert_like(await letters.get(2), 'c');
                $mol_assert_like(await letters.count(), 2);
                await letters.drop(1);
                $mol_assert_like(await letters.get(1), undefined);
                $mol_assert_like(await letters.count(), 1);
                await letters.clear();
                $mol_assert_like(await letters.count(), 0);
            }
            finally {
                trans.abort();
                db.kill();
            }
        },
        async 'select by query'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('letters'));
            const trans = db.change('letters');
            try {
                const { letters } = trans.stores;
                await letters.put('a');
                await letters.put('b');
                await letters.put('c');
                await letters.put('d');
                $mol_assert_like(await letters.select(), ['a', 'b', 'c', 'd']);
                $mol_assert_like(await letters.select(null, 2), ['a', 'b']);
                $mol_assert_like(await letters.select($mol_dom_context.IDBKeyRange.bound(2, 3)), ['b', 'c']);
            }
            finally {
                trans.abort();
                db.kill();
            }
        },
    });
})($ || ($ = {}));
//mol/db/store/store.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'take and drop db'() {
            const db = await $$.$mol_db('$mol_db_test');
            await db.kill();
        },
        async 'make and drop store in separate migrations'() {
            try {
                const db1 = await $$.$mol_db('$mol_db_test', mig => mig.store_make('temp'));
                db1.destructor();
                $mol_assert_like(db1.stores, ['temp']);
                $mol_assert_like(db1.version, 2);
                const db2 = await $$.$mol_db('$mol_db_test', mig => mig.store_make('temp'), mig => mig.store_drop('temp'));
                db2.destructor();
                $mol_assert_like(db2.stores, []);
                $mol_assert_like(db2.version, 3);
            }
            finally {
                const db0 = await $$.$mol_db('$mol_db_test');
                await db0.kill();
            }
        },
    });
})($ || ($ = {}));
//mol/db/db.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'unique index'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['name'], !!'unique'));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ name: 'Jin' }, 'jin');
                await users.put({ name: 'John' }, 'john');
                await users.put({ name: 'Bin' }, 'bin');
                const { names } = users.indexes;
                $mol_assert_like(await names.get(['Jin']), { name: 'Jin' });
                $mol_assert_like(await names.get(['John']), { name: 'John' });
                $mol_assert_like(await names.count(), 3);
                $mol_assert_like(await names.select($mol_dom_context.IDBKeyRange.bound(['J'], ['J\uFFFF'])), [{ name: 'Jin' }, { name: 'John' }]);
                try {
                    await users.put({ name: 'Jin' }, 'jin2');
                    $mol_fail(new Error('Exception expected'));
                }
                catch (error) {
                    $mol_assert_unique(error.message, 'Exception expected');
                }
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
        async 'multi path index'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['first', 'last']));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ first: 'Jin', last: 'Johnson' }, 'jin');
                await users.put({ first: 'John', last: 'Jinson' }, 'john');
                await users.put({ first: 'Bond', last: 'James' }, '007');
                const { names } = users.indexes;
                $mol_assert_like(await names.get(['Jin', 'Johnson']), { first: 'Jin', last: 'Johnson' });
                $mol_assert_like(await names.get(['John', 'Jinson']), { first: 'John', last: 'Jinson' });
                $mol_assert_like(await names.count(), 3);
                $mol_assert_like(await names.select($mol_dom_context.IDBKeyRange.bound(['Jin', 'Johnson'], ['John', 'Jinson'])), [{ first: 'Jin', last: 'Johnson' }, { first: 'John', last: 'Jinson' }]);
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
        async 'multiple indexes'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['name'], !!'unique'), mig => mig.stores.users.index_make('ages', ['age']));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ name: 'Jin', age: 18 }, 'jin');
                await users.put({ name: 'John', age: 18 }, 'john');
                const { names, ages } = users.indexes;
                $mol_assert_like(await names.select(['Jin']), [{ name: 'Jin', age: 18 }]);
                $mol_assert_like(await names.select(['John']), [{ name: 'John', age: 18 }]);
                $mol_assert_like(await names.count(), 2);
                $mol_assert_like(await ages.select([18]), [{ name: 'Jin', age: 18 }, { name: 'John', age: 18 }]);
                $mol_assert_like(await ages.count(), 2);
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
    });
})($ || ($ = {}));
//mol/db/index/index.test.ts
;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_work = $mol_after_mock_timeout;
    });
})($ || ($ = {}));
//mol/after/work/work.test.ts
;
"use strict";
var $;
(function ($) {
    $mol_test({
        'lazy calls'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 10);
            $mol_assert_equal(list[-1], -1);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[9], 9);
            $mol_assert_equal(list[9.5], undefined);
            $mol_assert_equal(list[10], 10);
            $mol_assert_equal(calls, 4);
        },
        'infinity list'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index));
            $mol_assert_equal(list.length, Number.POSITIVE_INFINITY);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER);
            $mol_assert_equal(list[Number.POSITIVE_INFINITY], Number.POSITIVE_INFINITY);
            $mol_assert_equal(calls, 4);
        },
        'stringify'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
            $mol_assert_equal(list.join(';'), '0;1;2;3;4');
        },
        'for-of'() {
            let log = '';
            for (let i of $mol_range2(i => i + 1, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '12345');
        },
        'for-in'() {
            let log = '';
            for (let i in $mol_range2(i => i, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '01234');
        },
        'forEach'() {
            let log = '';
            $mol_range2(i => i, () => 5).forEach(i => log += i);
            $mol_assert_equal(log, '01234');
        },
        'lazy concat'() {
            let calls1 = 0;
            let calls2 = 0;
            const list = $mol_range2(index => (++calls1, index), () => 5).concat([0, 1, 2, 3, 4], $mol_range2(index => (++calls2, index), () => 5));
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 15);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[5], 0);
            $mol_assert_equal(list[9], 4);
            $mol_assert_equal(list[10], 0);
            $mol_assert_equal(list[14], 4);
            $mol_assert_equal(list[15], 5);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 3);
        },
        'filter'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).filter(v => v % 2).slice(0, 3);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 1);
            $mol_assert_equal(list[2], 5);
            $mol_assert_equal(list[3], 7);
            $mol_assert_equal(calls, 10);
        },
        'reduce'() {
            let calls = 0;
            const list = $mol_range2().slice(1, 6);
            $mol_assert_equal(list.reduce((s, v) => s + v), 15);
            $mol_assert_equal(list.reduce((s, v) => s + v, 5), 20);
        },
        'lazy map'() {
            let calls1 = 0;
            let calls2 = 0;
            const source = $mol_range2(index => (++calls1, index), () => 5);
            const target = source.map((item, index, self) => {
                ++calls2;
                $mol_assert_equal(source, self);
                return index + 10;
            }, () => 5);
            $mol_assert_ok(target instanceof Array);
            $mol_assert_equal(target.length, 5);
            $mol_assert_equal(target[0], 10);
            $mol_assert_equal(target[4], 14);
            $mol_assert_equal(target[5], 15);
            $mol_assert_equal(calls1, 3);
            $mol_assert_equal(calls2, 3);
        },
        'lazy slice'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).slice(3, 7);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(list[0], 3);
            $mol_assert_equal(list[3], 6);
            $mol_assert_equal(list[4], 7);
            $mol_assert_equal(calls, 3);
        },
        'lazy some'() {
            let calls = 0;
            $mol_assert_ok($mol_range2(index => (++calls, index), () => 5).some(v => v >= 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_not($mol_range2(i => i, () => 0).some(v => true));
            $mol_assert_ok($mol_range2(i => i).some(v => v > 5));
        },
        'lazy every'() {
            let calls = 0;
            $mol_assert_not($mol_range2(index => (++calls, index), () => 5).every(v => v < 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_ok($mol_range2(i => i, () => 0).every(v => false));
            $mol_assert_not($mol_range2(i => i).every(v => v < 5));
        },
        'lazyfy'() {
            let calls = 0;
            const list = new $mol_range2_array(...[0, 1, 2, 3, 4, 5]).map(i => (++calls, i + 10)).slice(2);
            $mol_assert_ok(list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(calls, 0);
            $mol_assert_equal(list[0], 12);
            $mol_assert_equal(list[3], 15);
            $mol_assert_equal(list[4], Number.NaN);
            $mol_assert_equal(calls, 3);
        },
        'prevent modification'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_fail(() => list.push(4), TypeError);
            $mol_assert_fail(() => list.pop(), TypeError);
            $mol_assert_fail(() => list.unshift(4), TypeError);
            $mol_assert_fail(() => list.shift(), TypeError);
            $mol_assert_fail(() => list.splice(1, 2), TypeError);
            $mol_assert_fail(() => list[1] = 2, TypeError);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
        }
    });
})($ || ($ = {}));
//mol/range2/range2.test.ts

//# sourceMappingURL=node.test.js.map
