
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _merivale$victor$Theory_Messages$Nucleus = F5(
	function (a, b, c, d, e) {
		return {object: a, pivot: b, balance: c, abbreviateFulcrum: d, abbreviateNot: e};
	});
var _merivale$victor$Theory_Messages$Haystack = F3(
	function (a, b, c) {
		return {category: a, description: b, restriction: c};
	});
var _merivale$victor$Theory_Messages$Amassed = F6(
	function (a, b, c, d, e, f) {
		return {ctor: 'Amassed', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f};
	});
var _merivale$victor$Theory_Messages$Enumerated = F5(
	function (a, b, c, d, e) {
		return {ctor: 'Enumerated', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _merivale$victor$Theory_Messages$Indirect = F6(
	function (a, b, c, d, e, f) {
		return {ctor: 'Indirect', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f};
	});
var _merivale$victor$Theory_Messages$Apparent = F2(
	function (a, b) {
		return {ctor: 'Apparent', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Imminent = function (a) {
	return {ctor: 'Imminent', _0: a};
};
var _merivale$victor$Theory_Messages$Determined = F2(
	function (a, b) {
		return {ctor: 'Determined', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Ongoing = function (a) {
	return {ctor: 'Ongoing', _0: a};
};
var _merivale$victor$Theory_Messages$Scattered = F2(
	function (a, b) {
		return {ctor: 'Scattered', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Extended = F2(
	function (a, b) {
		return {ctor: 'Extended', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Regular = F2(
	function (a, b) {
		return {ctor: 'Regular', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Preordained = F2(
	function (a, b) {
		return {ctor: 'Preordained', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Evasive = F2(
	function (a, b) {
		return {ctor: 'Evasive', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Projective = F3(
	function (a, b, c) {
		return {ctor: 'Projective', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Messages$Practical = F2(
	function (a, b) {
		return {ctor: 'Practical', _0: a, _1: b};
	});
var _merivale$victor$Theory_Messages$Prior = function (a) {
	return {ctor: 'Prior', _0: a};
};
var _merivale$victor$Theory_Messages$Past = function (a) {
	return {ctor: 'Past', _0: a};
};
var _merivale$victor$Theory_Messages$Negative = function (a) {
	return {ctor: 'Negative', _0: a};
};
var _merivale$victor$Theory_Messages$Plain = function (a) {
	return {ctor: 'Plain', _0: a};
};
var _merivale$victor$Theory_Messages$CustomBalance = function (a) {
	return {ctor: 'CustomBalance', _0: a};
};
var _merivale$victor$Theory_Messages$DifferentObject = function (a) {
	return {ctor: 'DifferentObject', _0: a};
};
var _merivale$victor$Theory_Messages$SameObject = {ctor: 'SameObject'};
var _merivale$victor$Theory_Messages$PeopleOrThings = function (a) {
	return {ctor: 'PeopleOrThings', _0: a};
};
var _merivale$victor$Theory_Messages$Hearers = {ctor: 'Hearers'};
var _merivale$victor$Theory_Messages$Speakers = {ctor: 'Speakers'};
var _merivale$victor$Theory_Messages$Thing = function (a) {
	return {ctor: 'Thing', _0: a};
};
var _merivale$victor$Theory_Messages$Female = function (a) {
	return {ctor: 'Female', _0: a};
};
var _merivale$victor$Theory_Messages$Male = function (a) {
	return {ctor: 'Male', _0: a};
};
var _merivale$victor$Theory_Messages$Hearer = {ctor: 'Hearer'};
var _merivale$victor$Theory_Messages$Speaker = {ctor: 'Speaker'};
var _merivale$victor$Theory_Messages$Command = {ctor: 'Command'};
var _merivale$victor$Theory_Messages$Permission = {ctor: 'Permission'};
var _merivale$victor$Theory_Messages$Dare = {ctor: 'Dare'};
var _merivale$victor$Theory_Messages$HardYesIsh = {ctor: 'HardYesIsh'};
var _merivale$victor$Theory_Messages$SoftYesIsh = {ctor: 'SoftYesIsh'};
var _merivale$victor$Theory_Messages$HardMaybe = {ctor: 'HardMaybe'};
var _merivale$victor$Theory_Messages$SoftMaybe = {ctor: 'SoftMaybe'};
var _merivale$victor$Theory_Messages$HardYes = {ctor: 'HardYes'};
var _merivale$victor$Theory_Messages$SoftYes = {ctor: 'SoftYes'};
var _merivale$victor$Theory_Messages$BalancingObject = {ctor: 'BalancingObject'};
var _merivale$victor$Theory_Messages$MainObject = {ctor: 'MainObject'};
var _merivale$victor$Theory_Messages$RelatedTo = function (a) {
	return {ctor: 'RelatedTo', _0: a};
};
var _merivale$victor$Theory_Messages$That = {ctor: 'That'};
var _merivale$victor$Theory_Messages$This = {ctor: 'This'};
var _merivale$victor$Theory_Messages$The = {ctor: 'The'};
var _merivale$victor$Theory_Messages$Enough = {ctor: 'Enough'};
var _merivale$victor$Theory_Messages$Most = {ctor: 'Most'};
var _merivale$victor$Theory_Messages$Much = {ctor: 'Much'};
var _merivale$victor$Theory_Messages$All = {ctor: 'All'};
var _merivale$victor$Theory_Messages$Any = {ctor: 'Any'};
var _merivale$victor$Theory_Messages$Some = {ctor: 'Some'};
var _merivale$victor$Theory_Messages$Both = {ctor: 'Both'};
var _merivale$victor$Theory_Messages$Every = {ctor: 'Every'};
var _merivale$victor$Theory_Messages$Each = {ctor: 'Each'};
var _merivale$victor$Theory_Messages$Many = {ctor: 'Many'};
var _merivale$victor$Theory_Messages$Several = {ctor: 'Several'};
var _merivale$victor$Theory_Messages$A = {ctor: 'A'};

var _merivale$victor$Interface_Types$Ingredients = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return function (v) {
																						return function (w) {
																							return {showElaborations: a, object: b, objectString: c, pivot: d, balance: e, balanceString: f, balanceObject: g, balanceObjectString: h, modality: i, target: j, pointer: k, pointerObject: l, pointerObjectString: m, enumeratedQuantifier: n, amassedQuantifier: o, other: p, category: q, plural: r, description: s, restriction: t, multiPurposeString: u, multiPurposeStyle1: v, multiPurposeStyle2: w};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _merivale$victor$Interface_Types$PanelProperties = F4(
	function (a, b, c, d) {
		return {elaborationRecipe: a, showElaborations: b, index: c, body: d};
	});
var _merivale$victor$Interface_Types$TextProperties = F3(
	function (a, b, c) {
		return {value: a, placeholder: b, signal: c};
	});
var _merivale$victor$Interface_Types$RadioCheckboxProperties = F4(
	function (a, b, c, d) {
		return {id: a, label: b, checked: c, signal: d};
	});
var _merivale$victor$Interface_Types$SelectProperties = F4(
	function (a, b, c, d) {
		return {value: a, options: b, signal: c, toLabel: d};
	});
var _merivale$victor$Interface_Types$ButtonProperties = F3(
	function (a, b, c) {
		return {label: a, signal: b, customClass: c};
	});
var _merivale$victor$Interface_Types$MakeElaborate = F3(
	function (a, b, c) {
		return {ctor: 'MakeElaborate', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Interface_Types$MakePlain = function (a) {
	return {ctor: 'MakePlain', _0: a};
};
var _merivale$victor$Interface_Types$MakeAmassed = {ctor: 'MakeAmassed'};
var _merivale$victor$Interface_Types$MakeEnumerated = {ctor: 'MakeEnumerated'};
var _merivale$victor$Interface_Types$MakeIndirect = {ctor: 'MakeIndirect'};
var _merivale$victor$Interface_Types$MakeApparent = {ctor: 'MakeApparent'};
var _merivale$victor$Interface_Types$MakeImminent = {ctor: 'MakeImminent'};
var _merivale$victor$Interface_Types$MakeDetermined = {ctor: 'MakeDetermined'};
var _merivale$victor$Interface_Types$MakeOngoing = {ctor: 'MakeOngoing'};
var _merivale$victor$Interface_Types$MakeScattered = {ctor: 'MakeScattered'};
var _merivale$victor$Interface_Types$MakeExtended = {ctor: 'MakeExtended'};
var _merivale$victor$Interface_Types$MakeRegular = {ctor: 'MakeRegular'};
var _merivale$victor$Interface_Types$MakePreordained = {ctor: 'MakePreordained'};
var _merivale$victor$Interface_Types$MakeEvasive = {ctor: 'MakeEvasive'};
var _merivale$victor$Interface_Types$MakeProjective = {ctor: 'MakeProjective'};
var _merivale$victor$Interface_Types$MakePractical = {ctor: 'MakePractical'};
var _merivale$victor$Interface_Types$MakePrior = {ctor: 'MakePrior'};
var _merivale$victor$Interface_Types$MakePast = {ctor: 'MakePast'};
var _merivale$victor$Interface_Types$MakeNegative = {ctor: 'MakeNegative'};
var _merivale$victor$Interface_Types$ToggleMultiPurposeStyle2 = function (a) {
	return {ctor: 'ToggleMultiPurposeStyle2', _0: a};
};
var _merivale$victor$Interface_Types$ToggleMultiPurposeStyle1 = function (a) {
	return {ctor: 'ToggleMultiPurposeStyle1', _0: a};
};
var _merivale$victor$Interface_Types$SetMultiPurposeString = F2(
	function (a, b) {
		return {ctor: 'SetMultiPurposeString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetRestriction = F2(
	function (a, b) {
		return {ctor: 'SetRestriction', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetDescription = F2(
	function (a, b) {
		return {ctor: 'SetDescription', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$TogglePlural = function (a) {
	return {ctor: 'TogglePlural', _0: a};
};
var _merivale$victor$Interface_Types$SetCategory = F2(
	function (a, b) {
		return {ctor: 'SetCategory', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$ToggleOther = function (a) {
	return {ctor: 'ToggleOther', _0: a};
};
var _merivale$victor$Interface_Types$SetAmassedQuantifier = F2(
	function (a, b) {
		return {ctor: 'SetAmassedQuantifier', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetEnumeratedQuantifier = F2(
	function (a, b) {
		return {ctor: 'SetEnumeratedQuantifier', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetPointerObjectString = F2(
	function (a, b) {
		return {ctor: 'SetPointerObjectString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetPointerObject = F2(
	function (a, b) {
		return {ctor: 'SetPointerObject', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetPointer = F2(
	function (a, b) {
		return {ctor: 'SetPointer', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetTarget = F2(
	function (a, b) {
		return {ctor: 'SetTarget', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetModality = F2(
	function (a, b) {
		return {ctor: 'SetModality', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetBalanceObjectString = F2(
	function (a, b) {
		return {ctor: 'SetBalanceObjectString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetBalanceObject = F2(
	function (a, b) {
		return {ctor: 'SetBalanceObject', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetBalanceString = F2(
	function (a, b) {
		return {ctor: 'SetBalanceString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetBalance = F2(
	function (a, b) {
		return {ctor: 'SetBalance', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetPivot = F2(
	function (a, b) {
		return {ctor: 'SetPivot', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetObjectString = F2(
	function (a, b) {
		return {ctor: 'SetObjectString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$SetObject = F2(
	function (a, b) {
		return {ctor: 'SetObject', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$ToggleShowElaborations = function (a) {
	return {ctor: 'ToggleShowElaborations', _0: a};
};
var _merivale$victor$Interface_Types$AddElaborationRecipe = F2(
	function (a, b) {
		return {ctor: 'AddElaborationRecipe', _0: a, _1: b};
	});
var _merivale$victor$Interface_Types$RemoveElaborationRecipe = function (a) {
	return {ctor: 'RemoveElaborationRecipe', _0: a};
};
var _merivale$victor$Interface_Types$AmassedOverride = {ctor: 'AmassedOverride'};
var _merivale$victor$Interface_Types$EnumeratedOverride = {ctor: 'EnumeratedOverride'};
var _merivale$victor$Interface_Types$IndirectOverride = {ctor: 'IndirectOverride'};

var _merivale$victor$Interface_Ideas$maybeQuantifierToString = function (quantifier) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'No Quantifier',
		A2(_elm_lang$core$Maybe$map, _elm_lang$core$Basics$toString, quantifier));
};
var _merivale$victor$Interface_Ideas$amassedQuantifiers = {
	ctor: '::',
	_0: _elm_lang$core$Maybe$Nothing,
	_1: {
		ctor: '::',
		_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Some),
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Any),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$All),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Much),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Most),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Enough),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _merivale$victor$Interface_Ideas$enumeratedQuantifiers = {
	ctor: '::',
	_0: _merivale$victor$Theory_Messages$A,
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Messages$Several,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Messages$Many,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$Each,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Every,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$Both,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Some,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Messages$Any,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _merivale$victor$Interface_Ideas$pointerToString = function (pointer) {
	var _p0 = pointer;
	if (_p0.ctor === 'RelatedTo') {
		return 'Related to Object';
	} else {
		return _elm_lang$core$Basics$toString(_p0);
	}
};
var _merivale$victor$Interface_Ideas$pointers = {
	ctor: '::',
	_0: _merivale$victor$Theory_Messages$The,
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Messages$This,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Messages$That,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$RelatedTo(_merivale$victor$Theory_Messages$Speaker),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _merivale$victor$Interface_Ideas$modalityToString = function (modality) {
	var _p1 = modality;
	switch (_p1.ctor) {
		case 'SoftYes':
			return 'Soft Yes -- WILL';
		case 'HardYes':
			return 'Hard Yes -- MUST';
		case 'SoftMaybe':
			return 'Soft Maybe -- MAY';
		case 'HardMaybe':
			return 'Hard Maybe -- CAN';
		case 'SoftYesIsh':
			return 'Soft Yes-ish -- SHOULD';
		case 'HardYesIsh':
			return 'Hard Yes-ish -- OUGHT';
		case 'Permission':
			return 'Permission -- MAY';
		case 'Command':
			return 'Command -- SHALL';
		default:
			return 'Dare -- DARE';
	}
};
var _merivale$victor$Interface_Ideas$limitedModalities = {
	ctor: '::',
	_0: _merivale$victor$Theory_Messages$SoftYes,
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Messages$HardYes,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Messages$SoftMaybe,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$HardMaybe,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$SoftYesIsh,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$HardYesIsh,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Dare,
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	}
};
var _merivale$victor$Interface_Ideas$unlimitedModalities = A2(
	_elm_lang$core$Basics_ops['++'],
	_merivale$victor$Interface_Ideas$limitedModalities,
	{
		ctor: '::',
		_0: _merivale$victor$Theory_Messages$Permission,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Messages$Command,
			_1: {ctor: '[]'}
		}
	});
var _merivale$victor$Interface_Ideas$balanceToString = function (balance) {
	var _p2 = balance;
	if (_p2.ctor === 'Nothing') {
		return 'Nothing';
	} else {
		var _p3 = _p2._0;
		switch (_p3.ctor) {
			case 'SameObject':
				return 'Same Object';
			case 'DifferentObject':
				return 'Different Object';
			default:
				return 'Custom';
		}
	}
};
var _merivale$victor$Interface_Ideas$balances = {
	ctor: '::',
	_0: _elm_lang$core$Maybe$Nothing,
	_1: {
		ctor: '::',
		_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$SameObject),
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Messages$DifferentObject(_merivale$victor$Theory_Messages$Speaker)),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Maybe$Just(
					_merivale$victor$Theory_Messages$CustomBalance('')),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _merivale$victor$Interface_Ideas$objectToString = function (object) {
	var _p4 = object;
	switch (_p4.ctor) {
		case 'Male':
			return 'Male';
		case 'Female':
			return 'Female';
		case 'Thing':
			return 'Thing';
		case 'PeopleOrThings':
			return 'People/Things';
		default:
			return _elm_lang$core$Basics$toString(_p4);
	}
};
var _merivale$victor$Interface_Ideas$objectGroups = {
	ctor: '::',
	_0: {
		ctor: '_Tuple2',
		_0: 'Singular',
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Messages$Speaker,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$Hearer,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Male(_elm_lang$core$Maybe$Nothing),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$Female(_elm_lang$core$Maybe$Nothing),
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Thing(_elm_lang$core$Maybe$Nothing),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'Plural',
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$Speakers,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Hearers,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$PeopleOrThings(_elm_lang$core$Maybe$Nothing),
						_1: {ctor: '[]'}
					}
				}
			}
		},
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_Ideas$objects = {
	ctor: '::',
	_0: _merivale$victor$Theory_Messages$Speaker,
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Messages$Hearer,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Messages$Male(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$Female(_elm_lang$core$Maybe$Nothing),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Thing(_elm_lang$core$Maybe$Nothing),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$Speakers,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Hearers,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Messages$PeopleOrThings(_elm_lang$core$Maybe$Nothing),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};

var _merivale$victor$Interface_Input$fromId = function (options) {
	var fromString = function (s) {
		var _p0 = _elm_lang$core$List$head(
			A2(
				_elm_lang$core$List$filter,
				function (x) {
					return _elm_lang$core$Native_Utils.eq(
						_elm_lang$core$Basics$toString(x),
						s);
				},
				options));
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.crashCase(
				'Interface.Input',
				{
					start: {line: 219, column: 13},
					end: {line: 224, column: 22}
				},
				_p0)('select element is broken :(');
		} else {
			return _p0._0;
		}
	};
	return fromString;
};
var _merivale$victor$Interface_Input$option = F3(
	function (toLabel, current, value) {
		var attributes = _elm_lang$core$Native_Utils.eq(current, value) ? {
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$value(
				_elm_lang$core$Basics$toString(value)),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$selected(true),
				_1: {ctor: '[]'}
			}
		} : {
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$value(
				_elm_lang$core$Basics$toString(value)),
			_1: {ctor: '[]'}
		};
		return A2(
			_elm_lang$html$Html$option,
			attributes,
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(
					toLabel(value)),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_Input$optionGroup = F3(
	function (toLabel, value, _p2) {
		var _p3 = _p2;
		return A2(
			_elm_lang$html$Html$optgroup,
			{
				ctor: '::',
				_0: A2(_elm_lang$html$Html_Attributes$attribute, 'label', _p3._0),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$List$map,
				A2(_merivale$victor$Interface_Input$option, toLabel, value),
				_p3._1));
	});
var _merivale$victor$Interface_Input$selectGroup = F2(
	function (groups, _p4) {
		var _p5 = _p4;
		return A2(
			_elm_lang$html$Html$select,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('select'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Events$onInput(
						function (_p6) {
							return _p5.signal(
								A2(_merivale$victor$Interface_Input$fromId, _p5.options, _p6));
						}),
					_1: {ctor: '[]'}
				}
			},
			A2(
				_elm_lang$core$List$map,
				A2(_merivale$victor$Interface_Input$optionGroup, _p5.toLabel, _p5.value),
				groups));
	});
var _merivale$victor$Interface_Input$select = function (_p7) {
	var _p8 = _p7;
	var _p10 = _p8.options;
	return A2(
		_elm_lang$html$Html$select,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('select'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Events$onInput(
					function (_p9) {
						return _p8.signal(
							A2(_merivale$victor$Interface_Input$fromId, _p10, _p9));
					}),
				_1: {ctor: '[]'}
			}
		},
		A2(
			_elm_lang$core$List$map,
			A2(_merivale$victor$Interface_Input$option, _p8.toLabel, _p8.value),
			_p10));
};
var _merivale$victor$Interface_Input$checkbox = function (_p11) {
	var _p12 = _p11;
	var _p13 = _p12.id;
	return A2(
		_elm_lang$html$Html$label,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$for(_p13),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('checkbox'),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$input,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$checked(_p12.checked),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$id(_p13),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(_p12.signal),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text(_p12.label),
				_1: {ctor: '[]'}
			}
		});
};
var _merivale$victor$Interface_Input$radio = F2(
	function (name, _p14) {
		var _p15 = _p14;
		var _p16 = _p15.id;
		return A2(
			_elm_lang$html$Html$label,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$for(_p16),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('radio'),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$input,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$type_('radio'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$name(name),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$checked(_p15.checked),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$id(_p16),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(_p15.signal),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text(_p15.label),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Input$text = function (_p17) {
	var _p18 = _p17;
	return A2(
		_elm_lang$html$Html$input,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$type_('text'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('text'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$value(_p18.value),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$placeholder(_p18.placeholder),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Events$onInput(_p18.signal),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		},
		{ctor: '[]'});
};
var _merivale$victor$Interface_Input$label = function (text) {
	return A2(
		_elm_lang$html$Html$label,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('label'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(text),
			_1: {ctor: '[]'}
		});
};
var _merivale$victor$Interface_Input$button = function (_p19) {
	var _p20 = _p19;
	var classes = function () {
		var _p21 = _p20.customClass;
		if (_p21.ctor === 'Nothing') {
			return 'button';
		} else {
			return A2(_elm_lang$core$Basics_ops['++'], 'button ', _p21._0);
		}
	}();
	return A2(
		_elm_lang$html$Html$button,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Events$onClick(_p20.signal),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(classes),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(_p20.label),
			_1: {ctor: '[]'}
		});
};
var _merivale$victor$Interface_Input$elaborationRecipeToString = function (elaborationRecipe) {
	return A2(
		_elm_lang$core$String$dropLeft,
		4,
		_elm_lang$core$Basics$toString(elaborationRecipe));
};
var _merivale$victor$Interface_Input$elaborationButton = F2(
	function (index, elaborationRecipe) {
		return _merivale$victor$Interface_Input$button(
			{
				label: _merivale$victor$Interface_Input$elaborationRecipeToString(elaborationRecipe),
				signal: A2(_merivale$victor$Interface_Types$AddElaborationRecipe, index, elaborationRecipe),
				customClass: _elm_lang$core$Maybe$Nothing
			});
	});
var _merivale$victor$Interface_Input$elaborations = F2(
	function (index, show) {
		var elaborationsClass = show ? 'elaborations active' : 'elaborations';
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(elaborationsClass),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						_merivale$victor$Interface_Input$elaborationButton(index),
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Types$MakeNegative,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Interface_Types$MakePast,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Interface_Types$MakePrior,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Interface_Types$MakePractical,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Interface_Types$MakeProjective,
											_1: {
												ctor: '::',
												_0: _merivale$victor$Interface_Types$MakeEvasive,
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						})),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						A2(
							_elm_lang$core$List$map,
							_merivale$victor$Interface_Input$elaborationButton(index),
							{
								ctor: '::',
								_0: _merivale$victor$Interface_Types$MakePreordained,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Interface_Types$MakeRegular,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Interface_Types$MakeExtended,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Interface_Types$MakeScattered,
											_1: {
												ctor: '::',
												_0: _merivale$victor$Interface_Types$MakeOngoing,
												_1: {
													ctor: '::',
													_0: _merivale$victor$Interface_Types$MakeDetermined,
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							})),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{ctor: '[]'},
							A2(
								_elm_lang$core$List$map,
								_merivale$victor$Interface_Input$elaborationButton(index),
								{
									ctor: '::',
									_0: _merivale$victor$Interface_Types$MakeImminent,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Interface_Types$MakeApparent,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Interface_Types$MakeIndirect,
											_1: {
												ctor: '::',
												_0: _merivale$victor$Interface_Types$MakeEnumerated,
												_1: {
													ctor: '::',
													_0: _merivale$victor$Interface_Types$MakeAmassed,
													_1: {ctor: '[]'}
												}
											}
										}
									}
								})),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_Input$input = function (_p22) {
	var _p23 = _p22;
	var _p29 = _p23.showElaborations;
	var _p28 = _p23.index;
	var _p27 = _p23.elaborationRecipe;
	var _p26 = _p23.body;
	var deleteElaborationButton = _merivale$victor$Interface_Input$button(
		{
			label: '×',
			signal: _merivale$victor$Interface_Types$RemoveElaborationRecipe(_p28),
			customClass: _elm_lang$core$Maybe$Just('red')
		});
	var showElaborationsButton = _p29 ? _merivale$victor$Interface_Input$button(
		{
			label: '-',
			signal: _merivale$victor$Interface_Types$ToggleShowElaborations(_p28),
			customClass: _elm_lang$core$Maybe$Just('green')
		}) : _merivale$victor$Interface_Input$button(
		{
			label: '+',
			signal: _merivale$victor$Interface_Types$ToggleShowElaborations(_p28),
			customClass: _elm_lang$core$Maybe$Just('green')
		});
	var heading = function () {
		var _p24 = _p27;
		if (_p24.ctor === 'Nothing') {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('title'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Nucleus'),
					_1: {ctor: '[]'}
				});
		} else {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('title'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text(
						_merivale$victor$Interface_Input$elaborationRecipeToString(_p24._0)),
					_1: {ctor: '[]'}
				});
		}
	}();
	var _p25 = _p27;
	if (_p25.ctor === 'Nothing') {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('input'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('heading'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: showElaborationsButton,
						_1: {
							ctor: '::',
							_0: heading,
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(_merivale$victor$Interface_Input$elaborations, _p28, _p29),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('body'),
								_1: {ctor: '[]'}
							},
							_p26),
						_1: {ctor: '[]'}
					}
				}
			});
	} else {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('input'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('heading'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: showElaborationsButton,
						_1: {
							ctor: '::',
							_0: heading,
							_1: {
								ctor: '::',
								_0: deleteElaborationButton,
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(_merivale$victor$Interface_Input$elaborations, _p28, _p29),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('body'),
								_1: {ctor: '[]'}
							},
							_p26),
						_1: {ctor: '[]'}
					}
				}
			});
	}
};

var _merivale$victor$Interface_Factors$categoryFlanks = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor description'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Flanks'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.description,
							placeholder: 'description (e.g. red, happy, interesting)',
							signal: _merivale$victor$Interface_Types$SetDescription(index)
						}),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_Input$text(
							{
								value: ingredients.restriction,
								placeholder: 'restriction (e.g. in the room, over there, of France)',
								signal: _merivale$victor$Interface_Types$SetRestriction(index)
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_Factors$amassedCategory = F2(
	function (index, ingredients) {
		var examples = ingredients.plural ? 'e.g. apple, banana' : 'e.g. air, water';
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor category'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Category'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.category,
							placeholder: examples,
							signal: _merivale$victor$Interface_Types$SetCategory(index)
						}),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_Input$checkbox(
							{
								id: A2(
									_elm_lang$core$Basics_ops['++'],
									'countable',
									_elm_lang$core$Basics$toString(index)),
								label: 'Countable',
								checked: ingredients.plural,
								signal: _merivale$victor$Interface_Types$TogglePlural(index)
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_Factors$enumeratedCategory = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor category'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Category'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.category,
							placeholder: 'e.g. apple, banana',
							signal: _merivale$victor$Interface_Types$SetCategory(index)
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Factors$indirectCategory = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor category'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Category'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.category,
							placeholder: 'e.g. apple, banana, air, water',
							signal: _merivale$victor$Interface_Types$SetCategory(index)
						}),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_Input$checkbox(
							{
								id: A2(
									_elm_lang$core$Basics_ops['++'],
									'indirectPlural',
									_elm_lang$core$Basics$toString(index)),
								label: 'Plural',
								checked: ingredients.plural,
								signal: _merivale$victor$Interface_Types$TogglePlural(index)
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_Factors$amassedQuantifier = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor quantifier'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Quantifier'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$select(
						{
							value: ingredients.amassedQuantifier,
							options: _merivale$victor$Interface_Ideas$amassedQuantifiers,
							signal: _merivale$victor$Interface_Types$SetAmassedQuantifier(index),
							toLabel: _merivale$victor$Interface_Ideas$maybeQuantifierToString
						}),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_Input$checkbox(
							{
								id: A2(
									_elm_lang$core$Basics_ops['++'],
									'other',
									_elm_lang$core$Basics$toString(index)),
								label: 'Other',
								checked: ingredients.other,
								signal: _merivale$victor$Interface_Types$ToggleOther(index)
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_Factors$enumeratedQuantifier = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor quantifier'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Quantifier'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$select(
						{
							value: ingredients.enumeratedQuantifier,
							options: _merivale$victor$Interface_Ideas$enumeratedQuantifiers,
							signal: _merivale$victor$Interface_Types$SetEnumeratedQuantifier(index),
							toLabel: _elm_lang$core$Basics$toString
						}),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_Input$checkbox(
							{
								id: A2(
									_elm_lang$core$Basics_ops['++'],
									'other',
									_elm_lang$core$Basics$toString(index)),
								label: 'Other',
								checked: ingredients.other,
								signal: _merivale$victor$Interface_Types$ToggleOther(index)
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_Factors$pointer = F2(
	function (index, ingredients) {
		var other = _merivale$victor$Interface_Input$checkbox(
			{
				id: A2(
					_elm_lang$core$Basics_ops['++'],
					'other',
					_elm_lang$core$Basics$toString(index)),
				label: 'Other',
				checked: ingredients.other,
				signal: _merivale$victor$Interface_Types$ToggleOther(index)
			});
		var objectText = _merivale$victor$Interface_Input$text(
			{
				value: ingredients.pointerObjectString,
				placeholder: 'name (optional)',
				signal: _merivale$victor$Interface_Types$SetPointerObjectString(index)
			});
		var objectSelect = _merivale$victor$Interface_Input$select(
			{
				value: ingredients.pointerObject,
				options: _merivale$victor$Interface_Ideas$objects,
				signal: _merivale$victor$Interface_Types$SetPointerObject(index),
				toLabel: _merivale$victor$Interface_Ideas$objectToString
			});
		var pointerSelect = _merivale$victor$Interface_Input$select(
			{
				value: ingredients.pointer,
				options: _merivale$victor$Interface_Ideas$pointers,
				signal: _merivale$victor$Interface_Types$SetPointer(index),
				toLabel: _merivale$victor$Interface_Ideas$pointerToString
			});
		var _p0 = ingredients.pointer;
		if (_p0.ctor === 'RelatedTo') {
			var _p1 = ingredients.pointerObject;
			switch (_p1.ctor) {
				case 'Male':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor pointer'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Pointer'),
							_1: {
								ctor: '::',
								_0: pointerSelect,
								_1: {
									ctor: '::',
									_0: objectSelect,
									_1: {
										ctor: '::',
										_0: objectText,
										_1: {
											ctor: '::',
											_0: other,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						});
				case 'Female':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor pointer'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Pointer'),
							_1: {
								ctor: '::',
								_0: pointerSelect,
								_1: {
									ctor: '::',
									_0: objectSelect,
									_1: {
										ctor: '::',
										_0: objectText,
										_1: {
											ctor: '::',
											_0: other,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						});
				case 'Thing':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor pointer'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Pointer'),
							_1: {
								ctor: '::',
								_0: pointerSelect,
								_1: {
									ctor: '::',
									_0: objectSelect,
									_1: {
										ctor: '::',
										_0: objectText,
										_1: {
											ctor: '::',
											_0: other,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						});
				case 'PeopleOrThings':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor pointer'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Pointer'),
							_1: {
								ctor: '::',
								_0: pointerSelect,
								_1: {
									ctor: '::',
									_0: objectSelect,
									_1: {
										ctor: '::',
										_0: objectText,
										_1: {
											ctor: '::',
											_0: other,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						});
				default:
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor pointer'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Pointer'),
							_1: {
								ctor: '::',
								_0: pointerSelect,
								_1: {
									ctor: '::',
									_0: objectSelect,
									_1: {
										ctor: '::',
										_0: other,
										_1: {ctor: '[]'}
									}
								}
							}
						});
			}
		} else {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('factor pointer'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _merivale$victor$Interface_Input$label('Pointer'),
					_1: {
						ctor: '::',
						_0: pointerSelect,
						_1: {
							ctor: '::',
							_0: other,
							_1: {ctor: '[]'}
						}
					}
				});
		}
	});
var _merivale$victor$Interface_Factors$target = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor target'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Target'),
				_1: {
					ctor: '::',
					_0: A2(
						_merivale$victor$Interface_Input$radio,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'target',
							_elm_lang$core$Basics$toString(index)),
						{
							id: A2(
								_elm_lang$core$Basics_ops['++'],
								'targetMainObject',
								_elm_lang$core$Basics$toString(index)),
							label: 'Main Object',
							checked: _elm_lang$core$Native_Utils.eq(ingredients.target, _merivale$victor$Theory_Messages$MainObject),
							signal: A2(_merivale$victor$Interface_Types$SetTarget, index, _merivale$victor$Theory_Messages$MainObject)
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_merivale$victor$Interface_Input$radio,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'target',
								_elm_lang$core$Basics$toString(index)),
							{
								id: A2(
									_elm_lang$core$Basics_ops['++'],
									'targetBalancingObject',
									_elm_lang$core$Basics$toString(index)),
								label: 'Balancing Object',
								checked: _elm_lang$core$Native_Utils.eq(ingredients.target, _merivale$victor$Theory_Messages$BalancingObject),
								signal: A2(_merivale$victor$Interface_Types$SetTarget, index, _merivale$victor$Theory_Messages$BalancingObject)
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_Factors$apparentStyle = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor apparentStyle'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Style'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$checkbox(
						{
							id: A2(
								_elm_lang$core$Basics_ops['++'],
								'apparentStyle',
								_elm_lang$core$Basics$toString(index)),
							label: 'Use \'Seem\' instead of \'Appear\'',
							checked: ingredients.multiPurposeStyle1,
							signal: _merivale$victor$Interface_Types$ToggleMultiPurposeStyle1(index)
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Factors$tally = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor tally'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Tally'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.multiPurposeString,
							placeholder: 'e.g. once, twice, several times',
							signal: _merivale$victor$Interface_Types$SetMultiPurposeString(index)
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Factors$duration = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor duration'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Duration'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.multiPurposeString,
							placeholder: 'e.g. for a while, for two hours, all day',
							signal: _merivale$victor$Interface_Types$SetMultiPurposeString(index)
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Factors$time = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor time'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Time'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.multiPurposeString,
							placeholder: 'e.g. tomorrow, next week',
							signal: _merivale$victor$Interface_Types$SetMultiPurposeString(index)
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Factors$frequency = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor frequency'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Frequency'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.multiPurposeString,
							placeholder: 'e.g. usually, sometimes, occasionally',
							signal: _merivale$victor$Interface_Types$SetMultiPurposeString(index)
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Factors$modality = F3(
	function (options, index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor modality'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Modality'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$select(
						{
							value: ingredients.modality,
							options: options,
							signal: _merivale$victor$Interface_Types$SetModality(index),
							toLabel: _merivale$victor$Interface_Ideas$modalityToString
						}),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_Factors$unlimitedModality = F2(
	function (index, ingredients) {
		return A3(_merivale$victor$Interface_Factors$modality, _merivale$victor$Interface_Ideas$unlimitedModalities, index, ingredients);
	});
var _merivale$victor$Interface_Factors$limitedModality = F2(
	function (index, ingredients) {
		return A3(_merivale$victor$Interface_Factors$modality, _merivale$victor$Interface_Ideas$limitedModalities, index, ingredients);
	});
var _merivale$victor$Interface_Factors$pivot = F2(
	function (index, ingredients) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor pivot'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Input$label('Pivot'),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Input$text(
						{
							value: ingredients.pivot,
							placeholder: 'e.g. be, eat, like',
							signal: _merivale$victor$Interface_Types$SetPivot(index)
						}),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_Input$checkbox(
							{
								id: A2(
									_elm_lang$core$Basics_ops['++'],
									'abbreviateFulcrum',
									_elm_lang$core$Basics$toString(index)),
								label: 'Abbreviate Fulcrum',
								checked: ingredients.multiPurposeStyle1,
								signal: _merivale$victor$Interface_Types$ToggleMultiPurposeStyle1(index)
							}),
						_1: {
							ctor: '::',
							_0: _merivale$victor$Interface_Input$checkbox(
								{
									id: A2(
										_elm_lang$core$Basics_ops['++'],
										'abbreviateNot',
										_elm_lang$core$Basics$toString(index)),
									label: 'Abbreviate \'Not\'',
									checked: ingredients.multiPurposeStyle2,
									signal: _merivale$victor$Interface_Types$ToggleMultiPurposeStyle2(index)
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _merivale$victor$Interface_Factors$overrideToString = function (override) {
	var _p2 = override;
	switch (_p2.ctor) {
		case 'IndirectOverride':
			return 'indirect';
		case 'EnumeratedOverride':
			return 'enumerated';
		default:
			return 'amassed';
	}
};
var _merivale$victor$Interface_Factors$balance = F3(
	function (index, override, ingredients) {
		var customText = _merivale$victor$Interface_Input$text(
			{
				value: ingredients.balanceString,
				placeholder: 'custom balance',
				signal: _merivale$victor$Interface_Types$SetBalanceString(index)
			});
		var objectText = _merivale$victor$Interface_Input$text(
			{
				value: ingredients.balanceObjectString,
				placeholder: 'name (optional)',
				signal: _merivale$victor$Interface_Types$SetBalanceObjectString(index)
			});
		var objectSelect = _merivale$victor$Interface_Input$select(
			{
				value: ingredients.balanceObject,
				options: _merivale$victor$Interface_Ideas$objects,
				signal: _merivale$victor$Interface_Types$SetBalanceObject(index),
				toLabel: _merivale$victor$Interface_Ideas$objectToString
			});
		var balanceSelect = _merivale$victor$Interface_Input$select(
			{
				value: ingredients.balance,
				options: _merivale$victor$Interface_Ideas$balances,
				signal: _merivale$victor$Interface_Types$SetBalance(index),
				toLabel: _merivale$victor$Interface_Ideas$balanceToString
			});
		var _p3 = ingredients.balance;
		if (_p3.ctor === 'Nothing') {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('factor balance'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _merivale$victor$Interface_Input$label('Balance'),
					_1: {
						ctor: '::',
						_0: balanceSelect,
						_1: {ctor: '[]'}
					}
				});
		} else {
			var _p4 = _p3._0;
			switch (_p4.ctor) {
				case 'SameObject':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor balance'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Balance'),
							_1: {
								ctor: '::',
								_0: balanceSelect,
								_1: {ctor: '[]'}
							}
						});
				case 'DifferentObject':
					var _p5 = override;
					if (_p5.ctor === 'Nothing') {
						return A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('factor balance'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _merivale$victor$Interface_Input$label('Balance'),
								_1: {
									ctor: '::',
									_0: balanceSelect,
									_1: {
										ctor: '::',
										_0: objectSelect,
										_1: {
											ctor: '::',
											_0: objectText,
											_1: {ctor: '[]'}
										}
									}
								}
							});
					} else {
						return A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('factor object'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _merivale$victor$Interface_Input$label('Balance'),
								_1: {
									ctor: '::',
									_0: balanceSelect,
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$div,
											{
												ctor: '::',
												_0: _elm_lang$html$Html_Attributes$class('text override'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _elm_lang$html$Html$text(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'balancing object has been overridden by an ',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_merivale$victor$Interface_Factors$overrideToString(_p5._0),
															' elaboration'))),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							});
					}
				default:
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor balance'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Balance'),
							_1: {
								ctor: '::',
								_0: balanceSelect,
								_1: {
									ctor: '::',
									_0: customText,
									_1: {ctor: '[]'}
								}
							}
						});
			}
		}
	});
var _merivale$victor$Interface_Factors$object = F3(
	function (index, override, ingredients) {
		var _p6 = override;
		if (_p6.ctor === 'Nothing') {
			var text = _merivale$victor$Interface_Input$text(
				{
					value: ingredients.objectString,
					placeholder: 'name (optional)',
					signal: _merivale$victor$Interface_Types$SetObjectString(index)
				});
			var select = A2(
				_merivale$victor$Interface_Input$selectGroup,
				_merivale$victor$Interface_Ideas$objectGroups,
				{
					value: ingredients.object,
					options: _merivale$victor$Interface_Ideas$objects,
					signal: _merivale$victor$Interface_Types$SetObject(index),
					toLabel: _merivale$victor$Interface_Ideas$objectToString
				});
			var _p7 = ingredients.object;
			switch (_p7.ctor) {
				case 'Male':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor object'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Object'),
							_1: {
								ctor: '::',
								_0: select,
								_1: {
									ctor: '::',
									_0: text,
									_1: {ctor: '[]'}
								}
							}
						});
				case 'Female':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor object'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Object'),
							_1: {
								ctor: '::',
								_0: select,
								_1: {
									ctor: '::',
									_0: text,
									_1: {ctor: '[]'}
								}
							}
						});
				case 'Thing':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor object'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Object'),
							_1: {
								ctor: '::',
								_0: select,
								_1: {
									ctor: '::',
									_0: text,
									_1: {ctor: '[]'}
								}
							}
						});
				case 'PeopleOrThings':
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor object'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Object'),
							_1: {
								ctor: '::',
								_0: select,
								_1: {
									ctor: '::',
									_0: text,
									_1: {ctor: '[]'}
								}
							}
						});
				default:
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('factor object'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Input$label('Object'),
							_1: {
								ctor: '::',
								_0: select,
								_1: {ctor: '[]'}
							}
						});
			}
		} else {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('factor object'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _merivale$victor$Interface_Input$label('Object'),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('text override'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'main object has been overridden by an ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_merivale$victor$Interface_Factors$overrideToString(_p6._0),
											' elaboration'))),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				});
		}
	});

var _merivale$victor$Interface_Messages$maybeString = function (string) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$String$length(string),
		0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(string);
};
var _merivale$victor$Interface_Messages$haystack = function (ingredients) {
	return {
		category: ingredients.category,
		description: _merivale$victor$Interface_Messages$maybeString(ingredients.description),
		restriction: _merivale$victor$Interface_Messages$maybeString(ingredients.restriction)
	};
};
var _merivale$victor$Interface_Messages$object = F2(
	function (baseObject, objectString) {
		var _p0 = baseObject;
		switch (_p0.ctor) {
			case 'Male':
				return _merivale$victor$Theory_Messages$Male(
					_merivale$victor$Interface_Messages$maybeString(objectString));
			case 'Female':
				return _merivale$victor$Theory_Messages$Female(
					_merivale$victor$Interface_Messages$maybeString(objectString));
			case 'Thing':
				return _merivale$victor$Theory_Messages$Thing(
					_merivale$victor$Interface_Messages$maybeString(objectString));
			case 'PeopleOrThings':
				return _merivale$victor$Theory_Messages$PeopleOrThings(
					_merivale$victor$Interface_Messages$maybeString(objectString));
			default:
				return _p0;
		}
	});
var _merivale$victor$Interface_Messages$balance = F2(
	function (ingredients, balance) {
		var _p1 = balance;
		switch (_p1.ctor) {
			case 'SameObject':
				return _merivale$victor$Theory_Messages$SameObject;
			case 'DifferentObject':
				return _merivale$victor$Theory_Messages$DifferentObject(
					A2(_merivale$victor$Interface_Messages$object, ingredients.balanceObject, ingredients.balanceObjectString));
			default:
				return _merivale$victor$Theory_Messages$CustomBalance(ingredients.balanceString);
		}
	});
var _merivale$victor$Interface_Messages$pointer = function (ingredients) {
	var _p2 = ingredients.pointer;
	if (_p2.ctor === 'RelatedTo') {
		return _merivale$victor$Theory_Messages$RelatedTo(
			A2(_merivale$victor$Interface_Messages$object, ingredients.pointerObject, ingredients.pointerObjectString));
	} else {
		return ingredients.pointer;
	}
};
var _merivale$victor$Interface_Messages$elaborate = F3(
	function (elaborationRecipe, ingredients, message) {
		var _p3 = elaborationRecipe;
		switch (_p3.ctor) {
			case 'MakeNegative':
				return _elm_lang$core$Result$Ok(
					_merivale$victor$Theory_Messages$Negative(message));
			case 'MakePast':
				return _elm_lang$core$Result$Ok(
					_merivale$victor$Theory_Messages$Past(message));
			case 'MakePrior':
				return _elm_lang$core$Result$Ok(
					_merivale$victor$Theory_Messages$Prior(message));
			case 'MakePractical':
				return _elm_lang$core$Result$Ok(
					A2(_merivale$victor$Theory_Messages$Practical, ingredients.modality, message));
			case 'MakeProjective':
				return _elm_lang$core$Result$Ok(
					A3(
						_merivale$victor$Theory_Messages$Projective,
						ingredients.modality,
						_merivale$victor$Interface_Messages$maybeString(ingredients.multiPurposeString),
						message));
			case 'MakeEvasive':
				return _elm_lang$core$Result$Ok(
					A2(_merivale$victor$Theory_Messages$Evasive, ingredients.modality, message));
			case 'MakePreordained':
				return _elm_lang$core$Result$Ok(
					A2(
						_merivale$victor$Theory_Messages$Preordained,
						_merivale$victor$Interface_Messages$maybeString(ingredients.multiPurposeString),
						message));
			case 'MakeRegular':
				return _elm_lang$core$Result$Ok(
					A2(
						_merivale$victor$Theory_Messages$Regular,
						_merivale$victor$Interface_Messages$maybeString(ingredients.multiPurposeString),
						message));
			case 'MakeExtended':
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$String$length(ingredients.multiPurposeString),
					0) ? _elm_lang$core$Result$Err('please enter a value for the duration') : _elm_lang$core$Result$Ok(
					A2(_merivale$victor$Theory_Messages$Extended, ingredients.multiPurposeString, message));
			case 'MakeScattered':
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$String$length(ingredients.multiPurposeString),
					0) ? _elm_lang$core$Result$Err('please enter a value for the tally') : _elm_lang$core$Result$Ok(
					A2(_merivale$victor$Theory_Messages$Scattered, ingredients.multiPurposeString, message));
			case 'MakeOngoing':
				return _elm_lang$core$Result$Ok(
					_merivale$victor$Theory_Messages$Ongoing(message));
			case 'MakeDetermined':
				return _elm_lang$core$Result$Ok(
					A2(
						_merivale$victor$Theory_Messages$Determined,
						_merivale$victor$Interface_Messages$maybeString(ingredients.multiPurposeString),
						message));
			case 'MakeImminent':
				return _elm_lang$core$Result$Ok(
					_merivale$victor$Theory_Messages$Imminent(message));
			case 'MakeApparent':
				return _elm_lang$core$Result$Ok(
					A2(_merivale$victor$Theory_Messages$Apparent, ingredients.multiPurposeStyle1, message));
			case 'MakeIndirect':
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$String$length(ingredients.category),
					0) ? _elm_lang$core$Result$Err('please enter a category for your indirect elaboration') : _elm_lang$core$Result$Ok(
					A6(
						_merivale$victor$Theory_Messages$Indirect,
						ingredients.target,
						_merivale$victor$Interface_Messages$pointer(ingredients),
						ingredients.other,
						_merivale$victor$Interface_Messages$haystack(ingredients),
						ingredients.plural,
						message));
			case 'MakeEnumerated':
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$String$length(ingredients.category),
					0) ? _elm_lang$core$Result$Err('please enter a category for your enumerated elaboration') : _elm_lang$core$Result$Ok(
					A5(
						_merivale$victor$Theory_Messages$Enumerated,
						ingredients.target,
						ingredients.enumeratedQuantifier,
						ingredients.other,
						_merivale$victor$Interface_Messages$haystack(ingredients),
						message));
			default:
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$String$length(ingredients.category),
					0) ? _elm_lang$core$Result$Err('please enter a category for your amassed elaboration') : _elm_lang$core$Result$Ok(
					A6(
						_merivale$victor$Theory_Messages$Amassed,
						ingredients.target,
						ingredients.amassedQuantifier,
						ingredients.other,
						_merivale$victor$Interface_Messages$haystack(ingredients),
						ingredients.plural,
						message));
		}
	});
var _merivale$victor$Interface_Messages$nucleus = function (ingredients) {
	return {
		object: A2(_merivale$victor$Interface_Messages$object, ingredients.object, ingredients.objectString),
		pivot: ingredients.pivot,
		balance: A2(
			_elm_lang$core$Maybe$map,
			_merivale$victor$Interface_Messages$balance(ingredients),
			ingredients.balance),
		abbreviateFulcrum: ingredients.multiPurposeStyle1,
		abbreviateNot: ingredients.multiPurposeStyle2
	};
};
var _merivale$victor$Interface_Messages$plain = function (ingredients) {
	if (_elm_lang$core$Native_Utils.eq(
		_elm_lang$core$String$length(ingredients.pivot),
		0)) {
		return _elm_lang$core$Result$Err('please enter a verb for your pivot');
	} else {
		var _p4 = ingredients.balance;
		if ((_p4.ctor === 'Just') && (_p4._0.ctor === 'CustomBalance')) {
			return _elm_lang$core$Native_Utils.eq(
				_elm_lang$core$String$length(ingredients.balanceString),
				0) ? _elm_lang$core$Result$Err('please enter some text for your custom balance') : _elm_lang$core$Result$Ok(
				_merivale$victor$Theory_Messages$Plain(
					_merivale$victor$Interface_Messages$nucleus(ingredients)));
		} else {
			return _elm_lang$core$Result$Ok(
				_merivale$victor$Theory_Messages$Plain(
					_merivale$victor$Interface_Messages$nucleus(ingredients)));
		}
	}
};
var _merivale$victor$Interface_Messages$message = F2(
	function (index, model) {
		var _p5 = A2(_elm_lang$core$Array$get, index, model);
		if (_p5.ctor === 'Nothing') {
			return _elm_lang$core$Result$Err('recipe index out of range');
		} else {
			var _p6 = _p5._0;
			if (_p6.ctor === 'MakePlain') {
				return _merivale$victor$Interface_Messages$plain(_p6._0);
			} else {
				return A2(
					_elm_lang$core$Result$andThen,
					A2(_merivale$victor$Interface_Messages$elaborate, _p6._0, _p6._2),
					A2(_merivale$victor$Interface_Messages$message, _p6._1, model));
			}
		}
	});

var _merivale$victor$Interface_State$toggleMultiPurposeStyle2 = function (ingredients) {
	return _elm_lang$core$Native_Utils.update(
		ingredients,
		{multiPurposeStyle2: !ingredients.multiPurposeStyle2});
};
var _merivale$victor$Interface_State$toggleMultiPurposeStyle1 = function (ingredients) {
	return _elm_lang$core$Native_Utils.update(
		ingredients,
		{multiPurposeStyle1: !ingredients.multiPurposeStyle1});
};
var _merivale$victor$Interface_State$setMultiPurposeString = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{multiPurposeString: string});
	});
var _merivale$victor$Interface_State$setRestriction = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{restriction: string});
	});
var _merivale$victor$Interface_State$setDescription = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{description: string});
	});
var _merivale$victor$Interface_State$togglePlural = function (ingredients) {
	return _elm_lang$core$Native_Utils.update(
		ingredients,
		{plural: !ingredients.plural});
};
var _merivale$victor$Interface_State$setCategory = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{category: string});
	});
var _merivale$victor$Interface_State$toggleOther = function (ingredients) {
	return _elm_lang$core$Native_Utils.update(
		ingredients,
		{other: !ingredients.other});
};
var _merivale$victor$Interface_State$setAmassedQuantifier = F2(
	function (quantifier, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{amassedQuantifier: quantifier});
	});
var _merivale$victor$Interface_State$setEnumeratedQuantifier = F2(
	function (quantifier, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{enumeratedQuantifier: quantifier});
	});
var _merivale$victor$Interface_State$setPointerObjectString = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{pointerObjectString: string});
	});
var _merivale$victor$Interface_State$setPointerObject = F2(
	function (object, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{pointerObject: object});
	});
var _merivale$victor$Interface_State$setPointer = F2(
	function (pointer, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{pointer: pointer});
	});
var _merivale$victor$Interface_State$setTarget = F2(
	function (target, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{target: target});
	});
var _merivale$victor$Interface_State$setModality = F2(
	function (modality, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{modality: modality});
	});
var _merivale$victor$Interface_State$setBalanceObjectString = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{balanceObjectString: string});
	});
var _merivale$victor$Interface_State$setBalanceObject = F2(
	function (object, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{balanceObject: object});
	});
var _merivale$victor$Interface_State$setBalanceString = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{balanceString: string});
	});
var _merivale$victor$Interface_State$setBalance = F2(
	function (balance, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{balance: balance});
	});
var _merivale$victor$Interface_State$setPivot = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{pivot: string});
	});
var _merivale$victor$Interface_State$setObjectString = F2(
	function (string, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{objectString: string});
	});
var _merivale$victor$Interface_State$setObject = F2(
	function (object, ingredients) {
		return _elm_lang$core$Native_Utils.update(
			ingredients,
			{object: object});
	});
var _merivale$victor$Interface_State$toggleShowElaborations = function (ingredients) {
	return _elm_lang$core$Native_Utils.update(
		ingredients,
		{showElaborations: !ingredients.showElaborations});
};
var _merivale$victor$Interface_State$setIngredient = F3(
	function (index, model, changed) {
		var _p0 = A2(_elm_lang$core$Array$get, index, model);
		if (_p0.ctor === 'Nothing') {
			return model;
		} else {
			var _p1 = _p0._0;
			if (_p1.ctor === 'MakePlain') {
				return A3(
					_elm_lang$core$Array$set,
					index,
					_merivale$victor$Interface_Types$MakePlain(
						changed(_p1._0)),
					model);
			} else {
				return A3(
					_elm_lang$core$Array$set,
					index,
					A3(
						_merivale$victor$Interface_Types$MakeElaborate,
						_p1._0,
						_p1._1,
						changed(_p1._2)),
					model);
			}
		}
	});
var _merivale$victor$Interface_State$replaceRecipe = F3(
	function (index, oldIndex, model) {
		var _p2 = A2(_elm_lang$core$Array$get, oldIndex, model);
		if (_p2.ctor === 'Nothing') {
			return model;
		} else {
			return A3(_elm_lang$core$Array$set, index, _p2._0, model);
		}
	});
var _merivale$victor$Interface_State$ingredients = {
	showElaborations: false,
	object: _merivale$victor$Theory_Messages$Speaker,
	objectString: '',
	pivot: 'be',
	balance: _elm_lang$core$Maybe$Just(
		_merivale$victor$Theory_Messages$DifferentObject(_merivale$victor$Theory_Messages$Speaker)),
	balanceString: '',
	balanceObject: _merivale$victor$Theory_Messages$Male(_elm_lang$core$Maybe$Nothing),
	balanceObjectString: 'Victor',
	modality: _merivale$victor$Theory_Messages$SoftYes,
	target: _merivale$victor$Theory_Messages$MainObject,
	pointer: _merivale$victor$Theory_Messages$The,
	pointerObject: _merivale$victor$Theory_Messages$Speaker,
	pointerObjectString: '',
	enumeratedQuantifier: _merivale$victor$Theory_Messages$A,
	amassedQuantifier: _elm_lang$core$Maybe$Nothing,
	other: false,
	category: '',
	plural: false,
	description: '',
	restriction: '',
	multiPurposeString: '',
	multiPurposeStyle1: false,
	multiPurposeStyle2: false
};
var _merivale$victor$Interface_State$update = F2(
	function (signal, model) {
		var _p3 = signal;
		switch (_p3.ctor) {
			case 'RemoveElaborationRecipe':
				var _p6 = _p3._0;
				var _p4 = A2(_elm_lang$core$Array$get, _p6, model);
				if (_p4.ctor === 'Nothing') {
					return model;
				} else {
					var _p5 = _p4._0;
					if (_p5.ctor === 'MakePlain') {
						return model;
					} else {
						return A3(_merivale$victor$Interface_State$replaceRecipe, _p6, _p5._1, model);
					}
				}
			case 'AddElaborationRecipe':
				var _p8 = _p3._0;
				var _p7 = A2(_elm_lang$core$Array$get, _p8, model);
				if (_p7.ctor === 'Nothing') {
					return model;
				} else {
					var extendedModel = A2(_elm_lang$core$Array$push, _p7._0, model);
					var tweakedModel = A3(
						_merivale$victor$Interface_State$setIngredient,
						_elm_lang$core$Array$length(model),
						extendedModel,
						_merivale$victor$Interface_State$toggleShowElaborations);
					var newRecipe = A3(
						_merivale$victor$Interface_Types$MakeElaborate,
						_p3._1,
						_elm_lang$core$Array$length(model),
						_merivale$victor$Interface_State$ingredients);
					return A3(_elm_lang$core$Array$set, _p8, newRecipe, tweakedModel);
				}
			case 'ToggleShowElaborations':
				return A3(_merivale$victor$Interface_State$setIngredient, _p3._0, model, _merivale$victor$Interface_State$toggleShowElaborations);
			case 'SetObject':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setObject(_p3._1));
			case 'SetObjectString':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setObjectString(_p3._1));
			case 'SetPivot':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setPivot(_p3._1));
			case 'SetBalance':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setBalance(_p3._1));
			case 'SetBalanceString':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setBalanceString(_p3._1));
			case 'SetBalanceObject':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setBalanceObject(_p3._1));
			case 'SetBalanceObjectString':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setBalanceObjectString(_p3._1));
			case 'SetModality':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setModality(_p3._1));
			case 'SetTarget':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setTarget(_p3._1));
			case 'SetPointer':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setPointer(_p3._1));
			case 'SetPointerObject':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setPointerObject(_p3._1));
			case 'SetPointerObjectString':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setPointerObjectString(_p3._1));
			case 'SetEnumeratedQuantifier':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setEnumeratedQuantifier(_p3._1));
			case 'SetAmassedQuantifier':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setAmassedQuantifier(_p3._1));
			case 'ToggleOther':
				return A3(_merivale$victor$Interface_State$setIngredient, _p3._0, model, _merivale$victor$Interface_State$toggleOther);
			case 'SetCategory':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setCategory(_p3._1));
			case 'TogglePlural':
				return A3(_merivale$victor$Interface_State$setIngredient, _p3._0, model, _merivale$victor$Interface_State$togglePlural);
			case 'SetDescription':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setDescription(_p3._1));
			case 'SetRestriction':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setRestriction(_p3._1));
			case 'SetMultiPurposeString':
				return A3(
					_merivale$victor$Interface_State$setIngredient,
					_p3._0,
					model,
					_merivale$victor$Interface_State$setMultiPurposeString(_p3._1));
			case 'ToggleMultiPurposeStyle1':
				return A3(_merivale$victor$Interface_State$setIngredient, _p3._0, model, _merivale$victor$Interface_State$toggleMultiPurposeStyle1);
			default:
				return A3(_merivale$victor$Interface_State$setIngredient, _p3._0, model, _merivale$victor$Interface_State$toggleMultiPurposeStyle2);
		}
	});
