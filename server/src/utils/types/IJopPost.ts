export default interface IJopPost{
  id?: number;
  userId: number;
  title: string;
  description: string;
  location: string;
  salaryRange: string;
  contractTypeId: number;
  skillsRequired: string;
  status: string;
}