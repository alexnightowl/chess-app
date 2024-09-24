"use client"
import styles from "../../styles/Home.module.css"
import logout from "../mutations/logout"
import {useRouter} from "next/navigation"
import {useMutation} from "@blitzjs/rpc"

export function LogoutButton() {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  const handleLogout = async () => {
    await logoutMutation()
    router.refresh()
  }

  return (
      <button
        className={styles.button}
        onClick={handleLogout}
      >
        Logout
      </button>
  )
}