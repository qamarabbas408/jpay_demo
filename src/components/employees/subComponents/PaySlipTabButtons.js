import React from 'react'
import { Button, } from "react-bootstrap";

export default function PaySlipTabButton({ onClick, isPaySlip, title }) {
    return (
        <Button
            onClick={() => onClick()}
            style={{
                backgroundColor: isPaySlip
                    ? "var(--primary-btn-color)" : "var(--bs-white)",
                color: isPaySlip
                    ? "var(--bs-white)" : "var(--primary-btn-color)",
                flex: 1,
            }}
        >
            {title}
        </Button>
    )
}
