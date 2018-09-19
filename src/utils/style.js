export const PublicStylesString = {
    BottomUnderlayColor:'#333',                         //底部按钮按下去的高量颜色
    borderColor:'#f1f1f1',                              //边框颜色
    ListButtonUnderlayColor:'#f7f7f7',                  //列表按钮按下去的高亮颜色
    grayColor:'#CAC9CF',                                //辅助性文字的浅灰色
    DaZhongColor:'#FF6633',                             //大众点评的主体颜色，橙色
    DaZhongButtonUnderlayColor : '#e55b2d',                    //大众点评按钮按下去的高亮颜色
    DaZhongSearchBarActiveColor : '#D8B494',            //大众点评筛选项高亮的颜色
    DaZhongButtonActiveColor : '#FEF1ED',            //大众点评筛选项按钮高亮的背景颜色
    backgroundColor : '#f2f2f2',                        //主题背景颜色
    ThemeColor : '#ff7b23',                             //主题颜色
}

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
