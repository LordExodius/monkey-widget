// pages/api/user/[uid].tsx

import ProfileCard from '../../../components/profileCard'
import { NextApiRequest, NextApiResponse } from "next";
import { renderToStaticMarkup } from 'react-dom/server';

const Profile = async (req: NextApiRequest, res: NextApiResponse) => {
    const{ uid } = req.query
    console.log(uid)

    if (!uid) { return }
    const result = await fetch(`https://api.monkeytype.com/users/${uid}/profile`)
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const profileJSON = await result.json()

    if (profileJSON) {
        console.log(`Successfully fetched profile ${uid}`)
        const extraData = {
            link: `https://monkeytype.com/profile/${uid}`,
            avatar: "/placeholder_avatar.svg"
        }

        if (profileJSON.data.discordId && profileJSON.data.discordAvatar) {
            extraData.avatar = `https://cdn.discordapp.com/avatars/${profileJSON.data.discordId}/${profileJSON.data.discordAvatar}.png`
        }

        res.setHeader("content-type", "image/svg+xml")
        console.log(res.getHeader("Content-Type"))

        const cardSVG = renderToStaticMarkup(ProfileCard( profileJSON.data, extraData ))
        return res.send(cardSVG)
    }
}

export default Profile