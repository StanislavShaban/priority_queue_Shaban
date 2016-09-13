class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left === null){
			node.parent = this;
			this.left = node;
		}
		else if(this.right === null){
			node.parent = this;
			this.right = node; 
		}
	}

	removeChild(node) {
		if(node === this.left){
			this.left = null;
		}
		else if(node === this.right){
			this.right = null;
		}
		else{
			throw new Error("Is not a child of this node.");
		}
		node.parent = null;
	}

	remove() {
		if(this.parent !== null){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent !== null){
			let setParentIfNotNull = (node, parent) => { if(node instanceof Node){node.parent = parent;}}
			let parent = this.parent;

			if(parent.parent !== null){
				if(parent.parent.left === parent){
					parent.parent.left = this;
				}else{
					parent.parent.right = this;
				}
			}
			this.parent = parent.parent;
			parent.parent = this;

			if(parent.right === this){
				let left = parent.left;
				parent.left = this.left;
				setParentIfNotNull(parent.left, parent);
				parent.right = this.right;
				setParentIfNotNull(parent.right, parent);
				this.right = parent;
				this.left = left;
				setParentIfNotNull(left, this);
			}else{
				let right = parent.right;
				parent.left = this.left;
				setParentIfNotNull(parent.left, parent);
				parent.right = this.right;
				setParentIfNotNull(parent.right, parent);
				this.left = parent;
				this.right = right;
				setParentIfNotNull(right, this);
			}
		}
	}
}

module.exports = Node;
