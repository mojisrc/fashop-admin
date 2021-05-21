import React from 'react';
import {getIntl} from "umi"

/**
 * 获取指定 id 国际化内容, 简化函数名
 */
function formatMessage ({id}) {

    return getIntl().messages[id] || key;
}
export  {
    formatMessage
}
