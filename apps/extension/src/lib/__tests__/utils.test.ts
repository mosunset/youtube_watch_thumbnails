import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
    it("偽の値を除いてクラス名をつなぐ", () => {
        expect(cn("a", false, null, "b")).toBe("a b");
    });

    it("ぶつかる Tailwind のクラスは後ろを残す", () => {
        expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
    });
});
