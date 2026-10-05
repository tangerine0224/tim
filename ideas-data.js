/* ==========================================
   USTH TIM: Idea Worth Sharing data (single source of truth)
   The /blog bento grid and the /ideas/[code] detail pages both
   read from this file. Add a new post by adding an entry to
   `posts`; the card style is chosen automatically from its
   category.
   ========================================== */
window.IDEAS_DATA = {
  categories: {
    'field-notes': {
      label: 'Field Notes',
      description: 'Lessons from real work, written while they are still fresh.',
      badgeClass: 'badge-tag'
    },
    'big-ideas': {
      label: 'Big Ideas',
      description: 'Opinions and arguments worth debating.',
      badgeClass: 'badge-tag-signal'
    },
    'toolkit': {
      label: 'Toolkit',
      description: 'Templates, checklists and tools you can use tomorrow.',
      badgeClass: 'badge-tag-mint'
    },
    'reading-list': {
      label: 'Reading List',
      description: 'Books, papers and podcasts that changed how we think.',
      badgeClass: 'badge-tag-outline'
    },
    'show-tell': {
      label: 'Show & Tell',
      description: 'Side projects, prototypes and things we built.',
      badgeClass: 'badge-tag-gray'
    },
    'ask-network': {
      label: 'Ask the Network',
      description: 'Open questions looking for someone who has been there.',
      badgeClass: 'badge-tag-white'
    }
  },

  posts: [
    {
      code: 'innovation-is-management',
      category: 'big-ideas',
      featured: true,
      title: 'Innovation Is a Management Problem Before It Is a Technology Problem',
      excerpt: 'Most failed AI projects we have seen did not fail on the model. They failed on ownership, incentives and the question nobody asked in the first meeting.',
      quote: 'The hardest part of adopting a new technology is deciding who owns the change.',
      author: 'Assoc. Prof. Le Thanh Son',
      role: 'Faculty',
      org: 'USTH',
      readTime: '6 min read',
      body: [
        'Most failed AI projects we have seen did not fail on the model. They failed on ownership, incentives and the question nobody asked in the first meeting.',
        'A model can be accurate and still go nowhere if nobody in the organisation is accountable for what happens after it ships. Technology teams tend to optimise for performance metrics, while the business side waits for someone else to decide what the system should actually be allowed to do.',
        'The pattern shows up the same way almost every time. A pilot gets built, it works well enough in testing, and then it stalls because no one owns the decision to change how a team works day to day.',
        'Incentives matter just as much as ownership. If a manager is still measured on the old way of doing things, a better tool will not change their behaviour, no matter how good the technology is.',
        'The question nobody asks in the first meeting is usually the simplest one: who is responsible for the change itself, not just the system that enables it. Answering that question earlier would have saved several of the projects we have watched struggle.',
        'The hardest part of adopting a new technology is deciding who owns the change. Everything else, the data, the model, the interface, tends to follow once that question has a clear answer.'
      ]
    },
    {
      code: 'factory-floor-problem',
      category: 'field-notes',
      title: 'What a Factory Floor Taught Me About Defining the Problem',
      excerpt: 'We almost bought an AI camera system. Six interviews with our supervisors showed the real cost was hiding somewhere else.',
      author: 'Tran Quoc Bao',
      role: 'Cohort 01',
      org: 'Minh An Engineering',
      readTime: '5 min read',
      body: [
        'We almost bought an AI camera system. Six interviews with our supervisors showed the real cost was hiding somewhere else.',
        'The plan going in was simple: install a vision system on the line, catch defects earlier, cut the rework rate. It looked like a clear technology problem with a clear technology answer.',
        'Before signing anything, we sat down with six production supervisors to understand where defects actually came from. None of them mentioned the camera system when asked what was costing them the most time.',
        'What came up again and again was changeover time between product runs. Supervisors were losing hours resetting machines by hand, and that loss never showed up in the defect reports we had been looking at.',
        'We redirected the budget toward standardising the changeover process instead of the camera system. It was a smaller, cheaper fix, and it addressed a cost nobody had put a number on before.',
        'The lesson was not about cameras or computer vision. It was that six honest conversations with the people doing the work will usually find the real problem faster than any dataset.'
      ]
    },
    {
      code: 'bank-project-notes',
      category: 'field-notes',
      title: 'Twelve Users, Five Ideas, Two Adopted: Notes From a Bank Project',
      excerpt: 'What we learned from watching real customers try to open an account, and why two of our five ideas made it into the plan.',
      author: 'Pham Minh Anh',
      role: 'Cohort 01',
      org: 'Sao Viet Technology',
      readTime: '4 min read',
      body: [
        'What we learned from watching real customers try to open an account, and why two of our five ideas made it into the plan.',
        "We recruited twelve people who had never used the bank's app before and asked them to open an account on camera while we watched. Nobody told them what to expect.",
        'Out of those sessions, the team put together five recommendations for the onboarding flow, ranging from a simpler document upload step to clearer error messages when a form field failed validation.',
        "Not every idea survived contact with the bank's compliance and engineering teams. Two of the five, the document upload fix and the clearer error messages, were approved for the next development cycle.",
        'The other three were shelved for now, mostly because they touched systems the bank was not ready to change on this timeline, not because the users disagreed with them.',
        'Twelve conversations were enough to separate what felt broken from what was actually costing the bank customers, and that distinction mattered more than any of us expected going in.'
      ]
    },
    {
      code: 'outside-mentor',
      category: 'big-ideas',
      title: 'Every Startup Needs a Mentor From Outside Its Industry',
      excerpt: 'Our best advice at EduNest came from a banker and a factory manager, not from anyone in education.',
      author: 'Do Hai Nam',
      role: 'Cohort 01',
      org: 'EduNest',
      readTime: '4 min read',
      body: [
        'Our best advice at EduNest came from a banker and a factory manager, not from anyone in education.',
        'It is tempting to assume that the most useful mentor for an education startup is someone who has already run a school or built a learning platform. In our experience, that was not where the sharpest advice came from.',
        'A banker on our mentoring team asked a question none of our education contacts had asked: who actually approves the purchase, and how long does that person take to say yes. That single question reshaped our entire sales process.',
        'A factory manager pushed us on something just as basic: how we measured whether a feature was actually being used, not just whether it had shipped. That habit of measuring usage, not output, stayed with the team long after the mentoring sessions ended.',
        'Mentors from inside your own industry tend to agree with your assumptions, because they share them. Mentors from outside tend to ask the question you did not know you were avoiding.',
        'We still value mentors who understand education. We just no longer assume they are the ones who will change how we think.'
      ]
    },
    {
      code: 'one-page-brief',
      category: 'toolkit',
      title: 'The One-Page Brief We Use for Every Partner Challenge',
      excerpt: 'The template that turns a vague request from a partner into a problem a student team can actually work on.',
      author: 'Le Thu Hang',
      role: 'Cohort 01',
      org: 'Phuong Dong Bank',
      readTime: '3 min read',
      resources: [
        { name: 'Challenge brief template', format: 'DOC' },
        { name: 'Partner interview guide', format: 'PDF' },
        { name: 'Idea scoring sheet', format: 'XLSX' }
      ],
      body: [
        'The template that turns a vague request from a partner into a problem a student team can actually work on.',
        'Most partner requests arrive as a paragraph of context and a hope that something useful comes out of it. That is a reasonable starting point, but it is not something a team can plan a semester around.',
        'We built a one-page brief that forces three things onto paper before a project starts: what the partner actually wants to change, how success will be judged, and who on their side is available to answer questions along the way.',
        'The brief pairs with a short interview guide, used in the first conversation with the partner, to fill in the gaps the original request usually leaves out.',
        'Once a few candidate ideas exist, the scoring sheet gives the team and the partner a shared way to compare them, instead of debating from gut feeling alone.',
        'None of the three documents below are complicated. What makes them useful is that they are used in order, every time, before a team commits to a direction.'
      ]
    },
    {
      code: 'ai-risk-starter-kit',
      category: 'toolkit',
      title: 'A Starter Kit for Assessing AI Risk Before You Deploy',
      excerpt: 'The five questions we ask every client before an AI pilot, packaged so you can run them in one meeting.',
      author: 'Nguyen Bich Ngoc',
      role: 'Advisor',
      org: 'Dong A Consulting',
      readTime: '5 min read',
      resources: [
        { name: 'Five-step risk checklist', format: 'PDF' },
        { name: 'Stakeholder map template', format: 'DOC' },
        { name: 'Pilot readiness scorecard', format: 'XLSX' }
      ],
      body: [
        'The five questions we ask every client before an AI pilot, packaged so you can run them in one meeting.',
        'Clients often come to us ready to pilot an AI system without having agreed internally on what would make that pilot a success, or what would make them stop it.',
        'Over several engagements, the same five questions kept surfacing the issues that mattered: who is affected if the system is wrong, who can override it, what data it depends on, how its performance will be checked, and who is accountable for the outcome.',
        'We packaged those five questions into a checklist that a client team can work through in a single meeting, before any contract for the pilot is signed.',
        'The stakeholder map and the readiness scorecard that go with it exist to make the conversation concrete, so answers are written down and compared rather than assumed.',
        'None of this replaces proper risk assessment later in the project. It just makes sure the first meeting asks the right questions instead of jumping straight to the technology.'
      ]
    },
    {
      code: 'cohort-reading-list',
      category: 'reading-list',
      title: 'Five Books That Changed How Our Cohort Talks About Innovation',
      excerpt: 'The books that kept coming up in class discussions, with one sentence on why each one matters.',
      author: 'Hoang Duc Long',
      role: 'Cohort 01',
      org: 'Dong A Consulting',
      readTime: '4 min read',
      books: [
        "The Innovator's Dilemma",
        'The Lean Startup',
        'Thinking in Systems',
        'Good Strategy Bad Strategy',
        'The Design of Everyday Things'
      ],
      body: [
        'The books that kept coming up in class discussions, with one sentence on why each one matters.',
        "The Innovator's Dilemma explains why successful organisations are often the last to adopt the technology that eventually replaces them.",
        'The Lean Startup gave the cohort a shared vocabulary for testing an idea before building the full version of it.',
        "Thinking in Systems changed how several of us read a partner's problem, by pushing us to look for the feedback loop instead of the obvious symptom.",
        'Good Strategy Bad Strategy is the book we quote most often when a plan is really just a list of goals with no explanation of how to reach them.',
        'The Design of Everyday Things is the reason half the cohort now blames bad design before blaming the user, in our projects and everywhere else.'
      ]
    },
    {
      code: 'licensing-chatbot',
      category: 'show-tell',
      title: 'We Built a Licensing Chatbot in a Weekend',
      excerpt: 'A rough prototype that answers the ten most common questions about business licensing, built after our public services project.',
      author: 'Vu Thanh Mai',
      role: 'Cohort 01',
      org: 'Provincial Department of Public Administration',
      readTime: '3 min read',
      body: [
        'A rough prototype that answers the ten most common questions about business licensing, built after our public services project.',
        "After the licensing project wrapped up, our team kept hearing the same ten questions from business owners calling the department's hotline.",
        "Over a weekend, we put together a rough chatbot that answers those ten questions directly, pulling from the same guidance the department's staff already use.",
        'It is not connected to any live system and it does not replace the staff who handle actual applications. It is meant to show how much of the repetitive part of the hotline could be handled another way.',
        'We are sharing the prototype as it is, unpolished, because the idea behind it is more useful right now than the code.',
        'If another department wants to try the same approach with its own ten most common questions, we are happy to walk through how we built it.'
      ]
    },
    {
      code: 'predictive-maintenance-question',
      category: 'ask-network',
      title: 'Has anyone run a predictive maintenance pilot with less than a year of sensor data?',
      excerpt: 'We have eleven months of data from two production lines and want to know what is realistic before we promise anything.',
      author: 'Ha Minh Tuan',
      role: 'Cohort 01',
      org: 'Hoa Binh Electronics',
      readTime: '1 min read',
      answersCount: 4,
      body: [
        'We have eleven months of data from two production lines and want to know what is realistic before we promise anything.',
        'The model we are testing needs to predict failures early enough for the maintenance team to act, not just confirm a failure after the fact.',
        "Eleven months covers most seasonal patterns on our lines, but we are not sure it is enough to trust the model's confidence on rare failure types.",
        'If anyone has run a pilot on a similarly short window, we would rather hear what went wrong for you than find out the same way ourselves.'
      ],
      answers: [
        {
          author: 'Tran Quoc Bao',
          role: 'Cohort 01',
          org: 'Minh An Engineering',
          text: "Eleven months was close to what we had when we started on our own line. We scoped the pilot's promise to the failure types with enough history, then added more types as new data came in."
        },
        {
          author: 'Nguyen Bich Ngoc',
          role: 'Advisor',
          org: 'Dong A Consulting',
          text: 'With under a year of data, we usually treat the first year as a calibration pilot: track false alarms closely, and hold off on any uptime promise until a second seasonal cycle confirms the pattern.'
        }
      ]
    }
  ]
};
