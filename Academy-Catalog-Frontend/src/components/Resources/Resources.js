import React, { useRef, useState, useEffect } from "react";
import "./Resources.css";
import "../common/Colors/colors.css";

import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    InboxOutlined,
    StopOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";

import { Button, Input, Space, Table, Modal, message, Upload, Popconfirm } from "antd";

import Highlighter from "react-highlight-words";
import { Typography } from "antd";
import {
    findAllResources,
    createResource,
    patchResources,
    deleteResources,
} from "../../store/actions/resourceActions";

import { connect } from "react-redux";

const { Dragger } = Upload;

const { Title } = Typography;

const Resources = ({
    resourcesList,
    findAllResources,
    createResource,
    patchResources,
    deleteResources,
    error,
    listError,
    addErorr,
    updateError,
    deleteError,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const [subject, setSubject] = useState("");
    const [link, setLink] = useState("");
    const [resourceId, setResourceId] = useState("");
    const [description, setDescription] = useState("");
    // const [file, setFile] = useState("");

    const [editSubject, setEditSubject] = useState("");
    const [editLink, setEditLink] = useState("");
    const [editDescription, setEditDescription] = useState("");
    // const [editFile, setEditFile] = useState("");

    //get all resources
    useEffect(() => {
        if (!resourcesList || resourcesList.length === 0) {
            findAllResources();
        }
    }, [resourcesList, findAllResources]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    //add new resource
    const handleOk = () => {
        const newResource = {
            link: link,
            subject: subject,
            description: description,
            // file: file,
            enabled: true,
        };
        createResource(newResource);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onEdit = (record) => {
        setIsModalOpenEdit(true);
        setResourceId(record._id);
        setEditSubject(record.subject);
        setEditLink(record.link);
        setEditDescription(record.description);
        // setEditFile(record.file);
    };

    const handleOkEdit = () => {
        const editResource = {
            _id: resourceId,
            link: editLink,
            subject: editSubject,
            description: editDescription,
            // file: editFile
        };
        patchResources(editResource);
        setIsModalOpenEdit(false);
        message.success("Resource edited successfully");
    };

    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
    };

    const handleOkDelete = () => {
        deleteResources(resourceId);
        setIsModalOpenDelete(false);
        message.success("Resource deleted successfully");
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    const confirmToggle = (record) => {
        let newStatus;
        if (record.enabled) {
            newStatus = false;
        }
        if (!record.enabled) {
            newStatus = true;
        }
        const newRecord = { ...record, enabled: newStatus };
        patchResources(
            newRecord,
            () => {
                message.success(
                    `You have "disabled" : "enabled"
              } the trainer called!`
                );
            },
            () => {
                message.error(
                    "There has been an error in toggling the trainer, try again later!"
                );
            }
        );
        findAllResources();
    };

    const confirmDelete = (firstName, id) => {
        deleteResources(
            id,
            () => {
                message.success(`You have successfully deleted the resource!`);
            },
            () => {
                message.error(
                    "There has been an error in deleting the resource, try again later!"
                );
            }
        );
        findAllResources();
    };

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="dark"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: "Subject",
            dataIndex: "subject",
            key: "subject",
            ...getColumnSearchProps("subject"),
            sorter: (a, b) => a.subject.length - b.subject.length,
            sortDirections: ["descend", "ascend"],

        },
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            render: (link) => (
                <a href={link} rel="noreferrer" target="_blank">
                    {" "}
                    {link}{" "}
                </a>
            ),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ...getColumnSearchProps("description"),
            sorter: (a, b) => a.description.length - b.description.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Uploaded Files",
            dataIndex: "upload",
            key: "upload",

        },
        {
            key: "enabled",
            title: "Enabled",
            // dataIndex: "enabled"
            render: (record) => {
                return (
                    <>
                        {
                            record.enabled ? "Enabled" : "Disabled"
                        }
                    </>
                )
            }
        },
        {
            key: "actions",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEdit(record);
                            }}
                        />
                        <Popconfirm
                            placement="top"
                            title={`Are you sure you want to ${record.enabled ? "disable" : "enable"
                                } this resource?`}
                            onConfirm={() => confirmToggle(record)}
                            okText="Yes"
                            okType="danger"
                            cancelText="No"
                        >
                            {record.enabled ? (
                                <StopOutlined style={{ marginLeft: 12 }} />
                            ) : (
                                <CheckCircleOutlined style={{ marginLeft: 12 }} />
                            )}
                        </Popconfirm>
                        {!record.enabled && (
                            <Popconfirm
                                placement="top"
                                title="Are you sure you want to delete this resource?"
                                onConfirm={() => confirmDelete(record.firstName, record._id)}
                                okText="Yes"
                                okType="danger"
                                cancelText="No"
                            >
                                <DeleteOutlined
                                    style={{ color: "red", marginLeft: 12 }}
                                />
                            </Popconfirm>
                        )}
                    </>
                );
            },
        },
    ];
    return (
        <div className="resources-content-container">
            <div className="resources-header">
                <Title className="courses-title" level={2}>
                    Resources
                </Title>
                <Button className="addBtn" onClick={showModal}>
                    Add new resource
                </Button>
                {/* added on change actions for inputs so that it can get the information posted in the database */}
                <Modal
                    title="Add new resource"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <hr className="add-new-resource-hr"></hr>
                    <div className="courses-modal-content">
                        <div className="inputs">
                            <div className="input-course">
                                <Title level={5}>Subject</Title>
                                <Input
                                    placeholder="Insert subject here"
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div className="input-course">
                                <Title level={5}>Link</Title>
                                <Input
                                    placeholder="Insert link here"
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-course">
                            <div className="input-course">
                                <Title level={5}>Description</Title>
                                <Input

                                    placeholder="Insert description here"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="upload-file">
                        <Title level={5}>Upload File</Title>
                        <Dragger>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </div>

                </Modal>

                <Modal
                    title="Edit resource"
                    open={isModalOpenEdit}
                    onOk={handleOkEdit}
                    onCancel={handleCancelEdit}
                >
                    <hr className="Edit-new-resource-hr"></hr>
                    <div className="courses-modal-content">
                        <div className="inputs">
                            <div className="input-course">
                                <Title level={5}>Subject</Title>

                                <Input
                                    placeholder="Insert subject here"
                                    value={editSubject}
                                    onChange={(e) => setEditSubject(e.target.value)}
                                />
                            </div>
                            <div className="input-course">
                                <Title level={5}>Link</Title>
                                <Input
                                    placeholder="Insert link here"
                                    value={editLink}
                                    onChange={(e) => setEditLink(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-course">
                            <div className="input-course">
                                <Title level={5}>Description</Title>
                                <Input
                                    placeholder="Insert description` here"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal
                    title="Delete resource"
                    open={isModalOpenDelete}
                    onOk={handleOkDelete}
                    onCancel={handleCancelDelete}
                >
                    <hr className="Delete-resource-hr"></hr>
                    <div className="courses-modal-content">
                        <p>Are you sure you want to delete this resource record</p>
                    </div>
                </Modal>
            </div>

            {listError && <p>{"A aparut o eroare"}</p>}


            <div className="resources-content">
                <Table
                    style={{ maxHeight: 410 }}
                    columns={columns}
                    dataSource={resourcesList}
                ></Table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        resourcesList: state.resource.resources,
        listError: state.resource.listError,
        addErorr: state.resource.addErorr,
        updateError: state.resource.patchErorr,
        deleteErorr: state.resource.deleteErorr,
    };
};

const mapDispatchToProps = (dispatch) => ({
    findAllResources: () => {
        dispatch(findAllResources());
    },
    createResource: (resource) => {
        dispatch(createResource(resource));
    },
    patchResources: (resource) => {
        dispatch(patchResources(resource));
    },
    deleteResources: (resourceId) => {
        dispatch(deleteResources(resourceId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
