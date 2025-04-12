"use client";
import { useState, useEffect } from "react";
import initialData from "@/data/dummy.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

type PageStatus = "in_edit" | "under_review" | "deployed";

type PageData = {
  pageId: string;
  topic: string;
  title: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  status: PageStatus;
};

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [pages, setPages] = useState<PageData[]>([]);
  const router = useRouter();

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(search.toLowerCase()) ||
      page.topic.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (pageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    );
  };

  const handleDeploy = () => {
    alert(`Deploying pages: ${selectedPages.join(", ")}`);
  };
  useEffect(() => {
    const localData = localStorage.getItem("pages");
    if (localData) {
      setPages(JSON.parse(localData));
      console.log("Local data loaded");
    } else {
      localStorage.setItem("pages", JSON.stringify(initialData));
      setPages(initialData);
    }
  }, []);

  const updateLocalStorage = (newData: PageData[]) => {
    localStorage.setItem("pages", JSON.stringify(newData));
  };

  const handleDelete = () => {
    const updated = pages.filter(
      (page) => !selectedPages.includes(page.pageId)
    );
    console.log("Row Deleted");
    setPages(updated);
    updateLocalStorage(updated);
    setSelectedPages([]);
  };
  return (
    <div className="p-6 space-y-4 -z-1">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search by title or topic..."
          className="max-w-sm -z-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={selectedPages.length === 0}
          >
            Delete Selected
          </Button>
          <Button
            variant="secondary"
            onClick={handleDeploy}
            disabled={selectedPages.length === 0}
          >
            Deploy Selected
          </Button>
          <Button onClick={() => router.push("/admin/create")}>
            Create Page
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedPages.length === filteredPages.length}
                onCheckedChange={(checked) =>
                  setSelectedPages(
                    checked ? filteredPages.map((p) => p.pageId) : []
                  )
                }
              />
            </TableHead>
            <TableHead>Page ID</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Updated By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPages.map((page) => (
            <TableRow key={page.pageId}>
              <TableCell>
                <Checkbox
                  checked={selectedPages.includes(page.pageId)}
                  onCheckedChange={() => toggleSelect(page.pageId)}
                />
              </TableCell>
              <TableCell>{page.pageId}</TableCell>
              <TableCell>{page.topic}</TableCell>
              <TableCell>{page.title}</TableCell>
              <TableCell>{page.createdAt}</TableCell>
              <TableCell>{page.createdBy}</TableCell>
              <TableCell>{page.updatedAt}</TableCell>
              <TableCell>{page.updatedBy}</TableCell>
              <TableCell>{page.status}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
