// import { http, cleanParams } from "./http";

// export async function listJobs(params) {
//   const qp = cleanParams(params);
//   const res = await http.get("/api/jobs", { params: qp });
//   return res.data; 
// }


import { http, cleanParams } from "./http";

export async function listJobs(params) {
  const qp = cleanParams(params);
  const url = http.getUri({ url: "/api/jobs", params: qp });
  console.log("[listJobs] GET", url);
  const res = await http.get("/api/jobs", { params: qp });
  return res.data; // 어떤 형태로 오든 컴포넌트에서 파싱
}

/** 서버 응답이
 *  A) { message, data:{ content, totalPages, ... } }
 *  B) { content, totalPages, ... }
 *  C) { result:{ content, totalPages, ... } }
 *  D) [ ... ] (배열)
 *  등 어떤 형태여도 content/totalPages를 뽑아낸다.
 */
export function parseJobsPayload(payload) {
  const d = payload ?? {};
  const box = d.data ?? d.result ?? d;

  let content = [];
  if (Array.isArray(box)) content = box;
  else if (Array.isArray(box?.content)) content = box.content;

  // 페이지 정보도 방어적으로
  const totalPages =
    Number.isFinite(box?.totalPages) ? box.totalPages :
    Number.isFinite(d?.totalPages)   ? d.totalPages   :
    1;

  const page =
    Number.isFinite(box?.page) ? box.page :
    Number.isFinite(d?.page)   ? d.page   :
    0;

  const size =
    Number.isFinite(box?.size) ? box.size :
    Number.isFinite(d?.size)   ? d.size   :
    content.length;

  return { content, totalPages, page, size, raw: payload };
}
