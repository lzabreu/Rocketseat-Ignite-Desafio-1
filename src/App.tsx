import { Header } from './components/Header'
import { TaskList } from './components/TaskList'
import { PlusCircle } from 'phosphor-react'
import { TaskType } from './types/task'
import { FormEvent, useEffect, useState } from 'react'
import clipboard from './assets/Clipboard.svg'
import { v4 as uuid } from 'uuid'
import styles from './App.module.css'
import './global.css'

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [textInput, setTextInput] = useState('')
  const [taskCount, setTaskCount] = useState(0)
  const [tasksConcluded, setTasksConcluded] = useState(0)

  useEffect(() => {
    counterTasksCompleted()
  }, [taskCount])

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (textInput !== '') {
      const task = {
        id: uuid(),
        completed: false,
        task: textInput,
      }
      setTasks([...tasks, task])
      setTaskCount(tasks.length + 1)
      setTextInput('')
    }
  }

  function completeTask(taskToComplete: string) {
    let newTaskList = [...tasks]
    for (let i in newTaskList) {
      if (newTaskList[i].id === taskToComplete) {
        newTaskList[i].completed = !newTaskList[i].completed
      }
    }
    setTasks(newTaskList)
    counterTasksCompleted()
  }
  function deleteTask(taskToDelete: string) {
    let newTaskList = [...tasks]
    const taskWithoutDeletedOne = newTaskList.filter((task) => {
      return task.id !== taskToDelete
    })
    setTasks(taskWithoutDeletedOne)
    setTaskCount(tasks.length - 1)
  }
  function counterTasksCompleted() {
    const tasksConcludedCounter = tasks.filter((task) => task.completed).length
    setTasksConcluded(tasksConcludedCounter)
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.area}>
        <form
          className={styles.form}
          onSubmit={(event) => handleCreateNewTask(event)}
        >
          <input
            className={styles.input}
            type="text"
            placeholder="Adicione uma tarefa"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button className={styles.button}>
            Criar
            <PlusCircle weight="bold" size={16} />
          </button>
        </form>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            Tarefas criadas
            <div className={styles.bubble}>{taskCount}</div>
          </div>
          <div className={styles.headerContentPurple}>
            Concluídas
            <div className={styles.bubble}>
              {tasksConcluded} de {taskCount}
            </div>
          </div>
        </div>
        {tasks.length === 0 && (
          <div className={styles.noMessages}>
            <img
              className={styles.clipboard}
              src={clipboard}
              alt="clipboard"
              width={56}
              height={56}
            />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
        <div className={styles.taskList}>
          {tasks.map((task) => (
            <TaskList
              key={task.id}
              task={task}
              onDeleteTask={() => deleteTask(task.id)}
              onCompleteTask={() => completeTask(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
