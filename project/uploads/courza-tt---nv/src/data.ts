import { Course, Institution, FAQCategory, CATEGORIES, BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: '10 Realities you really want to reexamine before start profession',
    image: '',
    date: '06/10/2021',
    readTime: '7min read'
  },
  {
    id: 'b2',
    title: '20 facts you need to reconsider before you start career',
    image: '',
    date: '12/05/2022',
    readTime: '5min read'
  },
  {
    id: 'b3',
    title: 'Discover career that matches your skills & interests in job.',
    image: '',
    date: '11/06/2022',
    readTime: '4min read'
  }
];

export { CATEGORIES };

export const INSTITUTIONS: Institution[] = [
  {
    id: 'uwi',
    name: 'UWI Global Campus',
    summary: 'The University of the West Indies Global Campus provides open and flexible learning to students across the region.',
    type: 'Public',
    website: 'https://open.uwi.edu',
    courseCount: 45
  },
  {
    id: 'utt',
    name: 'The University of Trinidad and Tobago (UTT)',
    summary: 'UTT is T&T\'s premier national university with a focus on engineering, technology, and applied sciences.',
    type: 'Public',
    website: 'https://utt.edu.tt',
    courseCount: 32
  },
  {
    id: 'sbcs',
    name: 'SBCS Global Learning Institute',
    summary: 'A leading private tertiary provider offering international qualifications in business, media, and design.',
    type: 'Private',
    website: 'https://sbcs.edu.tt',
    courseCount: 28
  },
  {
    id: 'costaatt',
    name: 'COSTAATT',
    summary: 'The College of Science, Technology and Applied Arts of Trinidad and Tobago offering vocational and academic excellence.',
    type: 'Public',
    website: 'https://costaatt.edu.tt',
    courseCount: 38
  },
  {
    id: 'mic',
    name: 'MIC Institute of Technology',
    summary: 'Specialists in technical vocational training, industry projects, and high-tech engineering services.',
    type: 'Technical',
    website: 'https://mic.co.tt',
    courseCount: 20
  }
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'BSc Computer Science',
    institutionId: 'uwi',
    institutionName: 'UWI St. Augustine',
    summary: 'A comprehensive degree covering software engineering, AI, and distributed systems.',
    type: 'Degree',
    category: 'Technology & Digital',
    cost: 'TTD 12,000 / Semester',
    startDate: 'Sept 2026',
    deadline: 'July 31, 2026',
    delivery: 'Blended',
    location: 'St. Augustine',
    featured: true
  },
  {
    id: 'c2',
    title: 'Digital Marketing Specialist',
    institutionId: 'sbcs',
    institutionName: 'SBCS Global Learning Institute',
    summary: 'Master SEO, SEM, and Social Media strategies for the modern Caribbean marketplace.',
    type: 'Certificate',
    category: 'Business & Entrepreneurship',
    cost: 'TTD 4,500',
    startDate: 'June 15, 2026',
    deadline: 'June 1, 2026',
    delivery: 'Online',
    location: 'Champs Fleurs',
    featured: true
  },
  {
    id: 'c3',
    title: 'Electrical & Electronics Engineering',
    institutionId: 'utt',
    institutionName: 'UTT Point Lisas',
    summary: 'Accredited engineering programme focusing on power systems and control electronics.',
    type: 'Diploma',
    category: 'Engineering & Construction',
    cost: 'TTD 8,000 / Semester',
    startDate: 'Sept 1, 2026',
    deadline: 'August 15, 2026',
    delivery: 'In-Person',
    location: 'Couva',
    featured: true
  },
  {
    id: 'c4',
    title: 'Introduction to Permaculture',
    institutionId: 'uwi',
    institutionName: 'UWI Global Campus',
    summary: 'Learn sustainable farming techniques tailored for the Caribbean climate.',
    type: 'Workshop',
    category: 'Agriculture & Environment',
    cost: 'Free',
    startDate: 'July 10, 2026',
    deadline: 'July 5, 2026',
    delivery: 'Blended',
    location: 'Online / Various Farms',
    featured: true
  },
  {
    id: 'c5',
    title: 'Hospitality Management',
    institutionId: 'costaatt',
    institutionName: 'COSTAATT',
    summary: 'Gain the skills needed for management in the tourism and hospitality sector.',
    type: 'Associate Degree',
    category: 'Hospitality & Culinary',
    cost: 'GATE Funded',
    startDate: 'Sept 2026',
    deadline: 'August 10, 2026',
    delivery: 'In-Person',
    location: 'Port of Spain',
  },
  {
    id: 'c6',
    title: 'Professional Pastry Arts',
    institutionId: 'sbcs',
    institutionName: 'SBCS Global Learning Institute',
    summary: 'Learn the fine art of baking and pastry design with industry professionals.',
    type: 'Certificate',
    category: 'Hospitality & Culinary',
    cost: 'TTD 6,500',
    startDate: 'July 1, 2026',
    deadline: 'June 20, 2026',
    delivery: 'In-Person',
    location: 'Trincity',
  },
  {
    id: 'c7',
    title: 'Cyber Security Essentials',
    institutionId: 'uwi',
    institutionName: 'UWI St. Augustine',
    summary: 'Protect digital assets and learn modern security protocols for small businesses.',
    type: 'Workshop',
    category: 'Technology & Digital',
    cost: 'TTD 2,500',
    startDate: 'August 15, 2026',
    deadline: 'August 1, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c8',
    title: 'Auto Mechanics Level 1',
    institutionId: 'mic',
    institutionName: 'MIC Institute of Technology',
    summary: 'Hands-on training in automotive repair, maintenance, and diagnostics.',
    type: 'Technical Vocational',
    category: 'Technical Trades',
    cost: 'Free/STTE Funded',
    startDate: 'Sept 2026',
    deadline: 'August 30, 2026',
    delivery: 'In-Person',
    location: 'Macoya',
  },
  {
    id: 'c9',
    title: 'Project Management Professional',
    institutionId: 'uwi',
    institutionName: 'UWI Global Campus',
    summary: 'Standardized PMP certification prep for leadership roles in any industry.',
    type: 'Professional Certification',
    category: 'Business & Entrepreneurship',
    cost: 'TTD 8,900',
    startDate: 'October 2026',
    deadline: 'Sept 15, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c10',
    title: 'Accounting for Small Businesses',
    institutionId: 'sbcs',
    institutionName: 'SBCS Global Learning Institute',
    summary: 'Learn basic bookkeeping, tax compliance, and financial management.',
    type: 'Short Course',
    category: 'Finance & Accounting',
    cost: 'TTD 3,200',
    startDate: 'July 5, 2026',
    deadline: 'June 25, 2026',
    delivery: 'Blended',
    location: 'San Fernando',
  },
  {
    id: 'c11',
    title: 'Sustainable Fisheries Management',
    institutionId: 'uwi',
    institutionName: 'UWI St. Augustine',
    summary: 'Ecology and policy management for Caribbean marine resources.',
    type: 'BSc Degree',
    category: 'Agriculture & Environment',
    cost: 'GATE Funded',
    startDate: 'Sept 2026',
    deadline: 'July 15, 2026',
    delivery: 'Blended',
    location: 'St. Augustine',
  },
  {
    id: 'c12',
    title: 'Graphic Design Masterclass',
    institutionId: 'sbcs',
    institutionName: 'SBCS Global Learning Institute',
    summary: 'Master Adobe Creative Suite and design principles for print and digital media.',
    type: 'Diploma',
    category: 'Creative Arts & Design',
    cost: 'TTD 9,000',
    startDate: 'Aug 20, 2026',
    deadline: 'Aug 10, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c13',
    title: 'Mobile App Development (React Native)',
    institutionId: 'utt',
    institutionName: 'UTT Tamana',
    summary: 'Build cross-platform mobile apps for iOS and Android using modern frameworks.',
    type: 'Certificate',
    category: 'Technology & Digital',
    cost: 'TTD 5,500',
    startDate: 'Oct 1, 2026',
    deadline: 'Sept 20, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c14',
    title: 'Public Health & Nutrition',
    institutionId: 'costaatt',
    institutionName: 'COSTAATT',
    summary: 'Core principles of community health, epidemiology, and tropical nutrition.',
    type: 'Degree',
    category: 'Health & Medical',
    cost: 'GATE Funded',
    startDate: 'Sept 2026',
    deadline: 'Aug 1, 2026',
    delivery: 'In-Person',
    location: 'El Dorado',
  },
  {
    id: 'c15',
    title: 'Welding and Fabrication',
    institutionId: 'mic',
    institutionName: 'MIC Institute of Technology',
    summary: 'Industrial welding certification including TIG, MIG, and ARC techniques.',
    type: 'Technical Vocational',
    category: 'Technical Trades',
    cost: 'STTE Funded',
    startDate: 'Jan 2027',
    deadline: 'Dec 15, 2026',
    delivery: 'In-Person',
    location: 'Pointe-a-Pierre',
  },
  {
    id: 'c16',
    title: 'Corporate Communication',
    institutionId: 'uwi',
    institutionName: 'UWI Global Campus',
    summary: 'Strategies for PR, internal comms, and brand positioning in a digital age.',
    type: 'Degree',
    category: 'Communication & Media',
    cost: 'TTD 15,000 / Semester',
    startDate: 'Sept 2026',
    deadline: 'July 31, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c17',
    title: 'Solar Panel Installation',
    institutionId: 'utt',
    institutionName: 'UTT Energy Campus',
    summary: 'Renewable energy training with a focus on photovoltaic systems and battery storage.',
    type: 'Workshop',
    category: 'Engineering & Construction',
    cost: 'TTD 3,000',
    startDate: 'Sept 15, 2026',
    deadline: 'Sept 1, 2026',
    delivery: 'In-Person',
    location: 'Point Lisas',
  },
  {
    id: 'c18',
    title: 'Introduction to Psychology',
    institutionId: 'uwi',
    institutionName: 'UWI St. Augustine',
    summary: 'Foundational concepts of human behavior, cognitive processes, and mental health.',
    type: 'Short Course',
    category: 'Personal Development',
    cost: 'TTD 1,500',
    startDate: 'July 2026',
    deadline: 'June 30, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c19',
    title: 'Fashion Design & Textiles',
    institutionId: 'utt',
    institutionName: 'UTT Wrightson Road',
    summary: 'Learn pattern drafting, textile sciences, and commercial fashion aesthetics.',
    type: 'Diploma',
    category: 'Creative Arts & Design',
    cost: 'GATE Funded',
    startDate: 'Sept 2026',
    deadline: 'July 20, 2026',
    delivery: 'In-Person',
    location: 'Port of Spain',
  },
  {
    id: 'c20',
    title: 'Master of Business Administration (MBA)',
    institutionId: 'sbcs',
    institutionName: 'SBCS Global Learning Institute',
    summary: 'Executive leadership programme focusing on global strategy and financial ethics.',
    type: 'Master Degree',
    category: 'Business & Entrepreneurship',
    cost: 'TTD 45,000',
    startDate: 'Sept 2026',
    deadline: 'Aug 15, 2026',
    delivery: 'Blended',
    location: 'Champs Fleurs',
  },
  {
    id: 'c21',
    title: 'Introduction to Law',
    institutionId: 'uwi',
    institutionName: 'UWI St. Augustine',
    summary: 'Basics of the Caribbean legal system, torts, and constitutional law.',
    type: 'Certificate',
    category: 'Law & Governance',
    cost: 'TTD 5,000',
    startDate: 'Sept 2026',
    deadline: 'July 31, 2026',
    delivery: 'In-Person',
    location: 'St. Augustine',
  },
  {
    id: 'c22',
    title: 'Critical Thinking & Problem Solving',
    institutionId: 'costaatt',
    institutionName: 'COSTAATT',
    summary: 'Master the cognitive tools for effective decision making in complex environments.',
    type: 'Workshop',
    category: 'Soft Skills',
    cost: 'TTD 1,200',
    startDate: 'Aug 5, 2026',
    deadline: 'July 25, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c23',
    title: 'Data Science with Python',
    institutionId: 'uwi',
    institutionName: 'UWI Global Campus',
    summary: 'Process, analyze, and visualize complex datasets using modern libraries.',
    type: 'Professional Certification',
    category: 'Technology & Digital',
    cost: 'TTD 10,000',
    startDate: 'Oct 15, 2026',
    deadline: 'Oct 1, 2026',
    delivery: 'Online',
    location: 'Online',
  },
  {
    id: 'c24',
    title: 'Journalism & Media Ethics',
    institutionId: 'costaatt',
    institutionName: 'COSTAATT',
    summary: 'Foundations of news writing, reporting, and ethical standards in media.',
    type: 'Diploma',
    category: 'Communication & Media',
    cost: 'GATE Funded',
    startDate: 'Sept 2026',
    deadline: 'Aug 20, 2026',
    delivery: 'In-Person',
    location: 'Port of Spain',
  }
];

