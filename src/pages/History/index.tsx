import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const History = () => {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  {cycle.finishedDate && (
                    <td>
                      <Status statusColor="green">Concluido</Status>
                    </td>
                  )}
                  {cycle.interrupedDate && (
                    <td>
                      <Status statusColor="red">Interrompuido</Status>
                    </td>
                  )}
                  {!cycle.finishedDate && !cycle.interrupedDate && (
                    <td>
                      <Status statusColor="yellow">Em andamento</Status>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
