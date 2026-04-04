"use client";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";

type RichTextProps = {
  data: SerializedEditorState;
};

export const RichText: React.FC<RichTextProps> = ({ data }) => {
  return (
    <div className="c-cms-content">
      <PayloadRichText data={data} />
    </div>
  );
};
