import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function PageDetails({
  changeView,
}: {
  changeView: () => void;
}) {
  const [pageData, setPageData] = useState<{
    topic: string;
    tags: string;
    title: string;
  }>({
    topic: "",
    tags: "",
    title: "",
  });

  useEffect(() => {
    const pageData = localStorage.getItem("pageData");
    if (pageData) {
      setPageData(JSON.parse(pageData));
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPageData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("pageData", JSON.stringify(pageData));
    (e.target as HTMLFormElement).reset();
    changeView();
  }

  return (
    <Card className="w-full max-w-600 m-auto p-4">
      <h1 className="text-2xl font-bold">Page Details</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Topic"
          name="topic"
          onChange={handleChange}
          value={pageData.topic}
        />
        <TextField
          label="Tags"
          name="tags"
          onChange={handleChange}
          value={pageData.tags}
        />
        <TextField
          label="Title"
          name="title"
          onChange={handleChange}
          value={pageData.title}
        />
        <Button type="submit">Next</Button>
      </form>
    </Card>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
