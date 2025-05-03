import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchTalents,
  selectAllTalents,
  selectTalentsStatus,
  selectTalentsError,
} from "../store/features/talents/talentsSlice";

const TalentsList = () => {
  const dispatch = useAppDispatch();
  const talents = useAppSelector(selectAllTalents);
  const status = useAppSelector(selectTalentsStatus);
  const error = useAppSelector(selectTalentsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTalents());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading talents...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="talents-list">
      <h2>Talents</h2>
      {talents.map((talent) => (
        <div key={talent.talent_id} className="talent-card">
          <img
            src={talent.profile_picture_url || "/default-avatar.png"}
            alt={`${talent.first_name} ${talent.last_name}`}
          />
          <h3>{`${talent.first_name} ${talent.last_name}`}</h3>
          <p>{talent.bio}</p>
          <div className="skills">
            {talent.skills?.map((skill) => (
              <span key={skill.skill_id} className="skill-tag">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TalentsList;
