import { useEffect, useState } from "react"

function DarkMode() {

    const [mode, setMode] = useState(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark'
        }
        return 'light'
    })

    function HandleChangeTeme() {
        if (mode === "light") {
            setMode("dark")
        } else {
            setMode("light")
        }
    }

    useEffect(() => {

        if (mode === "light") {
            document.documentElement.classList.remove("dark")
        } else {
            document.documentElement.classList.add("dark")
        }

    }, [mode])

    return (
        <>
            {mode === "light" ?
                <div onClick={HandleChangeTeme} className="DarkModeContainer flex absolute bottom-6 right-6 hover:cursor-pointer h-fit">
                    <div className="DarkModeLight Transition transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="-.08m" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    </div>
                </div>
                :
                <div onClick={HandleChangeTeme} className="DarkModeContainer flex absolute bottom-6 right-6 hover:cursor-pointer h-fit">
                    <div className="DarkModeLight Transition transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 fill-[white] stroke-[white]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>

                    </div>
                </div>
            }
        </>
    )
}

export default DarkMode