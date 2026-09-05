'use client';

import { useState, type ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Download,
  Headphones,
  HeartHandshake,
  Home,
  Laptop,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Star,
  UserRound,
  UsersRound,
  WalletCards,
  Wifi,
  Wrench,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type Role = 'customer' | 'technician' | 'admin';
type NavItem = { key: string; label: string; icon: typeof Home };

const roleCopy = {
  customer: { label: 'Family', name: 'Alex Morgan', initials: 'AM' },
  technician: { label: 'Technician', name: 'Jordan Lee', initials: 'JL' },
  admin: { label: 'Admin', name: 'Maya Chen', initials: 'MC' },
} satisfies Record<Role, { label: string; name: string; initials: string }>;

const nav: Record<Role, NavItem[]> = {
  customer: [
    { key: 'overview', label: 'Overview', icon: Home },
    { key: 'get-help', label: 'Get help', icon: LifeBuoy },
    { key: 'sessions', label: 'Sessions', icon: CalendarDays },
    { key: 'family', label: 'My family', icon: UsersRound },
    { key: 'billing', label: 'Plan & billing', icon: WalletCards },
  ],
  technician: [
    { key: 'overview', label: 'Overview', icon: Home },
    { key: 'requests', label: 'Available requests', icon: Search },
    { key: 'sessions', label: 'My sessions', icon: CalendarDays },
    { key: 'earnings', label: 'Earnings', icon: WalletCards },
    { key: 'profile', label: 'Profile', icon: UserRound },
  ],
  admin: [
    { key: 'overview', label: 'Overview', icon: Home },
    { key: 'queue', label: 'Request queue', icon: LifeBuoy },
    { key: 'technicians', label: 'Technicians', icon: Headphones },
    { key: 'families', label: 'Families', icon: UsersRound },
    { key: 'billing', label: 'Plans & billing', icon: WalletCards },
  ],
};

export default function HomePage() {
  const [role, setRole] = useState<Role>('customer');
  const [activeView, setActiveView] = useState('overview');
  const [helpOpen, setHelpOpen] = useState(false);
  const identity = roleCopy[role];

  function changeRole(next: Role) {
    setRole(next);
    setActiveView('overview');
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => setActiveView('overview')}
          >
            <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <HeartHandshake className="size-5" />
            </span>
            <span>
              <span className="block text-lg font-bold tracking-[-0.03em]">
                CanHue
              </span>
              <span className="block text-xs font-medium text-muted-foreground">
                Help is just a call away.
              </span>
            </span>
          </button>
          <div
            className="hidden items-center rounded-xl border bg-muted/60 p-1 md:flex"
            aria-label="Preview a user role"
          >
            {(Object.keys(roleCopy) as Role[]).map((key) => (
              <button
                key={key}
                onClick={() => changeRole(key)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${role === key ? 'bg-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
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

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[238px_1fr]">
        <aside className="hidden min-h-[calc(100vh-72px)] border-r bg-white px-4 py-7 lg:block">
          <nav className="space-y-1" aria-label="Main navigation">
            {nav[role].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveView(key)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${activeView === key ? 'bg-primary/8 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                <Icon className="size-[18px]" />
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-9 rounded-2xl bg-[#f2f8f5] p-4">
            <ShieldCheck className="mb-3 size-6 text-primary" />
            <p className="text-sm font-bold">Your safety matters</p>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              We never ask for passwords, banking details, or gift cards.
            </p>
            <button className="mt-3 text-sm font-bold text-primary">
              Our safety promise →
            </button>
          </div>
          <p className="mt-5 px-3 text-xs font-semibold text-muted-foreground">
            POC · Mock data only
          </p>
        </aside>

        <section className="min-w-0 px-5 py-7 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-6 grid grid-cols-2 gap-3 md:hidden">
            <label className="col-span-1">
              <span className="eyebrow mb-2 block">Role</span>
              <select
                value={role}
                onChange={(e) => changeRole(e.target.value as Role)}
                className="form-control"
              >
                <option value="customer">Family</option>
                <option value="technician">Technician</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label className="col-span-1">
              <span className="eyebrow mb-2 block">Page</span>
              <select
                value={activeView}
                onChange={(e) => setActiveView(e.target.value)}
                className="form-control"
              >
                {nav[role].map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {role === 'customer' && (
            <CustomerView
              view={activeView}
              onRequestHelp={() => setHelpOpen(true)}
              onNavigate={setActiveView}
            />
          )}
          {role === 'technician' && <TechnicianView view={activeView} />}
          {role === 'admin' && <AdminView view={activeView} />}
        </section>
      </div>
      <HelpRequestDialog open={helpOpen} onOpenChange={setHelpOpen} />
    </main>
  );
}

function CustomerView({
  view,
  onRequestHelp,
  onNavigate,
}: {
  view: string;
  onRequestHelp: () => void;
  onNavigate: (view: string) => void;
}) {
  if (view === 'get-help') return <GetHelpPage onRequestHelp={onRequestHelp} />;
  if (view === 'sessions')
    return <CustomerSessionsPage onRequestHelp={onRequestHelp} />;
  if (view === 'family') return <FamilyPage />;
  if (view === 'billing') return <CustomerBillingPage />;
  return (
    <CustomerDashboard onRequestHelp={onRequestHelp} onNavigate={onNavigate} />
  );
}

function TechnicianView({ view }: { view: string }) {
  if (view === 'requests') return <AvailableRequestsPage />;
  if (view === 'sessions') return <TechnicianSessionsPage />;
  if (view === 'earnings') return <EarningsPage />;
  if (view === 'profile') return <TechnicianProfilePage />;
  return <TechnicianDashboard />;
}

function AdminView({ view }: { view: string }) {
  if (view === 'queue') return <RequestQueuePage />;
  if (view === 'technicians') return <TechniciansPage />;
  if (view === 'families') return <FamiliesPage />;
  if (view === 'billing') return <AdminBillingPage />;
  return <AdminDashboard />;
}

function CustomerDashboard({
  onRequestHelp,
  onNavigate,
}: {
  onRequestHelp: () => void;
  onNavigate: (view: string) => void;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Friday, September 5"
        title="Good afternoon, Alex."
        description="How can we make technology easier today?"
        action={
          <Button
            onClick={onRequestHelp}
            size="lg"
            className="h-12 rounded-xl px-5 text-base"
          >
            <Plus /> Get tech help
          </Button>
        }
      />
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.55fr_.85fr]">
        <article className="overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-sm">
          <div className="grid min-h-[310px] md:grid-cols-[1fr_220px]">
            <div className="flex flex-col justify-between p-7 sm:p-9">
              <div>
                <Badge className="bg-white/14 text-white">Family Plan</Badge>
                <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">
                  Patient, trusted tech help for Mom.
                </h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-white/78">
                  One 45-minute session each month, priority support, and help
                  coordinating care for your family.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  onClick={onRequestHelp}
                  className="h-11 bg-white px-4 text-primary hover:bg-white/90"
                >
                  Request help <ArrowRight />
                </Button>
                <span className="text-sm font-semibold text-white/72">
                  1 session available
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
            </div>
          </div>
        </article>
        <article className="panel flex flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Next session</p>
              <h2 className="mt-2 text-xl font-bold">Printer won’t connect</h2>
            </div>
            <Status tone="amber">Tomorrow</Status>
          </div>
          <InfoLine
            icon={CalendarDays}
            title="September 6 · 10:30 AM"
            note="45 minutes"
          />
          <InfoLine
            icon={UserRound}
            title="For Eleanor Morgan"
            note="Managed by you"
          />
          <div className="mt-auto flex items-center justify-between border-t pt-5">
            <Identity
              initials="JL"
              name="Jordan Lee"
              detail="Your technician"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('sessions')}
            >
              View details
            </Button>
          </div>
        </article>
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <Section
          title="Who needs help?"
          eyebrow="My family"
          action={
            <button
              onClick={() => onNavigate('family')}
              className="text-sm font-bold text-primary"
            >
              Manage family
            </button>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
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
        </Section>
        <Section
          title="Session history"
          eyebrow="Recent help"
          action={
            <button
              onClick={() => onNavigate('sessions')}
              className="text-sm font-bold text-primary"
            >
              View all
            </button>
          }
        >
          <div className="divide-y">
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
        </Section>
      </div>
    </div>
  );
}

function GetHelpPage({ onRequestHelp }: { onRequestHelp: () => void }) {
  const categories = [
    {
      icon: Wifi,
      title: 'Wi-Fi & internet',
      text: 'Connection drops, routers, and slow internet',
    },
    {
      icon: Mail,
      title: 'Email & passwords',
      text: 'Sign-in help, recovery, and suspicious emails',
    },
    {
      icon: Laptop,
      title: 'Device setup',
      text: 'Computers, tablets, phones, and smart devices',
    },
    {
      icon: Wrench,
      title: 'Printer & software',
      text: 'Setup, updates, scanning, and common errors',
    },
  ];
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Get help"
        title="What can we help with?"
        description="Choose a common topic or tell us what is happening. A patient technician will guide you one step at a time."
        action={
          <Button onClick={onRequestHelp} size="lg" className="h-12 px-5">
            <Plus /> Start a request
          </Button>
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {categories.map(({ icon: Icon, title, text }) => (
          <button
            key={title}
            onClick={onRequestHelp}
            className="panel group flex items-start gap-4 p-6 text-left transition hover:-translate-y-0.5 hover:border-primary/30"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
              <Icon className="size-6" />
            </span>
            <span className="flex-1">
              <span className="block text-lg font-bold">{title}</span>
              <span className="mt-1 block text-sm leading-6 text-muted-foreground">
                {text}
              </span>
            </span>
            <ArrowRight className="mt-1 size-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <Section eyebrow="How it works" title="A safe, guided session">
          <ol className="grid gap-5 sm:grid-cols-3">
            <Step
              n="1"
              title="Tell us the issue"
              text="Describe the problem and choose who needs help."
            />
            <Step
              n="2"
              title="Meet your helper"
              text="See the verified technician before the session begins."
            />
            <Step
              n="3"
              title="Stay in control"
              text="Approve screen viewing and control separately, then stop anytime."
            />
          </ol>
        </Section>
        <div className="rounded-3xl border border-[#f0cf8c] bg-[#fff8e8] p-6">
          <AlertTriangle className="size-6 text-[#98691c]" />
          <h2 className="mt-4 text-lg font-bold">Think it might be a scam?</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Stop communicating with the sender. Don’t share codes or payment
            information. We can safely review what you received.
          </p>
          <Button
            onClick={onRequestHelp}
            variant="outline"
            className="mt-5 border-[#dab76d] bg-white"
          >
            Request a scam check
          </Button>
        </div>
      </div>
    </div>
  );
}

function CustomerSessionsPage({
  onRequestHelp,
}: {
  onRequestHelp: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Sessions"
        title="Your family’s tech help"
        description="Review upcoming appointments and the support your family has received."
        action={
          <Button onClick={onRequestHelp}>
            <Plus /> New request
          </Button>
        }
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
        <Section eyebrow="Upcoming" title="Printer won’t connect">
          <div className="rounded-2xl bg-[#f5faf8] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Status tone="green">Confirmed</Status>
                <p className="mt-3 text-lg font-bold">
                  Saturday, September 6 at 10:30 AM
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  For Eleanor · 45-minute remote session
                </p>
              </div>
              <Identity
                initials="JL"
                name="Jordan Lee"
                detail="4.9 ★ · 412 sessions"
              />
            </div>
            <div className="mt-5 grid gap-3 border-t pt-5 sm:grid-cols-3">
              <MiniFact label="Issue" value="Printer setup" />
              <MiniFact label="Contact" value="Phone + screen" />
              <MiniFact label="Plan" value="Included session" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Prepare for session</Button>
            <Button variant="outline">Reschedule</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </Section>
        <Section eyebrow="Before you begin" title="You stay in control">
          <ul className="space-y-4">
            <CheckItem text="Eleanor approves screen viewing" />
            <CheckItem text="Control requires separate approval" />
            <CheckItem text="A large Stop button stays visible" />
            <CheckItem text="Access ends with the session" />
          </ul>
        </Section>
      </div>
      <Section eyebrow="Past sessions" title="Support history" className="mt-6">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Issue</th>
                <th>Recipient</th>
                <th>Technician</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aug 18</td>
                <td>Suspicious email check</td>
                <td>Eleanor</td>
                <td>Jordan Lee</td>
                <td>
                  <Status tone="green">Resolved</Status>
                </td>
              </tr>
              <tr>
                <td>Jul 22</td>
                <td>Set up video calling</td>
                <td>Eleanor</td>
                <td>Priya Shah</td>
                <td>
                  <Status tone="green">Resolved</Status>
                </td>
              </tr>
              <tr>
                <td>Jun 11</td>
                <td>Browser running slowly</td>
                <td>Alex</td>
                <td>Jordan Lee</td>
                <td>
                  <Status tone="green">Resolved</Status>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function FamilyPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="My family"
        title="People you support"
        description="Coordinate help while respecting each person’s privacy and choices."
        action={
          <Button>
            <Plus /> Add a person
          </Button>
        }
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ProfileCard
          initials="EM"
          name="Eleanor Morgan"
          relation="Mom · Support recipient"
          tags={['Phone calls preferred', 'Windows laptop']}
          details={[
            ['Access', 'Approves every session'],
            ['Summaries', 'Shared with Alex'],
            ['Last help', 'August 18'],
          ]}
        />
        <ProfileCard
          initials="AM"
          name="Alex Morgan"
          relation="You · Family Plan manager"
          tags={['Email notifications', 'Plan owner']}
          details={[
            ['Access', 'Self-approved'],
            ['Billing', 'Account holder'],
            ['Last help', 'June 11'],
          ]}
        />
      </div>
      <Section
        eyebrow="Permissions"
        title="Eleanor’s sharing choices"
        className="mt-6"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Permission
            title="Schedule help"
            detail="Alex may schedule"
            enabled
          />
          <Permission title="Join sessions" detail="Invite required" enabled />
          <Permission
            title="Receive summary"
            detail="Resolution only"
            enabled
          />
          <Permission title="Control device" detail="Never automatic" />
        </div>
        <div className="mt-5 flex gap-3 rounded-2xl bg-muted p-4">
          <LockKeyhole className="mt-0.5 size-5 text-primary" />
          <p className="text-sm leading-6 text-muted-foreground">
            Eleanor’s choices govern her sessions even though Alex manages and
            pays for the Family Plan.
          </p>
        </div>
      </Section>
    </div>
  );
}

function CustomerBillingPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Plan & billing"
        title="Your Family Plan"
        description="One predictable plan for trusted support when your family needs it."
        action={
          <Button variant="outline">
            <Download /> Download receipt
          </Button>
        }
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <article className="overflow-hidden rounded-3xl bg-[#173f37] p-7 text-white sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <Badge className="bg-white/12 text-white">Active</Badge>
              <h2 className="mt-4 text-3xl font-bold">
                $39{' '}
                <span className="text-base font-medium text-white/60">
                  / month
                </span>
              </h2>
              <p className="mt-2 text-white/72">Renews October 1, 2026</p>
            </div>
            <CreditCard className="size-8 text-[#8dd6bf]" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <CheckItem light text="One 45-minute session monthly" />
            <CheckItem light text="Priority scheduling" />
            <CheckItem light text="$39 additional sessions" />
            <CheckItem light text="Family-managed account" />
          </div>
        </article>
        <Section eyebrow="This month" title="September usage">
          <div className="rounded-2xl bg-secondary/60 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">
                  session remaining
                </p>
              </div>
              <p className="text-sm font-semibold">0 of 1 used</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full w-0 bg-primary" />
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <MiniFact label="Payment method" value="Visa ending in 4242" />
            <MiniFact label="Next charge" value="$39 on October 1" />
          </div>
          <Button variant="outline" className="mt-5 w-full">
            Manage billing
          </Button>
        </Section>
      </div>
      <Section eyebrow="Other option" title="One-time support" className="mt-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold">$49 for up to 45 minutes</p>
            <p className="mt-1 text-sm text-muted-foreground">
              No subscription required. Pay only when you need help.
            </p>
          </div>
          <Button variant="outline">Learn more</Button>
        </div>
      </Section>
    </div>
  );
}

function TechnicianDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Technician workspace"
        title="Good afternoon, Jordan."
        description="You have two sessions scheduled today."
        action={<Button size="lg">Set availability</Button>}
      />
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
        <Section eyebrow="Up next" title="Today’s schedule">
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
        </Section>
        <article className="rounded-3xl bg-[#173f37] p-7 text-white">
          <Badge className="bg-white/12 text-white">Available request</Badge>
          <h2 className="mt-5 text-2xl font-bold">Wi-Fi keeps disconnecting</h2>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Windows laptop · Flexible today
          </p>
          <div className="mt-6 flex gap-3 text-sm">
            <Clock3 className="size-5 text-[#8dd6bf]" />
            Estimated 30–45 minutes
          </div>
          <Button className="mt-7 w-full bg-white text-primary">
            Review request
          </Button>
        </article>
      </div>
    </div>
  );
}

const requests = [
  [
    'Wi-Fi keeps disconnecting',
    'Helen Brooks',
    'Windows 11 · Today',
    '$39',
    'Networking',
  ],
  [
    'Photos missing from tablet',
    'Marvin Cole',
    'iPad · Tomorrow',
    '$39',
    'Device setup',
  ],
  ['Suspicious renewal email', 'Dorothy King', 'Email · ASAP', '$49', 'Safety'],
  [
    'Printer says offline',
    'Arthur Mills',
    'Windows 10 · Flexible',
    '$39',
    'Printer',
  ],
];

function AvailableRequestsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Available requests"
        title="Find your next session"
        description="Requests are matched to your skills, availability, and the customer’s preferred support style."
        action={
          <Button variant="outline">
            <Settings2 /> Adjust matching
          </Button>
        }
      />
      <div className="mt-7 flex flex-wrap gap-2">
        <Filter active>Best matches · 4</Filter>
        <Filter>Today</Filter>
        <Filter>Safety trained</Filter>
        <Filter>Under 45 min</Filter>
      </div>
      <div className="mt-5 grid gap-4">
        {requests.map(([title, person, meta, pay, category], index) => (
          <article
            key={title}
            className="panel flex flex-col gap-5 p-6 lg:flex-row lg:items-center"
          >
            <div className="flex flex-1 gap-4">
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-2xl ${index === 2 ? 'bg-[#fff1e7] text-[#a6531f]' : 'bg-secondary text-primary'}`}
              >
                {index === 2 ? (
                  <ShieldCheck />
                ) : index === 0 ? (
                  <Wifi />
                ) : (
                  <Laptop />
                )}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">{title}</h2>
                  {index === 2 && <Status tone="amber">Priority</Status>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {person} · {meta}
                </p>
                <Badge variant="outline" className="mt-3">
                  {category}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between gap-6 lg:justify-end">
              <div>
                <p className="text-lg font-bold">{pay}</p>
                <p className="text-xs text-muted-foreground">
                  estimated payout
                </p>
              </div>
              <Button>
                Review <ArrowRight />
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TechnicianSessionsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="My sessions"
        title="Your support schedule"
        description="Prepare for upcoming calls and complete clear, privacy-safe resolution notes."
        action={
          <Button variant="outline">
            <CalendarDays /> Calendar view
          </Button>
        }
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Section eyebrow="Today · 2 sessions" title="Friday, September 5">
          <DetailedSession
            time="2:00 PM"
            title="Email password reset"
            person="Robert Bell"
            status="Ready"
          />
          <DetailedSession
            time="4:30 PM"
            title="Set up a new tablet"
            person="Eleanor Morgan"
            status="Confirmed"
          />
        </Section>
        <Section eyebrow="Session readiness" title="Before you connect">
          <ul className="space-y-4">
            <CheckItem text="Review the issue, not private history" />
            <CheckItem text="Confirm identity and session purpose" />
            <CheckItem text="Ask separately for view and control" />
            <CheckItem text="Never request financial credentials" />
          </ul>
        </Section>
      </div>
      <Section eyebrow="Completed" title="Recent sessions" className="mt-6">
        <div className="divide-y">
          <SessionRow
            title="Printer driver update · Susan Park"
            meta="Sep 4 · 38 minutes · $39 payout"
            status="Resolved"
          />
          <SessionRow
            title="Browser cleanup · Thomas Reed"
            meta="Sep 4 · 29 minutes · $39 payout"
            status="Resolved"
          />
          <SessionRow
            title="Video calling setup · Maria Diaz"
            meta="Sep 3 · 44 minutes · $39 payout"
            status="Resolved"
          />
        </div>
      </Section>
    </div>
  );
}

function EarningsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Earnings"
        title="$2,184 this month"
        description="Estimated earnings from completed and approved support sessions."
        action={
          <Button variant="outline">
            <Download /> Export statement
          </Button>
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric
          label="Available payout"
          value="$936"
          note="Expected September 9"
        />
        <Metric label="Pending review" value="$156" note="4 recent sessions" />
        <Metric label="Year to date" value="$14,820" note="342 sessions" />
      </div>
      <Section
        eyebrow="Weekly activity"
        title="Sessions and earnings"
        className="mt-6"
      >
        <div className="grid h-52 grid-cols-7 items-end gap-3 border-b px-2 pt-8">
          {[54, 72, 45, 88, 62, 35, 78].map((h, i) => (
            <div key={i} className="flex h-full flex-col justify-end gap-2">
              <div
                className="rounded-t-lg bg-primary/80"
                style={{ height: `${h}%` }}
              />
              <p className="text-center text-xs font-semibold text-muted-foreground">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        eyebrow="Recent payouts"
        title="Payment history"
        className="mt-6"
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Sessions</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sep 2</td>
                <td>18 sessions</td>
                <td>$702</td>
                <td>
                  <Status tone="green">Paid</Status>
                </td>
              </tr>
              <tr>
                <td>Aug 26</td>
                <td>16 sessions</td>
                <td>$624</td>
                <td>
                  <Status tone="green">Paid</Status>
                </td>
              </tr>
              <tr>
                <td>Aug 19</td>
                <td>21 sessions</td>
                <td>$819</td>
                <td>
                  <Status tone="green">Paid</Status>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function TechnicianProfilePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Technician profile"
        title="Jordan Lee"
        description="This is what families see when you are matched to their request."
        action={<Button variant="outline">Edit profile</Button>}
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <Section eyebrow="Public profile" title="Trusted technology helper">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarFallback className="bg-[#ece7f8] text-xl font-bold text-[#554280]">
                JL
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">Jordan Lee</p>
                <BadgeCheck className="size-5 fill-primary text-white" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                4.9 ★ · 412 completed sessions
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                English · Spanish
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            I help people feel comfortable with everyday technology. My
            specialties are email, Windows computers, printers, and safe online
            habits.
          </p>
        </Section>
        <Section eyebrow="Trust & qualifications" title="Verification status">
          <div className="grid gap-4 sm:grid-cols-2">
            <Credential title="Identity verified" note="Renewed July 2026" />
            <Credential title="Background check" note="Clear · June 2026" />
            <Credential
              title="Safety training"
              note="Scam response certified"
            />
            <Credential title="Quality review" note="Top 8% of technicians" />
          </div>
          <div className="mt-6">
            <p className="text-sm font-bold">Specialties</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                'Windows',
                'Email',
                'Printers',
                'Wi-Fi',
                'Video calling',
                'Scam checks',
              ].map((x) => (
                <Badge key={x} variant="secondary">
                  {x}
                </Badge>
              ))}
            </div>
          </div>
        </Section>
      </div>
      <Section
        eyebrow="Availability"
        title="Typical weekly schedule"
        className="mt-6"
      >
        <div className="grid gap-3 sm:grid-cols-5">
          {[
            'Monday\n9–5',
            'Tuesday\n9–5',
            'Wednesday\nOff',
            'Thursday\n12–8',
            'Friday\n9–5',
          ].map((x) => {
            const [day, time] = x.split('\n');
            return (
              <div key={day} className="rounded-2xl border p-4">
                <p className="font-semibold">{day}</p>
                <p className="mt-1 text-sm text-muted-foreground">{time}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Operations"
        title="Good afternoon, Maya."
        description="The support queue is healthy. Two items need attention."
        action={<Button variant="outline">Export report</Button>}
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Open requests" value="18" note="4 awaiting assignment" />
        <Metric label="Sessions today" value="31" note="94% on time" />
        <Metric label="Active families" value="428" note="+24 this month" />
        <Metric label="Resolution rate" value="92%" note="First session" />
      </div>
      <Section
        eyebrow="Live operations"
        title="Request queue"
        className="mt-7"
        action={<Button size="sm">Assign requests</Button>}
      >
        <QueueTable compact />
      </Section>
    </div>
  );
}

function RequestQueuePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Request queue"
        title="Coordinate every request"
        description="Prioritize urgent concerns, match the right technician, and keep families informed."
        action={<Button>Assign selected</Button>}
      />
      <div className="mt-7 flex flex-wrap gap-2">
        <Filter active>All open · 18</Filter>
        <Filter>Unassigned · 4</Filter>
        <Filter>Safety review · 2</Filter>
        <Filter>Starting soon · 3</Filter>
      </div>
      <Section
        eyebrow="Live queue"
        title="Open support requests"
        className="mt-5"
      >
        <QueueTable />
      </Section>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Metric label="Median wait" value="8 min" note="Target under 10" />
        <Metric
          label="Match acceptance"
          value="87%"
          note="First technician offered"
        />
        <Metric label="Escalations" value="2" note="Both under review" />
      </div>
    </div>
  );
}

function TechniciansPage() {
  const people = [
    ['JL', 'Jordan Lee', 'Online', '4.9', '412'],
    ['PS', 'Priya Shah', 'In session', '4.8', '368'],
    ['MK', 'Marcus King', 'Online', '4.9', '291'],
    ['AR', 'Ana Ruiz', 'Offline', '4.7', '184'],
  ];
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Technicians"
        title="Trusted support team"
        description="Review readiness, quality, availability, and verification status."
        action={
          <Button>
            <Plus /> Invite technician
          </Button>
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric
          label="Approved technicians"
          value="42"
          note="31 active this week"
        />
        <Metric
          label="Awaiting review"
          value="6"
          note="2 background checks pending"
        />
        <Metric
          label="Average rating"
          value="4.82"
          note="Across 6,204 sessions"
        />
      </div>
      <Section eyebrow="Directory" title="Technician roster" className="mt-6">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Technician</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Sessions</th>
                <th>Verification</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {people.map(([initials, name, status, rating, sessions]) => (
                <tr key={name}>
                  <td>
                    <Identity
                      initials={initials}
                      name={name}
                      detail="Remote support specialist"
                    />
                  </td>
                  <td>
                    <Status
                      tone={
                        status === 'Online'
                          ? 'green'
                          : status === 'In session'
                            ? 'amber'
                            : 'gray'
                      }
                    >
                      {status}
                    </Status>
                  </td>
                  <td>{rating} ★</td>
                  <td>{sessions}</td>
                  <td>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                      <BadgeCheck className="size-4" /> Complete
                    </span>
                  </td>
                  <td>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function FamiliesPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Families"
        title="Customer households"
        description="Support the payer and recipient relationship without blurring privacy boundaries."
        action={
          <Button variant="outline">
            <Download /> Export list
          </Button>
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Metric label="Active households" value="428" note="+24 this month" />
        <Metric
          label="Support recipients"
          value="612"
          note="1.4 per household"
        />
        <Metric
          label="Family Plans"
          value="351"
          note="82% of active accounts"
        />
      </div>
      <Section eyebrow="Recent activity" title="Households" className="mt-6">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Plan manager</th>
                <th>Recipients</th>
                <th>Plan</th>
                <th>Next session</th>
                <th>Consent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Identity
                    initials="AM"
                    name="Alex Morgan"
                    detail="Member since May 2026"
                  />
                </td>
                <td>Eleanor Morgan</td>
                <td>Family Plan</td>
                <td>Sep 6</td>
                <td>
                  <Status tone="green">Current</Status>
                </td>
              </tr>
              <tr>
                <td>
                  <Identity
                    initials="RB"
                    name="Rebecca Brooks"
                    detail="Member since Aug 2026"
                  />
                </td>
                <td>Helen Brooks</td>
                <td>One-time</td>
                <td>Unscheduled</td>
                <td>
                  <Status tone="amber">Review</Status>
                </td>
              </tr>
              <tr>
                <td>
                  <Identity
                    initials="DC"
                    name="Daniel Cole"
                    detail="Member since Jan 2026"
                  />
                </td>
                <td>Marvin & Joan Cole</td>
                <td>Family Plan</td>
                <td>Sep 8</td>
                <td>
                  <Status tone="green">Current</Status>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function AdminBillingPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Plans & billing"
        title="Revenue operations"
        description="A POC view of subscription health, session economics, credits, and refunds."
        action={
          <Button variant="outline">
            <Download /> Export summary
          </Button>
        }
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Monthly recurring"
          value="$13.7k"
          note="351 Family Plans"
        />
        <Metric
          label="One-time sales"
          value="$4.2k"
          note="86 sessions this month"
        />
        <Metric
          label="Technician payouts"
          value="$11.4k"
          note="68% of session revenue"
        />
        <Metric label="Refund rate" value="1.8%" note="Within 3% target" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Section eyebrow="Offer" title="Family Plan · $39/month">
          <ul className="space-y-4">
            <MiniFact label="Active subscribers" value="351" />
            <MiniFact label="Monthly sessions included" value="1" />
            <MiniFact label="Additional session" value="$39" />
            <MiniFact label="Monthly churn" value="3.2%" />
          </ul>
          <Button variant="outline" className="mt-5">
            Edit plan
          </Button>
        </Section>
        <Section eyebrow="Offer" title="One-time help · $49">
          <ul className="space-y-4">
            <MiniFact label="Purchases this month" value="86" />
            <MiniFact label="Session length" value="Up to 45 minutes" />
            <MiniFact label="Converted to plan" value="24%" />
            <MiniFact label="Average payout" value="$39" />
          </ul>
          <Button variant="outline" className="mt-5">
            Edit offer
          </Button>
        </Section>
      </div>
      <Section
        eyebrow="Exceptions"
        title="Credits and refunds"
        className="mt-6"
      >
        <div className="divide-y">
          <SessionRow
            title="$49 refund · Susan Park"
            meta="Connection failure · Approved by Maya"
            status="Processed"
          />
          <SessionRow
            title="$20 account credit · Robert Bell"
            meta="Session started late · Awaiting approval"
            status="Review"
          />
        </div>
      </Section>
    </div>
  );
}

function HelpRequestDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) setSubmitted(false);
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl p-0 sm:max-w-xl">
        {submitted ? (
          <div className="p-8 text-center sm:p-10">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary">
              <CheckCircle2 className="size-7" />
            </span>
            <DialogHeader className="mt-5 items-center">
              <DialogTitle className="text-2xl font-bold">
                Your request is ready
              </DialogTitle>
              <DialogDescription className="max-w-sm leading-6">
                This POC saved the request for preview. No charge was made and
                no technician was contacted.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 rounded-2xl bg-muted p-4 text-left text-sm">
              <p className="font-semibold">Help for Eleanor</p>
              <p className="mt-1 text-muted-foreground">
                Tomorrow morning · Family Plan session
              </p>
            </div>
            <Button
              className="mt-6 h-11 w-full"
              onClick={() => handleOpenChange(false)}
            >
              Return to dashboard
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="border-b px-6 py-6 sm:px-8">
              <DialogHeader>
                <p className="eyebrow">Request support</p>
                <DialogTitle className="text-2xl font-bold">
                  Tell us how we can help
                </DialogTitle>
                <DialogDescription className="leading-6">
                  A few details help us match you with the right patient,
                  trusted technician.
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="space-y-5 px-6 py-6 sm:px-8">
              <Field label="Who needs help?" htmlFor="recipient">
                <select id="recipient" className="form-control">
                  <option>Eleanor Morgan (Mom)</option>
                  <option>Alex Morgan (Me)</option>
                </select>
              </Field>
              <Field label="What do you need help with?" htmlFor="issue">
                <select id="issue" className="form-control">
                  <option>Printer or scanner</option>
                  <option>Email or password</option>
                  <option>Wi-Fi or internet</option>
                  <option>New device setup</option>
                  <option>Suspicious message or scam check</option>
                  <option>Something else</option>
                </select>
              </Field>
              <Field label="Describe what’s happening" htmlFor="details">
                <Textarea
                  id="details"
                  required
                  className="min-h-24 rounded-xl text-base"
                  placeholder="For example: The printer says it is offline and nothing will print."
                />
              </Field>
              <Field label="When would you like help?" htmlFor="timing">
                <select id="timing" className="form-control">
                  <option>As soon as possible</option>
                  <option>Later today</option>
                  <option>Tomorrow morning</option>
                  <option>Choose another time</option>
                </select>
              </Field>
              <div className="flex gap-3 rounded-2xl border bg-[#f8fbf9] p-4 text-sm leading-5">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  className="mt-0.5 size-4 accent-[#176451]"
                />
                <label htmlFor="consent">
                  <span className="block font-semibold">
                    Eleanor will approve access herself
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                    The technician cannot view or control her computer until she
                    gives permission.
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-3 rounded-b-3xl border-t bg-muted/45 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p className="text-sm text-muted-foreground">
                Uses your included monthly session
              </p>
              <Button type="submit" className="h-11 px-5">
                Review request <ArrowRight />
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
function Section({
  eyebrow,
  title,
  action,
  children,
  className = '',
}: {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`panel p-6 sm:p-7 ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-1 text-xl font-bold">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </article>
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
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{note}</p>
    </article>
  );
}
function Status({
  children,
  tone,
}: {
  children: ReactNode;
  tone: 'green' | 'amber' | 'gray';
}) {
  const c =
    tone === 'green'
      ? 'bg-[#e6f4ef] text-[#236652]'
      : tone === 'amber'
        ? 'bg-[#fff0df] text-[#915816]'
        : 'bg-muted text-muted-foreground';
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${c}`}
    >
      {children}
    </span>
  );
}
function Identity({
  initials,
  name,
  detail,
}: {
  initials: string;
  name: string;
  detail: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="bg-[#ece7f8] font-semibold text-[#554280]">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
function InfoLine({
  icon: Icon,
  title,
  note,
}: {
  icon: typeof Home;
  title: string;
  note: string;
}) {
  return (
    <div className="mt-5 flex gap-3 text-sm">
      <Icon className="size-5 text-primary" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}
function MiniFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}
function CheckItem({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <li
      className={`flex gap-3 text-sm leading-6 ${light ? 'text-white/82' : ''}`}
    >
      <Check
        className={`mt-1 size-4 shrink-0 ${light ? 'text-[#8dd6bf]' : 'text-primary'}`}
      />
      {text}
    </li>
  );
}
function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <li>
      <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-white">
        {n}
      </span>
      <p className="mt-3 font-bold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </li>
  );
}
function Filter({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`rounded-full border px-4 py-2 text-sm font-semibold ${active ? 'border-primary bg-primary text-white' : 'bg-white text-muted-foreground hover:text-foreground'}`}
    >
      {children}
    </button>
  );
}
function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
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
      <span className="grid size-9 place-items-center rounded-full bg-secondary text-primary">
        <Check className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{meta}</p>
      </div>
      <Status tone={status === 'Review' ? 'amber' : 'green'}>{status}</Status>
    </div>
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
    <div className="flex items-center gap-4 border-b py-5 first:pt-0 last:border-0 last:pb-0">
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
function DetailedSession({
  time,
  title,
  person,
  status,
}: {
  time: string;
  title: string;
  person: string;
  status: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b py-5 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-center">
      <p className="w-20 font-bold text-primary">{time}</p>
      <div className="flex-1">
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {person} · 45-minute remote session
        </p>
      </div>
      <Status tone="green">{status}</Status>
      <Button size="sm">Open workspace</Button>
    </div>
  );
}
function ProfileCard({
  initials,
  name,
  relation,
  tags,
  details,
}: {
  initials: string;
  name: string;
  relation: string;
  tags: string[];
  details: string[][];
}) {
  return (
    <article className="panel p-6 sm:p-7">
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="bg-[#f6e8dc] text-lg font-bold text-[#8a522e]">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{relation}</p>
        </div>
        <Button size="sm" variant="outline">
          View
        </Button>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((x) => (
          <Badge key={x} variant="secondary">
            {x}
          </Badge>
        ))}
      </div>
      <div className="mt-5 space-y-3 border-t pt-5">
        {details.map(([a, b]) => (
          <MiniFact key={a} label={a} value={b} />
        ))}
      </div>
    </article>
  );
}
function Permission({
  title,
  detail,
  enabled = false,
}: {
  title: string;
  detail: string;
  enabled?: boolean;
}) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{title}</p>
        <span
          className={`grid size-6 place-items-center rounded-full ${enabled ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
        >
          {enabled ? (
            <Check className="size-3.5" />
          ) : (
            <LockKeyhole className="size-3.5" />
          )}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
function Credential({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex gap-3 rounded-2xl border p-4">
      <BadgeCheck className="size-5 shrink-0 text-primary" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}
function QueueTable({ compact = false }: { compact?: boolean }) {
  const rows = [
    ['Wi-Fi disconnecting', 'Helen Brooks', 'Today · Flexible', 'Unassigned'],
    ['Printer setup', 'Eleanor Morgan', 'Sep 6 · 10:30 AM', 'Assigned'],
    ['Suspicious pop-up', 'David Owens', 'Today · ASAP', 'Safety review'],
    ['Tablet photo transfer', 'Marvin Cole', 'Sep 8 · Afternoon', 'Matching'],
  ];
  return (
    <div className="overflow-x-auto">
      <table className="data-table">
        <thead>
          <tr>
            <th>Request</th>
            <th>Recipient</th>
            <th>Timing</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows
            .slice(0, compact ? 3 : 4)
            .map(([issue, person, time, status]) => (
              <tr key={issue}>
                <td className="font-semibold">{issue}</td>
                <td>{person}</td>
                <td>{time}</td>
                <td>
                  <Status
                    tone={
                      status === 'Assigned'
                        ? 'green'
                        : status === 'Safety review'
                          ? 'amber'
                          : 'gray'
                    }
                  >
                    {status}
                  </Status>
                </td>
                <td>
                  <button aria-label={`Actions for ${issue}`}>
                    <MoreHorizontal className="size-5 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
