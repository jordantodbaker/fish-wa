const binSearch = (arr, val) => {
  let halfIDX = Math.floor(arr.length / 2);
  console.log("arr", arr);
  console.log("val", val);
  console.log("Half IDX: ", halfIDX);
  console.log("arr[idx]", arr[halfIDX]);

  if (halfIDX == 0) {
    return 0;
  }

  if (arr[halfIDX] === val) {
    console.log("WE HERE DOG", halfIDX);
    return halfIDX;
    s;
  } else if (arr[halfIDX] > val) {
    console.log("next slice higher: ", arr.slice(0, halfIDX));

    binSearch(arr.slice(halfIDX), val);
  } else {
    console.log("next slice lower: ", arr.slice(halfIDX + 1));

    binSearch(arr.slice(-halfIDX), val);
  }
};

var arr = [1, 12, 23, 34, 45, 69, 75, 82, 91, 100];
console.log(binSearch(arr, 82));
