import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBoardPost } from './createBoardPost';
import { CreatePostRequest } from '../model/types';

export const useCreateBoardPost = (groupId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createBoardPost(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', groupId, 'posts'] });
    },
  });
};
