import React, { useState } from 'react';
import api from '../api';
import '../styles/CommentFormStyles.scss';

const CommentForm = ({ featureId, onSaveComment, onCloseForm, resetSavedMessage }) => {
  const [comment, setComment] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formEnabled) return;
    setFormEnabled(false);
    const success = await api.saveComment(featureId, comment);
    if (success) {
      setComment('');
      setFormEnabled(true);
      onSaveComment(comment);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } else {
      setFormEnabled(true);
    }
  };

  const handleResetSavedMessage = () => {
    resetSavedMessage();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add Comment:</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          disabled={!formEnabled}
        />
        <br></br>
        <button type="submit" disabled={!formEnabled}>Save Comment</button>
        <button onClick={onCloseForm}>Close</button>
      </form>
      {showSuccessMessage && <p>Comment saved!</p>}
      {showSuccessMessage && <button onClick={handleResetSavedMessage}>Add comment</button>}
    </div>
  );
};

export default CommentForm;
