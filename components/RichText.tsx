"use client";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { cn } from "@/libs/cn";

type RichTextProps = {
  data: SerializedEditorState;
};

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => {
  return {
    ...defaultConverters,
    paragraph: ({ node, nodesToJSX }) => {
      return (
        <p className="leading-relaxed">
          {nodesToJSX({
            nodes: node.children,
          })}
        </p>
      );
    },
    list: ({ node, nodesToJSX }) => {
      const Tag = node.tag === "ol" ? "ol" : "ul";
      return (
        <Tag className="pl-5 space-y-1 list-disc list-outside">
          {nodesToJSX({
            nodes: node.children,
          })}
        </Tag>
      );
    },
    text: ({ node }) => {
      return (
        <span
          className={cn(
            node.format && node.format & 1 ? "font-bold" : "",
            node.format && node.format & 2 ? "italic" : "",
          )}
        >
          {node.text}
        </span>
      );
    },
  };
};

export const RichText: React.FC<RichTextProps> = ({ data }) => {
  return (
    <div className="c-cms-content space-y-2 text-on-surface-variant body-md">
      <PayloadRichText data={data} converters={jsxConverters} />
    </div>
  );
};
