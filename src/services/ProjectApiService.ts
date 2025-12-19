import type { ProjectDTO } from "../dtos/Project.js";
import { newtApiService } from "../http/newtApi/newtApiService.js";
import { formatErrorMessage, observableToPromise } from "../utils/commonUtils.js";

export class ProjectApiService {
  async updateProject(project: ProjectDTO): Promise<{
    project: ProjectDTO | null;
    error: Error | null;
  }> {
    try {
      if (!project.id) throw new Error("Project ID is required for updates");

      const observable = await newtApiService.updateProject(project);
      const updated = await observableToPromise<ProjectDTO>(observable);

      return { project: updated, error: null };
    } catch (error) {
      const msg = formatErrorMessage(error, "updateProject");
      return { project: null, error: new Error(msg) };
    }
  }
}

export const projectApiService = new ProjectApiService();
