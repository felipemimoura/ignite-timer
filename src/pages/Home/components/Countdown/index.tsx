import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { CycleContext } from '../..'
import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CycleContext)
  const [amountSecontPassed, setAmountSecontPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // Transformando os minutos em segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecontPassed : 0 // Pegando quandos segundos se passaram

  const minutesAmout = Math.floor(currentSeconds / 60) // Descobrindo quandos minutos restam
  const secondsAmount = currentSeconds % 60 // Quandos segundos faltam dentro do minuto

  const minutes = String(minutesAmout).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDiff >= totalSeconds) {
          markCurrentCycleAsFinished()
          // setCycles((state) =>
          //   state.map((cycle) =>
          //     cycle.id === activeCycleId
          //       ? { ...cycle, finishedDate: new Date() }
          //       : cycle,
          //   ),
          // )
          setAmountSecontPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecontPassed(secondsDiff)
        }
      })
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, markCurrentCycleAsFinished, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
