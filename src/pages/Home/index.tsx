import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
  StopCountDownButton,
} from './styles'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

/* 
  [] Create a new state to all cycle
  [] create a state to active cycle

*/

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

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecontPassed, setAmountSecontPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<CicleFormDate>({
    resolver: zodResolver(schema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Transformando os minutos em segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecontPassed : 0 // Pegando quandos segundos se passaram

  const minutesAmout = Math.floor(currentSeconds / 60) // Descobrindo quandos minutos restam
  const secondsAmount = currentSeconds % 60 // Quandos segundos faltam dentro do minuto

  const minutes = String(minutesAmout).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const onSubmit = (data: CicleFormDate) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecontPassed(0)

    reset()
  }

  const hasTask = watch('task')

  const handleInterrupedCycle = () => {
    setCycles((state) =>
      state.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, interrupedDate: new Date() }
          : cycle,
      ),
    )

    setActiveCycleId(null)
  }

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDiff >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) =>
              cycle.id === activeCycleId
                ? { ...cycle, finishedDate: new Date() }
                : cycle,
            ),
          )
          setAmountSecontPassed(totalSeconds)
          setActiveCycleId(null)
          clearInterval(interval)
        } else {
          setAmountSecontPassed(secondsDiff)
        }
      })
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterrupedCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={!hasTask}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
