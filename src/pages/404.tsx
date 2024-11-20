import React from "react";
import Link from "next/link";
import { Button, Stack, Text, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { SEO } from "src/constants/seo";
import Layout from "src/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <NextSeo {...SEO} title="404 | ToDiagram" noindex nofollow />
      <Stack mt={100} justify="center" align="center">
        <Title fz={150} style={{ fontFamily: "monospace" }}>
          404
        </Title>
        <Text c="dimmed" maw={800} style={{ textAlign: "center" }}>
          您要打开的页面不存在。您可能输入了错误的地址，或者该页面已移动到另一个 URL。
        </Text>
        <Link href="/">
          <Button size="lg" color="gray" type="button">
            返回首页
          </Button>
        </Link>
      </Stack>
    </Layout>
  );
};

export default NotFound;
