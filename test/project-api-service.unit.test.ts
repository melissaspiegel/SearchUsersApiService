import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProjectDTO } from "../src/dtos/Project.js";
import { ProjectApiService } from "../src/services/ProjectApiService.js";
import { newtApiService } from "../src/http/newtApi/newtApiService.js";
import * as commonUtils from "../src/utils/commonUtils.js";

vi.mock("../src/http/newtApi/newtApiService.js");
vi.mock("../src/utils/commonUtils.js", () => ({
  observableToPromise: vi.fn(),
  formatErrorMessage: vi.fn()
}));

describe("ProjectApiService - updateProject", () => {
  let service: ProjectApiService;

  const mockProject = {
    id: "proj-123",
    title: "Test Project",
    createdBy: "user-1",
    status: "ACTIVE",
    description: "Test description"
  } as ProjectDTO;

  beforeEach(() => {
    service = new ProjectApiService();
    vi.clearAllMocks();
  });

  it("should successfully update a project", async () => {
    const updatedProject = { ...mockProject, title: "Updated Project" };

    vi.mocked(newtApiService.updateProject).mockResolvedValue({} as any);
    vi.mocked(commonUtils.observableToPromise).mockResolvedValue(updatedProject as any);

    const result = await service.updateProject(mockProject);

    expect(result.project).toEqual(updatedProject);
    expect(result.error).toBeNull();
    expect(newtApiService.updateProject).toHaveBeenCalledWith(mockProject);
    expect(commonUtils.observableToPromise).toHaveBeenCalledTimes(1);
  });

  it("should handle observableToPromise rejection", async () => {
    const errorMessage = "Observable conversion failed";

    vi.mocked(newtApiService.updateProject).mockResolvedValue({} as any);
    vi.mocked(commonUtils.observableToPromise).mockRejectedValue(new Error(errorMessage));
    vi.mocked(commonUtils.formatErrorMessage).mockReturnValue(`updateProject: ${errorMessage}`);

    const result = await service.updateProject(mockProject);

    expect(result.project).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe(`updateProject: ${errorMessage}`);
  });
});
