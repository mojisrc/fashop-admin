import React from "react";
import { Layout, Icon } from "antd";
import GlobalFooter from "@/components/globalFooter";

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
      <GlobalFooter
        copyright={
            <>
                Copyright <Icon type="copyright" /> <a href={"http://www.fashop.cn"} target={"_blank"}>FaShop</a>
            </>
        }
      />
  </Footer>
);
export default FooterView;
