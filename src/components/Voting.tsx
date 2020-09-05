import { Flex, IconButton } from '@chakra-ui/core';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';
import { useState } from 'react';

interface VotingProps {
  post: PostSnippetFragment; // also works - PostsQuery['posts']['page'][0]
}

export default function Voting({ post }: VotingProps) {
  const [loadingState, setLoadingState] = useState<
    'upvote-loading' | 'downvote-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={6}>
      <IconButton
        icon="chevron-up"
        size="sm"
        aria-label="Upvote post"
        onClick={async () => {
          setLoadingState('upvote-loading');
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'upvote-loading'}
      />
      {post.points}
      <IconButton
        icon="chevron-down"
        size="sm"
        aria-label="Downvote post"
        onClick={async () => {
          setLoadingState('downvote-loading');
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading');
        }}
        isLoading={loadingState === 'downvote-loading'}
      />
    </Flex>
  );
}
