import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CycleContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecontPassed,
    setSecondsPassed,
  } = useContext(CycleContext)

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
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDiff)
        }
      })
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    totalSeconds,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = `Timer`
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
