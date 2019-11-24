import Head from "next/head";
import { Input } from "antd";

import "./results.less";
import "antd/dist/antd.css";
const { Search } = Input;

export default class extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>搜百度网盘 - 百度网盘搜索引擎</title>
          <link rel="icon" href="/static/icon.png" type="image/x-icon" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="results-wrapper">
          results
        </div>
      </div>
    );
  }
}
