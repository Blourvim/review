import { createContext, useState, useEffect } from 'react'
import React from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedbacks, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    const response = await fetch('api/feedbacks')
    const feedbackData = await response.json()
    setFeedback(feedbackData)
    setIsLoading(false)
  }

  // Edit feedback
  const editFeedback = (feedback) => {
    setFeedbackEdit({
      item: feedback,
      edit: true,
    })
  }

  // UPDATE feedback
  const updateFeedback = async (_id, updItem) => {
   await fetch(`/api/feedbacks/${_id}`,{
      method: 'PUT',
       headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem) 
    })

    setFeedback(
      feedbacks.map((feedback) => {
        if (feedback._id === _id) {
          return {
            ...feedback,
            ...updItem,
          }
        }
        return feedback
      })
    )
    setFeedbackEdit({
      item: {},
      edit: false,
    })

  }

  // DELETE feedback
  const feedbackDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await fetch(`/api/feedbacks/${_id}`, { method: 'DELETE' })
      setFeedback(feedbacks.filter((item) => item._id !== _id))
    }
  }

  // ADD FEEDBACK
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/api/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })
    const data = await response.json()
    setFeedback([data, ...feedbacks])
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        feedbackDelete,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
