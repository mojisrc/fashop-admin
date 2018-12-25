export default class Arr {
    static inArray(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                return true;
            }
        }
        return false;
    }

    static toTree(list) {
        var map = {};
        list.forEach(function(item) {
            map[item.id] = item;
            // 不理解为什么在这儿会出现重复值 临时解决方案
            if(typeof item["children"] !== "undefined"){
                delete item.children
            }
        });
        list.forEach(function(item) {
            if (item.pid !== 0) {
                typeof map[item.pid]["children"] !== "undefined" ? map[item.pid]["children"].push(item) : map[item.pid]["children"] = [item];
            }
        });
        return list.filter(function(item) {
            if (item.pid === 0) {
                return item;
            }
        });
    }
}
