function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function BubbleSort(arr, n) {
  const sortSpeed = document.getElementById("sort-speed").innerHTML;
  let i, j;
  for (i = 0; i < n; i++) {
    for (j = 0; j < n - i; j++) {
      if (arr[j] > arr[j + 1]) {
        document.querySelector(`.bar-${arr[j + 1]}`).style.background = "red";
        document.querySelector(`.bar-${arr[j]}`).style.background = "green";
        document.querySelector(`.bar-${arr[j]}`).style.order = `${j + 1}`;
        document.querySelector(`.bar-${arr[j + 1]}`).style.order = `${j}`;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await sleep(sortSpeed);
        document.querySelector(`.bar-${arr[j]}`).style.background = "#808080";
        document.querySelector(`.bar-${arr[j + 1]}`).style.background = "#808080";
      }
    }
  }
}

export default BubbleSort;
