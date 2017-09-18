
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

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

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

var _merivale$victor$Theory_Plain_Nucleus$isPlural = function (object) {
	var _p0 = object;
	switch (_p0.ctor) {
		case 'Speaker':
			return _p0._0;
		case 'Hearer':
			return _p0._0;
		default:
			return _p0._0;
	}
};
var _merivale$victor$Theory_Plain_Nucleus$isOther = function (object) {
	var _p1 = object;
	if (_p1.ctor === 'Other') {
		return true;
	} else {
		return false;
	}
};
var _merivale$victor$Theory_Plain_Nucleus$isSpeaker = function (object) {
	var _p2 = object;
	if (_p2.ctor === 'Speaker') {
		return true;
	} else {
		return false;
	}
};
var _merivale$victor$Theory_Plain_Nucleus$Other = F3(
	function (a, b, c) {
		return {ctor: 'Other', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Plain_Nucleus$Hearer = function (a) {
	return {ctor: 'Hearer', _0: a};
};
var _merivale$victor$Theory_Plain_Nucleus$Speaker = function (a) {
	return {ctor: 'Speaker', _0: a};
};
var _merivale$victor$Theory_Plain_Nucleus$Female = {ctor: 'Female'};
var _merivale$victor$Theory_Plain_Nucleus$Male = {ctor: 'Male'};
var _merivale$victor$Theory_Plain_Nucleus$Do = F3(
	function (a, b, c) {
		return {ctor: 'Do', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Plain_Nucleus$Be = function (a) {
	return {ctor: 'Be', _0: a};
};
var _merivale$victor$Theory_Plain_Nucleus$Relative = function (a) {
	return {ctor: 'Relative', _0: a};
};
var _merivale$victor$Theory_Plain_Nucleus$Absolute = function (a) {
	return {ctor: 'Absolute', _0: a};
};
var _merivale$victor$Theory_Plain_Nucleus$Different = function (a) {
	return {ctor: 'Different', _0: a};
};
var _merivale$victor$Theory_Plain_Nucleus$SameAsMain = {ctor: 'SameAsMain'};
var _merivale$victor$Theory_Plain_Nucleus$Without = {ctor: 'Without'};
var _merivale$victor$Theory_Plain_Nucleus$With = {ctor: 'With'};
var _merivale$victor$Theory_Plain_Nucleus$Up = {ctor: 'Up'};
var _merivale$victor$Theory_Plain_Nucleus$Under = {ctor: 'Under'};
var _merivale$victor$Theory_Plain_Nucleus$Towards = {ctor: 'Towards'};
var _merivale$victor$Theory_Plain_Nucleus$To = {ctor: 'To'};
var _merivale$victor$Theory_Plain_Nucleus$Through = {ctor: 'Through'};
var _merivale$victor$Theory_Plain_Nucleus$Over = {ctor: 'Over'};
var _merivale$victor$Theory_Plain_Nucleus$Outside = {ctor: 'Outside'};
var _merivale$victor$Theory_Plain_Nucleus$Out = {ctor: 'Out'};
var _merivale$victor$Theory_Plain_Nucleus$Opposite = {ctor: 'Opposite'};
var _merivale$victor$Theory_Plain_Nucleus$On = {ctor: 'On'};
var _merivale$victor$Theory_Plain_Nucleus$Off = {ctor: 'Off'};
var _merivale$victor$Theory_Plain_Nucleus$Of = {ctor: 'Of'};
var _merivale$victor$Theory_Plain_Nucleus$Like = {ctor: 'Like'};
var _merivale$victor$Theory_Plain_Nucleus$Into = {ctor: 'Into'};
var _merivale$victor$Theory_Plain_Nucleus$Inside = {ctor: 'Inside'};
var _merivale$victor$Theory_Plain_Nucleus$In = {ctor: 'In'};
var _merivale$victor$Theory_Plain_Nucleus$From = {ctor: 'From'};
var _merivale$victor$Theory_Plain_Nucleus$For = {ctor: 'For'};
var _merivale$victor$Theory_Plain_Nucleus$Down = {ctor: 'Down'};
var _merivale$victor$Theory_Plain_Nucleus$By = {ctor: 'By'};
var _merivale$victor$Theory_Plain_Nucleus$Beyond = {ctor: 'Beyond'};
var _merivale$victor$Theory_Plain_Nucleus$Below = {ctor: 'Below'};
var _merivale$victor$Theory_Plain_Nucleus$Behind = {ctor: 'Behind'};
var _merivale$victor$Theory_Plain_Nucleus$Before = {ctor: 'Before'};
var _merivale$victor$Theory_Plain_Nucleus$At = {ctor: 'At'};
var _merivale$victor$Theory_Plain_Nucleus$Against = {ctor: 'Against'};
var _merivale$victor$Theory_Plain_Nucleus$After = {ctor: 'After'};
var _merivale$victor$Theory_Plain_Nucleus$Above = {ctor: 'Above'};
var _merivale$victor$Theory_Plain_Nucleus$About = {ctor: 'About'};

var _merivale$victor$Theory_Long_Displacers$Secondary = function (a) {
	return {ctor: 'Secondary', _0: a};
};
var _merivale$victor$Theory_Long_Displacers$Primary = function (a) {
	return {ctor: 'Primary', _0: a};
};
var _merivale$victor$Theory_Long_Displacers$Maybe4 = {ctor: 'Maybe4'};
var _merivale$victor$Theory_Long_Displacers$Maybe3 = {ctor: 'Maybe3'};
var _merivale$victor$Theory_Long_Displacers$Maybe1 = {ctor: 'Maybe1'};
var _merivale$victor$Theory_Long_Displacers$Yes3 = {ctor: 'Yes3'};
var _merivale$victor$Theory_Long_Displacers$Yes2 = {ctor: 'Yes2'};
var _merivale$victor$Theory_Long_Displacers$Yes1 = {ctor: 'Yes1'};

var _merivale$victor$Theory_Object_Pseudo$RelatedTo = function (a) {
	return {ctor: 'RelatedTo', _0: a};
};
var _merivale$victor$Theory_Object_Pseudo$That = {ctor: 'That'};
var _merivale$victor$Theory_Object_Pseudo$This = {ctor: 'This'};
var _merivale$victor$Theory_Object_Pseudo$The = {ctor: 'The'};
var _merivale$victor$Theory_Object_Pseudo$Enough = {ctor: 'Enough'};
var _merivale$victor$Theory_Object_Pseudo$Most = {ctor: 'Most'};
var _merivale$victor$Theory_Object_Pseudo$Much = {ctor: 'Much'};
var _merivale$victor$Theory_Object_Pseudo$All = {ctor: 'All'};
var _merivale$victor$Theory_Object_Pseudo$Any = {ctor: 'Any'};
var _merivale$victor$Theory_Object_Pseudo$Some = {ctor: 'Some'};
var _merivale$victor$Theory_Object_Pseudo$isAmassing = function (quantifier) {
	return A2(
		_elm_lang$core$List$member,
		quantifier,
		{
			ctor: '::',
			_0: _elm_lang$core$Maybe$Nothing,
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Some),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Any),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$All),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Much),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Most),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Enough),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		});
};
var _merivale$victor$Theory_Object_Pseudo$Both = {ctor: 'Both'};
var _merivale$victor$Theory_Object_Pseudo$Every = {ctor: 'Every'};
var _merivale$victor$Theory_Object_Pseudo$Each = {ctor: 'Each'};
var _merivale$victor$Theory_Object_Pseudo$Many = {ctor: 'Many'};
var _merivale$victor$Theory_Object_Pseudo$isNegatable = function (quantifier) {
	var _p0 = quantifier;
	if (_p0.ctor === 'Integer') {
		return true;
	} else {
		return A2(
			_elm_lang$core$List$member,
			quantifier,
			{
				ctor: '::',
				_0: _merivale$victor$Theory_Object_Pseudo$Many,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Object_Pseudo$Every,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Object_Pseudo$Both,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Object_Pseudo$Some,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Object_Pseudo$Any,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			});
	}
};
var _merivale$victor$Theory_Object_Pseudo$Several = {ctor: 'Several'};
var _merivale$victor$Theory_Object_Pseudo$requiresPlural = function (quantifier) {
	var _p1 = quantifier;
	if (_p1.ctor === 'Integer') {
		return !_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$Basics$abs(_p1._0),
			1);
	} else {
		return A2(
			_elm_lang$core$List$member,
			quantifier,
			{
				ctor: '::',
				_0: _merivale$victor$Theory_Object_Pseudo$Several,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Object_Pseudo$Many,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Object_Pseudo$Both,
						_1: {ctor: '[]'}
					}
				}
			});
	}
};
var _merivale$victor$Theory_Object_Pseudo$Integer = function (a) {
	return {ctor: 'Integer', _0: a};
};
var _merivale$victor$Theory_Object_Pseudo$A = {ctor: 'A'};
var _merivale$victor$Theory_Object_Pseudo$isEnumerating = function (quantifier) {
	var _p2 = quantifier;
	if (_p2.ctor === 'Integer') {
		return true;
	} else {
		return A2(
			_elm_lang$core$List$member,
			quantifier,
			{
				ctor: '::',
				_0: _merivale$victor$Theory_Object_Pseudo$A,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Object_Pseudo$Several,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Object_Pseudo$Many,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Object_Pseudo$Each,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Object_Pseudo$Every,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Theory_Object_Pseudo$Both,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Theory_Object_Pseudo$Some,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Theory_Object_Pseudo$Any,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			});
	}
};

var _merivale$victor$Interface_Model_Types$Model = F6(
	function (a, b, c, d, e, f) {
		return {plus: a, object: b, verbality: c, status: d, balances: e, elaborations: f};
	});
var _merivale$victor$Interface_Model_Types$Elaboration = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {plus: a, recipe: b, string1: c, string2: d, string3: e, displacer: f, target: g, pointer: h, quantifier: i, other: j};
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
var _merivale$victor$Interface_Model_Types$ButtonProperties = F3(
	function (a, b, c) {
		return {label: a, signal: b, title: c};
	});
var _merivale$victor$Interface_Model_Types$TextProperties = F4(
	function (a, b, c, d) {
		return {value: a, placeholder: b, signal: c, disabled: d};
	});
var _merivale$victor$Interface_Model_Types$CheckboxProperties = F4(
	function (a, b, c, d) {
		return {id: a, label: b, checked: c, signal: d};
	});
var _merivale$victor$Interface_Model_Types$SelectProperties = F5(
	function (a, b, c, d, e) {
		return {value: a, options: b, equivalent: c, signal: d, toLabel: e};
	});
