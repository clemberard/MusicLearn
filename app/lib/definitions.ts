export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string
  createdAt: Date
};

export type CoursesTable = {
  id: string;
  title: string;
  description: string;
  instrument: string;
  level: string;
  schedule: string;
  capacity: number;
};

export type Course = {
    id: string,
    title: string,
    description: string,
    instrument: string,
    teacherId: string,
    level: string,
    schedule: string,
    capacity: number,
}
