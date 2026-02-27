export const GROUP_FILTER_KEYS = {
  CATEGORY: 'category',
  STATUS: 'status',
  LEVEL: 'level',
  SORT: 'sort',
  REGION: 'region',
} as const;

export type GroupFilterKey =
  (typeof GROUP_FILTER_KEYS)[keyof typeof GROUP_FILTER_KEYS];

export type GroupFilterValues = {
  [GROUP_FILTER_KEYS.CATEGORY]:
    | 'all'
    | 'study'
    | 'exercise'
    | 'project'
    | 'hobby'
    | 'culture_art';
  [GROUP_FILTER_KEYS.STATUS]: 'online' | 'recruiting';
  [GROUP_FILTER_KEYS.LEVEL]: 'beginner' | 'intermediate' | 'advanced';
  [GROUP_FILTER_KEYS.SORT]: 'latest' | 'popular';
  [GROUP_FILTER_KEYS.REGION]: string;
};
