import { Box, IconButton, Link } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useDeletePostMutation } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number;
}

export default function EditDeletePostButtons({
  id,
}: EditDeletePostButtonsProps) {
  const [, deletePost] = useDeletePostMutation();
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton as={Link} mr={4} icon="edit" aria-label="edit post" />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="delete post"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
}