export const FAQS: FAQCategory[] = [
  {
    title: 'Welcome to CourzaTT',
    questions: [
      {
        question: 'What is CourzaTT?',
        answer: 'CourzaTT is a course discovery platform designed to simplify the learning landscape in Trinidad & Tobago. It helps users find learning options across public, private, and government institutions.'
      },
      {
        question: 'Why was CourzaTT built?',
        answer: 'It was built to centralize information about educational opportunities in T&T, making it easier for learners to find the right path for their future.'
      },
      {
        question: 'How comprehensive is the directory?',
        answer: 'We aim to list all accredited and recognized programmes from major public, private, and government bodies.'
      },
      {
        question: 'Who can use this platform?',
        answer: 'Anyone! Students, working professionals, or hobbyists looking to advance their skills.'
      },
      {
        question: 'Why does CourzaTT link to other websites?',
        answer: 'We provide discovery and metadata. For enrollment and specific details, we direct you to the official institution website.'
      }
    ]
  },
  {
    title: 'Courses & Enrollment',
    questions: [
      {
        question: 'Does CourzaTT provide courses?',
        answer: 'No, CourzaTT is a directory. The courses are provided by the listed institutions.'
      },
      {
        question: 'How do I enroll in a course?',
        answer: 'Click the "Visit Website" button on any course card to go to the institution\'s official registration page.'
      },
      {
        question: 'Are the courses free?',
        answer: 'Costs vary. Some are GATE funded, some are free, and others have tuition fees. Check the "Cost" section of each course.'
      },
      {
        question: 'Will I get a certificate?',
        answer: 'Certificates are awarded by the providing institution upon successful completion.'
      },
      {
        question: 'Where do the courses come from?',
        answer: 'They are sourced from public universities, private training institutes, and government agencies like MIC or NESC.'
      }
    ]
  },
  {
    title: 'Support',
    questions: [
      {
        question: 'Do I need a CourzaTT account?',
        answer: 'An account is not required to browse, but it allows you to save courses to your wishlist.'
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach us through the "Contact Support" button at the bottom of the FAQ section.'
      },
      {
        question: 'Can CourzaTT guarantee course quality?',
        answer: 'While we prioritize accredited institutions, learners should verify accreditation status with the ACTT (Accreditation Council of T&T).'
      }
    ]
  }
];
