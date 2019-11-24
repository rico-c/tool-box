import React from "react";
import Header from "../components/header/header";
import Head from "next/head";

import "./detail.less";

export default class extends React.Component {
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
        </div>
      </div>
    );
  }
}
