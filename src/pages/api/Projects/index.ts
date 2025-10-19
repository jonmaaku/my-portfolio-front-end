import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message?: string;
  timestamp?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  // Return true with additional metadata
  res.status(200).json({
    success: true,
    message: 'API Project is working.',
    timestamp: new Date().toISOString(),
  });
}
