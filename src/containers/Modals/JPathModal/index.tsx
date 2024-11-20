import React from "react";
import type { ModalProps } from "@mantine/core";
import { Stack, Modal, Button, Text, Anchor, Group, TextInput } from "@mantine/core";
import { JSONPath } from "jsonpath-plus";
import { event as gaEvent } from "nextjs-google-analytics";
import toast from "react-hot-toast";
import { VscLinkExternal } from "react-icons/vsc";
import useFile from "src/store/useFile";
import useJson from "src/store/useJson";

export const JPathModal = ({ opened, onClose }: ModalProps) => {
  const getJson = useJson(state => state.getJson);
  const setContents = useFile(state => state.setContents);
  const [query, setQuery] = React.useState("");

  const evaluteJsonPath = () => {
    try {
      const json = getJson();
      const result = JSONPath({ path: query, json: JSON.parse(json) });

      setContents({ contents: JSON.stringify(result, null, 2) });
      gaEvent("run_json_path");
      onClose();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Modal title="JSON Path" size="lg" opened={opened} onClose={onClose} centered>
      <Stack>
        <Text fz="sm">
          JsonPath 表达式总是以与 XPath 表达式相同的方式引用 JSON 结构。 与 XML 文档结合使用一样。
          在中的&quot;root&quot;总是被称为 $，而不管它是对象还是数组。
          <br />
          <Anchor
            fz="sm"
            target="_blank"
            href="https://docs.oracle.com/cd/E60058_01/PDF/8.0.8.x/8.0.8.0.0/PMF_HTML/JsonPath_Expressions.htm"
          >
            阅读文档。
            <VscLinkExternal />
          </Anchor>
        </Text>
        <TextInput
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
          placeholder="输入 JSON Path..."
          data-autofocus
        />
        <Group justify="right">
          <Button onClick={evaluteJsonPath} disabled={!query.length}>
            运行
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
