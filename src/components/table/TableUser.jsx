import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { fetchAllUser } from '../../services/UserService';
import '../../App.scss';
import ModalAddUsers from './ModalAddUsers';

const TableUser = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    useEffect(() => {
        getUser(1);
    }, []);

    const getUser = async (page) => {
        setLoading(true)
        const res = await fetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data);
            setTotalUsers(res.total);
            setLoading(false);
        }
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
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
                    color: filtered ? '#1677ff' : undefined,
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
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '30%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '30%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            width: '20%',
            ...getColumnSearchProps('first_name'),
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            width: '20%',
            ...getColumnSearchProps('last_name'),
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => {
                return (
                    <img src={avatar} alt="" />
                )
            }
        },
        {
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                        <EditOutlined style={{ color: "blue" }} />
                        <DeleteOutlined
                            // onClick={onDeleteStudent}
                            style={{ color: "red", marginLeft: 12 }} />
                    </>
                )
            }
        }
    ];


    return (
        <>
            <div>
                <ModalAddUsers
                    show={isShowModalAddNew}
                    close={() => setIsShowModalAddNew(false)}
                />
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div></div>
                        <Button
                            style={{ marginBlockEnd: 30 }}
                            size='large'
                            type="primary"
                            onClick={() => setIsShowModalAddNew(true)}
                        >
                            Thêm mới
                        </Button>
                    </div>

                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={listUsers}
                        pagination={{
                            pageSize: 6,
                            total: totalUsers,
                            onChange: (page) => {
                                getUser(page)
                            }
                        }}
                    />
                </Card>
            </div>
        </>
    )
};

export default TableUser;