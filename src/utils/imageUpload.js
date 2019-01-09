import { Fetch } from './index'
import { message } from "antd";
import { ImageApi } from "../config/api/image"

export default ({ file, onSuccess, is_save }) => {
    const reader = new FileReader();
    reader.onload = async (a) => {
        const dataURL = a.target.result;
        const e = await Fetch.fetch({
            api: ImageApi.add,
            params: {
                image: dataURL,
                is_save,
            }
        })
        if (e.code === 0) {
            onSuccess(e.result)
        } else {
            message.warning(e.msg)
        }
    }
    reader.readAsDataURL(file);
}
