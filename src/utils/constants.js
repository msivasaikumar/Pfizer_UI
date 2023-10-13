import downloadIcon from "../assets/images/download.svg";
import deleteIcon from "../assets/images/delete.svg";

import {
  ManageTemplatesCardText,
  AuthorDocumentCardText,
  ManagePromptLibraryCardText,
  ManageContentLibraryCardText
} from "../i18n/ApplicationCardText";

export const ApiEndpoints = Object.freeze({
  templates: "/templates", // dummy endpoint
  stats: "/document/stats" // dummy endpoint
});

export const HTTPMethods = Object.freeze({
  GET: "get",
  POST: "post"
});

export const ProjectTableHeaders = ["Project Name", "Domain", "Last Updated Date", "Owner", ""];

export const DocumentTableHeaders = ["Document Name", "Created by", "Created on", "", ""];

export const DocumentTableKebabMenuOptions = [
  {
    key: "download",
    label: "Download",
    icon: downloadIcon
  },
  {
    key: "delete",
    label: "Delete",
    icon: deleteIcon
  }
];

export const ApplicationCards = [ManageTemplatesCardText, AuthorDocumentCardText, ManagePromptLibraryCardText, ManageContentLibraryCardText];
