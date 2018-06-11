function forEach(arr, callback) [
  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}
