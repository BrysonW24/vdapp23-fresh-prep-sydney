import { SectionHeading } from '@/components/ui/section-heading'

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                          */
/* ------------------------------------------------------------------ */

interface FaqItem {
  question: string
  answer: string
}

interface FaqCategory {
  name: string
  items: FaqItem[]
}

const FAQ_DATA: FaqCategory[] = [
  {
    name: 'Ordering',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'Browse our weekly menu, add meals to your cart, and proceed to checkout. You can order as a guest or create an account for faster checkout and order history.',
      },
      {
        question: 'Is there a minimum order?',
        answer:
          'Yes, the minimum order is $60. This helps us keep delivery efficient and sustainable.',
      },
      {
        question: 'Can I customise my meals?',
        answer:
          'Our meals are prepared in batches to ensure consistency and quality, so we are unable to accommodate individual customisations. However, we offer a wide range of options across different dietary categories.',
      },
      {
        question: 'When is the order cutoff?',
        answer:
          'Orders must be placed by 6pm the day before your scheduled delivery. Late orders will be included in the next available delivery window.',
      },
      {
        question: 'Can I cancel or change my order?',
        answer:
          'You can modify or cancel your order up until the cutoff time. After cutoff, meals are already being prepared and changes cannot be made.',
      },
    ],
  },
  {
    name: 'Delivery',
    items: [
      {
        question: 'Where do you deliver?',
        answer:
          'We deliver across most of metropolitan Sydney, including the Inner West, CBD, Eastern Suburbs, North Shore, and Southern Suburbs. Check our Delivery Areas page for the full list.',
      },
      {
        question: 'How much does delivery cost?',
        answer:
          'Delivery is free for orders over $80 within the Inner West and CBD zones. Other areas have a flat delivery fee ranging from $5.95 to $9.95 depending on distance.',
      },
      {
        question: 'What days do you deliver?',
        answer:
          'Delivery days vary by area. Most zones receive deliveries two to three days per week. Check the Delivery Areas page for your specific delivery schedule.',
      },
      {
        question: 'Do I need to be home for delivery?',
        answer:
          'No. All meals are packed in insulated bags with ice packs designed to keep food fresh for several hours. We can leave your order at your door, in your building lobby, or another safe spot you specify at checkout.',
      },
      {
        question: 'How are the meals packaged?',
        answer:
          'Meals arrive in BPA-free, microwave-safe containers inside an insulated delivery bag. We use recyclable packaging wherever possible.',
      },
    ],
  },
  {
    name: 'Nutrition',
    items: [
      {
        question: 'Are your meals healthy?',
        answer:
          'All meals are designed by our chefs in consultation with a nutritionist. Each meal is macro-balanced with a focus on whole, minimally processed ingredients. Full nutritional information is displayed on every meal page.',
      },
      {
        question: 'Do you cater to dietary requirements?',
        answer:
          'We offer meals across several categories including High Protein, Low Carb, Plant Based, and Classic. Each meal lists its allergen information and nutritional profile so you can choose meals that fit your needs.',
      },
      {
        question: 'Are your meals allergen-free?',
        answer:
          'While we clearly label allergens on every meal, all meals are prepared in a shared kitchen that handles gluten, dairy, nuts, eggs, soy, and shellfish. We cannot guarantee the absence of any allergen.',
      },
      {
        question: 'How long do the meals last?',
        answer:
          'Our meals are made fresh and have a refrigerated shelf life of five days from the date of delivery. They should be stored in the fridge immediately upon arrival.',
      },
    ],
  },
  {
    name: 'Account',
    items: [
      {
        question: 'Do I need an account to order?',
        answer:
          'No, you can order as a guest. However, creating an account lets you save your delivery details, view order history, and manage subscriptions more easily.',
      },
      {
        question: 'Do you offer subscriptions?',
        answer:
          'Yes! Subscribe to a weekly delivery and save 10% on every order. You can pause or cancel your subscription at any time with no lock-in contracts.',
      },
      {
        question: 'How do I update my delivery address?',
        answer:
          'Log in to your account and navigate to your profile settings. You can update your delivery address there. Changes will apply to your next order.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept Visa, Mastercard, American Express, and Apple Pay. All payments are processed securely through Stripe.',
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function FaqsPage() {
  return (
    <div className="bg-warm-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about ordering, delivery, and our meals."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-12">
          {FAQ_DATA.map((category) => (
            <div key={category.name}>
              <h2 className="font-heading text-2xl font-bold text-charcoal">
                {category.name}
              </h2>

              <div className="mt-4 space-y-2">
                {category.items.map((faq, idx) => (
                  <details
                    key={idx}
                    className="group rounded-xl border border-cream bg-white"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-charcoal transition-colors hover:text-sage [&::-webkit-details-marker]:hidden">
                      <span>{faq.question}</span>
                      <span className="ml-4 shrink-0 text-lg text-sage transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-4">
                      <p className="text-sm leading-relaxed text-charcoal/70">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 text-center">
          <p className="text-charcoal/60">
            Still have questions?{' '}
            <a
              href="mailto:hello@freshprepsydney.com.au"
              className="font-medium text-sage hover:underline"
            >
              Send us an email
            </a>{' '}
            and we will get back to you within 24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}
