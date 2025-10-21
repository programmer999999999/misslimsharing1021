export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Image ID is required' });
    }

    // First, try to get the image with download parameter
    let imageUrl = `https://drive.google.com/uc?export=download&id=${id}`;
    
    // Try to get the image with view parameter if download fails
    const fallbackImageUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    
    let imageResponse;
    try {
      imageResponse = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        redirect: 'follow'
      });
      
      // If we get a redirect, try the fallback URL
      if (imageResponse.redirected) {
        imageResponse = await fetch(fallbackImageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
      }
      
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
      }
      
      // Get the image data and content type
      const arrayBuffer = await imageResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

      // Set the appropriate headers and send the image
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.setHeader('CDN-Cache-Control', 'public, max-age=86400');
      res.setHeader('Vary', 'Accept-Encoding');
      
      return res.send(buffer);
      
    } catch (error) {
      console.error('Error fetching image:', error);
      // If all else fails, redirect to the original Google Drive URL
      return res.redirect(fallbackImageUrl);
    }
    
  } catch (error) {
    console.error('Error in image handler:', error);
    res.status(500).json({ error: 'Failed to process image request' });
  }
}