var _merivale$victor$Interface_Model_Types$MakeAMASSED = {ctor: 'MakeAMASSED'};
var _merivale$victor$Interface_Model_Types$MakeENUMERATED = {ctor: 'MakeENUMERATED'};
var _merivale$victor$Interface_Model_Types$MakeINDIRECT = {ctor: 'MakeINDIRECT'};
var _merivale$victor$Interface_Model_Types$MakeSCATTERED = {ctor: 'MakeSCATTERED'};
var _merivale$victor$Interface_Model_Types$MakeEXTENDED = {ctor: 'MakeEXTENDED'};
var _merivale$victor$Interface_Model_Types$MakeREGULAR = {ctor: 'MakeREGULAR'};
var _merivale$victor$Interface_Model_Types$MakePREORDAINED = {ctor: 'MakePREORDAINED'};
var _merivale$victor$Interface_Model_Types$MakeDISPLACED = {ctor: 'MakeDISPLACED'};
var _merivale$victor$Interface_Model_Types$MakePRIOR = {ctor: 'MakePRIOR'};
var _merivale$victor$Interface_Model_Types$MakePAST = {ctor: 'MakePAST'};
var _merivale$victor$Interface_Model_Types$MakeNEGATIVE = {ctor: 'MakeNEGATIVE'};
var _merivale$victor$Interface_Model_Types$ToggleElaborationOther = function (a) {
	return {ctor: 'ToggleElaborationOther', _0: a};
};
var _merivale$victor$Interface_Model_Types$SetElaborationQuantifierInteger = F2(
	function (a, b) {
		return {ctor: 'SetElaborationQuantifierInteger', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationQuantifier = F2(
	function (a, b) {
		return {ctor: 'SetElaborationQuantifier', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationPointerObjectString = F2(
	function (a, b) {
		return {ctor: 'SetElaborationPointerObjectString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationPointerObject = F2(
	function (a, b) {
		return {ctor: 'SetElaborationPointerObject', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationPointer = F2(
	function (a, b) {
		return {ctor: 'SetElaborationPointer', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationTarget = F2(
	function (a, b) {
		return {ctor: 'SetElaborationTarget', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationDisplacerModality = F2(
	function (a, b) {
		return {ctor: 'SetElaborationDisplacerModality', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationDisplacerStatusRelator = F2(
	function (a, b) {
		return {ctor: 'SetElaborationDisplacerStatusRelator', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationDisplacerStatusString = F2(
	function (a, b) {
		return {ctor: 'SetElaborationDisplacerStatusString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationDisplacerStatus = F2(
	function (a, b) {
		return {ctor: 'SetElaborationDisplacerStatus', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$ToggleElaborationDisplacerVerbalityPassive = function (a) {
	return {ctor: 'ToggleElaborationDisplacerVerbalityPassive', _0: a};
};
var _merivale$victor$Interface_Model_Types$ToggleElaborationDisplacerVerbalityOngoing = function (a) {
	return {ctor: 'ToggleElaborationDisplacerVerbalityOngoing', _0: a};
};
var _merivale$victor$Interface_Model_Types$SetElaborationDisplacerVerbalityString = F2(
	function (a, b) {
		return {ctor: 'SetElaborationDisplacerVerbalityString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationDisplacerVerbality = F2(
	function (a, b) {
		return {ctor: 'SetElaborationDisplacerVerbality', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationDisplacer = F2(
	function (a, b) {
		return {ctor: 'SetElaborationDisplacer', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationString3 = F2(
	function (a, b) {
		return {ctor: 'SetElaborationString3', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationString2 = F2(
	function (a, b) {
		return {ctor: 'SetElaborationString2', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetElaborationString1 = F2(
	function (a, b) {
		return {ctor: 'SetElaborationString1', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$ToggleElaborationPlus = function (a) {
	return {ctor: 'ToggleElaborationPlus', _0: a};
};
var _merivale$victor$Interface_Model_Types$RemoveElaboration = function (a) {
	return {ctor: 'RemoveElaboration', _0: a};
};
var _merivale$victor$Interface_Model_Types$AddElaboration = F2(
	function (a, b) {
		return {ctor: 'AddElaboration', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetBalanceWeightObjectString = F2(
	function (a, b) {
		return {ctor: 'SetBalanceWeightObjectString', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetBalanceWeightObject = F2(
	function (a, b) {
		return {ctor: 'SetBalanceWeightObject', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetBalanceWeight = F2(
	function (a, b) {
		return {ctor: 'SetBalanceWeight', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$SetBalanceRelator = F2(
	function (a, b) {
		return {ctor: 'SetBalanceRelator', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$RemoveBalance = {ctor: 'RemoveBalance'};
var _merivale$victor$Interface_Model_Types$AddBalance = {ctor: 'AddBalance'};
var _merivale$victor$Interface_Model_Types$SetStatusRelator = function (a) {
	return {ctor: 'SetStatusRelator', _0: a};
};
var _merivale$victor$Interface_Model_Types$SetStatusString = function (a) {
	return {ctor: 'SetStatusString', _0: a};
};
var _merivale$victor$Interface_Model_Types$SetStatus = function (a) {
	return {ctor: 'SetStatus', _0: a};
};
var _merivale$victor$Interface_Model_Types$ToggleVerbalityPassive = {ctor: 'ToggleVerbalityPassive'};
var _merivale$victor$Interface_Model_Types$ToggleVerbalityOngoing = {ctor: 'ToggleVerbalityOngoing'};
var _merivale$victor$Interface_Model_Types$SetVerbalityString = function (a) {
	return {ctor: 'SetVerbalityString', _0: a};
};
var _merivale$victor$Interface_Model_Types$SetVerbality = function (a) {
	return {ctor: 'SetVerbality', _0: a};
};
var _merivale$victor$Interface_Model_Types$SetObjectString = function (a) {
	return {ctor: 'SetObjectString', _0: a};
};
var _merivale$victor$Interface_Model_Types$SetObject = function (a) {
	return {ctor: 'SetObject', _0: a};
};
var _merivale$victor$Interface_Model_Types$TogglePlus = {ctor: 'TogglePlus'};
var _merivale$victor$Interface_Model_Types$LoadExample = F2(
	function (a, b) {
		return {ctor: 'LoadExample', _0: a, _1: b};
	});
var _merivale$victor$Interface_Model_Types$FullTheory = {ctor: 'FullTheory'};
var _merivale$victor$Interface_Model_Types$ObjectTheory = {ctor: 'ObjectTheory'};
var _merivale$victor$Interface_Model_Types$LongTheory = {ctor: 'LongTheory'};
var _merivale$victor$Interface_Model_Types$ShortTheory = {ctor: 'ShortTheory'};
var _merivale$victor$Interface_Model_Types$PlainTheory = {ctor: 'PlainTheory'};

var _merivale$victor$Theory_Words_Utils$splitMaybeString = function (string) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		{ctor: '[]'},
		A2(_elm_lang$core$Maybe$map, _elm_lang$core$String$words, string));
};
var _merivale$victor$Theory_Words_Utils$splitAtNot = F2(
	function (pre, rest) {
		var splitAtNot_ = F3(
			function (index, pre, rest) {
				splitAtNot_:
				while (true) {
					var _p0 = _elm_lang$core$List$head(
						A2(_elm_lang$core$List$drop, index, pre));
					if (_p0.ctor === 'Nothing') {
						return {ctor: '_Tuple2', _0: pre, _1: rest};
					} else {
						if (_elm_lang$core$Native_Utils.eq(_p0._0, 'not')) {
							return {
								ctor: '_Tuple2',
								_0: A2(_elm_lang$core$List$take, index, pre),
								_1: A2(
									_elm_lang$core$Basics_ops['++'],
									A2(_elm_lang$core$List$drop, index, pre),
									rest)
							};
						} else {
							var _v1 = index + 1,
								_v2 = pre,
								_v3 = rest;
							index = _v1;
							pre = _v2;
							rest = _v3;
							continue splitAtNot_;
						}
					}
				}
			});
		return A3(splitAtNot_, 0, pre, rest);
	});
var _merivale$victor$Theory_Words_Utils$maybeCons = F2(
	function (toAdd, list) {
		var _p1 = toAdd;
		if (_p1.ctor === 'Nothing') {
			return list;
		} else {
			return {ctor: '::', _0: _p1._0, _1: list};
		}
	});
var _merivale$victor$Theory_Words_Utils$integerToString = function ($int) {
	return (_elm_lang$core$Native_Utils.cmp($int, 0) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'minus ',
		_merivale$victor$Theory_Words_Utils$integerToString(0 - $int)) : (_elm_lang$core$Native_Utils.eq($int, 0) ? 'zero' : (_elm_lang$core$Native_Utils.eq($int, 1) ? 'one' : (_elm_lang$core$Native_Utils.eq($int, 2) ? 'two' : (_elm_lang$core$Native_Utils.eq($int, 3) ? 'three' : (_elm_lang$core$Native_Utils.eq($int, 4) ? 'four' : (_elm_lang$core$Native_Utils.eq($int, 5) ? 'five' : (_elm_lang$core$Native_Utils.eq($int, 6) ? 'six' : (_elm_lang$core$Native_Utils.eq($int, 7) ? 'seven' : (_elm_lang$core$Native_Utils.eq($int, 8) ? 'eight' : (_elm_lang$core$Native_Utils.eq($int, 9) ? 'nine' : (_elm_lang$core$Native_Utils.eq($int, 10) ? 'ten' : (_elm_lang$core$Native_Utils.eq($int, 11) ? 'eleven' : (_elm_lang$core$Native_Utils.eq($int, 12) ? 'twelve' : (_elm_lang$core$Native_Utils.eq($int, 13) ? 'thirteen' : (_elm_lang$core$Native_Utils.eq($int, 14) ? 'fourteen' : (_elm_lang$core$Native_Utils.eq($int, 15) ? 'fifteen' : (_elm_lang$core$Native_Utils.eq($int, 16) ? 'sixteen' : (_elm_lang$core$Native_Utils.eq($int, 17) ? 'seventeen' : (_elm_lang$core$Native_Utils.eq($int, 18) ? 'eighteen' : (_elm_lang$core$Native_Utils.eq($int, 19) ? 'nineteen' : (_elm_lang$core$Native_Utils.eq($int, 20) ? 'twenty' : ((_elm_lang$core$Native_Utils.cmp($int, 30) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'twenty-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 20)) : (_elm_lang$core$Native_Utils.eq($int, 30) ? 'thirty' : ((_elm_lang$core$Native_Utils.cmp($int, 40) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'thirty-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 30)) : (_elm_lang$core$Native_Utils.eq($int, 40) ? 'fourty' : ((_elm_lang$core$Native_Utils.cmp($int, 50) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'fourty-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 40)) : (_elm_lang$core$Native_Utils.eq($int, 50) ? 'fifty' : ((_elm_lang$core$Native_Utils.cmp($int, 60) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'fifty-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 50)) : (_elm_lang$core$Native_Utils.eq($int, 60) ? 'sixty' : ((_elm_lang$core$Native_Utils.cmp($int, 70) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'sixty-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 60)) : (_elm_lang$core$Native_Utils.eq($int, 70) ? 'seventy' : ((_elm_lang$core$Native_Utils.cmp($int, 80) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'seventy-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 70)) : (_elm_lang$core$Native_Utils.eq($int, 80) ? 'eighty' : ((_elm_lang$core$Native_Utils.cmp($int, 90) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'eighty-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 80)) : (_elm_lang$core$Native_Utils.eq($int, 90) ? 'ninety' : ((_elm_lang$core$Native_Utils.cmp($int, 100) < 0) ? A2(
		_elm_lang$core$Basics_ops['++'],
		'ninety-',
		_merivale$victor$Theory_Words_Utils$integerToString($int - 90)) : 'a hundred or more'))))))))))))))))))))))))))))))))))));
};
var _merivale$victor$Theory_Words_Utils$consontanty = function (base) {
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

var _merivale$victor$Theory_Object_Messages$overrideBalancingObject = F3(
	function (target, pseudoBalance, vars) {
		var oldArray = _elm_lang$core$Array$fromList(vars.balances);
		var newArray = A3(_elm_lang$core$Array$set, target, pseudoBalance, oldArray);
		return _elm_lang$core$Native_Utils.update(
			vars,
			{
				balances: _elm_lang$core$Array$toList(newArray)
			});
	});
var _merivale$victor$Theory_Object_Messages$swapPastForPrior = function (vars) {
	return (vars.past && vars.prior) ? _elm_lang$core$Result$Err('PRIOR PAST messages cannot be given a displacer') : (vars.past ? _elm_lang$core$Result$Ok(
		_elm_lang$core$Native_Utils.update(
			vars,
			{past: false, prior: true})) : _elm_lang$core$Result$Ok(vars));
};
var _merivale$victor$Theory_Object_Messages$scattered = F2(
	function (tally, vars) {
		return _elm_lang$core$Native_Utils.update(
			vars,
			{
				post: {ctor: '::', _0: tally, _1: vars.post}
			});
	});
var _merivale$victor$Theory_Object_Messages$extended = F2(
	function (duration, vars) {
		return _elm_lang$core$Native_Utils.update(
			vars,
			{
				post: {ctor: '::', _0: duration, _1: vars.post}
			});
	});
var _merivale$victor$Theory_Object_Messages$prior = function (vars) {
	return vars.prior ? _elm_lang$core$Result$Err('PRIOR messages cannot be made PRIOR') : (((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) && (!vars.past)) ? _elm_lang$core$Result$Err('messages with a modality can only be PRIOR if they are PAST') : (((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) && ((!vars.regularModality) && (!vars.preordainedModality))) ? _elm_lang$core$Result$Err('DISPLACED messages with a modality cannot be made PRIOR PAST') : _elm_lang$core$Result$Ok(
		_elm_lang$core$Native_Utils.update(
			vars,
			{prior: true}))));
};
var _merivale$victor$Theory_Object_Messages$past = F2(
	function (time, vars) {
		return vars.past ? _elm_lang$core$Result$Err('PAST messages cannot be made PAST') : (_elm_lang$core$Native_Utils.eq(
			vars.modality,
			_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Long_Displacers$Maybe4)) ? _elm_lang$core$Result$Err('messages with the Maybe4 modality (\'dare\') cannot be made PAST') : (((!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) && ((!vars.regularModality) && (!_elm_lang$core$Native_Utils.eq(time, _elm_lang$core$Maybe$Nothing)))) ? _elm_lang$core$Result$Err('DISPLACED and PREORDAINED messages with a modality cannot be given a PAST time') : _elm_lang$core$Result$Ok(
			_elm_lang$core$Native_Utils.update(
				vars,
				{
					past: true,
					post: A2(_merivale$victor$Theory_Words_Utils$maybeCons, time, vars.post)
				}))));
	});
var _merivale$victor$Theory_Object_Messages$Vars = function (a) {
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
														return {negationTarget: a, object: b, pseudoObject: c, past: d, modality: e, negatedModality: f, preordainedModality: g, regularModality: h, prior: i, pre: j, pivot: k, displaced: l, balances: m, post: n};
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
var _merivale$victor$Theory_Object_Messages$Displaced = F3(
	function (a, b, c) {
		return {prior: a, pre: b, pivot: c};
	});
var _merivale$victor$Theory_Object_Messages$AMASSED = F3(
	function (a, b, c) {
		return {ctor: 'AMASSED', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Object_Messages$ENUMERATED = F3(
	function (a, b, c) {
		return {ctor: 'ENUMERATED', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Object_Messages$INDIRECT = F3(
	function (a, b, c) {
		return {ctor: 'INDIRECT', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Object_Messages$SCATTERED = F2(
	function (a, b) {
		return {ctor: 'SCATTERED', _0: a, _1: b};
	});
var _merivale$victor$Theory_Object_Messages$EXTENDED = F2(
	function (a, b) {
		return {ctor: 'EXTENDED', _0: a, _1: b};
	});
var _merivale$victor$Theory_Object_Messages$REGULAR = F3(
	function (a, b, c) {
		return {ctor: 'REGULAR', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Object_Messages$PREORDAINED = F3(
	function (a, b, c) {
		return {ctor: 'PREORDAINED', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Object_Messages$DISPLACED = F2(
	function (a, b) {
		return {ctor: 'DISPLACED', _0: a, _1: b};
	});
var _merivale$victor$Theory_Object_Messages$PRIOR = function (a) {
	return {ctor: 'PRIOR', _0: a};
};
var _merivale$victor$Theory_Object_Messages$PAST = F2(
	function (a, b) {
		return {ctor: 'PAST', _0: a, _1: b};
	});
var _merivale$victor$Theory_Object_Messages$NEGATIVE = function (a) {
	return {ctor: 'NEGATIVE', _0: a};
};
var _merivale$victor$Theory_Object_Messages$Plain = function (a) {
	return {ctor: 'Plain', _0: a};
};
var _merivale$victor$Theory_Object_Messages$NegateObject = {ctor: 'NegateObject'};
var _merivale$victor$Theory_Object_Messages$overrideMainObject = F3(
	function (negateObject, pseudoObject, vars) {
		return negateObject ? _elm_lang$core$Native_Utils.update(
			vars,
			{negationTarget: _merivale$victor$Theory_Object_Messages$NegateObject, pseudoObject: pseudoObject}) : _elm_lang$core$Native_Utils.update(
			vars,
			{pseudoObject: pseudoObject});
	});
var _merivale$victor$Theory_Object_Messages$NegateCondition = {ctor: 'NegateCondition'};
var _merivale$victor$Theory_Object_Messages$primary = F2(
	function (pivot, vars) {
		var displaced = {prior: vars.prior, pre: vars.pre, pivot: vars.pivot};
		return _elm_lang$core$Native_Utils.update(
			vars,
			{
				negationTarget: _merivale$victor$Theory_Object_Messages$NegateCondition,
				prior: false,
				pre: {ctor: '[]'},
				pivot: pivot,
				displaced: {ctor: '::', _0: displaced, _1: vars.displaced}
			});
	});
var _merivale$victor$Theory_Object_Messages$secondary = F4(
	function (modality, preordainedModality, regularModality, vars) {
		return _elm_lang$core$Native_Utils.update(
			vars,
			{
				negationTarget: _merivale$victor$Theory_Object_Messages$NegateCondition,
				modality: _elm_lang$core$Maybe$Just(modality),
				preordainedModality: preordainedModality,
				regularModality: regularModality
			});
	});
var _merivale$victor$Theory_Object_Messages$displaced = F2(
	function (displacer, vars) {
		if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
			return _elm_lang$core$Result$Err('messages with a modality cannot be DISPLACED');
		} else {
			var _p0 = displacer;
			if (_p0.ctor === 'Primary') {
				return A2(
					_elm_lang$core$Result$map,
					_merivale$victor$Theory_Object_Messages$primary(_p0._0),
					_merivale$victor$Theory_Object_Messages$swapPastForPrior(vars));
			} else {
				return A2(
					_elm_lang$core$Result$map,
					A3(_merivale$victor$Theory_Object_Messages$secondary, _p0._0, false, false),
					_merivale$victor$Theory_Object_Messages$swapPastForPrior(vars));
			}
		}
	});
var _merivale$victor$Theory_Object_Messages$preordained = F3(
	function (displacer, time, vars) {
		if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
			return _elm_lang$core$Result$Err('messages with a modality cannot be made PREORDAINED');
		} else {
			var varsWithPost = _elm_lang$core$Native_Utils.update(
				vars,
				{
					post: A2(_merivale$victor$Theory_Words_Utils$maybeCons, time, vars.post)
				});
			var _p1 = displacer;
			if (_p1.ctor === 'Nothing') {
				return vars.past ? _elm_lang$core$Result$Err('PAST messages cannot be made PREORDAINED without a displacer') : _elm_lang$core$Result$Ok(varsWithPost);
			} else {
				if (_p1._0.ctor === 'Primary') {
					return A2(
						_elm_lang$core$Result$map,
						_merivale$victor$Theory_Object_Messages$primary(_p1._0._0),
						_merivale$victor$Theory_Object_Messages$swapPastForPrior(varsWithPost));
				} else {
					return A2(
						_elm_lang$core$Result$map,
						A3(_merivale$victor$Theory_Object_Messages$secondary, _p1._0._0, true, false),
						_merivale$victor$Theory_Object_Messages$swapPastForPrior(varsWithPost));
				}
			}
		}
	});
var _merivale$victor$Theory_Object_Messages$regular = F3(
	function (displacer, frequency, vars) {
		if (!_elm_lang$core$Native_Utils.eq(vars.modality, _elm_lang$core$Maybe$Nothing)) {
			return _elm_lang$core$Result$Err('messages with a modality cannot be made REGULAR');
		} else {
			var varsWithPre = _elm_lang$core$Native_Utils.update(
				vars,
				{
					pre: A2(_merivale$victor$Theory_Words_Utils$maybeCons, frequency, vars.pre)
				});
			var _p2 = displacer;
			if (_p2.ctor === 'Nothing') {
				return vars.past ? _elm_lang$core$Result$Err('PAST messages cannot be made REGULAR without a displacer') : _elm_lang$core$Result$Ok(varsWithPre);
			} else {
				if (_p2._0.ctor === 'Primary') {
					return A2(
						_elm_lang$core$Result$map,
						_merivale$victor$Theory_Object_Messages$primary(_p2._0._0),
						_merivale$victor$Theory_Object_Messages$swapPastForPrior(varsWithPre));
				} else {
					return A2(
						_elm_lang$core$Result$map,
						A3(_merivale$victor$Theory_Object_Messages$secondary, _p2._0._0, false, true),
						_merivale$victor$Theory_Object_Messages$swapPastForPrior(varsWithPre));
				}
			}
		}
	});
var _merivale$victor$Theory_Object_Messages$AmassedObject = F2(
	function (a, b) {
		return {ctor: 'AmassedObject', _0: a, _1: b};
	});
var _merivale$victor$Theory_Object_Messages$EnumeratedObject = F2(
	function (a, b) {
		return {ctor: 'EnumeratedObject', _0: a, _1: b};
	});
var _merivale$victor$Theory_Object_Messages$negative = function (vars) {
	var _p3 = vars.negationTarget;
	if (_p3.ctor === 'NegateCondition') {
		var _p4 = vars.modality;
		if (_p4.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(
				_elm_lang$core$Native_Utils.update(
					vars,
					{
						pre: {ctor: '::', _0: 'not', _1: vars.pre}
					}));
		} else {
			switch (_p4._0.ctor) {
				case 'Yes1':
					return _elm_lang$core$Result$Err('the Yes1 modality (\'will\') cannot be negated');
				case 'Yes2':
					return _elm_lang$core$Result$Err('the Yes2 modality (\'shall\') cannot be negated');
				default:
					return vars.negatedModality ? _elm_lang$core$Result$Err('modalities cannot be negated twice') : _elm_lang$core$Result$Ok(
						_elm_lang$core$Native_Utils.update(
							vars,
							{
								negatedModality: true,
								pre: {ctor: '::', _0: 'not', _1: vars.pre}
							}));
			}
		}
	} else {
		var _p5 = vars.pseudoObject;
		switch (_p5.ctor) {
			case 'DirectObject':
				return _elm_lang$core$Result$Err('direct objects cannot be negated');
			case 'IndirectObject':
				return _elm_lang$core$Result$Err('indirect objects cannot be negated');
			case 'EnumeratedObject':
				return _p5._0 ? _elm_lang$core$Result$Err('enumerated objects cannot be negated twice') : _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						vars,
						{
							negationTarget: _merivale$victor$Theory_Object_Messages$NegateCondition,
							pseudoObject: A2(_merivale$victor$Theory_Object_Messages$EnumeratedObject, true, _p5._1)
						}));
			default:
				return _p5._0 ? _elm_lang$core$Result$Err('amassed objects cannot be negated twice') : _elm_lang$core$Result$Ok(
					_elm_lang$core$Native_Utils.update(
						vars,
						{
							negationTarget: _merivale$victor$Theory_Object_Messages$NegateCondition,
							pseudoObject: A2(_merivale$victor$Theory_Object_Messages$AmassedObject, true, _p5._1)
						}));
		}
	}
};
var _merivale$victor$Theory_Object_Messages$IndirectObject = function (a) {
	return {ctor: 'IndirectObject', _0: a};
};
var _merivale$victor$Theory_Object_Messages$DirectObject = {ctor: 'DirectObject'};
var _merivale$victor$Theory_Object_Messages$AmassedBalance = F4(
	function (a, b, c, d) {
		return {ctor: 'AmassedBalance', _0: a, _1: b, _2: c, _3: d};
	});
var _merivale$victor$Theory_Object_Messages$amassed = F3(
	function (target, proportion, vars) {
		var _p6 = proportion;
		var quantifier = _p6._0;
		var other = _p6._1;
		var haystack = _p6._2;
		if (!_merivale$victor$Theory_Object_Pseudo$isAmassing(quantifier)) {
			return _elm_lang$core$Result$Err('this quantifier cannot be used in AMASSED elaborations');
		} else {
			if (_elm_lang$core$Native_Utils.cmp(target, 0) < 0) {
				var _p7 = vars.pseudoObject;
				if (_p7.ctor === 'DirectObject') {
					if (!_merivale$victor$Theory_Plain_Nucleus$isOther(vars.object)) {
						return _elm_lang$core$Result$Err('only third person (other) objects can be overridden');
					} else {
						if (_elm_lang$core$Native_Utils.eq(
							quantifier,
							_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Much)) && _merivale$victor$Theory_Plain_Nucleus$isPlural(vars.object)) {
							return _elm_lang$core$Result$Err('this quantifier cannot be used with plural objects');
						} else {
							var pseudoObject = A2(_merivale$victor$Theory_Object_Messages$AmassedObject, false, proportion);
							return _elm_lang$core$Result$Ok(
								A3(_merivale$victor$Theory_Object_Messages$overrideMainObject, true, pseudoObject, vars));
						}
					}
				} else {
					return _elm_lang$core$Result$Err('the main object cannot be overridden twice');
				}
			} else {
				var _p8 = A2(
					_elm_lang$core$Array$get,
					target,
					_elm_lang$core$Array$fromList(vars.balances));
				if (_p8.ctor === 'Nothing') {
					return _elm_lang$core$Result$Err('target index out of range');
				} else {
					if ((_p8._0.ctor === 'DirectBalance') && (_p8._0._0.ctor === '_Tuple2')) {
						if (_p8._0._0._1.ctor === 'SameAsMain') {
							return _elm_lang$core$Result$Err('only different objects can be overridden');
						} else {
							var _p9 = _p8._0._0._1._0;
							if (!_merivale$victor$Theory_Plain_Nucleus$isOther(_p9)) {
								return _elm_lang$core$Result$Err('only third person (other) objects can be overridden');
							} else {
								if (_elm_lang$core$Native_Utils.eq(
									quantifier,
									_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Much)) && _merivale$victor$Theory_Plain_Nucleus$isPlural(_p9)) {
									return _elm_lang$core$Result$Err('this quantifier cannot be used with plural objects');
								} else {
									var pseudoBalance = A4(_merivale$victor$Theory_Object_Messages$AmassedBalance, _p8._0._0._0, _p9, false, proportion);
									return _elm_lang$core$Result$Ok(
										A3(_merivale$victor$Theory_Object_Messages$overrideBalancingObject, target, pseudoBalance, vars));
								}
							}
						}
					} else {
						return _elm_lang$core$Result$Err(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'balancing object ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(target + 1),
									' cannot be overridden twice')));
					}
				}
			}
		}
	});
var _merivale$victor$Theory_Object_Messages$EnumeratedBalance = F4(
	function (a, b, c, d) {
		return {ctor: 'EnumeratedBalance', _0: a, _1: b, _2: c, _3: d};
	});
var _merivale$victor$Theory_Object_Messages$enumerated = F3(
	function (target, multiplicity, vars) {
		var _p10 = multiplicity;
		var quantifier = _p10._0;
		var other = _p10._1;
		var haystack = _p10._2;
		if (!_merivale$victor$Theory_Object_Pseudo$isEnumerating(quantifier)) {
			return _elm_lang$core$Result$Err('this quantifier cannot be used in ENUMERATED elaborations');
		} else {
			if (_elm_lang$core$Native_Utils.cmp(target, 0) < 0) {
				var _p11 = vars.pseudoObject;
				if (_p11.ctor === 'DirectObject') {
					if (!_merivale$victor$Theory_Plain_Nucleus$isOther(vars.object)) {
						return _elm_lang$core$Result$Err('only third person (other) objects can be overridden');
					} else {
						if (_merivale$victor$Theory_Object_Pseudo$requiresPlural(quantifier) && (!_merivale$victor$Theory_Plain_Nucleus$isPlural(vars.object))) {
							return _elm_lang$core$Result$Err('your ENUMERATED quantifier requires a plural object');
						} else {
							if (_merivale$victor$Theory_Plain_Nucleus$isPlural(vars.object) && (!_merivale$victor$Theory_Object_Pseudo$requiresPlural(quantifier))) {
								return _elm_lang$core$Result$Err('your ENUMERATED quantifier requires a singular object');
							} else {
								var pseudoBalance = A2(_merivale$victor$Theory_Object_Messages$EnumeratedObject, false, multiplicity);
								var negateObject = _merivale$victor$Theory_Object_Pseudo$isNegatable(quantifier);
								return _elm_lang$core$Result$Ok(
									A3(_merivale$victor$Theory_Object_Messages$overrideMainObject, negateObject, pseudoBalance, vars));
							}
						}
					}
				} else {
					return _elm_lang$core$Result$Err('the main object cannot be overridden twice');
				}
			} else {
				var _p12 = A2(
					_elm_lang$core$Array$get,
					target,
					_elm_lang$core$Array$fromList(vars.balances));
				if (_p12.ctor === 'Nothing') {
					return _elm_lang$core$Result$Err('target index out of range');
				} else {
					if ((_p12._0.ctor === 'DirectBalance') && (_p12._0._0.ctor === '_Tuple2')) {
						if (_p12._0._0._1.ctor === 'SameAsMain') {
							return _elm_lang$core$Result$Err('only different objects can be overridden');
						} else {
							var _p13 = _p12._0._0._1._0;
							if (!_merivale$victor$Theory_Plain_Nucleus$isOther(_p13)) {
								return _elm_lang$core$Result$Err('only third person (other) objects can be overridden');
							} else {
								if (_merivale$victor$Theory_Object_Pseudo$requiresPlural(quantifier) && (!_merivale$victor$Theory_Plain_Nucleus$isPlural(_p13))) {
									return _elm_lang$core$Result$Err('your ENUMERATED quantifier requires a plural object');
								} else {
									if (_merivale$victor$Theory_Plain_Nucleus$isPlural(_p13) && (!_merivale$victor$Theory_Object_Pseudo$requiresPlural(quantifier))) {
										return _elm_lang$core$Result$Err('your ENUMERATED quantifier requires a singular object');
									} else {
										var pseudoBalance = A4(_merivale$victor$Theory_Object_Messages$EnumeratedBalance, _p12._0._0._0, _p13, false, multiplicity);
										return _elm_lang$core$Result$Ok(
											A3(_merivale$victor$Theory_Object_Messages$overrideBalancingObject, target, pseudoBalance, vars));
									}
								}
							}
						}
					} else {
						return _elm_lang$core$Result$Err(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'balancing object ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(target + 1),
									' cannot be overridden twice')));
					}
				}
			}
		}
	});
var _merivale$victor$Theory_Object_Messages$IndirectBalance = F3(
	function (a, b, c) {
		return {ctor: 'IndirectBalance', _0: a, _1: b, _2: c};
	});
var _merivale$victor$Theory_Object_Messages$indirect = F3(
	function (target, description, vars) {
		if (_elm_lang$core$Native_Utils.cmp(target, 0) < 0) {
			var _p14 = vars.pseudoObject;
			if (_p14.ctor === 'DirectObject') {
				return (!_merivale$victor$Theory_Plain_Nucleus$isOther(vars.object)) ? _elm_lang$core$Result$Err('only third person (other) objects can be overridden') : _elm_lang$core$Result$Ok(
					A3(
						_merivale$victor$Theory_Object_Messages$overrideMainObject,
						false,
						_merivale$victor$Theory_Object_Messages$IndirectObject(description),
						vars));
			} else {
				return _elm_lang$core$Result$Err('the main object cannot be overridden twice');
			}
		} else {
			var _p15 = A2(
				_elm_lang$core$Array$get,
				target,
				_elm_lang$core$Array$fromList(vars.balances));
			if (_p15.ctor === 'Nothing') {
				return _elm_lang$core$Result$Err('target index out of range');
			} else {
				if ((_p15._0.ctor === 'DirectBalance') && (_p15._0._0.ctor === '_Tuple2')) {
					if (_p15._0._0._1.ctor === 'SameAsMain') {
						return _elm_lang$core$Result$Err('only different objects can be overridden');
					} else {
						var _p16 = _p15._0._0._1._0;
						if (!_merivale$victor$Theory_Plain_Nucleus$isOther(_p16)) {
							return _elm_lang$core$Result$Err('only third person (other) objects can be overridden');
						} else {
							var pseudoBalance = A3(_merivale$victor$Theory_Object_Messages$IndirectBalance, _p15._0._0._0, _p16, description);
							return _elm_lang$core$Result$Ok(
								A3(_merivale$victor$Theory_Object_Messages$overrideBalancingObject, target, pseudoBalance, vars));
						}
					}
				} else {
					return _elm_lang$core$Result$Err(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'balancing object ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(target + 1),
								' cannot be overridden twice')));
				}
			}
		}
	});
var _merivale$victor$Theory_Object_Messages$DirectBalance = function (a) {
	return {ctor: 'DirectBalance', _0: a};
};
var _merivale$victor$Theory_Object_Messages$plain = function (_p17) {
	var _p18 = _p17;
	return {
		negationTarget: _merivale$victor$Theory_Object_Messages$NegateCondition,
		object: _p18._0,
		pseudoObject: _merivale$victor$Theory_Object_Messages$DirectObject,
		past: false,
		modality: _elm_lang$core$Maybe$Nothing,
		negatedModality: false,
		preordainedModality: false,
		regularModality: false,
		prior: false,
		pre: {ctor: '[]'},
		pivot: _p18._1._0,
		displaced: {ctor: '[]'},
		balances: A2(
			_elm_lang$core$List$map,
			function (x) {
				return _merivale$victor$Theory_Object_Messages$DirectBalance(x);
			},
			_p18._1._1),
		post: {ctor: '[]'}
	};
};
var _merivale$victor$Theory_Object_Messages$explode = function (message) {
	var _p19 = message;
	switch (_p19.ctor) {
		case 'Plain':
			return _elm_lang$core$Result$Ok(
				_merivale$victor$Theory_Object_Messages$plain(_p19._0));
		case 'NEGATIVE':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Object_Messages$negative,
				_merivale$victor$Theory_Object_Messages$explode(_p19._0));
		case 'PAST':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Object_Messages$past(_p19._0),
				_merivale$victor$Theory_Object_Messages$explode(_p19._1));
		case 'PRIOR':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Object_Messages$prior,
				_merivale$victor$Theory_Object_Messages$explode(_p19._0));
		case 'DISPLACED':
			return A2(
				_elm_lang$core$Result$andThen,
				_merivale$victor$Theory_Object_Messages$displaced(_p19._0),
				_merivale$victor$Theory_Object_Messages$explode(_p19._1));
		case 'PREORDAINED':
			return A2(
				_elm_lang$core$Result$andThen,
				A2(_merivale$victor$Theory_Object_Messages$preordained, _p19._0, _p19._1),
				_merivale$victor$Theory_Object_Messages$explode(_p19._2));
		case 'REGULAR':
			return A2(
				_elm_lang$core$Result$andThen,
				A2(_merivale$victor$Theory_Object_Messages$regular, _p19._0, _p19._1),
				_merivale$victor$Theory_Object_Messages$explode(_p19._2));
		case 'EXTENDED':
			return A2(
				_elm_lang$core$Result$map,
				_merivale$victor$Theory_Object_Messages$extended(_p19._0),
				_merivale$victor$Theory_Object_Messages$explode(_p19._1));
		case 'SCATTERED':
			return A2(
				_elm_lang$core$Result$map,
				_merivale$victor$Theory_Object_Messages$scattered(_p19._0),
				_merivale$victor$Theory_Object_Messages$explode(_p19._1));
		case 'INDIRECT':
			return A2(
				_elm_lang$core$Result$andThen,
				A2(_merivale$victor$Theory_Object_Messages$indirect, _p19._0, _p19._1),
				_merivale$victor$Theory_Object_Messages$explode(_p19._2));
		case 'ENUMERATED':
			return A2(
				_elm_lang$core$Result$andThen,
				A2(_merivale$victor$Theory_Object_Messages$enumerated, _p19._0, _p19._1),
				_merivale$victor$Theory_Object_Messages$explode(_p19._2));
		default:
			return A2(
				_elm_lang$core$Result$andThen,
				A2(_merivale$victor$Theory_Object_Messages$amassed, _p19._0, _p19._1),
				_merivale$victor$Theory_Object_Messages$explode(_p19._2));
	}
};

var _merivale$victor$Interface_Messages_Object$amassed = F3(
	function (elaboration, message, proportion) {
		return _elm_lang$core$Result$Ok(
			A3(_merivale$victor$Theory_Object_Messages$AMASSED, elaboration.target, proportion, message));
	});
var _merivale$victor$Interface_Messages_Object$enumerated = F3(
	function (elaboration, message, multiplicity) {
		return _elm_lang$core$Result$Ok(
			A3(_merivale$victor$Theory_Object_Messages$ENUMERATED, elaboration.target, multiplicity, message));
	});
var _merivale$victor$Interface_Messages_Object$indirect = F3(
	function (elaboration, message, description) {
		return _elm_lang$core$Result$Ok(
			A3(_merivale$victor$Theory_Object_Messages$INDIRECT, elaboration.target, description, message));
	});
var _merivale$victor$Interface_Messages_Object$proportion = F2(
	function (elaboration, haystack) {
		return _elm_lang$core$Result$Ok(
			{ctor: '_Tuple3', _0: elaboration.quantifier, _1: elaboration.other, _2: haystack});
	});
var _merivale$victor$Interface_Messages_Object$multiplicity = F2(
	function (elaboration, haystack) {
		var _p0 = elaboration.quantifier;
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$Result$Err('please select a quantifier for the ENUMERATED elaboration');
		} else {
			return _elm_lang$core$Result$Ok(
				{ctor: '_Tuple3', _0: _p0._0, _1: elaboration.other, _2: haystack});
		}
	});
var _merivale$victor$Interface_Messages_Object$description = F2(
	function (elaboration, haystack) {
		return _elm_lang$core$Result$Ok(
			{ctor: '_Tuple3', _0: elaboration.pointer, _1: elaboration.other, _2: haystack});
	});
var _merivale$victor$Interface_Messages_Object$haystack = function (elaboration) {
	var _p1 = elaboration.string1;
	if (_p1.ctor === 'Nothing') {
		return _elm_lang$core$Result$Err('please enter a category for the haystack');
	} else {
		return _elm_lang$core$Result$Ok(
			{ctor: '_Tuple3', _0: _p1._0, _1: elaboration.string2, _2: elaboration.string3});
	}
};
var _merivale$victor$Interface_Messages_Object$scattered = F2(
	function (tally, message) {
		var _p2 = tally;
		if (_p2.ctor === 'Nothing') {
			return _elm_lang$core$Result$Err('please enter a value for the tally');
		} else {
			return _elm_lang$core$Result$Ok(
				A2(_merivale$victor$Theory_Object_Messages$SCATTERED, _p2._0, message));
		}
	});
var _merivale$victor$Interface_Messages_Object$extended = F2(
	function (duration, message) {
		var _p3 = duration;
		if (_p3.ctor === 'Nothing') {
			return _elm_lang$core$Result$Err('please enter a value for the duration');
		} else {
			return _elm_lang$core$Result$Ok(
				A2(_merivale$victor$Theory_Object_Messages$EXTENDED, _p3._0, message));
		}
	});
var _merivale$victor$Interface_Messages_Object$prior = function (message) {
	return _elm_lang$core$Result$Ok(
		_merivale$victor$Theory_Object_Messages$PRIOR(message));
};
var _merivale$victor$Interface_Messages_Object$past = F2(
	function (time, message) {
		return _elm_lang$core$Result$Ok(
			A2(_merivale$victor$Theory_Object_Messages$PAST, time, message));
	});
var _merivale$victor$Interface_Messages_Object$negative = function (message) {
	return _elm_lang$core$Result$Ok(
		_merivale$victor$Theory_Object_Messages$NEGATIVE(message));
};
var _merivale$victor$Interface_Messages_Object$propertyEmpty = function (status) {
	var _p4 = status;
	if ((_p4.ctor === 'Just') && (_p4._0.ctor === 'Absolute')) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(_p4._0._0),
			0);
	} else {
		return false;
	}
};
var _merivale$victor$Interface_Messages_Object$verbalityEmpty = function (verbality) {
	var _p5 = verbality;
	if (_p5.ctor === 'Do') {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(_p5._0),
			0);
	} else {
		return false;
	}
};
var _merivale$victor$Interface_Messages_Object$displaced = F2(
	function (displacer, message) {
		var _p6 = displacer;
		if (_p6.ctor === 'Nothing') {
			return _elm_lang$core$Result$Err('please enter a displacer for the DISPLACED elaboration');
		} else {
			if (_p6._0.ctor === 'Primary') {
				var _p8 = _p6._0._0._0;
				var _p7 = _p6._0._0._1;
				return _merivale$victor$Interface_Messages_Object$verbalityEmpty(_p8) ? _elm_lang$core$Result$Err('please enter a verb for the DISPLACED verbality') : (_merivale$victor$Interface_Messages_Object$propertyEmpty(_p7) ? _elm_lang$core$Result$Err('please enter an adjective for the DISPLACED status') : _elm_lang$core$Result$Ok(
					A2(
						_merivale$victor$Theory_Object_Messages$DISPLACED,
						_merivale$victor$Theory_Long_Displacers$Primary(
							{ctor: '_Tuple2', _0: _p8, _1: _p7}),
						message)));
			} else {
				return _elm_lang$core$Result$Ok(
					A2(
						_merivale$victor$Theory_Object_Messages$DISPLACED,
						_merivale$victor$Theory_Long_Displacers$Secondary(_p6._0._0),
						message));
			}
		}
	});
var _merivale$victor$Interface_Messages_Object$preordained = F3(
	function (displacer, string, message) {
		var _p9 = displacer;
		if (_p9.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(
				A3(_merivale$victor$Theory_Object_Messages$PREORDAINED, displacer, string, message));
		} else {
			if (_p9._0.ctor === 'Primary') {
				return _merivale$victor$Interface_Messages_Object$verbalityEmpty(_p9._0._0._0) ? _elm_lang$core$Result$Err('please enter a verb for the PREORDAINED verbality') : (_merivale$victor$Interface_Messages_Object$propertyEmpty(_p9._0._0._1) ? _elm_lang$core$Result$Err('please enter an adjective for the PREORDAINED status') : _elm_lang$core$Result$Ok(
					A3(_merivale$victor$Theory_Object_Messages$PREORDAINED, displacer, string, message)));
			} else {
				return _elm_lang$core$Result$Ok(
					A3(_merivale$victor$Theory_Object_Messages$PREORDAINED, displacer, string, message));
			}
		}
	});
var _merivale$victor$Interface_Messages_Object$regular = F3(
	function (displacer, string, message) {
		var _p10 = displacer;
		if (_p10.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(
				A3(_merivale$victor$Theory_Object_Messages$REGULAR, displacer, string, message));
		} else {
			if (_p10._0.ctor === 'Primary') {
				return _merivale$victor$Interface_Messages_Object$verbalityEmpty(_p10._0._0._0) ? _elm_lang$core$Result$Err('please enter a verb for the REGULAR verbality') : (_merivale$victor$Interface_Messages_Object$propertyEmpty(_p10._0._0._1) ? _elm_lang$core$Result$Err('please enter an adjective for the REGULAR status') : _elm_lang$core$Result$Ok(
					A3(_merivale$victor$Theory_Object_Messages$REGULAR, displacer, string, message)));
			} else {
				return _elm_lang$core$Result$Ok(
					A3(_merivale$victor$Theory_Object_Messages$REGULAR, displacer, string, message));
			}
		}
	});
var _merivale$victor$Interface_Messages_Object$elaborate = F2(
	function (elaborations, message) {
		var _p11 = _elm_lang$core$List$head(elaborations);
		if (_p11.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(message);
		} else {
			var _p13 = _p11._0;
			var _p12 = _p13.recipe;
			switch (_p12.ctor) {
				case 'MakeNEGATIVE':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						_merivale$victor$Interface_Messages_Object$negative(message));
				case 'MakePAST':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A2(_merivale$victor$Interface_Messages_Object$past, _p13.string1, message));
				case 'MakePRIOR':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						_merivale$victor$Interface_Messages_Object$prior(message));
				case 'MakeDISPLACED':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A2(_merivale$victor$Interface_Messages_Object$displaced, _p13.displacer, message));
				case 'MakePREORDAINED':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A3(_merivale$victor$Interface_Messages_Object$preordained, _p13.displacer, _p13.string1, message));
				case 'MakeREGULAR':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A3(_merivale$victor$Interface_Messages_Object$regular, _p13.displacer, _p13.string1, message));
				case 'MakeEXTENDED':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A2(_merivale$victor$Interface_Messages_Object$extended, _p13.string1, message));
				case 'MakeSCATTERED':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A2(_merivale$victor$Interface_Messages_Object$scattered, _p13.string1, message));
				case 'MakeINDIRECT':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A2(
							_elm_lang$core$Result$andThen,
							A2(_merivale$victor$Interface_Messages_Object$indirect, _p13, message),
							A2(
								_elm_lang$core$Result$andThen,
								_merivale$victor$Interface_Messages_Object$description(_p13),
								_merivale$victor$Interface_Messages_Object$haystack(_p13))));
				case 'MakeENUMERATED':
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A2(
							_elm_lang$core$Result$andThen,
							A2(_merivale$victor$Interface_Messages_Object$enumerated, _p13, message),
							A2(
								_elm_lang$core$Result$andThen,
								_merivale$victor$Interface_Messages_Object$multiplicity(_p13),
								_merivale$victor$Interface_Messages_Object$haystack(_p13))));
				default:
					return A2(
						_elm_lang$core$Result$andThen,
						_merivale$victor$Interface_Messages_Object$elaborate(
							A2(_elm_lang$core$List$drop, 1, elaborations)),
						A2(
							_elm_lang$core$Result$andThen,
							A2(_merivale$victor$Interface_Messages_Object$amassed, _p13, message),
							A2(
								_elm_lang$core$Result$andThen,
								_merivale$victor$Interface_Messages_Object$proportion(_p13),
								_merivale$victor$Interface_Messages_Object$haystack(_p13))));
			}
		}
	});
var _merivale$victor$Interface_Messages_Object$plain = F4(
	function (object, verbality, status, balances) {
		return _merivale$victor$Interface_Messages_Object$verbalityEmpty(verbality) ? _elm_lang$core$Result$Err('please enter a verb for the verbality') : (_merivale$victor$Interface_Messages_Object$propertyEmpty(status) ? _elm_lang$core$Result$Err('please enter an adjective for the status') : _elm_lang$core$Result$Ok(
			_merivale$victor$Theory_Object_Messages$Plain(
				{
					ctor: '_Tuple2',
					_0: object,
					_1: {
						ctor: '_Tuple2',
						_0: {ctor: '_Tuple2', _0: verbality, _1: status},
						_1: balances
					}
				})));
	});
var _merivale$victor$Interface_Messages_Object$message = function (model) {
	return A2(
		_elm_lang$core$Result$andThen,
		_merivale$victor$Interface_Messages_Object$elaborate(model.elaborations),
		A4(_merivale$victor$Interface_Messages_Object$plain, model.object, model.verbality, model.status, model.balances));
};

var _merivale$victor$Interface_Model_Examples$elaboration = {plus: false, recipe: _merivale$victor$Interface_Model_Types$MakeNEGATIVE, string1: _elm_lang$core$Maybe$Nothing, string2: _elm_lang$core$Maybe$Nothing, string3: _elm_lang$core$Maybe$Nothing, displacer: _elm_lang$core$Maybe$Nothing, target: -1, pointer: _merivale$victor$Theory_Object_Pseudo$The, quantifier: _elm_lang$core$Maybe$Nothing, other: false};
var _merivale$victor$Interface_Model_Examples$objectFirst = {
	plus: false,
	object: A3(
		_merivale$victor$Theory_Plain_Nucleus$Other,
		false,
		_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
		_elm_lang$core$Maybe$Nothing),
	verbality: _merivale$victor$Theory_Plain_Nucleus$Be(false),
	status: _elm_lang$core$Maybe$Just(
		_merivale$victor$Theory_Plain_Nucleus$Absolute('bald')),
	balances: {ctor: '[]'},
	elaborations: {
		ctor: '::',
		_0: _elm_lang$core$Native_Utils.update(
			_merivale$victor$Interface_Model_Examples$elaboration,
			{
				recipe: _merivale$victor$Interface_Model_Types$MakeINDIRECT,
				string1: _elm_lang$core$Maybe$Just('king'),
				string3: _elm_lang$core$Maybe$Just('of France')
			}),
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_Model_Examples$objectExamples = {
	ctor: '::',
	_0: _merivale$victor$Interface_Model_Examples$objectFirst,
	_1: {
		ctor: '::',
		_0: {
			plus: false,
			object: A3(
				_merivale$victor$Theory_Plain_Nucleus$Other,
				false,
				_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
				_elm_lang$core$Maybe$Nothing),
			verbality: _merivale$victor$Theory_Plain_Nucleus$Be(false),
			status: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Plain_Nucleus$Absolute('insane')),
			balances: {ctor: '[]'},
			elaborations: {
				ctor: '::',
				_0: _elm_lang$core$Native_Utils.update(
					_merivale$victor$Interface_Model_Examples$elaboration,
					{
						recipe: _merivale$victor$Interface_Model_Types$MakeINDIRECT,
						pointer: _merivale$victor$Theory_Object_Pseudo$RelatedTo(
							A3(
								_merivale$victor$Theory_Plain_Nucleus$Other,
								false,
								_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
								_elm_lang$core$Maybe$Just('Smith'))),
						string1: _elm_lang$core$Maybe$Just('murderer')
					}),
				_1: {ctor: '[]'}
			}
		},
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_Model_Examples$longFirst = {
	plus: false,
	object: A3(
		_merivale$victor$Theory_Plain_Nucleus$Other,
		false,
		_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
		_elm_lang$core$Maybe$Nothing),
	verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'see', false, false),
	status: _elm_lang$core$Maybe$Nothing,
	balances: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Maybe$Nothing,
			_1: _merivale$victor$Theory_Plain_Nucleus$Different(
				A3(
					_merivale$victor$Theory_Plain_Nucleus$Other,
					false,
					_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
					_elm_lang$core$Maybe$Nothing))
		},
		_1: {ctor: '[]'}
	},
	elaborations: {
		ctor: '::',
		_0: _elm_lang$core$Native_Utils.update(
			_merivale$victor$Interface_Model_Examples$elaboration,
			{
				recipe: _merivale$victor$Interface_Model_Types$MakeDISPLACED,
				displacer: _elm_lang$core$Maybe$Just(
					_merivale$victor$Theory_Long_Displacers$Primary(
						{
							ctor: '_Tuple2',
							_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'go', true, false),
							_1: _elm_lang$core$Maybe$Nothing
						}))
			}),
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_Model_Examples$longExamples = {
	ctor: '::',
	_0: _merivale$victor$Interface_Model_Examples$longFirst,
	_1: {
		ctor: '::',
		_0: {
			plus: false,
			object: A3(
				_merivale$victor$Theory_Plain_Nucleus$Other,
				false,
				_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
				_elm_lang$core$Maybe$Nothing),
			verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'see', false, false),
			status: _elm_lang$core$Maybe$Nothing,
			balances: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Maybe$Nothing,
					_1: _merivale$victor$Theory_Plain_Nucleus$Different(
						A3(
							_merivale$victor$Theory_Plain_Nucleus$Other,
							false,
							_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
							_elm_lang$core$Maybe$Nothing))
				},
				_1: {ctor: '[]'}
			},
			elaborations: {
				ctor: '::',
				_0: _elm_lang$core$Native_Utils.update(
					_merivale$victor$Interface_Model_Examples$elaboration,
					{
						recipe: _merivale$victor$Interface_Model_Types$MakeDISPLACED,
						displacer: _elm_lang$core$Maybe$Just(
							_merivale$victor$Theory_Long_Displacers$Primary(
								{
									ctor: '_Tuple2',
									_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'go', true, false),
									_1: _elm_lang$core$Maybe$Nothing
								}))
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Native_Utils.update(
						_merivale$victor$Interface_Model_Examples$elaboration,
						{
							recipe: _merivale$victor$Interface_Model_Types$MakePREORDAINED,
							string1: _elm_lang$core$Maybe$Just('tomorrow')
						}),
					_1: {ctor: '[]'}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				plus: false,
				object: A3(
					_merivale$victor$Theory_Plain_Nucleus$Other,
					false,
					_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
					_elm_lang$core$Maybe$Nothing),
				verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'see', false, false),
				status: _elm_lang$core$Maybe$Nothing,
				balances: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: _merivale$victor$Theory_Plain_Nucleus$Different(
							A3(
								_merivale$victor$Theory_Plain_Nucleus$Other,
								false,
								_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
								_elm_lang$core$Maybe$Nothing))
					},
					_1: {ctor: '[]'}
				},
				elaborations: {
					ctor: '::',
					_0: _elm_lang$core$Native_Utils.update(
						_merivale$victor$Interface_Model_Examples$elaboration,
						{
							recipe: _merivale$victor$Interface_Model_Types$MakePREORDAINED,
							string1: _elm_lang$core$Maybe$Just('tomorrow'),
							displacer: _elm_lang$core$Maybe$Just(
								_merivale$victor$Theory_Long_Displacers$Primary(
									{
										ctor: '_Tuple2',
										_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'go', true, false),
										_1: _elm_lang$core$Maybe$Nothing
									}))
						}),
					_1: {ctor: '[]'}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					plus: false,
					object: A3(
						_merivale$victor$Theory_Plain_Nucleus$Other,
						false,
						_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
						_elm_lang$core$Maybe$Just('Victor')),
					verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'know', false, false),
					status: _elm_lang$core$Maybe$Nothing,
					balances: {ctor: '[]'},
					elaborations: {
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							_merivale$victor$Interface_Model_Examples$elaboration,
							{
								recipe: _merivale$victor$Interface_Model_Types$MakeDISPLACED,
								displacer: _elm_lang$core$Maybe$Just(
									_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Yes1))
							}),
						_1: {ctor: '[]'}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						plus: false,
						object: A3(
							_merivale$victor$Theory_Plain_Nucleus$Other,
							false,
							_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
							_elm_lang$core$Maybe$Just('Victor')),
						verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'know', false, false),
						status: _elm_lang$core$Maybe$Nothing,
						balances: {ctor: '[]'},
						elaborations: {
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								_merivale$victor$Interface_Model_Examples$elaboration,
								{
									recipe: _merivale$victor$Interface_Model_Types$MakeDISPLACED,
									displacer: _elm_lang$core$Maybe$Just(
										_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Yes1))
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									_merivale$victor$Interface_Model_Examples$elaboration,
									{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
								_1: {ctor: '[]'}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							plus: false,
							object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
							verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'rain', false, false),
							status: _elm_lang$core$Maybe$Nothing,
							balances: {ctor: '[]'},
							elaborations: {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									_merivale$victor$Interface_Model_Examples$elaboration,
									{
										recipe: _merivale$victor$Interface_Model_Types$MakePREORDAINED,
										string1: _elm_lang$core$Maybe$Just('tomorrow'),
										displacer: _elm_lang$core$Maybe$Just(
											_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Yes1))
									}),
								_1: {ctor: '[]'}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								plus: false,
								object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
								verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'rain', false, false),
								status: _elm_lang$core$Maybe$Nothing,
								balances: {ctor: '[]'},
								elaborations: {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										_merivale$victor$Interface_Model_Examples$elaboration,
										{
											recipe: _merivale$victor$Interface_Model_Types$MakePREORDAINED,
											string1: _elm_lang$core$Maybe$Just('tomorrow'),
											displacer: _elm_lang$core$Maybe$Just(
												_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Maybe1))
										}),
									_1: {ctor: '[]'}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									plus: false,
									object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
									verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'rain', false, false),
									status: _elm_lang$core$Maybe$Nothing,
									balances: {ctor: '[]'},
									elaborations: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											_merivale$victor$Interface_Model_Examples$elaboration,
											{
												recipe: _merivale$victor$Interface_Model_Types$MakePREORDAINED,
												string1: _elm_lang$core$Maybe$Just('tomorrow'),
												displacer: _elm_lang$core$Maybe$Just(
													_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Maybe3))
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												_merivale$victor$Interface_Model_Examples$elaboration,
												{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
											_1: {ctor: '[]'}
										}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										plus: false,
										object: _merivale$victor$Theory_Plain_Nucleus$Hearer(false),
										verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'hurt', false, false),
										status: _elm_lang$core$Maybe$Nothing,
										balances: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: _elm_lang$core$Maybe$Nothing,
												_1: _merivale$victor$Theory_Plain_Nucleus$Different(
													A3(
														_merivale$victor$Theory_Plain_Nucleus$Other,
														false,
														_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
														_elm_lang$core$Maybe$Nothing))
											},
											_1: {ctor: '[]'}
										},
										elaborations: {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												_merivale$victor$Interface_Model_Examples$elaboration,
												{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													_merivale$victor$Interface_Model_Examples$elaboration,
													{
														recipe: _merivale$victor$Interface_Model_Types$MakeDISPLACED,
														displacer: _elm_lang$core$Maybe$Just(
															_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Maybe1))
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														_merivale$victor$Interface_Model_Examples$elaboration,
														{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
													_1: {ctor: '[]'}
												}
											}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											plus: false,
											object: _merivale$victor$Theory_Plain_Nucleus$Hearer(false),
											verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'hurt', false, false),
											status: _elm_lang$core$Maybe$Nothing,
											balances: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: _elm_lang$core$Maybe$Nothing,
													_1: _merivale$victor$Theory_Plain_Nucleus$Different(
														A3(
															_merivale$victor$Theory_Plain_Nucleus$Other,
															false,
															_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
															_elm_lang$core$Maybe$Nothing))
												},
												_1: {ctor: '[]'}
											},
											elaborations: {
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													_merivale$victor$Interface_Model_Examples$elaboration,
													{
														recipe: _merivale$victor$Interface_Model_Types$MakePREORDAINED,
														displacer: _elm_lang$core$Maybe$Just(
															_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Maybe1))
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														_merivale$victor$Interface_Model_Examples$elaboration,
														{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
													_1: {
														ctor: '::',
														_0: _elm_lang$core$Native_Utils.update(
															_merivale$victor$Interface_Model_Examples$elaboration,
															{recipe: _merivale$victor$Interface_Model_Types$MakePRIOR}),
														_1: {ctor: '[]'}
													}
												}
											}
										},
										_1: {
											ctor: '::',
											_0: {
												plus: false,
												object: _merivale$victor$Theory_Plain_Nucleus$Speaker(false),
												verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'try', false, false),
												status: _elm_lang$core$Maybe$Nothing,
												balances: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: _elm_lang$core$Maybe$Nothing,
														_1: _merivale$victor$Theory_Plain_Nucleus$Different(
															A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing))
													},
													_1: {ctor: '[]'}
												},
												elaborations: {
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														_merivale$victor$Interface_Model_Examples$elaboration,
														{
															recipe: _merivale$victor$Interface_Model_Types$MakeREGULAR,
															string1: _elm_lang$core$Maybe$Just('sometimes'),
															displacer: _elm_lang$core$Maybe$Just(
																_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Yes1))
														}),
													_1: {ctor: '[]'}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													plus: false,
													object: _merivale$victor$Theory_Plain_Nucleus$Speaker(false),
													verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'try', false, false),
													status: _elm_lang$core$Maybe$Nothing,
													balances: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: _elm_lang$core$Maybe$Nothing,
															_1: _merivale$victor$Theory_Plain_Nucleus$Different(
																A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing))
														},
														_1: {ctor: '[]'}
													},
													elaborations: {
														ctor: '::',
														_0: _elm_lang$core$Native_Utils.update(
															_merivale$victor$Interface_Model_Examples$elaboration,
															{
																recipe: _merivale$victor$Interface_Model_Types$MakeREGULAR,
																string1: _elm_lang$core$Maybe$Just('occasionally'),
																displacer: _elm_lang$core$Maybe$Just(
																	_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Maybe1))
															}),
														_1: {ctor: '[]'}
													}
												},
												_1: {
													ctor: '::',
													_0: {
														plus: false,
														object: A3(
															_merivale$victor$Theory_Plain_Nucleus$Other,
															false,
															_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
															_elm_lang$core$Maybe$Nothing),
														verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'eat', false, false),
														status: _elm_lang$core$Maybe$Just(
															_merivale$victor$Theory_Plain_Nucleus$Relative(_merivale$victor$Theory_Plain_Nucleus$Out)),
														balances: {ctor: '[]'},
														elaborations: {
															ctor: '::',
															_0: _elm_lang$core$Native_Utils.update(
																_merivale$victor$Interface_Model_Examples$elaboration,
																{
																	recipe: _merivale$victor$Interface_Model_Types$MakeREGULAR,
																	displacer: _elm_lang$core$Maybe$Just(
																		_merivale$victor$Theory_Long_Displacers$Primary(
																			{
																				ctor: '_Tuple2',
																				_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'tend', false, false),
																				_1: _elm_lang$core$Maybe$Nothing
																			}))
																}),
															_1: {ctor: '[]'}
														}
													},
													_1: {
														ctor: '::',
														_0: {
															plus: false,
															object: A3(
																_merivale$victor$Theory_Plain_Nucleus$Other,
																false,
																_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
																_elm_lang$core$Maybe$Nothing),
															verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'eat', false, false),
															status: _elm_lang$core$Maybe$Just(
																_merivale$victor$Theory_Plain_Nucleus$Relative(_merivale$victor$Theory_Plain_Nucleus$Out)),
															balances: {ctor: '[]'},
															elaborations: {
																ctor: '::',
																_0: _elm_lang$core$Native_Utils.update(
																	_merivale$victor$Interface_Model_Examples$elaboration,
																	{
																		recipe: _merivale$victor$Interface_Model_Types$MakeREGULAR,
																		displacer: _elm_lang$core$Maybe$Just(
																			_merivale$victor$Theory_Long_Displacers$Primary(
																				{
																					ctor: '_Tuple2',
																					_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'use', false, false),
																					_1: _elm_lang$core$Maybe$Nothing
																				}))
																	}),
																_1: {
																	ctor: '::',
																	_0: _elm_lang$core$Native_Utils.update(
																		_merivale$victor$Interface_Model_Examples$elaboration,
																		{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
																	_1: {ctor: '[]'}
																}
															}
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
};
var _merivale$victor$Interface_Model_Examples$shortFirst = {
	plus: false,
	object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
	verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'get', true, false),
	status: _elm_lang$core$Maybe$Just(
		_merivale$victor$Theory_Plain_Nucleus$Absolute('married')),
	balances: {ctor: '[]'},
	elaborations: {
		ctor: '::',
		_0: _elm_lang$core$Native_Utils.update(
			_merivale$victor$Interface_Model_Examples$elaboration,
			{
				recipe: _merivale$victor$Interface_Model_Types$MakePAST,
				string1: _elm_lang$core$Maybe$Just('yesterday')
			}),
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_Model_Examples$shortExamples = {
	ctor: '::',
	_0: _merivale$victor$Interface_Model_Examples$shortFirst,
	_1: {
		ctor: '::',
		_0: {
			plus: false,
			object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
			verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'get', true, false),
			status: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Plain_Nucleus$Absolute('married')),
			balances: {ctor: '[]'},
			elaborations: {
				ctor: '::',
				_0: _elm_lang$core$Native_Utils.update(
					_merivale$victor$Interface_Model_Examples$elaboration,
					{recipe: _merivale$victor$Interface_Model_Types$MakePREORDAINED}),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Native_Utils.update(
						_merivale$victor$Interface_Model_Examples$elaboration,
						{
							recipe: _merivale$victor$Interface_Model_Types$MakePAST,
							string1: _elm_lang$core$Maybe$Just('yesterday')
						}),
					_1: {ctor: '[]'}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				plus: false,
				object: A3(
					_merivale$victor$Theory_Plain_Nucleus$Other,
					false,
					_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
					_elm_lang$core$Maybe$Just('Claire')),
				verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'drink', false, false),
				status: _elm_lang$core$Maybe$Nothing,
				balances: {ctor: '[]'},
				elaborations: {
					ctor: '::',
					_0: _elm_lang$core$Native_Utils.update(
						_merivale$victor$Interface_Model_Examples$elaboration,
						{recipe: _merivale$victor$Interface_Model_Types$MakeREGULAR}),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							_merivale$victor$Interface_Model_Examples$elaboration,
							{recipe: _merivale$victor$Interface_Model_Types$MakeNEGATIVE}),
						_1: {ctor: '[]'}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					plus: false,
					object: A3(
						_merivale$victor$Theory_Plain_Nucleus$Other,
						false,
						_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
						_elm_lang$core$Maybe$Just('Claire')),
					verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'drink', false, false),
					status: _elm_lang$core$Maybe$Nothing,
					balances: {ctor: '[]'},
					elaborations: {
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							_merivale$victor$Interface_Model_Examples$elaboration,
							{recipe: _merivale$victor$Interface_Model_Types$MakeNEGATIVE}),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								_merivale$victor$Interface_Model_Examples$elaboration,
								{recipe: _merivale$victor$Interface_Model_Types$MakeREGULAR}),
							_1: {ctor: '[]'}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						plus: false,
						object: A3(
							_merivale$victor$Theory_Plain_Nucleus$Other,
							false,
							_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
							_elm_lang$core$Maybe$Just('Victor')),
						verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'see', false, false),
						status: _elm_lang$core$Maybe$Nothing,
						balances: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Nothing,
								_1: _merivale$victor$Theory_Plain_Nucleus$Different(
									A3(
										_merivale$victor$Theory_Plain_Nucleus$Other,
										false,
										_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
										_elm_lang$core$Maybe$Just('Grannie')))
							},
							_1: {ctor: '[]'}
						},
						elaborations: {
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								_merivale$victor$Interface_Model_Examples$elaboration,
								{
									recipe: _merivale$victor$Interface_Model_Types$MakeEXTENDED,
									string1: _elm_lang$core$Maybe$Just('for two hours')
								}),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									_merivale$victor$Interface_Model_Examples$elaboration,
									{recipe: _merivale$victor$Interface_Model_Types$MakeNEGATIVE}),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										_merivale$victor$Interface_Model_Examples$elaboration,
										{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							plus: false,
							object: A3(
								_merivale$victor$Theory_Plain_Nucleus$Other,
								false,
								_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
								_elm_lang$core$Maybe$Just('Victor')),
							verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'see', false, false),
							status: _elm_lang$core$Maybe$Nothing,
							balances: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Nothing,
									_1: _merivale$victor$Theory_Plain_Nucleus$Different(
										A3(
											_merivale$victor$Theory_Plain_Nucleus$Other,
											false,
											_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
											_elm_lang$core$Maybe$Just('Grannie')))
								},
								_1: {ctor: '[]'}
							},
							elaborations: {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									_merivale$victor$Interface_Model_Examples$elaboration,
									{recipe: _merivale$victor$Interface_Model_Types$MakeNEGATIVE}),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										_merivale$victor$Interface_Model_Examples$elaboration,
										{
											recipe: _merivale$victor$Interface_Model_Types$MakeEXTENDED,
											string1: _elm_lang$core$Maybe$Just('for two hours')
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											_merivale$victor$Interface_Model_Examples$elaboration,
											{recipe: _merivale$victor$Interface_Model_Types$MakePAST}),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								plus: false,
								object: A3(
									_merivale$victor$Theory_Plain_Nucleus$Other,
									false,
									_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
									_elm_lang$core$Maybe$Just('Grannie')),
								verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'fall', false, false),
								status: _elm_lang$core$Maybe$Just(
									_merivale$victor$Theory_Plain_Nucleus$Relative(_merivale$victor$Theory_Plain_Nucleus$Over)),
								balances: {ctor: '[]'},
								elaborations: {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										_merivale$victor$Interface_Model_Examples$elaboration,
										{
											recipe: _merivale$victor$Interface_Model_Types$MakeSCATTERED,
											string1: _elm_lang$core$Maybe$Just('fifteen times')
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											_merivale$victor$Interface_Model_Examples$elaboration,
											{recipe: _merivale$victor$Interface_Model_Types$MakeNEGATIVE}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												_merivale$victor$Interface_Model_Examples$elaboration,
												{
													recipe: _merivale$victor$Interface_Model_Types$MakePAST,
													string1: _elm_lang$core$Maybe$Just('yesterday')
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									plus: false,
									object: A3(
										_merivale$victor$Theory_Plain_Nucleus$Other,
										false,
										_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
										_elm_lang$core$Maybe$Just('Grannie')),
									verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'fall', false, false),
									status: _elm_lang$core$Maybe$Just(
										_merivale$victor$Theory_Plain_Nucleus$Relative(_merivale$victor$Theory_Plain_Nucleus$Over)),
									balances: {ctor: '[]'},
									elaborations: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											_merivale$victor$Interface_Model_Examples$elaboration,
											{recipe: _merivale$victor$Interface_Model_Types$MakeNEGATIVE}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												_merivale$victor$Interface_Model_Examples$elaboration,
												{
													recipe: _merivale$victor$Interface_Model_Types$MakeSCATTERED,
													string1: _elm_lang$core$Maybe$Just('fifteen times')
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													_merivale$victor$Interface_Model_Examples$elaboration,
													{
														recipe: _merivale$victor$Interface_Model_Types$MakePAST,
														string1: _elm_lang$core$Maybe$Just('yesterday')
													}),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _merivale$victor$Interface_Model_Examples$plainFirst = {
	plus: false,
	object: _merivale$victor$Theory_Plain_Nucleus$Speaker(false),
	verbality: _merivale$victor$Theory_Plain_Nucleus$Be(false),
	status: _elm_lang$core$Maybe$Nothing,
	balances: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Maybe$Nothing,
			_1: _merivale$victor$Theory_Plain_Nucleus$Different(
				A3(
					_merivale$victor$Theory_Plain_Nucleus$Other,
					false,
					_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
					_elm_lang$core$Maybe$Just('Victor')))
		},
		_1: {ctor: '[]'}
	},
	elaborations: {ctor: '[]'}
};
var _merivale$victor$Interface_Model_Examples$plainExamples = {
	ctor: '::',
	_0: _merivale$victor$Interface_Model_Examples$plainFirst,
	_1: {
		ctor: '::',
		_0: {
			plus: false,
			object: _merivale$victor$Theory_Plain_Nucleus$Speaker(false),
			verbality: _merivale$victor$Theory_Plain_Nucleus$Be(false),
			status: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Plain_Nucleus$Absolute('happy')),
			balances: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$For),
					_1: _merivale$victor$Theory_Plain_Nucleus$Different(
						_merivale$victor$Theory_Plain_Nucleus$Hearer(false))
				},
				_1: {ctor: '[]'}
			},
			elaborations: {ctor: '[]'}
		},
		_1: {
			ctor: '::',
			_0: {
				plus: false,
				object: A3(
					_merivale$victor$Theory_Plain_Nucleus$Other,
					false,
					_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
					_elm_lang$core$Maybe$Nothing),
				verbality: _merivale$victor$Theory_Plain_Nucleus$Be(false),
				status: _elm_lang$core$Maybe$Just(
					_merivale$victor$Theory_Plain_Nucleus$Relative(_merivale$victor$Theory_Plain_Nucleus$Out)),
				balances: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$With),
						_1: _merivale$victor$Theory_Plain_Nucleus$Different(
							A3(
								_merivale$victor$Theory_Plain_Nucleus$Other,
								false,
								_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
								_elm_lang$core$Maybe$Just('Fred')))
					},
					_1: {ctor: '[]'}
				},
				elaborations: {ctor: '[]'}
			},
			_1: {
				ctor: '::',
				_0: {
					plus: false,
					object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
					verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'look', false, false),
					status: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Plain_Nucleus$Relative(_merivale$victor$Theory_Plain_Nucleus$Up)),
					balances: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$To),
							_1: _merivale$victor$Theory_Plain_Nucleus$Different(
								A3(
									_merivale$victor$Theory_Plain_Nucleus$Other,
									false,
									_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
									_elm_lang$core$Maybe$Nothing))
						},
						_1: {ctor: '[]'}
					},
					elaborations: {ctor: '[]'}
				},
				_1: {
					ctor: '::',
					_0: {
						plus: false,
						object: _merivale$victor$Theory_Plain_Nucleus$Speaker(true),
						verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'like', false, false),
						status: _elm_lang$core$Maybe$Nothing,
						balances: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Nothing,
								_1: _merivale$victor$Theory_Plain_Nucleus$Different(
									A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing))
							},
							_1: {ctor: '[]'}
						},
						elaborations: {ctor: '[]'}
					},
					_1: {
						ctor: '::',
						_0: {
							plus: false,
							object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
							verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'live', false, false),
							status: _elm_lang$core$Maybe$Nothing,
							balances: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$In),
									_1: _merivale$victor$Theory_Plain_Nucleus$Different(
										A3(
											_merivale$victor$Theory_Plain_Nucleus$Other,
											false,
											_elm_lang$core$Maybe$Nothing,
											_elm_lang$core$Maybe$Just('France')))
								},
								_1: {ctor: '[]'}
							},
							elaborations: {ctor: '[]'}
						},
						_1: {
							ctor: '::',
							_0: {
								plus: false,
								object: _merivale$victor$Theory_Plain_Nucleus$Speaker(false),
								verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'sing', true, false),
								status: _elm_lang$core$Maybe$Nothing,
								balances: {ctor: '[]'},
								elaborations: {ctor: '[]'}
							},
							_1: {
								ctor: '::',
								_0: {
									plus: false,
									object: A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
									verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'laugh', true, false),
									status: _elm_lang$core$Maybe$Nothing,
									balances: {ctor: '[]'},
									elaborations: {ctor: '[]'}
								},
								_1: {
									ctor: '::',
									_0: {
										plus: false,
										object: _merivale$victor$Theory_Plain_Nucleus$Speaker(true),
										verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, 'leave', true, false),
										status: _elm_lang$core$Maybe$Nothing,
										balances: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: _elm_lang$core$Maybe$Nothing,
												_1: _merivale$victor$Theory_Plain_Nucleus$Different(
													A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing))
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$To),
													_1: _merivale$victor$Theory_Plain_Nucleus$Different(
														A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing))
												},
												_1: {ctor: '[]'}
											}
										},
										elaborations: {ctor: '[]'}
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
};
var _merivale$victor$Interface_Model_Examples$allExamples = A2(
	_elm_lang$core$Basics_ops['++'],
	_merivale$victor$Interface_Model_Examples$plainExamples,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_merivale$victor$Interface_Model_Examples$shortExamples,
		A2(_elm_lang$core$Basics_ops['++'], _merivale$victor$Interface_Model_Examples$longExamples, _merivale$victor$Interface_Model_Examples$objectExamples)));

