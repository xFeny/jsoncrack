import React from "react";
import { ActionIcon, Flex, Tooltip, Text } from "@mantine/core";
import { event as gaEvent } from "nextjs-google-analytics";
import { LuFocus, LuMaximize, LuMinus, LuPlus } from "react-icons/lu";
import { TiFlowMerge } from "react-icons/ti";
import type { LayoutDirection } from "src/types/graph";
import { SearchInput } from "../../../../Toolbar/SearchInput";
import useGraph from "./stores/useGraph";

const getNextDirection = (direction: LayoutDirection) => {
  if (direction === "RIGHT") return "DOWN";
  if (direction === "DOWN") return "LEFT";
  if (direction === "LEFT") return "UP";
  return "RIGHT";
};

export const ZoomControl = () => {
  const zoomIn = useGraph(state => state.zoomIn);
  const zoomOut = useGraph(state => state.zoomOut);
  const centerView = useGraph(state => state.centerView);
  const setDirection = useGraph(state => state.setDirection);
  const focusFirstNode = useGraph(state => state.focusFirstNode);
  const direction = useGraph(state => state.direction);

  const toggleDirection = () => {
    const nextDirection = getNextDirection(direction || "RIGHT");
    if (setDirection) setDirection(nextDirection);
  };

  return (
    <Flex
      align="center"
      gap="xs"
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        alignItems: "start",
        zIndex: 100,
      }}
    >
      <ActionIcon.Group borderWidth={0}>
        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">旋转布局</Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={() => {
              toggleDirection();
              gaEvent("rotate_layout", { label: direction });
            }}
          >
            <TiFlowMerge />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">聚焦第一个节点</Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={() => {
              focusFirstNode();
              gaEvent("focus_first_node");
            }}
          >
            <LuFocus />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">显示整个图形</Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={() => {
              centerView();
              gaEvent("center_view");
            }}
          >
            <LuMaximize />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">缩小</Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={() => {
              zoomOut();
              gaEvent("zoom_out");
            }}
          >
            <LuMinus />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label={
            <Flex fz="xs" gap="md">
              <Text fz="xs">放大</Text>
            </Flex>
          }
          withArrow
        >
          <ActionIcon
            size="lg"
            variant="light"
            color="gray"
            onClick={() => {
              zoomIn();
              gaEvent("zoom_in");
            }}
          >
            <LuPlus />
          </ActionIcon>
        </Tooltip>
      </ActionIcon.Group>
      <SearchInput />
    </Flex>
  );
};
