import { User } from "@prisma/client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
const useUserFromToken = (): User | null => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        try {
            const cookie = Cookies.get("cookie")
            if (typeof cookie === "string") {
            const token = JSON.parse(cookie).token
            axios.post("/api/auth/validateToken", { token })
                .then((res) => {
                    setUser(res.data.user)
                })
                .catch((err) => console.log(err))
            }
        } catch (e) {
            console.log("ERROR:", e)
        }
    }, [])
    return user
}

export default useUserFromToken;