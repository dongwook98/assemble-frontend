import { ROUTES } from './core';

export const groupRoutes = {
  root: () => ROUTES.GROUPS,
  detail: (groupId: number) => `${ROUTES.GROUPS}/${groupId}`,
  edit: (groupId: number) => `${ROUTES.GROUPS}/${groupId}/edit`,
  create: () => `${ROUTES.GROUPS}/create`,
  addSearchParams: (params: Record<string, string | number | undefined>) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${ROUTES.GROUPS}?${queryString}` : ROUTES.GROUPS;
  },
};
