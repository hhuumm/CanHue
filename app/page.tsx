'use client';

import { useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  HeartHandshake,
  Home,
  LifeBuoy,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  UsersRound,
  WalletCards,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Role = 'customer' | 'technician' | 'admin';
const roleCopy: Record<
  Role,
  { label: string; name: string; initials: string }
> = {
  customer: { label: 'Family', name: 'Alex Morgan', initials: 'AM' },
  technician: { label: 'Technician', name: 'Jordan Lee', initials: 'JL' },
  admin: { label: 'Admin', name: 'Maya Chen', initials: 'MC' },
};
const nav = {
  customer: [
    ['Overview', Home],
    ['Get help', LifeBuoy],
    ['Sessions', CalendarDays],
    ['My family', UsersRound],
    ['Plan & billing', WalletCards],
  ],
  technician: [
    ['Overview', Home],
    ['Available requests', Search],
    ['My sessions', CalendarDays],
    ['Earnings', WalletCards],
    ['Profile', UserRound],
  ],
  admin: [
    ['Overview', Home],
    ['Request queue', LifeBuoy],
    ['Technicians', Headphones],
    ['Families', UsersRound],
    ['Plans & billing', WalletCards],
  ],
} as const;

export default function HomePage() {
  const [role, setRole] = useState<Role>('customer');
  const identity = roleCopy[role];
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <HeartHandshake className="size-5" />
            </div>
            <div>
              <p className="font-heading text-lg font-bold tracking-[-0.03em]">
                CanHue
              </p>
              <p className="text-[11px] font-medium text-muted-foreground">
                Help is just a call away.
              </p>
            </div>
          </div>
          <div
            className="hidden items-center rounded-xl border bg-muted/60 p-1 md:flex"
            aria-label="Preview a user role"
          >
            {(Object.keys(roleCopy) as Role[]).map((key) => (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${role === key ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {roleCopy[key].label}
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-3 rounded-xl p-1.5 text-left hover:bg-muted"
            aria-label="Open account menu"
          >
            <Avatar size="lg">
              <AvatarFallback className="bg-[#dcefe9] font-semibold text-[#176451]">
                {identity.initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold">
                {identity.name}
              </span>
              <span className="block text-xs text-muted-foreground">
                {identity.label} account
              </span>
            </span>
            <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
          </button>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[230px_1fr]">
        <aside className="hidden min-h-[calc(100vh-72px)] border-r bg-white px-4 py-7 lg:block">
          <nav className="space-y-1" aria-label="Main navigation">
            {nav[role].map(([label, Icon], index) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${index === 0 ? 'bg-primary/8 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                <Icon className="size-[18px]" />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-9 rounded-2xl bg-[#f2f8f5] p-4">
            <ShieldCheck className="mb-3 size-6 text-primary" />
            <p className="text-sm font-bold">Your safety matters</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              We never ask for passwords, banking details, or gift cards.
            </p>
            <button className="mt-3 text-xs font-bold text-primary">
              Our safety promise →
            </button>
          </div>
        </aside>
        <section className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {role === 'customer' && <CustomerDashboard />}
          {role === 'technician' && <TechnicianDashboard />}
          {role === 'admin' && <AdminDashboard />}
        </section>
      </div>
    </main>
  );
}

function CustomerDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Tuesday, September 2</p>
          <h1 className="page-title">Good afternoon, Alex.</h1>
          <p className="mt-2 text-muted-foreground">
            How can we make technology easier today?
          </p>
        </div>
        <Button
          size="lg"
          className="h-12 rounded-xl px-5 text-base shadow-[0_8px_20px_rgba(21,102,82,.18)]"
        >
          <Plus className="size-5" /> Get tech help
        </Button>
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.55fr_.85fr]">
        <article className="overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-sm">
          <div className="grid min-h-[310px] md:grid-cols-[1fr_220px]">
            <div className="flex flex-col justify-between p-7 sm:p-9">
              <div>
                <Badge className="bg-white/14 text-white">Family Plan</Badge>
                <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">
                  Patient, trusted tech help for Mom.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/76">
                  Your plan includes one 45-minute session each month. Schedule
                  it for yourself or someone in your family.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button className="h-11 bg-white px-4 text-primary hover:bg-white/90">
                  Request help <ArrowRight />
                </Button>
                <span className="text-xs font-semibold text-white/70">
                  1 session available this month
                </span>
              </div>
            </div>
            <div
              className="relative hidden overflow-hidden bg-[#287e68] md:block"
              aria-hidden="true"
            >
              <div className="absolute -right-15 top-10 size-56 rounded-full border-[34px] border-white/10" />
              <MessageCircle
                className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-white/85"
                strokeWidth={1.25}
              />
              <Star className="absolute right-8 top-12 size-7 fill-[#f3cf72] text-[#f3cf72]" />
              <Star className="absolute bottom-12 left-8 size-4 fill-white/60 text-white/60" />
            </div>
          </div>
        </article>
        <article className="panel flex flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Next session</p>
              <h2 className="mt-2 text-xl font-bold">Printer won’t connect</h2>
            </div>
            <Badge variant="secondary" className="bg-[#fff4d7] text-[#7a5410]">
              Tomorrow
            </Badge>
          </div>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex gap-3">
              <CalendarDays className="size-5 text-primary" />
              <div>
                <p className="font-semibold">September 3 · 10:30 AM</p>
                <p className="text-muted-foreground">45 minutes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <UserRound className="size-5 text-primary" />
              <div>
                <p className="font-semibold">For Eleanor Morgan</p>
                <p className="text-muted-foreground">Managed by you</p>
              </div>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between border-t pt-5">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#ece7f8] text-[#554280]">
                  JL
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">Jordan Lee</p>
                <p className="text-xs text-muted-foreground">Your technician</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View details
            </Button>
          </div>
        </article>
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <article className="panel p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">My family</p>
              <h2 className="mt-1 text-xl font-bold">Who needs help?</h2>
            </div>
            <Button variant="outline" size="sm">
              <Plus /> Add person
            </Button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <PersonCard
              initials="EM"
              name="Eleanor Morgan"
              relation="Mom · Support recipient"
              color="bg-[#f6e8dc] text-[#8a522e]"
            />
            <PersonCard
              initials="AM"
              name="Alex Morgan"
              relation="You · Plan manager"
              color="bg-[#dcefe9] text-[#176451]"
            />
          </div>
        </article>
        <article className="panel p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Recent help</p>
              <h2 className="mt-1 text-xl font-bold">Session history</h2>
            </div>
            <button className="text-sm font-bold text-primary">View all</button>
          </div>
          <div className="mt-5 divide-y">
            <SessionRow
              title="Suspicious email check"
              meta="Aug 18 · Eleanor"
              status="Resolved"
            />
            <SessionRow
              title="Set up video calling"
              meta="Jul 22 · Eleanor"
              status="Resolved"
            />
          </div>
        </article>
      </div>
    </div>
  );
}

function TechnicianDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Technician workspace</p>
          <h1 className="page-title">Good afternoon, Jordan.</h1>
          <p className="mt-2 text-muted-foreground">
            You have two sessions scheduled today.
          </p>
        </div>
        <Button size="lg" className="h-12 rounded-xl px-5">
          Set availability
        </Button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="Today’s sessions" value="2" note="Next at 2:00 PM" />
        <Metric label="This week" value="$624" note="12 completed sessions" />
        <Metric
          label="Customer rating"
          value="4.9"
          note="Based on 86 reviews"
        />
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <article className="panel p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Up next</p>
              <h2 className="mt-1 text-xl font-bold">Today’s schedule</h2>
            </div>
            <Badge variant="outline">Online</Badge>
          </div>
          <div className="mt-5 divide-y">
            <TechSession
              time="2:00 PM"
              title="Email password reset"
              person="Robert · New customer"
            />
            <TechSession
              time="4:30 PM"
              title="Set up a new tablet"
              person="Eleanor · Returning customer"
            />
          </div>
        </article>
        <article className="rounded-3xl bg-[#173f37] p-7 text-white">
          <Badge className="bg-white/12 text-white">Available request</Badge>
          <h2 className="mt-5 text-2xl font-bold tracking-tight">
            Wi-Fi keeps disconnecting
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Windows laptop · Remote session · Flexible today
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm">
            <Clock3 className="size-5 text-[#8dd6bf]" />
            <span>Estimated 30–45 minutes</span>
          </div>
          <Button className="mt-7 w-full bg-white text-primary hover:bg-white/90">
            Review request
          </Button>
        </article>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Operations</p>
          <h1 className="page-title">Good afternoon, Maya.</h1>
          <p className="mt-2 text-muted-foreground">
            The support queue is healthy. Two items need attention.
          </p>
        </div>
        <Button variant="outline" size="lg" className="h-12 rounded-xl px-5">
          Export report
        </Button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Open requests" value="18" note="4 awaiting assignment" />
        <Metric label="Sessions today" value="31" note="94% on time" />
        <Metric label="Active families" value="428" note="+24 this month" />
        <Metric label="Resolution rate" value="92%" note="First session" />
      </div>
      <article className="panel mt-7 overflow-hidden">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <p className="eyebrow">Live operations</p>
            <h2 className="mt-1 text-xl font-bold">Request queue</h2>
          </div>
          <Button size="sm">Assign requests</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3">Request</th>
                <th className="px-6 py-3">Recipient</th>
                <th className="px-6 py-3">Timing</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <QueueRow
                issue="Wi-Fi disconnecting"
                person="Helen Brooks"
                timing="Today · Flexible"
                status="Unassigned"
                warning
              />
              <QueueRow
                issue="Printer setup"
                person="Eleanor Morgan"
                timing="Sep 3 · 10:30 AM"
                status="Assigned"
              />
              <QueueRow
                issue="Suspicious pop-up"
                person="David Owens"
                timing="Today · ASAP"
                status="Safety review"
                warning
              />
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

function PersonCard({
  initials,
  name,
  relation,
  color,
}: {
  initials: string;
  name: string;
  relation: string;
  color: string;
}) {
  return (
    <button className="flex items-center gap-3 rounded-2xl border p-4 text-left transition hover:border-primary/30 hover:bg-muted/40">
      <Avatar size="lg">
        <AvatarFallback className={color}>{initials}</AvatarFallback>
      </Avatar>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{name}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {relation}
        </span>
      </span>
      <ArrowRight className="size-4 text-muted-foreground" />
    </button>
  );
}
function SessionRow({
  title,
  meta,
  status,
}: {
  title: string;
  meta: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
      <div className="grid size-9 place-items-center rounded-full bg-[#e6f4ef] text-primary">
        <Check className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{meta}</p>
      </div>
      <Badge variant="secondary" className="text-[#236652]">
        {status}
      </Badge>
    </div>
  );
}
function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="panel p-5">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </article>
  );
}
function TechSession({
  time,
  title,
  person,
}: {
  time: string;
  title: string;
  person: string;
}) {
  return (
    <div className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
      <div className="w-18 text-sm font-bold text-primary">{time}</div>
      <div className="h-11 w-1 rounded-full bg-[#efc76d]" />
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{person}</p>
      </div>
      <Button size="sm" variant="outline">
        Open
      </Button>
    </div>
  );
}
function QueueRow({
  issue,
  person,
  timing,
  status,
  warning = false,
}: {
  issue: string;
  person: string;
  timing: string;
  status: string;
  warning?: boolean;
}) {
  return (
    <tr>
      <td className="px-6 py-4 font-semibold">{issue}</td>
      <td className="px-6 py-4 text-muted-foreground">{person}</td>
      <td className="px-6 py-4 text-muted-foreground">{timing}</td>
      <td className="px-6 py-4">
        <Badge
          variant="secondary"
          className={
            warning
              ? 'bg-[#fff0e5] text-[#9a4a16]'
              : 'bg-[#e6f4ef] text-[#236652]'
          }
        >
          {status}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <button aria-label={`Actions for ${issue}`}>
          <MoreHorizontal className="size-5 text-muted-foreground" />
        </button>
      </td>
    </tr>
  );
}
