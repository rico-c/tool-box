import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Head from "next/head";
import { Card, Button, Tag } from "antd";
import { withRouter } from "next/router";
import axios from "axios";

import "./detail.less";

const host = "http://localhost:8080/api";

class Detail extends React.Component {
  static async getInitialProps({ query }) {
    const data = await Detail.getData(query.id);
    return {
      id: query.id,
      filename: query.filename,
      size: query.size,
      update: query.update,
      tree: JSON.parse(query.tree),
      ...data
    };
  }
  static async getData(id) {
    try {
      const res = await axios.get(`${host}/getDetail`, {
        params: {
          id
        }
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  changeSize(limit) {
    var size = "";
    if (limit < 0.1 * 1024) {
      //小于0.1KB，则转化成B
      size = "";
    } else if (limit < 0.1 * 1024 * 1024) {
      //小于0.1MB，则转化成KB
      size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) {
      //小于0.1GB，则转化成MB
      size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else {
      //其他转化成GB
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    var sizeStr = size + ""; //转成字符串
    var index = sizeStr.indexOf("."); //获取小数点处的索引
    var dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
    if (dou == "00") {
      //判断后两位是否为00，如果是则删除00
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    }
    return size;
  }
  render() {
    return (
      <div>
        <Head>
          <title>搜网盘 - 百度网盘搜索引擎</title>
          <link rel="icon" href="/static/icon.png" type="image/x-icon" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="details-wrapper">
          <Header defaultValue={this.props.query} class="header"></Header>
          <div className="main-area">
            <div className="detail-area">
              <Card
                title={this.props.filename}
                style={{ width: 750, margin: 30 }}
              >
                {this.props.tree ? (
                  <>
                    <h5>文件结构：</h5>
                    <div className="file-tree">
                      {this.props.tree.map(
                        (item, index) =>
                          index > 0 && (
                            <div className="tree-limb">
                              - {item.filename} &nbsp;&nbsp;&nbsp;
                              {this.changeSize(item.size)}
                            </div>
                          )
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="file-info">
                  <div className="file-size">
                    <center>
                      <Tag color="blue">
                        文件大小：{this.changeSize(this.props.size)}
                      </Tag>
                    </center>
                  </div>
                  <div className="file-update">
                    <center>
                      <Tag color="green">更新时间：{this.props.update}</Tag>
                    </center>
                  </div>
                </div>
                <div className="file-password">{}</div>
                <center>
                  <Button
                    className="btn"
                    type="primary"
                    icon="download"
                    size="large"
                  >
                    跳转至百度网盘
                  </Button>
                </center>
              </Card>
            </div>
            <div className="ad-area">ad area</div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default withRouter(Detail); 
