import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body

	// Simulate network latency
	setTimeout(() => {
		// Trigger a 400 response
		if (body.sizeUpper === '4.00' || body.sizeLower === '4.00') {
			return res.status(400).json({ data: 'Invalid data' })
		}

		// Success response
		res.status(200).json({ data: 'Success' })
	}, 1000)
}
