/* eslint-disable */
import { InsuranceFormSubmissionResponseType } from '@apis/entities/insurance.entities';
import { request } from '@apis/request';
import { FC, useEffect, useState } from 'react';
import { Table, Input, Button, Space, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { AnyObject } from 'antd/es/_util/type';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@configs/routes';

const ListHomePage: FC = () => {
    const navigation = useNavigate();
    const [cols, setCols] = useState<string[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [columns, setColumns] = useState<any>([]);
    const [table, setTable] =
        useState<InsuranceFormSubmissionResponseType | null>(null);

    useEffect(() => {
        async function handleGetData() {
            try {
                const response = await request({
                    method: 'GET',
                    url: 'insuranceFormsSubmissions',
                });
                setTable(response.data);
                setCols(response.data.columns);
            } catch (e) {
                console.log(e);
            }
        }
        handleGetData();
    }, []);

    const handleSearch = (confirm: (param?: FilterConfirmProps) => void) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex: any): ColumnType<AnyObject> => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(confirm)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(confirm)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters!)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value: any, record: AnyObject) =>
            record[dataIndex as any]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
    });

    function sorterProgrammer(a: string | number, b: string | number) {
        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        } else if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        } else {
            return 0;
        }
    }

    function columnCreator(
        c: string[],
        data: InsuranceFormSubmissionResponseType['data']
    ) {
        const columnsCreated = c.map((item) => {
            let obj = {
                title: item.toLocaleUpperCase(),
                dataIndex: item,
                key: item,
            } as any;
            if (data.length > 0) {
                obj = {
                    ...obj,
                    sorter: (a: any, b: any) =>
                        sorterProgrammer(a[item], b[item]),
                };
                if (typeof data[0][item] === 'string') {
                    obj = { ...obj, ...getColumnSearchProps(item) };
                }
            }
            return obj;
        });
        setColumns(columnsCreated);
    }

    useEffect(() => {
        if (table && cols) {
            columnCreator(cols, table.data);
        }
    }, [table, cols]);

    return (
        <div>
            {table?.columns && (
                <div className="flex flex-col mb-6 shadow bg-white rounded-2xl p-6">
                    <span className="text-lg font-bold mb-6">
                        Filter Columns You Want to See here
                    </span>
                    <div className="flex flex-row">
                        <Checkbox.Group
                            onChange={(e) => setCols(e)}
                            value={cols}
                        >
                            {table?.columns.map((item, index) => (
                                <Checkbox key={index} value={item}>
                                    <span className="text-base">{item}</span>
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col mb-6 shadow bg-white rounded-2xl p-6">
                    <span className="text-lg font-bold mb-6">
                        You Can Submit New Forms Here
                    </span>
                    <div className="w-full h-12">
                        <Button
                            className="w-full h-full"
                            style={{ height: '100%' }}
                            type="primary"
                            onClick={() => navigation(ROUTES.FORM)}
                        >
                            Go to Form Page
                        </Button>
                    </div>
                    <div className="flex flex-row"></div>
                </div>
                <div className="flex flex-col mb-6 shadow bg-white rounded-2xl p-6">
                    <span className="text-lg font-bold mb-6">
                        Set Page Size Want to See here
                    </span>
                    <Input
                        placeholder={`Enter Page Size here`}
                        className="w-full h-12"
                        type="number"
                        min={1}
                        max={100}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        value={pageSize}
                    />
                    <div className="flex flex-row"></div>
                </div>
            </div>
            {cols.length > 0 && (
                <div className="bg-white w-full overflow-x-scroll rounded-2xl shadow p-6">
                    <Table
                        columns={columns}
                        dataSource={table?.data}
                        pagination={{ pageSize }}
                    />
                </div>
            )}
        </div>
    );
};

export default ListHomePage;
/* eslint-enable */