var _merivale$victor$Interface_Model_State$toggleElaborationOther = function (elaboration) {
	return _elm_lang$core$Native_Utils.update(
		elaboration,
		{other: !elaboration.other});
};
var _merivale$victor$Interface_Model_State$setElaborationQuantifierInteger = F2(
	function (string, elaboration) {
		var $int = A2(
			_elm_lang$core$Result$withDefault,
			0,
			_elm_lang$core$String$toInt(string));
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{
				quantifier: _elm_lang$core$Maybe$Just(
					_merivale$victor$Theory_Object_Pseudo$Integer($int))
			});
	});
var _merivale$victor$Interface_Model_State$setElaborationQuantifier = F2(
	function (quantifier, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{quantifier: quantifier});
	});
var _merivale$victor$Interface_Model_State$setElaborationPointerObject = F2(
	function (object, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{
				pointer: _merivale$victor$Theory_Object_Pseudo$RelatedTo(object)
			});
	});
var _merivale$victor$Interface_Model_State$setElaborationPointer = F2(
	function (pointer, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{pointer: pointer});
	});
var _merivale$victor$Interface_Model_State$setElaborationTarget = F2(
	function ($int, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{target: $int});
	});
var _merivale$victor$Interface_Model_State$setElaborationDisplacerModality = F2(
	function (modality, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{
				displacer: _elm_lang$core$Maybe$Just(
					_merivale$victor$Theory_Long_Displacers$Secondary(modality))
			});
	});
var _merivale$victor$Interface_Model_State$setElaborationDisplacerStatusRelator = F2(
	function (relator, elaboration) {
		var _p0 = elaboration.displacer;
		if (((_p0.ctor === 'Just') && (_p0._0.ctor === 'Primary')) && (_p0._0._0.ctor === '_Tuple2')) {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					displacer: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Long_Displacers$Primary(
							{
								ctor: '_Tuple2',
								_0: _p0._0._0._0,
								_1: _elm_lang$core$Maybe$Just(
									_merivale$victor$Theory_Plain_Nucleus$Relative(relator))
							}))
				});
		} else {
			return elaboration;
		}
	});
var _merivale$victor$Interface_Model_State$setElaborationDisplacerStatusString = F2(
	function (string, elaboration) {
		var _p1 = elaboration.displacer;
		if (((_p1.ctor === 'Just') && (_p1._0.ctor === 'Primary')) && (_p1._0._0.ctor === '_Tuple2')) {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					displacer: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Long_Displacers$Primary(
							{
								ctor: '_Tuple2',
								_0: _p1._0._0._0,
								_1: _elm_lang$core$Maybe$Just(
									_merivale$victor$Theory_Plain_Nucleus$Absolute(string))
							}))
				});
		} else {
			return elaboration;
		}
	});
var _merivale$victor$Interface_Model_State$setElaborationDisplacerStatus = F2(
	function (status, elaboration) {
		var _p2 = elaboration.displacer;
		if (((_p2.ctor === 'Just') && (_p2._0.ctor === 'Primary')) && (_p2._0._0.ctor === '_Tuple2')) {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					displacer: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Long_Displacers$Primary(
							{ctor: '_Tuple2', _0: _p2._0._0._0, _1: status}))
				});
		} else {
			return elaboration;
		}
	});
var _merivale$victor$Interface_Model_State$toggleElaborationDisplacerVerbalityPassive = function (elaboration) {
	var _p3 = elaboration.displacer;
	if ((((_p3.ctor === 'Just') && (_p3._0.ctor === 'Primary')) && (_p3._0._0.ctor === '_Tuple2')) && (_p3._0._0._0.ctor === 'Do')) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{
				displacer: _elm_lang$core$Maybe$Just(
					_merivale$victor$Theory_Long_Displacers$Primary(
						{
							ctor: '_Tuple2',
							_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, _p3._0._0._0._0, _p3._0._0._0._1, !_p3._0._0._0._2),
							_1: _p3._0._0._1
						}))
			});
	} else {
		return elaboration;
	}
};
var _merivale$victor$Interface_Model_State$toggleElaborationDisplacerVerbalityOngoing = function (elaboration) {
	var _p4 = elaboration.displacer;
	if (((_p4.ctor === 'Just') && (_p4._0.ctor === 'Primary')) && (_p4._0._0.ctor === '_Tuple2')) {
		if (_p4._0._0._0.ctor === 'Be') {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					displacer: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Long_Displacers$Primary(
							{
								ctor: '_Tuple2',
								_0: _merivale$victor$Theory_Plain_Nucleus$Be(!_p4._0._0._0._0),
								_1: _p4._0._0._1
							}))
				});
		} else {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					displacer: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Long_Displacers$Primary(
							{
								ctor: '_Tuple2',
								_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, _p4._0._0._0._0, !_p4._0._0._0._1, _p4._0._0._0._2),
								_1: _p4._0._0._1
							}))
				});
		}
	} else {
		return elaboration;
	}
};
var _merivale$victor$Interface_Model_State$setElaborationDisplacerVerbalityString = F2(
	function (string, elaboration) {
		var _p5 = elaboration.displacer;
		if ((((_p5.ctor === 'Just') && (_p5._0.ctor === 'Primary')) && (_p5._0._0.ctor === '_Tuple2')) && (_p5._0._0._0.ctor === 'Do')) {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					displacer: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Long_Displacers$Primary(
							{
								ctor: '_Tuple2',
								_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, string, _p5._0._0._0._1, _p5._0._0._0._2),
								_1: _p5._0._0._1
							}))
				});
		} else {
			return elaboration;
		}
	});
var _merivale$victor$Interface_Model_State$setElaborationDisplacerVerbality = F2(
	function (verbality, elaboration) {
		var _p6 = elaboration.displacer;
		if (((_p6.ctor === 'Just') && (_p6._0.ctor === 'Primary')) && (_p6._0._0.ctor === '_Tuple2')) {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					displacer: _elm_lang$core$Maybe$Just(
						_merivale$victor$Theory_Long_Displacers$Primary(
							{ctor: '_Tuple2', _0: verbality, _1: _p6._0._0._1}))
				});
		} else {
			return elaboration;
		}
	});
var _merivale$victor$Interface_Model_State$setElaborationDisplacer = F2(
	function (displacer, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{displacer: displacer});
	});
var _merivale$victor$Interface_Model_State$maybe = function (string) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$String$length(string),
		0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(string);
};
var _merivale$victor$Interface_Model_State$setElaborationPointerObjectString = F2(
	function (string, elaboration) {
		var _p7 = elaboration.pointer;
		if ((_p7.ctor === 'RelatedTo') && (_p7._0.ctor === 'Other')) {
			return _elm_lang$core$Native_Utils.update(
				elaboration,
				{
					pointer: _merivale$victor$Theory_Object_Pseudo$RelatedTo(
						A3(
							_merivale$victor$Theory_Plain_Nucleus$Other,
							_p7._0._0,
							_p7._0._1,
							_merivale$victor$Interface_Model_State$maybe(string)))
				});
		} else {
			return elaboration;
		}
	});
var _merivale$victor$Interface_Model_State$setElaborationString3 = F2(
	function (string, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{
				string3: _merivale$victor$Interface_Model_State$maybe(string)
			});
	});
var _merivale$victor$Interface_Model_State$setElaborationString2 = F2(
	function (string, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{
				string2: _merivale$victor$Interface_Model_State$maybe(string)
			});
	});
var _merivale$victor$Interface_Model_State$setElaborationString1 = F2(
	function (string, elaboration) {
		return _elm_lang$core$Native_Utils.update(
			elaboration,
			{
				string1: _merivale$victor$Interface_Model_State$maybe(string)
			});
	});
var _merivale$victor$Interface_Model_State$toggleElaborationPlus = function (elaboration) {
	return _elm_lang$core$Native_Utils.update(
		elaboration,
		{plus: !elaboration.plus});
};
var _merivale$victor$Interface_Model_State$setBalanceWeightObjectString = F2(
	function (string, _p8) {
		var _p9 = _p8;
		var _p12 = _p9._1;
		var _p11 = _p9._0;
		var _p10 = _p12;
		if ((_p10.ctor === 'Different') && (_p10._0.ctor === 'Other')) {
			return {
				ctor: '_Tuple2',
				_0: _p11,
				_1: _merivale$victor$Theory_Plain_Nucleus$Different(
					A3(
						_merivale$victor$Theory_Plain_Nucleus$Other,
						_p10._0._0,
						_p10._0._1,
						_merivale$victor$Interface_Model_State$maybe(string)))
			};
		} else {
			return {ctor: '_Tuple2', _0: _p11, _1: _p12};
		}
	});
var _merivale$victor$Interface_Model_State$setBalanceWeightObject = F2(
	function (object, _p13) {
		var _p14 = _p13;
		var _p17 = _p14._1;
		var _p16 = _p14._0;
		var _p15 = _p17;
		if (_p15.ctor === 'Different') {
			return {
				ctor: '_Tuple2',
				_0: _p16,
				_1: _merivale$victor$Theory_Plain_Nucleus$Different(object)
			};
		} else {
			return {ctor: '_Tuple2', _0: _p16, _1: _p17};
		}
	});
var _merivale$victor$Interface_Model_State$setBalanceWeight = F2(
	function (weight, _p18) {
		var _p19 = _p18;
		return {ctor: '_Tuple2', _0: _p19._0, _1: weight};
	});
var _merivale$victor$Interface_Model_State$setBalanceRelator = F2(
	function (relator, _p20) {
		var _p21 = _p20;
		return {ctor: '_Tuple2', _0: relator, _1: _p21._1};
	});
var _merivale$victor$Interface_Model_State$modifyItem = F3(
	function (index, modified, list) {
		var _p22 = _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, index, list));
		if (_p22.ctor === 'Nothing') {
			return list;
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				A2(_elm_lang$core$List$take, index, list),
				{
					ctor: '::',
					_0: modified(_p22._0),
					_1: A2(_elm_lang$core$List$drop, index + 1, list)
				});
		}
	});
var _merivale$victor$Interface_Model_State$addElaboration = F3(
	function (index, recipe, elaborations) {
		var elaboration = function () {
			var _p23 = recipe;
			switch (_p23.ctor) {
				case 'MakeDISPLACED':
					return {
						plus: false,
						recipe: recipe,
						string1: _elm_lang$core$Maybe$Nothing,
						string2: _elm_lang$core$Maybe$Nothing,
						string3: _elm_lang$core$Maybe$Nothing,
						displacer: _elm_lang$core$Maybe$Just(
							_merivale$victor$Theory_Long_Displacers$Primary(
								{
									ctor: '_Tuple2',
									_0: _merivale$victor$Theory_Plain_Nucleus$Be(false),
									_1: _elm_lang$core$Maybe$Nothing
								})),
						target: -1,
						pointer: _merivale$victor$Theory_Object_Pseudo$The,
						quantifier: _elm_lang$core$Maybe$Nothing,
						other: false
					};
				case 'MakeENUMERATED':
					return {plus: false, recipe: recipe, string1: _elm_lang$core$Maybe$Nothing, string2: _elm_lang$core$Maybe$Nothing, string3: _elm_lang$core$Maybe$Nothing, displacer: _elm_lang$core$Maybe$Nothing, target: -1, pointer: _merivale$victor$Theory_Object_Pseudo$The, quantifier: _elm_lang$core$Maybe$Nothing, other: false};
				default:
					return {
						plus: false,
						recipe: recipe,
						string1: _elm_lang$core$Maybe$Nothing,
						string2: _elm_lang$core$Maybe$Nothing,
						string3: _elm_lang$core$Maybe$Nothing,
						displacer: _elm_lang$core$Maybe$Nothing,
						target: -1,
						pointer: _merivale$victor$Theory_Object_Pseudo$The,
						quantifier: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Some),
						other: false
					};
			}
		}();
		var after = A2(_elm_lang$core$List$drop, index + 1, elaborations);
		var before = A2(_elm_lang$core$List$take, index + 1, elaborations);
		return A2(
			_elm_lang$core$Basics_ops['++'],
			before,
			{ctor: '::', _0: elaboration, _1: after});
	});
var _merivale$victor$Interface_Model_State$removeFromList = F2(
	function (index, list) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_elm_lang$core$List$take, index, list),
			A2(_elm_lang$core$List$drop, index + 1, list));
	});
var _merivale$victor$Interface_Model_State$doesNotTarget = F2(
	function (balanceIndex, elaboration) {
		return !(A2(
			_elm_lang$core$List$member,
			elaboration.recipe,
			{
				ctor: '::',
				_0: _merivale$victor$Interface_Model_Types$MakeINDIRECT,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_Model_Types$MakeENUMERATED,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_Model_Types$MakeAMASSED,
						_1: {ctor: '[]'}
					}
				}
			}) && _elm_lang$core$Native_Utils.eq(elaboration.target, balanceIndex));
	});
var _merivale$victor$Interface_Model_State$toggleOrMinus = F3(
	function (toggleIndex, currentIndex, elaboration) {
		return _elm_lang$core$Native_Utils.eq(toggleIndex, currentIndex) ? _elm_lang$core$Native_Utils.update(
			elaboration,
			{plus: !elaboration.plus}) : _elm_lang$core$Native_Utils.update(
			elaboration,
			{plus: false});
	});
