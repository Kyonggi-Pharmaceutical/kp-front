import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./MainRank.css";

export default function MainRank({ dayALL, weekALL, monthALL }) {
  const [medal, setMedal] = useState({
    1: "/icon/first.png",
    2: "/icon/second.png",
    3: "/icon/third.png"
  });

  return (
    <div className="main-rank" style={{ display: "flex", flexDirection: "column" }}>
      <h3 className="main-rank-small-title">유저 활동 랭킹</h3>
      <Tabs defaultActiveKey="monthly" id="justify-tab-example" className="mb-3" justify>
        <Tab eventKey="daily" title={<span className="main-rank-title">Daily</span>}>
          <table className="main-rank-table">
            <tbody>
              {dayALL.map((item) => (
                <tr className="main-rank-row" key={item.rank}>
                  <td>
                    {item.rank <= 3 ? (
                      <img src={medal[item.rank]} alt={`Rank ${item.rank}`} />
                    ) : (
                      item.rank
                    )}
                  </td>
                  <td>{item.nickname}</td>
                  <td>{item.progressRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="weekly" title={<span className="main-rank-title">Weekly</span>}>
          <table className="main-rank-table">
            <tbody>
              {weekALL.map((item) => (
                <tr className="main-rank-row" key={item.rank}>
                  <td>
                    {item.rank <= 3 ? (
                      <img src={medal[item.rank]} alt={`Rank ${item.rank}`} />
                    ) : (
                      item.rank
                    )}
                  </td>
                  <td>{item.nickname}</td>
                  <td>{item.progressRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="monthly" title={<span className="main-rank-title">Monthly</span>}>
          <table className="main-rank-table">
            <tbody>
              {monthALL.map((item) => (
                <tr className="main-rank-row" key={item.rank}>
                  <td>
                    {item.rank <= 3 ? (
                      <img src={medal[item.rank]} alt={`Rank ${item.rank}`} />
                    ) : (
                      item.rank
                    )}
                  </td>
                  <td>{item.nickname}</td>
                  <td>{item.progressRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
      </Tabs>
    </div>
  );
}
