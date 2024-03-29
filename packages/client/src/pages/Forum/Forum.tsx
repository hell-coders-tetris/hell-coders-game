import { Grid, Typography, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { TopicAccordeon } from './components/TopicAccordeon/TopicAccordeon'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { AddTopic } from './components/AddTopic/AddTopic'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducer'
import {
  getAllComments,
  getAllTopics,
  getCommentsReply
} from '../../store/forum/actions'
import { AppStoreDispatch } from '../../store'
import { ICommentAndReply, ITopic } from '../../store/forum/types'
import { cyan } from '@mui/material/colors'

export function Forum() {
  const navigate = useNavigate()
  const { topics, comments } = useSelector((state: RootState) => state.forum)
  const { localUserId } = useSelector((state: RootState) => state.user)
  const [showAddTopic, setShowAddTopic] = useState<boolean>(false)
  const dispatch = useDispatch<AppStoreDispatch>()
  const typographyColor = cyan['A400']

  useEffect(() => {
    document.title = 'Форум'
    dispatch(getAllTopics())
    if (topics.length && localUserId)
      topics.forEach((topic: ITopic) =>
        dispatch(getAllComments({ id: topic.id, userId: localUserId }))
      )
    if (Object.keys(comments).length && localUserId)
      Object.values(comments).forEach((comments: ICommentAndReply[]) =>
        comments.forEach((comment: ICommentAndReply) =>
          dispatch(
            getCommentsReply({
              commentId: comment.id,
              userId: localUserId
            })
          )
        )
      )
  }, [localUserId, topics.length])

  return (
    <Box pt={4}>
      <ArrowBack
        onClick={() => {
          navigate(-1)
        }}
      />
      <Grid container spacing={2} pt={12} pb={4} color={typographyColor}>
        <Grid item xs={11}>
          <Typography pl={2} variant="h5">
            ТОПИКИ
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="success"
            onClick={e => {
              setShowAddTopic(true)
            }}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      {topics.length > 0 && (
        <Grid container spacing={2} pb={4} color={'red'}>
          <Grid item xs={7}>
            <Typography pl={2} variant="h6">
              Название
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography pl={5} variant="h6">
              Комментарии
            </Typography>
          </Grid>
        </Grid>
      )}
      {topics.map(topic => (
        <TopicAccordeon key={topic.id} {...topic} />
      ))}
      {showAddTopic && (
        <AddTopic
          showAddTopic={showAddTopic}
          setShowAddTopic={setShowAddTopic}
        />
      )}
    </Box>
  )
}
