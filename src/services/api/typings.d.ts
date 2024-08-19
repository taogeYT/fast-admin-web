declare namespace Common {
  type PaginationResult<T> = {
    count: number;
    results: T[];
  };
  type ItemList<T> = {
    data?: T[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}

declare namespace Role {
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RoleItem = {
    id: number;
    name: string;
    code: string;
    data_scope: number;
    tenantName: string;
    sort: number;
    status: int;
    remark?: string;
  };

  type RoleData = RoleItem & {
    permissions: string[];
  };

  type RoleList = {
    data?: RoleItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
}
