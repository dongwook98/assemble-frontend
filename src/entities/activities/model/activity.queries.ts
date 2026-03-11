export const activityKeys = {
  all: ['activities'] as const,
  posts: () => [...activityKeys.all, 'posts'] as const,
  comments: () => [...activityKeys.all, 'comments'] as const,
};
