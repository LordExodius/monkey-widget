// pages/api/user/[uid].tsx

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const getProfile = (uid: string) => {
    return fetch(`http://api.monkeytype.com/users/${uid}/profile`)
        .then(res => res.json())
}

const Profile = () => {
    const router = useRouter()
    const{ uid } = router.query

    const [profile, setProfile] = useState<any>({"data": {"name": "bruh"}})
    useEffect(() => {
        const getProfile = async () => {
            const res = await fetch(`http://api.monkeytype.com/users/${uid}/profile`)
            if (res.ok) {
                setProfile(res.json())
            }
            else {
                console.log("fuck")
            }
        }
        getProfile()
    }, [uid])

    return (
        <p>{profile.data.name}</p>
    )
    
}

export default Profile