var _merivale$victor$Interface_State$initial = _elm_lang$core$Array$fromList(
	{
		ctor: '::',
		_0: _merivale$victor$Interface_Types$MakePlain(_merivale$victor$Interface_State$ingredients),
		_1: {ctor: '[]'}
	});

var _merivale$victor$Theory_Words$verbs = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'abide',
			_1: {present: 'abides', past: 'abode', prior: 'abode', ongoing: 'abiding'}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'admit',
				_1: {present: 'admits', past: 'admitted', prior: 'admitted', ongoing: 'admitting'}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'arise',
					_1: {present: 'arises', past: 'arose', prior: 'arisen', ongoing: 'arising'}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'awake',
						_1: {present: 'awakes', past: 'awoke', prior: 'awoken', ongoing: 'awaking'}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'ban',
							_1: {present: 'bans', past: 'banned', prior: 'banned', ongoing: 'banning'}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'bat',
								_1: {present: 'bats', past: 'batted', prior: 'batted', ongoing: 'batting'}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'be',
									_1: {present: 'is', past: 'was', prior: 'been', ongoing: 'being'}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'bear',
										_1: {present: 'bears', past: 'bore', prior: 'borne', ongoing: 'bearing'}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'beat',
											_1: {present: 'beats', past: 'beat', prior: 'beaten', ongoing: 'beating'}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'become',
												_1: {present: 'becomes', past: 'became', prior: 'become', ongoing: 'becoming'}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'befall',
													_1: {present: 'befalls', past: 'befell', prior: 'befallen', ongoing: 'befalling'}
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'beg',
														_1: {present: 'begs', past: 'begged', prior: 'begged', ongoing: 'begging'}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'begin',
															_1: {present: 'begins', past: 'began', prior: 'begun', ongoing: 'beginning'}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'behold',
																_1: {present: 'beholds', past: 'beheld', prior: 'beheld', ongoing: 'beholding'}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'bend',
																	_1: {present: 'bends', past: 'bent', prior: 'bent', ongoing: 'bending'}
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'bereave',
																		_1: {present: 'bereaves', past: 'bereft', prior: 'bereft', ongoing: 'bereaving'}
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'beseech',
																			_1: {present: 'beseeches', past: 'besought', prior: 'besought', ongoing: 'beseeching'}
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: 'bet',
																				_1: {present: 'bets', past: 'bet', prior: 'bet', ongoing: 'betting'}
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: 'bid',
																					_1: {present: 'bids', past: 'bid', prior: 'bid', ongoing: 'bidding'}
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: 'bind',
																						_1: {present: 'binds', past: 'bound', prior: 'bound', ongoing: 'binding'}
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: 'bite',
																							_1: {present: 'bites', past: 'bit', prior: 'bitten', ongoing: 'biting'}
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: 'bleed',
																								_1: {present: 'bleeds', past: 'bled', prior: 'bled', ongoing: 'bleeding'}
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: 'blot',
																									_1: {present: 'blots', past: 'blotted', prior: 'blotted', ongoing: 'blotting'}
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: 'blow',
																										_1: {present: 'blows', past: 'blew', prior: 'blown', ongoing: 'blowing'}
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: 'blur',
																											_1: {present: 'blurs', past: 'blurred', prior: 'blurred', ongoing: 'blurring'}
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: 'break',
																												_1: {present: 'breaks', past: 'broke', prior: 'broken', ongoing: 'breaking'}
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: 'breed',
																													_1: {present: 'breeds', past: 'bred', prior: 'bred', ongoing: 'breeding'}
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: 'bring',
																														_1: {present: 'brings', past: 'brought', prior: 'brought', ongoing: 'bringing'}
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: 'broadcast',
																															_1: {present: 'broadcasts', past: 'broadcast', prior: 'broadcast', ongoing: 'broadcasting'}
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																ctor: '_Tuple2',
																																_0: 'build',
																																_1: {present: 'builds', past: 'built', prior: 'built', ongoing: 'building'}
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	ctor: '_Tuple2',
																																	_0: 'burn',
																																	_1: {present: 'burns', past: 'burnt', prior: 'burnt', ongoing: 'burning'}
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		ctor: '_Tuple2',
																																		_0: 'burst',
																																		_1: {present: 'bursts', past: 'burst', prior: 'burst', ongoing: 'bursting'}
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			ctor: '_Tuple2',
																																			_0: 'bust',
																																			_1: {present: 'busts', past: 'bust', prior: 'bust', ongoing: 'busting'}
																																		},
																																		_1: {
																																			ctor: '::',
																																			_0: {
																																				ctor: '_Tuple2',
																																				_0: 'buy',
																																				_1: {present: 'buys', past: 'bought', prior: 'bought', ongoing: 'buying'}
																																			},
																																			_1: {
																																				ctor: '::',
																																				_0: {
																																					ctor: '_Tuple2',
																																					_0: 'cast',
																																					_1: {present: 'casts', past: 'cast', prior: 'cast', ongoing: 'casting'}
																																				},
																																				_1: {
																																					ctor: '::',
																																					_0: {
																																						ctor: '_Tuple2',
																																						_0: 'catch',
																																						_1: {present: 'catches', past: 'caught', prior: 'caught', ongoing: 'catching'}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: {
																																							ctor: '_Tuple2',
																																							_0: 'chat',
																																							_1: {present: 'chats', past: 'chatted', prior: 'chatted', ongoing: 'chatting'}
																																						},
																																						_1: {
																																							ctor: '::',
																																							_0: {
																																								ctor: '_Tuple2',
																																								_0: 'chide',
																																								_1: {present: 'chides', past: 'chid', prior: 'chidden', ongoing: 'chiding'}
																																							},
																																							_1: {
																																								ctor: '::',
																																								_0: {
																																									ctor: '_Tuple2',
																																									_0: 'chip',
																																									_1: {present: 'chips', past: 'chipped', prior: 'chipped', ongoing: 'chipping'}
																																								},
																																								_1: {
																																									ctor: '::',
																																									_0: {
																																										ctor: '_Tuple2',
																																										_0: 'choose',
																																										_1: {present: 'chooses', past: 'chose', prior: 'chosen', ongoing: 'choosing'}
																																									},
																																									_1: {
																																										ctor: '::',
																																										_0: {
																																											ctor: '_Tuple2',
																																											_0: 'chop',
																																											_1: {present: 'chops', past: 'chopped', prior: 'chopped', ongoing: 'chopping'}
																																										},
																																										_1: {
																																											ctor: '::',
																																											_0: {
																																												ctor: '_Tuple2',
																																												_0: 'clap',
																																												_1: {present: 'claps', past: 'clapped', prior: 'clapped', ongoing: 'clapping'}
																																											},
																																											_1: {
																																												ctor: '::',
																																												_0: {
																																													ctor: '_Tuple2',
																																													_0: 'cleave',
																																													_1: {present: 'cleaves', past: 'clove', prior: 'cloven', ongoing: 'cleaving'}
																																												},
																																												_1: {
																																													ctor: '::',
																																													_0: {
																																														ctor: '_Tuple2',
																																														_0: 'cling',
																																														_1: {present: 'clings', past: 'clung', prior: 'clung', ongoing: 'clinging'}
																																													},
																																													_1: {
																																														ctor: '::',
																																														_0: {
																																															ctor: '_Tuple2',
																																															_0: 'clip',
																																															_1: {present: 'clips', past: 'clipped', prior: 'clipped', ongoing: 'clipping'}
																																														},
																																														_1: {
																																															ctor: '::',
																																															_0: {
																																																ctor: '_Tuple2',
																																																_0: 'come',
																																																_1: {present: 'comes', past: 'came', prior: 'come', ongoing: 'coming'}
																																															},
																																															_1: {
																																																ctor: '::',
																																																_0: {
																																																	ctor: '_Tuple2',
																																																	_0: 'compel',
																																																	_1: {present: 'compels', past: 'compelled', prior: 'compelled', ongoing: 'compelling'}
																																																},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {
																																																		ctor: '_Tuple2',
																																																		_0: 'control',
																																																		_1: {present: 'controls', past: 'controlled', prior: 'controlled', ongoing: 'controlling'}
																																																	},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {
																																																			ctor: '_Tuple2',
																																																			_0: 'cost',
																																																			_1: {present: 'costs', past: 'cost', prior: 'cost', ongoing: 'costing'}
																																																		},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {
																																																				ctor: '_Tuple2',
																																																				_0: 'counsel',
																																																				_1: {present: 'counsels', past: 'counselled', prior: 'counselled', ongoing: 'counselling'}
																																																			},
																																																			_1: {
																																																				ctor: '::',
																																																				_0: {
																																																					ctor: '_Tuple2',
																																																					_0: 'creep',
																																																					_1: {present: 'creeps', past: 'crept', prior: 'crept', ongoing: 'creeping'}
																																																				},
																																																				_1: {
																																																					ctor: '::',
																																																					_0: {
																																																						ctor: '_Tuple2',
																																																						_0: 'crib',
																																																						_1: {present: 'cribs', past: 'cribbed', prior: 'cribbed', ongoing: 'cribbing'}
																																																					},
																																																					_1: {
																																																						ctor: '::',
																																																						_0: {
																																																							ctor: '_Tuple2',
																																																							_0: 'cut',
																																																							_1: {present: 'cuts', past: 'cut', prior: 'cut', ongoing: 'cutting'}
																																																						},
																																																						_1: {
																																																							ctor: '::',
																																																							_0: {
																																																								ctor: '_Tuple2',
																																																								_0: 'dam',
																																																								_1: {present: 'dams', past: 'dammed', prior: 'dammed', ongoing: 'damming'}
																																																							},
																																																							_1: {
																																																								ctor: '::',
																																																								_0: {
																																																									ctor: '_Tuple2',
																																																									_0: 'deal',
																																																									_1: {present: 'deals', past: 'dealt', prior: 'dealt', ongoing: 'dealing'}
																																																								},
																																																								_1: {
																																																									ctor: '::',
																																																									_0: {
																																																										ctor: '_Tuple2',
																																																										_0: 'dig',
																																																										_1: {present: 'digs', past: 'dug', prior: 'dug', ongoing: 'digging'}
																																																									},
																																																									_1: {
																																																										ctor: '::',
																																																										_0: {
																																																											ctor: '_Tuple2',
																																																											_0: 'dim',
																																																											_1: {present: 'dims', past: 'dimmed', prior: 'dimmed', ongoing: 'dimming'}
																																																										},
																																																										_1: {
																																																											ctor: '::',
																																																											_0: {
																																																												ctor: '_Tuple2',
																																																												_0: 'dip',
																																																												_1: {present: 'dips', past: 'dipped', prior: 'dipped', ongoing: 'dipping'}
																																																											},
																																																											_1: {
																																																												ctor: '::',
																																																												_0: {
																																																													ctor: '_Tuple2',
																																																													_0: 'do',
																																																													_1: {present: 'does', past: 'did', prior: 'done', ongoing: 'doing'}
																																																												},
																																																												_1: {
																																																													ctor: '::',
																																																													_0: {
																																																														ctor: '_Tuple2',
																																																														_0: 'drag',
																																																														_1: {present: 'drags', past: 'dragged', prior: 'dragged', ongoing: 'dragging'}
																																																													},
																																																													_1: {
																																																														ctor: '::',
																																																														_0: {
																																																															ctor: '_Tuple2',
																																																															_0: 'draw',
																																																															_1: {present: 'draws', past: 'drew', prior: 'drawn', ongoing: 'drawing'}
																																																														},
																																																														_1: {
																																																															ctor: '::',
																																																															_0: {
																																																																ctor: '_Tuple2',
																																																																_0: 'dream',
																																																																_1: {present: 'dreams', past: 'dreamt', prior: 'dreamt', ongoing: 'dreaming'}
																																																															},
																																																															_1: {
																																																																ctor: '::',
																																																																_0: {
																																																																	ctor: '_Tuple2',
																																																																	_0: 'drink',
																																																																	_1: {present: 'drinks', past: 'drank', prior: 'drunk', ongoing: 'drinking'}
																																																																},
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: {
																																																																		ctor: '_Tuple2',
																																																																		_0: 'drip',
																																																																		_1: {present: 'drips', past: 'dripped', prior: 'dripped', ongoing: 'dripping'}
																																																																	},
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: {
																																																																			ctor: '_Tuple2',
																																																																			_0: 'drive',
																																																																			_1: {present: 'drives', past: 'drove', prior: 'driven', ongoing: 'driving'}
																																																																		},
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: {
																																																																				ctor: '_Tuple2',
																																																																				_0: 'drop',
																																																																				_1: {present: 'drops', past: 'dropped', prior: 'dropped', ongoing: 'dropping'}
																																																																			},
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: {
																																																																					ctor: '_Tuple2',
																																																																					_0: 'drum',
																																																																					_1: {present: 'drums', past: 'drummed', prior: 'drummed', ongoing: 'drumming'}
																																																																				},
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: {
																																																																						ctor: '_Tuple2',
																																																																						_0: 'dwell',
																																																																						_1: {present: 'dwells', past: 'dwelt', prior: 'dwelt', ongoing: 'dwelling'}
																																																																					},
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: {
																																																																							ctor: '_Tuple2',
																																																																							_0: 'dye',
																																																																							_1: {present: 'dyes', past: 'dyed', prior: 'dyed', ongoing: 'dyeing'}
																																																																						},
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: {
																																																																								ctor: '_Tuple2',
																																																																								_0: 'eat',
																																																																								_1: {present: 'eats', past: 'ate', prior: 'eaten', ongoing: 'eating'}
																																																																							},
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: {
																																																																									ctor: '_Tuple2',
																																																																									_0: 'fall',
																																																																									_1: {present: 'falls', past: 'fell', prior: 'fallen', ongoing: 'falling'}
																																																																								},
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: {
																																																																										ctor: '_Tuple2',
																																																																										_0: 'fan',
																																																																										_1: {present: 'fans', past: 'fanned', prior: 'fanned', ongoing: 'fanning'}
																																																																									},
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: {
																																																																											ctor: '_Tuple2',
																																																																											_0: 'feed',
																																																																											_1: {present: 'feeds', past: 'fed', prior: 'fed', ongoing: 'feeding'}
																																																																										},
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: {
																																																																												ctor: '_Tuple2',
																																																																												_0: 'feel',
																																																																												_1: {present: 'feels', past: 'felt', prior: 'felt', ongoing: 'feeling'}
																																																																											},
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: {
																																																																													ctor: '_Tuple2',
																																																																													_0: 'fight',
																																																																													_1: {present: 'fights', past: 'fought', prior: 'fought', ongoing: 'fighting'}
																																																																												},
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: {
																																																																														ctor: '_Tuple2',
																																																																														_0: 'find',
																																																																														_1: {present: 'finds', past: 'found', prior: 'found', ongoing: 'finding'}
																																																																													},
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: {
																																																																															ctor: '_Tuple2',
																																																																															_0: 'fit',
																																																																															_1: {present: 'fits', past: 'fitted', prior: 'fitted', ongoing: 'fitting'}
																																																																														},
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: {
																																																																																ctor: '_Tuple2',
																																																																																_0: 'flap',
																																																																																_1: {present: 'flaps', past: 'flapped', prior: 'flapped', ongoing: 'flapping'}
																																																																															},
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: {
																																																																																	ctor: '_Tuple2',
																																																																																	_0: 'flee',
																																																																																	_1: {present: 'flees', past: 'fled', prior: 'fled', ongoing: 'fleeing'}
																																																																																},
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: {
																																																																																		ctor: '_Tuple2',
																																																																																		_0: 'fling',
																																																																																		_1: {present: 'flings', past: 'flung', prior: 'flung', ongoing: 'flinging'}
																																																																																	},
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: {
																																																																																			ctor: '_Tuple2',
																																																																																			_0: 'flop',
																																																																																			_1: {present: 'flops', past: 'flopped', prior: 'flopped', ongoing: 'flopping'}
																																																																																		},
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: {
																																																																																				ctor: '_Tuple2',
																																																																																				_0: 'fly',
																																																																																				_1: {present: 'flies', past: 'flew', prior: 'flown', ongoing: 'flying'}
																																																																																			},
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: {
																																																																																					ctor: '_Tuple2',
																																																																																					_0: 'forbid',
																																																																																					_1: {present: 'forbids', past: 'forbade', prior: 'forbidden', ongoing: 'forbidding'}
																																																																																				},
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: {
																																																																																						ctor: '_Tuple2',
																																																																																						_0: 'forecast',
																																																																																						_1: {present: 'forecasts', past: 'forecast', prior: 'forecast', ongoing: 'forecasting'}
																																																																																					},
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: {
																																																																																							ctor: '_Tuple2',
																																																																																							_0: 'foretell',
																																																																																							_1: {present: 'foretells', past: 'foretold', prior: 'foretold', ongoing: 'foretelling'}
																																																																																						},
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: {
																																																																																								ctor: '_Tuple2',
																																																																																								_0: 'forget',
																																																																																								_1: {present: 'forgets', past: 'forgot', prior: 'forgotten', ongoing: 'forgetting'}
																																																																																							},
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: {
																																																																																									ctor: '_Tuple2',
																																																																																									_0: 'forgive',
																																																																																									_1: {present: 'forgives', past: 'forgave', prior: 'forgiven', ongoing: 'forgiving'}
																																																																																								},
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: {
																																																																																										ctor: '_Tuple2',
																																																																																										_0: 'forsake',
																																																																																										_1: {present: 'forsakes', past: 'forsook', prior: 'forsaken', ongoing: 'forsaking'}
																																																																																									},
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: {
																																																																																											ctor: '_Tuple2',
																																																																																											_0: 'freeze',
																																																																																											_1: {present: 'freezes', past: 'froze', prior: 'frozen', ongoing: 'freezing'}
																																																																																										},
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: {
																																																																																												ctor: '_Tuple2',
																																																																																												_0: 'fulfil',
																																																																																												_1: {present: 'fulfils', past: 'fulfilled', prior: 'fulfilled', ongoing: 'fulfilling'}
																																																																																											},
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: {
																																																																																													ctor: '_Tuple2',
																																																																																													_0: 'gag',
																																																																																													_1: {present: 'gags', past: 'gagged', prior: 'gagged', ongoing: 'gagging'}
																																																																																												},
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: {
																																																																																														ctor: '_Tuple2',
																																																																																														_0: 'gainsay',
																																																																																														_1: {present: 'gainsays', past: 'gainsaid', prior: 'gainsaid', ongoing: 'gainsaying'}
																																																																																													},
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: {
																																																																																															ctor: '_Tuple2',
																																																																																															_0: 'get',
																																																																																															_1: {present: 'gets', past: 'got', prior: 'got', ongoing: 'getting'}
																																																																																														},
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: {
																																																																																																ctor: '_Tuple2',
																																																																																																_0: 'give',
																																																																																																_1: {present: 'gives', past: 'gave', prior: 'given', ongoing: 'giving'}
																																																																																															},
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: {
																																																																																																	ctor: '_Tuple2',
																																																																																																	_0: 'go',
																																																																																																	_1: {present: 'goes', past: 'went', prior: 'gone', ongoing: 'going'}
																																																																																																},
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: {
																																																																																																		ctor: '_Tuple2',
																																																																																																		_0: 'grab',
																																																																																																		_1: {present: 'grabs', past: 'grabbed', prior: 'grabbed', ongoing: 'grabbing'}
																																																																																																	},
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: {
																																																																																																			ctor: '_Tuple2',
																																																																																																			_0: 'grin',
																																																																																																			_1: {present: 'grins', past: 'grinned', prior: 'grinned', ongoing: 'grinning'}
																																																																																																		},
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: {
																																																																																																				ctor: '_Tuple2',
																																																																																																				_0: 'grind',
																																																																																																				_1: {present: 'grinds', past: 'ground', prior: 'ground', ongoing: 'grinding'}
																																																																																																			},
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: {
																																																																																																					ctor: '_Tuple2',
																																																																																																					_0: 'grip',
																																																																																																					_1: {present: 'grips', past: 'gripped', prior: 'gripped', ongoing: 'gripping'}
																																																																																																				},
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: {
																																																																																																						ctor: '_Tuple2',
																																																																																																						_0: 'grow',
																																																																																																						_1: {present: 'grows', past: 'grew', prior: 'grown', ongoing: 'growing'}
																																																																																																					},
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: {
																																																																																																							ctor: '_Tuple2',
																																																																																																							_0: 'hang*',
																																																																																																							_1: {present: 'hangs', past: 'hung', prior: 'hung', ongoing: 'hanging'}
																																																																																																						},
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: {
																																																																																																								ctor: '_Tuple2',
																																																																																																								_0: 'have',
																																																																																																								_1: {present: 'has', past: 'had', prior: 'had', ongoing: 'having'}
																																																																																																							},
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: {
																																																																																																									ctor: '_Tuple2',
																																																																																																									_0: 'hear',
																																																																																																									_1: {present: 'hears', past: 'heard', prior: 'heard', ongoing: 'hearing'}
																																																																																																								},
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: {
																																																																																																										ctor: '_Tuple2',
																																																																																																										_0: 'hew',
																																																																																																										_1: {present: 'hews', past: 'hewed', prior: 'hewn', ongoing: 'hewing'}
																																																																																																									},
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: {
																																																																																																											ctor: '_Tuple2',
																																																																																																											_0: 'hide',
																																																																																																											_1: {present: 'hides', past: 'hid', prior: 'hidden', ongoing: 'hiding'}
																																																																																																										},
																																																																																																										_1: {
																																																																																																											ctor: '::',
																																																																																																											_0: {
																																																																																																												ctor: '_Tuple2',
																																																																																																												_0: 'hit',
																																																																																																												_1: {present: 'hits', past: 'hit', prior: 'hit', ongoing: 'hitting'}
																																																																																																											},
																																																																																																											_1: {
																																																																																																												ctor: '::',
																																																																																																												_0: {
																																																																																																													ctor: '_Tuple2',
																																																																																																													_0: 'hold',
																																																																																																													_1: {present: 'holds', past: 'held', prior: 'held', ongoing: 'holding'}
																																																																																																												},
																																																																																																												_1: {
																																																																																																													ctor: '::',
																																																																																																													_0: {
																																																																																																														ctor: '_Tuple2',
																																																																																																														_0: 'hop',
																																																																																																														_1: {present: 'hops', past: 'hopped', prior: 'hopped', ongoing: 'hopping'}
																																																																																																													},
																																																																																																													_1: {
																																																																																																														ctor: '::',
																																																																																																														_0: {
																																																																																																															ctor: '_Tuple2',
																																																																																																															_0: 'hug',
																																																																																																															_1: {present: 'hugs', past: 'hugged', prior: 'hugged', ongoing: 'hugging'}
																																																																																																														},
																																																																																																														_1: {
																																																																																																															ctor: '::',
																																																																																																															_0: {
																																																																																																																ctor: '_Tuple2',
																																																																																																																_0: 'hum',
																																																																																																																_1: {present: 'hums', past: 'hummed', prior: 'hummed', ongoing: 'humming'}
																																																																																																															},
																																																																																																															_1: {
																																																																																																																ctor: '::',
																																																																																																																_0: {
																																																																																																																	ctor: '_Tuple2',
																																																																																																																	_0: 'hurt',
																																																																																																																	_1: {present: 'hurts', past: 'hurt', prior: 'hurt', ongoing: 'hurting'}
																																																																																																																},
																																																																																																																_1: {
																																																																																																																	ctor: '::',
																																																																																																																	_0: {
																																																																																																																		ctor: '_Tuple2',
																																																																																																																		_0: 'impel',
																																																																																																																		_1: {present: 'impels', past: 'impelled', prior: 'impelled', ongoing: 'impelling'}
																																																																																																																	},
																																																																																																																	_1: {
																																																																																																																		ctor: '::',
																																																																																																																		_0: {
																																																																																																																			ctor: '_Tuple2',
																																																																																																																			_0: 'imperil',
																																																																																																																			_1: {present: 'imperils', past: 'imperilled', prior: 'imperilled', ongoing: 'imperilling'}
																																																																																																																		},
																																																																																																																		_1: {
																																																																																																																			ctor: '::',
																																																																																																																			_0: {
																																																																																																																				ctor: '_Tuple2',
																																																																																																																				_0: 'inlay',
																																																																																																																				_1: {present: 'inlays', past: 'inlaid', prior: 'inlaid', ongoing: 'inlaying'}
																																																																																																																			},
																																																																																																																			_1: {
																																																																																																																				ctor: '::',
																																																																																																																				_0: {
																																																																																																																					ctor: '_Tuple2',
																																																																																																																					_0: 'input',
																																																																																																																					_1: {present: 'inputs', past: 'input', prior: 'input', ongoing: 'inputting'}
																																																																																																																				},
																																																																																																																				_1: {
																																																																																																																					ctor: '::',
																																																																																																																					_0: {
																																																																																																																						ctor: '_Tuple2',
																																																																																																																						_0: 'jam',
																																																																																																																						_1: {present: 'jams', past: 'jammed', prior: 'jammed', ongoing: 'jamming'}
																																																																																																																					},
																																																																																																																					_1: {
																																																																																																																						ctor: '::',
																																																																																																																						_0: {
																																																																																																																							ctor: '_Tuple2',
																																																																																																																							_0: 'jog',
																																																																																																																							_1: {present: 'jogs', past: 'jogged', prior: 'jogged', ongoing: 'jogging'}
																																																																																																																						},
																																																																																																																						_1: {
																																																																																																																							ctor: '::',
																																																																																																																							_0: {
																																																																																																																								ctor: '_Tuple2',
																																																																																																																								_0: 'keep',
																																																																																																																								_1: {present: 'keeps', past: 'kept', prior: 'kept', ongoing: 'keeping'}
																																																																																																																							},
																																																																																																																							_1: {
																																																																																																																								ctor: '::',
																																																																																																																								_0: {
																																																																																																																									ctor: '_Tuple2',
																																																																																																																									_0: 'kid',
																																																																																																																									_1: {present: 'kids', past: 'kidded', prior: 'kidded', ongoing: 'kidding'}
																																																																																																																								},
																																																																																																																								_1: {
																																																																																																																									ctor: '::',
																																																																																																																									_0: {
																																																																																																																										ctor: '_Tuple2',
																																																																																																																										_0: 'kneel',
																																																																																																																										_1: {present: 'kneels', past: 'knelt', prior: 'knelt', ongoing: 'kneeling'}
																																																																																																																									},
																																																																																																																									_1: {
																																																																																																																										ctor: '::',
																																																																																																																										_0: {
																																																																																																																											ctor: '_Tuple2',
																																																																																																																											_0: 'knit',
																																																																																																																											_1: {present: 'knits', past: 'knitted', prior: 'knitted', ongoing: 'knitting'}
																																																																																																																										},
																																																																																																																										_1: {
																																																																																																																											ctor: '::',
																																																																																																																											_0: {
																																																																																																																												ctor: '_Tuple2',
																																																																																																																												_0: 'knot',
																																																																																																																												_1: {present: 'knots', past: 'knotted', prior: 'knotted', ongoing: 'knotting'}
																																																																																																																											},
																																																																																																																											_1: {
																																																																																																																												ctor: '::',
																																																																																																																												_0: {
																																																																																																																													ctor: '_Tuple2',
																																																																																																																													_0: 'know',
																																																																																																																													_1: {present: 'knows', past: 'knew', prior: 'known', ongoing: 'knowing'}
																																																																																																																												},
																																																																																																																												_1: {
																																																																																																																													ctor: '::',
																																																																																																																													_0: {
																																																																																																																														ctor: '_Tuple2',
																																																																																																																														_0: 'label',
																																																																																																																														_1: {present: 'labels', past: 'labelled', prior: 'labelled', ongoing: 'labelling'}
																																																																																																																													},
																																																																																																																													_1: {
																																																																																																																														ctor: '::',
																																																																																																																														_0: {
																																																																																																																															ctor: '_Tuple2',
																																																																																																																															_0: 'lay',
																																																																																																																															_1: {present: 'lays', past: 'laid', prior: 'laid', ongoing: 'laying'}
																																																																																																																														},
																																																																																																																														_1: {
																																																																																																																															ctor: '::',
																																																																																																																															_0: {
																																																																																																																																ctor: '_Tuple2',
																																																																																																																																_0: 'lead',
																																																																																																																																_1: {present: 'leads', past: 'led', prior: 'led', ongoing: 'leading'}
																																																																																																																															},
																																																																																																																															_1: {
																																																																																																																																ctor: '::',
																																																																																																																																_0: {
																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																	_0: 'lean',
																																																																																																																																	_1: {present: 'leans', past: 'leant', prior: 'leant', ongoing: 'leaning'}
																																																																																																																																},
																																																																																																																																_1: {
																																																																																																																																	ctor: '::',
																																																																																																																																	_0: {
																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																		_0: 'leap',
																																																																																																																																		_1: {present: 'leaps', past: 'leapt', prior: 'leapt', ongoing: 'leaping'}
																																																																																																																																	},
																																																																																																																																	_1: {
																																																																																																																																		ctor: '::',
																																																																																																																																		_0: {
																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																			_0: 'learn',
																																																																																																																																			_1: {present: 'learns', past: 'learnt', prior: 'learnt', ongoing: 'learning'}
																																																																																																																																		},
																																																																																																																																		_1: {
																																																																																																																																			ctor: '::',
																																																																																																																																			_0: {
																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																				_0: 'leave',
																																																																																																																																				_1: {present: 'leaves', past: 'left', prior: 'left', ongoing: 'leaving'}
																																																																																																																																			},
																																																																																																																																			_1: {
																																																																																																																																				ctor: '::',
																																																																																																																																				_0: {
																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																					_0: 'lend',
																																																																																																																																					_1: {present: 'lends', past: 'lent', prior: 'lent', ongoing: 'lending'}
																																																																																																																																				},
																																																																																																																																				_1: {
																																																																																																																																					ctor: '::',
																																																																																																																																					_0: {
																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																						_0: 'let',
																																																																																																																																						_1: {present: 'lets', past: 'let', prior: 'let', ongoing: 'letting'}
																																																																																																																																					},
																																																																																																																																					_1: {
																																																																																																																																						ctor: '::',
																																																																																																																																						_0: {
																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																							_0: 'level',
																																																																																																																																							_1: {present: 'levels', past: 'levelled', prior: 'levelled', ongoing: 'levelling'}
																																																																																																																																						},
																																																																																																																																						_1: {
																																																																																																																																							ctor: '::',
																																																																																																																																							_0: {
																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																								_0: 'lie*',
																																																																																																																																								_1: {present: 'lies', past: 'lay', prior: 'lain', ongoing: 'lying'}
																																																																																																																																							},
																																																																																																																																							_1: {
																																																																																																																																								ctor: '::',
																																																																																																																																								_0: {
																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																									_0: 'light',
																																																																																																																																									_1: {present: 'lights', past: 'lit', prior: 'lit', ongoing: 'lighting'}
																																																																																																																																								},
																																																																																																																																								_1: {
																																																																																																																																									ctor: '::',
																																																																																																																																									_0: {
																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																										_0: 'lose',
																																																																																																																																										_1: {present: 'loses', past: 'lost', prior: 'lost', ongoing: 'losing'}
																																																																																																																																									},
																																																																																																																																									_1: {
																																																																																																																																										ctor: '::',
																																																																																																																																										_0: {
																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																											_0: 'make',
																																																																																																																																											_1: {present: 'makes', past: 'made', prior: 'made', ongoing: 'making'}
																																																																																																																																										},
																																																																																																																																										_1: {
																																																																																																																																											ctor: '::',
																																																																																																																																											_0: {
																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																												_0: 'man',
																																																																																																																																												_1: {present: 'mans', past: 'manned', prior: 'manned', ongoing: 'manning'}
																																																																																																																																											},
																																																																																																																																											_1: {
																																																																																																																																												ctor: '::',
																																																																																																																																												_0: {
																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																													_0: 'mean',
																																																																																																																																													_1: {present: 'means', past: 'meant', prior: 'meant', ongoing: 'meaning'}
																																																																																																																																												},
																																																																																																																																												_1: {
																																																																																																																																													ctor: '::',
																																																																																																																																													_0: {
																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																														_0: 'meet',
																																																																																																																																														_1: {present: 'meets', past: 'met', prior: 'met', ongoing: 'meeting'}
																																																																																																																																													},
																																																																																																																																													_1: {
																																																																																																																																														ctor: '::',
																																																																																																																																														_0: {
																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																															_0: 'mislead',
																																																																																																																																															_1: {present: 'misleads', past: 'misled', prior: 'misled', ongoing: 'misleading'}
																																																																																																																																														},
																																																																																																																																														_1: {
																																																																																																																																															ctor: '::',
																																																																																																																																															_0: {
																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																_0: 'mistake',
																																																																																																																																																_1: {present: 'mistakes', past: 'mistook', prior: 'mistaken', ongoing: 'mistaking'}
																																																																																																																																															},
																																																																																																																																															_1: {
																																																																																																																																																ctor: '::',
																																																																																																																																																_0: {
																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																	_0: 'mow',
																																																																																																																																																	_1: {present: 'mows', past: 'mowed', prior: 'mown', ongoing: 'mowing'}
																																																																																																																																																},
																																																																																																																																																_1: {
																																																																																																																																																	ctor: '::',
																																																																																																																																																	_0: {
																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																		_0: 'mug',
																																																																																																																																																		_1: {present: 'mugs', past: 'mugged', prior: 'mugged', ongoing: 'mugging'}
																																																																																																																																																	},
																																																																																																																																																	_1: {
																																																																																																																																																		ctor: '::',
																																																																																																																																																		_0: {
																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																			_0: 'nap',
																																																																																																																																																			_1: {present: 'naps', past: 'napped', prior: 'napped', ongoing: 'napping'}
																																																																																																																																																		},
																																																																																																																																																		_1: {
																																																																																																																																																			ctor: '::',
																																																																																																																																																			_0: {
																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																				_0: 'nip',
																																																																																																																																																				_1: {present: 'nips', past: 'nipped', prior: 'nipped', ongoing: 'nipping'}
																																																																																																																																																			},
																																																																																																																																																			_1: {
																																																																																																																																																				ctor: '::',
																																																																																																																																																				_0: {
																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																					_0: 'nod',
																																																																																																																																																					_1: {present: 'nods', past: 'nodded', prior: 'nodded', ongoing: 'nodding'}
																																																																																																																																																				},
																																																																																																																																																				_1: {
																																																																																																																																																					ctor: '::',
																																																																																																																																																					_0: {
																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																						_0: 'occur',
																																																																																																																																																						_1: {present: 'occurs', past: 'occurred', prior: 'occurred', ongoing: 'occurring'}
																																																																																																																																																					},
																																																																																																																																																					_1: {
																																																																																																																																																						ctor: '::',
																																																																																																																																																						_0: {
																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																							_0: 'offset',
																																																																																																																																																							_1: {present: 'offsets', past: 'offset', prior: 'offset', ongoing: 'offsetting'}
																																																																																																																																																						},
																																																																																																																																																						_1: {
																																																																																																																																																							ctor: '::',
																																																																																																																																																							_0: {
																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																								_0: 'omit',
																																																																																																																																																								_1: {present: 'omits', past: 'omitted', prior: 'omitted', ongoing: 'omitting'}
																																																																																																																																																							},
																																																																																																																																																							_1: {
																																																																																																																																																								ctor: '::',
																																																																																																																																																								_0: {
																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																									_0: 'output',
																																																																																																																																																									_1: {present: 'outputs', past: 'output', prior: 'output', ongoing: 'outputting'}
																																																																																																																																																								},
																																																																																																																																																								_1: {
																																																																																																																																																									ctor: '::',
																																																																																																																																																									_0: {
																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																										_0: 'overtake',
																																																																																																																																																										_1: {present: 'overtakes', past: 'overtook', prior: 'overtaken', ongoing: 'overtaking'}
																																																																																																																																																									},
																																																																																																																																																									_1: {
																																																																																																																																																										ctor: '::',
																																																																																																																																																										_0: {
																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																											_0: 'partake',
																																																																																																																																																											_1: {present: 'partakes', past: 'partook', prior: 'partaken', ongoing: 'partaking'}
																																																																																																																																																										},
																																																																																																																																																										_1: {
																																																																																																																																																											ctor: '::',
																																																																																																																																																											_0: {
																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																												_0: 'pat',
																																																																																																																																																												_1: {present: 'pats', past: 'patted', prior: 'patted', ongoing: 'patting'}
																																																																																																																																																											},
																																																																																																																																																											_1: {
																																																																																																																																																												ctor: '::',
																																																																																																																																																												_0: {
																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																													_0: 'pay',
																																																																																																																																																													_1: {present: 'pays', past: 'paid', prior: 'paid', ongoing: 'paying'}
																																																																																																																																																												},
																																																																																																																																																												_1: {
																																																																																																																																																													ctor: '::',
																																																																																																																																																													_0: {
																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																														_0: 'pedal',
																																																																																																																																																														_1: {present: 'pedals', past: 'pedalled', prior: 'pedalled', ongoing: 'pedalling'}
																																																																																																																																																													},
																																																																																																																																																													_1: {
																																																																																																																																																														ctor: '::',
																																																																																																																																																														_0: {
																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																															_0: 'permit',
																																																																																																																																																															_1: {present: 'permits', past: 'permitted', prior: 'permitted', ongoing: 'permitting'}
																																																																																																																																																														},
																																																																																																																																																														_1: {
																																																																																																																																																															ctor: '::',
																																																																																																																																																															_0: {
																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																_0: 'picnic',
																																																																																																																																																																_1: {present: 'picnics', past: 'picnicked', prior: 'picnicked', ongoing: 'picnicking'}
																																																																																																																																																															},
																																																																																																																																																															_1: {
																																																																																																																																																																ctor: '::',
																																																																																																																																																																_0: {
																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																	_0: 'plan',
																																																																																																																																																																	_1: {present: 'plans', past: 'planned', prior: 'planned', ongoing: 'planning'}
																																																																																																																																																																},
																																																																																																																																																																_1: {
																																																																																																																																																																	ctor: '::',
																																																																																																																																																																	_0: {
																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																		_0: 'plead',
																																																																																																																																																																		_1: {present: 'pleads', past: 'pled', prior: 'pled', ongoing: 'pleading'}
																																																																																																																																																																	},
																																																																																																																																																																	_1: {
																																																																																																																																																																		ctor: '::',
																																																																																																																																																																		_0: {
																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																			_0: 'plod',
																																																																																																																																																																			_1: {present: 'plods', past: 'plodded', prior: 'plodded', ongoing: 'plodding'}
																																																																																																																																																																		},
																																																																																																																																																																		_1: {
																																																																																																																																																																			ctor: '::',
																																																																																																																																																																			_0: {
																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																				_0: 'plot',
																																																																																																																																																																				_1: {present: 'plots', past: 'plotted', prior: 'plotted', ongoing: 'plotting'}
																																																																																																																																																																			},
																																																																																																																																																																			_1: {
																																																																																																																																																																				ctor: '::',
																																																																																																																																																																				_0: {
																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																					_0: 'plug',
																																																																																																																																																																					_1: {present: 'plugs', past: 'plugged', prior: 'plugged', ongoing: 'plugging'}
																																																																																																																																																																				},
																																																																																																																																																																				_1: {
																																																																																																																																																																					ctor: '::',
																																																																																																																																																																					_0: {
																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																						_0: 'pop',
																																																																																																																																																																						_1: {present: 'pops', past: 'popped', prior: 'popped', ongoing: 'popping'}
																																																																																																																																																																					},
																																																																																																																																																																					_1: {
																																																																																																																																																																						ctor: '::',
																																																																																																																																																																						_0: {
																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																							_0: 'prefer',
																																																																																																																																																																							_1: {present: 'prefers', past: 'preferred', prior: 'preferred', ongoing: 'preferring'}
																																																																																																																																																																						},
																																																																																																																																																																						_1: {
																																																																																																																																																																							ctor: '::',
																																																																																																																																																																							_0: {
																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																								_0: 'preset',
																																																																																																																																																																								_1: {present: 'presets', past: 'preset', prior: 'preset', ongoing: 'presetting'}
																																																																																																																																																																							},
																																																																																																																																																																							_1: {
																																																																																																																																																																								ctor: '::',
																																																																																																																																																																								_0: {
																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																									_0: 'program',
																																																																																																																																																																									_1: {present: 'programs', past: 'programmed', prior: 'programmed', ongoing: 'programming'}
																																																																																																																																																																								},
																																																																																																																																																																								_1: {
																																																																																																																																																																									ctor: '::',
																																																																																																																																																																									_0: {
																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																										_0: 'put',
																																																																																																																																																																										_1: {present: 'puts', past: 'put', prior: 'put', ongoing: 'putting'}
																																																																																																																																																																									},
																																																																																																																																																																									_1: {
																																																																																																																																																																										ctor: '::',
																																																																																																																																																																										_0: {
																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																											_0: 'quarrel',
																																																																																																																																																																											_1: {present: 'quarrels', past: 'quarrelled', prior: 'quarrelled', ongoing: 'quarrelling'}
																																																																																																																																																																										},
																																																																																																																																																																										_1: {
																																																																																																																																																																											ctor: '::',
																																																																																																																																																																											_0: {
																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																												_0: 'quit',
																																																																																																																																																																												_1: {present: 'quits', past: 'quit', prior: 'quit', ongoing: 'quitting'}
																																																																																																																																																																											},
																																																																																																																																																																											_1: {
																																																																																																																																																																												ctor: '::',
																																																																																																																																																																												_0: {
																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																													_0: 'read',
																																																																																																																																																																													_1: {present: 'reads', past: 'read', prior: 'read', ongoing: 'reading'}
																																																																																																																																																																												},
																																																																																																																																																																												_1: {
																																																																																																																																																																													ctor: '::',
																																																																																																																																																																													_0: {
																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																														_0: 'rebuild',
																																																																																																																																																																														_1: {present: 'rebuilds', past: 'rebuilt', prior: 'rebuilt', ongoing: 'rebuilding'}
																																																																																																																																																																													},
																																																																																																																																																																													_1: {
																																																																																																																																																																														ctor: '::',
																																																																																																																																																																														_0: {
																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																															_0: 'recur',
																																																																																																																																																																															_1: {present: 'recurs', past: 'recurred', prior: 'recurred', ongoing: 'recurring'}
																																																																																																																																																																														},
																																																																																																																																																																														_1: {
																																																																																																																																																																															ctor: '::',
																																																																																																																																																																															_0: {
																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																_0: 'redo',
																																																																																																																																																																																_1: {present: 'redoes', past: 'redid', prior: 'redone', ongoing: 'redoing'}
																																																																																																																																																																															},
																																																																																																																																																																															_1: {
																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																_0: {
																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																	_0: 'refer',
																																																																																																																																																																																	_1: {present: 'refers', past: 'referred', prior: 'referred', ongoing: 'referring'}
																																																																																																																																																																																},
																																																																																																																																																																																_1: {
																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																	_0: {
																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																		_0: 'regret',
																																																																																																																																																																																		_1: {present: 'regrets', past: 'regretted', prior: 'regretted', ongoing: 'regretting'}
																																																																																																																																																																																	},
																																																																																																																																																																																	_1: {
																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																		_0: {
																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																			_0: 'remake',
																																																																																																																																																																																			_1: {present: 'remakes', past: 'remade', prior: 'remade', ongoing: 'remaking'}
																																																																																																																																																																																		},
																																																																																																																																																																																		_1: {
																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																			_0: {
																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																				_0: 'rend',
																																																																																																																																																																																				_1: {present: 'rends', past: 'rent', prior: 'rent', ongoing: 'rending'}
																																																																																																																																																																																			},
																																																																																																																																																																																			_1: {
																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																				_0: {
																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																					_0: 'resell',
																																																																																																																																																																																					_1: {present: 'resells', past: 'resold', prior: 'resold', ongoing: 'reselling'}
																																																																																																																																																																																				},
																																																																																																																																																																																				_1: {
																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																					_0: {
																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																						_0: 'reset',
																																																																																																																																																																																						_1: {present: 'resets', past: 'reset', prior: 'reset', ongoing: 'resetting'}
																																																																																																																																																																																					},
																																																																																																																																																																																					_1: {
																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																						_0: {
																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																							_0: 'rewind',
																																																																																																																																																																																							_1: {present: 'rewinds', past: 'rewound', prior: 'rewound', ongoing: 'rewinding'}
																																																																																																																																																																																						},
																																																																																																																																																																																						_1: {
																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																							_0: {
																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																								_0: 'rid',
																																																																																																																																																																																								_1: {present: 'rids', past: 'rid', prior: 'rid', ongoing: 'ridding'}
																																																																																																																																																																																							},
																																																																																																																																																																																							_1: {
																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																								_0: {
																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																									_0: 'ride',
																																																																																																																																																																																									_1: {present: 'rides', past: 'rode', prior: 'ridden', ongoing: 'riding'}
																																																																																																																																																																																								},
																																																																																																																																																																																								_1: {
																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																									_0: {
																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																										_0: 'ring',
																																																																																																																																																																																										_1: {present: 'rings', past: 'rang', prior: 'rung', ongoing: 'ringing'}
																																																																																																																																																																																									},
																																																																																																																																																																																									_1: {
																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																										_0: {
																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																											_0: 'rise',
																																																																																																																																																																																											_1: {present: 'rises', past: 'rose', prior: 'risen', ongoing: 'rising'}
																																																																																																																																																																																										},
																																																																																																																																																																																										_1: {
																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																											_0: {
																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																												_0: 'rob',
																																																																																																																																																																																												_1: {present: 'robs', past: 'robbed', prior: 'robbed', ongoing: 'robbing'}
																																																																																																																																																																																											},
																																																																																																																																																																																											_1: {
																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																												_0: {
																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																													_0: 'rot',
																																																																																																																																																																																													_1: {present: 'rots', past: 'rotted', prior: 'rotted', ongoing: 'rotting'}
																																																																																																																																																																																												},
																																																																																																																																																																																												_1: {
																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																													_0: {
																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																														_0: 'rub',
																																																																																																																																																																																														_1: {present: 'rubs', past: 'rubbed', prior: 'rubbed', ongoing: 'rubbing'}
																																																																																																																																																																																													},
																																																																																																																																																																																													_1: {
																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																														_0: {
																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																															_0: 'run',
																																																																																																																																																																																															_1: {present: 'runs', past: 'ran', prior: 'run', ongoing: 'running'}
																																																																																																																																																																																														},
																																																																																																																																																																																														_1: {
																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																															_0: {
																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																_0: 'sag',
																																																																																																																																																																																																_1: {present: 'sags', past: 'sagged', prior: 'sagged', ongoing: 'sagging'}
																																																																																																																																																																																															},
																																																																																																																																																																																															_1: {
																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																_0: {
																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																	_0: 'sap',
																																																																																																																																																																																																	_1: {present: 'saps', past: 'sapped', prior: 'sapped', ongoing: 'sapping'}
																																																																																																																																																																																																},
																																																																																																																																																																																																_1: {
																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																		_0: 'saw',
																																																																																																																																																																																																		_1: {present: 'saws', past: 'sawed', prior: 'sawn', ongoing: 'sawing'}
																																																																																																																																																																																																	},
																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																			_0: 'say',
																																																																																																																																																																																																			_1: {present: 'says', past: 'said', prior: 'said', ongoing: 'saying'}
																																																																																																																																																																																																		},
																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																				_0: 'scam',
																																																																																																																																																																																																				_1: {present: 'scams', past: 'scammed', prior: 'scammed', ongoing: 'scamming'}
																																																																																																																																																																																																			},
																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																					_0: 'scan',
																																																																																																																																																																																																					_1: {present: 'scans', past: 'scanned', prior: 'scanned', ongoing: 'scanning'}
																																																																																																																																																																																																				},
																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																						_0: 'scar',
																																																																																																																																																																																																						_1: {present: 'scars', past: 'scarred', prior: 'scarred', ongoing: 'scarring'}
																																																																																																																																																																																																					},
																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																							_0: 'scrub',
																																																																																																																																																																																																							_1: {present: 'scrubs', past: 'scrubbed', prior: 'scrubbed', ongoing: 'scrubbing'}
																																																																																																																																																																																																						},
																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																								_0: 'see',
																																																																																																																																																																																																								_1: {present: 'sees', past: 'saw', prior: 'seen', ongoing: 'seeing'}
																																																																																																																																																																																																							},
																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																									_0: 'seek',
																																																																																																																																																																																																									_1: {present: 'seeks', past: 'sought', prior: 'sought', ongoing: 'seeking'}
																																																																																																																																																																																																								},
																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																										_0: 'sell',
																																																																																																																																																																																																										_1: {present: 'sells', past: 'sold', prior: 'sold', ongoing: 'selling'}
																																																																																																																																																																																																									},
																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																											_0: 'send',
																																																																																																																																																																																																											_1: {present: 'sends', past: 'sent', prior: 'sent', ongoing: 'sending'}
																																																																																																																																																																																																										},
																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																												_0: 'set',
																																																																																																																																																																																																												_1: {present: 'sets', past: 'set', prior: 'set', ongoing: 'setting'}
																																																																																																																																																																																																											},
																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																													_0: 'sew',
																																																																																																																																																																																																													_1: {present: 'sews', past: 'sewed', prior: 'sewn', ongoing: 'sewing'}
																																																																																																																																																																																																												},
																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																														_0: 'shake',
																																																																																																																																																																																																														_1: {present: 'shakes', past: 'shook', prior: 'shaken', ongoing: 'shaking'}
																																																																																																																																																																																																													},
																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																															_0: 'shear',
																																																																																																																																																																																																															_1: {present: 'shears', past: 'shore', prior: 'shorn', ongoing: 'shearing'}
																																																																																																																																																																																																														},
																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																_0: 'shed',
																																																																																																																																																																																																																_1: {present: 'sheds', past: 'shed', prior: 'shed', ongoing: 'shedding'}
																																																																																																																																																																																																															},
																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																	_0: 'shine',
																																																																																																																																																																																																																	_1: {present: 'shines', past: 'shone', prior: 'shone', ongoing: 'shining'}
																																																																																																																																																																																																																},
																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																		_0: 'shit',
																																																																																																																																																																																																																		_1: {present: 'shits', past: 'shit', prior: 'shit', ongoing: 'shitting'}
																																																																																																																																																																																																																	},
																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																			_0: 'shoot',
																																																																																																																																																																																																																			_1: {present: 'shoots', past: 'shot', prior: 'shot', ongoing: 'shooting'}
																																																																																																																																																																																																																		},
																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																				_0: 'shop',
																																																																																																																																																																																																																				_1: {present: 'shops', past: 'shopped', prior: 'shopped', ongoing: 'shopping'}
																																																																																																																																																																																																																			},
																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																					_0: 'show',
																																																																																																																																																																																																																					_1: {present: 'shows', past: 'showed', prior: 'shown', ongoing: 'showing'}
																																																																																																																																																																																																																				},
																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																						_0: 'shrink',
																																																																																																																																																																																																																						_1: {present: 'shrinks', past: 'shrank', prior: 'shrunk', ongoing: 'shrinking'}
																																																																																																																																																																																																																					},
																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																							_0: 'shrug',
																																																																																																																																																																																																																							_1: {present: 'shrugs', past: 'shrugged', prior: 'shrugged', ongoing: 'shrugging'}
																																																																																																																																																																																																																						},
																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																								_0: 'shun',
																																																																																																																																																																																																																								_1: {present: 'shuns', past: 'shunned', prior: 'shunned', ongoing: 'shunning'}
																																																																																																																																																																																																																							},
																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																									_0: 'shut',
																																																																																																																																																																																																																									_1: {present: 'shuts', past: 'shut', prior: 'shut', ongoing: 'shutting'}
																																																																																																																																																																																																																								},
																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																										_0: 'signal',
																																																																																																																																																																																																																										_1: {present: 'signals', past: 'signalled', prior: 'signalled', ongoing: 'signalling'}
																																																																																																																																																																																																																									},
																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																											_0: 'sin',
																																																																																																																																																																																																																											_1: {present: 'sins', past: 'sinned', prior: 'sinned', ongoing: 'sinning'}
																																																																																																																																																																																																																										},
																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																												_0: 'sing',
																																																																																																																																																																																																																												_1: {present: 'sings', past: 'sang', prior: 'sung', ongoing: 'singing'}
																																																																																																																																																																																																																											},
																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																													_0: 'singe',
																																																																																																																																																																																																																													_1: {present: 'singes', past: 'singed', prior: 'singed', ongoing: 'singeing'}
																																																																																																																																																																																																																												},
																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																														_0: 'sink',
																																																																																																																																																																																																																														_1: {present: 'sinks', past: 'sank', prior: 'sunk', ongoing: 'sinking'}
																																																																																																																																																																																																																													},
																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																															_0: 'sip',
																																																																																																																																																																																																																															_1: {present: 'sips', past: 'sipped', prior: 'sipped', ongoing: 'sipping'}
																																																																																																																																																																																																																														},
																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																_0: 'sit',
																																																																																																																																																																																																																																_1: {present: 'sits', past: 'sat', prior: 'sat', ongoing: 'sitting'}
																																																																																																																																																																																																																															},
																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																	_0: 'skid',
																																																																																																																																																																																																																																	_1: {present: 'skids', past: 'skidded', prior: 'skidded', ongoing: 'skidding'}
																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																		_0: 'skip',
																																																																																																																																																																																																																																		_1: {present: 'skips', past: 'skipped', prior: 'skipped', ongoing: 'skipping'}
																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																			_0: 'slam',
																																																																																																																																																																																																																																			_1: {present: 'slams', past: 'slammed', prior: 'slammed', ongoing: 'slamming'}
																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																				_0: 'slap',
																																																																																																																																																																																																																																				_1: {present: 'slaps', past: 'slapped', prior: 'slapped', ongoing: 'slapping'}
																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																					_0: 'slay',
																																																																																																																																																																																																																																					_1: {present: 'slays', past: 'slew', prior: 'slain', ongoing: 'slaying'}
																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																						_0: 'sleep',
																																																																																																																																																																																																																																						_1: {present: 'sleeps', past: 'slept', prior: 'slept', ongoing: 'sleeping'}
																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																							_0: 'slide',
																																																																																																																																																																																																																																							_1: {present: 'slides', past: 'slid', prior: 'slid', ongoing: 'sliding'}
																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																								_0: 'slim',
																																																																																																																																																																																																																																								_1: {present: 'slims', past: 'slimmed', prior: 'slimmed', ongoing: 'slimming'}
																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																									_0: 'sling',
																																																																																																																																																																																																																																									_1: {present: 'slings', past: 'slung', prior: 'slung', ongoing: 'slinging'}
																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																										_0: 'slink',
																																																																																																																																																																																																																																										_1: {present: 'slinks', past: 'slunk', prior: 'slunk', ongoing: 'slinking'}
																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																											_0: 'slip',
																																																																																																																																																																																																																																											_1: {present: 'slips', past: 'slipped', prior: 'slipped', ongoing: 'slipping'}
																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																												_0: 'slit',
																																																																																																																																																																																																																																												_1: {present: 'slits', past: 'slit', prior: 'slit', ongoing: 'slitting'}
																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																													_0: 'smell',
																																																																																																																																																																																																																																													_1: {present: 'smells', past: 'smelt', prior: 'smelt', ongoing: 'smelling'}
																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																														_0: 'smite',
																																																																																																																																																																																																																																														_1: {present: 'smites', past: 'smote', prior: 'smitten', ongoing: 'smiting'}
																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																															_0: 'snap',
																																																																																																																																																																																																																																															_1: {present: 'snaps', past: 'snapped', prior: 'snapped', ongoing: 'snapping'}
																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																_0: 'sneak',
																																																																																																																																																																																																																																																_1: {present: 'sneaks', past: 'snuck', prior: 'snuck', ongoing: 'sneaking'}
																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																	_0: 'sob',
																																																																																																																																																																																																																																																	_1: {present: 'sobs', past: 'sobbed', prior: 'sobbed', ongoing: 'sobbing'}
																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																		_0: 'speak',
																																																																																																																																																																																																																																																		_1: {present: 'speaks', past: 'spoke', prior: 'spoken', ongoing: 'speaking'}
																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																			_0: 'speed',
																																																																																																																																																																																																																																																			_1: {present: 'speeds', past: 'sped', prior: 'sped', ongoing: 'speeding'}
																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																				_0: 'spell',
																																																																																																																																																																																																																																																				_1: {present: 'spells', past: 'spelt', prior: 'spelt', ongoing: 'spelling'}
																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																					_0: 'spend',
																																																																																																																																																																																																																																																					_1: {present: 'spends', past: 'spent', prior: 'spent', ongoing: 'spending'}
																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																						_0: 'spill',
																																																																																																																																																																																																																																																						_1: {present: 'spills', past: 'spilt', prior: 'spilt', ongoing: 'spilling'}
																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																							_0: 'spin',
																																																																																																																																																																																																																																																							_1: {present: 'spins', past: 'span', prior: 'spun', ongoing: 'spinning'}
																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																								_0: 'spit',
																																																																																																																																																																																																																																																								_1: {present: 'spits', past: 'spat', prior: 'spat', ongoing: 'spitting'}
																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																									_0: 'split',
																																																																																																																																																																																																																																																									_1: {present: 'splits', past: 'split', prior: 'split', ongoing: 'splitting'}
																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																										_0: 'spoil',
																																																																																																																																																																																																																																																										_1: {present: 'spoils', past: 'spoilt', prior: 'spoilt', ongoing: 'spoiling'}
																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																											_0: 'spot',
																																																																																																																																																																																																																																																											_1: {present: 'spots', past: 'spotted', prior: 'spotted', ongoing: 'spotting'}
																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																												_0: 'spread',
																																																																																																																																																																																																																																																												_1: {present: 'spreads', past: 'spread', prior: 'spread', ongoing: 'spreading'}
																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																													_0: 'spring',
																																																																																																																																																																																																																																																													_1: {present: 'springs', past: 'sprang', prior: 'sprung', ongoing: 'springing'}
																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																														_0: 'stand',
																																																																																																																																																																																																																																																														_1: {present: 'stands', past: 'stood', prior: 'stood', ongoing: 'standing'}
																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																															_0: 'steal',
																																																																																																																																																																																																																																																															_1: {present: 'steals', past: 'stole', prior: 'stolen', ongoing: 'stealing'}
																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																_0: 'stem',
																																																																																																																																																																																																																																																																_1: {present: 'stems', past: 'stemmed', prior: 'stemmed', ongoing: 'stemming'}
																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																	_0: 'step',
																																																																																																																																																																																																																																																																	_1: {present: 'steps', past: 'stepped', prior: 'stepped', ongoing: 'stepping'}
																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																		_0: 'stick',
																																																																																																																																																																																																																																																																		_1: {present: 'sticks', past: 'stuck', prior: 'stuck', ongoing: 'sticking'}
																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																			_0: 'sting',
																																																																																																																																																																																																																																																																			_1: {present: 'stings', past: 'stung', prior: 'stung', ongoing: 'stinging'}
																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																				_0: 'stink',
																																																																																																																																																																																																																																																																				_1: {present: 'stinks', past: 'stank', prior: 'stunk', ongoing: 'stinking'}
																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																					_0: 'stir',
																																																																																																																																																																																																																																																																					_1: {present: 'stirs', past: 'stirred', prior: 'stirred', ongoing: 'stirring'}
																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																						_0: 'stop',
																																																																																																																																																																																																																																																																						_1: {present: 'stops', past: 'stopped', prior: 'stopped', ongoing: 'stopping'}
																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																							_0: 'strap',
																																																																																																																																																																																																																																																																							_1: {present: 'straps', past: 'strapped', prior: 'strapped', ongoing: 'strapping'}
																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																								_0: 'strew',
																																																																																																																																																																																																																																																																								_1: {present: 'strews', past: 'strewed', prior: 'strewn', ongoing: 'strewing'}
																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																									_0: 'stride',
																																																																																																																																																																																																																																																																									_1: {present: 'strides', past: 'strode', prior: 'stridden', ongoing: 'striding'}
																																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																																										_0: 'strike',
																																																																																																																																																																																																																																																																										_1: {present: 'strikes', past: 'struck', prior: 'stricken', ongoing: 'striking'}
																																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																																											_0: 'string',
																																																																																																																																																																																																																																																																											_1: {present: 'strings', past: 'strung', prior: 'strung', ongoing: 'stringing'}
																																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																																												_0: 'strip',
																																																																																																																																																																																																																																																																												_1: {present: 'strips', past: 'stripped', prior: 'stripped', ongoing: 'stripping'}
																																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																																													_0: 'strive',
																																																																																																																																																																																																																																																																													_1: {present: 'strives', past: 'strove', prior: 'striven', ongoing: 'striving'}
																																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																																														_0: 'submit',
																																																																																																																																																																																																																																																																														_1: {present: 'submits', past: 'submitted', prior: 'submitted', ongoing: 'submitting'}
																																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																																															_0: 'swear',
																																																																																																																																																																																																																																																																															_1: {present: 'swears', past: 'swore', prior: 'sworn', ongoing: 'swearing'}
																																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																_0: 'sweat',
																																																																																																																																																																																																																																																																																_1: {present: 'sweats', past: 'sweat', prior: 'sweat', ongoing: 'sweating'}
																																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																	_0: 'sweep',
																																																																																																																																																																																																																																																																																	_1: {present: 'sweeps', past: 'swept', prior: 'swept', ongoing: 'sweeping'}
																																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																		_0: 'swell',
																																																																																																																																																																																																																																																																																		_1: {present: 'swells', past: 'swelled', prior: 'swollen', ongoing: 'swelling'}
																																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																			_0: 'swim',
																																																																																																																																																																																																																																																																																			_1: {present: 'swims', past: 'swam', prior: 'swum', ongoing: 'swimming'}
																																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																				_0: 'swing',
																																																																																																																																																																																																																																																																																				_1: {present: 'swings', past: 'swung', prior: 'swung', ongoing: 'swinging'}
																																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																					_0: 'swot',
																																																																																																																																																																																																																																																																																					_1: {present: 'swots', past: 'swotted', prior: 'swotted', ongoing: 'swotting'}
																																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																						_0: 'take',
																																																																																																																																																																																																																																																																																						_1: {present: 'takes', past: 'took', prior: 'taken', ongoing: 'taking'}
																																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																							_0: 'tap',
																																																																																																																																																																																																																																																																																							_1: {present: 'taps', past: 'tapped', prior: 'tapped', ongoing: 'tapping'}
																																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																								_0: 'teach',
																																																																																																																																																																																																																																																																																								_1: {present: 'teaches', past: 'taught', prior: 'taught', ongoing: 'teaching'}
																																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																									_0: 'tear',
																																																																																																																																																																																																																																																																																									_1: {present: 'tears', past: 'tore', prior: 'torn', ongoing: 'tearing'}
																																																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																										_0: 'tell',
																																																																																																																																																																																																																																																																																										_1: {present: 'tells', past: 'told', prior: 'told', ongoing: 'telling'}
																																																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																											_0: 'think',
																																																																																																																																																																																																																																																																																											_1: {present: 'thinks', past: 'thought', prior: 'thought', ongoing: 'thinking'}
																																																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																												_0: 'throw',
																																																																																																																																																																																																																																																																																												_1: {present: 'throws', past: 'threw', prior: 'thrown', ongoing: 'throwing'}
																																																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																													_0: 'thrust',
																																																																																																																																																																																																																																																																																													_1: {present: 'thrusts', past: 'thrust', prior: 'thrust', ongoing: 'thrusting'}
																																																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																														_0: 'tip',
																																																																																																																																																																																																																																																																																														_1: {present: 'tips', past: 'tipped', prior: 'tipped', ongoing: 'tipping'}
																																																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																															_0: 'transfer',
																																																																																																																																																																																																																																																																																															_1: {present: 'transfers', past: 'transferred', prior: 'transferred', ongoing: 'transferring'}
																																																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																_0: 'trap',
																																																																																																																																																																																																																																																																																																_1: {present: 'traps', past: 'trapped', prior: 'trapped', ongoing: 'trapping'}
																																																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																	_0: 'travel',
																																																																																																																																																																																																																																																																																																	_1: {present: 'travels', past: 'travelled', prior: 'travelled', ongoing: 'travelling'}
																																																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																		_0: 'tread',
																																																																																																																																																																																																																																																																																																		_1: {present: 'treads', past: 'trod', prior: 'trodden', ongoing: 'treading'}
																																																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																			_0: 'trip',
																																																																																																																																																																																																																																																																																																			_1: {present: 'trips', past: 'tripped', prior: 'tripped', ongoing: 'tripping'}
																																																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																				_0: 'trot',
																																																																																																																																																																																																																																																																																																				_1: {present: 'trots', past: 'trotted', prior: 'trotted', ongoing: 'trotting'}
																																																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																					_0: 'tug',
																																																																																																																																																																																																																																																																																																					_1: {present: 'tugs', past: 'tugged', prior: 'tugged', ongoing: 'tugging'}
																																																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																						_0: 'typeset',
																																																																																																																																																																																																																																																																																																						_1: {present: 'typesets', past: 'typeset', prior: 'typeset', ongoing: 'typesetting'}
																																																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																							_0: 'understand',
																																																																																																																																																																																																																																																																																																							_1: {present: 'understands', past: 'understood', prior: 'understood', ongoing: 'understanding'}
																																																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																								_0: 'undo',
																																																																																																																																																																																																																																																																																																								_1: {present: 'undoes', past: 'undid', prior: 'undone', ongoing: 'undoing'}
																																																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																									_0: 'upset',
																																																																																																																																																																																																																																																																																																									_1: {present: 'upsets', past: 'upset', prior: 'upset', ongoing: 'upsetting'}
																																																																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																										_0: 'wake',
																																																																																																																																																																																																																																																																																																										_1: {present: 'wakes', past: 'woke', prior: 'woken', ongoing: 'waking'}
																																																																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																											_0: 'waylay',
																																																																																																																																																																																																																																																																																																											_1: {present: 'waylays', past: 'waylaid', prior: 'waylaid', ongoing: 'waylaying'}
																																																																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																												_0: 'wear',
																																																																																																																																																																																																																																																																																																												_1: {present: 'wears', past: 'wore', prior: 'worn', ongoing: 'wearing'}
																																																																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																													_0: 'weave',
																																																																																																																																																																																																																																																																																																													_1: {present: 'weaves', past: 'wove', prior: 'woven', ongoing: 'weaving'}
																																																																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																														_0: 'wed',
																																																																																																																																																																																																																																																																																																														_1: {present: 'weds', past: 'wed', prior: 'wed', ongoing: 'wedding'}
																																																																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																															_0: 'weep',
																																																																																																																																																																																																																																																																																																															_1: {present: 'weeps', past: 'wept', prior: 'wept', ongoing: 'weeping'}
																																																																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																_0: 'wend',
																																																																																																																																																																																																																																																																																																																_1: {present: 'wends', past: 'went', prior: 'went', ongoing: 'wending'}
																																																																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																	_0: 'wet',
																																																																																																																																																																																																																																																																																																																	_1: {present: 'wets', past: 'wet', prior: 'wet', ongoing: 'wetting'}
																																																																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																		_0: 'whip',
																																																																																																																																																																																																																																																																																																																		_1: {present: 'whips', past: 'whipped', prior: 'whipped', ongoing: 'whipping'}
																																																																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																			_0: 'win',
																																																																																																																																																																																																																																																																																																																			_1: {present: 'wins', past: 'won', prior: 'won', ongoing: 'winning'}
																																																																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																				_0: 'wind',
																																																																																																																																																																																																																																																																																																																				_1: {present: 'winds', past: 'wound', prior: 'wound', ongoing: 'winding'}
																																																																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																					_0: 'withdraw',
																																																																																																																																																																																																																																																																																																																					_1: {present: 'withdraws', past: 'withdrew', prior: 'withdrawn', ongoing: 'withdrawing'}
																																																																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																						_0: 'worship',
																																																																																																																																																																																																																																																																																																																						_1: {present: 'worships', past: 'worshipped', prior: 'worshipped', ongoing: 'worshipping'}
																																																																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																							_0: 'wrap',
																																																																																																																																																																																																																																																																																																																							_1: {present: 'wraps', past: 'wrapped', prior: 'wrapped', ongoing: 'wrapping'}
																																																																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																								_0: 'wring',
																																																																																																																																																																																																																																																																																																																								_1: {present: 'wrings', past: 'wrung', prior: 'wrung', ongoing: 'wringing'}
																																																																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																									_0: 'write',
																																																																																																																																																																																																																																																																																																																									_1: {present: 'writes', past: 'wrote', prior: 'written', ongoing: 'writing'}
																																																																																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																																																																																								_1: {ctor: '[]'}
																																																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																																}
																																																																																																																																																																																																																																															}
																																																																																																																																																																																																																																														}
																																																																																																																																																																																																																																													}
																																																																																																																																																																																																																																												}
																																																																																																																																																																																																																																											}
																																																																																																																																																																																																																																										}
																																																																																																																																																																																																																																									}
																																																																																																																																																																																																																																								}
																																																																																																																																																																																																																																							}
																																																																																																																																																																																																																																						}
																																																																																																																																																																																																																																					}
																																																																																																																																																																																																																																				}
																																																																																																																																																																																																																																			}
																																																																																																																																																																																																																																		}
																																																																																																																																																																																																																																	}
																																																																																																																																																																																																																																}
																																																																																																																																																																																																																															}
																																																																																																																																																																																																																														}
																																																																																																																																																																																																																													}
																																																																																																																																																																																																																												}
																																																																																																																																																																																																																											}
																																																																																																																																																																																																																										}
																																																																																																																																																																																																																									}
																																																																																																																																																																																																																								}
																																																																																																																																																																																																																							}
																																																																																																																																																																																																																						}
																																																																																																																																																																																																																					}
																																																																																																																																																																																																																				}
																																																																																																																																																																																																																			}
																																																																																																																																																																																																																		}
																																																																																																																																																																																																																	}
																																																																																																																																																																																																																}
																																																																																																																																																																																																															}
																																																																																																																																																																																																														}
																																																																																																																																																																																																													}
																																																																																																																																																																																																												}
																																																																																																																																																																																																											}
																																																																																																																																																																																																										}
																																																																																																																																																																																																									}
																																																																																																																																																																																																								}
																																																																																																																																																																																																							}
																																																																																																																																																																																																						}
																																																																																																																																																																																																					}
																																																																																																																																																																																																				}
																																																																																																																																																																																																			}
																																																																																																																																																																																																		}
																																																																																																																																																																																																	}
																																																																																																																																																																																																}
																																																																																																																																																																																															}
																																																																																																																																																																																														}
																																																																																																																																																																																													}
																																																																																																																																																																																												}
																																																																																																																																																																																											}
																																																																																																																																																																																										}
																																																																																																																																																																																									}
																																																																																																																																																																																								}
																																																																																																																																																																																							}
																																																																																																																																																																																						}
																																																																																																																																																																																					}
																																																																																																																																																																																				}
																																																																																																																																																																																			}
																																																																																																																																																																																		}
																																																																																																																																																																																	}
																																																																																																																																																																																}
																																																																																																																																																																															}
																																																																																																																																																																														}
																																																																																																																																																																													}
																																																																																																																																																																												}
																																																																																																																																																																											}
																																																																																																																																																																										}
																																																																																																																																																																									}
																																																																																																																																																																								}
																																																																																																																																																																							}
																																																																																																																																																																						}
																																																																																																																																																																					}
																																																																																																																																																																				}
																																																																																																																																																																			}
																																																																																																																																																																		}
																																																																																																																																																																	}
																																																																																																																																																																}
																																																																																																																																																															}
																																																																																																																																																														}
																																																																																																																																																													}
																																																																																																																																																												}
																																																																																																																																																											}
																																																																																																																																																										}
																																																																																																																																																									}
																																																																																																																																																								}
																																																																																																																																																							}
																																																																																																																																																						}
																																																																																																																																																					}
																																																																																																																																																				}
																																																																																																																																																			}
																																																																																																																																																		}
																																																																																																																																																	}
																																																																																																																																																}
																																																																																																																																															}
																																																																																																																																														}
																																																																																																																																													}
																																																																																																																																												}
																																																																																																																																											}
																																																																																																																																										}
																																																																																																																																									}
																																																																																																																																								}
																																																																																																																																							}
																																																																																																																																						}
																																																																																																																																					}
																																																																																																																																				}
																																																																																																																																			}
																																																																																																																																		}
																																																																																																																																	}
																																																																																																																																}
																																																																																																																															}
																																																																																																																														}
																																																																																																																													}
																																																																																																																												}
																																																																																																																											}
																																																																																																																										}
																																																																																																																									}
																																																																																																																								}
																																																																																																																							}
																																																																																																																						}
																																																																																																																					}
																																																																																																																				}
																																																																																																																			}
																																																																																																																		}
																																																																																																																	}
																																																																																																																}
																																																																																																															}
																																																																																																														}
																																																																																																													}
																																																																																																												}
																																																																																																											}
																																																																																																										}
																																																																																																									}
																																																																																																								}
																																																																																																							}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _merivale$victor$Theory_Words$nouns = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'addendum', _1: 'addenda'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'alga', _1: 'algae'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'alumna', _1: 'alumnae'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'alumnus', _1: 'alumni'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'antenna', _1: 'antennae'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'bacillus', _1: 'bacilli'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'bacterium', _1: 'bacteria'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'beau', _1: 'beaux'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'bison', _1: 'bison'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'child', _1: 'children'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'corps', _1: 'corps'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'corpus', _1: 'corpora'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'criterion', _1: 'criteria'},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'curriculum', _1: 'curricula'},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'datum', _1: 'data'},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'deer', _1: 'deer'},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'die', _1: 'dice'},
																		_1: {
																			ctor: '::',
																			_0: {ctor: '_Tuple2', _0: 'erratum', _1: 'errata'},
																			_1: {
																				ctor: '::',
																				_0: {ctor: '_Tuple2', _0: 'fireman', _1: 'firemen'},
																				_1: {
																					ctor: '::',
																					_0: {ctor: '_Tuple2', _0: 'fish', _1: 'fish'},
																					_1: {
																						ctor: '::',
																						_0: {ctor: '_Tuple2', _0: 'foot', _1: 'feet'},
																						_1: {
																							ctor: '::',
																							_0: {ctor: '_Tuple2', _0: 'fungus', _1: 'fungi'},
																							_1: {
																								ctor: '::',
																								_0: {ctor: '_Tuple2', _0: 'genus', _1: 'genera'},
																								_1: {
																									ctor: '::',
																									_0: {ctor: '_Tuple2', _0: 'goose', _1: 'geese'},
																									_1: {
																										ctor: '::',
																										_0: {ctor: '_Tuple2', _0: 'louse', _1: 'lice'},
																										_1: {
																											ctor: '::',
																											_0: {ctor: '_Tuple2', _0: 'man', _1: 'men'},
																											_1: {
																												ctor: '::',
																												_0: {ctor: '_Tuple2', _0: 'means', _1: 'means'},
																												_1: {
																													ctor: '::',
																													_0: {ctor: '_Tuple2', _0: 'medium', _1: 'media'},
																													_1: {
																														ctor: '::',
																														_0: {ctor: '_Tuple2', _0: 'memorandum', _1: 'memoranda'},
																														_1: {
																															ctor: '::',
																															_0: {ctor: '_Tuple2', _0: 'millennium', _1: 'milennia'},
																															_1: {
																																ctor: '::',
																																_0: {ctor: '_Tuple2', _0: 'moose', _1: 'moose'},
																																_1: {
																																	ctor: '::',
																																	_0: {ctor: '_Tuple2', _0: 'mouse', _1: 'mice'},
																																	_1: {
																																		ctor: '::',
																																		_0: {ctor: '_Tuple2', _0: 'nebula', _1: 'nebulae'},
																																		_1: {
																																			ctor: '::',
																																			_0: {ctor: '_Tuple2', _0: 'nucleus', _1: 'nuclei'},
																																			_1: {
																																				ctor: '::',
																																				_0: {ctor: '_Tuple2', _0: 'ovum', _1: 'ova'},
																																				_1: {
																																					ctor: '::',
																																					_0: {ctor: '_Tuple2', _0: 'ox', _1: 'oxen'},
																																					_1: {
																																						ctor: '::',
																																						_0: {ctor: '_Tuple2', _0: 'person', _1: 'people'},
																																						_1: {
																																							ctor: '::',
																																							_0: {ctor: '_Tuple2', _0: 'phenomenon', _1: 'phenomena'},
																																							_1: {
																																								ctor: '::',
																																								_0: {ctor: '_Tuple2', _0: 'radius', _1: 'radii'},
																																								_1: {
																																									ctor: '::',
																																									_0: {ctor: '_Tuple2', _0: 'series', _1: 'series'},
																																									_1: {
																																										ctor: '::',
																																										_0: {ctor: '_Tuple2', _0: 'sheep', _1: 'sheep'},
																																										_1: {
																																											ctor: '::',
																																											_0: {ctor: '_Tuple2', _0: 'species', _1: 'species'},
																																											_1: {
																																												ctor: '::',
																																												_0: {ctor: '_Tuple2', _0: 'stimulus', _1: 'stimuli'},
																																												_1: {
																																													ctor: '::',
																																													_0: {ctor: '_Tuple2', _0: 'stratum', _1: 'strata'},
																																													_1: {
																																														ctor: '::',
																																														_0: {ctor: '_Tuple2', _0: 'symposium', _1: 'symposia'},
																																														_1: {
																																															ctor: '::',
																																															_0: {ctor: '_Tuple2', _0: 'tableau', _1: 'tableaux'},
																																															_1: {
																																																ctor: '::',
																																																_0: {ctor: '_Tuple2', _0: 'tooth', _1: 'teeth'},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {ctor: '_Tuple2', _0: 'vertebra', _1: 'vertebrae'},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {ctor: '_Tuple2', _0: 'vita', _1: 'vitae'},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {ctor: '_Tuple2', _0: 'woman', _1: 'women'},
																																																			_1: {ctor: '[]'}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _merivale$victor$Theory_Words$consontanty = function (base) {
	var penultimate = A3(_elm_lang$core$String$slice, -2, -1, base);
	var ultimate = A2(_elm_lang$core$String$right, 1, base);
	return _elm_lang$core$Native_Utils.eq(ultimate, 'y') && (!A2(
		_elm_lang$core$List$member,
		penultimate,
		{
			ctor: '::',
			_0: 'a',
			_1: {
				ctor: '::',
				_0: 'e',
				_1: {
					ctor: '::',
					_0: 'i',
					_1: {
						ctor: '::',
						_0: 'o',
						_1: {
							ctor: '::',
							_0: 'u',
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}));
};
var _merivale$victor$Theory_Words$guessOngoing = function (base) {
	return _elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 2, base),
		'ee') ? A2(_elm_lang$core$Basics_ops['++'], base, 'ing') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 2, base),
		'ie') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 2, base),
		'ying') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 1, base),
		'e') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 1, base),
		'ing') : A2(_elm_lang$core$Basics_ops['++'], base, 'ing')));
};
var _merivale$victor$Theory_Words$guessPastPrior = function (base) {
	return _elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 1, base),
		'e') ? A2(_elm_lang$core$Basics_ops['++'], base, 'd') : (_merivale$victor$Theory_Words$consontanty(base) ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 1, base),
		'ied') : A2(_elm_lang$core$Basics_ops['++'], base, 'ed'));
};
var _merivale$victor$Theory_Words$guessPresent = function (base) {
	return _merivale$victor$Theory_Words$consontanty(base) ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 1, base),
		'ies') : (A2(
		_elm_lang$core$List$member,
		A2(_elm_lang$core$String$right, 2, base),
		{
			ctor: '::',
			_0: 'ch',
			_1: {
				ctor: '::',
				_0: 'sh',
				_1: {
					ctor: '::',
					_0: 'ss',
					_1: {ctor: '[]'}
				}
			}
		}) ? A2(_elm_lang$core$Basics_ops['++'], base, 'es') : A2(_elm_lang$core$Basics_ops['++'], base, 's'));
};
var _merivale$victor$Theory_Words$guessPlural = function (singular) {
	return _merivale$victor$Theory_Words$consontanty(singular) ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 1, singular),
		'ies') : (A2(
		_elm_lang$core$List$member,
		A2(_elm_lang$core$String$right, 2, singular),
		{
			ctor: '::',
			_0: 'ch',
			_1: {
				ctor: '::',
				_0: 'sh',
				_1: {
					ctor: '::',
					_0: 'ss',
					_1: {ctor: '[]'}
				}
			}
		}) ? A2(_elm_lang$core$Basics_ops['++'], singular, 'es') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 3, singular),
		'sis') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 3, singular),
		'ses') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 3, singular),
		'xis') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 3, singular),
		'xes') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 1, singular),
		'f') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 1, singular),
		'ves') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 2, singular),
		'fe') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 2, singular),
		'fes') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 1, singular),
		'o') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 1, singular),
		'oes') : (_elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 2, singular),
		'ix') ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 2, singular),
		'ices') : A2(_elm_lang$core$Basics_ops['++'], singular, 's'))))))));
};
var _merivale$victor$Theory_Words$ongoing = function (base) {
	var _p0 = A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words$verbs);
	if (_p0.ctor === 'Nothing') {
		return _merivale$victor$Theory_Words$guessOngoing(base);
	} else {
		return _p0._0.ongoing;
	}
};
var _merivale$victor$Theory_Words$prior = function (base) {
	var _p1 = A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words$verbs);
	if (_p1.ctor === 'Nothing') {
		return _merivale$victor$Theory_Words$guessPastPrior(base);
	} else {
		return _p1._0.prior;
	}
};
var _merivale$victor$Theory_Words$past = function (base) {
	var _p2 = A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words$verbs);
	if (_p2.ctor === 'Nothing') {
		return _merivale$victor$Theory_Words$guessPastPrior(base);
	} else {
		return _p2._0.past;
	}
};
var _merivale$victor$Theory_Words$present = function (base) {
	var _p3 = A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words$verbs);
	if (_p3.ctor === 'Nothing') {
		return _merivale$victor$Theory_Words$guessPresent(base);
	} else {
		return _p3._0.present;
	}
};
var _merivale$victor$Theory_Words$plural = function (noun) {
	var _p4 = A2(_elm_lang$core$Dict$get, noun, _merivale$victor$Theory_Words$nouns);
	if (_p4.ctor === 'Nothing') {
		return _merivale$victor$Theory_Words$guessPlural(noun);
	} else {
		return _p4._0;
	}
};

