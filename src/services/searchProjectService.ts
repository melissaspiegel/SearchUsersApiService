import type { SearchProject } from "../dtos/SearchProject.js";
import { newtApiService } from "../http/newtApi/newtApiService.js";
import { observableToPromise } from "../utils/commonUtils.js";

export class SearchProjectService {
  async searchProjectsWith(needle: string): Promise<SearchProject[]> {
    const observable = await newtApiService.searchProjectsWith(needle);

    const results = await observableToPromise<{ data?: unknown }>(observable).catch(() => {
      return { data: [] as unknown };
    });

    const resultsArray = Array.isArray(results?.data) ? (results.data as SearchProject[]) : [];

    return resultsArray.map((project) => ({
      ...project,
      technologies: Array.isArray(project.technologies) ? project.technologies : []
    }));
  }
}
