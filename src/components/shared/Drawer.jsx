// src/components/shared/Drawer.jsx
"use client";

import { Drawer as AntDrawer } from "antd";
import StyleProvider from "@ant-design/cssinjs/es/StyleContext";

const Drawer = ({ open, onClose, title, subtitle, children, footer }) => {
  return (
    <AntDrawer
      open={open}
      onClose={onClose}
      size="large"
      title={
        <div>
          <p className="text-base font-semibold text-slate-900">{title}</p>
          {subtitle && (
            <p className="text-xs font-normal text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      }
      footer={footer}
      destroyOnClose
    >
      {children}
    </AntDrawer>
  );
};

export default Drawer;
