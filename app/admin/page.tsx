"use client";
import { useState, useEffect } from "react";
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
import logger from "@/utils/logger";

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
      const fetchPages = async () => {
        try {
          const response = await fetch(
            "http://localhost:3000/api/fetchAllPages"
          );
          const data = await response.json();
          setPages(data);
          logger.log("DB fetched");
          updateLocalStorage(data);
        } catch (error) {
          console.error("Error fetching pages:", error);
        }
      };
      fetchPages();
    }

    const intervalId = setInterval(() => {
      localStorage.removeItem("pages");
      logger.log("Local data removed");
    }, 100 * 60 * 5);
    return () => clearInterval(intervalId);
  }, []);

  const updateLocalStorage = (data: PageData[]) => {
    localStorage.setItem("pages", JSON.stringify(data));
  };

  const handleDelete = async () => {
    if (!selectedPages.length) {
      alert("Please select at least one page");
      return;
    }
    const updated = pages.filter(
      (page) => !selectedPages.includes(page.pageId)
    );
    try {
      const response = await fetch("http://localhost:3000/api/deletePage", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageId: selectedPages[0] }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete page");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      alert("Failed to delete page");
    }

    logger.log(updated, "Row Deleted");
    setPages(updated);
    updateLocalStorage(updated);
    setSelectedPages([]);
  };
  return (
    <div className=" p-6 space-y-4 w-full">
      <div className="flex justify-between items-center space-x-4">
        <Input
          placeholder="Search by title or topic..."
          className="min-w-20 max-w-70 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 ">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={selectedPages.length === 0}
            className="min-w-10 max-w-30"
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
          <Button
            onClick={() => router.push("/admin/create")}
            className="md:max-w-[120px] md:max-text-[0.8rem]"
          >
            Create Page
          </Button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
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
    </div>
  );
}
