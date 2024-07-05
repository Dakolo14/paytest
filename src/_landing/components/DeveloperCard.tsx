import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
  button: string;
}

const features: FeatureProps[] = [
  {
    title: "Documentation",
    description:
      "Build magical applications and products with the spell book that is our developers’ guide.",
    button: "Explore our Docs",
  },
  {
    title: "API Reference",
    description:
      "Learn about specific features in Kora APIs, and how they can take your product up several notches",
    button: "Full API Reference",
  },
  {
    title: "Help and Support",
    description:
      "There’s no question or issue that our customer success team can’t handle. We promise.", 
    button: "Contact Sales",
  },
];


const DeveloperCard = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center sm:py-12 my-10"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Integrate{" "}
        <span className="bg-gradient-to-b from-primary-500 to-primary-500 text-transparent bg-clip-text">
          Payfly{" "}
        </span>
        API to your Application
      </h2>
      <p className="md:w-3/4 mx-auto mb-8 text-md text-muted-foreground mt-4 text-gray-300">
        Build delightful payment experiences with all the support you need by engaging Payfly API.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ title, description, button }: FeatureProps) => (
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
            <Button className="mb-6">{button}</Button>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default DeveloperCard