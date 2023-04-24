// pages/api/user/[uid].tsx

import ProfileCard from '../../components/profileCard'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Profile = () => {
    const router = useRouter()
    const{ uid } = router.query

    const [profile, setProfile] = useState<any>({"data": {"name": "bruh"}})
    useEffect(() => {
        const getProfile = async () => {
            const res = await fetch(`http://api.monkeytype.com/users/${uid}/profile`)
            // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
            if (res.ok) {
                const profileJSON = await res.json()
                setProfile(profileJSON)
            }
            else {
                console.log("fuck")
            }
        }
        getProfile()
    }, [uid])


    if (profile) {
        console.log(`Successfully fetched profile ${uid}`)
        const extraData = {
            link: `https://monkeytype.com/profile/${uid}`,
            avatar: "/placeholder_avatar.svg"
        }

        if (profile.data.discordId && profile.data.discordAvatar) {
            extraData.avatar = `https://cdn.discordapp.com/avatars/${profile.data.discordId}/${profile.data.discordAvatar}.png`
        }

        return ProfileCard( profile.data, extraData )
    }
    else {
        return (
            <h1>No profile found!</h1>
        )
    }
    
    
}

export default Profile