import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import axios from "axios"
import { Button, Card, CircularProgress, Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector, useDispatch } from "react-redux"
import { postLessons } from "../../redux/lesson/lessonActions"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

const EditList = ({ slug, lessons }) => {
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (lessons?.length > 0) {
      setData(lessons)
    }
  }, [])

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  const reorder = (data, startIndex, endIndex) => {
    const result = Array.from(data)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)
    dispatch(postLessons(dbUser, result, slug))
    return result
  }

  const onEnd = async (result) => {
    // console.log(result)
    setData(reorder(data, result.source.index, result.destination.index))
  }

  const handleDelete = async (index, item) => {
    console.log(index, item)
    // const answer = window.confirm("Are you sure you want to delete?")
    // if (!answer) return
    let allLessons = data
    allLessons.splice(index, 1)
    setData(allLessons)

    fileDelete(item)

    // console.log("lessondeleted", data)
  }

  const fileDelete = async (item) => {
    const { data } = await axios.put(`/api/lessons/${slug}`, { item })
  }

  // console.log(data)
  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId="123456">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {!data ? (
              <CircularProgress />
            ) : (
              data.map((item, index) => (
                <Draggable draggableId={item._id} key={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
                        <Box style={{ marginTop: "0.25rem" }}>
                          <Card style={{ padding: "0.25rem" }}>
                            <Grid container>
                              <Grid item xs={11}>
                                {item.title}
                              </Grid>
                              <Grid item xs={1}>
                                {item.videoId === "" && (
                                  <div
                                    onClick={() => handleDelete(index, item)}
                                  >
                                    <DeleteForeverIcon />
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                          </Card>
                        </Box>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default EditList
