// 冒泡
const sort = arr => {
    var temp = null;
    for(var i = 0; i < arr.length; i++) {
        for(var j = i; j < arr.length; j ++) {
            if (arr[i] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}

var arr = [3, 1, 4, 9, 2, 100, 88, 65, 2, 12];
console.log(sort(arr));
