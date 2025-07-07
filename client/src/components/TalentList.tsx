import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchTalents } from "../features/talents/talentsSlice";
import Image from "next/image";

const TalentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { talents = [], loading = false } = useAppSelector(
    (state) => state.talents
  );

  React.useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (!talents || talents.length === 0) return <div>No talents found</div>;

  return (
    <div className="talent-list">
      <h2>Available Talents</h2>
      <div className="talent-grid">
        {talents.map((talent) => (
          <div key={talent.talent_id} className="talent-card">
            <Image
              src={talent.profile_picture_url || "/default-avatar.png"}
              alt={`${talent.first_name} ${talent.last_name}`}
              width={80}
              height={80}
              className="talent-avatar"
            />
            <h3>
              {talent.first_name} {talent.last_name}
            </h3>
            <p>{talent.bio}</p>
            <div className="talent-details">
              <span>Location: {talent.location || "Not specified"}</span>
              <span>Availability: {talent.availability}</span>
              {talent.hourly_rate && (
                <span>Rate: ${talent.hourly_rate}/hour</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentList;
