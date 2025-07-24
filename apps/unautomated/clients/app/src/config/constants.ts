export const CONFIG = {
  WEBSITE_URL: 'https://un-automated.com', // Your Next.js website URL
  SHARE_ROUTES: {
    POST: (postId: string) => `${CONFIG.WEBSITE_URL}/post/${postId}`,
    PROFILE: (userId: string) => `${CONFIG.WEBSITE_URL}/profile/${userId}`,
  },
};
