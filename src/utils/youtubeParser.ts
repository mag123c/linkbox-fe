export function extractYouTubeData(url: string) {
  const videoId = new URL(url).searchParams.get("v");
  return {
    id: videoId,
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    title: "유튜브 영상 제목 (API 필요)",
    views: "조회수 정보 (API 필요)",
    progress: "진행률 정보 (추가 구현 필요)",
  };
}
