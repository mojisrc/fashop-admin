import OSS from "ali-oss";

export default class Oss {
    put(imageBase64String) {
        const client = new OSS({
            region: "oss-cn-beijing",
            accessKeyId: "",
            accessKeySecret: "",
            bucket: ""
        });
        client.list().then((result) => {
            console.log("objects: %j", result.objects);
            let file = this.dataURLtoFile(imageBase64String, "my-obj.png");
            return client.put("my-obj.png", file, {
                mime: "image/jpeg"
            });
        }).then((result) => {
            console.log("put result: %j", result);
            return client.get("my-obj.png");
        }).then((result) => {
            console.log("get result: %j", result.content.toString());
        });
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
}
