import { searchDocs } from "../rag/ingest";
import { RetrievalItem } from "./types";

export async function retrieverNode(planDetail: string) {
  const items = searchDocs(planDetail, 3);
  // validate shape
  return items.map(i => RetrievalItem.parse(i));
}
