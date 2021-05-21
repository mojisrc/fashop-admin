import { StyleSheet, Platform } from "react-native";
import { AntTheme } from "@/config/theme"
export const windowHeight = window.innerHeight;
export const windowWidth = window.innerWidth;
export const ThemeStyle = {
    themeColor: '#188fff',                 //主题蓝
    themeColor1: '#f76260',                 //主题红
    themeColor2: '#faa202',             //主题黄
    themeColor3: '#2ad2c9',                        //主题蓝绿色
    themeSubColor: '#333',                        //主题次黑
    themeBorderColor: '#e3e3e3',
}

export const PublicStylesString = {
    BottomUnderlayColor: '#333',                         //底部按钮按下去的高量颜色
    borderColor: '#f1f1f1',                              //边框颜色
    ListButtonUnderlayColor: '#f7f7f7',                  //列表按钮按下去的高亮颜色
    GrayColor: '#CAC9CF',                                //辅助性文字的浅灰色
    MainColor: AntTheme.brand_primary,                             //主体颜色，橙色
    ButtonUnderlayColor: '#e55b2d',                    //按钮按下去的高亮颜色
    SearchBarActiveColor: AntTheme.brand_primary_tap,            //筛选项高亮的颜色
    ButtonActiveColor: '#FEF1ED',            //筛选项按钮高亮的背景颜色
    backgroundColor: '#F8F8F8',                        //主题背景颜色
    themeColor: AntTheme.brand_primary,                             //主题颜色
}
export const PublicStyles = StyleSheet.create({
    viewOut: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    viewOut2: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: "center",
        alignItems: "center",
    },
    viewMax: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    centerTitleStyle: {
        ...Platform.select({
            ios: {
                width: windowWidth,
                alignItems: 'center',
            },
            android: {
                width: windowWidth - 40,
                alignItems: 'center',
                marginLeft: -20,
            },
        }),
    },
    borderColor: {
        borderColor: PublicStylesString.borderColor,
    },
    backgroundColor: {
        backgroundColor: '#F8F8F8',
    },
    boldTitle: {                                     // 适用于加粗标题
        fontSize: 16,
        color: '#333333',
        fontFamily: 'PingFangSC-Medium',
    },
    title: {                                     // 适用于普通标题
        fontSize: 16,
        color: '#333',
        fontFamily: 'PingFangSC-Regular',
    },
    font: {
        color: '#333',
        fontFamily: 'PingFangSC-Regular'
    },
    descFour9: {                                     // 普通描述
        fontSize: Platform.OS === "ios" ? 14 : 13,
        color: '#999',
        fontFamily: 'PingFangSC-Regular'
    },
    desc9: {                                     // 普通描述
        fontSize: 13,
        color: '#999',
        fontFamily: 'PingFangSC-Regular'
    },
    desc6: {                                     // time 描述
        fontSize: 13,
        color: '#666',
        fontFamily: 'PingFangSC-Regular'
    },
    descc: {                                     // time 描述
        fontSize: 13,
        color: '#ccc',
        fontFamily: 'PingFangSC-Regular'
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetweenCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activeDot: {                                 //全局轮播激活的小圆圈
        backgroundColor: '#333',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    dot: {                                       //全局轮播未激活的小圆圈
        backgroundColor: '#fff',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
    paginationStyle: {                           //全局轮播按钮放置的位置
        bottom: 5,
        justifyContent: 'flex-end',
        right: 10,
    },
    defaultBtn: {
        borderWidth: 0.5,
        borderColor: '#eaeaea',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44,
    },
    primaryBtn: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44,
        backgroundColor: ThemeStyle.themeColor,
        borderWidth: 0,
    },
    primaryBtn2: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44,
        backgroundColor: ThemeStyle.themeColor,
        borderWidth: 0,
    },
    defaultBtnText: {
        color: '#333',
        fontSize: 17
    },
    primaryBtnText: {
        color: '#fff',
        fontSize: 17
    },
    overseasTag: {
        backgroundColor: '#ED486F',
        color: '#fff',
        borderRadius: 3,
        paddingVertical: 2,
        overflow: 'hidden',
        fontSize: 10,
    },
    seckillTag: {
        backgroundColor: '#F6003C',
        color: '#fff',
        borderRadius: 3,
        paddingVertical: 2,
        overflow: 'hidden',
        fontSize: 10,
    }
})




const remString = window.getComputedStyle(document.documentElement)["fontSize"]
export const rem = Number(remString.substring(0, remString.indexOf('px')))