var _merivale$victor$Theory_Nouns$oneOrBody = F2(
	function (quantifier, haystack) {
		var _p0 = quantifier;
		if (_p0.ctor === 'Nothing') {
			return false;
		} else {
			return A2(
				_elm_lang$core$List$member,
				_p0._0,
				{
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Every,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$Some,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Any,
							_1: {ctor: '[]'}
						}
					}
				}) && (A2(
				_elm_lang$core$List$member,
				haystack.category,
				{
					ctor: '::',
					_0: 'one',
					_1: {
						ctor: '::',
						_0: 'body',
						_1: {ctor: '[]'}
					}
				}) && _elm_lang$core$Native_Utils.eq(haystack.description, _elm_lang$core$Maybe$Nothing));
		}
	});
var _merivale$victor$Theory_Nouns$haystackToString = F2(
	function (haystack, plural) {
		var category = plural ? _merivale$victor$Theory_Words$plural(haystack.category) : haystack.category;
		var restriction = A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '[]'},
			A2(_elm_lang$core$Maybe$map, _elm_lang$core$String$words, haystack.restriction));
		var description = A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '[]'},
			A2(_elm_lang$core$Maybe$map, _elm_lang$core$String$words, haystack.description));
		return A2(
			_elm_lang$core$Basics_ops['++'],
			description,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: category,
					_1: {ctor: '[]'}
				},
				restriction));
	});
