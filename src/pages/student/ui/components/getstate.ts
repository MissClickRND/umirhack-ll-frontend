import { selectUser } from "@/entities/user/model/userSelectors"
import { useAppSelector } from "@/shared/lib"

export const getState = () => {
    const user = useAppSelector(selectUser)
    while (true) {
        if (typeof user.id === "number") {
            return user.id
            break
        }
}
}