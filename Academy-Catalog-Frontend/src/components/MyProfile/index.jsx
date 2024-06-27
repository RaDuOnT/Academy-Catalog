import React from "react";
import "./style.css";
import ProfileOptions from './ProfileOptions';
import { connect } from "react-redux";
import { findAllUsers, updateUser } from "../../store/actions/userActions";
import { useEffect } from "react";


const MyProfile = ({ userList, findUsers, currentUser }) =>{
    useEffect(() => {
        if (!userList || userList.length === 0) {
          findUsers();
        };
      }, []);

    return(
    <div className="my-profile">
            <ProfileOptions currentUser = {currentUser}/>
    </div>
    )
    }


const mapStateToProps = (state) => {
    return {
      userList: state.user.users,
      currentUser: state.auth.currentUser,
      error: {
        updateError: state.user.updateError,
        messsage: state.user.errorMessage,
      },
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    findUsers: () => {
      dispatch(findAllUsers());
    }
  });
  

  export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);