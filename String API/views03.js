// 获取文件后缀名
// file.png  -> png
// file.txt -> txt

function getSuffix(fileName) {
    return fileName.substring(fileName.lastIndexOf('.') + 1);
}

console.log(getSuffix('file.tes.png'));
