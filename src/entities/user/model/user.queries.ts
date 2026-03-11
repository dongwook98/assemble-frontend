export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  settings: () => [...userKeys.all, 'settings'] as const,
  notifications: () => [...userKeys.settings(), 'notifications'] as const,
};
