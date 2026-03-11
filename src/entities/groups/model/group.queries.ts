export const groupKeys = {
  all: ['groups'] as const,
  lists: () => [...groupKeys.all, 'list'] as const,
  list: (params: Record<string, string>) =>
    [...groupKeys.lists(), params] as const,
  details: () => [...groupKeys.all, 'detail'] as const,
  detail: (id: string) => [...groupKeys.details(), id] as const,
  notices: (id: string) => [...groupKeys.detail(id), 'notices'] as const,
  joined: () => [...groupKeys.all, 'joined'] as const,
  liked: () => [...groupKeys.all, 'liked'] as const,
  pending: () => [...groupKeys.all, 'pending'] as const,
  ranking: () => [...groupKeys.all, 'ranking'] as const,
};
