import React from "react";
import { get } from "lodash";

function EmployeesErrorSummary({ summary = [] }) {
    return (
        <div>
            {summary.length > 0 && (
                <>
                    <h4>Errors Summary</h4>
                    {summary.map((item) => {
                        return (
                            <>
                                <h6>{`Error at row ${get(
                                    item,
                                    "row",
                                    ""
                                )} are as follows:`}</h6>
                                {get(item, "error", [null]).map((item) => {
                                    return (
                                        <>
                                            <p style={{ color: "#f70d1a" }} className="mb-0">
                                                {item}
                                            </p>

                                        </>
                                    );
                                })}
                            </>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default EmployeesErrorSummary;
