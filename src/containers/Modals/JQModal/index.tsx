import React from "react";
import type { ModalProps } from "@mantine/core";
import { Stack, Modal, Button, Text, Anchor, Group, TextInput } from "@mantine/core";
import { VscLinkExternal } from "react-icons/vsc";
import useJsonQuery from "src/hooks/useJsonQuery";

export const JQModal = ({ opened, onClose }: ModalProps) => {
  const { updateJson } = useJsonQuery();
  const [query, setQuery] = React.useState("");

  return (
    <Modal title="JSON Query" size="lg" opened={opened} onClose={onClose} centered>
      <Stack>
        <Text fz="sm">
          jq 是一个轻量级且灵活的命令行 JSON 处理器。 JSON Crack使用简化版本的jq，并非支持所有功能。
          <br />
          <Anchor
            fz="sm"
            target="_blank"
            href="https://jqlang.github.io/jq/manual/"
            rel="noopener noreferrer"
          >
            阅读文档。
            <VscLinkExternal />
          </Anchor>
        </Text>
        <TextInput
          leftSection="jq"
          placeholder="输入 jq query"
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
        />
        <Group justify="right">
          <Button onClick={() => updateJson(query, onClose)}>显示在图表上</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