var _merivale$victor$Interface_Model_State$minusAll = function (model) {
	return _elm_lang$core$Native_Utils.update(
		model,
		{
			plus: false,
			elaborations: A2(
				_elm_lang$core$List$map,
				function (x) {
					return _elm_lang$core$Native_Utils.update(
						x,
						{plus: false});
				},
				model.elaborations)
		});
};
var _merivale$victor$Interface_Model_State$update = F2(
	function (signal, model) {
		var _p24 = signal;
		switch (_p24.ctor) {
			case 'LoadExample':
				var examples = function () {
					var _p25 = _p24._0;
					switch (_p25.ctor) {
						case 'PlainTheory':
							return _merivale$victor$Interface_Model_Examples$plainExamples;
						case 'ShortTheory':
							return _merivale$victor$Interface_Model_Examples$shortExamples;
						case 'LongTheory':
							return _merivale$victor$Interface_Model_Examples$longExamples;
						case 'ObjectTheory':
							return _merivale$victor$Interface_Model_Examples$objectExamples;
						default:
							return _merivale$victor$Interface_Model_Examples$allExamples;
					}
				}();
				var _p26 = _elm_lang$core$List$head(
					A2(_elm_lang$core$List$drop, _p24._1, examples));
				if (_p26.ctor === 'Nothing') {
					return model;
				} else {
					return _p26._0;
				}
			case 'TogglePlus':
				var allMinus = _merivale$victor$Interface_Model_State$minusAll(model);
				return _elm_lang$core$Native_Utils.update(
					allMinus,
					{plus: !model.plus});
			case 'SetObject':
				return _elm_lang$core$Native_Utils.update(
					model,
					{object: _p24._0});
			case 'SetObjectString':
				var _p27 = model.object;
				if (_p27.ctor === 'Other') {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							object: A3(
								_merivale$victor$Theory_Plain_Nucleus$Other,
								_p27._0,
								_p27._1,
								_merivale$victor$Interface_Model_State$maybe(_p24._0))
						});
				} else {
					return model;
				}
			case 'SetVerbality':
				return _elm_lang$core$Native_Utils.update(
					model,
					{verbality: _p24._0});
			case 'SetVerbalityString':
				var _p28 = model.verbality;
				if (_p28.ctor === 'Do') {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, _p24._0, _p28._1, _p28._2)
						});
				} else {
					return model;
				}
			case 'ToggleVerbalityOngoing':
				var _p29 = model.verbality;
				if (_p29.ctor === 'Be') {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							verbality: _merivale$victor$Theory_Plain_Nucleus$Be(!_p29._0)
						});
				} else {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, _p29._0, !_p29._1, _p29._2)
						});
				}
			case 'ToggleVerbalityPassive':
				var _p30 = model.verbality;
				if (_p30.ctor === 'Do') {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							verbality: A3(_merivale$victor$Theory_Plain_Nucleus$Do, _p30._0, _p30._1, !_p30._2)
						});
				} else {
					return model;
				}
			case 'SetStatus':
				return _elm_lang$core$Native_Utils.update(
					model,
					{status: _p24._0});
			case 'SetStatusString':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						status: _elm_lang$core$Maybe$Just(
							_merivale$victor$Theory_Plain_Nucleus$Absolute(_p24._0))
					});
			case 'SetStatusRelator':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						status: _elm_lang$core$Maybe$Just(
							_merivale$victor$Theory_Plain_Nucleus$Relative(_p24._0))
					});
			case 'AddBalance':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						balances: A2(
							_elm_lang$core$Basics_ops['++'],
							model.balances,
							{
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _merivale$victor$Theory_Plain_Nucleus$SameAsMain},
								_1: {ctor: '[]'}
							})
					});
			case 'RemoveBalance':
				var lastIndex = _elm_lang$core$List$length(model.balances) - 1;
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						balances: A2(_elm_lang$core$List$take, lastIndex, model.balances),
						elaborations: A2(
							_elm_lang$core$List$filter,
							_merivale$victor$Interface_Model_State$doesNotTarget(lastIndex),
							model.elaborations)
					});
			case 'SetBalanceRelator':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						balances: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setBalanceRelator(_p24._1),
							model.balances)
					});
			case 'SetBalanceWeight':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						balances: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setBalanceWeight(_p24._1),
							model.balances)
					});
			case 'SetBalanceWeightObject':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						balances: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setBalanceWeightObject(_p24._1),
							model.balances)
					});
			case 'SetBalanceWeightObjectString':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						balances: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setBalanceWeightObjectString(_p24._1),
							model.balances)
					});
			case 'AddElaboration':
				var allMinus = _merivale$victor$Interface_Model_State$minusAll(model);
				return _elm_lang$core$Native_Utils.update(
					allMinus,
					{
						elaborations: A3(_merivale$victor$Interface_Model_State$addElaboration, _p24._0, _p24._1, allMinus.elaborations)
					});
			case 'RemoveElaboration':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A2(_merivale$victor$Interface_Model_State$removeFromList, _p24._0, model.elaborations)
					});
			case 'ToggleElaborationPlus':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						plus: false,
						elaborations: A2(
							_elm_lang$core$List$indexedMap,
							_merivale$victor$Interface_Model_State$toggleOrMinus(_p24._0),
							model.elaborations)
					});
			case 'SetElaborationString1':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationString1(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationString2':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationString2(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationString3':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationString3(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationDisplacer':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationDisplacer(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationDisplacerVerbality':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationDisplacerVerbality(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationDisplacerVerbalityString':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationDisplacerVerbalityString(_p24._1),
							model.elaborations)
					});
			case 'ToggleElaborationDisplacerVerbalityOngoing':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(_merivale$victor$Interface_Model_State$modifyItem, _p24._0, _merivale$victor$Interface_Model_State$toggleElaborationDisplacerVerbalityOngoing, model.elaborations)
					});
			case 'ToggleElaborationDisplacerVerbalityPassive':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(_merivale$victor$Interface_Model_State$modifyItem, _p24._0, _merivale$victor$Interface_Model_State$toggleElaborationDisplacerVerbalityPassive, model.elaborations)
					});
			case 'SetElaborationDisplacerStatus':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationDisplacerStatus(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationDisplacerStatusString':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationDisplacerStatusString(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationDisplacerStatusRelator':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationDisplacerStatusRelator(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationDisplacerModality':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationDisplacerModality(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationTarget':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationTarget(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationPointer':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationPointer(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationPointerObject':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationPointerObject(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationPointerObjectString':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationPointerObjectString(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationQuantifier':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationQuantifier(_p24._1),
							model.elaborations)
					});
			case 'SetElaborationQuantifierInteger':
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(
							_merivale$victor$Interface_Model_State$modifyItem,
							_p24._0,
							_merivale$victor$Interface_Model_State$setElaborationQuantifierInteger(_p24._1),
							model.elaborations)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						elaborations: A3(_merivale$victor$Interface_Model_State$modifyItem, _p24._0, _merivale$victor$Interface_Model_State$toggleElaborationOther, model.elaborations)
					});
		}
	});
var _merivale$victor$Interface_Model_State$initial = function (theoryLayer) {
	var _p31 = theoryLayer;
	switch (_p31.ctor) {
		case 'PlainTheory':
			return _merivale$victor$Interface_Model_Examples$plainFirst;
		case 'ShortTheory':
			return _merivale$victor$Interface_Model_Examples$shortFirst;
		case 'LongTheory':
			return _merivale$victor$Interface_Model_Examples$longFirst;
		case 'ObjectTheory':
			return _merivale$victor$Interface_Model_Examples$objectFirst;
		default:
			return _merivale$victor$Interface_Model_Examples$plainFirst;
	}
};

var _merivale$victor$Interface_View_Ideas$displayQuantifier = function (quantifier) {
	var _p0 = quantifier;
	if ((_p0.ctor === 'Just') && (_p0._0.ctor === 'Integer')) {
		return 'Integer';
	} else {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'-- No Quantifier --',
			A2(_elm_lang$core$Maybe$map, _elm_lang$core$Basics$toString, quantifier));
	}
};
var _merivale$victor$Interface_View_Ideas$equateQuantifiers = F2(
	function (quantifier1, quantifier2) {
		var _p1 = {ctor: '_Tuple2', _0: quantifier1, _1: quantifier2};
		if (((((_p1.ctor === '_Tuple2') && (_p1._0.ctor === 'Just')) && (_p1._0._0.ctor === 'Integer')) && (_p1._1.ctor === 'Just')) && (_p1._1._0.ctor === 'Integer')) {
			return true;
		} else {
			return _elm_lang$core$Native_Utils.eq(quantifier1, quantifier2);
		}
	});
var _merivale$victor$Interface_View_Ideas$listQuantifiers = function (amassed) {
	return amassed ? {
		ctor: '::',
		_0: _elm_lang$core$Maybe$Nothing,
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Some),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Any),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$All),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Much),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Most),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Enough),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	} : {
		ctor: '::',
		_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$A),
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Object_Pseudo$Integer(0)),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Several),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Many),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Each),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Every),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Both),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Some),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Any),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		}
	};
};
var _merivale$victor$Interface_View_Ideas$displayPointer = function (pointer) {
	var _p2 = pointer;
	if (_p2.ctor === 'RelatedTo') {
		return 'Related to Object';
	} else {
		return _elm_lang$core$Basics$toString(_p2);
	}
};
var _merivale$victor$Interface_View_Ideas$equatePointers = F2(
	function (pointer1, pointer2) {
		var _p3 = {ctor: '_Tuple2', _0: pointer1, _1: pointer2};
		_v3_4:
		do {
			if (_p3.ctor === '_Tuple2') {
				switch (_p3._0.ctor) {
					case 'The':
						if (_p3._1.ctor === 'The') {
							return true;
						} else {
							break _v3_4;
						}
					case 'This':
						if (_p3._1.ctor === 'This') {
							return true;
						} else {
							break _v3_4;
						}
					case 'That':
						if (_p3._1.ctor === 'That') {
							return true;
						} else {
							break _v3_4;
						}
					default:
						if (_p3._1.ctor === 'RelatedTo') {
							return true;
						} else {
							break _v3_4;
						}
				}
			} else {
				break _v3_4;
			}
		} while(false);
		return false;
	});
var _merivale$victor$Interface_View_Ideas$listPointers = {
	ctor: '::',
	_0: _merivale$victor$Theory_Object_Pseudo$The,
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Object_Pseudo$This,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Object_Pseudo$That,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Object_Pseudo$RelatedTo(
					_merivale$victor$Theory_Plain_Nucleus$Speaker(false)),
				_1: {ctor: '[]'}
			}
		}
	}
};
var _merivale$victor$Interface_View_Ideas$displayTarget = function (target) {
	return (_elm_lang$core$Native_Utils.cmp(target, 0) < 0) ? 'Main Object' : A2(
		_elm_lang$core$Basics_ops['++'],
		'Balancing Object ',
		_elm_lang$core$Basics$toString(target + 1));
};
var _merivale$victor$Interface_View_Ideas$listTargets = function (balanceCount) {
	return A2(_elm_lang$core$List$range, -1, balanceCount - 1);
};
var _merivale$victor$Interface_View_Ideas$displayModality = function (modality) {
	var _p4 = modality;
	switch (_p4.ctor) {
		case 'Yes1':
			return 'Yes1 (\'will\')';
		case 'Yes2':
			return 'Yes2 (\'shall\')';
		case 'Yes3':
			return 'Yes3 (\'must\'/\'ought\'/\'need\')';
		case 'Maybe1':
			return 'Maybe1 (\'may\')';
		case 'Maybe3':
			return 'Maybe3 (\'can\')';
		default:
			return 'Maybe4 (\'dare\')';
	}
};
var _merivale$victor$Interface_View_Ideas$listModalities = function (limited) {
	return limited ? {
		ctor: '::',
		_0: _merivale$victor$Theory_Long_Displacers$Yes1,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Long_Displacers$Yes2,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Long_Displacers$Yes3,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Long_Displacers$Maybe1,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Long_Displacers$Maybe3,
						_1: {ctor: '[]'}
					}
				}
			}
		}
	} : {
		ctor: '::',
		_0: _merivale$victor$Theory_Long_Displacers$Yes1,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Long_Displacers$Yes2,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Long_Displacers$Yes3,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Long_Displacers$Maybe1,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Long_Displacers$Maybe3,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Long_Displacers$Maybe4,
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	};
};
var _merivale$victor$Interface_View_Ideas$displayWeight = function (weight) {
	var _p5 = weight;
	if (_p5.ctor === 'SameAsMain') {
		return 'Same as Main Object';
	} else {
		return 'Different Object';
	}
};
var _merivale$victor$Interface_View_Ideas$equateWeights = F2(
	function (weight1, weight2) {
		var _p6 = {ctor: '_Tuple2', _0: weight1, _1: weight2};
		_v6_2:
		do {
			if (_p6.ctor === '_Tuple2') {
				if (_p6._0.ctor === 'SameAsMain') {
					if (_p6._1.ctor === 'SameAsMain') {
						return true;
					} else {
						break _v6_2;
					}
				} else {
					if (_p6._1.ctor === 'Different') {
						return true;
					} else {
						break _v6_2;
					}
				}
			} else {
				break _v6_2;
			}
		} while(false);
		return false;
	});
var _merivale$victor$Interface_View_Ideas$listWeights = {
	ctor: '::',
	_0: _merivale$victor$Theory_Plain_Nucleus$SameAsMain,
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Plain_Nucleus$Different(
			_merivale$victor$Theory_Plain_Nucleus$Speaker(false)),
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_View_Ideas$displayMaybeRelator = function (relator) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'-- No Relator --',
		A2(_elm_lang$core$Maybe$map, _elm_lang$core$Basics$toString, relator));
};
var _merivale$victor$Interface_View_Ideas$listRelators = {
	ctor: '::',
	_0: _merivale$victor$Theory_Plain_Nucleus$About,
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Plain_Nucleus$Above,
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Plain_Nucleus$After,
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Plain_Nucleus$Against,
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Plain_Nucleus$At,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Plain_Nucleus$Before,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Plain_Nucleus$Behind,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Theory_Plain_Nucleus$Below,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Theory_Plain_Nucleus$Beyond,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Theory_Plain_Nucleus$By,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Theory_Plain_Nucleus$Down,
											_1: {
												ctor: '::',
												_0: _merivale$victor$Theory_Plain_Nucleus$For,
												_1: {
													ctor: '::',
													_0: _merivale$victor$Theory_Plain_Nucleus$From,
													_1: {
														ctor: '::',
														_0: _merivale$victor$Theory_Plain_Nucleus$In,
														_1: {
															ctor: '::',
															_0: _merivale$victor$Theory_Plain_Nucleus$Inside,
															_1: {
																ctor: '::',
																_0: _merivale$victor$Theory_Plain_Nucleus$Into,
																_1: {
																	ctor: '::',
																	_0: _merivale$victor$Theory_Plain_Nucleus$Like,
																	_1: {
																		ctor: '::',
																		_0: _merivale$victor$Theory_Plain_Nucleus$Of,
																		_1: {
																			ctor: '::',
																			_0: _merivale$victor$Theory_Plain_Nucleus$Off,
																			_1: {
																				ctor: '::',
																				_0: _merivale$victor$Theory_Plain_Nucleus$On,
																				_1: {
																					ctor: '::',
																					_0: _merivale$victor$Theory_Plain_Nucleus$Opposite,
																					_1: {
																						ctor: '::',
																						_0: _merivale$victor$Theory_Plain_Nucleus$Out,
																						_1: {
																							ctor: '::',
																							_0: _merivale$victor$Theory_Plain_Nucleus$Outside,
																							_1: {
																								ctor: '::',
																								_0: _merivale$victor$Theory_Plain_Nucleus$Over,
																								_1: {
																									ctor: '::',
																									_0: _merivale$victor$Theory_Plain_Nucleus$Through,
																									_1: {
																										ctor: '::',
																										_0: _merivale$victor$Theory_Plain_Nucleus$To,
																										_1: {
																											ctor: '::',
																											_0: _merivale$victor$Theory_Plain_Nucleus$Towards,
																											_1: {
																												ctor: '::',
																												_0: _merivale$victor$Theory_Plain_Nucleus$Under,
																												_1: {
																													ctor: '::',
																													_0: _merivale$victor$Theory_Plain_Nucleus$Up,
																													_1: {
																														ctor: '::',
																														_0: _merivale$victor$Theory_Plain_Nucleus$With,
																														_1: {
																															ctor: '::',
																															_0: _merivale$victor$Theory_Plain_Nucleus$Without,
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
};
var _merivale$victor$Interface_View_Ideas$listMaybeRelators = {
	ctor: '::',
	_0: _elm_lang$core$Maybe$Nothing,
	_1: A2(
		_elm_lang$core$List$map,
		function (x) {
			return _elm_lang$core$Maybe$Just(x);
		},
		_merivale$victor$Interface_View_Ideas$listRelators)
};
var _merivale$victor$Interface_View_Ideas$equateStatuses = F2(
	function (status1, status2) {
		var _p7 = {ctor: '_Tuple2', _0: status1, _1: status2};
		_v7_3:
		do {
			if (_p7.ctor === '_Tuple2') {
				if (_p7._0.ctor === 'Nothing') {
					if (_p7._1.ctor === 'Nothing') {
						return true;
					} else {
						break _v7_3;
					}
				} else {
					if (_p7._0._0.ctor === 'Absolute') {
						if ((_p7._1.ctor === 'Just') && (_p7._1._0.ctor === 'Absolute')) {
							return true;
						} else {
							break _v7_3;
						}
					} else {
						if ((_p7._1.ctor === 'Just') && (_p7._1._0.ctor === 'Relative')) {
							return true;
						} else {
							break _v7_3;
						}
					}
				}
			} else {
				break _v7_3;
			}
		} while(false);
		return false;
	});
var _merivale$victor$Interface_View_Ideas$displayStatus = function (status) {
	var _p8 = status;
	if (_p8.ctor === 'Nothing') {
		return '-- No Status --';
	} else {
		if (_p8._0.ctor === 'Absolute') {
			return 'Absolute';
		} else {
			return 'Relative';
		}
	}
};
var _merivale$victor$Interface_View_Ideas$listStatuses = {
	ctor: '::',
	_0: _elm_lang$core$Maybe$Nothing,
	_1: {
		ctor: '::',
		_0: _elm_lang$core$Maybe$Just(
			_merivale$victor$Theory_Plain_Nucleus$Absolute('')),
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Plain_Nucleus$Relative(_merivale$victor$Theory_Plain_Nucleus$About)),
			_1: {ctor: '[]'}
		}
	}
};
var _merivale$victor$Interface_View_Ideas$displayVerbality = function (verbality) {
	var _p9 = verbality;
	if (_p9.ctor === 'Be') {
		return 'Be';
	} else {
		return 'Do';
	}
};
var _merivale$victor$Interface_View_Ideas$equateVerbalities = F2(
	function (verbality1, verbality2) {
		var _p10 = {ctor: '_Tuple2', _0: verbality1, _1: verbality2};
		_v10_2:
		do {
			if (_p10.ctor === '_Tuple2') {
				if (_p10._0.ctor === 'Be') {
					if (_p10._1.ctor === 'Be') {
						return true;
					} else {
						break _v10_2;
					}
				} else {
					if (_p10._1.ctor === 'Do') {
						return true;
					} else {
						break _v10_2;
					}
				}
			} else {
				break _v10_2;
			}
		} while(false);
		return false;
	});
var _merivale$victor$Interface_View_Ideas$listVerbalities = {
	ctor: '::',
	_0: _merivale$victor$Theory_Plain_Nucleus$Be(false),
	_1: {
		ctor: '::',
		_0: A3(_merivale$victor$Theory_Plain_Nucleus$Do, '', false, false),
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_View_Ideas$displayDisplacer = function (displacer) {
	var _p11 = displacer;
	if (_p11.ctor === 'Nothing') {
		return '-- No Displacer --';
	} else {
		if (_p11._0.ctor === 'Primary') {
			return 'Primary';
		} else {
			return 'Secondary';
		}
	}
};
var _merivale$victor$Interface_View_Ideas$equateDisplacers = F2(
	function (displacer1, displacer2) {
		var _p12 = {ctor: '_Tuple2', _0: displacer1, _1: displacer2};
		_v12_3:
		do {
			if (_p12.ctor === '_Tuple2') {
				if (_p12._0.ctor === 'Nothing') {
					if (_p12._1.ctor === 'Nothing') {
						return true;
					} else {
						break _v12_3;
					}
				} else {
					if (_p12._0._0.ctor === 'Primary') {
						if ((_p12._1.ctor === 'Just') && (_p12._1._0.ctor === 'Primary')) {
							return true;
						} else {
							break _v12_3;
						}
					} else {
						if ((_p12._1.ctor === 'Just') && (_p12._1._0.ctor === 'Secondary')) {
							return true;
						} else {
							break _v12_3;
						}
					}
				}
			} else {
				break _v12_3;
			}
		} while(false);
		return false;
	});
var _merivale$victor$Interface_View_Ideas$listDisplacers = function (compulsory) {
	return compulsory ? {
		ctor: '::',
		_0: _elm_lang$core$Maybe$Just(
			_merivale$victor$Theory_Long_Displacers$Primary(
				{
					ctor: '_Tuple2',
					_0: _merivale$victor$Theory_Plain_Nucleus$Be(false),
					_1: _elm_lang$core$Maybe$Nothing
				})),
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Yes1)),
			_1: {ctor: '[]'}
		}
	} : {
		ctor: '::',
		_0: _elm_lang$core$Maybe$Nothing,
		_1: {
			ctor: '::',
			_0: _elm_lang$core$Maybe$Just(
				_merivale$victor$Theory_Long_Displacers$Primary(
					{
						ctor: '_Tuple2',
						_0: _merivale$victor$Theory_Plain_Nucleus$Be(false),
						_1: _elm_lang$core$Maybe$Nothing
					})),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Maybe$Just(
					_merivale$victor$Theory_Long_Displacers$Secondary(_merivale$victor$Theory_Long_Displacers$Yes1)),
				_1: {ctor: '[]'}
			}
		}
	};
};
var _merivale$victor$Interface_View_Ideas$objectHasString = function (object) {
	var _p13 = object;
	if (_p13.ctor === 'Other') {
		return true;
	} else {
		return false;
	}
};
var _merivale$victor$Interface_View_Ideas$objectString = function (object) {
	var _p14 = object;
	if (_p14.ctor === 'Other') {
		return _p14._2;
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _merivale$victor$Interface_View_Ideas$displayObject = function (object) {
	var _p15 = object;
	switch (_p15.ctor) {
		case 'Speaker':
			return _p15._0 ? 'Speakers' : 'Speaker';
		case 'Hearer':
			return _p15._0 ? 'Hearers' : 'Hearer';
		default:
			if (_p15._0) {
				return 'Others';
			} else {
				var _p16 = _p15._1;
				if (_p16.ctor === 'Nothing') {
					return 'Other (thing)';
				} else {
					if (_p16._0.ctor === 'Male') {
						return 'Other (male)';
					} else {
						return 'Other (female)';
					}
				}
			}
	}
};
var _merivale$victor$Interface_View_Ideas$equateObjects = F2(
	function (object1, object2) {
		var _p17 = {ctor: '_Tuple2', _0: object1, _1: object2};
		_v17_3:
		do {
			if (_p17.ctor === '_Tuple2') {
				switch (_p17._0.ctor) {
					case 'Speaker':
						if (_p17._1.ctor === 'Speaker') {
							return _elm_lang$core$Native_Utils.eq(_p17._0._0, _p17._1._0);
						} else {
							break _v17_3;
						}
					case 'Hearer':
						if (_p17._1.ctor === 'Hearer') {
							return _elm_lang$core$Native_Utils.eq(_p17._0._0, _p17._1._0);
						} else {
							break _v17_3;
						}
					default:
						if (_p17._1.ctor === 'Other') {
							return _elm_lang$core$Native_Utils.eq(_p17._0._0, _p17._1._0) && _elm_lang$core$Native_Utils.eq(_p17._0._1, _p17._1._1);
						} else {
							break _v17_3;
						}
				}
			} else {
				break _v17_3;
			}
		} while(false);
		return false;
	});
var _merivale$victor$Interface_View_Ideas$listObjectGroups = {
	ctor: '::',
	_0: {
		ctor: '_Tuple2',
		_0: 'Singular',
		_1: {
			ctor: '::',
			_0: _merivale$victor$Theory_Plain_Nucleus$Speaker(false),
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Plain_Nucleus$Hearer(false),
				_1: {
					ctor: '::',
					_0: A3(
						_merivale$victor$Theory_Plain_Nucleus$Other,
						false,
						_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
						_elm_lang$core$Maybe$Nothing),
					_1: {
						ctor: '::',
						_0: A3(
							_merivale$victor$Theory_Plain_Nucleus$Other,
							false,
							_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
							_elm_lang$core$Maybe$Nothing),
						_1: {
							ctor: '::',
							_0: A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
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
				_0: _merivale$victor$Theory_Plain_Nucleus$Speaker(true),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Theory_Plain_Nucleus$Hearer(true),
					_1: {
						ctor: '::',
						_0: A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
						_1: {ctor: '[]'}
					}
				}
			}
		},
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_View_Ideas$listObjects = {
	ctor: '::',
	_0: _merivale$victor$Theory_Plain_Nucleus$Speaker(false),
	_1: {
		ctor: '::',
		_0: _merivale$victor$Theory_Plain_Nucleus$Hearer(false),
		_1: {
			ctor: '::',
			_0: A3(
				_merivale$victor$Theory_Plain_Nucleus$Other,
				false,
				_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Male),
				_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A3(
					_merivale$victor$Theory_Plain_Nucleus$Other,
					false,
					_elm_lang$core$Maybe$Just(_merivale$victor$Theory_Plain_Nucleus$Female),
					_elm_lang$core$Maybe$Nothing),
				_1: {
					ctor: '::',
					_0: A3(_merivale$victor$Theory_Plain_Nucleus$Other, false, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Theory_Plain_Nucleus$Speaker(true),
						_1: {
							ctor: '::',
							_0: _merivale$victor$Theory_Plain_Nucleus$Hearer(true),
							_1: {
								ctor: '::',
								_0: A3(_merivale$victor$Theory_Plain_Nucleus$Other, true, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};

var _merivale$victor$Interface_View_Input$emptyInput = A2(
	_elm_lang$html$Html$input,
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$type_('text'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$disabled(true),
			_1: {ctor: '[]'}
		}
	},
	{ctor: '[]'});
var _merivale$victor$Interface_View_Input$onChange = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _merivale$victor$Interface_View_Input$fromId = function (options) {
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
				'Interface.View.Input',
				{
					start: {line: 130, column: 13},
					end: {line: 135, column: 22}
				},
				_p0)('select element is broken :(');
		} else {
			return _p0._0;
		}
	};
	return fromString;
};
var _merivale$victor$Interface_View_Input$option = F4(
	function (toLabel, current, equivalent, value) {
		return A2(
			_elm_lang$html$Html$option,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$value(
					_elm_lang$core$Basics$toString(value)),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$selected(
						A2(equivalent, current, value)),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(
					toLabel(value)),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Input$optionGroup = F4(
	function (toLabel, value, equivalent, _p2) {
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
				A3(_merivale$victor$Interface_View_Input$option, toLabel, value, equivalent),
				_p3._1));
	});
var _merivale$victor$Interface_View_Input$selectGroup = F2(
	function (groups, _p4) {
		var _p5 = _p4;
		return A2(
			_elm_lang$html$Html$select,
			{
				ctor: '::',
				_0: _merivale$victor$Interface_View_Input$onChange(
					function (_p6) {
						return _p5.signal(
							A2(_merivale$victor$Interface_View_Input$fromId, _p5.options, _p6));
					}),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$List$map,
				A3(_merivale$victor$Interface_View_Input$optionGroup, _p5.toLabel, _p5.value, _p5.equivalent),
				groups));
	});
var _merivale$victor$Interface_View_Input$select = function (_p7) {
	var _p8 = _p7;
	var _p10 = _p8.options;
	return A2(
		_elm_lang$html$Html$select,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('select'),
			_1: {
				ctor: '::',
				_0: _merivale$victor$Interface_View_Input$onChange(
					function (_p9) {
						return _p8.signal(
							A2(_merivale$victor$Interface_View_Input$fromId, _p10, _p9));
					}),
				_1: {ctor: '[]'}
			}
		},
		A2(
			_elm_lang$core$List$map,
			A3(_merivale$victor$Interface_View_Input$option, _p8.toLabel, _p8.value, _p8.equivalent),
			_p10));
};
var _merivale$victor$Interface_View_Input$checkbox = function (_p11) {
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
var _merivale$victor$Interface_View_Input$number = function (_p14) {
	var _p15 = _p14;
	return A2(
		_elm_lang$html$Html$input,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$type_('number'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$value(_p15.value),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$placeholder(_p15.placeholder),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onInput(_p15.signal),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$disabled(_p15.disabled),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		},
		{ctor: '[]'});
};
var _merivale$victor$Interface_View_Input$text = function (_p16) {
	var _p17 = _p16;
	return A2(
		_elm_lang$html$Html$input,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$type_('text'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$value(_p17.value),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$placeholder(_p17.placeholder),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onInput(_p17.signal),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$disabled(_p17.disabled),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		},
		{ctor: '[]'});
};
var _merivale$victor$Interface_View_Input$inputWrapper = function (input) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('input'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: input,
			_1: {ctor: '[]'}
		});
};
var _merivale$victor$Interface_View_Input$factor = F2(
	function (label, inputs) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('factor'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$label,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('label'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(label),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('inputs'),
							_1: {ctor: '[]'}
						},
						A2(_elm_lang$core$List$map, _merivale$victor$Interface_View_Input$inputWrapper, inputs)),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Interface_View_Input$iconButton = function (_p18) {
	var _p19 = _p18;
	return A2(
		_elm_lang$html$Html$button,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Events$onClick(_p19.signal),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class(
					A2(_elm_lang$core$Basics_ops['++'], 'button ', _p19.label)),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$title(_p19.title),
					_1: {ctor: '[]'}
				}
			}
		},
		{ctor: '[]'});
};
var _merivale$victor$Interface_View_Input$button = function (_p20) {
	var _p21 = _p20;
	return A2(
		_elm_lang$html$Html$button,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Events$onClick(_p21.signal),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('button'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$title(_p21.title),
					_1: {ctor: '[]'}
				}
			}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text(_p21.label),
			_1: {ctor: '[]'}
		});
};

var _merivale$victor$Interface_View_Elaborations$other = F2(
	function (index, checked) {
		return _merivale$victor$Interface_View_Input$checkbox(
			{
				id: A2(
					_elm_lang$core$Basics_ops['++'],
					'other',
					_elm_lang$core$Basics$toString(index)),
				label: 'Other',
				checked: checked,
				signal: _merivale$victor$Interface_Model_Types$ToggleElaborationOther(index)
			});
	});
var _merivale$victor$Interface_View_Elaborations$verbalityPassive = F2(
	function (index, passive) {
		return _merivale$victor$Interface_View_Input$checkbox(
			{
				id: A2(
					_elm_lang$core$Basics_ops['++'],
					'passive',
					_elm_lang$core$Basics$toString(index)),
				label: 'Passive',
				checked: passive,
				signal: _merivale$victor$Interface_Model_Types$ToggleElaborationDisplacerVerbalityPassive(index)
			});
	});
var _merivale$victor$Interface_View_Elaborations$verbalityOngoing = F2(
	function (index, ongoing) {
		return _merivale$victor$Interface_View_Input$checkbox(
			{
				id: A2(
					_elm_lang$core$Basics_ops['++'],
					'ongoing',
					_elm_lang$core$Basics$toString(index)),
				label: 'Ongoing',
				checked: ongoing,
				signal: _merivale$victor$Interface_Model_Types$ToggleElaborationDisplacerVerbalityOngoing(index)
			});
	});
var _merivale$victor$Interface_View_Elaborations$stringText = F3(
	function (placeholder, signal, string) {
		return _merivale$victor$Interface_View_Input$text(
			{
				value: A2(_elm_lang$core$Maybe$withDefault, '', string),
				placeholder: placeholder,
				signal: signal,
				disabled: false
			});
	});
var _merivale$victor$Interface_View_Elaborations$quantifierInteger = F2(
	function (index, $int) {
		return _merivale$victor$Interface_View_Input$number(
			{
				value: _elm_lang$core$Basics$toString($int),
				placeholder: 'integer',
				signal: _merivale$victor$Interface_Model_Types$SetElaborationQuantifierInteger(index),
				disabled: false
			});
	});
var _merivale$victor$Interface_View_Elaborations$pointerObjectText = F2(
	function (index, object) {
		return _merivale$victor$Interface_View_Input$text(
			{
				value: A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_merivale$victor$Interface_View_Ideas$objectString(object)),
				placeholder: 'name (optional)',
				signal: _merivale$victor$Interface_Model_Types$SetElaborationPointerObjectString(index),
				disabled: !_merivale$victor$Interface_View_Ideas$objectHasString(object)
			});
	});
var _merivale$victor$Interface_View_Elaborations$statusString = F2(
	function (index, string) {
		return _merivale$victor$Interface_View_Input$text(
			{
				value: string,
				placeholder: 'e.g. able, eager, happy (optional)',
				signal: _merivale$victor$Interface_Model_Types$SetElaborationDisplacerStatusString(index),
				disabled: false
			});
	});
var _merivale$victor$Interface_View_Elaborations$verbalityString = F2(
	function (index, string) {
		return _merivale$victor$Interface_View_Input$text(
			{
				value: string,
				placeholder: 'e.g. have, like, want',
				signal: _merivale$victor$Interface_Model_Types$SetElaborationDisplacerVerbalityString(index),
				disabled: false
			});
	});
var _merivale$victor$Interface_View_Elaborations$quantifierSelect = F3(
	function (amassed, index, quantifier) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: quantifier,
				options: _merivale$victor$Interface_View_Ideas$listQuantifiers(amassed),
				equivalent: _merivale$victor$Interface_View_Ideas$equateQuantifiers,
				signal: _merivale$victor$Interface_Model_Types$SetElaborationQuantifier(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayQuantifier
			});
	});
var _merivale$victor$Interface_View_Elaborations$pointerObjectSelect = F2(
	function (index, object) {
		return A2(
			_merivale$victor$Interface_View_Input$selectGroup,
			_merivale$victor$Interface_View_Ideas$listObjectGroups,
			{
				value: object,
				options: _merivale$victor$Interface_View_Ideas$listObjects,
				equivalent: _merivale$victor$Interface_View_Ideas$equateObjects,
				signal: _merivale$victor$Interface_Model_Types$SetElaborationPointerObject(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayObject
			});
	});
var _merivale$victor$Interface_View_Elaborations$pointerSelect = F2(
	function (index, pointer) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: pointer,
				options: _merivale$victor$Interface_View_Ideas$listPointers,
				equivalent: _merivale$victor$Interface_View_Ideas$equatePointers,
				signal: _merivale$victor$Interface_Model_Types$SetElaborationPointer(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayPointer
			});
	});
var _merivale$victor$Interface_View_Elaborations$targetSelect = F3(
	function (balanceCount, index, target) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: target,
				options: _merivale$victor$Interface_View_Ideas$listTargets(balanceCount),
				equivalent: F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				signal: _merivale$victor$Interface_Model_Types$SetElaborationTarget(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayTarget
			});
	});
var _merivale$victor$Interface_View_Elaborations$modalitySelect = F3(
	function (limited, index, modality) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: modality,
				options: _merivale$victor$Interface_View_Ideas$listModalities(limited),
				equivalent: F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				signal: _merivale$victor$Interface_Model_Types$SetElaborationDisplacerModality(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayModality
			});
	});
var _merivale$victor$Interface_View_Elaborations$statusRelatorSelect = F2(
	function (index, relator) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: relator,
				options: _merivale$victor$Interface_View_Ideas$listRelators,
				equivalent: F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				signal: _merivale$victor$Interface_Model_Types$SetElaborationDisplacerStatusRelator(index),
				toLabel: _elm_lang$core$Basics$toString
			});
	});
var _merivale$victor$Interface_View_Elaborations$statusSelect = F2(
	function (index, status) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: status,
				options: _merivale$victor$Interface_View_Ideas$listStatuses,
				equivalent: _merivale$victor$Interface_View_Ideas$equateStatuses,
				signal: _merivale$victor$Interface_Model_Types$SetElaborationDisplacerStatus(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayStatus
			});
	});
var _merivale$victor$Interface_View_Elaborations$verbalitySelect = F2(
	function (index, verbality) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: verbality,
				options: _merivale$victor$Interface_View_Ideas$listVerbalities,
				equivalent: _merivale$victor$Interface_View_Ideas$equateVerbalities,
				signal: _merivale$victor$Interface_Model_Types$SetElaborationDisplacerVerbality(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayVerbality
			});
	});
var _merivale$victor$Interface_View_Elaborations$displacerSelect = F3(
	function (compulsory, index, displacer) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: displacer,
				options: _merivale$victor$Interface_View_Ideas$listDisplacers(compulsory),
				equivalent: _merivale$victor$Interface_View_Ideas$equateDisplacers,
				signal: _merivale$victor$Interface_Model_Types$SetElaborationDisplacer(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayDisplacer
			});
	});
var _merivale$victor$Interface_View_Elaborations$haystack = F2(
	function (index, elaboration) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Haystack',
			{
				ctor: '::',
				_0: A3(
					_merivale$victor$Interface_View_Elaborations$stringText,
					'category (e.g. apple, water)',
					_merivale$victor$Interface_Model_Types$SetElaborationString1(index),
					elaboration.string1),
				_1: {
					ctor: '::',
					_0: A3(
						_merivale$victor$Interface_View_Elaborations$stringText,
						'description (e.g. red, happy, interesting)',
						_merivale$victor$Interface_Model_Types$SetElaborationString2(index),
						elaboration.string2),
					_1: {
						ctor: '::',
						_0: A3(
							_merivale$victor$Interface_View_Elaborations$stringText,
							'restriction (e.g. in the room, of France)',
							_merivale$victor$Interface_Model_Types$SetElaborationString3(index),
							elaboration.string3),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Interface_View_Elaborations$quantifier = F3(
	function (amassed, index, elaboration) {
		var _p0 = elaboration.quantifier;
		if ((_p0.ctor === 'Just') && (_p0._0.ctor === 'Integer')) {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Quantifier',
				{
					ctor: '::',
					_0: A3(_merivale$victor$Interface_View_Elaborations$quantifierSelect, amassed, index, elaboration.quantifier),
					_1: {
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$quantifierInteger, index, _p0._0._0),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$other, index, elaboration.other),
							_1: {ctor: '[]'}
						}
					}
				});
		} else {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Quantifier',
				{
					ctor: '::',
					_0: A3(_merivale$victor$Interface_View_Elaborations$quantifierSelect, amassed, index, elaboration.quantifier),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Input$emptyInput,
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$other, index, elaboration.other),
							_1: {ctor: '[]'}
						}
					}
				});
		}
	});
