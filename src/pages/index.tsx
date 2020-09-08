import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  Code,
} from '@chakra-ui/core';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { useState } from 'react';
import EditDeletePostButtons from '../components/EditDeletePostButtons';
import Layout from '../components/Layout';
import Voting from '../components/Voting';
import { useMeQuery, usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

function Index() {
  const [{ data: meData }] = useMeQuery();
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data?.posts) {
    return (
      <div>
        no posts are available <Code>{error?.message}</Code>
      </div>
    );
  }
  return (
    <Layout>
      {/* <Flex justifyContent="space-between" align="center"> */}
      {/* <Heading>Reddit Next</Heading> */}

      <NextLink href="/create-post">
        <Button as={Link} marginBottom={8}>
          create post
        </Button>
      </NextLink>
      {/* </Flex> */}
      <br />
      {fetching && !data?.posts ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts?.page?.map(p =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <Voting post={p} />
                <Flex direction="column" flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl" width="100%">
                        {p.title}
                      </Heading>
                    </Link>
                  </NextLink>
                  <Text>by {p.creator.username}</Text>
                  <Flex>
                    <Text mt={4} flex={1}>
                      {p.textSnippet}
                    </Text>
                    {meData?.me?.id !== p.creator.id ? null : (
                      <EditDeletePostButtons id={p.id} />
                    )}
                  </Flex>
                </Flex>
              </Flex>
            )
          )}
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
