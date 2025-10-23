export const getPreviewImages = (
  gallery,
  previewImagesSize,
  currentImageId
) => {
  if (gallery.length <= previewImagesSize) return gallery

  let start = Math.max(0, currentImageId - 2)
  let end = Math.min(gallery.length, start + previewImagesSize)

  if (end - start < previewImagesSize) {
    const difference = end - start

    start -= previewImagesSize - difference
  }

  const previewImages = gallery.slice(start, end)

  return previewImages
}
