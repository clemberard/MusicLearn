/* eslint-disable @typescript-eslint/no-explicit-any */

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string
  createdAt: Date
};

export type UsersTable = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string
  createdAt: Date
};

export type CoursesTable = {
  enrollment: any;
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
    enrollment: number;
}
