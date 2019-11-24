import Head from "next/head";
import { Input, Tag, Modal } from "antd";
import Router from "next/router";

import "./index.less";
import "antd/dist/antd.css";
const { Search } = Input;

export default class extends React.Component {
  state = {
    history: [],
    readme: false
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
  showModal = () => {
    this.setState({
      readme: true
    });
  };
  handleCancel = e => {
    this.setState({
      readme: false,
    });
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
          <div className="bottom-area">
            <span>©2019 搜网盘 京ICP证030173号</span>
            <span className="readme" onClick={this.showModal}>
              使用前必读
            </span>
            <br />
            <span>
              以上内容由网络爬虫自动抓取，本站只抓取百度网盘的链接而不保存任何资源。
            </span>
            <br />
            <span>
              如有侵权违规等其它行为请联系我们: ricardocao.biker@gmail.com
            </span>
          </div>
          <Modal
            centered={true}
            title="免责声明"
            visible={this.state.readme}
            onCancel={this.handleCancel}
            footer={null}
          >
            <p>
              在使用搜网盘引擎（以下简称搜网盘）前，请您务必仔细阅读并透彻理解本声明。您可以自愿选择是否使用搜网盘，但如果您使用搜网盘，您的使用行为将被视为对本声明全部内容的认可。
            </p>
            <ol>
              <li>
                鉴于搜网盘以非人工检索方式、自动生成到第三方网站的链接，以便用户能够找到和使用第三方网站上各种文档、图片及其他所需内容。搜网盘自身不存储、控制编辑或修改被链接的第三方网站上的信息内容或其表现形式。对其概不负责，亦不承担任何法律责任。如有认为搜网盘侵犯您的权益，请及时联系我们删改相关搜索结果。
              </li>
              <li>
                任何通过使用搜网盘而搜索链接到的第三方网站资源均系他人制作或提供，您可能从该第三方网站上获得资源及享用服务，搜网盘对其合法性概不负责，亦不承担任何法律责任。
              </li>
              <li>
                搜网盘搜索结果根据您键入的关键字自动搜索获得并生成，不代表搜网盘赞成被搜索链接到的第三方网站上的内容或立场。
              </li>
              <li>
                您应该对使用搜网盘的结果自行承担风险。搜网盘不做任何形式的保证：不保证搜索结果满足您的要求，不保证搜索服务不中断，不保证搜索结果的安全性、正确性、及时性、合法性，搜网盘对此不承担任何法律责任。
              </li>
              <li>
                搜网盘是个公益非盈利个人网站，旨在方便用户查找学习资料，坚决打击利用网盘及其搜索服务侵犯他人个人隐私和盗版等违法行为，本站对一些非法恶意的搜索进行了屏蔽，屏蔽的词库正在不断的完善中，如您发现有不良非法搜索结果。
              </li>
              <li>
                如你搜索到链接存在违规侵权等内容，请立即向百度网盘、新浪微盘官方网站进行举报。
              </li>
            </ol>
          </Modal>
        </div>
      </div>
    );
  }
}
