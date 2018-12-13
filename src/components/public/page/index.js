import React from "react";
import styles from "./index.css";
const Page = (props)=>(
    <div className={styles.page}>{props.children}</div>
)
export default Page
