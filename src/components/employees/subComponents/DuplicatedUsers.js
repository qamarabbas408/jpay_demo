import React from "react";
import { Row, Col } from "react-bootstrap";
import { Select } from "antd";
import { Button } from "react-bootstrap";
import useLocalizedConstants from "../../../hooks/useLocalizedConstants";

export default function DuplicatedUsers({
    title = "",
    usersList = [],
    setUserList,
    finalUsersList,
    setFinalUsersList,
    handleCancel
}) {
    const { Option } = Select;

    // Localization and Constants
    const appConstants = useLocalizedConstants();

    // Table headers
    const tableHeaders = [
        appConstants.employee,
        appConstants.selectUser,
        appConstants.eeNI,
        appConstants.grossPay,
        appConstants.statPay,
        appConstants.dedsBeforeTax,
        appConstants.studentLoanAeos,
        appConstants.volDeds,
        appConstants.nonTaxPayments,
        appConstants.netPay,
        appConstants.payeeTax
    ];

    // useEffect(() => {
    //     usersList.map((item, index) => {
    //         console.log("itemmmm", item);
    //         console.log("obecjtjjj keysss", Object.keys(item)[0])
    //         item[Object.keys(item)[0]].arrayCsv.map((item2) => {
    //             console.log("item2------", item2);
    //         })
    //     })
    // }, [usersList])

    const handleDuplicatedUsersChange = (user_id, arrayCsvIndex, arrayServerIndex, username, userListIndex) => {
        const list = [...usersList]
        const selectedUserValue = list[userListIndex][username]
        var arrayCsv = selectedUserValue.arrayCsv
        var arrayServer = selectedUserValue.arrayServer

        if (arrayCsv[arrayCsvIndex].hasOwnProperty("user_id")) { // removing previous selected user
            const previousIndex = arrayServer.findIndex((item) => item.id == arrayCsv[arrayCsvIndex].user_id)
            if (previousIndex != -1)
                arrayServer[previousIndex] = { ...arrayServer[previousIndex], selected: false }
        }

        arrayCsv[arrayCsvIndex] = { ...arrayCsv[arrayCsvIndex], user_id: user_id }
        arrayServer[arrayServerIndex] = { ...arrayServer[arrayServerIndex], selected: true }

        setFinalUsersList([...finalUsersList, arrayCsv[arrayCsvIndex]])
        arrayCsv.splice(arrayCsvIndex, 1)
        if (arrayCsv.length == 0) {
            list.splice(userListIndex, 1)
        } else {
            list[userListIndex][username] = { arrayCsv, arrayServer }
        }
        setUserList(list)
        // console.log("newwww list", list);
    }

    const handleShowDuplicateUser = (serverItem, csvItem) => {
        if (serverItem.hasOwnProperty('selected')) {
            if (serverItem.selected && serverItem.id == csvItem.user_id) {
                return true
            } else if (!serverItem.selected && serverItem.id != csvItem.user_id)
                return true
        } else {
            return true
        }
    }

    const handleShowRemove = (serverArray = [],) => {
        const filteredArray = serverArray.filter(item => item.hasOwnProperty("selected") && item.selected)
        if (filteredArray.length == serverArray.length)
            return true
        else
            return false
    }

    const handleRemove = (arrayCsvIndex, username, userListIndex) => {
        const list = [...usersList]
        const selectedUserValue = list[userListIndex][username]
        var arrayCsv = selectedUserValue.arrayCsv
        var arrayServer = selectedUserValue.arrayServer

        arrayCsv.splice(arrayCsvIndex, 1)
        if (arrayCsv.length == 0) {
            list.splice(userListIndex, 1)
        } else {
            list[userListIndex][username] = { arrayCsv, arrayServer }
        }
        setUserList(list)
    }

    const styles = {
        removeBtnStyl: {
            padding: "0px", background: "transparent", color: "red", textDecorationLine: "underline",
        },
        saveBtnStyl: {
            backgroundColor: "var(--primary-btn-color)", color: "#fff", width: "120px", marginTop: "16px", marginRight: "12px",
        }
    }

    return (
        <div className="container-fluid py-0 ">
            <div className="d-flex card-header flex-wrap pb-0 px-0">
                <h2 className="font-w600">{title}</h2>
            </div>

            <div className="container-fluid px-0">
                <Row>
                    <Col lg="12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="font-w700 my-3"></h4>
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
                                                {usersList.length > 0 && (
                                                    usersList.map((item, index) => {
                                                        return item[Object.keys(item)[0]].arrayCsv.map(
                                                            (item2, arrayCsvIndex) => {
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
                                                                } = item2;
                                                                return (
                                                                    <tr className="color-black" key={index}>
                                                                        <td>{employee}</td>
                                                                        <td>
                                                                            {handleShowRemove(item[Object.keys(item)[0]].arrayServer) ?
                                                                                <div className="d-flex flex-column align-items-center">
                                                                                    <p className="m-0">{appConstants.noUserFound}</p>
                                                                                    <Button
                                                                                        style={styles.removeBtnStyl}
                                                                                        className="fs-5 border-0"
                                                                                        onClick={() => handleRemove(arrayCsvIndex, Object.keys(item)[0], index)}
                                                                                    >
                                                                                        {"Remove"}
                                                                                    </Button>
                                                                                </div>
                                                                                :
                                                                                <Select
                                                                                    className="p-0 w-100 height40 inputField d-flex align-items-center"
                                                                                    showSearch
                                                                                    optionFilterProp="children"
                                                                                    filterOption={(input, option) =>
                                                                                        (option?.label ?? "")
                                                                                            .toLowerCase()
                                                                                            .includes(input.toLowerCase())
                                                                                    }
                                                                                    onChange={(value, option) => {
                                                                                        handleDuplicatedUsersChange(value, arrayCsvIndex, option.key, Object.keys(item)[0], index)
                                                                                    }}
                                                                                    optionLabelProp="label"
                                                                                    value={""}
                                                                                >
                                                                                    {item[Object.keys(item)[0]].arrayServer.map((serveItem, serverIndex) => {
                                                                                        return (
                                                                                            handleShowDuplicateUser(serveItem, item2) &&
                                                                                            <Option key={serverIndex} value={serveItem.id}
                                                                                                label={serveItem.full_name + " - " + serveItem.ni_number}
                                                                                            >
                                                                                                <p className="mb-0">{serveItem.full_name}</p>
                                                                                                <p className="mb-0">{serveItem.ni_number}</p>
                                                                                            </Option>
                                                                                        )
                                                                                    })}
                                                                                </Select>
                                                                            }
                                                                        </td>
                                                                        <td>{ee_ni}</td>
                                                                        <td>{gross_pay}</td>
                                                                        <td>{stat_pay}</td>
                                                                        <td>{deds_before_tax}</td>
                                                                        <td>{student_loan_aeos}</td>
                                                                        <td>{vol_deds}</td>
                                                                        <td>{nontax_payments}</td>
                                                                        <td>{net_pay}</td>
                                                                        <td>{paye_tax}</td>
                                                                    </tr>
                                                                );
                                                            }
                                                        )
                                                    })
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <Row className='justify-content-end '>
                                    <Button
                                        style={styles.saveBtnStyl}
                                        className="fs-5 border-0"
                                        variant="secondary"
                                        onClick={() => handleCancel()}
                                    >
                                        {appConstants.buttons.cancel}
                                    </Button>

                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
