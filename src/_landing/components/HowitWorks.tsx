import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "Download App",
    description:
      "Get our app from the App Store or Google Play and install it on your phone.",
  },
  {
    title: "Add Your Bank Card",
    description:
      "Enter your bank card details to securely link your account.",
  },
  {
    title: "Set Up Security Measures",
    description:
      "Enhance your protection by setting up a PIN, fingerprint, or facial recognition.",
  },
  {
    title: "Tap to Pay",
    description:
      "Simply tap your phone at any NFC-enabled terminal to make quick and secure payments.",
  },
];

export const HowitWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center sm:py-12 my-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary-500 to-primary-500 text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mb-8 text-md text-muted-foreground mt-4 text-gray-300">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-gray-950"
          >
            <CardHeader>
              <CardTitle className="grid gap-2 place-items-center">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
