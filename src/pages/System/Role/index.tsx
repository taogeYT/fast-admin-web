import { create_role, query_role, update_role } from '@/services/api/role';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import React, { useRef, useState } from 'react';
import EditRoleModal from './components/EditRoleModal';

type RoleData = Role.RoleItem;

const handleDelete = (id: number): void => {
  console.log('Delete role with ID:', id);
};

const RoleManagement: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const ref = useRef<ActionType>();
  const columns: ProColumns<RoleData>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      valueType: 'index',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '数据范围',
      dataIndex: 'data_scope',
      key: 'data_scope',
      hideInSearch: true,
      valueEnum: {
        1: { text: <span>全部数据</span> },
        2: { text: <span>部门数据</span> },
      },
    },
    {
      title: '租户名称',
      dataIndex: 'tenantName',
      key: 'tenantName',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      valueType: 'digit',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      valueEnum: {
        1: { text: <span style={{ color: 'green' }}>启用</span> },
        0: { text: <span style={{ color: 'red' }}>停用</span> },
      },
    },
    {
      title: '修改记录',
      key: 'details',
      hideInSearch: true,
      render: (_: any, record: RoleData) => <a href={`/details/${record.id}`}>详情</a>,
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
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

  const handleSave = async (data: RoleData) => {
    if (data.id > 0) {
      console.log('Updated Role:', data);
      await update_role(data.id, data);
    } else {
      console.log('New Role:', data);
      await create_role(data);
    }
    setModalVisible(false);
    // 在这里你可以更新角色列表数据
    await ref.current?.reload();
  };

  return (
    <PageContainer>
      <ProTable<RoleData>
        actionRef={ref}
        columns={columns}
        request={query_role}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          // optionRender: ({ searchText, resetText }, { form }) => [
          //   <Button key="search" type="primary">
          //     {searchText}
          //   </Button>,
          //   <Button key="reset" onClick={() => form?.resetFields()}>
          //     {resetText}
          //   </Button>,
          // ],
        }}
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={async () => {
              setSelectedRole({
                id: 0,
                name: '',
                code: '',
                data_scope: 1,
                tenantName: '',
                sort: 100,
                status: 1,
              });
              setModalVisible(true);
            }}
          >
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
