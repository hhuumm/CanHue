# CanHue

> A deployed proof of concept for patient, trusted remote technology assistance
> for older adults and the families who support them.

[![POC](https://img.shields.io/badge/status-proof_of_concept-176451)](https://github.com/hhuumm/CanHue)
[![Live demo](https://img.shields.io/badge/demo-owner--only-287e68)](https://canhue.hummus.chatgpt.site)
[![Repository](https://img.shields.io/badge/repository-public-173f37)](https://github.com/hhuumm/CanHue)

## [Open the live CanHue demo](https://canhue.hummus.chatgpt.site)

The deployed preview is currently restricted to the project owner. The interface
is responsive and can be reviewed from a phone after signing in with the owner's
account.

## The idea

CanHue is named after the familiar request, “Can you do this for me?” It explores
an on-demand service where an older adult can receive calm, trustworthy computer
help while an authorized family member coordinates and pays for that support.

The initial offer is intentionally simple:

- **One-time remote support:** approximately $49 for up to 45 minutes
- **Family Plan:** approximately $39/month, including one monthly session,
  discounted additional sessions, priority support, and family-managed scheduling

## What the POC demonstrates

The demo is a complete clickable walkthrough rather than a single dashboard.
Every sidebar item opens a representative product screen with realistic mock
records, status states, safeguards, and calls to action.

| Experience | Included screens |
| --- | --- |
| Family | Overview, guided help request, sessions, family permissions, plan and billing |
| Technician | Overview, available requests, session schedule, earnings, verified profile |
| Administrator | Operations overview, request queue, technician roster, households, revenue operations |

### Family experience

- Request help for yourself or a family member
- Choose an issue category and preferred timing
- Manage support recipients separately from the paying account
- Review upcoming and completed sessions
- Require recipient approval before remote access

### Technician experience

- Review available requests
- See scheduled sessions and customer context
- Manage availability
- Preview earnings and customer ratings

### Administrator experience

- Monitor the live request queue
- Review assignments and safety flags
- Track active families, session volume, and resolution rate

Use the **Family**, **Technician**, and **Admin** switcher in the app header to
preview all three experiences.

## Product structure

```text
Paying customer / family manager
└── Household
    ├── Support recipient(s)
    ├── Family Plan or one-time purchase
    └── Support request
        ├── Recipient consent
        ├── Assigned technician
        ├── Remote helper session
        └── Resolution summary
```

The payer and the person receiving support are deliberately modeled separately.
Payment does not automatically grant access to the recipient's screen, session
details, or private information.

## Safety principles

- Explicit recipient consent for every remote-control session
- Separate permission for viewing and controlling the computer
- No banking passwords, payment credentials, or access codes in support notes
- No permanent unattended access by default
- Visible session status and an immediate stop-control action
- Short-lived connection authorization and auditable consent events

## Current status

This is an interface and workflow POC. It uses mock data and does **not** yet
provide real authentication, payments, technician payouts, persistent storage,
notifications, or remote computer control.

The current build includes responsive navigation and a shared, mobile-friendly
table system for the operational views.

The next product phase is a local, role-aware application model followed by a
security evaluation of an attended remote-control engine such as MeshCentral or
a commercial support SDK.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Validation commands:

```bash
npm run lint
npm run build
```

## Repository classification

This project uses the `proof-of-concept`, `prototype`, and `early-stage` GitHub
topics. The same `proof-of-concept` topic can group future early product ideas.
