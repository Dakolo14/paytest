import { Button } from "@/components/ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-gray-950 py-16 mt-20 sm:my-20"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            All Your
            <span className="bg-gradient-to-b from-primary-500 to-primary-500 text-transparent bg-clip-text">
              {" "}
              Ideas & Concepts{" "}
            </span>
            In One Interface
          </h2>
          <p className="text-md text-muted-foreground mt-4 text-gray-300 mb-8 lg:mb-0">
            Get started with the easiest, fastest, and most secure way to manage your payments. Download now and experience the future of mobile transactions.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto">Download on Play Store</Button>
          <Button
            variant="outline"
            className="w-full md:w-auto"
          >
            Download on App Store
          </Button>
        </div>
      </div>
    </section>
  );
};
