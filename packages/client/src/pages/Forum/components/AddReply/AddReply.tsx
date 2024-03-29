import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addCommentSchema } from '../../../../shared/utils/formSchema'
import { FormInput } from '../../../../components/FormInput'
import { Popover } from '@mui/material'
import { FC } from 'react'
import { AddReplyProps, AddReplyForm } from './types'
import { CommentAndReplyRequestData } from '../../../../store/forum/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppStoreDispatch, RootState } from '../../../../store'
import { createReply } from '../../../../store/forum/actions'

export const AddReply: FC<AddReplyProps> = ({
  showAddReply,
  setShowAddReply,
  comment
}) => {
  const dispatch = useDispatch<AppStoreDispatch>()

  const { localUser } = useSelector((state: RootState) => state.user)

  const methods = useForm<AddReplyForm>({
    defaultValues: { content: '' },
    resolver: yupResolver(addCommentSchema)
  })

  const { handleSubmit } = methods

  const formSubmit = handleSubmit(data => {
    if (localUser) {
      const requestData: CommentAndReplyRequestData = {
        content: data.content,
        parentId: comment.id,
        userId: localUser?.id,
        topicId: comment.topicId
      }
      dispatch(createReply(requestData))
      setShowAddReply(false)
    }
  })

  return (
    <Popover
      open={showAddReply}
      onClose={() => setShowAddReply(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography component="h1" variant="h5" mb={2}>
            Ваше мнение
          </Typography>
          <FormProvider {...methods}>
            <form onSubmit={formSubmit}>
              <FormInput placeholder="Название" type="text" name="content" />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Ответить
              </Button>
            </form>
          </FormProvider>
        </Box>
      </Container>
    </Popover>
  )
}
