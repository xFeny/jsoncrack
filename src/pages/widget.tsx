import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMantineColorScheme } from "@mantine/core";
import { ThemeProvider } from "styled-components";
import { NextSeo } from "next-seo";
import toast from "react-hot-toast";
import { darkTheme, lightTheme } from "src/constants/theme";
import useGraph from "src/containers/Editor/components/views/GraphView/stores/useGraph";
import { TreeView } from "src/containers/Editor/components/views/TreeView";
import { Toolbar } from "src/containers/Toolbar";
import { ViewMode } from "src/enums/viewMode.enum";
import useConfig from "src/store/useConfig";
import useFile from "src/store/useFile";
import type { LayoutDirection } from "src/types/graph";

interface EmbedMessage {
  data: {
    json?: string;
    options?: {
      theme?: "light" | "dark";
      direction?: LayoutDirection;
    };
  };
}

const GraphView = dynamic(
  () => import("src/containers/Editor/components/views/GraphView").then(c => c.GraphView),
  {
    ssr: false,
  }
);

const WidgetPage = () => {
  const { query, push, isReady } = useRouter();
  const { setColorScheme } = useMantineColorScheme();
  const [theme, setTheme] = React.useState<"dark" | "light">("light");
  const checkEditorSession = useFile(state => state.checkEditorSession);
  const setContents = useFile(state => state.setContents);
  const setDirection = useGraph(state => state.setDirection);
  const clearGraph = useGraph(state => state.clearGraph);

  React.useEffect(() => {
    if (isReady) {
      if (typeof query?.json === "string") checkEditorSession(query.json, true);
      else clearGraph();

      window.parent.postMessage(window.frameElement?.getAttribute("id"), "*");
    }
  }, [clearGraph, checkEditorSession, isReady, push, query.json, query.partner]);

  React.useEffect(() => {
    const handler = (event: EmbedMessage) => {
      try {
        if (!event.data?.json) return;
        if (event.data?.options?.theme === "light" || event.data?.options?.theme === "dark") {
          setTheme(event.data.options.theme);
        }

        setContents({ contents: event.data.json, hasChanges: false });
        setDirection(event.data.options?.direction || "RIGHT");
      } catch (error) {
        console.error(error);
        toast.error("无效的 JSON!");
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setColorScheme, setContents, setDirection, theme]);

  React.useEffect(() => {
    setColorScheme(theme);
  }, [setColorScheme, theme]);

  const ModalController = dynamic(() => import("src/layout/ModalController"));
  const View = () => {
    const viewMode = useConfig(state => state.viewMode);

    if (viewMode === ViewMode.Graph) return <GraphView isWidget />;
    if (viewMode === ViewMode.Tree) return <TreeView />;
    return null;
  };

  return (
    <>
      <NextSeo noindex nofollow />
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <ModalController />
        <Toolbar />
        <View />
      </ThemeProvider>
    </>
  );
};

export default WidgetPage;
