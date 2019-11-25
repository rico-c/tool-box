import Head from "next/head";
import { notification, Pagination } from "antd";
import Header from "../components/header/header";
import { withRouter } from "next/router";
import axios from "axios";
import Router from "next/router";

import "./results.less";
import "antd/dist/antd.css";

const host = "http://localhost:8080/api";

class Results extends React.Component {
  static async getInitialProps({ query }) {
    const data = await Results.getData(query);
    return {
      ...query,
      ...data
    };
  }
  static async getData(query) {
    try {
      const res = await axios.get(`${host}/getList`, {
        params: {
          query: query.query,
          page: query.page ? query.page : 1
        }
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
  onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
    Router.push({
      pathname: "/results",
      query: { query: this.props.query, page: pageNumber },
      shallow: false
    });
    scrollTo(0, 0);
  }
  changeSize(limit) {
    var size = "";
    if (limit < 0.1 * 1024) {
      //小于0.1KB，则转化成B
      size = limit.toFixed(2) + "B";
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
  jumptoDetail(id) {
    Router.push({
      pathname: "/detail",
      query: { id },
      shallow: false
    });
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
        <div className="results-wrapper">
          <Header defaultValue={this.props.query} class="header"></Header>
          <div className="main-area">
            <div className="data-list">
              <div className="filter-btn"></div>
              <div className="result-list">
                {this.props.resources.map(item => (
                  <div className="res-item" key={item.res.id}>
                    <div className="icon"></div>
                    <div className="file-name">
                      <span
                        className="file"
                        onClick={() => this.jumptoDetail(item.res.id)}
                        dangerouslySetInnerHTML={{
                          __html: item.highs.filename[0]
                        }}
                      ></span>
                      <span className="up-time">
                        {item.res.updatetime.slice(0, 10)}
                      </span>
                    </div>
                    <div className="file-size">
                      文件大小：{this.changeSize(item.res.size)}
                    </div>
                    <div className="file-subtree">
                      {item.res.filelist
                        ? item.res.filelist.map((el, subIndex) => {
                            if (subIndex !== 0 && subIndex <= 4) {
                              return (
                                <div
                                  className="sub-file"
                                  key={`${el.filename}${el.originmd5}`}
                                >
                                  {el.filename}&nbsp;&nbsp;&nbsp;&nbsp;
                                  <span className="sub-size">
                                    {this.changeSize(el.size)}
                                  </span>
                                </div>
                              );
                            }
                            else if (subIndex === 5) {
                              return (
                                <div className="more-file">
                                  ...
                                </div>
                              );
                            }
                          })
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
              <div className="paganition">
                <Pagination
                  showQuickJumper
                  defaultCurrent={1}
                  total={this.props.total / 30}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="ad-area">广告区</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Results);
