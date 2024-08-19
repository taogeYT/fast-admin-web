import { Form, Input, Modal, Radio, Tree } from 'antd';
import React, { useState } from 'react';

type EditRoleModalProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: (role: Role.RoleData) => void;
  roleData: Role.RoleItem;
};

const treeData = [
  {
    title: '系统管理',
    key: 'system_management',
    children: [
      { title: '账号管理', key: 'account_management' },
      { title: '角色管理', key: 'role_management' },
      { title: '机构管理', key: 'organization_management' },
      { title: '职位管理', key: 'position_management' },
      { title: '个人中心', key: 'personal_center' },
      { title: '通知公告', key: 'notifications' },
      { title: '三方账号', key: 'third_party_accounts' },
    ],
  },
  {
    title: '平台管理',
    key: 'platform_management',
    children: [
      { title: '菜单管理', key: 'menu_management' },
      { title: '租户管理', key: 'tenant_management' },
      { title: '参数配置', key: 'parameter_configuration' },
      { title: '字典管理', key: 'dictionary_management' },
      { title: '任务调度', key: 'task_scheduling' },
      { title: '系统监控', key: 'system_monitoring' },
      { title: '缓解管理', key: 'mitigation_management' },
      { title: '行政区域', key: 'administrative_region' },
      { title: '文件管理', key: 'file_management' },
      { title: '打印模板', key: 'print_template' },
      { title: '动态插件', key: 'dynamic_plugins' },
      { title: '开放接口', key: 'open_api' },
      { title: '系统配置', key: 'system_configuration' },
      { title: '微信支付', key: 'wechat_payments' },
      { title: '日志管理', key: 'log_management' },
    ],
  },
];

const EditRoleModal: React.FC<EditRoleModalProps> = ({ visible, onCancel, onSave, roleData }) => {
  const [form] = Form.useForm<Role.RoleData>();

  const [checkedKeys, setCheckedKeys] = useState<string[]>(roleData.permissions || []);

  const onCheck = (checkedKeysValue: string[]) => {
    setCheckedKeys(checkedKeysValue);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedRole = {
        ...values,
        id: roleData.id,
        data_scope: 1,
        permissions: checkedKeys,
      };
      onSave(updatedRole);
    });
  };

  return (
    <Modal title="编辑角色" open={visible} onCancel={onCancel} onOk={handleSave}>
      <Form form={form} layout="vertical" initialValues={roleData}>
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="角色编码"
          name="code"
          rules={[{ required: true, message: '请输入角色编码' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ required: true, message: '请输入排序值' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态' }]}>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="菜单权限">
          <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRoleModal;
