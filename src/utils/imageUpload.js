import { Fetch } from "./index";
import { message } from "antd";
import upload from "@/services/upload";

export default ({ file, onSuccess, is_save, folder_id ,name}) => {
    const reader = new FileReader();
    reader.onload = async (a) => {
        const dataURL = a.target.result;
        const e = await upload.addImage({
            image: dataURL,
            is_save,
            folder_id,
            name
        });
        if (e.code === 0) {
            let result = e.result
            result['file'] = file
            onSuccess(result);
        } else {
            message.warning(e.msg);
        }
    };
    reader.readAsDataURL(file);
}
