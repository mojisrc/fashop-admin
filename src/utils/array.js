import arrayToTree from "smart-arraytotree";

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
        return arrayToTree(list, { id: "id", pid: "pid", firstPid: 0, children: "children" }) ?? [];
    }

    /**
     * 补全tree结构的children
     * 方便在需要必须每级都包含children的时候使用
     */
    static toTreeFillChildren(list) {
        list.map(function(item, index) {
            list[index]["children"] = [];
        });
        return arrayToTree(list, { id: "id", pid: "pid", firstPid: 0, children: "children" }) ?? [];
    }

}
