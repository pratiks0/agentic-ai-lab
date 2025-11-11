import { webSearch } from "../tools/webSearch";

export async function toolExecNode(planDetail: string) {
  if (/search|web/i.test(planDetail)) {
    return await webSearch(planDetail);
  }
  return [];
}
