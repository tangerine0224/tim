/* ==========================================
   USTH TIM — Cohort data
   One entry per cohort slug. cohort.html + cohort-template.js
   render the shared template from this data.
   To add a future cohort: add a new key here, no server or
   template changes required.
   ========================================== */
window.COHORT_DATA = {
  "cohort-01": {
    slug: "cohort-01",
    status: "in-progress",
    name: "COHORT 01",
    displayName: "Cohort 01",
    period: "2025–2027",
    metaTag: "FOUNDING COHORT",
    title: "THE FOUNDING COHORT.",
    description: "Eighteen managers, specialists and founders from seven sectors, and the first cohort to work with partners on real challenges.",

    stats: [
      { value: "18", label: "Students" },
      { value: "7", label: "Sectors" },
      { value: "8", label: "Partners engaged" },
      { value: "3", label: "Published projects" }
    ],

    highlights: [
      {
        type: "project",
        date: "DEC 2025",
        title: "FIRST ENTERPRISE CHALLENGE.",
        desc: "A team of four mapped where AI could cut quality costs at Minh An Engineering. The company is piloting the recommendation on one production line."
      },
      {
        type: "project",
        date: "APR 2026",
        title: "REDESIGNING DIGITAL ONBOARDING.",
        desc: "Five students tested the online account-opening journey of Phuong Dong Bank with 12 users. Two of their five recommendations entered the bank's next-quarter plan."
      },
      {
        type: "project",
        date: "APR 2026",
        title: "MENTORING A STARTUP.",
        desc: "A cross-sector team mentored EduNest over four sessions, helping the founders settle on a subscription model for schools."
      },
      {
        type: "article",
        date: "MAY 2026",
        title: "FIVE LESSONS FROM A BANKING CAPSTONE.",
        desc: "Le Thu Hang shared what changed about running user interviews inside a regulated bank, published in Idea Worth Sharing.",
        link: "/blog"
      },
      {
        type: "article",
        date: "JUL 2026",
        title: "WHAT MENTORING TAUGHT EDUNEST ABOUT PRICING.",
        desc: "Do Hai Nam wrote up how a semester of mentoring sessions helped EduNest settle on its subscription model, published in Idea Worth Sharing.",
        link: "/blog"
      }
    ],

    sectorMix: [
      { label: "Technology & Software", pct: 25 },
      { label: "Education & Research", pct: 12.5 },
      { label: "Public Sector", pct: 12.5 },
      { label: "Consulting", pct: 12.5 },
      { label: "Manufacturing", pct: 12.5 },
      { label: "Finance & Banking", pct: 12.5 },
      { label: "Startups", pct: 12.5 }
    ],

    students: [
      {
        initials: "TB",
        name: "Tran Quoc Bao",
        roleOrg: "Operations Director, Minh An Engineering",
        sector: "Manufacturing",
        interest: "AI in quality control",
        tag: "Class Representative"
      },
      {
        initials: "LH",
        name: "Le Thu Hang",
        roleOrg: "Head of Digital Channels, Phuong Dong Bank",
        sector: "Finance & Banking",
        interest: "Customer experience"
      },
      {
        initials: "DN",
        name: "Do Hai Nam",
        roleOrg: "Founder & CEO, EduNest",
        sector: "Startups",
        interest: "EdTech business models"
      },
      {
        initials: "VM",
        name: "Vu Thanh Mai",
        roleOrg: "Deputy Director, Provincial Department of Public Administration",
        sector: "Public Sector",
        interest: "Digital public services"
      }
    ],
    studentsMoreCount: 14,

    cta: {
      title: "WORK WITH THIS COHORT.",
      desc: "Bring a challenge, host an experiment or co-create a project with Cohort 01.",
      btnLabel: "Connect with us",
      btnHref: "/#contact"
    },

    pagination: {
      prevLabel: "All cohorts",
      prevHref: "/#cohorts",
      nextLabel: "Cohort 02",
      nextHref: "/cohorts/cohort-02"
    }
  },

  "cohort-02": {
    slug: "cohort-02",
    status: "coming-soon",
    name: "COHORT 02",
    period: "2026–2028",
    metaTag: "COMING SOON",
    title: "WRITE YOUR NEXT CHAPTER.",
    description: "Join a network of practitioners already leading change across industries, and build on the foundations laid by Cohort 01.",

    cta: {
      btnLabel: "Get program updates",
      btnHref: "/#contact"
    },

    pagination: {
      prevLabel: "Cohort 01",
      prevHref: "/cohorts/cohort-01",
      nextLabel: "All cohorts",
      nextHref: "/#cohorts"
    }
  }
};
