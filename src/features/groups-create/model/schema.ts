import { z } from 'zod';

export const LEVELS = ['LOW', 'MID', 'HIGH'] as const;
export const CATEGORIES = [
  'STUDY',
  'EXERCISE',
  'PROJECT',
  'HOBBY',
  'CULTURE_ART',
] as const;

export const createGroupSchema = z.object({
  name: z.string().min(2, {
    error: '모임 이름은 2자 이상이어야 합니다.',
  }),

  level: z.enum(LEVELS, {
    error: '난이도를 선택해주세요.',
  }),

  category: z.enum(CATEGORIES, {
    error: '카테고리를 선택해주세요.',
  }),

  region: z.string().min(1, {
    error: '지역을 입력해주세요.',
  }),

  maxNumber: z
    .number()
    .min(2, { error: '최소 2명 이상이어야 합니다.' })
    .max(100, { error: '최대 100명까지 가능합니다.' }),

  description: z.string().min(10, {
    error: '설명은 10자 이상 작성해주세요.',
  }),

  imageUrl: z.string().optional(),
});

export type CreateGroupFormValues = z.infer<typeof createGroupSchema>;
