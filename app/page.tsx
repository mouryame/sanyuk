import { Card, CardContent } from "@/components/ui/card";
import GoogleAd from "@/components/ui/googleAd";

export default function Home() {
  return (
    <>
      <Card className="w-full max-w-100 m-auto">
        <CardContent className="flex justify-center items-center">
          <GoogleAd adSlot="1234567890" width="30px" height="25px" />
        </CardContent>
      </Card>
    </>
  );
}
