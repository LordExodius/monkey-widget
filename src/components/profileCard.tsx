

const CARD_WIDTH = 390
const CARD_HEIGHT = 180
const DARK_GREY = "#2c2e31"
const MIDDLE_GREY = "#a7a7a0"
const LIGHT_GREY = "#646669"
const OFF_WHITE = "#d1d0c5"

const ProfileCard = ( user: any, extra: any ) => {

    if (!user || !user.personalBests) {
        return <p>oops, we broke something</p>
    }
    console.log(user)

    const svgProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        viewBox: `0 0 ${CARD_WIDTH} ${CARD_HEIGHT}`,
        role: "img",
    }

    const labelProps = {
        fill: `${LIGHT_GREY}`,
        fontFamily: "monospace",
        fontSize: "1rem",
        textAnchor: "middle"
    }

    const speedProps = {
        fill: `${OFF_WHITE}`,
        fontFamily: "monospace",
        fontSize: "2.5rem",
        textAnchor: "middle"
    }

    const accProps = {
        fill: `${MIDDLE_GREY}`,
        fontFamily: "monospace",
        fontSize: "1.2rem",
        textAnchor: "middle"
    }

    return (
        <svg {...svgProps}>
            <defs>
                <style>

                </style>
            </defs>

            {/* Background */}
            <rect
                rx="0.5rem"
                height="100%"
                width="100%"
                fill={DARK_GREY}>
            </rect>
            {/* Profile Picture */}
            <image 
                x="10"
                y="10"
                width="45"
                height="45"
                href={extra.avatar ?? "/placeholder_avatar.svg"}/>
            
            {/* Name */}
            <text
                x="70"
                y="30"
                fill={OFF_WHITE}
                fontFamily="monospace"
                fontSize="1.6rem">{user.name ?? "unknown"}</text>
            
            {/* Subtitle */}
            <a href={extra.link ?? "https://monkeytype.com"} target="_blank">
                <text
                    x="70"
                    y="50"
                    fontFamily="monospace"
                    fill={MIDDLE_GREY}
                    textAnchor="left">{extra.link ?? "link not found"}</text>
            </a>

            {/* 15 */}
            <text x="70" y="85" {...labelProps}>15 seconds</text>
            <text x="70" y="125" {...speedProps}>{user.personalBests.time[15] ? Math.round(user.personalBests.time[15][0].wpm) : "-"}</text>
            <text x="70" y="150" {...accProps}>{user.personalBests.time[15] ? `${Math.round(user.personalBests.time[15][0].acc)}%` : "-"}</text>

            {/* 30 */}
            <text x="190" y="85" {...labelProps}>30 seconds</text>
            <text x="190" y="125" {...speedProps}>{user.personalBests.time[15] ? Math.round(user.personalBests.time[30][0].wpm) : "-"}</text>
            <text x="190" y="150" {...accProps}>{user.personalBests.time[15] ? `${Math.round(user.personalBests.time[30][0].acc)}%` : "-"}</text>

            {/* 60 */}
            <text x="310" y="85" {...labelProps}>60 seconds</text>
            <text x="310" y="125" {...speedProps}>{user.personalBests.time[15] ? Math.round(user.personalBests.time[60][0].wpm) : "-"}</text>
            <text x="310" y="150" {...accProps}>{user.personalBests.time[15] ? `${Math.round(user.personalBests.time[60][0].acc)}%` : "-"}</text>


        </svg>)
}

export default ProfileCard