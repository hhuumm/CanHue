# CanHue

An early product prototype for an on-demand remote technology assistance service
focused on older adults and their families.

The name is inspired by the familiar request, “Can you do this for me?”

## Prototype scope

- Family dashboard for plan management, support recipients, and session history
- Technician dashboard for availability, assigned sessions, and earnings
- Administrator dashboard for the request queue and operating metrics
- Mock data only: no real authentication, payments, payouts, or remote access

## Local development

```bash
npm install
npm run dev
```

The role switcher in the header previews each of the three user experiences.

## Safety principles

The payer and support recipient are modeled as separate people. Future data and
session-summary access must be controlled by explicit recipient consent. The
service must never collect banking passwords, payment credentials, or remote
access credentials in support notes.
