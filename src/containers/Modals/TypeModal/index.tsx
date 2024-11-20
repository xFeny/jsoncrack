import React from "react";
import type { ModalProps } from "@mantine/core";
import { Stack, Modal, Select, ScrollArea } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { event as gaEvent } from "nextjs-google-analytics";
import useJson from "src/store/useJson";

enum Language {
  TypeScript = "typescript",
  TypeScript_Combined = "typescript/typealias",
  Go = "go",
  JSON_SCHEMA = "json_schema",
  Kotlin = "kotlin",
  Java = "java",
  Python = "python",
  Rust = "rust",
}

const typeOptions = [
  {
    label: "TypeScript",
    value: Language.TypeScript,
    lang: "typescript",
  },
  {
    label: "TypeScript (combined)",
    value: Language.TypeScript_Combined,
    lang: "typescript",
  },
  {
    label: "Go",
    value: Language.Go,
    lang: "go",
  },
  {
    label: "JSON Schema",
    value: Language.JSON_SCHEMA,
    lang: "json",
  },
  {
    label: "Kotlin",
    value: Language.Kotlin,
    lang: "kotlin",
  },
  {
    label: "Java",
    value: Language.Java,
    lang: "java",
  },
  {
    label: "Python",
    value: Language.Python,
    lang: "python",
  },
  {
    label: "Rust",
    value: Language.Rust,
    lang: "rust",
  },
];

export const TypeModal = ({ opened, onClose }: ModalProps) => {
  const getJson = useJson(state => state.getJson);
  const [type, setType] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<Language>(Language.TypeScript);

  const editorLanguage = React.useMemo(() => {
    return typeOptions[typeOptions.findIndex(o => o.value === selectedType)]?.lang;
  }, [selectedType]);

  const transformer = React.useCallback(
    async ({ value }) => {
      const { run } = await import("json_typegen_wasm");
      return run(
        "Root",
        value,
        JSON.stringify({
          output_mode: selectedType,
        })
      );
    },
    [selectedType]
  );

  React.useEffect(() => {
    if (opened) {
      try {
        if (selectedType === Language.Go) {
          import("src/lib/utils/json2go").then(jtg => {
            import("gofmt.js").then(gofmt => {
              const types = jtg.default(getJson());
              setType(gofmt.default(types.go));
            });
          });
        } else if (selectedType === Language.Java) {
          import("src/lib/utils/jsonToJavaBean").then(jtg => {
            const javaBean = jtg.default(getJson());
            setType(javaBean);
          });
        } else if (selectedType === Language.Python) {
          import("src/lib/utils/jsonToPython").then(jtg => {
            const json = JSON.parse(getJson());
            const python = jtg.default(json);
            setType(python);
          });
        } else {
          transformer({ value: getJson() }).then(setType);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [getJson, opened, selectedType, transformer]);

  return (
    <Modal title="生成类型" size="lg" opened={opened} onClose={onClose} centered>
      <Stack pos="relative">
        <Select
          value={selectedType}
          data={typeOptions}
          onChange={e => {
            setSelectedType(e as Language);
            gaEvent("generate_type", { label: e as Language });
          }}
          allowDeselect={false}
        />
        <ScrollArea.Autosize mah={400} maw={700}>
          <CodeHighlight
            language={editorLanguage}
            copyLabel="复制"
            copiedLabel="复制成功"
            code={type}
            styles={{ root: { borderRadius: 6 } }}
          />
        </ScrollArea.Autosize>
      </Stack>
    </Modal>
  );
};
