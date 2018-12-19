export const ThemeStyle = {
    themeColor : '#188fff',                 //主题蓝
    themeColor1 : '#f76260',                 //主题红
    themeColor2 : '#faa202',             //主题黄
    themeColor3 : '#2ad2c9',                        //主题蓝绿色
    themeSubColor : '#333',                        //主题次黑
    themeBorderColor : '#e3e3e3',
}

export const windowHeight = window.innerHeight;
export const windowWidth = window.innerWidth;

const remString = window.getComputedStyle(document.documentElement)["fontSize"]
export const rem = Number(remString.substring(0,remString.indexOf('px')))
