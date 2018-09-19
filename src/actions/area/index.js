import { Fetch } from "../../utils";
import { AreaApi } from "../../config/api/area"

export const getAreaList = ({ params }) => {
    return Fetch.fetch({ api: AreaApi.list, params })
}

export const getCascaderAreaList = async () => {
    const e = await getAreaList({ params: { level: 2, tree: 1 } })
    if (e.code === 0) {
        const { list } = e.result
        return list.map((item) => {
            return {
                value: item.id,
                label: item.name,
                children: item._child.length > 0 ? item._child.map((sub) => {
                    return {
                        value: sub.id,
                        label: sub.name,
                        children: sub._child.length > 0 ? sub._child.map((area) => {
                            return {
                                value: area.id,
                                label: area.name
                            }
                        }) : []
                    }
                }) : []
            }
        })
    } else {
        return []
    }
}

export const getKeyAreaList = async () => {
    const e = await getAreaList({ params: { level: 2 } })
    if (e.code === 0) {
        const { list } = e.result
        let _list = []
        for (let i = 0; i < list.length; i++) {
            _list[list[i]['id']] = {
                name: list[i].name
            }
        }
        return _list
    } else {
        return []
    }
}
