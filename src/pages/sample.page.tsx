import useAspidaSWR from '@aspida/swr'
import styled from '@emotion/styled'
import Head from 'next/head'
import type { ChangeEvent, FormEvent } from 'react'
import { useCallback, useState } from 'react'

import { apiClient } from '~/utils/apiClient'
import type { Task } from '$prisma/client'

const Home = () => {
  const { data: tasks, error, revalidate } = useAspidaSWR(apiClient.tasks)

  const [label, setLabel] = useState('')

  const inputLabel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value),
    []
  )

  const createTask = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!label) return

      // await await apiClient.reply.post({
      //   body: {
      //     reply: 'aaaaa',
      //     user: { connect: { id: 'miyasan_0301' } },
      //     tweet: { connect: { id: 6 } }
      //   }
      // })

      await apiClient.tasks.post({ body: { label } })
      setLabel('')
      revalidate()
    },
    [label]
  )

  const toggleDone = useCallback(async (task: Task) => {
    await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } })
    revalidate()
  }, [])

  const deleteTask = useCallback(async (task: Task) => {
    await apiClient.tasks._taskId(task.id).delete()
    revalidate()
  }, [])

  if (error) return <div>failed to load</div>
  if (!tasks) return <div>loading...</div>

  return (
    <div>
      <Head>
        <title>frourio-todo-app</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Main>
        <H1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </H1>

        <form style={{ textAlign: 'center' }} onSubmit={createTask}>
          <FromInput value={label} type="text" onChange={inputLabel} />
          <Button>Add</Button>
        </form>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task)}
                />
                <span>{task.label}</span>
              </label>
              <input
                type="button"
                value="DELETE"
                style={{ float: 'right' }}
                onClick={() => deleteTask(task)}
              />
            </li>
          ))}
        </ul>
      </Main>
    </div>
  )
}

export default Home

const H1 = styled.h1`
  text-align: center;
  font-size: 2.5rem;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FromInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fafafa;
`

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #71aaff;
  hover: {
    background-color: #5f9ee0;
  }
`
