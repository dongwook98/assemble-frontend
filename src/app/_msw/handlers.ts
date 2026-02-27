import { groupHandlers } from '@/entities/groups/api/msw/handlers';
import { authHandlers } from '@/features/auth/api/msw/handlers';

export const allHandlers = [...groupHandlers, ...authHandlers];