var _merivale$victor$Theory_Nouns$quantifierToString = F4(
	function (oneOrBody, quantifier, other, category) {
		var _p1 = quantifier;
		if (_p1.ctor === 'Nothing') {
			return other ? {
				ctor: '::',
				_0: 'other',
				_1: {ctor: '[]'}
			} : {ctor: '[]'};
		} else {
			if (_p1._0.ctor === 'A') {
				return other ? {
					ctor: '::',
					_0: 'another',
					_1: {ctor: '[]'}
				} : (A2(
					_elm_lang$core$List$member,
					A2(_elm_lang$core$String$left, 1, category),
					{
						ctor: '::',
						_0: 'a',
						_1: {
							ctor: '::',
							_0: 'e',
							_1: {
								ctor: '::',
								_0: 'i',
								_1: {
									ctor: '::',
									_0: 'o',
									_1: {
										ctor: '::',
										_0: 'u',
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}) ? {
					ctor: '::',
					_0: 'an',
					_1: {ctor: '[]'}
				} : {
					ctor: '::',
					_0: 'a',
					_1: {ctor: '[]'}
				});
			} else {
				var _p2 = _p1._0;
				return oneOrBody ? (other ? {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$String$toLower(
							_elm_lang$core$Basics$toString(_p2)),
						category),
					_1: {
						ctor: '::',
						_0: 'else',
						_1: {ctor: '[]'}
					}
				} : {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$String$toLower(
							_elm_lang$core$Basics$toString(_p2)),
						category),
					_1: {ctor: '[]'}
				}) : (other ? {
					ctor: '::',
					_0: _elm_lang$core$String$toLower(
						_elm_lang$core$Basics$toString(_p2)),
					_1: {
						ctor: '::',
						_0: 'other',
						_1: {ctor: '[]'}
					}
				} : {
					ctor: '::',
					_0: _elm_lang$core$String$toLower(
						_elm_lang$core$Basics$toString(_p2)),
					_1: {ctor: '[]'}
				});
			}
		}
	});
var _merivale$victor$Theory_Nouns$quantifierPhrase = F5(
	function (enumerated, quantifier, other, haystack, plural) {
		return (enumerated && A2(_merivale$victor$Theory_Nouns$oneOrBody, quantifier, haystack)) ? A2(
			_elm_lang$core$Basics_ops['++'],
			A4(_merivale$victor$Theory_Nouns$quantifierToString, true, quantifier, other, haystack.category),
			A2(
				_elm_lang$core$Maybe$withDefault,
				{ctor: '[]'},
				A2(_elm_lang$core$Maybe$map, _elm_lang$core$String$words, haystack.restriction))) : A2(
			_elm_lang$core$Basics_ops['++'],
			A4(_merivale$victor$Theory_Nouns$quantifierToString, false, quantifier, other, haystack.category),
			A2(_merivale$victor$Theory_Nouns$haystackToString, haystack, plural));
	});
var _merivale$victor$Theory_Nouns$relativeName = function (string) {
	return A2(_elm_lang$core$Basics_ops['++'], string, '\'s');
};
var _merivale$victor$Theory_Nouns$relativeObject = function (object) {
	var _p3 = object;
	switch (_p3.ctor) {
		case 'Speaker':
			return 'my';
		case 'Hearer':
			return 'your';
		case 'Male':
			return A2(
				_elm_lang$core$Maybe$withDefault,
				'his',
				A2(_elm_lang$core$Maybe$map, _merivale$victor$Theory_Nouns$relativeName, _p3._0));
		case 'Female':
			return A2(
				_elm_lang$core$Maybe$withDefault,
				'her',
				A2(_elm_lang$core$Maybe$map, _merivale$victor$Theory_Nouns$relativeName, _p3._0));
		case 'Thing':
			return A2(
				_elm_lang$core$Maybe$withDefault,
				'its',
				A2(_elm_lang$core$Maybe$map, _merivale$victor$Theory_Nouns$relativeName, _p3._0));
		case 'Speakers':
			return 'our';
		case 'Hearers':
			return 'your';
		default:
			return A2(
				_elm_lang$core$Maybe$withDefault,
				'their',
				A2(_elm_lang$core$Maybe$map, _merivale$victor$Theory_Nouns$relativeName, _p3._0));
	}
};
var _merivale$victor$Theory_Nouns$pointerToString = F3(
	function (pointer, plural, other) {
		var _p4 = pointer;
		switch (_p4.ctor) {
			case 'The':
				return 'the';
			case 'This':
				return plural ? 'these' : 'this';
			case 'That':
				return plural ? 'those' : 'that';
			default:
				return _merivale$victor$Theory_Nouns$relativeObject(_p4._0);
		}
	});
var _merivale$victor$Theory_Nouns$pointerPhrase = F4(
	function (pointer, other, haystack, plural) {
		return other ? A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: A3(_merivale$victor$Theory_Nouns$pointerToString, pointer, plural, other),
				_1: {
					ctor: '::',
					_0: 'other',
					_1: {ctor: '[]'}
				}
			},
			A2(_merivale$victor$Theory_Nouns$haystackToString, haystack, plural)) : {
			ctor: '::',
			_0: A3(_merivale$victor$Theory_Nouns$pointerToString, pointer, plural, other),
			_1: A2(_merivale$victor$Theory_Nouns$haystackToString, haystack, plural)
		};
	});
