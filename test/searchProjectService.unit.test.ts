import { beforeEach, describe, expect, it, vi } from "vitest";
import { newtApiService } from "../src/http/newtApi/newtApiService.js";
import { SearchProjectService } from "../src/services/searchProjectService.js";
import * as commonUtils from "../src/utils/commonUtils.js";

vi.mock("../src/http/newtApi/newtApiService.js");
vi.mock("../src/utils/commonUtils.js");

describe("SearchProjectService - searchProjectsWith", () => {
  let service: SearchProjectService;

  beforeEach(() => {
    service = new SearchProjectService();
    vi.clearAllMocks();
  });

  it("returns projects and normalizes technologies to an array", async () => {
    const needle = "solar";

    vi.spyOn(newtApiService, "searchProjectsWith").mockResolvedValue({} as any);
    vi.spyOn(commonUtils, "observableToPromise").mockResolvedValue({
      data: [
        { id: "p1", title: "A", technologies: ["ts", "react"] },
        { id: "p2", title: "B", technologies: "not-an-array" }
      ]
    } as any);

    const result = await service.searchProjectsWith(needle);

    expect(newtApiService.searchProjectsWith).toHaveBeenCalledWith(needle);
    expect(commonUtils.observableToPromise).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      { id: "p1", title: "A", technologies: ["ts", "react"] },
      { id: "p2", title: "B", technologies: [] }
    ]);
  });

  it("returns [] when observableToPromise rejects", async () => {
    vi.spyOn(newtApiService, "searchProjectsWith").mockResolvedValue({} as any);
    vi.spyOn(commonUtils, "observableToPromise").mockRejectedValue(new Error("boom"));

    const result = await service.searchProjectsWith("anything");
    expect(result).toEqual([]);
  });

  it("returns [] when results.data is not an array", async () => {
    vi.spyOn(newtApiService, "searchProjectsWith").mockResolvedValue({} as any);
    vi.spyOn(commonUtils, "observableToPromise").mockResolvedValue({
      data: { not: "an-array" }
    } as any);

    const result = await service.searchProjectsWith("anything");
    expect(result).toEqual([]);
  });
});
