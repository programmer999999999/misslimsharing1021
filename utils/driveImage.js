export const getDriveImageUrl = (driveUrl) => {
  // Extract the file ID from Google Drive URL
  const match = driveUrl.match(/\/d\/([^\/]+)/);
  if (!match) return null;
  
  const fileId = match[1];
  return `/api/drive-image?id=${fileId}`;
};

export const getDriveImageId = (driveUrl) => {
  const match = driveUrl.match(/\/d\/([^\/]+)/);
  return match ? match[1] : null;
};