var _merivale$victor$Theory_Nouns$normalObject = function (object) {
	var _p5 = object;
	switch (_p5.ctor) {
		case 'Speaker':
			return 'me';
		case 'Hearer':
			return 'you';
		case 'Male':
			return A2(_elm_lang$core$Maybe$withDefault, 'him', _p5._0);
		case 'Female':
			return A2(_elm_lang$core$Maybe$withDefault, 'her', _p5._0);
		case 'Thing':
			return A2(_elm_lang$core$Maybe$withDefault, 'it', _p5._0);
		case 'Speakers':
			return 'us';
		case 'Hearers':
			return 'you';
		default:
			return A2(_elm_lang$core$Maybe$withDefault, 'them', _p5._0);
	}
};
var _merivale$victor$Theory_Nouns$reflexiveObject = function (object) {
	var _p6 = object;
	switch (_p6.ctor) {
		case 'Speaker':
			return 'myself';
		case 'Hearer':
			return 'yourself';
		case 'Male':
			return 'himself';
		case 'Female':
			return 'herself';
		case 'Thing':
			return 'itself';
		case 'Speakers':
			return 'ourselves';
		case 'Hearers':
			return 'yourselves';
		default:
			return 'themselves';
	}
};
var _merivale$victor$Theory_Nouns$subject = function (object) {
	var _p7 = object;
	switch (_p7.ctor) {
		case 'Speaker':
			return 'I';
		case 'Hearer':
			return 'you';
		case 'Male':
			return A2(_elm_lang$core$Maybe$withDefault, 'he', _p7._0);
		case 'Female':
			return A2(_elm_lang$core$Maybe$withDefault, 'she', _p7._0);
		case 'Thing':
			return A2(_elm_lang$core$Maybe$withDefault, 'it', _p7._0);
		case 'Speakers':
			return 'we';
		case 'Hearers':
			return 'you';
		default:
			return A2(_elm_lang$core$Maybe$withDefault, 'they', _p7._0);
	}
};

