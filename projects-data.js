/* ==========================================
   USTH TIM — Projects data (single source of truth)
   The homepage bookshelf and the /projects grid both
   read from this file. Featured projects (shown on the
   bookshelf) are marked via the `featured` field, with
   `featured.order` controlling their position on the shelf.
   ========================================== */
window.PROJECTS_DATA = {
  categories: {
    'industry-driven': {
      label: 'Industry-Driven',
      color: '#5BE07A',
      bannerClass: 'project-banner-2',
      description: 'Projects that start from a real challenge brought by an enterprise.',
      icon: '<path d="M9 2v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 8V2"/><line x1="8" y1="2" x2="16" y2="2"/>'
    },
    'academic-research': {
      label: 'Academic Research',
      color: '#2EC5E8',
      bannerClass: 'project-banner-4',
      description: 'Faculty-led research with students contributing industry experience and data.',
      icon: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'
    },
    'venture-startup': {
      label: 'Venture & Startup',
      color: '#E04BD6',
      bannerClass: 'project-banner-3',
      description: 'Student ventures and startups mentored by our cohorts.',
      icon: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'
    },
    'public-impact': {
      label: 'Public Impact',
      color: '#FF7A2F',
      bannerClass: 'project-banner-1',
      description: 'Projects with public agencies or for community benefit.',
      icon: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>'
    }
  },

  projects: [
    {
      code: 'ai-quality',
      title: 'AI QUALITY INSPECTION ROADMAP.',
      partner: 'Minh An Engineering',
      partnerIsOrg: true,
      category: 'industry-driven',
      sector: 'Manufacturing',
      supportType: ['Case provider', 'Experiment partner'],
      status: 'Piloting',
      date: 'Dec 2025',
      coCreated: false,
      solutionAdopted: false,
      outcome: 'Mapped where AI could cut quality costs. The recommendation is being piloted on one production line.',
      featured: {
        order: 2,
        showcaseTitle: 'AI Quality Inspection Roadmap',
        description: 'Analysed defect data and interviewed production supervisors to decide where AI could cut quality costs first.',
        stat1: { value: '1', label: 'Production line in pilot' },
        stat2: { value: '6', label: 'Supervisors interviewed' }
      },
      challenge: 'Minh An Engineering wanted to know where AI could reduce quality costs on its production floor, but had no clear starting point.',
      approach: 'The team analysed defect data and interviewed 6 production supervisors to map where inspection errors were costing the most.',
      outcomeLong: 'The recommendation is now being piloted on one production line, with results feeding back into the wider rollout decision.'
    },
    {
      code: 'digital-onboarding',
      title: 'REDESIGNING DIGITAL ONBOARDING.',
      partner: 'Phuong Dong Bank',
      partnerIsOrg: true,
      category: 'industry-driven',
      sector: 'Finance & Banking',
      supportType: ['Case provider'],
      status: 'Completed',
      date: 'Apr 2026',
      coCreated: false,
      solutionAdopted: true,
      outcome: "Tested the account-opening journey with 12 users. Two of five recommendations entered the bank's next-quarter plan.",
      featured: {
        order: 1,
        showcaseTitle: 'Redesigning Digital Onboarding for a Retail Bank',
        description: 'Mapped the online account-opening journey and tested it with real users to find where customers drop out.',
        stat1: { value: '2 of 5', label: 'Recommendations adopted' },
        stat2: { value: '12', label: 'Users tested' }
      },
      challenge: 'Phuong Dong Bank needed to understand why customers were dropping out of its online account-opening journey.',
      approach: 'The team mapped the full onboarding journey and tested it with 12 real users to find where the experience broke down.',
      outcomeLong: "Two of the five recommendations were adopted into the bank's next-quarter plan."
    },
    {
      code: 'predictive-maintenance',
      title: 'PREDICTIVE MAINTENANCE DATA STUDY.',
      partner: 'Hoa Binh Electronics',
      partnerIsOrg: true,
      category: 'industry-driven',
      sector: 'Manufacturing',
      supportType: ['Funding'],
      status: 'In progress',
      date: 'Jul 2026',
      coCreated: false,
      solutionAdopted: false,
      outcome: 'Building a prototype model to predict equipment failures from two years of sensor data.',
      featured: null,
      challenge: 'Hoa Binh Electronics wanted to anticipate equipment failures before they caused downtime on the line.',
      approach: 'The team is building a prototype model trained on two years of sensor data to predict failures before they happen.',
      outcomeLong: 'The prototype is in progress, with the goal of giving the maintenance team advance warning of failures.'
    },
    {
      code: 'ai-risk-framework',
      title: 'AI DEPLOYMENT RISK FRAMEWORK.',
      partner: 'Dong A Consulting',
      partnerIsOrg: true,
      category: 'industry-driven',
      sector: 'Consulting',
      supportType: ['Co-create'],
      status: 'Completed',
      date: 'Jun 2026',
      coCreated: true,
      solutionAdopted: true,
      outcome: 'A five-step framework for assessing risk before deploying AI, now used in two client engagements.',
      featured: {
        order: 3,
        showcaseTitle: 'AI Deployment Risk Framework',
        description: 'Co-created with a consulting firm, a step-by-step framework for assessing risk before deploying AI.',
        stat1: { value: '5 steps', label: 'Assessment framework' },
        stat2: { value: '2', label: 'Client engagements using it' }
      },
      challenge: 'Dong A Consulting needed a consistent way to assess risk before recommending AI deployments to its clients.',
      approach: 'Working together, the team co-created a five-step framework for assessing AI deployment risk step by step.',
      outcomeLong: 'The framework is now used in two client engagements at Dong A Consulting.'
    },
    {
      code: 'sme-ai-readiness',
      title: 'AI READINESS OF VIETNAMESE SMES.',
      partner: 'Led by Assoc. Prof. Le Thanh Son',
      partnerIsOrg: false,
      category: 'academic-research',
      sector: 'Technology & Software',
      supportType: ['Co-create'],
      status: 'In progress',
      date: 'May 2026',
      coCreated: false,
      solutionAdopted: false,
      outcome: 'Surveying 40 small and medium enterprises on their readiness to adopt AI.',
      featured: null,
      challenge: 'Little local data exists on how ready Vietnamese SMEs actually are to adopt AI.',
      approach: 'Led by Assoc. Prof. Le Thanh Son, the research is surveying 40 small and medium enterprises on their readiness to adopt AI.',
      outcomeLong: 'The survey is in progress, building a dataset that will inform future industry engagement.'
    },
    {
      code: 'edunest-model',
      title: 'FINDING A SUSTAINABLE REVENUE MODEL.',
      partner: 'EduNest',
      partnerIsOrg: true,
      category: 'venture-startup',
      sector: 'Education',
      supportType: ['Co-create'],
      status: 'Completed',
      date: 'Apr 2026',
      coCreated: false,
      solutionAdopted: true,
      outcome: 'Four mentoring sessions helped the founders settle on a subscription model for schools.',
      featured: {
        order: 5,
        showcaseTitle: 'Finding a Sustainable Revenue Model for an EdTech Startup',
        description: 'A cross-sector mentoring team helped the founders compare revenue models and test them with schools.',
        stat1: { value: '4', label: 'Mentoring sessions' },
        stat2: { value: '1', label: 'Revenue model chosen' }
      },
      challenge: 'EduNest needed to find a revenue model that schools would actually pay for.',
      approach: 'A cross-sector mentoring team ran four mentoring sessions, helping the founders compare revenue models and test them with schools.',
      outcomeLong: 'The founders settled on one subscription model for schools.'
    },
    {
      code: 'startup-mentoring',
      title: 'MENTORING STUDENT STARTUPS.',
      partner: 'USTH Innovation Center',
      partnerIsOrg: true,
      category: 'venture-startup',
      sector: 'Startups',
      supportType: ['Co-create'],
      status: 'In progress',
      date: 'Sep 2026',
      coCreated: false,
      solutionAdopted: false,
      outcome: 'Three cross-sector teams mentor three student startups through the semester.',
      featured: {
        order: 6,
        showcaseTitle: 'Mentoring Student Startups at USTH',
        description: 'Teams of three students from different sectors mentor student startups through a full semester.',
        stat1: { value: '3', label: 'Startups mentored' },
        stat2: { value: '9', label: 'Student mentors' }
      },
      challenge: 'Student startups at USTH Innovation Center needed experienced, cross-sector mentoring to grow.',
      approach: 'Three teams of three students from different sectors each mentor one student startup through the full semester.',
      outcomeLong: 'Three startups are being mentored by nine student mentors through the semester.'
    },
    {
      code: 'digital-licensing',
      title: 'DIGITAL LICENSING FOR PUBLIC SERVICES.',
      partner: 'Provincial Department of Public Administration',
      partnerIsOrg: true,
      category: 'public-impact',
      sector: 'Public Sector',
      supportType: ['Case provider'],
      status: 'Completed',
      date: 'Mar 2026',
      coCreated: false,
      solutionAdopted: false,
      outcome: 'Proposed a simpler online process for business licensing, cutting the number of required visits from three to one.',
      featured: {
        order: 4,
        showcaseTitle: 'Digital Licensing for Public Services',
        description: 'Proposed a simpler online process for business licensing at a provincial public administration department.',
        stat1: { value: '3 to 1', label: 'Office visits required' },
        stat2: { value: '1', label: 'Agency partner' }
      },
      challenge: 'Business licensing at a provincial public administration department required multiple in-person visits.',
      approach: 'The team proposed a simpler online process for business licensing at the department.',
      outcomeLong: 'The proposal cuts the number of required office visits from three to one.'
    }
  ]
};
