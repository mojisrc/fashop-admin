export default class Arr {
    static inArray(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 该方法用于将有父子关系的数组转换成树形结构的数组
     * 接收一个具有父子关系的数组作为参数
     * 返回一个树形结构的数组
     */
    static toTree(data) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function (item) {
            delete item.children;
        });

        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {};
        data.forEach(function (item) {
            map[item.id] = item;
        });
        var val = [];
        data.forEach(function (item) {
            var parent = typeof map[item.pid] ==="undefined" ? null : map[item.pid];
            if (parent) {
                (parent.children || ( parent.children = [] )).push(item);
            } else {
                val.push(item);
            }
        });
        return val;
    }

}