var _merivale$victor$Theory_Plain$unpack = function (nucleus) {
	return {
		past: false,
		prior: false,
		ongoing: false,
		projective: false,
		negateObject: false,
		objectOverride: false,
		balanceObject: function () {
			var _p0 = nucleus.balance;
			if (_p0.ctor === 'Nothing') {
				return false;
			} else {
				var _p1 = _p0._0;
				if (_p1.ctor === 'DifferentObject') {
					return true;
				} else {
					return false;
				}
			}
		}(),
		balanceOverride: false,
		subject: {
			ctor: '::',
			_0: _merivale$victor$Theory_Nouns$subject(nucleus.object),
			_1: {ctor: '[]'}
		},
		modality: _elm_lang$core$Maybe$Nothing,
		negatedModality: false,
		negatedFulcrum: false,
		abbreviateFulcrum: nucleus.abbreviateFulcrum,
		abbreviateNot: nucleus.abbreviateNot,
		amNeeded: _elm_lang$core$Native_Utils.eq(nucleus.object, _merivale$victor$Theory_Messages$Speaker),
		isNeeded: function () {
			var _p2 = nucleus.object;
			switch (_p2.ctor) {
				case 'Male':
					return true;
				case 'Female':
					return true;
				case 'Thing':
					return true;
				default:
					return false;
			}
		}(),
		verb: nucleus.pivot,
		pre1: {ctor: '[]'},
		pre2: {ctor: '[]'},
		counter: function () {
			var _p3 = nucleus.balance;
			if (_p3.ctor === 'Nothing') {
				return {ctor: '[]'};
			} else {
				var _p4 = _p3._0;
				switch (_p4.ctor) {
					case 'SameObject':
						return {
							ctor: '::',
							_0: _merivale$victor$Theory_Nouns$reflexiveObject(nucleus.object),
							_1: {ctor: '[]'}
						};
					case 'DifferentObject':
						return {
							ctor: '::',
							_0: _merivale$victor$Theory_Nouns$normalObject(_p4._0),
							_1: {ctor: '[]'}
						};
					default:
						return _elm_lang$core$String$words(_p4._0);
				}
			}
		}(),
		post: {ctor: '[]'}
	};
};
var _merivale$victor$Theory_Plain$Vars = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return {past: a, prior: b, ongoing: c, projective: d, negateObject: e, objectOverride: f, balanceObject: g, balanceOverride: h, subject: i, modality: j, negatedModality: k, negatedFulcrum: l, abbreviateNot: m, abbreviateFulcrum: n, amNeeded: o, isNeeded: p, verb: q, pre1: r, pre2: s, counter: t, post: u};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};

