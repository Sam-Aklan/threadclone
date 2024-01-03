posts: {
    _id: new ObjectId("64eb111530539ff5a4687290"),  text: 'nextjs makes it easier',
    author: {
      _id: new ObjectId("64ea4a5d05daa6892ee015d8"),
      id: 'user_2UGCGDQSg3MgSsfymY1U7ecYCw3',     
      __v: 0,
      bio: 'threads cloning',
      communities: [],
      image: 'https://uploadthing.com/f/a68475bc-7cec-4442-818f-d65e60f15648_Screenshot%202023-08-16%20133054.png',
      name: 'sam',
      onboarded: true,
      threads: [ new ObjectId("64eb111530539ff5a4687290") ],
      username: 'samak'
    },
    childern: [
      {
        _id: new ObjectId("64edfa203e32e1605820a24e"),
        text: 'no it is not',
        author: [Object],
        parentId: '64eb111530539ff5a4687290',     
        childern: [],
        createdAt: 2023-08-29T14:01:04.445Z,      
        __v: 0
      }
    ],
    createdAt: 2023-08-27T09:02:13.278Z,
    __v: 1
  }