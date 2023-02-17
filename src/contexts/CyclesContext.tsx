import { createContext, ReactNode, useState } from 'react'

interface CreateNewCycle {
  task: string
  minutesAmount: number
}
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
}
interface CycleContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecontPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createCycle: (data: CreateNewCycle) => void
  interrupedCycle: () => void
}

interface CycleContextProviderProps {
  children: ReactNode
}
export const CycleContext = createContext({} as CycleContextData)

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecontPassed, setAmountSecontPassed] = useState(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, finishedDate: new Date() }
          : cycle,
      ),
    )
    setActiveCycleId(null)
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecontPassed(seconds)
  }

  const createCycle = (data: CreateNewCycle) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setSecondsPassed(0)
  }

  const interrupedCycle = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, interrupedDate: new Date() }
          : cycle,
      ),
    )

    setActiveCycleId(null)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecontPassed,
        setSecondsPassed,
        createCycle,
        interrupedCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
