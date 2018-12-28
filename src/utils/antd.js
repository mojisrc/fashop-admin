export default class Antd {
    static treeData(list) {
        return list.map((e) => {
            return {
                title: e.name,
                value: `${e.id}`,
                key: `${e.id}`,
                children: Antd.treeData(e.children || [])
            };
        });
    };

    static cascaderData(list) {
        return list.map((e) => {
            if (e.children) {
                return {
                    label: `${e.name}`,
                    value: `${e.id}`,
                    key: `${e.id}`,
                    children: Antd.cascaderData(e.children || [])
                };
            } else {
                return {
                    label: `${e.name}`,
                    value: `${e.id}`,
                    key: `${e.id}`
                };
            }

        });
    };
}
