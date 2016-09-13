const MaxHeap = require('./max-heap.js');
var curr_data = 0;
var node_count = 0;

class PriorityQueue {
	constructor(maxSize) {
		if(maxSize != null){
			this.maxSize = maxSize;
		}else{
			this.maxSize = 30;
		}
		let max_heap = new MaxHeap();
		this.heap = max_heap;
	}

	push(data, priority) {
		
		if(node_count < this.maxSize) {
			this.heap.push(data, priority);
			curr_data = data;
			node_count = node_count + 1;
		} else if(node_count >= this.maxSize) { throw new Error("queue has max size"); }
		
	}

	shift() {
		
		if(node_count > 0) {
			this.heap.pop();
			return curr_data;
			node_count = node_count - 1;
		} else {
			throw new Error("queue is empty!");
		}	
	}

	size() {
		return node_count;
	}

	isEmpty() {
		if(node_count == 0) { return true; }
		else { return false; }
	}
}

module.exports = PriorityQueue;
