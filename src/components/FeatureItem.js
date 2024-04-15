import React, { useState } from 'react';
import CommentForm from './CommentForm';
import '../styles/FeatureItemStyles.scss';

const FeatureItem = ({ feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentSaved, setCommentSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  const handleAddComment = () => {
    setShowForm(true);
    setIsExpanded(true);
    setCommentSaved(false);
  };

  const handleSaveComment = (comment) => {
    console.log('Saved comment:', comment);
    setCommentSaved(true);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsExpanded(false);
  };

  const resetSavedMessage = () => {
    setCommentSaved(false);
  };

  return (
    <div className="feature-item">
      <h3 onClick={toggleExpand}>{feature.attributes.title}</h3>
      {isExpanded && (
        <div className="feature-details">
          <p><strong>External ID:</strong> {feature.attributes.external_id}</p>
          <p><strong>Place:</strong> {feature.attributes.place}</p>
          <p><strong>Time:</strong> {feature.attributes.time}</p>
          <p><strong>URL:</strong>
            <a href={feature.links.external_url} target="_blank" rel="noopener noreferrer">
              {feature.links.external_url}
            </a>
          </p>
          <p><strong>Tsunami:</strong> {feature.attributes.tsunami}</p>
          <p><strong>Magnitude Type:</strong> {feature.attributes.mag_type}</p>
          <p><strong>Longitude:</strong> {feature.attributes.coordinates.longitude}</p>
          <p><strong>Latitude:</strong> {feature.attributes.coordinates.latitude}</p>
          {showForm ? (
            <CommentForm
              featureId={feature.attributes.external_id}
              onSaveComment={handleSaveComment}
              onCloseForm={handleCloseForm}
              resetSavedMessage={resetSavedMessage}
            />
          ) : (
            <button onClick={handleAddComment}>Add Comment</button>
          )}
          {commentSaved && <p>Comment saved!</p>}
        </div>
      )}
    </div>
  );
};

export default FeatureItem;