var _merivale$victor$Theory_Fulcrums$verb = F4(
	function (fulcrum, past, amNeeded, isNeeded) {
		return _elm_lang$core$Native_Utils.eq(fulcrum, 'be') ? (past ? ((amNeeded || isNeeded) ? 'was' : 'were') : (amNeeded ? 'am' : (isNeeded ? 'is' : 'are'))) : (past ? _merivale$victor$Theory_Words$past(fulcrum) : (isNeeded ? _merivale$victor$Theory_Words$present(fulcrum) : fulcrum));
	});
var _merivale$victor$Theory_Fulcrums$modal = F3(
	function (modality, past, negated) {
		var _p0 = modality;
		switch (_p0.ctor) {
			case 'SoftYes':
				return past ? 'would' : 'will';
			case 'HardYes':
				return negated ? 'need' : 'must';
			case 'SoftMaybe':
				return past ? 'might' : 'may';
			case 'HardMaybe':
				return past ? 'could' : 'can';
			case 'SoftYesIsh':
				return 'should';
			case 'HardYesIsh':
				return 'ought';
			case 'Permission':
				return past ? 'might' : 'may';
			case 'Command':
				return past ? 'should' : 'shall';
			default:
				return 'dare';
		}
	});
var _merivale$victor$Theory_Fulcrums$abbreviate = function (fulcrum) {
	var _p1 = function () {
		var _p2 = _elm_lang$core$String$words(fulcrum);
		if (_p2.ctor === '::') {
			var _p5 = _p2._1;
			var _p4 = _p2._0;
			var _p3 = _p4;
			switch (_p3) {
				case 'am':
					return {ctor: '_Tuple2', _0: '\'m', _1: _p5};
				case 'is':
					return {ctor: '_Tuple2', _0: '\'s', _1: _p5};
				case 'are':
					return {ctor: '_Tuple2', _0: '\'re', _1: _p5};
				case 'have':
					return {ctor: '_Tuple2', _0: '\'ve', _1: _p5};
				case 'has':
					return {ctor: '_Tuple2', _0: '\'s', _1: _p5};
				case 'had':
					return {ctor: '_Tuple2', _0: '\'d', _1: _p5};
				case 'will':
					return {ctor: '_Tuple2', _0: '\'ll', _1: _p5};
				case 'would':
					return {ctor: '_Tuple2', _0: '\'d', _1: _p5};
				default:
					return {
						ctor: '_Tuple2',
						_0: A2(_elm_lang$core$Basics_ops['++'], ' ', _p4),
						_1: _p5
					};
			}
		} else {
			return {
				ctor: '_Tuple2',
				_0: '',
				_1: {ctor: '[]'}
			};
		}
	}();
	var head = _p1._0;
	var tail = _p1._1;
	return A2(
		_elm_lang$core$String$join,
		' ',
		{ctor: '::', _0: head, _1: tail});
};
var _merivale$victor$Theory_Fulcrums$ntAble = function (fulcrum) {
	return A2(
		_elm_lang$core$List$member,
		fulcrum,
		{
			ctor: '::',
			_0: 'is',
			_1: {
				ctor: '::',
				_0: 'are',
				_1: {
					ctor: '::',
					_0: 'was',
					_1: {
						ctor: '::',
						_0: 'were',
						_1: {
							ctor: '::',
							_0: 'have',
							_1: {
								ctor: '::',
								_0: 'has',
								_1: {
									ctor: '::',
									_0: 'had',
									_1: {
										ctor: '::',
										_0: 'do',
										_1: {
											ctor: '::',
											_0: 'does',
											_1: {
												ctor: '::',
												_0: 'did',
												_1: {
													ctor: '::',
													_0: 'would',
													_1: {
														ctor: '::',
														_0: 'could',
														_1: {
															ctor: '::',
															_0: 'should',
															_1: {
																ctor: '::',
																_0: 'must',
																_1: {
																	ctor: '::',
																	_0: 'need',
																	_1: {
																		ctor: '::',
																		_0: 'dare',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});
};
var _merivale$victor$Theory_Fulcrums$negate = F2(
	function (fulcrum, abbreviateNot) {
		return abbreviateNot ? (_merivale$victor$Theory_Fulcrums$ntAble(fulcrum) ? A2(_elm_lang$core$Basics_ops['++'], fulcrum, 'n\'t') : (_elm_lang$core$Native_Utils.eq(fulcrum, 'will') ? 'won\'t' : (_elm_lang$core$Native_Utils.eq(fulcrum, 'can') ? 'can\'t' : (_elm_lang$core$Native_Utils.eq(fulcrum, 'shall') ? 'shan\'t' : A2(_elm_lang$core$Basics_ops['++'], fulcrum, ' not'))))) : A2(_elm_lang$core$Basics_ops['++'], fulcrum, ' not');
	});

var _merivale$victor$Theory_Elaborations$displaceVerb = F4(
	function (vars, newVerb, inter, oldTransformation) {
		var extendedPre2 = A2(
			_elm_lang$core$Basics_ops['++'],
			vars.pre1,
			{
				ctor: '::',
				_0: oldTransformation(vars.verb),
				_1: vars.pre2
			});
		var _p0 = inter;
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$Native_Utils.update(
				vars,
				{
					verb: newVerb,
					pre1: {ctor: '[]'},
					pre2: extendedPre2
				});
		} else {
			return _elm_lang$core$Native_Utils.update(
				vars,
				{
					verb: newVerb,
					pre1: {ctor: '[]'},
					pre2: {ctor: '::', _0: _p0._0, _1: extendedPre2}
				});
		}
	});
var _merivale$victor$Theory_Elaborations$amassed = F6(
	function (target, quantifier, other, haystack, countable, vars) {
		if (!A2(
			_elm_lang$core$List$member,
			A2(_elm_lang$core$Maybe$withDefault, _merivale$victor$Theory_Messages$All, quantifier),
			{
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$Some,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Any,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$All,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Much,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Messages$Most,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Theory_Messages$Enough,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			})) {
			return _elm_lang$core$Result$Err('this quantifier cannot be used in amassed elaborations');
		} else {
			if (_elm_lang$core$Native_Utils.eq(
				quantifier,
				_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Much)) && countable) {
				return _elm_lang$core$Result$Err('the MUCH quantifier cannot be used with countable categories');
			} else {
				var quantifierPhrase = A5(_merivale$victor$Theory_Nouns$quantifierPhrase, false, quantifier, other, haystack, countable);
				var _p1 = target;
				if (_p1.ctor === 'MainObject') {
					if (vars.objectOverride) {
						return _elm_lang$core$Result$Err('the main object cannot be overridden twice');
					} else {
						var newVars = A2(
							_elm_lang$core$List$member,
							quantifier,
							{
								ctor: '::',
								_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Some),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Any),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$All),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Much),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Enough),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}) ? _elm_lang$core$Native_Utils.update(
							vars,
							{negateObject: true}) : vars;
						return _elm_lang$core$Result$Ok(
							_elm_lang$core$Native_Utils.update(
								newVars,
								{objectOverride: true, amNeeded: false, isNeeded: !countable, subject: quantifierPhrase}));
					}
				} else {
					return (!vars.balanceObject) ? _elm_lang$core$Result$Err('there is no balancing object to override') : (vars.balanceOverride ? _elm_lang$core$Result$Err('the balancing object cannot be overridden twice') : _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							vars,
							{negateObject: false, balanceOverride: true, counter: quantifierPhrase})));
				}
			}
		}
	});
var _merivale$victor$Theory_Elaborations$enumerated = F5(
	function (target, quantifier, other, haystack, vars) {
		if (!A2(
			_elm_lang$core$List$member,
			quantifier,
			{
				ctor: '::',
				_0: _merivale$victor$Theory_Messages$A,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Several,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$Many,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Each,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Messages$Every,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Theory_Messages$Both,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Theory_Messages$Some,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Theory_Messages$Any,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			})) {
			return _elm_lang$core$Result$Err('this quantifier cannot be used in enumerated elaborations');
		} else {
			var plural = A2(
				_elm_lang$core$List$member,
				quantifier,
				{
					ctor: '::',
					_0: _merivale$victor$Theory_Messages$Several,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Messages$Many,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Both,
							_1: {ctor: '[]'}
						}
					}
				});
			var quantifierPhrase = A5(
				_merivale$victor$Theory_Nouns$quantifierPhrase,
				true,
				_elm_lang$core$Maybe$Just(quantifier),
				other,
				haystack,
				plural);
			var _p2 = target;
			if (_p2.ctor === 'MainObject') {
				if (vars.objectOverride) {
					return _elm_lang$core$Result$Err('the main object cannot be overridden twice');
				} else {
					var newVars = A2(
						_elm_lang$core$List$member,
						quantifier,
						{
							ctor: '::',
							_0: _merivale$victor$Theory_Messages$Many,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Messages$Every,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Theory_Messages$Both,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Theory_Messages$Some,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Theory_Messages$Any,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}) ? _elm_lang$core$Native_Utils.update(
						vars,
						{negateObject: true}) : vars;
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							newVars,
							{objectOverride: true, amNeeded: false, isNeeded: !plural, subject: quantifierPhrase}));
				}
			} else {
				return (!vars.balanceObject) ? _elm_lang$core$Result$Err('there is no balancing object to override') : (vars.balanceOverride ? _elm_lang$core$Result$Err('the balancing object cannot be overridden twice') : _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						vars,
						{negateObject: false, balanceOverride: true, counter: quantifierPhrase})));
			}
		}
	});
var _merivale$victor$Theory_Elaborations$indirect = F6(
	function (target, pointer, other, haystack, plural, vars) {
		var _p3 = target;
		if (_p3.ctor === 'MainObject') {
			return vars.objectOverride ? _elm_lang$core$Result$Err('the main object cannot be overridden twice') : _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					vars,
					{
						objectOverride: true,
						amNeeded: false,
						isNeeded: !plural,
						subject: A4(_merivale$victor$Theory_Nouns$pointerPhrase, pointer, other, haystack, plural)
					}));
		} else {
			return (!vars.balanceObject) ? _elm_lang$core$Result$Err('there is no balancing object to override') : (vars.balanceOverride ? _elm_lang$core$Result$Err('the balancing object cannot be overridden twice') : _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					vars,
					{
						balanceOverride: true,
						counter: A4(_merivale$victor$Theory_Nouns$pointerPhrase, pointer, other, haystack, plural)
					})));
		}
	});
var _merivale$victor$Theory_Elaborations$apparent = F2(
	function (preferSeem, vars) {
		if (vars.past) {
			return _elm_lang$core$Result$Err('past messages cannot be made apparent');
		} else {
			if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
				return _elm_lang$core$Result$Err('messages with a modality cannot be made apparent');
			} else {
				var newVerb = preferSeem ? 'seem' : 'appear';
				var newVars = A4(
					_merivale$victor$Theory_Elaborations$displaceVerb,
					vars,
					newVerb,
					_elm_lang$core$Maybe$Just('to'),
					_elm_lang$core$Basics$identity);
				return _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						newVars,
						{prior: false, ongoing: false, negateObject: false}));
			}
		}
	});
var _merivale$victor$Theory_Elaborations$imminent = function (vars) {
	if (vars.past) {
		return _elm_lang$core$Result$Err('past messages cannot be made imminent');
	} else {
		if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
			return _elm_lang$core$Result$Err('messages with a modality cannot be made imminent');
		} else {
			var newVars = A4(
				_merivale$victor$Theory_Elaborations$displaceVerb,
				vars,
				'be',
				_elm_lang$core$Maybe$Just('about to'),
				_elm_lang$core$Basics$identity);
			return _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					newVars,
					{prior: false, ongoing: false, negateObject: false}));
		}
	}
};
var _merivale$victor$Theory_Elaborations$determined = F2(
	function (time, vars) {
		if (vars.past) {
			return _elm_lang$core$Result$Err('past messages cannot be made determined');
		} else {
			if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
				return _elm_lang$core$Result$Err('messages with a modality cannot be made determined');
			} else {
				var newVars = A4(
					_merivale$victor$Theory_Elaborations$displaceVerb,
					vars,
					'be',
					_elm_lang$core$Maybe$Just('going to'),
					_elm_lang$core$Basics$identity);
				var _p4 = time;
				if (_p4.ctor === 'Nothing') {
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							newVars,
							{prior: false, ongoing: true, negateObject: false}));
				} else {
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							newVars,
							{
								prior: false,
								ongoing: true,
								negateObject: false,
								post: A2(
									_elm_lang$core$Basics_ops['++'],
									vars.post,
									{
										ctor: '::',
										_0: _p4._0,
										_1: {ctor: '[]'}
									})
							}));
				}
			}
		}
	});
var _merivale$victor$Theory_Elaborations$ongoing = function (vars) {
	if (vars.past) {
		return _elm_lang$core$Result$Err('past messages cannot be made ongoing');
	} else {
		if (vars.prior) {
			return _elm_lang$core$Result$Err('prior messages cannot be made ongoing');
		} else {
			if (vars.ongoing) {
				return _elm_lang$core$Result$Err('ongoing messages cannot be made ongoing');
			} else {
				if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
					return _elm_lang$core$Result$Err('messages with a modality cannot be made ongoing');
				} else {
					var newVars = A4(_merivale$victor$Theory_Elaborations$displaceVerb, vars, 'be', _elm_lang$core$Maybe$Nothing, _merivale$victor$Theory_Words$ongoing);
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							newVars,
							{ongoing: true, negateObject: false}));
				}
			}
		}
	}
};
var _merivale$victor$Theory_Elaborations$scattered = F2(
	function (tally, vars) {
		return vars.past ? _elm_lang$core$Result$Err('past messages cannot be made scattered') : ((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) ? _elm_lang$core$Result$Err('messages with a modality cannot be made scattered') : _elm_lang$core$Result$Ok(
			_elm_lang$core$Native_Utils.update(
				vars,
				{
					negateObject: false,
					post: A2(
						_elm_lang$core$Basics_ops['++'],
						vars.post,
						{
							ctor: '::',
							_0: tally,
							_1: {ctor: '[]'}
						})
				})));
	});
