// pages/api/user/[uid].tsx

import ProfileCard from '../../../components/profileCard'
import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from 'path';
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
            avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuNC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIzIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBkPSJNMzk5IDM4NC4yQzM3Ni45IDM0NS44IDMzNS40IDMyMCAyODggMzIwSDIyNGMtNDcuNCAwLTg4LjkgMjUuOC0xMTEgNjQuMmMzNS4yIDM5LjIgODYuMiA2My44IDE0MyA2My44czEwNy44LTI0LjcgMTQzLTYzLjh6TTAgMjU2YTI1NiAyNTYgMCAxIDEgNTEyIDBBMjU2IDI1NiAwIDEgMSAwIDI1NnptMjU2IDE2YTcyIDcyIDAgMSAwIDAtMTQ0IDcyIDcyIDAgMSAwIDAgMTQ0eiIvPjwvc3ZnPg=="
        }

        // if (profileJSON.data.discordId && profileJSON.data.discordAvatar) {
        //     extraData.avatar = `https://cdn.discordapp.com/avatars/${profileJSON.data.discordId}/${profileJSON.data.discordAvatar}.png`
        // }

        res.setHeader("content-type", "image/svg+xml")
        console.log(res.getHeader("Content-Type"))

        const cardSVG = renderToStaticMarkup(ProfileCard( profileJSON.data, extraData ))
        return res.send(cardSVG)
    }
}

export default Profile