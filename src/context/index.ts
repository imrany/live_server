import { createContext } from 'react'

type GlobalContext={
    API_URL:string,
    ws:any,
    updateAnvel:any
}

 export const GlobalContext=createContext<GlobalContext>({
    API_URL:"",
    ws:null,
    updateAnvel:()=>{}
 })
