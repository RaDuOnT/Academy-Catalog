import { useEffect, React } from "react";
import "./style.css";
import { findAllFeedbacks } from "../../store/actions/feedbackActions";
import { connect } from "react-redux";
import { Card } from "antd";

const FeedbackCards = ({
  feedbacksList,
  findAllFeedbacks,
  currentUser
}) => {

  useEffect(() => {
    if (!feedbacksList || feedbacksList.length === 0) {
      findAllFeedbacks();
    }
  }, [feedbacksList, findAllFeedbacks]);



  return (
    <div className="feedback-cards">
      {
        feedbacksList.map((feedback, index) => {
          return (
            <>
              {
                feedback.sender_id === currentUser._id ?
                  <Card key={index} title={`Sent To ${feedback.receiver_name}`} className="feedback-card">
                    {
                      feedback.course === null
                        ? null
                        : <p>{feedback.course}</p>
                    }
                    {
                      feedback.mark === null
                        ? null
                        : <p>{feedback.feedback_mark}</p>
                    }
                    <p>{feedback.feedback_text}</p>
                  </Card>
                  :
                  feedback.receiver_id === currentUser._id
                    ?
                    <Card key={index} title={`Received from ${feedback.sender_name}`} className="feedback-card">
                      {
                        feedback.course === null
                          ? null
                          : <p>{feedback.course}</p>
                      }
                      {
                        feedback.mark === null
                          ? null
                          : <p>{feedback.feedback_mark}</p>
                      }
                      <p>{feedback.feedback_text}</p>
                    </Card>
                    : null
              }
            </>
          );
        }
        )
      }
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    feedbacksList: state.feedbacks.feedbacks,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findAllFeedbacks: () => {
      dispatch(findAllFeedbacks());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackCards);