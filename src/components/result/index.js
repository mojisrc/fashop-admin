import React from "react";
import classNames from "classnames";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import styles from "./index.less";

export default function Result({
                                   className,
                                   type,
                                   title,
                                   description,
                                   extra,
                                   actions,
                                   ...restProps
                               }) {
    const iconMap = {
        error: <CloseCircleOutlined className={styles.error} />,
        success: <CheckCircleOutlined className={styles.success} />
    };
    const clsString = classNames(styles.result, className);
    return (
      <div className={clsString} {...restProps}>
          <div className={styles.icon}>{iconMap[type]}</div>
          <div className={styles.title}>{title}</div>
          {description && <div className={styles.description}>{description}</div>}
          {extra && <div className={styles.extra}>{extra}</div>}
          {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
}
