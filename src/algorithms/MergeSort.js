function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
async function MergeSort(arr, left, right) {
  const sortSpeed = document.getElementById("sort-speed").innerHTML;
  
  if (left >= right) {
    return; //returns recursively
  }
  let mid = left + parseInt((right - left) / 2);
  await MergeSort(arr, left, mid);
  await MergeSort(arr, mid + 1, right);

  let n1 = mid - left + 1;
  let n2 = right - mid;

  // Create temp arrays
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }

  for (var j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }
  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  i = 0;
  // Initial index of second subarray
  j = 0;
  // Initial index of merged subarray
  let k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      document.querySelector(`.bar-${arr[k]}`).style.background = "green";
      document.querySelector(`.bar-${arr[k]}`).style.order = `${k}`;
      i++;
    } else {
      arr[k] = R[j];
      document.querySelector(`.bar-${arr[k]}`).style.background = "green";
      document.querySelector(`.bar-${arr[k]}`).style.order = `${k}`;
      j++;
    }
    await sleep(sortSpeed);
    document.querySelector(`.bar-${arr[k]}`).style.background = "#808080";
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    document.querySelector(`.bar-${arr[k]}`).style.background = "purple";
    document.querySelector(`.bar-${arr[k]}`).style.order = `${k}`;
    await sleep(sortSpeed);
    document.querySelector(`.bar-${arr[k]}`).style.background = "#808080";
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = R[j];
    document.querySelector(`.bar-${arr[k]}`).style.background = "purple";
    document.querySelector(`.bar-${arr[k]}`).style.order = `${k}`;
    await sleep(sortSpeed);
    document.querySelector(`.bar-${arr[k]}`).style.background = "#808080";
    j++;
    k++;
  }
}

export default MergeSort;