var _merivale$victor$Theory_Elaborations$extended = F2(
	function (duration, vars) {
		return vars.past ? _elm_lang$core$Result$Err('past messages cannot be made extended') : (vars.prior ? _elm_lang$core$Result$Err('prior messages cannot be made extended') : ((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) ? _elm_lang$core$Result$Err('messages with a modality cannot be made extended') : _elm_lang$core$Result$Ok(
			_elm_lang$core$Native_Utils.update(
				vars,
				{
					negateObject: false,
					post: A2(
						_elm_lang$core$Basics_ops['++'],
						vars.post,
						{
							ctor: '::',
							_0: duration,
							_1: {ctor: '[]'}
						})
				}))));
	});
var _merivale$victor$Theory_Elaborations$regular = F2(
	function (frequency, vars) {
		if (vars.past) {
			return _elm_lang$core$Result$Err('past messages cannot be made regular');
		} else {
			if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
				return _elm_lang$core$Result$Err('messages with a modality cannot be made regular');
			} else {
				var _p5 = frequency;
				if (_p5.ctor === 'Nothing') {
					return _elm_lang$core$Result$Ok(vars);
				} else {
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							vars,
							{
								negateObject: false,
								pre1: {ctor: '::', _0: _p5._0, _1: vars.pre1}
							}));
				}
			}
		}
	});
var _merivale$victor$Theory_Elaborations$preordained = F2(
	function (time, vars) {
		if (vars.past) {
			return _elm_lang$core$Result$Err('past messages cannot be made preordained');
		} else {
			if (vars.prior) {
				return _elm_lang$core$Result$Err('prior messages cannot be made preordained');
			} else {
				if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
					return _elm_lang$core$Result$Err('messages with a modality cannot be made preordained');
				} else {
					var _p6 = time;
					if (_p6.ctor === 'Nothing') {
						return _elm_lang$core$Result$Ok(vars);
					} else {
						return _elm_lang$core$Result$Ok(
							_elm_lang$core$Native_Utils.update(
								vars,
								{
									negateObject: false,
									post: A2(
										_elm_lang$core$Basics_ops['++'],
										vars.post,
										{
											ctor: '::',
											_0: _p6._0,
											_1: {ctor: '[]'}
										})
								}));
					}
				}
			}
		}
	});
var _merivale$victor$Theory_Elaborations$evasive = F2(
	function (modality, vars) {
		return vars.past ? _elm_lang$core$Result$Err('past messages cannot be made evasive') : ((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) ? _elm_lang$core$Result$Err('messages with a modality cannot be elaborated with another modality') : _elm_lang$core$Result$Ok(
			_elm_lang$core$Native_Utils.update(
				vars,
				{
					negateObject: false,
					modality: _elm_lang$core$Maybe$Just(modality)
				})));
	});
var _merivale$victor$Theory_Elaborations$projective = F3(
	function (modality, time, vars) {
		if (vars.past) {
			return _elm_lang$core$Result$Err('past messages cannot be made projective');
		} else {
			if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
				return _elm_lang$core$Result$Err('messages with a modality cannot be elaborated with another modality');
			} else {
				var _p7 = time;
				if (_p7.ctor === 'Nothing') {
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							vars,
							{
								projective: true,
								negateObject: false,
								modality: _elm_lang$core$Maybe$Just(modality)
							}));
				} else {
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							vars,
							{
								projective: true,
								negateObject: false,
								modality: _elm_lang$core$Maybe$Just(modality),
								post: A2(
									_elm_lang$core$Basics_ops['++'],
									vars.post,
									{
										ctor: '::',
										_0: _p7._0,
										_1: {ctor: '[]'}
									})
							}));
				}
			}
		}
	});
var _merivale$victor$Theory_Elaborations$practical = F2(
	function (modality, vars) {
		return vars.past ? _elm_lang$core$Result$Err('past messages cannot be made practical') : ((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) ? _elm_lang$core$Result$Err('messages with a modality cannot be elaborated with another modality') : _elm_lang$core$Result$Ok(
			_elm_lang$core$Native_Utils.update(
				vars,
				{
					negateObject: false,
					modality: _elm_lang$core$Maybe$Just(modality)
				})));
	});
var _merivale$victor$Theory_Elaborations$prior = function (vars) {
	if (vars.prior) {
		return _elm_lang$core$Result$Err('prior messages cannot be made more prior');
	} else {
		if ((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) && (vars.projective && (!vars.past))) {
			return _elm_lang$core$Result$Err('only past projective messages can be prior');
		} else {
			if ((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) && (!vars.projective)) {
				return _elm_lang$core$Result$Err('practical and evasive messages cannot be prior');
			} else {
				var newVars = A4(_merivale$victor$Theory_Elaborations$displaceVerb, vars, 'have', _elm_lang$core$Maybe$Nothing, _merivale$victor$Theory_Words$prior);
				return _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						newVars,
						{prior: true, ongoing: false}));
			}
		}
	}
};
var _merivale$victor$Theory_Elaborations$past = function (vars) {
	return vars.past ? _elm_lang$core$Result$Err('past messages cannot be made more past') : (_elm_lang$core$Native_Utils.eq(
		vars.modality,
		_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$HardYes)) ? _elm_lang$core$Result$Err('messages with the HARD YES modality (MUST/NEED) cannot be made past') : (_elm_lang$core$Native_Utils.eq(
		vars.modality,
		_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$SoftYesIsh)) ? _elm_lang$core$Result$Err('messages with the SOFT YES-ISH modality (SHOULD) cannot be made past') : (_elm_lang$core$Native_Utils.eq(
		vars.modality,
		_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$HardYesIsh)) ? _elm_lang$core$Result$Err('messages with the HARD YES-ISH modality (OUGHT) cannot be made past') : (_elm_lang$core$Native_Utils.eq(
		vars.modality,
		_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Messages$Dare)) ? _elm_lang$core$Result$Err('messages with the DARE modality (DARE) cannot be made past') : _elm_lang$core$Result$Ok(
		_elm_lang$core$Native_Utils.update(
			vars,
			{past: true}))))));
};
var _merivale$victor$Theory_Elaborations$negative = function (vars) {
	if (vars.negateObject) {
		var _p8 = vars.subject;
		_v8_3:
		do {
			if (_p8.ctor === '::') {
				switch (_p8._0) {
					case 'some':
						return _elm_lang$core$Result$Ok(
							_elm_lang$core$Native_Utils.update(
								vars,
								{
									subject: {ctor: '::', _0: 'no', _1: _p8._1}
								}));
					case 'someone':
						return _elm_lang$core$Result$Ok(
							_elm_lang$core$Native_Utils.update(
								vars,
								{
									subject: {ctor: '::', _0: 'no one', _1: _p8._1}
								}));
					case 'somebody':
						return _elm_lang$core$Result$Ok(
							_elm_lang$core$Native_Utils.update(
								vars,
								{
									subject: {ctor: '::', _0: 'nobody', _1: _p8._1}
								}));
					default:
						break _v8_3;
				}
			} else {
				break _v8_3;
			}
		} while(false);
		return _elm_lang$core$Result$Ok(
			_elm_lang$core$Native_Utils.update(
				vars,
				{
					subject: {ctor: '::', _0: 'not', _1: vars.subject}
				}));
	} else {
		var _p9 = vars.modality;
		if (_p9.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					vars,
					{
						pre1: {ctor: '::', _0: 'not', _1: vars.pre1}
					}));
		} else {
			var _p10 = _p9._0;
			switch (_p10.ctor) {
				case 'SoftYes':
					return _elm_lang$core$Result$Err('the SOFT YES modality (WILL) cannot be negated');
				case 'SoftMaybe':
					return _elm_lang$core$Result$Err('the SOFT MAYBE modality (MAY) cannot be negated');
				case 'SoftYesIsh':
					return _elm_lang$core$Result$Err('the SOFT YES-ISH modality (SHOULD) cannot be negated');
				case 'HardYesIsh':
					return _elm_lang$core$Result$Err('the HARD YES-ISH modality (OUGHT) cannot be negated');
				case 'Command':
					return _elm_lang$core$Result$Err('the COMMAND modality (SHALL) cannot be negated');
				default:
					return _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							vars,
							{
								negatedModality: true,
								pre1: {ctor: '::', _0: 'not', _1: vars.pre1}
							}));
			}
		}
	}
};
var _merivale$victor$Theory_Elaborations$explode = function (message) {
	var _p11 = message;
	switch (_p11.ctor) {
		case 'Plain':
			return _elm_lang$core$Result$Ok(
				_merivale$victor$Theory_Plain$unpack(_p11._0));
		case 'Negative':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$negative,
				_merivale$victor$Theory_Elaborations$explode(_p11._0));
		case 'Past':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$past,
				_merivale$victor$Theory_Elaborations$explode(_p11._0));
		case 'Prior':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$prior,
				_merivale$victor$Theory_Elaborations$explode(_p11._0));
		case 'Practical':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$practical(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Projective':
			return A2(
				_elm_lang$core$Result$andThen,
				A2(_merivale$victor$Theory_Elaborations$projective, _p11._0, _p11._1),
				_merivale$victor$Theory_Elaborations$explode(_p11._2));
		case 'Evasive':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$evasive(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Preordained':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$preordained(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Regular':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$regular(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Extended':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$extended(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Scattered':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$scattered(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Ongoing':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$ongoing,
				_merivale$victor$Theory_Elaborations$explode(_p11._0));
		case 'Determined':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$determined(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Imminent':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$imminent,
				_merivale$victor$Theory_Elaborations$explode(_p11._0));
		case 'Apparent':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Elaborations$apparent(_p11._0),
				_merivale$victor$Theory_Elaborations$explode(_p11._1));
		case 'Indirect':
			return A2(
				_elm_lang$core$Result$andThen,
				A5(_merivale$victor$Theory_Elaborations$indirect, _p11._0, _p11._1, _p11._2, _p11._3, _p11._4),
				_merivale$victor$Theory_Elaborations$explode(_p11._5));
		case 'Enumerated':
			return A2(
				_elm_lang$core$Result$andThen,
				A4(_merivale$victor$Theory_Elaborations$enumerated, _p11._0, _p11._1, _p11._2, _p11._3),
				_merivale$victor$Theory_Elaborations$explode(_p11._4));
		default:
			return A2(
				_elm_lang$core$Result$andThen,
				A5(_merivale$victor$Theory_Elaborations$amassed, _p11._0, _p11._1, _p11._2, _p11._3, _p11._4),
				_merivale$victor$Theory_Elaborations$explode(_p11._5));
	}
};

var _merivale$victor$Theory_Sentences$fulcrum = F2(
	function (vars, negate) {
		var defaultFulcrum = function () {
			var _p0 = vars.modality;
			if (_p0.ctor === 'Nothing') {
				return (_elm_lang$core$Native_Utils.eq(vars.verb, 'be') || (vars.prior || (!A2(_elm_lang$core$List$member, 'not', vars.pre1)))) ? A4(_merivale$victor$Theory_Fulcrums$verb, vars.verb, vars.past, vars.amNeeded, vars.isNeeded) : A4(_merivale$victor$Theory_Fulcrums$verb, 'do', vars.past, vars.amNeeded, vars.isNeeded);
			} else {
				return A3(_merivale$victor$Theory_Fulcrums$modal, _p0._0, vars.past, vars.negatedModality);
			}
		}();
		return negate ? A2(_merivale$victor$Theory_Fulcrums$negate, defaultFulcrum, vars.abbreviateNot) : defaultFulcrum;
	});
var _merivale$victor$Theory_Sentences$subjectAndFulcrum = F2(
	function (vars, negateFulcrum) {
		return (vars.abbreviateFulcrum && (!vars.objectOverride)) ? A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$String$join, ' ', vars.subject),
			_merivale$victor$Theory_Fulcrums$abbreviate(
				A2(_merivale$victor$Theory_Sentences$fulcrum, vars, negateFulcrum))) : A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$String$join, ' ', vars.subject),
			A2(
				_elm_lang$core$Basics_ops['++'],
				' ',
				A2(_merivale$victor$Theory_Sentences$fulcrum, vars, negateFulcrum)));
	});
var _merivale$victor$Theory_Sentences$splitAtNot = F3(
	function (index, pre1, pre2) {
		splitAtNot:
		while (true) {
			var _p1 = _elm_lang$core$List$head(
				A2(_elm_lang$core$List$drop, index, pre1));
			if (_p1.ctor === 'Nothing') {
				return {ctor: '_Tuple2', _0: pre1, _1: pre2};
			} else {
				if (_elm_lang$core$Native_Utils.eq(_p1._0, 'not')) {
					return {
						ctor: '_Tuple2',
						_0: A2(_elm_lang$core$List$take, index, pre1),
						_1: A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_elm_lang$core$List$drop, index, pre1),
							pre2)
					};
				} else {
					var _v2 = index + 1,
						_v3 = pre1,
						_v4 = pre2;
					index = _v2;
					pre1 = _v3;
					pre2 = _v4;
					continue splitAtNot;
				}
			}
		}
	});
var _merivale$victor$Theory_Sentences$shiftNotToBool = function (pre2) {
	var _p2 = pre2;
	if ((_p2.ctor === '::') && (_p2._0 === 'not')) {
		return {ctor: '_Tuple2', _0: true, _1: _p2._1};
	} else {
		return {ctor: '_Tuple2', _0: false, _1: pre2};
	}
};
var _merivale$victor$Theory_Sentences$rejigPre = function (vars) {
	return (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) ? {
		ctor: '_Tuple2',
		_0: {ctor: '[]'},
		_1: A2(
			_elm_lang$core$Basics_ops['++'],
			vars.pre1,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: vars.verb,
					_1: {ctor: '[]'}
				},
				vars.pre2))
	} : ((_elm_lang$core$Native_Utils.eq(vars.verb, 'be') || vars.prior) ? {
		ctor: '_Tuple2',
		_0: {ctor: '[]'},
		_1: A2(_elm_lang$core$Basics_ops['++'], vars.pre1, vars.pre2)
	} : (A2(_elm_lang$core$List$member, 'not', vars.pre1) ? A3(
		_merivale$victor$Theory_Sentences$splitAtNot,
		0,
		vars.pre1,
		{ctor: '::', _0: vars.verb, _1: vars.pre2}) : {ctor: '_Tuple2', _0: vars.pre1, _1: vars.pre2}));
};
var _merivale$victor$Theory_Sentences$implode = function (vars) {
	var _p3 = _merivale$victor$Theory_Sentences$rejigPre(vars);
	var pre1 = _p3._0;
	var tempPre2 = _p3._1;
	var _p4 = _merivale$victor$Theory_Sentences$shiftNotToBool(tempPre2);
	var negateFulcrum = _p4._0;
	var pre2 = _p4._1;
	return _elm_lang$core$List$isEmpty(pre1) ? _elm_lang$core$Result$Ok(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: A2(_merivale$victor$Theory_Sentences$subjectAndFulcrum, vars, negateFulcrum),
					_1: {ctor: '[]'}
				},
				A2(
					_elm_lang$core$Basics_ops['++'],
					pre2,
					A2(_elm_lang$core$Basics_ops['++'], vars.counter, vars.post))))) : _elm_lang$core$Result$Ok(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				vars.subject,
				A2(
					_elm_lang$core$Basics_ops['++'],
					pre1,
					A2(
						_elm_lang$core$Basics_ops['++'],
						{
							ctor: '::',
							_0: A2(_merivale$victor$Theory_Sentences$fulcrum, vars, negateFulcrum),
							_1: {ctor: '[]'}
						},
						A2(
							_elm_lang$core$Basics_ops['++'],
							pre2,
							A2(_elm_lang$core$Basics_ops['++'], vars.counter, vars.post)))))));
};
var _merivale$victor$Theory_Sentences$sentence = function (message) {
	return A2(
		_elm_lang$core$Result$andThen,
		_merivale$victor$Theory_Sentences$implode,
		_merivale$victor$Theory_Elaborations$explode(message));
};

var _merivale$victor$Interface_View$nucleus = F4(
	function (index, mainOverride, balanceOverride, ingredients) {
		return _merivale$victor$Interface_Input$input(
			{
				elaborationRecipe: _elm_lang$core$Maybe$Nothing,
				showElaborations: ingredients.showElaborations,
				index: index,
				body: {
					ctor: '::',
					_0: A3(_merivale$victor$Interface_Factors$object, index, mainOverride, ingredients),
					_1: {
						ctor: '::',
						_0: A2(_merivale$victor$Interface_Factors$pivot, index, ingredients),
						_1: {
							ctor: '::',
							_0: A3(_merivale$victor$Interface_Factors$balance, index, balanceOverride, ingredients),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	});
var _merivale$victor$Interface_View$input = F4(
	function (index, mainOverride, balanceOverride, model) {
		var _p0 = A2(_elm_lang$core$Array$get, index, model);
		if (_p0.ctor === 'Nothing') {
			return A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('input error'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('recipe index out of range'),
					_1: {ctor: '[]'}
				});
		} else {
			var _p1 = _p0._0;
			if (_p1.ctor === 'MakePlain') {
				return A4(_merivale$victor$Interface_View$nucleus, index, mainOverride, balanceOverride, _p1._0);
			} else {
				return A7(_merivale$victor$Interface_View$elaboration, index, mainOverride, balanceOverride, _p1._0, _p1._1, _p1._2, model);
			}
		}
	});
var _merivale$victor$Interface_View$elaboration = F7(
	function (index, mainOverride, balanceOverride, elaborationRecipe, subIndex, ingredients, model) {
		return _merivale$victor$Interface_Input$input(
			{
				elaborationRecipe: _elm_lang$core$Maybe$Just(elaborationRecipe),
				showElaborations: ingredients.showElaborations,
				index: index,
				body: function () {
					var _p2 = elaborationRecipe;
					switch (_p2.ctor) {
						case 'MakePractical':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$limitedModality, index, ingredients),
								_1: {
									ctor: '::',
									_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
									_1: {ctor: '[]'}
								}
							};
						case 'MakeProjective':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$unlimitedModality, index, ingredients),
								_1: {
									ctor: '::',
									_0: A2(_merivale$victor$Interface_Factors$time, index, ingredients),
									_1: {
										ctor: '::',
										_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
										_1: {ctor: '[]'}
									}
								}
							};
						case 'MakeEvasive':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$limitedModality, index, ingredients),
								_1: {
									ctor: '::',
									_0: A2(_merivale$victor$Interface_Factors$frequency, index, ingredients),
									_1: {
										ctor: '::',
										_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
										_1: {ctor: '[]'}
									}
								}
							};
						case 'MakePreordained':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$time, index, ingredients),
								_1: {
									ctor: '::',
									_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
									_1: {ctor: '[]'}
								}
							};
						case 'MakeRegular':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$frequency, index, ingredients),
								_1: {
									ctor: '::',
									_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
									_1: {ctor: '[]'}
								}
							};
						case 'MakeExtended':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$duration, index, ingredients),
								_1: {
									ctor: '::',
									_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
									_1: {ctor: '[]'}
								}
							};
						case 'MakeScattered':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$tally, index, ingredients),
								_1: {
									ctor: '::',
									_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
									_1: {ctor: '[]'}
								}
							};
						case 'MakeDetermined':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$time, index, ingredients),
								_1: {
									ctor: '::',
									_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
									_1: {ctor: '[]'}
								}
							};
						case 'MakeApparent':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$apparentStyle, index, ingredients),
								_1: {
									ctor: '::',
									_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
									_1: {ctor: '[]'}
								}
							};
						case 'MakeIndirect':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$target, index, ingredients),
								_1: {
									ctor: '::',
									_0: A2(_merivale$victor$Interface_Factors$pointer, index, ingredients),
									_1: {
										ctor: '::',
										_0: A2(_merivale$victor$Interface_Factors$indirectCategory, index, ingredients),
										_1: {
											ctor: '::',
											_0: A2(_merivale$victor$Interface_Factors$categoryFlanks, index, ingredients),
											_1: {
												ctor: '::',
												_0: A6(_merivale$victor$Interface_View$inputWithOverride, ingredients.target, _merivale$victor$Interface_Types$IndirectOverride, subIndex, mainOverride, balanceOverride, model),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							};
						case 'MakeEnumerated':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$target, index, ingredients),
								_1: {
									ctor: '::',
									_0: A2(_merivale$victor$Interface_Factors$enumeratedQuantifier, index, ingredients),
									_1: {
										ctor: '::',
										_0: A2(_merivale$victor$Interface_Factors$enumeratedCategory, index, ingredients),
										_1: {
											ctor: '::',
											_0: A2(_merivale$victor$Interface_Factors$categoryFlanks, index, ingredients),
											_1: {
												ctor: '::',
												_0: A6(_merivale$victor$Interface_View$inputWithOverride, ingredients.target, _merivale$victor$Interface_Types$EnumeratedOverride, subIndex, mainOverride, balanceOverride, model),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							};
						case 'MakeAmassed':
							return {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_Factors$target, index, ingredients),
								_1: {
									ctor: '::',
									_0: A2(_merivale$victor$Interface_Factors$amassedQuantifier, index, ingredients),
									_1: {
										ctor: '::',
										_0: A2(_merivale$victor$Interface_Factors$amassedCategory, index, ingredients),
										_1: {
											ctor: '::',
											_0: A2(_merivale$victor$Interface_Factors$categoryFlanks, index, ingredients),
											_1: {
												ctor: '::',
												_0: A6(_merivale$victor$Interface_View$inputWithOverride, ingredients.target, _merivale$victor$Interface_Types$AmassedOverride, subIndex, mainOverride, balanceOverride, model),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							};
						default:
							return {
								ctor: '::',
								_0: A4(_merivale$victor$Interface_View$input, subIndex, mainOverride, balanceOverride, model),
								_1: {ctor: '[]'}
							};
					}
				}()
			});
	});
var _merivale$victor$Interface_View$inputWithOverride = F6(
	function (target, override, index, mainOverride, balanceOverride, model) {
		var _p3 = target;
		if (_p3.ctor === 'MainObject') {
			return A4(
				_merivale$victor$Interface_View$input,
				index,
				_elm_lang$core$Maybe$Just(override),
				balanceOverride,
				model);
		} else {
			return A4(
				_merivale$victor$Interface_View$input,
				index,
				mainOverride,
				_elm_lang$core$Maybe$Just(override),
				model);
		}
	});
var _merivale$victor$Interface_View$format = function (sentence) {
	var ucFirst = function () {
		var _p4 = _elm_lang$core$String$uncons(sentence);
		if (_p4.ctor === 'Nothing') {
			return _elm_lang$core$String$toUpper(sentence);
		} else {
			return A2(
				_elm_lang$core$String$cons,
				_elm_lang$core$Char$toUpper(_p4._0._0),
				_p4._0._1);
		}
	}();
	return A2(_elm_lang$core$String$append, ucFirst, '.');
};
var _merivale$victor$Interface_View$output = function (model) {
	var _p5 = A2(
		_elm_lang$core$Result$andThen,
		_merivale$victor$Theory_Sentences$sentence,
		A2(_merivale$victor$Interface_Messages$message, 0, model));
	if (_p5.ctor === 'Err') {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('output error'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(_p5._0),
				_1: {ctor: '[]'}
			});
	} else {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('output'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(
					_merivale$victor$Interface_View$format(_p5._0)),
				_1: {ctor: '[]'}
			});
	}
};
var _merivale$victor$Interface_View$root = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('victor'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _merivale$victor$Interface_View$output(model),
			_1: {
				ctor: '::',
				_0: A4(_merivale$victor$Interface_View$input, 0, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing, model),
				_1: {ctor: '[]'}
			}
		});
};

var _merivale$victor$Victor$main = _elm_lang$html$Html$beginnerProgram(
	{model: _merivale$victor$Interface_State$initial, update: _merivale$victor$Interface_State$update, view: _merivale$victor$Interface_View$root})();

var Elm = {};
Elm['Victor'] = Elm['Victor'] || {};
if (typeof _merivale$victor$Victor$main !== 'undefined') {
    _merivale$victor$Victor$main(Elm['Victor'], 'Victor', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

