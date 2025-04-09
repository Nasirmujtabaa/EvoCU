
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
};

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-md ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indian-softPurple text-indian-primary">
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
