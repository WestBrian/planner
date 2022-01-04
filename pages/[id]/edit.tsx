import type { NextPage } from 'next'
import { AuthCheck } from '../../components/auth-check'
import { TaskForm, FormState } from '../../components/task-form'
import {
  useDayFromId,
  useTaskOnce,
  useTasksOnce,
  updateTask
} from '../../services/tasks'
import { useRouter } from 'next/router'
import { parse } from 'date-fns'
import { Container } from '@chakra-ui/react'
import { formStateToTask } from '../../components/task-form/helpers'

const EditPage: NextPage = () => {
  const router = useRouter()
  const taskId = router.query.id as string
  const [task, taskLoading] = useTaskOnce(taskId)
  const day = useDayFromId(taskId)
  const [tasks, tasksLoading] = useTasksOnce(day)

  if (taskLoading || tasksLoading) {
    return null
  }

  function handleSubmit(values: FormState) {
    try {
      updateTask(taskId, formStateToTask(values), day!)
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthCheck>
      {task ? (
        <Container
          boxShadow={['none', 'xl']}
          padding={['0', '4']}
          rounded={['none', 'md']}
        >
          <TaskForm
            heading="EDIT TASK"
            submitButtonText="Update task"
            defaultValues={{
              day: day!,
              taskName: task.name,
              startTime: parse(task.startTime, 'HH:mm', new Date()),
              taskLength: task.length,
              taskType: task.type,
              description: task.desc
            }}
            currentTaskId={taskId}
            currentTasks={tasks!}
            onClose={() => router.push('/dashboard')}
            onSubmit={handleSubmit}
          />
        </Container>
      ) : null}
    </AuthCheck>
  )
}

export default EditPage
