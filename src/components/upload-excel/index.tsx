import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import XLSX from 'xlsx';

export interface UploadExcelProps {
  onSuccess?: (data: object) => void;
}

class UploadExcel extends React.Component<UploadExcelProps, any> {
  constructor(props) {
    super(props);
  }

  readerData = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        const data = e.target.result;
        const fixedData = this.fixData(data);
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const header = this.getHeaderRow(worksheet);
        const results = XLSX.utils.sheet_to_json(worksheet);
        this.generateDate({ header, results });
        resolve();
      };
      reader.readAsArrayBuffer(file);
    });
  };

  generateDate({ header, results }) {
    const { onSuccess } = this.props;
    onSuccess &&
      onSuccess({
        header,
        results
      });
  }

  fixData = (data) => {
    let o = '';
    let l = 0;
    const w = 10240;
    for (; l < data.byteLength / w; ++l)
      o += String.fromCharCode.apply(
        null,
        new Uint8Array(data.slice(l * w, l * w + w))
      );
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  };

  getHeaderRow = (sheet) => {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C;
    const R = range.s.r; /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) {
      /* walk every column in the range */
      let cell =
        sheet[
          XLSX.utils.encode_cell({ c: C, r: R })
        ]; /* find the cell in the first row */
      let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
      headers.push(hdr);
    }
    return headers;
  };

  isExcel = (file) => {
    return /\.(xlsx|xls|csv)$/.test(file.name);
  };

  render() {
    const options = {
      accept: '.xlsx, .xls',
      action: (file) => {
        return this.readerData(file);
      },
      showUploadList: false,
      beforeUpload: (file) => {
        if (!this.isExcel(file)) {
          message.error('只能选择.xlsx, .xls, .csv格式的文件');
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          message.error('文件过大请小于5M');
          return false;
        }
        return true;
      }
    };
    return (
      <Upload {...options}>
        <Button>
          <Icon type="upload" /> 点击选择Excel
        </Button>
      </Upload>
    );
  }
}

export default UploadExcel;
