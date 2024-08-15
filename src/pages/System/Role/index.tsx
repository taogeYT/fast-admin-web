import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import React, { useState } from 'react';
import EditRoleModal from './components/EditRoleModal';

type RoleData = {
  id: number;
  roleName: string;
  roleCode: string;
  dataScope: string;
  tenantName: string;
  sort: number;
  status: string;
};

const dataSource: RoleData[] = [
  {
    id: 1,
    roleName: '系统管理员',
    roleCode: 'sys_admin',
    dataScope: '全部数据',
    tenantName: 'XXX公司',
    sort: 100,
    status: '启用',
  },
  // 其他数据...
];

const handleDelete = (id: number): void => {
  console.log('Delete role with ID:', id);
};

const RoleManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const columns: ProColumns<RoleData>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      valueType: 'index',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '数据范围',
      dataIndex: 'dataScope',
      key: 'dataScope',
    },
    {
      title: '租户名称',
      dataIndex: 'tenantName',
      key: 'tenantName',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      valueType: 'digit',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <span style={{ color: text === '启用' ? 'green' : 'red' }}>{text}</span>
      ),
    },
    {
      title: '修改记录',
      key: 'details',
      render: (_: any, record: RoleData) => <a href={`/details/${record.id}`}>详情</a>,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: RoleData) => (
        <Space size="middle">
          <Popconfirm title="确定要删除这个角色吗?" onConfirm={() => handleDelete(record.id)}>
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
          <a
            onClick={() => {
              setSelectedRole(record);
              setModalVisible(true);
            }}
          >
            编辑
          </a>
          <a>接口资源</a>
          <a>数据范围</a>
        </Space>
      ),
    },
  ];

  const handleSave = (updatedRole: RoleData) => {
    console.log('Updated Role:', updatedRole);
    setModalVisible(false);
    // 在这里你可以更新角色列表数据
  };

  return (
    <PageContainer>
      <ProTable<RoleData>
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button key="search" type="primary">
              {searchText}
            </Button>,
            <Button key="reset" onClick={() => form?.resetFields()}>
              {resetText}
            </Button>,
          ],
        }}
        toolBarRender={() => [
          <Button key="button" type="primary">
            新增
          </Button>,
          <Button key="button">设置基础接口资源</Button>,
        ]}
      />
      {selectedRole && (
        <EditRoleModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSave={handleSave}
          roleData={selectedRole}
        />
      )}
    </PageContainer>
  );
};

export default RoleManagement;
