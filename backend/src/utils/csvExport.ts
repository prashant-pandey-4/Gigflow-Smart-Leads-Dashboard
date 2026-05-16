import { ILead } from "../models/lead.model";

export const convertToCSV = (leads: ILead[]): string => {
  const headers = ["Name", "Email", "Status", "Source", "Created At"];

  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    new Date(lead.createdAt).toLocaleDateString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

  return csv;
};