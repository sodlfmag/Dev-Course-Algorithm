/**
 * 왼쪽 자식의 index = 부모의 index * 2 + 1
 * 오른쪽 자식의 index = (부모의 index * 2) + 2
 * 부모의 index = Math.floor((자식의 index - 1) / 2)
 */
class MinHeap {
    constructor(heap = []) {
        this.heap = [];
        heap.forEach(e => this.push(e));
    }

    size() {
        return this.heap.length;
    }

    _swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    push(value) {
        this.heap.push(value);
        this._bubbleUp();
    }

    pop() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const value = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown();
        return value;
    }

    _bubbleUp() {
        let index = this.heap.length - 1;
        let parentIdx = Math.floor((index - 1) / 2);
        while (this.heap[parentIdx] && this.heap[index] < this.heap[parentIdx]) {
            this._swap(index, parentIdx);
            index = parentIdx;
            parentIdx = Math.floor((index - 1) / 2);
        }
    }

    _bubbleDown() {
        let index = 0;
        let leftIdx = index * 2 + 1;
        let rightIdx = index * 2 + 2;

        while (
            (this.heap[leftIdx] && this.heap[leftIdx] < this.heap[index]) ||
            (this.heap[rightIdx] && this.heap[rightIdx] < this.heap[index])
        ) {
            let smallerIdx = leftIdx;
            if (
                this.heap[rightIdx] &&
                this.heap[rightIdx] < this.heap[smallerIdx]
            ) {
                smallerIdx = rightIdx;
            }

            this._swap(index, smallerIdx);
            index = smallerIdx;
            leftIdx = index * 2 + 1;
            rightIdx = index * 2 + 2;
        }
    }

    sum() {
        return this.heap.reduce((acc, curr) => acc + curr, 0);
    }
}

function solution(ability, number) {
    const abilityHeap = new MinHeap(ability);
    for (let i = 0; i < number; i++) {
        const min1 = abilityHeap.pop();
        const min2 = abilityHeap.pop();
        abilityHeap.push(min1 + min2);
        abilityHeap.push(min1 + min2);
    }
    return abilityHeap.sum();
}