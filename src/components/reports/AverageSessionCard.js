import React from "react";
import { useSelector } from "react-redux";
import { SVGICON } from "../../theme";
import { get } from "lodash";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import AppUtilities from "../../helpers/AppUtilities";

export default function AverageSessionCard({ isAnimationActive = true }) {
  const { analytics } = useSelector((state) => state.ReportsReducer);
  const appConstants = useLocalizedConstants()
  return (
    <div className="col-xl-4 col-sm-6 same-card">
      <div className="card rounded-4 border-0 ">
        <div className="card-body depostit-card rounded-4 border-0 shadow-sm">
          <div className="mb-4">{SVGICON.AvgSession}</div>
          <h3 className="mb-0">
            {get(analytics, "average_sessions", "") +
              AppUtilities.minutesText(get(analytics, "average_sessions", ""))}
          </h3>
          <p className="mb-0">{appConstants.titles.totalAvgsesTime}</p>
          <ResponsiveContainer width="100%" aspect={4.0 / 1.0}>
            <LineChart data={get(analytics, "session_time_graph", [])}>
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                dot={false}
                stroke="var(--primary-btn-color)"
                strokeWidth={2}
                isAnimationActive={isAnimationActive}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
