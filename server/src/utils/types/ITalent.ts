import IUser from "./IUser";

export interface ITalent{
  userId: number;
  bio?: string | null;
  location?: string | null;
  contractTypeId: number;
  hourlyRate?: number | null;
  yearOfExperience: number;
  profilePictureUrl?: string | null;
  cvUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}