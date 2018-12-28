import smartTree from "smart-arraytotree";
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
            if (typeof item["children"] !== "undefined") {
                delete item.children;
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

    /**
     * 补全tree结构的children
     * 方便在需要必须每级都包含children的时候使用
     */
    static toTreeFillChildren(list) {
        return smartTree(list, { id: 'id', pid: 'pid', firstPid: 0,children:'children' })
        // var map = {};
        // list.map(function(item) {
        //     item["children"] = [];
        //     map[item.id] = item;
        // });
        // const findParent = (pid,children) => {
        //      map[pid].children.push(children)
        // }
        // for (let index in map){
        //     if(map[index].pid !== 0 ){
        //         findParent(map[index].pid,map[index])
        //     }
        // }
        //
        // list.map(function(item) {
        //     if (item.pid !== 0) {
        //         map[item.pid]["children"].push(item);
        //     }
        // });
        // return list.filter(function(item) {
        //     if (item.pid === 0) {
        //         return item;
        //     }
        // });
    }

}
