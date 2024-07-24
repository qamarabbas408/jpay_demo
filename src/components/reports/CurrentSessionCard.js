import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

export default function CurrentSessionCard({ isAnimationActive = true }) {
  const { analytics } = useSelector((state) => state.ReportsReducer);
  return (
    <div className="col-xl-4 col-sm-6 same-card ">
      <div className="card rounded-4 border-0">
        <div className="card-body depostit-card rounded-4 border-0 shadow-sm">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-between flex-column col-sm-12 w-100">
              <h3 className="mb-2">{"Current Sessions (Now)"}</h3>
              <h3 className="mb-2">{get(analytics, "current_sessions", "")}</h3>

              <ResponsiveContainer width="100%" aspect={4.0 / 2.0}>
                <AreaChart data={get(analytics, "session_count_graph", [])}>
                  <defs>
                    <linearGradient
                      id={`color${"green"}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={"#368F39"}
                        stopOpacity={0.9}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor={"#368F39"}
                        stopOpacity={0.09}
                      ></stop>
                    </linearGradient>
                  </defs>
                  ;
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#368F39"
                    fill={`url(#color${"green"})`}
                    strokeWidth={2}
                    isAnimationActive={isAnimationActive}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
