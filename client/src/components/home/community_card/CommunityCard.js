import React from "react";
import Avatar from "../../Avatar";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { BASE_URL } from "../../../utils/config";

import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deleteBost, reportBost } from "../../../redux/actions/bostAction";

const CommunityCard = ({ bost }) => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditBost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...bost, onEdit: true },
    });
  };

  const handleDeleteBost = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBost({ bost, auth, socket }));
      return history.push("/community");
    }
  };

  const handleReportBost = () => {
    dispatch(reportBost({ bost, auth }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/bost/${bost._id}`);
  };

  return (
    <div className="card_header">
      <div className="d-flex">
        <div className="medium-avatar-cover">
          Community owner :{" "}
          <Avatar src={bost.user.avatar} size="medium-avatar" />
        </div>
        <div className="card_name">
          <div>
            <a className="author">
              <Link className="text-dark" to={`/profile/${bost.user._id}`}>
                {bost.user.username}
              </Link>
            </a>
          </div>
        </div>
      </div>
      <div>
        <Link className="default" to={`/bost/${bost._id}`} key={bost.community}>
          {" "}
          Community : {bost.community}
        </Link>
      </div>

      <div className="nav-item dropdown">
        <span
          className="material-icons"
          id="moreLink"
          data-bs-toggle="dropdown"
        >
          more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === bost.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditBost}>
                <span className="material-icons text-info"> create</span>Edit
                Bost
              </div>
              <div className="dropdown-item" onClick={handleDeleteBost}>
                <span className="material-icons text-red"> delete</span>Delete
                Bost
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons text-primary">content_copy</span>
            Copy Link
          </div>
          <div className="dropdown-item" onClick={handleReportBost}>
            <span className="material-icons text-yellow">report_problem</span>
            Report this bost
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
