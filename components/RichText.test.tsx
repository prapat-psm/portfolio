// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "./RichText";

const listDoc = (tag: "ol" | "ul") =>
  ({
    root: {
      type: "root",
      version: 1,
      direction: null,
      format: "",
      indent: 0,
      children: [
        {
          type: "list",
          tag,
          listType: tag === "ol" ? "number" : "bullet",
          start: 1,
          version: 1,
          direction: null,
          format: "",
          indent: 0,
          children: [
            {
              type: "listitem",
              value: 1,
              version: 1,
              direction: null,
              format: "",
              indent: 0,
              children: [{ type: "text", text: "Item", format: 0, version: 1, detail: 0, mode: "normal", style: "" }],
            },
          ],
        },
      ],
    },
  }) as unknown as SerializedEditorState;

describe("RichText", () => {
  it("renders ordered lists with numbers", () => {
    const { container } = render(<RichText data={listDoc("ol")} />);
    expect(container.querySelector("ol")?.className).toContain("list-decimal");
  });

  it("renders unordered lists with bullets", () => {
    const { container } = render(<RichText data={listDoc("ul")} />);
    expect(container.querySelector("ul")?.className).toContain("list-disc");
  });
});
