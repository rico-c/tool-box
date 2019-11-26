import Head from "next/head";
import { Input } from "antd";
import Router from "next/router";

import "./header.less";
import "antd/dist/antd.css";
const { Search } = Input;

export default class extends React.Component {
  constructor(props){
    super(props);
  }
  jumptoResult = value => {
    Router.push({ pathname: "/results", query: { query: value } });
  };
  jumptoIndex = () => {
    Router.push({ pathname: "/"});
  };
  render() {
    return (
      <div className="header-bar">
        <span className="img">
          <img src="/static/icon.png" onClick={() => this.jumptoIndex()} />
        </span>
        <span className="title" onClick={() => this.jumptoIndex()}>
          搜网盘
        </span>
        <div className="search-bar">
          <Search
            size="large"
            defaultValue={this.props.defaultValue}
            onSearch={value => this.jumptoResult(value)}
            enterButton
          />
        </div>
      </div>
    );
  }
}
