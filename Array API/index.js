const currentArrayAPI = 'concat';

switch (currentArrayAPI) {
    case 'length':
        const exp00 = [1, 2, 3, 4, 5];
        const exp01 = [];

        // 1. get array length
        var len = exp00.length;  // len = 5
        console.log('1. exp00\'s length: ', len);

        // 2. as a filter condition
        if (len > 0) {
            // dosomething
            console.log('2. dosometh when len more than 0');
        }

        // 3. get the last sub item
        var last = exp00[len - 1];
        console.log('3. last item is:', last);

        // 4. clone an array
        var new_ = exp00.slice(0);
        // var new_ = exp00.concat();
        console.log('4. new array:', new_);

        // 5. change length will change origin array
        new_.length = 4;
        console.log('5. after change new_ length', new_) ; // [1, 2, 3, 4]
        break;

    case 'concat':
        var exap0 = [1, 2, 3];
        var exap1 = ['a', 'b'];
        var exap2 = [[1, 2], [4, 2], [5, 6]];

        // 1. concat arrays
        var new_ = exap0.concat(exap1);
        // equal as :  [].concat(exap0, exap1);
        console.log('1.', new_); // [1, 2, 3, 'a', b]

        // 2. 二维数组的降维处理
        // The worst way
        var new_ = [];
        exap2.forEach(item => {
            item.forEach(subItem => new_.push(subItem));
        })
        console.log('new_:', new_);

        // by concat and forEach
        var new2_ = [];
        exap2.forEach(item => new2_ = new2_.concat(item));
        console.log('new2_', new2_);

        // by reduce and concat
        var new3_ = exap2.reduce((prev, next) => prev.concat(next), []);
        console.log('new3_', new3_);

        // by apply and concat
        var new4_ = Array.prototype.concat.apply([], exap2);
        console.log('new4_', new4_);
        break;



    default:

}
