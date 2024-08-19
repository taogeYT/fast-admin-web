import { normalize_item_list } from '@/services/api/utils';
import { request } from '@umijs/max';

/** 获取角色 GET /api/role */
export async function query_role(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const response = await request<Common.PaginationResult<Role.RoleItem>>('/api/role', {
    method: 'GET',
    params: {
      page: params.current,
      page_size: params.pageSize,
    },
    ...(options || {}),
  });
  return normalize_item_list(response);
}

/** 新建角色 POST /api/role */
export async function create_role(data: Role.RoleItem, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/role', {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/** 更新角色 POST /api/role/role_id */
export async function update_role(
  pk: number,
  data: Role.RoleItem,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/role/' + pk, {
    method: 'PUT',
    data: data,
    ...(options || {}),
  });
}
