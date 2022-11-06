function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function heapify(heap, i, max) {
  const sortSpeed = document.getElementById("sort-speed").innerHTML;
  let index;
  let leftChild;
  let rightChild;

  while (i < max) {
    index = i;
    // Get the left child index using the known formula
    leftChild = 2 * i + 1;
    // Get the right child index using the known formula
    rightChild = leftChild + 1;

    // If the left child is not last element and its value is bigger
    if (leftChild < max && heap[leftChild] > heap[index]) {
      index = leftChild;
    }

    // If the right child is not last element and its value is bigger
    if (rightChild < max && heap[rightChild] > heap[index]) {
      index = rightChild;
    }

    // If none of the above conditions is true just return
    if (index === i) {
      return;
    }

    // Else swap elements
    document.querySelector(`.bar-${heap[i]}`).style.background = "red";
    document.querySelector(`.bar-${heap[index]}`).style.background = "green";
    document.querySelector(`.bar-${heap[i]}`).style.order = `${index}`;
    document.querySelector(`.bar-${heap[index]}`).style.order = `${i}`;
    [heap[i], heap[index]] = [heap[index], heap[i]];
    await sleep(sortSpeed);
    document.querySelector(`.bar-${heap[i]}`).style.background = "#808080";
    document.querySelector(`.bar-${heap[index]}`).style.background = "#808080";
    // Continue by using the swapped index
    i = index;
  }
}

async function HeapSort(arr) {
  const sortSpeed = document.getElementById("sort-speed").innerHTML;
  // Get index of the middle element
  let i = Math.floor(arr.length / 2 - 1);

  // Build a max heap out of all array elements passed in
  while (i >= 0) {
    heapify(arr, i, arr.length - 1);
    i -= 1;
  }

  // Get the index of the last element
  let lastElement = arr.length - 1;

  // Continue heap sorting until we have one element left
  while (lastElement >= 0) {
    document.querySelector(`.bar-${arr[0]}`).style.background = "purple";
    document.querySelector(`.bar-${arr[lastElement]}`).style.background = "yellow";
    document.querySelector(`.bar-${arr[0]}`).style.order = `${lastElement}`;
    document.querySelector(`.bar-${arr[lastElement]}`).style.order = `${0}`;
    [arr[0], arr[lastElement]] = [arr[lastElement], arr[0]];
    await sleep(sortSpeed);
    document.querySelector(`.bar-${arr[0]}`).style.background = "#808080";
    document.querySelector(`.bar-${arr[lastElement]}`).style.background = "#808080";
    await heapify(arr, 0, lastElement);
    lastElement -= 1;
  }

  // Return sorted array
  return arr;
}

export default HeapSort;
