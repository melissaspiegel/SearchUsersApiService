import type { ProjectDTO } from "../../dtos/Project.js";

export const newtApiService = {
  async updateProject(_project: ProjectDTO): Promise<unknown> {
    return {};
  },

  async searchProjectsWith(_needle: string): Promise<unknown> {
    return {};
  }
};
