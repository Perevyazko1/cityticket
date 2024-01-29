import { createContext, useContext } from "react"
export type UpdateContent = {
  update: boolean
  setUpdate:(c: boolean) => void
}
export const UpdatelContext = createContext<UpdateContent>({
update: false, // set a default value
setUpdate: () => {},
})
export const useUpdateContext = () => useContext(UpdatelContext)