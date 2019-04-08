import { useContext } from 'react'
import { ApplicationContext } from '../contexts'

export const useAppCtx = () => useContext(ApplicationContext)
