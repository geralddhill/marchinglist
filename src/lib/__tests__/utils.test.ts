import { formatDuration, formatPrice, secondsToISO } from "@/lib/utils";

describe("Utils", () => {
  describe("formatDuration", () => {
    it("Valid duration is formatted correctly", () => {
      expect(formatDuration(320)).toBe("5:20");
    })

    it("Duration of 0 is formatted correctly", () => {
      expect(formatDuration(0)).toBe("0:00");
    })

    it("Negative duration is rejected", () => {
      expect(() => formatDuration(-1)).toThrow(RangeError);
    })

    it("Duration at least 1 hour is rejected", () => {
      expect(() => formatDuration(3600)).toThrow(RangeError);
    });
  })

  describe("secondsToISO", () => {
    it("Valid duration is formatted correctly", () => {
      expect(secondsToISO(320)).toBe("PT0H5M20S");
    });

    it("Duration of 0 is formatted correctly", () => {
      expect(secondsToISO(0)).toBe("PT0H0M0S");
    });

    it("Negative duration is rejected", () => {
      expect(() => secondsToISO(-1)).toThrow(RangeError);
    });

    it("Duration at least 1 hour is rejected", () => {
      expect(() => secondsToISO(3600)).toThrow(RangeError);
    });
  })

  describe("formatPrice", () => {
    it("Valid price is formatted correctly", () => {
      expect(formatPrice(1200)).toBe("$1,200");
    })

    it("Negative price is rejected", () => {
      expect(() => formatPrice(-1)).toThrow(RangeError);
    });
  })
})