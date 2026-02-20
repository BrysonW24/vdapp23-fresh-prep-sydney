import Link from 'next/link'
import { ArrowRight, Check, RefreshCw, Pause, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Save 10% Every Order',
    description: 'Subscribers get 10% off every delivery, automatically applied.',
  },
  {
    icon: RefreshCw,
    title: 'Set Your Frequency',
    description: 'Choose weekly or fortnightly delivery to match your schedule.',
  },
  {
    icon: Pause,
    title: 'Pause or Cancel Anytime',
    description: 'No lock-in contracts. Skip a week, pause, or cancel whenever you want.',
  },
]

const HOW_IT_WORKS = [
  { step: 1, title: 'Pick Your Meals', desc: 'Choose from our full menu each week.' },
  { step: 2, title: 'Set Your Schedule', desc: 'Weekly or fortnightly — your call.' },
  { step: 3, title: 'We Deliver Fresh', desc: 'Meals arrive ready to heat and eat.' },
  { step: 4, title: 'Manage Online', desc: 'Swap meals, skip weeks, or cancel anytime.' },
]

const FAQ = [
  {
    q: 'Can I change my meals each week?',
    a: 'Yes! You can swap any meal in your subscription before the weekly cutoff (Wednesday 6pm).',
  },
  {
    q: 'How does the 10% discount work?',
    a: 'The discount is automatically applied to every meal in your subscription. No codes needed.',
  },
  {
    q: 'Can I skip a delivery?',
    a: 'Absolutely. You can skip any upcoming delivery through your account dashboard.',
  },
  {
    q: 'Is there a minimum commitment?',
    a: 'No minimum commitment. You can cancel your subscription at any time.',
  },
  {
    q: 'When do I get charged?',
    a: 'You are charged the day before your delivery is prepared, giving you time to make changes.',
  },
]

export default function SubscribePage() {
  return (
    <div className="bg-warm-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sage to-sage-dark">
        <div className="container mx-auto px-4 py-16 text-center md:py-24">
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">
            Subscribe & Save 10%
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            Never miss a meal. Get fresh, chef-prepared meals delivered on your
            schedule — and save on every order.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-sage hover:bg-cream">
            <Link href="/meals">
              Start Your Subscription
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <SectionHeading
          title="Why Subscribe?"
          subtitle="The easiest way to eat healthy every week."
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/10">
                <b.icon className="h-5 w-5 text-sage" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                {b.title}
              </h3>
              <p className="mt-2 text-sm text-charcoal/60">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-cream-light">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <SectionHeading
            title="How It Works"
            subtitle="Four simple steps to start your subscription."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-lg font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-charcoal/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings calculator */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-sage/20 bg-sage/5 p-8 text-center">
          <h2 className="font-heading text-xl font-bold text-charcoal">
            See Your Savings
          </h2>
          <p className="mt-2 text-sm text-charcoal/60">
            The average Fresh Prep subscriber saves over $50/month
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-sage">$520</p>
              <p className="text-xs text-charcoal/50">Avg monthly spend</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sage">10%</p>
              <p className="text-xs text-charcoal/50">Subscription discount</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sage">$52</p>
              <p className="text-xs text-charcoal/50">Monthly savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-light">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="mx-auto mt-10 max-w-2xl space-y-4">
            {FAQ.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-white p-5">
                <h3 className="font-heading text-sm font-semibold text-charcoal">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm text-charcoal/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage">
        <div className="container mx-auto px-4 py-12 text-center md:py-16">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Ready to save on every order?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
            Start adding meals to your cart and toggle &quot;Subscribe & Save&quot; at checkout.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white text-sage hover:bg-cream">
              <Link href="/meals">
                Shop Meals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
