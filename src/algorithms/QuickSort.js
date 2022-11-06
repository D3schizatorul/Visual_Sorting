function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function QuickSort(arr, start, end) {
  const sortSpeed = Number(document.getElementById("sort-speed").innerHTML);
  // Base case or terminating case
  if (start >= end) {
    return;
  }

  // Taking the last element as the pivot
  const pivotValue = arr[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      document.querySelector(`.bar-${arr[i]}`).style.order = `${i}`;
      document.querySelector(`.bar-${arr[pivotIndex]}`).style.order = `${pivotIndex}`;
      document.querySelector(`.bar-${arr[i]}`).style.background = "red";
      document.querySelector(`.bar-${arr[pivotIndex]}`).style.background = "green";
      await sleep(sortSpeed);
      document.querySelector(`.bar-${arr[i]}`).style.background = "#808080";
      document.querySelector(`.bar-${arr[pivotIndex]}`).style.background = "#808080";
      // Moving to next element
      pivotIndex++;
    }
  }

  // Putting the pivot value in the middle
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  document.querySelector(`.bar-${arr[end]}`).style.order = `${end}`;
  document.querySelector(`.bar-${arr[pivotIndex]}`).style.order = `${pivotIndex}`;
  document.querySelector(`.bar-${arr[end]}`).style.background = "purple";
  document.querySelector(`.bar-${arr[pivotIndex]}`).style.background = "yellow";
  await sleep(sortSpeed);
  document.querySelector(`.bar-${arr[end]}`).style.background = "#808080";
  document.querySelector(`.bar-${arr[pivotIndex]}`).style.background = "#808080";

  // Recursively apply the same logic to the left and right subarrays
  await QuickSort(arr, start, pivotIndex - 1);
  await QuickSort(arr, pivotIndex + 1, end);
  console.log(arr);
}

export default QuickSort;
