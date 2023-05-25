import { useState } from 'react'
import { TaskType } from '../types/task'
import styles from './TaskList.module.css'
import { Check, Trash } from 'phosphor-react'

interface TaskListProps {
  task: TaskType
  onDeleteTask: (id: string) => void
  onCompleteTask: (id: string) => void
}

export function TaskList({
  task,
  onDeleteTask,
  onCompleteTask,
}: TaskListProps) {
  const [textArea, setTextArea] = useState(task.task)
  function handleTaskDelete() {
    onDeleteTask(task.id)
  }
  function handleTaskComplete() {
    onCompleteTask(task.id)
  }
  return (
    <div className={styles.container}>
      
      {task.completed && (
        <div className={styles.doneRadioCompleted} onClick={handleTaskComplete}>
          <Check color="var(--gray-100)" />
        </div>
      )}
      {!task.completed && (
        <div className={styles.doneRadio} onClick={handleTaskComplete}></div>
      )}
      <textarea
        className={task.completed ? styles.textAreaDone : styles.textArea}
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button
        type="button"
        className={styles.delete}
        onClick={handleTaskDelete}
      >
        <Trash size={24} />
      </button>
    </div>
  )
}
