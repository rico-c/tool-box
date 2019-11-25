import React from "react";
import Header from "../components/header/header";
import Head from "next/head";
import axios from "axios";

import "./detail.less";

const host = "http://localhost:8080/api";

class Detail extends React.Component {
  static async getInitialProps({ query }) {
    const data = await Detail.getData(query);
    return {
      ...query,
      ...data
    };
  }
  static async getData(query) {
    try {
      const res = await axios.get(`${host}/getDetail`, {
        params: {
          id: query.id
        }
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
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
        </div>
      </div>
    );
  }
}

export default Detail;