import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

const schema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa der de no máximo 60 minutos'),
})
type CicleFormDate = zod.infer<typeof schema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interrupedDate?: Date
  finishedDate?: Date
}

interface CycleContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

export const CycleContext = createContext({} as CycleContextData)

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, finishedDate: new Date() }
          : cycle,
      ),
    )
  }

  // const { register, handleSubmit, watch, reset } = useForm<CicleFormDate>({
  //   resolver: zodResolver(schema),
  //   defaultValues: {
  //     minutesAmount: 0,
  //     task: '',
  //   },
  // })

  // const onSubmit = (data: CicleFormDate) => {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     minutesAmount: data.minutesAmount,
  //     task: data.task,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountSecontPassed(0)

  //   reset()
  // }

  // const hasTask = watch('task')

  // const handleInterrupedCycle = () => {
  //   setCycles((state) =>
  //     state.map((cycle) =>
  //       cycle.id === activeCycleId
  //         ? { ...cycle, interrupedDate: new Date() }
  //         : cycle,
  //     ),
  //   )

  //   setActiveCycleId(null)
  // }

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(onSubmit)} */>
        <CycleContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          {/* <NewCycleForm /> */}
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountDownButton
            /* onClick={handleInterrupedCycle} */ type="button"
          >
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" /* disabled={!hasTask} */>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
