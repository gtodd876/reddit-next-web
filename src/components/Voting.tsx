import { Flex, IconButton } from '@chakra-ui/core';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';
import { useState } from 'react';

interface VotingProps {
  post: PostSnippetFragment; // also works - PostsQuery['posts']['page'][0]
}

export default function Voting({ post }: VotingProps) {
  const [points, setPoints] = useState(post.points);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
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
          if (!hasUpVoted) {
            const result = await vote({
              postId: post.id,
              value: 1,
            });
            if (result.data?.vote) {
              setPoints(result.data.vote.points);
            }
          }

          setLoadingState('not-loading');
          setHasUpVoted(true);
          setHasDownVoted(false);
        }}
        isLoading={loadingState === 'upvote-loading'}
      />
      {points}
      <IconButton
        icon="chevron-down"
        size="sm"
        aria-label="Downvote post"
        onClick={async () => {
          setLoadingState('downvote-loading');
          if (!hasDownVoted) {
            const result = await vote({
              postId: post.id,
              value: -1,
            });
            if (result.data?.vote) {
              setPoints(result.data.vote.points);
            }
          }
          setLoadingState('not-loading');
          setHasDownVoted(true);
          setHasUpVoted(false);
        }}
        isLoading={loadingState === 'downvote-loading'}
      />
    </Flex>
  );
}
