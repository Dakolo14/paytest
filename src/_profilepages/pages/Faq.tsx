import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQList = [
  {
    question: "How do I use Payfly?",
    answer: "You can use Payfly to make purchases in stores, on websites, and in apps. It’s widely accepted, simple, safe, secure, and private.",
    value: "item-1",
  },
  {
    question: "How do I get started with Payfly?",
    answer:
      "Simply download the Payfly app from the App Store or Google Play, add your bank card, set up security measures, and you're ready to start making payments.",
    value: "item-2",
  },
  {
    question: "Is Payfly secure?",
    answer:
      "Yes, Payfly uses advanced security measures such as PIN, fingerprint, and facial recognition to protect your information and transactions. We also don't share your information with merchants.",
    value: "item-3",
  },
  {
    question: "Where can I use Payfly?",
    answer: "You can use Payfly at any NFC-enabled terminal, making it easy to pay at stores, restaurants, and other locations that accept contactless payments.",
    value: "item-4",
  },
  {
    question: "Are there any fees for using Payfly?",
    answer:
      "Payfly does not charge any fees for using the app. However, your bank may have its own fees for certain transactions.",
    value: "item-5",
  },
  {
    question: "What should I do if I lose my phone?",
    answer:
      "If you lose your phone, contact our support team immediately to suspend your account and prevent unauthorized transactions. You can also use our website to suspend/manage your card.",
    value: "item-6",
  },
  {
    question: "Can I add multiple bank cards to Payfly?",
    answer:
      "Yes, you can add multiple bank cards to Payfly and choose which one to use for each transaction.",
    value: "item-7",
  },
  {
    question: "How do I set up security measures on Payfly?",
    answer:
      "During the setup process, you will be prompted to choose a PIN, fingerprint, or facial recognition for added security. You can also adjust these settings in the app's security section.",
    value: "item-8",
  },
  {
    question: "How does Payfly protect my privacy?",
    answer:
      "Payfly is committed to protecting your privacy. We use encryption and other security measures to safeguard your personal and financial information. Your data is never shared without your consent.",
    value: "item-9",
  },
];

const Faq = () => {
  return (
    <section className="py-2 pb-20" id="faq">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white text-left">
          Have Questions? We’ve Got Answers.
        </h3>
        <p className="mt-2 text-sm text-gray-300 text-left">
          Explore our most frequently asked questions to learn everything you need to know about Payfly. Whether you’re getting started or need help, you’ll find the answers here.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent className="text-gray-300">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://api.whatsapp.com/send?phone=09059428941"
          className="text-primary-500 transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};

export default Faq;
