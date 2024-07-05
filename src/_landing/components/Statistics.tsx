export const Statistics = () => {
    interface statsProps {
      quantity: string;
      description: string;
    }
  
    const stats: statsProps[] = [
      {
        quantity: "4.7K+",
        description: "Users",
      },
      {
        quantity: "1.8K+",
        description: "Subscribers",
      },
      {
        quantity: "250+",
        description: "Happy Clients",
      },
      {
        quantity: "500+",
        description: "Reviews",
      },
    ];
  
    return (
      <section id="statistics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ quantity, description }: statsProps) => (
            <div
              key={description}
              className="space-y-2 text-center"
            >
              <h2 className="text-2xl sm:text-4xl font-bold ">{quantity}</h2>
              <p className="text-md text-muted-foreground text-primary-500">{description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  