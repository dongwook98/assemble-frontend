'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyPosts } from './getMyPosts';
import { MyPost } from '../model/types';
import { activityKeys } from '../model/activity.queries';

export const useMyPosts = () => {
  return useSuspenseQuery({
    queryKey: activityKeys.posts(),
    queryFn: getMyPosts,
    select: (data): MyPost[] =>
      data.list.map((p) => ({
        id: p.postId,
        groupId: p.clubId,
        groupName: p.clubName,
        title: p.title,
        content: p.content,
        imageUrl: p.imageUrl,
        commentCount: p.commentCount,
        likeCount: p.likeCount,
        createdAt: p.createdAt,
      })),
    staleTime: 60 * 1000,
  });
};