var _merivale$victor$Interface_View_Elaborations$pointer = F2(
	function (index, elaboration) {
		var _p1 = elaboration.pointer;
		if (_p1.ctor === 'RelatedTo') {
			var _p2 = _p1._0;
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Pointer',
				{
					ctor: '::',
					_0: A2(_merivale$victor$Interface_View_Elaborations$pointerSelect, index, elaboration.pointer),
					_1: {
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$pointerObjectSelect, index, _p2),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$pointerObjectText, index, _p2),
							_1: {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_View_Elaborations$other, index, elaboration.other),
								_1: {ctor: '[]'}
							}
						}
					}
				});
		} else {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Pointer',
				{
					ctor: '::',
					_0: A2(_merivale$victor$Interface_View_Elaborations$pointerSelect, index, elaboration.pointer),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Input$emptyInput,
						_1: {
							ctor: '::',
							_0: _merivale$victor$Interface_View_Input$emptyInput,
							_1: {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_View_Elaborations$other, index, elaboration.other),
								_1: {ctor: '[]'}
							}
						}
					}
				});
		}
	});
var _merivale$victor$Interface_View_Elaborations$target = F3(
	function (balanceCount, index, elaboration) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Target',
			{
				ctor: '::',
				_0: A3(_merivale$victor$Interface_View_Elaborations$targetSelect, balanceCount, index, elaboration.target),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Elaborations$tally = F2(
	function (index, elaboration) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Tally',
			{
				ctor: '::',
				_0: A3(
					_merivale$victor$Interface_View_Elaborations$stringText,
					'e.g. once, twice, several times',
					_merivale$victor$Interface_Model_Types$SetElaborationString1(index),
					elaboration.string1),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Elaborations$duration = F2(
	function (index, elaboration) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Duration',
			{
				ctor: '::',
				_0: A3(
					_merivale$victor$Interface_View_Elaborations$stringText,
					'e.g. for a while, for two hours, all day',
					_merivale$victor$Interface_Model_Types$SetElaborationString1(index),
					elaboration.string1),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Elaborations$frequency = F2(
	function (index, elaboration) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Frequency',
			{
				ctor: '::',
				_0: A3(
					_merivale$victor$Interface_View_Elaborations$stringText,
					'e.g. usually, sometimes, occasionally',
					_merivale$victor$Interface_Model_Types$SetElaborationString1(index),
					elaboration.string1),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Elaborations$preordainedTime = F2(
	function (index, elaboration) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Time',
			{
				ctor: '::',
				_0: A3(
					_merivale$victor$Interface_View_Elaborations$stringText,
					'e.g. tomorrow, next week',
					_merivale$victor$Interface_Model_Types$SetElaborationString1(index),
					elaboration.string1),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Elaborations$modality = F3(
	function (limited, index, modalityValue) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Modality',
			{
				ctor: '::',
				_0: A3(_merivale$victor$Interface_View_Elaborations$modalitySelect, limited, index, modalityValue),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Elaborations$status = F2(
	function (index, statusValue) {
		var _p3 = statusValue;
		if (_p3.ctor === 'Nothing') {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Status',
				{
					ctor: '::',
					_0: A2(_merivale$victor$Interface_View_Elaborations$statusSelect, index, statusValue),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Input$emptyInput,
						_1: {ctor: '[]'}
					}
				});
		} else {
			if (_p3._0.ctor === 'Absolute') {
				return A2(
					_merivale$victor$Interface_View_Input$factor,
					'Status',
					{
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$statusSelect, index, statusValue),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$statusString, index, _p3._0._0),
							_1: {ctor: '[]'}
						}
					});
			} else {
				return A2(
					_merivale$victor$Interface_View_Input$factor,
					'Status',
					{
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$statusSelect, index, statusValue),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$statusRelatorSelect, index, _p3._0._0),
							_1: {ctor: '[]'}
						}
					});
			}
		}
	});
var _merivale$victor$Interface_View_Elaborations$verbality = F2(
	function (index, verbalityValue) {
		var _p4 = verbalityValue;
		if (_p4.ctor === 'Be') {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Verbality',
				{
					ctor: '::',
					_0: A2(_merivale$victor$Interface_View_Elaborations$verbalitySelect, index, verbalityValue),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Input$emptyInput,
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$verbalityOngoing, index, _p4._0),
							_1: {
								ctor: '::',
								_0: _merivale$victor$Interface_View_Input$emptyInput,
								_1: {ctor: '[]'}
							}
						}
					}
				});
		} else {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Verbality',
				{
					ctor: '::',
					_0: A2(_merivale$victor$Interface_View_Elaborations$verbalitySelect, index, verbalityValue),
					_1: {
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$verbalityString, index, _p4._0),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$verbalityOngoing, index, _p4._1),
							_1: {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_View_Elaborations$verbalityPassive, index, _p4._2),
								_1: {ctor: '[]'}
							}
						}
					}
				});
		}
	});
var _merivale$victor$Interface_View_Elaborations$displacerBase = F3(
	function (compulsory, index, displacer) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Displacer',
			{
				ctor: '::',
				_0: A3(_merivale$victor$Interface_View_Elaborations$displacerSelect, compulsory, index, displacer),
				_1: {ctor: '[]'}
			});
	});
var _merivale$victor$Interface_View_Elaborations$displacer = F4(
	function (compulsory, limitedModalities, index, elaboration) {
		var _p5 = elaboration.displacer;
		if (_p5.ctor === 'Nothing') {
			return {
				ctor: '::',
				_0: A3(_merivale$victor$Interface_View_Elaborations$displacerBase, compulsory, index, elaboration.displacer),
				_1: {ctor: '[]'}
			};
		} else {
			if (_p5._0.ctor === 'Primary') {
				return {
					ctor: '::',
					_0: A3(_merivale$victor$Interface_View_Elaborations$displacerBase, compulsory, index, elaboration.displacer),
					_1: {
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$verbality, index, _p5._0._0._0),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$status, index, _p5._0._0._1),
							_1: {ctor: '[]'}
						}
					}
				};
			} else {
				return {
					ctor: '::',
					_0: A3(_merivale$victor$Interface_View_Elaborations$displacerBase, compulsory, index, elaboration.displacer),
					_1: {
						ctor: '::',
						_0: A3(_merivale$victor$Interface_View_Elaborations$modality, limitedModalities, index, _p5._0._0),
						_1: {ctor: '[]'}
					}
				};
			}
		}
	});
var _merivale$victor$Interface_View_Elaborations$pastTime = F2(
	function (index, elaboration) {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Time',
			{
				ctor: '::',
				_0: A3(
					_merivale$victor$Interface_View_Elaborations$stringText,
					'e.g. yesterday, last week',
					_merivale$victor$Interface_Model_Types$SetElaborationString1(index),
					elaboration.string1),
				_1: {ctor: '[]'}
			});
	});

var _merivale$victor$Interface_View_Examples$objectExamples = {
	ctor: '::',
	_0: 'INDIRECT -1 ( The, \"king\", \"of France\") ( Male, ( Be, \"bald\" ) )',
	_1: {
		ctor: '::',
		_0: 'INDIRECT -1 ( RelatedTo (Male \"Smith\"), \"murderer\") ( Male, ( Be, \"insane\" ) )',
		_1: {ctor: '[]'}
	}
};
var _merivale$victor$Interface_View_Examples$longExamples = {
	ctor: '::',
	_0: 'DISPLACED (Do \"go\" Ongoing) ( Female, Do \"see\", [ Male ] )',
	_1: {
		ctor: '::',
		_0: 'PREORDAINED \"tomorrow\" (DISPLACED (Do \"go\" Ongoing) ( Female, Do \"see\", [ Male ] ))',
		_1: {
			ctor: '::',
			_0: 'PREORDAINED (Do \"go\" Ongoing) ( Female, Do \"see\", [ Male ] )',
			_1: {
				ctor: '::',
				_0: 'DISPLACED Yes1 ( Male \"Victor\", Do \"know\" )',
				_1: {
					ctor: '::',
					_0: 'PAST (DISPLACED Yes1 ( Male \"Victor\", Do \"know\" ))',
					_1: {
						ctor: '::',
						_0: 'PREORDAINED Yes1 \"tomorrow\" ( Other, Do \"rain\" )',
						_1: {
							ctor: '::',
							_0: 'PREORDAINED Maybe1 \"tomorrow\" ( Other, Do \"rain\" )',
							_1: {
								ctor: '::',
								_0: 'PAST (PREORDAINED Maybe3 \"tomorrow\" ( Other, Do \"rain\" ))',
								_1: {
									ctor: '::',
									_0: 'PAST (DISPLACED Maybe1 (PAST ( Hearer, Do \"hurt\", [ Male ] )))',
									_1: {
										ctor: '::',
										_0: 'PRIOR (PAST (PREORDAINED Maybe1 ( Hearer, Do \"hurt\", [ Male ] )))',
										_1: {
											ctor: '::',
											_0: 'REGULAR Yes1 \"sometimes\" ( Speaker, Do \"try\", [ Other ] )',
											_1: {
												ctor: '::',
												_0: 'REGULAR Maybe1 \"occasionally\" ( Speaker, Do \"try\", [ Other ] )',
												_1: {
													ctor: '::',
													_0: 'REGULAR (Do \"tend\") ( Male, ( Do \"eat\", Out ) )',
													_1: {
														ctor: '::',
														_0: 'PAST (REGULAR (Do \"use\") ( Male, ( Do \"eat\", Out ) ))',
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
};
var _merivale$victor$Interface_View_Examples$shortExamples = {
	ctor: '::',
	_0: 'PAST \"yesterday\" ( Others, ( Do \"get\" Ongoing, \"married\" ) )',
	_1: {
		ctor: '::',
		_0: 'PAST \"yesterday\" (PREORDAINED ( Others, ( Do \"get\" Ongoing, \"married\" ) ))',
		_1: {
			ctor: '::',
			_0: 'NEGATIVE (REGULAR ( Female \"Claire\", Do \"drink\" ))',
			_1: {
				ctor: '::',
				_0: 'REGULAR (NEGATIVE ( Female \"Claire\", Do \"drink\" ))',
				_1: {
					ctor: '::',
					_0: 'PAST (NEGATIVE (EXTENDED \"for two hours\" ( Male \"Victor\", Do \"see\", [ Female \"Grannie\" ] )))',
					_1: {
						ctor: '::',
						_0: 'PAST (EXTENDED \"for two hours\" (NEGATIVE ( Male \"Victor\", Do \"see\", [ Female \"Grannie\" ] )))',
						_1: {
							ctor: '::',
							_0: 'PAST (NEGATIVE (SCATTERED \"fifteen times\" ( Female \"Grannie\", ( Do \"fall\", Over ) )))',
							_1: {
								ctor: '::',
								_0: 'PAST (SCATTERED \"fifteen times\" (NEGATIVE ( Female \"Grannie\", ( Do \"fall\", Over ) )))',
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _merivale$victor$Interface_View_Examples$plainExamples = {
	ctor: '::',
	_0: '( Speaker, Be, [ Male \"Victor\" ] )',
	_1: {
		ctor: '::',
		_0: '( Speaker, ( Be, \"happy\" ), [ ( For, Hearer ) ] )',
		_1: {
			ctor: '::',
			_0: '( Female, ( Be, Out ), [ ( With, Male \"Fred\" ) ] )',
			_1: {
				ctor: '::',
				_0: '( Others, ( Do \"look\", Up ), [ ( To, Female ) ] )',
				_1: {
					ctor: '::',
					_0: '( Speakers, Do \"like\", [ Others ] )',
					_1: {
						ctor: '::',
						_0: '( Others, Do \"live\", [ ( In, Other \"France\" ) ] )',
						_1: {
							ctor: '::',
							_0: '( Speaker, Do \"sing\" Ongoing )',
							_1: {
								ctor: '::',
								_0: '( Others, Do \"laugh\" Ongoing )',
								_1: {
									ctor: '::',
									_0: '( Speakers, Do \"leave\", [ Other, ( To, Others ) ] )',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _merivale$victor$Interface_View_Examples$allExamples = A2(
	_elm_lang$core$Basics_ops['++'],
	_merivale$victor$Interface_View_Examples$plainExamples,
	A2(
		_elm_lang$core$Basics_ops['++'],
		_merivale$victor$Interface_View_Examples$shortExamples,
		A2(_elm_lang$core$Basics_ops['++'], _merivale$victor$Interface_View_Examples$longExamples, _merivale$victor$Interface_View_Examples$objectExamples)));
var _merivale$victor$Interface_View_Examples$examplesToString = F2(
	function (theoryLayer, index) {
		var list = function () {
			var _p0 = theoryLayer;
			switch (_p0.ctor) {
				case 'FullTheory':
					return _merivale$victor$Interface_View_Examples$allExamples;
				case 'PlainTheory':
					return _merivale$victor$Interface_View_Examples$plainExamples;
				case 'ShortTheory':
					return _merivale$victor$Interface_View_Examples$shortExamples;
				case 'LongTheory':
					return _merivale$victor$Interface_View_Examples$longExamples;
				default:
					return _merivale$victor$Interface_View_Examples$objectExamples;
			}
		}();
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'example index out of range',
			_elm_lang$core$List$head(
				A2(_elm_lang$core$List$drop, index, list)));
	});
var _merivale$victor$Interface_View_Examples$examplesRange = function (theoryLayer) {
	var _p1 = theoryLayer;
	switch (_p1.ctor) {
		case 'FullTheory':
			return A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(_merivale$victor$Interface_View_Examples$allExamples) - 1);
		case 'PlainTheory':
			return A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(_merivale$victor$Interface_View_Examples$plainExamples) - 1);
		case 'ShortTheory':
			return A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(_merivale$victor$Interface_View_Examples$shortExamples) - 1);
		case 'LongTheory':
			return A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(_merivale$victor$Interface_View_Examples$longExamples) - 1);
		default:
			return A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(_merivale$victor$Interface_View_Examples$objectExamples) - 1);
	}
};
var _merivale$victor$Interface_View_Examples$examples = function (theoryLayer) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('examples'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$label,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Examples'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _merivale$victor$Interface_View_Input$select(
					{
						value: 0,
						options: _merivale$victor$Interface_View_Examples$examplesRange(theoryLayer),
						equivalent: F2(
							function (x, y) {
								return _elm_lang$core$Native_Utils.eq(x, y);
							}),
						signal: _merivale$victor$Interface_Model_Types$LoadExample(theoryLayer),
						toLabel: _merivale$victor$Interface_View_Examples$examplesToString(theoryLayer)
					}),
				_1: {ctor: '[]'}
			}
		});
};

var _merivale$victor$Interface_View_Nucleus$verbalityPassive = function (passive) {
	return _merivale$victor$Interface_View_Input$checkbox(
		{id: 'passive', label: 'Passive', checked: passive, signal: _merivale$victor$Interface_Model_Types$ToggleVerbalityPassive});
};
var _merivale$victor$Interface_View_Nucleus$verbalityOngoing = function (ongoing) {
	return _merivale$victor$Interface_View_Input$checkbox(
		{id: 'ongoing', label: 'Ongoing', checked: ongoing, signal: _merivale$victor$Interface_Model_Types$ToggleVerbalityOngoing});
};
var _merivale$victor$Interface_View_Nucleus$balanceWeightObjectText = F2(
	function (index, object) {
		return _merivale$victor$Interface_View_Input$text(
			{
				value: A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					_merivale$victor$Interface_View_Ideas$objectString(object)),
				placeholder: 'name (optional)',
				signal: _merivale$victor$Interface_Model_Types$SetBalanceWeightObjectString(index),
				disabled: !_merivale$victor$Interface_View_Ideas$objectHasString(object)
			});
	});
var _merivale$victor$Interface_View_Nucleus$statusString = function (string) {
	return _merivale$victor$Interface_View_Input$text(
		{value: string, placeholder: 'e.g. able, eager, happy (optional)', signal: _merivale$victor$Interface_Model_Types$SetStatusString, disabled: false});
};
var _merivale$victor$Interface_View_Nucleus$verbalityString = function (string) {
	return _merivale$victor$Interface_View_Input$text(
		{value: string, placeholder: 'e.g. have, like, want', signal: _merivale$victor$Interface_Model_Types$SetVerbalityString, disabled: false});
};
var _merivale$victor$Interface_View_Nucleus$objectText = function (object) {
	return _merivale$victor$Interface_View_Input$text(
		{
			value: A2(
				_elm_lang$core$Maybe$withDefault,
				'',
				_merivale$victor$Interface_View_Ideas$objectString(object)),
			placeholder: 'name (optional)',
			signal: _merivale$victor$Interface_Model_Types$SetObjectString,
			disabled: !_merivale$victor$Interface_View_Ideas$objectHasString(object)
		});
};
var _merivale$victor$Interface_View_Nucleus$balanceWeightObjectSelect = F2(
	function (index, object) {
		return A2(
			_merivale$victor$Interface_View_Input$selectGroup,
			_merivale$victor$Interface_View_Ideas$listObjectGroups,
			{
				value: object,
				options: _merivale$victor$Interface_View_Ideas$listObjects,
				equivalent: _merivale$victor$Interface_View_Ideas$equateObjects,
				signal: _merivale$victor$Interface_Model_Types$SetBalanceWeightObject(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayObject
			});
	});
var _merivale$victor$Interface_View_Nucleus$balanceWeightSelect = F2(
	function (index, weight) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: weight,
				options: _merivale$victor$Interface_View_Ideas$listWeights,
				equivalent: _merivale$victor$Interface_View_Ideas$equateWeights,
				signal: _merivale$victor$Interface_Model_Types$SetBalanceWeight(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayWeight
			});
	});
var _merivale$victor$Interface_View_Nucleus$balanceRelatorSelect = F2(
	function (index, relator) {
		return _merivale$victor$Interface_View_Input$select(
			{
				value: relator,
				options: _merivale$victor$Interface_View_Ideas$listMaybeRelators,
				equivalent: F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					}),
				signal: _merivale$victor$Interface_Model_Types$SetBalanceRelator(index),
				toLabel: _merivale$victor$Interface_View_Ideas$displayMaybeRelator
			});
	});
var _merivale$victor$Interface_View_Nucleus$statusRelatorSelect = function (relator) {
	return _merivale$victor$Interface_View_Input$select(
		{
			value: relator,
			options: _merivale$victor$Interface_View_Ideas$listRelators,
			equivalent: F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				}),
			signal: _merivale$victor$Interface_Model_Types$SetStatusRelator,
			toLabel: _elm_lang$core$Basics$toString
		});
};
var _merivale$victor$Interface_View_Nucleus$statusSelect = function (status) {
	return _merivale$victor$Interface_View_Input$select(
		{value: status, options: _merivale$victor$Interface_View_Ideas$listStatuses, equivalent: _merivale$victor$Interface_View_Ideas$equateStatuses, signal: _merivale$victor$Interface_Model_Types$SetStatus, toLabel: _merivale$victor$Interface_View_Ideas$displayStatus});
};
var _merivale$victor$Interface_View_Nucleus$verbalitySelect = function (verbality) {
	return _merivale$victor$Interface_View_Input$select(
		{value: verbality, options: _merivale$victor$Interface_View_Ideas$listVerbalities, equivalent: _merivale$victor$Interface_View_Ideas$equateVerbalities, signal: _merivale$victor$Interface_Model_Types$SetVerbality, toLabel: _merivale$victor$Interface_View_Ideas$displayVerbality});
};
var _merivale$victor$Interface_View_Nucleus$objectSelect = function (object) {
	return A2(
		_merivale$victor$Interface_View_Input$selectGroup,
		_merivale$victor$Interface_View_Ideas$listObjectGroups,
		{value: object, options: _merivale$victor$Interface_View_Ideas$listObjects, equivalent: _merivale$victor$Interface_View_Ideas$equateObjects, signal: _merivale$victor$Interface_Model_Types$SetObject, toLabel: _merivale$victor$Interface_View_Ideas$displayObject});
};
var _merivale$victor$Interface_View_Nucleus$balance = F2(
	function (index, _p0) {
		var _p1 = _p0;
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		var _p2 = _p5;
		if (_p2.ctor === 'SameAsMain') {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Balance ',
					_elm_lang$core$Basics$toString(index + 1)),
				{
					ctor: '::',
					_0: A2(_merivale$victor$Interface_View_Nucleus$balanceRelatorSelect, index, _p4),
					_1: {
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Nucleus$balanceWeightSelect, index, _p5),
						_1: {
							ctor: '::',
							_0: _merivale$victor$Interface_View_Input$emptyInput,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Interface_View_Input$emptyInput,
								_1: {ctor: '[]'}
							}
						}
					}
				});
		} else {
			var _p3 = _p2._0;
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Balance ',
					_elm_lang$core$Basics$toString(index + 1)),
				{
					ctor: '::',
					_0: A2(_merivale$victor$Interface_View_Nucleus$balanceRelatorSelect, index, _p4),
					_1: {
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Nucleus$balanceWeightSelect, index, _p5),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Nucleus$balanceWeightObjectSelect, index, _p3),
							_1: {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_View_Nucleus$balanceWeightObjectText, index, _p3),
								_1: {ctor: '[]'}
							}
						}
					}
				});
		}
	});
var _merivale$victor$Interface_View_Nucleus$status = function (status) {
	var _p6 = status;
	if (_p6.ctor === 'Nothing') {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Status',
			{
				ctor: '::',
				_0: _merivale$victor$Interface_View_Nucleus$statusSelect(status),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_View_Input$emptyInput,
					_1: {ctor: '[]'}
				}
			});
	} else {
		if (_p6._0.ctor === 'Absolute') {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Status',
				{
					ctor: '::',
					_0: _merivale$victor$Interface_View_Nucleus$statusSelect(status),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Nucleus$statusString(_p6._0._0),
						_1: {ctor: '[]'}
					}
				});
		} else {
			return A2(
				_merivale$victor$Interface_View_Input$factor,
				'Status',
				{
					ctor: '::',
					_0: _merivale$victor$Interface_View_Nucleus$statusSelect(status),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Nucleus$statusRelatorSelect(_p6._0._0),
						_1: {ctor: '[]'}
					}
				});
		}
	}
};
var _merivale$victor$Interface_View_Nucleus$verbality = function (verbality) {
	var _p7 = verbality;
	if (_p7.ctor === 'Be') {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Verbality',
			{
				ctor: '::',
				_0: _merivale$victor$Interface_View_Nucleus$verbalitySelect(verbality),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_View_Input$emptyInput,
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Nucleus$verbalityOngoing(_p7._0),
						_1: {
							ctor: '::',
							_0: _merivale$victor$Interface_View_Input$emptyInput,
							_1: {ctor: '[]'}
						}
					}
				}
			});
	} else {
		return A2(
			_merivale$victor$Interface_View_Input$factor,
			'Verbality',
			{
				ctor: '::',
				_0: _merivale$victor$Interface_View_Nucleus$verbalitySelect(verbality),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_View_Nucleus$verbalityString(_p7._0),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Nucleus$verbalityOngoing(_p7._1),
						_1: {
							ctor: '::',
							_0: _merivale$victor$Interface_View_Nucleus$verbalityPassive(_p7._2),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	}
};
var _merivale$victor$Interface_View_Nucleus$object = function (object) {
	return A2(
		_merivale$victor$Interface_View_Input$factor,
		'Object',
		{
			ctor: '::',
			_0: _merivale$victor$Interface_View_Nucleus$objectSelect(object),
			_1: {
				ctor: '::',
				_0: _merivale$victor$Interface_View_Nucleus$objectText(object),
				_1: {ctor: '[]'}
			}
		});
};

var _merivale$victor$Interface_View_Output$format = function (sentence) {
	var ucFirst = function () {
		var _p0 = _elm_lang$core$String$uncons(sentence);
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$String$toUpper(sentence);
		} else {
			return A2(
				_elm_lang$core$String$cons,
				_elm_lang$core$Char$toUpper(_p0._0._0),
				_p0._0._1);
		}
	}();
	return A2(_elm_lang$core$String$append, ucFirst, '.');
};
var _merivale$victor$Interface_View_Output$output = function (result) {
	var _p1 = result;
	if (_p1.ctor === 'Err') {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('output error'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(_p1._0),
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
					_merivale$victor$Interface_View_Output$format(_p1._0)),
				_1: {ctor: '[]'}
			});
	}
};

var _merivale$victor$Theory_Words_Prepositions$preposition = function (relator) {
	return _elm_lang$core$String$toLower(
		_elm_lang$core$Basics$toString(relator));
};

var _merivale$victor$Theory_Words_Pronouns$relative2 = function (object) {
	var _p0 = object;
	switch (_p0.ctor) {
		case 'Speaker':
			if (_p0._0 === false) {
				return 'mine';
			} else {
				return 'ours';
			}
		case 'Hearer':
			return 'yours';
		default:
			if (_p0._2.ctor === 'Nothing') {
				if (_p0._0 === false) {
					if (_p0._1.ctor === 'Nothing') {
						return 'its';
					} else {
						if (_p0._1._0.ctor === 'Male') {
							return 'his';
						} else {
							return 'hers';
						}
					}
				} else {
					return 'theirs';
				}
			} else {
				return A2(_elm_lang$core$Basics_ops['++'], _p0._2._0, '\'s');
			}
	}
};
var _merivale$victor$Theory_Words_Pronouns$relative1 = function (object) {
	var _p1 = object;
	switch (_p1.ctor) {
		case 'Speaker':
			if (_p1._0 === false) {
				return 'my';
			} else {
				return 'our';
			}
		case 'Hearer':
			return 'your';
		default:
			if (_p1._2.ctor === 'Nothing') {
				if (_p1._0 === false) {
					if (_p1._1.ctor === 'Nothing') {
						return 'its';
					} else {
						if (_p1._1._0.ctor === 'Male') {
							return 'his';
						} else {
							return 'her';
						}
					}
				} else {
					return 'their';
				}
			} else {
				return A2(_elm_lang$core$Basics_ops['++'], _p1._2._0, '\'s');
			}
	}
};
var _merivale$victor$Theory_Words_Pronouns$direct3 = function (object) {
	var _p2 = object;
	switch (_p2.ctor) {
		case 'Speaker':
			if (_p2._0 === false) {
				return 'myself';
			} else {
				return 'ourselves';
			}
		case 'Hearer':
			if (_p2._0 === false) {
				return 'yourself';
			} else {
				return 'yourselves';
			}
		default:
			if (_p2._0 === false) {
				if (_p2._1.ctor === 'Nothing') {
					return 'itself';
				} else {
					if (_p2._1._0.ctor === 'Male') {
						return 'himself';
					} else {
						return 'herself';
					}
				}
			} else {
				return 'themselves';
			}
	}
};
var _merivale$victor$Theory_Words_Pronouns$direct2 = function (object) {
	var _p3 = object;
	switch (_p3.ctor) {
		case 'Speaker':
			if (_p3._0 === false) {
				return 'me';
			} else {
				return 'us';
			}
		case 'Hearer':
			return 'you';
		default:
			if (_p3._2.ctor === 'Nothing') {
				if (_p3._0 === false) {
					if (_p3._1.ctor === 'Nothing') {
						return 'it';
					} else {
						if (_p3._1._0.ctor === 'Male') {
							return 'him';
						} else {
							return 'her';
						}
					}
				} else {
					return 'them';
				}
			} else {
				return _p3._2._0;
			}
	}
};
var _merivale$victor$Theory_Words_Pronouns$direct1 = function (object) {
	var _p4 = object;
	switch (_p4.ctor) {
		case 'Speaker':
			if (_p4._0 === false) {
				return 'I';
			} else {
				return 'we';
			}
		case 'Hearer':
			return 'you';
		default:
			if (_p4._2.ctor === 'Nothing') {
				if (_p4._0 === false) {
					if (_p4._1.ctor === 'Nothing') {
						return 'it';
					} else {
						if (_p4._1._0.ctor === 'Male') {
							return 'he';
						} else {
							return 'she';
						}
					}
				} else {
					return 'they';
				}
			} else {
				return _p4._2._0;
			}
	}
};

var _merivale$victor$Theory_Words_Counters$pronoun = F2(
	function (mainObject, weight) {
		var _p0 = weight;
		if (_p0.ctor === 'SameAsMain') {
			return {
				ctor: '::',
				_0: _merivale$victor$Theory_Words_Pronouns$direct3(mainObject),
				_1: {ctor: '[]'}
			};
		} else {
			return {
				ctor: '::',
				_0: _merivale$victor$Theory_Words_Pronouns$direct2(_p0._0),
				_1: {ctor: '[]'}
			};
		}
	});
var _merivale$victor$Theory_Words_Counters$prefix = function (relator) {
	var _p1 = relator;
	if (_p1.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		return {
			ctor: '::',
			_0: _merivale$victor$Theory_Words_Prepositions$preposition(_p1._0),
			_1: {ctor: '[]'}
		};
	}
};
var _merivale$victor$Theory_Words_Counters$counter = F2(
	function (object, _p2) {
		var _p3 = _p2;
		return A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_merivale$victor$Theory_Words_Counters$prefix(_p3._0),
				A2(_merivale$victor$Theory_Words_Counters$pronoun, object, _p3._1)));
	});

