const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'user@nextmail.com',
        password: '123456',
        role: 'admin',
        createdAt: '2021-09-01T00:00:00.000Z',
    },
];

const courses = [
    {
        id: '410544b2-4002-4271-9855-fec4b6a6442a',
        title: 'Course',
        description: 'Description',
        instrument: 'Guitar',
        teacherId: '410544b2-4001-4271-9855-fec4b6a6442a',
        level: 'Beginner',
        schedule: 'Monday 10:00 AM',
        capacity: 10,
    },
    {
        id: '410544b2-4002-4271-9855-fec4b6a6442b',
        title: 'Course',
        description: 'Description',
        instrument: 'Piano',
        teacherId: '410544b2-4001-4271-9855-fec4b6a6442a',
        level: 'Intermediate',
        schedule: 'Tuesday 10:00 AM',
        capacity: 10,
    },
    {
        id: '410544b2-4002-4271-9855-fec4b6a6442c',
        title: 'Course',
        description: 'Description',
        instrument: 'Drums',
        teacherId: '410544b2-4001-4271-9855-fec4b6a6442a',
        level: 'Advanced',
        schedule: 'Wednesday 10:00 AM',
        capacity: 10,
    }
];

const enrollments = [
    {
        id: '410544b2-4003-4271-9855-fec4b6a6442a',
        studentId: '410544b2-4001-4271-9855-fec4b6a6442a',
        courseId: '410544b2-4002-4271-9855-fec4b6a6442a',
        enrollmentDate: '2021-09-01T00:00:00.000Z',
        status: 'active',
    },
    {
        id: '410544b2-4003-4271-9855-fec4b6a6442b',
        studentId: '410544b2-4001-4271-9855-fec4b6a6442a',
        courseId: '410544b2-4002-4271-9855-fec4b6a6442b',
        enrollmentDate: '2021-09-01T00:00:00.000Z',
        status: 'active',
    },
    {
        id: '410544b2-4003-4271-9855-fec4b6a6442c',
        studentId: '410544b2-4001-4271-9855-fec4b6a6442a',
        courseId: '410544b2-4002-4271-9855-fec4b6a6442c',
        enrollmentDate: '2021-09-01T00:00:00.000Z',
        status: 'active',
    },
];

const progresses = [
    {
        id: '410544b2-4004-4271-9855-fec4b6a6442a',
        studentId: '410544b2-4001-4271-9855-fec4b6a6442c',
        courseId: '410544b2-4002-4271-9855-fec4b6a6442c',
        date: '2021-09-01T00:00:00.000Z',
        evaluation: 'Good',
        comments: 'Good job!',
    },
    {
        id: '410544b2-4004-4271-9855-fec4b6a6442b',
        studentId: '410544b2-4001-4271-9855-fec4b6a6442c',
        courseId: '410544b2-4002-4271-9855-fec4b6a6442c',
        date: '2021-09-01T00:00:00.000Z',
        evaluation: 'Bad',
        comments: 'You are bad !',
    },
    {
        id: '410544b2-4004-4271-9855-fec4b6a6442c',
        studentId: '410544b2-4001-4271-9855-fec4b6a6442c',
        courseId: '410544b2-4002-4271-9855-fec4b6a6442c',
        date: '2021-09-01T00:00:00.000Z',
        evaluation: 'Good',
        comments: 'Good job!',
    },
];

export { users, courses, enrollments, progresses };
