export type ProjectDTO = {
  id?: string;
  title: string;
  createdBy: string;
  status: "ACTIVE" | "INACTIVE";
  description?: string;
};
