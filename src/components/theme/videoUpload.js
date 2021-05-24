import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    Platform
} from 'react-native';
import { ThemeStyle, windowWidth, PublicStyles } from '@/utils/style';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "@/utils/react-native-image-picker";
// import * as Progress from "react-native-progress";

export default class ThemeVideoUpload extends Component {
    static defaultProps = {
        text: '上传视频',
    }
    state = {
        video: null,
        videoLoading: false,
        videoUri: null,
        desc: null,
        // video_cover: null,
        images: [],
        progressNumber: 0,
    }
    render() {
        const { video, videoLoading, progressNumber } = this.state;
        const { text } = this.props
        return (
            <View style={styles.View3}>
                {
                    videoLoading ? <View style={styles.View6}>
                        <Text style={{ color: '#333', fontSize: 15, marginBottom: 10, }}>上传进度：{progressNumber}%</Text>
                        <Progress.Bar progress={progressNumber / 100} width={300} color={ThemeStyle.themeColor} />
                    </View> :
                    video ? <ImageBackground
                        source={{ uri: 'http://tjcdpet.com/upload/video/153622216741428.mp4' }}
                        style={styles.image1}
                    >
                        <FontAwesomeIcon
                            name={'trash'}
                            color={ThemeStyle.themeColor}
                            size={40}
                            style={{
                                backgroundColor: 'rgba(0,0,0,0)',
                            }}
                            onPress={() => {
                                this.setState({
                                    video: null,
                                    videoLoading: false,
                                    videoUri: null,
                                    video_cover: null,
                                })
                            }}
                        />
                    </ImageBackground>
                    : <TouchableOpacity
                        activeOpacity={1}
                        style={styles.button1}
                        onPress={this.videoUpload}
                    >
                        <MaterialCommunityIcons
                            name='video-plus'
                            size={32}
                            color={ThemeStyle.themeColor}
                        />
                        <Text style={[PublicStyles.desc1, { color: '#333' }]}>{text}</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
    videoUpload = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'video',
        }
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) {
                alert('系统异常，请稍后再试')
            } else if (response.didCancel) {
            } else {
                console.log('response', response);
                this.updateVideo({
                    uri: response.uri,
                    filename: Platform.OS==='ios' ? response.fileName : response.path
                })
            }
        })
    }
    // breed_dog
    updateVideo = async ({uri,filename}) => {
        filename = filename.replace(/ /g, '-')
        // const type = filename.split('.')[filename.split('.').length-1]
        let formData = new FormData();
        formData.append("video", {
            uri,
            type: 'video',
            name: filename
        })
        formData.append("dog_type", 'breed_dog')
        // const e = await Fetch.formData(`${env.apiHost}/Api/Upload/videos`,formData)
        // console.log('handleChange',e);
        // if(e.code===0){
        //     // uploadFunc(e.result)
        //     // this.triggerChange();
        // }
        this.setState({
            videoLoading: true,
        })
        try{
            // const { data:e } = await axios({
            //     method: 'post',
            //     headers: {
            //         ...getHeaders(),
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     url: `${env.apiHost}/Api/Upload/videos`,
            //     data: formData,
            //     onUploadProgress:  (progressEvent)=>{
            //         const progressNumber = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            //         this.setState({
            //             progressNumber,
            //         })
            //     },
            // })
            // console.log(e);
            // if(e.code===0){
            //     this.props.onChange(e.data.url)
            //     this.setState({
            //         video: e.data.url,
            //         videoLoading: false,
            //         videoUri: uri,
            //         // video_cover: e.data.url,
            //         progressNumber: 0,
            //     })
            // }else{
            //     Toast.info(e.msg)
            // }
        }catch(err){
            alert(`uploadVudio error is ${err}`)
        }
    }
}

const styles = StyleSheet.create({
    View3: {
        alignItems: 'center',
    },
    button1: {
        height: windowWidth/2,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#EEEEEE',
    },
    View6: {
        height: windowWidth/2,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image1: {
        height: windowWidth/2,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
