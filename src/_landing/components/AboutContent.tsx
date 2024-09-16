import { Statistics } from "./Statistics";

export const AboutContent = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-gray-950 border rounded-lg py-12">
        <div className="px-6 flex items-center flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src='/assets/images/scan.png'
            alt=""
            className="w-[300px] object-contain flex items-center justify-center rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary-500 to-primary-500 text-transparent bg-clip-text">
                  About{" "}
                </span>
                PayFly
              </h2>
              <p className="text-md text-muted-foreground mt-4 text-gray-300">
                At PayFly, we're dedicated to making payments easier for everyone in Nigeria. Our innovative mobile payment app offers a seamless and secure way to make purchases. We prioritize convenience and security, ensuring you can manage your finances effortlessly. Join us in transforming the future of payments in Nigeria. Simplify your financial life with PayFly.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
