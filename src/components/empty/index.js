import React from "react";
import styles from "./index.css";

const ListEmpty = ()=>(
    <div className={styles.listEmpty}>
        <img
            src={require("./list-empty.png")}
        />
        <span>暂无数据</span>
    </div>
)

export  {
    ListEmpty
}
