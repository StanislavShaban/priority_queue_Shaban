const Node = require('./node');

class MaxHeap {
constructor() {
	this.root = null;
	this.parentNodes = [];
}

push(data, priority) {
	let node = new Node(data, priority);
	this.insertNode(node);
	this.shiftNodeUp(node);
}

pop() {
	if (this.root !== null) {
		let node = this.restoreRootFromLastInsertedNode(this.detachRoot());
		return (node instanceof Node) ? node.data : null;
	}
}

detachRoot() {
	let root = this.root;
	if (this.parentNodes.indexOf(root) > -1) {
		this.parentNodes.splice(this.parentNodes.indexOf(root), 1);
	}
	this.root = null;
	return root;
}

restoreRootFromLastInsertedNode(detached) {
	if (this.parentNodes.length == 0) {
		return null;
	}

	let setParentIfNotNull =
	(node, parent) => { if (node instanceof Node) { node.parent = parent; } };

	this.root = this.parentNodes[this.parentNodes.length-1];
	this.root.left = detached.left;
	setParentIfNotNull(this.root.left, parent);
	this.root.right = detached.right;
	setParentIfNotNull(this.root.right, parent);
	this.root.parent = null;
	return this.root;
}

size() {
	let len = this.parentNodes.length;
	return len;
}

isEmpty() {
	if(this.parentNodes.length <= 0) return true;
	else return false;
}

clear() {
	this.root = null;
	this.parentNodes = [];

}

insertNode(node) {
	if (this.root === null) {
		this.root = node;
	} else {
		this.parentNodes[0].appendChild(node);
		if (this.parentNodes[0].right !== null) {
			this.parentNodes.shift();
		}
	}
	this.parentNodes.push(node);
}

shiftNodeUp(node) {
	if(node !== this.root) {
		if (this.root === node.parent) { this.root = node; }
		let nodeIndex = this.parentNodes.indexOf(node);
		let parentIndex = this.parentNodes.indexOf(node.parent);
		if (nodeIndex >= 0) { this.parentNodes[nodeIndex] = node.parent; }
		if (parentIndex >= 0) { this.parentNodes[parentIndex] = node; }
		node.swapWithParent();
		this.shiftNodeUp(node);
	}
}

shiftNodeDown(node) {
	if (node.left !== null && node.parent.priority < node.priority) {
		if (this.root == node) { this.root = node.left; }
		let nodeIndex = this.parentNodes.indexOf(node);
		let leftIndex = this.parentNodes.indexOf(node.left);
		if (leftIndex >= 0) { this.parentNodes[leftIndex] = node; }
		if (nodeIndex >= 0) { this.parentNodes[nodeIndex] = node.left; }
		node.left.swapWithParent();
		this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;