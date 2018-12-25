export default class Antd {
    static treeData = (list) => {
        return list.map((e) => {
            return {
                title: e.name,
                value: `${e.id}`,
                key: `${e.id}`,
                children: Antd.treeData(e.children || [])
            };
        });
    };

}
