import Head from "next/head";
import { Input, Tag } from "antd";
import Router from "next/router";
import Footer from "../components/footer/footer";

import "./index.less";
import "antd/dist/antd.css";
const { Search } = Input;

export default class extends React.Component {
  state = {    
    history: []
  };
  componentDidMount() {
    if (localStorage.getItem("history")) {
      const h = JSON.parse(localStorage.getItem("history"));
      if (h && Array.isArray(h) && h.length) {
        this.setState({
          history: h
        });
      }
    }
  }
  jumptoResult = value => {
    if (!value) return;
    Router.push({ pathname: "/results", query: { query: value } });
    let history = [];
    if (localStorage.getItem("history")) {
      history = JSON.parse(localStorage.getItem("history"));
      if (!Array.isArray(history)) {
        history = [];
      }
    }
    if (history.length > 20) {
      history = history.slice(0, 20);
    }
    history.unshift(value);
    localStorage.setItem("history", JSON.stringify(history));
  };
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
          <meta
            name="keywords"
            content="百度网盘 网盘 搜盘 搜网盘 搜索 搜百度盘"
          />
          >
          <meta name="description" content="百度网盘搜索引擎" />>
        </Head>
        <div className="home-wrapper">
          <div className="search-area">
            <div className="title">
              <span className="img">
                <img src="/static/icon.png" />
              </span>
              <span>搜网盘</span>
            </div>
            <div className="search-bar">
              <Search
                size="large"
                onSearch={value => this.jumptoResult(value)}
                enterButton
              />
            </div>
            <div className="search-history">
              {this.state.history.map((h, i) => (
                <Tag
                  className="search-tag"
                  onClick={() => this.jumptoResult(h)}
                  key={`${i}${h}`}
                >
                  {h}
                </Tag>
              ))}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
