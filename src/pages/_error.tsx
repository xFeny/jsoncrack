import React from "react";
import { useRouter } from "next/router";
import { Button, Stack, Text, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { SEO } from "src/constants/seo";
import Layout from "src/layout/Layout";

const Custom500 = () => {
  const router = useRouter();

  return (
    <Layout>
      <NextSeo {...SEO} title="Unexpected Error Occured | ToDiagram" />
      <Stack mt={100} justify="center" align="center">
        <Title fz={150} style={{ fontFamily: "monospace" }}>
          500
        </Title>
        <Title order={2}>发生了一些糟糕的事情...</Title>
        <Text c="dimmed" maw={800} style={{ textAlign: "center" }}>
          我们的服务器无法处理您的请求。请尝试刷新页面。
        </Text>
        <Button size="lg" color="gray" type="button" onClick={() => router.reload()}>
          刷新页面
        </Button>
      </Stack>
    </Layout>
  );
};

export default Custom500;
