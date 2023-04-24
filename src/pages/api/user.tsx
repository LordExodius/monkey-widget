import { NextApiRequest, NextApiResponse } from "next";

const Handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(418).json({ error: "No user specified." })
}

export default Handler