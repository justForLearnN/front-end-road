/*

使用给定的参数对字符串执行一次查找和替换，然后返回新字符串。

第一个参数是将要对其执行查找和替换的字符串。

第二个参数是将被替换掉的单词（替换前的单词）。

第三个参数用于替换第二个参数（替换后的单词）。

注意：替换时保持原单词的大小写。例如，如果你想用单词 "dog" 替换单词 "Book" ，你应该替换成 "Dog"。

 */

function myReplace(str, before, after) {
    return str.replace(new RegExp(before), () => {
        if (before[0] === before[0].toUpperCase()) {
            after = after.replace(after[0], after[0].toUpperCase());
        }
        return after;
    });
}

console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));
