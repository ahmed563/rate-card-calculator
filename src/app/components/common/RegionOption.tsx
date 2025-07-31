"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input"; // make sure you have this
import { useDebouncedCallback } from "use-debounce"; // install via: npm i use-debounce
import { MapPin } from "lucide-react";

type Region = {
  id: number;
  name: string;
  multipliers: number;
};

export default function SearchableRegionSelect({
  onSelect,
}: {
  onSelect: (region: Region) => void;
}) {
  const [regions, setRegions] = React.useState<Region[]>([]);
  const [filteredRegions, setFilteredRegions] = React.useState<Region[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState<string>("");

  React.useEffect(() => {
    const fetchRegions = async () => {
      const res = await fetch("/api/region");
      const data = await res.json();
      setRegions(data);
      setFilteredRegions(data);
      if (data.length > 0) {
        const defaultRegion = data[0];
        setSelectedRegion(defaultRegion.name);
        onSelect(defaultRegion);
      }
    };

    fetchRegions();
  }, []);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const filtered = regions.filter((region) =>
      region.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRegions(filtered);
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleChange = (value: string) => {
    setSelectedRegion(value);
    const selected = regions.find((r) => r.name === value);
    if (selected) onSelect(selected);
  };

  return (
    <div>
      <label className="flex items-center text-sm font-semibold gap-2 text-gray-600 dark:text-zinc-300 mb-2 block">
        <MapPin className="w-4 h-4" />
        Region
      </label>
      <Select value={selectedRegion} onValueChange={handleChange}>
        <SelectTrigger className="w-full py-5 bg-button rounded-lg">
          <SelectValue placeholder="Select Region" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search region..."
              className="mb-2"
            />
          </div>
          {filteredRegions.map((region) => (
            <SelectItem key={region.id} value={region.name}>
              {region.name}
            </SelectItem>
          ))}
          {filteredRegions.length === 0 && (
            <div className="px-4 py-2 text-muted-foreground text-sm">
              No results found.
            </div>
          )}

        </SelectContent>
      </Select>
    </div>
  );
}
