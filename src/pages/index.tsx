import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import { Link, Stack, Box, Heading, Text, Flex, Button } from '@chakra-ui/core';
import { useState } from 'react';

function Index() {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data?.posts) {
    return <div>no posts are available</div>;
  }
  console.log({ data });
  return (
    <Layout>
      <Flex justifyContent="space-between" align="center">
        <Heading>Reddit Next</Heading>
        <NextLink href="/create-post">
          <Link>create post</Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data?.posts ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts?.page?.map(p => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>{' '}
              <Text>by {p.creator.username}</Text>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex justifyContent="center">
          <Button
            isLoading={fetching}
            my={8}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.page[data.posts.page.length - 1].createdAt,
              })
            }
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
