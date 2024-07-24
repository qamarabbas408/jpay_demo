import React, { useState } from 'react'
import { Row, Col, } from "react-bootstrap";
import { get } from 'lodash';
import { Select, } from "antd";
import { Button } from "react-bootstrap";
import { showInfoToast } from '../../../helpers/AppToasts';
import useLocalizedConstants from '../../../hooks/useLocalizedConstants';
import moment from "moment";
import AppUtilities from '../../../helpers/AppUtilities';

export default function InvalidUsers({ title = "", usersList = [], setFinalUsersList, handleBulkUploadDocumentRequest, isDisabled, handleCancel }) {
    const [taxDetails, setTaxDetails] = useState({
        tax_year: "",
        frequency: "",
        period: "",
    })
    const { Option } = Select;
    // Localization and Constants
    const appConstants = useLocalizedConstants();

    // Table headers
    const tableHeaders = [
        appConstants.employee,
        // appConstants.taxYear,
        // appConstants.frequency,
        // appConstants.period,
        appConstants.grossPay,
        appConstants.statPay,
        appConstants.dedsBeforeTax,
        appConstants.eeNI,
        appConstants.studentLoanAeos,
        appConstants.volDeds,
        appConstants.nonTaxPayments,
        appConstants.netPay,
        appConstants.payeeTax
    ];

    const getTaxPeriodsList = (type = "Monthly") => {
        var data = [];

        if (type == "Weekly") {
            for (var i = 0; i < 53; i++) {
                data.push(`Week ${i + 1}`);
            }
        } else {
            for (var i = 0; i < 13; i++) {
                data.push(`Month ${i + 1}`);
            }
        }

        return data;
    };

    const getTaxYearsList = () => {
        var data = [];
        for (var i = 1970; i < moment().year() + 1; i++) {
            data.push(`${i}/${i + 1}`);
        }
        return data;
    };

    const handleTaxFields = () => {
        var finalArray = []
        usersList.forEach(element => {
            finalArray.push({
                ...element,
                tax_year: taxDetails.tax_year,
                frequency: taxDetails.frequency,
                period: taxDetails.period
            })
        })

        setFinalUsersList(finalArray)
        handleBulkUploadDocumentRequest(finalArray)
    }

    const handleSave = () => {
        if (AppUtilities.validateFieldsGlobal(taxDetails)) {
            handleTaxFields()
        } else {
            showInfoToast(appConstants.tax_year_frequency_and_period_are_required)
        }
    }

    const saveBtnStyl = {
        backgroundColor: "var(--primary-btn-color)", color: "#fff", width: "120px", marginTop: "16px", marginRight: "12px",
    }

    return (
        <div className="container-fluid py-0 ">
            <div className="d-flex card-header flex-wrap pb-0 px-0">
                <h2 className="font-w600">{title}</h2>
            </div>

            <div className="container-fluid px-0">
                <Row className='mb-3'>
                    <div className='col-3 '>
                        <label className='table-heading-text'>{appConstants.taxYear}</label>
                        <Select
                            className="p-0  inputField d-flex align-items-center"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            onChange={(value, option) => {
                                setTaxDetails({ ...taxDetails, tax_year: value })
                            }}
                            optionLabelProp="label"
                        >
                            {getTaxYearsList()
                                .reverse()
                                .map((item) => {
                                    return (
                                        <Option
                                            className="m-1"
                                            value={item}
                                            label={item}
                                        />
                                    );
                                })}
                        </Select>
                    </div>

                    <div className='col-3 '>
                        <label className='table-heading-text'>{appConstants.frequency}</label>
                        <Select
                            className="p-0 height40 inputField d-flex align-items-center"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            onChange={(value, option) => {
                                setTaxDetails({
                                    ...taxDetails,
                                    frequency: value,
                                    period: ""
                                })
                            }}
                            optionLabelProp="label"
                        >
                            {appConstants.taxFrequency.map(
                                (item) => {
                                    const { title, value } = item;
                                    return (
                                        <Option
                                            className="m-1"
                                            value={value}
                                            label={title}
                                        />
                                    );
                                }
                            )}
                        </Select>
                    </div>
                    <div className='col-3 '>
                        <label className='table-heading-text'>{appConstants.period}</label>
                        <Select
                            className="p-0  height40 inputField d-flex align-items-center"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            value={get(taxDetails, "period", "")}
                            onChange={(value, option) => {
                                setTaxDetails({ ...taxDetails, period: value })
                            }}
                            optionLabelProp="label"
                        >
                            {getTaxPeriodsList(get(taxDetails, "frequency", "Monthly")).map(
                                (item) => {
                                    return (
                                        <Option
                                            className="m-1"
                                            value={item}
                                            label={item}
                                        />
                                    );
                                }
                            )}
                        </Select>
                    </div>
                </Row>
                <Row>
                    <Col lg="12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="font-w700 my-3">
                                </h4>
                                <div className="col-xl-12">
                                    <div className="table-responsive ">
                                        <table className="table dataTable emp-table ">
                                            <thead className="table-bg-header">
                                                <tr>
                                                    {tableHeaders.map((headings, index) => {
                                                        return (
                                                            <th
                                                                style={{ width: "200px" }}
                                                                className=" align-items-center  table-heading-text  "
                                                                key={index}
                                                            >
                                                                {headings}
                                                            </th>
                                                        );
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {usersList.length > 0 ? (
                                                    usersList.map((item, index) => {
                                                        const {
                                                            id,
                                                            deds_before_tax,
                                                            ee_ni,
                                                            employee,
                                                            gross_pay,
                                                            nontax_payments,
                                                            stat_pay,
                                                            student_loan_aeos,
                                                            vol_deds,
                                                            net_pay,
                                                            paye_tax
                                                        } = item;
                                                        return (
                                                            <tr className="color-black" key={id}>
                                                                <td>{employee}</td>
                                                                <td>{gross_pay}</td>
                                                                <td>{stat_pay}</td>
                                                                <td>{deds_before_tax}</td>
                                                                <td>{ee_ni}</td>
                                                                <td>{student_loan_aeos}</td>
                                                                <td>{vol_deds}</td>
                                                                <td>{nontax_payments}</td>
                                                                <td>{net_pay}</td>
                                                                <td>{paye_tax}</td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <td>{appConstants.foundEmployees}</td>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <Row className='justify-content-end '>
                                    <Button
                                        style={saveBtnStyl}
                                        className="fs-5 border-0"
                                        variant="secondary"
                                        onClick={() => handleCancel()}
                                    >
                                        {appConstants.buttons.cancel}
                                    </Button>
                                    <Button
                                        style={saveBtnStyl}
                                        className="fs-5 border-0"
                                        variant="secondary"
                                        onClick={() => handleSave()}
                                    >
                                        {appConstants.buttons.save}
                                    </Button>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    )
}
