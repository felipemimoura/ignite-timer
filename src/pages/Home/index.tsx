import { Play } from 'phosphor-react'
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
} from './styles'
import * as zod from 'zod'

const schema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa der de no máximo 60 minutos'),
})
type CicleFormDate = zod.infer<typeof schema>

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<CicleFormDate>({
    resolver: zodResolver(schema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)

    reset()
  }

  const hasTask = watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
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
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton type="submit" disabled={!hasTask}>
          <Play />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