var _merivale$victor$Theory_Words_Verbs$verbs = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'abide',
			_1: {f1: 'abides', f2: 'abode', p1: 'abiding', p2: 'abode'}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'admit',
				_1: {f1: 'admits', f2: 'admitted', p1: 'admitting', p2: 'admitted'}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'arise',
					_1: {f1: 'arises', f2: 'arose', p1: 'arising', p2: 'arisen'}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'awake',
						_1: {f1: 'awakes', f2: 'awoke', p1: 'awaking', p2: 'awoken'}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'ban',
							_1: {f1: 'bans', f2: 'banned', p1: 'banning', p2: 'banned'}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'bat',
								_1: {f1: 'bats', f2: 'batted', p1: 'batting', p2: 'batted'}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'be',
									_1: {f1: 'is', f2: 'was', p1: 'being', p2: 'been'}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'bear',
										_1: {f1: 'bears', f2: 'bore', p1: 'bearing', p2: 'borne'}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'beat',
											_1: {f1: 'beats', f2: 'beat', p1: 'beating', p2: 'beaten'}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'become',
												_1: {f1: 'becomes', f2: 'became', p1: 'becoming', p2: 'become'}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'befall',
													_1: {f1: 'befalls', f2: 'befell', p1: 'befalling', p2: 'befallen'}
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'beg',
														_1: {f1: 'begs', f2: 'begged', p1: 'begging', p2: 'begged'}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'begin',
															_1: {f1: 'begins', f2: 'began', p1: 'beginning', p2: 'begun'}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: 'behold',
																_1: {f1: 'beholds', f2: 'beheld', p1: 'beholding', p2: 'beheld'}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: 'bend',
																	_1: {f1: 'bends', f2: 'bent', p1: 'bending', p2: 'bent'}
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: 'bereave',
																		_1: {f1: 'bereaves', f2: 'bereft', p1: 'bereaving', p2: 'bereft'}
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: 'beseech',
																			_1: {f1: 'beseeches', f2: 'besought', p1: 'beseeching', p2: 'besought'}
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: 'bet',
																				_1: {f1: 'bets', f2: 'bet', p1: 'betting', p2: 'bet'}
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: 'bid',
																					_1: {f1: 'bids', f2: 'bid', p1: 'bidding', p2: 'bid'}
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: 'bind',
																						_1: {f1: 'binds', f2: 'bound', p1: 'binding', p2: 'bound'}
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: 'bite',
																							_1: {f1: 'bites', f2: 'bit', p1: 'biting', p2: 'bitten'}
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: 'bleed',
																								_1: {f1: 'bleeds', f2: 'bled', p1: 'bleeding', p2: 'bled'}
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: 'blot',
																									_1: {f1: 'blots', f2: 'blotted', p1: 'blotting', p2: 'blotted'}
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: 'blow',
																										_1: {f1: 'blows', f2: 'blew', p1: 'blowing', p2: 'blown'}
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: 'blur',
																											_1: {f1: 'blurs', f2: 'blurred', p1: 'blurring', p2: 'blurred'}
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: 'break',
																												_1: {f1: 'breaks', f2: 'broke', p1: 'breaking', p2: 'broken'}
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: 'breed',
																													_1: {f1: 'breeds', f2: 'bred', p1: 'breeding', p2: 'bred'}
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: 'bring',
																														_1: {f1: 'brings', f2: 'brought', p1: 'bringing', p2: 'brought'}
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: 'broadcast',
																															_1: {f1: 'broadcasts', f2: 'broadcast', p1: 'broadcasting', p2: 'broadcast'}
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																ctor: '_Tuple2',
																																_0: 'build',
																																_1: {f1: 'builds', f2: 'built', p1: 'building', p2: 'built'}
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	ctor: '_Tuple2',
																																	_0: 'burn',
																																	_1: {f1: 'burns', f2: 'burnt', p1: 'burning', p2: 'burnt'}
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		ctor: '_Tuple2',
																																		_0: 'burst',
																																		_1: {f1: 'bursts', f2: 'burst', p1: 'bursting', p2: 'burst'}
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			ctor: '_Tuple2',
																																			_0: 'bust',
																																			_1: {f1: 'busts', f2: 'bust', p1: 'busting', p2: 'bust'}
																																		},
																																		_1: {
																																			ctor: '::',
																																			_0: {
																																				ctor: '_Tuple2',
																																				_0: 'buy',
																																				_1: {f1: 'buys', f2: 'bought', p1: 'buying', p2: 'bought'}
																																			},
																																			_1: {
																																				ctor: '::',
																																				_0: {
																																					ctor: '_Tuple2',
																																					_0: 'cast',
																																					_1: {f1: 'casts', f2: 'cast', p1: 'casting', p2: 'cast'}
																																				},
																																				_1: {
																																					ctor: '::',
																																					_0: {
																																						ctor: '_Tuple2',
																																						_0: 'catch',
																																						_1: {f1: 'catches', f2: 'caught', p1: 'catching', p2: 'caught'}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: {
																																							ctor: '_Tuple2',
																																							_0: 'chat',
																																							_1: {f1: 'chats', f2: 'chatted', p1: 'chatting', p2: 'chatted'}
																																						},
																																						_1: {
																																							ctor: '::',
																																							_0: {
																																								ctor: '_Tuple2',
																																								_0: 'chide',
																																								_1: {f1: 'chides', f2: 'chid', p1: 'chiding', p2: 'chidden'}
																																							},
																																							_1: {
																																								ctor: '::',
																																								_0: {
																																									ctor: '_Tuple2',
																																									_0: 'chip',
																																									_1: {f1: 'chips', f2: 'chipped', p1: 'chipping', p2: 'chipped'}
																																								},
																																								_1: {
																																									ctor: '::',
																																									_0: {
																																										ctor: '_Tuple2',
																																										_0: 'choose',
																																										_1: {f1: 'chooses', f2: 'chose', p1: 'choosing', p2: 'chosen'}
																																									},
																																									_1: {
																																										ctor: '::',
																																										_0: {
																																											ctor: '_Tuple2',
																																											_0: 'chop',
																																											_1: {f1: 'chops', f2: 'chopped', p1: 'chopping', p2: 'chopped'}
																																										},
																																										_1: {
																																											ctor: '::',
																																											_0: {
																																												ctor: '_Tuple2',
																																												_0: 'clap',
																																												_1: {f1: 'claps', f2: 'clapped', p1: 'clapping', p2: 'clapped'}
																																											},
																																											_1: {
																																												ctor: '::',
																																												_0: {
																																													ctor: '_Tuple2',
																																													_0: 'cleave',
																																													_1: {f1: 'cleaves', f2: 'clove', p1: 'cleaving', p2: 'cloven'}
																																												},
																																												_1: {
																																													ctor: '::',
																																													_0: {
																																														ctor: '_Tuple2',
																																														_0: 'cling',
																																														_1: {f1: 'clings', f2: 'clung', p1: 'clinging', p2: 'clung'}
																																													},
																																													_1: {
																																														ctor: '::',
																																														_0: {
																																															ctor: '_Tuple2',
																																															_0: 'clip',
																																															_1: {f1: 'clips', f2: 'clipped', p1: 'clipping', p2: 'clipped'}
																																														},
																																														_1: {
																																															ctor: '::',
																																															_0: {
																																																ctor: '_Tuple2',
																																																_0: 'come',
																																																_1: {f1: 'comes', f2: 'came', p1: 'coming', p2: 'come'}
																																															},
																																															_1: {
																																																ctor: '::',
																																																_0: {
																																																	ctor: '_Tuple2',
																																																	_0: 'compel',
																																																	_1: {f1: 'compels', f2: 'compelled', p1: 'compelling', p2: 'compelled'}
																																																},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {
																																																		ctor: '_Tuple2',
																																																		_0: 'control',
																																																		_1: {f1: 'controls', f2: 'controlled', p1: 'controlling', p2: 'controlled'}
																																																	},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {
																																																			ctor: '_Tuple2',
																																																			_0: 'cost',
																																																			_1: {f1: 'costs', f2: 'cost', p1: 'costing', p2: 'cost'}
																																																		},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {
																																																				ctor: '_Tuple2',
																																																				_0: 'counsel',
																																																				_1: {f1: 'counsels', f2: 'counselled', p1: 'counselling', p2: 'counselled'}
																																																			},
																																																			_1: {
																																																				ctor: '::',
																																																				_0: {
																																																					ctor: '_Tuple2',
																																																					_0: 'creep',
																																																					_1: {f1: 'creeps', f2: 'crept', p1: 'creeping', p2: 'crept'}
																																																				},
																																																				_1: {
																																																					ctor: '::',
																																																					_0: {
																																																						ctor: '_Tuple2',
																																																						_0: 'crib',
																																																						_1: {f1: 'cribs', f2: 'cribbed', p1: 'cribbing', p2: 'cribbed'}
																																																					},
																																																					_1: {
																																																						ctor: '::',
																																																						_0: {
																																																							ctor: '_Tuple2',
																																																							_0: 'cut',
																																																							_1: {f1: 'cuts', f2: 'cut', p1: 'cutting', p2: 'cut'}
																																																						},
																																																						_1: {
																																																							ctor: '::',
																																																							_0: {
																																																								ctor: '_Tuple2',
																																																								_0: 'dam',
																																																								_1: {f1: 'dams', f2: 'dammed', p1: 'damming', p2: 'dammed'}
																																																							},
																																																							_1: {
																																																								ctor: '::',
																																																								_0: {
																																																									ctor: '_Tuple2',
																																																									_0: 'deal',
																																																									_1: {f1: 'deals', f2: 'dealt', p1: 'dealing', p2: 'dealt'}
																																																								},
																																																								_1: {
																																																									ctor: '::',
																																																									_0: {
																																																										ctor: '_Tuple2',
																																																										_0: 'dig',
																																																										_1: {f1: 'digs', f2: 'dug', p1: 'digging', p2: 'dug'}
																																																									},
																																																									_1: {
																																																										ctor: '::',
																																																										_0: {
																																																											ctor: '_Tuple2',
																																																											_0: 'dim',
																																																											_1: {f1: 'dims', f2: 'dimmed', p1: 'dimming', p2: 'dimmed'}
																																																										},
																																																										_1: {
																																																											ctor: '::',
																																																											_0: {
																																																												ctor: '_Tuple2',
																																																												_0: 'dip',
																																																												_1: {f1: 'dips', f2: 'dipped', p1: 'dipping', p2: 'dipped'}
																																																											},
																																																											_1: {
																																																												ctor: '::',
																																																												_0: {
																																																													ctor: '_Tuple2',
																																																													_0: 'do',
																																																													_1: {f1: 'does', f2: 'did', p1: 'doing', p2: 'done'}
																																																												},
																																																												_1: {
																																																													ctor: '::',
																																																													_0: {
																																																														ctor: '_Tuple2',
																																																														_0: 'drag',
																																																														_1: {f1: 'drags', f2: 'dragged', p1: 'dragging', p2: 'dragged'}
																																																													},
																																																													_1: {
																																																														ctor: '::',
																																																														_0: {
																																																															ctor: '_Tuple2',
																																																															_0: 'draw',
																																																															_1: {f1: 'draws', f2: 'drew', p1: 'drawing', p2: 'drawn'}
																																																														},
																																																														_1: {
																																																															ctor: '::',
																																																															_0: {
																																																																ctor: '_Tuple2',
																																																																_0: 'dream',
																																																																_1: {f1: 'dreams', f2: 'dreamt', p1: 'dreaming', p2: 'dreamt'}
																																																															},
																																																															_1: {
																																																																ctor: '::',
																																																																_0: {
																																																																	ctor: '_Tuple2',
																																																																	_0: 'drink',
																																																																	_1: {f1: 'drinks', f2: 'drank', p1: 'drinking', p2: 'drunk'}
																																																																},
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: {
																																																																		ctor: '_Tuple2',
																																																																		_0: 'drip',
																																																																		_1: {f1: 'drips', f2: 'dripped', p1: 'dripping', p2: 'dripped'}
																																																																	},
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: {
																																																																			ctor: '_Tuple2',
																																																																			_0: 'drive',
																																																																			_1: {f1: 'drives', f2: 'drove', p1: 'driving', p2: 'driven'}
																																																																		},
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: {
																																																																				ctor: '_Tuple2',
																																																																				_0: 'drop',
																																																																				_1: {f1: 'drops', f2: 'dropped', p1: 'dropping', p2: 'dropped'}
																																																																			},
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: {
																																																																					ctor: '_Tuple2',
																																																																					_0: 'drum',
																																																																					_1: {f1: 'drums', f2: 'drummed', p1: 'drumming', p2: 'drummed'}
																																																																				},
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: {
																																																																						ctor: '_Tuple2',
																																																																						_0: 'dwell',
																																																																						_1: {f1: 'dwells', f2: 'dwelt', p1: 'dwelling', p2: 'dwelt'}
																																																																					},
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: {
																																																																							ctor: '_Tuple2',
																																																																							_0: 'dye',
																																																																							_1: {f1: 'dyes', f2: 'dyed', p1: 'dyeing', p2: 'dyed'}
																																																																						},
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: {
																																																																								ctor: '_Tuple2',
																																																																								_0: 'eat',
																																																																								_1: {f1: 'eats', f2: 'ate', p1: 'eating', p2: 'eaten'}
																																																																							},
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: {
																																																																									ctor: '_Tuple2',
																																																																									_0: 'fall',
																																																																									_1: {f1: 'falls', f2: 'fell', p1: 'falling', p2: 'fallen'}
																																																																								},
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: {
																																																																										ctor: '_Tuple2',
																																																																										_0: 'fan',
																																																																										_1: {f1: 'fans', f2: 'fanned', p1: 'fanning', p2: 'fanned'}
																																																																									},
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: {
																																																																											ctor: '_Tuple2',
																																																																											_0: 'feed',
																																																																											_1: {f1: 'feeds', f2: 'fed', p1: 'feeding', p2: 'fed'}
																																																																										},
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: {
																																																																												ctor: '_Tuple2',
																																																																												_0: 'feel',
																																																																												_1: {f1: 'feels', f2: 'felt', p1: 'feeling', p2: 'felt'}
																																																																											},
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: {
																																																																													ctor: '_Tuple2',
																																																																													_0: 'fight',
																																																																													_1: {f1: 'fights', f2: 'fought', p1: 'fighting', p2: 'fought'}
																																																																												},
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: {
																																																																														ctor: '_Tuple2',
																																																																														_0: 'find',
																																																																														_1: {f1: 'finds', f2: 'found', p1: 'finding', p2: 'found'}
																																																																													},
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: {
																																																																															ctor: '_Tuple2',
																																																																															_0: 'fit',
																																																																															_1: {f1: 'fits', f2: 'fitted', p1: 'fitting', p2: 'fitted'}
																																																																														},
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: {
																																																																																ctor: '_Tuple2',
																																																																																_0: 'flap',
																																																																																_1: {f1: 'flaps', f2: 'flapped', p1: 'flapping', p2: 'flapped'}
																																																																															},
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: {
																																																																																	ctor: '_Tuple2',
																																																																																	_0: 'flee',
																																																																																	_1: {f1: 'flees', f2: 'fled', p1: 'fleeing', p2: 'fled'}
																																																																																},
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: {
																																																																																		ctor: '_Tuple2',
																																																																																		_0: 'fling',
																																																																																		_1: {f1: 'flings', f2: 'flung', p1: 'flinging', p2: 'flung'}
																																																																																	},
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: {
																																																																																			ctor: '_Tuple2',
																																																																																			_0: 'flop',
																																																																																			_1: {f1: 'flops', f2: 'flopped', p1: 'flopping', p2: 'flopped'}
																																																																																		},
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: {
																																																																																				ctor: '_Tuple2',
																																																																																				_0: 'fly',
																																																																																				_1: {f1: 'flies', f2: 'flew', p1: 'flying', p2: 'flown'}
																																																																																			},
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: {
																																																																																					ctor: '_Tuple2',
																																																																																					_0: 'forbid',
																																																																																					_1: {f1: 'forbids', f2: 'forbade', p1: 'forbidding', p2: 'forbidden'}
																																																																																				},
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: {
																																																																																						ctor: '_Tuple2',
																																																																																						_0: 'forecast',
																																																																																						_1: {f1: 'forecasts', f2: 'forecast', p1: 'forecasting', p2: 'forecast'}
																																																																																					},
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: {
																																																																																							ctor: '_Tuple2',
																																																																																							_0: 'foretell',
																																																																																							_1: {f1: 'foretells', f2: 'foretold', p1: 'foretelling', p2: 'foretold'}
																																																																																						},
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: {
																																																																																								ctor: '_Tuple2',
																																																																																								_0: 'forget',
																																																																																								_1: {f1: 'forgets', f2: 'forgot', p1: 'forgetting', p2: 'forgotten'}
																																																																																							},
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: {
																																																																																									ctor: '_Tuple2',
																																																																																									_0: 'forgive',
																																																																																									_1: {f1: 'forgives', f2: 'forgave', p1: 'forgiving', p2: 'forgiven'}
																																																																																								},
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: {
																																																																																										ctor: '_Tuple2',
																																																																																										_0: 'forsake',
																																																																																										_1: {f1: 'forsakes', f2: 'forsook', p1: 'forsaking', p2: 'forsaken'}
																																																																																									},
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: {
																																																																																											ctor: '_Tuple2',
																																																																																											_0: 'freeze',
																																																																																											_1: {f1: 'freezes', f2: 'froze', p1: 'freezing', p2: 'frozen'}
																																																																																										},
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: {
																																																																																												ctor: '_Tuple2',
																																																																																												_0: 'fulfil',
																																																																																												_1: {f1: 'fulfils', f2: 'fulfilled', p1: 'fulfilling', p2: 'fulfilled'}
																																																																																											},
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: {
																																																																																													ctor: '_Tuple2',
																																																																																													_0: 'gag',
																																																																																													_1: {f1: 'gags', f2: 'gagged', p1: 'gagging', p2: 'gagged'}
																																																																																												},
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: {
																																																																																														ctor: '_Tuple2',
																																																																																														_0: 'gainsay',
																																																																																														_1: {f1: 'gainsays', f2: 'gainsaid', p1: 'gainsaying', p2: 'gainsaid'}
																																																																																													},
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: {
																																																																																															ctor: '_Tuple2',
																																																																																															_0: 'get',
																																																																																															_1: {f1: 'gets', f2: 'got', p1: 'getting', p2: 'got'}
																																																																																														},
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: {
																																																																																																ctor: '_Tuple2',
																																																																																																_0: 'give',
																																																																																																_1: {f1: 'gives', f2: 'gave', p1: 'giving', p2: 'given'}
																																																																																															},
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: {
																																																																																																	ctor: '_Tuple2',
																																																																																																	_0: 'go',
																																																																																																	_1: {f1: 'goes', f2: 'went', p1: 'going', p2: 'gone'}
																																																																																																},
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: {
																																																																																																		ctor: '_Tuple2',
																																																																																																		_0: 'grab',
																																																																																																		_1: {f1: 'grabs', f2: 'grabbed', p1: 'grabbing', p2: 'grabbed'}
																																																																																																	},
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: {
																																																																																																			ctor: '_Tuple2',
																																																																																																			_0: 'grin',
																																																																																																			_1: {f1: 'grins', f2: 'grinned', p1: 'grinning', p2: 'grinned'}
																																																																																																		},
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: {
																																																																																																				ctor: '_Tuple2',
																																																																																																				_0: 'grind',
																																																																																																				_1: {f1: 'grinds', f2: 'ground', p1: 'grinding', p2: 'ground'}
																																																																																																			},
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: {
																																																																																																					ctor: '_Tuple2',
																																																																																																					_0: 'grip',
																																																																																																					_1: {f1: 'grips', f2: 'gripped', p1: 'gripping', p2: 'gripped'}
																																																																																																				},
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: {
																																																																																																						ctor: '_Tuple2',
																																																																																																						_0: 'grow',
																																																																																																						_1: {f1: 'grows', f2: 'grew', p1: 'growing', p2: 'grown'}
																																																																																																					},
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: {
																																																																																																							ctor: '_Tuple2',
																																																																																																							_0: 'hang*',
																																																																																																							_1: {f1: 'hangs', f2: 'hung', p1: 'hanging', p2: 'hung'}
																																																																																																						},
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: {
																																																																																																								ctor: '_Tuple2',
																																																																																																								_0: 'have',
																																																																																																								_1: {f1: 'has', f2: 'had', p1: 'having', p2: 'had'}
																																																																																																							},
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: {
																																																																																																									ctor: '_Tuple2',
																																																																																																									_0: 'hear',
																																																																																																									_1: {f1: 'hears', f2: 'heard', p1: 'hearing', p2: 'heard'}
																																																																																																								},
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: {
																																																																																																										ctor: '_Tuple2',
																																																																																																										_0: 'hew',
																																																																																																										_1: {f1: 'hews', f2: 'hewed', p1: 'hewing', p2: 'hewn'}
																																																																																																									},
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: {
																																																																																																											ctor: '_Tuple2',
																																																																																																											_0: 'hide',
																																																																																																											_1: {f1: 'hides', f2: 'hid', p1: 'hiding', p2: 'hidden'}
																																																																																																										},
																																																																																																										_1: {
																																																																																																											ctor: '::',
																																																																																																											_0: {
																																																																																																												ctor: '_Tuple2',
																																																																																																												_0: 'hit',
																																																																																																												_1: {f1: 'hits', f2: 'hit', p1: 'hitting', p2: 'hit'}
																																																																																																											},
																																																																																																											_1: {
																																																																																																												ctor: '::',
																																																																																																												_0: {
																																																																																																													ctor: '_Tuple2',
																																																																																																													_0: 'hold',
																																																																																																													_1: {f1: 'holds', f2: 'held', p1: 'holding', p2: 'held'}
																																																																																																												},
																																																																																																												_1: {
																																																																																																													ctor: '::',
																																																																																																													_0: {
																																																																																																														ctor: '_Tuple2',
																																																																																																														_0: 'hop',
																																																																																																														_1: {f1: 'hops', f2: 'hopped', p1: 'hopping', p2: 'hopped'}
																																																																																																													},
																																																																																																													_1: {
																																																																																																														ctor: '::',
																																																																																																														_0: {
																																																																																																															ctor: '_Tuple2',
																																																																																																															_0: 'hug',
																																																																																																															_1: {f1: 'hugs', f2: 'hugged', p1: 'hugging', p2: 'hugged'}
																																																																																																														},
																																																																																																														_1: {
																																																																																																															ctor: '::',
																																																																																																															_0: {
																																																																																																																ctor: '_Tuple2',
																																																																																																																_0: 'hum',
																																																																																																																_1: {f1: 'hums', f2: 'hummed', p1: 'humming', p2: 'hummed'}
																																																																																																															},
																																																																																																															_1: {
																																																																																																																ctor: '::',
																																																																																																																_0: {
																																																																																																																	ctor: '_Tuple2',
																																																																																																																	_0: 'hurt',
																																																																																																																	_1: {f1: 'hurts', f2: 'hurt', p1: 'hurting', p2: 'hurt'}
																																																																																																																},
																																																																																																																_1: {
																																																																																																																	ctor: '::',
																																																																																																																	_0: {
																																																																																																																		ctor: '_Tuple2',
																																																																																																																		_0: 'impel',
																																																																																																																		_1: {f1: 'impels', f2: 'impelled', p1: 'impelling', p2: 'impelled'}
																																																																																																																	},
																																																																																																																	_1: {
																																																																																																																		ctor: '::',
																																																																																																																		_0: {
																																																																																																																			ctor: '_Tuple2',
																																																																																																																			_0: 'imperil',
																																																																																																																			_1: {f1: 'imperils', f2: 'imperilled', p1: 'imperilling', p2: 'imperilled'}
																																																																																																																		},
																																																																																																																		_1: {
																																																																																																																			ctor: '::',
																																																																																																																			_0: {
																																																																																																																				ctor: '_Tuple2',
																																																																																																																				_0: 'inlay',
																																																																																																																				_1: {f1: 'inlays', f2: 'inlaid', p1: 'inlaying', p2: 'inlaid'}
																																																																																																																			},
																																																																																																																			_1: {
																																																																																																																				ctor: '::',
																																																																																																																				_0: {
																																																																																																																					ctor: '_Tuple2',
																																																																																																																					_0: 'input',
																																																																																																																					_1: {f1: 'inputs', f2: 'input', p1: 'inputting', p2: 'input'}
																																																																																																																				},
																																																																																																																				_1: {
																																																																																																																					ctor: '::',
																																																																																																																					_0: {
																																																																																																																						ctor: '_Tuple2',
																																																																																																																						_0: 'jam',
																																																																																																																						_1: {f1: 'jams', f2: 'jammed', p1: 'jamming', p2: 'jammed'}
																																																																																																																					},
																																																																																																																					_1: {
																																																																																																																						ctor: '::',
																																																																																																																						_0: {
																																																																																																																							ctor: '_Tuple2',
																																																																																																																							_0: 'jog',
																																																																																																																							_1: {f1: 'jogs', f2: 'jogged', p1: 'jogging', p2: 'jogged'}
																																																																																																																						},
																																																																																																																						_1: {
																																																																																																																							ctor: '::',
																																																																																																																							_0: {
																																																																																																																								ctor: '_Tuple2',
																																																																																																																								_0: 'keep',
																																																																																																																								_1: {f1: 'keeps', f2: 'kept', p1: 'keeping', p2: 'kept'}
																																																																																																																							},
																																																																																																																							_1: {
																																																																																																																								ctor: '::',
																																																																																																																								_0: {
																																																																																																																									ctor: '_Tuple2',
																																																																																																																									_0: 'kid',
																																																																																																																									_1: {f1: 'kids', f2: 'kidded', p1: 'kidding', p2: 'kidded'}
																																																																																																																								},
																																																																																																																								_1: {
																																																																																																																									ctor: '::',
																																																																																																																									_0: {
																																																																																																																										ctor: '_Tuple2',
																																																																																																																										_0: 'kneel',
																																																																																																																										_1: {f1: 'kneels', f2: 'knelt', p1: 'kneeling', p2: 'knelt'}
																																																																																																																									},
																																																																																																																									_1: {
																																																																																																																										ctor: '::',
																																																																																																																										_0: {
																																																																																																																											ctor: '_Tuple2',
																																																																																																																											_0: 'knit',
																																																																																																																											_1: {f1: 'knits', f2: 'knitted', p1: 'knitting', p2: 'knitted'}
																																																																																																																										},
																																																																																																																										_1: {
																																																																																																																											ctor: '::',
																																																																																																																											_0: {
																																																																																																																												ctor: '_Tuple2',
																																																																																																																												_0: 'knot',
																																																																																																																												_1: {f1: 'knots', f2: 'knotted', p1: 'knotting', p2: 'knotted'}
																																																																																																																											},
																																																																																																																											_1: {
																																																																																																																												ctor: '::',
																																																																																																																												_0: {
																																																																																																																													ctor: '_Tuple2',
																																																																																																																													_0: 'know',
																																																																																																																													_1: {f1: 'knows', f2: 'knew', p1: 'knowing', p2: 'known'}
																																																																																																																												},
																																																																																																																												_1: {
																																																																																																																													ctor: '::',
																																																																																																																													_0: {
																																																																																																																														ctor: '_Tuple2',
																																																																																																																														_0: 'label',
																																																																																																																														_1: {f1: 'labels', f2: 'labelled', p1: 'labelling', p2: 'labelled'}
																																																																																																																													},
																																																																																																																													_1: {
																																																																																																																														ctor: '::',
																																																																																																																														_0: {
																																																																																																																															ctor: '_Tuple2',
																																																																																																																															_0: 'lay',
																																																																																																																															_1: {f1: 'lays', f2: 'laid', p1: 'laying', p2: 'laid'}
																																																																																																																														},
																																																																																																																														_1: {
																																																																																																																															ctor: '::',
																																																																																																																															_0: {
																																																																																																																																ctor: '_Tuple2',
																																																																																																																																_0: 'lead',
																																																																																																																																_1: {f1: 'leads', f2: 'led', p1: 'leading', p2: 'led'}
																																																																																																																															},
																																																																																																																															_1: {
																																																																																																																																ctor: '::',
																																																																																																																																_0: {
																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																	_0: 'lean',
																																																																																																																																	_1: {f1: 'leans', f2: 'leant', p1: 'leaning', p2: 'leant'}
																																																																																																																																},
																																																																																																																																_1: {
																																																																																																																																	ctor: '::',
																																																																																																																																	_0: {
																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																		_0: 'leap',
																																																																																																																																		_1: {f1: 'leaps', f2: 'leapt', p1: 'leaping', p2: 'leapt'}
																																																																																																																																	},
																																																																																																																																	_1: {
																																																																																																																																		ctor: '::',
																																																																																																																																		_0: {
																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																			_0: 'learn',
																																																																																																																																			_1: {f1: 'learns', f2: 'learnt', p1: 'learning', p2: 'learnt'}
																																																																																																																																		},
																																																																																																																																		_1: {
																																																																																																																																			ctor: '::',
																																																																																																																																			_0: {
																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																				_0: 'leave',
																																																																																																																																				_1: {f1: 'leaves', f2: 'left', p1: 'leaving', p2: 'left'}
																																																																																																																																			},
																																																																																																																																			_1: {
																																																																																																																																				ctor: '::',
																																																																																																																																				_0: {
																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																					_0: 'lend',
																																																																																																																																					_1: {f1: 'lends', f2: 'lent', p1: 'lending', p2: 'lent'}
																																																																																																																																				},
																																																																																																																																				_1: {
																																																																																																																																					ctor: '::',
																																																																																																																																					_0: {
																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																						_0: 'let',
																																																																																																																																						_1: {f1: 'lets', f2: 'let', p1: 'letting', p2: 'let'}
																																																																																																																																					},
																																																																																																																																					_1: {
																																																																																																																																						ctor: '::',
																																																																																																																																						_0: {
																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																							_0: 'level',
																																																																																																																																							_1: {f1: 'levels', f2: 'levelled', p1: 'levelling', p2: 'levelled'}
																																																																																																																																						},
																																																																																																																																						_1: {
																																																																																																																																							ctor: '::',
																																																																																																																																							_0: {
																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																								_0: 'lie*',
																																																																																																																																								_1: {f1: 'lies', f2: 'lay', p1: 'lying', p2: 'lain'}
																																																																																																																																							},
																																																																																																																																							_1: {
																																																																																																																																								ctor: '::',
																																																																																																																																								_0: {
																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																									_0: 'light',
																																																																																																																																									_1: {f1: 'lights', f2: 'lit', p1: 'lighting', p2: 'lit'}
																																																																																																																																								},
																																																																																																																																								_1: {
																																																																																																																																									ctor: '::',
																																																																																																																																									_0: {
																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																										_0: 'lose',
																																																																																																																																										_1: {f1: 'loses', f2: 'lost', p1: 'losing', p2: 'lost'}
																																																																																																																																									},
																																																																																																																																									_1: {
																																																																																																																																										ctor: '::',
																																																																																																																																										_0: {
																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																											_0: 'make',
																																																																																																																																											_1: {f1: 'makes', f2: 'made', p1: 'making', p2: 'made'}
																																																																																																																																										},
																																																																																																																																										_1: {
																																																																																																																																											ctor: '::',
																																																																																																																																											_0: {
																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																												_0: 'man',
																																																																																																																																												_1: {f1: 'mans', f2: 'manned', p1: 'manning', p2: 'manned'}
																																																																																																																																											},
																																																																																																																																											_1: {
																																																																																																																																												ctor: '::',
																																																																																																																																												_0: {
																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																													_0: 'mean',
																																																																																																																																													_1: {f1: 'means', f2: 'meant', p1: 'meaning', p2: 'meant'}
																																																																																																																																												},
																																																																																																																																												_1: {
																																																																																																																																													ctor: '::',
																																																																																																																																													_0: {
																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																														_0: 'meet',
																																																																																																																																														_1: {f1: 'meets', f2: 'met', p1: 'meeting', p2: 'met'}
																																																																																																																																													},
																																																																																																																																													_1: {
																																																																																																																																														ctor: '::',
																																																																																																																																														_0: {
																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																															_0: 'mislead',
																																																																																																																																															_1: {f1: 'misleads', f2: 'misled', p1: 'misleading', p2: 'misled'}
																																																																																																																																														},
																																																																																																																																														_1: {
																																																																																																																																															ctor: '::',
																																																																																																																																															_0: {
																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																_0: 'mistake',
																																																																																																																																																_1: {f1: 'mistakes', f2: 'mistook', p1: 'mistaking', p2: 'mistaken'}
																																																																																																																																															},
																																																																																																																																															_1: {
																																																																																																																																																ctor: '::',
																																																																																																																																																_0: {
																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																	_0: 'mow',
																																																																																																																																																	_1: {f1: 'mows', f2: 'mowed', p1: 'mowing', p2: 'mown'}
																																																																																																																																																},
																																																																																																																																																_1: {
																																																																																																																																																	ctor: '::',
																																																																																																																																																	_0: {
																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																		_0: 'mug',
																																																																																																																																																		_1: {f1: 'mugs', f2: 'mugged', p1: 'mugging', p2: 'mugged'}
																																																																																																																																																	},
																																																																																																																																																	_1: {
																																																																																																																																																		ctor: '::',
																																																																																																																																																		_0: {
																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																			_0: 'nap',
																																																																																																																																																			_1: {f1: 'naps', f2: 'napped', p1: 'napping', p2: 'napped'}
																																																																																																																																																		},
																																																																																																																																																		_1: {
																																																																																																																																																			ctor: '::',
																																																																																																																																																			_0: {
																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																				_0: 'nip',
																																																																																																																																																				_1: {f1: 'nips', f2: 'nipped', p1: 'nipping', p2: 'nipped'}
																																																																																																																																																			},
																																																																																																																																																			_1: {
																																																																																																																																																				ctor: '::',
																																																																																																																																																				_0: {
																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																					_0: 'nod',
																																																																																																																																																					_1: {f1: 'nods', f2: 'nodded', p1: 'nodding', p2: 'nodded'}
																																																																																																																																																				},
																																																																																																																																																				_1: {
																																																																																																																																																					ctor: '::',
																																																																																																																																																					_0: {
																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																						_0: 'occur',
																																																																																																																																																						_1: {f1: 'occurs', f2: 'occurred', p1: 'occurring', p2: 'occurred'}
																																																																																																																																																					},
																																																																																																																																																					_1: {
																																																																																																																																																						ctor: '::',
																																																																																																																																																						_0: {
																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																							_0: 'offset',
																																																																																																																																																							_1: {f1: 'offsets', f2: 'offset', p1: 'offsetting', p2: 'offset'}
																																																																																																																																																						},
																																																																																																																																																						_1: {
																																																																																																																																																							ctor: '::',
																																																																																																																																																							_0: {
																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																								_0: 'omit',
																																																																																																																																																								_1: {f1: 'omits', f2: 'omitted', p1: 'omitting', p2: 'omitted'}
																																																																																																																																																							},
																																																																																																																																																							_1: {
																																																																																																																																																								ctor: '::',
																																																																																																																																																								_0: {
																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																									_0: 'output',
																																																																																																																																																									_1: {f1: 'outputs', f2: 'output', p1: 'outputting', p2: 'output'}
																																																																																																																																																								},
																																																																																																																																																								_1: {
																																																																																																																																																									ctor: '::',
																																																																																																																																																									_0: {
																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																										_0: 'overtake',
																																																																																																																																																										_1: {f1: 'overtakes', f2: 'overtook', p1: 'overtaking', p2: 'overtaken'}
																																																																																																																																																									},
																																																																																																																																																									_1: {
																																																																																																																																																										ctor: '::',
																																																																																																																																																										_0: {
																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																											_0: 'partake',
																																																																																																																																																											_1: {f1: 'partakes', f2: 'partook', p1: 'partaking', p2: 'partaken'}
																																																																																																																																																										},
																																																																																																																																																										_1: {
																																																																																																																																																											ctor: '::',
																																																																																																																																																											_0: {
																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																												_0: 'pat',
																																																																																																																																																												_1: {f1: 'pats', f2: 'patted', p1: 'patting', p2: 'patted'}
																																																																																																																																																											},
																																																																																																																																																											_1: {
																																																																																																																																																												ctor: '::',
																																																																																																																																																												_0: {
																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																													_0: 'pay',
																																																																																																																																																													_1: {f1: 'pays', f2: 'paid', p1: 'paying', p2: 'paid'}
																																																																																																																																																												},
																																																																																																																																																												_1: {
																																																																																																																																																													ctor: '::',
																																																																																																																																																													_0: {
																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																														_0: 'pedal',
																																																																																																																																																														_1: {f1: 'pedals', f2: 'pedalled', p1: 'pedalling', p2: 'pedalled'}
																																																																																																																																																													},
																																																																																																																																																													_1: {
																																																																																																																																																														ctor: '::',
																																																																																																																																																														_0: {
																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																															_0: 'permit',
																																																																																																																																																															_1: {f1: 'permits', f2: 'permitted', p1: 'permitting', p2: 'permitted'}
																																																																																																																																																														},
																																																																																																																																																														_1: {
																																																																																																																																																															ctor: '::',
																																																																																																																																																															_0: {
																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																_0: 'picnic',
																																																																																																																																																																_1: {f1: 'picnics', f2: 'picnicked', p1: 'picnicking', p2: 'picnicked'}
																																																																																																																																																															},
																																																																																																																																																															_1: {
																																																																																																																																																																ctor: '::',
																																																																																																																																																																_0: {
																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																	_0: 'plan',
																																																																																																																																																																	_1: {f1: 'plans', f2: 'planned', p1: 'planning', p2: 'planned'}
																																																																																																																																																																},
																																																																																																																																																																_1: {
																																																																																																																																																																	ctor: '::',
																																																																																																																																																																	_0: {
																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																		_0: 'plead',
																																																																																																																																																																		_1: {f1: 'pleads', f2: 'pled', p1: 'pleading', p2: 'pled'}
																																																																																																																																																																	},
																																																																																																																																																																	_1: {
																																																																																																																																																																		ctor: '::',
																																																																																																																																																																		_0: {
																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																			_0: 'plod',
																																																																																																																																																																			_1: {f1: 'plods', f2: 'plodded', p1: 'plodding', p2: 'plodded'}
																																																																																																																																																																		},
																																																																																																																																																																		_1: {
																																																																																																																																																																			ctor: '::',
																																																																																																																																																																			_0: {
																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																				_0: 'plot',
																																																																																																																																																																				_1: {f1: 'plots', f2: 'plotted', p1: 'plotting', p2: 'plotted'}
																																																																																																																																																																			},
																																																																																																																																																																			_1: {
																																																																																																																																																																				ctor: '::',
																																																																																																																																																																				_0: {
																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																					_0: 'plug',
																																																																																																																																																																					_1: {f1: 'plugs', f2: 'plugged', p1: 'plugging', p2: 'plugged'}
																																																																																																																																																																				},
																																																																																																																																																																				_1: {
																																																																																																																																																																					ctor: '::',
																																																																																																																																																																					_0: {
																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																						_0: 'pop',
																																																																																																																																																																						_1: {f1: 'pops', f2: 'popped', p1: 'popping', p2: 'popped'}
																																																																																																																																																																					},
																																																																																																																																																																					_1: {
																																																																																																																																																																						ctor: '::',
																																																																																																																																																																						_0: {
																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																							_0: 'prefer',
																																																																																																																																																																							_1: {f1: 'prefers', f2: 'preferred', p1: 'preferring', p2: 'preferred'}
																																																																																																																																																																						},
																																																																																																																																																																						_1: {
																																																																																																																																																																							ctor: '::',
																																																																																																																																																																							_0: {
																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																								_0: 'preset',
																																																																																																																																																																								_1: {f1: 'presets', f2: 'preset', p1: 'presetting', p2: 'preset'}
																																																																																																																																																																							},
																																																																																																																																																																							_1: {
																																																																																																																																																																								ctor: '::',
																																																																																																																																																																								_0: {
																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																									_0: 'program',
																																																																																																																																																																									_1: {f1: 'programs', f2: 'programmed', p1: 'programming', p2: 'programmed'}
																																																																																																																																																																								},
																																																																																																																																																																								_1: {
																																																																																																																																																																									ctor: '::',
																																																																																																																																																																									_0: {
																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																										_0: 'put',
																																																																																																																																																																										_1: {f1: 'puts', f2: 'put', p1: 'putting', p2: 'put'}
																																																																																																																																																																									},
																																																																																																																																																																									_1: {
																																																																																																																																																																										ctor: '::',
																																																																																																																																																																										_0: {
																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																											_0: 'quarrel',
																																																																																																																																																																											_1: {f1: 'quarrels', f2: 'quarrelled', p1: 'quarrelling', p2: 'quarrelled'}
																																																																																																																																																																										},
																																																																																																																																																																										_1: {
																																																																																																																																																																											ctor: '::',
																																																																																																																																																																											_0: {
																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																												_0: 'quit',
																																																																																																																																																																												_1: {f1: 'quits', f2: 'quit', p1: 'quitting', p2: 'quit'}
																																																																																																																																																																											},
																																																																																																																																																																											_1: {
																																																																																																																																																																												ctor: '::',
																																																																																																																																																																												_0: {
																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																													_0: 'read',
																																																																																																																																																																													_1: {f1: 'reads', f2: 'read', p1: 'reading', p2: 'read'}
																																																																																																																																																																												},
																																																																																																																																																																												_1: {
																																																																																																																																																																													ctor: '::',
																																																																																																																																																																													_0: {
																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																														_0: 'rebuild',
																																																																																																																																																																														_1: {f1: 'rebuilds', f2: 'rebuilt', p1: 'rebuilding', p2: 'rebuilt'}
																																																																																																																																																																													},
																																																																																																																																																																													_1: {
																																																																																																																																																																														ctor: '::',
																																																																																																																																																																														_0: {
																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																															_0: 'recur',
																																																																																																																																																																															_1: {f1: 'recurs', f2: 'recurred', p1: 'recurring', p2: 'recurred'}
																																																																																																																																																																														},
																																																																																																																																																																														_1: {
																																																																																																																																																																															ctor: '::',
																																																																																																																																																																															_0: {
																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																_0: 'redo',
																																																																																																																																																																																_1: {f1: 'redoes', f2: 'redid', p1: 'redoing', p2: 'redone'}
																																																																																																																																																																															},
																																																																																																																																																																															_1: {
																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																_0: {
																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																	_0: 'refer',
																																																																																																																																																																																	_1: {f1: 'refers', f2: 'referred', p1: 'referring', p2: 'referred'}
																																																																																																																																																																																},
																																																																																																																																																																																_1: {
																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																	_0: {
																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																		_0: 'regret',
																																																																																																																																																																																		_1: {f1: 'regrets', f2: 'regretted', p1: 'regretting', p2: 'regretted'}
																																																																																																																																																																																	},
																																																																																																																																																																																	_1: {
																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																		_0: {
																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																			_0: 'remake',
																																																																																																																																																																																			_1: {f1: 'remakes', f2: 'remade', p1: 'remaking', p2: 'remade'}
																																																																																																																																																																																		},
																																																																																																																																																																																		_1: {
																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																			_0: {
																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																				_0: 'rend',
																																																																																																																																																																																				_1: {f1: 'rends', f2: 'rent', p1: 'rending', p2: 'rent'}
																																																																																																																																																																																			},
																																																																																																																																																																																			_1: {
																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																				_0: {
																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																					_0: 'resell',
																																																																																																																																																																																					_1: {f1: 'resells', f2: 'resold', p1: 'reselling', p2: 'resold'}
																																																																																																																																																																																				},
																																																																																																																																																																																				_1: {
																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																					_0: {
																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																						_0: 'reset',
																																																																																																																																																																																						_1: {f1: 'resets', f2: 'reset', p1: 'resetting', p2: 'reset'}
																																																																																																																																																																																					},
																																																																																																																																																																																					_1: {
																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																						_0: {
																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																							_0: 'rewind',
																																																																																																																																																																																							_1: {f1: 'rewinds', f2: 'rewound', p1: 'rewinding', p2: 'rewound'}
																																																																																																																																																																																						},
																																																																																																																																																																																						_1: {
																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																							_0: {
																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																								_0: 'rid',
																																																																																																																																																																																								_1: {f1: 'rids', f2: 'rid', p1: 'ridding', p2: 'rid'}
																																																																																																																																																																																							},
																																																																																																																																																																																							_1: {
																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																								_0: {
																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																									_0: 'ride',
																																																																																																																																																																																									_1: {f1: 'rides', f2: 'rode', p1: 'riding', p2: 'ridden'}
																																																																																																																																																																																								},
																																																																																																																																																																																								_1: {
																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																									_0: {
																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																										_0: 'ring',
																																																																																																																																																																																										_1: {f1: 'rings', f2: 'rang', p1: 'ringing', p2: 'rung'}
																																																																																																																																																																																									},
																																																																																																																																																																																									_1: {
																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																										_0: {
																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																											_0: 'rise',
																																																																																																																																																																																											_1: {f1: 'rises', f2: 'rose', p1: 'rising', p2: 'risen'}
																																																																																																																																																																																										},
																																																																																																																																																																																										_1: {
																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																											_0: {
																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																												_0: 'rob',
																																																																																																																																																																																												_1: {f1: 'robs', f2: 'robbed', p1: 'robbing', p2: 'robbed'}
																																																																																																																																																																																											},
																																																																																																																																																																																											_1: {
																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																												_0: {
																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																													_0: 'rot',
																																																																																																																																																																																													_1: {f1: 'rots', f2: 'rotted', p1: 'rotting', p2: 'rotted'}
																																																																																																																																																																																												},
																																																																																																																																																																																												_1: {
																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																													_0: {
																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																														_0: 'rub',
																																																																																																																																																																																														_1: {f1: 'rubs', f2: 'rubbed', p1: 'rubbing', p2: 'rubbed'}
																																																																																																																																																																																													},
																																																																																																																																																																																													_1: {
																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																														_0: {
																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																															_0: 'run',
																																																																																																																																																																																															_1: {f1: 'runs', f2: 'ran', p1: 'running', p2: 'run'}
																																																																																																																																																																																														},
																																																																																																																																																																																														_1: {
																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																															_0: {
																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																_0: 'sag',
																																																																																																																																																																																																_1: {f1: 'sags', f2: 'sagged', p1: 'sagging', p2: 'sagged'}
																																																																																																																																																																																															},
																																																																																																																																																																																															_1: {
																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																_0: {
																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																	_0: 'sap',
																																																																																																																																																																																																	_1: {f1: 'saps', f2: 'sapped', p1: 'sapping', p2: 'sapped'}
																																																																																																																																																																																																},
																																																																																																																																																																																																_1: {
																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																		_0: 'saw',
																																																																																																																																																																																																		_1: {f1: 'saws', f2: 'sawed', p1: 'sawing', p2: 'sawn'}
																																																																																																																																																																																																	},
																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																			_0: 'say',
																																																																																																																																																																																																			_1: {f1: 'says', f2: 'said', p1: 'saying', p2: 'said'}
																																																																																																																																																																																																		},
																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																				_0: 'scam',
																																																																																																																																																																																																				_1: {f1: 'scams', f2: 'scammed', p1: 'scamming', p2: 'scammed'}
																																																																																																																																																																																																			},
																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																					_0: 'scan',
																																																																																																																																																																																																					_1: {f1: 'scans', f2: 'scanned', p1: 'scanning', p2: 'scanned'}
																																																																																																																																																																																																				},
																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																						_0: 'scar',
																																																																																																																																																																																																						_1: {f1: 'scars', f2: 'scarred', p1: 'scarring', p2: 'scarred'}
																																																																																																																																																																																																					},
																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																							_0: 'scrub',
																																																																																																																																																																																																							_1: {f1: 'scrubs', f2: 'scrubbed', p1: 'scrubbing', p2: 'scrubbed'}
																																																																																																																																																																																																						},
																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																								_0: 'see',
																																																																																																																																																																																																								_1: {f1: 'sees', f2: 'saw', p1: 'seeing', p2: 'seen'}
																																																																																																																																																																																																							},
																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																									_0: 'seek',
																																																																																																																																																																																																									_1: {f1: 'seeks', f2: 'sought', p1: 'seeking', p2: 'sought'}
																																																																																																																																																																																																								},
																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																										_0: 'sell',
																																																																																																																																																																																																										_1: {f1: 'sells', f2: 'sold', p1: 'selling', p2: 'sold'}
																																																																																																																																																																																																									},
																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																											_0: 'send',
																																																																																																																																																																																																											_1: {f1: 'sends', f2: 'sent', p1: 'sending', p2: 'sent'}
																																																																																																																																																																																																										},
																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																												_0: 'set',
																																																																																																																																																																																																												_1: {f1: 'sets', f2: 'set', p1: 'setting', p2: 'set'}
																																																																																																																																																																																																											},
																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																													_0: 'sew',
																																																																																																																																																																																																													_1: {f1: 'sews', f2: 'sewed', p1: 'sewing', p2: 'sewn'}
																																																																																																																																																																																																												},
																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																														_0: 'shake',
																																																																																																																																																																																																														_1: {f1: 'shakes', f2: 'shook', p1: 'shaking', p2: 'shaken'}
																																																																																																																																																																																																													},
																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																															_0: 'shear',
																																																																																																																																																																																																															_1: {f1: 'shears', f2: 'shore', p1: 'shearing', p2: 'shorn'}
																																																																																																																																																																																																														},
																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																_0: 'shed',
																																																																																																																																																																																																																_1: {f1: 'sheds', f2: 'shed', p1: 'shedding', p2: 'shed'}
																																																																																																																																																																																																															},
																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																	_0: 'shine',
																																																																																																																																																																																																																	_1: {f1: 'shines', f2: 'shone', p1: 'shining', p2: 'shone'}
																																																																																																																																																																																																																},
																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																		_0: 'shit',
																																																																																																																																																																																																																		_1: {f1: 'shits', f2: 'shit', p1: 'shitting', p2: 'shit'}
																																																																																																																																																																																																																	},
																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																			_0: 'shoot',
																																																																																																																																																																																																																			_1: {f1: 'shoots', f2: 'shot', p1: 'shooting', p2: 'shot'}
																																																																																																																																																																																																																		},
																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																				_0: 'shop',
																																																																																																																																																																																																																				_1: {f1: 'shops', f2: 'shopped', p1: 'shopping', p2: 'shopped'}
																																																																																																																																																																																																																			},
																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																					_0: 'show',
																																																																																																																																																																																																																					_1: {f1: 'shows', f2: 'showed', p1: 'showing', p2: 'shown'}
																																																																																																																																																																																																																				},
																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																						_0: 'shrink',
																																																																																																																																																																																																																						_1: {f1: 'shrinks', f2: 'shrank', p1: 'shrinking', p2: 'shrunk'}
																																																																																																																																																																																																																					},
																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																							_0: 'shrug',
																																																																																																																																																																																																																							_1: {f1: 'shrugs', f2: 'shrugged', p1: 'shrugging', p2: 'shrugged'}
																																																																																																																																																																																																																						},
																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																								_0: 'shun',
																																																																																																																																																																																																																								_1: {f1: 'shuns', f2: 'shunned', p1: 'shunning', p2: 'shunned'}
																																																																																																																																																																																																																							},
																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																									_0: 'shut',
																																																																																																																																																																																																																									_1: {f1: 'shuts', f2: 'shut', p1: 'shutting', p2: 'shut'}
																																																																																																																																																																																																																								},
																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																										_0: 'signal',
																																																																																																																																																																																																																										_1: {f1: 'signals', f2: 'signalled', p1: 'signalling', p2: 'signalled'}
																																																																																																																																																																																																																									},
																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																											_0: 'sin',
																																																																																																																																																																																																																											_1: {f1: 'sins', f2: 'sinned', p1: 'sinning', p2: 'sinned'}
																																																																																																																																																																																																																										},
																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																												_0: 'sing',
																																																																																																																																																																																																																												_1: {f1: 'sings', f2: 'sang', p1: 'singing', p2: 'sung'}
																																																																																																																																																																																																																											},
																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																													_0: 'singe',
																																																																																																																																																																																																																													_1: {f1: 'singes', f2: 'singed', p1: 'singeing', p2: 'singed'}
																																																																																																																																																																																																																												},
																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																														_0: 'sink',
																																																																																																																																																																																																																														_1: {f1: 'sinks', f2: 'sank', p1: 'sinking', p2: 'sunk'}
																																																																																																																																																																																																																													},
																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																															_0: 'sip',
																																																																																																																																																																																																																															_1: {f1: 'sips', f2: 'sipped', p1: 'sipping', p2: 'sipped'}
																																																																																																																																																																																																																														},
																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																_0: 'sit',
																																																																																																																																																																																																																																_1: {f1: 'sits', f2: 'sat', p1: 'sitting', p2: 'sat'}
																																																																																																																																																																																																																															},
																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																	_0: 'skid',
																																																																																																																																																																																																																																	_1: {f1: 'skids', f2: 'skidded', p1: 'skidding', p2: 'skidded'}
																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																		_0: 'skip',
																																																																																																																																																																																																																																		_1: {f1: 'skips', f2: 'skipped', p1: 'skipping', p2: 'skipped'}
																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																			_0: 'slam',
																																																																																																																																																																																																																																			_1: {f1: 'slams', f2: 'slammed', p1: 'slamming', p2: 'slammed'}
																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																				_0: 'slap',
																																																																																																																																																																																																																																				_1: {f1: 'slaps', f2: 'slapped', p1: 'slapping', p2: 'slapped'}
																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																					_0: 'slay',
																																																																																																																																																																																																																																					_1: {f1: 'slays', f2: 'slew', p1: 'slaying', p2: 'slain'}
																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																						_0: 'sleep',
																																																																																																																																																																																																																																						_1: {f1: 'sleeps', f2: 'slept', p1: 'sleeping', p2: 'slept'}
																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																							_0: 'slide',
																																																																																																																																																																																																																																							_1: {f1: 'slides', f2: 'slid', p1: 'sliding', p2: 'slid'}
																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																								_0: 'slim',
																																																																																																																																																																																																																																								_1: {f1: 'slims', f2: 'slimmed', p1: 'slimming', p2: 'slimmed'}
																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																									_0: 'sling',
																																																																																																																																																																																																																																									_1: {f1: 'slings', f2: 'slung', p1: 'slinging', p2: 'slung'}
																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																										_0: 'slink',
																																																																																																																																																																																																																																										_1: {f1: 'slinks', f2: 'slunk', p1: 'slinking', p2: 'slunk'}
																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																											_0: 'slip',
																																																																																																																																																																																																																																											_1: {f1: 'slips', f2: 'slipped', p1: 'slipping', p2: 'slipped'}
																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																												_0: 'slit',
																																																																																																																																																																																																																																												_1: {f1: 'slits', f2: 'slit', p1: 'slitting', p2: 'slit'}
																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																													_0: 'smell',
																																																																																																																																																																																																																																													_1: {f1: 'smells', f2: 'smelt', p1: 'smelling', p2: 'smelt'}
																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																														_0: 'smite',
																																																																																																																																																																																																																																														_1: {f1: 'smites', f2: 'smote', p1: 'smiting', p2: 'smitten'}
																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																															_0: 'snap',
																																																																																																																																																																																																																																															_1: {f1: 'snaps', f2: 'snapped', p1: 'snapping', p2: 'snapped'}
																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																_0: 'sneak',
																																																																																																																																																																																																																																																_1: {f1: 'sneaks', f2: 'snuck', p1: 'sneaking', p2: 'snuck'}
																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																	_0: 'sob',
																																																																																																																																																																																																																																																	_1: {f1: 'sobs', f2: 'sobbed', p1: 'sobbing', p2: 'sobbed'}
																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																		_0: 'speak',
																																																																																																																																																																																																																																																		_1: {f1: 'speaks', f2: 'spoke', p1: 'speaking', p2: 'spoken'}
																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																			_0: 'speed',
																																																																																																																																																																																																																																																			_1: {f1: 'speeds', f2: 'sped', p1: 'speeding', p2: 'sped'}
																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																				_0: 'spell',
																																																																																																																																																																																																																																																				_1: {f1: 'spells', f2: 'spelt', p1: 'spelling', p2: 'spelt'}
																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																					_0: 'spend',
																																																																																																																																																																																																																																																					_1: {f1: 'spends', f2: 'spent', p1: 'spending', p2: 'spent'}
																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																						_0: 'spill',
																																																																																																																																																																																																																																																						_1: {f1: 'spills', f2: 'spilt', p1: 'spilling', p2: 'spilt'}
																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																							_0: 'spin',
																																																																																																																																																																																																																																																							_1: {f1: 'spins', f2: 'span', p1: 'spinning', p2: 'spun'}
																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																								_0: 'spit',
																																																																																																																																																																																																																																																								_1: {f1: 'spits', f2: 'spat', p1: 'spitting', p2: 'spat'}
																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																									_0: 'split',
																																																																																																																																																																																																																																																									_1: {f1: 'splits', f2: 'split', p1: 'splitting', p2: 'split'}
																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																										_0: 'spoil',
																																																																																																																																																																																																																																																										_1: {f1: 'spoils', f2: 'spoilt', p1: 'spoiling', p2: 'spoilt'}
																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																											_0: 'spot',
																																																																																																																																																																																																																																																											_1: {f1: 'spots', f2: 'spotted', p1: 'spotting', p2: 'spotted'}
																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																												_0: 'spread',
																																																																																																																																																																																																																																																												_1: {f1: 'spreads', f2: 'spread', p1: 'spreading', p2: 'spread'}
																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																													_0: 'spring',
																																																																																																																																																																																																																																																													_1: {f1: 'springs', f2: 'sprang', p1: 'springing', p2: 'sprung'}
																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																														_0: 'stand',
																																																																																																																																																																																																																																																														_1: {f1: 'stands', f2: 'stood', p1: 'standing', p2: 'stood'}
																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																															_0: 'steal',
																																																																																																																																																																																																																																																															_1: {f1: 'steals', f2: 'stole', p1: 'stealing', p2: 'stolen'}
																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																_0: 'stem',
																																																																																																																																																																																																																																																																_1: {f1: 'stems', f2: 'stemmed', p1: 'stemming', p2: 'stemmed'}
																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																	_0: 'step',
																																																																																																																																																																																																																																																																	_1: {f1: 'steps', f2: 'stepped', p1: 'stepping', p2: 'stepped'}
																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																		_0: 'stick',
																																																																																																																																																																																																																																																																		_1: {f1: 'sticks', f2: 'stuck', p1: 'sticking', p2: 'stuck'}
																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																			_0: 'sting',
																																																																																																																																																																																																																																																																			_1: {f1: 'stings', f2: 'stung', p1: 'stinging', p2: 'stung'}
																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																				_0: 'stink',
																																																																																																																																																																																																																																																																				_1: {f1: 'stinks', f2: 'stank', p1: 'stinking', p2: 'stunk'}
																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																					_0: 'stir',
																																																																																																																																																																																																																																																																					_1: {f1: 'stirs', f2: 'stirred', p1: 'stirring', p2: 'stirred'}
																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																						_0: 'stop',
																																																																																																																																																																																																																																																																						_1: {f1: 'stops', f2: 'stopped', p1: 'stopping', p2: 'stopped'}
																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																							_0: 'strap',
																																																																																																																																																																																																																																																																							_1: {f1: 'straps', f2: 'strapped', p1: 'strapping', p2: 'strapped'}
																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																								_0: 'strew',
																																																																																																																																																																																																																																																																								_1: {f1: 'strews', f2: 'strewed', p1: 'strewing', p2: 'strewn'}
																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																									_0: 'stride',
																																																																																																																																																																																																																																																																									_1: {f1: 'strides', f2: 'strode', p1: 'striding', p2: 'stridden'}
																																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																																										_0: 'strike',
																																																																																																																																																																																																																																																																										_1: {f1: 'strikes', f2: 'struck', p1: 'striking', p2: 'stricken'}
																																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																																											_0: 'string',
																																																																																																																																																																																																																																																																											_1: {f1: 'strings', f2: 'strung', p1: 'stringing', p2: 'strung'}
																																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																																												_0: 'strip',
																																																																																																																																																																																																																																																																												_1: {f1: 'strips', f2: 'stripped', p1: 'stripping', p2: 'stripped'}
																																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																																													_0: 'strive',
																																																																																																																																																																																																																																																																													_1: {f1: 'strives', f2: 'strove', p1: 'striving', p2: 'striven'}
																																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																																														_0: 'submit',
																																																																																																																																																																																																																																																																														_1: {f1: 'submits', f2: 'submitted', p1: 'submitting', p2: 'submitted'}
																																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																																															_0: 'swear',
																																																																																																																																																																																																																																																																															_1: {f1: 'swears', f2: 'swore', p1: 'swearing', p2: 'sworn'}
																																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																_0: 'sweat',
																																																																																																																																																																																																																																																																																_1: {f1: 'sweats', f2: 'sweat', p1: 'sweating', p2: 'sweat'}
																																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																	_0: 'sweep',
																																																																																																																																																																																																																																																																																	_1: {f1: 'sweeps', f2: 'swept', p1: 'sweeping', p2: 'swept'}
																																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																		_0: 'swell',
																																																																																																																																																																																																																																																																																		_1: {f1: 'swells', f2: 'swelled', p1: 'swelling', p2: 'swollen'}
																																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																			_0: 'swim',
																																																																																																																																																																																																																																																																																			_1: {f1: 'swims', f2: 'swam', p1: 'swimming', p2: 'swum'}
																																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																				_0: 'swing',
																																																																																																																																																																																																																																																																																				_1: {f1: 'swings', f2: 'swung', p1: 'swinging', p2: 'swung'}
																																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																					_0: 'swot',
																																																																																																																																																																																																																																																																																					_1: {f1: 'swots', f2: 'swotted', p1: 'swotting', p2: 'swotted'}
																																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																						_0: 'take',
																																																																																																																																																																																																																																																																																						_1: {f1: 'takes', f2: 'took', p1: 'taking', p2: 'taken'}
																																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																							_0: 'tap',
																																																																																																																																																																																																																																																																																							_1: {f1: 'taps', f2: 'tapped', p1: 'tapping', p2: 'tapped'}
																																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																								_0: 'teach',
																																																																																																																																																																																																																																																																																								_1: {f1: 'teaches', f2: 'taught', p1: 'teaching', p2: 'taught'}
																																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																									_0: 'tear',
																																																																																																																																																																																																																																																																																									_1: {f1: 'tears', f2: 'tore', p1: 'tearing', p2: 'torn'}
																																																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																										_0: 'tell',
																																																																																																																																																																																																																																																																																										_1: {f1: 'tells', f2: 'told', p1: 'telling', p2: 'told'}
																																																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																											_0: 'think',
																																																																																																																																																																																																																																																																																											_1: {f1: 'thinks', f2: 'thought', p1: 'thinking', p2: 'thought'}
																																																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																												_0: 'throw',
																																																																																																																																																																																																																																																																																												_1: {f1: 'throws', f2: 'threw', p1: 'throwing', p2: 'thrown'}
																																																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																													_0: 'thrust',
																																																																																																																																																																																																																																																																																													_1: {f1: 'thrusts', f2: 'thrust', p1: 'thrusting', p2: 'thrust'}
																																																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																														_0: 'tip',
																																																																																																																																																																																																																																																																																														_1: {f1: 'tips', f2: 'tipped', p1: 'tipping', p2: 'tipped'}
																																																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																															_0: 'transfer',
																																																																																																																																																																																																																																																																																															_1: {f1: 'transfers', f2: 'transferred', p1: 'transferring', p2: 'transferred'}
																																																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																_0: 'trap',
																																																																																																																																																																																																																																																																																																_1: {f1: 'traps', f2: 'trapped', p1: 'trapping', p2: 'trapped'}
																																																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																	_0: 'travel',
																																																																																																																																																																																																																																																																																																	_1: {f1: 'travels', f2: 'travelled', p1: 'travelling', p2: 'travelled'}
																																																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																		_0: 'tread',
																																																																																																																																																																																																																																																																																																		_1: {f1: 'treads', f2: 'trod', p1: 'treading', p2: 'trodden'}
																																																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																			_0: 'trip',
																																																																																																																																																																																																																																																																																																			_1: {f1: 'trips', f2: 'tripped', p1: 'tripping', p2: 'tripped'}
																																																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																				_0: 'trot',
																																																																																																																																																																																																																																																																																																				_1: {f1: 'trots', f2: 'trotted', p1: 'trotting', p2: 'trotted'}
																																																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																					_0: 'tug',
																																																																																																																																																																																																																																																																																																					_1: {f1: 'tugs', f2: 'tugged', p1: 'tugging', p2: 'tugged'}
																																																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																						_0: 'typeset',
																																																																																																																																																																																																																																																																																																						_1: {f1: 'typesets', f2: 'typeset', p1: 'typesetting', p2: 'typeset'}
																																																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																							_0: 'understand',
																																																																																																																																																																																																																																																																																																							_1: {f1: 'understands', f2: 'understood', p1: 'understanding', p2: 'understood'}
																																																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																								_0: 'undo',
																																																																																																																																																																																																																																																																																																								_1: {f1: 'undoes', f2: 'undid', p1: 'undoing', p2: 'undone'}
																																																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																									_0: 'upset',
																																																																																																																																																																																																																																																																																																									_1: {f1: 'upsets', f2: 'upset', p1: 'upsetting', p2: 'upset'}
																																																																																																																																																																																																																																																																																																								},
																																																																																																																																																																																																																																																																																																								_1: {
																																																																																																																																																																																																																																																																																																									ctor: '::',
																																																																																																																																																																																																																																																																																																									_0: {
																																																																																																																																																																																																																																																																																																										ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																										_0: 'wake',
																																																																																																																																																																																																																																																																																																										_1: {f1: 'wakes', f2: 'woke', p1: 'waking', p2: 'woken'}
																																																																																																																																																																																																																																																																																																									},
																																																																																																																																																																																																																																																																																																									_1: {
																																																																																																																																																																																																																																																																																																										ctor: '::',
																																																																																																																																																																																																																																																																																																										_0: {
																																																																																																																																																																																																																																																																																																											ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																											_0: 'waylay',
																																																																																																																																																																																																																																																																																																											_1: {f1: 'waylays', f2: 'waylaid', p1: 'waylaying', p2: 'waylaid'}
																																																																																																																																																																																																																																																																																																										},
																																																																																																																																																																																																																																																																																																										_1: {
																																																																																																																																																																																																																																																																																																											ctor: '::',
																																																																																																																																																																																																																																																																																																											_0: {
																																																																																																																																																																																																																																																																																																												ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																												_0: 'wear',
																																																																																																																																																																																																																																																																																																												_1: {f1: 'wears', f2: 'wore', p1: 'wearing', p2: 'worn'}
																																																																																																																																																																																																																																																																																																											},
																																																																																																																																																																																																																																																																																																											_1: {
																																																																																																																																																																																																																																																																																																												ctor: '::',
																																																																																																																																																																																																																																																																																																												_0: {
																																																																																																																																																																																																																																																																																																													ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																													_0: 'weave',
																																																																																																																																																																																																																																																																																																													_1: {f1: 'weaves', f2: 'wove', p1: 'weaving', p2: 'woven'}
																																																																																																																																																																																																																																																																																																												},
																																																																																																																																																																																																																																																																																																												_1: {
																																																																																																																																																																																																																																																																																																													ctor: '::',
																																																																																																																																																																																																																																																																																																													_0: {
																																																																																																																																																																																																																																																																																																														ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																														_0: 'wed',
																																																																																																																																																																																																																																																																																																														_1: {f1: 'weds', f2: 'wed', p1: 'wedding', p2: 'wed'}
																																																																																																																																																																																																																																																																																																													},
																																																																																																																																																																																																																																																																																																													_1: {
																																																																																																																																																																																																																																																																																																														ctor: '::',
																																																																																																																																																																																																																																																																																																														_0: {
																																																																																																																																																																																																																																																																																																															ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																															_0: 'weep',
																																																																																																																																																																																																																																																																																																															_1: {f1: 'weeps', f2: 'wept', p1: 'weeping', p2: 'wept'}
																																																																																																																																																																																																																																																																																																														},
																																																																																																																																																																																																																																																																																																														_1: {
																																																																																																																																																																																																																																																																																																															ctor: '::',
																																																																																																																																																																																																																																																																																																															_0: {
																																																																																																																																																																																																																																																																																																																ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																_0: 'wend',
																																																																																																																																																																																																																																																																																																																_1: {f1: 'wends', f2: 'went', p1: 'wending', p2: 'went'}
																																																																																																																																																																																																																																																																																																															},
																																																																																																																																																																																																																																																																																																															_1: {
																																																																																																																																																																																																																																																																																																																ctor: '::',
																																																																																																																																																																																																																																																																																																																_0: {
																																																																																																																																																																																																																																																																																																																	ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																	_0: 'wet',
																																																																																																																																																																																																																																																																																																																	_1: {f1: 'wets', f2: 'wet', p1: 'wetting', p2: 'wet'}
																																																																																																																																																																																																																																																																																																																},
																																																																																																																																																																																																																																																																																																																_1: {
																																																																																																																																																																																																																																																																																																																	ctor: '::',
																																																																																																																																																																																																																																																																																																																	_0: {
																																																																																																																																																																																																																																																																																																																		ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																		_0: 'whip',
																																																																																																																																																																																																																																																																																																																		_1: {f1: 'whips', f2: 'whipped', p1: 'whipping', p2: 'whipped'}
																																																																																																																																																																																																																																																																																																																	},
																																																																																																																																																																																																																																																																																																																	_1: {
																																																																																																																																																																																																																																																																																																																		ctor: '::',
																																																																																																																																																																																																																																																																																																																		_0: {
																																																																																																																																																																																																																																																																																																																			ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																			_0: 'win',
																																																																																																																																																																																																																																																																																																																			_1: {f1: 'wins', f2: 'won', p1: 'winning', p2: 'won'}
																																																																																																																																																																																																																																																																																																																		},
																																																																																																																																																																																																																																																																																																																		_1: {
																																																																																																																																																																																																																																																																																																																			ctor: '::',
																																																																																																																																																																																																																																																																																																																			_0: {
																																																																																																																																																																																																																																																																																																																				ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																				_0: 'wind',
																																																																																																																																																																																																																																																																																																																				_1: {f1: 'winds', f2: 'wound', p1: 'winding', p2: 'wound'}
																																																																																																																																																																																																																																																																																																																			},
																																																																																																																																																																																																																																																																																																																			_1: {
																																																																																																																																																																																																																																																																																																																				ctor: '::',
																																																																																																																																																																																																																																																																																																																				_0: {
																																																																																																																																																																																																																																																																																																																					ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																					_0: 'withdraw',
																																																																																																																																																																																																																																																																																																																					_1: {f1: 'withdraws', f2: 'withdrew', p1: 'withdrawing', p2: 'withdrawn'}
																																																																																																																																																																																																																																																																																																																				},
																																																																																																																																																																																																																																																																																																																				_1: {
																																																																																																																																																																																																																																																																																																																					ctor: '::',
																																																																																																																																																																																																																																																																																																																					_0: {
																																																																																																																																																																																																																																																																																																																						ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																						_0: 'worship',
																																																																																																																																																																																																																																																																																																																						_1: {f1: 'worships', f2: 'worshipped', p1: 'worshipping', p2: 'worshipped'}
																																																																																																																																																																																																																																																																																																																					},
																																																																																																																																																																																																																																																																																																																					_1: {
																																																																																																																																																																																																																																																																																																																						ctor: '::',
																																																																																																																																																																																																																																																																																																																						_0: {
																																																																																																																																																																																																																																																																																																																							ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																							_0: 'wrap',
																																																																																																																																																																																																																																																																																																																							_1: {f1: 'wraps', f2: 'wrapped', p1: 'wrapping', p2: 'wrapped'}
																																																																																																																																																																																																																																																																																																																						},
																																																																																																																																																																																																																																																																																																																						_1: {
																																																																																																																																																																																																																																																																																																																							ctor: '::',
																																																																																																																																																																																																																																																																																																																							_0: {
																																																																																																																																																																																																																																																																																																																								ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																								_0: 'wring',
																																																																																																																																																																																																																																																																																																																								_1: {f1: 'wrings', f2: 'wrung', p1: 'wringing', p2: 'wrung'}
																																																																																																																																																																																																																																																																																																																							},
																																																																																																																																																																																																																																																																																																																							_1: {
																																																																																																																																																																																																																																																																																																																								ctor: '::',
																																																																																																																																																																																																																																																																																																																								_0: {
																																																																																																																																																																																																																																																																																																																									ctor: '_Tuple2',
																																																																																																																																																																																																																																																																																																																									_0: 'write',
																																																																																																																																																																																																																																																																																																																									_1: {f1: 'writes', f2: 'wrote', p1: 'writing', p2: 'written'}
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
var _merivale$victor$Theory_Words_Verbs$guessParticiple1 = function (base) {
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
var _merivale$victor$Theory_Words_Verbs$guessFinite2 = function (base) {
	return _elm_lang$core$Native_Utils.eq(
		A2(_elm_lang$core$String$right, 1, base),
		'e') ? A2(_elm_lang$core$Basics_ops['++'], base, 'd') : (_merivale$victor$Theory_Words_Utils$consontanty(base) ? A2(
		_elm_lang$core$Basics_ops['++'],
		A2(_elm_lang$core$String$dropRight, 1, base),
		'ied') : A2(_elm_lang$core$Basics_ops['++'], base, 'ed'));
};
var _merivale$victor$Theory_Words_Verbs$guessFinite1 = function (base) {
	return _merivale$victor$Theory_Words_Utils$consontanty(base) ? A2(
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
var _merivale$victor$Theory_Words_Verbs$participle2 = function (base) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_merivale$victor$Theory_Words_Verbs$guessFinite2(base),
		A2(
			_elm_lang$core$Maybe$map,
			function (x) {
				return x.p2;
			},
			A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words_Verbs$verbs)));
};
var _merivale$victor$Theory_Words_Verbs$participle1 = function (base) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_merivale$victor$Theory_Words_Verbs$guessParticiple1(base),
		A2(
			_elm_lang$core$Maybe$map,
			function (x) {
				return x.p1;
			},
			A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words_Verbs$verbs)));
};
var _merivale$victor$Theory_Words_Verbs$finite2 = function (base) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_merivale$victor$Theory_Words_Verbs$guessFinite2(base),
		A2(
			_elm_lang$core$Maybe$map,
			function (x) {
				return x.f2;
			},
			A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words_Verbs$verbs)));
};
var _merivale$victor$Theory_Words_Verbs$finite1 = function (base) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_merivale$victor$Theory_Words_Verbs$guessFinite1(base),
		A2(
			_elm_lang$core$Maybe$map,
			function (x) {
				return x.f1;
			},
			A2(_elm_lang$core$Dict$get, base, _merivale$victor$Theory_Words_Verbs$verbs)));
};
var _merivale$victor$Theory_Words_Verbs$conjugate = F3(
	function (object, past, base) {
		return (past && _elm_lang$core$Native_Utils.eq(base, 'be')) ? (((_merivale$victor$Theory_Plain_Nucleus$isSpeaker(object) || _merivale$victor$Theory_Plain_Nucleus$isOther(object)) && (!_merivale$victor$Theory_Plain_Nucleus$isPlural(object))) ? 'was' : 'were') : (_elm_lang$core$Native_Utils.eq(base, 'be') ? ((_merivale$victor$Theory_Plain_Nucleus$isSpeaker(object) && (!_merivale$victor$Theory_Plain_Nucleus$isPlural(object))) ? 'am' : ((_merivale$victor$Theory_Plain_Nucleus$isOther(object) && (!_merivale$victor$Theory_Plain_Nucleus$isPlural(object))) ? 'is' : 'are')) : (past ? _merivale$victor$Theory_Words_Verbs$finite2(base) : ((_merivale$victor$Theory_Plain_Nucleus$isOther(object) && (!_merivale$victor$Theory_Plain_Nucleus$isPlural(object))) ? _merivale$victor$Theory_Words_Verbs$finite1(base) : base)));
	});

var _merivale$victor$Theory_Words_Fulcrums$complement = function (status) {
	var _p0 = status;
	if (_p0.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		if (_p0._0.ctor === 'Absolute') {
			return {
				ctor: '::',
				_0: _p0._0._0,
				_1: {ctor: '[]'}
			};
		} else {
			return {
				ctor: '::',
				_0: _merivale$victor$Theory_Words_Prepositions$preposition(_p0._0._0),
				_1: {ctor: '[]'}
			};
		}
	}
};
var _merivale$victor$Theory_Words_Fulcrums$fulcrum = F2(
	function (prior, _p1) {
		var _p2 = _p1;
		var _p5 = _p2._1;
		var _p3 = function () {
			var _p4 = _p2._0;
			if (_p4.ctor === 'Be') {
				if (_p4._0 === true) {
					return {
						ctor: '_Tuple2',
						_0: 'be',
						_1: {
							ctor: '::',
							_0: 'being',
							_1: _merivale$victor$Theory_Words_Fulcrums$complement(_p5)
						}
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: 'be',
						_1: _merivale$victor$Theory_Words_Fulcrums$complement(_p5)
					};
				}
			} else {
				if (_p4._1 === true) {
					if (_p4._2 === true) {
						return {
							ctor: '_Tuple2',
							_0: 'be',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								{
									ctor: '::',
									_0: 'being',
									_1: {
										ctor: '::',
										_0: _merivale$victor$Theory_Words_Verbs$participle2(_p4._0),
										_1: {ctor: '[]'}
									}
								},
								_merivale$victor$Theory_Words_Fulcrums$complement(_p5))
						};
					} else {
						return {
							ctor: '_Tuple2',
							_0: 'be',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								{
									ctor: '::',
									_0: _merivale$victor$Theory_Words_Verbs$participle1(_p4._0),
									_1: {ctor: '[]'}
								},
								_merivale$victor$Theory_Words_Fulcrums$complement(_p5))
						};
					}
				} else {
					if (_p4._2 === true) {
						return {
							ctor: '_Tuple2',
							_0: 'be',
							_1: A2(
								_elm_lang$core$Basics_ops['++'],
								{
									ctor: '::',
									_0: _merivale$victor$Theory_Words_Verbs$participle2(_p4._0),
									_1: {ctor: '[]'}
								},
								_merivale$victor$Theory_Words_Fulcrums$complement(_p5))
						};
					} else {
						return {
							ctor: '_Tuple2',
							_0: _p4._0,
							_1: _merivale$victor$Theory_Words_Fulcrums$complement(_p5)
						};
					}
				}
			}
		}();
		var base = _p3._0;
		var rest = _p3._1;
		return prior ? {
			ctor: '_Tuple2',
			_0: 'have',
			_1: {
				ctor: '::',
				_0: _merivale$victor$Theory_Words_Verbs$participle2(base),
				_1: rest
			}
		} : {ctor: '_Tuple2', _0: base, _1: rest};
	});

var _merivale$victor$Theory_Words_Modals$modal = F3(
	function (past, negated, modality) {
		var _p0 = modality;
		switch (_p0.ctor) {
			case 'Yes1':
				return past ? 'would' : 'will';
			case 'Yes2':
				return past ? 'should' : 'shall';
			case 'Yes3':
				return negated ? 'need' : (past ? 'ought' : 'must');
			case 'Maybe1':
				return past ? 'might' : 'may';
			case 'Maybe3':
				return past ? 'could' : 'can';
			default:
				return 'dare';
		}
	});

var _merivale$victor$Theory_Words_Nouns$nouns = _elm_lang$core$Dict$fromList(
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
var _merivale$victor$Theory_Words_Nouns$guessPlural = function (singular) {
	return _merivale$victor$Theory_Words_Utils$consontanty(singular) ? A2(
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
var _merivale$victor$Theory_Words_Nouns$plural = function (noun) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_merivale$victor$Theory_Words_Nouns$guessPlural(noun),
		A2(_elm_lang$core$Dict$get, noun, _merivale$victor$Theory_Words_Nouns$nouns));
};

var _merivale$victor$Theory_Words_Articles$article = F2(
	function (plural, pointer) {
		var _p0 = {ctor: '_Tuple2', _0: pointer, _1: plural};
		switch (_p0._0.ctor) {
			case 'The':
				return 'the';
			case 'This':
				if (_p0._1 === false) {
					return 'this';
				} else {
					return 'these';
				}
			case 'That':
				if (_p0._1 === false) {
					return 'that';
				} else {
					return 'those';
				}
			default:
				return _merivale$victor$Theory_Words_Pronouns$relative1(_p0._0._0);
		}
	});

var _merivale$victor$Theory_Words_Determiners$determiner = function (quantifier) {
	var _p0 = quantifier;
	if (_p0.ctor === 'Integer') {
		return _merivale$victor$Theory_Words_Utils$integerToString(_p0._0);
	} else {
		return _elm_lang$core$String$toLower(
			_elm_lang$core$Basics$toString(quantifier));
	}
};

var _merivale$victor$Theory_Object_Sentences$negateDeterminer = function (determinerPhrase) {
	var _p0 = _elm_lang$core$List$head(determinerPhrase);
	_v0_4:
	do {
		if (_p0.ctor === 'Just') {
			switch (_p0._0) {
				case 'some':
					return {
						ctor: '::',
						_0: 'no',
						_1: A2(_elm_lang$core$List$drop, 1, determinerPhrase)
					};
				case 'someone':
					return {
						ctor: '::',
						_0: 'no one',
						_1: A2(_elm_lang$core$List$drop, 1, determinerPhrase)
					};
				case 'somebody':
					return {
						ctor: '::',
						_0: 'nobody',
						_1: A2(_elm_lang$core$List$drop, 1, determinerPhrase)
					};
				case 'something':
					return {
						ctor: '::',
						_0: 'nothing',
						_1: A2(_elm_lang$core$List$drop, 1, determinerPhrase)
					};
				default:
					break _v0_4;
			}
		} else {
			break _v0_4;
		}
	} while(false);
	return {ctor: '::', _0: 'not', _1: determinerPhrase};
};
var _merivale$victor$Theory_Object_Sentences$haystackToString = F3(
	function (canAbbreviate, plural, _p1) {
		var _p2 = _p1;
		var _p5 = _p2._2;
		var _p4 = _p2._1;
		var _p3 = _p2._0;
		return canAbbreviate ? A2(
			_elm_lang$core$Basics_ops['++'],
			_merivale$victor$Theory_Words_Utils$splitMaybeString(_p4),
			_merivale$victor$Theory_Words_Utils$splitMaybeString(_p5)) : (plural ? A2(
			_elm_lang$core$Basics_ops['++'],
			_merivale$victor$Theory_Words_Utils$splitMaybeString(_p4),
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _merivale$victor$Theory_Words_Nouns$plural(_p3),
					_1: {ctor: '[]'}
				},
				_merivale$victor$Theory_Words_Utils$splitMaybeString(_p5))) : A2(
			_elm_lang$core$Basics_ops['++'],
			_merivale$victor$Theory_Words_Utils$splitMaybeString(_p4),
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _p3,
					_1: {ctor: '[]'}
				},
				_merivale$victor$Theory_Words_Utils$splitMaybeString(_p5))));
	});
var _merivale$victor$Theory_Object_Sentences$determiner = F4(
	function (canAbbreviate, quantifier, other, category) {
		var _p6 = quantifier;
		if (_p6.ctor === 'Nothing') {
			return other ? {
				ctor: '::',
				_0: 'other',
				_1: {ctor: '[]'}
			} : {ctor: '[]'};
		} else {
			if (_p6._0.ctor === 'A') {
				return other ? {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_merivale$victor$Theory_Words_Determiners$determiner(_merivale$victor$Theory_Object_Pseudo$A),
						'nother'),
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
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_merivale$victor$Theory_Words_Determiners$determiner(_merivale$victor$Theory_Object_Pseudo$A),
						'n'),
					_1: {ctor: '[]'}
				} : {
					ctor: '::',
					_0: _merivale$victor$Theory_Words_Determiners$determiner(_merivale$victor$Theory_Object_Pseudo$A),
					_1: {ctor: '[]'}
				});
			} else {
				var _p7 = _p6._0;
				return canAbbreviate ? (other ? {
					ctor: '::',
					_0: A2(
						_elm_lang$core$Basics_ops['++'],
						_merivale$victor$Theory_Words_Determiners$determiner(_p7),
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
						_merivale$victor$Theory_Words_Determiners$determiner(_p7),
						category),
					_1: {ctor: '[]'}
				}) : (other ? {
					ctor: '::',
					_0: _merivale$victor$Theory_Words_Determiners$determiner(_p7),
					_1: {
						ctor: '::',
						_0: 'other',
						_1: {ctor: '[]'}
					}
				} : {
					ctor: '::',
					_0: _merivale$victor$Theory_Words_Determiners$determiner(_p7),
					_1: {ctor: '[]'}
				});
			}
		}
	});
var _merivale$victor$Theory_Object_Sentences$determinerPhrase = F5(
	function (plural, negated, quantifier, other, haystack) {
		var _p8 = haystack;
		var category = _p8._0;
		var property = _p8._1;
		var restriction = _p8._2;
		var canAbbreviate = A2(
			_elm_lang$core$List$member,
			quantifier,
			{
				ctor: '::',
				_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Every),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Some),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Maybe$Just(_merivale$victor$Theory_Object_Pseudo$Any),
						_1: {ctor: '[]'}
					}
				}
			}) && (A2(
			_elm_lang$core$List$member,
			category,
			{
				ctor: '::',
				_0: 'one',
				_1: {
					ctor: '::',
					_0: 'body',
					_1: {
						ctor: '::',
						_0: 'thing',
						_1: {
							ctor: '::',
							_0: 'where',
							_1: {ctor: '[]'}
						}
					}
				}
			}) && (!plural));
		var positive = A2(
			_elm_lang$core$Basics_ops['++'],
			A4(_merivale$victor$Theory_Object_Sentences$determiner, canAbbreviate, quantifier, other, category),
			A3(_merivale$victor$Theory_Object_Sentences$haystackToString, canAbbreviate, plural, haystack));
		return negated ? _merivale$victor$Theory_Object_Sentences$negateDeterminer(positive) : positive;
	});
var _merivale$victor$Theory_Object_Sentences$amassedDeterminerPhrase = F3(
	function (plural, negated, _p9) {
		var _p10 = _p9;
		return A5(_merivale$victor$Theory_Object_Sentences$determinerPhrase, plural, negated, _p10._0, _p10._1, _p10._2);
	});
var _merivale$victor$Theory_Object_Sentences$enumeratedDeterminerPhrase = F3(
	function (plural, negated, _p11) {
		var _p12 = _p11;
		return A5(
			_merivale$victor$Theory_Object_Sentences$determinerPhrase,
			plural,
			negated,
			_elm_lang$core$Maybe$Just(_p12._0),
			_p12._1,
			_p12._2);
	});
var _merivale$victor$Theory_Object_Sentences$articlePhrase = F2(
	function (plural, description) {
		var _p13 = description;
		var pointer = _p13._0;
		var other = _p13._1;
		var haystack = _p13._2;
		var article = A2(_merivale$victor$Theory_Words_Articles$article, plural, pointer);
		return other ? A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: article,
				_1: {
					ctor: '::',
					_0: 'other',
					_1: {ctor: '[]'}
				}
			},
			A3(_merivale$victor$Theory_Object_Sentences$haystackToString, false, plural, haystack)) : {
			ctor: '::',
			_0: article,
			_1: A3(_merivale$victor$Theory_Object_Sentences$haystackToString, false, plural, haystack)
		};
	});
var _merivale$victor$Theory_Object_Sentences$nounPhrase = F2(
	function (mainObject, balance) {
		var _p14 = balance;
		switch (_p14.ctor) {
			case 'DirectBalance':
				return A2(
					_merivale$victor$Theory_Words_Counters$counter,
					mainObject,
					{ctor: '_Tuple2', _0: _p14._0._0, _1: _p14._0._1});
			case 'IndirectBalance':
				return A2(
					_elm_lang$core$String$join,
					' ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_merivale$victor$Theory_Words_Counters$prefix(_p14._0),
						A2(
							_merivale$victor$Theory_Object_Sentences$articlePhrase,
							_merivale$victor$Theory_Plain_Nucleus$isPlural(_p14._1),
							_p14._2)));
			case 'EnumeratedBalance':
				return A2(
					_elm_lang$core$String$join,
					' ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_merivale$victor$Theory_Words_Counters$prefix(_p14._0),
						A3(
							_merivale$victor$Theory_Object_Sentences$enumeratedDeterminerPhrase,
							_merivale$victor$Theory_Plain_Nucleus$isPlural(_p14._1),
							_p14._2,
							_p14._3)));
			default:
				return A2(
					_elm_lang$core$String$join,
					' ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_merivale$victor$Theory_Words_Counters$prefix(_p14._0),
						A3(
							_merivale$victor$Theory_Object_Sentences$amassedDeterminerPhrase,
							_merivale$victor$Theory_Plain_Nucleus$isPlural(_p14._1),
							_p14._2,
							_p14._3)));
		}
	});
var _merivale$victor$Theory_Object_Sentences$baseVerbPhrase = F2(
	function (addTo, _p15) {
		var _p16 = _p15;
		var _p18 = _p16.pre;
		var newPre = addTo ? {ctor: '::', _0: 'to', _1: _p18} : _p18;
		var _p17 = A2(_merivale$victor$Theory_Words_Fulcrums$fulcrum, _p16.prior, _p16.pivot);
		var base = _p17._0;
		var rest = _p17._1;
		return A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				newPre,
				{ctor: '::', _0: base, _1: rest}));
	});
var _merivale$victor$Theory_Object_Sentences$verbPhrase = function (vars) {
	var _p19 = A2(_merivale$victor$Theory_Words_Fulcrums$fulcrum, vars.prior, vars.pivot);
	var base = _p19._0;
	var rest = _p19._1;
	if (vars.prior || _elm_lang$core$Native_Utils.eq(base, 'be')) {
		return {
			ctor: '::',
			_0: A3(_merivale$victor$Theory_Words_Verbs$conjugate, vars.object, vars.past, base),
			_1: A2(_elm_lang$core$Basics_ops['++'], vars.pre, rest)
		};
	} else {
		if (A2(_elm_lang$core$List$member, 'not', vars.pre)) {
			var _p20 = A2(
				_merivale$victor$Theory_Words_Utils$splitAtNot,
				vars.pre,
				{ctor: '::', _0: base, _1: rest});
			var newPre = _p20._0;
			var newRest = _p20._1;
			return A2(
				_elm_lang$core$Basics_ops['++'],
				newPre,
				{
					ctor: '::',
					_0: A3(_merivale$victor$Theory_Words_Verbs$conjugate, vars.object, vars.past, 'do'),
					_1: newRest
				});
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				vars.pre,
				{
					ctor: '::',
					_0: A3(_merivale$victor$Theory_Words_Verbs$conjugate, vars.object, vars.past, base),
					_1: rest
				});
		}
	}
};
var _merivale$victor$Theory_Object_Sentences$predicate = function (vars) {
	var _p21 = vars.modality;
	if (_p21.ctor === 'Nothing') {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_merivale$victor$Theory_Object_Sentences$verbPhrase(vars),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$map,
					_merivale$victor$Theory_Object_Sentences$baseVerbPhrase(true),
					vars.displaced),
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$List$map,
						_merivale$victor$Theory_Object_Sentences$nounPhrase(vars.object),
						vars.balances),
					_elm_lang$core$List$reverse(vars.post))));
	} else {
		var _p22 = _p21._0;
		var displaced = {prior: vars.prior, pre: vars.pre, pivot: vars.pivot};
		var addTo = _elm_lang$core$Native_Utils.eq(_p22, _merivale$victor$Theory_Long_Displacers$Yes3) && ((!vars.negatedModality) && vars.past);
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: A3(_merivale$victor$Theory_Words_Modals$modal, vars.past, vars.negatedModality, _p22),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$map,
					_merivale$victor$Theory_Object_Sentences$baseVerbPhrase(addTo),
					{ctor: '::', _0: displaced, _1: vars.displaced}),
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$List$map,
						_merivale$victor$Theory_Object_Sentences$nounPhrase(vars.object),
						vars.balances),
					_elm_lang$core$List$reverse(vars.post))));
	}
};
var _merivale$victor$Theory_Object_Sentences$subject = function (vars) {
	var _p23 = vars.pseudoObject;
	switch (_p23.ctor) {
		case 'DirectObject':
			return {
				ctor: '::',
				_0: _merivale$victor$Theory_Words_Pronouns$direct1(vars.object),
				_1: {ctor: '[]'}
			};
		case 'IndirectObject':
			return A2(
				_merivale$victor$Theory_Object_Sentences$articlePhrase,
				_merivale$victor$Theory_Plain_Nucleus$isPlural(vars.object),
				_p23._0);
		case 'EnumeratedObject':
			return A3(
				_merivale$victor$Theory_Object_Sentences$enumeratedDeterminerPhrase,
				_merivale$victor$Theory_Plain_Nucleus$isPlural(vars.object),
				_p23._0,
				_p23._1);
		default:
			return A3(
				_merivale$victor$Theory_Object_Sentences$amassedDeterminerPhrase,
				_merivale$victor$Theory_Plain_Nucleus$isPlural(vars.object),
				_p23._0,
				_p23._1);
	}
};
var _merivale$victor$Theory_Object_Sentences$implode = function (vars) {
	return A2(
		_elm_lang$core$String$join,
		' ',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_merivale$victor$Theory_Object_Sentences$subject(vars),
			_merivale$victor$Theory_Object_Sentences$predicate(vars)));
};
var _merivale$victor$Theory_Object_Sentences$sentence = function (message) {
	return A2(
		_elm_lang$core$Result$map,
		_merivale$victor$Theory_Object_Sentences$implode,
		_merivale$victor$Theory_Object_Messages$explode(message));
};

var _merivale$victor$Object$elaborationButton = F2(
	function (index, recipe) {
		return _merivale$victor$Interface_View_Input$button(
			{
				label: A2(
					_elm_lang$core$String$dropLeft,
					4,
					_elm_lang$core$Basics$toString(recipe)),
				signal: A2(_merivale$victor$Interface_Model_Types$AddElaboration, index, recipe),
				title: A2(
					_elm_lang$core$Basics_ops['++'],
					'Add ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$String$dropLeft,
							4,
							_elm_lang$core$Basics$toString(recipe)),
						' Elaboration'))
			});
	});
var _merivale$victor$Object$elaborationButtons = F2(
	function (index, plus) {
		var $class = plus ? 'elaborations active' : 'elaborations';
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class($class),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					{ctor: '[]'},
					A2(
						_elm_lang$core$List$map,
						_merivale$victor$Object$elaborationButton(index),
						{
							ctor: '::',
							_0: _merivale$victor$Interface_Model_Types$MakeNEGATIVE,
							_1: {
								ctor: '::',
								_0: _merivale$victor$Interface_Model_Types$MakePAST,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Interface_Model_Types$MakePRIOR,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Interface_Model_Types$MakeDISPLACED,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Interface_Model_Types$MakeREGULAR,
											_1: {
												ctor: '::',
												_0: _merivale$victor$Interface_Model_Types$MakePREORDAINED,
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
							_merivale$victor$Object$elaborationButton(index),
							{
								ctor: '::',
								_0: _merivale$victor$Interface_Model_Types$MakeEXTENDED,
								_1: {
									ctor: '::',
									_0: _merivale$victor$Interface_Model_Types$MakeSCATTERED,
									_1: {
										ctor: '::',
										_0: _merivale$victor$Interface_Model_Types$MakeINDIRECT,
										_1: {
											ctor: '::',
											_0: _merivale$victor$Interface_Model_Types$MakeENUMERATED,
											_1: {
												ctor: '::',
												_0: _merivale$victor$Interface_Model_Types$MakeAMASSED,
												_1: {ctor: '[]'}
											}
										}
									}
								}
							})),
					_1: {ctor: '[]'}
				}
			});
	});
var _merivale$victor$Object$plusButton = F2(
	function (index, plus) {
		var signal = (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) ? _merivale$victor$Interface_Model_Types$TogglePlus : _merivale$victor$Interface_Model_Types$ToggleElaborationPlus(index);
		return plus ? _merivale$victor$Interface_View_Input$iconButton(
			{label: 'minus', signal: signal, title: 'Hide Elaborations'}) : _merivale$victor$Interface_View_Input$iconButton(
			{label: 'plus', signal: signal, title: 'Show Elaborations'});
	});
var _merivale$victor$Object$elaborationBody = F4(
	function (balanceCount, index, elaboration, subContent) {
		var _p0 = elaboration.recipe;
		switch (_p0.ctor) {
			case 'MakePAST':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$pastTime, index, elaboration),
						_1: {
							ctor: '::',
							_0: subContent,
							_1: {ctor: '[]'}
						}
					});
			case 'MakeDISPLACED':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						A4(_merivale$victor$Interface_View_Elaborations$displacer, true, true, index, elaboration),
						{
							ctor: '::',
							_0: subContent,
							_1: {ctor: '[]'}
						}));
			case 'MakePREORDAINED':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						A4(_merivale$victor$Interface_View_Elaborations$displacer, false, false, index, elaboration),
						{
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$preordainedTime, index, elaboration),
							_1: {
								ctor: '::',
								_0: subContent,
								_1: {ctor: '[]'}
							}
						}));
			case 'MakeREGULAR':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						A4(_merivale$victor$Interface_View_Elaborations$displacer, false, true, index, elaboration),
						{
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$frequency, index, elaboration),
							_1: {
								ctor: '::',
								_0: subContent,
								_1: {ctor: '[]'}
							}
						}));
			case 'MakeEXTENDED':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$duration, index, elaboration),
						_1: {
							ctor: '::',
							_0: subContent,
							_1: {ctor: '[]'}
						}
					});
			case 'MakeSCATTERED':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A2(_merivale$victor$Interface_View_Elaborations$tally, index, elaboration),
						_1: {
							ctor: '::',
							_0: subContent,
							_1: {ctor: '[]'}
						}
					});
			case 'MakeINDIRECT':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(_merivale$victor$Interface_View_Elaborations$target, balanceCount, index, elaboration),
						_1: {
							ctor: '::',
							_0: A2(_merivale$victor$Interface_View_Elaborations$pointer, index, elaboration),
							_1: {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_View_Elaborations$haystack, index, elaboration),
								_1: {
									ctor: '::',
									_0: subContent,
									_1: {ctor: '[]'}
								}
							}
						}
					});
			case 'MakeENUMERATED':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(_merivale$victor$Interface_View_Elaborations$target, balanceCount, index, elaboration),
						_1: {
							ctor: '::',
							_0: A3(_merivale$victor$Interface_View_Elaborations$quantifier, false, index, elaboration),
							_1: {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_View_Elaborations$haystack, index, elaboration),
								_1: {
									ctor: '::',
									_0: subContent,
									_1: {ctor: '[]'}
								}
							}
						}
					});
			case 'MakeAMASSED':
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: A3(_merivale$victor$Interface_View_Elaborations$target, balanceCount, index, elaboration),
						_1: {
							ctor: '::',
							_0: A3(_merivale$victor$Interface_View_Elaborations$quantifier, true, index, elaboration),
							_1: {
								ctor: '::',
								_0: A2(_merivale$victor$Interface_View_Elaborations$haystack, index, elaboration),
								_1: {
									ctor: '::',
									_0: subContent,
									_1: {ctor: '[]'}
								}
							}
						}
					});
			default:
				return A2(
					_elm_lang$html$Html$div,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('body'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: subContent,
						_1: {ctor: '[]'}
					});
		}
	});
var _merivale$victor$Object$elaborationHeading = F2(
	function (index, elaboration) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('heading'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(_merivale$victor$Object$plusButton, index, elaboration.plus),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('title'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(
								A2(
									_elm_lang$core$String$dropLeft,
									4,
									_elm_lang$core$Basics$toString(elaboration.recipe))),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Input$iconButton(
							{
								label: 'close',
								signal: _merivale$victor$Interface_Model_Types$RemoveElaboration(index),
								title: 'Remove Elaboration'
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Object$elaborationInput = F4(
	function (balanceCount, index, elaboration, subContent) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('elaboration'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(_merivale$victor$Object$elaborationHeading, index, elaboration),
				_1: {
					ctor: '::',
					_0: A2(_merivale$victor$Object$elaborationButtons, index, elaboration.plus),
					_1: {
						ctor: '::',
						_0: A4(_merivale$victor$Object$elaborationBody, balanceCount, index, elaboration, subContent),
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _merivale$victor$Object$nucleusBody = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('body'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _merivale$victor$Interface_View_Nucleus$object(model.object),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Interface_View_Nucleus$verbality(model.verbality),
					_1: {
						ctor: '::',
						_0: _merivale$victor$Interface_View_Nucleus$status(model.status),
						_1: {ctor: '[]'}
					}
				}
			},
			A2(_elm_lang$core$List$indexedMap, _merivale$victor$Interface_View_Nucleus$balance, model.balances)));
};
var _merivale$victor$Object$nucleusHeading = function (model) {
	var addButton = _merivale$victor$Interface_View_Input$iconButton(
		{label: 'plus', signal: _merivale$victor$Interface_Model_Types$AddBalance, title: 'Add Balance'});
	var removeButton = _merivale$victor$Interface_View_Input$iconButton(
		{label: 'close', signal: _merivale$victor$Interface_Model_Types$RemoveBalance, title: 'Remove Balance'});
	var title = A2(
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
	return (_elm_lang$core$Native_Utils.cmp(
		_elm_lang$core$List$length(model.balances),
		0) > 0) ? A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('heading'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(_merivale$victor$Object$plusButton, -1, model.plus),
			_1: {
				ctor: '::',
				_0: title,
				_1: {
					ctor: '::',
					_0: removeButton,
					_1: {
						ctor: '::',
						_0: addButton,
						_1: {ctor: '[]'}
					}
				}
			}
		}) : A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('heading'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(_merivale$victor$Object$plusButton, -1, model.plus),
			_1: {
				ctor: '::',
				_0: title,
				_1: {
					ctor: '::',
					_0: addButton,
					_1: {ctor: '[]'}
				}
			}
		});
};
var _merivale$victor$Object$nucleusInput = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('nucleus'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _merivale$victor$Object$nucleusHeading(model),
			_1: {
				ctor: '::',
				_0: A2(_merivale$victor$Object$elaborationButtons, -1, model.plus),
				_1: {
					ctor: '::',
					_0: _merivale$victor$Object$nucleusBody(model),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _merivale$victor$Object$input = F2(
	function (elaborations, model) {
		var _p1 = _elm_lang$core$List$head(elaborations);
		if (_p1.ctor === 'Nothing') {
			return _merivale$victor$Object$nucleusInput(model);
		} else {
			var subContent = A2(
				_merivale$victor$Object$input,
				A2(_elm_lang$core$List$drop, 1, elaborations),
				model);
			var index = _elm_lang$core$List$length(elaborations) - 1;
			return A4(
				_merivale$victor$Object$elaborationInput,
				_elm_lang$core$List$length(model.balances),
				index,
				_p1._0,
				subContent);
		}
	});
var _merivale$victor$Object$view = function (model) {
	var result = A2(
		_elm_lang$core$Result$andThen,
		_merivale$victor$Theory_Object_Sentences$sentence,
		_merivale$victor$Interface_Messages_Object$message(model));
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _merivale$victor$Interface_View_Output$output(result),
			_1: {
				ctor: '::',
				_0: _merivale$victor$Interface_View_Examples$examples(_merivale$victor$Interface_Model_Types$ObjectTheory),
				_1: {
					ctor: '::',
					_0: A2(
						_merivale$victor$Object$input,
						_elm_lang$core$List$reverse(model.elaborations),
						model),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _merivale$victor$Object$main = _elm_lang$html$Html$beginnerProgram(
	{
		model: _merivale$victor$Interface_Model_State$initial(_merivale$victor$Interface_Model_Types$ObjectTheory),
		update: _merivale$victor$Interface_Model_State$update,
		view: _merivale$victor$Object$view
	})();

var Elm = {};
Elm['Object'] = Elm['Object'] || {};
if (typeof _merivale$victor$Object$main !== 'undefined') {
    _merivale$victor$Object$main(Elm['Object'], 'Object', undefined);
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

